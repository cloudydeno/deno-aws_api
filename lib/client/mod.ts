export {
  AwsServiceError,
} from './common.ts';
export type {
  ServiceClient, ApiRequestConfig,
  ApiMetadata,
  ServiceError,
  Credentials, CredentialsProvider,
} from './common.ts';

export {
  AwsEndpointResolver,
  S3CompatibleEndpointResolver,
  FixedBaseEndpointResolver,
} from "./endpoints.ts";

export {
  DefaultCredentialsProvider,
  CredentialsProviderChain,
  EC2MetadataCredentials,
  EnvironmentCredentials,
  SharedIniFileCredentials,
  TokenFileWebIdentityCredentials,
} from "./credentials.ts";

// ---

import {
  Credentials, CredentialsProvider,
  DefaultCredentialsProvider,
} from "./credentials.ts";
import {
  EndpointResolver,
  AwsEndpointResolver,
  FixedBaseEndpointResolver,
} from "./endpoints.ts";
import {
  BaseApiFactory,
} from "./client.ts";
import type {
  ServiceClientExtras,
} from "./common.ts";

export class ApiFactory extends BaseApiFactory {
  constructor(opts: {
    credentialProvider?: CredentialsProvider,
    credentials?: Credentials,
    region?: string;
    fixedEndpoint?: string;
    endpointResolver?: EndpointResolver,
    extras?: ServiceClientExtras;
  }={}) {
    super({
      credentialProvider: DefaultCredentialsProvider,
      endpointResolver: (typeof opts.fixedEndpoint == 'string')
        ? new FixedBaseEndpointResolver(opts.fixedEndpoint)
        : new AwsEndpointResolver(),
      ...opts,
    });
  }
}
