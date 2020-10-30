import HelperLibrary from "./helper-library.ts";
import ProtocolJsonCodegen from "./protocol-json.ts";
import ProtocolXmlCodegen from "./protocol-xml.ts";
import type * as Schema from './sdk-schema.ts';
import ShapeLibrary, { KnownShape } from "./shape-library.ts";

export default class ProtocolRestCodegen {
  shapes: ShapeLibrary;
  helpers: HelperLibrary;
  innerProtocol: ProtocolJsonCodegen | ProtocolXmlCodegen;
  constructor(innerProtocol: ProtocolJsonCodegen | ProtocolXmlCodegen) {
    this.shapes = innerProtocol.shapes;
    this.helpers = innerProtocol.helpers;
    this.innerProtocol = innerProtocol;

    this.helpers.addHelper('fmtDateHeader', {
      chunks: [
        `function fmtDateHeader(input: Date | number): string {`,
        `  const date = (typeof input === 'number') ? new Date(input*1000) : input;`,
        `  return date.toUTCString();`,
        `}`],
    });
  }

  generateOperationInputParsingTypescript(inputShape: Schema.ApiShape, meta: Schema.LocationInfo) {
    const chunks = new Array<string>();
    const pathParts = new Map<string,string>();

    if (inputShape.type !== 'structure') throw new Error(`REST Input wasn't a structure`);

    const locationTypes = new Set(Object.values(inputShape.members).map(x => x.location ?? 'body'));
    const hasBody = locationTypes.delete('body');
    const hasFraming = locationTypes.size > 0;

    const referencedInputs = new Set<string>();
    if (locationTypes.has('header') || locationTypes.has('headers')) {
      chunks.push(`    const headers = new Headers;`);
      referencedInputs.add('headers');
    }
    if (locationTypes.has('querystring')) {
      chunks.push(`    const query = new URLSearchParams;`);
      referencedInputs.add('query');
    }
    // chunks.push(`    const body = new URLSearchParams;`);

    const framings = Object.entries(inputShape.members).filter(x => x[1].location);
    for (const [field, spec] of framings) {
      const shape = this.shapes.get(spec);
      const defaultName = (field[0].toUpperCase()+field.slice(1));
      const locationName = spec.locationName ?? shape.spec.locationName ?? defaultName;
      const isRequired = (inputShape.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
      const paramRef = `params[${JSON.stringify(field)}]`;
      switch (spec.location) {
        case 'uri':
          // Store two copies to support toggling the url encoding
          switch (shape.spec.type) {
            case 'string':
              pathParts.set(`{${locationName}}`, `\${${paramRef}}`);
              pathParts.set(`{${locationName}+}`, `\${${paramRef}.split("/")}`);
              break;
            case 'integer':
            case 'double':
            case 'float':
            case 'long':
              pathParts.set(`{${locationName}}`, `\${${paramRef}.toFixed(10)}`);
              break;
            default:
              throw new Error(`TODO: ${spec.location} ${shape.spec.type}`);
          }
          break;
        case 'header':
          let formattedRef = paramRef; // + ' ?? null';
          switch (shape.spec.type) {
            case 'timestamp':
              this.helpers.useHelper('fmtDateHeader');
              formattedRef = `fmtDateHeader(${formattedRef})`;
              break;
          }
          chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}headers.append(${JSON.stringify(spec.queryName ?? locationName)}, ${formattedRef});`);
          break;
        case 'headers':
          chunks.push(`    for (const [key, val] of Object.entries(${paramRef} ?? {})) {`);
          chunks.push(`      headers.append(${JSON.stringify(locationName)}+key, val);`);
          chunks.push(`    }`);
          break;
        case 'querystring':
          switch (shape.spec.type) {
            case 'string':
            case 'boolean':
            case 'integer':
            case 'double':
            case 'float':
            case 'long':
              chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, ${paramRef}?.toString() ?? "");`);
              break;
            case 'timestamp':
              const helper = `serializeDate_${shape.spec.timestampFormat ?? 'iso8601'}`;
              this.helpers.useHelper(helper);
              chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, ${helper}(${paramRef}) ?? "");`);
              break;

            case 'list': {
              const inner = this.shapes.get(shape.spec.member);
              switch (inner.spec.type) {
                case 'string':
                  chunks.push(`    for (const item of ${paramRef}${isRequired ? '' : ' ?? []'}) {`);
                  chunks.push(`      query.append(${JSON.stringify(spec.queryName ?? locationName)}, item?.toString() ?? "");`);
                  chunks.push(`    }`);
                  break;
                default:
                  throw new Error(`TODO: ${spec.location} ${shape.spec.type} ${inner.spec.type} ${field}`);
              }
              break;
            }

            case 'map': {
              const inner = this.shapes.get(shape.spec.value);
              switch (inner.spec.type) {
                case 'string':
                  chunks.push(`    for (const [k,v] of Object.entries(${paramRef}${isRequired ? '' : ' ?? {}'})) {`);
                  chunks.push(`      query.append(k, v?.toString() ?? "");`);
                  chunks.push(`    }`);
                  break;
                case 'list':
                  chunks.push(`    for (const [k,v] of Object.entries(${paramRef}${isRequired ? '' : ' ?? {}'})) {`);
                  chunks.push(`      for (const item of v) {`);
                  chunks.push(`        query.append(k, item?.toString() ?? "");`);
                  chunks.push(`      }`);
                  chunks.push(`    }`);
                  break;
                default:
                  throw new Error(`TODO: ${spec.location} ${shape.spec.type} ${inner.spec.type} ${field}`);
              }
              break;
            }

            default:
              throw new Error(`TODO: ${spec.location} ${shape.spec.type} ${field}`);
          }
          break;
      }
    }

    // console.log(inputShape.documentation?.slice(0, 100), locationTypes);
    // console.log(hasBody, hasFraming, Object.values(inputShape.members).filter(x => !x.location).length, meta.locationName);
    // console.log(inputShape.locationName)

    if (hasBody) {
      let frame = inputShape;
      let frameRef = 'params';
      let locInfo: Schema.LocationInfo & {paramRef?: string} = meta;
      let bodyFields = Object.entries(frame.members).filter(x => !x[1].location)

      if (!locInfo.locationName && bodyFields.length === 1 && bodyFields[0][0] === inputShape.payload /*&& bodyFields[0][1].locationName*/) {
        const [bodyName, bodySpec] = bodyFields[0];
        const bodyShape = this.shapes.get(bodySpec);
        if (bodyShape.spec.type !== 'structure') throw new Error(`TODO: bad inner shape ${bodyShape.spec.type} ${bodyShape.name}`)
        frame = bodyShape.spec;
        frameRef = `params[${JSON.stringify(bodyName)}]`;
        locInfo = {...bodySpec, paramRef: frameRef};

        // chunks.push(`    const body`)
        // chunks.push(`    ${bodyShape.censoredName}_Serialize(body, prefix+${JSON.stringify(prefix+locationName)}, ${paramRef});`);

      } else {
        frame = {...inputShape, members: {}};
        for (const [key, val] of bodyFields) {
          frame.members[key] = val;
        }
      }

      const innerCode = this.innerProtocol.generateOperationInputParsingTypescript(frame, locInfo);
      chunks.push(innerCode.inputParsingCode);
      for (const varr of innerCode.inputVariables) {
        referencedInputs.add(varr);
      }
      // }

      // console.log(frameRef, locInfo.xmlNamespace, locInfo.locationName, Object.keys(frame.members));
    }

    // for (const [field, spec] of Object.entries(inputShape.members)) {
    //   const shape = this.apiSpec.shapes[spec.shape];
    //   const defaultName = this.apiSpec.metadata.protocol === 'ec2' ? field : (field[0].toUpperCase()+field.slice(1));
    //   const locationName = spec.locationName ?? shape.locationName ?? defaultName;
    //   const isRequired = (inputShape.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
    //   const paramRef = `params[${JSON.stringify(field)}]`;
    //   switch (spec.location) {
    //     default:
    //       // console.log([spec.queryName, spec.locationName, shape.locationName]);
    //       // TODO: only queryName in a query api
    //       // chunks.push(`    ${isRequired ? '' : `if (${JSON.stringify(field)} in params) `}body[${JSON.stringify(spec.queryName ?? locationName)}] = ${paramRef};`);
    //       switch (shape.type) {
    //         // case 'boolean':
    //         //   chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(${JSON.stringify(spec.queryName ?? locationName)}, ${paramRef});`);
    //         case 'list':
    //           const flattened = shape.flattened ?? this.apiSpec.metadata.protocol !== 'ec2';
    //           const childPrefix = flattened ? '' : '.entry';
    //           chunks.push(`    (${paramRef} ?? []).forEach((item, idx) => {`)
    //             chunks.push(`    body.append(${JSON.stringify(spec.queryName ?? locationName)}+'.'+String(idx+1)+'${childPrefix}', String(item));`);
    //           chunks.push(`    });`);
    //           break;
    //         default:
    //           chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(${JSON.stringify(spec.queryName ?? locationName)}, String(${paramRef}));`);
    //       }
    //       referencedInputs.add('body');
    //   }
    // }

    return {
      inputParsingCode: chunks.join('\n'),
      inputVariables: Array.from(referencedInputs),
      pathParts,
    };
  }
  generateOperationOutputParsingTypescript(shape: KnownShape, resultWrapper?: string): { outputParsingCode: string; outputVariables: string[]; } {
    return this.innerProtocol.generateOperationOutputParsingTypescript(shape, resultWrapper);
  }
  generateShapeInputParsingTypescript(shape: KnownShape): { inputParsingFunction: string; } {
    return this.innerProtocol.generateShapeInputParsingTypescript(shape);
  }
  generateShapeOutputParsingTypescript(shape: KnownShape): { outputParsingFunction: string; } {
    return this.innerProtocol.generateShapeOutputParsingTypescript(shape);
  }
}
