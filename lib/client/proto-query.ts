import type { XmlNode } from "./common.ts";

export function appendMap<T>(body: URLSearchParams, prefix: string, raw: {[k:string]:T}, {
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

export function appendList<T>(body: URLSearchParams, prefix: string, raw: T[], {
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
export function encodeBlob(input?: string | Uint8Array | null): string {
  if (!input) return '';
  if (typeof input === 'string') {
    input = new TextEncoder().encode(input);
  }
  return Base64.fromUint8Array(input);
}

// TODO?: check/warn for accidental millisecond input
export function encodeDate_iso8601(input?: Date | number | null): string {
  if (!input) return '';
  const date = (typeof input === 'number') ? new Date(input*1000) : input;
  return date.toISOString().replace(/\.000Z$/, 'Z');
}
export function encodeDate_unixTimestamp(input?: Date | number | null): string {
  if (!input) return '';
  if (typeof input === 'number') return input.toString();
  return (input.valueOf() / 1000).toString();
}
// also rfc822 (toUTCString)

export function readXmlMap<K extends string,T>(entries: XmlNode[], valMapper: (node: XmlNode) => T, {keyName='key', valName='value'}: {keyName?: string, valName?: string}): Record<K, T> {
  const obj: Record<K, T> = Object.create(null);
  for (const entry of entries) {
    obj[entry.first(keyName, true, x => (x.content ?? '') as K)] = entry.first(valName, true, valMapper);
  }
  return obj;
}

export function parseTimestamp(str: string | undefined): Date {
  if (str?.includes('T')) return new Date(str);
  if (str?.length === 10) return new Date(parseInt(str) * 1000)
  throw new Error(`Timestamp from server is unparsable: '${str}'`);
}
