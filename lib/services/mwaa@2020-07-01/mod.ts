// Autogenerated API client for: AmazonMWAA

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class MWAA {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(MWAA.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2020-07-01",
    "endpointPrefix": "airflow",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "AmazonMWAA",
    "serviceId": "MWAA",
    "signatureVersion": "v4",
    "signingName": "airflow",
    "uid": "mwaa-2020-07-01"
  };

  async createCliToken(
    {abortSignal, ...params}: RequestConfig & s.CreateCliTokenRequest,
  ): Promise<s.CreateCliTokenResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "CreateCliToken",
      requestUri: cmnP.encodePath`/clitoken/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `env.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CliToken": "s",
        "WebServerHostname": "s",
      },
    }, await resp.json());
  }

  async createEnvironment(
    {abortSignal, ...params}: RequestConfig & s.CreateEnvironmentInput,
  ): Promise<s.CreateEnvironmentOutput> {
    const body: jsonP.JSONObject = {
      AirflowConfigurationOptions: params["AirflowConfigurationOptions"],
      AirflowVersion: params["AirflowVersion"],
      DagS3Path: params["DagS3Path"],
      EnvironmentClass: params["EnvironmentClass"],
      ExecutionRoleArn: params["ExecutionRoleArn"],
      KmsKey: params["KmsKey"],
      LoggingConfiguration: fromLoggingConfigurationInput(params["LoggingConfiguration"]),
      MaxWorkers: params["MaxWorkers"],
      NetworkConfiguration: fromNetworkConfiguration(params["NetworkConfiguration"]),
      PluginsS3ObjectVersion: params["PluginsS3ObjectVersion"],
      PluginsS3Path: params["PluginsS3Path"],
      RequirementsS3ObjectVersion: params["RequirementsS3ObjectVersion"],
      RequirementsS3Path: params["RequirementsS3Path"],
      SourceBucketArn: params["SourceBucketArn"],
      Tags: params["Tags"],
      WebserverAccessMode: params["WebserverAccessMode"],
      WeeklyMaintenanceWindowStart: params["WeeklyMaintenanceWindowStart"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateEnvironment",
      method: "PUT",
      requestUri: cmnP.encodePath`/environments/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
      },
    }, await resp.json());
  }

  async createWebLoginToken(
    {abortSignal, ...params}: RequestConfig & s.CreateWebLoginTokenRequest,
  ): Promise<s.CreateWebLoginTokenResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "CreateWebLoginToken",
      requestUri: cmnP.encodePath`/webtoken/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `env.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "WebServerHostname": "s",
        "WebToken": "s",
      },
    }, await resp.json());
  }

  async deleteEnvironment(
    {abortSignal, ...params}: RequestConfig & s.DeleteEnvironmentInput,
  ): Promise<s.DeleteEnvironmentOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteEnvironment",
      method: "DELETE",
      requestUri: cmnP.encodePath`/environments/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async getEnvironment(
    {abortSignal, ...params}: RequestConfig & s.GetEnvironmentInput,
  ): Promise<s.GetEnvironmentOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetEnvironment",
      method: "GET",
      requestUri: cmnP.encodePath`/environments/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Environment": toEnvironment,
      },
    }, await resp.json());
  }

  async listEnvironments(
    {abortSignal, ...params}: RequestConfig & s.ListEnvironmentsInput = {},
  ): Promise<s.ListEnvironmentsOutput> {
    const query = new URLSearchParams;
    if (params["MaxResults"] != null) query.set("MaxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListEnvironments",
      method: "GET",
      requestUri: "/environments",
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {
        "Environments": ["s"],
      },
      optional: {
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceInput,
  ): Promise<s.ListTagsForResourceOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "ListTagsForResource",
      method: "GET",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async publishMetrics(
    {abortSignal, ...params}: RequestConfig & s.PublishMetricsInput,
  ): Promise<s.PublishMetricsOutput> {
    const body: jsonP.JSONObject = {
      MetricData: params["MetricData"]?.map(x => fromMetricDatum(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PublishMetrics",
      requestUri: cmnP.encodePath`/metrics/environments/${params["EnvironmentName"]}`,
      responseCode: 200,
      hostPrefix: `ops.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceInput,
  ): Promise<s.TagResourceOutput> {
    const body: jsonP.JSONObject = {
      Tags: params["Tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceInput,
  ): Promise<s.UntagResourceOutput> {
    const query = new URLSearchParams;
    for (const item of params["tagKeys"]) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateEnvironment(
    {abortSignal, ...params}: RequestConfig & s.UpdateEnvironmentInput,
  ): Promise<s.UpdateEnvironmentOutput> {
    const body: jsonP.JSONObject = {
      AirflowConfigurationOptions: params["AirflowConfigurationOptions"],
      AirflowVersion: params["AirflowVersion"],
      DagS3Path: params["DagS3Path"],
      EnvironmentClass: params["EnvironmentClass"],
      ExecutionRoleArn: params["ExecutionRoleArn"],
      LoggingConfiguration: fromLoggingConfigurationInput(params["LoggingConfiguration"]),
      MaxWorkers: params["MaxWorkers"],
      NetworkConfiguration: fromUpdateNetworkConfigurationInput(params["NetworkConfiguration"]),
      PluginsS3ObjectVersion: params["PluginsS3ObjectVersion"],
      PluginsS3Path: params["PluginsS3Path"],
      RequirementsS3ObjectVersion: params["RequirementsS3ObjectVersion"],
      RequirementsS3Path: params["RequirementsS3Path"],
      SourceBucketArn: params["SourceBucketArn"],
      WebserverAccessMode: params["WebserverAccessMode"],
      WeeklyMaintenanceWindowStart: params["WeeklyMaintenanceWindowStart"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateEnvironment",
      method: "PATCH",
      requestUri: cmnP.encodePath`/environments/${params["Name"]}`,
      responseCode: 200,
      hostPrefix: `api.`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
      },
    }, await resp.json());
  }

}

function fromLoggingConfigurationInput(input?: s.LoggingConfigurationInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    DagProcessingLogs: fromModuleLoggingConfigurationInput(input["DagProcessingLogs"]),
    SchedulerLogs: fromModuleLoggingConfigurationInput(input["SchedulerLogs"]),
    TaskLogs: fromModuleLoggingConfigurationInput(input["TaskLogs"]),
    WebserverLogs: fromModuleLoggingConfigurationInput(input["WebserverLogs"]),
    WorkerLogs: fromModuleLoggingConfigurationInput(input["WorkerLogs"]),
  }
}

function fromModuleLoggingConfigurationInput(input?: s.ModuleLoggingConfigurationInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Enabled: input["Enabled"],
    LogLevel: input["LogLevel"],
  }
}

function fromNetworkConfiguration(input?: s.NetworkConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    SecurityGroupIds: input["SecurityGroupIds"],
    SubnetIds: input["SubnetIds"],
  }
}
function toNetworkConfiguration(root: jsonP.JSONValue): s.NetworkConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "SecurityGroupIds": ["s"],
      "SubnetIds": ["s"],
    },
  }, root);
}

