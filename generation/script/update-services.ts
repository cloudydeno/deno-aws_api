import { readCSVObjects, writeCSVObjects } from "https://deno.land/x/csv@v0.4.0/mod.ts";
import * as path from "https://deno.land/std@0.71.0/path/mod.ts";
import ServiceCodeGen from '../code-gen.ts';
import type * as Schema from '../sdk-schema.ts';

const header = [
  "service", "uid", "fullname", "id", "namespace", "protocol",
  "generated", "typechecked", "bytecount", "cachetime",
];
interface ServiceEntry {
  service: string;
  uid: string;
  fullname: string;
  id: string;
  namespace: string;
  protocol: string;

  generated: string;
  typechecked: string;
  bytecount: string;
  cachetime: string;
}
const services: Record<string, ServiceEntry> = {};

const f = await Deno.open("./grid-services.csv");
for await (const obj of readCSVObjects(f)) {
  services[obj.uid] = obj as unknown as ServiceEntry;
}
f.close();

const serviceList = JSON.parse(await Deno.readTextFile('./aws-sdk-js/apis/metadata.json')) as Schema.MetadataListing;
for (const svc of Object.values(serviceList)) {
  if (svc.prefix) {
    serviceList[svc.prefix] = svc;
  }
}

const specSuffix = `.normal.json`;
for await (const entry of Deno.readDir(`./aws-sdk-js/apis`)) {
  if (!entry.name.endsWith(specSuffix)) continue;
  const uid = entry.name.slice(0, -specSuffix.length);
  if (!(uid in services)) {
    const service = uid.slice(0, -11);
    const apiSpec = JSON.parse(await Deno.readTextFile('./aws-sdk-js/apis/'+entry.name)) as Schema.Api;

    services[uid] = {
      service, uid,
      fullname: apiSpec.metadata.serviceFullName,
      id: apiSpec.metadata.serviceId,
      namespace: serviceList[service].name,
      protocol: apiSpec.metadata.protocol,

      generated: '',
      typechecked: '',
      bytecount: '',
      cachetime: '',
    };
  }

  const service = services[uid];
  if (!['ec2', 'query'].includes(service.protocol)) continue;

  let modPath: string;
  let byteCount: number;
  try {
    [modPath, byteCount] = await generateApi('aws-sdk-js/apis', uid, service.namespace);
    service.bytecount = byteCount.toString();
    service.generated = 'ok';
  } catch (err) {
    console.log(uid, 'build fail:', err.message);
    service.generated = 'fail';
    continue;
  }

  const cacheStart = new Date;
  const cache = Deno.run({
    cmd: ["deno", "cache", modPath],
    stderr: 'piped'
  });
  const { code } = await cache.status();
  const cacheEnd = new Date;

  if (code !== 0) {
    console.log(uid, 'cache fail code', code);
    service.typechecked = 'fail';
    continue;
  }
  const checkOutput = new TextDecoder().decode(await cache.stderrOutput())
  if (!checkOutput) continue;
  console.log(checkOutput.trimEnd());

  service.typechecked = 'ok';
  service.cachetime = (cacheEnd.valueOf() - cacheStart.valueOf()).toString();
}


const fOut = await Deno.open("./grid-services.csv", { write: true, create: true, truncate: true });
const asyncObjectsGenerator = async function*() {
  for (const service of Object.values(services)) {
    yield service as unknown as {[key: string]: string};
  }
}
await writeCSVObjects(fOut, asyncObjectsGenerator(), { header });
fOut.close();



async function generateApi(apisPath: string, apiUid: string, namespace: string): Promise<[string, number]> {
  const jsonPath = (suffix: string) =>
    path.join(apisPath, `${apiUid}.${suffix}.json`);
  const maybeReadFile = (path: string): Promise<any> =>
    Deno.readTextFile(path).catch(err => {
      if (err.name === 'NotFound') return null;
      return Promise.reject(err);
    });

  console.log('Reading', apiUid, 'specs...');
  const codeGen = new ServiceCodeGen({
    api: JSON.parse(await Deno.readTextFile(jsonPath('normal'))) as Schema.Api,
    pagers: JSON.parse(await maybeReadFile(jsonPath('paginators'))) as Schema.Pagination,
    waiters: JSON.parse(await maybeReadFile(jsonPath('waiters2'))) as Schema.Waiters,
  });

  const svcMetadata = codeGen.apiSpec.metadata;
  const modName = `${svcMetadata.endpointPrefix}@${svcMetadata.apiVersion}.ts`;

  console.log('Writing', modName);
  const modPath = path.join('lib', 'services', modName);
  const modCode = codeGen.generateTypescript(namespace);
  await Deno.writeTextFile(modPath, modCode);
  return [modPath, modCode.length];
}

// async function cacheApi()
