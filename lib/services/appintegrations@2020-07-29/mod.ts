// Autogenerated API client for: Amazon AppIntegrations Service

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

export default class AppIntegrations {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(AppIntegrations.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2020-07-29",
    "endpointPrefix": "app-integrations",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "Amazon AppIntegrations Service",
    "serviceId": "AppIntegrations",
    "signatureVersion": "v4",
    "signingName": "app-integrations",
    "uid": "appintegrations-2020-07-29"
  };

  async createEventIntegration(
    {abortSignal, ...params}: RequestConfig & s.CreateEventIntegrationRequest,
  ): Promise<s.CreateEventIntegrationResponse> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Description: params["Description"],
      EventFilter: fromEventFilter(params["EventFilter"]),
      EventBridgeBus: params["EventBridgeBus"],
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
      Tags: params["Tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateEventIntegration",
      requestUri: "/eventIntegrations",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EventIntegrationArn": "s",
      },
    }, await resp.json());
  }

  async deleteEventIntegration(
    {abortSignal, ...params}: RequestConfig & s.DeleteEventIntegrationRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteEventIntegration",
      method: "DELETE",
      requestUri: cmnP.encodePath`/eventIntegrations/${params["Name"]}`,
    });
    await resp.text();
  }

  async getEventIntegration(
    {abortSignal, ...params}: RequestConfig & s.GetEventIntegrationRequest,
  ): Promise<s.GetEventIntegrationResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetEventIntegration",
      method: "GET",
      requestUri: cmnP.encodePath`/eventIntegrations/${params["Name"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Name": "s",
        "Description": "s",
        "EventIntegrationArn": "s",
        "EventBridgeBus": "s",
        "EventFilter": toEventFilter,
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async listEventIntegrationAssociations(
    {abortSignal, ...params}: RequestConfig & s.ListEventIntegrationAssociationsRequest,
  ): Promise<s.ListEventIntegrationAssociationsResponse> {
    const query = new URLSearchParams;
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListEventIntegrationAssociations",
      method: "GET",
      requestUri: cmnP.encodePath`/eventIntegrations/${params["EventIntegrationName"]}/associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EventIntegrationAssociations": [toEventIntegrationAssociation],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listEventIntegrations(
    {abortSignal, ...params}: RequestConfig & s.ListEventIntegrationsRequest = {},
  ): Promise<s.ListEventIntegrationsResponse> {
    const query = new URLSearchParams;
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListEventIntegrations",
      method: "GET",
      requestUri: "/eventIntegrations",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EventIntegrations": [toEventIntegration],
        "NextToken": "s",
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

  async updateEventIntegration(
    {abortSignal, ...params}: RequestConfig & s.UpdateEventIntegrationRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateEventIntegration",
      method: "PATCH",
      requestUri: cmnP.encodePath`/eventIntegrations/${params["Name"]}`,
    });
    await resp.text();
  }

}

function fromEventFilter(input?: s.EventFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Source: input["Source"],
  }
}
function toEventFilter(root: jsonP.JSONValue): s.EventFilter {
  return jsonP.readObj({
    required: {
      "Source": "s",
    },
    optional: {},
  }, root);
}

function toEventIntegrationAssociation(root: jsonP.JSONValue): s.EventIntegrationAssociation {
  return jsonP.readObj({
    required: {},
    optional: {
      "EventIntegrationAssociationArn": "s",
      "EventIntegrationAssociationId": "s",
      "EventIntegrationName": "s",
      "ClientId": "s",
      "EventBridgeRuleName": "s",
      "ClientAssociationMetadata": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toEventIntegration(root: jsonP.JSONValue): s.EventIntegration {
  return jsonP.readObj({
    required: {},
    optional: {
      "EventIntegrationArn": "s",
      "Name": "s",
      "Description": "s",
      "EventFilter": toEventFilter,
      "EventBridgeBus": "s",
      "Tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}