function fromMetricDatum(input?: s.MetricDatum | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Dimensions: input["Dimensions"]?.map(x => fromDimension(x)),
    MetricName: input["MetricName"],
    StatisticValues: fromStatisticSet(input["StatisticValues"]),
    Timestamp: jsonP.serializeDate_unixTimestamp(input["Timestamp"]),
    Unit: input["Unit"],
    Value: input["Value"],
  }
}

function fromDimension(input?: s.Dimension | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

function fromStatisticSet(input?: s.StatisticSet | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Maximum: input["Maximum"],
    Minimum: input["Minimum"],
    SampleCount: input["SampleCount"],
    Sum: input["Sum"],
  }
}

function fromUpdateNetworkConfigurationInput(input?: s.UpdateNetworkConfigurationInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    SecurityGroupIds: input["SecurityGroupIds"],
  }
}

function toEnvironment(root: jsonP.JSONValue): s.Environment {
  return jsonP.readObj({
    required: {},
    optional: {
      "AirflowConfigurationOptions": x => jsonP.readMap(String, String, x),
      "AirflowVersion": "s",
      "Arn": "s",
      "CreatedAt": "d",
      "DagS3Path": "s",
      "EnvironmentClass": "s",
      "ExecutionRoleArn": "s",
      "KmsKey": "s",
      "LastUpdate": toLastUpdate,
      "LoggingConfiguration": toLoggingConfiguration,
      "MaxWorkers": "n",
      "Name": "s",
      "NetworkConfiguration": toNetworkConfiguration,
      "PluginsS3ObjectVersion": "s",
      "PluginsS3Path": "s",
      "RequirementsS3ObjectVersion": "s",
      "RequirementsS3Path": "s",
      "ServiceRoleArn": "s",
      "SourceBucketArn": "s",
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.EnvironmentStatus>(x),
      "Tags": x => jsonP.readMap(String, String, x),
      "WebserverAccessMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.WebserverAccessMode>(x),
      "WebserverUrl": "s",
      "WeeklyMaintenanceWindowStart": "s",
    },
  }, root);
}

function toLastUpdate(root: jsonP.JSONValue): s.LastUpdate {
  return jsonP.readObj({
    required: {},
    optional: {
      "CreatedAt": "d",
      "Error": toUpdateError,
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.UpdateStatus>(x),
    },
  }, root);
}

function toUpdateError(root: jsonP.JSONValue): s.UpdateError {
  return jsonP.readObj({
    required: {},
    optional: {
      "ErrorCode": "s",
      "ErrorMessage": "s",
    },
  }, root);
}

function toLoggingConfiguration(root: jsonP.JSONValue): s.LoggingConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "DagProcessingLogs": toModuleLoggingConfiguration,
      "SchedulerLogs": toModuleLoggingConfiguration,
      "TaskLogs": toModuleLoggingConfiguration,
      "WebserverLogs": toModuleLoggingConfiguration,
      "WorkerLogs": toModuleLoggingConfiguration,
    },
  }, root);
}

function toModuleLoggingConfiguration(root: jsonP.JSONValue): s.ModuleLoggingConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "CloudWatchLogGroupArn": "s",
      "Enabled": "b",
      "LogLevel": (x: jsonP.JSONValue) => cmnP.readEnum<s.LoggingLevel>(x),
    },
  }, root);
}
