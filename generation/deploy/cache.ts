import { inMemoryCache } from "https://deno.land/x/httpcache@0.1.2/in_memory.ts";
import type { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";
import { getMetricContext } from "./metric-context.ts";
import { s3Cache } from "./cache-s3.ts";
import { S3 } from "./s3-api.ts";
import { ApiFactory } from "../../lib/client/mod.ts";

const s3Api = new ApiFactory({
  region: Deno.env.get('HTTPCACHE_S3_REGION') || 'us-east-2',
}).makeNew(S3);

const caches: Array<Cache> = [
  inMemoryCache(40),
  s3Cache(s3Api, Deno.env.get('HTTPCACHE_S3_BUCKET') || 'deno-httpcache'),
];

export async function cachedFetch(mode: 'immutable' | 'mutable', label: string, url: string) {

  const ctx = getMetricContext();
  const tags = [
    `cache_label:${label}`,
    `cache_mode:${mode}`,
  ];
  ctx.incrementCounter('tiered_cache.gets', 1, tags);
  const startTime = performance.now();

  for (const [cacheIdx, cache] of caches.entries()) {
    const cached = await cache.match(url).catch(err => {
      console.error(`WARN: cache lookup err:`, err.message);
      ctx.incrementCounter('tiered_cache.errors', 1, [...tags,
        `cache_action:load`,
        `cache_index:${cacheIdx}`,
      ]);
      return null;
    });
    if (cached) {
      tags.push(`cache_result:hit`);
      tags.push(`cache_index:${cacheIdx}`);

      // Copy colder bodies into warmer caches
      if (cacheIdx > 0) {
        await Promise.all(caches
          .slice(0, cacheIdx)
          .map(cache => cache.put(url, cached)));
      }

      ctx.setGauge('tiered_cache.latency_ms', performance.now() - startTime, tags);
      return cached;
    }
  }

  const realResp = await fetch(url);
  console.log('fetched', realResp.status, url);

  ctx.incrementCounter('tiered_cache.fetches', 1, [...tags,
    `http_status:${realResp.status}`,
  ]);
  tags.push(`cache_result:miss`);

  const resp = new Response(realResp.body, realResp);

  if (mode === 'immutable') {
    if (resp.status === 200) {
      resp.headers.delete('expires');
      resp.headers.set('cache-control', 'immutable');
    } else if (resp.status === 404) {
      resp.headers.delete('expires');
      resp.headers.set('cache-control', 'max-age=3600');
    } else {
      resp.headers.set('cache-control', 'max-age=300');
    }
  } else {
    resp.headers.set('cache-control', 'max-age=300');
  }

  // TODO: should this be awaited or not?
  await Promise.all(caches
    .map((cache, cacheIdx) => cache.put(url, resp).catch(err => {
      console.error(`WARN: cache store err:`, err.message);
      ctx.incrementCounter('tiered_cache.errors', 1, [...tags,
        `cache_action:store`,
        `cache_index:${cacheIdx}`,
      ]);
      return null;
    })));

  ctx.setGauge('tiered_cache.latency_ms', performance.now() - startTime, tags);
  return resp;
}
