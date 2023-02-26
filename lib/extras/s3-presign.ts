import { type Credentials, DefaultCredentialsProvider, getDefaultRegion } from "../client/credentials.ts";
import { AWSSignerV4 } from "../client/signing.ts";

export interface GetSignedUrlOptions {
  bucket: string;
  path: string;
  useDualstack?: boolean;
  credentials?: Credentials;
  method?: 'GET' | 'PUT';
  region?: string;
  expiresIn?: number;
  date?: Date;
}

/**
 * Presigns an AWS S3 URL for one of the commercial AWS regions.
 */
export async function getPresignedUrl(options: GetSignedUrlOptions): Promise<string> {
  const credentials = options.credentials ?? await DefaultCredentialsProvider.getCredentials();
  const region = options.region ?? credentials.region ?? getDefaultRegion();

  const endpointHost = `s3.${(options.useDualstack ?? true) ? `dualstack.` : ''}${region}.amazonaws.com`;
  const path = options.path.replace(/^\//, '');
  const url = options.bucket.includes('.')
    ? `https://${endpointHost}/${options.bucket}/${path}`
    : `https://${options.bucket}.${endpointHost}/${path}`;

  const signer = new AWSSignerV4(region, credentials);
  return await signer.presign('s3', {
    url,
    expiresIn: options.expiresIn,
    method: options.method,
    signTime: options.date,
  });
}
