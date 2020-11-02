// Autogenerated API client for: Amazon Kinesis Video Streams Archived Media

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class KinesisVideoArchivedMedia {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(KinesisVideoArchivedMedia.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-09-30",
    "endpointPrefix": "kinesisvideo",
    "protocol": "rest-json",
    "serviceAbbreviation": "Kinesis Video Archived Media",
    "serviceFullName": "Amazon Kinesis Video Streams Archived Media",
    "serviceId": "Kinesis Video Archived Media",
    "signatureVersion": "v4",
    "uid": "kinesis-video-archived-media-2017-09-30"
  };

  async getClip(
    {abortSignal, ...params}: RequestConfig & GetClipInput,
  ): Promise<GetClipOutput> {
    const body: jsonP.JSONObject = params ? {
      StreamName: params["StreamName"],
      StreamARN: params["StreamARN"],
      ClipFragmentSelector: fromClipFragmentSelector(params["ClipFragmentSelector"]),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetClip",
      requestUri: "/getClip",
    });
  return {
    ContentType: resp.headers.get("Content-Type"),
    Payload: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

  async getDASHStreamingSessionURL(
    {abortSignal, ...params}: RequestConfig & GetDASHStreamingSessionURLInput = {},
  ): Promise<GetDASHStreamingSessionURLOutput> {
    const body: jsonP.JSONObject = params ? {
      StreamName: params["StreamName"],
      StreamARN: params["StreamARN"],
      PlaybackMode: params["PlaybackMode"],
      DisplayFragmentTimestamp: params["DisplayFragmentTimestamp"],
      DisplayFragmentNumber: params["DisplayFragmentNumber"],
      DASHFragmentSelector: fromDASHFragmentSelector(params["DASHFragmentSelector"]),
      Expires: params["Expires"],
      MaxManifestFragmentResults: params["MaxManifestFragmentResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetDASHStreamingSessionURL",
      requestUri: "/getDASHStreamingSessionURL",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "DASHStreamingSessionURL": "s",
        },
      }, await resp.json()),
  };
  }

  async getHLSStreamingSessionURL(
    {abortSignal, ...params}: RequestConfig & GetHLSStreamingSessionURLInput = {},
  ): Promise<GetHLSStreamingSessionURLOutput> {
    const body: jsonP.JSONObject = params ? {
      StreamName: params["StreamName"],
      StreamARN: params["StreamARN"],
      PlaybackMode: params["PlaybackMode"],
      HLSFragmentSelector: fromHLSFragmentSelector(params["HLSFragmentSelector"]),
      ContainerFormat: params["ContainerFormat"],
      DiscontinuityMode: params["DiscontinuityMode"],
      DisplayFragmentTimestamp: params["DisplayFragmentTimestamp"],
      Expires: params["Expires"],
      MaxMediaPlaylistFragmentResults: params["MaxMediaPlaylistFragmentResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetHLSStreamingSessionURL",
      requestUri: "/getHLSStreamingSessionURL",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "HLSStreamingSessionURL": "s",
        },
      }, await resp.json()),
  };
  }

  async getMediaForFragmentList(
    {abortSignal, ...params}: RequestConfig & GetMediaForFragmentListInput,
  ): Promise<GetMediaForFragmentListOutput> {
    const body: jsonP.JSONObject = params ? {
      StreamName: params["StreamName"],
      Fragments: params["Fragments"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetMediaForFragmentList",
      requestUri: "/getMediaForFragmentList",
    });
  return {
    ContentType: resp.headers.get("Content-Type"),
    Payload: await resp.text(), // TODO: maybe allow proper body streaming,
  };
  }

  async listFragments(
    {abortSignal, ...params}: RequestConfig & ListFragmentsInput,
  ): Promise<ListFragmentsOutput> {
    const body: jsonP.JSONObject = params ? {
      StreamName: params["StreamName"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
      FragmentSelector: fromFragmentSelector(params["FragmentSelector"]),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListFragments",
      requestUri: "/listFragments",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Fragments": [toFragment],
          "NextToken": "s",
        },
      }, await resp.json()),
  };
  }

}

