import { ApiFactory } from '../client/mod.ts';
import S3 from '../services/s3@2006-03-01/mod.ts';

const factory = new ApiFactory();
const s3 = new S3(factory);

// console.log(await s3.listBuckets());

const Bucket = 'ahshyawyjiajhshdh';

// make our bucket
await s3.createBucket({Bucket});
await s3.waitForBucketExists({Bucket});
console.log('Bucket created');

await s3.putBucketTagging({Bucket,
  Tagging: {
    TagSet: [{Key: 'Purpose', Value: 'Deno Test'}],
  }});

// enable versioning
await s3.putBucketVersioning({Bucket,
  VersioningConfiguration: {
    Status: "Enabled",
  }});
console.log('Object versioning enabled');

// write some versions in
console.log(await s3.putObject({Bucket,
  Key: 'test/hello',
  Body: 'hello world! 1',
  ContentType: 'text/plain',
}).then(x => x.VersionId));
console.log(await s3.putObject({Bucket,
  Key: 'test/hello',
  Body: 'hello world! 2',
  ContentType: 'text/plain',
}).then(x => x.VersionId));
console.log(await s3.putObject({Bucket,
  Key: 'test/hello',
  Body: 'hello world! 3',
  ContentType: 'text/plain',
}).then(x => x.VersionId));
console.log('Wrote 3 versions');

// look at / cleanup our versions
const versions = await s3.listObjectVersions({Bucket,
  Delimiter: '/',
  Prefix: 'test/',
});
for (const version of versions.Versions) {
  console.log(version.VersionId, ':', await s3.getObject({Bucket,
    Key: version.Key!,
    VersionId: version.VersionId,
  }).then(x => x.Body));
  await s3.deleteObject({Bucket,
    Key: version.Key!,
    VersionId: version.VersionId,
  });
}
console.log('Deleted all versions');

// delete the bucket
await s3.deleteBucket({Bucket});
await s3.waitForBucketNotExists({Bucket});
console.log('Bucket deleted');
