import { assertThrowsAsync } from "https://deno.land/std@0.104.0/testing/asserts.ts";
import { BaseApiFactory } from "./client.ts";

Deno.test("Request cancellation", async () => {
  const apiFactory = new BaseApiFactory({
    credentials: {
      region: '',
      awsAccessKeyId: '',
      awsSecretKey: '',
    },
    endpointResolver: {
      resolveUrl(params) {
        return {
          url: new URL("https://example.com"),
          signingRegion: params.region,
        };
      },
    },
  });

  const client = apiFactory.buildServiceClient({
    apiVersion: "",
    endpointPrefix: "",
    protocol: "json",
    serviceFullName: "",
    serviceId: "",
    signatureVersion: "v4",
  });

  const aborter = new AbortController();
  aborter.abort();

  await assertThrowsAsync(() => client
    .performRequest({
      action: "",
      skipSigning: true,
      opts: {
        signal: aborter.signal
      },
    }), DOMException, 'fetch was aborted');

});
