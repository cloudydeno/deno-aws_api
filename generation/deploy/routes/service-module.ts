import { SDK } from "../sdk-datasource.ts";
import { Generations, ModuleGenerator } from "../generations.ts";
import { escapeTemplate, ResponseText } from "../helpers.ts";

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
  const fullOptions = generation.setDefaults(props.params);

  let apiText = await generateApiModule({
    generation,
    generationId: props.genVer,
    sdkVersion: sdkVersion,
    apiId: props.service,
    apiVersion: apiVersion,
    options: props.params,
    selfUrl: props.selfUrl,
  });

  if (props.wantsHtml) {
    const sdk = new SDK(sdkVersion);
    const serviceList = await sdk.getServiceList();
    const module = serviceList[props.service];
    if (!module) return ResponseText(404, `Service Not Found: ${props.service}`);

    const fullDocsUrl = new URL(props.selfUrl);
    fullDocsUrl.searchParams.set('docs', 'full');

    return new Response(escapeTemplate`<!doctype html>
<title>${module.name} - AWS API Codegen</title>
<h1>${module.name} - AWS API Codegen</h1>
<p>
<strong>API Documentation</strong>
| <a href="https://doc.deno.land/${fullDocsUrl.toString().replace('?', '%3F')}/~/${module.name}">Deno Module Docs</a>
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


async function generateApiModule(opts: {
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
