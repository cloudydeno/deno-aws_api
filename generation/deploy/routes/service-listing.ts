import { SDK } from "../sdk-datasource.ts";
import { Generations, LatestGeneration } from "../generations.ts";
import { escapeTemplate, ResponseText } from "../helpers.ts";

export async function renderServiceListing(props: {
  genVer: string;
  sdkVer: string;
  selfUrl: string;
}) {
  const genVersion = props.genVer || LatestGeneration;

  const generation = Generations.get(genVersion);
  if (!generation) return ResponseText(404,
    `Codegen version '${genVersion}' not found.\nKnown versions: ${Array.from(Generations.keys()).join(', ')}`);

  const sdkVersion = props.sdkVer || generation.sdkVersion;
  const sdk = new SDK(sdkVersion);

  const modRoot = `/${genVersion}/${props.sdkVer ? `sdk@${sdkVersion}` : 'services'}`;
  const baseUrl = new URL(modRoot, props.selfUrl).toString();

  const serviceDict = await sdk.getServiceList();
  const serviceList = Object.entries(serviceDict).sort((a, b) => {
    return a[0].localeCompare(b[0]);
  })

  const pageHead = escapeTemplate`
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
import { SQS } from "${baseUrl}/sqs.ts";
const sqs = new ApiFactory().makeNew(SQS);

// be specific about which "API Version" to use (most APIs only have one)
import { SQS } from "${baseUrl}/sqs@2012-11-05.ts";

// select individual actions to create a smaller API file
// in this case, excluding queue management actions and non-batched operations
import { SQS } from "${baseUrl}/sqs@2012-11-05.ts?actions=ReceiveMessage,*Batch";
</pre>
<a href="https://github.com/cloudydeno/deno-aws_api/tree/main/generation">source code</a>
<h2>All Services</h2>
<p>${props.sdkVer ? `Using` : `Defaulted to`} definitions from <a href="https://github.com/aws/aws-sdk-js/releases/tag/${sdkVersion}">aws-sdk-js@${sdkVersion}</a></p>
`;

const serviceTable = `<table>
<thead><tr>
<th>Service</th>
<th>Usage</th>
<th>Docs</th>
</tr></thead>
<tbody>
${serviceList.map(([svcId, svc]) => escapeTemplate`<tr>
<td><a href="${modRoot}/${svcId}.ts">${svc.name}</a></td>
<td><code>import { ${svc.name} } from "${baseUrl}/${svcId}.ts";</code></td>
<td><a href="https://doc.deno.land/${baseUrl}${svcId}.ts%3Fdocs=full/~/${svc.name}">Docs</a></td>
</tr>
`).join('')}
</tbody>
</table>`;

  return new Response([
    `<!doctype html>`,
    pageHead,
    serviceTable,
  ].join('\n\n'), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    }});
}
