#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import { S3 } from '../services/s3/mod.ts';

// This helper will manage storing the stream to S3, possibly using a 'multi-part' upload
import { managedUpload } from "../helpers/s3-upload.ts";

if (Deno.args.length != 2) {
    console.error(``);
    console.error(`Usage: s3-upload-stream.ts [BUCKET] [KEY] < FILE`);
    console.error(`The file or stream that you pipe in will be uploaded to the given location on S3.`);
    console.error(``);

} else {
    const factory = new ApiFactory();
    const s3 = factory.makeNew(S3);

    console.error(`Uploading standard input to s3://${Deno.args.join('/')} ...`);
    console.error(`Upload complete:`, await managedUpload(s3, {
        Bucket: Deno.args[0],
        Key: Deno.args[1],
        Body: Deno.stdin.readable,
    }));
}
