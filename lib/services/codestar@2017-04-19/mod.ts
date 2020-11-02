// Autogenerated API client for: AWS CodeStar

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class CodeStar {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(CodeStar.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-04-19",
    "endpointPrefix": "codestar",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "CodeStar",
    "serviceFullName": "AWS CodeStar",
    "serviceId": "CodeStar",
    "signatureVersion": "v4",
    "targetPrefix": "CodeStar_20170419",
    "uid": "codestar-2017-04-19"
  };

  async associateTeamMember(
    {abortSignal, ...params}: RequestConfig & AssociateTeamMemberRequest,
  ): Promise<AssociateTeamMemberResult> {
    const body: jsonP.JSONObject = params ? {
      projectId: params["projectId"],
      clientRequestToken: params["clientRequestToken"],
      userArn: params["userArn"],
      projectRole: params["projectRole"],
      remoteAccessAllowed: params["remoteAccessAllowed"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateTeamMember",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "clientRequestToken": "s",
      },
    }, await resp.json());
  }

  async createProject(
    {abortSignal, ...params}: RequestConfig & CreateProjectRequest,
  ): Promise<CreateProjectResult> {
    const body: jsonP.JSONObject = params ? {
      name: params["name"],
      id: params["id"],
      description: params["description"],
      clientRequestToken: params["clientRequestToken"],
      sourceCode: params["sourceCode"]?.map(x => fromCode(x)),
      toolchain: fromToolchain(params["toolchain"]),
      tags: params["tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateProject",
    });
    return jsonP.readObj({
      required: {
        "id": "s",
        "arn": "s",
      },
      optional: {
        "clientRequestToken": "s",
        "projectTemplateId": "s",
      },
    }, await resp.json());
  }

  async createUserProfile(
    {abortSignal, ...params}: RequestConfig & CreateUserProfileRequest,
  ): Promise<CreateUserProfileResult> {
    const body: jsonP.JSONObject = params ? {
      userArn: params["userArn"],
      displayName: params["displayName"],
      emailAddress: params["emailAddress"],
      sshPublicKey: params["sshPublicKey"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateUserProfile",
    });
    return jsonP.readObj({
      required: {
        "userArn": "s",
      },
      optional: {
        "displayName": "s",
        "emailAddress": "s",
        "sshPublicKey": "s",
        "createdTimestamp": "d",
        "lastModifiedTimestamp": "d",
      },
    }, await resp.json());
  }

  async deleteProject(
    {abortSignal, ...params}: RequestConfig & DeleteProjectRequest,
  ): Promise<DeleteProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
      clientRequestToken: params["clientRequestToken"],
      deleteStack: params["deleteStack"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "stackId": "s",
        "projectArn": "s",
      },
    }, await resp.json());
  }

  async deleteUserProfile(
    {abortSignal, ...params}: RequestConfig & DeleteUserProfileRequest,
  ): Promise<DeleteUserProfileResult> {
    const body: jsonP.JSONObject = params ? {
      userArn: params["userArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteUserProfile",
    });
    return jsonP.readObj({
      required: {
        "userArn": "s",
      },
      optional: {},
    }, await resp.json());
  }

  async describeProject(
    {abortSignal, ...params}: RequestConfig & DescribeProjectRequest,
  ): Promise<DescribeProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "name": "s",
        "id": "s",
        "arn": "s",
        "description": "s",
        "clientRequestToken": "s",
        "createdTimeStamp": "d",
        "stackId": "s",
        "projectTemplateId": "s",
        "status": toProjectStatus,
      },
    }, await resp.json());
  }

  async describeUserProfile(
    {abortSignal, ...params}: RequestConfig & DescribeUserProfileRequest,
  ): Promise<DescribeUserProfileResult> {
    const body: jsonP.JSONObject = params ? {
      userArn: params["userArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeUserProfile",
    });
    return jsonP.readObj({
      required: {
        "userArn": "s",
        "createdTimestamp": "d",
        "lastModifiedTimestamp": "d",
      },
      optional: {
        "displayName": "s",
        "emailAddress": "s",
        "sshPublicKey": "s",
      },
    }, await resp.json());
  }

  async disassociateTeamMember(
    {abortSignal, ...params}: RequestConfig & DisassociateTeamMemberRequest,
  ): Promise<DisassociateTeamMemberResult> {
    const body: jsonP.JSONObject = params ? {
      projectId: params["projectId"],
      userArn: params["userArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisassociateTeamMember",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async listProjects(
    {abortSignal, ...params}: RequestConfig & ListProjectsRequest = {},
  ): Promise<ListProjectsResult> {
    const body: jsonP.JSONObject = params ? {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListProjects",
    });
    return jsonP.readObj({
      required: {
        "projects": [toProjectSummary],
      },
      optional: {
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listResources(
    {abortSignal, ...params}: RequestConfig & ListResourcesRequest,
  ): Promise<ListResourcesResult> {
    const body: jsonP.JSONObject = params ? {
      projectId: params["projectId"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListResources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "resources": [toResource],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForProject(
    {abortSignal, ...params}: RequestConfig & ListTagsForProjectRequest,
  ): Promise<ListTagsForProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": x => jsonP.readMap(String, String, x),
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listTeamMembers(
    {abortSignal, ...params}: RequestConfig & ListTeamMembersRequest,
  ): Promise<ListTeamMembersResult> {
    const body: jsonP.JSONObject = params ? {
      projectId: params["projectId"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTeamMembers",
    });
    return jsonP.readObj({
      required: {
        "teamMembers": [toTeamMember],
      },
      optional: {
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listUserProfiles(
    {abortSignal, ...params}: RequestConfig & ListUserProfilesRequest = {},
  ): Promise<ListUserProfilesResult> {
    const body: jsonP.JSONObject = params ? {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListUserProfiles",
    });
    return jsonP.readObj({
      required: {
        "userProfiles": [toUserProfileSummary],
      },
      optional: {
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async tagProject(
    {abortSignal, ...params}: RequestConfig & TagProjectRequest,
  ): Promise<TagProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
      tags: params["tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async untagProject(
    {abortSignal, ...params}: RequestConfig & UntagProjectRequest,
  ): Promise<UntagProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
      tags: params["tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateProject(
    {abortSignal, ...params}: RequestConfig & UpdateProjectRequest,
  ): Promise<UpdateProjectResult> {
    const body: jsonP.JSONObject = params ? {
      id: params["id"],
      name: params["name"],
      description: params["description"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateProject",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateTeamMember(
    {abortSignal, ...params}: RequestConfig & UpdateTeamMemberRequest,
  ): Promise<UpdateTeamMemberResult> {
    const body: jsonP.JSONObject = params ? {
      projectId: params["projectId"],
      userArn: params["userArn"],
      projectRole: params["projectRole"],
      remoteAccessAllowed: params["remoteAccessAllowed"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateTeamMember",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "userArn": "s",
        "projectRole": "s",
        "remoteAccessAllowed": "b",
      },
    }, await resp.json());
  }

  async updateUserProfile(
    {abortSignal, ...params}: RequestConfig & UpdateUserProfileRequest,
  ): Promise<UpdateUserProfileResult> {
    const body: jsonP.JSONObject = params ? {
      userArn: params["userArn"],
      displayName: params["displayName"],
      emailAddress: params["emailAddress"],
      sshPublicKey: params["sshPublicKey"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateUserProfile",
    });
    return jsonP.readObj({
      required: {
        "userArn": "s",
      },
      optional: {
        "displayName": "s",
        "emailAddress": "s",
        "sshPublicKey": "s",
        "createdTimestamp": "d",
        "lastModifiedTimestamp": "d",
      },
    }, await resp.json());
  }

}

// refs: 1 - tags: named, input
export interface AssociateTeamMemberRequest {
  projectId: string;
  clientRequestToken?: string | null;
  userArn: string;
  projectRole: string;
  remoteAccessAllowed?: boolean | null;
}

// refs: 1 - tags: named, input
export interface CreateProjectRequest {
  name: string;
  id: string;
  description?: string | null;
  clientRequestToken?: string | null;
  sourceCode?: Code[] | null;
  toolchain?: Toolchain | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface CreateUserProfileRequest {
  userArn: string;
  displayName: string;
  emailAddress: string;
  sshPublicKey?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteProjectRequest {
  id: string;
  clientRequestToken?: string | null;
  deleteStack?: boolean | null;
}

// refs: 1 - tags: named, input
export interface DeleteUserProfileRequest {
  userArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeProjectRequest {
  id: string;
}

// refs: 1 - tags: named, input
export interface DescribeUserProfileRequest {
  userArn: string;
}

// refs: 1 - tags: named, input
export interface DisassociateTeamMemberRequest {
  projectId: string;
  userArn: string;
}

// refs: 1 - tags: named, input
export interface ListProjectsRequest {
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListResourcesRequest {
  projectId: string;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForProjectRequest {
  id: string;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTeamMembersRequest {
  projectId: string;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListUserProfilesRequest {
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface TagProjectRequest {
  id: string;
  tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagProjectRequest {
  id: string;
  tags: string[];
}

// refs: 1 - tags: named, input
export interface UpdateProjectRequest {
  id: string;
  name?: string | null;
  description?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateTeamMemberRequest {
  projectId: string;
  userArn: string;
  projectRole?: string | null;
  remoteAccessAllowed?: boolean | null;
}

// refs: 1 - tags: named, input
export interface UpdateUserProfileRequest {
  userArn: string;
  displayName?: string | null;
  emailAddress?: string | null;
  sshPublicKey?: string | null;
}

// refs: 1 - tags: named, output
export interface AssociateTeamMemberResult {
  clientRequestToken?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateProjectResult {
  id: string;
  arn: string;
  clientRequestToken?: string | null;
  projectTemplateId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateUserProfileResult {
  userArn: string;
  displayName?: string | null;
  emailAddress?: string | null;
  sshPublicKey?: string | null;
  createdTimestamp?: Date | number | null;
  lastModifiedTimestamp?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface DeleteProjectResult {
  stackId?: string | null;
  projectArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteUserProfileResult {
  userArn: string;
}

// refs: 1 - tags: named, output
export interface DescribeProjectResult {
  name?: string | null;
  id?: string | null;
  arn?: string | null;
  description?: string | null;
  clientRequestToken?: string | null;
  createdTimeStamp?: Date | number | null;
  stackId?: string | null;
  projectTemplateId?: string | null;
  status?: ProjectStatus | null;
}

// refs: 1 - tags: named, output
export interface DescribeUserProfileResult {
  userArn: string;
  displayName?: string | null;
  emailAddress?: string | null;
  sshPublicKey?: string | null;
  createdTimestamp: Date | number;
  lastModifiedTimestamp: Date | number;
}

// refs: 1 - tags: named, output
export interface DisassociateTeamMemberResult {
}

// refs: 1 - tags: named, output
export interface ListProjectsResult {
  projects: ProjectSummary[];
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListResourcesResult {
  resources?: Resource[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForProjectResult {
  tags?: { [key: string]: string | null | undefined } | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTeamMembersResult {
  teamMembers: TeamMember[];
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListUserProfilesResult {
  userProfiles: UserProfileSummary[];
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface TagProjectResult {
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UntagProjectResult {
}

// refs: 1 - tags: named, output
export interface UpdateProjectResult {
}

// refs: 1 - tags: named, output
export interface UpdateTeamMemberResult {
  userArn?: string | null;
  projectRole?: string | null;
  remoteAccessAllowed?: boolean | null;
}

// refs: 1 - tags: named, output
export interface UpdateUserProfileResult {
  userArn: string;
  displayName?: string | null;
  emailAddress?: string | null;
  sshPublicKey?: string | null;
  createdTimestamp?: Date | number | null;
  lastModifiedTimestamp?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface Code {
  source: CodeSource;
  destination: CodeDestination;
}
function fromCode(input?: Code | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: fromCodeSource(input["source"]),
    destination: fromCodeDestination(input["destination"]),
  }
}

// refs: 1 - tags: input, named, interface
export interface CodeSource {
  s3: S3Location;
}
function fromCodeSource(input?: CodeSource | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    s3: fromS3Location(input["s3"]),
  }
}

// refs: 2 - tags: input, named, interface
export interface S3Location {
  bucketName?: string | null;
  bucketKey?: string | null;
}
function fromS3Location(input?: S3Location | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bucketName: input["bucketName"],
    bucketKey: input["bucketKey"],
  }
}

// refs: 1 - tags: input, named, interface
export interface CodeDestination {
  codeCommit?: CodeCommitCodeDestination | null;
  gitHub?: GitHubCodeDestination | null;
}
function fromCodeDestination(input?: CodeDestination | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    codeCommit: fromCodeCommitCodeDestination(input["codeCommit"]),
    gitHub: fromGitHubCodeDestination(input["gitHub"]),
  }
}

// refs: 1 - tags: input, named, interface
export interface CodeCommitCodeDestination {
  name: string;
}
function fromCodeCommitCodeDestination(input?: CodeCommitCodeDestination | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
  }
}

// refs: 1 - tags: input, named, interface
export interface GitHubCodeDestination {
  name: string;
  description?: string | null;
  type: string;
  owner: string;
  privateRepository: boolean;
  issuesEnabled: boolean;
  token: string;
}
function fromGitHubCodeDestination(input?: GitHubCodeDestination | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    description: input["description"],
    type: input["type"],
    owner: input["owner"],
    privateRepository: input["privateRepository"],
    issuesEnabled: input["issuesEnabled"],
    token: input["token"],
  }
}

// refs: 1 - tags: input, named, interface
export interface Toolchain {
  source: ToolchainSource;
  roleArn?: string | null;
  stackParameters?: { [key: string]: string | null | undefined } | null;
}
function fromToolchain(input?: Toolchain | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: fromToolchainSource(input["source"]),
    roleArn: input["roleArn"],
    stackParameters: input["stackParameters"],
  }
}

// refs: 1 - tags: input, named, interface
export interface ToolchainSource {
  s3: S3Location;
}
function fromToolchainSource(input?: ToolchainSource | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    s3: fromS3Location(input["s3"]),
  }
}

// refs: 1 - tags: output, named, interface
export interface ProjectStatus {
  state: string;
  reason?: string | null;
}
function toProjectStatus(root: jsonP.JSONValue): ProjectStatus {
  return jsonP.readObj({
    required: {
      "state": "s",
    },
    optional: {
      "reason": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ProjectSummary {
  projectId?: string | null;
  projectArn?: string | null;
}
function toProjectSummary(root: jsonP.JSONValue): ProjectSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "projectId": "s",
      "projectArn": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface Resource {
  id: string;
}
function toResource(root: jsonP.JSONValue): Resource {
  return jsonP.readObj({
    required: {
      "id": "s",
    },
    optional: {},
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface TeamMember {
  userArn: string;
  projectRole: string;
  remoteAccessAllowed?: boolean | null;
}
function toTeamMember(root: jsonP.JSONValue): TeamMember {
  return jsonP.readObj({
    required: {
      "userArn": "s",
      "projectRole": "s",
    },
    optional: {
      "remoteAccessAllowed": "b",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface UserProfileSummary {
  userArn?: string | null;
  displayName?: string | null;
  emailAddress?: string | null;
  sshPublicKey?: string | null;
}
function toUserProfileSummary(root: jsonP.JSONValue): UserProfileSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "userArn": "s",
      "displayName": "s",
      "emailAddress": "s",
      "sshPublicKey": "s",
    },
  }, root);
}
