// Autogenerated API client for: AWS CodeStar Notifications

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as uuidv4 from "https://deno.land/std@0.71.0/uuid/v4.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class CodeStarNotifications {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(CodeStarNotifications.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2019-10-15",
    "endpointPrefix": "codestar-notifications",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "AWS CodeStar Notifications",
    "serviceId": "codestar notifications",
    "signatureVersion": "v4",
    "signingName": "codestar-notifications",
    "uid": "codestar-notifications-2019-10-15"
  };

  async createNotificationRule(
    {abortSignal, ...params}: RequestConfig & CreateNotificationRuleRequest,
  ): Promise<CreateNotificationRuleResult> {
    const body: jsonP.JSONObject = params ? {
      Name: params["Name"],
      EventTypeIds: params["EventTypeIds"],
      Resource: params["Resource"],
      Targets: params["Targets"]?.map(x => fromTarget(x)),
      DetailType: params["DetailType"],
      ClientRequestToken: params["ClientRequestToken"] ?? generateIdemptToken(),
      Tags: params["Tags"],
      Status: params["Status"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateNotificationRule",
      requestUri: "/createNotificationRule",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Arn": "s",
        },
      }, await resp.json()),
  };
  }

  async deleteNotificationRule(
    {abortSignal, ...params}: RequestConfig & DeleteNotificationRuleRequest,
  ): Promise<DeleteNotificationRuleResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteNotificationRule",
      requestUri: "/deleteNotificationRule",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Arn": "s",
        },
      }, await resp.json()),
  };
  }

  async deleteTarget(
    {abortSignal, ...params}: RequestConfig & DeleteTargetRequest,
  ): Promise<DeleteTargetResult> {
    const body: jsonP.JSONObject = params ? {
      TargetAddress: params["TargetAddress"],
      ForceUnsubscribeAll: params["ForceUnsubscribeAll"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteTarget",
      requestUri: "/deleteTarget",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

  async describeNotificationRule(
    {abortSignal, ...params}: RequestConfig & DescribeNotificationRuleRequest,
  ): Promise<DescribeNotificationRuleResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeNotificationRule",
      requestUri: "/describeNotificationRule",
    });
  return {
    ...jsonP.readObj({
        required: {
          "Arn": "s",
        },
        optional: {
          "Name": "s",
          "EventTypes": [toEventTypeSummary],
          "Resource": "s",
          "Targets": [toTargetSummary],
          "DetailType": (x: jsonP.JSONValue) => cmnP.readEnum<DetailType>(x),
          "CreatedBy": "s",
          "Status": (x: jsonP.JSONValue) => cmnP.readEnum<NotificationRuleStatus>(x),
          "CreatedTimestamp": "d",
          "LastModifiedTimestamp": "d",
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async listEventTypes(
    {abortSignal, ...params}: RequestConfig & ListEventTypesRequest = {},
  ): Promise<ListEventTypesResult> {
    const body: jsonP.JSONObject = params ? {
      Filters: params["Filters"]?.map(x => fromListEventTypesFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListEventTypes",
      requestUri: "/listEventTypes",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "EventTypes": [toEventTypeSummary],
          "NextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async listNotificationRules(
    {abortSignal, ...params}: RequestConfig & ListNotificationRulesRequest = {},
  ): Promise<ListNotificationRulesResult> {
    const body: jsonP.JSONObject = params ? {
      Filters: params["Filters"]?.map(x => fromListNotificationRulesFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListNotificationRules",
      requestUri: "/listNotificationRules",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "NextToken": "s",
          "NotificationRules": [toNotificationRuleSummary],
        },
      }, await resp.json()),
  };
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & ListTagsForResourceRequest,
  ): Promise<ListTagsForResourceResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
      requestUri: "/listTagsForResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async listTargets(
    {abortSignal, ...params}: RequestConfig & ListTargetsRequest = {},
  ): Promise<ListTargetsResult> {
    const body: jsonP.JSONObject = params ? {
      Filters: params["Filters"]?.map(x => fromListTargetsFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTargets",
      requestUri: "/listTargets",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Targets": [toTargetSummary],
          "NextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async subscribe(
    {abortSignal, ...params}: RequestConfig & SubscribeRequest,
  ): Promise<SubscribeResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
      Target: fromTarget(params["Target"]),
      ClientRequestToken: params["ClientRequestToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Subscribe",
      requestUri: "/subscribe",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Arn": "s",
        },
      }, await resp.json()),
  };
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & TagResourceRequest,
  ): Promise<TagResourceResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
      Tags: params["Tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: "/tagResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "Tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async unsubscribe(
    {abortSignal, ...params}: RequestConfig & UnsubscribeRequest,
  ): Promise<UnsubscribeResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
      TargetAddress: params["TargetAddress"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Unsubscribe",
      requestUri: "/unsubscribe",
    });
  return {
    ...jsonP.readObj({
        required: {
          "Arn": "s",
        },
        optional: {},
      }, await resp.json()),
  };
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & UntagResourceRequest,
  ): Promise<UntagResourceResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
      TagKeys: params["TagKeys"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
      requestUri: "/untagResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

  async updateNotificationRule(
    {abortSignal, ...params}: RequestConfig & UpdateNotificationRuleRequest,
  ): Promise<UpdateNotificationRuleResult> {
    const body: jsonP.JSONObject = params ? {
      Arn: params["Arn"],
      Name: params["Name"],
      Status: params["Status"],
      EventTypeIds: params["EventTypeIds"],
      Targets: params["Targets"]?.map(x => fromTarget(x)),
      DetailType: params["DetailType"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateNotificationRule",
      requestUri: "/updateNotificationRule",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

}

// refs: 1 - tags: named, input
export interface CreateNotificationRuleRequest {
  Name: string;
  EventTypeIds: string[];
  Resource: string;
  Targets: Target[];
  DetailType: DetailType;
  ClientRequestToken?: string | null;
  Tags?: { [key: string]: string | null | undefined } | null;
  Status?: NotificationRuleStatus | null;
}

// refs: 1 - tags: named, input
export interface DeleteNotificationRuleRequest {
  Arn: string;
}

// refs: 1 - tags: named, input
export interface DeleteTargetRequest {
  TargetAddress: string;
  ForceUnsubscribeAll?: boolean | null;
}

// refs: 1 - tags: named, input
export interface DescribeNotificationRuleRequest {
  Arn: string;
}

// refs: 1 - tags: named, input
export interface ListEventTypesRequest {
  Filters?: ListEventTypesFilter[] | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListNotificationRulesRequest {
  Filters?: ListNotificationRulesFilter[] | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  Arn: string;
}

// refs: 1 - tags: named, input
export interface ListTargetsRequest {
  Filters?: ListTargetsFilter[] | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface SubscribeRequest {
  Arn: string;
  Target: Target;
  ClientRequestToken?: string | null;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  Arn: string;
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UnsubscribeRequest {
  Arn: string;
  TargetAddress: string;
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  Arn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateNotificationRuleRequest {
  Arn: string;
  Name?: string | null;
  Status?: NotificationRuleStatus | null;
  EventTypeIds?: string[] | null;
  Targets?: Target[] | null;
  DetailType?: DetailType | null;
}

// refs: 1 - tags: named, output
export interface CreateNotificationRuleResult {
  Arn?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteNotificationRuleResult {
  Arn?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteTargetResult {
}

// refs: 1 - tags: named, output
export interface DescribeNotificationRuleResult {
  Arn: string;
  Name?: string | null;
  EventTypes?: EventTypeSummary[] | null;
  Resource?: string | null;
  Targets?: TargetSummary[] | null;
  DetailType?: DetailType | null;
  CreatedBy?: string | null;
  Status?: NotificationRuleStatus | null;
  CreatedTimestamp?: Date | number | null;
  LastModifiedTimestamp?: Date | number | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface ListEventTypesResult {
  EventTypes?: EventTypeSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListNotificationRulesResult {
  NextToken?: string | null;
  NotificationRules?: NotificationRuleSummary[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResult {
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface ListTargetsResult {
  Targets?: TargetSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface SubscribeResult {
  Arn?: string | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResult {
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface UnsubscribeResult {
  Arn: string;
}

// refs: 1 - tags: named, output
export interface UntagResourceResult {
}

// refs: 1 - tags: named, output
export interface UpdateNotificationRuleResult {
}

// refs: 3 - tags: input, named, interface
export interface Target {
  TargetType?: string | null;
  TargetAddress?: string | null;
}
function fromTarget(input?: Target | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    TargetType: input["TargetType"],
    TargetAddress: input["TargetAddress"],
  }
}

// refs: 3 - tags: input, named, enum, output
export type DetailType =
| "BASIC"
| "FULL"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type NotificationRuleStatus =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ListEventTypesFilter {
  Name: ListEventTypesFilterName;
  Value: string;
}
function fromListEventTypesFilter(input?: ListEventTypesFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

// refs: 1 - tags: input, named, enum
export type ListEventTypesFilterName =
| "RESOURCE_TYPE"
| "SERVICE_NAME"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ListNotificationRulesFilter {
  Name: ListNotificationRulesFilterName;
  Value: string;
}
function fromListNotificationRulesFilter(input?: ListNotificationRulesFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

// refs: 1 - tags: input, named, enum
export type ListNotificationRulesFilterName =
| "EVENT_TYPE_ID"
| "CREATED_BY"
| "RESOURCE"
| "TARGET_ADDRESS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ListTargetsFilter {
  Name: ListTargetsFilterName;
  Value: string;
}
function fromListTargetsFilter(input?: ListTargetsFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

// refs: 1 - tags: input, named, enum
export type ListTargetsFilterName =
| "TARGET_TYPE"
| "TARGET_ADDRESS"
| "TARGET_STATUS"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface EventTypeSummary {
  EventTypeId?: string | null;
  ServiceName?: string | null;
  EventTypeName?: string | null;
  ResourceType?: string | null;
}
function toEventTypeSummary(root: jsonP.JSONValue): EventTypeSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "EventTypeId": "s",
      "ServiceName": "s",
      "EventTypeName": "s",
      "ResourceType": "s",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface TargetSummary {
  TargetAddress?: string | null;
  TargetType?: string | null;
  TargetStatus?: TargetStatus | null;
}
function toTargetSummary(root: jsonP.JSONValue): TargetSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "TargetAddress": "s",
      "TargetType": "s",
      "TargetStatus": (x: jsonP.JSONValue) => cmnP.readEnum<TargetStatus>(x),
    },
  }, root);
}

// refs: 2 - tags: output, named, enum
export type TargetStatus =
| "PENDING"
| "ACTIVE"
| "UNREACHABLE"
| "INACTIVE"
| "DEACTIVATED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface NotificationRuleSummary {
  Id?: string | null;
  Arn?: string | null;
}
function toNotificationRuleSummary(root: jsonP.JSONValue): NotificationRuleSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "Id": "s",
      "Arn": "s",
    },
  }, root);
}
