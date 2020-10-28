import type * as Schema from './sdk-schema.ts';
import type ShapeLibrary from './shape-library.ts';
import type { KnownShape } from './shape-library.ts';
import type HelperLibrary from "./helper-library.ts";

// "query" and also "ec2" which is based on "query"
export default class ProtocolJsonCodegen {
  shapes: ShapeLibrary;
  helpers: HelperLibrary;
  constructor(shapes: ShapeLibrary, helpers: HelperLibrary) {
    this.shapes = shapes;
    this.helpers = helpers;

    helpers.addDep("jsonP", "../../encoding/json.ts");
  }

  generateOperationInputParsingTypescript(inputShape: Schema.ApiShape): { inputParsingCode: string; inputVariables: string[]; } {
    if (inputShape.type !== 'structure') throw new Error(`BUG`);
    return {
      inputParsingCode: `    const body: jsonP.JSONObject = ${this.generateStructureInputTypescript(inputShape, 'params').replace(/\n/g, '\n  ')};`,
      inputVariables: ['body'],
    };
  }
  generateShapeInputParsingTypescript(shape: KnownShape): { inputParsingFunction: string; } {
    if (shape.spec.type === 'string') return {
      inputParsingFunction: '',
    };

    const chunks = new Array<string>();
    chunks.push(`function from${shape.censoredName}(input?: ${shape.censoredName} | null): jsonP.JSONValue {`);

    switch (shape.spec.type) {
      case 'structure':
        chunks.push('  if (!input) return input;');
        chunks.push('  return '+this.generateStructureInputTypescript(shape.spec, 'input'));
        break;
      default:
        throw new Error(`TODO: protocol-json.ts lacks shape input generator for ${shape.spec.type}`);
    }

    chunks.push(`}`);
    return {
      inputParsingFunction: chunks.join('\n'),
    };
  }

  generateStructureInputTypescript(inputStruct: Schema.ShapeStructure, rootRef: string): string {
    const chunks = new Array<string>();
    chunks.push(`{...${rootRef},`);
    for (const [field, spec] of Object.entries(inputStruct.members)) {
      const shape = this.shapes.get(spec);

      const isList = shape.spec.type === 'list';
      const isMap = shape.spec.type === 'map';
      let innerShape = shape.spec.type === 'list'
        ? this.shapes.get(shape.spec.member)
        : shape.spec.type === 'map'
        ? this.shapes.get(shape.spec.value)
        : shape;
      let fieldRef = (isList || isMap) ? 'x' : `${rootRef}[${JSON.stringify(field)}]`;

      let encoder = '';
      if (innerShape.spec.type === 'timestamp') {
        const dateFmt = spec.timestampFormat ?? innerShape.spec.timestampFormat ?? 'unixTimestamp';
        encoder = `jsonP.serializeDate_${dateFmt}(${fieldRef})`;
      } else if (innerShape.spec.type === 'blob') {
        encoder = `jsonP.serializeBlob(${fieldRef})`;
      } else if (innerShape.spec.type === 'structure') {
        encoder = `from${innerShape.censoredName}(${fieldRef})`;
      } else if (innerShape.spec.type === 'list') {
        const memShape = this.shapes.get(innerShape.spec.member);
        if (memShape.spec.type === 'structure' && memShape.tags.has('named')) {
          encoder = `x.map(from${memShape.censoredName})`;
        }
      } else if (innerShape.spec.type === 'map') {
        const valShape = this.shapes.get(innerShape.spec.value);
        if (valShape.spec.type === 'structure' && valShape.tags.has('named')) {
          encoder = `jsonP.serializeMap(x, from${valShape.censoredName})`;
        }
      } else if (innerShape.spec.type === 'string' && spec.idempotencyToken) {
        this.helpers.useHelper('generateIdemptToken');
        encoder = `${fieldRef} ?? generateIdemptToken()`;
      }

      if (encoder) {
        if (isList) {
          chunks.push(`    ${field}: ${rootRef}[${JSON.stringify(field)}]?.map(x => ${encoder}),`);
        } else if (isMap) {
          chunks.push(`    ${field}: jsonP.serializeMap(${rootRef}[${JSON.stringify(field)}], x => ${encoder}),`);
        } else {
          chunks.push(`    ${field}: ${encoder},`);
        }
      }
    }
    chunks.push(`  }`);
    return chunks.join('\n');
  }



  generateOperationOutputParsingTypescript(shape: KnownShape, resultWrapper?: string): { outputParsingCode: string; outputVariables: string[]; } {
    if (shape.spec.type !== 'structure') throw new Error(
      `Can only generate top level output structures`);

    const chunks = new Array<string>();
    // chunks.push(`    const xml = await resp.xml(${resultWrapper ? JSON.stringify(resultWrapper) : ''});`);
    if (shape.refCount > 1) {
      chunks.push(`    return from${shape.censoredName}(await resp.json());`);
    } else {
      chunks.push('  '+this.generateStructureOutputTypescript(shape.spec, 'await resp.json()')
        .replace(/\n/g, '\n  '));
    }

    return {
      outputParsingCode: chunks.join('\n'),
      outputVariables: ['body'],
    };
  }

  generateShapeOutputParsingTypescript(shape: KnownShape): { outputParsingFunction: string; } {
    const chunks = new Array<string>();
    const isStruct = shape.spec.type === 'structure';
    chunks.push(`function to${shape.censoredName}(root: jsonP.JSONValue): ${shape.censoredName}${isStruct ? '' : ' | null'} {`);

    switch (shape.spec.type) {
      case 'structure':
        chunks.push(this.generateStructureOutputTypescript(shape.spec, 'root'));
        break;
      case 'string':
        chunks.push(this.generateEnumOutputTypescript(shape.spec, 'root'));
        break;
      default:
        throw new Error(`TODO: protocol-json.ts lacks shape output generator for ${shape.spec.type}`);
    }

    chunks.push(`}`);
    return {
      outputParsingFunction: chunks.join('\n'),
    };
  }

