// Autogenerated API client for: Amazon EMR Containers

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import * as uuidv4 from "https://deno.land/std@0.91.0/uuid/v4.ts";
import type * as s from "./structs.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class EMRcontainers {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(EMRcontainers.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2020-10-01",
    "endpointPrefix": "emr-containers",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "Amazon EMR Containers",
    "serviceId": "EMR containers",
    "signatureVersion": "v4",
    "signingName": "emr-containers",
    "uid": "emr-containers-2020-10-01"
  };

  async cancelJobRun(
    {abortSignal, ...params}: RequestConfig & s.CancelJobRunRequest,
  ): Promise<s.CancelJobRunResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "CancelJobRun",
      method: "DELETE",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/jobruns/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
        "virtualClusterId": "s",
      },
    }, await resp.json());
  }

  async createManagedEndpoint(
    {abortSignal, ...params}: RequestConfig & s.CreateManagedEndpointRequest,
  ): Promise<s.CreateManagedEndpointResponse> {
    const body: jsonP.JSONObject = {
      name: params["name"],
      type: params["type"],
      releaseLabel: params["releaseLabel"],
      executionRoleArn: params["executionRoleArn"],
      certificateArn: params["certificateArn"],
      configurationOverrides: fromConfigurationOverrides(params["configurationOverrides"]),
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateManagedEndpoint",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/endpoints`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
        "name": "s",
        "arn": "s",
        "virtualClusterId": "s",
      },
    }, await resp.json());
  }

  async createVirtualCluster(
    {abortSignal, ...params}: RequestConfig & s.CreateVirtualClusterRequest,
  ): Promise<s.CreateVirtualClusterResponse> {
    const body: jsonP.JSONObject = {
      name: params["name"],
      containerProvider: fromContainerProvider(params["containerProvider"]),
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateVirtualCluster",
      requestUri: "/virtualclusters",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
        "name": "s",
        "arn": "s",
      },
    }, await resp.json());
  }

  async deleteManagedEndpoint(
    {abortSignal, ...params}: RequestConfig & s.DeleteManagedEndpointRequest,
  ): Promise<s.DeleteManagedEndpointResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteManagedEndpoint",
      method: "DELETE",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/endpoints/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
        "virtualClusterId": "s",
      },
    }, await resp.json());
  }

  async deleteVirtualCluster(
    {abortSignal, ...params}: RequestConfig & s.DeleteVirtualClusterRequest,
  ): Promise<s.DeleteVirtualClusterResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteVirtualCluster",
      method: "DELETE",
      requestUri: cmnP.encodePath`/virtualclusters/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
      },
    }, await resp.json());
  }

  async describeJobRun(
    {abortSignal, ...params}: RequestConfig & s.DescribeJobRunRequest,
  ): Promise<s.DescribeJobRunResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeJobRun",
      method: "GET",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/jobruns/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "jobRun": toJobRun,
      },
    }, await resp.json());
  }

  async describeManagedEndpoint(
    {abortSignal, ...params}: RequestConfig & s.DescribeManagedEndpointRequest,
  ): Promise<s.DescribeManagedEndpointResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeManagedEndpoint",
      method: "GET",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/endpoints/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "endpoint": toEndpoint,
      },
    }, await resp.json());
  }

  async describeVirtualCluster(
    {abortSignal, ...params}: RequestConfig & s.DescribeVirtualClusterRequest,
  ): Promise<s.DescribeVirtualClusterResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeVirtualCluster",
      method: "GET",
      requestUri: cmnP.encodePath`/virtualclusters/${params["id"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "virtualCluster": toVirtualCluster,
      },
    }, await resp.json());
  }

  async listJobRuns(
    {abortSignal, ...params}: RequestConfig & s.ListJobRunsRequest,
  ): Promise<s.ListJobRunsResponse> {
    const query = new URLSearchParams;
    if (params["createdBefore"] != null) query.set("createdBefore", cmnP.serializeDate_iso8601(params["createdBefore"]) ?? "");
    if (params["createdAfter"] != null) query.set("createdAfter", cmnP.serializeDate_iso8601(params["createdAfter"]) ?? "");
    if (params["name"] != null) query.set("name", params["name"]?.toString() ?? "");
    for (const item of params["states"] ?? []) {
      query.append("states", item?.toString() ?? "");
    }
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListJobRuns",
      method: "GET",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/jobruns`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "jobRuns": [toJobRun],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listManagedEndpoints(
    {abortSignal, ...params}: RequestConfig & s.ListManagedEndpointsRequest,
  ): Promise<s.ListManagedEndpointsResponse> {
    const query = new URLSearchParams;
    if (params["createdBefore"] != null) query.set("createdBefore", cmnP.serializeDate_iso8601(params["createdBefore"]) ?? "");
    if (params["createdAfter"] != null) query.set("createdAfter", cmnP.serializeDate_iso8601(params["createdAfter"]) ?? "");
    for (const item of params["types"] ?? []) {
      query.append("types", item?.toString() ?? "");
    }
    for (const item of params["states"] ?? []) {
      query.append("states", item?.toString() ?? "");
    }
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListManagedEndpoints",
      method: "GET",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/endpoints`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "endpoints": [toEndpoint],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {

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

  async listVirtualClusters(
    {abortSignal, ...params}: RequestConfig & s.ListVirtualClustersRequest = {},
  ): Promise<s.ListVirtualClustersResponse> {
    const query = new URLSearchParams;
    if (params["containerProviderId"] != null) query.set("containerProviderId", params["containerProviderId"]?.toString() ?? "");
    if (params["containerProviderType"] != null) query.set("containerProviderType", params["containerProviderType"]?.toString() ?? "");
    if (params["createdAfter"] != null) query.set("createdAfter", cmnP.serializeDate_iso8601(params["createdAfter"]) ?? "");
    if (params["createdBefore"] != null) query.set("createdBefore", cmnP.serializeDate_iso8601(params["createdBefore"]) ?? "");
    for (const item of params["states"] ?? []) {
      query.append("states", item?.toString() ?? "");
    }
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListVirtualClusters",
      method: "GET",
      requestUri: "/virtualclusters",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "virtualClusters": [toVirtualCluster],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async startJobRun(
    {abortSignal, ...params}: RequestConfig & s.StartJobRunRequest,
  ): Promise<s.StartJobRunResponse> {
    const body: jsonP.JSONObject = {
      name: params["name"],
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      executionRoleArn: params["executionRoleArn"],
      releaseLabel: params["releaseLabel"],
      jobDriver: fromJobDriver(params["jobDriver"]),
      configurationOverrides: fromConfigurationOverrides(params["configurationOverrides"]),
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartJobRun",
      requestUri: cmnP.encodePath`/virtualclusters/${params["virtualClusterId"]}/jobruns`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "id": "s",
        "name": "s",
        "arn": "s",
        "virtualClusterId": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<void> {
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
    await resp.text();
  }

}

function fromConfigurationOverrides(input?: s.ConfigurationOverrides | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    applicationConfiguration: input["applicationConfiguration"]?.map(x => fromConfiguration(x)),
    monitoringConfiguration: fromMonitoringConfiguration(input["monitoringConfiguration"]),
  }
}
function toConfigurationOverrides(root: jsonP.JSONValue): s.ConfigurationOverrides {
  return jsonP.readObj({
    required: {},
    optional: {
      "applicationConfiguration": [toConfiguration],
      "monitoringConfiguration": toMonitoringConfiguration,
    },
  }, root);
}

function fromConfiguration(input?: s.Configuration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    classification: input["classification"],
    properties: input["properties"],
    configurations: input["configurations"]?.map(x => fromConfiguration(x)),
  }
}
function toConfiguration(root: jsonP.JSONValue): s.Configuration {
  return jsonP.readObj({
    required: {
      "classification": "s",
    },
    optional: {
      "properties": x => jsonP.readMap(String, String, x),
      "configurations": [toConfiguration],
    },
  }, root);
}

function fromMonitoringConfiguration(input?: s.MonitoringConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    persistentAppUI: input["persistentAppUI"],
    cloudWatchMonitoringConfiguration: fromCloudWatchMonitoringConfiguration(input["cloudWatchMonitoringConfiguration"]),
    s3MonitoringConfiguration: fromS3MonitoringConfiguration(input["s3MonitoringConfiguration"]),
  }
}
function toMonitoringConfiguration(root: jsonP.JSONValue): s.MonitoringConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "persistentAppUI": (x: jsonP.JSONValue) => cmnP.readEnum<s.PersistentAppUI>(x),
      "cloudWatchMonitoringConfiguration": toCloudWatchMonitoringConfiguration,
      "s3MonitoringConfiguration": toS3MonitoringConfiguration,
    },
  }, root);
}

