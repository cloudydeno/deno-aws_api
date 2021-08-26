import { IMDSv2 } from './instance-metadata.ts';

Deno.test({
  name: 'getting a cached metadata token',
  async fn() {
    return; // TODO! re-enable test once AbortSignal is used properly
    const imds = new IMDSv2();
    try {
      const token = await imds.getToken();
      if (token !== await imds.getToken()) {
        throw new Error(`IMDSv2 token changed; should've been cached`);
      }
    } catch (err) {
      const {message} = err as Error;
      if (!(typeof message === 'string')) throw err;
      if (!message.includes('Instance Metadata Timeout')) throw err;
    }
  },
  sanitizeOps: false, // We leak the fetch until Deno adds fetch Aborting
});
