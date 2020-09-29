import type * as Schema from './sdk-schema.ts';
import type ShapeLibrary from './shape-library.ts';
import type { KnownShape } from './shape-library.ts';

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

import * as uuid from "https://deno.land/std/uuid/mod.ts";
let fixedIdemptToken: string | undefined;
function generateIdemptToken() {
  return fixedIdemptToken ?? uuid.v4.generate();
}

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
            chunks.push(this.generateStructureTypescript(shape.spec, paramRef, prefix+locationName+'.'));
            if (isRequired) chunks.push(`    }`);
          }
          break;
        default:
          console.log('TODO:', shape.spec.type)
          chunks.push(`    ${isRequired ? '' : `if (${paramRef} !== undefined) `}body.append(prefix+${JSON.stringify(prefix+locationName)}, /*TODO: ${shape.spec.type}*/String(${paramRef}));`);
      }
    }

    return chunks.join('\n');
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
