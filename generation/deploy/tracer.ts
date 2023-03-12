import {
  DenoTracerProvider,
  OTLPTraceFetchExporter,
  httpTracer,
  DenoFetchInstrumentation,
  SubProcessInstrumentation,
  Resource,
} from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9eb9efdc12eecdd37e15165bb1875e152612cbbf/tracing/mod.ts";
import { GcpBatchSpanExporter } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9eb9efdc12eecdd37e15165bb1875e152612cbbf/tracing/exporters/google-cloud.ts";
import { GoogleCloudPropagator } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/9eb9efdc12eecdd37e15165bb1875e152612cbbf/tracing/propagators/google-cloud.ts";

export { httpTracer };

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
