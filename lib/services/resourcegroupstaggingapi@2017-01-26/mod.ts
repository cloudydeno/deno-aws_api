// Autogenerated API client for: AWS Resource Groups Tagging API

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class ResourceGroupsTaggingAPI {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ResourceGroupsTaggingAPI.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-01-26",
    "endpointPrefix": "tagging",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "AWS Resource Groups Tagging API",
    "serviceId": "Resource Groups Tagging API",
    "signatureVersion": "v4",
    "targetPrefix": "ResourceGroupsTaggingAPI_20170126",
    "uid": "resourcegroupstaggingapi-2017-01-26"
  };

  async describeReportCreation(
    {abortSignal, ...params}: RequestConfig & DescribeReportCreationInput = {},
  ): Promise<DescribeReportCreationOutput> {
    const body: jsonP.JSONObject = params ? {
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeReportCreation",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Status": "s",
        "S3Location": "s",
        "ErrorMessage": "s",
      },
    }, await resp.json());
  }

  async getComplianceSummary(
    {abortSignal, ...params}: RequestConfig & GetComplianceSummaryInput = {},
  ): Promise<GetComplianceSummaryOutput> {
    const body: jsonP.JSONObject = params ? {
      TargetIdFilters: params["TargetIdFilters"],
      RegionFilters: params["RegionFilters"],
      ResourceTypeFilters: params["ResourceTypeFilters"],
      TagKeyFilters: params["TagKeyFilters"],
      GroupBy: params["GroupBy"],
      MaxResults: params["MaxResults"],
      PaginationToken: params["PaginationToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetComplianceSummary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "SummaryList": [toSummary],
        "PaginationToken": "s",
      },
    }, await resp.json());
  }

  async getResources(
    {abortSignal, ...params}: RequestConfig & GetResourcesInput = {},
  ): Promise<GetResourcesOutput> {
    const body: jsonP.JSONObject = params ? {
      PaginationToken: params["PaginationToken"],
      TagFilters: params["TagFilters"]?.map(x => fromTagFilter(x)),
      ResourcesPerPage: params["ResourcesPerPage"],
      TagsPerPage: params["TagsPerPage"],
      ResourceTypeFilters: params["ResourceTypeFilters"],
      IncludeComplianceDetails: params["IncludeComplianceDetails"],
      ExcludeCompliantResources: params["ExcludeCompliantResources"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetResources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PaginationToken": "s",
        "ResourceTagMappingList": [toResourceTagMapping],
      },
    }, await resp.json());
  }

  async getTagKeys(
    {abortSignal, ...params}: RequestConfig & GetTagKeysInput = {},
  ): Promise<GetTagKeysOutput> {
    const body: jsonP.JSONObject = params ? {
      PaginationToken: params["PaginationToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetTagKeys",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PaginationToken": "s",
        "TagKeys": ["s"],
      },
    }, await resp.json());
  }

  async getTagValues(
    {abortSignal, ...params}: RequestConfig & GetTagValuesInput,
  ): Promise<GetTagValuesOutput> {
    const body: jsonP.JSONObject = params ? {
      PaginationToken: params["PaginationToken"],
      Key: params["Key"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetTagValues",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PaginationToken": "s",
        "TagValues": ["s"],
      },
    }, await resp.json());
  }

  async startReportCreation(
    {abortSignal, ...params}: RequestConfig & StartReportCreationInput,
  ): Promise<StartReportCreationOutput> {
    const body: jsonP.JSONObject = params ? {
      S3Bucket: params["S3Bucket"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartReportCreation",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async tagResources(
    {abortSignal, ...params}: RequestConfig & TagResourcesInput,
  ): Promise<TagResourcesOutput> {
    const body: jsonP.JSONObject = params ? {
      ResourceARNList: params["ResourceARNList"],
      Tags: params["Tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "FailedResourcesMap": x => jsonP.readMap(String, toFailureInfo, x),
      },
    }, await resp.json());
  }

  async untagResources(
    {abortSignal, ...params}: RequestConfig & UntagResourcesInput,
  ): Promise<UntagResourcesOutput> {
    const body: jsonP.JSONObject = params ? {
      ResourceARNList: params["ResourceARNList"],
      TagKeys: params["TagKeys"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "FailedResourcesMap": x => jsonP.readMap(String, toFailureInfo, x),
      },
    }, await resp.json());
  }

}

// refs: 1 - tags: named, input
export interface DescribeReportCreationInput {
}

// refs: 1 - tags: named, input
export interface GetComplianceSummaryInput {
  TargetIdFilters?: string[] | null;
  RegionFilters?: string[] | null;
  ResourceTypeFilters?: string[] | null;
  TagKeyFilters?: string[] | null;
  GroupBy?: GroupByAttribute[] | null;
  MaxResults?: number | null;
  PaginationToken?: string | null;
}

