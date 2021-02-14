// Autogenerated API client for: AWS Ground Station

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class GroundStation {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(GroundStation.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2019-05-23",
    "endpointPrefix": "groundstation",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "AWS Ground Station",
    "serviceId": "GroundStation",
    "signatureVersion": "v4",
    "signingName": "groundstation",
    "uid": "groundstation-2019-05-23"
  };

  async cancelContact(
    {abortSignal, ...params}: RequestConfig & s.CancelContactRequest,
  ): Promise<s.ContactIdResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "CancelContact",
      method: "DELETE",
      requestUri: cmnP.encodePath`/contact/${params["contactId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "contactId": "s",
      },
    }, await resp.json());
  }

  async createConfig(
    {abortSignal, ...params}: RequestConfig & s.CreateConfigRequest,
  ): Promise<s.ConfigIdResponse> {
    const body: jsonP.JSONObject = {
      configData: fromConfigTypeData(params["configData"]),
      name: params["name"],
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateConfig",
      requestUri: "/config",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "configArn": "s",
        "configId": "s",
        "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      },
    }, await resp.json());
  }

  async createDataflowEndpointGroup(
    {abortSignal, ...params}: RequestConfig & s.CreateDataflowEndpointGroupRequest,
  ): Promise<s.DataflowEndpointGroupIdResponse> {
    const body: jsonP.JSONObject = {
      endpointDetails: params["endpointDetails"]?.map(x => fromEndpointDetails(x)),
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateDataflowEndpointGroup",
      requestUri: "/dataflowEndpointGroup",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "dataflowEndpointGroupId": "s",
      },
    }, await resp.json());
  }

  async createMissionProfile(
    {abortSignal, ...params}: RequestConfig & s.CreateMissionProfileRequest,
  ): Promise<s.MissionProfileIdResponse> {
    const body: jsonP.JSONObject = {
      contactPostPassDurationSeconds: params["contactPostPassDurationSeconds"],
      contactPrePassDurationSeconds: params["contactPrePassDurationSeconds"],
      dataflowEdges: params["dataflowEdges"],
      minimumViableContactDurationSeconds: params["minimumViableContactDurationSeconds"],
      name: params["name"],
      tags: params["tags"],
      trackingConfigArn: params["trackingConfigArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateMissionProfile",
      requestUri: "/missionprofile",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "missionProfileId": "s",
      },
    }, await resp.json());
  }

  async deleteConfig(
    {abortSignal, ...params}: RequestConfig & s.DeleteConfigRequest,
  ): Promise<s.ConfigIdResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteConfig",
      method: "DELETE",
      requestUri: cmnP.encodePath`/config/${params["configType"]}/${params["configId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "configArn": "s",
        "configId": "s",
        "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      },
    }, await resp.json());
  }

  async deleteDataflowEndpointGroup(
    {abortSignal, ...params}: RequestConfig & s.DeleteDataflowEndpointGroupRequest,
  ): Promise<s.DataflowEndpointGroupIdResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteDataflowEndpointGroup",
      method: "DELETE",
      requestUri: cmnP.encodePath`/dataflowEndpointGroup/${params["dataflowEndpointGroupId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "dataflowEndpointGroupId": "s",
      },
    }, await resp.json());
  }

  async deleteMissionProfile(
    {abortSignal, ...params}: RequestConfig & s.DeleteMissionProfileRequest,
  ): Promise<s.MissionProfileIdResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteMissionProfile",
      method: "DELETE",
      requestUri: cmnP.encodePath`/missionprofile/${params["missionProfileId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "missionProfileId": "s",
      },
    }, await resp.json());
  }

  async describeContact(
    {abortSignal, ...params}: RequestConfig & s.DescribeContactRequest,
  ): Promise<s.DescribeContactResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeContact",
      method: "GET",
      requestUri: cmnP.encodePath`/contact/${params["contactId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "contactId": "s",
        "contactStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.ContactStatus>(x),
        "dataflowList": [toDataflowDetail],
        "endTime": "d",
        "errorMessage": "s",
        "groundStation": "s",
        "maximumElevation": toElevation,
        "missionProfileArn": "s",
        "postPassEndTime": "d",
        "prePassStartTime": "d",
        "region": "s",
        "satelliteArn": "s",
        "startTime": "d",
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async getConfig(
    {abortSignal, ...params}: RequestConfig & s.GetConfigRequest,
  ): Promise<s.GetConfigResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetConfig",
      method: "GET",
      requestUri: cmnP.encodePath`/config/${params["configType"]}/${params["configId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {
        "configArn": "s",
        "configData": toConfigTypeData,
        "configId": "s",
        "name": "s",
      },
      optional: {
        "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async getDataflowEndpointGroup(
    {abortSignal, ...params}: RequestConfig & s.GetDataflowEndpointGroupRequest,
  ): Promise<s.GetDataflowEndpointGroupResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetDataflowEndpointGroup",
      method: "GET",
      requestUri: cmnP.encodePath`/dataflowEndpointGroup/${params["dataflowEndpointGroupId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "dataflowEndpointGroupArn": "s",
        "dataflowEndpointGroupId": "s",
        "endpointsDetails": [toEndpointDetails],
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async getMinuteUsage(
    {abortSignal, ...params}: RequestConfig & s.GetMinuteUsageRequest,
  ): Promise<s.GetMinuteUsageResponse> {
    const body: jsonP.JSONObject = {
      month: params["month"],
      year: params["year"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetMinuteUsage",
      requestUri: "/minute-usage",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "estimatedMinutesRemaining": "n",
        "isReservedMinutesCustomer": "b",
        "totalReservedMinuteAllocation": "n",
        "totalScheduledMinutes": "n",
        "upcomingMinutesScheduled": "n",
      },
    }, await resp.json());
  }

  async getMissionProfile(
    {abortSignal, ...params}: RequestConfig & s.GetMissionProfileRequest,
  ): Promise<s.GetMissionProfileResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetMissionProfile",
      method: "GET",
      requestUri: cmnP.encodePath`/missionprofile/${params["missionProfileId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "contactPostPassDurationSeconds": "n",
        "contactPrePassDurationSeconds": "n",
        "dataflowEdges": [x => jsonP.readList(String, x)],
        "minimumViableContactDurationSeconds": "n",
        "missionProfileArn": "s",
        "missionProfileId": "s",
        "name": "s",
        "region": "s",
        "tags": x => jsonP.readMap(String, String, x),
        "trackingConfigArn": "s",
      },
    }, await resp.json());
  }

  async getSatellite(
    {abortSignal, ...params}: RequestConfig & s.GetSatelliteRequest,
  ): Promise<s.GetSatelliteResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetSatellite",
      method: "GET",
      requestUri: cmnP.encodePath`/satellite/${params["satelliteId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "groundStations": ["s"],
        "noradSatelliteID": "n",
        "satelliteArn": "s",
        "satelliteId": "s",
      },
    }, await resp.json());
  }

  async listConfigs(
    {abortSignal, ...params}: RequestConfig & s.ListConfigsRequest = {},
  ): Promise<s.ListConfigsResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListConfigs",
      method: "GET",
      requestUri: "/config",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "configList": [toConfigListItem],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listContacts(
    {abortSignal, ...params}: RequestConfig & s.ListContactsRequest,
  ): Promise<s.ListContactsResponse> {
    const body: jsonP.JSONObject = {
      endTime: jsonP.serializeDate_unixTimestamp(params["endTime"]),
      groundStation: params["groundStation"],
      maxResults: params["maxResults"],
      missionProfileArn: params["missionProfileArn"],
      nextToken: params["nextToken"],
      satelliteArn: params["satelliteArn"],
      startTime: jsonP.serializeDate_unixTimestamp(params["startTime"]),
      statusList: params["statusList"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListContacts",
      requestUri: "/contacts",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "contactList": [toContactData],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listDataflowEndpointGroups(
    {abortSignal, ...params}: RequestConfig & s.ListDataflowEndpointGroupsRequest = {},
  ): Promise<s.ListDataflowEndpointGroupsResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListDataflowEndpointGroups",
      method: "GET",
      requestUri: "/dataflowEndpointGroup",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "dataflowEndpointGroupList": [toDataflowEndpointListItem],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listGroundStations(
    {abortSignal, ...params}: RequestConfig & s.ListGroundStationsRequest = {},
  ): Promise<s.ListGroundStationsResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    if (params["satelliteId"] != null) query.set("satelliteId", params["satelliteId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListGroundStations",
      method: "GET",
      requestUri: "/groundstation",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "groundStationList": [toGroundStationData],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listMissionProfiles(
    {abortSignal, ...params}: RequestConfig & s.ListMissionProfilesRequest = {},
  ): Promise<s.ListMissionProfilesResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListMissionProfiles",
      method: "GET",
      requestUri: "/missionprofile",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "missionProfileList": [toMissionProfileListItem],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listSatellites(
    {abortSignal, ...params}: RequestConfig & s.ListSatellitesRequest = {},
  ): Promise<s.ListSatellitesResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListSatellites",
      method: "GET",
      requestUri: "/satellite",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "nextToken": "s",
        "satellites": [toSatelliteListItem],
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
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async reserveContact(
    {abortSignal, ...params}: RequestConfig & s.ReserveContactRequest,
  ): Promise<s.ContactIdResponse> {
    const body: jsonP.JSONObject = {
      endTime: jsonP.serializeDate_unixTimestamp(params["endTime"]),
      groundStation: params["groundStation"],
      missionProfileArn: params["missionProfileArn"],
      satelliteArn: params["satelliteArn"],
      startTime: jsonP.serializeDate_unixTimestamp(params["startTime"]),
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ReserveContact",
      requestUri: "/contact",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "contactId": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<s.TagResourceResponse> {
    const body: jsonP.JSONObject = {
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<s.UntagResourceResponse> {
    const query = new URLSearchParams;
    for (const item of params["tagKeys"]) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateConfig(
    {abortSignal, ...params}: RequestConfig & s.UpdateConfigRequest,
  ): Promise<s.ConfigIdResponse> {
    const body: jsonP.JSONObject = {
      configData: fromConfigTypeData(params["configData"]),
      name: params["name"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateConfig",
      method: "PUT",
      requestUri: cmnP.encodePath`/config/${params["configType"]}/${params["configId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "configArn": "s",
        "configId": "s",
        "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      },
    }, await resp.json());
  }

  async updateMissionProfile(
    {abortSignal, ...params}: RequestConfig & s.UpdateMissionProfileRequest,
  ): Promise<s.MissionProfileIdResponse> {
    const body: jsonP.JSONObject = {
      contactPostPassDurationSeconds: params["contactPostPassDurationSeconds"],
      contactPrePassDurationSeconds: params["contactPrePassDurationSeconds"],
      dataflowEdges: params["dataflowEdges"],
      minimumViableContactDurationSeconds: params["minimumViableContactDurationSeconds"],
      name: params["name"],
      trackingConfigArn: params["trackingConfigArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateMissionProfile",
      method: "PUT",
      requestUri: cmnP.encodePath`/missionprofile/${params["missionProfileId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "missionProfileId": "s",
      },
    }, await resp.json());
  }

}

function fromConfigTypeData(input?: s.ConfigTypeData | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    antennaDownlinkConfig: fromAntennaDownlinkConfig(input["antennaDownlinkConfig"]),
    antennaDownlinkDemodDecodeConfig: fromAntennaDownlinkDemodDecodeConfig(input["antennaDownlinkDemodDecodeConfig"]),
    antennaUplinkConfig: fromAntennaUplinkConfig(input["antennaUplinkConfig"]),
    dataflowEndpointConfig: fromDataflowEndpointConfig(input["dataflowEndpointConfig"]),
    trackingConfig: fromTrackingConfig(input["trackingConfig"]),
    uplinkEchoConfig: fromUplinkEchoConfig(input["uplinkEchoConfig"]),
  }
}
function toConfigTypeData(root: jsonP.JSONValue): s.ConfigTypeData {
  return jsonP.readObj({
    required: {},
    optional: {
      "antennaDownlinkConfig": toAntennaDownlinkConfig,
      "antennaDownlinkDemodDecodeConfig": toAntennaDownlinkDemodDecodeConfig,
      "antennaUplinkConfig": toAntennaUplinkConfig,
      "dataflowEndpointConfig": toDataflowEndpointConfig,
      "trackingConfig": toTrackingConfig,
      "uplinkEchoConfig": toUplinkEchoConfig,
    },
  }, root);
}

function fromAntennaDownlinkConfig(input?: s.AntennaDownlinkConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    spectrumConfig: fromSpectrumConfig(input["spectrumConfig"]),
  }
}
function toAntennaDownlinkConfig(root: jsonP.JSONValue): s.AntennaDownlinkConfig {
  return jsonP.readObj({
    required: {
      "spectrumConfig": toSpectrumConfig,
    },
    optional: {},
  }, root);
}

function fromSpectrumConfig(input?: s.SpectrumConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bandwidth: fromFrequencyBandwidth(input["bandwidth"]),
    centerFrequency: fromFrequency(input["centerFrequency"]),
    polarization: input["polarization"],
  }
}
function toSpectrumConfig(root: jsonP.JSONValue): s.SpectrumConfig {
  return jsonP.readObj({
    required: {
      "bandwidth": toFrequencyBandwidth,
      "centerFrequency": toFrequency,
    },
    optional: {
      "polarization": (x: jsonP.JSONValue) => cmnP.readEnum<s.Polarization>(x),
    },
  }, root);
}

function fromFrequencyBandwidth(input?: s.FrequencyBandwidth | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    units: input["units"],
    value: input["value"],
  }
}
function toFrequencyBandwidth(root: jsonP.JSONValue): s.FrequencyBandwidth {
  return jsonP.readObj({
    required: {
      "units": (x: jsonP.JSONValue) => cmnP.readEnum<s.BandwidthUnits>(x),
      "value": "n",
    },
    optional: {},
  }, root);
}

function fromFrequency(input?: s.Frequency | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    units: input["units"],
    value: input["value"],
  }
}
function toFrequency(root: jsonP.JSONValue): s.Frequency {
  return jsonP.readObj({
    required: {
      "units": (x: jsonP.JSONValue) => cmnP.readEnum<s.FrequencyUnits>(x),
      "value": "n",
    },
    optional: {},
  }, root);
}

function fromAntennaDownlinkDemodDecodeConfig(input?: s.AntennaDownlinkDemodDecodeConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    decodeConfig: fromDecodeConfig(input["decodeConfig"]),
    demodulationConfig: fromDemodulationConfig(input["demodulationConfig"]),
    spectrumConfig: fromSpectrumConfig(input["spectrumConfig"]),
  }
}
function toAntennaDownlinkDemodDecodeConfig(root: jsonP.JSONValue): s.AntennaDownlinkDemodDecodeConfig {
  return jsonP.readObj({
    required: {
      "decodeConfig": toDecodeConfig,
      "demodulationConfig": toDemodulationConfig,
      "spectrumConfig": toSpectrumConfig,
    },
    optional: {},
  }, root);
}

function fromDecodeConfig(input?: s.DecodeConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    unvalidatedJSON: input["unvalidatedJSON"],
  }
}
function toDecodeConfig(root: jsonP.JSONValue): s.DecodeConfig {
  return jsonP.readObj({
    required: {
      "unvalidatedJSON": "s",
    },
    optional: {},
  }, root);
}

function fromDemodulationConfig(input?: s.DemodulationConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    unvalidatedJSON: input["unvalidatedJSON"],
  }
}
function toDemodulationConfig(root: jsonP.JSONValue): s.DemodulationConfig {
  return jsonP.readObj({
    required: {
      "unvalidatedJSON": "s",
    },
    optional: {},
  }, root);
}

function fromAntennaUplinkConfig(input?: s.AntennaUplinkConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    spectrumConfig: fromUplinkSpectrumConfig(input["spectrumConfig"]),
    targetEirp: fromEirp(input["targetEirp"]),
    transmitDisabled: input["transmitDisabled"],
  }
}
function toAntennaUplinkConfig(root: jsonP.JSONValue): s.AntennaUplinkConfig {
  return jsonP.readObj({
    required: {
      "spectrumConfig": toUplinkSpectrumConfig,
      "targetEirp": toEirp,
    },
    optional: {
      "transmitDisabled": "b",
    },
  }, root);
}

function fromUplinkSpectrumConfig(input?: s.UplinkSpectrumConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    centerFrequency: fromFrequency(input["centerFrequency"]),
    polarization: input["polarization"],
  }
}
function toUplinkSpectrumConfig(root: jsonP.JSONValue): s.UplinkSpectrumConfig {
  return jsonP.readObj({
    required: {
      "centerFrequency": toFrequency,
    },
    optional: {
      "polarization": (x: jsonP.JSONValue) => cmnP.readEnum<s.Polarization>(x),
    },
  }, root);
}

function fromEirp(input?: s.Eirp | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    units: input["units"],
    value: input["value"],
  }
}
function toEirp(root: jsonP.JSONValue): s.Eirp {
  return jsonP.readObj({
    required: {
      "units": (x: jsonP.JSONValue) => cmnP.readEnum<s.EirpUnits>(x),
      "value": "n",
    },
    optional: {},
  }, root);
}

function fromDataflowEndpointConfig(input?: s.DataflowEndpointConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    dataflowEndpointName: input["dataflowEndpointName"],
    dataflowEndpointRegion: input["dataflowEndpointRegion"],
  }
}
function toDataflowEndpointConfig(root: jsonP.JSONValue): s.DataflowEndpointConfig {
  return jsonP.readObj({
    required: {
      "dataflowEndpointName": "s",
    },
    optional: {
      "dataflowEndpointRegion": "s",
    },
  }, root);
}

function fromTrackingConfig(input?: s.TrackingConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    autotrack: input["autotrack"],
  }
}
function toTrackingConfig(root: jsonP.JSONValue): s.TrackingConfig {
  return jsonP.readObj({
    required: {
      "autotrack": (x: jsonP.JSONValue) => cmnP.readEnum<s.Criticality>(x),
    },
    optional: {},
  }, root);
}

function fromUplinkEchoConfig(input?: s.UplinkEchoConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    antennaUplinkConfigArn: input["antennaUplinkConfigArn"],
    enabled: input["enabled"],
  }
}
function toUplinkEchoConfig(root: jsonP.JSONValue): s.UplinkEchoConfig {
  return jsonP.readObj({
    required: {
      "antennaUplinkConfigArn": "s",
      "enabled": "b",
    },
    optional: {},
  }, root);
}

function fromEndpointDetails(input?: s.EndpointDetails | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    endpoint: fromDataflowEndpoint(input["endpoint"]),
    securityDetails: fromSecurityDetails(input["securityDetails"]),
  }
}
function toEndpointDetails(root: jsonP.JSONValue): s.EndpointDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "endpoint": toDataflowEndpoint,
      "securityDetails": toSecurityDetails,
    },
  }, root);
}

function fromDataflowEndpoint(input?: s.DataflowEndpoint | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    address: fromSocketAddress(input["address"]),
    mtu: input["mtu"],
    name: input["name"],
    status: input["status"],
  }
}
function toDataflowEndpoint(root: jsonP.JSONValue): s.DataflowEndpoint {
  return jsonP.readObj({
    required: {},
    optional: {
      "address": toSocketAddress,
      "mtu": "n",
      "name": "s",
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<s.EndpointStatus>(x),
    },
  }, root);
}

function fromSocketAddress(input?: s.SocketAddress | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    port: input["port"],
  }
}
function toSocketAddress(root: jsonP.JSONValue): s.SocketAddress {
  return jsonP.readObj({
    required: {
      "name": "s",
      "port": "n",
    },
    optional: {},
  }, root);
}

function fromSecurityDetails(input?: s.SecurityDetails | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    roleArn: input["roleArn"],
    securityGroupIds: input["securityGroupIds"],
    subnetIds: input["subnetIds"],
  }
}
function toSecurityDetails(root: jsonP.JSONValue): s.SecurityDetails {
  return jsonP.readObj({
    required: {
      "roleArn": "s",
      "securityGroupIds": ["s"],
      "subnetIds": ["s"],
    },
    optional: {},
  }, root);
}

function toDataflowDetail(root: jsonP.JSONValue): s.DataflowDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "destination": toDestination,
      "errorMessage": "s",
      "source": toSource,
    },
  }, root);
}

function toDestination(root: jsonP.JSONValue): s.Destination {
  return jsonP.readObj({
    required: {},
    optional: {
      "configDetails": toConfigDetails,
      "configId": "s",
      "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      "dataflowDestinationRegion": "s",
    },
  }, root);
}

function toConfigDetails(root: jsonP.JSONValue): s.ConfigDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "antennaDemodDecodeDetails": toAntennaDemodDecodeDetails,
      "endpointDetails": toEndpointDetails,
    },
  }, root);
}

function toAntennaDemodDecodeDetails(root: jsonP.JSONValue): s.AntennaDemodDecodeDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "outputNode": "s",
    },
  }, root);
}

function toSource(root: jsonP.JSONValue): s.Source {
  return jsonP.readObj({
    required: {},
    optional: {
      "configDetails": toConfigDetails,
      "configId": "s",
      "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      "dataflowSourceRegion": "s",
    },
  }, root);
}

function toElevation(root: jsonP.JSONValue): s.Elevation {
  return jsonP.readObj({
    required: {
      "unit": (x: jsonP.JSONValue) => cmnP.readEnum<s.AngleUnits>(x),
      "value": "n",
    },
    optional: {},
  }, root);
}

function toConfigListItem(root: jsonP.JSONValue): s.ConfigListItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "configArn": "s",
      "configId": "s",
      "configType": (x: jsonP.JSONValue) => cmnP.readEnum<s.ConfigCapabilityType>(x),
      "name": "s",
    },
  }, root);
}

function toContactData(root: jsonP.JSONValue): s.ContactData {
  return jsonP.readObj({
    required: {},
    optional: {
      "contactId": "s",
      "contactStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.ContactStatus>(x),
      "endTime": "d",
      "errorMessage": "s",
      "groundStation": "s",
      "maximumElevation": toElevation,
      "missionProfileArn": "s",
      "postPassEndTime": "d",
      "prePassStartTime": "d",
      "region": "s",
      "satelliteArn": "s",
      "startTime": "d",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toDataflowEndpointListItem(root: jsonP.JSONValue): s.DataflowEndpointListItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "dataflowEndpointGroupArn": "s",
      "dataflowEndpointGroupId": "s",
    },
  }, root);
}

function toGroundStationData(root: jsonP.JSONValue): s.GroundStationData {
  return jsonP.readObj({
    required: {},
    optional: {
      "groundStationId": "s",
      "groundStationName": "s",
      "region": "s",
    },
  }, root);
}

function toMissionProfileListItem(root: jsonP.JSONValue): s.MissionProfileListItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "missionProfileArn": "s",
      "missionProfileId": "s",
      "name": "s",
      "region": "s",
    },
  }, root);
}

function toSatelliteListItem(root: jsonP.JSONValue): s.SatelliteListItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "groundStations": ["s"],
      "noradSatelliteID": "n",
      "satelliteArn": "s",
      "satelliteId": "s",
    },
  }, root);
}
