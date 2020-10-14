import type { ApiMetadata, Credentials, CredentialsProvider } from "./common.ts";

// If more than one credential source is available to the SDK, the default precedence of selection is as follows:
//  1. Credentials that are explicitly set through the service-client constructor
//  2. Environment variables
//  3. The shared credentials file
//  4. Credentials loaded from the ECS credentials provider
//  5. Credentials that are obtained by using a credential process specified in the shared AWS config file or the shared credentials file
//  6. Credentials loaded from AWS IAM using the credentials provider of the Amazon EC2 instance
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html

export class CredentialsProviderChain implements CredentialsProvider {
  #chain: (() => CredentialsProvider)[];
  #supplier?: CredentialsProvider;
  constructor(chain: Array<() => CredentialsProvider>) {
    this.#chain = chain;
  }
  async getCredentials(): Promise<Credentials> {
    if (this.#supplier) return this.#supplier.getCredentials();

    const errors: Array<string> = [];
    for (const providerFunc of this.#chain) {
      const provider = providerFunc();
      try {
        const creds = await provider.getCredentials();
        this.#supplier = provider;
        return creds;
      } catch (err) {
        const srcName = `    - ${provider.constructor.name} `;
        if (err instanceof Error) {
          // if (err.message !== 'No credentials found') {
            errors.push(srcName+(err.stack?.split('\n')[0] || err.message));
          // }
        } else if (err) {
          errors.push(srcName+err.toString());
        }
      }
    }
    return Promise.reject(new Error([
      `Failed to load any possible AWS credentials:`,
    ...errors].join('\n')));
  }
}

export const DefaultCredentialsProvider
  = new CredentialsProviderChain([
    () => new EnvironmentCredentials('AWS'),
    () => new EnvironmentCredentials('AMAZON'),
    () => new SharedIniFileCredentials(),
    // () => new ECSCredentials(),
    // () => new ProcessCredentials(),
    () => new TokenFileWebIdentityCredentials(),
    // () => new EC2MetadataCredentials(),
  ]);

// full spec: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
import * as ini from 'https://deno.land/x/ini@v2.1.0/ini.ts';
export class SharedIniFileCredentials implements CredentialsProvider {
  #filename: string;
  #profile: string;
  #promise?: Promise<Credentials>;
  constructor({
    profile,
    filename,
  }: {
    profile?: string,
    filename?: string,
  }={}) {

    if (!filename) {
      filename = Deno.env.get('AWS_SHARED_CREDENTIALS_FILE');
    }
    if (!filename) {
      // TODO: this will probably go wrong on windows
      const HOME = Deno.env.get('HOME');
      filename = HOME+'/.aws/credentials';
    }
    this.#filename = filename;

    if (!profile) {
      profile = Deno.env.get('AWS_PROFILE');
    }
    this.#profile = profile || 'default';
  }

