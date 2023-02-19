#!/usr/bin/env -S deno run --allow-net --allow-env

import { ApiFactory, EnvironmentCredentials } from "../../client/mod.ts";
import { S3 } from "../../services/s3/mod.ts";

if (Deno.args.length != 2) {
  console.error(``);
  console.error(`Usage: cloudflare-r2-upload.ts [BUCKET] [KEY] < FILE`);
  console.error(`The file or stream that you pipe in will be uploaded to the given location on S3.`);
  console.error(``);
  console.error(`Expected environment variables:`);
  console.error(`  CLOUDFLARE_R2_ACCESS_KEY_ID=<cloudflare token id>`);
  console.error(`  CLOUDFLARE_R2_SECRET_ACCESS_KEY=<cloudflare token secret>`);
  console.error(`  CLOUDFLARE_R2_REGION=<cloudflare r2 "Account" id>`);
  console.error(``);
  Deno.exit(2);
}

const r2 = new ApiFactory({
  credentialProvider: new EnvironmentCredentials('CLOUDFLARE_R2'),
  endpointResolver: {
    // Use detected credential region as as R2 "Account"
    resolveUrl: (params) => ({
      url: new URL(params.requestPath, `https://${params.region}.r2.cloudflarestorage.com`),
      signingRegion: 'auto',
    }),
  },
}).makeNew(S3);

const bodyBuffer = await new Response(Deno.stdin.readable).arrayBuffer();
console.error(`Uploading ${Math.ceil(bodyBuffer.byteLength/1024)}KB standard input to r2://${Deno.args.join('/')} ...`);

const result = await r2.putObject({
  Bucket: Deno.args[0],
  Key: Deno.args[1],
  Body: new Uint8Array(bodyBuffer),
});

console.error(`Upload complete:`, result);
