#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import S3, {BucketLocationConstraint} from '../services/s3@2006-03-01/mod.ts';

const factory = new ApiFactory();
const s3 = new S3(factory);
const Bucket = 'ahshyawyjiajhshdh';

// make our bucket
try {
  // S3 regions are weird.. need to clarify which we want here
  // us-east-2 can _create_ a us-west-1 bucket, but not _access_ it
  const region = await factory.determineCurrentRegion();
  await s3.createBucket({ Bucket,
    CreateBucketConfiguration: {
      LocationConstraint: region as BucketLocationConstraint,
    }});

  await s3.waitForBucketExists({ Bucket });
} catch (err) {
  // This error means the bucket already exists just fine
  if (err.code !== 'BucketAlreadyOwnedByYou') throw err;
}
console.log('Bucket created:', Bucket);

{ // enable "Block Public Access" feature
  await s3.putPublicAccessBlock({ Bucket,
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    }});
}

{ // attach an arbitrary tag to the bucket
  await s3.putBucketTagging({ Bucket,
    Tagging: {
      TagSet: [{Key: 'Purpose', Value: 'Deno Test'}],
    }});
}

{ // enable versioning
  await s3.putBucketVersioning({ Bucket,
    VersioningConfiguration: {
      Status: "Enabled",
    }});
  console.log('Object versioning enabled');
}

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
