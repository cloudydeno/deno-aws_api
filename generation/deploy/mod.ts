
import { immutableFetch } from "./cache.ts";

addEventListener("fetch", async (event) => {
  const request = event.request as Request;
  const { pathname, searchParams, origin } = new URL(request.url);
  console.log(pathname);
  const wantsHtml = request.headers.get('accept')?.split(',').some(x => x.startsWith('text/html')) ?? false;

  const match = pathname.match(/^\/(v[0-9.]+)\/sdk@(v2\.[0-9]+\.[0-9]+)\/([^/.@]+)@([0-9-]+).ts$/);
  if (match) {
    try {
      let apiText = await serveApi(match[2], match[3], match[4], searchParams);
      apiText = apiText.replaceAll('from "../..', `from "https://deno.land/x/aws_api@${match[1]}`);
      event.respondWith(
        new Response(apiText, {
          status: 200,
          headers: {
            server: "aws_api-generation/v0.3.1",
            "content-type": wantsHtml ? "text/plain; charset=utf-8" : "application/x-typescript",
          },
        }),
      );
    } catch (err) {
      event.respondWith(
        new Response(err.stack, {
          status: 500,
          headers: {
            server: "aws_api-generation/v0.3.1",
            "content-type": "text/plain; charset=utf-8",
          },
        }),
      );
    }
    return;
  }

  event.respondWith(
    new Response(`<!doctype html>
<h1>AWS API Client Codegen</h1>
<h2>Path parameters</h2>
<p>Service modules: <code>/v{deno-aws_api version}/sdk@{aws-sdk-js version}/{service ID}@{service api version}.ts</code></p>
<h2>Examples</h2>
<pre>
// import the complete API of one AWS service
import {SQS} from "${origin}/v0.3.1/sdk@v2.875.0/sqs@2012-11-05.ts";

// select individual actions to create a smaller API file
// in this case, excluding queue management actions and non-batched operations
import {SQS} from "${origin}/v0.3.1/sdk@v2.875.0/sqs@2012-11-05.ts?actions=ReceiveMessage,*Batch";
</pre>
<a href="https://github.com/cloudydeno/deno-aws_api/tree/main/generation">source code</a>
`, {
      status: 200,
      headers: {
        server: "aws_api-generation/v0.3.1",
        "content-type": "text/html; charset=utf-8",
      },
    }),
  );
});



import ServiceCodeGen from '../code-gen.ts';
import type * as Schema from '../sdk-schema.ts';

async function serveApi(sdkVersion: string, apiId: string, apiVersion: string, options: URLSearchParams) {

  const headerChunks = new Array<string>();
  headerChunks.push(`// Generation parameters:`);
  headerChunks.push(`//   aws-sdk-js definitions from ${sdkVersion}`);
  headerChunks.push(`//   AWS service UID ${apiId}-${apiVersion}`);
  headerChunks.push(`//   extra options: ${options}`);
  headerChunks.push(`//   current time: ${new Date().toISOString()}`);

  const serviceList = await immutableFetch(`https://raw.githubusercontent.com/aws/aws-sdk-js/${sdkVersion}/apis/metadata.json`).then(x => x.json()) as Record<string, Schema.ServiceMetadata & {modId: string}>;

  const module = serviceList[apiId];
  if (!module) throw new Error(`Not Found`);

  const jsonPath = (suffix: string) =>
    `apis/${module.prefix || apiId}-${apiVersion}.${suffix}.json`;
  const getPath = (path: string) =>
    immutableFetch(`https://raw.githubusercontent.com/aws/aws-sdk-js/${sdkVersion}/${path}`)
    .then(x => {
      if (x.status !== 200) throw new Error(`HTTP ${x.status} on ${path}`);
      return x.text();
    });
  const maybeReadFile = (path: string): Promise<any> =>
    getPath(path)
    .catch(err => {
      if (err.message.startsWith('HTTP 404')) return null;
      return Promise.reject(err);
    });

  const [
    normalJson,
    paginatorsJson,
    waitersJson,
  ] = await Promise.all([
    getPath(jsonPath('normal')).then(x => JSON.parse(x) as Schema.Api),
    maybeReadFile(jsonPath('paginators')).then(x => JSON.parse(x) as Schema.Pagination),
    maybeReadFile(jsonPath('waiters2')).then(x => JSON.parse(x) as Schema.Waiters),
  ]);

  const actionList = options.get('actions')?.split(',') ?? [];
  if (actionList.length) {
    const allOps = Object.entries(normalJson.operations);
    const patternList = actionList.map(buildMatchRule);
    normalJson.operations = {};
    for (const [key, op] of allOps) {
      if (patternList.some(x => x.test(key))) {
        normalJson.operations[key] = op;
      }
    }
    const afterCount = Object.keys(normalJson.operations).length;
    headerChunks.push(`//   filtered out ${allOps.length-afterCount} out of ${allOps.length} actions, leaving ${afterCount}`);
  }

  const codeGen = new ServiceCodeGen({
    uid: '',
    api: normalJson,
    pagers: paginatorsJson,
    waiters: waitersJson,
  });
  return [
    headerChunks.join('\n'),
    codeGen.generateTypescript(module.name),
  ].join('\n\n');
}

// https://stackoverflow.com/a/32402438
function buildMatchRule(rule: string) {
  var escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$");
}
