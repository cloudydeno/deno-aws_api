import {
  ServiceClient, ApiRequestConfig,
  AwsServiceError, ServiceError,
} from './common.ts';

export default class QueryServiceClient implements ServiceClient {
  #serviceUrl: string;
  #serviceVersion: string;
  #signedFetcher: (request: Request) => Promise<Response>;
  constructor(serviceUrl: string, serviceVersion: string, signedFetcher: (request: Request) => Promise<Response>) {
    this.#serviceUrl = serviceUrl;
    this.#serviceVersion = serviceVersion;
    this.#signedFetcher = signedFetcher;
  }

  async performRequest(config: ApiRequestConfig): Promise<any> {
    if (config.locationsIn) throw new Error(`TODO: locations in`);
    if (config.locationsOut) throw new Error(`TODO: locations out`);

    const params = new URLSearchParams;
    params.set('Action', config.action);
    params.set('Version', this.#serviceVersion);
    for (const [key, val] of Object.entries(config.input ?? {})) {
      if (typeof val !== 'string') throw new Error(`TODO: complex query params`);
      params.set(key, `${val}`);
    }

    const inQuery = config.method === 'HEAD' || config.method === 'GET';
    const body = new TextEncoder().encode(params.toString());
    const request = inQuery
      // GET, HEAD
      ? new Request(this.#serviceUrl + config.requestUri + (config.requestUri.includes('?') ? '&' : '?') + params, {
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

    const response = await this.#signedFetcher(request)

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
