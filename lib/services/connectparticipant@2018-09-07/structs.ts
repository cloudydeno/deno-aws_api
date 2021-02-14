// Autogenerated API structures for: Amazon Connect Participant Service

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CompleteAttachmentUploadRequest {
  AttachmentIds: string[];
  ClientToken: string;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface CreateParticipantConnectionRequest {
  Type: ConnectionType[];
  ParticipantToken: string;
}

// refs: 1 - tags: named, input
export interface DisconnectParticipantRequest {
  ClientToken?: string | null;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface GetAttachmentRequest {
  AttachmentId: string;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface GetTranscriptRequest {
  ContactId?: string | null;
  MaxResults?: number | null;
  NextToken?: string | null;
  ScanDirection?: ScanDirection | null;
  SortOrder?: SortKey | null;
  StartPosition?: StartPosition | null;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface SendEventRequest {
  ContentType: string;
  Content?: string | null;
  ClientToken?: string | null;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface SendMessageRequest {
  ContentType: string;
  Content: string;
  ClientToken?: string | null;
  ConnectionToken: string;
}

// refs: 1 - tags: named, input
export interface StartAttachmentUploadRequest {
  ContentType: string;
  AttachmentSizeInBytes: number;
  AttachmentName: string;
  ClientToken: string;
  ConnectionToken: string;
}

// refs: 1 - tags: named, output
export interface CompleteAttachmentUploadResponse {
}

// refs: 1 - tags: named, output
export interface CreateParticipantConnectionResponse {
  Websocket?: Websocket | null;
  ConnectionCredentials?: ConnectionCredentials | null;
}

// refs: 1 - tags: named, output
export interface DisconnectParticipantResponse {
}

// refs: 1 - tags: named, output
export interface GetAttachmentResponse {
  Url?: string | null;
  UrlExpiry?: string | null;
}

// refs: 1 - tags: named, output
export interface GetTranscriptResponse {
  InitialContactId?: string | null;
  Transcript?: Item[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface SendEventResponse {
  Id?: string | null;
  AbsoluteTime?: string | null;
}

// refs: 1 - tags: named, output
export interface SendMessageResponse {
  Id?: string | null;
  AbsoluteTime?: string | null;
}

// refs: 1 - tags: named, output
export interface StartAttachmentUploadResponse {
  AttachmentId?: string | null;
  UploadMetadata?: UploadMetadata | null;
}

// refs: 1 - tags: input, named, enum
export type ConnectionType =
| "WEBSOCKET"
| "CONNECTION_CREDENTIALS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type ScanDirection =
| "FORWARD"
| "BACKWARD"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type SortKey =
| "DESCENDING"
| "ASCENDING"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface StartPosition {
  Id?: string | null;
  AbsoluteTime?: string | null;
  MostRecent?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface Websocket {
  Url?: string | null;
  ConnectionExpiry?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ConnectionCredentials {
  ConnectionToken?: string | null;
  Expiry?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface Item {
  AbsoluteTime?: string | null;
  Content?: string | null;
  ContentType?: string | null;
  Id?: string | null;
  Type?: ChatItemType | null;
  ParticipantId?: string | null;
  DisplayName?: string | null;
  ParticipantRole?: ParticipantRole | null;
  Attachments?: AttachmentItem[] | null;
}

// refs: 1 - tags: output, named, enum
export type ChatItemType =
| "TYPING"
| "PARTICIPANT_JOINED"
| "PARTICIPANT_LEFT"
| "CHAT_ENDED"
| "TRANSFER_SUCCEEDED"
| "TRANSFER_FAILED"
| "MESSAGE"
| "EVENT"
| "ATTACHMENT"
| "CONNECTION_ACK"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, enum
export type ParticipantRole =
| "AGENT"
| "CUSTOMER"
| "SYSTEM"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface AttachmentItem {
  ContentType?: string | null;
  AttachmentId?: string | null;
  AttachmentName?: string | null;
  Status?: ArtifactStatus | null;
}

// refs: 1 - tags: output, named, enum
export type ArtifactStatus =
| "APPROVED"
| "REJECTED"
| "IN_PROGRESS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface UploadMetadata {
  Url?: string | null;
  UrlExpiry?: string | null;
  HeadersToInclude?: { [key: string]: string | null | undefined } | null;
}