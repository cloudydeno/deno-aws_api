// This example uses an external module for generating pre-signing URLs.
// It does not fetch credentials on its own, so
//   you might want to load your credentials with /x/aws_api as shown below :)
import { getSignedUrl } from "https://deno.land/x/aws_s3_presign@1.2.1/mod.ts";

import { DefaultCredentialsProvider, getDefaultRegion } from "../client/credentials.ts";

/** Convert /x/aws_api Credentials into /x/aws_s3_presign parameters */
async function getPresignerCredentials() {
  const credentials = await DefaultCredentialsProvider.getCredentials();
  return {
    accessKeyId: credentials.awsAccessKeyId,
    secretAccessKey: credentials.awsSecretKey,
    sessionToken: credentials.sessionToken,
    region: credentials.region ?? getDefaultRegion(),
  };
}

/** Generate a basic pre-signed URL */
async function presignGetObject(bucket: string, key: string) {
  return getSignedUrl({
    ...(await getPresignerCredentials()),
    bucketName: bucket,
    objectPath: `/${key}`,
  });
}

console.log(await presignGetObject('my-bucket', 'my-key'));
