import { httpTracer, trace, DenoFetchInstrumentation, DenoTracerProvider, OTLPTraceFetchExporter, Resource } from "https://deno.land/x/observability@v0.2.0/tracing/mod.ts";
import { GoogleCloudPropagator } from "https://deno.land/x/observability@v0.2.0/tracing/propagators/google-cloud.ts";
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
    new OTLPTraceFetchExporter(),
  ],
});
