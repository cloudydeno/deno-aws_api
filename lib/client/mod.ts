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

export {
  ApiFactory,
} from "./api-factory.ts";
