import S3 from "../../lib/services/s3@2006-03-01/mod.ts";

import { s3Cache, makeS3Client } from "./s3-cache.ts";
import { assert, assertEquals } from "https://deno.land/x/httpcache@0.1.2/test_deps.ts";

Deno.test("[s3] cache, retrieve, delete", async () => {
  const s3Api = makeS3Client('us-east-2');
  // const s3Api = new S3(new ApiFactory());
  const cache = await s3Cache(s3Api, "deno-httpcache", "tests-");
  try {
    // const originalResp = new Response("Hello World", {
    //   status: 200,
    //   headers: {
    //     "server": "deno",
    //     "cache-control": "public, max-age=604800, immutable",
    //   },
    // });

    const resp = await fetch(`https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/metadata.json`);
    resp.headers.delete('expires');
    await cache.put("https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/metadata.json", resp);
    console.log(await cache.match("https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/metadata.json"));

    // const resp2 = await fetch(`https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/s3-2006-03-01.normal.json`);
    // await cache.put("https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/s3-2006-03-01.normal.json", resp2);
    // console.log(await cache.match("https://raw.githubusercontent.com/aws/aws-sdk-js/v2.875.0/apis/s3-2006-03-01.normal.json"));

    // const cachedResp = await cache.match("https://deno.land");
    // assert(cachedResp);
    // assertEquals(originalResp.status, cachedResp.status);
    // assertEquals(
    //   originalResp.headers.get("server"),
    //   cachedResp.headers.get("server"),
    // );
    // assertEquals(await originalResp.text(), await cachedResp.text());

    // await cache.delete("https://deno.land");

    // const otherCachedResp = await cache.match("https://deno.land");
    // assert(otherCachedResp === undefined);
  } finally {
    cache.close();
  }
});