function fromCloudWatchMonitoringConfiguration(input?: s.CloudWatchMonitoringConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    logGroupName: input["logGroupName"],
    logStreamNamePrefix: input["logStreamNamePrefix"],
  }
}
function toCloudWatchMonitoringConfiguration(root: jsonP.JSONValue): s.CloudWatchMonitoringConfiguration {
  return jsonP.readObj({
    required: {
      "logGroupName": "s",
    },
    optional: {
      "logStreamNamePrefix": "s",
    },
  }, root);
}

function fromS3MonitoringConfiguration(input?: s.S3MonitoringConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    logUri: input["logUri"],
  }
}
function toS3MonitoringConfiguration(root: jsonP.JSONValue): s.S3MonitoringConfiguration {
  return jsonP.readObj({
    required: {
      "logUri": "s",
    },
    optional: {},
  }, root);
}

function fromContainerProvider(input?: s.ContainerProvider | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    type: input["type"],
    id: input["id"],
    info: fromContainerInfo(input["info"]),
  }
}
function toContainerProvider(root: jsonP.JSONValue): s.ContainerProvider {
  return jsonP.readObj({
    required: {
      "type": (x: jsonP.JSONValue) => cmnP.readEnum<s.ContainerProviderType>(x),
      "id": "s",
    },
    optional: {
      "info": toContainerInfo,
    },
  }, root);
}

