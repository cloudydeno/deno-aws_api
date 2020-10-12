import type { Credentials, CredentialsProvider } from "./common.ts";

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
  constructor(chain: Array<() => CredentialsProvider>) {
    this.#chain = chain;
  }
  async getCredentials(): Promise<Credentials> {
    const errors: Array<string> = [];
    for (const providerFunc of this.#chain) {
      const provider = providerFunc();
      try {
        return await provider.getCredentials();
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
    // () => new TokenFileWebIdentityCredentials(),
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
