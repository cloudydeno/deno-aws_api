export class IMDSv2 {
  constructor({
    baseUrl = 'http://169.254.169.254/latest/',
    timeoutMs = 1000,
    tokenTtlSeconds = 21600,
  } = {}) {
    this.baseUrl = new URL(baseUrl);
    this.timeoutMs = Math.floor(timeoutMs);
    this.tokenTtlSeconds = Math.floor(tokenTtlSeconds);
  }
  baseUrl: URL;
  timeoutMs: number;
  tokenTtlSeconds: number;

  cachedToken: string | null = null;
  async getToken() {
    if (this.cachedToken) return this.cachedToken;
    // Fetch fresh token
    const [newToken, expireAfterMillis] = await this.fetchNewToken();

    // Cache for a limited time. Don't auto renew, will happen next request
    this.cachedToken = newToken;
    setTimeout(() => {
      if (this.cachedToken === newToken) {
        this.cachedToken = null;
      }
    }, Math.max(1000, expireAfterMillis));

    return newToken;
  }

  async fetchNewToken() {
    const ttlSeconds = this.tokenTtlSeconds;

    const httpFetch = fetch(new URL('api/token', this.baseUrl), {
      method: 'PUT',
      signal: this.makeTimeoutSignal(),
      headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": ttlSeconds.toFixed(0),
      }});

    // Kludge in a brute rejection because Deno lacks AbortSignal
    // https://github.com/denoland/deno/issues/7019
    const resp = await Promise.race([
      httpFetch,
      this.makeTimeoutPromise(),
    ]);

    if (resp.status > 299) throw new Error(
      `Metadata server gave HTTP ${resp.status} to V2 token request`);

    return [
      await resp.text(),
      Math.floor(ttlSeconds * 0.95 * 1000),
    ] as const;
  }

  async performRequest(
    method: 'GET' | 'HEAD' | 'PUT' = 'GET',
    path = 'meta-data/',
  ) {
    const resp = await fetch(new URL(path, this.baseUrl), {
      method: method,
      signal: this.makeTimeoutSignal(),
      headers: {
        "x-aws-ec2-metadata-token": await this.getToken(),
      }});
    if (resp.status > 299) {
      const err: any = new Error(`Metadata server gave HTTP ${resp.status} to ${method} ${path}`);
      err.status = resp.status;
      throw err;
    }

    return await resp.text();
  }

  makeTimeoutSignal(): AbortSignal {
    const aborter = new AbortController();
    setTimeout(() => aborter.abort(), this.timeoutMs);
    return aborter.signal;
  }
  makeTimeoutPromise() {
    return new Promise<never>((ok, err) => {
      setTimeout(() => {
        err(new Error(`Instance Metadata Timeout: ${this.timeoutMs}ms`));
      }, this.timeoutMs + 25);
    });
  }

}

// TODO: typed interfaces around all the metadata endpoints
// dynamic/instance-identity/document - JSON
// user-data - arbitrary binary data from the user
// meta-data - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-categories.html

// Theses paths have some interesting data for talking to AWS services:
// meta-data/services/domain and meta-data/services/partition
// TODO: autoconfigure AWS hostnames and signing partitions from IMDSv2 ^^
