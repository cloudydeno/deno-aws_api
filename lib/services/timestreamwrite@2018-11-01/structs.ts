// Autogenerated API structures for: Amazon Timestream Write

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateDatabaseRequest {
  DatabaseName: string;
  KmsKeyId?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateTableRequest {
  DatabaseName: string;
  TableName: string;
  RetentionProperties?: RetentionProperties | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteDatabaseRequest {
  DatabaseName: string;
}

// refs: 1 - tags: named, input
export interface DeleteTableRequest {
  DatabaseName: string;
  TableName: string;
}

// refs: 1 - tags: named, input
export interface DescribeDatabaseRequest {
  DatabaseName: string;
}

// refs: 1 - tags: named, input
export interface DescribeTableRequest {
  DatabaseName: string;
  TableName: string;
}

// refs: 1 - tags: named, input
export interface ListDatabasesRequest {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTablesRequest {
  DatabaseName?: string | null;
  NextToken?: string | null;
  MaxResults?: number | null;
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
export interface UpdateDatabaseRequest {
  DatabaseName: string;
  KmsKeyId: string;
}

// refs: 1 - tags: named, input
export interface UpdateTableRequest {
  DatabaseName: string;
  TableName: string;
  RetentionProperties: RetentionProperties;
}

// refs: 1 - tags: named, input
export interface WriteRecordsRequest {
  DatabaseName: string;
  TableName: string;
  CommonAttributes?: Record | null;
  Records: Record[];
}

// refs: 1 - tags: named, output
export interface CreateDatabaseResponse {
  Database?: Database | null;
}

// refs: 1 - tags: named, output
export interface CreateTableResponse {
  Table?: Table | null;
}

// refs: 1 - tags: named, output
export interface DescribeDatabaseResponse {
  Database?: Database | null;
}

// refs: 1 - tags: named, output
export interface DescribeEndpointsResponse {
  Endpoints: Endpoint[];
}

// refs: 1 - tags: named, output
export interface DescribeTableResponse {
  Table?: Table | null;
}

// refs: 1 - tags: named, output
export interface ListDatabasesResponse {
  Databases?: Database[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTablesResponse {
  Tables?: Table[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface UpdateDatabaseResponse {
  Database?: Database | null;
}

// refs: 1 - tags: named, output
export interface UpdateTableResponse {
  Table?: Table | null;
}

// refs: 4 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 6 - tags: input, named, interface, output
export interface RetentionProperties {
  MemoryStoreRetentionPeriodInHours: number;
  MagneticStoreRetentionPeriodInDays: number;
}

// refs: 2 - tags: input, named, interface
export interface Record {
  Dimensions?: Dimension[] | null;
  MeasureName?: string | null;
  MeasureValue?: string | null;
  MeasureValueType?: MeasureValueType | null;
  Time?: string | null;
  TimeUnit?: TimeUnit | null;
  Version?: number | null;
}

// refs: 2 - tags: input, named, interface
export interface Dimension {
  Name: string;
  Value: string;
  DimensionValueType?: DimensionValueType | null;
}

// refs: 2 - tags: input, named, enum
export type DimensionValueType =
| "VARCHAR"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type MeasureValueType =
| "DOUBLE"
| "BIGINT"
| "VARCHAR"
| "BOOLEAN"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type TimeUnit =
| "MILLISECONDS"
| "SECONDS"
| "MICROSECONDS"
| "NANOSECONDS"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: output, named, interface
export interface Database {
  Arn?: string | null;
  DatabaseName?: string | null;
  TableCount?: number | null;
  KmsKeyId?: string | null;
  CreationTime?: Date | number | null;
  LastUpdatedTime?: Date | number | null;
}

// refs: 4 - tags: output, named, interface
export interface Table {
  Arn?: string | null;
  TableName?: string | null;
  DatabaseName?: string | null;
  TableStatus?: TableStatus | null;
  RetentionProperties?: RetentionProperties | null;
  CreationTime?: Date | number | null;
  LastUpdatedTime?: Date | number | null;
}

// refs: 4 - tags: output, named, enum
export type TableStatus =
| "ACTIVE"
| "DELETING"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface Endpoint {
  Address: string;
  CachePeriodInMinutes: number;
}
