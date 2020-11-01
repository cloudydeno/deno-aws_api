import { AWSSignerV4 } from "./signing.ts";
import {
  ServiceClient, ApiRequestConfig,
  ApiMetadata,
  AwsServiceError, ServiceError,
  Credentials, CredentialsProvider,
} from './common.ts';
import { DefaultCredentialsProvider, CredentialsProviderChain } from "./credentials.ts";

import { readXmlResult } from "../encoding/xml.ts";

type FetchOpts = {
  urlPath: string,
  signal?: AbortSignal,
  hostPrefix?: string,
  skipSigning?: true,
};
type SigningFetcher = (request: Request, opts: FetchOpts) => Promise<Response>;

export class ApiFactory {
  #credentials: CredentialsProvider;
  #region?: string;
  constructor(opts: {
    credentialProvider?: CredentialsProvider,
    credentials?: Credentials,
    region?: string;
  }={}) {
    if (opts.credentials != null) {
      const {credentials} = opts;
      this.#credentials = { getCredentials: () => Promise.resolve(credentials) };
    } else {
      this.#credentials = opts.credentialProvider ?? DefaultCredentialsProvider;
    }
    this.#region = opts.region ?? Deno.env.get("AWS_REGION");
  }

  buildServiceClient(apiMetadata: ApiMetadata): ServiceClient {
    if (apiMetadata.signatureVersion === 'v2') {
      throw new Error(`TODO: signature version ${apiMetadata.signatureVersion}`);
    }

    const signingFetcher: SigningFetcher = async (request: Request, opts: FetchOpts): Promise<Response> => {
      if (opts.skipSigning) {
        const endpoint =
          apiMetadata.globalEndpoint
          // Try try to find the region if the service doesn't have a global endpoint
          ?? [
            apiMetadata.endpointPrefix,
            this.#region
              ?? (await this.#credentials.getCredentials().then(x => x.region, x => null))
              ?? throwMissingRegion(),
            'amazonaws.com',
          ].join('.');

        const fullUrl = `https://${opts.hostPrefix ?? ''}${endpoint}${opts.urlPath}`;
        return fetch(new Request(fullUrl, request), { signal: opts.signal });
      }

      // Resolve credentials and AWS region
      const credentials = await this.#credentials.getCredentials();
      const region = apiMetadata.globalEndpoint
        ? 'us-east-1'
        : (this.#region ?? credentials.region ?? throwMissingRegion());

      const signer = new AWSSignerV4(region, credentials);
      const serviceUrl = 'https://' + (apiMetadata.globalEndpoint
        ?? `${apiMetadata.endpointPrefix}.${region}.amazonaws.com`);

      const signingName = apiMetadata.signingName ?? apiMetadata.endpointPrefix;

      // Assemble full URL
      const [scheme, host] = serviceUrl.split('//');
      const url = `${scheme}//${opts.hostPrefix ?? ''}${host}${opts.urlPath}`;

      const req = await signer.sign(signingName, url, request);
      return fetch(req, { signal: opts.signal });
    }

    return wrapServiceClient(apiMetadata, signingFetcher);
  }

}

function throwMissingRegion(): never {
  throw new Error(`No region provided, try setting AWS_REGION or passing a region when constructing your client`);
}

export function wrapServiceClient(
  apiMetadata: ApiMetadata,
  signingFetcher: SigningFetcher,
): ServiceClient {
  switch (apiMetadata.protocol) {
    case 'query':
    case 'ec2':
      return new QueryServiceClient(apiMetadata.apiVersion, signingFetcher);
    case 'json':
    case 'rest-json':
      return new JsonServiceClient(apiMetadata.targetPrefix ?? 'TODO', apiMetadata.jsonVersion ?? '1.0', signingFetcher);
    case 'rest-xml':
      return new XmlServiceClient(signingFetcher);
    default: throw new Error(`TODO: protocol ${apiMetadata.protocol}`);
  }
}


export class BaseServiceClient implements ServiceClient {
  #signedFetcher: SigningFetcher;
  constructor(signedFetcher: SigningFetcher) {
    this.#signedFetcher = signedFetcher;
  }

  async performRequest(config: ApiRequestConfig & {
    body?: Uint8Array;
    headers: Headers;
  }): Promise<ApiResponse> {
    const headers = config.headers;
    const serviceUrl = config.requestUri ?? '/';
    const method = config.method ?? 'POST';

    if (config.body) {
      headers.append('content-length', config.body.length.toString());
    }

    let query = "";
    const queryS = config.query?.toString();
    if (queryS) {
      query = (serviceUrl.includes('?') ? '&' : '?') + queryS;
    }

    const request = new Request('https://example.com/', {
      method: method,
      headers: headers,
      body: config.body,
    });
    const rawResp = await this.#signedFetcher(request, {
      urlPath: serviceUrl + query,
      skipSigning: config.skipSigning,
      hostPrefix: config.hostPrefix,
      signal: config.abortSignal,
    });
    const response = new ApiResponse(rawResp.body, rawResp);

    if (response.status == (config.responseCode ?? 200)) {
      return response;
    } else if (response.status >= 400) {
      await handleErrorResponse(response);
    }
    throw new Error(`BUG: Unexpected HTTP response status ${response.status}`);
  }
}


