// port of https://github.com/lucacasonato/deno_aws_sign_v4
// because that repo (as of press time) unnecesarily brings in 25 source files

import { Message, Sha256, HmacSha256 } from "https://deno.land/std@0.105.0/hash/sha256.ts";
import type { Signer, Credentials } from "./common.ts";

function sha256(data: Message): Sha256 {
  const hasher = new Sha256();
  hasher.update(data);
  return hasher;
}
function hmacSha256(key: Message, message: Message): HmacSha256 {
  const hasher = new HmacSha256(key);
  hasher.update(message);
  return hasher;
}

const ANY_BUT_DIGITS = /[^\d]/g;
const ANY_BUT_DIGITS_T = /[^\dT]/g;
export const toAmz = (date: Date): string => {
  return `${date.toISOString().slice(0, 19).replace(ANY_BUT_DIGITS_T, "")}Z`;
};

export const toDateStamp = (date: Date): string => {
  return date.toISOString().slice(0, 10).replace(ANY_BUT_DIGITS, "");
};

const encoder = new TextEncoder();
const AWS4: Uint8Array = encoder.encode("AWS4");

/**
 * @param  {string|Uint8Array} key - the key to generate signature key
 * @param  {string} dateStamp - dateStamp in ISO format
 * @param  {string} region - aws region
 * @param  {string} service - aws service
 * @returns {string|Uint8Array} - generated key
 */
export const getSignatureKey = (
  key: string | Uint8Array,
  dateStamp: string,
  region: string,
  service: string,
): Message => {
  if (typeof key === "string") {
    key = encoder.encode(key);
  }

  const paddedKey = new Uint8Array(4 + key.byteLength);
  paddedKey.set(AWS4, 0);
  paddedKey.set(key, 4);

  let mac = hmacSha256(paddedKey, dateStamp).array();
  mac = hmacSha256(mac, region).array();
  mac = hmacSha256(mac, service).array();
  mac = hmacSha256(mac, "aws4_request").array();
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
   * @param url The URL for the request to sign.
   * @param request The request method of the request to sign.
   * @param headers Other headers to include while signing.
   * @param body The body for PUT/POST methods.
   * @returns {RequestHeaders} - the signed request headers
   */
  public async sign(
    service: string,
    url: URL,
    request: Request,
  ): Promise<Request> {
    const date = new Date();
    const amzdate = toAmz(date);
    const datestamp = toDateStamp(date);

    const { host, pathname, searchParams } = url;
    searchParams.sort();
    const canonicalQuerystring = searchParams.toString();

    const headers = new Headers(request.headers);

    headers.set("x-amz-date", amzdate);
    if (this.credentials.sessionToken) {
      headers.set("x-amz-security-token", this.credentials.sessionToken);
    }
    headers.set("host", host);

    let canonicalHeaders = "";
    let signedHeaders = "";
    for (const key of [...headers.keys()].sort()) {
      canonicalHeaders += `${key.toLowerCase()}:${headers.get(key)}\n`;
      signedHeaders += `${key.toLowerCase()};`;
    }
    signedHeaders = signedHeaders.substring(0, signedHeaders.length - 1);
    const body = request.body
      ? new Uint8Array(await request.arrayBuffer())
      : null;
    const payloadHash = sha256(body ?? new Uint8Array()).hex();
    if (service === 's3') {
      headers.set("x-amz-content-sha256", payloadHash);
    }

    const canonicalRequest =
      `${request.method}\n${pathname}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const canonicalRequestDigest = sha256(canonicalRequest).hex();

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope =
      `${datestamp}/${this.region}/${service}/aws4_request`;
    const stringToSign =
      `${algorithm}\n${amzdate}\n${credentialScope}\n${canonicalRequestDigest}`;

    const signingKey = getSignatureKey(
      this.credentials.awsSecretKey,
      datestamp,
      this.region,
      service,
    );

    const signature = hmacSha256(signingKey, stringToSign).hex();

    const authHeader =
      `${algorithm} Credential=${this.credentials.awsAccessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    headers.set("Authorization", authHeader);

    return new Request(
      url.toString(),
      {
        headers,
        method: request.method,
        body,
        redirect: request.redirect,
        // TODO: request cancellation
        // signal: request.signal,
      },
    );
  }
}
