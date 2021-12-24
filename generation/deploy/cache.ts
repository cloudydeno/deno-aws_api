import { inMemoryCache } from "https://deno.land/x/httpcache@0.1.2/in_memory.ts";
import type { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";
import { makeS3Client, s3Cache } from "./cache-s3.ts";

const s3Api = makeS3Client({
  awsAccessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID')!,
  awsSecretKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
  sessionToken: Deno.env.get('AWS_SESSION_TOKEN'),
  region: Deno.env.get('AWS_REGION') || 'us-east-2',
});
const caches: Array<Cache> = [
  inMemoryCache(40),
  s3Cache(s3Api, Deno.env.get('HTTPCACHE_S3_BUCKET') || 'deno-httpcache'),
];

export async function cachedFetch(mode: 'immutable' | 'mutable', url: string) {
  for (const cache of caches) {
    const cached = await cache.match(url).catch(err => {
      console.error(`WARN: cache lookup err:`, err.message);
      return null;
    });
    if (cached) {
      // Copy colder bodies into warmer caches
      const cacheIdx = caches.indexOf(cache);
      if (cacheIdx > 0) {
        await Promise.all(caches
          .slice(0, cacheIdx)
          .map(cache => cache.put(url, cached)));
      }
      return cached;
    }
  }

  const realResp = await fetch(url);
  console.log('fetched', realResp.status, url);

  // works around https://github.com/denoland/deno/issues/10367
  const resp = new Response(realResp.body, {
    status: realResp.status,
    statusText: realResp.statusText,
    headers: realResp.headers,
  });

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
    .map(cache => cache.put(url, resp).catch(err => {
      console.error(`WARN: cache store err:`, err.message);
      return null;
    })));

  return resp;
}
