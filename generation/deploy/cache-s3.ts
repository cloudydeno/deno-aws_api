import { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";

import { S3 } from "./s3-api.ts";
import { Credentials } from '../../lib/client/common.ts';
import { BaseApiFactory } from '../../lib/client/client.ts';
import { AwsEndpointResolver } from "../../lib/client/endpoints.ts";

export function s3Cache(
  s3Client: S3,
  bucketName: string,
  prefix = "",
): Cache {

  function s3Coords(url: string) {
    const key = url.replace('://', '/');
    return {
      Bucket: bucketName,
      Key: prefix + key + '.cache',
    };
  }

  return new Cache({

    async get(url) {
      try {
        console.log('s3 get', s3Coords(url).Key);
        const { Metadata, Body } = await s3Client.getObject(s3Coords(url));
        if (!Metadata['cache-policy']) return undefined;
        const BodyBuffer = new Uint8Array(await new Response(Body).arrayBuffer());

        if (Body && Metadata['cache-policy'] === 'inline') {
          const idx = BodyBuffer.indexOf(10);
          return {
            policy: JSON.parse(new TextDecoder().decode(BodyBuffer.slice(0, idx))),
            body: BodyBuffer.slice(idx+1),
          };
        }

        return {
          policy: JSON.parse(Metadata['cache-policy'] || '{}'),
          body: BodyBuffer == null ? new Uint8Array(0) : BodyBuffer,
        };

      } catch (err) {
        if (err.code === 'NoSuchKey') return undefined;
        throw err;
      }
    },

    async set(url, resp) {
      const list = resp.policy.resh['content-type'] ?? [];
      const contentType = Array.isArray(list) ? list[0] : list;
      console.log('s3 put', s3Coords(url).Key, contentType);

      const policy = JSON.stringify(resp.policy);
      if (policy.length > 1800) {
        const encodedPolicy = new TextEncoder().encode(policy);
        const body = new Uint8Array(encodedPolicy.length + 1 + resp.body.length);
        body.set(encodedPolicy, 0);
        body.set([10], encodedPolicy.length);
        body.set(resp.body, encodedPolicy.length + 1);

        await s3Client.putObject({
          ...s3Coords(url),
          Body: body,
          ContentType: contentType.startsWith('text/')
            ? 'text/x-httpcache'
            : 'binary/x-httpcache',
          Metadata: {
            ['cache-policy']: 'inline',
          },
        });
        return;
      }

      await s3Client.putObject({
        ...s3Coords(url),
        Body: resp.body,
        ContentType: contentType,
        Metadata: {
          ['cache-policy']: JSON.stringify(resp.policy),
        },
      });
    },

    async delete(url) {
      await s3Client.deleteObject(s3Coords(url));
    },

    close() {},
  });
}

export function makeS3Client(credentials: Credentials) {
  return new BaseApiFactory({ credentials,
    endpointResolver: new AwsEndpointResolver,
  }).makeNew(S3);
}
