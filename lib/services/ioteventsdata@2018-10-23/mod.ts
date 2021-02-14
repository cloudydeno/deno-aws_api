// Autogenerated API client for: AWS IoT Events Data

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as Base64 from "https://deno.land/std@0.86.0/encoding/base64.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";
function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (input == null) return input;
  return Base64.encode(input);
}

export default class IoTEventsData {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(IoTEventsData.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2018-10-23",
    "endpointPrefix": "data.iotevents",
    "protocol": "rest-json",
    "serviceFullName": "AWS IoT Events Data",
    "serviceId": "IoT Events Data",
    "signatureVersion": "v4",
    "signingName": "ioteventsdata",
    "uid": "iotevents-data-2018-10-23"
  };

  async batchPutMessage(
    {abortSignal, ...params}: RequestConfig & s.BatchPutMessageRequest,
  ): Promise<s.BatchPutMessageResponse> {
    const body: jsonP.JSONObject = {
      messages: params["messages"]?.map(x => fromMessage(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchPutMessage",
      requestUri: "/inputs/messages",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "BatchPutMessageErrorEntries": [toBatchPutMessageErrorEntry],
      },
    }, await resp.json());
  }

  async batchUpdateDetector(
    {abortSignal, ...params}: RequestConfig & s.BatchUpdateDetectorRequest,
  ): Promise<s.BatchUpdateDetectorResponse> {
    const body: jsonP.JSONObject = {
      detectors: params["detectors"]?.map(x => fromUpdateDetectorRequest(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchUpdateDetector",
      requestUri: "/detectors",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "batchUpdateDetectorErrorEntries": [toBatchUpdateDetectorErrorEntry],
      },
    }, await resp.json());
  }

  async describeDetector(
    {abortSignal, ...params}: RequestConfig & s.DescribeDetectorRequest,
  ): Promise<s.DescribeDetectorResponse> {
    const query = new URLSearchParams;
    if (params["keyValue"] != null) query.set("keyValue", params["keyValue"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeDetector",
      method: "GET",
      requestUri: cmnP.encodePath`/detectors/${params["detectorModelName"]}/keyValues/`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "detector": toDetector,
      },
    }, await resp.json());
  }

  async listDetectors(
    {abortSignal, ...params}: RequestConfig & s.ListDetectorsRequest,
  ): Promise<s.ListDetectorsResponse> {
    const query = new URLSearchParams;
    if (params["stateName"] != null) query.set("stateName", params["stateName"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListDetectors",
      method: "GET",
      requestUri: cmnP.encodePath`/detectors/${params["detectorModelName"]}`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "detectorSummaries": [toDetectorSummary],
        "nextToken": "s",
      },
    }, await resp.json());
  }

}

function fromMessage(input?: s.Message | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    messageId: input["messageId"],
    inputName: input["inputName"],
    payload: serializeBlob(input["payload"]),
  }
}

function fromUpdateDetectorRequest(input?: s.UpdateDetectorRequest | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    messageId: input["messageId"],
    detectorModelName: input["detectorModelName"],
    keyValue: input["keyValue"],
    state: fromDetectorStateDefinition(input["state"]),
  }
}

function fromDetectorStateDefinition(input?: s.DetectorStateDefinition | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    stateName: input["stateName"],
    variables: input["variables"]?.map(x => fromVariableDefinition(x)),
    timers: input["timers"]?.map(x => fromTimerDefinition(x)),
  }
}

function fromVariableDefinition(input?: s.VariableDefinition | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    value: input["value"],
  }
}

function fromTimerDefinition(input?: s.TimerDefinition | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    seconds: input["seconds"],
  }
}

function toBatchPutMessageErrorEntry(root: jsonP.JSONValue): s.BatchPutMessageErrorEntry {
  return jsonP.readObj({
    required: {},
    optional: {
      "messageId": "s",
      "errorCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ErrorCode>(x),
      "errorMessage": "s",
    },
  }, root);
}

function toBatchUpdateDetectorErrorEntry(root: jsonP.JSONValue): s.BatchUpdateDetectorErrorEntry {
  return jsonP.readObj({
    required: {},
    optional: {
      "messageId": "s",
      "errorCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ErrorCode>(x),
      "errorMessage": "s",
    },
  }, root);
}

function toDetector(root: jsonP.JSONValue): s.Detector {
  return jsonP.readObj({
    required: {},
    optional: {
      "detectorModelName": "s",
      "keyValue": "s",
      "detectorModelVersion": "s",
      "state": toDetectorState,
      "creationTime": "d",
      "lastUpdateTime": "d",
    },
  }, root);
}

function toDetectorState(root: jsonP.JSONValue): s.DetectorState {
  return jsonP.readObj({
    required: {
      "stateName": "s",
      "variables": [toVariable],
      "timers": [toTimer],
    },
    optional: {},
  }, root);
}

function toVariable(root: jsonP.JSONValue): s.Variable {
  return jsonP.readObj({
    required: {
      "name": "s",
      "value": "s",
    },
    optional: {},
  }, root);
}

function toTimer(root: jsonP.JSONValue): s.Timer {
  return jsonP.readObj({
    required: {
      "name": "s",
      "timestamp": "d",
    },
    optional: {},
  }, root);
}

function toDetectorSummary(root: jsonP.JSONValue): s.DetectorSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "detectorModelName": "s",
      "keyValue": "s",
      "detectorModelVersion": "s",
      "state": toDetectorStateSummary,
      "creationTime": "d",
      "lastUpdateTime": "d",
    },
  }, root);
}

function toDetectorStateSummary(root: jsonP.JSONValue): s.DetectorStateSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "stateName": "s",
    },
  }, root);
}
