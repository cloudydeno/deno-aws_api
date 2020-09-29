import { AWSSignerV4 } from "https://deno.land/x/aws_sign_v4@0.1.1/mod.ts";
import QueryServiceClient from './protocol-query.ts';
import type {ServiceClient, ApiMetadata} from './common.ts';

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

    switch (apiMetadata.protocol) {
      case 'query':
        return new QueryServiceClient(serviceUrl, apiMetadata.apiVersion, signingFetcher);
      default:
        throw new Error(`TODO!!! service protocol ${apiMetadata.protocol}`);
    }
  }

}
