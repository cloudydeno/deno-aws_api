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

  first(name: string, required: true): XmlNode;
  first<T>(name: string, required: true, accessor: (node: XmlNode) => T): T;
  first(name: string, required?: false): XmlNode | undefined;
  first<T>(name: string, required: false, accessor: (node: XmlNode) => T): T | undefined;

  getList(...namePath: string[]): XmlNode[]; // you can just map this
  strings<
    R extends {[key: string]: true},
    O extends {[key: string]: true},
  >(opts: {
    required?: R,
    optional?: O,
  }): { [key in keyof R]: string }
    & { [key in keyof O]: string | undefined };
}

// Things that JSON can handle directly
export type ApiWireStructure = {
  [param: string]: string | number | boolean | null | ApiWireStructure;
};
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
