import { assertEquals, assertObjectMatch } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { bytesAsHex } from "./common.ts";
import { canonicalizeRequest, getSignatureKey } from "./signing.ts";

Deno.test('getSignatureKey', async () => {
  const hash = await getSignatureKey('key', 'date', 'region', 'service');
  assertEquals(bytesAsHex(hash), 'b0bee7c7725547d1f3a029762a16795f2800b544c27e72b2a5727e3c06f040ce');
});

Deno.test('canonicalizeRequest no attributes', async () => {
  assertObjectMatch(canonicalizeRequest(
    'GET', 'https://example/',
    new Headers(),
    'UNSIGNED',
  ), {
    signedHeaders: "",
    request: "GET\n/\n\n\n\nUNSIGNED",
  });
})

Deno.test('canonicalizeRequest with attributes', async () => {
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
