// Autogenerated API structures for: Amazon Pinpoint SMS and Voice Service

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateConfigurationSetRequest {
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition | null;
  EventDestinationName?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}

// refs: 1 - tags: named, input
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}

// refs: 1 - tags: named, input
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}

// refs: 1 - tags: named, input
export interface ListConfigurationSetsRequest {
  NextToken?: string | null;
  PageSize?: string | null;
}

// refs: 1 - tags: named, input
export interface SendVoiceMessageRequest {
  CallerId?: string | null;
  ConfigurationSetName?: string | null;
  Content?: VoiceMessageContent | null;
  DestinationPhoneNumber?: string | null;
  OriginationPhoneNumber?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination?: EventDestinationDefinition | null;
  EventDestinationName: string;
}

// refs: 1 - tags: named, output
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[] | null;
}

// refs: 1 - tags: named, output
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface SendVoiceMessageResponse {
  MessageId?: string | null;
}

// refs: 2 - tags: input, named, interface
export interface EventDestinationDefinition {
  CloudWatchLogsDestination?: CloudWatchLogsDestination | null;
  Enabled?: boolean | null;
  KinesisFirehoseDestination?: KinesisFirehoseDestination | null;
  MatchingEventTypes?: EventType[] | null;
  SnsDestination?: SnsDestination | null;
}

// refs: 3 - tags: input, named, interface, output
export interface CloudWatchLogsDestination {
  IamRoleArn?: string | null;
  LogGroupArn?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface KinesisFirehoseDestination {
  DeliveryStreamArn?: string | null;
  IamRoleArn?: string | null;
}

// refs: 3 - tags: input, named, enum, output
export type EventType =
| "INITIATED_CALL"
| "RINGING"
| "ANSWERED"
| "COMPLETED_CALL"
| "BUSY"
| "FAILED"
| "NO_ANSWER"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface SnsDestination {
  TopicArn?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface VoiceMessageContent {
  CallInstructionsMessage?: CallInstructionsMessageType | null;
  PlainTextMessage?: PlainTextMessageType | null;
  SSMLMessage?: SSMLMessageType | null;
}

// refs: 1 - tags: input, named, interface
export interface CallInstructionsMessageType {
  Text?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface PlainTextMessageType {
  LanguageCode?: string | null;
  Text?: string | null;
  VoiceId?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface SSMLMessageType {
  LanguageCode?: string | null;
  Text?: string | null;
  VoiceId?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface EventDestination {
  CloudWatchLogsDestination?: CloudWatchLogsDestination | null;
  Enabled?: boolean | null;
  KinesisFirehoseDestination?: KinesisFirehoseDestination | null;
  MatchingEventTypes?: EventType[] | null;
  Name?: string | null;
  SnsDestination?: SnsDestination | null;
}
