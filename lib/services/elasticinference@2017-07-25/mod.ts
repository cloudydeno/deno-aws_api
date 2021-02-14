// Autogenerated API client for: Amazon Elastic  Inference

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class ElasticInference {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ElasticInference.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-07-25",
    "endpointPrefix": "api.elastic-inference",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "Amazon Elastic Inference",
    "serviceFullName": "Amazon Elastic  Inference",
    "serviceId": "Elastic Inference",
    "signatureVersion": "v4",
    "signingName": "elastic-inference",
    "uid": "elastic-inference-2017-07-25"
  };

  async describeAcceleratorOfferings(
    {abortSignal, ...params}: RequestConfig & s.DescribeAcceleratorOfferingsRequest,
  ): Promise<s.DescribeAcceleratorOfferingsResponse> {
    const body: jsonP.JSONObject = {
      locationType: params["locationType"],
      acceleratorTypes: params["acceleratorTypes"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeAcceleratorOfferings",
      requestUri: "/describe-accelerator-offerings",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "acceleratorTypeOfferings": [toAcceleratorTypeOffering],
      },
    }, await resp.json());
  }

  async describeAcceleratorTypes(
    {abortSignal, ...params}: RequestConfig & s.DescribeAcceleratorTypesRequest = {},
  ): Promise<s.DescribeAcceleratorTypesResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeAcceleratorTypes",
      method: "GET",
      requestUri: "/describe-accelerator-types",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "acceleratorTypes": [toAcceleratorType],
      },
    }, await resp.json());
  }

  async describeAccelerators(
    {abortSignal, ...params}: RequestConfig & s.DescribeAcceleratorsRequest = {},
  ): Promise<s.DescribeAcceleratorsResponse> {
    const body: jsonP.JSONObject = {
      acceleratorIds: params["acceleratorIds"],
      filters: params["filters"]?.map(x => fromFilter(x)),
      maxResults: params["maxResults"],
      nextToken: params["nextToken"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeAccelerators",
      requestUri: "/describe-accelerators",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "acceleratorSet": [toElasticInferenceAccelerator],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResult> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "ListTagsForResource",
      method: "GET",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<s.TagResourceResult> {
    const body: jsonP.JSONObject = {
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<s.UntagResourceResult> {
    const query = new URLSearchParams;
    for (const item of params["tagKeys"]) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

}

function fromFilter(input?: s.Filter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    values: input["values"],
  }
}

function toAcceleratorTypeOffering(root: jsonP.JSONValue): s.AcceleratorTypeOffering {
  return jsonP.readObj({
    required: {},
    optional: {
      "acceleratorType": "s",
      "locationType": (x: jsonP.JSONValue) => cmnP.readEnum<s.LocationType>(x),
      "location": "s",
    },
  }, root);
}

function toAcceleratorType(root: jsonP.JSONValue): s.AcceleratorType {
  return jsonP.readObj({
    required: {},
    optional: {
      "acceleratorTypeName": "s",
      "memoryInfo": toMemoryInfo,
      "throughputInfo": [toKeyValuePair],
    },
  }, root);
}

function toMemoryInfo(root: jsonP.JSONValue): s.MemoryInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "sizeInMiB": "n",
    },
  }, root);
}

function toKeyValuePair(root: jsonP.JSONValue): s.KeyValuePair {
  return jsonP.readObj({
    required: {},
    optional: {
      "key": "s",
      "value": "n",
    },
  }, root);
}

function toElasticInferenceAccelerator(root: jsonP.JSONValue): s.ElasticInferenceAccelerator {
  return jsonP.readObj({
    required: {},
    optional: {
      "acceleratorHealth": toElasticInferenceAcceleratorHealth,
      "acceleratorType": "s",
      "acceleratorId": "s",
      "availabilityZone": "s",
      "attachedResource": "s",
    },
  }, root);
}

function toElasticInferenceAcceleratorHealth(root: jsonP.JSONValue): s.ElasticInferenceAcceleratorHealth {
  return jsonP.readObj({
    required: {},
    optional: {
      "status": "s",
    },
  }, root);
}
