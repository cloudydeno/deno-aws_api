import * as path from "https://deno.land/std@0.70.0/path/mod.ts";
import { pooledMap } from "https://deno.land/std@0.70.0/async/pool.ts";

import type * as Schema from './generation/sdk-schema.ts';
import ServiceCodeGen from './generation/code-gen.ts';

// const fixturePath =
  // test/fixtures/protocol/input
  // test/fixtures/protocol/output

type ProtocolFixture = Schema.Api & {
  "cases": ProtocolTestCase[];
  "description": string;
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
  description: string;
  apiSpec: Schema.Api;
  testCase: ProtocolTestCase;
}
interface TestRunResult {
  run: TestRun;
  status: Deno.ProcessStatus;
  stdout: Uint8Array;
  stderr: Uint8Array;
};

async function *readTestFixtures(filePath: string): AsyncGenerator<TestRun> {
  const fixtures = JSON.parse(await Deno
    .readTextFile(filePath)) as ProtocolFixture[];

  for (const fixture of fixtures) {
    const {cases, description, ...apiSpec} = fixture;
    for (const testCase of cases) {
      yield {
        testCase,
        description: (description ?? "Test case")
          + ' with params '
          + JSON.stringify(testCase.params),
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
    }
  }
}

const allTestRuns = readTestFixtures('aws-sdk-js/test/fixtures/protocol/input/query.json');

const results = pooledMap(3, allTestRuns, async function (run): Promise<TestRunResult> {
  const codeGen = new ServiceCodeGen({api: run.apiSpec});
  const { given, params, serialized } = run.testCase;

  const chunks = new Array<string>();
  chunks.push('\n/////////\n');
  chunks.push(`import { assertEquals } from "https://deno.land/std@0.70.0/testing/asserts.ts";`);
  chunks.push(`import QueryServiceClient from './deno-client/protocol-query.ts';\n`);

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
  chunks.push(`    return new QueryServiceClient('https://example.com', metadata.apiVersion, checkRequest);`);
  chunks.push(`  },`);
  chunks.push(`});\n`);

  chunks.push(`await testService.${lowerCamel(given.name)}(${JSON.stringify(params)});\n`);

  const child = Deno.run({cmd: ["deno", "run", "-"], stdin: 'piped', stdout: 'piped', stderr: 'piped'});
  await child.stdin.write(new TextEncoder().encode(codeGen.generateTypescript()));
  await child.stdin.write(new TextEncoder().encode(chunks.join('\n')));
  child.stdin.close();

  return Promise
    .all([child.output(), child.stderrOutput(), child.status()])
    .then(([stdout, stderr, status]) => ({run, stdout, stderr, status}));
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
  }
}

console.log('Passed:', passed);
console.log('Failed:', failed);
console.log('Total:', passed+failed);