  generateEnumOutputTypescript(spec: Schema.ShapeString, rootRef: string): string {
    const chunks = new Array<string>();
    chunks.push(`  return ( false`);
    for (const ent of spec.enum ?? []) {
      chunks.push(`    || root == ${JSON.stringify(ent)}`);
    }
    chunks.push(`  ) ? root : null;`);
    return chunks.join('\n');
  }

  generateStructureOutputTypescript(outputStruct: Schema.ShapeStructure, rootRef: string): string {
    // Organize fields into basic strings and 'special' others
    // Basic strings can be passed directly from the xml module
    // TODO: support for locationName and maybe even enums, as further strings() arguments
    const required: {[key: string]: string | Symbol} = {};
    let hasRequired = false;
    const optional: {[key: string]: string | Symbol} = {};
    let hasOptional = false;
    const remap: {[key: string]: string} = {};
    let hasRemap = false;
    const arrays = new Set<string>();

    for (const [field, spec] of Object.entries(outputStruct.members)) {
      const isRequired = outputStruct.required?.includes(field);
      let typeSpec: string | Symbol = Symbol.for('TODO');

      const fieldShape = this.shapes.get(spec);
      const defaultName = this.ucfirst(field) ?? field;
      const locationName = this.ucfirst(spec.queryName) ?? spec.locationName ?? fieldShape.spec.locationName ?? defaultName;

      if (fieldShape.spec.type === 'list') {
        arrays.add(field);
      }
      let innerShape = fieldShape.spec.type === 'list'
        ? this.shapes.get(fieldShape.spec.member)
        : fieldShape;

      if (innerShape.tags.has('named')) {
        typeSpec = Symbol.for('to'+innerShape.censoredName);
      } else if (innerShape.spec.type == 'string' && !innerShape.spec.enum) {
        typeSpec = 's';
      } else if (innerShape.isNumberType) {
        typeSpec = 'n';
      } else if (innerShape.spec.type == 'boolean') {
        typeSpec = 'b';
      } else if (innerShape.spec.type == 'blob') {
        typeSpec = 'a';
      } else if (innerShape.spec.type == 'timestamp') {
        typeSpec = 'd';
      } else if (innerShape.spec.type == 'character') {
        typeSpec = 's'; /// only used in test fixtures
      } else if (innerShape.spec.type == 'map') {
        const keyShape = this.shapes.get(innerShape.spec.key);
        const valShape = this.shapes.get(innerShape.spec.value);
        const readKey = keyShape.tags.has('named')
          ? 'to'+keyShape.censoredName
          : 'String';
        const readVal = this.exprReadOutput(valShape);
        typeSpec = Symbol.for(`x => jsonP.readMap(${readKey}, ${readVal}, x)`);
      } else {
        typeSpec = 'TODO_'+innerShape.spec.type;
        // specials.push([field, spec, fieldShape]);
      }

      if (isRequired) {
        required[field] = typeSpec;
        hasRequired = true;
      } else {
        optional[field] = typeSpec;
        hasOptional = true;
      }
      if (locationName !== field) {
        remap[locationName] = field;
      }
    }

    const chunks = new Array<string>();
    chunks.push(`  return jsonP.readObj({`);

    if (hasRequired) {
      chunks.push(`    required: {`);
      for (const [key, spec] of Object.entries(required)) {
        const inner = typeof spec === 'symbol' ? spec.description : JSON.stringify(spec);
        const wrapped = arrays.has(key) ? `[${inner}]` : inner;
        chunks.push(`      ${JSON.stringify(key)}: ${wrapped},`);
      }
      chunks.push(`    },`);
    } else {
      chunks.push(`    required: {},`);
    }

    if (hasOptional) {
      chunks.push(`    optional: {`);
      for (const [key, spec] of Object.entries(optional)) {
        const inner = typeof spec === 'symbol' ? spec.description : JSON.stringify(spec);
        const wrapped = arrays.has(key) ? `[${inner}]` : inner;
        chunks.push(`      ${JSON.stringify(key)}: ${wrapped},`);
      }
      chunks.push(`    },`);
    } else {
      chunks.push(`    optional: {},`);
    }

    if (hasRemap) {
      chunks.push(`    remap: ${JSON.stringify(remap)},`);
    }

    chunks.push(`  }, ${rootRef});`);
    return chunks.join('\n');
  }

  exprReadOutput(shape: KnownShape) {
    const isList = shape.spec.type === 'list';
    const innerShape = shape.spec.type === 'list'
      ? this.shapes.get(shape.spec.member)
      : shape;

    let expr = 'TODO';
    if (innerShape.tags.has('named')) {
      expr = 'to'+innerShape.censoredName;
    } else if (innerShape.isNumberType) {
      expr = 'Number';
    } else if (innerShape.spec.type === 'string') {
      expr = 'String';
    } else if (innerShape.spec.type === 'map') {
      const valShape = this.shapes.get(innerShape.spec.value);
      if (valShape.tags.has('named')) {
        // TODO: is this safe? when would an array have a null?
        expr = `y => jsonP.readMap(String, to${valShape.censoredName}, y)!`;
      }
    }

    if (isList) {
      return `l => Array.isArray(l) ? l.map(${expr}) : []`;
    } else {
      return expr;
    }
  }



  ucfirst(name: string | undefined): string | undefined {
    if (!name) return name;
    return name[0].toUpperCase() + name.slice(1);
  }
}
