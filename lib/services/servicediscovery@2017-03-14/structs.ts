// Autogenerated API structures for: AWS Cloud Map

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateHttpNamespaceRequest {
  Name: string;
  CreatorRequestId?: string | null;
  Description?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreatePrivateDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string | null;
  Description?: string | null;
  Vpc: string;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreatePublicDnsNamespaceRequest {
  Name: string;
  CreatorRequestId?: string | null;
  Description?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateServiceRequest {
  Name: string;
  NamespaceId?: string | null;
  CreatorRequestId?: string | null;
  Description?: string | null;
  DnsConfig?: DnsConfig | null;
  HealthCheckConfig?: HealthCheckConfig | null;
  HealthCheckCustomConfig?: HealthCheckCustomConfig | null;
  Tags?: Tag[] | null;
  Type?: ServiceTypeOption | null;
}

// refs: 1 - tags: named, input
export interface DeleteNamespaceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeleteServiceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface DeregisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}

// refs: 1 - tags: named, input
export interface DiscoverInstancesRequest {
  NamespaceName: string;
  ServiceName: string;
  MaxResults?: number | null;
  QueryParameters?: { [key: string]: string | null | undefined } | null;
  OptionalParameters?: { [key: string]: string | null | undefined } | null;
  HealthStatus?: HealthStatusFilter | null;
}

// refs: 1 - tags: named, input
export interface GetInstanceRequest {
  ServiceId: string;
  InstanceId: string;
}

// refs: 1 - tags: named, input
export interface GetInstancesHealthStatusRequest {
  ServiceId: string;
  Instances?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface GetNamespaceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface GetOperationRequest {
  OperationId: string;
}

// refs: 1 - tags: named, input
export interface GetServiceRequest {
  Id: string;
}

// refs: 1 - tags: named, input
export interface ListInstancesRequest {
  ServiceId: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListNamespacesRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
  Filters?: NamespaceFilter[] | null;
}

// refs: 1 - tags: named, input
export interface ListOperationsRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
  Filters?: OperationFilter[] | null;
}

// refs: 1 - tags: named, input
export interface ListServicesRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
  Filters?: ServiceFilter[] | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}