function fromContainerInfo(input?: s.ContainerInfo | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    eksInfo: fromEksInfo(input["eksInfo"]),
  }
}
function toContainerInfo(root: jsonP.JSONValue): s.ContainerInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "eksInfo": toEksInfo,
    },
  }, root);
}

function fromEksInfo(input?: s.EksInfo | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    namespace: input["namespace"],
  }
}
function toEksInfo(root: jsonP.JSONValue): s.EksInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "namespace": "s",
    },
  }, root);
}

function fromJobDriver(input?: s.JobDriver | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    sparkSubmitJobDriver: fromSparkSubmitJobDriver(input["sparkSubmitJobDriver"]),
  }
}
function toJobDriver(root: jsonP.JSONValue): s.JobDriver {
  return jsonP.readObj({
    required: {},
    optional: {
      "sparkSubmitJobDriver": toSparkSubmitJobDriver,
    },
  }, root);
}

function fromSparkSubmitJobDriver(input?: s.SparkSubmitJobDriver | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    entryPoint: input["entryPoint"],
    entryPointArguments: input["entryPointArguments"],
    sparkSubmitParameters: input["sparkSubmitParameters"],
  }
}
function toSparkSubmitJobDriver(root: jsonP.JSONValue): s.SparkSubmitJobDriver {
  return jsonP.readObj({
    required: {
      "entryPoint": "s",
    },
    optional: {
      "entryPointArguments": ["s"],
      "sparkSubmitParameters": "s",
    },
  }, root);
}

function toJobRun(root: jsonP.JSONValue): s.JobRun {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "name": "s",
      "virtualClusterId": "s",
      "arn": "s",
      "state": (x: jsonP.JSONValue) => cmnP.readEnum<s.JobRunState>(x),
      "clientToken": "s",
      "executionRoleArn": "s",
      "releaseLabel": "s",
      "configurationOverrides": toConfigurationOverrides,
      "jobDriver": toJobDriver,
      "createdAt": "d",
      "createdBy": "s",
      "finishedAt": "d",
      "stateDetails": "s",
      "failureReason": (x: jsonP.JSONValue) => cmnP.readEnum<s.FailureReason>(x),
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toEndpoint(root: jsonP.JSONValue): s.Endpoint {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "name": "s",
      "arn": "s",
      "virtualClusterId": "s",
      "type": "s",
      "state": (x: jsonP.JSONValue) => cmnP.readEnum<s.EndpointState>(x),
      "releaseLabel": "s",
      "executionRoleArn": "s",
      "certificateArn": "s",
      "configurationOverrides": toConfigurationOverrides,
      "serverUrl": "s",
      "createdAt": "d",
      "securityGroup": "s",
      "subnetIds": ["s"],
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toVirtualCluster(root: jsonP.JSONValue): s.VirtualCluster {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "name": "s",
      "arn": "s",
      "state": (x: jsonP.JSONValue) => cmnP.readEnum<s.VirtualClusterState>(x),
      "containerProvider": toContainerProvider,
      "createdAt": "d",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}
