import { AWSSignerV4 } from "https://deno.land/x/aws_sign_v4@0.1.1/mod.ts";

// The HTTP contract expected by all service API implementations
export interface ApiRequestConfig {
  // fixed per operation
  action: string;
  method: "POST" | "GET" | "HEAD" | "DELETE" | "PUT" | "PATCH";
  requestUri: string;
  responseCode?: number;
  locationsIn?: ApiParamLocationMap;
  locationsOut?: ApiParamLocationMap;
  // dynamic per call
  input: { [param: string]: any; };
  abortSignal?: AbortSignal;
}
type ApiParamLocationMap = { [param: string]: {
  location: "uri" | "querystring" | "header" | "headers" | "statusCode";
  name?: string;
}}
export interface ApiFactory {
  buildServiceClient(apiMetadata: Object): ServiceClient;
}
export interface ServiceClient {
  performRequest(request: ApiRequestConfig): Promise<any>;
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


export class ApiFactory {
  buildServiceClient(apiMetadata: ApiMetadata): ServiceClient {
    // if (apiMetadata.signatureVersion !== 'v4') {
    //   throw new Error(`TODO: signature version ${apiMetadata.signatureVersion}`);
    // }

    const signer = new AWSSignerV4(apiMetadata.globalEndpoint ? 'us-east-1' : undefined);
    const serviceUrl = 'https://' + (apiMetadata.globalEndpoint
      ?? `${apiMetadata.endpointPrefix}.${Deno.env.get('AWS_REGION')}.amazonaws.com`);

    switch (apiMetadata.protocol) {
      case 'query':
        return new QueryServiceClient(serviceUrl, apiMetadata.apiVersion, signer, apiMetadata.signingName ?? apiMetadata.endpointPrefix);
      default:
        throw new Error(`TODO!!! service protocol ${apiMetadata.protocol}`);
    }
  }

}

export class QueryServiceClient implements ServiceClient {
  #serviceUrl: string;
  #serviceVersion: string;
  #signer: AWSSignerV4
  #signingName: string;
  constructor(serviceUrl: string, serviceVersion: string, signer: AWSSignerV4, signingName: string) {
    this.#serviceUrl = serviceUrl;
    this.#serviceVersion = serviceVersion;
    this.#signer = signer;
    this.#signingName = signingName;
  }

  async performRequest(config: ApiRequestConfig): Promise<any> {
    if (config.locationsIn) throw new Error(`TODO: locations in`);
    if (config.locationsOut) throw new Error(`TODO: locations out`);

    const params = new URLSearchParams;
    for (const [key, val] of Object.entries(config.input ?? {})) {
      if (typeof val !== 'string') throw new Error(`TODO: complex query params`);
      params.set(key, `${val}`);
    }
    params.set('Action', config.action);
    params.set('Version', this.#serviceVersion);

    const inQuery = config.method === 'HEAD' || config.method === 'GET';
    const body = new TextEncoder().encode(params.toString());
    const request = inQuery
      // GET, HEAD
      ? new Request(this.#serviceUrl + config.requestUri + '?' + params, {
        method: config.method,
        headers: {
          "accept": 'application/json',
        },
      })
      // POST, etc
      : new Request(this.#serviceUrl + config.requestUri, {
        method: config.method,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
          "content-length": body.length.toString(),
          "accept": 'application/json',
        },
        body,
      });
    const req = await this.#signer.sign(this.#signingName, request);

    const response = await fetch(req);
    if (!response.headers.get('content-type')?.startsWith('application/json')) {
      // console.log(await response.text());
      throw new Error(`TODO: ${this.#serviceUrl} offered us '${response.headers.get('content-type')}' :()`);
    }

    if (response.status === (config.responseCode ?? 200)) {
      return response;

    } else if (response.status >= 400) {
      const data = await response.json();
      if (data.Error?.Code) {
        throw new AwsServiceError(data.Error as ServiceError, data.RequestId);
      }
      console.log('Error from server:', response, data);
      throw new Error(`Unrecognizable error response`);

    } else {
      throw new Error(`BUG: Unexpected HTTP response status ${response.status}`);
    }
  }
}

// how universal is this?
interface ServiceError {
  "Code": string;
  "Message": string;
  "Type": "Sender" | string;
}

class AwsServiceError extends Error {
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
