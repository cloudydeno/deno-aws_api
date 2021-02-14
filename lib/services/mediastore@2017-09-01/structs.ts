// Autogenerated API structures for: AWS Elemental MediaStore

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateContainerInput {
  ContainerName: string;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteContainerInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface DeleteContainerPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface DeleteCorsPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface DeleteLifecyclePolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface DeleteMetricPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface DescribeContainerInput {
  ContainerName?: string | null;
}

// refs: 1 - tags: named, input
export interface GetContainerPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface GetCorsPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface GetLifecyclePolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface GetMetricPolicyInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface ListContainersInput {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceInput {
  Resource: string;
}

// refs: 1 - tags: named, input
export interface PutContainerPolicyInput {
  ContainerName: string;
  Policy: string;
}

// refs: 1 - tags: named, input
export interface PutCorsPolicyInput {
  ContainerName: string;
  CorsPolicy: CorsRule[];
}

// refs: 1 - tags: named, input
export interface PutLifecyclePolicyInput {
  ContainerName: string;
  LifecyclePolicy: string;
}

// refs: 1 - tags: named, input
export interface PutMetricPolicyInput {
  ContainerName: string;
  MetricPolicy: MetricPolicy;
}

// refs: 1 - tags: named, input
export interface StartAccessLoggingInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface StopAccessLoggingInput {
  ContainerName: string;
}

// refs: 1 - tags: named, input
export interface TagResourceInput {
  Resource: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceInput {
  Resource: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, output
export interface CreateContainerOutput {
  Container: Container;
}

// refs: 1 - tags: named, output
export interface DeleteContainerOutput {
}

// refs: 1 - tags: named, output
export interface DeleteContainerPolicyOutput {
}

// refs: 1 - tags: named, output
export interface DeleteCorsPolicyOutput {
}

// refs: 1 - tags: named, output
export interface DeleteLifecyclePolicyOutput {
}

// refs: 1 - tags: named, output
export interface DeleteMetricPolicyOutput {
}

// refs: 1 - tags: named, output
export interface DescribeContainerOutput {
  Container?: Container | null;
}

// refs: 1 - tags: named, output
export interface GetContainerPolicyOutput {
  Policy: string;
}

// refs: 1 - tags: named, output
export interface GetCorsPolicyOutput {
  CorsPolicy: CorsRule[];
}

// refs: 1 - tags: named, output
export interface GetLifecyclePolicyOutput {
  LifecyclePolicy: string;
}

// refs: 1 - tags: named, output
export interface GetMetricPolicyOutput {
  MetricPolicy: MetricPolicy;
}

// refs: 1 - tags: named, output
export interface ListContainersOutput {
  Containers: Container[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceOutput {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface PutContainerPolicyOutput {
}

// refs: 1 - tags: named, output
export interface PutCorsPolicyOutput {
}

// refs: 1 - tags: named, output
export interface PutLifecyclePolicyOutput {
}

// refs: 1 - tags: named, output
export interface PutMetricPolicyOutput {
}

// refs: 1 - tags: named, output
export interface StartAccessLoggingOutput {
}

// refs: 1 - tags: named, output
export interface StopAccessLoggingOutput {
}

// refs: 1 - tags: named, output
export interface TagResourceOutput {
}

// refs: 1 - tags: named, output
export interface UntagResourceOutput {
}

// refs: 3 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface CorsRule {
  AllowedOrigins: string[];
  AllowedMethods?: MethodName[] | null;
  AllowedHeaders: string[];
  MaxAgeSeconds?: number | null;
  ExposeHeaders?: string[] | null;
}

// refs: 2 - tags: input, named, enum, output
export type MethodName =
| "PUT"
| "GET"
| "DELETE"
| "HEAD"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface MetricPolicy {
  ContainerLevelMetrics: ContainerLevelMetrics;
  MetricPolicyRules?: MetricPolicyRule[] | null;
}

// refs: 2 - tags: input, named, enum, output
export type ContainerLevelMetrics =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface MetricPolicyRule {
  ObjectGroup: string;
  ObjectGroupName: string;
}

// refs: 3 - tags: output, named, interface
export interface Container {
  Endpoint?: string | null;
  CreationTime?: Date | number | null;
  ARN?: string | null;
  Name?: string | null;
  Status?: ContainerStatus | null;
  AccessLoggingEnabled?: boolean | null;
}

// refs: 3 - tags: output, named, enum
export type ContainerStatus =
| "ACTIVE"
| "CREATING"
| "DELETING"
| cmnP.UnexpectedEnumValue;