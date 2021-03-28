// Autogenerated API structures for: Amazon Kinesis Video Streams

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateSignalingChannelInput {
  ChannelName: string;
  ChannelType?: ChannelType | null;
  SingleMasterConfiguration?: SingleMasterConfiguration | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateStreamInput {
  DeviceName?: string | null;
  StreamName: string;
  MediaType?: string | null;
  KmsKeyId?: string | null;
  DataRetentionInHours?: number | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface DeleteSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteStreamInput {
  StreamARN: string;
  CurrentVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeSignalingChannelInput {
  ChannelName?: string | null;
  ChannelARN?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeStreamInput {
  StreamName?: string | null;
  StreamARN?: string | null;
}

// refs: 1 - tags: named, input
export interface GetDataEndpointInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  APIName: APIName;
}

// refs: 1 - tags: named, input
export interface GetSignalingChannelEndpointInput {
  ChannelARN: string;
  SingleMasterChannelEndpointConfiguration?: SingleMasterChannelEndpointConfiguration | null;
}

// refs: 1 - tags: named, input
export interface ListSignalingChannelsInput {
  MaxResults?: number | null;
  NextToken?: string | null;
  ChannelNameCondition?: ChannelNameCondition | null;
}

// refs: 1 - tags: named, input
export interface ListStreamsInput {
  MaxResults?: number | null;
  NextToken?: string | null;
  StreamNameCondition?: StreamNameCondition | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceInput {
  NextToken?: string | null;
  ResourceARN: string;
}

// refs: 1 - tags: named, input
export interface ListTagsForStreamInput {
  NextToken?: string | null;
  StreamARN?: string | null;
  StreamName?: string | null;
}

// refs: 1 - tags: named, input
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface TagStreamInput {
  StreamARN?: string | null;
  StreamName?: string | null;
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeyList: string[];
}

// refs: 1 - tags: named, input
export interface UntagStreamInput {
  StreamARN?: string | null;
  StreamName?: string | null;
  TagKeyList: string[];
}

// refs: 1 - tags: named, input
export interface UpdateDataRetentionInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  CurrentVersion: string;
  Operation: UpdateDataRetentionOperation;
  DataRetentionChangeInHours: number;
}

// refs: 1 - tags: named, input
export interface UpdateSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion: string;
  SingleMasterConfiguration?: SingleMasterConfiguration | null;
}

// refs: 1 - tags: named, input
export interface UpdateStreamInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  CurrentVersion: string;
  DeviceName?: string | null;
  MediaType?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateSignalingChannelOutput {
  ChannelARN?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateStreamOutput {
  StreamARN?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeSignalingChannelOutput {
  ChannelInfo?: ChannelInfo | null;
}

// refs: 1 - tags: named, output
export interface DescribeStreamOutput {
  StreamInfo?: StreamInfo | null;
}

// refs: 1 - tags: named, output
export interface GetDataEndpointOutput {
  DataEndpoint?: string | null;
}

// refs: 1 - tags: named, output
export interface GetSignalingChannelEndpointOutput {
  ResourceEndpointList?: ResourceEndpointListItem[] | null;
}

// refs: 1 - tags: named, output
export interface ListSignalingChannelsOutput {
  ChannelInfoList?: ChannelInfo[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListStreamsOutput {
  StreamInfoList?: StreamInfo[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceOutput {
  NextToken?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForStreamOutput {
  NextToken?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 3 - tags: input, named, enum, output
export type ChannelType =
| "SINGLE_MASTER"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface SingleMasterConfiguration {
  MessageTtlSeconds?: number | null;
}

// refs: 2 - tags: input, named, interface
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 1 - tags: input, named, enum
export type APIName =
| "PUT_MEDIA"
| "GET_MEDIA"
| "LIST_FRAGMENTS"
| "GET_MEDIA_FOR_FRAGMENT_LIST"
| "GET_HLS_STREAMING_SESSION_URL"
| "GET_DASH_STREAMING_SESSION_URL"
| "GET_CLIP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface SingleMasterChannelEndpointConfiguration {
  Protocols?: ChannelProtocol[] | null;
  Role?: ChannelRole | null;
}

// refs: 2 - tags: input, named, enum, output
export type ChannelProtocol =
| "WSS"
| "HTTPS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type ChannelRole =
| "MASTER"
| "VIEWER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ChannelNameCondition {
  ComparisonOperator?: ComparisonOperator | null;
  ComparisonValue?: string | null;
}

// refs: 2 - tags: input, named, enum
export type ComparisonOperator =
| "BEGINS_WITH"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface StreamNameCondition {
  ComparisonOperator?: ComparisonOperator | null;
  ComparisonValue?: string | null;
}

// refs: 1 - tags: input, named, enum
export type UpdateDataRetentionOperation =
| "INCREASE_DATA_RETENTION"
| "DECREASE_DATA_RETENTION"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface ChannelInfo {
  ChannelName?: string | null;
  ChannelARN?: string | null;
  ChannelType?: ChannelType | null;
  ChannelStatus?: Status | null;
  CreationTime?: Date | number | null;
  SingleMasterConfiguration?: SingleMasterConfiguration | null;
  Version?: string | null;
}

// refs: 4 - tags: output, named, enum
export type Status =
| "CREATING"
| "ACTIVE"
| "UPDATING"
| "DELETING"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface StreamInfo {
  DeviceName?: string | null;
  StreamName?: string | null;
  StreamARN?: string | null;
  MediaType?: string | null;
  KmsKeyId?: string | null;
  Version?: string | null;
  Status?: Status | null;
  CreationTime?: Date | number | null;
  DataRetentionInHours?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface ResourceEndpointListItem {
  Protocol?: ChannelProtocol | null;
  ResourceEndpoint?: string | null;
}
