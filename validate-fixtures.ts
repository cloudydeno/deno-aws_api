import * as path from "https://deno.land/std@0.70.0/path/mod.ts";
import type * as Schema from './generation/sdk-schema.ts';
import ServiceCodeGen from './generation/code-gen.ts';

// const fixturePath =
  // test/fixtures/protocol/input
  // test/fixtures/protocol/output

type ProtocolFixture = Schema.Api & {
  "cases": ProtocolTestCase[];
}
interface ProtocolTestCase {
  "given": Schema.ApiOperation;
  "params": { [key: string]: any };
  "serialized": {
    "uri": string;
    "body": string;
    "host"?: string;
    "headers"?: { [key: string]: string };
  };
}

function lowerCamel(str: string): string {
  return str[0].toLowerCase() + str.slice(1);
}

let passed = 0;
let failed = 0;

const fixtures = JSON.parse(await Deno
  .readTextFile('aws-sdk-js/test/fixtures/protocol/input/query.json')) as ProtocolFixture[];
for (const fixture of fixtures) {
  const {cases, ...apiSpec} = fixture;
  for (const testCase of cases) {
    // console.log(testCase);
    const fullApi: Schema.Api = {
      ...apiSpec,
      metadata: {
        ...apiSpec.metadata,
        serviceId: 'fixture',
        serviceFullName: 'AWS SDK Text Fixture',
      },
      operations: {
        [testCase.given.name]: testCase.given,
      },
    };

    const chunks = new Array<string>();
    chunks.push('\n/////////\n');
    chunks.push(`import { assertEquals } from "https://deno.land/std@0.70.0/testing/asserts.ts";`);
    chunks.push(`import QueryServiceClient from './deno-client/protocol-query.ts';\n`);

    chunks.push(`async function checkRequest(request: Request): Promise<Response> {`);
    chunks.push(`  assertEquals(request.url, ${JSON.stringify(testCase.serialized.uri)});`);
    chunks.push(`  assertEquals(await request.text(),`);
    chunks.push(`    ${JSON.stringify(testCase.serialized.body)});`);
    if (testCase.serialized.headers) console.log('TODO: test headers');
    if (testCase.serialized.host) console.log('TODO: test host');
    chunks.push(`  console.log("Assertions passed");`);
    chunks.push(`  Deno.exit(0); // TODO`);
    chunks.push(`  return new Response('pass');`);
    chunks.push(`}\n`);

    chunks.push(`const testService = new Fixture({`);
    chunks.push(`  buildServiceClient(metadata: any) {`);
    chunks.push(`    return new QueryServiceClient('', metadata.apiVersion, checkRequest);`);
    chunks.push(`  },`);
    chunks.push(`});\n`);

    chunks.push(`await testService.${lowerCamel(testCase.given.name)}(${JSON.stringify(testCase.params)});\n`);

    const codeGen = new ServiceCodeGen({api: fullApi});

    const child = Deno.run({cmd: ["deno", "run", "-"], stdin: 'piped'});
    await child.stdin.write(new TextEncoder().encode(codeGen.generateTypescript()));
    await child.stdin.write(new TextEncoder().encode(chunks.join('\n')));
    child.stdin.close();
    const {code} = await child.status();
    console.log('Result:', code);

    if (code === 0) {
      passed++;
    } else {
      failed++;
    }
    // child.
    // const result = await child.output();
    // console.log( new TextDecoder('utf-8').decode(result));
  }
}

console.log('Passed:', passed);
console.log('Failed:', failed);
console.log('Total:', passed+failed);
