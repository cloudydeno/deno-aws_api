import {
  ServiceClient, ApiRequestConfig, ApiResponse, ApiWireStructure,
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

  async performRequest(config: ApiRequestConfig): Promise<ApiResponse> {
    // const {abortSignal, ...input} = config.input;
    // if (config.inputSpec) console.log(`TODO: locations in`);
    // if (config.outputSpec) console.log(`TODO: locations out`);

    let reqBody: Uint8Array;

    if (!(config.body instanceof URLSearchParams)) {
      throw new Error(`TODO: non-query based APIs`);
    }

    // if (config.body instanceof Uint8Array) {
    //   reqBody = config.body;
    // } else if (config.body instanceof URLSearchParams) {
      const params = new URLSearchParams;
      params.set('Action', config.action);
      params.set('Version', this.#serviceVersion);
      // TODO: probably zero-copy this
      for (const [k, v] of config.body) {
        params.append(k, v);
      }
      reqBody = new TextEncoder().encode(params.toString());
    // }
    // for (const [key, val] of Object.entries(config.body ?? {})) {
    //   switch (typeof val) {
    //     case 'string':
    //     case 'number':
    //       params.set(key, `${val}`);
    //       break;
    //     case 'boolean':
    //       params.set(key, val ? 'true' : 'false');
    //       break;
    //     case 'object':
    //       if (Array.isArray(val)) {
    //         val.forEach((entry, idx) => {
    //           params.set(`${key}.member.${idx+1}`, `${entry}`);
    //         });
    //         if (val.length < 1) {
    //           params.set(key, ''); // empty array sentinel
    //         }
    //         break;
    //       }
    //     default:
    //       throw new Error(`TODO: complex query params`);
    //   }
    // }

    const request = config.method === 'HEAD' || config.method === 'GET'
      // GET, HEAD
      ? new Request(this.#serviceUrl + (config.requestUri ?? '/') + ((config.requestUri ?? '/').includes('?') ? '&' : '?') + params, {
        method: config.method ?? 'POST',
        headers: {
          "accept": 'application/json',
        },
      })
      // POST, etc
      : new Request(this.#serviceUrl + (config.requestUri ?? '/'), {
        method: config.method ?? 'POST',
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
          "content-length": reqBody.length.toString(),
          "accept": 'application/json',
        },
        body: reqBody,
      });

    const response = await this.#signedFetcher(request)

    if (!response.headers.get('content-type')?.startsWith('application/json')) {
      // console.log(await response.text());
      throw new Error(`TODO: ${this.#serviceUrl} offered us '${response.headers.get('content-type')}' :()`);
    }

    if (response.status >= 200 && response.status < 300) {
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
