// Autogenerated API client for: AWS CodeStar Notifications

interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as uuidv4 from "https://deno.land/std@0.86.0/uuid/v4.ts";
import * as cmnP from "../../encoding/common.ts";
import * as client from "../../client/common.ts";
import type * as s from "./structs.ts";
import * as jsonP from "../../encoding/json.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class CodeStarNotifications {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(CodeStarNotifications.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
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
    {abortSignal, ...params}: RequestConfig & s.CreateNotificationRuleRequest,
  ): Promise<s.CreateNotificationRuleResult> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      EventTypeIds: params["EventTypeIds"],
      Resource: params["Resource"],
      Targets: params["Targets"]?.map(x => fromTarget(x)),
      DetailType: params["DetailType"],
      ClientRequestToken: params["ClientRequestToken"] ?? generateIdemptToken(),
      Tags: params["Tags"],
      Status: params["Status"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateNotificationRule",
      requestUri: "/createNotificationRule",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
      },
    }, await resp.json());
  }

  async deleteNotificationRule(
    {abortSignal, ...params}: RequestConfig & s.DeleteNotificationRuleRequest,
  ): Promise<s.DeleteNotificationRuleResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteNotificationRule",
      requestUri: "/deleteNotificationRule",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
      },
    }, await resp.json());
  }

  async deleteTarget(
    {abortSignal, ...params}: RequestConfig & s.DeleteTargetRequest,
  ): Promise<s.DeleteTargetResult> {
    const body: jsonP.JSONObject = {
      TargetAddress: params["TargetAddress"],
      ForceUnsubscribeAll: params["ForceUnsubscribeAll"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteTarget",
      requestUri: "/deleteTarget",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async describeNotificationRule(
    {abortSignal, ...params}: RequestConfig & s.DescribeNotificationRuleRequest,
  ): Promise<s.DescribeNotificationRuleResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeNotificationRule",
      requestUri: "/describeNotificationRule",
    });
    return jsonP.readObj({
      required: {
        "Arn": "s",
      },
      optional: {
        "Name": "s",
        "EventTypes": [toEventTypeSummary],
        "Resource": "s",
        "Targets": [toTargetSummary],
        "DetailType": (x: jsonP.JSONValue) => cmnP.readEnum<s.DetailType>(x),
        "CreatedBy": "s",
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.NotificationRuleStatus>(x),
        "CreatedTimestamp": "d",
        "LastModifiedTimestamp": "d",
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async listEventTypes(
    {abortSignal, ...params}: RequestConfig & s.ListEventTypesRequest = {},
  ): Promise<s.ListEventTypesResult> {
    const body: jsonP.JSONObject = {
      Filters: params["Filters"]?.map(x => fromListEventTypesFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListEventTypes",
      requestUri: "/listEventTypes",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EventTypes": [toEventTypeSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listNotificationRules(
    {abortSignal, ...params}: RequestConfig & s.ListNotificationRulesRequest = {},
  ): Promise<s.ListNotificationRulesResult> {
    const body: jsonP.JSONObject = {
      Filters: params["Filters"]?.map(x => fromListNotificationRulesFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListNotificationRules",
      requestUri: "/listNotificationRules",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "NotificationRules": [toNotificationRuleSummary],
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
      requestUri: "/listTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async listTargets(
    {abortSignal, ...params}: RequestConfig & s.ListTargetsRequest = {},
  ): Promise<s.ListTargetsResult> {
    const body: jsonP.JSONObject = {
      Filters: params["Filters"]?.map(x => fromListTargetsFilter(x)),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTargets",
      requestUri: "/listTargets",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Targets": [toTargetSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async subscribe(
    {abortSignal, ...params}: RequestConfig & s.SubscribeRequest,
  ): Promise<s.SubscribeResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
      Target: fromTarget(params["Target"]),
      ClientRequestToken: params["ClientRequestToken"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Subscribe",
      requestUri: "/subscribe",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<s.TagResourceResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
      Tags: params["Tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: "/tagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async unsubscribe(
    {abortSignal, ...params}: RequestConfig & s.UnsubscribeRequest,
  ): Promise<s.UnsubscribeResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
      TargetAddress: params["TargetAddress"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Unsubscribe",
      requestUri: "/unsubscribe",
    });
    return jsonP.readObj({
      required: {
        "Arn": "s",
      },
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<s.UntagResourceResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
      TagKeys: params["TagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
      requestUri: "/untagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateNotificationRule(
    {abortSignal, ...params}: RequestConfig & s.UpdateNotificationRuleRequest,
  ): Promise<s.UpdateNotificationRuleResult> {
    const body: jsonP.JSONObject = {
      Arn: params["Arn"],
      Name: params["Name"],
      Status: params["Status"],
      EventTypeIds: params["EventTypeIds"],
      Targets: params["Targets"]?.map(x => fromTarget(x)),
      DetailType: params["DetailType"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateNotificationRule",
      requestUri: "/updateNotificationRule",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

}

function fromTarget(input?: s.Target | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    TargetType: input["TargetType"],
    TargetAddress: input["TargetAddress"],
  }
}

function fromListEventTypesFilter(input?: s.ListEventTypesFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

function fromListNotificationRulesFilter(input?: s.ListNotificationRulesFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

function fromListTargetsFilter(input?: s.ListTargetsFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Value: input["Value"],
  }
}

function toEventTypeSummary(root: jsonP.JSONValue): s.EventTypeSummary {
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

function toTargetSummary(root: jsonP.JSONValue): s.TargetSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "TargetAddress": "s",
      "TargetType": "s",
      "TargetStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TargetStatus>(x),
    },
  }, root);
}

function toNotificationRuleSummary(root: jsonP.JSONValue): s.NotificationRuleSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "Id": "s",
      "Arn": "s",
    },
  }, root);
}