export class XmlServiceClient extends BaseServiceClient {
  constructor(signedFetcher: SigningFetcher) {
    super(signedFetcher);
  }

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    const headers = config.headers ?? new Headers;
    headers.append('accept', 'text/xml');

    let reqBody: Uint8Array | undefined;
    if (typeof config.body === 'string') {
      reqBody = new TextEncoder().encode(config.body);
      headers.append('content-type', 'text/xml');
    } else if (config.body) throw new Error(`TODO: non-string body to XmlServiceClient`);

    return super.performRequest({
      ...config,
      headers,
      body: reqBody,
    });
  }
}

export class JsonServiceClient extends BaseServiceClient {
  #serviceTarget: string;
  #jsonVersion: string;
  constructor(serviceTarget: string, jsonVersion: string, signedFetcher: SigningFetcher) {
    super(signedFetcher);
    this.#serviceTarget = serviceTarget;
    this.#jsonVersion = jsonVersion;
  }

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    const headers = config.headers ?? new Headers;
    headers.append('x-amz-target', `${this.#serviceTarget}.${config.action}`);
    headers.append('accept', 'application/x-amz-json-'+this.#jsonVersion);

    let reqBody: Uint8Array | undefined;
    if (config.body instanceof Uint8Array) {
      reqBody = config.body;

    } else if (config.body) {
      reqBody = new TextEncoder().encode(JSON.stringify(config.body));
      headers.append('content-type', 'application/x-amz-json-'+this.#jsonVersion);
    }

    return super.performRequest({
      ...config,
      headers,
      body: reqBody,
    });
  }
}

export class QueryServiceClient extends BaseServiceClient {
  #serviceVersion: string;
  constructor(serviceVersion: string, signedFetcher: SigningFetcher) {
    super(signedFetcher);
    this.#serviceVersion = serviceVersion;
  }

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    const headers = config.headers ?? new Headers;
    headers.append('accept', 'text/xml');

    const method = config.method ?? 'POST';

    let reqBody: Uint8Array | undefined;

    if (config.body instanceof URLSearchParams) {
      if (method !== 'POST') throw new Error(`query is supposed to be POSTed`);
      const params = new URLSearchParams;
      params.set('Action', config.action);
      params.set('Version', this.#serviceVersion);
      // TODO: probably zero-copy this
      for (const [k, v] of config.body) {
        params.append(k, v);
      }

      reqBody = new TextEncoder().encode(params.toString());
      headers.append('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    } else if (config.body) throw new Error(`BUG: non-query based request body passed to query client`);

    return super.performRequest({
      ...config,
      headers,
      body: reqBody,
    });
  }
}

export class ApiResponse extends Response {
  get requestId(): string | null {
    return this.headers.get('x-amzn-requestid');
  }
}

async function handleErrorResponse(response: ApiResponse): Promise<never> {

  const contentType = response.headers.get('content-type');
  if (contentType?.startsWith('text/xml') || !contentType) {
    const xml = readXmlResult(await response.text());
    switch (xml.name) {

      case 'ErrorResponse': // e.g. sts
        // <ErrorResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
        //   <Error>
        //     <Type>Sender</Type>
        //     <Code>ExpiredToken</Code>
        //     <Message>The security token included in the request is expired</Message>
        //   </Error>
        //   <RequestId>90caa9d3-e248-4a7f-8fcf-c2a5d54c12b9</RequestId>
        // </ErrorResponse>
        const errNode = xml.first('Error');
        if (errNode) {
          throw new AwsServiceError(errNode.strings({
            required: { Code: true, Message: true, Type: true },
          }), xml.first('RequestId', false, x => x.content));
        }
        break;

      case 'Response': // e.g. ec2
        // <?xml version="1.0" encoding="UTF-8"?>
        // <Response><Errors><Error><Code>RequestExpired</Code><Message>Request has expired.</Message></Error></Errors><RequestID>433741ec-94c9-49bc-a9c8-ba59ab8972c2</RequestID></Response>
        const errors: ServiceError[] = xml.getList('Errors', 'Error')
          .map(errNode => errNode.strings({
            required: { Code: true, Message: true },
            optional: { Type: true },
          }));
        if (errors.length > 0) {
          throw new AwsServiceError(errors[0], xml.first('RequestID', false, x => x.content));
        }
        break;

      case 'Error': // e.g. s3
        throw new AwsServiceError(xml.strings({
          required: { Code: true, Message: true },
          optional: { 'Token-0': true, HostId: true },
        }), xml.first('RequestId', false, x => x.content));
    }

  } else if (contentType?.startsWith('application/json')) {
    const data = await response.json();
    if (data.Error?.Code) {
      throw new AwsServiceError(data.Error as ServiceError, data.RequestId);
    }
    console.log('Error from server:', response, data);

  } else if (contentType?.startsWith('application/x-amz-json-1.')) {
    const data = await response.json();
    if (data.__type && data.message) {
      throw new AwsServiceError({
        Code: data.__type,
        Message: data.message,
      }, response.requestId ?? 'unknown');
    }
    console.log('Error from server:', response, data);

  } else {
    console.log('Error body:', await response.text());
  }
  throw new Error(`Unrecognizable error response of type ${contentType}`);
}
