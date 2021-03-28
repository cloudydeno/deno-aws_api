// Autogenerated API client for: Firewall Management Service

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class FMS {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(FMS.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2018-01-01",
    "endpointPrefix": "fms",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "FMS",
    "serviceFullName": "Firewall Management Service",
    "serviceId": "FMS",
    "signatureVersion": "v4",
    "targetPrefix": "AWSFMS_20180101",
    "uid": "fms-2018-01-01"
  };

  async associateAdminAccount(
    {abortSignal, ...params}: RequestConfig & s.AssociateAdminAccountRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      AdminAccount: params["AdminAccount"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateAdminAccount",
    });
    await resp.text();
  }

  async deleteAppsList(
    {abortSignal, ...params}: RequestConfig & s.DeleteAppsListRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ListId: params["ListId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteAppsList",
    });
    await resp.text();
  }

  async deleteNotificationChannel(
    {abortSignal}: RequestConfig = {},
  ): Promise<void> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteNotificationChannel",
    });
    await resp.text();
  }

  async deletePolicy(
    {abortSignal, ...params}: RequestConfig & s.DeletePolicyRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
      DeleteAllPolicyResources: params["DeleteAllPolicyResources"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeletePolicy",
    });
    await resp.text();
  }

  async deleteProtocolsList(
    {abortSignal, ...params}: RequestConfig & s.DeleteProtocolsListRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ListId: params["ListId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteProtocolsList",
    });
    await resp.text();
  }

  async disassociateAdminAccount(
    {abortSignal}: RequestConfig = {},
  ): Promise<void> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisassociateAdminAccount",
    });
    await resp.text();
  }

  async getAdminAccount(
    {abortSignal}: RequestConfig = {},
  ): Promise<s.GetAdminAccountResponse> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetAdminAccount",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AdminAccount": "s",
        "RoleStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.AccountRoleStatus>(x),
      },
    }, await resp.json());
  }

  async getAppsList(
    {abortSignal, ...params}: RequestConfig & s.GetAppsListRequest,
  ): Promise<s.GetAppsListResponse> {
    const body: jsonP.JSONObject = {
      ListId: params["ListId"],
      DefaultList: params["DefaultList"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetAppsList",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AppsList": toAppsListData,
        "AppsListArn": "s",
      },
    }, await resp.json());
  }

  async getComplianceDetail(
    {abortSignal, ...params}: RequestConfig & s.GetComplianceDetailRequest,
  ): Promise<s.GetComplianceDetailResponse> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
      MemberAccount: params["MemberAccount"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetComplianceDetail",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PolicyComplianceDetail": toPolicyComplianceDetail,
      },
    }, await resp.json());
  }

  async getNotificationChannel(
    {abortSignal}: RequestConfig = {},
  ): Promise<s.GetNotificationChannelResponse> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetNotificationChannel",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "SnsTopicArn": "s",
        "SnsRoleName": "s",
      },
    }, await resp.json());
  }

  async getPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetPolicyRequest,
  ): Promise<s.GetPolicyResponse> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetPolicy",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Policy": toPolicy,
        "PolicyArn": "s",
      },
    }, await resp.json());
  }

  async getProtectionStatus(
    {abortSignal, ...params}: RequestConfig & s.GetProtectionStatusRequest,
  ): Promise<s.GetProtectionStatusResponse> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
      MemberAccountId: params["MemberAccountId"],
      StartTime: jsonP.serializeDate_unixTimestamp(params["StartTime"]),
      EndTime: jsonP.serializeDate_unixTimestamp(params["EndTime"]),
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetProtectionStatus",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AdminAccountId": "s",
        "ServiceType": (x: jsonP.JSONValue) => cmnP.readEnum<s.SecurityServiceType>(x),
        "Data": "s",
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getProtocolsList(
    {abortSignal, ...params}: RequestConfig & s.GetProtocolsListRequest,
  ): Promise<s.GetProtocolsListResponse> {
    const body: jsonP.JSONObject = {
      ListId: params["ListId"],
      DefaultList: params["DefaultList"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetProtocolsList",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ProtocolsList": toProtocolsListData,
        "ProtocolsListArn": "s",
      },
    }, await resp.json());
  }

  async getViolationDetails(
    {abortSignal, ...params}: RequestConfig & s.GetViolationDetailsRequest,
  ): Promise<s.GetViolationDetailsResponse> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
      MemberAccount: params["MemberAccount"],
      ResourceId: params["ResourceId"],
      ResourceType: params["ResourceType"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetViolationDetails",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ViolationDetail": toViolationDetail,
      },
    }, await resp.json());
  }

  async listAppsLists(
    {abortSignal, ...params}: RequestConfig & s.ListAppsListsRequest,
  ): Promise<s.ListAppsListsResponse> {
    const body: jsonP.JSONObject = {
      DefaultLists: params["DefaultLists"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListAppsLists",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AppsLists": [toAppsListDataSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listComplianceStatus(
    {abortSignal, ...params}: RequestConfig & s.ListComplianceStatusRequest,
  ): Promise<s.ListComplianceStatusResponse> {
    const body: jsonP.JSONObject = {
      PolicyId: params["PolicyId"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListComplianceStatus",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PolicyComplianceStatusList": [toPolicyComplianceStatus],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listMemberAccounts(
    {abortSignal, ...params}: RequestConfig & s.ListMemberAccountsRequest = {},
  ): Promise<s.ListMemberAccountsResponse> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListMemberAccounts",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "MemberAccounts": ["s"],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listPolicies(
    {abortSignal, ...params}: RequestConfig & s.ListPoliciesRequest = {},
  ): Promise<s.ListPoliciesResponse> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListPolicies",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PolicyList": [toPolicySummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listProtocolsLists(
    {abortSignal, ...params}: RequestConfig & s.ListProtocolsListsRequest,
  ): Promise<s.ListProtocolsListsResponse> {
    const body: jsonP.JSONObject = {
      DefaultLists: params["DefaultLists"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListProtocolsLists",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ProtocolsLists": [toProtocolsListDataSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {
    const body: jsonP.JSONObject = {
      ResourceArn: params["ResourceArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TagList": [toTag],
      },
    }, await resp.json());
  }

  async putAppsList(
    {abortSignal, ...params}: RequestConfig & s.PutAppsListRequest,
  ): Promise<s.PutAppsListResponse> {
    const body: jsonP.JSONObject = {
      AppsList: fromAppsListData(params["AppsList"]),
      TagList: params["TagList"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutAppsList",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AppsList": toAppsListData,
        "AppsListArn": "s",
      },
    }, await resp.json());
  }

  async putNotificationChannel(
    {abortSignal, ...params}: RequestConfig & s.PutNotificationChannelRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      SnsTopicArn: params["SnsTopicArn"],
      SnsRoleName: params["SnsRoleName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutNotificationChannel",
    });
    await resp.text();
  }

  async putPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutPolicyRequest,
  ): Promise<s.PutPolicyResponse> {
    const body: jsonP.JSONObject = {
      Policy: fromPolicy(params["Policy"]),
      TagList: params["TagList"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutPolicy",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Policy": toPolicy,
        "PolicyArn": "s",
      },
    }, await resp.json());
  }

  async putProtocolsList(
    {abortSignal, ...params}: RequestConfig & s.PutProtocolsListRequest,
  ): Promise<s.PutProtocolsListResponse> {
    const body: jsonP.JSONObject = {
      ProtocolsList: fromProtocolsListData(params["ProtocolsList"]),
      TagList: params["TagList"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutProtocolsList",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ProtocolsList": toProtocolsListData,
        "ProtocolsListArn": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ResourceArn: params["ResourceArn"],
      TagList: params["TagList"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ResourceArn: params["ResourceArn"],
      TagKeys: params["TagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    await resp.text();
  }

}

function fromAppsListData(input?: s.AppsListData | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ListId: input["ListId"],
    ListName: input["ListName"],
    ListUpdateToken: input["ListUpdateToken"],
    CreateTime: jsonP.serializeDate_unixTimestamp(input["CreateTime"]),
    LastUpdateTime: jsonP.serializeDate_unixTimestamp(input["LastUpdateTime"]),
    AppsList: input["AppsList"]?.map(x => fromApp(x)),
    PreviousAppsList: jsonP.serializeMap(input["PreviousAppsList"], x => x?.map(fromApp)),
  }
}
function toAppsListData(root: jsonP.JSONValue): s.AppsListData {
  return jsonP.readObj({
    required: {
      "ListName": "s",
      "AppsList": [toApp],
    },
    optional: {
      "ListId": "s",
      "ListUpdateToken": "s",
      "CreateTime": "d",
      "LastUpdateTime": "d",
      "PreviousAppsList": x => jsonP.readMap(String, l => Array.isArray(l) ? l.map(toApp) : [], x),
    },
  }, root);
}

function fromApp(input?: s.App | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    AppName: input["AppName"],
    Protocol: input["Protocol"],
    Port: input["Port"],
  }
}
function toApp(root: jsonP.JSONValue): s.App {
  return jsonP.readObj({
    required: {
      "AppName": "s",
      "Protocol": "s",
      "Port": "n",
    },
    optional: {},
  }, root);
}

function fromTag(input?: s.Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): s.Tag {
  return jsonP.readObj({
    required: {
      "Key": "s",
      "Value": "s",
    },
    optional: {},
  }, root);
}

function fromPolicy(input?: s.Policy | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    PolicyId: input["PolicyId"],
    PolicyName: input["PolicyName"],
    PolicyUpdateToken: input["PolicyUpdateToken"],
    SecurityServicePolicyData: fromSecurityServicePolicyData(input["SecurityServicePolicyData"]),
    ResourceType: input["ResourceType"],
    ResourceTypeList: input["ResourceTypeList"],
    ResourceTags: input["ResourceTags"]?.map(x => fromResourceTag(x)),
    ExcludeResourceTags: input["ExcludeResourceTags"],
    RemediationEnabled: input["RemediationEnabled"],
    IncludeMap: input["IncludeMap"],
    ExcludeMap: input["ExcludeMap"],
  }
}
function toPolicy(root: jsonP.JSONValue): s.Policy {
  return jsonP.readObj({
    required: {
      "PolicyName": "s",
      "SecurityServicePolicyData": toSecurityServicePolicyData,
      "ResourceType": "s",
      "ExcludeResourceTags": "b",
      "RemediationEnabled": "b",
    },
    optional: {
      "PolicyId": "s",
      "PolicyUpdateToken": "s",
      "ResourceTypeList": ["s"],
      "ResourceTags": [toResourceTag],
      "IncludeMap": x => jsonP.readMap(x => cmnP.readEnumReq<s.CustomerPolicyScopeIdType>(x), l => Array.isArray(l) ? l.map(String) : [], x),
      "ExcludeMap": x => jsonP.readMap(x => cmnP.readEnumReq<s.CustomerPolicyScopeIdType>(x), l => Array.isArray(l) ? l.map(String) : [], x),
    },
  }, root);
}

function fromSecurityServicePolicyData(input?: s.SecurityServicePolicyData | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Type: input["Type"],
    ManagedServiceData: input["ManagedServiceData"],
  }
}
function toSecurityServicePolicyData(root: jsonP.JSONValue): s.SecurityServicePolicyData {
  return jsonP.readObj({
    required: {
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.SecurityServiceType>(x),
    },
    optional: {
      "ManagedServiceData": "s",
    },
  }, root);
}

function fromResourceTag(input?: s.ResourceTag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toResourceTag(root: jsonP.JSONValue): s.ResourceTag {
  return jsonP.readObj({
    required: {
      "Key": "s",
    },
    optional: {
      "Value": "s",
    },
  }, root);
}

function fromProtocolsListData(input?: s.ProtocolsListData | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ListId: input["ListId"],
    ListName: input["ListName"],
    ListUpdateToken: input["ListUpdateToken"],
    CreateTime: jsonP.serializeDate_unixTimestamp(input["CreateTime"]),
    LastUpdateTime: jsonP.serializeDate_unixTimestamp(input["LastUpdateTime"]),
    ProtocolsList: input["ProtocolsList"],
    PreviousProtocolsList: input["PreviousProtocolsList"],
  }
}
function toProtocolsListData(root: jsonP.JSONValue): s.ProtocolsListData {
  return jsonP.readObj({
    required: {
      "ListName": "s",
      "ProtocolsList": ["s"],
    },
    optional: {
      "ListId": "s",
      "ListUpdateToken": "s",
      "CreateTime": "d",
      "LastUpdateTime": "d",
      "PreviousProtocolsList": x => jsonP.readMap(String, l => Array.isArray(l) ? l.map(String) : [], x),
    },
  }, root);
}

function toPolicyComplianceDetail(root: jsonP.JSONValue): s.PolicyComplianceDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "PolicyOwner": "s",
      "PolicyId": "s",
      "MemberAccount": "s",
      "Violators": [toComplianceViolator],
      "EvaluationLimitExceeded": "b",
      "ExpiredAt": "d",
      "IssueInfoMap": x => jsonP.readMap(x => cmnP.readEnumReq<s.DependentServiceName>(x), String, x),
    },
  }, root);
}

function toComplianceViolator(root: jsonP.JSONValue): s.ComplianceViolator {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceId": "s",
      "ViolationReason": (x: jsonP.JSONValue) => cmnP.readEnum<s.ViolationReason>(x),
      "ResourceType": "s",
    },
  }, root);
}

