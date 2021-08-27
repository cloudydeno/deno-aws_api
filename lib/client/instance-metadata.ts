export class IMDSv2 {
  constructor({
    baseUrl = 'http://169.254.169.254/latest/',
    timeoutMs = 1000,
    apiTimeoutMs = 5000,
    tokenTtlSeconds = 21600,
  } = {}) {
    this.baseUrl = new URL(baseUrl);
    this.timeoutMs = Math.floor(timeoutMs);
    this.apiTimeoutMs = Math.floor(apiTimeoutMs);
    this.tokenTtlSeconds = Math.floor(tokenTtlSeconds);
  }
  baseUrl: URL;
  timeoutMs: number; // How long we wait for the initial discovery request
  apiTimeoutMs: number; // How long we'll wait after IMDS is discovered
  tokenTtlSeconds: number;

  cachedToken: string | null = null;
  async getToken() {
    if (this.cachedToken) return this.cachedToken;
    // Fetch fresh token
    const [newToken, expireAfterMillis] = await this.fetchNewToken();

    // Cache for a limited time. Don't auto renew, will happen next request
    // TODO: abandon setTimeout as it keeps Deno's loop alive
    this.cachedToken = newToken;
    setTimeout(() => {
      if (this.cachedToken === newToken) {
        this.cachedToken = null;
      }
    }, Math.max(1000, expireAfterMillis));

    return newToken;
  }

  async fetchNewToken(): Promise<[string, number]> {
    const ttlSeconds = this.tokenTtlSeconds;

    const respText = await this.#performRawRequest({
      method: 'PUT',
      path: 'api/token',
      timeoutMs: this.cachedToken ? this.apiTimeoutMs : this.timeoutMs,
      headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": ttlSeconds.toFixed(0),
      }});

    return [
      respText,
      Math.floor(ttlSeconds * 0.95 * 1000),
    ];
  }

  async performRequest(
    method: 'GET' | 'HEAD' | 'PUT' = 'GET',
    path = 'meta-data/',
  ) {
    return await this.#performRawRequest({
      method, path,
      timeoutMs: this.apiTimeoutMs,
      headers: {
        "x-aws-ec2-metadata-token": await this.getToken(),
      }});
  }

  async #performRawRequest(opts: {
    method: 'GET' | 'HEAD' | 'PUT',
    path: string,
    timeoutMs: number,
    headers: HeadersInit,
  }) {
    const aborter = new AbortController();
    const stopTimeout = setTimeout(() => aborter.abort(), opts.timeoutMs);

    const resp = await fetch(new URL(opts.path, this.baseUrl), {
      method: opts.method,
      headers: opts.headers,
      signal: aborter.signal,
    }).catch(err => {
      // Rethrow aborted fetches as nicer timeouts
      if (err instanceof DOMException && err.message.includes('aborted')) {
        return Promise.reject(new Error(
          `Instance Metadata Timeout: ${opts.timeoutMs}ms`));
      }
      return Promise.reject(err);
    }).finally(() => {
      clearTimeout(stopTimeout);
    });

    if (resp.status === 411) {
      resp.body?.cancel();
      throw new Error(
        `Metadata server gave HTTP 411 for /${opts.path}; is this not AWS?`);
    } else if (resp.status > 299) {
      resp.body?.cancel();
      const err: any = new Error(
        `Metadata server gave HTTP ${resp.status} to ${opts.method} /${opts.path}`);
      err.status = resp.status;
      throw err;
    }

    return await resp.text();
  }

}

// TODO: typed interfaces around all the metadata endpoints
// dynamic/instance-identity/document - JSON
// user-data - arbitrary binary data from the user
// meta-data - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-categories.html

// Theses paths have some interesting data for talking to AWS services:
// meta-data/services/domain and meta-data/services/partition
// TODO: autoconfigure AWS hostnames and signing partitions from IMDSv2 ^^
