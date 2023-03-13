import {
  DenoTracerProvider,
  OTLPTraceFetchExporter,
  httpTracer,
  DenoFetchInstrumentation,
  SubProcessInstrumentation,
  Resource,
  trace,
} from "https://raw.githubusercontent.com/cloudydeno/deno-observability/17c0c0621e416cbaa2dacdf14ac9388cb9d9c91d/tracing/mod.ts";
import { GcpBatchSpanExporter } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/17c0c0621e416cbaa2dacdf14ac9388cb9d9c91d/tracing/exporters/google-cloud.ts";
import { GoogleCloudPropagator } from "https://raw.githubusercontent.com/cloudydeno/deno-observability/17c0c0621e416cbaa2dacdf14ac9388cb9d9c91d/tracing/propagators/google-cloud.ts";

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
