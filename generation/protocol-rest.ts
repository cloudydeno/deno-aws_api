import HelperLibrary from "./helper-library.ts";
import ProtocolJsonCodegen from "./protocol-json.ts";
import ProtocolQueryCodegen from "./protocol-query.ts";
import type * as Schema from './sdk-schema.ts';
import ShapeLibrary, { KnownShape } from "./shape-library.ts";

export default class ProtocolRestCodegen {
  shapes: ShapeLibrary;
  helpers: HelperLibrary;
  innerProtocol: ProtocolJsonCodegen | ProtocolQueryCodegen;
  constructor(innerProtocol: ProtocolJsonCodegen | ProtocolQueryCodegen) {
    this.shapes = innerProtocol.shapes;
    this.helpers = innerProtocol.helpers;
    this.innerProtocol = innerProtocol;

    this.helpers.addHelper('encodePath', {
      chunks: [
        `function encodePath(strings: TemplateStringsArray, ...names: string[]): string {`,
        `  return String.raw(strings, ...names.map(encodeURIComponent));`,
        `}`],
    });
    this.helpers.addHelper('fmtDateHeader', {
      chunks: [
        `function fmtDateHeader(input: Date | number): string {`,
        `  const date = (typeof input === 'number') ? new Date(input*1000) : input;`,
        `  return date.toUTCString();`,
        `}`],
    });
  }

  generateOperationInputParsingTypescript(inputShape: Schema.ApiShape): { inputParsingCode: string; inputVariables: string[]; } {
    const chunks = new Array<string>();

    if (inputShape.type !== 'structure') throw new Error(`REST Input wasn't a structure`);

    const locationTypes = new Set(Object.values(inputShape.members).map(x => x.location));
    // console.log(inputShape.documentation?.slice(0, 100), locationTypes);

    // if (locationTypes.has('header') || locationTypes.has('headers')) {
    //   chunks.push(`    const headers = new Headers;`);
    // }
    // if (locationTypes.has('querystring')) {
    //   chunks.push(`    const query = new URLSearchParams;`);
    // }
    // chunks.push(`    const body = new URLSearchParams;`);

    // for (const [field, spec] of Object.entries(inputShape.members)) {
    //   const shape = this.apiSpec.shapes[spec.shape];
    //   const defaultName = this.apiSpec.metadata.protocol === 'ec2' ? field : (field[0].toUpperCase()+field.slice(1));
    //   const locationName = spec.locationName ?? shape.locationName ?? defaultName;
    //   const isRequired = (inputShape.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
    //   const paramRef = `params[${JSON.stringify(field)}]`;
    //   switch (spec.location) {
    //     case 'uri':
    //       // Store two copies to support toggling the url encoding
    //       pathParts.set(`{${locationName}}`, `\${${paramRef}}`);
    //       // TODO: i think this really means "include slashes" not fuckin' full-raw
    //       pathParts.set(`{${locationName}+}`, `\`+${paramRef}+encodePath\``);
    //       break;
    //     case 'header':
    //       let formattedRef = paramRef + ' ?? null';
    //       switch (shape.type) {
    //         case 'timestamp':
    //           formattedRef = `fmtDateHeader(${formattedRef})`;
    //           break;
    //       }
    //       chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}headers.append(${JSON.stringify(spec.queryName ?? locationName)}, ${formattedRef});`);
    //       referencedInputs.add('headers');
    //       break;
    //     case 'headers':
    //       chunks.push(`    for (const [key, val] of Object.entries(${paramRef} || {})) {`);
    //       chunks.push(`      headers.append(${JSON.stringify(locationName)}+key, val);`);
    //       chunks.push(`    }`);
    //       referencedInputs.add('headers');
    //       break;
    //     case 'querystring':
    //       chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}query.set(${JSON.stringify(spec.queryName ?? locationName)}, ${paramRef});`);
    //       referencedInputs.add('query');
    //       break;
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
      inputVariables: [],
    };
  }
  generateOperationOutputParsingTypescript(shape: KnownShape, resultWrapper?: string): { outputParsingCode: string; outputVariables: string[]; } {
    return {outputParsingCode: "a", outputVariables: []};
  }
  generateShapeInputParsingTypescript(shape: KnownShape): { inputParsingFunction: string; } {
    return this.innerProtocol.generateShapeInputParsingTypescript(shape);
  }
  generateShapeOutputParsingTypescript(shape: KnownShape): { outputParsingFunction: string; } {
    return this.innerProtocol.generateShapeOutputParsingTypescript(shape);
  }
}
