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

    return new DefaultServiceClient(serviceUrl, apiMetadata.apiVersion, signingFetcher);
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
    // TODO: we should probably have the api metadata so we can pick one of these
    // headers.append('accept', 'application/json'); // TODO
    // headers.append('accept', 'text/xml');

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
    const response = new ApiResponse(rawResp.body, rawResp);

    if (response.status == (config.responseCode ?? 200)) {
      return response;

    } else if (response.status >= 400) {
      const contentType = response.headers.get('content-type');
      if (contentType?.startsWith('text/xml') || !contentType) {
        const xml = await response.xml();
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

    }
    throw new Error(`BUG: Unexpected HTTP response status ${response.status}`);
  }
}

export class ApiResponse extends Response {
  async xml(resultWrapper?: string): Promise<XmlNode> {
    const text = await this.text();
    // console.log(text)
    const doc = parseXml(text);
    if (!doc.root) throw new Error(`ApiResponse lacking XML root`);

    if (resultWrapper) {
      const result = doc.root.first(resultWrapper);
      if (!result) throw new Error(`Result Wrapper ${JSON.stringify(resultWrapper)} is missing`);
      return result;
    }
    return doc.root;
  }
  get requestId(): string | null {
    return this.headers.get('x-amzn-requestid');
  }
}
