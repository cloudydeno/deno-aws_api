// Autogenerated API structures for: Amazon WorkLink

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface AssociateDomainRequest {
  FleetArn: string;
  DomainName: string;
  DisplayName?: string | null;
  AcmCertificateArn: string;
}

// refs: 1 - tags: named, input
export interface AssociateWebsiteAuthorizationProviderRequest {
  FleetArn: string;
  AuthorizationProviderType: AuthorizationProviderType;
  DomainName?: string | null;
}

// refs: 1 - tags: named, input
export interface AssociateWebsiteCertificateAuthorityRequest {
  FleetArn: string;
  Certificate: string;
  DisplayName?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateFleetRequest {
  FleetName: string;
  DisplayName?: string | null;
  OptimizeForEndUserLocation?: boolean | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface DeleteFleetRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeAuditStreamConfigurationRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeCompanyNetworkConfigurationRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeDeviceRequest {
  FleetArn: string;
  DeviceId: string;
}

// refs: 1 - tags: named, input
export interface DescribeDevicePolicyConfigurationRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeDomainRequest {
  FleetArn: string;
  DomainName: string;
}

// refs: 1 - tags: named, input
export interface DescribeFleetMetadataRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeIdentityProviderConfigurationRequest {
  FleetArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeWebsiteCertificateAuthorityRequest {
  FleetArn: string;
  WebsiteCaId: string;
}

// refs: 1 - tags: named, input
export interface DisassociateDomainRequest {
  FleetArn: string;
  DomainName: string;
}

// refs: 1 - tags: named, input
export interface DisassociateWebsiteAuthorizationProviderRequest {
  FleetArn: string;
  AuthorizationProviderId: string;
}

// refs: 1 - tags: named, input
export interface DisassociateWebsiteCertificateAuthorityRequest {
  FleetArn: string;
  WebsiteCaId: string;
}

// refs: 1 - tags: named, input
export interface ListDevicesRequest {
  FleetArn: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDomainsRequest {
  FleetArn: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListFleetsRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface ListWebsiteAuthorizationProvidersRequest {
  FleetArn: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListWebsiteCertificateAuthoritiesRequest {
  FleetArn: string;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface RestoreDomainAccessRequest {
  FleetArn: string;
  DomainName: string;
}

// refs: 1 - tags: named, input
export interface RevokeDomainAccessRequest {
  FleetArn: string;
  DomainName: string;
}

// refs: 1 - tags: named, input
export interface SignOutUserRequest {
  FleetArn: string;
  Username: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateAuditStreamConfigurationRequest {
  FleetArn: string;
  AuditStreamArn?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateCompanyNetworkConfigurationRequest {
  FleetArn: string;
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
}

// refs: 1 - tags: named, input
export interface UpdateDevicePolicyConfigurationRequest {
  FleetArn: string;
  DeviceCaCertificate?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateDomainMetadataRequest {
  FleetArn: string;
  DomainName: string;
  DisplayName?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateFleetMetadataRequest {
  FleetArn: string;
  DisplayName?: string | null;
  OptimizeForEndUserLocation?: boolean | null;
}

// refs: 1 - tags: named, input
export interface UpdateIdentityProviderConfigurationRequest {
  FleetArn: string;
  IdentityProviderType: IdentityProviderType;
  IdentityProviderSamlMetadata?: string | null;
}

// refs: 1 - tags: named, output
export interface AssociateWebsiteAuthorizationProviderResponse {
  AuthorizationProviderId?: string | null;
}

// refs: 1 - tags: named, output
export interface AssociateWebsiteCertificateAuthorityResponse {
  WebsiteCaId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateFleetResponse {
  FleetArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeAuditStreamConfigurationResponse {
  AuditStreamArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeCompanyNetworkConfigurationResponse {
  VpcId?: string | null;
  SubnetIds?: string[] | null;
  SecurityGroupIds?: string[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeDeviceResponse {
  Status?: DeviceStatus | null;
  Model?: string | null;
  Manufacturer?: string | null;
  OperatingSystem?: string | null;
  OperatingSystemVersion?: string | null;
  PatchLevel?: string | null;
  FirstAccessedTime?: Date | number | null;
  LastAccessedTime?: Date | number | null;
  Username?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeDevicePolicyConfigurationResponse {
  DeviceCaCertificate?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeDomainResponse {
  DomainName?: string | null;
  DisplayName?: string | null;
  CreatedTime?: Date | number | null;
  DomainStatus?: DomainStatus | null;
  AcmCertificateArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeFleetMetadataResponse {
  CreatedTime?: Date | number | null;
  LastUpdatedTime?: Date | number | null;
  FleetName?: string | null;
  DisplayName?: string | null;
  OptimizeForEndUserLocation?: boolean | null;
  CompanyCode?: string | null;
  FleetStatus?: FleetStatus | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface DescribeIdentityProviderConfigurationResponse {
  IdentityProviderType?: IdentityProviderType | null;
  ServiceProviderSamlMetadata?: string | null;
  IdentityProviderSamlMetadata?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeWebsiteCertificateAuthorityResponse {
  Certificate?: string | null;
  CreatedTime?: Date | number | null;
  DisplayName?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDevicesResponse {
  Devices?: DeviceSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDomainsResponse {
  Domains?: DomainSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListFleetsResponse {
  FleetSummaryList?: FleetSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface ListWebsiteAuthorizationProvidersResponse {
  WebsiteAuthorizationProviders?: WebsiteAuthorizationProviderSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListWebsiteCertificateAuthoritiesResponse {
  WebsiteCertificateAuthorities?: WebsiteCaSummary[] | null;
  NextToken?: string | null;
}

// refs: 2 - tags: input, named, enum, output
export type AuthorizationProviderType =
| "SAML"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type IdentityProviderType =
| "SAML"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type DeviceStatus =
| "ACTIVE"
| "SIGNED_OUT"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type DomainStatus =
| "PENDING_VALIDATION"
| "ASSOCIATING"
| "ACTIVE"
| "INACTIVE"
| "DISASSOCIATING"
| "DISASSOCIATED"
| "FAILED_TO_ASSOCIATE"
| "FAILED_TO_DISASSOCIATE"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type FleetStatus =
| "CREATING"
| "ACTIVE"
| "DELETING"
| "DELETED"
| "FAILED_TO_CREATE"
| "FAILED_TO_DELETE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface DeviceSummary {
  DeviceId?: string | null;
  DeviceStatus?: DeviceStatus | null;
}

// refs: 1 - tags: output, named, interface
export interface DomainSummary {
  DomainName: string;
  DisplayName?: string | null;
  CreatedTime: Date | number;
  DomainStatus: DomainStatus;
}

// refs: 1 - tags: output, named, interface
export interface FleetSummary {
  FleetArn?: string | null;
  CreatedTime?: Date | number | null;
  LastUpdatedTime?: Date | number | null;
  FleetName?: string | null;
  DisplayName?: string | null;
  CompanyCode?: string | null;
  FleetStatus?: FleetStatus | null;
  Tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface WebsiteAuthorizationProviderSummary {
  AuthorizationProviderId?: string | null;
  AuthorizationProviderType: AuthorizationProviderType;
  DomainName?: string | null;
  CreatedTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface WebsiteCaSummary {
  WebsiteCaId?: string | null;
  CreatedTime?: Date | number | null;
  DisplayName?: string | null;
}
