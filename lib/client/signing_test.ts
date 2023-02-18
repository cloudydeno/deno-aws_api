import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { bytesAsHex } from "./common.ts";
import { getSignatureKey } from "./signing.ts";

Deno.test('getSignatureKey', async () => {
  const hash = await getSignatureKey('key', 'date', 'region', 'service');
  assertEquals(bytesAsHex(hash), 'b0bee7c7725547d1f3a029762a16795f2800b544c27e72b2a5727e3c06f040ce');
});
