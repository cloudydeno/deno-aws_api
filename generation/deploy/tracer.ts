export { httpTracer } from "https://deno.land/x/observability@v0.5.1/instrumentation/http-server.ts";
export { trace, SpanKind } from "https://deno.land/x/observability@v0.5.1/opentelemetry/api.js";

import { DenoTelemetrySdk } from "https://deno.land/x/observability@v0.5.1/sdk.ts";

new DenoTelemetrySdk({
  resourceAttrs: {
    'service.name': 'aws-api',
  },
});
