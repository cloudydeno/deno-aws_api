#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import { S3, BucketLocationConstraint } from '../services/s3/mod.ts';

const factory = new ApiFactory();
const s3 = factory.makeNew(S3);
const Bucket = 'ahshyawyjiajhshdh';

// make our bucket
try {
  // S3 regions are weird.. need to clarify which we want here
  // us-east-2 can _create_ a us-west-1 bucket, but not _access_ it
  // also us-east-1 refuses a region config entirely
  const region = await factory.determineCurrentRegion();
  await s3.createBucket({ Bucket,
    CreateBucketConfiguration: region == 'us-east-1' ? null : {
      LocationConstraint: region as BucketLocationConstraint,
    }});

  await s3.waitForBucketExists({ Bucket });
} catch (err) {
  // This error means the bucket already exists just fine
  if (err.code !== 'BucketAlreadyOwnedByYou') throw err;
}
console.log('Bucket created:', Bucket);

console.log('Bucket location:', await s3.getBucketLocation({ Bucket }));

console.log('Bucket ACL:', await s3.getBucketAcl({ Bucket }));

await s3.putBucketCors({Bucket, CORSConfiguration: {
  CORSRules: [{
    AllowedOrigins: ['asdf.com'],
    AllowedHeaders: ['content-type'],
    AllowedMethods: ['GET'],
    ExposeHeaders: [],
  }],
} })
console.log('Bucket CORS:', await s3.getBucketCors({ Bucket }));

await s3.putBucketEncryption({ Bucket, ServerSideEncryptionConfiguration: {
  Rules: [{
    ApplyServerSideEncryptionByDefault: {
      SSEAlgorithm: 'AES256',
    },
    BucketKeyEnabled: false,
  }],
} })
console.log('Bucket encryption:', await s3.getBucketEncryption({ Bucket }));

{ // enable "Block Public Access" feature
  await s3.putPublicAccessBlock({ Bucket,
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    }});
}

console.log('Bucket PublicAccessBlock:', await s3.getPublicAccessBlock({ Bucket }));

{ // attach an arbitrary tag to the bucket
  await s3.putBucketTagging({ Bucket,
    Tagging: {
      TagSet: [{Key: 'Purpose', Value: 'Deno Test'}],
    }});
}

console.log('Bucket tagging:', await s3.getBucketTagging({ Bucket }));

{ // enable versioning
  await s3.putBucketVersioning({ Bucket,
    VersioningConfiguration: {
      Status: "Enabled",
    }});
  console.log('Object versioning enabled');
}

console.log('Bucket versioning:', await s3.getBucketVersioning({ Bucket }));

{ // write some versions in
  console.log(await s3.putObject({ Bucket,
    Key: 'test/hello',
    Body: 'hello world! 1',
    ContentType: 'text/plain',
  }).then(x => x.VersionId));
  console.log(await s3.putObject({ Bucket,
    Key: 'test/hello',
    Body: 'hello world! 2',
    ContentType: 'text/plain',
  }).then(x => x.VersionId));
  console.log(await s3.putObject({ Bucket,
    Key: 'test/hello',
    Body: 'hello world! 3',
    ContentType: 'text/plain',
  }).then(x => x.VersionId));
  console.log('Wrote 3 versions');
}

{ // look at / cleanup our versions
  const versions = await s3.listObjectVersions({ Bucket,
    Delimiter: '/',
    Prefix: 'test/',
  });
  for (const version of versions.Versions) {
    console.log(version.VersionId, ':', await s3.getObject({ Bucket,
      Key: version.Key!,
      VersionId: version.VersionId,
    }).then(x => new TextDecoder().decode(x.Body!)));
    await s3.deleteObject({ Bucket,
      Key: version.Key!,
      VersionId: version.VersionId,
    });
  }
  console.log('Deleted all versions');
}

{ // delete the bucket
  await s3.deleteBucket({ Bucket });
  await s3.waitForBucketNotExists({ Bucket });
  console.log('Bucket deleted');
}
