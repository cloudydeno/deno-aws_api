import {
  ServiceClient, ApiRequestConfig, ApiResponse, ApiWireStructure,
  AwsServiceError, ServiceError,
} from './common.ts';

export default class QueryServiceClient implements ServiceClient {
  #serviceUrl: string;
  #serviceVersion: string;
  #signedFetcher: (request: Request, abortSignal?: AbortSignal) => Promise<Response>;
  constructor(serviceUrl: string, serviceVersion: string, signedFetcher: (request: Request) => Promise<Response>) {
    this.#serviceUrl = serviceUrl;
    this.#serviceVersion = serviceVersion;
    this.#signedFetcher = signedFetcher;
  }

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    const headers = config.headers ?? new Headers;
    headers.append('accept', 'application/json'); // TODO

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
    const response = await this.#signedFetcher(request, config.abortSignal);

    if (!response.headers.get('content-type')?.startsWith('application/json')) {
      // console.log(await response.text());
      throw new Error(`TODO: ${this.#serviceUrl} offered us '${response.headers.get('content-type')}' :()`);
    }

    if (response.status == config.responseCode ?? 200) {
      // TODO: should we do anything else to help with responses?
      return new ApiResponse(response.body, response);

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

async function readResponseXml(this: Response): Promise<ApiWireStructure> {
  const text = await this.text();
  throw new Error(`TODO: Response.xml() in protocol-query`);
  return {};
}
