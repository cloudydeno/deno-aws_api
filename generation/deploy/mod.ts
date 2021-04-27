import { SDK } from "./sdk-datasource.ts";

import * as CompletionApi from './completion-api.ts';

addEventListener("fetch", async (event) => {
  const request = (event as any).request as Request;
  const response = await handleRequest(request)
    .catch(renderError);
  response.headers.set("server", "aws_api-generation/v0.3.1");
  (event as any).respondWith(response);
});

function renderError(err: Error) {
  const msg = err.stack || err.message || JSON.stringify(err);
  console.error('!!!', msg);
  return new Response(`Internal Error!

Feel free to try a second attempt.
File any issues here: https://github.com/cloudydeno/deno-aws_api/issues

Internal stacktrace follows:
${msg}`, {
    status: 500,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    }});
}

async function handleRequest(request: Request): Promise<Response> {
  const { protocol, host, pathname, search, searchParams, origin } = new URL(request.url);
  console.log(request.method, pathname);
  const wantsHtml = request.headers.get('accept')?.split(',').some(x => x.startsWith('text/html')) ?? false;

  if (pathname.startsWith('/.well-known/') || pathname.startsWith('/.completions/')) {
    return await CompletionApi.handleRequest(request);
  }

  if (searchParams.get('actions') === '') {
    searchParams.delete('actions');
  }

  {
  const match = pathname.match(/^\/(v[0-9.]+)\/sdk(@v2\.[0-9]+\.[0-9]+)?\/([^/.@]+)(@[0-9-]+)?.ts$/);
  if (match) {
    if (match[1] == 'v0' || !match[2] || !match[4]) {
      const modVer = match[1] === 'v0' ? 'v0.3.1' : match[1];
      const sdkVer = match[2]?.slice(1) || await SDK.getLatestSdkVersion();
      const apiVer = match[4]?.slice(1) || await new SDK(sdkVer).getLatestApiVersion(match[3]);

      const resp = ResponseRedirect(`/${modVer}/sdk@${sdkVer}/${match[3]}@${apiVer}.ts${search}`);
      if (match[1] !== modVer) resp.headers.append('x-deno-warning',
        `Using latest version (${modVer}) for /x/aws_api imports`);
      if (!match[2]) resp.headers.append('x-deno-warning',
        `Using latest version (${sdkVer}) for AWS-SDK-JS API definitions`);
      if (!match[4]) resp.headers.append('x-deno-warning',
        `Using latest version (${apiVer}) for ${match[3]}`);
      return resp;
    }

    if (match[1] !== 'v0.3.1') throw new Error(
      `Library version ${match[1]} doesn't exist or isn't supported`);

    let apiText = await serveApi({
      clientModRoot: `https://deno.land/x/aws_api@${match[1]}`,
      sdkVersion: match[2].slice(1),
      apiId: match[3],
      apiVersion: match[4].slice(1),
      options: searchParams,
      selfUrl: `${origin}${pathname}${search}`,
    });

    if (wantsHtml) {
      const sdk = new SDK(match[2].slice(1));
      const serviceList = await sdk.getServiceList();
      const module = serviceList[match[3]];
      if (!module) throw new Error(`Not Found: ${match[3]}`);

      return new Response(`<!doctype html>
<title>${module.name} - AWS API Codegen</title>
<h1>${module.name} - AWS API Codegen</h1>
<h2>Customize Generated Module</h2>
<form method="GET">
<table>
<tr>
  <th>Only include specific operations:</th>
  <td><input type="input" name="actions" value="${searchParams.get('actions') || ''}" /></td>
</tr>
<tr>
  <th>Include documentation comments:</th>
  <td><select name="docs">
    <option value="none">None</option>
    <option value="short"${searchParams.get('docs') == 'short' ? ' selected' : ''}>First lines only</option>
    <option value="full"${searchParams.get('docs') == 'full' ? ' selected' : ''}>Full documentation</option>
  </select></td>
</tr>
</table>
<input type="submit" />
</form>
<h2>Example Import</h2>
<p><code>import ${module.name} from "${origin}${pathname}${search}";</code></p>
<hr>
<h2>Generated Source (the actual code)</h2>
<pre>
${apiText}
</pre>
`, {
        status: 200,
        headers: {
          "server": "aws_api-generation/v0.3.1",
          "content-type": "text/html; charset=utf-8",
        }});
    }

    return new Response(apiText, {
      status: 200,
      headers: {
        "server": "aws_api-generation/v0.3.1",
        "content-type": wantsHtml ? "text/plain; charset=utf-8" : "application/x-typescript",
      }});
  }
  }

  {
  const match = pathname.match(/^\/(?:(v[0-9.]+)\/(?:sdk(@v2\.[0-9]+\.[0-9]+)?\/)?)?\/?$/);
  if (match) {
    if (!pathname.endsWith('/')) {
      return ResponseRedirect(pathname + '/' + search);
    }

    const modVer = (match[1] === 'v0' ? 'v0.3.1' : match[1]) || 'v0.3.1';
    const sdkVer = match[2]?.slice(1) || await SDK.getLatestSdkVersion();
    const sdk = new SDK(sdkVer);

    const serviceDict = await sdk.getServiceList();
    const serviceList = Object.entries(serviceDict).sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })

    return new Response(`<!doctype html>
<h1>AWS API Client Codegen</h1>
<p><strong>NOTICE</strong>:
  This codegen server / API is extremely likely to change over time!
  Currently for experimentation only!
</p>
<h2>Path parameters</h2>
<p>Service modules: <code>/v{deno-aws_api version}/sdk@{aws-sdk-js version}/{service ID}@{service api version}.ts</code></p>
<h2>Examples</h2>
<pre>
// import the complete API of one AWS service
import SQS from "${origin}/${modVer}/sdk@${sdkVer}/sqs.ts";
// be specific about which "API Version" to use (most APIs only have one)
import SQS from "${origin}/${modVer}/sdk@${sdkVer}/sqs@2012-11-05.ts";

// select individual actions to create a smaller API file
// in this case, excluding queue management actions and non-batched operations
import SQS from "${origin}/${modVer}/sdk@${sdkVer}/sqs@2012-11-05.ts?actions=ReceiveMessage,*Batch";
</pre>
<a href="https://github.com/cloudydeno/deno-aws_api/tree/main/generation">source code</a>
<h2>All Services</h2>
<table>
<thead><tr>
<th>Service</th>
<th>Usage</th>
<th>Docs</th>
</tr></thead>
<tbody>
${serviceList.map(([svcId, svc]) => `<tr>
<td><a href="/${modVer}/sdk@${sdkVer}/${svcId}.ts">${svc.name}</a></td>
<td><code>import ${svc.name} from "${origin}/v0/sdk/${svcId}.ts";</code></td>
<td><a href="https://doc.deno.land/${protocol.replace(/:$/, '')}/${host}/v0/sdk/${svcId}.ts%3Fdocs=full">Docs</a></td>
</tr>
`).join('')}
</tbody>
</table>
`, {
      status: 200,
      headers: {
        server: "aws_api-generation/v0.3.1",
        "content-type": "text/html; charset=utf-8",
      }});
  }
  }

  return new Response(`404 Not Found`, {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    }});
}


import ServiceCodeGen from '../code-gen.ts';

async function serveApi(opts: {
  clientModRoot: string,
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
  headerChunks.push(`//   AWS service UID ${opts.apiId}-${opts.apiVersion}`);
  headerChunks.push(`//   extra options: ${opts.options}`);
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

  const codeGen = new ServiceCodeGen({
    uid: `${opts.apiId}-${opts.apiVersion}`,
    api: spec.normal,
    pagers: opts.options.has('paginators') ? undefined : spec.paginators,
    waiters: opts.options.has('waiters') ? undefined : spec.waiters2,
  }, opts.options);

  return [
    headerChunks.join('\n'),
    `// Originally served at ${opts.selfUrl}`,
    codeGen.generateTypescript(module.name)
      .replaceAll('from "../..', `from "${opts.clientModRoot}`),
  ].join('\n\n');
}

// https://stackoverflow.com/a/32402438
function buildMatchRule(rule: string) {
  var escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$");
}

// TODO: Response.redirect() throws in Deno 1.9 unless url is absolute
function ResponseRedirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: { location },
  });
}
