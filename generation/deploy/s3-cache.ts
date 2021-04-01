// import S3 from "../../lib/services/s3@2006-03-01/mod.ts";
import S3 from "./s3-api.ts";
import { ApiMetadata } from '../../lib/client/common.ts';
import { ApiFactory } from '../../lib/client/mod.ts';

import { Cache } from "https://deno.land/x/httpcache@0.1.2/mod.ts";
export { Cache };

export function s3Cache(
  s3Client: S3,
  bucketName: string,
  prefix = "",
): Cache {

  function s3Coords(url: string) {
    const key = url.replace('://', '/');
    return {
      Bucket: bucketName,
      Key: prefix + key,
    };
  }

  return new Cache({
    async get(url) {
      try {
        console.log('s3 get', s3Coords(url).Key);
        const { Metadata, Body } = await s3Client.getObject(s3Coords(url));
        return {
          policy: JSON.parse(Metadata['cache-policy'] || '{}'),
          body: Body == null ? new Uint8Array(0) : Body,
        };
      } catch (err) {
        if (err.code === 'NoSuchKey') return undefined;
        throw err;
      }
    },
    async set(url, resp) {
      const contentTypes = resp.policy.resh['content-type'] ?? [];
      await s3Client.putObject({
        ...s3Coords(url),
        Body: resp.body,
        ContentType: Array.isArray(contentTypes) ? contentTypes[0] : contentTypes,
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

export function makeS3Client(region: string) {
  return new S3({
    buildServiceClient(metadata: ApiMetadata) {
      const inner = new ApiFactory().buildServiceClient(metadata);
      return {
        async performRequest(req) {
          // path-based routing is phased out
          req.hostPrefix = req.requestUri!.split('/')[1]+'.';
          req.requestUri = req.requestUri!.slice(req.requestUri!.slice(1).indexOf('/')+1);
          return await inner.performRequest({ ...req, region });
        }
      };
    },
  });
}
