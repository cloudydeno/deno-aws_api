import * as Base64 from 'https://deno.land/x/base64@v0.2.1/mod.ts';

export function encodePath(
  strings: TemplateStringsArray,
  ...names: (string | number | boolean | string[])[]
): string {
  return String.raw(strings, ...names.map((x) =>
    Array.isArray(x)
      ? x.map(encodeURIComponent).join("/")
      : encodeURIComponent(x.toString())
  ));
}


// Semi-questionable method of expressing an "open string union" in Typescript
export type UnexpectedEnumValue = string & {unexpected: never};
export function readEnum<T extends string>(raw: unknown): T | null {
  if (typeof raw === "string") return raw as T;
  return null;
}


export function readNum(raw: string | null | undefined): number | null | undefined {
  if (raw == null) return raw;
  const num = parseFloat(raw);
  if (isNaN(num)) throw new Error(`readNum gave NaN on ${raw}`);
  return num;
}


export function readBool(raw: string | null | undefined): boolean | null | undefined {
  if (raw == null) return raw;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  throw new Error(`readBool didn't recognize ${raw}`);
}


export function serializeDate_unixTimestamp(input: Date | number | null | undefined) {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return Math.floor(date.valueOf() / 1000);
}

export function serializeDate_iso8601(input: Date | number | null | undefined) {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return date.toISOString().replace(/\.000Z$/, 'Z');
}

export function serializeDate_rfc822(input: Date | number | null | undefined) {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return date.toUTCString();
}


export function readTimestamp(str: string | null | undefined) {
  if (str == null) return str;
  const date =
      (str?.includes('T'))
    ? new Date(str)
    : (str?.length === 10)
    ? new Date(parseInt(str) * 1000)
    : null;
  if (!date || isNaN(date.valueOf())) throw new Error(
    `Timestamp from server is unparsable: '${str}'`);
  return date;
}

export function readReqTimestamp(str: string | null | undefined) {
  if (str == null) throw new Error(`Expected timestamp from server. TODO: better error reporting`);
  const date =
      (str?.includes('T'))
    ? new Date(str)
    : (str?.length === 10)
    ? new Date(parseInt(str) * 1000)
    : null;
  if (!date || isNaN(date.valueOf())) throw new Error(
    `Timestamp from server is unparsable: '${str}'`);
  return date;
}


export function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (!input) return input;
  if (typeof input === 'string') {
    input = new TextEncoder().encode(input);
  }
  return Base64.fromUint8Array(input);
}


export function toJsObj<T,U>(
  input: Iterable<[string, T]>,
  keyFilter: true | string | ((k: string) => string | boolean),
  valEncoder: (v: T) => U,
): Record<string, U | undefined> {
  const obj: Record<string, U | undefined> = Object.create(null);
  if (typeof keyFilter === 'string') {
    const keyPrefix = keyFilter;
    keyFilter = (key) => key.startsWith(keyPrefix) ? key.slice(keyPrefix.length) : false;
  }
  for (const [key, val] of input) {
    const keyOut = keyFilter === true || keyFilter(key);
    if (keyOut === false) continue;
    obj[keyOut === true ? key : keyOut] = valEncoder(val);
  }
  return obj;
}


// Functions used in fixture testing
export function testTransformJsObj(obj: {[key: string]: any}) {
  const res: {[key: string]: any} = Object.create(null);
  for (const [key, val] of Object.entries(obj)) {
    res[key] = testTransformJsVal(val);
  }
  return res;
}
export function testTransformJsVal(val: any): any {
  if (val?.constructor === Object) {
    return testTransformJsObj(val);
  } else if (val && typeof val.constructor !== 'function') {
    return testTransformJsObj(val);
  } else if (val?.constructor === Date) {
    return Math.floor(val.valueOf() / 1000);
  } else if (val?.constructor === Uint8Array) {
    return new TextDecoder('utf-8').decode(val);
  } else if (val?.constructor === Array) {
    return val.map(testTransformJsVal);
  } else {
    return val;
  }
}
