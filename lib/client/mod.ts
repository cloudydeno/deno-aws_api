export {
  AwsServiceError,
} from './common.ts';
export type {
  ServiceClient, ApiRequestConfig,
  ApiMetadata,
  ServiceError,
  Credentials, CredentialsProvider,
} from './common.ts';

import {
  Credentials, CredentialsProvider,
  DefaultCredentialsProvider,
} from "./credentials.ts";
import {
  BaseApiFactory,
} from "./client.ts";

export class ApiFactory extends BaseApiFactory {
  constructor(opts: {
    credentialProvider?: CredentialsProvider,
    credentials?: Credentials,
    region?: string;
  }={}) {
    super({
      credentialProvider: DefaultCredentialsProvider,
      ...opts,
    });
  }
}
