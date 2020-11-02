// Autogenerated API client for: AWS Cloud9

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class Cloud9 {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Cloud9.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-09-23",
    "endpointPrefix": "cloud9",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "AWS Cloud9",
    "serviceId": "Cloud9",
    "signatureVersion": "v4",
    "targetPrefix": "AWSCloud9WorkspaceManagementService",
    "uid": "cloud9-2017-09-23"
  };

  async createEnvironmentEC2(
    {abortSignal, ...params}: RequestConfig & CreateEnvironmentEC2Request,
  ): Promise<CreateEnvironmentEC2Result> {
    const body: jsonP.JSONObject = params ? {
      name: params["name"],
      description: params["description"],
      clientRequestToken: params["clientRequestToken"],
      instanceType: params["instanceType"],
      subnetId: params["subnetId"],
      automaticStopTimeMinutes: params["automaticStopTimeMinutes"],
      ownerArn: params["ownerArn"],
      tags: params["tags"]?.map(x => fromTag(x)),
      connectionType: params["connectionType"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateEnvironmentEC2",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "environmentId": "s",
      },
    }, await resp.json());
  }

  async createEnvironmentMembership(
    {abortSignal, ...params}: RequestConfig & CreateEnvironmentMembershipRequest,
  ): Promise<CreateEnvironmentMembershipResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
      userArn: params["userArn"],
      permissions: params["permissions"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateEnvironmentMembership",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "membership": toEnvironmentMember,
      },
    }, await resp.json());
  }

  async deleteEnvironment(
    {abortSignal, ...params}: RequestConfig & DeleteEnvironmentRequest,
  ): Promise<DeleteEnvironmentResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteEnvironment",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async deleteEnvironmentMembership(
    {abortSignal, ...params}: RequestConfig & DeleteEnvironmentMembershipRequest,
  ): Promise<DeleteEnvironmentMembershipResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
      userArn: params["userArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteEnvironmentMembership",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async describeEnvironmentMemberships(
    {abortSignal, ...params}: RequestConfig & DescribeEnvironmentMembershipsRequest = {},
  ): Promise<DescribeEnvironmentMembershipsResult> {
    const body: jsonP.JSONObject = params ? {
      userArn: params["userArn"],
      environmentId: params["environmentId"],
      permissions: params["permissions"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeEnvironmentMemberships",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "memberships": [toEnvironmentMember],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async describeEnvironmentStatus(
    {abortSignal, ...params}: RequestConfig & DescribeEnvironmentStatusRequest,
  ): Promise<DescribeEnvironmentStatusResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeEnvironmentStatus",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "status": (x: jsonP.JSONValue) => cmnP.readEnum<EnvironmentStatus>(x),
        "message": "s",
      },
    }, await resp.json());
  }

  async describeEnvironments(
    {abortSignal, ...params}: RequestConfig & DescribeEnvironmentsRequest,
  ): Promise<DescribeEnvironmentsResult> {
    const body: jsonP.JSONObject = params ? {
      environmentIds: params["environmentIds"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeEnvironments",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "environments": [toEnvironment],
      },
    }, await resp.json());
  }

  async listEnvironments(
    {abortSignal, ...params}: RequestConfig & ListEnvironmentsRequest = {},
  ): Promise<ListEnvironmentsResult> {
    const body: jsonP.JSONObject = params ? {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListEnvironments",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "nextToken": "s",
        "environmentIds": ["s"],
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & ListTagsForResourceRequest,
  ): Promise<ListTagsForResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceARN: params["ResourceARN"],
    } : {};
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

  async tagResource(
    {abortSignal, ...params}: RequestConfig & TagResourceRequest,
  ): Promise<TagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceARN: params["ResourceARN"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & UntagResourceRequest,
  ): Promise<UntagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceARN: params["ResourceARN"],
      TagKeys: params["TagKeys"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateEnvironment(
    {abortSignal, ...params}: RequestConfig & UpdateEnvironmentRequest,
  ): Promise<UpdateEnvironmentResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
      name: params["name"],
      description: params["description"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateEnvironment",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateEnvironmentMembership(
    {abortSignal, ...params}: RequestConfig & UpdateEnvironmentMembershipRequest,
  ): Promise<UpdateEnvironmentMembershipResult> {
    const body: jsonP.JSONObject = params ? {
      environmentId: params["environmentId"],
      userArn: params["userArn"],
      permissions: params["permissions"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateEnvironmentMembership",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "membership": toEnvironmentMember,
      },
    }, await resp.json());
  }

}

