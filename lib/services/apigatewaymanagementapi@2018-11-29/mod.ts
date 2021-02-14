// Autogenerated API client for: AmazonApiGatewayManagementApi

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class ApiGatewayManagementApi {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ApiGatewayManagementApi.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2018-11-29",
    "endpointPrefix": "execute-api",
    "signingName": "execute-api",
    "serviceFullName": "AmazonApiGatewayManagementApi",
    "serviceId": "ApiGatewayManagementApi",
    "protocol": "rest-json",
    "jsonVersion": "1.1",
    "uid": "apigatewaymanagementapi-2018-11-29",
    "signatureVersion": "v4"
  };

  async deleteConnection(
    {abortSignal, ...params}: RequestConfig & s.DeleteConnectionRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteConnection",
      method: "DELETE",
      requestUri: cmnP.encodePath`/@connections/${params["ConnectionId"]}`,
      responseCode: 204,
    });
  }

  async getConnection(
    {abortSignal, ...params}: RequestConfig & s.GetConnectionRequest,
  ): Promise<s.GetConnectionResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetConnection",
      method: "GET",
      requestUri: cmnP.encodePath`/@connections/${params["ConnectionId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ConnectedAt": "d",
        "Identity": toIdentity,
        "LastActiveAt": "d",
      },
    }, await resp.json());
  }

  async postToConnection(
    {abortSignal, ...params}: RequestConfig & s.PostToConnectionRequest,
  ): Promise<void> {
    const body = typeof params["Data"] === 'string' ? new TextEncoder().encode(params["Data"]) : params["Data"];
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PostToConnection",
      requestUri: cmnP.encodePath`/@connections/${params["ConnectionId"]}`,
      responseCode: 200,
    });
  }

}

function toIdentity(root: jsonP.JSONValue): s.Identity {
  return jsonP.readObj({
    required: {
      "SourceIp": "s",
      "UserAgent": "s",
    },
    optional: {},
  }, root);
}
