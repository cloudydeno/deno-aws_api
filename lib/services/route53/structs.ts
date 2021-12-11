// Autogenerated API structures for: Amazon Route 53

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface ActivateKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}

// refs: 1 - tags: named, input
export interface AssociateVPCWithHostedZoneRequest {
  HostedZoneId: string;
  VPC: VPC;
  Comment?: string | null;
}

// refs: 1 - tags: named, input
export interface ChangeResourceRecordSetsRequest {
  HostedZoneId: string;
  ChangeBatch: ChangeBatch;
}

// refs: 1 - tags: named, input
export interface ChangeTagsForResourceRequest {
  ResourceType: TagResourceType;
  ResourceId: string;
  AddTags?: Tag[] | null;
  RemoveTagKeys?: string[] | null;
}

// refs: 1 - tags: named, input
export interface CreateHealthCheckRequest {
  CallerReference: string;
  HealthCheckConfig: HealthCheckConfig;
}

// refs: 1 - tags: named, input
export interface CreateHostedZoneRequest {
  Name: string;
  VPC?: VPC | null;
  CallerReference: string;
  HostedZoneConfig?: HostedZoneConfig | null;
  DelegationSetId?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateKeySigningKeyRequest {
  CallerReference: string;
  HostedZoneId: string;
  KeyManagementServiceArn: string;
  Name: string;
  Status: string;
}

// refs: 1 - tags: named, input
export interface CreateQueryLoggingConfigRequest {
  HostedZoneId: string;
  CloudWatchLogsLogGroupArn: string;
}

// refs: 1 - tags: named, input
export interface CreateReusableDelegationSetRequest {
  CallerReference: string;
  HostedZoneId?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateTrafficPolicyRequest {
  Name: string;
  Document: string;
  Comment?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateTrafficPolicyInstanceRequest {
  HostedZoneId: string;
  Name: string;
  TTL: number;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
}

// refs: 1 - tags: named, input
export interface CreateTrafficPolicyVersionRequest {
  Id: string;
  Document: string;
  Comment?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateVPCAssociationAuthorizationRequest {
  HostedZoneId: string;
  VPC: VPC;
}

// refs: 1 - tags: named, input
export interface DeactivateKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}

// refs: 1 - tags: named, input
export interface DeleteHealthCheckRequest {
  HealthCheckId: string;
}

// refs: 1 - tags: named, input
export interface DeleteHostedZoneRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeleteKeySigningKeyRequest {
  HostedZoneId: string;
  Name: string;
}

// refs: 1 - tags: named, input
export interface DeleteQueryLoggingConfigRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeleteReusableDelegationSetRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeleteTrafficPolicyRequest {
  Id: string;
  Version: number;
}

// refs: 1 - tags: named, input
export interface DeleteTrafficPolicyInstanceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeleteVPCAssociationAuthorizationRequest {
  HostedZoneId: string;
  VPC: VPC;
}

// refs: 1 - tags: named, input
export interface DisableHostedZoneDNSSECRequest {
  HostedZoneId: string;
}

// refs: 1 - tags: named, input
export interface DisassociateVPCFromHostedZoneRequest {
  HostedZoneId: string;
  VPC: VPC;
  Comment?: string | null;
}

// refs: 1 - tags: named, input
export interface EnableHostedZoneDNSSECRequest {
  HostedZoneId: string;
}

// refs: 1 - tags: named, input
export interface GetAccountLimitRequest {
  Type: AccountLimitType;
}

// refs: 1 - tags: named, input
export interface GetChangeRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface GetDNSSECRequest {
  HostedZoneId: string;
}

// refs: 1 - tags: named, input
export interface GetGeoLocationRequest {
  ContinentCode?: string | null;
  CountryCode?: string | null;
  SubdivisionCode?: string | null;
}

// refs: 1 - tags: named, input
export interface GetHealthCheckRequest {
  HealthCheckId: string;
}

// refs: 1 - tags: named, input
export interface GetHealthCheckLastFailureReasonRequest {
  HealthCheckId: string;
}

// refs: 1 - tags: named, input
export interface GetHealthCheckStatusRequest {
  HealthCheckId: string;
}

// refs: 1 - tags: named, input
export interface GetHostedZoneRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface GetHostedZoneLimitRequest {
  Type: HostedZoneLimitType;
  HostedZoneId: string;
}

// refs: 1 - tags: named, input
export interface GetQueryLoggingConfigRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface GetReusableDelegationSetRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface GetReusableDelegationSetLimitRequest {
  Type: ReusableDelegationSetLimitType;
  DelegationSetId: string;
}

// refs: 1 - tags: named, input
export interface GetTrafficPolicyRequest {
  Id: string;
  Version: number;
}

// refs: 1 - tags: named, input
export interface GetTrafficPolicyInstanceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface ListGeoLocationsRequest {
  StartContinentCode?: string | null;
  StartCountryCode?: string | null;
  StartSubdivisionCode?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListHealthChecksRequest {
  Marker?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListHostedZonesRequest {
  Marker?: string | null;
  MaxItems?: string | null;
  DelegationSetId?: string | null;
}

// refs: 1 - tags: named, input
export interface ListHostedZonesByNameRequest {
  DNSName?: string | null;
  HostedZoneId?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListHostedZonesByVPCRequest {
  VPCId: string;
  VPCRegion: VPCRegion;
  MaxItems?: string | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListQueryLoggingConfigsRequest {
  HostedZoneId?: string | null;
  NextToken?: string | null;
  MaxResults?: string | null;
}

// refs: 1 - tags: named, input
export interface ListResourceRecordSetsRequest {
  HostedZoneId: string;
  StartRecordName?: string | null;
  StartRecordType?: RRType | null;
  StartRecordIdentifier?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListReusableDelegationSetsRequest {
  Marker?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceType: TagResourceType;
  ResourceId: string;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourcesRequest {
  ResourceType: TagResourceType;
  ResourceIds: string[];
}

// refs: 1 - tags: named, input
export interface ListTrafficPoliciesRequest {
  TrafficPolicyIdMarker?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTrafficPolicyInstancesRequest {
  HostedZoneIdMarker?: string | null;
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTrafficPolicyInstancesByHostedZoneRequest {
  HostedZoneId: string;
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTrafficPolicyInstancesByPolicyRequest {
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
  HostedZoneIdMarker?: string | null;
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTrafficPolicyVersionsRequest {
  Id: string;
  TrafficPolicyVersionMarker?: string | null;
  MaxItems?: string | null;
}

// refs: 1 - tags: named, input
export interface ListVPCAssociationAuthorizationsRequest {
  HostedZoneId: string;
  NextToken?: string | null;
  MaxResults?: string | null;
}

// refs: 1 - tags: named, input
export interface TestDNSAnswerRequest {
  HostedZoneId: string;
  RecordName: string;
  RecordType: RRType;
  ResolverIP?: string | null;
  EDNS0ClientSubnetIP?: string | null;
  EDNS0ClientSubnetMask?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateHealthCheckRequest {
  HealthCheckId: string;
  HealthCheckVersion?: number | null;
  IPAddress?: string | null;
  Port?: number | null;
  ResourcePath?: string | null;
  FullyQualifiedDomainName?: string | null;
  SearchString?: string | null;
  FailureThreshold?: number | null;
  Inverted?: boolean | null;
  Disabled?: boolean | null;
  HealthThreshold?: number | null;
  ChildHealthChecks?: string[] | null;
  EnableSNI?: boolean | null;
  Regions?: HealthCheckRegion[] | null;
  AlarmIdentifier?: AlarmIdentifier | null;
  InsufficientDataHealthStatus?: InsufficientDataHealthStatus | null;
  ResetElements?: ResettableElementName[] | null;
}

// refs: 1 - tags: named, input
export interface UpdateHostedZoneCommentRequest {
  Id: string;
  Comment?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateTrafficPolicyCommentRequest {
  Id: string;
  Version: number;
  Comment: string;
}

// refs: 1 - tags: named, input
export interface UpdateTrafficPolicyInstanceRequest {
  Id: string;
  TTL: number;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
}

// refs: 1 - tags: named, output
export interface ActivateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface AssociateVPCWithHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface ChangeResourceRecordSetsResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface CreateHealthCheckResponse {
  HealthCheck: HealthCheck;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateHostedZoneResponse {
  HostedZone: HostedZone;
  ChangeInfo: ChangeInfo;
  DelegationSet: DelegationSet;
  VPC?: VPC | null;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
  KeySigningKey: KeySigningKey;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateQueryLoggingConfigResponse {
  QueryLoggingConfig: QueryLoggingConfig;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateReusableDelegationSetResponse {
  DelegationSet: DelegationSet;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateTrafficPolicyResponse {
  TrafficPolicy: TrafficPolicy;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateTrafficPolicyVersionResponse {
  TrafficPolicy: TrafficPolicy;
  Location: string;
}

// refs: 1 - tags: named, output
export interface CreateVPCAssociationAuthorizationResponse {
  HostedZoneId: string;
  VPC: VPC;
}

// refs: 1 - tags: named, output
export interface DeactivateKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface DeleteHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface DeleteKeySigningKeyResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface DisableHostedZoneDNSSECResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface DisassociateVPCFromHostedZoneResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface EnableHostedZoneDNSSECResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface GetAccountLimitResponse {
  Limit: AccountLimit;
  Count: number;
}

// refs: 1 - tags: named, output
export interface GetChangeResponse {
  ChangeInfo: ChangeInfo;
}

// refs: 1 - tags: named, output
export interface GetCheckerIpRangesResponse {
  CheckerIpRanges: string[];
}

// refs: 1 - tags: named, output
export interface GetDNSSECResponse {
  Status: DNSSECStatus;
  KeySigningKeys: KeySigningKey[];
}

// refs: 1 - tags: named, output
export interface GetGeoLocationResponse {
  GeoLocationDetails: GeoLocationDetails;
}

// refs: 1 - tags: named, output
export interface GetHealthCheckResponse {
  HealthCheck: HealthCheck;
}

// refs: 1 - tags: named, output
export interface GetHealthCheckCountResponse {
  HealthCheckCount: number;
}

// refs: 1 - tags: named, output
export interface GetHealthCheckLastFailureReasonResponse {
  HealthCheckObservations: HealthCheckObservation[];
}

// refs: 1 - tags: named, output
export interface GetHealthCheckStatusResponse {
  HealthCheckObservations: HealthCheckObservation[];
}

// refs: 1 - tags: named, output
export interface GetHostedZoneResponse {
  HostedZone: HostedZone;
  DelegationSet?: DelegationSet | null;
  VPCs: VPC[];
}

// refs: 1 - tags: named, output
export interface GetHostedZoneCountResponse {
  HostedZoneCount: number;
}

// refs: 1 - tags: named, output
export interface GetHostedZoneLimitResponse {
  Limit: HostedZoneLimit;
  Count: number;
}

// refs: 1 - tags: named, output
export interface GetQueryLoggingConfigResponse {
  QueryLoggingConfig: QueryLoggingConfig;
}

// refs: 1 - tags: named, output
export interface GetReusableDelegationSetResponse {
  DelegationSet: DelegationSet;
}

// refs: 1 - tags: named, output
export interface GetReusableDelegationSetLimitResponse {
  Limit: ReusableDelegationSetLimit;
  Count: number;
}

// refs: 1 - tags: named, output
export interface GetTrafficPolicyResponse {
  TrafficPolicy: TrafficPolicy;
}

// refs: 1 - tags: named, output
export interface GetTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
}

// refs: 1 - tags: named, output
export interface GetTrafficPolicyInstanceCountResponse {
  TrafficPolicyInstanceCount: number;
}

// refs: 1 - tags: named, output
export interface ListGeoLocationsResponse {
  GeoLocationDetailsList: GeoLocationDetails[];
  IsTruncated: boolean;
  NextContinentCode?: string | null;
  NextCountryCode?: string | null;
  NextSubdivisionCode?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListHealthChecksResponse {
  HealthChecks: HealthCheck[];
  Marker: string;
  IsTruncated: boolean;
  NextMarker?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListHostedZonesResponse {
  HostedZones: HostedZone[];
  Marker?: string | null;
  IsTruncated: boolean;
  NextMarker?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListHostedZonesByNameResponse {
  HostedZones: HostedZone[];
  DNSName?: string | null;
  HostedZoneId?: string | null;
  IsTruncated: boolean;
  NextDNSName?: string | null;
  NextHostedZoneId?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListHostedZonesByVPCResponse {
  HostedZoneSummaries: HostedZoneSummary[];
  MaxItems: string;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListQueryLoggingConfigsResponse {
  QueryLoggingConfigs: QueryLoggingConfig[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListResourceRecordSetsResponse {
  ResourceRecordSets: ResourceRecordSet[];
  IsTruncated: boolean;
  NextRecordName?: string | null;
  NextRecordType?: RRType | null;
  NextRecordIdentifier?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListReusableDelegationSetsResponse {
  DelegationSets: DelegationSet[];
  Marker: string;
  IsTruncated: boolean;
  NextMarker?: string | null;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  ResourceTagSet: ResourceTagSet;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourcesResponse {
  ResourceTagSets: ResourceTagSet[];
}

// refs: 1 - tags: named, output
export interface ListTrafficPoliciesResponse {
  TrafficPolicySummaries: TrafficPolicySummary[];
  IsTruncated: boolean;
  TrafficPolicyIdMarker: string;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListTrafficPolicyInstancesResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  HostedZoneIdMarker?: string | null;
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  IsTruncated: boolean;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListTrafficPolicyInstancesByHostedZoneResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  IsTruncated: boolean;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListTrafficPolicyInstancesByPolicyResponse {
  TrafficPolicyInstances: TrafficPolicyInstance[];
  HostedZoneIdMarker?: string | null;
  TrafficPolicyInstanceNameMarker?: string | null;
  TrafficPolicyInstanceTypeMarker?: RRType | null;
  IsTruncated: boolean;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListTrafficPolicyVersionsResponse {
  TrafficPolicies: TrafficPolicy[];
  IsTruncated: boolean;
  TrafficPolicyVersionMarker: string;
  MaxItems: string;
}

// refs: 1 - tags: named, output
export interface ListVPCAssociationAuthorizationsResponse {
  HostedZoneId: string;
  NextToken?: string | null;
  VPCs: VPC[];
}

// refs: 1 - tags: named, output
export interface TestDNSAnswerResponse {
  Nameserver: string;
  RecordName: string;
  RecordType: RRType;
  RecordData: string[];
  ResponseCode: string;
  Protocol: string;
}

// refs: 1 - tags: named, output
export interface UpdateHealthCheckResponse {
  HealthCheck: HealthCheck;
}

// refs: 1 - tags: named, output
export interface UpdateHostedZoneCommentResponse {
  HostedZone: HostedZone;
}

// refs: 1 - tags: named, output
export interface UpdateTrafficPolicyCommentResponse {
  TrafficPolicy: TrafficPolicy;
}

// refs: 1 - tags: named, output
export interface UpdateTrafficPolicyInstanceResponse {
  TrafficPolicyInstance: TrafficPolicyInstance;
}

// refs: 9 - tags: input, named, interface, output
export interface VPC {
  VPCRegion?: VPCRegion | null;
  VPCId?: string | null;
}

// refs: 10 - tags: input, named, enum, output
export type VPCRegion =
| "us-east-1"
| "us-east-2"
| "us-west-1"
| "us-west-2"
| "eu-west-1"
| "eu-west-2"
| "eu-west-3"
| "eu-central-1"
| "ap-east-1"
| "me-south-1"
| "us-gov-west-1"
| "us-gov-east-1"
| "us-iso-east-1"
| "us-iso-west-1"
| "us-isob-east-1"
| "ap-southeast-1"
| "ap-southeast-2"
| "ap-southeast-3"
| "ap-south-1"
| "ap-northeast-1"
| "ap-northeast-2"
| "ap-northeast-3"
| "eu-north-1"
| "sa-east-1"
| "ca-central-1"
| "cn-north-1"
| "af-south-1"
| "eu-south-1"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ChangeBatch {
  Comment?: string | null;
  Changes: Change[];
}

// refs: 1 - tags: input, named, interface
export interface Change {
  Action: ChangeAction;
  ResourceRecordSet: ResourceRecordSet;
}

// refs: 1 - tags: input, named, enum
export type ChangeAction =
| "CREATE"
| "DELETE"
| "UPSERT"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface ResourceRecordSet {
  Name: string;
  Type: RRType;
  SetIdentifier?: string | null;
  Weight?: number | null;
  Region?: ResourceRecordSetRegion | null;
  GeoLocation?: GeoLocation | null;
  Failover?: ResourceRecordSetFailover | null;
  MultiValueAnswer?: boolean | null;
  TTL?: number | null;
  ResourceRecords: ResourceRecord[];
  AliasTarget?: AliasTarget | null;
  HealthCheckId?: string | null;
  TrafficPolicyInstanceId?: string | null;
}

// refs: 24 - tags: input, named, enum, output
export type RRType =
| "SOA"
| "A"
| "TXT"
| "NS"
| "CNAME"
| "MX"
| "NAPTR"
| "PTR"
| "SRV"
| "SPF"
| "AAAA"
| "CAA"
| "DS"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type ResourceRecordSetRegion =
| "us-east-1"
| "us-east-2"
| "us-west-1"
| "us-west-2"
| "ca-central-1"
| "eu-west-1"
| "eu-west-2"
| "eu-west-3"
| "eu-central-1"
| "ap-southeast-1"
| "ap-southeast-2"
| "ap-southeast-3"
| "ap-northeast-1"
| "ap-northeast-2"
| "ap-northeast-3"
| "eu-north-1"
| "sa-east-1"
| "cn-north-1"
| "cn-northwest-1"
| "ap-east-1"
| "me-south-1"
| "ap-south-1"
| "af-south-1"
| "eu-south-1"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface GeoLocation {
  ContinentCode?: string | null;
  CountryCode?: string | null;
  SubdivisionCode?: string | null;
}

// refs: 2 - tags: input, named, enum, output
export type ResourceRecordSetFailover =
| "PRIMARY"
| "SECONDARY"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface ResourceRecord {
  Value: string;
}

// refs: 2 - tags: input, named, interface, output
export interface AliasTarget {
  HostedZoneId: string;
  DNSName: string;
  EvaluateTargetHealth: boolean;
}

// refs: 5 - tags: input, named, enum, output
export type TagResourceType =
| "healthcheck"
| "hostedzone"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface Tag {
  Key?: string | null;
  Value?: string | null;
}

// refs: 5 - tags: input, named, interface, output
export interface HealthCheckConfig {
  IPAddress?: string | null;
  Port?: number | null;
  Type: HealthCheckType;
  ResourcePath?: string | null;
  FullyQualifiedDomainName?: string | null;
  SearchString?: string | null;
  RequestInterval?: number | null;
  FailureThreshold?: number | null;
  MeasureLatency?: boolean | null;
  Inverted?: boolean | null;
  Disabled?: boolean | null;
  HealthThreshold?: number | null;
  ChildHealthChecks: string[];
  EnableSNI?: boolean | null;
  Regions: HealthCheckRegion[];
  AlarmIdentifier?: AlarmIdentifier | null;
  InsufficientDataHealthStatus?: InsufficientDataHealthStatus | null;
  RoutingControlArn?: string | null;
}

// refs: 5 - tags: input, named, enum, output
export type HealthCheckType =
| "HTTP"
| "HTTPS"
| "HTTP_STR_MATCH"
| "HTTPS_STR_MATCH"
| "TCP"
| "CALCULATED"
| "CLOUDWATCH_METRIC"
| "RECOVERY_CONTROL"
| cmnP.UnexpectedEnumValue;

// refs: 8 - tags: input, named, enum, output
export type HealthCheckRegion =
| "us-east-1"
| "us-west-1"
| "us-west-2"
| "eu-west-1"
| "ap-southeast-1"
| "ap-southeast-2"
| "ap-northeast-1"
| "sa-east-1"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface AlarmIdentifier {
  Region: CloudWatchRegion;
  Name: string;
}

// refs: 6 - tags: input, named, enum, output
export type CloudWatchRegion =
| "us-east-1"
| "us-east-2"
| "us-west-1"
| "us-west-2"
| "ca-central-1"
| "eu-central-1"
| "eu-west-1"
| "eu-west-2"
| "eu-west-3"
| "ap-east-1"
| "me-south-1"
| "ap-south-1"
| "ap-southeast-1"
| "ap-southeast-2"
| "ap-southeast-3"
| "ap-northeast-1"
| "ap-northeast-2"
| "ap-northeast-3"
| "eu-north-1"
| "sa-east-1"
| "cn-northwest-1"
| "cn-north-1"
| "af-south-1"
| "eu-south-1"
| "us-gov-west-1"
| "us-gov-east-1"
| "us-iso-east-1"
| "us-iso-west-1"
| "us-isob-east-1"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, enum, output
export type InsufficientDataHealthStatus =
| "Healthy"
| "Unhealthy"
| "LastKnownStatus"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface HostedZoneConfig {
  Comment?: string | null;
  PrivateZone?: boolean | null;
}

// refs: 2 - tags: input, named, enum, output
export type AccountLimitType =
| "MAX_HEALTH_CHECKS_BY_OWNER"
| "MAX_HOSTED_ZONES_BY_OWNER"
| "MAX_TRAFFIC_POLICY_INSTANCES_BY_OWNER"
| "MAX_REUSABLE_DELEGATION_SETS_BY_OWNER"
| "MAX_TRAFFIC_POLICIES_BY_OWNER"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type HostedZoneLimitType =
| "MAX_RRSETS_BY_ZONE"
| "MAX_VPCS_ASSOCIATED_BY_ZONE"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type ReusableDelegationSetLimitType =
| "MAX_ZONES_BY_REUSABLE_DELEGATION_SET"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type ResettableElementName =
| "FullyQualifiedDomainName"
| "Regions"
| "ResourcePath"
| "ChildHealthChecks"
| cmnP.UnexpectedEnumValue;

// refs: 12 - tags: output, named, interface
export interface ChangeInfo {
  Id: string;
  Status: ChangeStatus;
  SubmittedAt: Date | number;
  Comment?: string | null;
}

// refs: 12 - tags: output, named, enum
export type ChangeStatus =
| "PENDING"
| "INSYNC"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: output, named, interface
export interface HealthCheck {
  Id: string;
  CallerReference: string;
  LinkedService?: LinkedService | null;
  HealthCheckConfig: HealthCheckConfig;
  HealthCheckVersion: number;
  CloudWatchAlarmConfiguration?: CloudWatchAlarmConfiguration | null;
}

// refs: 9 - tags: output, named, interface
export interface LinkedService {
  ServicePrincipal?: string | null;
  Description?: string | null;
}

// refs: 4 - tags: output, named, interface
export interface CloudWatchAlarmConfiguration {
  EvaluationPeriods: number;
  Threshold: number;
  ComparisonOperator: ComparisonOperator;
  Period: number;
  MetricName: string;
  Namespace: string;
  Statistic: Statistic;
  Dimensions: Dimension[];
}

// refs: 4 - tags: output, named, enum
export type ComparisonOperator =
| "GreaterThanOrEqualToThreshold"
| "GreaterThanThreshold"
| "LessThanThreshold"
| "LessThanOrEqualToThreshold"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: output, named, enum
export type Statistic =
| "Average"
| "Sum"
| "SampleCount"
| "Maximum"
| "Minimum"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: output, named, interface
export interface Dimension {
  Name: string;
  Value: string;
}

// refs: 5 - tags: output, named, interface
export interface HostedZone {
  Id: string;
  Name: string;
  CallerReference: string;
  Config?: HostedZoneConfig | null;
  ResourceRecordSetCount?: number | null;
  LinkedService?: LinkedService | null;
}

// refs: 5 - tags: output, named, interface
export interface DelegationSet {
  Id?: string | null;
  CallerReference?: string | null;
  NameServers: string[];
}

// refs: 2 - tags: output, named, interface
export interface KeySigningKey {
  Name?: string | null;
  KmsArn?: string | null;
  Flag?: number | null;
  SigningAlgorithmMnemonic?: string | null;
  SigningAlgorithmType?: number | null;
  DigestAlgorithmMnemonic?: string | null;
  DigestAlgorithmType?: number | null;
  KeyTag?: number | null;
  DigestValue?: string | null;
  PublicKey?: string | null;
  DSRecord?: string | null;
  DNSKEYRecord?: string | null;
  Status?: string | null;
  StatusMessage?: string | null;
  CreatedDate?: Date | number | null;
  LastModifiedDate?: Date | number | null;
}

// refs: 3 - tags: output, named, interface
export interface QueryLoggingConfig {
  Id: string;
  HostedZoneId: string;
  CloudWatchLogsLogGroupArn: string;
}

// refs: 5 - tags: output, named, interface
export interface TrafficPolicy {
  Id: string;
  Version: number;
  Name: string;
  Type: RRType;
  Document: string;
  Comment?: string | null;
}

// refs: 6 - tags: output, named, interface
export interface TrafficPolicyInstance {
  Id: string;
  HostedZoneId: string;
  Name: string;
  TTL: number;
  State: string;
  Message: string;
  TrafficPolicyId: string;
  TrafficPolicyVersion: number;
  TrafficPolicyType: RRType;
}

// refs: 1 - tags: output, named, interface
export interface AccountLimit {
  Type: AccountLimitType;
  Value: number;
}

// refs: 1 - tags: output, named, interface
export interface DNSSECStatus {
  ServeSignature?: string | null;
  StatusMessage?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface GeoLocationDetails {
  ContinentCode?: string | null;
  ContinentName?: string | null;
  CountryCode?: string | null;
  CountryName?: string | null;
  SubdivisionCode?: string | null;
  SubdivisionName?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface HealthCheckObservation {
  Region?: HealthCheckRegion | null;
  IPAddress?: string | null;
  StatusReport?: StatusReport | null;
}

// refs: 2 - tags: output, named, interface
export interface StatusReport {
  Status?: string | null;
  CheckedTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface HostedZoneLimit {
  Type: HostedZoneLimitType;
  Value: number;
}

// refs: 1 - tags: output, named, interface
export interface ReusableDelegationSetLimit {
  Type: ReusableDelegationSetLimitType;
  Value: number;
}

// refs: 1 - tags: output, named, interface
export interface HostedZoneSummary {
  HostedZoneId: string;
  Name: string;
  Owner: HostedZoneOwner;
}

// refs: 1 - tags: output, named, interface
export interface HostedZoneOwner {
  OwningAccount?: string | null;
  OwningService?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface ResourceTagSet {
  ResourceType?: TagResourceType | null;
  ResourceId?: string | null;
  Tags: Tag[];
}

// refs: 1 - tags: output, named, interface
export interface TrafficPolicySummary {
  Id: string;
  Name: string;
  Type: RRType;
  LatestVersion: number;
  TrafficPolicyCount: number;
}
