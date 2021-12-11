import { SharedIniFileCredentials } from './credentials.ts';
import { assertEquals } from "https://deno.land/std@0.115.0/testing/asserts.ts";

Deno.test('basic ini file', async () => {
  const credential = new SharedIniFileCredentials({
    profile: 'default',
    filedata: `
      [default]
      aws_access_key_id=AKIAIOSFODNN7EXAMPLE
      aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
      region=us-east-1
    `.replace(/^ +/gm, ''),
  });

  const data = await credential.getCredentials();
  assertEquals(data.awsAccessKeyId, 'AKIAIOSFODNN7EXAMPLE');
  assertEquals(data.awsSecretKey, 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
  assertEquals(data.sessionToken, undefined);
  assertEquals(data.expiresAt, undefined);
  assertEquals(data.region, 'us-east-1');
});

Deno.test('ini with numbers and session token', async () => {
  const credential = new SharedIniFileCredentials({
    profile: 'default',
    filedata: `
      [default]
      aws_access_key_id=1111aaa
      aws_secret_access_key=2222bbb
      aws_session_token=3333ccc
    `.replace(/^ +/gm, ''),
  });

  const data = await credential.getCredentials();
  assertEquals(data.awsAccessKeyId, '1111aaa');
  assertEquals(data.awsSecretKey, '2222bbb');
  assertEquals(data.sessionToken, '3333ccc');
});
