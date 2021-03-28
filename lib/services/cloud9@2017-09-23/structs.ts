// Autogenerated API structures for: AWS Cloud9

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateEnvironmentEC2Request {
  name: string;
  description?: string | null;
  clientRequestToken?: string | null;
  instanceType: string;
  subnetId?: string | null;
  automaticStopTimeMinutes?: number | null;
  ownerArn?: string | null;
  tags?: Tag[] | null;
  connectionType?: ConnectionType | null;
}

// refs: 1 - tags: named, input
export interface CreateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}

// refs: 1 - tags: named, input
export interface DeleteEnvironmentRequest {
  environmentId: string;
}

// refs: 1 - tags: named, input
export interface DeleteEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentMembershipsRequest {
  userArn?: string | null;
  environmentId?: string | null;
  permissions?: Permissions[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentStatusRequest {
  environmentId: string;
}

// refs: 1 - tags: named, input
export interface DescribeEnvironmentsRequest {
  environmentIds: string[];
}

// refs: 1 - tags: named, input
export interface ListEnvironmentsRequest {
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceARN: string;
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
export interface UpdateEnvironmentRequest {
  environmentId: string;
  name?: string | null;
  description?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateEnvironmentMembershipRequest {
  environmentId: string;
  userArn: string;
  permissions: MemberPermissions;
}

// refs: 1 - tags: named, output
export interface CreateEnvironmentEC2Result {
  environmentId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateEnvironmentMembershipResult {
  membership?: EnvironmentMember | null;
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentMembershipsResult {
  memberships?: EnvironmentMember[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentStatusResult {
  status?: EnvironmentStatus | null;
  message?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeEnvironmentsResult {
  environments?: Environment[] | null;
}

// refs: 1 - tags: named, output
export interface ListEnvironmentsResult {
  nextToken?: string | null;
  environmentIds?: string[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface UpdateEnvironmentMembershipResult {
  membership?: EnvironmentMember | null;
}

// refs: 3 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 2 - tags: input, named, enum, output
export type ConnectionType =
| "CONNECT_SSH"
| "CONNECT_SSM"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type MemberPermissions =
| "read-write"
| "read-only"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, enum, output
export type Permissions =
| "owner"
| "read-write"
| "read-only"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, interface
export interface EnvironmentMember {
  permissions?: Permissions | null;
  userId?: string | null;
  userArn?: string | null;
  environmentId?: string | null;
  lastAccess?: Date | number | null;
}

// refs: 1 - tags: output, named, enum
export type EnvironmentStatus =
| "error"
| "creating"
| "connecting"
| "ready"
| "stopping"
| "stopped"
| "deleting"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Environment {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  type?: EnvironmentType | null;
  connectionType?: ConnectionType | null;
  arn?: string | null;
  ownerArn?: string | null;
  lifecycle?: EnvironmentLifecycle | null;
}

// refs: 1 - tags: output, named, enum
export type EnvironmentType =
| "ssh"
| "ec2"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface EnvironmentLifecycle {
  status?: EnvironmentLifecycleStatus | null;
  reason?: string | null;
  failureResource?: string | null;
}

// refs: 1 - tags: output, named, enum
export type EnvironmentLifecycleStatus =
| "CREATING"
| "CREATED"
| "CREATE_FAILED"
| "DELETING"
| "DELETE_FAILED"
| cmnP.UnexpectedEnumValue;
