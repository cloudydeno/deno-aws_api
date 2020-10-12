import { readCSVObjects, writeCSVObjects } from "https://deno.land/x/csv@v0.4.0/mod.ts";
import * as path from "https://deno.land/std@0.71.0/path/mod.ts";
import ServiceCodeGen from '../code-gen.ts';
import type * as Schema from '../sdk-schema.ts';

const header = [
  "service", "version", "fullname", "id", "namespace", "protocol",
  "generated", "typechecked", "bytecount", "cachetime",
];
interface ServiceEntry {
  service: string;
  version: string;
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

function canBuild(svc: ServiceEntry) {

  // post urlencoded, receive XML
  if (svc.protocol === 'query') return true;
  if (svc.protocol === 'ec2') return true;

  // trialing 'json' - post/receive plain JSON
  if (svc.service === 'dynamodb') return true;
  if (svc.service === 'kinesis') return true;

  return false;
}

const f = await Deno.open("./grid-services.csv");
for await (const obj of readCSVObjects(f)) {
  services[`${obj.service}@${obj.version}`] = obj as unknown as ServiceEntry;
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
  const service = uid.slice(0, -11);
  const version = uid.slice(-10);

  if (!(`${service}@${version}` in services)) {
    const apiSpec = JSON.parse(await Deno.readTextFile('./aws-sdk-js/apis/'+entry.name)) as Schema.Api;

    services[`${service}@${version}`] = {
      service, version,
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

  const svc = services[`${service}@${version}`];
  if (!canBuild(svc)) continue;

  let modPath: string;
  let byteCount: number;
  try {
    [modPath, byteCount] = await generateApi('aws-sdk-js/apis', uid, svc.namespace);
    svc.bytecount = byteCount.toString();
    svc.generated = 'ok';
  } catch (err) {
    console.log(`${service}@${version}`, 'build fail:', err.message);
    svc.generated = 'fail';
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
    console.log(`${service}@${version}`, 'cache fail code', code);
    svc.typechecked = 'fail';
    continue;
  }
  const checkOutput = new TextDecoder().decode(await cache.stderrOutput())
  if (!checkOutput) continue;
  console.log(checkOutput.trimEnd());

  svc.typechecked = 'ok';
  svc.cachetime = (cacheEnd.valueOf() - cacheStart.valueOf()).toString();
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

  const codeGen = new ServiceCodeGen({
    uid: apiUid,
    api: JSON.parse(await Deno.readTextFile(jsonPath('normal'))) as Schema.Api,
    pagers: JSON.parse(await maybeReadFile(jsonPath('paginators'))) as Schema.Pagination,
    waiters: JSON.parse(await maybeReadFile(jsonPath('waiters2'))) as Schema.Waiters,
  });

  const service = apiUid.slice(0, -11);
  const version = apiUid.slice(-10);
  const modName = `${service}@${version}.ts`;

  console.log('Writing', modName);
  const modPath = path.join('lib', 'services', modName);
  const modCode = codeGen.generateTypescript(namespace);
  await Deno.writeTextFile(modPath, modCode);
  return [modPath, modCode.length];
}

// async function cacheApi()
