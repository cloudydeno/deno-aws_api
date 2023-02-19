// port of https://github.com/lucacasonato/deno_aws_sign_v4

import {
  Signer, Credentials,
  hmacSha256, hashSha256, bytesAsHex,
} from "./common.ts";

const ANY_BUT_DIGITS_T = /[^\dT]/g;
function toAmzDate(date: Date) {
  return `${date.toISOString().slice(0, 19).replace(ANY_BUT_DIGITS_T, "")}Z`;
};

const ANY_BUT_DIGITS = /[^\d]/g;
function toDateStamp(date: Date) {
  return date.toISOString().slice(0, 10).replace(ANY_BUT_DIGITS, "");
};

const encoder = new TextEncoder();
const AWS4 = encoder.encode("AWS4");

export async function getSignatureKey(
  key: string,
  dateStamp: string,
  region: string,
  service: string,
) {
  const keyBytes = encoder.encode(key);
  const paddedKey = new Uint8Array(4 + keyBytes.byteLength);
  paddedKey.set(AWS4, 0);
  paddedKey.set(keyBytes, 4);

  let mac = await hmacSha256(paddedKey, dateStamp);
  mac = await hmacSha256(mac, region);
  mac = await hmacSha256(mac, service);
  mac = await hmacSha256(mac, "aws4_request");
  return mac;
};

/**
 * This class can be used to create AWS Signature V4
 * for low-level AWS REST APIs. You can either provide
 * credentials for this API using the options in the
 * constructor, or let them be aquired automatically
 * through environment variables.
 *
 * Example usage:
 *
 * ```ts
 * const signer = new AWSSignerV4();
 * const body = new TextEncoder().encode("Hello World!")
 * const request = new Request("https://test-bucket.s3.amazonaws.com/test", {
 *   method: "PUT",
 *   headers: { "content-length": body.length.toString() },
 *   body,
 * });
 * const req = await signer.sign("s3", request);
 * const response = await fetch(req);
 * ```
 */
export class AWSSignerV4 implements Signer {
  private region: string;
  private credentials: Credentials;

  constructor(region: string, credentials: Credentials) {
    this.region = region;
    this.credentials = credentials;
  }

  /**
   * Use this to create the signed headers required to
   * make a call to an AWS API.
   *
   * @param service This is the AWS service, e.g. `s3` for s3, `dynamodb` for DynamoDB
   * @param request The Request instance to sign.
   * @returns {RequestHeaders} - the signed request headers
   */
  public async sign(
    service: string,
    request: Request,
  ): Promise<Request> {
    const date = new Date();
    const amzdate = toAmzDate(date);
    const datestamp = toDateStamp(date);

    const { host, pathname, searchParams } = new URL(request.url);
    searchParams.sort();
    const canonicalQuerystring = searchParams.toString();

    const headers = new Headers(request.headers);

    headers.set("x-amz-date", amzdate);
    if (this.credentials.sessionToken) {
      headers.set("x-amz-security-token", this.credentials.sessionToken);
    }
    headers.set("host", host);

    // TODO: if headers.has("x-amz-content-sha256") then use only that & passthru body as-is
    // this is important for S3's "UNSIGNED-PAYLOAD" feature
    const body = request.body
      ? new Uint8Array(await request.arrayBuffer())
      : null;
    const payloadHash = bytesAsHex(await hashSha256(body ?? new Uint8Array()));
    if (service === 's3') {
      // Backblaze B2 requires this header to be in the canonicalHeaders
      headers.set("x-amz-content-sha256", payloadHash);
    }

    let canonicalHeaders = "";
    let signedHeaders = "";
    for (const key of [...headers.keys()].sort()) {
      if (unsignableHeaders.has(key.toLowerCase())) continue;
      canonicalHeaders += `${key.toLowerCase()}:${headers.get(key)}\n`;
      signedHeaders += `${key.toLowerCase()};`;
    }
    signedHeaders = signedHeaders.substring(0, signedHeaders.length - 1);

    const canonicalRequest =
      `${request.method}\n${pathname}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const canonicalRequestDigest = bytesAsHex(await hashSha256(encoder.encode(canonicalRequest)));

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope =
      `${datestamp}/${this.region}/${service}/aws4_request`;
    const stringToSign =
      `${algorithm}\n${amzdate}\n${credentialScope}\n${canonicalRequestDigest}`;

    // TODO: this can be cached
    const signingKey = await getSignatureKey(
      this.credentials.awsSecretKey,
      datestamp,
      this.region,
      service,
    );

    const signature = bytesAsHex(await hmacSha256(new Uint8Array(signingKey), stringToSign));

    const authHeader =
      `${algorithm} Credential=${this.credentials.awsAccessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    headers.set("Authorization", authHeader);

    return new Request(
      request.url,
      {
        headers,
        method: request.method,
        body,
        redirect: request.redirect,
        signal: request.signal,
      },
    );
  }
}

const unsignableHeaders = new Set([
  'authorization',
  'content-type',
  'content-length',
  'user-agent',
  'presigned-expires',
  'expect',
  'x-amzn-trace-id',
  'range',
  'connection',
]);
