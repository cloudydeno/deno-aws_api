import type * as Schema from './sdk-schema.ts';
import type { ShapeLibrary, KnownShape } from './shape-library.ts';
import type { HelperLibrary } from "./helper-library.ts";
import type { ProtocolCodegen } from "./protocol.ts";

export class StructEmitter {
  constructor(
    private apiSpec: Schema.Api,
    private shapes: ShapeLibrary,
    private helpers: HelperLibrary,
    private protocol: ProtocolCodegen,
  ) {}

  generateStructsTypescript(): string {
    const chunks = new Array<string>();

    for (const shape of this.shapes.allNamedShapes) {
      if (!shape.tags.has('named')) continue;

      chunks.push(`// refs: ${shape.refCount
        } - tags: ${Array.from(shape.tags).join(', ')}`);

      // if (this.#singleRefShapes.has(shape.name)) {
      //   chunks.push(`// TODO: can be inlined (only used once)`);
      // }
      chunks.push(`${
        this.writeStructureType(shape)}`);

      // TODO: other types might want a helper func... enums??
      // TODO QUIRK: IdentityPool isn't tagged right, out of the entire API surface
      if (shape.tags.has('interface') || shape.censoredName === 'IdentityPool') {
        // Maybe include input reading (prep for wire)
        if (!(this.shapes.inputShapes.includes(shape) && shape.refCount === 1) && shape.tags.has('input')) {
          chunks.push(this.protocol.generateShapeInputParsingTypescript(shape).inputParsingFunction);
        }
        // Maybe include output reading (post-wire enriching)
        if (!(this.shapes.outputShapes.includes(shape) && shape.refCount === 1) && shape.tags.has('output')) {
          chunks.push(this.protocol.generateShapeOutputParsingTypescript(shape).outputParsingFunction);
        }
      }
      chunks.push('');
    }

    return chunks.join('\n');
  }

  writeStructureType(shape: KnownShape): string {
    switch (shape.spec.type) {

      case 'structure':
        const required = new Set(shape.spec.required?.map(x => x.toLowerCase()) || []);
        const reqLists = shape.tags.has('output') && !this.apiSpec.metadata.protocol.includes('json');
        return [`export interface ${shape.censoredName} {`,
          ...Object.entries(shape.spec.members).map(([key, spec]) => {
            const innerShape = this.shapes.get(spec);
            const isRequired = required.has(key.toLowerCase())
              || (reqLists && (innerShape.spec.type === 'list' || innerShape.spec.type === 'map'))
              || spec.location === 'uri';
            return `  ${key}${isRequired ? '' : '?'}: ${this.specifyShapeType(innerShape, {isJson: spec.jsonvalue})}${isRequired ? '' : ' | null'};`;
          }),
        '}'].join('\n');

      case 'string':
        if (shape.spec.enum) {
          return [`export type ${shape.censoredName} =`,
            ...shape.spec.enum.map(value => `| ${JSON.stringify(value)}`),
          '| cmnP.UnexpectedEnumValue;'].join('\n');
        }
        break;

    }
    return `// TODO: forgotten shape ${shape.name} of type ${shape.spec.type}\n`;
  }

  // TODO: enums as a map key type should become an object instead
  specifyShapeType(shape: KnownShape, opts: {isDictKey?: true; isJson?: true}): string {
    if (shape.tags.has('named') && !opts.isDictKey) {
      return shape.censoredName;
    }

    switch (shape.spec.type) {
      case 'string':
        if (shape.spec.enum && !opts.isDictKey) {
          return shape.spec.enum.map(x => JSON.stringify(x)).join(' | ');
        } else if (opts.isJson && !opts.isDictKey) {
          return 'jsonP.JSONValue';
        }
      case 'boolean':
        return shape.spec.type;
      case 'character':
        return 'string';
      case 'double':
      case 'float':
      case 'long':
      case 'integer':
        return 'number';
      case 'list':
        const memberShape = this.shapes.get(shape.spec.member);
        let memberType = this.specifyShapeType(memberShape, {isJson: shape.spec.member.jsonvalue});
        if (memberType.includes(' ')) memberType = `(${memberType})`;
        return `${memberType}[]`;
      case 'map':
        const keyShape = this.shapes.get(shape.spec.key);
        const valueShape = this.shapes.get(shape.spec.value);
        const keyType = (keyShape.spec.type === 'string' && keyShape.spec.enum)
          ? `key in ${keyShape.censoredName}`
          : `key: ${this.specifyShapeType(keyShape, {isDictKey: true})}`;
        return `{ [${keyType}]: ${this.specifyShapeType(valueShape, {isJson: shape.spec.value.jsonvalue})} | null | undefined }`;
      case 'structure':
        return this.writeStructureType(shape).replace(/\n/g, '\n  ');
      case 'timestamp':
        return 'Date | number';
      case 'blob':
        return 'Uint8Array | string'; // TODO
      default:
        console.log(shape);
        throw new Error(`TODO: unimpl shape type ${(shape as any).spec.type}`);
    }
  }

}
