import * as path from "https://deno.land/std@0.86.0/path/mod.ts";
import type * as Schema from './sdk-schema.ts';
import ServiceCodeGen from './code-gen.ts';

if (Deno.args.length !== 2) {
  console.error(`Usage:`);
  console.error(`  ${Deno.mainModule} <apis path> <api uid> [out path (TODO)]`);
  console.error(`Examples:`);
  console.error(`  ${Deno.mainModule} apis-v2.761.0 sns-2010-03-31`);
  console.error(``);
  Deno.exit(1);
}
const apisPath = Deno.args[0];
const apiUid = Deno.args[1];

const jsonPath = (suffix: string) =>
  path.join(apisPath, `${apiUid}.${suffix}.json`);
const maybeReadFile = (path: string): Promise<any> =>
  Deno.readTextFile(path).catch(err => {
    if (err.name === 'NotFound') return null;
    return Promise.reject(err);
  });

console.log('Reading', apiUid, 'specs...');
const codeGen = new ServiceCodeGen({
  uid: apiUid,
  api: JSON.parse(await Deno.readTextFile(jsonPath('normal'))) as Schema.Api,
  pagers: JSON.parse(await maybeReadFile(jsonPath('paginators'))) as Schema.Pagination,
  waiters: JSON.parse(await maybeReadFile(jsonPath('waiters2'))) as Schema.Waiters,
});

// TODO: use metadata.json's "name" probably
const apiCamelName = codeGen.apiSpec.metadata.serviceId.split(' ').map(x => x[0].toUpperCase()+x.slice(1)).join('');

const svcMetadata = codeGen.apiSpec.metadata;
const modName = `${svcMetadata.endpointPrefix}@${svcMetadata.apiVersion}.ts`;
console.log('Writing', modName);
await Deno.writeTextFile(path.join('lib', 'services', modName), codeGen.generateTypescript(apiCamelName));
