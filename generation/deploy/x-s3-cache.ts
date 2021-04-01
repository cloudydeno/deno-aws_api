import type { S3Bucket } from "https://deno.land/x/s3@0.4.0/src/bucket.ts";
import { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";
export { Cache };

export function s3Cache(
  s3: S3Bucket,
  prefix = "",
): Cache {

  function urlKey(url: string) {
    return prefix + url.replace('://', '/');
  }

  return new Cache({
    async get(url) {
      const data = await s3.getObject(urlKey(url));
      if (!data) return data;
      return {
        policy: JSON.parse(data.meta['cache-policy'] || '{}'),
        body: new Uint8Array(await new Response(data.body).arrayBuffer()),
      };
    },
    async set(url, resp) {
      await s3.putObject(urlKey(url), resp.body, {
        meta: {
          ['cache-policy']: JSON.stringify(resp.policy),
        },
      });
    },
    async delete(url) {
      await s3.deleteObject(urlKey(url));
    },
    close() {},
  });
}
