// port of https://github.com/lucacasonato/deno_aws_sign_v4
// because that repo (as of press time) unnecesarily brings in 25 source files

import { Message, Sha256, HmacSha256 } from "https://deno.land/std@0.71.0/hash/sha256.ts";

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
 * Generic AWS Signer interface
 */
export interface Signer {
  sign: (service: string, request: Request) => Promise<Request>;
}

/**
 * The AWS credentials to use for signing.
 */
export interface Credentials {
  awsAccessKeyId: string;
  awsSecretKey: string;
  sessionToken?: string;
}

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

  /**
   * If no region or credentials are specified, they will
   * automatically be aquired from environment variables.
   *
   * Region is aquired from `AWS_REGION`. The credentials
   * are acquired from `AWS_ACCESS_KEY_ID`,
   * `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN`.
   */
  constructor(region?: string, credentials?: Credentials) {
    this.region = region || this.#getDefaultRegion();
    this.credentials = credentials || this.#getDefaultCredentials();
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
    request: Request,
  ): Promise<Request> {
    const date = new Date();
    const amzdate = toAmz(date);
    const datestamp = toDateStamp(date);

    const urlObj = new URL(request.url);
    const { host, pathname, searchParams } = urlObj;
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
      : new Uint8Array();
    const payloadHash = sha256(body).hex();

    const { awsAccessKeyId, awsSecretKey } = this.credentials;

    const canonicalRequest =
      `${request.method}\n${pathname}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const canonicalRequestDigest = sha256(canonicalRequest).hex();

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope =
      `${datestamp}/${this.region}/${service}/aws4_request`;
    const stringToSign =
      `${algorithm}\n${amzdate}\n${credentialScope}\n${canonicalRequestDigest}`;

    const signingKey = getSignatureKey(
      awsSecretKey,
      datestamp,
      this.region,
      service,
    );

    const signature = hmacSha256(signingKey, stringToSign).hex();

    const authHeader =
      `${algorithm} Credential=${awsAccessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    headers.set("Authorization", authHeader);

    return new Request(
      request.url,
      {
        headers,
        method: request.method,
        body,
        cache: request.cache,
        credentials: request.credentials,
        integrity: request.integrity,
        keepalive: request.keepalive,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        signal: request.signal,
      },
    );
  }

  #getDefaultCredentials = (): Credentials => {
    const AWS_ACCESS_KEY_ID = Deno.env.get("AWS_ACCESS_KEY_ID");
    const AWS_SECRET_ACCESS_KEY = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    const AWS_SESSION_TOKEN = Deno.env.get("AWS_SESSION_TOKEN");

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      throw new Error("Invalid Credentials");
    }

    return {
      awsAccessKeyId: AWS_ACCESS_KEY_ID,
      awsSecretKey: AWS_SECRET_ACCESS_KEY,
      sessionToken: AWS_SESSION_TOKEN,
    };
  };

  #getDefaultRegion = (): string => {
    const AWS_REGION = Deno.env.get("AWS_REGION");
    if (!AWS_REGION) {
      throw new Error("Invalid Region");
    }

    return AWS_REGION;
  };
}
