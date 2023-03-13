import { SDK } from "../sdk-datasource.ts";
import { Generations, ModuleGenerator } from "../generations.ts";
import { ClientError, escapeTemplate, getModuleIdentity, jsonTemplate, Pattern, ResponseRedirect, ResponseText, RouteHandler, acceptsHtml } from "../helpers.ts";
import { getMetricContext } from "../metric-context.ts";
import { Api, Examples, Pagination, ServiceMetadata, Waiters } from "../../sdk-schema.ts";

const serviceFilePattern = `:service([^/.@]+){@:svcVer(20[0-9-]+)}?.ts`;
const handleRequest: RouteHandler = ctx => {
  const {genVer, sdkVer, service, svcVer} = ctx.params;
  const {selfUrl, params} = getModuleIdentity(ctx.requestUrl);
  return renderServiceModule({
    genVer, sdkVer, service, svcVer,
    selfUrl, params,
    wantsHtml: acceptsHtml(ctx.headers),
  });
};
export const routeMap = new Map<string | URLPattern, RouteHandler>([
  [Pattern(`/:genVer(v[0-9.]+)/sdk@:sdkVer(v2\\.[0-9.]+)/${serviceFilePattern}`), handleRequest],
  [Pattern(`/:genVer(v[0-9.]+)/services/${serviceFilePattern}`), handleRequest],
]);

type ApiBundle = {
  normal: Api;
  paginators: Pagination;
  waiters2: Waiters;
  examples: Examples;
}

async function loadApiDefinitions(props: {
  sdk: SDK;
  service: string;
  apiVersion: string;
}) {

  const serviceList = await props.sdk.getServiceList();
  const module = serviceList[props.service];
  if (!module) throw new ClientError(404, jsonTemplate
    `API ${props.service} not found. Check the API listing for exact spelling.`);

  const spec = await props.sdk
    .getApiSpecs(module.prefix || props.service, props.apiVersion, {
      normal: 'required',
      paginators: 'optional',
      waiters2: 'optional',
    });

  return {module, spec};
}


import { trace } from "../tracer.ts";
const tracer = trace.getTracer('service-module');

