// Autogenerated API client for: Amazon Lex Runtime Service

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class LexRuntime {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(LexRuntime.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2016-11-28",
    "endpointPrefix": "runtime.lex",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "Amazon Lex Runtime Service",
    "serviceId": "Lex Runtime Service",
    "signatureVersion": "v4",
    "signingName": "lex",
    "uid": "runtime.lex-2016-11-28"
  };

  async deleteSession(
    {abortSignal, ...params}: RequestConfig & DeleteSessionRequest,
  ): Promise<DeleteSessionResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteSession",
      method: "DELETE",
      requestUri: cmnP.encodePath`/bot/${params["botName"]}/alias/${params["botAlias"]}/user/${params["userId"]}/session`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "botName": "s",
          "botAlias": "s",
          "userId": "s",
          "sessionId": "s",
        },
      }, await resp.json()),
  };
  }

  async getSession(
    {abortSignal, ...params}: RequestConfig & GetSessionRequest,
  ): Promise<GetSessionResponse> {
    const query = new URLSearchParams;
    if (params["checkpointLabelFilter"] != null) query.set("checkpointLabelFilter", params["checkpointLabelFilter"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "GetSession",
      method: "GET",
      requestUri: cmnP.encodePath`/bot/${params["botName"]}/alias/${params["botAlias"]}/user/${params["userId"]}/session/`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "recentIntentSummaryView": [toIntentSummary],
          "sessionAttributes": x => jsonP.readMap(String, String, x),
          "sessionId": "s",
          "dialogAction": toDialogAction,
        },
      }, await resp.json()),
  };
  }

  async postContent(
    {abortSignal, ...params}: RequestConfig & PostContentRequest,
  ): Promise<PostContentResponse> {
    const headers = new Headers;
    if (params["sessionAttributes"] != null) headers.append("x-amz-lex-session-attributes", btoa(jsonP.serializeJsonValue(params["sessionAttributes"]) ?? ''));
    if (params["requestAttributes"] != null) headers.append("x-amz-lex-request-attributes", btoa(jsonP.serializeJsonValue(params["requestAttributes"]) ?? ''));
    headers.append("Content-Type", params["contentType"]);
    if (params["accept"] != null) headers.append("Accept", params["accept"]);
    const body = typeof params["inputStream"] === 'string' ? new TextEncoder().encode(params["inputStream"]) : params["inputStream"];
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "PostContent",
      requestUri: cmnP.encodePath`/bot/${params["botName"]}/alias/${params["botAlias"]}/user/${params["userId"]}/content`,
    });
  return {
    contentType: resp.headers.get("Content-Type"),
    intentName: resp.headers.get("x-amz-lex-intent-name"),
    nluIntentConfidence: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-nlu-intent-confidence")),
    alternativeIntents: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-alternative-intents")),
    slots: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-slots")),
    sessionAttributes: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-session-attributes")),
    sentimentResponse: resp.headers.get("x-amz-lex-sentiment"),
    message: resp.headers.get("x-amz-lex-message"),
    messageFormat: cmnP.readEnum<MessageFormatType>(resp.headers.get("x-amz-lex-message-format")),
    dialogState: cmnP.readEnum<DialogState>(resp.headers.get("x-amz-lex-dialog-state")),
    slotToElicit: resp.headers.get("x-amz-lex-slot-to-elicit"),
    inputTranscript: resp.headers.get("x-amz-lex-input-transcript"),
    botVersion: resp.headers.get("x-amz-lex-bot-version"),
    sessionId: resp.headers.get("x-amz-lex-session-id"),
    audioStream: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

  async postText(
    {abortSignal, ...params}: RequestConfig & PostTextRequest,
  ): Promise<PostTextResponse> {
    const body: jsonP.JSONObject = params ? {
      sessionAttributes: params["sessionAttributes"],
      requestAttributes: params["requestAttributes"],
      inputText: params["inputText"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PostText",
      requestUri: cmnP.encodePath`/bot/${params["botName"]}/alias/${params["botAlias"]}/user/${params["userId"]}/text`,
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "intentName": "s",
          "nluIntentConfidence": toIntentConfidence,
          "alternativeIntents": [toPredictedIntent],
          "slots": x => jsonP.readMap(String, String, x),
          "sessionAttributes": x => jsonP.readMap(String, String, x),
          "message": "s",
          "sentimentResponse": toSentimentResponse,
          "messageFormat": (x: jsonP.JSONValue) => cmnP.readEnum<MessageFormatType>(x),
          "dialogState": (x: jsonP.JSONValue) => cmnP.readEnum<DialogState>(x),
          "slotToElicit": "s",
          "responseCard": toResponseCard,
          "sessionId": "s",
          "botVersion": "s",
        },
      }, await resp.json()),
  };
  }

  async putSession(
    {abortSignal, ...params}: RequestConfig & PutSessionRequest,
  ): Promise<PutSessionResponse> {
    const headers = new Headers;
    if (params["accept"] != null) headers.append("Accept", params["accept"]);
    const body: jsonP.JSONObject = params ? {
      sessionAttributes: params["sessionAttributes"],
      dialogAction: fromDialogAction(params["dialogAction"]),
      recentIntentSummaryView: params["recentIntentSummaryView"]?.map(x => fromIntentSummary(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, headers, body,
      action: "PutSession",
      requestUri: cmnP.encodePath`/bot/${params["botName"]}/alias/${params["botAlias"]}/user/${params["userId"]}/session`,
    });
  return {
    contentType: resp.headers.get("Content-Type"),
    intentName: resp.headers.get("x-amz-lex-intent-name"),
    slots: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-slots")),
    sessionAttributes: jsonP.readJsonValueBase64(resp.headers.get("x-amz-lex-session-attributes")),
    message: resp.headers.get("x-amz-lex-message"),
    messageFormat: cmnP.readEnum<MessageFormatType>(resp.headers.get("x-amz-lex-message-format")),
    dialogState: cmnP.readEnum<DialogState>(resp.headers.get("x-amz-lex-dialog-state")),
    slotToElicit: resp.headers.get("x-amz-lex-slot-to-elicit"),
    sessionId: resp.headers.get("x-amz-lex-session-id"),
    audioStream: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

}

// refs: 1 - tags: named, input
export interface DeleteSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
}

// refs: 1 - tags: named, input
export interface GetSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
  checkpointLabelFilter?: string | null;
}

