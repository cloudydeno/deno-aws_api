#!/usr/bin/env -S deno run --allow-env --allow-net=[::]:8000,api.github.com,raw.githubusercontent.com,deno-httpcache.s3.dualstack.us-east-2.amazonaws.com generation/deploy/mod.ts
import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

import * as CompletionApi from './completion-api.ts';
import { LatestGeneration } from "./generations.ts";
import { ResponseError, ResponseRedirect, ResponseText } from "./helpers.ts";

import { renderServiceModule } from "./routes/service-module.ts";
import { renderServiceListing } from "./routes/service-listing.ts";

serve(async request => {
  const response = await handleRequest(request).catch(ResponseError);
  response.headers.set("server", "aws_api-generation/v0.4.0");
  return response;
}, { hostname: '[::]' });
console.log("Listening on http://localhost:8000");

async function handleRequest(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const {pathname} = requestUrl;

  console.log(request.method, pathname);
  const wantsHtml = request.headers.get('accept')?.split(',').some(x => x.startsWith('text/html')) ?? false;

  if (pathname.startsWith('/.well-known/') || pathname.startsWith('/.completions/')) {
    return await CompletionApi.handleRequest(request);
  }

  const params = requestUrl.searchParams;
  if (params.get('actions') === '') {
    params.delete('actions');
  }
  if (params.get('docs') === '') {
    params.delete('docs');
  }
  const search = `${params.toString() ? '?' : ''}${params}`;
  const selfUrl = `${requestUrl.origin}${pathname}${search}`;
  params.sort();

  if (pathname.match(/^\/latest(\/|$)/)) {
    return ResponseRedirect(`/${LatestGeneration}/${pathname.slice('/latest/'.length)}${search}`, {
      'x-deno-warning': `Using latest revision (${LatestGeneration}) of the aws-api codegen`,
    });
  }

  {
    const match = pathname.match(/^\/(?<genVer>v[0-9.]+)\/(?:sdk@(?<sdkVer>v2\.[0-9]+\.[0-9]+)|services)\/(?<service>[^/.@]+)(?:@(?<svcVer>20[0-9-]+))?.ts$/);
    if (match) {
      const {genVer, sdkVer, service, svcVer} = match.groups!;
      return await renderServiceModule({
        genVer, sdkVer, service, svcVer,
        wantsHtml,
        params,
        selfUrl,
      });
    }
  }

  {
    const match = pathname.match(/^\/(?:(?<genVer>v[0-9.]+)(?:\/(?:sdk@(?<sdkVer>v2\.[0-9]+\.[0-9]+)|services))?\/?)?$/);
    if (match) {
      if (!pathname.endsWith('/')) {
        return ResponseRedirect(pathname + '/' + search);
      }

      const {genVer, sdkVer} = match.groups!;
      return await renderServiceListing({
        genVer, sdkVer,
        selfUrl,
      })
    }
  }

  return ResponseText(404, `404 Not Found`);
}