export async function renderServiceModule(props: {
  genVer: string;
  sdkVer: string;
  service: string;
  svcVer: string;
  wantsHtml: boolean;
  params: URLSearchParams,
  selfUrl: string;
}) {
  const generation = Generations.get(props.genVer);
  if (!generation) return ResponseText(404,
    `Codegen version '${props.genVer}' not found.\nKnown versions: ${Array.from(Generations.keys()).join(', ')}`);

  const sdkVersion = props.sdkVer || generation.sdkVersion;
  const apiVersion = props.svcVer || await new SDK(sdkVersion).getLatestApiVersion(props.service);
  const fullOptions = generation.withDefaults(props.params);

  const dStart = performance.now();

  const sdk = new SDK(sdkVersion);
  const serviceList = await sdk.getServiceList();

  const {module, spec} = await loadApiDefinitions({
    sdk,
    apiVersion,
    service: props.service,
  })

  const span = tracer.startSpan('render module', {
    attributes: {
      generationId: props.genVer,
      sdkVersion: sdkVersion,
      apiId: props.service,
      apiVersion: apiVersion,
    }
  });

  const dGen = performance.now();
  let apiText = generateApiModule({
    generation,
    generationId: props.genVer,
    sdkVersion: sdkVersion,
    apiId: props.service,
    apiVersion: apiVersion,
    options: props.params,
    selfUrl: props.selfUrl,
    module,
    spec,
  });
  const dEnd = performance.now();
  span.end();

  const ctx = getMetricContext();
  const tags = [
    `aws_gen_ver:${props.genVer}`,
    `aws_sdk_ver:${props.sdkVer ?? 'default'}`,
    `aws_svc_id:${props.service}`,
    `aws_svc_ver:${props.svcVer ?? 'latest'}`,
    `wants_html:${props.wantsHtml}`,
    `has_action_filter:${props.params.get('actions') ? 'yes' : 'no'}`,
    `aws_doc_mode:${props.params.get('actions') ? 'yes' : 'no'}`,
  ];
  ctx.incrementCounter('aws_api_codegen.invocations', 1, tags);
  ctx.incrementCounter('aws_api_codegen.module_length', apiText.length, tags);
  ctx.setGauge('aws_api_codegen.latency.ms', dGen - dStart, [...tags, `codegen_phase:fetch`]);
  ctx.setGauge('aws_api_codegen.latency.ms', dEnd - dGen, [...tags, `codegen_phase:generate`]);

  if (props.wantsHtml) {
    const module = serviceList[props.service];
    if (!module) return ResponseText(404, `Service Not Found: ${props.service}`);

    const fullDocsUrl = new URL(props.selfUrl);
    fullDocsUrl.searchParams.set('docs', 'full');

    return new Response(escapeTemplate`<!doctype html>
<title>${module.name} - AWS API Codegen</title>
<h1>${module.name} - AWS API Codegen</h1>
<p>
<strong>API Documentation</strong>
| <a rel="nofollow" href="https://doc.deno.land/${fullDocsUrl.toString().replace('?', '%3F')}/~/${module.name}">Deno Module Docs</a>
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
  <option value="${generation.defaults.get('docs') == 'none' ? '' : 'none'}"${fullOptions.get('docs') == 'none' ? ' selected' : ''}>None</option>
  <option value="${generation.defaults.get('docs') == 'short' ? '' : 'short'}"${fullOptions.get('docs') == 'short' ? ' selected' : ''}>First lines only</option>
  <option value="${generation.defaults.get('docs') == 'full' ? '' : 'full'}"${fullOptions.get('docs') == 'full' ? ' selected' : ''}>Full documentation</option>
</select></td>
</tr>
</table>
<input type="submit" />
</form>
<h2>Example Import</h2>
<p><code>import { ${module.name} } from "${props.selfUrl}";</code></p>
<hr>
<h2>Generated Source (the actual code)</h2>
<pre>
${apiText}
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
      "content-type": props.wantsHtml ? "text/plain; charset=utf-8" : "application/x-typescript",
    }});
}


function generateApiModule(opts: {
  module: ServiceMetadata,
  spec: ApiBundle,
  generation: ModuleGenerator,
  generationId: string;
  sdkVersion: string,
  apiId: string,
  apiVersion: string,
  options: URLSearchParams,
  selfUrl: string,
}) {
  const headerChunks = new Array<string>();
  headerChunks.push(`// Generation parameters:`);
  headerChunks.push(`//   aws-sdk-js definitions from ${opts.sdkVersion}`);
  headerChunks.push(`//   AWS service UID: ${opts.apiId}-${opts.apiVersion}`);
  headerChunks.push(`//   code generation: ${opts.generationId}`);
  if (opts.options.toString()) {
    headerChunks.push(`//   extra options:`);
    for (const [k, v] of opts.options) {
      headerChunks.push(jsonTemplate`//     ${k} = ${v}`);
    }
  }
  headerChunks.push(`//   generated at: ${new Date().toISOString().split('T')[0]}`);

  const actionList = opts.options.get('actions')?.split(',') ?? [];
  if (actionList.length) {
    const allOps = Object.entries(opts.spec.normal.operations);
    const patternList = actionList.map(buildMatchRule);
    opts.spec.normal.operations = {};
    for (const [key, op] of allOps) {
      if (patternList.some(x => x.test(key))) {
        opts.spec.normal.operations[key] = op;
      }
    }
    const afterCount = Object.keys(opts.spec.normal.operations).length;
    headerChunks.push(`//   skipped ${allOps.length-afterCount} out of ${allOps.length} actions, leaving ${afterCount}`);
    if (afterCount == 0) throw new ClientError(400, jsonTemplate
      `No ${opts.apiId} actions matched the given filter ${opts.options.get('actions')}`);
  }

  return [
    headerChunks.join('\n'),
    `// Originally served at ${opts.selfUrl}`,
    opts.generation.buildApi({
      className: opts.module.name,
      options: opts.options,
      apiSpecs: {
        api: opts.spec.normal,
        pagers: opts.spec.paginators,
        waiters: opts.spec.waiters2,
      },
    }),
  ].join('\n\n');
}

// https://stackoverflow.com/a/32402438
function buildMatchRule(rule: string) {
  var escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$");
}
