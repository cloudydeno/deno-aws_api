import { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";

// https://docs.deno.com/deploy/manual/edge-cache

export async function platformCache(
  name = 'http-policy-cache',
): Promise<Cache> {

  const nativeCache = await caches.open(name);

  return new Cache({

    async get(url) {
      const cached = await nativeCache.match(url);
      if (!cached) return undefined;

      const policyHeader = cached.headers.get('cache-policy');
      if (!policyHeader) {
        console.warn('WARN: platform cache lacked policy', cached);
        return undefined;
      }

      const BodyBuffer = new Uint8Array(await cached.arrayBuffer());

      // const idx = BodyBuffer.indexOf(10);
      return {
        // policy: JSON.parse(new TextDecoder().decode(BodyBuffer.slice(0, idx))),
        policy: JSON.parse(policyHeader),
        // body: BodyBuffer.slice(idx+1),
        body: BodyBuffer,
      };
    },

    async set(url, resp) {
      await nativeCache.put(url, new Response(resp.body, {
        headers: {
          'cache-policy': JSON.stringify(resp.policy),
        },
      }));
    },

    async delete(url) {
      await nativeCache.delete(url);
    },

    close() {},
  });
}