function toViolationDetail(root: jsonP.JSONValue): s.ViolationDetail {
  return jsonP.readObj({
    required: {
      "PolicyId": "s",
      "MemberAccount": "s",
      "ResourceId": "s",
      "ResourceType": "s",
      "ResourceViolations": [toResourceViolation],
    },
    optional: {
      "ResourceTags": [toTag],
      "ResourceDescription": "s",
    },
  }, root);
}

function toResourceViolation(root: jsonP.JSONValue): s.ResourceViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "AwsVPCSecurityGroupViolation": toAwsVPCSecurityGroupViolation,
      "AwsEc2NetworkInterfaceViolation": toAwsEc2NetworkInterfaceViolation,
      "AwsEc2InstanceViolation": toAwsEc2InstanceViolation,
      "NetworkFirewallMissingFirewallViolation": toNetworkFirewallMissingFirewallViolation,
      "NetworkFirewallMissingSubnetViolation": toNetworkFirewallMissingSubnetViolation,
      "NetworkFirewallMissingExpectedRTViolation": toNetworkFirewallMissingExpectedRTViolation,
      "NetworkFirewallPolicyModifiedViolation": toNetworkFirewallPolicyModifiedViolation,
    },
  }, root);
}

function toAwsVPCSecurityGroupViolation(root: jsonP.JSONValue): s.AwsVPCSecurityGroupViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "ViolationTargetDescription": "s",
      "PartialMatches": [toPartialMatch],
      "PossibleSecurityGroupRemediationActions": [toSecurityGroupRemediationAction],
    },
  }, root);
}

