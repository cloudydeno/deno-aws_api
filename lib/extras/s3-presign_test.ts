import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { getSignedUrl } from "./s3-presign.ts";

const date = new Date('Fri, 24 May 2013 00:00:00 GMT')

Deno.test('creates a presigned URL', async () => {
  assertEquals(
    await getSignedUrl({
      region: 'us-east-1',
      credentials: {
        awsAccessKeyId: 'AKIAIOSFODNN7EXAMPLE',
        awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      },
      bucket: 'examplebucket',
      path: 'test.txt',
      // useDualstack: false,
      date,
    }),
    [
      'https://examplebucket.s3.dualstack.us-east-1.amazonaws.com/test.txt',
      '?X-Amz-Algorithm=AWS4-HMAC-SHA256',
      '&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20130524%2Fus-east-1%2Fs3%2Faws4_request',
      '&X-Amz-Date=20130524T000000Z',
      '&X-Amz-Expires=86400',
      '&X-Amz-SignedHeaders=host',
      '&X-Amz-Signature=50aa6c33627b0c01d6ca9ff2fd27a2855bbe9ceb5d2624f3c8c6a0e1a509b4de',
    ].join('')
  )
})