// refs: 1 - tags: named, input
export interface GetClipInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  ClipFragmentSelector: ClipFragmentSelector;
}

// refs: 1 - tags: named, input
export interface GetDASHStreamingSessionURLInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  PlaybackMode?: DASHPlaybackMode | null;
  DisplayFragmentTimestamp?: DASHDisplayFragmentTimestamp | null;
  DisplayFragmentNumber?: DASHDisplayFragmentNumber | null;
  DASHFragmentSelector?: DASHFragmentSelector | null;
  Expires?: number | null;
  MaxManifestFragmentResults?: number | null;
}

// refs: 1 - tags: named, input
export interface GetHLSStreamingSessionURLInput {
  StreamName?: string | null;
  StreamARN?: string | null;
  PlaybackMode?: HLSPlaybackMode | null;
  HLSFragmentSelector?: HLSFragmentSelector | null;
  ContainerFormat?: ContainerFormat | null;
  DiscontinuityMode?: HLSDiscontinuityMode | null;
  DisplayFragmentTimestamp?: HLSDisplayFragmentTimestamp | null;
  Expires?: number | null;
  MaxMediaPlaylistFragmentResults?: number | null;
}

// refs: 1 - tags: named, input
export interface GetMediaForFragmentListInput {
  StreamName: string;
  Fragments: string[];
}

// refs: 1 - tags: named, input
export interface ListFragmentsInput {
  StreamName: string;
  MaxResults?: number | null;
  NextToken?: string | null;
  FragmentSelector?: FragmentSelector | null;
}

// refs: 1 - tags: named, output
export interface GetClipOutput {
  ContentType?: string | null;
  Payload?: Uint8Array | string | null;
}

// refs: 1 - tags: named, output
export interface GetDASHStreamingSessionURLOutput {
  DASHStreamingSessionURL?: string | null;
}

// refs: 1 - tags: named, output
export interface GetHLSStreamingSessionURLOutput {
  HLSStreamingSessionURL?: string | null;
}

// refs: 1 - tags: named, output
export interface GetMediaForFragmentListOutput {
  ContentType?: string | null;
  Payload?: Uint8Array | string | null;
}

// refs: 1 - tags: named, output
export interface ListFragmentsOutput {
  Fragments?: Fragment[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface ClipFragmentSelector {
  FragmentSelectorType: ClipFragmentSelectorType;
  TimestampRange: ClipTimestampRange;
}
function fromClipFragmentSelector(input?: ClipFragmentSelector | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    FragmentSelectorType: input["FragmentSelectorType"],
    TimestampRange: fromClipTimestampRange(input["TimestampRange"]),
  }
}

// refs: 1 - tags: input, named, enum
export type ClipFragmentSelectorType =
| "PRODUCER_TIMESTAMP"
| "SERVER_TIMESTAMP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ClipTimestampRange {
  StartTimestamp: Date | number;
  EndTimestamp: Date | number;
}
function fromClipTimestampRange(input?: ClipTimestampRange | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    StartTimestamp: jsonP.serializeDate_unixTimestamp(input["StartTimestamp"]),
    EndTimestamp: jsonP.serializeDate_unixTimestamp(input["EndTimestamp"]),
  }
}

// refs: 1 - tags: input, named, enum
export type DASHPlaybackMode =
| "LIVE"
| "LIVE_REPLAY"
| "ON_DEMAND"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type DASHDisplayFragmentTimestamp =
| "ALWAYS"
| "NEVER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type DASHDisplayFragmentNumber =
| "ALWAYS"
| "NEVER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DASHFragmentSelector {
  FragmentSelectorType?: DASHFragmentSelectorType | null;
  TimestampRange?: DASHTimestampRange | null;
}
function fromDASHFragmentSelector(input?: DASHFragmentSelector | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    FragmentSelectorType: input["FragmentSelectorType"],
    TimestampRange: fromDASHTimestampRange(input["TimestampRange"]),
  }
}

