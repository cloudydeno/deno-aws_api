import type * as Schema from './sdk-schema.ts';
import type ShapeLibrary from './shape-library.ts';
import type { KnownShape } from './shape-library.ts';

// "query" and also "ec2" which is based on "query"
export default class ProtocolQueryCodegen {
  shapes: ShapeLibrary;
  ec2Mode: boolean;
  constructor(shapes: ShapeLibrary, {ec2}: {ec2?: boolean}={}) {
    this.shapes = shapes;
    this.ec2Mode = ec2 ?? false;
  }

  requestBodyTypeName = 'URLSearchParams';
  // availableHelpers = new Map([]);
  globalHelpers = `

function appendMap<T>(body: URLSearchParams, prefix: string, raw: {[k:string]:T}, {
  keyName = '.key',
  valName = '.value',
  entryPrefix,
  appender,
  encoder = String,
}: {
  keyName?: string;
  valName?: string;
  entryPrefix: string;
  appender?: (body: URLSearchParams, prefix: string, val: T) => void;
  encoder?: (val: T) => string;
}) {
  const entries = Object.entries(raw ?? {});
  if (entries.length === 0) {
    return body.append(prefix, '');
  }
  entries.forEach(([key, val], idx) => {
    body.append(prefix+entryPrefix+String(idx+1)+keyName, key);
    if (appender) {
      appender(body, prefix+entryPrefix+String(idx+1)+valName, val);
    } else {
      body.append(prefix+entryPrefix+String(idx+1)+valName, encoder(val));
    }
  });
}

function appendList<T>(body: URLSearchParams, prefix: string, raw: T[], {
  entryPrefix,
  appender,
  encoder = String,
}: {
  entryPrefix: string;
  appender?: (body: URLSearchParams, prefix: string, val: T) => void;
  encoder?: (val: T) => string;
}) {
  const entries = raw ?? [];
  if (entries.length === 0) {
    return body.append(prefix, '');
  }
  entries.forEach(appender
    ? (member, idx) => {
        appender(body, prefix+entryPrefix+String(idx+1), member);
      }
    : (member, idx) => {
        body.append(prefix+entryPrefix+String(idx+1), encoder(member));
      });
}

import * as Base64 from 'https://deno.land/x/base64@v0.2.1/mod.ts';
function encodeBlob(input?: string | Uint8Array): string {
  if (!input) return '';
  if (typeof input === 'string') {
    input = new TextEncoder().encode(input);
  }
  return Base64.fromUint8Array(input);
}

// TODO?: check/warn for accidental millisecond input
function encodeDate_iso8601(input?: Date | number): string {
  if (!input) return '';
  const date = (typeof input === 'number') ? new Date(input*1000) : input;
  return date.toISOString().replace(/\.000Z$/, 'Z');
}
function encodeDate_unixTimestamp(input?: Date | number): string {
  if (!input) return '';
  if (typeof input === 'number') return input.toString();
  return (input.valueOf() / 1000).toString();
}
// also rfc822 (toUTCString)

import * as uuidv4 from "https://deno.land/std@0.71.0/uuid/v4.ts";
let fixedIdemptToken: string | undefined;
function generateIdemptToken() {
  return fixedIdemptToken ?? uuidv4.generate();
}

`;

  generateOperationInputParsingTypescript(inputShape: Schema.ApiShape): { inputParsingCode: string; inputVariables: string[]; } {
    if (inputShape.type !== 'structure') throw new Error(
      `Can only generate top level structures`);

    const chunks = new Array<string>();
    chunks.push(`    const body = new URLSearchParams;`);
    chunks.push(`    const prefix = '';`);

    chunks.push(this.generateStructureInputTypescript(inputShape, "params", ''));

    return {
      inputParsingCode: chunks.join('\n'),
      inputVariables: ['body'],
    };
  }

  generateShapeInputParsingTypescript(shape: KnownShape): { inputParsingFunction: string; } {
    const chunks = new Array<string>();
    chunks.push(`function ${shape.censoredName}_Serialize(body: URLSearchParams, prefix: string, params: ${shape.censoredName}) {`);

    switch (shape.spec.type) {
      case 'structure':
        chunks.push(this.generateStructureInputTypescript(shape.spec, "params", '.'));
        break;
      default:
        throw new Error(`TODO: protocol-query.ts lacks shape generator for ${shape.spec.type}`);
    }

    chunks.push(`}`);
    return {
      inputParsingFunction: chunks.join('\n'),
    };
  }

