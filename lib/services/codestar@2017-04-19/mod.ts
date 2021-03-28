// Autogenerated API client for: AWS CodeStar

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class CodeStar {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(CodeStar.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
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
    {abortSignal, ...params}: RequestConfig & s.AssociateTeamMemberRequest,
  ): Promise<s.AssociateTeamMemberResult> {
    const body: jsonP.JSONObject = {
      projectId: params["projectId"],
      clientRequestToken: params["clientRequestToken"],
      userArn: params["userArn"],
      projectRole: params["projectRole"],
      remoteAccessAllowed: params["remoteAccessAllowed"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.CreateProjectRequest,
  ): Promise<s.CreateProjectResult> {
    const body: jsonP.JSONObject = {
      name: params["name"],
      id: params["id"],
      description: params["description"],
      clientRequestToken: params["clientRequestToken"],
      sourceCode: params["sourceCode"]?.map(x => fromCode(x)),
      toolchain: fromToolchain(params["toolchain"]),
      tags: params["tags"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.CreateUserProfileRequest,
  ): Promise<s.CreateUserProfileResult> {
    const body: jsonP.JSONObject = {
      userArn: params["userArn"],
      displayName: params["displayName"],
      emailAddress: params["emailAddress"],
      sshPublicKey: params["sshPublicKey"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.DeleteProjectRequest,
  ): Promise<s.DeleteProjectResult> {
    const body: jsonP.JSONObject = {
      id: params["id"],
      clientRequestToken: params["clientRequestToken"],
      deleteStack: params["deleteStack"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.DeleteUserProfileRequest,
  ): Promise<s.DeleteUserProfileResult> {
    const body: jsonP.JSONObject = {
      userArn: params["userArn"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.DescribeProjectRequest,
  ): Promise<s.DescribeProjectResult> {
    const body: jsonP.JSONObject = {
      id: params["id"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.DescribeUserProfileRequest,
  ): Promise<s.DescribeUserProfileResult> {
    const body: jsonP.JSONObject = {
      userArn: params["userArn"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.DisassociateTeamMemberRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      projectId: params["projectId"],
      userArn: params["userArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisassociateTeamMember",
    });
    await resp.text();
  }

  async listProjects(
    {abortSignal, ...params}: RequestConfig & s.ListProjectsRequest = {},
  ): Promise<s.ListProjectsResult> {
    const body: jsonP.JSONObject = {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.ListResourcesRequest,
  ): Promise<s.ListResourcesResult> {
    const body: jsonP.JSONObject = {
      projectId: params["projectId"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.ListTagsForProjectRequest,
  ): Promise<s.ListTagsForProjectResult> {
    const body: jsonP.JSONObject = {
      id: params["id"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.ListTeamMembersRequest,
  ): Promise<s.ListTeamMembersResult> {
    const body: jsonP.JSONObject = {
      projectId: params["projectId"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.ListUserProfilesRequest = {},
  ): Promise<s.ListUserProfilesResult> {
    const body: jsonP.JSONObject = {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.TagProjectRequest,
  ): Promise<s.TagProjectResult> {
    const body: jsonP.JSONObject = {
      id: params["id"],
      tags: params["tags"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.UntagProjectRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      id: params["id"],
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagProject",
    });
    await resp.text();
  }

  async updateProject(
    {abortSignal, ...params}: RequestConfig & s.UpdateProjectRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      id: params["id"],
      name: params["name"],
      description: params["description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateProject",
    });
    await resp.text();
  }

  async updateTeamMember(
    {abortSignal, ...params}: RequestConfig & s.UpdateTeamMemberRequest,
  ): Promise<s.UpdateTeamMemberResult> {
    const body: jsonP.JSONObject = {
      projectId: params["projectId"],
      userArn: params["userArn"],
      projectRole: params["projectRole"],
      remoteAccessAllowed: params["remoteAccessAllowed"],
    };
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
    {abortSignal, ...params}: RequestConfig & s.UpdateUserProfileRequest,
  ): Promise<s.UpdateUserProfileResult> {
    const body: jsonP.JSONObject = {
      userArn: params["userArn"],
      displayName: params["displayName"],
      emailAddress: params["emailAddress"],
      sshPublicKey: params["sshPublicKey"],
    };
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

function fromCode(input?: s.Code | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: fromCodeSource(input["source"]),
    destination: fromCodeDestination(input["destination"]),
  }
}

function fromCodeSource(input?: s.CodeSource | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    s3: fromS3Location(input["s3"]),
  }
}

function fromS3Location(input?: s.S3Location | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bucketName: input["bucketName"],
    bucketKey: input["bucketKey"],
  }
}

function fromCodeDestination(input?: s.CodeDestination | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    codeCommit: fromCodeCommitCodeDestination(input["codeCommit"]),
    gitHub: fromGitHubCodeDestination(input["gitHub"]),
  }
}

function fromCodeCommitCodeDestination(input?: s.CodeCommitCodeDestination | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
  }
}

function fromGitHubCodeDestination(input?: s.GitHubCodeDestination | null): jsonP.JSONValue {
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

function fromToolchain(input?: s.Toolchain | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: fromToolchainSource(input["source"]),
    roleArn: input["roleArn"],
    stackParameters: input["stackParameters"],
  }
}

function fromToolchainSource(input?: s.ToolchainSource | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    s3: fromS3Location(input["s3"]),
  }
}

function toProjectStatus(root: jsonP.JSONValue): s.ProjectStatus {
  return jsonP.readObj({
    required: {
      "state": "s",
    },
    optional: {
      "reason": "s",
    },
  }, root);
}

function toProjectSummary(root: jsonP.JSONValue): s.ProjectSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "projectId": "s",
      "projectArn": "s",
    },
  }, root);
}

function toResource(root: jsonP.JSONValue): s.Resource {
  return jsonP.readObj({
    required: {
      "id": "s",
    },
    optional: {},
  }, root);
}

function toTeamMember(root: jsonP.JSONValue): s.TeamMember {
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

function toUserProfileSummary(root: jsonP.JSONValue): s.UserProfileSummary {
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
