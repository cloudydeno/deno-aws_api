/** The AWS credentials to use for signing. */
export interface Credentials {
  awsAccessKeyId: string;
  awsSecretKey: string;
  sessionToken?: string;
  expiresAt?: Date;
  region?: string;
}
export interface CredentialsProvider {
  getCredentials(): Promise<Credentials>;
}

/** Generic AWS Signer interface */
export interface Signer {
  sign: (service: string, url: string, request: Request) => Promise<Request>;
}

// The HTTP contract expected by all service API implementations
export interface ApiRequestConfig {
  // fixed per operation
  action: string;
  method?: "POST" | "GET" | "HEAD" | "DELETE" | "PUT" | "PATCH";
  requestUri?: string;
  responseCode?: number;
  hostPrefix?: string;
  // dynamic per call
  headers?: Headers;
  query?: URLSearchParams;
  body?: URLSearchParams | JSONObject | Uint8Array;
  abortSignal?: AbortSignal;
  skipSigning?: true; // for unauthenticated APIs (STS, cognito)
}

// Things that JSON can handle directly
export type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export type JSONArray = JSONValue[];

export interface ApiFactory {
  buildServiceClient(apiMetadata: Object): ServiceClient;
}
export interface ServiceClient {
  performRequest(request: ApiRequestConfig): Promise<Response>;
}

// our understanding of how APIs can describe themselves
export interface ApiMetadata {
  "apiVersion": string;
  "checksumFormat"?: "md5" | "sha256";
  "endpointPrefix": string;
  "jsonVersion"?: "1.0" | "1.1",
  "globalEndpoint"?: string;
  "protocol": "rest-xml" | "query" | "ec2" | "json" | "rest-json";
  "protocolSettings"?: {
    "h2": "eventstream"; // only for kinesis
  };
  "serviceAbbreviation"?: string;
  "serviceFullName": string;
  "serviceId": string;
  "signatureVersion": "v2" | "v4" | "s3" | "s3v4";
  "signingName"?: string;
  "targetPrefix"?: string;
  "uid": string;
  "xmlNamespace"?: string;
};


// how universal is this structure?
export interface ServiceError {
  "Code": string;
  "Message": string;
  "Type"?: "Sender" | string; // TODO
}

export class AwsServiceError extends Error {
  code: string;
  originalMessage: string;
  errorType: string;
  requestId: string;
  constructor(error: ServiceError, requestId?: string) {
    requestId = requestId ?? "MISSING REQUEST ID";
    super(`${error.Code}: ${error.Message} [Type: ${error.Type}, Request ID: ${requestId}]`);

    this.name = new.target.name;
    this.code = error.Code;
    this.originalMessage = error.Message;
    this.errorType = error.Type ?? 'Unknown';
    this.requestId = requestId;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}
