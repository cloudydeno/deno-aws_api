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

    // this.helpers.addHelper('fmtDateHeader', {
    //   chunks: [
    //     `function fmtDateHeader(input: Date | number): string {`,
    //     `  const date = (typeof input === 'number') ? new Date(input*1000) : input;`,
    //     `  return date.toUTCString();`,
    //     `}`],
    // });
  }

  generateOperationInputParsingTypescript(inputShape: KnownShape, meta: Schema.LocationInfo) {
    const chunks = new Array<string>();
    const pathParts = new Map<string,string>();

    if (inputShape.spec.type !== 'structure') throw new Error(`REST Input wasn't a structure`);

    const locationTypes = new Set(Object.values(inputShape.spec.members).map(x => x.location ?? this.shapes.get(x).spec.location ?? 'body'));
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

    const framings = Object.entries(inputShape.spec.members).filter(x => x[1].location ?? this.shapes.get(x[1]).spec.location);
    for (const [field, spec] of framings) {
      const shape = this.shapes.get(spec);
      const defaultName = (field[0].toUpperCase()+field.slice(1));
      const locationName = spec.locationName ?? shape.spec.locationName ?? defaultName;
      const isRequired = (inputShape.spec.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
      const paramRef = `params[${JSON.stringify(field)}]`;
      const fieldLocation = spec.location ?? shape.spec.location
      switch (fieldLocation) {
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
            case 'boolean':
              pathParts.set(`{${locationName}}`, `\${${paramRef}.toString()}`);
              break;
            default:
              throw new Error(`TODO: ${fieldLocation} ${shape.spec.type}`);
          }
          break;
        case 'header':
          let formattedRef = paramRef; // + ' ?? null';
          switch (shape.spec.type) {
            case 'timestamp': {
              const format  = spec.timestampFormat ?? shape.spec.timestampFormat ?? 'rfc822';
              formattedRef = `cmnP.serializeDate_${format}(${formattedRef})${format === 'unixTimestamp' ? '?.toString()' : ''} ?? ""`;
              break;
            }
            case 'integer':
            case 'double':
            case 'float':
            case 'long':
            case 'boolean':
              formattedRef = `${formattedRef}?.toString() ?? ''`;
              break;
            case 'blob':
              formattedRef = `cmnP.serializeBlob(${formattedRef}) ?? ''`;
              break;
            case 'string':
              if (spec.jsonvalue) {
                formattedRef = `btoa(jsonP.serializeJsonValue(${formattedRef}) ?? '')`;
                break;
              }
              break;
            }
          chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}headers.append(${JSON.stringify(spec.queryName ?? locationName)}, ${formattedRef});`);
          break;
        case 'headers': {
          if (shape.spec.type !== 'map') throw new Error(`rest input headers not map`);
          chunks.push(`    for (const [key, val] of Object.entries(${paramRef} ?? {})) {`);

          const inner = this.shapes.get(shape.spec.value);
          switch (inner.spec.type) {
            case 'string':
              chunks.push(`      headers.append(${JSON.stringify(locationName)}+key, val ?? "");`);
              break;
            default:
              throw new Error(`rest input headers inner type ${inner.spec.type}`);
          }
          chunks.push(`    }`);
          break;
        }
        case 'querystring':
          switch (shape.spec.type) {
            case 'string':
              if (spec.jsonvalue) {
                chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, jsonP.serializeJsonValue(${paramRef}) ?? "");`);
                break;
              }
            case 'boolean':
            case 'integer':
            case 'double':
            case 'float':
            case 'long':
              chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, ${paramRef}?.toString() ?? "");`);
              break;
            case 'timestamp': {
              const format  = spec.timestampFormat ?? shape.spec.timestampFormat ?? 'iso8601';
              const helper = `cmnP.serializeDate_${format}`;
              // this.helpers.useHelper(helper);
              chunks.push(`    ${isRequired ? '' : `if (${paramRef} != null) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, ${helper}(${paramRef})${format === 'unixTimestamp' ? '?.toString()' : ''} ?? "");`);
              break;
            }
            case 'list': {
              const inner = this.shapes.get(shape.spec.member);
              switch (inner.spec.type) {
                case 'string':
                  chunks.push(`    for (const item of ${paramRef}${isRequired ? '' : ' ?? []'}) {`);
                  chunks.push(`      query.append(${JSON.stringify(spec.queryName ?? locationName)}, item?.toString() ?? "");`);
                  chunks.push(`    }`);
                  break;
                default:
                  throw new Error(`TODO: ${fieldLocation} ${shape.spec.type} ${inner.spec.type} ${field}`);
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
                  chunks.push(`      for (const item of v ?? []) {`);
                  chunks.push(`        query.append(k, item?.toString() ?? "");`);
                  chunks.push(`      }`);
                  chunks.push(`    }`);
                  break;
                default:
                  throw new Error(`TODO: ${fieldLocation} ${shape.spec.type} ${inner.spec.type} ${field}`);
              }
              break;
            }

            default:
              throw new Error(`TODO: ${fieldLocation} ${shape.spec.type} ${field}`);
          }
          break;
      }
    }

    // console.log(inputShape.documentation?.slice(0, 100), locationTypes);
    // console.log(hasBody, hasFraming, Object.values(inputShape.members).filter(x => !x.location).length, meta.locationName);
    // console.log(inputShape.locationName)

    if (hasBody) {
      let isFrame = true;
      let frame = inputShape;
      let frameRef = 'params';
      let locInfo: Schema.LocationInfo & {paramRef?: string} = meta;
      if (frame.spec.type !== 'structure') throw new Error(`BUG jgrhry`);
      let bodyFields = Object.entries(frame.spec.members).filter(x => !x[1].location)

      if (!locInfo.locationName && bodyFields.length === 1 && bodyFields[0][0] === inputShape.payloadField/*&& bodyFields[0][1].locationName*/) {
        const [bodyName, bodySpec] = bodyFields[0];
        const bodyShape = this.shapes.get(bodySpec);

        if (bodyShape.spec.type === 'blob' || bodyShape.spec.type === 'string') {
          isFrame = false;
          frameRef = `${frameRef}[${JSON.stringify(bodyName)}]`;
          chunks.push(`    const body = typeof ${frameRef} === 'string' ? new TextEncoder().encode(${frameRef}) : ${frameRef};`);
          referencedInputs.add(`body`);

        } else if (bodyShape.spec.type === 'structure') {
          frame = bodyShape;
          chunks.push(`    const inner = params[${JSON.stringify(bodyName)}];`)
          frameRef = `inner`;
          locInfo = {...bodySpec, paramRef: frameRef};

          // chunks.push(`    const body`)
          // chunks.push(`    ${bodyShape.censoredName}_Serialize(body, prefix+${JSON.stringify(prefix+locationName)}, ${paramRef});`);

        } else throw new Error(`TODO: bad inner shape ${bodyShape.spec.type} ${bodyShape.name}`)

      } else {
        const frameSpec: Schema.ShapeStructure = {...inputShape.spec, members: {}};
        for (const [key, val] of bodyFields) {
          frameSpec.members[key] = val;
        }
        frame = new KnownShape(inputShape.name, frameSpec);
      }

      if (isFrame) {
        const innerCode = this.innerProtocol.generateOperationInputParsingTypescript(frame, locInfo);
        chunks.push(innerCode.inputParsingCode);
        for (const varr of innerCode.inputVariables) {
          referencedInputs.add(varr);
        }
      }

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
    if (shape.spec.type !== 'structure') throw new Error(`todo agjijrs`);

    if (shape.spec.payload) {
      const payloadSpec = shape.spec.members[shape.spec.payload];
      if (!payloadSpec) throw new Error(`bug sywjyowgaa`);
      const payloadShape = this.shapes.get(payloadSpec);

      let payloadChunk = '';
      if (payloadShape.spec.type === 'structure') {
        const bodyGen = this.innerProtocol.generateOperationOutputParsingTypescript(payloadShape, resultWrapper);
        payloadChunk = `${shape.spec.payload}: `+bodyGen.outputParsingCode.replace(/^ +return +/, '').replace(/;$/, '').replace(/\n/g, '\n  ');
      } else if (payloadShape.spec.type === 'blob') {
        payloadChunk = `${shape.spec.payload}: await resp.text(), // TODO: maybe allow proper body streaming`;
      }

      const chunks = new Array<string>();
      chunks.push(`  return {`);
      for (const [field, spec] of Object.entries(shape.spec.members)) {
        if (spec === payloadSpec) continue;
        switch (spec.location) {
          case 'statusCode':
            chunks.push(`    ${field}: resp.status,`);
            break;
          case 'header':
            chunks.push(`    ${field}: resp.headers.get(${JSON.stringify(spec.locationName)}),`);
            break;
          default:
            throw new Error(`TODO: rest output location ${spec.location}`);
        }
      }
      chunks.push(`    ${payloadChunk},`);
      chunks.push(`  };`);
      return {
        outputParsingCode: chunks.join('\n'),
        outputVariables: ['body'],
      };

    } else {
      const frameSpec: Schema.ShapeStructure = {...shape.spec, members: {}};

      const chunks = new Array<string>();
      chunks.push(`  return {`);
      for (const [field, spec] of Object.entries(shape.spec.members)) {
        const fieldShape = this.shapes.get(spec);
        const locationName = spec.locationName ?? fieldShape.spec.locationName ?? (field[0].toUpperCase()+field.slice(1));
        const isRequired = (shape.spec.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
        switch (spec.location ?? fieldShape.spec.location) {
          case 'statusCode':
            chunks.push(`    ${field}: resp.status,`);
            break;
          case 'header':
            switch (fieldShape.spec.type) {
              case 'timestamp':
                chunks.push(`    ${field}: cmnP.read${isRequired ? 'Req' : ''}Timestamp(resp.headers.get(${JSON.stringify(spec.locationName || field)})),`);
                break;
              case 'string':
                if (fieldShape.spec.enum) {
                  chunks.push(`    ${field}: cmnP.readEnum<${fieldShape.censoredName}>(resp.headers.get(${JSON.stringify(spec.locationName || field)})),`);
                } else {
                  chunks.push(`    ${field}: resp.headers.get(${JSON.stringify(spec.locationName || field)}),`);
                }
                break;
              case 'character':
                chunks.push(`    ${field}: resp.headers.get(${JSON.stringify(spec.locationName || field)}),`);
                break;
              case 'integer':
              case 'double':
              case 'float':
              case 'long':
                chunks.push(`    ${field}: cmnP.readNum(resp.headers.get(${JSON.stringify(spec.locationName || field)})),`);
                break;
              case 'boolean':
                chunks.push(`    ${field}: cmnP.readBool(resp.headers.get(${JSON.stringify(spec.locationName || field)})),`);
                break;
              default:
                throw new Error(`TODO: rest output header ${fieldShape.spec.type} "${field}"`);
            }
            // chunks.push(`    ${field}: resp.headers.get(${JSON.stringify(spec.locationName || field)}),`);
            break;
          case 'headers':
            if (fieldShape.spec.type !== 'map') throw new Error(`rest headers field needs to be a Map`);
            const keyShape = this.shapes.get(fieldShape.spec.key);
            const valShape = this.shapes.get(fieldShape.spec.value);
            switch (valShape.spec.type) {
              case 'string':
                chunks.push(`    ${field}: cmnP.toJsObj(resp.headers, ${spec.locationName ? JSON.stringify(spec.locationName.toLowerCase()) : 'true'}, v => v),`);
                break;
              default:
                throw new Error(`TODO: rest output headerS ${valShape.spec.type} "${field}"`);
            }
            break;
          case undefined:
            frameSpec.members[field] = spec;
            break;
          default:
            throw new Error(`TODO: rest output location ${spec.location}`);
        }
      }

      const frame = new KnownShape(shape.name, frameSpec);
      const bodyGen = this.innerProtocol.generateOperationOutputParsingTypescript(frame, resultWrapper);
      const payloadChunk = bodyGen.outputParsingCode.replace(/^ +return +/, '').replace(/;$/, '');
      chunks.push(`    ...${payloadChunk},`);

      chunks.push(`  };`);
      return {
        outputParsingCode: chunks.join('\n'),
        outputVariables: bodyGen.outputVariables,
      };
    }
  }
  generateShapeInputParsingTypescript(shape: KnownShape): { inputParsingFunction: string; } {
    return this.innerProtocol.generateShapeInputParsingTypescript(shape);
  }
  generateShapeOutputParsingTypescript(shape: KnownShape): { outputParsingFunction: string; } {
    return this.innerProtocol.generateShapeOutputParsingTypescript(shape);
  }
}