// refs: 1 - tags: named, input
export interface CreateEnvironmentEC2Request {
  name: string;
  description?: string | null;
  clientRequestToken?: string | null;
  instanceType: string;
  subnetId?: string | null;
  automaticStopTimeMinutes?: number | null;
  ownerArn?: string | null;
  tags?: Tag[] | null;
  connectionType?: ConnectionType | null;
}

// refs: 1 - tags: named, input
export interface CreateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}

// refs: 1 - tags: named, input
export interface DeleteEnvironmentRequest {
  environmentId: string;
}

// refs: 1 - tags: named, input
export interface DeleteEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentMembershipsRequest {
  userArn?: string | null;
  environmentId?: string | null;
  permissions?: Permissions[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentStatusRequest {
  environmentId: string;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentsRequest {
  environmentIds: string[];
}

// refs: 1 - tags: named, input
export interface ListEnvironmentsRequest {
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateEnvironmentRequest {
  environmentId: string;
  name?: string | null;
  description?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}

// refs: 1 - tags: named, output
export interface CreateEnvironmentEC2Result {
  environmentId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateEnvironmentMembershipResult {
  membership?: EnvironmentMember | null;
}

// refs: 1 - tags: named, output
export interface DeleteEnvironmentResult {
}

// refs: 1 - tags: named, output
export interface DeleteEnvironmentMembershipResult {
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentMembershipsResult {
  memberships?: EnvironmentMember[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentStatusResult {
  status?: EnvironmentStatus | null;
  message?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentsResult {
  environments?: Environment[] | null;
}

// refs: 1 - tags: named, output
export interface ListEnvironmentsResult {
  nextToken?: string | null;
  environmentIds?: string[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UpdateEnvironmentResult {
}

// refs: 1 - tags: named, output
export interface UpdateEnvironmentMembershipResult {
  membership?: EnvironmentMember | null;
}

// refs: 3 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}
function fromTag(input?: Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): Tag {
  return jsonP.readObj({
    required: {
      "Key": "s",
      "Value": "s",
    },
    optional: {},
  }, root);
}

// refs: 2 - tags: input, named, enum, output
export type ConnectionType =
| "CONNECT_SSH"
| "CONNECT_SSM"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type MemberPermissions =
| "read-write"
| "read-only"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, enum, output
export type Permissions =
| "owner"
| "read-write"
| "read-only"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, interface
export interface EnvironmentMember {
  permissions?: Permissions | null;
  userId?: string | null;
  userArn?: string | null;
  environmentId?: string | null;
  lastAccess?: Date | number | null;
}
function toEnvironmentMember(root: jsonP.JSONValue): EnvironmentMember {
  return jsonP.readObj({
    required: {},
    optional: {
      "permissions": (x: jsonP.JSONValue) => cmnP.readEnum<Permissions>(x),
      "userId": "s",
      "userArn": "s",
      "environmentId": "s",
      "lastAccess": "d",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type EnvironmentStatus =
| "error"
| "creating"
| "connecting"
| "ready"
| "stopping"
| "stopped"
| "deleting"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Environment {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  type?: EnvironmentType | null;
  connectionType?: ConnectionType | null;
  arn?: string | null;
  ownerArn?: string | null;
  lifecycle?: EnvironmentLifecycle | null;
}
function toEnvironment(root: jsonP.JSONValue): Environment {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "name": "s",
      "description": "s",
      "type": (x: jsonP.JSONValue) => cmnP.readEnum<EnvironmentType>(x),
      "connectionType": (x: jsonP.JSONValue) => cmnP.readEnum<ConnectionType>(x),
      "arn": "s",
      "ownerArn": "s",
      "lifecycle": toEnvironmentLifecycle,
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type EnvironmentType =
| "ssh"
| "ec2"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface EnvironmentLifecycle {
  status?: EnvironmentLifecycleStatus | null;
  reason?: string | null;
  failureResource?: string | null;
}
function toEnvironmentLifecycle(root: jsonP.JSONValue): EnvironmentLifecycle {
  return jsonP.readObj({
    required: {},
    optional: {
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<EnvironmentLifecycleStatus>(x),
      "reason": "s",
      "failureResource": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type EnvironmentLifecycleStatus =
| "CREATING"
| "CREATED"
| "CREATE_FAILED"
| "DELETING"
| "DELETE_FAILED"
| cmnP.UnexpectedEnumValue;