// refs: 1 - tags: input, named, enum
export type DASHFragmentSelectorType =
| "PRODUCER_TIMESTAMP"
| "SERVER_TIMESTAMP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DASHTimestampRange {
  StartTimestamp?: Date | number | null;
  EndTimestamp?: Date | number | null;
}
function fromDASHTimestampRange(input?: DASHTimestampRange | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    StartTimestamp: jsonP.serializeDate_unixTimestamp(input["StartTimestamp"]),
    EndTimestamp: jsonP.serializeDate_unixTimestamp(input["EndTimestamp"]),
  }
}

// refs: 1 - tags: input, named, enum
export type HLSPlaybackMode =
| "LIVE"
| "LIVE_REPLAY"
| "ON_DEMAND"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface HLSFragmentSelector {
  FragmentSelectorType?: HLSFragmentSelectorType | null;
  TimestampRange?: HLSTimestampRange | null;
}
function fromHLSFragmentSelector(input?: HLSFragmentSelector | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    FragmentSelectorType: input["FragmentSelectorType"],
    TimestampRange: fromHLSTimestampRange(input["TimestampRange"]),
  }
}

// refs: 1 - tags: input, named, enum
export type HLSFragmentSelectorType =
| "PRODUCER_TIMESTAMP"
| "SERVER_TIMESTAMP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface HLSTimestampRange {
  StartTimestamp?: Date | number | null;
  EndTimestamp?: Date | number | null;
}
function fromHLSTimestampRange(input?: HLSTimestampRange | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    StartTimestamp: jsonP.serializeDate_unixTimestamp(input["StartTimestamp"]),
    EndTimestamp: jsonP.serializeDate_unixTimestamp(input["EndTimestamp"]),
  }
}

// refs: 1 - tags: input, named, enum
export type ContainerFormat =
| "FRAGMENTED_MP4"
| "MPEG_TS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type HLSDiscontinuityMode =
| "ALWAYS"
| "NEVER"
| "ON_DISCONTINUITY"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type HLSDisplayFragmentTimestamp =
| "ALWAYS"
| "NEVER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface FragmentSelector {
  FragmentSelectorType: FragmentSelectorType;
  TimestampRange: TimestampRange;
}
function fromFragmentSelector(input?: FragmentSelector | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    FragmentSelectorType: input["FragmentSelectorType"],
    TimestampRange: fromTimestampRange(input["TimestampRange"]),
  }
}

// refs: 1 - tags: input, named, enum
export type FragmentSelectorType =
| "PRODUCER_TIMESTAMP"
| "SERVER_TIMESTAMP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface TimestampRange {
  StartTimestamp: Date | number;
  EndTimestamp: Date | number;
}
function fromTimestampRange(input?: TimestampRange | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    StartTimestamp: jsonP.serializeDate_unixTimestamp(input["StartTimestamp"]),
    EndTimestamp: jsonP.serializeDate_unixTimestamp(input["EndTimestamp"]),
  }
}

// refs: 1 - tags: output, named, interface
export interface Fragment {
  FragmentNumber?: string | null;
  FragmentSizeInBytes?: number | null;
  ProducerTimestamp?: Date | number | null;
  ServerTimestamp?: Date | number | null;
  FragmentLengthInMilliseconds?: number | null;
}
function toFragment(root: jsonP.JSONValue): Fragment {
  return jsonP.readObj({
    required: {},
    optional: {
      "FragmentNumber": "s",
      "FragmentSizeInBytes": "n",
      "ProducerTimestamp": "d",
      "ServerTimestamp": "d",
      "FragmentLengthInMilliseconds": "n",
    },
  }, root);
}
