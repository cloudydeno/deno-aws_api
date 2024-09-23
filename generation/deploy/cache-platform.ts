import { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";
import { trace } from "./tracer.ts";

// https://docs.deno.com/deploy/manual/edge-cache

function transformUrl(url: string) {
  return url.replace(/\/\/[^\/]+\//, '//upstream-cache-v1/');
}

export async function platformCache(
  name = 'http-policy-cache',
): Promise<Cache> {

  const nativeCache = await caches.open(name);

  return new Cache({

    async get(url) {
      const cached = await nativeCache.match(transformUrl(url));

      trace.getActiveSpan()?.addEvent('edgecache', {
        'cache.result': cached ? 'hit' : 'miss',
      });

      if (!cached) return undefined;

      type CachePolicy = Parameters<ConstructorParameters<typeof Cache>[0]['set']>[1]['policy'];

      const {
        'cache-policy': policyHeader,
        ...resh
      } = Object.fromEntries(cached.headers.entries());

      if (!policyHeader) {
        trace.getActiveSpan()?.addEvent('edgecache.fail', {
          'message': 'platform cache hit lacked policy',
        });
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
      await nativeCache.put(transformUrl(url), new Response(resp.body, {
        headers: {
          ...resh,
          'cache-policy': JSON.stringify(rest),
        },
      }));
    },

    async delete(url) {
      await nativeCache.delete(transformUrl(url));
    },

    close() {},
  });
}
