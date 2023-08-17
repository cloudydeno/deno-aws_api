export { httpTracer, trace } from "https://deno.land/x/observability@v0.4.2/mod.ts";

import { DenoTelemetrySdk } from "https://deno.land/x/observability@v0.4.2/sdk.ts";
new DenoTelemetrySdk({
  resourceAttrs: {
    'service.name': 'aws-api',
  },
});
