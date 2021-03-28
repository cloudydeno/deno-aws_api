// Autogenerated API structures for: AWS CodeStar connections

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateConnectionInput {
  ProviderType?: ProviderType | null;
  ConnectionName: string;
  Tags?: Tag[] | null;
  HostArn?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateHostInput {
  Name: string;
  ProviderType: ProviderType;
  ProviderEndpoint: string;
  VpcConfiguration?: VpcConfiguration | null;
}

// refs: 1 - tags: named, input
export interface DeleteConnectionInput {
  ConnectionArn: string;
}

// refs: 1 - tags: named, input
export interface DeleteHostInput {
  HostArn: string;
}

// refs: 1 - tags: named, input
export interface GetConnectionInput {
  ConnectionArn: string;
}

// refs: 1 - tags: named, input
export interface GetHostInput {
  HostArn: string;
}

// refs: 1 - tags: named, input
export interface ListConnectionsInput {
  ProviderTypeFilter?: ProviderType | null;
  HostArnFilter?: string | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListHostsInput {
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceInput {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateHostInput {
  HostArn: string;
  ProviderEndpoint?: string | null;
  VpcConfiguration?: VpcConfiguration | null;
}

// refs: 1 - tags: named, output
export interface CreateConnectionOutput {
  ConnectionArn: string;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface CreateHostOutput {
  HostArn?: string | null;
}

// refs: 1 - tags: named, output
export interface GetConnectionOutput {
  Connection?: Connection | null;
}

// refs: 1 - tags: named, output
export interface GetHostOutput {
  Name?: string | null;
  Status?: string | null;
  ProviderType?: ProviderType | null;
  ProviderEndpoint?: string | null;
  VpcConfiguration?: VpcConfiguration | null;
}

// refs: 1 - tags: named, output
export interface ListConnectionsOutput {
  Connections?: Connection[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListHostsOutput {
  Hosts?: Host[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceOutput {
  Tags?: Tag[] | null;
}

// refs: 7 - tags: input, named, enum, output
export type ProviderType =
| "Bitbucket"
| "GitHub"
| "GitHubEnterpriseServer"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 4 - tags: input, named, interface, output
export interface VpcConfiguration {
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
  TlsCertificate?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface Connection {
  ConnectionName?: string | null;
  ConnectionArn?: string | null;
  ProviderType?: ProviderType | null;
  OwnerAccountId?: string | null;
  ConnectionStatus?: ConnectionStatus | null;
  HostArn?: string | null;
}

// refs: 2 - tags: output, named, enum
export type ConnectionStatus =
| "PENDING"
| "AVAILABLE"
| "ERROR"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Host {
  Name?: string | null;
  HostArn?: string | null;
  ProviderType?: ProviderType | null;
  ProviderEndpoint?: string | null;
  VpcConfiguration?: VpcConfiguration | null;
  Status?: string | null;
  StatusMessage?: string | null;
}
