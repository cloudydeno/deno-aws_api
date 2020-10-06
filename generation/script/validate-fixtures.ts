import * as path from "https://deno.land/std@0.71.0/path/mod.ts";
import { pooledMap } from "https://deno.land/std@0.71.0/async/pool.ts";

import type * as Schema from '../sdk-schema.ts';
import ServiceCodeGen from '../code-gen.ts';

type ProtocolFixture = Schema.Api & {
  "description": string;
  "cases": Array<ProtocolTestCase>;
  "clientEndpoint"?: string;
}
type ProtocolTestCase = ProtocolInputTestCase | ProtocolOutputTestCase;
interface ProtocolInputTestCase {
  "given": Schema.ApiOperation;
  "params": { [key: string]: any };
  "serialized": {
    "uri": string;
    "body": string;
    "host"?: string;
    "headers"?: { [key: string]: string };
  };
}
interface ProtocolOutputTestCase {
  "given": Schema.ApiOperation;
  "result": { [key: string]: any };
  "response": {
    "status_code": number;
    "headers": { [key: string]: string };
    "body": string;
  };
}

function lowerCamel(str: string): string {
  return str[0].toLowerCase() + str.slice(1);
}

interface TestRunConfiguration {
  // category: 'input' | 'output';
  // testCase: ProtocolTestCase;
  description: string;
  clientEndpoint: string;
  apiSpec: Schema.Api;
}
type TestRunCase = {
  category: 'input';
  testCase: ProtocolInputTestCase;
} | {
  category: 'output';
  testCase: ProtocolOutputTestCase;
};
type TestRun = TestRunConfiguration & TestRunCase;
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
    const {cases, description, clientEndpoint, ...extras} = fixture;
    const apiSpec = {
      ...extras,
      metadata: {
        ...extras.metadata,
        serviceId: 'fixture',
        serviceFullName: 'AWS SDK Test Fixture',
      },
    };

    if (apiSpec.shapes.EnumType?.type === 'string') {
      // patch up enum to allow an empty string
      apiSpec.shapes.EnumType.enum?.push('')
    }

    for (const testCase of cases) {
      let inners: TestRunCase;
      let descr = filePath.split('/fixtures/')[1] + ': ' + (description ?? "Test case");
      if ('params' in testCase) {
        inners = { category: 'input', testCase: testCase as ProtocolInputTestCase };
        descr += ` with params ${JSON.stringify(inners.testCase.params)}`;
      } else if ('result' in testCase) {
        inners = { category: 'output', testCase: testCase as ProtocolOutputTestCase };
        descr += ` with result ${JSON.stringify(inners.testCase.result)}`;
      } else throw new Error(`BUG: testcase wasn't input or output`);

      yield {
        ...inners,
        description: descr,
        clientEndpoint: fixture.clientEndpoint ?? "https://example.com",
        apiSpec: {
          ...apiSpec,
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
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/output/query.json');
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/output/ec2.json');
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/input/query.json');
  yield* readTestFixtures('aws-sdk-js/test/fixtures/protocol/input/ec2.json');
}
const allTestRuns = readAllTestFixtures();

const results = pooledMap(3, allTestRuns, async function (run): Promise<TestRunResult> {
  const codeGen = new ServiceCodeGen({api: run.apiSpec});
  const apiSource = codeGen.generateTypescript('Fixture');

// "given": {
//   "output": {
//     "shape": "OutputShape"
//   },
//   "name": "OperationName"
// },
// "result": {
//   "List": [{"Foo": "firstfoo", "Bar": "firstbar", "Baz": "firstbaz"}, {"Foo": "secondfoo", "Bar": "secondbar", "Baz": "secondbaz"}]
// },
// "response": {
//   "status_code": 200,
//   "headers": {},
//   "body": "<OperationNameResponse xmlns=\"https://service.amazonaws.com/doc/2010-05-08/\"><OperationNameResult><List><Foo>firstfoo</Foo><Bar>firstbar</Bar><Baz>firstbaz</Baz></List><List><Foo>secondfoo</Foo><Bar>secondbar</Bar><Baz>secondbaz</Baz></List></OperationNameResult><ResponseMetadata><RequestId>requestid</RequestId></ResponseMetadata></OperationNameResponse>"
// }

  const chunks = new Array<string>();
  chunks.push('\n/////////\n');
  chunks.push(`import { assertEquals } from "https://deno.land/std@0.71.0/testing/asserts.ts";`);
  chunks.push(`import { DefaultServiceClient } from './lib/client/mod.ts';\n`);

  // TODO: better way of mocking this
  chunks.push(`fixedIdemptToken = "00000000-0000-4000-8000-000000000000";\n`);

  chunks.push(`async function checkRequest(request: Request): Promise<Response> {`);
  if (run.category === 'input') {
    const { given, params, serialized } = run.testCase;

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

  } else {
    const { given, result, response } = run.testCase;
    chunks.push(`  return new Response(${JSON.stringify(response.body)}, {`);
    chunks.push(`    headers: ${JSON.stringify(response.headers)},`);
    chunks.push(`    status: ${JSON.stringify(response.status_code)},`);
    chunks.push(`  });`);

  }
  chunks.push(`}\n`);

  chunks.push(`const testService = new Fixture({`);
  chunks.push(`  buildServiceClient(metadata: any) {`);
  chunks.push(`    return new DefaultServiceClient(${JSON.stringify(run.clientEndpoint)}, metadata.apiVersion, checkRequest);`);
  chunks.push(`  },`);
  chunks.push(`});\n`);

  if (run.category === 'input') {
    const { given, params, serialized } = run.testCase;
    chunks.push(`await testService.${lowerCamel(given.name)}(${JSON.stringify(params)});\n`);
  } else {
    const { given, result, response } = run.testCase;
    chunks.push(`const result = await testService.${lowerCamel(given.name)}();\n`);
    chunks.push(`const resultJson = JSON.stringify(transformJsObj(result));`);
    chunks.push(`assertEquals(resultJson,`);
    chunks.push(`  ${JSON.stringify(JSON.stringify(result))});`);
    chunks.push('');
    chunks.push(`function transformJsObj(obj: {[key: string]: any}) {`);
    chunks.push(`  const res: {[key: string]: any} = Object.create(null);`);
    chunks.push(`  for (const [key, val] of Object.entries(obj)) {`);
    chunks.push(`    res[key] = transformJsVal(val);`);
    chunks.push(`  }`);
    chunks.push(`  return res;`);
    chunks.push(`}`);
    chunks.push(`function transformJsVal(val: any): any {`);
    chunks.push(`  if (val?.constructor === Object) {`);
    chunks.push(`    return transformJsObj(val);`);
    chunks.push(`  } else if (val?.constructor === Date) {`);
    chunks.push(`    return Math.floor(val.valueOf() / 1000);`);
    chunks.push(`  } else if (val?.constructor === Uint8Array) {`);
    chunks.push(`    return new TextDecoder('utf-8').decode(val);`);
    chunks.push(`  } else if (val?.constructor === Array) {`);
    chunks.push(`    return val.map(transformJsVal);`);
    chunks.push(`  } else {`);
    chunks.push(`    return val;`);
    chunks.push(`  }`);
    chunks.push(`}`);
  }

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
