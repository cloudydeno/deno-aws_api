import { S3Bucket } from "https://deno.land/x/s3@0.4.0/mod.ts";
import { s3Cache } from "https://raw.githubusercontent.com/cloudydeno/deno_httpcache/s3-cache/s3.ts";
import { inMemoryCache } from "https://raw.githubusercontent.com/cloudydeno/deno_httpcache/s3-cache/in_memory.ts";
import type { Cache } from "https://raw.githubusercontent.com/cloudydeno/deno_httpcache/s3-cache/mod.ts";
// import type { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";

// const s3Api = makeS3Client('us-east-2');
// const s3Api = new S3(new ApiFactory());
const s3Api = new S3Bucket({
  accessKeyID: Deno.env.get('AWS_ACCESS_KEY_ID')!,
  secretKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
  sessionToken: Deno.env.get('AWS_SESSION_TOKEN'),
  bucket: Deno.env.get('HTTPCACHE_S3_BUCKET') || 'deno-httpcache',
  region: Deno.env.get('HTTPCACHE_S3_REGION') || 'us-east-2',
});
const caches: Array<Cache> = [
  inMemoryCache(20),
  s3Cache(s3Api),
];

export async function immutableFetch(url: string) {
  for (const cache of caches) {
    const cached = await cache.match(url);
    if (cached) {
      // Copy colder bodies into warmer caches
      const cacheIdx = caches.indexOf(cache);
      if (cacheIdx > 0) {
        await Promise.all(caches.slice(0, cacheIdx).map(cache => {
          cache.put(url, cached);
        }));
      }
      return cached;
    }
  }

  const resp = await fetch(url);
  if (resp.status === 200) {
    resp.headers.delete('expires');
    resp.headers.set('cache-control', 'immutable');
  } else if (resp.status === 404) {
    resp.headers.delete('expires');
    resp.headers.set('cache-control', 'maxage=3600');
  } else {
    resp.headers.set('cache-control', 'maxage=300');
  }
  console.log('fetched', resp.status, url);

  await Promise.all(caches.map(cache => {
    cache.put(url, resp);
  }));
  return resp;
}