function toPartialMatch(root: jsonP.JSONValue): s.PartialMatch {
  return jsonP.readObj({
    required: {},
    optional: {
      "Reference": "s",
      "TargetViolationReasons": ["s"],
    },
  }, root);
}

function toSecurityGroupRemediationAction(root: jsonP.JSONValue): s.SecurityGroupRemediationAction {
  return jsonP.readObj({
    required: {},
    optional: {
      "RemediationActionType": (x: jsonP.JSONValue) => cmnP.readEnum<s.RemediationActionType>(x),
      "Description": "s",
      "RemediationResult": toSecurityGroupRuleDescription,
      "IsDefaultAction": "b",
    },
  }, root);
}

function toSecurityGroupRuleDescription(root: jsonP.JSONValue): s.SecurityGroupRuleDescription {
  return jsonP.readObj({
    required: {},
    optional: {
      "IPV4Range": "s",
      "IPV6Range": "s",
      "PrefixListId": "s",
      "Protocol": "s",
      "FromPort": "n",
      "ToPort": "n",
    },
  }, root);
}

function toAwsEc2NetworkInterfaceViolation(root: jsonP.JSONValue): s.AwsEc2NetworkInterfaceViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "ViolatingSecurityGroups": ["s"],
    },
  }, root);
}

