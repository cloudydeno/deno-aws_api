import * as S3 from "https://deno.land/x/s3@0.4.0/mod.ts";
import { s3Cache } from "./x-s3-cache.ts";
import { assert, assertEquals } from "https://deno.land/x/httpcache@0.1.2/test_deps.ts";

Deno.test("[s3] cache, retrieve, delete", async () => {
  const s3Api = new S3.S3Bucket({
    accessKeyID: Deno.env.get('AWS_ACCESS_KEY_ID')!,
    secretKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
    sessionToken: Deno.env.get('AWS_SESSION_TOKEN'),
    bucket: 'deno-httpcache',
    region: 'us-east-2',
  });
  const cache = await s3Cache(s3Api, "tests-");
  try {
    const originalResp = new Response("Hello World", {
      status: 200,
      headers: {
        "server": "deno",
        "cache-control": "public, max-age=604800, immutable",
      },
    });

    await cache.put("https://deno.land", originalResp);

    const cachedResp = await cache.match("https://deno.land");
    assert(cachedResp);
    assertEquals(originalResp.status, cachedResp.status);
    assertEquals(
      originalResp.headers.get("server"),
      cachedResp.headers.get("server"),
    );
    assertEquals(await originalResp.text(), await cachedResp.text());

    await cache.delete("https://deno.land");

    const otherCachedResp = await cache.match("https://deno.land");
    assert(otherCachedResp === undefined);
  } finally {
    cache.close();
  }
});
