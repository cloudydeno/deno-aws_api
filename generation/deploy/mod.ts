#!/usr/bin/env -S deno run --allow-env --allow-net=[::]:8000,api.github.com,raw.githubusercontent.com,deno-httpcache.s3.dualstack.us-east-2.amazonaws.com generation/deploy/mod.ts
import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

import { ResponseError, ResponseText } from "./helpers.ts";

import { routeMap as serviceModuleRoutes } from "./routes/service-module.ts";
import { routeMap as serviceListingRoutes } from "./routes/service-listing.ts";
import { routeMap as redirectRoutes } from './routes/redirects.ts';
import { routeMap as completionRoutes } from './routes/completion-api.ts';

serve(async request => {
  const response = await handleRequest(request);
  response.headers.set("server", "aws_api-generation/v0.4.0");
  return response;
}, {
  hostname: '[::]',
  onError: ResponseError,
});
console.log("Listening on http://localhost:8000");

const routeMap = new Map([
  // Might as well put module rendering first in the list because it needs the most CPU time
  ...serviceModuleRoutes,
  ...serviceListingRoutes,
  ...redirectRoutes,
  ...completionRoutes,
]);

async function handleRequest(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  console.log(request.method, requestUrl.pathname);

  for (const [route, handler] of routeMap) {
    if (typeof route == 'string') {
      if (route == requestUrl.pathname) {
        return await handler({
          params: {},
          requestUrl,
          headers: request.headers,
        });
      }
    } else {
      const match = route.exec(requestUrl);
      if (match) {
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
