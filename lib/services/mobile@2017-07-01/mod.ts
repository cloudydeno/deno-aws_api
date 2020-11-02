// Autogenerated API client for: AWS Mobile

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class Mobile {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Mobile.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-07-01",
    "endpointPrefix": "mobile",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "AWS Mobile",
    "serviceId": "Mobile",
    "signatureVersion": "v4",
    "signingName": "AWSMobileHubService",
    "uid": "mobile-2017-07-01"
  };

  async createProject(
    {abortSignal, ...params}: RequestConfig & CreateProjectRequest = {},
  ): Promise<CreateProjectResult> {
    const query = new URLSearchParams;
    if (params["name"] != null) query.set("name", params["name"]?.toString() ?? "");
    if (params["region"] != null) query.set("region", params["region"]?.toString() ?? "");
    if (params["snapshotId"] != null) query.set("snapshotId", params["snapshotId"]?.toString() ?? "");
    const body = typeof params["contents"] === 'string' ? new TextEncoder().encode(params["contents"]) : params["contents"];
    const resp = await this.#client.performRequest({
      abortSignal, query, body,
      action: "CreateProject",
      requestUri: "/projects",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "details": toProjectDetails,
        },
      }, await resp.json()),
  };
  }

  async deleteProject(
    {abortSignal, ...params}: RequestConfig & DeleteProjectRequest,
  ): Promise<DeleteProjectResult> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteProject",
      method: "DELETE",
      requestUri: cmnP.encodePath`/projects/${params["projectId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "deletedResources": [toResource],
          "orphanedResources": [toResource],
        },
      }, await resp.json()),
  };
  }

  async describeBundle(
    {abortSignal, ...params}: RequestConfig & DescribeBundleRequest,
  ): Promise<DescribeBundleResult> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeBundle",
      method: "GET",
      requestUri: cmnP.encodePath`/bundles/${params["bundleId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "details": toBundleDetails,
        },
      }, await resp.json()),
  };
  }

  async describeProject(
    {abortSignal, ...params}: RequestConfig & DescribeProjectRequest,
  ): Promise<DescribeProjectResult> {
    const query = new URLSearchParams;
    query.set("projectId", params["projectId"]?.toString() ?? "");
    if (params["syncFromResources"] != null) query.set("syncFromResources", params["syncFromResources"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeProject",
      method: "GET",
      requestUri: "/project",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "details": toProjectDetails,
        },
      }, await resp.json()),
  };
  }

  async exportBundle(
    {abortSignal, ...params}: RequestConfig & ExportBundleRequest,
  ): Promise<ExportBundleResult> {
    const query = new URLSearchParams;
    if (params["projectId"] != null) query.set("projectId", params["projectId"]?.toString() ?? "");
    if (params["platform"] != null) query.set("platform", params["platform"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ExportBundle",
      requestUri: cmnP.encodePath`/bundles/${params["bundleId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "downloadUrl": "s",
        },
      }, await resp.json()),
  };
  }

  async exportProject(
    {abortSignal, ...params}: RequestConfig & ExportProjectRequest,
  ): Promise<ExportProjectResult> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "ExportProject",
      requestUri: cmnP.encodePath`/exports/${params["projectId"]}`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "downloadUrl": "s",
          "shareUrl": "s",
          "snapshotId": "s",
        },
      }, await resp.json()),
  };
  }

  async listBundles(
    {abortSignal, ...params}: RequestConfig & ListBundlesRequest = {},
  ): Promise<ListBundlesResult> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListBundles",
      method: "GET",
      requestUri: "/bundles",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "bundleList": [toBundleDetails],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async listProjects(
    {abortSignal, ...params}: RequestConfig & ListProjectsRequest = {},
  ): Promise<ListProjectsResult> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListProjects",
      method: "GET",
      requestUri: "/projects",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "projects": [toProjectSummary],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async updateProject(
    {abortSignal, ...params}: RequestConfig & UpdateProjectRequest,
  ): Promise<UpdateProjectResult> {
    const query = new URLSearchParams;
    query.set("projectId", params["projectId"]?.toString() ?? "");
    const body = typeof params["contents"] === 'string' ? new TextEncoder().encode(params["contents"]) : params["contents"];
    const resp = await this.#client.performRequest({
      abortSignal, query, body,
      action: "UpdateProject",
      requestUri: "/update",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "details": toProjectDetails,
        },
      }, await resp.json()),
  };
  }

}

// refs: 1 - tags: named, input
export interface CreateProjectRequest {
  name?: string | null;
  region?: string | null;
  contents?: Uint8Array | string | null;
  snapshotId?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteProjectRequest {
  projectId: string;
}

// refs: 1 - tags: named, input
export interface DescribeBundleRequest {
  bundleId: string;
}

// refs: 1 - tags: named, input
export interface DescribeProjectRequest {
  projectId: string;
  syncFromResources?: boolean | null;
}

// refs: 1 - tags: named, input
export interface ExportBundleRequest {
  bundleId: string;
  projectId?: string | null;
  platform?: Platform | null;
}

// refs: 1 - tags: named, input
export interface ExportProjectRequest {
  projectId: string;
}

// refs: 1 - tags: named, input
export interface ListBundlesRequest {
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListProjectsRequest {
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateProjectRequest {
  contents?: Uint8Array | string | null;
  projectId: string;
}

// refs: 1 - tags: named, output
export interface CreateProjectResult {
  details?: ProjectDetails | null;
}

// refs: 1 - tags: named, output
export interface DeleteProjectResult {
  deletedResources?: Resource[] | null;
  orphanedResources?: Resource[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeBundleResult {
  details?: BundleDetails | null;
}

// refs: 1 - tags: named, output
export interface DescribeProjectResult {
  details?: ProjectDetails | null;
}

// refs: 1 - tags: named, output
export interface ExportBundleResult {
  downloadUrl?: string | null;
}

// refs: 1 - tags: named, output
export interface ExportProjectResult {
  downloadUrl?: string | null;
  shareUrl?: string | null;
  snapshotId?: string | null;
}

// refs: 1 - tags: named, output
export interface ListBundlesResult {
  bundleList?: BundleDetails[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListProjectsResult {
  projects?: ProjectSummary[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface UpdateProjectResult {
  details?: ProjectDetails | null;
}

// refs: 3 - tags: input, named, enum, output
export type Platform =
| "OSX"
| "WINDOWS"
| "LINUX"
| "OBJC"
| "SWIFT"
| "ANDROID"
| "JAVASCRIPT"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, interface
export interface ProjectDetails {
  name?: string | null;
  projectId?: string | null;
  region?: string | null;
  state?: ProjectState | null;
  createdDate?: Date | number | null;
  lastUpdatedDate?: Date | number | null;
  consoleUrl?: string | null;
  resources?: Resource[] | null;
}
function toProjectDetails(root: jsonP.JSONValue): ProjectDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "name": "s",
      "projectId": "s",
      "region": "s",
      "state": (x: jsonP.JSONValue) => cmnP.readEnum<ProjectState>(x),
      "createdDate": "d",
      "lastUpdatedDate": "d",
      "consoleUrl": "s",
      "resources": [toResource],
    },
  }, root);
}

// refs: 3 - tags: output, named, enum
export type ProjectState =
| "NORMAL"
| "SYNCING"
| "IMPORTING"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: output, named, interface
export interface Resource {
  type?: string | null;
  name?: string | null;
  arn?: string | null;
  feature?: string | null;
  attributes?: { [key: string]: string | null | undefined } | null;
}
function toResource(root: jsonP.JSONValue): Resource {
  return jsonP.readObj({
    required: {},
    optional: {
      "type": "s",
      "name": "s",
      "arn": "s",
      "feature": "s",
      "attributes": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface BundleDetails {
  bundleId?: string | null;
  title?: string | null;
  version?: string | null;
  description?: string | null;
  iconUrl?: string | null;
  availablePlatforms?: Platform[] | null;
}
function toBundleDetails(root: jsonP.JSONValue): BundleDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "bundleId": "s",
      "title": "s",
      "version": "s",
      "description": "s",
      "iconUrl": "s",
      "availablePlatforms": [(x: jsonP.JSONValue) => cmnP.readEnum<Platform>(x)],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ProjectSummary {
  name?: string | null;
  projectId?: string | null;
}
function toProjectSummary(root: jsonP.JSONValue): ProjectSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "name": "s",
      "projectId": "s",
    },
  }, root);
}
