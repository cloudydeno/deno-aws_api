export { httpTracer } from "https://deno.land/x/observability@v0.5.1/instrumentation/http-server.ts";
import { Attributes, Span, SpanStatusCode, trace } from "https://deno.land/x/observability@v0.5.1/opentelemetry/api.js";
export { trace };

import { DenoTelemetrySdk } from "https://deno.land/x/observability@v0.5.1/sdk.ts";
new DenoTelemetrySdk({
  resourceAttrs: {
    'service.name': 'aws-api',
  },
});

const tracer = trace.getTracer('logic-wrap');

export async function runAsyncSpan<T>(name: string, attributes: Attributes, fn: (span: Span) => Promise<T>) {
  return await tracer.startActiveSpan(name, {
    attributes,
  }, async span => {
    try {
      return await fn(span);
    } catch (err) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message,
      })
      span.recordException(err);
      throw err;
    } finally {
      span.end();
    }
  });
}

export function AsyncSpan<
  Targs extends unknown[],
  Tret,
>(
  fn: (...args: Targs) => Promise<Tret>,
  ctx: ClassMethodDecoratorContext,
) {
  return function (this: unknown, ...args: Targs) {
    return runAsyncSpan(String(ctx.name), {}, () =>
      fn.apply(this, args));
  };
}
