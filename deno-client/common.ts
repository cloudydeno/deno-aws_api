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
  body?: URLSearchParams | ApiWireStructure | Uint8Array;
  abortSignal?: AbortSignal;
}
export interface ApiResponse extends Response {
  xml(resultWrapper?: string): Promise<XmlNode>;
};
export interface XmlNode {
  name: string;
  attributes: {[key: string]: string};
  content?: string;
  children: XmlNode[];
  getChild(name: string): XmlNode | undefined;
  mapChildren(opts: {lists?: string[]}): [
    {[key: string]: XmlNode},
    {[key: string]: XmlNode[]},
  ];
}

// Things that JSON can handle directly
export type ApiWireStructure = {
  [param: string]: string | number | boolean | null | ApiWireStructure;
};
// export type ApiParamSpecMap = { [param: string]: ApiParamSpec }
// export type ApiParamSpec = {
//   type: "integer" | "long" | "double" | "float" | "boolean" | "timestamp" | "blob" | "list" | "map" | "string" | "structure";
//   children?: ApiParamSpecMap,
//   location?: "uri" | "querystring" | "header" | "headers" | "statusCode";
//   locationName?: string;
//   queryName?: string;
//   streaming?: true;
//   sensitive?: boolean;
//   idempotencyToken?: true; // shuold be auto filled with guid if not given
//   timestampFormat?: "iso8601" | "unixTimestamp";
//   min?: number;
//   max?: number;
//   flattened?: true;
//   pattern?: string;
//   enum?: string[];
// }
export interface ApiFactory {
  buildServiceClient(apiMetadata: Object): ServiceClient;
}
export interface ServiceClient {
  performRequest(request: ApiRequestConfig): Promise<ApiResponse>;
  // TODO: does this even belong here?
  // runWaiter<T,U>(config: ApiWaiterConfig<T,U>): Promise<U>;
}
export interface ApiWaiterConfig<T,U> {
  // wiring
  operation: (input: T) => Promise<U>;
  baseInput: T;
  abortSignal?: AbortSignal;
  // behavior
  delay: number;
  maxAttempts: number;
  acceptors: any[]; // TODO
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
  "Type": "Sender" | string; // TODO
}

export class AwsServiceError extends Error {
  code: string;
  originalMessage: string;
  errorType: string;
  requestId: string;
  constructor(error: ServiceError, requestId: string) {
    super(`${error.Code}: ${error.Message} [Type: ${error.Type}, Request ID: ${requestId}]`);

    this.name = new.target.name;
    this.code = error.Code;
    this.originalMessage = error.Message;
    this.errorType = error.Type;
    this.requestId = requestId;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}
