import type * as Schema from './sdk-schema.ts';
import type ShapeLibrary from './shape-library.ts';

export default class ProtocolQueryCodegen {
  shapes: ShapeLibrary;
  ec2Mode: boolean;
  constructor(shapes: ShapeLibrary, {ec2}: {ec2?: boolean}={}) {
    this.shapes = shapes;
    this.ec2Mode = ec2 ?? false;
  }

  requestBodyTypeName = 'URLSearchParams';
  globalHelpers = `
`;

  generateOperationInputParsingTypescript(inputShape: Schema.ApiShape): { inputParsingCode: string; inputVariables: string[]; } {
    if (inputShape.type !== 'structure') throw new Error(
      `Can only generate top level structures`);

    const chunks = new Array<string>();
    chunks.push(`    const body = new URLSearchParams;`);
    chunks.push(`    const prefix = '';`);

    chunks.push(this.generateStructureTypescript(inputShape, "params", ''));


    return {
      inputParsingCode: chunks.join('\n'),
      inputVariables: ['body'],
    };
  }

  generateShapeInputParsingTypescript(baseIdentifier: string, inputShape: Schema.ApiShape): { inputParsingFunction: string; } {
    const chunks = new Array<string>();
    chunks.push(`function ${baseIdentifier}_Serialize(body: URLSearchParams, prefix: string, params: ${baseIdentifier}) {`);

    switch (inputShape.type) {
      case 'structure':
        chunks.push(this.generateStructureTypescript(inputShape, "params", '.'));
        break;
      default:
        throw new Error(`TODO: protocol-query.ts lacks shape generator for ${inputShape.type}`);
    }

    chunks.push(`}`);
    return {
      inputParsingFunction: chunks.join('\n'),
    };
  }

  generateStructureTypescript(inputStruct: Schema.ShapeStructure, paramsRef = "params", prefix = ""): string {
    const chunks = new Array<string>();

    for (const [field, spec] of Object.entries(inputStruct.members)) {
      const shape = this.shapes.get(spec);
      const defaultName = this.ec2Mode ? field : (field[0].toUpperCase()+field.slice(1));
      const locationName = spec.queryName ?? spec.locationName ?? shape.spec.locationName ?? defaultName;
      const isRequired = (inputStruct.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
      const paramRef = `${paramsRef}[${JSON.stringify(field)}]`;

      switch (shape.spec.type) {
        // case 'boolean':
        //   chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(${JSON.stringify(locationName)}, ${paramRef});`);
        case 'list':
          const flattened = shape.spec.flattened ?? this.ec2Mode;
          const childPrefix = flattened ? '.' : '.member.';
          const memberLocationName = spec.queryName ?? spec.locationName ?? shape.spec.locationName ?? shape.spec.member.locationName ?? defaultName;
          chunks.push(`    (${paramRef} ?? []).forEach((item, idx) => {`)
          // TODO: needs to be much more flexible
          chunks.push(`      body.append(prefix+${JSON.stringify(prefix)}+${JSON.stringify(memberLocationName)}+'${childPrefix}'+String(idx+1), String(item));`);
          chunks.push(`    });`);
          chunks.push(`    if (${paramRef}?.length === 0) {`)
          chunks.push(`      body.append(prefix+${JSON.stringify(prefix)}+${JSON.stringify(memberLocationName)}, '');`);
          chunks.push(`    }`);
          break;
        case 'boolean':
        case 'integer':
        case 'float':
        case 'double':
        case 'string':
          chunks.push(`    ${isRequired ? '' : `if (${JSON.stringify(field)} in params) `}body.append(prefix+${JSON.stringify(prefix)}+${JSON.stringify(locationName)}, (${paramRef} ?? '').toString());`);
          break;
        case 'structure':
          if (shape.tags.has('named')) {
            chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}${shape.censoredName}_Serialize(body, prefix+${JSON.stringify(prefix)}+${JSON.stringify(locationName)}, ${paramRef});`);
          } else {
            if (isRequired) chunks.push(`    if (${paramRef}) {`);
            chunks.push(this.generateStructureTypescript(shape.spec, paramRef, prefix+locationName+'.'));
            if (isRequired) chunks.push(`    }`);
          }
          break;
        default:
          console.log('TODO:', shape.spec.type)
          chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(prefix+${JSON.stringify(prefix)}+${JSON.stringify(locationName)}, /*TODO: ${shape.spec.type}*/String(${paramRef}));`);
      }
    }

    return chunks.join('\n');
  }

};
