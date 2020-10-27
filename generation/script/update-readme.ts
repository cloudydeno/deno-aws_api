import { readCSVObjects, writeCSVObjects } from "https://raw.githubusercontent.com/danopia/deno-csv/658ab397acbb8e7c0168e036604ea60db424fa97/mod.ts";
import * as path from "https://deno.land/std@0.71.0/path/mod.ts";

const sdk = JSON.parse(await Deno.readTextFile('aws-sdk-js/package.json'));
const header = `All API definitions are current as of aws-sdk-js \`v${sdk.version}\`.`;

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

services.sort((a, b) =>
  `${a.service}!${a.version}`.localeCompare(`${b.service}!${b.version}`));

const workingSvc = services.filter(x => x.typechecked === 'ok');

await updateReadme(header);
await updateServices(header);

async function updateFile(path: string, contents: string) {
  const original = await Deno.readTextFile(path);
  const [intro, _, outro] = original.split(genBarrier);
  await Deno.writeTextFile(path, [
    intro, header+`\n\n`+contents, outro,
  ].join(genBarrier));
}

async function updateReadme(header: string) {
  const chunks = new Array<string>();
  chunks.push(`| Class | Module | Protocol | File size | Approx check time |`);
  chunks.push(`| --- | --- | --- | ---: | ---: |`);

  for (const svc of workingSvc) {
    chunks.push(`| `+[
      svc.namespace,
      `\`${svc.service}@${svc.version}.ts\``,
      svc.protocol,
      formatFileSize(parseInt(svc.bytecount)),
      formatDuration(parseInt(svc.cachetime)),
    ].join(' | ')+` |`);
  }

  return updateFile('lib/README.md', chunks.join('\n'));
}

async function updateServices(header: string) {
  const chunks = new Array<string>();

  const icons: Record<string, string> = {
    '': '',
    'ok': '✔️',
    'fail': '🚫',
  };

  chunks.push(`| Module | Protocol | Generates | File size | Typechecks | Approx check time |`);
  chunks.push(`| --- | --- | :---: | ---: | :---: | ---: |`);
  for (const svc of services) {
    chunks.push(`| `+[
      `\`${svc.service}@${svc.version}.ts\``,
      svc.protocol,
      icons[svc.generated],
      svc.generated === 'ok' ? formatFileSize(parseInt(svc.bytecount)) : '',
      icons[svc.typechecked],
      svc.typechecked === 'ok' ? formatDuration(parseInt(svc.cachetime)) : '',
    ].join(' | ')+` |`);
  }

  return updateFile('lib/SERVICES.md', chunks.join('\n'));
}

function formatFileSize(bytes: number): string {
  return `${Math.round(bytes / 1024)} KiB`;
}

function formatDuration(millis: number): string {
  const deciseconds = Math.round(millis / 100).toString();
  return `${deciseconds.slice(0, -1) || '0'}.${deciseconds.slice(-1)} sec`;
}