function toAwsEc2InstanceViolation(root: jsonP.JSONValue): s.AwsEc2InstanceViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "AwsEc2NetworkInterfaceViolations": [toAwsEc2NetworkInterfaceViolation],
    },
  }, root);
}

function toNetworkFirewallMissingFirewallViolation(root: jsonP.JSONValue): s.NetworkFirewallMissingFirewallViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "VPC": "s",
      "AvailabilityZone": "s",
      "TargetViolationReason": "s",
    },
  }, root);
}

function toNetworkFirewallMissingSubnetViolation(root: jsonP.JSONValue): s.NetworkFirewallMissingSubnetViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "VPC": "s",
      "AvailabilityZone": "s",
      "TargetViolationReason": "s",
    },
  }, root);
}

function toNetworkFirewallMissingExpectedRTViolation(root: jsonP.JSONValue): s.NetworkFirewallMissingExpectedRTViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "VPC": "s",
      "AvailabilityZone": "s",
      "CurrentRouteTable": "s",
      "ExpectedRouteTable": "s",
    },
  }, root);
}

function toNetworkFirewallPolicyModifiedViolation(root: jsonP.JSONValue): s.NetworkFirewallPolicyModifiedViolation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ViolationTarget": "s",
      "CurrentPolicyDescription": toNetworkFirewallPolicyDescription,
      "ExpectedPolicyDescription": toNetworkFirewallPolicyDescription,
    },
  }, root);
}

