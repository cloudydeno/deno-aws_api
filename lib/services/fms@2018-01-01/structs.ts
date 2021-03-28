// Autogenerated API structures for: Firewall Management Service

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface AssociateAdminAccountRequest {
  AdminAccount: string;
}

// refs: 1 - tags: named, input
export interface DeleteAppsListRequest {
  ListId: string;
}

// refs: 1 - tags: named, input
export interface DeletePolicyRequest {
  PolicyId: string;
  DeleteAllPolicyResources?: boolean | null;
}

// refs: 1 - tags: named, input
export interface DeleteProtocolsListRequest {
  ListId: string;
}

// refs: 1 - tags: named, input
export interface GetAppsListRequest {
  ListId: string;
  DefaultList?: boolean | null;
}

// refs: 1 - tags: named, input
export interface GetComplianceDetailRequest {
  PolicyId: string;
  MemberAccount: string;
}

// refs: 1 - tags: named, input
export interface GetPolicyRequest {
  PolicyId: string;
}

// refs: 1 - tags: named, input
export interface GetProtectionStatusRequest {
  PolicyId: string;
  MemberAccountId?: string | null;
  StartTime?: Date | number | null;
  EndTime?: Date | number | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface GetProtocolsListRequest {
  ListId: string;
  DefaultList?: boolean | null;
}

// refs: 1 - tags: named, input
export interface GetViolationDetailsRequest {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
}

// refs: 1 - tags: named, input
export interface ListAppsListsRequest {
  DefaultLists?: boolean | null;
  NextToken?: string | null;
  MaxResults: number;
}

// refs: 1 - tags: named, input
export interface ListComplianceStatusRequest {
  PolicyId: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListMemberAccountsRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListPoliciesRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListProtocolsListsRequest {
  DefaultLists?: boolean | null;
  NextToken?: string | null;
  MaxResults: number;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface PutAppsListRequest {
  AppsList: AppsListData;
  TagList?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface PutNotificationChannelRequest {
  SnsTopicArn: string;
  SnsRoleName: string;
}

// refs: 1 - tags: named, input
export interface PutPolicyRequest {
  Policy: Policy;
  TagList?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface PutProtocolsListRequest {
  ProtocolsList: ProtocolsListData;
  TagList?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  TagList: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, output
export interface GetAdminAccountResponse {
  AdminAccount?: string | null;
  RoleStatus?: AccountRoleStatus | null;
}

// refs: 1 - tags: named, output
export interface GetAppsListResponse {
  AppsList?: AppsListData | null;
  AppsListArn?: string | null;
}

// refs: 1 - tags: named, output
export interface GetComplianceDetailResponse {
  PolicyComplianceDetail?: PolicyComplianceDetail | null;
}

// refs: 1 - tags: named, output
export interface GetNotificationChannelResponse {
  SnsTopicArn?: string | null;
  SnsRoleName?: string | null;
}

// refs: 1 - tags: named, output
export interface GetPolicyResponse {
  Policy?: Policy | null;
  PolicyArn?: string | null;
}

// refs: 1 - tags: named, output
export interface GetProtectionStatusResponse {
  AdminAccountId?: string | null;
  ServiceType?: SecurityServiceType | null;
  Data?: string | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetProtocolsListResponse {
  ProtocolsList?: ProtocolsListData | null;
  ProtocolsListArn?: string | null;
}

// refs: 1 - tags: named, output
export interface GetViolationDetailsResponse {
  ViolationDetail?: ViolationDetail | null;
}

// refs: 1 - tags: named, output
export interface ListAppsListsResponse {
  AppsLists?: AppsListDataSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListComplianceStatusResponse {
  PolicyComplianceStatusList?: PolicyComplianceStatus[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListMemberAccountsResponse {
  MemberAccounts?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListPoliciesResponse {
  PolicyList?: PolicySummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListProtocolsListsResponse {
  ProtocolsLists?: ProtocolsListDataSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  TagList?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface PutAppsListResponse {
  AppsList?: AppsListData | null;
  AppsListArn?: string | null;
}

// refs: 1 - tags: named, output
export interface PutPolicyResponse {
  Policy?: Policy | null;
  PolicyArn?: string | null;
}

// refs: 1 - tags: named, output
export interface PutProtocolsListResponse {
  ProtocolsList?: ProtocolsListData | null;
  ProtocolsListArn?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface AppsListData {
  ListId?: string | null;
  ListName: string;
  ListUpdateToken?: string | null;
  CreateTime?: Date | number | null;
  LastUpdateTime?: Date | number | null;
  AppsList: App[];
  PreviousAppsList?: { [key: string]: App[] | null | undefined } | null;
}

// refs: 7 - tags: input, named, interface, output
export interface App {
  AppName: string;
  Protocol: string;
  Port: number;
}

// refs: 6 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 3 - tags: input, named, interface, output
export interface Policy {
  PolicyId?: string | null;
  PolicyName: string;
  PolicyUpdateToken?: string | null;
  SecurityServicePolicyData: SecurityServicePolicyData;
  ResourceType: string;
  ResourceTypeList?: string[] | null;
  ResourceTags?: ResourceTag[] | null;
  ExcludeResourceTags: boolean;
  RemediationEnabled: boolean;
  IncludeMap?: { [key in CustomerPolicyScopeIdType]: string[] | null | undefined } | null;
  ExcludeMap?: { [key in CustomerPolicyScopeIdType]: string[] | null | undefined } | null;
}

// refs: 3 - tags: input, named, interface, output
export interface SecurityServicePolicyData {
  Type: SecurityServiceType;
  ManagedServiceData?: string | null;
}

// refs: 5 - tags: input, named, enum, output
export type SecurityServiceType =
| "WAF"
| "WAFV2"
| "SHIELD_ADVANCED"
| "SECURITY_GROUPS_COMMON"
| "SECURITY_GROUPS_CONTENT_AUDIT"
| "SECURITY_GROUPS_USAGE_AUDIT"
| "NETWORK_FIREWALL"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface ResourceTag {
  Key: string;
  Value?: string | null;
}

// refs: 6 - tags: input, named, enum, output
export type CustomerPolicyScopeIdType =
| "ACCOUNT"
| "ORG_UNIT"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface ProtocolsListData {
  ListId?: string | null;
  ListName: string;
  ListUpdateToken?: string | null;
  CreateTime?: Date | number | null;
  LastUpdateTime?: Date | number | null;
  ProtocolsList: string[];
  PreviousProtocolsList?: { [key: string]: string[] | null | undefined } | null;
}

// refs: 1 - tags: output, named, enum
export type AccountRoleStatus =
| "READY"
| "CREATING"
| "PENDING_DELETION"
| "DELETING"
| "DELETED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface PolicyComplianceDetail {
  PolicyOwner?: string | null;
  PolicyId?: string | null;
  MemberAccount?: string | null;
  Violators?: ComplianceViolator[] | null;
  EvaluationLimitExceeded?: boolean | null;
  ExpiredAt?: Date | number | null;
  IssueInfoMap?: { [key in DependentServiceName]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface ComplianceViolator {
  ResourceId?: string | null;
  ViolationReason?: ViolationReason | null;
  ResourceType?: string | null;
}

// refs: 1 - tags: output, named, enum
export type ViolationReason =
| "WEB_ACL_MISSING_RULE_GROUP"
| "RESOURCE_MISSING_WEB_ACL"
| "RESOURCE_INCORRECT_WEB_ACL"
| "RESOURCE_MISSING_SHIELD_PROTECTION"
| "RESOURCE_MISSING_WEB_ACL_OR_SHIELD_PROTECTION"
| "RESOURCE_MISSING_SECURITY_GROUP"
| "RESOURCE_VIOLATES_AUDIT_SECURITY_GROUP"
| "SECURITY_GROUP_UNUSED"
| "SECURITY_GROUP_REDUNDANT"
| "MISSING_FIREWALL"
| "MISSING_FIREWALL_SUBNET_IN_AZ"
| "MISSING_EXPECTED_ROUTE_TABLE"
| "NETWORK_FIREWALL_POLICY_MODIFIED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type DependentServiceName =
| "AWSCONFIG"
| "AWSWAF"
| "AWSSHIELD_ADVANCED"
| "AWSVPC"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface ViolationDetail {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
  ResourceViolations: ResourceViolation[];
  ResourceTags?: Tag[] | null;
  ResourceDescription?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ResourceViolation {
  AwsVPCSecurityGroupViolation?: AwsVPCSecurityGroupViolation | null;
  AwsEc2NetworkInterfaceViolation?: AwsEc2NetworkInterfaceViolation | null;
  AwsEc2InstanceViolation?: AwsEc2InstanceViolation | null;
  NetworkFirewallMissingFirewallViolation?: NetworkFirewallMissingFirewallViolation | null;
  NetworkFirewallMissingSubnetViolation?: NetworkFirewallMissingSubnetViolation | null;
  NetworkFirewallMissingExpectedRTViolation?: NetworkFirewallMissingExpectedRTViolation | null;
  NetworkFirewallPolicyModifiedViolation?: NetworkFirewallPolicyModifiedViolation | null;
}

// refs: 1 - tags: output, named, interface
export interface AwsVPCSecurityGroupViolation {
  ViolationTarget?: string | null;
  ViolationTargetDescription?: string | null;
  PartialMatches?: PartialMatch[] | null;
  PossibleSecurityGroupRemediationActions?: SecurityGroupRemediationAction[] | null;
}

// refs: 1 - tags: output, named, interface
export interface PartialMatch {
  Reference?: string | null;
  TargetViolationReasons?: string[] | null;
}

// refs: 1 - tags: output, named, interface
export interface SecurityGroupRemediationAction {
  RemediationActionType?: RemediationActionType | null;
  Description?: string | null;
  RemediationResult?: SecurityGroupRuleDescription | null;
  IsDefaultAction?: boolean | null;
}

// refs: 1 - tags: output, named, enum
export type RemediationActionType =
| "REMOVE"
| "MODIFY"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SecurityGroupRuleDescription {
  IPV4Range?: string | null;
  IPV6Range?: string | null;
  PrefixListId?: string | null;
  Protocol?: string | null;
  FromPort?: number | null;
  ToPort?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface AwsEc2NetworkInterfaceViolation {
  ViolationTarget?: string | null;
  ViolatingSecurityGroups?: string[] | null;
}

// refs: 1 - tags: output, named, interface
export interface AwsEc2InstanceViolation {
  ViolationTarget?: string | null;
  AwsEc2NetworkInterfaceViolations?: AwsEc2NetworkInterfaceViolation[] | null;
}

// refs: 1 - tags: output, named, interface
export interface NetworkFirewallMissingFirewallViolation {
  ViolationTarget?: string | null;
  VPC?: string | null;
  AvailabilityZone?: string | null;
  TargetViolationReason?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface NetworkFirewallMissingSubnetViolation {
  ViolationTarget?: string | null;
  VPC?: string | null;
  AvailabilityZone?: string | null;
  TargetViolationReason?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface NetworkFirewallMissingExpectedRTViolation {
  ViolationTarget?: string | null;
  VPC?: string | null;
  AvailabilityZone?: string | null;
  CurrentRouteTable?: string | null;
  ExpectedRouteTable?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface NetworkFirewallPolicyModifiedViolation {
  ViolationTarget?: string | null;
  CurrentPolicyDescription?: NetworkFirewallPolicyDescription | null;
  ExpectedPolicyDescription?: NetworkFirewallPolicyDescription | null;
}

// refs: 2 - tags: output, named, interface
export interface NetworkFirewallPolicyDescription {
  StatelessRuleGroups?: StatelessRuleGroup[] | null;
  StatelessDefaultActions?: string[] | null;
  StatelessFragmentDefaultActions?: string[] | null;
  StatelessCustomActions?: string[] | null;
  StatefulRuleGroups?: StatefulRuleGroup[] | null;
}

// refs: 2 - tags: output, named, interface
export interface StatelessRuleGroup {
  RuleGroupName?: string | null;
  ResourceId?: string | null;
  Priority?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface StatefulRuleGroup {
  RuleGroupName?: string | null;
  ResourceId?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface AppsListDataSummary {
  ListArn?: string | null;
  ListId?: string | null;
  ListName?: string | null;
  AppsList?: App[] | null;
}

// refs: 1 - tags: output, named, interface
export interface PolicyComplianceStatus {
  PolicyOwner?: string | null;
  PolicyId?: string | null;
  PolicyName?: string | null;
  MemberAccount?: string | null;
  EvaluationResults?: EvaluationResult[] | null;
  LastUpdated?: Date | number | null;
  IssueInfoMap?: { [key in DependentServiceName]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface EvaluationResult {
  ComplianceStatus?: PolicyComplianceStatusType | null;
  ViolatorCount?: number | null;
  EvaluationLimitExceeded?: boolean | null;
}

// refs: 1 - tags: output, named, enum
export type PolicyComplianceStatusType =
| "COMPLIANT"
| "NON_COMPLIANT"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface PolicySummary {
  PolicyArn?: string | null;
  PolicyId?: string | null;
  PolicyName?: string | null;
  ResourceType?: string | null;
  SecurityServiceType?: SecurityServiceType | null;
  RemediationEnabled?: boolean | null;
}

// refs: 1 - tags: output, named, interface
export interface ProtocolsListDataSummary {
  ListArn?: string | null;
  ListId?: string | null;
  ListName?: string | null;
  ProtocolsList?: string[] | null;
}
