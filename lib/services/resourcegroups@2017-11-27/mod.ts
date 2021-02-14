// Autogenerated API client for: AWS Resource Groups

interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as client from "../../client/common.ts";
import type * as s from "./structs.ts";
import * as jsonP from "../../encoding/json.ts";

export default class ResourceGroups {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ResourceGroups.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-11-27",
    "endpointPrefix": "resource-groups",
    "protocol": "rest-json",
    "serviceAbbreviation": "Resource Groups",
    "serviceFullName": "AWS Resource Groups",
    "serviceId": "Resource Groups",
    "signatureVersion": "v4",
    "signingName": "resource-groups",
    "uid": "resource-groups-2017-11-27"
  };

  async createGroup(
    {abortSignal, ...params}: RequestConfig & s.CreateGroupInput,
  ): Promise<s.CreateGroupOutput> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Description: params["Description"],
      ResourceQuery: fromResourceQuery(params["ResourceQuery"]),
      Tags: params["Tags"],
      Configuration: params["Configuration"]?.map(x => fromGroupConfigurationItem(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateGroup",
      requestUri: "/groups",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Group": toGroup,
        "ResourceQuery": toResourceQuery,
        "Tags": x => jsonP.readMap(String, String, x),
        "GroupConfiguration": toGroupConfiguration,
      },
    }, await resp.json());
  }

  async deleteGroup(
    {abortSignal, ...params}: RequestConfig & s.DeleteGroupInput = {},
  ): Promise<s.DeleteGroupOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteGroup",
      requestUri: "/delete-group",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Group": toGroup,
      },
    }, await resp.json());
  }

  async getGroup(
    {abortSignal, ...params}: RequestConfig & s.GetGroupInput = {},
  ): Promise<s.GetGroupOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetGroup",
      requestUri: "/get-group",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Group": toGroup,
      },
    }, await resp.json());
  }

  async getGroupConfiguration(
    {abortSignal, ...params}: RequestConfig & s.GetGroupConfigurationInput = {},
  ): Promise<s.GetGroupConfigurationOutput> {
    const body: jsonP.JSONObject = {
      Group: params["Group"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetGroupConfiguration",
      requestUri: "/get-group-configuration",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GroupConfiguration": toGroupConfiguration,
      },
    }, await resp.json());
  }

  async getGroupQuery(
    {abortSignal, ...params}: RequestConfig & s.GetGroupQueryInput = {},
  ): Promise<s.GetGroupQueryOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetGroupQuery",
      requestUri: "/get-group-query",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GroupQuery": toGroupQuery,
      },
    }, await resp.json());
  }

  async getTags(
    {abortSignal, ...params}: RequestConfig & s.GetTagsInput,
  ): Promise<s.GetTagsOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetTags",
      method: "GET",
      requestUri: cmnP.encodePath`/resources/${params["Arn"]}/tags`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async groupResources(
    {abortSignal, ...params}: RequestConfig & s.GroupResourcesInput,
  ): Promise<s.GroupResourcesOutput> {
    const body: jsonP.JSONObject = {
      Group: params["Group"],
      ResourceArns: params["ResourceArns"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GroupResources",
      requestUri: "/group-resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Succeeded": ["s"],
        "Failed": [toFailedResource],
        "Pending": [toPendingResource],
      },
    }, await resp.json());
  }

  async listGroupResources(
    {abortSignal, ...params}: RequestConfig & s.ListGroupResourcesInput = {},
  ): Promise<s.ListGroupResourcesOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
      Filters: params["Filters"]?.map(x => fromResourceFilter(x)),
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListGroupResources",
      requestUri: "/list-group-resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Resources": [toListGroupResourcesItem],
        "ResourceIdentifiers": [toResourceIdentifier],
        "NextToken": "s",
        "QueryErrors": [toQueryError],
      },
    }, await resp.json());
  }

  async listGroups(
    {abortSignal, ...params}: RequestConfig & s.ListGroupsInput = {},
  ): Promise<s.ListGroupsOutput> {
    const query = new URLSearchParams;
    const body: jsonP.JSONObject = {
      Filters: params["Filters"]?.map(x => fromGroupFilter(x)),
    };
    if (params["MaxResults"] != null) query.set("maxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("nextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query, body,
      action: "ListGroups",
      requestUri: "/groups-list",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GroupIdentifiers": [toGroupIdentifier],
        "Groups": [toGroup],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async putGroupConfiguration(
    {abortSignal, ...params}: RequestConfig & s.PutGroupConfigurationInput = {},
  ): Promise<s.PutGroupConfigurationOutput> {
    const body: jsonP.JSONObject = {
      Group: params["Group"],
      Configuration: params["Configuration"]?.map(x => fromGroupConfigurationItem(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutGroupConfiguration",
      requestUri: "/put-group-configuration",
      responseCode: 202,
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async searchResources(
    {abortSignal, ...params}: RequestConfig & s.SearchResourcesInput,
  ): Promise<s.SearchResourcesOutput> {
    const body: jsonP.JSONObject = {
      ResourceQuery: fromResourceQuery(params["ResourceQuery"]),
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SearchResources",
      requestUri: "/resources/search",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ResourceIdentifiers": [toResourceIdentifier],
        "NextToken": "s",
        "QueryErrors": [toQueryError],
      },
    }, await resp.json());
  }

  async tag(
    {abortSignal, ...params}: RequestConfig & s.TagInput,
  ): Promise<s.TagOutput> {
    const body: jsonP.JSONObject = {
      Tags: params["Tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Tag",
      method: "PUT",
      requestUri: cmnP.encodePath`/resources/${params["Arn"]}/tags`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
        "Tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async ungroupResources(
    {abortSignal, ...params}: RequestConfig & s.UngroupResourcesInput,
  ): Promise<s.UngroupResourcesOutput> {
    const body: jsonP.JSONObject = {
      Group: params["Group"],
      ResourceArns: params["ResourceArns"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UngroupResources",
      requestUri: "/ungroup-resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Succeeded": ["s"],
        "Failed": [toFailedResource],
        "Pending": [toPendingResource],
      },
    }, await resp.json());
  }

  async untag(
    {abortSignal, ...params}: RequestConfig & s.UntagInput,
  ): Promise<s.UntagOutput> {
    const body: jsonP.JSONObject = {
      Keys: params["Keys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "Untag",
      method: "PATCH",
      requestUri: cmnP.encodePath`/resources/${params["Arn"]}/tags`,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Arn": "s",
        "Keys": ["s"],
      },
    }, await resp.json());
  }

  async updateGroup(
    {abortSignal, ...params}: RequestConfig & s.UpdateGroupInput = {},
  ): Promise<s.UpdateGroupOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateGroup",
      requestUri: "/update-group",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Group": toGroup,
      },
    }, await resp.json());
  }

  async updateGroupQuery(
    {abortSignal, ...params}: RequestConfig & s.UpdateGroupQueryInput,
  ): Promise<s.UpdateGroupQueryOutput> {
    const body: jsonP.JSONObject = {
      GroupName: params["GroupName"],
      Group: params["Group"],
      ResourceQuery: fromResourceQuery(params["ResourceQuery"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateGroupQuery",
      requestUri: "/update-group-query",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "GroupQuery": toGroupQuery,
      },
    }, await resp.json());
  }

}

