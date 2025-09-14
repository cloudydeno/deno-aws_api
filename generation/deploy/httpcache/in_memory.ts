// Downloaded from https://deno.land/x/httpcache@0.1.2/in_memory.ts

import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";
import { Cache, CachedResponse } from "./mod.ts";
export { Cache };

export function inMemoryCache(capacity: number): Cache {
  const lru = new LRU<CachedResponse>(capacity);
  return new Cache({
    get(url) {
      return Promise.resolve(lru.get(url));
    },
    set(url, resp) {
      lru.set(url, resp);
      return Promise.resolve();
    },
    delete(url) {
      lru.remove(url);
      return Promise.resolve();
    },
    close() {
      lru.clear();
    },
  });
}
