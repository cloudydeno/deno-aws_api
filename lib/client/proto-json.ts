import type { JSONValue } from "./json.ts";

export function serializeDate_unixTimestamp(input: Date | number | null | undefined): JSONValue {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return Math.floor(date.valueOf() / 1000);
}
export function serializeDate_iso8601(input: Date | number | null | undefined): JSONValue {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return date.toISOString();
}
export function serializeDate_rfc822(input: Date | number | null | undefined): JSONValue {
  if (input == null) return input;
  const date = typeof input === 'number' ? new Date(input*1000) : input;
  return date.toUTCString();
}

import * as Base64 from 'https://deno.land/x/base64@v0.2.1/mod.ts';
export function serializeBlob(input: string | Uint8Array | null | undefined): JSONValue {
  if (!input) return input;
  if (typeof input === 'string') {
    input = new TextEncoder().encode(input);
  }
  return Base64.fromUint8Array(input);
}

export function serializeMap<T,U extends JSONValue>(input: {[key: string]: T} | null | undefined, encoder: (x: T) => U): JSONValue {
  if (input == null) return input;
  const map: {[key: string]: U} = Object.create(null);
  for (const [key, val] of Object.entries(input)) {
    map[key] = encoder(val);
  }
  return map;
}

export function readMap<K extends string,V>(keyEncoder: (x: string) => K, valEncoder: (x: JSONValue) => V, input: JSONValue): Record<K,V> | null {
  if (input == null) return null;
  const map: Record<K,V> = Object.create(null);
  for (const [key, val] of Object.entries(input)) {
    map[keyEncoder(key)] = valEncoder(val);
  }
  return map;
}