function fromResourceQuery(input?: s.ResourceQuery | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Type: input["Type"],
    Query: input["Query"],
  }
}
function toResourceQuery(root: jsonP.JSONValue): s.ResourceQuery {
  return jsonP.readObj({
    required: {
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.QueryType>(x),
      "Query": "s",
    },
    optional: {},
  }, root);
}

function fromGroupConfigurationItem(input?: s.GroupConfigurationItem | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Type: input["Type"],
    Parameters: input["Parameters"]?.map(x => fromGroupConfigurationParameter(x)),
  }
}
function toGroupConfigurationItem(root: jsonP.JSONValue): s.GroupConfigurationItem {
  return jsonP.readObj({
    required: {
      "Type": "s",
    },
    optional: {
      "Parameters": [toGroupConfigurationParameter],
    },
  }, root);
}

function fromGroupConfigurationParameter(input?: s.GroupConfigurationParameter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Values: input["Values"],
  }
}
function toGroupConfigurationParameter(root: jsonP.JSONValue): s.GroupConfigurationParameter {
  return jsonP.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "Values": ["s"],
    },
  }, root);
}

function fromResourceFilter(input?: s.ResourceFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Values: input["Values"],
  }
}

function fromGroupFilter(input?: s.GroupFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Values: input["Values"],
  }
}

function toGroup(root: jsonP.JSONValue): s.Group {
  return jsonP.readObj({
    required: {
      "GroupArn": "s",
      "Name": "s",
    },
    optional: {
      "Description": "s",
    },
  }, root);
}

function toGroupConfiguration(root: jsonP.JSONValue): s.GroupConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "Configuration": [toGroupConfigurationItem],
      "ProposedConfiguration": [toGroupConfigurationItem],
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.GroupConfigurationStatus>(x),
      "FailureReason": "s",
    },
  }, root);
}

function toGroupQuery(root: jsonP.JSONValue): s.GroupQuery {
  return jsonP.readObj({
    required: {
      "GroupName": "s",
      "ResourceQuery": toResourceQuery,
    },
    optional: {},
  }, root);
}

function toFailedResource(root: jsonP.JSONValue): s.FailedResource {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "ErrorMessage": "s",
      "ErrorCode": "s",
    },
  }, root);
}

function toPendingResource(root: jsonP.JSONValue): s.PendingResource {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
    },
  }, root);
}

function toListGroupResourcesItem(root: jsonP.JSONValue): s.ListGroupResourcesItem {
  return jsonP.readObj({
    required: {},
    optional: {
      "Identifier": toResourceIdentifier,
      "Status": toResourceStatus,
    },
  }, root);
}

function toResourceIdentifier(root: jsonP.JSONValue): s.ResourceIdentifier {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "ResourceType": "s",
    },
  }, root);
}

function toResourceStatus(root: jsonP.JSONValue): s.ResourceStatus {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": (x: jsonP.JSONValue) => cmnP.readEnum<s.ResourceStatusValue>(x),
    },
  }, root);
}

function toQueryError(root: jsonP.JSONValue): s.QueryError {
  return jsonP.readObj({
    required: {},
    optional: {
      "ErrorCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.QueryErrorCode>(x),
      "Message": "s",
    },
  }, root);
}

function toGroupIdentifier(root: jsonP.JSONValue): s.GroupIdentifier {
  return jsonP.readObj({
    required: {},
    optional: {
      "GroupName": "s",
      "GroupArn": "s",
    },
  }, root);
}