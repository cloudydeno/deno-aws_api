#!/usr/bin/env -S deno run --watch --allow-env --allow-net --allow-read --allow-sys

import { ResponseError, ResponseText } from "./helpers.ts";
import { getMetricContext, runWithMetricContext } from "./metric-context.ts";
import { httpTracer, trace } from "./tracer.ts";

import { routeMap as unifiedModuleRoutes } from "./routes/unified-module.ts";
import { routeMap as serviceModuleRoutes } from "./routes/service-module.ts";
import { routeMap as serviceListingRoutes } from "./routes/service-listing.ts";
import { routeMap as redirectRoutes } from './routes/redirects.ts';
import { routeMap as completionRoutes } from './routes/completion-api.ts';
import { routeMap as robotsRoutes } from './routes/robots.ts';

Deno.serve({
  hostname: '[::]',
  onError: ResponseError,
}, httpTracer(async (request) => {
  const span = trace.getActiveSpan();
  let response: Response;
  try {
    response = await runWithMetricContext(() => handleRequest(request));
  } catch (e) {
    span?.recordException(e);
    response = ResponseError(e);
  }
  response.headers.set("server", "aws_api-generation/v0.4.0");
  return response;
}));

const routeMap = new Map([
  // Might as well put module rendering first in the list because it needs the most CPU time
  ...unifiedModuleRoutes,
  ...serviceModuleRoutes,
  ...serviceListingRoutes,
  ...redirectRoutes,
  ...completionRoutes,
  ...robotsRoutes,
]);

async function handleRequest(request: Request): Promise<Response> {
  const ctx = getMetricContext();
  const span = trace.getActiveSpan();
  span?.setAttribute('http.user_agent_prefix', request.headers.get('user-agent')?.split('/')[0] ?? 'none');
  const reqs = ctx.withCounter('http.server.requests', [
    `http_method:${request.method}`,
    `http_ua_class:${request.headers.get('user-agent')?.split('/')[0]}`,
  ]);
  reqs.incr();

  const startTime = performance.now();
  try {

    const resp = await routeRequest(request).catch(ResponseError);
    reqs.tags.push(`http_status:${resp.status}`);
    return resp;

  } finally {
    ctx.setGauge('http.server.latency_ms', performance.now() - startTime, reqs.tags);

    ctx.flushMetrics().catch(err => {
      console.error(`FAILED to flush metrics!`);
      console.error((err as Error).message ?? err);
    });
  }
}

async function routeRequest(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  console.log(request.method, requestUrl.pathname);

  for (const [route, handler] of routeMap) {
    if (typeof route == 'string') {

      if (route == requestUrl.pathname) {
        trace.getActiveSpan()?.setAttribute('http.route', route);

        return await handler({
          params: {},
          requestUrl,
          headers: request.headers,
        });
      }
    } else {

      const match = route.exec(requestUrl);
      if (match) {
        trace.getActiveSpan()?.setAttributes(getRegexRouteAttributes(route, match));

        return await handler({
          params: match.pathname.groups,
          requestUrl,
          headers: request.headers,
        });
      }
    }
  }

  return ResponseText(404, `404 Not found.\nI even checked all my routes for you.`);
}

function getRegexRouteAttributes(route: URLPattern, match: URLPatternResult) {
  const paramAttrs = Object.fromEntries(Object
    .entries(match.pathname.groups)
    .map(x => [
      `http.route_param.${x[0].replaceAll(/[A-Z]/g, x => `_${x[0].toLowerCase()}`)}`,
      x[1],
    ]));

  paramAttrs['http.route'] = route.pathname
    .replaceAll(/\([^)]+\)/g, '')
    .replace(/\{\/\}\?$/, '/');

  return paramAttrs;
}
