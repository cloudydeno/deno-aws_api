// Autogenerated API client for: AWS IoT Jobs Data Plane

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class IoTJobsDataPlane {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(IoTJobsDataPlane.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-09-29",
    "endpointPrefix": "data.jobs.iot",
    "protocol": "rest-json",
    "serviceFullName": "AWS IoT Jobs Data Plane",
    "serviceId": "IoT Jobs Data Plane",
    "signatureVersion": "v4",
    "signingName": "iot-jobs-data",
    "uid": "iot-jobs-data-2017-09-29"
  };

  async describeJobExecution(
    {abortSignal, ...params}: RequestConfig & DescribeJobExecutionRequest,
  ): Promise<DescribeJobExecutionResponse> {
    const query = new URLSearchParams;
    if (params["includeJobDocument"] != null) query.set("includeJobDocument", params["includeJobDocument"]?.toString() ?? "");
    if (params["executionNumber"] != null) query.set("executionNumber", params["executionNumber"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeJobExecution",
      method: "GET",
      requestUri: cmnP.encodePath`/things/${params["thingName"]}/jobs/${params["jobId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "execution": toJobExecution,
        },
      }, await resp.json()),
  };
  }

  async getPendingJobExecutions(
    {abortSignal, ...params}: RequestConfig & GetPendingJobExecutionsRequest,
  ): Promise<GetPendingJobExecutionsResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetPendingJobExecutions",
      method: "GET",
      requestUri: cmnP.encodePath`/things/${params["thingName"]}/jobs`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "inProgressJobs": [toJobExecutionSummary],
          "queuedJobs": [toJobExecutionSummary],
        },
      }, await resp.json()),
  };
  }

  async startNextPendingJobExecution(
    {abortSignal, ...params}: RequestConfig & StartNextPendingJobExecutionRequest,
  ): Promise<StartNextPendingJobExecutionResponse> {
    const body: jsonP.JSONObject = params ? {
      statusDetails: params["statusDetails"],
      stepTimeoutInMinutes: params["stepTimeoutInMinutes"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartNextPendingJobExecution",
      method: "PUT",
      requestUri: cmnP.encodePath`/things/${params["thingName"]}/jobs/$next`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "execution": toJobExecution,
        },
      }, await resp.json()),
  };
  }

  async updateJobExecution(
    {abortSignal, ...params}: RequestConfig & UpdateJobExecutionRequest,
  ): Promise<UpdateJobExecutionResponse> {
    const body: jsonP.JSONObject = params ? {
      status: params["status"],
      statusDetails: params["statusDetails"],
      stepTimeoutInMinutes: params["stepTimeoutInMinutes"],
      expectedVersion: params["expectedVersion"],
      includeJobExecutionState: params["includeJobExecutionState"],
      includeJobDocument: params["includeJobDocument"],
      executionNumber: params["executionNumber"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateJobExecution",
      requestUri: cmnP.encodePath`/things/${params["thingName"]}/jobs/${params["jobId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "executionState": toJobExecutionState,
          "jobDocument": "s",
        },
      }, await resp.json()),
  };
  }

}

// refs: 1 - tags: named, input
export interface DescribeJobExecutionRequest {
  jobId: string;
  thingName: string;
  includeJobDocument?: boolean | null;
  executionNumber?: number | null;
}

// refs: 1 - tags: named, input
export interface GetPendingJobExecutionsRequest {
  thingName: string;
}

// refs: 1 - tags: named, input
export interface StartNextPendingJobExecutionRequest {
  thingName: string;
  statusDetails?: { [key: string]: string | null | undefined } | null;
  stepTimeoutInMinutes?: number | null;
}

// refs: 1 - tags: named, input
export interface UpdateJobExecutionRequest {
  jobId: string;
  thingName: string;
  status: JobExecutionStatus;
  statusDetails?: { [key: string]: string | null | undefined } | null;
  stepTimeoutInMinutes?: number | null;
  expectedVersion?: number | null;
  includeJobExecutionState?: boolean | null;
  includeJobDocument?: boolean | null;
  executionNumber?: number | null;
}

// refs: 1 - tags: named, output
export interface DescribeJobExecutionResponse {
  execution?: JobExecution | null;
}

// refs: 1 - tags: named, output
export interface GetPendingJobExecutionsResponse {
  inProgressJobs?: JobExecutionSummary[] | null;
  queuedJobs?: JobExecutionSummary[] | null;
}

// refs: 1 - tags: named, output
export interface StartNextPendingJobExecutionResponse {
  execution?: JobExecution | null;
}

// refs: 1 - tags: named, output
export interface UpdateJobExecutionResponse {
  executionState?: JobExecutionState | null;
  jobDocument?: string | null;
}

// refs: 4 - tags: input, named, enum, output
export type JobExecutionStatus =
| "QUEUED"
| "IN_PROGRESS"
| "SUCCEEDED"
| "FAILED"
| "TIMED_OUT"
| "REJECTED"
| "REMOVED"
| "CANCELED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface JobExecution {
  jobId?: string | null;
  thingName?: string | null;
  status?: JobExecutionStatus | null;
  statusDetails?: { [key: string]: string | null | undefined } | null;
  queuedAt?: number | null;
  startedAt?: number | null;
  lastUpdatedAt?: number | null;
  approximateSecondsBeforeTimedOut?: number | null;
  versionNumber?: number | null;
  executionNumber?: number | null;
  jobDocument?: string | null;
}
function toJobExecution(root: jsonP.JSONValue): JobExecution {
  return jsonP.readObj({
    required: {},
    optional: {
      "jobId": "s",
      "thingName": "s",
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<JobExecutionStatus>(x),
      "statusDetails": x => jsonP.readMap(String, String, x),
      "queuedAt": "n",
      "startedAt": "n",
      "lastUpdatedAt": "n",
      "approximateSecondsBeforeTimedOut": "n",
      "versionNumber": "n",
      "executionNumber": "n",
      "jobDocument": "s",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface JobExecutionSummary {
  jobId?: string | null;
  queuedAt?: number | null;
  startedAt?: number | null;
  lastUpdatedAt?: number | null;
  versionNumber?: number | null;
  executionNumber?: number | null;
}
function toJobExecutionSummary(root: jsonP.JSONValue): JobExecutionSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "jobId": "s",
      "queuedAt": "n",
      "startedAt": "n",
      "lastUpdatedAt": "n",
      "versionNumber": "n",
      "executionNumber": "n",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface JobExecutionState {
  status?: JobExecutionStatus | null;
  statusDetails?: { [key: string]: string | null | undefined } | null;
  versionNumber?: number | null;
}
function toJobExecutionState(root: jsonP.JSONValue): JobExecutionState {
  return jsonP.readObj({
    required: {},
    optional: {
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<JobExecutionStatus>(x),
      "statusDetails": x => jsonP.readMap(String, String, x),
      "versionNumber": "n",
    },
  }, root);
}
