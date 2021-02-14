// Autogenerated API structures for: Amazon DynamoDB Accelerator (DAX)

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateClusterRequest {
  ClusterName: string;
  NodeType: string;
  Description?: string | null;
  ReplicationFactor: number;
  AvailabilityZones?: string[] | null;
  SubnetGroupName?: string | null;
  SecurityGroupIds?: string[] | null;
  PreferredMaintenanceWindow?: string | null;
  NotificationTopicArn?: string | null;
  IamRoleArn: string;
  ParameterGroupName?: string | null;
  Tags?: Tag[] | null;
  SSESpecification?: SSESpecification | null;
}

// refs: 1 - tags: named, input
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Description?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string | null;
  SubnetIds: string[];
}

// refs: 1 - tags: named, input
export interface DecreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[] | null;
  NodeIdsToRemove?: string[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteClusterRequest {
  ClusterName: string;
}

// refs: 1 - tags: named, input
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}

// refs: 1 - tags: named, input
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}

// refs: 1 - tags: named, input
export interface DescribeClustersRequest {
  ClusterNames?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeDefaultParametersRequest {
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeEventsRequest {
  SourceName?: string | null;
  SourceType?: SourceType | null;
  StartTime?: Date | number | null;
  EndTime?: Date | number | null;
  Duration?: number | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeParameterGroupsRequest {
  ParameterGroupNames?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeParametersRequest {
  ParameterGroupName: string;
  Source?: string | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeSubnetGroupsRequest {
  SubnetGroupNames?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface IncreaseReplicationFactorRequest {
  ClusterName: string;
  NewReplicationFactor: number;
  AvailabilityZones?: string[] | null;
}

// refs: 1 - tags: named, input
export interface ListTagsRequest {
  ResourceName: string;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface RebootNodeRequest {
  ClusterName: string;
  NodeId: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceName: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceName: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateClusterRequest {
  ClusterName: string;
  Description?: string | null;
  PreferredMaintenanceWindow?: string | null;
  NotificationTopicArn?: string | null;
  NotificationTopicStatus?: string | null;
  ParameterGroupName?: string | null;
  SecurityGroupIds?: string[] | null;
}

// refs: 1 - tags: named, input
export interface UpdateParameterGroupRequest {
  ParameterGroupName: string;
  ParameterNameValues: ParameterNameValue[];
}

// refs: 1 - tags: named, input
export interface UpdateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string | null;
  SubnetIds?: string[] | null;
}

// refs: 1 - tags: named, output
export interface CreateClusterResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup | null;
}

// refs: 1 - tags: named, output
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup | null;
}

// refs: 1 - tags: named, output
export interface DecreaseReplicationFactorResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface DeleteClusterResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface DeleteParameterGroupResponse {
  DeletionMessage?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteSubnetGroupResponse {
  DeletionMessage?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeClustersResponse {
  NextToken?: string | null;
  Clusters?: Cluster[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeDefaultParametersResponse {
  NextToken?: string | null;
  Parameters?: Parameter[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeEventsResponse {
  NextToken?: string | null;
  Events?: Event[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeParameterGroupsResponse {
  NextToken?: string | null;
  ParameterGroups?: ParameterGroup[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeParametersResponse {
  NextToken?: string | null;
  Parameters?: Parameter[] | null;
}

// refs: 1 - tags: named, output
export interface DescribeSubnetGroupsResponse {
  NextToken?: string | null;
  SubnetGroups?: SubnetGroup[] | null;
}

// refs: 1 - tags: named, output
export interface IncreaseReplicationFactorResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface ListTagsResponse {
  Tags?: Tag[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface RebootNodeResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface UpdateClusterResponse {
  Cluster?: Cluster | null;
}

// refs: 1 - tags: named, output
export interface UpdateParameterGroupResponse {
  ParameterGroup?: ParameterGroup | null;
}

// refs: 1 - tags: named, output
export interface UpdateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup | null;
}

// refs: 5 - tags: input, named, interface, output
export interface Tag {
  Key?: string | null;
  Value?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface SSESpecification {
  Enabled: boolean;
}

// refs: 2 - tags: input, named, enum, output
export type SourceType =
| "CLUSTER"
| "PARAMETER_GROUP"
| "SUBNET_GROUP"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ParameterNameValue {
  ParameterName?: string | null;
  ParameterValue?: string | null;
}

// refs: 7 - tags: output, named, interface
export interface Cluster {
  ClusterName?: string | null;
  Description?: string | null;
  ClusterArn?: string | null;
  TotalNodes?: number | null;
  ActiveNodes?: number | null;
  NodeType?: string | null;
  Status?: string | null;
  ClusterDiscoveryEndpoint?: Endpoint | null;
  NodeIdsToRemove?: string[] | null;
  Nodes?: Node[] | null;
  PreferredMaintenanceWindow?: string | null;
  NotificationConfiguration?: NotificationConfiguration | null;
  SubnetGroup?: string | null;
  SecurityGroups?: SecurityGroupMembership[] | null;
  IamRoleArn?: string | null;
  ParameterGroup?: ParameterGroupStatus | null;
  SSEDescription?: SSEDescription | null;
}

// refs: 14 - tags: output, named, interface
export interface Endpoint {
  Address?: string | null;
  Port?: number | null;
}

// refs: 7 - tags: output, named, interface
export interface Node {
  NodeId?: string | null;
  Endpoint?: Endpoint | null;
  NodeCreateTime?: Date | number | null;
  AvailabilityZone?: string | null;
  NodeStatus?: string | null;
  ParameterGroupStatus?: string | null;
}

// refs: 7 - tags: output, named, interface
export interface NotificationConfiguration {
  TopicArn?: string | null;
  TopicStatus?: string | null;
}

// refs: 7 - tags: output, named, interface
export interface SecurityGroupMembership {
  SecurityGroupIdentifier?: string | null;
  Status?: string | null;
}

// refs: 7 - tags: output, named, interface
export interface ParameterGroupStatus {
  ParameterGroupName?: string | null;
  ParameterApplyStatus?: string | null;
  NodeIdsToReboot?: string[] | null;
}

// refs: 7 - tags: output, named, interface
export interface SSEDescription {
  Status?: SSEStatus | null;
}

// refs: 7 - tags: output, named, enum
export type SSEStatus =
| "ENABLING"
| "ENABLED"
| "DISABLING"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, interface
export interface ParameterGroup {
  ParameterGroupName?: string | null;
  Description?: string | null;
}

// refs: 3 - tags: output, named, interface
export interface SubnetGroup {
  SubnetGroupName?: string | null;
  Description?: string | null;
  VpcId?: string | null;
  Subnets?: Subnet[] | null;
}

// refs: 3 - tags: output, named, interface
export interface Subnet {
  SubnetIdentifier?: string | null;
  SubnetAvailabilityZone?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface Parameter {
  ParameterName?: string | null;
  ParameterType?: ParameterType | null;
  ParameterValue?: string | null;
  NodeTypeSpecificValues?: NodeTypeSpecificValue[] | null;
  Description?: string | null;
  Source?: string | null;
  DataType?: string | null;
  AllowedValues?: string | null;
  IsModifiable?: IsModifiable | null;
  ChangeType?: ChangeType | null;
}

// refs: 2 - tags: output, named, enum
export type ParameterType =
| "DEFAULT"
| "NODE_TYPE_SPECIFIC"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface NodeTypeSpecificValue {
  NodeType?: string | null;
  Value?: string | null;
}

// refs: 2 - tags: output, named, enum
export type IsModifiable =
| "TRUE"
| "FALSE"
| "CONDITIONAL"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type ChangeType =
| "IMMEDIATE"
| "REQUIRES_REBOOT"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Event {
  SourceName?: string | null;
  SourceType?: SourceType | null;
  Message?: string | null;
  Date?: Date | number | null;
}