function toNetworkFirewallPolicyDescription(root: jsonP.JSONValue): s.NetworkFirewallPolicyDescription {
  return jsonP.readObj({
    required: {},
    optional: {
      "StatelessRuleGroups": [toStatelessRuleGroup],
      "StatelessDefaultActions": ["s"],
      "StatelessFragmentDefaultActions": ["s"],
      "StatelessCustomActions": ["s"],
      "StatefulRuleGroups": [toStatefulRuleGroup],
    },
  }, root);
}

function toStatelessRuleGroup(root: jsonP.JSONValue): s.StatelessRuleGroup {
  return jsonP.readObj({
    required: {},
    optional: {
      "RuleGroupName": "s",
      "ResourceId": "s",
      "Priority": "n",
    },
  }, root);
}

function toStatefulRuleGroup(root: jsonP.JSONValue): s.StatefulRuleGroup {
  return jsonP.readObj({
    required: {},
    optional: {
      "RuleGroupName": "s",
      "ResourceId": "s",
    },
  }, root);
}

function toAppsListDataSummary(root: jsonP.JSONValue): s.AppsListDataSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "ListArn": "s",
      "ListId": "s",
      "ListName": "s",
      "AppsList": [toApp],
    },
  }, root);
}

function toPolicyComplianceStatus(root: jsonP.JSONValue): s.PolicyComplianceStatus {
  return jsonP.readObj({
    required: {},
    optional: {
      "PolicyOwner": "s",
      "PolicyId": "s",
      "PolicyName": "s",
      "MemberAccount": "s",
      "EvaluationResults": [toEvaluationResult],
      "LastUpdated": "d",
      "IssueInfoMap": x => jsonP.readMap(x => cmnP.readEnumReq<s.DependentServiceName>(x), String, x),
    },
  }, root);
}

function toEvaluationResult(root: jsonP.JSONValue): s.EvaluationResult {
  return jsonP.readObj({
    required: {},
    optional: {
      "ComplianceStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.PolicyComplianceStatusType>(x),
      "ViolatorCount": "n",
      "EvaluationLimitExceeded": "b",
    },
  }, root);
}

function toPolicySummary(root: jsonP.JSONValue): s.PolicySummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "PolicyArn": "s",
      "PolicyId": "s",
      "PolicyName": "s",
      "ResourceType": "s",
      "SecurityServiceType": (x: jsonP.JSONValue) => cmnP.readEnum<s.SecurityServiceType>(x),
      "RemediationEnabled": "b",
    },
  }, root);
}

function toProtocolsListDataSummary(root: jsonP.JSONValue): s.ProtocolsListDataSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "ListArn": "s",
      "ListId": "s",
      "ListName": "s",
      "ProtocolsList": ["s"],
    },
  }, root);
}
