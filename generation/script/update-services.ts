import { readCSVObjects, writeCSVObjects } from "https://deno.land/x/csv@v0.6.0/mod.ts";
import * as path from "https://deno.land/std@0.140.0/path/mod.ts";
import ServiceCodeGen from '../code-gen.ts';
import type * as Schema from '../sdk-schema.ts';

const header = [
  "service", "version", "fullname", "id", "namespace", "protocol",
  "generated", "typechecked",
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
}
const services: Record<string, ServiceEntry> = {};

const f = await Deno.open("./grid-services.csv");
for await (const obj of readCSVObjects(f)) {
  services[`${obj.service}@${obj.version}`] = obj as unknown as ServiceEntry;
}
f.close();

const serviceList = JSON.parse(await Deno.readTextFile('./aws-sdk-js/apis/metadata.json')) as Record<string, Schema.ServiceMetadata & {modId: string}>;
for (const [modId, svc] of Object.entries(serviceList)) {
  svc.modId = modId;
}
for (const svc of Object.values(serviceList)) {
  if (svc.prefix) {
    serviceList[svc.prefix] = svc;
  }
}

const opts = new URLSearchParams();
// opts.set('docs', 'short');

const specSuffix = `.normal.json`;
const specificServices = Deno.args[0]?.split(',');
const relevantServices = new Map<string,ServiceEntry>();
for await (const entry of Deno.readDir(`./aws-sdk-js/apis`)) {
  if (!entry.name.endsWith(specSuffix)) continue;
  const uid = entry.name.slice(0, -specSuffix.length);
  const service = uid.slice(0, -11);
  const version = uid.slice(-10);

  if (specificServices && !specificServices.includes(service)) {
    delete services[`${service}@${version}`];
    continue;
  }

  if (!(`${service}@${version}` in services)) {
    const apiSpec = JSON.parse(await Deno.readTextFile('./aws-sdk-js/apis/'+entry.name)) as Schema.Api;

    services[`${service}@${version}`] = {
      service, version,
      fullname: apiSpec.metadata.serviceFullName,
      id: '',
      namespace: '',
      protocol: apiSpec.metadata.protocol,

      generated: '',
      typechecked: '',
    };
  }

  const existing = relevantServices.get(service);
  if (existing) {
    if (existing.version > version) continue;
  }
  relevantServices.set(service, services[`${service}@${version}`]);
}

for (const svc of relevantServices.values()) {
  const uid = `${svc.service}-${svc.version}`;
  svc.id = serviceList[svc.service].modId;
  svc.namespace = serviceList[svc.service].name;

  let modPath: string;
  try {
    modPath = await generateApi('aws-sdk-js/apis', uid, svc.namespace, svc.id);
    svc.generated = 'ok';
  } catch (err) {
    console.log(`${svc.service}@${svc.version}`, 'build fail:', err.message);
    svc.generated = 'fail';
    continue;
  }

  const cache = Deno.run({
    cmd: ["deno", "cache", modPath],
    stderr: 'piped'
  });
  const checkOutput = new TextDecoder().decode(await cache.stderrOutput())
  const { code } = await cache.status();

  if (code !== 0) {
    console.log(`${svc.service}@${svc.version}`, 'cache fail code', code);
    svc.typechecked = 'fail';
    continue;
  }
  if (!checkOutput) continue;
  console.log(checkOutput.trimEnd());

  svc.typechecked = 'ok';
}


const fOut = await Deno.open("./grid-services.csv", { write: true, create: true, truncate: true });
const asyncObjectsGenerator = async function*() {
  for (const service of Object.values(services).sort((a,b) => `${a.service}@${a.version}`.localeCompare(`${b.service}@${b.version}`))) {
    yield service as unknown as {[key: string]: string};
  }
}
await writeCSVObjects(fOut, asyncObjectsGenerator(), { header });
fOut.close();



async function generateApi(apisPath: string, apiUid: string, namespace: string, serviceId: string): Promise<string> {
  const jsonPath = (suffix: string) =>
    path.join(apisPath, `${apiUid}.${suffix}.json`);
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
  const modCode = codeGen.generateModTypescript(namespace);
  const structsCode = codeGen.generateStructsTypescript();

  const version = apiUid.slice(-10);
  // const modName = `${serviceId}@${version}`;
  console.log('Writing', serviceId);

  const modPath = path.join('lib', 'services', serviceId);
  await Deno.run({cmd: ['mkdir', '-p', modPath]}).status();
  await Deno.writeTextFile(modPath+'/mod.ts', modCode);
  await Deno.writeTextFile(modPath+'/structs.ts', structsCode);
  return modPath+'/mod.ts';
}
