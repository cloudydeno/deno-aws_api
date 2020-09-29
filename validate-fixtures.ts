import * as path from "https://deno.land/std@0.70.0/path/mod.ts";
import { pooledMap } from "https://deno.land/std@0.70.0/async/pool.ts";

import type * as Schema from './generation/sdk-schema.ts';
import ServiceCodeGen from './generation/code-gen.ts';

// const fixturePath =
  // test/fixtures/protocol/input
  // test/fixtures/protocol/output

type ProtocolFixture = Schema.Api & {
  "description": string;
  "cases": ProtocolTestCase[];
  "clientEndpoint"?: string;
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

interface TestRun {
  testCase: ProtocolTestCase;
  description: string;
  clientEndpoint: string;
  apiSpec: Schema.Api;
}
interface TestRunResult {
  run: TestRun;
  status: Deno.ProcessStatus;
  stdout: Uint8Array;
  stderr: Uint8Array;
  source: string;
};

async function *readTestFixtures(filePath: string): AsyncGenerator<TestRun> {
  const fixtures = JSON.parse(await Deno
    .readTextFile(filePath)) as ProtocolFixture[];

  for (const fixture of fixtures) {
    const {cases, description, clientEndpoint, ...apiSpec} = fixture;
    if (apiSpec.shapes.EnumType?.type === 'string') {
      // patch up enum to allow an empty string
      apiSpec.shapes.EnumType.enum?.push('')
    }
    for (const testCase of cases) {
      yield {
        testCase,
        description: (description ?? "Test case")
          + ' with params '
          + JSON.stringify(testCase.params),
        clientEndpoint: fixture.clientEndpoint ?? "https://example.com",
        apiSpec: {
          ...apiSpec,
          metadata: {
            ...apiSpec.metadata,
            serviceId: 'fixture',
            serviceFullName: 'AWS SDK Test Fixture',
          },
          operations: {
            [testCase.given.name]: testCase.given,
          },
        },
      };
      if (Deno.args.includes('--one-test')) return;
    }
  }
}

async function* readAllTestFixtures() {
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/input/query.json');
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/input/ec2.json');
}
const allTestRuns = readAllTestFixtures();

const results = pooledMap(3, allTestRuns, async function (run): Promise<TestRunResult> {
  const codeGen = new ServiceCodeGen({api: run.apiSpec});
  const apiSource = codeGen.generateTypescript();

  const { given, params, serialized } = run.testCase;

  const chunks = new Array<string>();
  chunks.push('\n/////////\n');
  chunks.push(`import { assertEquals } from "https://deno.land/std@0.70.0/testing/asserts.ts";`);
  chunks.push(`import { DefaultServiceClient } from './deno-client/mod.ts';\n`);

  // TODO: better way of mocking this
  chunks.push(`fixedIdemptToken = "00000000-0000-4000-8000-000000000000";\n`);

  chunks.push(`async function checkRequest(request: Request): Promise<Response> {`);
  chunks.push(`  const [_, host, path] = request.url.match(/^https:\\/\\/([^\\/]+)(\\/.*)$/) ?? [null, '', ''];`);
  if (serialized.host) chunks.push(`  assertEquals(host, ${JSON.stringify(serialized.host)});`);
  chunks.push(`  assertEquals(path, ${JSON.stringify(serialized.uri)});`);
  chunks.push(`  assertEquals(await request.text(),`);
  chunks.push(`    ${JSON.stringify(serialized.body)});`);
  for (const [name, val] of Object.entries(serialized.headers ?? {})) {
    chunks.push(`  assertEquals(request.headers.get(${JSON.stringify(name)}), ${JSON.stringify(val)}`);
  }
  chunks.push(`  console.log("Assertions passed");`);
  chunks.push(`  Deno.exit(0); // TODO`);
  chunks.push(`  return new Response('pass');`);
  chunks.push(`}\n`);

  chunks.push(`const testService = new Fixture({`);
  chunks.push(`  buildServiceClient(metadata: any) {`);
  chunks.push(`    return new DefaultServiceClient(${JSON.stringify(run.clientEndpoint)}, metadata.apiVersion, checkRequest);`);
  chunks.push(`  },`);
  chunks.push(`});\n`);

  chunks.push(`await testService.${lowerCamel(given.name)}(${JSON.stringify(params)});\n`);

  const child = Deno.run({cmd: ["deno", "run", "-"], stdin: 'piped', stdout: 'piped', stderr: 'piped'});
  await child.stdin.write(new TextEncoder().encode(apiSource));
  await child.stdin.write(new TextEncoder().encode(chunks.join('\n')));
  child.stdin.close();

  return Promise
    .all([child.output(), child.stderrOutput(), child.status()])
    .then(([stdout, stderr, status]) => ({run, stdout, stderr, status, source: apiSource+chunks.join('\n')}));
});

let passed = 0;
let failed = 0;
const decoder = new TextDecoder('utf-8');
for await (const result of results) {

  if (result.status.code === 0) {
    console.log('PASS:', result.run.description);
    passed++;
  } else {
    console.log('FAIL:', result.run.description);
    console.log('-----------------------------------------------------------');
    console.log(decoder.decode(result.stderr).split('  throw new AssertionError')[0] || decoder.decode(result.stdout));
    failed++;
    if (Deno.args.includes('--one-fail')) {
      console.log('-----------------------------------------------------------');
      console.log(result.source);
      break;
    }
  }
}

console.log('Passed:', passed);
console.log('Failed:', failed);
console.log('Total:', passed+failed);