  generateStructureInputTypescript(inputStruct: Schema.ShapeStructure, paramsRef = "params", prefix = ""): string {
    const chunks = new Array<string>();

    for (const [field, spec] of Object.entries(inputStruct.members)) {
      const shape = this.shapes.get(spec);
      const defaultName = this.ucfirst(field, false);
      const locationName = this.ucfirst(spec.queryName, true) ?? this.ucfirst(spec.locationName, false) ?? shape.spec.locationName ?? defaultName;
      const isRequired = (inputStruct.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
      const paramRef = `${paramsRef}[${JSON.stringify(field)}]`;

      switch (shape.spec.type) {
        // case 'boolean':
        //   chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(${JSON.stringify(locationName)}, ${paramRef});`);
        case 'list':
          const listConfig: any = {};
          // if (shape.spec.member.locationName) listConfig.entName = '.'+shape.spec.member.locationName;
          const flattenedlist = shape.spec.flattened ?? this.ec2Mode;
          // console.log(shape.name, [spec.queryName, spec.locationName, shape.spec.locationName, defaultName])
          const listPrefix = flattenedlist
            ? spec.queryName ?? spec.locationName ?? shape.spec.locationName ?? shape.spec.member.locationName ?? defaultName
            : spec.queryName ?? spec.locationName ?? defaultName;
          listConfig.entryPrefix = flattenedlist
            ? '.'
            : `.${shape.spec.locationName ?? shape.spec.member.locationName ?? 'member'}.`;
          const innerShape = this.shapes.get(shape.spec.member);
          chunks.push(`    if (${paramRef}) appendList(body, prefix+${JSON.stringify(prefix+listPrefix)}, ${paramRef}, ${configureInnerShapeEncoding(innerShape, listConfig)})`);
          break;
        case 'map':
          const mapConfig: any = {};
          if (shape.spec.key.locationName) mapConfig.keyName = '.'+shape.spec.key.locationName;
          if (shape.spec.value.locationName) mapConfig.valName = '.'+shape.spec.value.locationName;
          const flattenedMap = shape.spec.flattened ?? this.ec2Mode;
          const mapPrefix = flattenedMap
            ? spec.queryName ?? spec.locationName ?? shape.spec.locationName ?? defaultName
            : spec.queryName ?? spec.locationName ?? defaultName;
          mapConfig.entryPrefix = flattenedMap
            ? '.'
            : `.${shape.spec.locationName ?? 'entry'}.`;
          const valueShape = this.shapes.get(shape.spec.value);
          chunks.push(`    if (${paramRef}) appendMap(body, prefix+${JSON.stringify(prefix+mapPrefix)}, ${paramRef}, ${configureInnerShapeEncoding(valueShape, mapConfig)})`);
          break;
        case 'string':
          if (spec.idempotencyToken) {
            chunks.push(`    body.append(prefix+${JSON.stringify(prefix+locationName)}, (${paramRef} ?? generateIdemptToken()).toString());`);
            break;
          } // fallthrough
        case 'boolean':
        case 'integer':
        case 'float':
        case 'double':
        case 'long':
          chunks.push(`    ${isRequired ? '' : `if (${JSON.stringify(field)} in params) `}body.append(prefix+${JSON.stringify(prefix+locationName)}, (${paramRef} ?? '').toString());`);
          break;
        case 'blob':
          chunks.push(`    ${isRequired ? '' : `if (${JSON.stringify(field)} in params) `}body.append(prefix+${JSON.stringify(prefix+locationName)}, encodeBlob(${paramRef}));`);
          break;
        case 'timestamp':
          const dateFmt = spec.timestampFormat ?? shape.spec.timestampFormat ?? 'iso8601';
          chunks.push(`    ${isRequired ? '' : `if (${JSON.stringify(field)} in params) `}body.append(prefix+${JSON.stringify(prefix+locationName)}, encodeDate_${dateFmt}(${paramRef}));`);
          break;
        case 'structure':
          if (shape.tags.has('named')) {
            chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}${shape.censoredName}_Serialize(body, prefix+${JSON.stringify(prefix+locationName)}, ${paramRef});`);
          } else {
            if (isRequired) chunks.push(`    if (${paramRef}) {`);
            chunks.push(this.generateStructureInputTypescript(shape.spec, paramRef, prefix+locationName+'.'));
            if (isRequired) chunks.push(`    }`);
          }
          break;
        default:
          chunks.push(`    // TODO: appending for ${(shape as KnownShape).spec.type}`);
      }
    }

    return chunks.join('\n');
  }






  generateOperationOutputParsingTypescript(outputShape: Schema.ApiShape): { outputParsingCode: string; outputVariables: string[]; } {
    if (outputShape.type !== 'structure') throw new Error(
      `Can only generate top level structures`);

    const chunks = new Array<string>();
    // chunks.push(`    const body = new URLSearchParams;`);
    // chunks.push(`    const prefix = '';`);

    chunks.push('  '+this.generateStructureOutputTypescript(outputShape, 'xml').replace(/\n/g, '\n  '));

    return {
      outputParsingCode: chunks.join('\n'),
      outputVariables: ['body'],
    };
  }

  generateShapeOutputParsingTypescript(shape: KnownShape): { outputParsingFunction: string; } {
    const chunks = new Array<string>();
    chunks.push(`function ${shape.censoredName}_Parse(node: XmlNode): ${shape.censoredName} {`);

    switch (shape.spec.type) {
      case 'structure':
        chunks.push(this.generateStructureOutputTypescript(shape.spec, 'node'));
        break;
      default:
        throw new Error(`TODO: protocol-query.ts lacks shape output generator for ${shape.spec.type}`);
    }

    chunks.push(`}`);
    return {
      outputParsingFunction: chunks.join('\n'),
    };
  }

  generateStructureOutputTypescript(outputStruct: Schema.ShapeStructure, nodeRef: string): string {
    // Organize fields into basic strings and 'special' others
    // Basic strings can be passed directly from the xml module
    // TODO: support for locationName and maybe even enums, as further strings() arguments
    const reqStrings: {[key: string]: true} = {};
    let hasRequiredStrs = false;
    const optStrings: {[key: string]: true} = {};
    let hasOptionalStrs = false;
    const specials: Array<[string, Schema.StructureFieldDetails, KnownShape]> = [];
    for (const [field, spec] of Object.entries(outputStruct.members)) {
      const fieldShape = this.shapes.get(spec);
      const defaultName = this.ucfirst(field, false);
      const locationName = this.ucfirst(spec.queryName, true) ?? spec.locationName ?? fieldShape.spec.locationName ?? defaultName;
      if (fieldShape.spec.type == 'string' && !fieldShape.spec.enum && (!locationName || locationName === field)) {
        if (outputStruct.required?.includes(field)) {
          reqStrings[field] = true;
          hasRequiredStrs = true;
        } else {
          optStrings[field] = true;
          hasOptionalStrs = true;
        }
        continue;
      } else {
        specials.push([field, spec, fieldShape]);
      }
    }

    const chunks = new Array<string>();

    // Simplified statement if no fields need individual treatment
    if (specials.length === 0) {
      if (hasOptionalStrs || hasRequiredStrs) {
        chunks.push(`  return ${nodeRef}.strings({`);
        if (hasRequiredStrs) chunks.push(`    required: ${JSON.stringify(reqStrings)},`);
        if (hasOptionalStrs) chunks.push(`    optional: ${JSON.stringify(optStrings)},`);
        chunks.push(`  });`);
        return chunks.join('\n');
      } else {
        return `  return {};`;
      }
    }

    // Full construction :) start an object
    chunks.push('  return {');

    if (hasOptionalStrs || hasRequiredStrs) {
      chunks.push(`    ...${nodeRef}.strings({`);
      if (hasRequiredStrs) chunks.push(`      required: ${JSON.stringify(reqStrings)},`);
      if (hasOptionalStrs) chunks.push(`      optional: ${JSON.stringify(optStrings)},`);
      chunks.push(`    }),`);
    }

    for (const [field, spec, shape] of specials) {
      const defaultName = this.ucfirst(field, false);
      const locationName = this.ucfirst(spec.queryName, true) ?? spec.locationName ?? shape.spec.locationName ?? defaultName;
      const isRequired = (outputStruct.required ?? []).map(x => x.toLowerCase()).includes(field.toLowerCase());
      // const paramRef = `${paramsRef}[${JSON.stringify(field)}]`;

      switch (shape.spec.type) {

        case 'list':
          const flattenedlist = shape.spec.flattened;
          // console.log(shape.name, [spec.queryName, spec.locationName, shape.spec.locationName, defaultName])
          const listPrefix = flattenedlist
            ? spec.queryName ?? spec.locationName ?? shape.spec.locationName ?? shape.spec.member.locationName ?? defaultName
            : spec.queryName ?? spec.locationName ?? defaultName;
          const entryPath = [listPrefix];
          if (!flattenedlist)
            entryPath.push(shape.spec.locationName ?? shape.spec.member.locationName ?? 'member');

          const innerShape = this.shapes.get(shape.spec.member);
          // console.log([listPrefix, entryPrefix, innerShape.spec.type, innerShape.spec.locationName]);

          chunks.push(`    ${field}: ${nodeRef}.getList(${entryPath.map(x => JSON.stringify(x)).join(', ')}).map(${configureInnerShapeReading(innerShape)}),`);
          break;

        default:
          chunks.push(`    ${field}: ${nodeRef}.first(${JSON.stringify(locationName)}, ${isRequired}, ${configureInnerShapeReading(shape)}),`);
          // chunks.push(`    // TODO: reading for ${(shape as KnownShape).spec.type}`);
      }
    }

    chunks.push('  };');
    return chunks.join('\n');
  }




  ucfirst(name: string | undefined, isQueryName = false): string | undefined {
    if (!name) return name;
    if (isQueryName || !this.ec2Mode) {
      return name;
    } else {
      return name[0].toUpperCase() + name.slice(1);
    }
  }

};

function configureInnerShapeEncoding(innerShape: KnownShape, extraConfig: any) {
  let confExtras = '';
  switch (innerShape.spec.type) {
    case 'blob':
      confExtras += `"encoder":encodeBlob,`;
      break;
    case 'timestamp':
      const dateFmt = innerShape.spec.timestampFormat ?? 'iso8601';
      confExtras += `"encoder":encodeDate_${dateFmt},`;
      break;
    case 'structure':
      if (innerShape.tags.has('named')) {
        confExtras += `"appender":${innerShape.censoredName}_Serialize,`;
        break;
      } else {
        throw new Error(`Structure ${innerShape.name} is used in a list but wasn't named`);
      }
  }
  // sue me
  return '{' + confExtras + JSON.stringify(extraConfig).slice(1);
}

function configureInnerShapeReading(innerShape: KnownShape) {
  switch (innerShape.spec.type) {
    case 'string':
      if (innerShape.spec.enum) {
        // TODO: is there a better way of mapping freetext into enums?
        if (innerShape.tags.has('named')) {
          return `x => (x.content ?? '') as ${innerShape.censoredName}`;
        } else {
          return `x => (x.content ?? '') as ${innerShape.spec.enum.map(x => JSON.stringify(x)).join(' | ')}`;
        }
      }
      return `x => x.content ?? ''`;
    case 'character':
      return `x => x.content ?? ''`;
    case 'boolean':
      return `x => x.content === 'true'`;
    case 'integer':
    case 'long':
      return `x => parseInt(x.content ?? '0')`;
    case 'float':
    case 'double':
      return `x => parseFloat(x.content ?? '0')`;
    case 'blob':
      return `x => Base64.toUint8Array(x.content ?? '')`;
    case 'timestamp':
      return `() => (0) /* TODO: timestamp output */`; // TODO
    case 'map':
      return `() => ({}) /* TODO: map output */`; // TODO
    case 'structure':
      if (innerShape.tags.has('named')) {
        return `${innerShape.censoredName}_Parse`;
      } else {
        throw new Error(`Structure ${innerShape.name} is used in an output list but wasn't named`);
      }
  }
  // sue me
  return `x => x /* TODO: ${innerShape.spec.type} output*/`;
  // return '{' + confExtras + JSON.stringify(extraConfig).slice(1);
}
