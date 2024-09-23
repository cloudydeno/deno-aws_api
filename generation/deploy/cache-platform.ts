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

      type CachePolicy = Parameters<ConstructorParameters<typeof Cache>[0]['set']>[1]['policy'];

      const {
        'cache-policy': policyHeader,
        ...resh
      } = Object.fromEntries(cached.headers.entries());

      if (!policyHeader) {
        console.warn('WARN: platform cache lacked policy', cached);
        return undefined;
      }
      const policy = {
        ...JSON.parse(policyHeader),
        resh,
      } as CachePolicy;

      const BodyBuffer = new Uint8Array(await cached.arrayBuffer());

      return {
        policy,
        body: BodyBuffer,
      };
    },

    async set(url, resp) {
      const {resh, ...rest} = resp.policy;
      await nativeCache.put(url, new Response(resp.body, {
        headers: {
          ...resh,
          'cache-policy': JSON.stringify(rest),
        },
      }));
    },

    async delete(url) {
      await nativeCache.delete(url);
    },

    close() {},
  });
}
