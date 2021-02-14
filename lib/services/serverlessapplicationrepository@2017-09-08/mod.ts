// Autogenerated API client for: AWSServerlessApplicationRepository

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class ServerlessApplicationRepository {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ServerlessApplicationRepository.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-09-08",
    "endpointPrefix": "serverlessrepo",
    "signingName": "serverlessrepo",
    "serviceFullName": "AWSServerlessApplicationRepository",
    "serviceId": "ServerlessApplicationRepository",
    "protocol": "rest-json",
    "jsonVersion": "1.1",
    "uid": "serverlessrepo-2017-09-08",
    "signatureVersion": "v4"
  };

  async createApplication(
    {abortSignal, ...params}: RequestConfig & s.CreateApplicationRequest,
  ): Promise<s.CreateApplicationResponse> {
    const body: jsonP.JSONObject = {
      author: params["Author"],
      description: params["Description"],
      homePageUrl: params["HomePageUrl"],
      labels: params["Labels"],
      licenseBody: params["LicenseBody"],
      licenseUrl: params["LicenseUrl"],
      name: params["Name"],
      readmeBody: params["ReadmeBody"],
      readmeUrl: params["ReadmeUrl"],
      semanticVersion: params["SemanticVersion"],
      sourceCodeArchiveUrl: params["SourceCodeArchiveUrl"],
      sourceCodeUrl: params["SourceCodeUrl"],
      spdxLicenseId: params["SpdxLicenseId"],
      templateBody: params["TemplateBody"],
      templateUrl: params["TemplateUrl"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateApplication",
      requestUri: "/applications",
      responseCode: 201,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "Author": "s",
        "CreationTime": "s",
        "Description": "s",
        "HomePageUrl": "s",
        "IsVerifiedAuthor": "b",
        "Labels": ["s"],
        "LicenseUrl": "s",
        "Name": "s",
        "ReadmeUrl": "s",
        "SpdxLicenseId": "s",
        "VerifiedAuthorUrl": "s",
        "Version": toVersion,
      },
    }, await resp.json());
  }

  async createApplicationVersion(
    {abortSignal, ...params}: RequestConfig & s.CreateApplicationVersionRequest,
  ): Promise<s.CreateApplicationVersionResponse> {
    const body: jsonP.JSONObject = {
      sourceCodeArchiveUrl: params["SourceCodeArchiveUrl"],
      sourceCodeUrl: params["SourceCodeUrl"],
      templateBody: params["TemplateBody"],
      templateUrl: params["TemplateUrl"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateApplicationVersion",
      method: "PUT",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/versions/${params["SemanticVersion"]}`,
      responseCode: 201,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "CreationTime": "s",
        "ParameterDefinitions": [toParameterDefinition],
        "RequiredCapabilities": [(x: jsonP.JSONValue) => cmnP.readEnum<s.Capability>(x)],
        "ResourcesSupported": "b",
        "SemanticVersion": "s",
        "SourceCodeArchiveUrl": "s",
        "SourceCodeUrl": "s",
        "TemplateUrl": "s",
      },
    }, await resp.json());
  }

  async createCloudFormationChangeSet(
    {abortSignal, ...params}: RequestConfig & s.CreateCloudFormationChangeSetRequest,
  ): Promise<s.CreateCloudFormationChangeSetResponse> {
    const body: jsonP.JSONObject = {
      capabilities: params["Capabilities"],
      changeSetName: params["ChangeSetName"],
      clientToken: params["ClientToken"],
      description: params["Description"],
      notificationArns: params["NotificationArns"],
      parameterOverrides: params["ParameterOverrides"]?.map(x => fromParameterValue(x)),
      resourceTypes: params["ResourceTypes"],
      rollbackConfiguration: fromRollbackConfiguration(params["RollbackConfiguration"]),
      semanticVersion: params["SemanticVersion"],
      stackName: params["StackName"],
      tags: params["Tags"]?.map(x => fromTag(x)),
      templateId: params["TemplateId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateCloudFormationChangeSet",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/changesets`,
      responseCode: 201,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "ChangeSetId": "s",
        "SemanticVersion": "s",
        "StackId": "s",
      },
    }, await resp.json());
  }

  async createCloudFormationTemplate(
    {abortSignal, ...params}: RequestConfig & s.CreateCloudFormationTemplateRequest,
  ): Promise<s.CreateCloudFormationTemplateResponse> {
    const body: jsonP.JSONObject = {
      semanticVersion: params["SemanticVersion"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateCloudFormationTemplate",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/templates`,
      responseCode: 201,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "CreationTime": "s",
        "ExpirationTime": "s",
        "SemanticVersion": "s",
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.Status>(x),
        "TemplateId": "s",
        "TemplateUrl": "s",
      },
    }, await resp.json());
  }

  async deleteApplication(
    {abortSignal, ...params}: RequestConfig & s.DeleteApplicationRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteApplication",
      method: "DELETE",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}`,
      responseCode: 204,
    });
  }

  async getApplication(
    {abortSignal, ...params}: RequestConfig & s.GetApplicationRequest,
  ): Promise<s.GetApplicationResponse> {
    const query = new URLSearchParams;
    if (params["SemanticVersion"] != null) query.set("semanticVersion", params["SemanticVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetApplication",
      method: "GET",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "Author": "s",
        "CreationTime": "s",
        "Description": "s",
        "HomePageUrl": "s",
        "IsVerifiedAuthor": "b",
        "Labels": ["s"],
        "LicenseUrl": "s",
        "Name": "s",
        "ReadmeUrl": "s",
        "SpdxLicenseId": "s",
        "VerifiedAuthorUrl": "s",
        "Version": toVersion,
      },
    }, await resp.json());
  }

  async getApplicationPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetApplicationPolicyRequest,
  ): Promise<s.GetApplicationPolicyResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetApplicationPolicy",
      method: "GET",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Statements": [toApplicationPolicyStatement],
      },
    }, await resp.json());
  }

  async getCloudFormationTemplate(
    {abortSignal, ...params}: RequestConfig & s.GetCloudFormationTemplateRequest,
  ): Promise<s.GetCloudFormationTemplateResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetCloudFormationTemplate",
      method: "GET",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/templates/${params["TemplateId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "CreationTime": "s",
        "ExpirationTime": "s",
        "SemanticVersion": "s",
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.Status>(x),
        "TemplateId": "s",
        "TemplateUrl": "s",
      },
    }, await resp.json());
  }

  async listApplicationDependencies(
    {abortSignal, ...params}: RequestConfig & s.ListApplicationDependenciesRequest,
  ): Promise<s.ListApplicationDependenciesResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("maxItems", params["MaxItems"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["SemanticVersion"] != null) query.set("semanticVersion", params["SemanticVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListApplicationDependencies",
      method: "GET",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/dependencies`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Dependencies": [toApplicationDependencySummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listApplicationVersions(
    {abortSignal, ...params}: RequestConfig & s.ListApplicationVersionsRequest,
  ): Promise<s.ListApplicationVersionsResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("maxItems", params["MaxItems"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListApplicationVersions",
      method: "GET",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/versions`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "Versions": [toVersionSummary],
      },
    }, await resp.json());
  }

  async listApplications(
    {abortSignal, ...params}: RequestConfig & s.ListApplicationsRequest = {},
  ): Promise<s.ListApplicationsResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("maxItems", params["MaxItems"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListApplications",
      method: "GET",
      requestUri: "/applications",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Applications": [toApplicationSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async putApplicationPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutApplicationPolicyRequest,
  ): Promise<s.PutApplicationPolicyResponse> {
    const body: jsonP.JSONObject = {
      statements: params["Statements"]?.map(x => fromApplicationPolicyStatement(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutApplicationPolicy",
      method: "PUT",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Statements": [toApplicationPolicyStatement],
      },
    }, await resp.json());
  }

  async unshareApplication(
    {abortSignal, ...params}: RequestConfig & s.UnshareApplicationRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      organizationId: params["OrganizationId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UnshareApplication",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}/unshare`,
      responseCode: 204,
    });
  }

  async updateApplication(
    {abortSignal, ...params}: RequestConfig & s.UpdateApplicationRequest,
  ): Promise<s.UpdateApplicationResponse> {
    const body: jsonP.JSONObject = {
      author: params["Author"],
      description: params["Description"],
      homePageUrl: params["HomePageUrl"],
      labels: params["Labels"],
      readmeBody: params["ReadmeBody"],
      readmeUrl: params["ReadmeUrl"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateApplication",
      method: "PATCH",
      requestUri: cmnP.encodePath`/applications/${params["ApplicationId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ApplicationId": "s",
        "Author": "s",
        "CreationTime": "s",
        "Description": "s",
        "HomePageUrl": "s",
        "IsVerifiedAuthor": "b",
        "Labels": ["s"],
        "LicenseUrl": "s",
        "Name": "s",
        "ReadmeUrl": "s",
        "SpdxLicenseId": "s",
        "VerifiedAuthorUrl": "s",
        "Version": toVersion,
      },
    }, await resp.json());
  }

}

function fromParameterValue(input?: s.ParameterValue | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["Name"],
    value: input["Value"],
  }
}

function fromRollbackConfiguration(input?: s.RollbackConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    monitoringTimeInMinutes: input["MonitoringTimeInMinutes"],
    rollbackTriggers: input["RollbackTriggers"]?.map(x => fromRollbackTrigger(x)),
  }
}

function fromRollbackTrigger(input?: s.RollbackTrigger | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    arn: input["Arn"],
    type: input["Type"],
  }
}

function fromTag(input?: s.Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    key: input["Key"],
    value: input["Value"],
  }
}

function fromApplicationPolicyStatement(input?: s.ApplicationPolicyStatement | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    actions: input["Actions"],
    principalOrgIDs: input["PrincipalOrgIDs"],
    principals: input["Principals"],
    statementId: input["StatementId"],
  }
}
function toApplicationPolicyStatement(root: jsonP.JSONValue): s.ApplicationPolicyStatement {
  return jsonP.readObj({
    required: {
      "Actions": ["s"],
      "Principals": ["s"],
    },
    optional: {
      "PrincipalOrgIDs": ["s"],
      "StatementId": "s",
    },
  }, root);
}

function toVersion(root: jsonP.JSONValue): s.Version {
  return jsonP.readObj({
    required: {
      "ApplicationId": "s",
      "CreationTime": "s",
      "ParameterDefinitions": [toParameterDefinition],
      "RequiredCapabilities": [(x: jsonP.JSONValue) => cmnP.readEnum<s.Capability>(x)],
      "ResourcesSupported": "b",
      "SemanticVersion": "s",
      "TemplateUrl": "s",
    },
    optional: {
      "SourceCodeArchiveUrl": "s",
      "SourceCodeUrl": "s",
    },
  }, root);
}

function toParameterDefinition(root: jsonP.JSONValue): s.ParameterDefinition {
  return jsonP.readObj({
    required: {
      "Name": "s",
      "ReferencedByResources": ["s"],
    },
    optional: {
      "AllowedPattern": "s",
      "AllowedValues": ["s"],
      "ConstraintDescription": "s",
      "DefaultValue": "s",
      "Description": "s",
      "MaxLength": "n",
      "MaxValue": "n",
      "MinLength": "n",
      "MinValue": "n",
      "NoEcho": "b",
      "Type": "s",
    },
  }, root);
}

function toApplicationDependencySummary(root: jsonP.JSONValue): s.ApplicationDependencySummary {
  return jsonP.readObj({
    required: {
      "ApplicationId": "s",
      "SemanticVersion": "s",
    },
    optional: {},
  }, root);
}

function toVersionSummary(root: jsonP.JSONValue): s.VersionSummary {
  return jsonP.readObj({
    required: {
      "ApplicationId": "s",
      "CreationTime": "s",
      "SemanticVersion": "s",
    },
    optional: {
      "SourceCodeUrl": "s",
    },
  }, root);
}

function toApplicationSummary(root: jsonP.JSONValue): s.ApplicationSummary {
  return jsonP.readObj({
    required: {
      "ApplicationId": "s",
      "Author": "s",
      "Description": "s",
      "Name": "s",
    },
    optional: {
      "CreationTime": "s",
      "HomePageUrl": "s",
      "Labels": ["s"],
      "SpdxLicenseId": "s",
    },
  }, root);
}
