// Autogenerated API client for: Schemas

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as uuidv4 from "https://deno.land/std@0.71.0/uuid/v4.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class Schemas {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Schemas.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2019-12-02",
    "endpointPrefix": "schemas",
    "signingName": "schemas",
    "serviceFullName": "Schemas",
    "serviceId": "schemas",
    "protocol": "rest-json",
    "jsonVersion": "1.1",
    "uid": "schemas-2019-12-02",
    "signatureVersion": "v4"
  };

  async createDiscoverer(
    {abortSignal, ...params}: RequestConfig & CreateDiscovererRequest,
  ): Promise<CreateDiscovererResponse> {
    const body: jsonP.JSONObject = params ? {
      Description: params["Description"],
      SourceArn: params["SourceArn"],
      tags: params["Tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateDiscoverer",
      requestUri: "/v1/discoverers",
      responseCode: 201,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "DiscovererArn": "s",
          "DiscovererId": "s",
          "SourceArn": "s",
          "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async createRegistry(
    {abortSignal, ...params}: RequestConfig & CreateRegistryRequest,
  ): Promise<CreateRegistryResponse> {
    const body: jsonP.JSONObject = params ? {
      Description: params["Description"],
      tags: params["Tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateRegistry",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}`,
      responseCode: 201,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "RegistryArn": "s",
          "RegistryName": "s",
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async createSchema(
    {abortSignal, ...params}: RequestConfig & CreateSchemaRequest,
  ): Promise<CreateSchemaResponse> {
    const body: jsonP.JSONObject = params ? {
      Content: params["Content"],
      Description: params["Description"],
      tags: params["Tags"],
      Type: params["Type"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateSchema",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}`,
      responseCode: 201,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "LastModified": "d",
          "SchemaArn": "s",
          "SchemaName": "s",
          "SchemaVersion": "s",
          "Tags": x => jsonP.readMap(String, String, x),
          "Type": "s",
          "VersionCreatedDate": "d",
        },
      }, await resp.json()),
  };
  }

  async deleteDiscoverer(
    {abortSignal, ...params}: RequestConfig & DeleteDiscovererRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteDiscoverer",
      method: "DELETE",
      requestUri: cmnP.encodePath`/v1/discoverers/id/${params["DiscovererId"]}`,
      responseCode: 204,
    });
  }

  async deleteRegistry(
    {abortSignal, ...params}: RequestConfig & DeleteRegistryRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteRegistry",
      method: "DELETE",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}`,
      responseCode: 204,
    });
  }

  async deleteResourcePolicy(
    {abortSignal, ...params}: RequestConfig & DeleteResourcePolicyRequest = {},
  ): Promise<void> {
    const query = new URLSearchParams;
    if (params["RegistryName"] != null) query.set("registryName", params["RegistryName"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DeleteResourcePolicy",
      method: "DELETE",
      requestUri: "/v1/policy",
      responseCode: 204,
    });
  }

  async deleteSchema(
    {abortSignal, ...params}: RequestConfig & DeleteSchemaRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteSchema",
      method: "DELETE",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}`,
      responseCode: 204,
    });
  }

  async deleteSchemaVersion(
    {abortSignal, ...params}: RequestConfig & DeleteSchemaVersionRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteSchemaVersion",
      method: "DELETE",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/version/${params["SchemaVersion"]}`,
      responseCode: 204,
    });
  }

  async describeCodeBinding(
    {abortSignal, ...params}: RequestConfig & DescribeCodeBindingRequest,
  ): Promise<DescribeCodeBindingResponse> {
    const query = new URLSearchParams;
    if (params["SchemaVersion"] != null) query.set("schemaVersion", params["SchemaVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeCodeBinding",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/language/${params["Language"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "CreationDate": "d",
          "LastModified": "d",
          "SchemaVersion": "s",
          "Status": (x: jsonP.JSONValue) => cmnP.readEnum<CodeGenerationStatus>(x),
        },
      }, await resp.json()),
  };
  }

  async describeDiscoverer(
    {abortSignal, ...params}: RequestConfig & DescribeDiscovererRequest,
  ): Promise<DescribeDiscovererResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeDiscoverer",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/discoverers/id/${params["DiscovererId"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "DiscovererArn": "s",
          "DiscovererId": "s",
          "SourceArn": "s",
          "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async describeRegistry(
    {abortSignal, ...params}: RequestConfig & DescribeRegistryRequest,
  ): Promise<DescribeRegistryResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeRegistry",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "RegistryArn": "s",
          "RegistryName": "s",
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async describeSchema(
    {abortSignal, ...params}: RequestConfig & DescribeSchemaRequest,
  ): Promise<DescribeSchemaResponse> {
    const query = new URLSearchParams;
    if (params["SchemaVersion"] != null) query.set("schemaVersion", params["SchemaVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeSchema",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Content": "s",
          "Description": "s",
          "LastModified": "d",
          "SchemaArn": "s",
          "SchemaName": "s",
          "SchemaVersion": "s",
          "Tags": x => jsonP.readMap(String, String, x),
          "Type": "s",
          "VersionCreatedDate": "d",
        },
      }, await resp.json()),
  };
  }

  async exportSchema(
    {abortSignal, ...params}: RequestConfig & ExportSchemaRequest,
  ): Promise<ExportSchemaResponse> {
    const query = new URLSearchParams;
    if (params["SchemaVersion"] != null) query.set("schemaVersion", params["SchemaVersion"]?.toString() ?? "");
    query.set("type", params["Type"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ExportSchema",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/export`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Content": "s",
          "SchemaArn": "s",
          "SchemaName": "s",
          "SchemaVersion": "s",
          "Type": "s",
        },
      }, await resp.json()),
  };
  }

  async getCodeBindingSource(
    {abortSignal, ...params}: RequestConfig & GetCodeBindingSourceRequest,
  ): Promise<GetCodeBindingSourceResponse> {
    const query = new URLSearchParams;
    if (params["SchemaVersion"] != null) query.set("schemaVersion", params["SchemaVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetCodeBindingSource",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/language/${params["Language"]}/source`,
      responseCode: 200,
    });
  return {
    Body: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

  async getDiscoveredSchema(
    {abortSignal, ...params}: RequestConfig & GetDiscoveredSchemaRequest,
  ): Promise<GetDiscoveredSchemaResponse> {
    const body: jsonP.JSONObject = params ? {
      Events: params["Events"],
      Type: params["Type"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetDiscoveredSchema",
      requestUri: "/v1/discover",
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Content": "s",
        },
      }, await resp.json()),
  };
  }

  async getResourcePolicy(
    {abortSignal, ...params}: RequestConfig & GetResourcePolicyRequest = {},
  ): Promise<GetResourcePolicyResponse> {
    const query = new URLSearchParams;
    if (params["RegistryName"] != null) query.set("registryName", params["RegistryName"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetResourcePolicy",
      method: "GET",
      requestUri: "/v1/policy",
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Policy": jsonP.readJsonValue,
          "RevisionId": "s",
        },
      }, await resp.json()),
  };
  }

  async listDiscoverers(
    {abortSignal, ...params}: RequestConfig & ListDiscoverersRequest = {},
  ): Promise<ListDiscoverersResponse> {
    const query = new URLSearchParams;
    if (params["DiscovererIdPrefix"] != null) query.set("discovererIdPrefix", params["DiscovererIdPrefix"]?.toString() ?? "");
    if (params["Limit"] != null) query.set("limit", params["Limit"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["SourceArnPrefix"] != null) query.set("sourceArnPrefix", params["SourceArnPrefix"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListDiscoverers",
      method: "GET",
      requestUri: "/v1/discoverers",
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Discoverers": [toDiscovererSummary],
          "NextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async listRegistries(
    {abortSignal, ...params}: RequestConfig & ListRegistriesRequest = {},
  ): Promise<ListRegistriesResponse> {
    const query = new URLSearchParams;
    if (params["Limit"] != null) query.set("limit", params["Limit"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["RegistryNamePrefix"] != null) query.set("registryNamePrefix", params["RegistryNamePrefix"]?.toString() ?? "");
    if (params["Scope"] != null) query.set("scope", params["Scope"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListRegistries",
      method: "GET",
      requestUri: "/v1/registries",
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "NextToken": "s",
          "Registries": [toRegistrySummary],
        },
      }, await resp.json()),
  };
  }

  async listSchemaVersions(
    {abortSignal, ...params}: RequestConfig & ListSchemaVersionsRequest,
  ): Promise<ListSchemaVersionsResponse> {
    const query = new URLSearchParams;
    if (params["Limit"] != null) query.set("limit", params["Limit"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListSchemaVersions",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/versions`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "NextToken": "s",
          "SchemaVersions": [toSchemaVersionSummary],
        },
      }, await resp.json()),
  };
  }

  async listSchemas(
    {abortSignal, ...params}: RequestConfig & ListSchemasRequest,
  ): Promise<ListSchemasResponse> {
    const query = new URLSearchParams;
    if (params["Limit"] != null) query.set("limit", params["Limit"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["SchemaNamePrefix"] != null) query.set("schemaNamePrefix", params["SchemaNamePrefix"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListSchemas",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "NextToken": "s",
          "Schemas": [toSchemaSummary],
        },
      }, await resp.json()),
  };
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & ListTagsForResourceRequest,
  ): Promise<ListTagsForResourceResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "ListTagsForResource",
      method: "GET",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async putCodeBinding(
    {abortSignal, ...params}: RequestConfig & PutCodeBindingRequest,
  ): Promise<PutCodeBindingResponse> {
    const query = new URLSearchParams;
    if (params["SchemaVersion"] != null) query.set("schemaVersion", params["SchemaVersion"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "PutCodeBinding",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}/language/${params["Language"]}`,
      responseCode: 202,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "CreationDate": "d",
          "LastModified": "d",
          "SchemaVersion": "s",
          "Status": (x: jsonP.JSONValue) => cmnP.readEnum<CodeGenerationStatus>(x),
        },
      }, await resp.json()),
  };
  }

  async putResourcePolicy(
    {abortSignal, ...params}: RequestConfig & PutResourcePolicyRequest,
  ): Promise<PutResourcePolicyResponse> {
    const query = new URLSearchParams;
    if (params["RegistryName"] != null) query.set("registryName", params["RegistryName"]?.toString() ?? "");
    const body: jsonP.JSONObject = params ? {
      Policy: jsonP.serializeJsonValue(params["Policy"]),
      RevisionId: params["RevisionId"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, query, body,
      action: "PutResourcePolicy",
      method: "PUT",
      requestUri: "/v1/policy",
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Policy": jsonP.readJsonValue,
          "RevisionId": "s",
        },
      }, await resp.json()),
  };
  }

  async searchSchemas(
    {abortSignal, ...params}: RequestConfig & SearchSchemasRequest,
  ): Promise<SearchSchemasResponse> {
    const query = new URLSearchParams;
    query.set("keywords", params["Keywords"]?.toString() ?? "");
    if (params["Limit"] != null) query.set("limit", params["Limit"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "SearchSchemas",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/search`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "NextToken": "s",
          "Schemas": [toSearchSchemaSummary],
        },
      }, await resp.json()),
  };
  }

  async startDiscoverer(
    {abortSignal, ...params}: RequestConfig & StartDiscovererRequest,
  ): Promise<StartDiscovererResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "StartDiscoverer",
      requestUri: cmnP.encodePath`/v1/discoverers/id/${params["DiscovererId"]}/start`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "DiscovererId": "s",
          "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
        },
      }, await resp.json()),
  };
  }

  async stopDiscoverer(
    {abortSignal, ...params}: RequestConfig & StopDiscovererRequest,
  ): Promise<StopDiscovererResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "StopDiscoverer",
      requestUri: cmnP.encodePath`/v1/discoverers/id/${params["DiscovererId"]}/stop`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "DiscovererId": "s",
          "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
        },
      }, await resp.json()),
  };
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      tags: params["Tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 204,
    });
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & UntagResourceRequest,
  ): Promise<void> {
    const query = new URLSearchParams;
    for (const item of params["TagKeys"]) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
      responseCode: 204,
    });
  }

  async updateDiscoverer(
    {abortSignal, ...params}: RequestConfig & UpdateDiscovererRequest,
  ): Promise<UpdateDiscovererResponse> {
    const body: jsonP.JSONObject = params ? {
      Description: params["Description"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateDiscoverer",
      method: "PUT",
      requestUri: cmnP.encodePath`/v1/discoverers/id/${params["DiscovererId"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "DiscovererArn": "s",
          "DiscovererId": "s",
          "SourceArn": "s",
          "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async updateRegistry(
    {abortSignal, ...params}: RequestConfig & UpdateRegistryRequest,
  ): Promise<UpdateRegistryResponse> {
    const body: jsonP.JSONObject = params ? {
      Description: params["Description"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateRegistry",
      method: "PUT",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "RegistryArn": "s",
          "RegistryName": "s",
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async updateSchema(
    {abortSignal, ...params}: RequestConfig & UpdateSchemaRequest,
  ): Promise<UpdateSchemaResponse> {
    const body: jsonP.JSONObject = params ? {
      ClientTokenId: params["ClientTokenId"] ?? generateIdemptToken(),
      Content: params["Content"],
      Description: params["Description"],
      Type: params["Type"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateSchema",
      method: "PUT",
      requestUri: cmnP.encodePath`/v1/registries/name/${params["RegistryName"]}/schemas/name/${params["SchemaName"]}`,
      responseCode: 200,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Description": "s",
          "LastModified": "d",
          "SchemaArn": "s",
          "SchemaName": "s",
          "SchemaVersion": "s",
          "Tags": x => jsonP.readMap(String, String, x),
          "Type": "s",
          "VersionCreatedDate": "d",
        },
      }, await resp.json()),
  };
  }

  // Resource State Waiters

  /**
   * Wait until code binding is generated
   * Checks state up to 30 times, 2 seconds apart (about 1 minutes max wait time).
   */
  async waitForCodeBindingExists(
    params: RequestConfig & DescribeCodeBindingRequest,
  ): Promise<DescribeCodeBindingResponse> {
    const errMessage = 'ResourceNotReady: Resource is not in the state CodeBindingExists';
    for (let i = 0; i < 30; i++) {
      try {
        const resp = await this.describeCodeBinding(params);
        const field = resp?.Status;
        if (field === "CREATE_COMPLETE") return resp;
        if (field === "CREATE_IN_PROGRESS") continue;
        if (field === "CREATE_FAILED") throw new Error(errMessage);
      } catch (err) {
        if (["NotFoundException"].includes(err.code)) throw err;
        throw err;
      }
      await new Promise(r => setTimeout(r, 2000));
    }
    throw new Error(errMessage);
  }

}

// refs: 1 - tags: named, input
export interface CreateDiscovererRequest {
  Description?: string | null;
  SourceArn: string;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface CreateRegistryRequest {
  Description?: string | null;
  RegistryName: string;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface CreateSchemaRequest {
  Content: string;
  Description?: string | null;
  RegistryName: string;
  SchemaName: string;
  Tags?: { [key: string]: string | null | undefined } | null;
  Type: Type;
}

// refs: 1 - tags: named, input
export interface DeleteDiscovererRequest {
  DiscovererId: string;
}

// refs: 1 - tags: named, input
export interface DeleteRegistryRequest {
  RegistryName: string;
}

// refs: 1 - tags: named, input
export interface DeleteResourcePolicyRequest {
  RegistryName?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteSchemaRequest {
  RegistryName: string;
  SchemaName: string;
}

// refs: 1 - tags: named, input
export interface DeleteSchemaVersionRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion: string;
}

// refs: 1 - tags: named, input
export interface DescribeCodeBindingRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeDiscovererRequest {
  DiscovererId: string;
}

// refs: 1 - tags: named, input
export interface DescribeRegistryRequest {
  RegistryName: string;
}

// refs: 1 - tags: named, input
export interface DescribeSchemaRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface ExportSchemaRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string | null;
  Type: string;
}

// refs: 1 - tags: named, input
export interface GetCodeBindingSourceRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface GetDiscoveredSchemaRequest {
  Events: string[];
  Type: Type;
}

// refs: 1 - tags: named, input
export interface GetResourcePolicyRequest {
  RegistryName?: string | null;
}

// refs: 1 - tags: named, input
export interface ListDiscoverersRequest {
  DiscovererIdPrefix?: string | null;
  Limit?: number | null;
  NextToken?: string | null;
  SourceArnPrefix?: string | null;
}

// refs: 1 - tags: named, input
export interface ListRegistriesRequest {
  Limit?: number | null;
  NextToken?: string | null;
  RegistryNamePrefix?: string | null;
  Scope?: string | null;
}

// refs: 1 - tags: named, input
export interface ListSchemaVersionsRequest {
  Limit?: number | null;
  NextToken?: string | null;
  RegistryName: string;
  SchemaName: string;
}

// refs: 1 - tags: named, input
export interface ListSchemasRequest {
  Limit?: number | null;
  NextToken?: string | null;
  RegistryName: string;
  SchemaNamePrefix?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface PutCodeBindingRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface PutResourcePolicyRequest {
  Policy: jsonP.JSONValue;
  RegistryName?: string | null;
  RevisionId?: string | null;
}

// refs: 1 - tags: named, input
export interface SearchSchemasRequest {
  Keywords: string;
  Limit?: number | null;
  NextToken?: string | null;
  RegistryName: string;
}

// refs: 1 - tags: named, input
export interface StartDiscovererRequest {
  DiscovererId: string;
}

// refs: 1 - tags: named, input
export interface StopDiscovererRequest {
  DiscovererId: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateDiscovererRequest {
  Description?: string | null;
  DiscovererId: string;
}

// refs: 1 - tags: named, input
export interface UpdateRegistryRequest {
  Description?: string | null;
  RegistryName: string;
}

// refs: 1 - tags: named, input
export interface UpdateSchemaRequest {
  ClientTokenId?: string | null;
  Content?: string | null;
  Description?: string | null;
  RegistryName: string;
  SchemaName: string;
  Type?: Type | null;
}

// refs: 1 - tags: named, output
export interface CreateDiscovererResponse {
  Description?: string | null;
  DiscovererArn?: string | null;
  DiscovererId?: string | null;
  SourceArn?: string | null;
  State?: DiscovererState | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface CreateRegistryResponse {
  Description?: string | null;
  RegistryArn?: string | null;
  RegistryName?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface CreateSchemaResponse {
  Description?: string | null;
  LastModified?: Date | number | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersion?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
  Type?: string | null;
  VersionCreatedDate?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface DescribeCodeBindingResponse {
  CreationDate?: Date | number | null;
  LastModified?: Date | number | null;
  SchemaVersion?: string | null;
  Status?: CodeGenerationStatus | null;
}

// refs: 1 - tags: named, output
export interface DescribeDiscovererResponse {
  Description?: string | null;
  DiscovererArn?: string | null;
  DiscovererId?: string | null;
  SourceArn?: string | null;
  State?: DiscovererState | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface DescribeRegistryResponse {
  Description?: string | null;
  RegistryArn?: string | null;
  RegistryName?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface DescribeSchemaResponse {
  Content?: string | null;
  Description?: string | null;
  LastModified?: Date | number | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersion?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
  Type?: string | null;
  VersionCreatedDate?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface ExportSchemaResponse {
  Content?: string | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersion?: string | null;
  Type?: string | null;
}

// refs: 1 - tags: named, output
export interface GetCodeBindingSourceResponse {
  Body?: Uint8Array | string | null;
}

// refs: 1 - tags: named, output
export interface GetDiscoveredSchemaResponse {
  Content?: string | null;
}

// refs: 1 - tags: named, output
export interface GetResourcePolicyResponse {
  Policy?: jsonP.JSONValue | null;
  RevisionId?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDiscoverersResponse {
  Discoverers?: DiscovererSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListRegistriesResponse {
  NextToken?: string | null;
  Registries?: RegistrySummary[] | null;
}

// refs: 1 - tags: named, output
export interface ListSchemaVersionsResponse {
  NextToken?: string | null;
  SchemaVersions?: SchemaVersionSummary[] | null;
}

// refs: 1 - tags: named, output
export interface ListSchemasResponse {
  NextToken?: string | null;
  Schemas?: SchemaSummary[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface PutCodeBindingResponse {
  CreationDate?: Date | number | null;
  LastModified?: Date | number | null;
  SchemaVersion?: string | null;
  Status?: CodeGenerationStatus | null;
}

// refs: 1 - tags: named, output
export interface PutResourcePolicyResponse {
  Policy?: jsonP.JSONValue | null;
  RevisionId?: string | null;
}

// refs: 1 - tags: named, output
export interface SearchSchemasResponse {
  NextToken?: string | null;
  Schemas?: SearchSchemaSummary[] | null;
}

// refs: 1 - tags: named, output
export interface StartDiscovererResponse {
  DiscovererId?: string | null;
  State?: DiscovererState | null;
}

// refs: 1 - tags: named, output
export interface StopDiscovererResponse {
  DiscovererId?: string | null;
  State?: DiscovererState | null;
}

// refs: 1 - tags: named, output
export interface UpdateDiscovererResponse {
  Description?: string | null;
  DiscovererArn?: string | null;
  DiscovererId?: string | null;
  SourceArn?: string | null;
  State?: DiscovererState | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UpdateRegistryResponse {
  Description?: string | null;
  RegistryArn?: string | null;
  RegistryName?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UpdateSchemaResponse {
  Description?: string | null;
  LastModified?: Date | number | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersion?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
  Type?: string | null;
  VersionCreatedDate?: Date | number | null;
}

// refs: 5 - tags: input, named, enum, output
export type Type =
| "OpenApi3"
| "JSONSchemaDraft4"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, enum
export type DiscovererState =
| "STARTED"
| "STOPPED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type CodeGenerationStatus =
| "CREATE_IN_PROGRESS"
| "CREATE_COMPLETE"
| "CREATE_FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface DiscovererSummary {
  DiscovererArn?: string | null;
  DiscovererId?: string | null;
  SourceArn?: string | null;
  State?: DiscovererState | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}
function toDiscovererSummary(root: jsonP.JSONValue): DiscovererSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "DiscovererArn": "s",
      "DiscovererId": "s",
      "SourceArn": "s",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<DiscovererState>(x),
      "Tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface RegistrySummary {
  RegistryArn?: string | null;
  RegistryName?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}
function toRegistrySummary(root: jsonP.JSONValue): RegistrySummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "RegistryArn": "s",
      "RegistryName": "s",
      "Tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SchemaVersionSummary {
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersion?: string | null;
  Type?: Type | null;
}
function toSchemaVersionSummary(root: jsonP.JSONValue): SchemaVersionSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "SchemaArn": "s",
      "SchemaName": "s",
      "SchemaVersion": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<Type>(x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SchemaSummary {
  LastModified?: Date | number | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
  VersionCount?: number | null;
}
function toSchemaSummary(root: jsonP.JSONValue): SchemaSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "LastModified": "d",
      "SchemaArn": "s",
      "SchemaName": "s",
      "Tags": x => jsonP.readMap(String, String, x),
      "VersionCount": "n",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SearchSchemaSummary {
  RegistryName?: string | null;
  SchemaArn?: string | null;
  SchemaName?: string | null;
  SchemaVersions?: SearchSchemaVersionSummary[] | null;
}
function toSearchSchemaSummary(root: jsonP.JSONValue): SearchSchemaSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "RegistryName": "s",
      "SchemaArn": "s",
      "SchemaName": "s",
      "SchemaVersions": [toSearchSchemaVersionSummary],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SearchSchemaVersionSummary {
  CreatedDate?: Date | number | null;
  SchemaVersion?: string | null;
  Type?: Type | null;
}
function toSearchSchemaVersionSummary(root: jsonP.JSONValue): SearchSchemaVersionSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "CreatedDate": "d",
      "SchemaVersion": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<Type>(x),
    },
  }, root);
}
