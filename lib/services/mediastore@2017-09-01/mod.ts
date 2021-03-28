// Autogenerated API client for: AWS Elemental MediaStore

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class MediaStore {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(MediaStore.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-09-01",
    "endpointPrefix": "mediastore",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "MediaStore",
    "serviceFullName": "AWS Elemental MediaStore",
    "serviceId": "MediaStore",
    "signatureVersion": "v4",
    "signingName": "mediastore",
    "targetPrefix": "MediaStore_20170901",
    "uid": "mediastore-2017-09-01"
  };

  async createContainer(
    {abortSignal, ...params}: RequestConfig & s.CreateContainerInput,
  ): Promise<s.CreateContainerOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateContainer",
    });
    return jsonP.readObj({
      required: {
        "Container": toContainer,
      },
      optional: {},
    }, await resp.json());
  }

  async deleteContainer(
    {abortSignal, ...params}: RequestConfig & s.DeleteContainerInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteContainer",
    });
    await resp.text();
  }

  async deleteContainerPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteContainerPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteContainerPolicy",
    });
    await resp.text();
  }

  async deleteCorsPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteCorsPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteCorsPolicy",
    });
    await resp.text();
  }

  async deleteLifecyclePolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteLifecyclePolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLifecyclePolicy",
    });
    await resp.text();
  }

  async deleteMetricPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteMetricPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteMetricPolicy",
    });
    await resp.text();
  }

  async describeContainer(
    {abortSignal, ...params}: RequestConfig & s.DescribeContainerInput = {},
  ): Promise<s.DescribeContainerOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeContainer",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Container": toContainer,
      },
    }, await resp.json());
  }

  async getContainerPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetContainerPolicyInput,
  ): Promise<s.GetContainerPolicyOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetContainerPolicy",
    });
    return jsonP.readObj({
      required: {
        "Policy": "s",
      },
      optional: {},
    }, await resp.json());
  }

  async getCorsPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetCorsPolicyInput,
  ): Promise<s.GetCorsPolicyOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetCorsPolicy",
    });
    return jsonP.readObj({
      required: {
        "CorsPolicy": [toCorsRule],
      },
      optional: {},
    }, await resp.json());
  }

  async getLifecyclePolicy(
    {abortSignal, ...params}: RequestConfig & s.GetLifecyclePolicyInput,
  ): Promise<s.GetLifecyclePolicyOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetLifecyclePolicy",
    });
    return jsonP.readObj({
      required: {
        "LifecyclePolicy": "s",
      },
      optional: {},
    }, await resp.json());
  }

  async getMetricPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetMetricPolicyInput,
  ): Promise<s.GetMetricPolicyOutput> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetMetricPolicy",
    });
    return jsonP.readObj({
      required: {
        "MetricPolicy": toMetricPolicy,
      },
      optional: {},
    }, await resp.json());
  }

  async listContainers(
    {abortSignal, ...params}: RequestConfig & s.ListContainersInput = {},
  ): Promise<s.ListContainersOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListContainers",
    });
    return jsonP.readObj({
      required: {
        "Containers": [toContainer],
      },
      optional: {
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceInput,
  ): Promise<s.ListTagsForResourceOutput> {
    const body: jsonP.JSONObject = {
      Resource: params["Resource"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": [toTag],
      },
    }, await resp.json());
  }

  async putContainerPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutContainerPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
      Policy: params["Policy"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutContainerPolicy",
    });
    await resp.text();
  }

  async putCorsPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutCorsPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
      CorsPolicy: params["CorsPolicy"]?.map(x => fromCorsRule(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutCorsPolicy",
    });
    await resp.text();
  }

  async putLifecyclePolicy(
    {abortSignal, ...params}: RequestConfig & s.PutLifecyclePolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
      LifecyclePolicy: params["LifecyclePolicy"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutLifecyclePolicy",
    });
    await resp.text();
  }

  async putMetricPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutMetricPolicyInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
      MetricPolicy: fromMetricPolicy(params["MetricPolicy"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutMetricPolicy",
    });
    await resp.text();
  }

  async startAccessLogging(
    {abortSignal, ...params}: RequestConfig & s.StartAccessLoggingInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartAccessLogging",
    });
    await resp.text();
  }

  async stopAccessLogging(
    {abortSignal, ...params}: RequestConfig & s.StopAccessLoggingInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ContainerName: params["ContainerName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StopAccessLogging",
    });
    await resp.text();
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Resource: params["Resource"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Resource: params["Resource"],
      TagKeys: params["TagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    await resp.text();
  }

}

function fromTag(input?: s.Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): s.Tag {
  return jsonP.readObj({
    required: {
      "Key": "s",
    },
    optional: {
      "Value": "s",
    },
  }, root);
}

function fromCorsRule(input?: s.CorsRule | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    AllowedOrigins: input["AllowedOrigins"],
    AllowedMethods: input["AllowedMethods"],
    AllowedHeaders: input["AllowedHeaders"],
    MaxAgeSeconds: input["MaxAgeSeconds"],
    ExposeHeaders: input["ExposeHeaders"],
  }
}
function toCorsRule(root: jsonP.JSONValue): s.CorsRule {
  return jsonP.readObj({
    required: {
      "AllowedOrigins": ["s"],
      "AllowedHeaders": ["s"],
    },
    optional: {
      "AllowedMethods": [(x: jsonP.JSONValue) => cmnP.readEnum<s.MethodName>(x)],
      "MaxAgeSeconds": "n",
      "ExposeHeaders": ["s"],
    },
  }, root);
}

function fromMetricPolicy(input?: s.MetricPolicy | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ContainerLevelMetrics: input["ContainerLevelMetrics"],
    MetricPolicyRules: input["MetricPolicyRules"]?.map(x => fromMetricPolicyRule(x)),
  }
}
function toMetricPolicy(root: jsonP.JSONValue): s.MetricPolicy {
  return jsonP.readObj({
    required: {
      "ContainerLevelMetrics": (x: jsonP.JSONValue) => cmnP.readEnum<s.ContainerLevelMetrics>(x),
    },
    optional: {
      "MetricPolicyRules": [toMetricPolicyRule],
    },
  }, root);
}

function fromMetricPolicyRule(input?: s.MetricPolicyRule | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ObjectGroup: input["ObjectGroup"],
    ObjectGroupName: input["ObjectGroupName"],
  }
}
function toMetricPolicyRule(root: jsonP.JSONValue): s.MetricPolicyRule {
  return jsonP.readObj({
    required: {
      "ObjectGroup": "s",
      "ObjectGroupName": "s",
    },
    optional: {},
  }, root);
}

function toContainer(root: jsonP.JSONValue): s.Container {
  return jsonP.readObj({
    required: {},
    optional: {
      "Endpoint": "s",
      "CreationTime": "d",
      "ARN": "s",
      "Name": "s",
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.ContainerStatus>(x),
      "AccessLoggingEnabled": "b",
    },
  }, root);
}
