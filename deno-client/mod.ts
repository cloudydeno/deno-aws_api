// import { AWSSignerV4 } from "https://deno.land/x/aws_sign_v4@0.1.1/mod.ts";
import { AWSSignerV4 } from "./signing-v4.ts";
import {
  ServiceClient, ApiRequestConfig, ApiResponse as BaseApiResponse,
  ApiWireStructure,
  ApiMetadata,
  XmlNode,
  AwsServiceError, ServiceError,
} from './common.ts';
import { parseXml } from './xml.ts';

export class ApiFactory {
  buildServiceClient(apiMetadata: ApiMetadata): ServiceClient {
    if (apiMetadata.signatureVersion === 'v2') {
      throw new Error(`TODO: signature version ${apiMetadata.signatureVersion}`);
    }

    const signer = new AWSSignerV4(apiMetadata.globalEndpoint ? 'us-east-1' : undefined);
    const serviceUrl = 'https://' + (apiMetadata.globalEndpoint
      ?? `${apiMetadata.endpointPrefix}.${Deno.env.get('AWS_REGION')}.amazonaws.com`);

    const signingName = apiMetadata.signingName ?? apiMetadata.endpointPrefix;
    const signingFetcher = async (request: Request, signal?: AbortSignal): Promise<Response> => {
      const req = await signer.sign(signingName, request);
      return fetch(req, { signal });
    }

    // switch (apiMetadata.protocol) {
    //   case 'query':
    return new DefaultServiceClient(serviceUrl, apiMetadata.apiVersion, signingFetcher);
    //   default:
    //     throw new Error(`TODO!!! service protocol ${apiMetadata.protocol}`);
    // }
  }

}

export class DefaultServiceClient implements ServiceClient {
  #serviceUrl: string;
  #serviceVersion: string;
  #signedFetcher: (request: Request, signal?: AbortSignal) => Promise<Response>;
  constructor(serviceUrl: string, serviceVersion: string, signedFetcher: (request: Request, signal?: AbortSignal) => Promise<Response>) {
    this.#serviceUrl = serviceUrl;
    this.#serviceVersion = serviceVersion;
    this.#signedFetcher = signedFetcher;
  }

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    const headers = config.headers ?? new Headers;
    // headers.append('accept', 'application/json'); // TODO
    headers.append('accept', 'text/xml');

    const [scheme, host] = this.#serviceUrl.split('//');
    const serviceUrl = `${scheme}//${config.hostPrefix ?? ''}${host}${config.requestUri ?? '/'}`;
    const method = config.method ?? 'POST';

    let reqBody: Uint8Array;
    let query = '';

    if (config.body instanceof Uint8Array) {
      reqBody = config.body;
    } else if (config.body instanceof URLSearchParams) {
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
      headers.append('content-length', reqBody.length.toString());
    } else throw new Error(`TODO: non-query based APIs`);

    if (query) {
      query = (serviceUrl.includes('?') ? '&' : '?') + query;
    }

    const request = new Request(serviceUrl + query, {
      method: method,
      headers: headers,
      body: reqBody,
    });
    const rawResp = await this.#signedFetcher(request, config.abortSignal);
    console.log(rawResp);
    const response = new ApiResponse(rawResp.body, rawResp);

    // if (!response.headers.get('content-type')?.startsWith('application/json')) {
    //   // console.log(await response.text());
    //   throw new Error(`TODO: ${this.#serviceUrl} offered us '${response.headers.get('content-type')}' :()`);
    // }

    if (response.status == (config.responseCode ?? 200)) {
      return response;

    } else if (response.status >= 400) {
      const contentType = response.headers.get('content-type');
      if (contentType?.startsWith('text/xml')) {
        const xml = await response.xml();
        const [{Error, RequestId}] = xml.mapChildren({});
        if (Error)  {
          const [{Code, Message, Type}] = Error.mapChildren({});
          throw new AwsServiceError({
            Code: Code.content ?? '',
            Message: Message.content ?? '',
            Type: Type.content ?? '',
          }, RequestId.content ?? '');
        }

      } else if (contentType?.startsWith('application/json')) {
        const data = await response.json();
        if (data.Error?.Code) {
          throw new AwsServiceError(data.Error as ServiceError, data.RequestId);
        }
        console.log('Error from server:', response, data);

      } else {
        console.log('Error body:', await response.text());
      }
      throw new Error(`Unrecognizable error response of type ${contentType}`);

    } else {
      throw new Error(`BUG: Unexpected HTTP response status ${response.status}`);
    }
  }
}

export class ApiResponse extends Response {
  async xml(resultWrapper?: string): Promise<XmlNode> {
    const text = await this.text();
    const doc = parseXml(text);
    if (!doc.root) throw new Error(`ApiResponse lacking XML root`);

    if (resultWrapper) {
      const result = doc.root.getChild(resultWrapper);
      if (!result) throw new Error(`Result Wrapper ${JSON.stringify(resultWrapper)} is missing`);
      return result;
    }
    return doc.root;
  }
  get requestId(): string | null {
    return this.headers.get('x-amzn-requestid');
  }
}
