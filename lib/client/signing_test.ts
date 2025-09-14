import { assertEquals } from "@std/assert/equals";
import { assertObjectMatch } from "@std/assert/object-match";

import { bytesAsHex } from "./common.ts";
import { canonicalizeRequest, getSignatureKey, AWSSignerV4 } from "./signing.ts";

Deno.test('getSignatureKey', async () => {
  const hash = await getSignatureKey('key', 'date', 'region', 'service');
  assertEquals(bytesAsHex(hash), 'b0bee7c7725547d1f3a029762a16795f2800b544c27e72b2a5727e3c06f040ce');
});

Deno.test('canonicalizeRequest no attributes', () => {
  assertObjectMatch(canonicalizeRequest(
    'GET', 'https://example/',
    new Headers(),
    'UNSIGNED',
  ), {
    signedHeaders: "",
    request: "GET\n/\n\n\n\nUNSIGNED",
  });
})

Deno.test('canonicalizeRequest with attributes', () => {
  assertObjectMatch(canonicalizeRequest(
    'GET', 'https://example/hello-world?b=1&a=1',
    new Headers({
      'host': 'example',
      'x-some-header': 'foo',
      'content-length': '5',
      'connection': 'close',
    }),
    'UNSIGNED',
  ), {
    signedHeaders: "host;x-some-header",
    request: "GET\n/hello-world\na=1&b=1\nhost:example\nx-some-header:foo\n\nhost;x-some-header\nUNSIGNED",
  });
})


const date = new Date('Fri, 24 May 2013 00:00:00 GMT')

Deno.test('creates a presigned URL', async () => {
  assertEquals(
    await new AWSSignerV4('us-east-1', {
      awsAccessKeyId: 'AKIAIOSFODNN7EXAMPLE',
      awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    }).presign('s3', {
      url: 'https://examplebucket.s3.amazonaws.com/test.txt',
      signTime: date,
    }),
    [
      'https://examplebucket.s3.amazonaws.com/test.txt',
      '?X-Amz-Algorithm=AWS4-HMAC-SHA256',
      '&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20130524%2Fus-east-1%2Fs3%2Faws4_request',
      '&X-Amz-Date=20130524T000000Z',
      '&X-Amz-Expires=86400',
      '&X-Amz-SignedHeaders=host',
      '&X-Amz-Signature=aeeed9bbccd4d02ee5c0109b86d86835f995330da4c265957d157751f604d404',
    ].join('')
  )
})

Deno.test('creates a presigned URL with a session token', async () => {
  assertEquals(
    await new AWSSignerV4('us-east-1', {
      awsAccessKeyId: 'AKIAIOSFODNN7EXAMPLE',
      awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      sessionToken: 'AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT+FvwqnKwRcOIfrRh3c/LTo6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE/IvU1dYUg2RVAJBanLiHb4IgRmpRV3zrkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb/AXlzBBko7b15fjrBs2+cTQtpZ3CYWFXG8C5zqx37wnOE49mRl/+OtkIKGO7fAE',
    }).presign('s3', {
      url: 'https://examplebucket.s3.amazonaws.com/test.txt',
      signTime: date,
    }),
    [
      'https://examplebucket.s3.amazonaws.com/test.txt',
      '?X-Amz-Algorithm=AWS4-HMAC-SHA256',
      '&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20130524%2Fus-east-1%2Fs3%2Faws4_request',
      '&X-Amz-Date=20130524T000000Z',
      '&X-Amz-Expires=86400',
      '&X-Amz-SignedHeaders=host',
      '&X-Amz-Security-Token=AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT%2BFvwqnKwRcOIfrRh3c%2FLTo6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE%2FIvU1dYUg2RVAJBanLiHb4IgRmpRV3zrkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb%2FAXlzBBko7b15fjrBs2%2BcTQtpZ3CYWFXG8C5zqx37wnOE49mRl%2F%2BOtkIKGO7fAE',
      '&X-Amz-Signature=3e7fe71f8da45a44c5ee7851dc99611df44ed2171068fa778b3537333ee2b435',
    ].join('')
  )
})
