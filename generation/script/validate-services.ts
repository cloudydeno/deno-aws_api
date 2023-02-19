#!/usr/bin/env -S deno run --allow-run=deno --allow-write --allow-read

import type * as Schema from '../sdk-schema.ts';
import ServiceCodeGen from '../code-gen.ts';
import * as path from "https://deno.land/std@0.177.0/path/mod.ts";

const testDir = path.join('lib','testgen','services');
await Deno.mkdir(testDir, { recursive: true });

const serviceList = JSON.parse(await Deno.readTextFile('aws-sdk-js/apis/metadata.json')) as Record<string, Schema.ServiceMetadata & {modId: string}>;
const services = new Map<string,typeof serviceList[string]>();
for (const [modId, svc] of Object.entries(serviceList)) {
  svc.modId = modId;
  services.set(modId, svc);
  if (svc.prefix) {
    services.set(svc.prefix, svc);
  }
}

const opts = new URLSearchParams();

const generatedFiles = new Array<string>();

const specSuffix = `.normal.json`;
for await (const entry of Deno.readDir(`./aws-sdk-js/apis`)) {
  if (!entry.name.endsWith(specSuffix)) continue;
  const uid = entry.name.slice(0, -specSuffix.length);
  const service = uid.slice(0, -11);
  const version = uid.slice(-10);

  const svc = services.get(service);
  if (!svc) throw new Error(`Missing service for '${service}'`);

  const jsonPath = (suffix: string) =>
    path.join('aws-sdk-js/apis', `${uid}.${suffix}.json`);
  const maybeReadFile = (path: string): Promise<any> =>
    Deno.readTextFile(path).catch(err => {
      if (err.name === 'NotFound') return null;
      return Promise.reject(err);
    });

  const codeGen = new ServiceCodeGen({
    api: JSON.parse(await Deno.readTextFile(jsonPath('normal'))) as Schema.Api,
    pagers: JSON.parse(await maybeReadFile(jsonPath('paginators'))) as Schema.Pagination,
    waiters: JSON.parse(await maybeReadFile(jsonPath('waiters2'))) as Schema.Waiters,
  }, opts);

  const code = codeGen.generateTypescript(svc.name);
  await Deno.writeTextFile(path.join(testDir, `${uid}.ts`), code);

  generatedFiles.push(`./${uid}.ts`);
}

await Deno.writeTextFile(path.join(testDir, 'mod.ts'), generatedFiles
  .map(x => `import {} from ${JSON.stringify(x)}`)
  .join('\n'));


const cacheStart = Date.now();
const child = await Deno.run({
  cmd: ["deno", "cache", path.join(testDir, 'mod.ts')],
}).status();
const cacheEnd = Date.now();
console.log('Cached in', Math.round((cacheEnd - cacheStart) / 1000), 'seconds');
Deno.exit(child.code);
