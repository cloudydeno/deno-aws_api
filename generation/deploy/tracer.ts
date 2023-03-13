import {
  DenoTracerProvider,
  OTLPTraceFetchExporter,
  httpTracer,
  DenoFetchInstrumentation,
  Resource,
  trace,
} from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9d996d1ce0ba6b15641cbc882b15fc63992418b9/tracing/mod.ts";
import { GcpBatchSpanExporter } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9d996d1ce0ba6b15641cbc882b15fc63992418b9/tracing/exporters/google-cloud.ts";
import { GoogleCloudPropagator } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9d996d1ce0ba6b15641cbc882b15fc63992418b9/tracing/propagators/google-cloud.ts";

export { httpTracer, trace };

export const provider = new DenoTracerProvider({
  resource: new Resource({
    'service.name': 'aws-api',
    'service.version': Deno.env.get('DENO_DEPLOYMENT_ID'),
    'deployment.environment': 'production',
    'deployment.region': Deno.env.get('DENO_REGION'),
  }),
  propagator: new GoogleCloudPropagator(),
  instrumentations: [
    new DenoFetchInstrumentation(),
  ],
  batchSpanProcessors: [
    new GcpBatchSpanExporter(),
    // new OTLPTraceFetchExporter(),
  ],
});
