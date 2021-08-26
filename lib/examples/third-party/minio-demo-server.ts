#!/usr/bin/env -S deno run --allow-net=play.minio.io

import { ApiFactory } from "../../client/mod.ts";
import { S3 } from "../../services/s3/mod.ts";

const minio = new ApiFactory({
  fixedEndpoint: "https://play.minio.io",
  credentials: {
    region: 'play',
    awsAccessKeyId: 'Q3AM3UQ867SPQQA43P2F',
    awsSecretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  },
}).makeNew(S3);

const Bucket = `deno-aws-api-${crypto.randomUUID().split('-')[0]}`;
console.log('Using bucket name:', Bucket);

// Create a random bucket
await minio.createBucket({ Bucket });
await minio.waitForBucketExists({ Bucket });
console.log('Bucket created');

try {

  // Stick a couple keys in
  await minio.putObject({ Bucket,
    Key: 'string',
    Body: 'hello world',
  });
  await minio.putObject({ Bucket,
    Key: 'bytes',
    Body: new Uint8Array([97, 115, 99, 105, 105]), // ascii
  });
  await minio.putObject({ Bucket,
    Key: 'deno',
    Body: Deno.version.deno,
  });

  // Try a slightly more complex API for fun
  await minio.copyObject({ Bucket,
    Key: 'string copy',
    CopySource: `/${Bucket}/string`,
  });

  console.log('Created all test keys');

} finally {

  // Print & remove all of our objects
  const { Contents } = await minio.listObjectsV2({ Bucket });
  for (const object of Contents) {
    const Key = object.Key!;
    const { Body } = await minio.getObject({ Bucket, Key });
    console.log('-', object.Key, ':', new TextDecoder().decode(Body!));
    await minio.deleteObject({ Bucket, Key });
  }
  console.log('Deleted all objects');

  await minio.deleteBucket({ Bucket });
  await minio.waitForBucketNotExists({ Bucket });
  console.log('Bucket deleted');

}
