// Autogenerated API client for: AWS Network Manager

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class NetworkManager {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(NetworkManager.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2019-07-05",
    "endpointPrefix": "networkmanager",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "NetworkManager",
    "serviceFullName": "AWS Network Manager",
    "serviceId": "NetworkManager",
    "signatureVersion": "v4",
    "signingName": "networkmanager",
    "uid": "networkmanager-2019-07-05"
  };

  async associateCustomerGateway(
    {abortSignal, ...params}: RequestConfig & s.AssociateCustomerGatewayRequest,
  ): Promise<s.AssociateCustomerGatewayResponse> {
    const body: jsonP.JSONObject = {
      CustomerGatewayArn: params["CustomerGatewayArn"],
      DeviceId: params["DeviceId"],
      LinkId: params["LinkId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateCustomerGateway",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/customer-gateway-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CustomerGatewayAssociation": toCustomerGatewayAssociation,
      },
    }, await resp.json());
  }

  async associateLink(
    {abortSignal, ...params}: RequestConfig & s.AssociateLinkRequest,
  ): Promise<s.AssociateLinkResponse> {
    const body: jsonP.JSONObject = {
      DeviceId: params["DeviceId"],
      LinkId: params["LinkId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateLink",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/link-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LinkAssociation": toLinkAssociation,
      },
    }, await resp.json());
  }

  async associateTransitGatewayConnectPeer(
    {abortSignal, ...params}: RequestConfig & s.AssociateTransitGatewayConnectPeerRequest,
  ): Promise<s.AssociateTransitGatewayConnectPeerResponse> {
    const body: jsonP.JSONObject = {
      TransitGatewayConnectPeerArn: params["TransitGatewayConnectPeerArn"],
      DeviceId: params["DeviceId"],
      LinkId: params["LinkId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateTransitGatewayConnectPeer",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-connect-peer-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayConnectPeerAssociation": toTransitGatewayConnectPeerAssociation,
      },
    }, await resp.json());
  }

  async createConnection(
    {abortSignal, ...params}: RequestConfig & s.CreateConnectionRequest,
  ): Promise<s.CreateConnectionResponse> {
    const body: jsonP.JSONObject = {
      DeviceId: params["DeviceId"],
      ConnectedDeviceId: params["ConnectedDeviceId"],
      LinkId: params["LinkId"],
      ConnectedLinkId: params["ConnectedLinkId"],
      Description: params["Description"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateConnection",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/connections`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Connection": toConnection,
      },
    }, await resp.json());
  }

  async createDevice(
    {abortSignal, ...params}: RequestConfig & s.CreateDeviceRequest,
  ): Promise<s.CreateDeviceResponse> {
    const body: jsonP.JSONObject = {
      AWSLocation: fromAWSLocation(params["AWSLocation"]),
      Description: params["Description"],
      Type: params["Type"],
      Vendor: params["Vendor"],
      Model: params["Model"],
      SerialNumber: params["SerialNumber"],
      Location: fromLocation(params["Location"]),
      SiteId: params["SiteId"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateDevice",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/devices`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Device": toDevice,
      },
    }, await resp.json());
  }

  async createGlobalNetwork(
    {abortSignal, ...params}: RequestConfig & s.CreateGlobalNetworkRequest = {},
  ): Promise<s.CreateGlobalNetworkResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateGlobalNetwork",
      requestUri: "/global-networks",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GlobalNetwork": toGlobalNetwork,
      },
    }, await resp.json());
  }

  async createLink(
    {abortSignal, ...params}: RequestConfig & s.CreateLinkRequest,
  ): Promise<s.CreateLinkResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
      Type: params["Type"],
      Bandwidth: fromBandwidth(params["Bandwidth"]),
      Provider: params["Provider"],
      SiteId: params["SiteId"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLink",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/links`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Link": toLink,
      },
    }, await resp.json());
  }

  async createSite(
    {abortSignal, ...params}: RequestConfig & s.CreateSiteRequest,
  ): Promise<s.CreateSiteResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
      Location: fromLocation(params["Location"]),
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateSite",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/sites`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Site": toSite,
      },
    }, await resp.json());
  }

  async deleteConnection(
    {abortSignal, ...params}: RequestConfig & s.DeleteConnectionRequest,
  ): Promise<s.DeleteConnectionResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteConnection",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/connections/${params["ConnectionId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Connection": toConnection,
      },
    }, await resp.json());
  }

  async deleteDevice(
    {abortSignal, ...params}: RequestConfig & s.DeleteDeviceRequest,
  ): Promise<s.DeleteDeviceResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteDevice",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/devices/${params["DeviceId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Device": toDevice,
      },
    }, await resp.json());
  }

  async deleteGlobalNetwork(
    {abortSignal, ...params}: RequestConfig & s.DeleteGlobalNetworkRequest,
  ): Promise<s.DeleteGlobalNetworkResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteGlobalNetwork",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GlobalNetwork": toGlobalNetwork,
      },
    }, await resp.json());
  }

  async deleteLink(
    {abortSignal, ...params}: RequestConfig & s.DeleteLinkRequest,
  ): Promise<s.DeleteLinkResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteLink",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/links/${params["LinkId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Link": toLink,
      },
    }, await resp.json());
  }

  async deleteSite(
    {abortSignal, ...params}: RequestConfig & s.DeleteSiteRequest,
  ): Promise<s.DeleteSiteResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteSite",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/sites/${params["SiteId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Site": toSite,
      },
    }, await resp.json());
  }

  async deregisterTransitGateway(
    {abortSignal, ...params}: RequestConfig & s.DeregisterTransitGatewayRequest,
  ): Promise<s.DeregisterTransitGatewayResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeregisterTransitGateway",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-registrations/${params["TransitGatewayArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayRegistration": toTransitGatewayRegistration,
      },
    }, await resp.json());
  }

  async describeGlobalNetworks(
    {abortSignal, ...params}: RequestConfig & s.DescribeGlobalNetworksRequest = {},
  ): Promise<s.DescribeGlobalNetworksResponse> {
    const query = new URLSearchParams;
    for (const item of params["GlobalNetworkIds"] ?? []) {
      query.append("globalNetworkIds", item?.toString() ?? "");
    }
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeGlobalNetworks",
      method: "GET",
      requestUri: "/global-networks",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GlobalNetworks": [toGlobalNetwork],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async disassociateCustomerGateway(
    {abortSignal, ...params}: RequestConfig & s.DisassociateCustomerGatewayRequest,
  ): Promise<s.DisassociateCustomerGatewayResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DisassociateCustomerGateway",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/customer-gateway-associations/${params["CustomerGatewayArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CustomerGatewayAssociation": toCustomerGatewayAssociation,
      },
    }, await resp.json());
  }

  async disassociateLink(
    {abortSignal, ...params}: RequestConfig & s.DisassociateLinkRequest,
  ): Promise<s.DisassociateLinkResponse> {
    const query = new URLSearchParams;
    query.set("deviceId", params["DeviceId"]?.toString() ?? "");
    query.set("linkId", params["LinkId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DisassociateLink",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/link-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LinkAssociation": toLinkAssociation,
      },
    }, await resp.json());
  }

  async disassociateTransitGatewayConnectPeer(
    {abortSignal, ...params}: RequestConfig & s.DisassociateTransitGatewayConnectPeerRequest,
  ): Promise<s.DisassociateTransitGatewayConnectPeerResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DisassociateTransitGatewayConnectPeer",
      method: "DELETE",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-connect-peer-associations/${params["TransitGatewayConnectPeerArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayConnectPeerAssociation": toTransitGatewayConnectPeerAssociation,
      },
    }, await resp.json());
  }

  async getConnections(
    {abortSignal, ...params}: RequestConfig & s.GetConnectionsRequest,
  ): Promise<s.GetConnectionsResponse> {
    const query = new URLSearchParams;
    for (const item of params["ConnectionIds"] ?? []) {
      query.append("connectionIds", item?.toString() ?? "");
    }
    if (params["DeviceId"] != null) query.set("deviceId", params["DeviceId"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetConnections",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/connections`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Connections": [toConnection],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getCustomerGatewayAssociations(
    {abortSignal, ...params}: RequestConfig & s.GetCustomerGatewayAssociationsRequest,
  ): Promise<s.GetCustomerGatewayAssociationsResponse> {
    const query = new URLSearchParams;
    for (const item of params["CustomerGatewayArns"] ?? []) {
      query.append("customerGatewayArns", item?.toString() ?? "");
    }
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetCustomerGatewayAssociations",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/customer-gateway-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CustomerGatewayAssociations": [toCustomerGatewayAssociation],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getDevices(
    {abortSignal, ...params}: RequestConfig & s.GetDevicesRequest,
  ): Promise<s.GetDevicesResponse> {
    const query = new URLSearchParams;
    for (const item of params["DeviceIds"] ?? []) {
      query.append("deviceIds", item?.toString() ?? "");
    }
    if (params["SiteId"] != null) query.set("siteId", params["SiteId"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetDevices",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/devices`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Devices": [toDevice],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getLinkAssociations(
    {abortSignal, ...params}: RequestConfig & s.GetLinkAssociationsRequest,
  ): Promise<s.GetLinkAssociationsResponse> {
    const query = new URLSearchParams;
    if (params["DeviceId"] != null) query.set("deviceId", params["DeviceId"]?.toString() ?? "");
    if (params["LinkId"] != null) query.set("linkId", params["LinkId"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetLinkAssociations",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/link-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LinkAssociations": [toLinkAssociation],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getLinks(
    {abortSignal, ...params}: RequestConfig & s.GetLinksRequest,
  ): Promise<s.GetLinksResponse> {
    const query = new URLSearchParams;
    for (const item of params["LinkIds"] ?? []) {
      query.append("linkIds", item?.toString() ?? "");
    }
    if (params["SiteId"] != null) query.set("siteId", params["SiteId"]?.toString() ?? "");
    if (params["Type"] != null) query.set("type", params["Type"]?.toString() ?? "");
    if (params["Provider"] != null) query.set("provider", params["Provider"]?.toString() ?? "");
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetLinks",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/links`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Links": [toLink],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getSites(
    {abortSignal, ...params}: RequestConfig & s.GetSitesRequest,
  ): Promise<s.GetSitesResponse> {
    const query = new URLSearchParams;
    for (const item of params["SiteIds"] ?? []) {
      query.append("siteIds", item?.toString() ?? "");
    }
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetSites",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/sites`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Sites": [toSite],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getTransitGatewayConnectPeerAssociations(
    {abortSignal, ...params}: RequestConfig & s.GetTransitGatewayConnectPeerAssociationsRequest,
  ): Promise<s.GetTransitGatewayConnectPeerAssociationsResponse> {
    const query = new URLSearchParams;
    for (const item of params["TransitGatewayConnectPeerArns"] ?? []) {
      query.append("transitGatewayConnectPeerArns", item?.toString() ?? "");
    }
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetTransitGatewayConnectPeerAssociations",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-connect-peer-associations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayConnectPeerAssociations": [toTransitGatewayConnectPeerAssociation],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getTransitGatewayRegistrations(
    {abortSignal, ...params}: RequestConfig & s.GetTransitGatewayRegistrationsRequest,
  ): Promise<s.GetTransitGatewayRegistrationsResponse> {
    const query = new URLSearchParams;
    for (const item of params["TransitGatewayArns"] ?? []) {
      query.append("transitGatewayArns", item?.toString() ?? "");
    }
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetTransitGatewayRegistrations",
      method: "GET",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-registrations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayRegistrations": [toTransitGatewayRegistration],
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
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TagList": [toTag],
      },
    }, await resp.json());
  }

  async registerTransitGateway(
    {abortSignal, ...params}: RequestConfig & s.RegisterTransitGatewayRequest,
  ): Promise<s.RegisterTransitGatewayResponse> {
    const body: jsonP.JSONObject = {
      TransitGatewayArn: params["TransitGatewayArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RegisterTransitGateway",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/transit-gateway-registrations`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TransitGatewayRegistration": toTransitGatewayRegistration,
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["ResourceArn"]}`,
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
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
    });
    await resp.text();
  }

  async updateConnection(
    {abortSignal, ...params}: RequestConfig & s.UpdateConnectionRequest,
  ): Promise<s.UpdateConnectionResponse> {
    const body: jsonP.JSONObject = {
      LinkId: params["LinkId"],
      ConnectedLinkId: params["ConnectedLinkId"],
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateConnection",
      method: "PATCH",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/connections/${params["ConnectionId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Connection": toConnection,
      },
    }, await resp.json());
  }

  async updateDevice(
    {abortSignal, ...params}: RequestConfig & s.UpdateDeviceRequest,
  ): Promise<s.UpdateDeviceResponse> {
    const body: jsonP.JSONObject = {
      AWSLocation: fromAWSLocation(params["AWSLocation"]),
      Description: params["Description"],
      Type: params["Type"],
      Vendor: params["Vendor"],
      Model: params["Model"],
      SerialNumber: params["SerialNumber"],
      Location: fromLocation(params["Location"]),
      SiteId: params["SiteId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateDevice",
      method: "PATCH",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/devices/${params["DeviceId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Device": toDevice,
      },
    }, await resp.json());
  }

  async updateGlobalNetwork(
    {abortSignal, ...params}: RequestConfig & s.UpdateGlobalNetworkRequest,
  ): Promise<s.UpdateGlobalNetworkResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateGlobalNetwork",
      method: "PATCH",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GlobalNetwork": toGlobalNetwork,
      },
    }, await resp.json());
  }

  async updateLink(
    {abortSignal, ...params}: RequestConfig & s.UpdateLinkRequest,
  ): Promise<s.UpdateLinkResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
      Type: params["Type"],
      Bandwidth: fromBandwidth(params["Bandwidth"]),
      Provider: params["Provider"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateLink",
      method: "PATCH",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/links/${params["LinkId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Link": toLink,
      },
    }, await resp.json());
  }

  async updateSite(
    {abortSignal, ...params}: RequestConfig & s.UpdateSiteRequest,
  ): Promise<s.UpdateSiteResponse> {
    const body: jsonP.JSONObject = {
      Description: params["Description"],
      Location: fromLocation(params["Location"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateSite",
      method: "PATCH",
      requestUri: cmnP.encodePath`/global-networks/${params["GlobalNetworkId"]}/sites/${params["SiteId"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Site": toSite,
      },
    }, await resp.json());
  }

}

function fromTag(input?: s.Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): s.Tag {
  return jsonP.readObj({
    required: {},
    optional: {
      "Key": "s",
      "Value": "s",
    },
  }, root);
}

function fromAWSLocation(input?: s.AWSLocation | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Zone: input["Zone"],
    SubnetArn: input["SubnetArn"],
  }
}
function toAWSLocation(root: jsonP.JSONValue): s.AWSLocation {
  return jsonP.readObj({
    required: {},
    optional: {
      "Zone": "s",
      "SubnetArn": "s",
    },
  }, root);
}

function fromLocation(input?: s.Location | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Address: input["Address"],
    Latitude: input["Latitude"],
    Longitude: input["Longitude"],
  }
}
function toLocation(root: jsonP.JSONValue): s.Location {
  return jsonP.readObj({
    required: {},
    optional: {
      "Address": "s",
      "Latitude": "s",
      "Longitude": "s",
    },
  }, root);
}

function fromBandwidth(input?: s.Bandwidth | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    UploadSpeed: input["UploadSpeed"],
    DownloadSpeed: input["DownloadSpeed"],
  }
}
function toBandwidth(root: jsonP.JSONValue): s.Bandwidth {
  return jsonP.readObj({
    required: {},
    optional: {
      "UploadSpeed": "n",
      "DownloadSpeed": "n",
    },
  }, root);
}

function toCustomerGatewayAssociation(root: jsonP.JSONValue): s.CustomerGatewayAssociation {
  return jsonP.readObj({
    required: {},
    optional: {
      "CustomerGatewayArn": "s",
      "GlobalNetworkId": "s",
      "DeviceId": "s",
      "LinkId": "s",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.CustomerGatewayAssociationState>(x),
    },
  }, root);
}

function toLinkAssociation(root: jsonP.JSONValue): s.LinkAssociation {
  return jsonP.readObj({
    required: {},
    optional: {
      "GlobalNetworkId": "s",
      "DeviceId": "s",
      "LinkId": "s",
      "LinkAssociationState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LinkAssociationState>(x),
    },
  }, root);
}

function toTransitGatewayConnectPeerAssociation(root: jsonP.JSONValue): s.TransitGatewayConnectPeerAssociation {
  return jsonP.readObj({
    required: {},
    optional: {
      "TransitGatewayConnectPeerArn": "s",
      "GlobalNetworkId": "s",
      "DeviceId": "s",
      "LinkId": "s",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.TransitGatewayConnectPeerAssociationState>(x),
    },
  }, root);
}

function toConnection(root: jsonP.JSONValue): s.Connection {
  return jsonP.readObj({
    required: {},
    optional: {
      "ConnectionId": "s",
      "ConnectionArn": "s",
      "GlobalNetworkId": "s",
      "DeviceId": "s",
      "ConnectedDeviceId": "s",
      "LinkId": "s",
      "ConnectedLinkId": "s",
      "Description": "s",
      "CreatedAt": "d",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConnectionState>(x),
      "Tags": [toTag],
    },
  }, root);
}

function toDevice(root: jsonP.JSONValue): s.Device {
  return jsonP.readObj({
    required: {},
    optional: {
      "DeviceId": "s",
      "DeviceArn": "s",
      "GlobalNetworkId": "s",
      "AWSLocation": toAWSLocation,
      "Description": "s",
      "Type": "s",
      "Vendor": "s",
      "Model": "s",
      "SerialNumber": "s",
      "Location": toLocation,
      "SiteId": "s",
      "CreatedAt": "d",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.DeviceState>(x),
      "Tags": [toTag],
    },
  }, root);
}

function toGlobalNetwork(root: jsonP.JSONValue): s.GlobalNetwork {
  return jsonP.readObj({
    required: {},
    optional: {
      "GlobalNetworkId": "s",
      "GlobalNetworkArn": "s",
      "Description": "s",
      "CreatedAt": "d",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.GlobalNetworkState>(x),
      "Tags": [toTag],
    },
  }, root);
}

function toLink(root: jsonP.JSONValue): s.Link {
  return jsonP.readObj({
    required: {},
    optional: {
      "LinkId": "s",
      "LinkArn": "s",
      "GlobalNetworkId": "s",
      "SiteId": "s",
      "Description": "s",
      "Type": "s",
      "Bandwidth": toBandwidth,
      "Provider": "s",
      "CreatedAt": "d",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.LinkState>(x),
      "Tags": [toTag],
    },
  }, root);
}

function toSite(root: jsonP.JSONValue): s.Site {
  return jsonP.readObj({
    required: {},
    optional: {
      "SiteId": "s",
      "SiteArn": "s",
      "GlobalNetworkId": "s",
      "Description": "s",
      "Location": toLocation,
      "CreatedAt": "d",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.SiteState>(x),
      "Tags": [toTag],
    },
  }, root);
}

function toTransitGatewayRegistration(root: jsonP.JSONValue): s.TransitGatewayRegistration {
  return jsonP.readObj({
    required: {},
    optional: {
      "GlobalNetworkId": "s",
      "TransitGatewayArn": "s",
      "State": toTransitGatewayRegistrationStateReason,
    },
  }, root);
}

function toTransitGatewayRegistrationStateReason(root: jsonP.JSONValue): s.TransitGatewayRegistrationStateReason {
  return jsonP.readObj({
    required: {},
    optional: {
      "Code": (x: jsonP.JSONValue) => cmnP.readEnum<s.TransitGatewayRegistrationState>(x),
      "Message": "s",
    },
  }, root);
}