// refs: 1 - tags: named, input
export interface RegisterInstanceRequest {
  ServiceId: string;
  InstanceId: string;
  CreatorRequestId?: string | null;
  Attributes: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateInstanceCustomHealthStatusRequest {
  ServiceId: string;
  InstanceId: string;
  Status: CustomHealthStatus;
}

// refs: 1 - tags: named, input
export interface UpdateServiceRequest {
  Id: string;
  Service: ServiceChange;
}

// refs: 1 - tags: named, output
export interface CreateHttpNamespaceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreatePrivateDnsNamespaceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreatePublicDnsNamespaceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateServiceResponse {
  Service?: Service | null;
}

// refs: 1 - tags: named, output
export interface DeleteNamespaceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface DeregisterInstanceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface DiscoverInstancesResponse {
  Instances?: HttpInstanceSummary[] | null;
}

// refs: 1 - tags: named, output
export interface GetInstanceResponse {
  Instance?: Instance | null;
}

// refs: 1 - tags: named, output
export interface GetInstancesHealthStatusResponse {
  Status?: { [key: string]: HealthStatus | null | undefined } | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetNamespaceResponse {
  Namespace?: Namespace | null;
}

// refs: 1 - tags: named, output
export interface GetOperationResponse {
  Operation?: Operation | null;
}

// refs: 1 - tags: named, output
export interface GetServiceResponse {
  Service?: Service | null;
}

// refs: 1 - tags: named, output
export interface ListInstancesResponse {
  Instances?: InstanceSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListNamespacesResponse {
  Namespaces?: NamespaceSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListOperationsResponse {
  Operations?: OperationSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListServicesResponse {
  Services?: ServiceSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface RegisterInstanceResponse {
  OperationId?: string | null;
}

// refs: 1 - tags: named, output
export interface UpdateServiceResponse {
  OperationId?: string | null;
}

// refs: 6 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 4 - tags: input, named, interface, output
export interface DnsConfig {
  NamespaceId?: string | null;
  RoutingPolicy?: RoutingPolicy | null;
  DnsRecords: DnsRecord[];
}

// refs: 4 - tags: input, named, enum, output
export type RoutingPolicy =
| "MULTIVALUE"
| "WEIGHTED"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, interface, output
export interface DnsRecord {
  Type: RecordType;
  TTL: number;
}

// refs: 5 - tags: input, named, enum, output
export type RecordType =
| "SRV"
| "A"
| "AAAA"
| "CNAME"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, interface, output
export interface HealthCheckConfig {
  Type: HealthCheckType;
  ResourcePath?: string | null;
  FailureThreshold?: number | null;
}

// refs: 5 - tags: input, named, enum, output
export type HealthCheckType =
| "HTTP"
| "HTTPS"
| "TCP"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface HealthCheckCustomConfig {
  FailureThreshold?: number | null;
}

// refs: 1 - tags: input, named, enum
export type ServiceTypeOption =
| "HTTP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type HealthStatusFilter =
| "HEALTHY"
| "UNHEALTHY"
| "ALL"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface NamespaceFilter {
  Name: NamespaceFilterName;
  Values: string[];
  Condition?: FilterCondition | null;
}

// refs: 1 - tags: input, named, enum
export type NamespaceFilterName =
| "TYPE"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum
export type FilterCondition =
| "EQ"
| "IN"
| "BETWEEN"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface OperationFilter {
  Name: OperationFilterName;
  Values: string[];
  Condition?: FilterCondition | null;
}

// refs: 1 - tags: input, named, enum
export type OperationFilterName =
| "NAMESPACE_ID"
| "SERVICE_ID"
| "STATUS"
| "TYPE"
| "UPDATE_DATE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ServiceFilter {
  Name: ServiceFilterName;
  Values: string[];
  Condition?: FilterCondition | null;
}

// refs: 1 - tags: input, named, enum
export type ServiceFilterName =
| "NAMESPACE_ID"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type CustomHealthStatus =
| "HEALTHY"
| "UNHEALTHY"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ServiceChange {
  Description?: string | null;
  DnsConfig?: DnsConfigChange | null;
  HealthCheckConfig?: HealthCheckConfig | null;
}

// refs: 1 - tags: input, named, interface
export interface DnsConfigChange {
  DnsRecords: DnsRecord[];
}

// refs: 2 - tags: output, named, interface
export interface Service {
  Id?: string | null;
  Arn?: string | null;
  Name?: string | null;
  NamespaceId?: string | null;
  Description?: string | null;
  InstanceCount?: number | null;
  DnsConfig?: DnsConfig | null;
  Type?: ServiceType | null;
  HealthCheckConfig?: HealthCheckConfig | null;
  HealthCheckCustomConfig?: HealthCheckCustomConfig | null;
  CreateDate?: Date | number | null;
  CreatorRequestId?: string | null;
}

// refs: 3 - tags: output, named, enum
export type ServiceType =
| "HTTP"
| "DNS_HTTP"
| "DNS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface HttpInstanceSummary {
  InstanceId?: string | null;
  NamespaceName?: string | null;
  ServiceName?: string | null;
  HealthStatus?: HealthStatus | null;
  Attributes?: { [key: string]: string | null | undefined } | null;
}

// refs: 2 - tags: output, named, enum
export type HealthStatus =
| "HEALTHY"
| "UNHEALTHY"
| "UNKNOWN"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Instance {
  Id: string;
  CreatorRequestId?: string | null;
  Attributes?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface Namespace {
  Id?: string | null;
  Arn?: string | null;
  Name?: string | null;
  Type?: NamespaceType | null;
  Description?: string | null;
  ServiceCount?: number | null;
  Properties?: NamespaceProperties | null;
  CreateDate?: Date | number | null;
  CreatorRequestId?: string | null;
}

// refs: 2 - tags: output, named, enum
export type NamespaceType =
| "DNS_PUBLIC"
| "DNS_PRIVATE"
| "HTTP"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface NamespaceProperties {
  DnsProperties?: DnsProperties | null;
  HttpProperties?: HttpProperties | null;
}

// refs: 2 - tags: output, named, interface
export interface DnsProperties {
  HostedZoneId?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface HttpProperties {
  HttpName?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface Operation {
  Id?: string | null;
  Type?: OperationType | null;
  Status?: OperationStatus | null;
  ErrorMessage?: string | null;
  ErrorCode?: string | null;
  CreateDate?: Date | number | null;
  UpdateDate?: Date | number | null;
  Targets?: { [key in OperationTargetType]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, enum
export type OperationType =
| "CREATE_NAMESPACE"
| "DELETE_NAMESPACE"
| "UPDATE_SERVICE"
| "REGISTER_INSTANCE"
| "DEREGISTER_INSTANCE"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type OperationStatus =
| "SUBMITTED"
| "PENDING"
| "SUCCESS"
| "FAIL"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, enum
export type OperationTargetType =
| "NAMESPACE"
| "SERVICE"
| "INSTANCE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface InstanceSummary {
  Id?: string | null;
  Attributes?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface NamespaceSummary {
  Id?: string | null;
  Arn?: string | null;
  Name?: string | null;
  Type?: NamespaceType | null;
  Description?: string | null;
  ServiceCount?: number | null;
  Properties?: NamespaceProperties | null;
  CreateDate?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface OperationSummary {
  Id?: string | null;
  Status?: OperationStatus | null;
}

// refs: 1 - tags: output, named, interface
export interface ServiceSummary {
  Id?: string | null;
  Arn?: string | null;
  Name?: string | null;
  Type?: ServiceType | null;
  Description?: string | null;
  InstanceCount?: number | null;
  DnsConfig?: DnsConfig | null;
  HealthCheckConfig?: HealthCheckConfig | null;
  HealthCheckCustomConfig?: HealthCheckCustomConfig | null;
  CreateDate?: Date | number | null;
}