  getCredentials(): Promise<Credentials> {
    if (!this.#promise) this.#promise = this.load();
    return this.#promise;
  }

  async load(): Promise<Credentials> {
    const text = await Deno.readTextFile(this.#filename);
    const data: {[name: string]: {
      aws_access_key_id?: string;
      aws_secret_access_key?: string;
      aws_session_token?: string;
      credential_process?: string;
      region?: string;
      // from saml2aws
      x_principal_arn?: string;
      x_security_token_expires?: string;
    } | undefined } = ini.decode(text);
    const config = data[`profile ${this.#profile}`] ?? data[this.#profile];
    if (!config) throw new Error(`Profile ${this.#profile} not found in credentials file`);
    if (!config.aws_access_key_id || !config.aws_secret_access_key) {
      throw new Error(`Profile ${this.#profile} lacks static credentials`);
    }
    return {
      awsAccessKeyId: config.aws_access_key_id,
      awsSecretKey: config.aws_secret_access_key,
      sessionToken: config.aws_session_token,
      region: config.region,
    };
  }
}

export class EnvironmentCredentials implements CredentialsProvider {
  #prefix: string;
  #promise?: Promise<Credentials>;
  constructor(prefix = 'AWS') {
    this.#prefix = prefix;
  }

  getCredentials(): Promise<Credentials> {
    if (!this.#promise) this.#promise = this.load();
    return this.#promise;
  }

  load(): Promise<Credentials> {
    const AWS_ACCESS_KEY_ID = Deno.env.get(this.#prefix+"_ACCESS_KEY_ID");
    const AWS_SECRET_ACCESS_KEY = Deno.env.get(this.#prefix+"_SECRET_ACCESS_KEY");
    const AWS_SESSION_TOKEN = Deno.env.get(this.#prefix+"_SESSION_TOKEN");

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      return Promise.reject(new Error(`${this.#prefix} environment variables not set`));
    }

    return Promise.resolve({
      awsAccessKeyId: AWS_ACCESS_KEY_ID,
      awsSecretKey: AWS_SECRET_ACCESS_KEY,
      sessionToken: AWS_SESSION_TOKEN,
    });
  }
}

export class TokenFileWebIdentityCredentials implements CredentialsProvider {
  #roleArn?: string;
  #tokenPath?: string;
  #sessionName: string;
  #promise: Promise<Credentials> | null = null;
  #expireAfter: Date | null = null;

  constructor(opts: {
    roleArn?: string;
    tokenPath?: string;
    sessionName?: string;
  }={}) {
    this.#roleArn = opts.roleArn
      || Deno.env.get('AWS_ROLE_ARN');
    this.#tokenPath = opts.tokenPath
      || Deno.env.get('AWS_WEB_IDENTITY_TOKEN_FILE');
    this.#sessionName = opts.sessionName
      || Deno.env.get('AWS_ROLE_SESSION_NAME')
      || 'token-file-web-identity';
  }

  // We can't expire using setTimeout because that hangs Deno
  // https://github.com/denoland/deno/issues/6141
  getCredentials(): Promise<Credentials> {
    if (this.#expireAfter && this.#expireAfter < new Date()) {
      this.#expireAfter = null;
      this.#promise = null;
    }

    if (!this.#promise) {
      const promise = this.load();
      this.#promise = promise.then(x => {
        if (x.expiresAt && x.expiresAt > new Date()) {
          this.#expireAfter = new Date(x.expiresAt.valueOf() - 60*1000);
        }
        return x;
      }, err => {
        this.#expireAfter = new Date(Date.now() + 30*1000);
        return Promise.reject(err);
      });
    }

    return this.#promise;
  }

  async load(): Promise<Credentials> {
    if (!this.#tokenPath) throw new Error(`No WebIdentityToken file path is set`);
    if (!this.#roleArn) throw new Error(`No Role ARN is set`);

    const client = new ApiFactory().buildServiceClient(StsApiMetadata);
    const resp = await assumeRoleWithWebIdentity(client, {
      RoleArn: this.#roleArn,
      RoleSessionName: this.#sessionName,
      WebIdentityToken: await Deno.readTextFile(this.#tokenPath),
    });

    return Promise.resolve({
      awsAccessKeyId: resp.AccessKeyId,
      awsSecretKey: resp.SecretAccessKey,
      sessionToken: resp.SessionToken,
      expiresAt: resp.Expiration,
    });
  }
}

export function getDefaultCredentials(): Promise<Credentials> {
  return DefaultCredentialsProvider.getCredentials();
}

export function getDefaultRegion(): string {
  const AWS_REGION = Deno.env.get("AWS_REGION");
  if (!AWS_REGION) {
    throw new Error("Set AWS_REGION environment variable");
  }
  return AWS_REGION;
};


//--------------------------------------------
// Embedded subset of STS for assuming roles
// Is it even worth saving the one STS file? idk

import { ApiFactory } from '../client/mod.ts';
import { ServiceClient, XmlNode } from "../client/common.ts";

const StsApiMetadata: ApiMetadata = {
  apiVersion: "2011-06-15",
  endpointPrefix: "sts",
  globalEndpoint: "sts.amazonaws.com",
  protocol: "query",
  serviceAbbreviation: "AWS STS",
  serviceFullName: "AWS Security Token Service",
  serviceId: "STS",
  signatureVersion: "v4",
  uid: "sts-2011-06-15",
  xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/"
};

async function assumeRoleWithWebIdentity(sts: ServiceClient, params: {
  RoleArn: string;
  RoleSessionName: string;
  WebIdentityToken: string;
}): Promise<AssumedCredentials> {
  const body = new URLSearchParams([
    ["RoleArn", params["RoleArn"] ?? ''],
    ["RoleSessionName", params["RoleSessionName"] ?? ''],
    ["WebIdentityToken", params["WebIdentityToken"] ?? ''],
  ]);
  const resp = await sts.performRequest({
    action: "AssumeRoleWithWebIdentity",
    skipSigning: true,
    body,
  });
  const xml = await resp.xml("AssumeRoleWithWebIdentityResult");
  return xml.first("Credentials", true, parseAssumedCredentials);
}

interface AssumedCredentials {
  AccessKeyId: string;
  SecretAccessKey: string;
  SessionToken: string;
  Expiration: Date;
}
function parseAssumedCredentials(node: XmlNode): AssumedCredentials {
  return {
    ...node.strings({
      required: {"AccessKeyId":true,"SecretAccessKey":true,"SessionToken":true},
    }),
    Expiration: node.first("Expiration", true, x => parseXmlTimestamp(x.content)),
  };
}
function parseXmlTimestamp(str: string | undefined): Date {
  if (str?.includes('T')) return new Date(str);
  if (str?.length === 10) return new Date(parseInt(str) * 1000)
  throw new Error(`Timestamp from STS is unparsable: '${str}'`);
}
