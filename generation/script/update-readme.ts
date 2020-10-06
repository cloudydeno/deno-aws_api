import { readCSVObjects, writeCSVObjects } from "https://deno.land/x/csv@v0.4.0/mod.ts";
import * as path from "https://deno.land/std@0.71.0/path/mod.ts";

const genBarrier = `

[//]: # (Generated Content Barrier)

`;

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
const services: ServiceEntry[] = [];

const f = await Deno.open("grid-services.csv");
for await (const obj of readCSVObjects(f)) {
  services.push(obj as unknown as ServiceEntry);
}
f.close();

const workingSvc = services.filter(x => x.typechecked === 'ok');

await updateMainReadme();
await updateServicesReadme();

async function updateMainReadme() {
  const chunks = new Array<string>();

  chunks.push(`| Class | Module | Protocol | File size | Approx check time |`);
  chunks.push(`| --- | --- | --- | --- | --- |`);
  for (const svc of workingSvc) {
    chunks.push(`| `+[
      svc.namespace,
      `\`${svc.service}@${svc.version}.ts\``,
      svc.protocol,
      `${Math.floor(parseInt(svc.bytecount) / 1024)} KiB`,
      `${parseInt(svc.cachetime) / 1000} sec`,
    ].join(' | ')+` |`);
  }

  const [intro, _, outro] = (await Deno.readTextFile('lib/README.md'))
    .split(genBarrier);
  await Deno.writeTextFile('lib/README.md', [
    intro, chunks.join('\n'), outro,
  ].join(genBarrier));
}

async function updateServicesReadme() {
  const chunks = new Array<string>();

  const icons: Record<string, string> = {
    '': '',
    'ok': '✔️',
    'fail': '🚫',
  };

  chunks.push(`| Module | Protocol | Generates | File size | Typechecks | Approx check time |`);
  chunks.push(`| --- | --- | --- | --- | --- | --- |`);
  for (const svc of services) {
    chunks.push(`| `+[
      `\`${svc.service}@${svc.version}.ts\``,
      svc.protocol,
      icons[svc.generated],
      svc.generated === 'ok' ? `${Math.floor(parseInt(svc.bytecount) / 1024)} KiB` : '',
      icons[svc.typechecked],
      svc.typechecked === 'ok' ? `${parseInt(svc.cachetime) / 1000} sec` : '',
    ].join(' | ')+` |`);
  }

  const [intro, _, outro] = (await Deno.readTextFile('lib/services/README.md'))
    .split(genBarrier);
  await Deno.writeTextFile('lib/services/README.md', [
    intro, chunks.join('\n'), outro,
  ].join(genBarrier));
}
