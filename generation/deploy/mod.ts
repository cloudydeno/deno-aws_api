#!/usr/bin/env -S deno run --allow-env --allow-net=:8000,api.github.com,raw.githubusercontent.com,deno-httpcache.s3.dualstack.us-east-2.amazonaws.com generation/deploy/mod.ts
import { serve } from "https://deno.land/std@0.115.0/http/server.ts";
import { escape } from "https://deno.land/x/html_escape@v1.1.5/escape.ts";

import { SDK } from "./sdk-datasource.ts";
import * as CompletionApi from './completion-api.ts';
import { Generations, LatestGeneration, ModuleGenerator } from "./generations.ts";

console.log("Listening on http://localhost:8000");
serve(async request => {
  const response = await handleRequest(request).catch(renderError);
  response.headers.set("server", "aws_api-generation/v0.4.0");
  return response;
});

function renderError(err: Error) {
  const msg = err.stack || err.message || JSON.stringify(err);
  console.error('!!!', msg);
  return ResponseText(500, `Internal Error!

Feel free to try a second attempt.
File any issues here: https://github.com/cloudydeno/deno-aws_api/issues

Internal stacktrace follows:
${msg}`);
}

async function handleRequest(request: Request): Promise<Response> {
  const { protocol, host, pathname, search, searchParams, origin } = new URL(request.url);
  console.log(request.method, pathname);
  const wantsHtml = request.headers.get('accept')?.split(',').some(x => x.startsWith('text/html')) ?? false;

  if (pathname.startsWith('/.well-known/') || pathname.startsWith('/.completions/')) {
    return await CompletionApi.handleRequest(request);
  }

  if (pathname.match(/^\/latest(\/|$)/)) {
    return ResponseRedirect(`/${LatestGeneration}/${pathname.slice('/latest/'.length)}${search}`, {
      'x-deno-warning': `Using latest revision (${LatestGeneration}) of the aws-api codegen`,
    });
  }

  if (searchParams.get('actions') === '') {
    searchParams.delete('actions');
  }

  {
  const match = pathname.match(/^\/(?<genVer>v[0-9.]+)\/(?:sdk@(?<sdkVer>v2\.[0-9]+\.[0-9]+)|services)\/(?<service>[^/.@]+)(?:@(?<svcVer>20[0-9-]+))?.ts$/);
  if (match) {
    const {genVer, sdkVer, service, svcVer} = match.groups!;

    const generation = Generations.get(genVer);
    if (!generation) return ResponseText(404,
      `Codegen version '${genVer}' not found.\nKnown versions: ${Array.from(Generations.keys()).join(', ')}`);

    const sdkVersion = sdkVer || generation.sdkVersion;
    const apiVersion = svcVer || await new SDK(sdkVersion).getLatestApiVersion(service);
    const fullOptions = generation.setDefaults(searchParams);

    let apiText = await serveApi({
      generation,
      generationId: genVer,
      sdkVersion: sdkVersion,
      apiId: service,
      apiVersion: apiVersion,
      options: searchParams,
      selfUrl: `${origin}${pathname}${search}`,
    });

    if (wantsHtml) {
      const sdk = new SDK(sdkVersion);
      const serviceList = await sdk.getServiceList();
      const module = serviceList[service];
      if (!module) return ResponseText(404, `Service Not Found: ${service}`);

      const fullDocsSearch = new URLSearchParams(searchParams);
      fullDocsSearch.set('docs', 'full');
      const fullDocsPath = `${pathname}${fullDocsSearch.toString() ? `?${fullDocsSearch}` : ''}`;

      return new Response(`<!doctype html>
<title>${module.name} - AWS API Codegen</title>
<h1>${module.name} - AWS API Codegen</h1>
<p>
  <strong>API Documentation</strong>
  | <a href="https://doc.deno.land/${origin.replace('://', '/')}${fullDocsPath}/~/${module.name}">Deno Module Docs</a>
  | <a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/${module.name}.html">Original docs from AWS-JS-SDK</a>
</p>
<h2>Customize Generated Module</h2>
<form method="GET">
<table>
<tr>
  <th>Only include specific operations:</th>
  <td><input type="input" name="actions" value="${fullOptions.get('actions') || ''}"
      placeholder="comma seperated Action names" /></td>
</tr>
<tr>
  <th>Include documentation comments:</th>
  <td><select name="docs">
    <option value="none"${fullOptions.get('docs') == 'none' ? ' selected' : ''}>None</option>
    <option value="short"${fullOptions.get('docs') == 'short' ? ' selected' : ''}>First lines only</option>
    <option value="full"${fullOptions.get('docs') == 'full' ? ' selected' : ''}>Full documentation</option>
  </select></td>
</tr>
</table>
<input type="submit" />
</form>
<h2>Example Import</h2>
<p><code>import { ${module.name} } from "${origin}${pathname}${search}";</code></p>
<hr>
<h2>Generated Source (the actual code)</h2>
<pre>
${escape(apiText)}
</pre>
`, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
        }});
    }

    return new Response(apiText, {
      status: 200,
      headers: {
        "content-type": wantsHtml ? "text/plain; charset=utf-8" : "application/x-typescript",
      }});
  }
  }

  {
  const match = pathname.match(/^\/(?:(?<genVer>v[0-9.]+)(?:\/(?:sdk@(?<sdkVer>v2\.[0-9]+\.[0-9]+)|services))?\/?)?$/);
  if (match) {
    if (!pathname.endsWith('/')) {
      return ResponseRedirect(pathname + '/' + search);
    }

    const {genVer, sdkVer} = match.groups!;
    const genVersion = genVer || LatestGeneration;

    const generation = Generations.get(genVersion);
    if (!generation) return ResponseText(404,
      `Codegen version '${genVersion}' not found.\nKnown versions: ${Array.from(Generations.keys()).join(', ')}`);

    const sdkVersion = sdkVer || generation.sdkVersion;
    const sdk = new SDK(sdkVersion);

    const modRoot = `/${genVersion}/${sdkVer ? `sdk@${sdkVersion}` : 'services'}`;

    const serviceDict = await sdk.getServiceList();
    const serviceList = Object.entries(serviceDict).sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })

    return new Response(`<!doctype html>
<h1>AWS API Client Codegen</h1>
<p>
  For documentation about this web service, please see
  <a href="https://github.com/cloudydeno/deno-aws_api/wiki/Web-Service">this Github Wiki page</a>.
</p>
<p>
  I recommend using the action filter when possible,
  as it reduces module size and typecheck time.
  This achieves a similar modularity as the AWS-JS-SDK v3.
  The UI at the top of the module webpage can help customize your generated module.
</p>
<h2>Path parameters</h2>
<p>Minimal: <code>/v{module version}/services/{service ID}.ts</code></p>
<p>Specific aws-sdk-js version: <code>/v{module version}/sdk@{aws-sdk-js version}/{service ID}.ts</code></p>
<p>Fully specified: <code>/v{module version}/sdk@{aws-sdk-js version}/{service ID}@{service api version}.ts</code></p>
<h2>Examples</h2>
<pre>
// import the base client library
import { ApiFactory } from "${generation.clientModRoot}/client/mod.ts";

// import the complete API of one AWS service
import { SQS } from "${origin}${modRoot}/sqs.ts";
const sqs = new ApiFactory().makeNew(SQS);

// be specific about which "API Version" to use (most APIs only have one)
import { SQS } from "${origin}${modRoot}/sqs@2012-11-05.ts";

// select individual actions to create a smaller API file
// in this case, excluding queue management actions and non-batched operations
import { SQS } from "${origin}${modRoot}/sqs@2012-11-05.ts?actions=ReceiveMessage,*Batch";
</pre>
<a href="https://github.com/cloudydeno/deno-aws_api/tree/main/generation">source code</a>
<h2>All Services</h2>
<p>${sdkVer ? `Using` : `Defaulted to`} definitions from <a href="https://github.com/aws/aws-sdk-js/releases/tag/${sdkVersion}">aws-sdk-js@${sdkVersion}</a></p>
<table>
<thead><tr>
<th>Service</th>
<th>Usage</th>
<th>Docs</th>
</tr></thead>
<tbody>
${serviceList.map(([svcId, svc]) => `<tr>
<td><a href="${modRoot}/${svcId}.ts">${svc.name}</a></td>
<td><code>import { ${svc.name} } from "${origin}${modRoot}/${svcId}.ts";</code></td>
<td><a href="https://doc.deno.land/${protocol.replace(/:$/, '')}/${host}${modRoot}/${svcId}.ts%3Fdocs=full/~/${svc.name}">Docs</a></td>
</tr>
`).join('')}
</tbody>
</table>
`, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      }});
    }
  }

  return ResponseText(404, `404 Not Found`);
}


