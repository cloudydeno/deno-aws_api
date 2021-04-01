import * as S3 from "https://deno.land/x/s3@0.4.0/mod.ts";
import { s3Cache } from "./x-s3-cache.ts";
import { inMemoryCache } from "https://deno.land/x/httpcache@0.1.2/in_memory.ts";
import type { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";

// const s3Api = makeS3Client('us-east-2');
// const s3Api = new S3(new ApiFactory());
const s3Api = new S3.S3Bucket({
  accessKeyID: Deno.env.get('AWS_ACCESS_KEY_ID')!,
  secretKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
  sessionToken: Deno.env.get('AWS_SESSION_TOKEN'),
  bucket: Deno.env.get('HTTPCACHE_S3_BUCKET') || 'deno-httpcache',
  region: Deno.env.get('HTTPCACHE_S3_REGION') || 'us-east-2',
});
const caches: Array<Cache> = [
  inMemoryCache(10),
  s3Cache(s3Api/*, "deno-httpcache"*/),
];

export async function immutableFetch(url: string) {
  for (const cache of caches) {
    const cached = await cache.match(url);
    if (cached) return cached;
  }

  console.log('fetch', url);
  const resp = await fetch(url);
  if (resp.status === 200) {
    resp.headers.delete('expires');
  }

  console.log('put', url, resp.status);
  await Promise.all(caches.map(cache => cache.put(url, resp)));

  return resp;
}
