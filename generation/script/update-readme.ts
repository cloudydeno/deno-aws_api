import { CsvParseStream } from "@std/csv/parse-stream";

const sdk = JSON.parse(await Deno.readTextFile('aws-sdk-js/package.json'));
const header = `All API definitions are current as of [aws-sdk-js \`v${sdk.version}\`](https://github.com/aws/aws-sdk-js/releases/tag/v${sdk.version}).`;

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
}
const services: ServiceEntry[] = [];

{
  using f = await Deno.open("grid-services.csv", { read: true });
  for await (const obj of f.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new CsvParseStream({ skipFirstRow: true }))
  ) {
    services.push(obj as unknown as ServiceEntry);
  }
}

services.sort((a, b) =>
  `${a.id}!${a.version}`.localeCompare(`${b.id}!${b.version}`));

const workingSvc = services.filter(x => x.typechecked === 'ok');

await updateReadme();

async function updateFile(path: string, contents: string) {
  const original = await Deno.readTextFile(path);
  const [intro, _, outro] = original.split(genBarrier);
  await Deno.writeTextFile(path, [
    intro, header+`\n\n`+contents, outro,
  ].join(genBarrier));
}

function updateReadme() {
  const chunks = new Array<string>();
  chunks.push(`| Class | Module | Protocol |`);
  chunks.push(`| --- | --- | --- |`);

  for (const svc of workingSvc) {
    chunks.push(`| `+[
      `\`${svc.namespace}\``,
      `\`${svc.id}/mod.ts\``,
      svc.protocol,
    ].join(' | ')+` |`);
  }

  return updateFile('lib/README.md', chunks.join('\n'));
}