// refs: 1 - tags: named, input
export interface PostContentRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: jsonP.JSONValue | null;
  requestAttributes?: jsonP.JSONValue | null;
  contentType: string;
  accept?: string | null;
  inputStream: Uint8Array | string;
}

// refs: 1 - tags: named, input
export interface PostTextRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: { [key: string]: string | null | undefined } | null;
  requestAttributes?: { [key: string]: string | null | undefined } | null;
  inputText: string;
}

// refs: 1 - tags: named, input
export interface PutSessionRequest {
  botName: string;
  botAlias: string;
  userId: string;
  sessionAttributes?: { [key: string]: string | null | undefined } | null;
  dialogAction?: DialogAction | null;
  recentIntentSummaryView?: IntentSummary[] | null;
  accept?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteSessionResponse {
  botName?: string | null;
  botAlias?: string | null;
  userId?: string | null;
  sessionId?: string | null;
}

// refs: 1 - tags: named, output
export interface GetSessionResponse {
  recentIntentSummaryView?: IntentSummary[] | null;
  sessionAttributes?: { [key: string]: string | null | undefined } | null;
  sessionId?: string | null;
  dialogAction?: DialogAction | null;
}

// refs: 1 - tags: named, output
export interface PostContentResponse {
  contentType?: string | null;
  intentName?: string | null;
  nluIntentConfidence?: jsonP.JSONValue | null;
  alternativeIntents?: jsonP.JSONValue | null;
  slots?: jsonP.JSONValue | null;
  sessionAttributes?: jsonP.JSONValue | null;
  sentimentResponse?: string | null;
  message?: string | null;
  messageFormat?: MessageFormatType | null;
  dialogState?: DialogState | null;
  slotToElicit?: string | null;
  inputTranscript?: string | null;
  audioStream?: Uint8Array | string | null;
  botVersion?: string | null;
  sessionId?: string | null;
}

// refs: 1 - tags: named, output
export interface PostTextResponse {
  intentName?: string | null;
  nluIntentConfidence?: IntentConfidence | null;
  alternativeIntents?: PredictedIntent[] | null;
  slots?: { [key: string]: string | null | undefined } | null;
  sessionAttributes?: { [key: string]: string | null | undefined } | null;
  message?: string | null;
  sentimentResponse?: SentimentResponse | null;
  messageFormat?: MessageFormatType | null;
  dialogState?: DialogState | null;
  slotToElicit?: string | null;
  responseCard?: ResponseCard | null;
  sessionId?: string | null;
  botVersion?: string | null;
}

// refs: 1 - tags: named, output
export interface PutSessionResponse {
  contentType?: string | null;
  intentName?: string | null;
  slots?: jsonP.JSONValue | null;
  sessionAttributes?: jsonP.JSONValue | null;
  message?: string | null;
  messageFormat?: MessageFormatType | null;
  dialogState?: DialogState | null;
  slotToElicit?: string | null;
  audioStream?: Uint8Array | string | null;
  sessionId?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface DialogAction {
  type: DialogActionType;
  intentName?: string | null;
  slots?: { [key: string]: string | null | undefined } | null;
  slotToElicit?: string | null;
  fulfillmentState?: FulfillmentState | null;
  message?: string | null;
  messageFormat?: MessageFormatType | null;
}
function fromDialogAction(input?: DialogAction | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    type: input["type"],
    intentName: input["intentName"],
    slots: input["slots"],
    slotToElicit: input["slotToElicit"],
    fulfillmentState: input["fulfillmentState"],
    message: input["message"],
    messageFormat: input["messageFormat"],
  }
}
function toDialogAction(root: jsonP.JSONValue): DialogAction {
  return jsonP.readObj({
    required: {
      "type": (x: jsonP.JSONValue) => cmnP.readEnum<DialogActionType>(x),
    },
    optional: {
      "intentName": "s",
      "slots": x => jsonP.readMap(String, String, x),
      "slotToElicit": "s",
      "fulfillmentState": (x: jsonP.JSONValue) => cmnP.readEnum<FulfillmentState>(x),
      "message": "s",
      "messageFormat": (x: jsonP.JSONValue) => cmnP.readEnum<MessageFormatType>(x),
    },
  }, root);
}

// refs: 4 - tags: input, named, enum, output
export type DialogActionType =
| "ElicitIntent"
| "ConfirmIntent"
| "ElicitSlot"
| "Close"
| "Delegate"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, enum, output
export type FulfillmentState =
| "Fulfilled"
| "Failed"
| "ReadyForFulfillment"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type MessageFormatType =
| "PlainText"
| "CustomPayload"
| "SSML"
| "Composite"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface IntentSummary {
  intentName?: string | null;
  checkpointLabel?: string | null;
  slots?: { [key: string]: string | null | undefined } | null;
  confirmationStatus?: ConfirmationStatus | null;
  dialogActionType: DialogActionType;
  fulfillmentState?: FulfillmentState | null;
  slotToElicit?: string | null;
}
function fromIntentSummary(input?: IntentSummary | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    intentName: input["intentName"],
    checkpointLabel: input["checkpointLabel"],
    slots: input["slots"],
    confirmationStatus: input["confirmationStatus"],
    dialogActionType: input["dialogActionType"],
    fulfillmentState: input["fulfillmentState"],
    slotToElicit: input["slotToElicit"],
  }
}
function toIntentSummary(root: jsonP.JSONValue): IntentSummary {
  return jsonP.readObj({
    required: {
      "dialogActionType": (x: jsonP.JSONValue) => cmnP.readEnum<DialogActionType>(x),
    },
    optional: {
      "intentName": "s",
      "checkpointLabel": "s",
      "slots": x => jsonP.readMap(String, String, x),
      "confirmationStatus": (x: jsonP.JSONValue) => cmnP.readEnum<ConfirmationStatus>(x),
      "fulfillmentState": (x: jsonP.JSONValue) => cmnP.readEnum<FulfillmentState>(x),
      "slotToElicit": "s",
    },
  }, root);
}

