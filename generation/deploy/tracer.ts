export { httpTracer } from "https://deno.land/x/observability@v0.5.3/instrumentation/http-server.ts";
import { Attributes, Span, SpanStatusCode, Tracer, trace } from "https://deno.land/x/observability@v0.5.3/opentelemetry/api.js";
export { trace, type Span };

import { DenoTelemetrySdk } from "https://deno.land/x/observability@v0.5.3/sdk.ts";

new DenoTelemetrySdk({
  resourceAttrs: {
    'service.name': 'aws-api',
  },
});

export class AsyncTracer {
  tracer: Tracer;
  constructor(name: string, version?: string) {
    this.tracer = trace.getTracer(name, version);
  }

  async runAsyncSpan<T>(name: string, attributes: Attributes, fn: (span: Span) => Promise<T>) {
    return await this.tracer.startActiveSpan(name, {
      attributes,
    }, async span => {
      try {
        return await fn(span);
      } catch (thrown: unknown) {
        const err = thrown as Error;
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message,
        });
        span.recordException(err);
        throw err;
      } finally {
        span.end();
      }
    });
  }
}

const logicWrap = new AsyncTracer('logic-wrap');
export const runAsyncSpan = logicWrap.runAsyncSpan.bind(logicWrap);

// deno deploy decorators seem in a weird state for now
// so we don't use this yet

// export function AsyncSpan<
//   Targs extends unknown[],
//   Tret,
// >(
//   fn: (...args: Targs) => Promise<Tret>,
//   ctx: ClassMethodDecoratorContext,
// ) {
//   return function (this: unknown, ...args: Targs) {
//     return runAsyncSpan(String(ctx.name), {}, () =>
//       fn.apply(this, args));
//   };
// }
