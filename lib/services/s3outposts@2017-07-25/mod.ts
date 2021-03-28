// Autogenerated API client for: Amazon S3 on Outposts

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class S3Outposts {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(S3Outposts.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-07-25",
    "endpointPrefix": "s3-outposts",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "Amazon S3 Outposts",
    "serviceFullName": "Amazon S3 on Outposts",
    "serviceId": "S3Outposts",
    "signatureVersion": "v4",
    "signingName": "s3-outposts",
    "uid": "s3outposts-2017-07-25"
  };

  async createEndpoint(
    {abortSignal, ...params}: RequestConfig & s.CreateEndpointRequest,
  ): Promise<s.CreateEndpointResult> {
    const body: jsonP.JSONObject = {
      OutpostId: params["OutpostId"],
      SubnetId: params["SubnetId"],
      SecurityGroupId: params["SecurityGroupId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateEndpoint",
      requestUri: "/S3Outposts/CreateEndpoint",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EndpointArn": "s",
      },
    }, await resp.json());
  }

  async deleteEndpoint(
    {abortSignal, ...params}: RequestConfig & s.DeleteEndpointRequest,
  ): Promise<void> {
    const query = new URLSearchParams;
    query.set("endpointId", params["EndpointId"]?.toString() ?? "");
    query.set("outpostId", params["OutpostId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DeleteEndpoint",
      method: "DELETE",
      requestUri: "/S3Outposts/DeleteEndpoint",
    });
    await resp.text();
  }

  async listEndpoints(
    {abortSignal, ...params}: RequestConfig & s.ListEndpointsRequest = {},
  ): Promise<s.ListEndpointsResult> {
    const query = new URLSearchParams;
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListEndpoints",
      method: "GET",
      requestUri: "/S3Outposts/ListEndpoints",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Endpoints": [toEndpoint],
        "NextToken": "s",
      },
    }, await resp.json());
  }

}

function toEndpoint(root: jsonP.JSONValue): s.Endpoint {
  return jsonP.readObj({
    required: {},
    optional: {
      "EndpointArn": "s",
      "OutpostsId": "s",
      "CidrBlock": "s",
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.EndpointStatus>(x),
      "CreationTime": "d",
      "NetworkInterfaces": [toNetworkInterface],
    },
  }, root);
}

function toNetworkInterface(root: jsonP.JSONValue): s.NetworkInterface {
  return jsonP.readObj({
    required: {},
    optional: {
      "NetworkInterfaceId": "s",
    },
  }, root);
}
