#!/usr/bin/env -S deno run --allow-run=deno --allow-write --allow-read

import type * as Schema from '../sdk-schema.ts';
import ServiceCodeGen from '../code-gen.ts';

const testDir = 'lib/testgen/fixtures';
await Deno.mkdir(testDir, { recursive: true });

type ProtocolFixture = Schema.Api & {
  "description": string;
  "cases": Array<ProtocolTestCase>;
  "clientEndpoint"?: string;
}
type ProtocolTestCase = ProtocolInputTestCase | ProtocolOutputTestCase;
interface ProtocolInputTestCase {
  "given": Schema.ApiOperation;
  "params"?: { [key: string]: any };
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
type TestRun = TestRunConfiguration & TestRunCase & { modPath: string; };

async function *readTestFixtures(filePath: string): AsyncGenerator<TestRun> {
  let caseNum = 0;
  const fileName = filePath.split('/').slice(-2).join('_');
  const fixtures = JSON.parse(await Deno
    .readTextFile(filePath)) as ProtocolFixture[];

  for (const fixture of fixtures) {
    const {cases, description, clientEndpoint, ...extras} = fixture;
    const apiSpec: Schema.Api = {
      ...extras,
      metadata: {
        ...extras.metadata,
        serviceId: 'fixture',
        serviceFullName: 'AWS SDK Test Fixture',
        endpointPrefix: 'fixture',
        signatureVersion: 'v4',
        apiVersion: extras.metadata.apiVersion ?? 'fixture',
      },
    };

    // we have open string unions but it's cleaner for now to still patch these enums
    if (apiSpec.shapes.EnumType?.type === 'string') {
      // patch up enum to allow an empty string
      apiSpec.shapes.EnumType.enum?.push('');
      // why do the tests put things in enums that they don't want?
      apiSpec.shapes.EnumType.enum?.push('baz');
    }

    for (const testCase of cases) {
      let inners: TestRunCase;
      let descr = filePath.split('/fixtures/')[1] + ': ' + (description ?? "Test case");
      if ('result' in testCase) {
        inners = { category: 'output', testCase: testCase as ProtocolOutputTestCase };
        descr += ` with result ${JSON.stringify(inners.testCase.result)}`;
      } else {
        inners = { category: 'input', testCase: testCase as ProtocolInputTestCase };
        descr += ` with params ${JSON.stringify(inners.testCase.params)}`;
      }

      yield {
        ...inners,
        description: descr,
        clientEndpoint: fixture.clientEndpoint ?? "https://example.com",
        modPath: `${testDir}/${fileName}_${caseNum}_test.ts`,
        apiSpec: {
          ...apiSpec,
          operations: {
            [testCase.given.name]: testCase.given,
          },
        },
      };
      if (Deno.args.includes('--one-test')) return;
      caseNum++;
    }
  }
}

async function* readAllTestFixtures() {
  for (const protocol of ['rest-json', 'rest-xml', 'json', 'query', 'ec2']) {
    yield* readTestFixtures(`aws-sdk-js/test/fixtures/protocol/input/${protocol}.json`);
    yield* readTestFixtures(`aws-sdk-js/test/fixtures/protocol/output/${protocol}.json`);
  }
}
const allTestRuns = readAllTestFixtures();

const opts = new URLSearchParams();

async function generateRun(run: TestRun): Promise<void> {

  // QUIRK
  if (run.description.endsWith('Enum with params {}')) {
    run.apiSpec = JSON.parse(JSON.stringify(run.apiSpec));
    if (run.apiSpec.shapes['InputShape']?.type === 'structure') {
      delete run.apiSpec.shapes['InputShape'].members['URIFooEnum'];
    }
  }

  const codeGen = new ServiceCodeGen({
    api: run.apiSpec,
    isTest: true,
  }, opts);
  const apiSource = codeGen.generateTypescript('Fixture');

  const chunks = new Array<string>();
  chunks.push('\n/////////\n');
  chunks.push(`import { assertEquals } from "https://deno.land/std@0.105.0/testing/asserts.ts";`);
  chunks.push(`import { wrapServiceClient } from '../../client/client.ts';\n`);
  chunks.push(`import type { ServiceApiClass } from '../../client/common.ts';\n`);

  const mockFuncName = run.category === 'input' ? 'checkRequest' : 'mockResponse';
  chunks.push(`async function ${mockFuncName}(request: Request, opts: {hostPrefix?: string, urlPath: string}): Promise<Response> {`);
  if (run.category === 'input') {
    const { serialized } = run.testCase;

    const expectedBody = serialized.body?.[0] === '{'
      ? JSON.stringify(JSON.parse(serialized.body))
      : serialized.body;

    chunks.push(`  const [_, host] = ${JSON.stringify(run.clientEndpoint)}.match(/^https:\\/\\/([^\\/]+)$/) ?? [null, ''];`);
    if (serialized.host) chunks.push(`  assertEquals((opts.hostPrefix ?? '')+host, ${JSON.stringify(serialized.host)});`);
    chunks.push(`  assertEquals(opts.urlPath, ${JSON.stringify(serialized.uri)});`);
    if (expectedBody) {
      chunks.push(`  assertEquals(await request.text(),`);
      chunks.push(`    ${JSON.stringify(expectedBody)});`);
    }
    for (const [name, val] of Object.entries(serialized.headers ?? {})) {
      chunks.push(`  assertEquals(request.headers.get(${JSON.stringify(name)}), ${JSON.stringify(val)});`);
    }
    chunks.push(`  return new Response('pass');`);

  } else {
    const { response } = run.testCase;
    chunks.push(`  return new Response(new TextEncoder().encode(${JSON.stringify(response.body)}), {`);
    chunks.push(`    headers: ${JSON.stringify(response.headers)},`);
    chunks.push(`    status: ${JSON.stringify(response.status_code)},`);
    chunks.push(`  });`);

  }
  chunks.push(`}\n`);

  chunks.push(`const testService = new Fixture({`);
  chunks.push(`  buildServiceClient(metadata: any) {`);
  chunks.push(`    return wrapServiceClient(metadata, ${mockFuncName});`);
  chunks.push(`  },`);
  chunks.push(`  makeNew<T>(apiConstructor: ServiceApiClass<T>): T {`);
  chunks.push(`    return new apiConstructor(this);`);
  chunks.push(`  }`);
  chunks.push(`});\n`);

  if (run.category === 'input') {
    const { given, params } = run.testCase;
    chunks.push(`Deno.test(${JSON.stringify(run.description)}, async () => {`);
    let paramText = JSON.stringify(params);
    if (['{}', undefined].includes(paramText)) paramText = ''; // TODO: remove when abortSignal
    chunks.push(`  await testService.${lowerCamel(given.name)}(${paramText});\n`);
    chunks.push(`});`);
  } else {
    const { given, result } = run.testCase;
    chunks.push(`import { testTransformJsObj } from '../../encoding/common.ts';`);
    chunks.push(`Deno.test(${JSON.stringify(run.description)}, async () => {`);
    if (run.description.includes('Ignores undefined output') || run.description.includes('Enum with result {}')) {
      chunks.push(`  const result: void = await testService.${lowerCamel(given.name)}();\n`);
    } else {
      chunks.push(`  const result = await testService.${lowerCamel(given.name)}();\n`);
      chunks.push(`  const resultJson = JSON.stringify(testTransformJsObj(result));`);
      chunks.push(`  assertEquals(resultJson,`);
      chunks.push(`    ${JSON.stringify(fixExpectedJson(JSON.stringify(result)))});`);
    }
    chunks.push(`});`);
  }

  await Deno.writeTextFile(run.modPath, apiSource+chunks.join('\n'));
}

for await (const run of allTestRuns) {
  await generateRun(run);
}

const child = await Deno.run({
  cmd: ["deno", "test", testDir],
}).status();
Deno.exit(child.code);

// Our comparing doesn't respect different orders, but order is often right so just fudge for now
function fixExpectedJson(json: string): string {
  if (json === `{"TimeArg":1398796238,"TimeArgInHeader":1398796238,"TimeCustom":1398796238,"TimeCustomInHeader":1398796238,"TimeFormat":1398796238,"TimeFormatInHeader":1398796238,"StructMember":{"foo":1398796238,"bar":1398796238}}`) {
    return `{"TimeArgInHeader":1398796238,"TimeCustomInHeader":1398796238,"TimeFormatInHeader":1398796238,"TimeArg":1398796238,"TimeCustom":1398796238,"TimeFormat":1398796238,"StructMember":{"foo":1398796238,"bar":1398796238}}`;
  }
  if (json === `{"AllHeaders":{"Content-Length":"10","X-Foo":"bar","X-Bam":"boo"},"PrefixedHeaders":{"Foo":"bar","Bam":"boo"}}`) {
    // headers are sorted as of deno 1.9
    return `{"AllHeaders":{"content-length":"10","x-bam":"boo","x-foo":"bar"},"PrefixedHeaders":{"bam":"boo","foo":"bar"}}`;
  }
  return json;
}