// refs: 1 - tags: named, input
export interface GetResourcesInput {
  PaginationToken?: string | null;
  TagFilters?: TagFilter[] | null;
  ResourcesPerPage?: number | null;
  TagsPerPage?: number | null;
  ResourceTypeFilters?: string[] | null;
  IncludeComplianceDetails?: boolean | null;
  ExcludeCompliantResources?: boolean | null;
}

// refs: 1 - tags: named, input
export interface GetTagKeysInput {
  PaginationToken?: string | null;
}

// refs: 1 - tags: named, input
export interface GetTagValuesInput {
  PaginationToken?: string | null;
  Key: string;
}

// refs: 1 - tags: named, input
export interface StartReportCreationInput {
  S3Bucket: string;
}

// refs: 1 - tags: named, input
export interface TagResourcesInput {
  ResourceARNList: string[];
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagResourcesInput {
  ResourceARNList: string[];
  TagKeys: string[];
}

// refs: 1 - tags: named, output
export interface DescribeReportCreationOutput {
  Status?: string | null;
  S3Location?: string | null;
  ErrorMessage?: string | null;
}

// refs: 1 - tags: named, output
export interface GetComplianceSummaryOutput {
  SummaryList?: Summary[] | null;
  PaginationToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetResourcesOutput {
  PaginationToken?: string | null;
  ResourceTagMappingList?: ResourceTagMapping[] | null;
}

// refs: 1 - tags: named, output
export interface GetTagKeysOutput {
  PaginationToken?: string | null;
  TagKeys?: string[] | null;
}

// refs: 1 - tags: named, output
export interface GetTagValuesOutput {
  PaginationToken?: string | null;
  TagValues?: string[] | null;
}

// refs: 1 - tags: named, output
export interface StartReportCreationOutput {
}

// refs: 1 - tags: named, output
export interface TagResourcesOutput {
  FailedResourcesMap?: { [key: string]: FailureInfo | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UntagResourcesOutput {
  FailedResourcesMap?: { [key: string]: FailureInfo | null | undefined } | null;
}

// refs: 1 - tags: input, named, enum
export type GroupByAttribute =
| "TARGET_ID"
| "REGION"
| "RESOURCE_TYPE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface TagFilter {
  Key?: string | null;
  Values?: string[] | null;
}
function fromTagFilter(input?: TagFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Values: input["Values"],
  }
}

// refs: 1 - tags: output, named, interface
export interface Summary {
  LastUpdated?: string | null;
  TargetId?: string | null;
  TargetIdType?: TargetIdType | null;
  Region?: string | null;
  ResourceType?: string | null;
  NonCompliantResources?: number | null;
}
function toSummary(root: jsonP.JSONValue): Summary {
  return jsonP.readObj({
    required: {},
    optional: {
      "LastUpdated": "s",
      "TargetId": "s",
      "TargetIdType": (x: jsonP.JSONValue) => cmnP.readEnum<TargetIdType>(x),
      "Region": "s",
      "ResourceType": "s",
      "NonCompliantResources": "n",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type TargetIdType =
| "ACCOUNT"
| "OU"
| "ROOT"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface ResourceTagMapping {
  ResourceARN?: string | null;
  Tags?: Tag[] | null;
  ComplianceDetails?: ComplianceDetails | null;
}
function toResourceTagMapping(root: jsonP.JSONValue): ResourceTagMapping {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceARN": "s",
      "Tags": [toTag],
      "ComplianceDetails": toComplianceDetails,
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface Tag {
  Key: string;
  Value: string;
}
function toTag(root: jsonP.JSONValue): Tag {
  return jsonP.readObj({
    required: {
      "Key": "s",
      "Value": "s",
    },
    optional: {},
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ComplianceDetails {
  NoncompliantKeys?: string[] | null;
  KeysWithNoncompliantValues?: string[] | null;
  ComplianceStatus?: boolean | null;
}
function toComplianceDetails(root: jsonP.JSONValue): ComplianceDetails {
  return jsonP.readObj({
    required: {},
    optional: {
      "NoncompliantKeys": ["s"],
      "KeysWithNoncompliantValues": ["s"],
      "ComplianceStatus": "b",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface FailureInfo {
  StatusCode?: number | null;
  ErrorCode?: ErrorCode | null;
  ErrorMessage?: string | null;
}
function toFailureInfo(root: jsonP.JSONValue): FailureInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "StatusCode": "n",
      "ErrorCode": (x: jsonP.JSONValue) => cmnP.readEnum<ErrorCode>(x),
      "ErrorMessage": "s",
    },
  }, root);
}

// refs: 2 - tags: output, named, enum
export type ErrorCode =
| "InternalServiceException"
| "InvalidParameterException"
| cmnP.UnexpectedEnumValue;