async function serveApi(opts: {
  generation: ModuleGenerator,
  generationId: string;
  sdkVersion: string,
  apiId: string,
  apiVersion: string,
  options: URLSearchParams,
  selfUrl: string,
}) {
  const sdk = new SDK(opts.sdkVersion);

  const headerChunks = new Array<string>();
  headerChunks.push(`// Generation parameters:`);
  headerChunks.push(`//   aws-sdk-js definitions from ${opts.sdkVersion}`);
  headerChunks.push(`//   AWS service UID: ${opts.apiId}-${opts.apiVersion}`);
  headerChunks.push(`//   code generation: ${opts.generationId}`);
  if (opts.options.toString()) {
    headerChunks.push(`//   extra options: ${opts.options}`);
  }
  headerChunks.push(`//   current time: ${new Date().toISOString()}`);

  const serviceList = await sdk.getServiceList();
  const module = serviceList[opts.apiId];
  if (!module) throw new Error(`Not Found`);

  const spec = await sdk
    .getApiSpecs(module.prefix || opts.apiId, opts.apiVersion, {
      normal: 'required',
      paginators: 'optional',
      waiters2: 'optional',
    });

  const actionList = opts.options.get('actions')?.split(',') ?? [];
  if (actionList.length) {
    const allOps = Object.entries(spec.normal.operations);
    const patternList = actionList.map(buildMatchRule);
    spec.normal.operations = {};
    for (const [key, op] of allOps) {
      if (patternList.some(x => x.test(key))) {
        spec.normal.operations[key] = op;
      }
    }
    const afterCount = Object.keys(spec.normal.operations).length;
    headerChunks.push(`//   skipped ${allOps.length-afterCount} out of ${allOps.length} actions, leaving ${afterCount}`);
  }

  return [
    headerChunks.join('\n'),
    `// Originally served at ${opts.selfUrl}`,
    opts.generation.buildApi({
      className: module.name,
      options: opts.options,
      apiSpecs: {
        api: spec.normal,
        pagers: spec.paginators,
        waiters: spec.waiters2,
      },
    }),
  ].join('\n\n');
}

// https://stackoverflow.com/a/32402438
function buildMatchRule(rule: string) {
  var escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$");
}

// TODO: Response.redirect() throws in Deno 1.9 unless url is absolute
function ResponseRedirect(location: string, extraHeaders?: Record<string,string>) {
  return new Response(null, {
    status: 302,
    headers: { location, ...extraHeaders },
  });
}

function ResponseText(status: number, body: string) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
