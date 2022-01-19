#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../../client/mod.ts';
import { S3, BucketLocationConstraint } from '../../services/s3/mod.ts';

const factory = new ApiFactory();
const s3 = factory.makeNew(S3);
const Bucket = 'ahshyawyjiajhshfh';

// // make our bucket
// try {
//   // S3 regions are weird.. need to clarify which we want here
//   // us-east-2 can _create_ a us-west-1 bucket, but not _access_ it
//   // also us-east-1 refuses a region config entirely
//   const region = await factory.determineCurrentRegion();
//   await s3.createBucket({ Bucket,
//     CreateBucketConfiguration: region == 'us-east-1' ? null : {
//       LocationConstraint: region as BucketLocationConstraint,
//     }});

//   await s3.waitForBucketExists({ Bucket });
// } catch (err) {
//   // This error means the bucket already exists just fine
//   if (err.code !== 'BucketAlreadyOwnedByYou') throw err;
// }
// console.log('Bucket created:', Bucket);

import { readableStreamFromIterable } from "https://deno.land/std@0.119.0/streams/conversion.ts";

{ // write some versions in

  console.log(await s3.putObject({ Bucket,
    Key: 'test/buffer',
    Body: 'hello world! 1',
    ContentType: 'text/plain',
  }).then(x => x.VersionId));

  const lineLength = `hello world! 0\n`.length;
  console.log(await s3.putObject({ Bucket,
    Key: 'test/stream',
    // ContentLength: lineLength * 10,
    Body: readableStreamFromIterable((async function* a() {
      for (let x = 0; x < 10; x++) {
        console.log(x);
        yield new TextEncoder().encode(`hello world! ${x}\n`);
        await new Promise(ok => setTimeout(ok, 1000));
      }
    })()),
    ContentType: 'text/plain',
  }).then(x => x.VersionId));

  console.log('Wrote versions');
}


// { // look at / cleanup our versions
//   const versions = await s3.listObjectVersions({ Bucket,
//     Delimiter: '/',
//     Prefix: 'test/',
//   });
//   for (const version of versions.Versions) {
//     console.log(version.VersionId, ':', await s3.getObject({ Bucket,
//       Key: version.Key!,
//       VersionId: version.VersionId,
//     }).then(x => new TextDecoder().decode(x.Body!)));
//     await s3.deleteObject({ Bucket,
//       Key: version.Key!,
//       VersionId: version.VersionId,
//     });
//   }
//   console.log('Deleted all versions');
// }

// { // delete the bucket
//   await s3.deleteBucket({ Bucket });
//   await s3.waitForBucketNotExists({ Bucket });
//   console.log('Bucket deleted');
// }
