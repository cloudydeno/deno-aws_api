// Autogenerated API client for: Amazon SageMaker Runtime

interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as client from "../../client/common.ts";
import type * as s from "./structs.ts";

export default class SageMakerRuntime {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(SageMakerRuntime.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-05-13",
    "endpointPrefix": "runtime.sagemaker",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "Amazon SageMaker Runtime",
    "serviceId": "SageMaker Runtime",
    "signatureVersion": "v4",
    "signingName": "sagemaker",
    "uid": "runtime.sagemaker-2017-05-13"
  };

  async invokeEndpoint(
    {abortSignal, ...params}: RequestConfig & s.InvokeEndpointInput,
  ): Promise<s.InvokeEndpointOutput> {
    const body = typeof params["Body"] === 'string' ? new TextEncoder().encode(params["Body"]) : params["Body"];
    const headers = new Headers;
    if (params["ContentType"] != null) headers.append("Content-Type", params["ContentType"]);
    if (params["Accept"] != null) headers.append("Accept", params["Accept"]);
    if (params["CustomAttributes"] != null) headers.append("X-Amzn-SageMaker-Custom-Attributes", params["CustomAttributes"]);
    if (params["TargetModel"] != null) headers.append("X-Amzn-SageMaker-Target-Model", params["TargetModel"]);
    if (params["TargetVariant"] != null) headers.append("X-Amzn-SageMaker-Target-Variant", params["TargetVariant"]);
    if (params["InferenceId"] != null) headers.append("X-Amzn-SageMaker-Inference-Id", params["InferenceId"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "InvokeEndpoint",
      requestUri: cmnP.encodePath`/endpoints/${params["EndpointName"]}/invocations`,
    });
  return {
    ContentType: resp.headers.get("Content-Type"),
    InvokedProductionVariant: resp.headers.get("x-Amzn-Invoked-Production-Variant"),
    CustomAttributes: resp.headers.get("X-Amzn-SageMaker-Custom-Attributes"),
    Body: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

}
