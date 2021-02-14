// Autogenerated API structures for: AWS IoT 1-Click Devices Service

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface ClaimDevicesByClaimCodeRequest {
  ClaimCode: string;
}

// refs: 1 - tags: named, input
export interface DescribeDeviceRequest {
  DeviceId: string;
}

// refs: 1 - tags: named, input
export interface FinalizeDeviceClaimRequest {
  DeviceId: string;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface GetDeviceMethodsRequest {
  DeviceId: string;
}

// refs: 1 - tags: named, input
export interface InitiateDeviceClaimRequest {
  DeviceId: string;
}

// refs: 1 - tags: named, input
export interface InvokeDeviceMethodRequest {
  DeviceId: string;
  DeviceMethod?: DeviceMethod | null;
  DeviceMethodParameters?: string | null;
}

// refs: 1 - tags: named, input
export interface ListDeviceEventsRequest {
  DeviceId: string;
  FromTimeStamp: Date | number;
  MaxResults?: number | null;
  NextToken?: string | null;
  ToTimeStamp: Date | number;
}

// refs: 1 - tags: named, input
export interface ListDevicesRequest {
  DeviceType?: string | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UnclaimDeviceRequest {
  DeviceId: string;
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateDeviceStateRequest {
  DeviceId: string;
  Enabled?: boolean | null;
}

// refs: 1 - tags: named, output
export interface ClaimDevicesByClaimCodeResponse {
  ClaimCode?: string | null;
  Total?: number | null;
}

// refs: 1 - tags: named, output
export interface DescribeDeviceResponse {
  DeviceDescription?: DeviceDescription | null;
}

// refs: 1 - tags: named, output
export interface FinalizeDeviceClaimResponse {
  State?: string | null;
}

// refs: 1 - tags: named, output
export interface GetDeviceMethodsResponse {
  DeviceMethods?: DeviceMethod[] | null;
}

// refs: 1 - tags: named, output
export interface InitiateDeviceClaimResponse {
  State?: string | null;
}

// refs: 1 - tags: named, output
export interface InvokeDeviceMethodResponse {
  DeviceMethodResponse?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDeviceEventsResponse {
  Events?: DeviceEvent[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDevicesResponse {
  Devices?: DeviceDescription[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UnclaimDeviceResponse {
  State?: string | null;
}

// refs: 1 - tags: named, output
export interface UpdateDeviceStateResponse {
}

// refs: 2 - tags: input, named, interface, output
export interface DeviceMethod {
  DeviceType?: string | null;
  MethodName?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface DeviceDescription {
  Arn?: string | null;
  Attributes?: { [key: string]: string | null | undefined } | null;
  DeviceId?: string | null;
  Enabled?: boolean | null;
  RemainingLife?: number | null;
  Type?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface DeviceEvent {
  Device?: Device | null;
  StdEvent?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface Device {
  Attributes?: Attributes | null;
  DeviceId?: string | null;
  Type?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface Attributes {
}