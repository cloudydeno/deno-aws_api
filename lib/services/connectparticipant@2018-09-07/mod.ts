// Autogenerated API client for: Amazon Connect Participant Service

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import * as uuidv4 from "https://deno.land/std@0.86.0/uuid/v4.ts";
import type * as s from "./structs.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class ConnectParticipant {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ConnectParticipant.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2018-09-07",
    "endpointPrefix": "participant.connect",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "Amazon Connect Participant",
    "serviceFullName": "Amazon Connect Participant Service",
    "serviceId": "ConnectParticipant",
    "signatureVersion": "v4",
    "signingName": "execute-api",
    "uid": "connectparticipant-2018-09-07"
  };

  async completeAttachmentUpload(
    {abortSignal, ...params}: RequestConfig & s.CompleteAttachmentUploadRequest,
  ): Promise<s.CompleteAttachmentUploadResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      AttachmentIds: params["AttachmentIds"],
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "CompleteAttachmentUpload",
      requestUri: "/participant/complete-attachment-upload",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async createParticipantConnection(
    {abortSignal, ...params}: RequestConfig & s.CreateParticipantConnectionRequest,
  ): Promise<s.CreateParticipantConnectionResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      Type: params["Type"],
    };
    headers.append("X-Amz-Bearer", params["ParticipantToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "CreateParticipantConnection",
      requestUri: "/participant/connection",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Websocket": toWebsocket,
        "ConnectionCredentials": toConnectionCredentials,
      },
    }, await resp.json());
  }

  async disconnectParticipant(
    {abortSignal, ...params}: RequestConfig & s.DisconnectParticipantRequest,
  ): Promise<s.DisconnectParticipantResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "DisconnectParticipant",
      requestUri: "/participant/disconnect",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async getAttachment(
    {abortSignal, ...params}: RequestConfig & s.GetAttachmentRequest,
  ): Promise<s.GetAttachmentResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      AttachmentId: params["AttachmentId"],
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "GetAttachment",
      requestUri: "/participant/attachment",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Url": "s",
        "UrlExpiry": "s",
      },
    }, await resp.json());
  }

  async getTranscript(
    {abortSignal, ...params}: RequestConfig & s.GetTranscriptRequest,
  ): Promise<s.GetTranscriptResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      ContactId: params["ContactId"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
      ScanDirection: params["ScanDirection"],
      SortOrder: params["SortOrder"],
      StartPosition: fromStartPosition(params["StartPosition"]),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "GetTranscript",
      requestUri: "/participant/transcript",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "InitialContactId": "s",
        "Transcript": [toItem],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async sendEvent(
    {abortSignal, ...params}: RequestConfig & s.SendEventRequest,
  ): Promise<s.SendEventResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      ContentType: params["ContentType"],
      Content: params["Content"],
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "SendEvent",
      requestUri: "/participant/event",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Id": "s",
        "AbsoluteTime": "s",
      },
    }, await resp.json());
  }

  async sendMessage(
    {abortSignal, ...params}: RequestConfig & s.SendMessageRequest,
  ): Promise<s.SendMessageResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      ContentType: params["ContentType"],
      Content: params["Content"],
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "SendMessage",
      requestUri: "/participant/message",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Id": "s",
        "AbsoluteTime": "s",
      },
    }, await resp.json());
  }

  async startAttachmentUpload(
    {abortSignal, ...params}: RequestConfig & s.StartAttachmentUploadRequest,
  ): Promise<s.StartAttachmentUploadResponse> {
    const headers = new Headers;
    const body: jsonP.JSONObject = {
      ContentType: params["ContentType"],
      AttachmentSizeInBytes: params["AttachmentSizeInBytes"],
      AttachmentName: params["AttachmentName"],
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
    };
    headers.append("X-Amz-Bearer", params["ConnectionToken"]);
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "StartAttachmentUpload",
      requestUri: "/participant/start-attachment-upload",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AttachmentId": "s",
        "UploadMetadata": toUploadMetadata,
      },
    }, await resp.json());
  }

}

function fromStartPosition(input?: s.StartPosition | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Id: input["Id"],
    AbsoluteTime: input["AbsoluteTime"],
    MostRecent: input["MostRecent"],
  }
}

function toWebsocket(root: jsonP.JSONValue): s.Websocket {
  return jsonP.readObj({
    required: {},
    optional: {
      "Url": "s",
      "ConnectionExpiry": "s",
    },
  }, root);
}

function toConnectionCredentials(root: jsonP.JSONValue): s.ConnectionCredentials {
  return jsonP.readObj({
    required: {},
    optional: {
      "ConnectionToken": "s",
      "Expiry": "s",
    },
  }, root);
}

function toItem(root: jsonP.JSONValue): s.Item {
  return jsonP.readObj({
    required: {},
    optional: {
      "AbsoluteTime": "s",
      "Content": "s",
      "ContentType": "s",
      "Id": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.ChatItemType>(x),
      "ParticipantId": "s",
      "DisplayName": "s",
      "ParticipantRole": (x: jsonP.JSONValue) => cmnP.readEnum<s.ParticipantRole>(x),
      "Attachments": [toAttachmentItem],
    },
  }, root);
}

function toAttachmentItem(root: jsonP.JSONValue): s.AttachmentItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "ContentType": "s",
      "AttachmentId": "s",
      "AttachmentName": "s",
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.ArtifactStatus>(x),
    },
  }, root);
}

function toUploadMetadata(root: jsonP.JSONValue): s.UploadMetadata {
  return jsonP.readObj({
    required: {},
    optional: {
      "Url": "s",
      "UrlExpiry": "s",
      "HeadersToInclude": x => jsonP.readMap(String, String, x),
    },
  }, root);
}