// refs: 2 - tags: input, named, enum, output
export type ConfirmationStatus =
| "None"
| "Confirmed"
| "Denied"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, enum
export type DialogState =
| "ElicitIntent"
| "ConfirmIntent"
| "ElicitSlot"
| "Fulfilled"
| "ReadyForFulfillment"
| "Failed"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface IntentConfidence {
  score?: number | null;
}
function toIntentConfidence(root: jsonP.JSONValue): IntentConfidence {
  return jsonP.readObj({
    required: {},
    optional: {
      "score": "n",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface PredictedIntent {
  intentName?: string | null;
  nluIntentConfidence?: IntentConfidence | null;
  slots?: { [key: string]: string | null | undefined } | null;
}
function toPredictedIntent(root: jsonP.JSONValue): PredictedIntent {
  return jsonP.readObj({
    required: {},
    optional: {
      "intentName": "s",
      "nluIntentConfidence": toIntentConfidence,
      "slots": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SentimentResponse {
  sentimentLabel?: string | null;
  sentimentScore?: string | null;
}
function toSentimentResponse(root: jsonP.JSONValue): SentimentResponse {
  return jsonP.readObj({
    required: {},
    optional: {
      "sentimentLabel": "s",
      "sentimentScore": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ResponseCard {
  version?: string | null;
  contentType?: ContentType | null;
  genericAttachments?: GenericAttachment[] | null;
}
function toResponseCard(root: jsonP.JSONValue): ResponseCard {
  return jsonP.readObj({
    required: {},
    optional: {
      "version": "s",
      "contentType": (x: jsonP.JSONValue) => cmnP.readEnum<ContentType>(x),
      "genericAttachments": [toGenericAttachment],
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type ContentType =
| "application/vnd.amazonaws.card.generic"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface GenericAttachment {
  title?: string | null;
  subTitle?: string | null;
  attachmentLinkUrl?: string | null;
  imageUrl?: string | null;
  buttons?: Button[] | null;
}
function toGenericAttachment(root: jsonP.JSONValue): GenericAttachment {
  return jsonP.readObj({
    required: {},
    optional: {
      "title": "s",
      "subTitle": "s",
      "attachmentLinkUrl": "s",
      "imageUrl": "s",
      "buttons": [toButton],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface Button {
  text: string;
  value: string;
}
function toButton(root: jsonP.JSONValue): Button {
  return jsonP.readObj({
    required: {
      "text": "s",
      "value": "s",
    },
    optional: {},
  }, root);
}
