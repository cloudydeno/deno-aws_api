// Autogenerated API structures for: Amazon Athena

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface BatchGetNamedQueryInput {
  NamedQueryIds: string[];
}

// refs: 1 - tags: named, input
export interface BatchGetQueryExecutionInput {
  QueryExecutionIds: string[];
}

// refs: 1 - tags: named, input
export interface CreateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string | null;
  Parameters?: { [key: string]: string | null | undefined } | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateNamedQueryInput {
  Name: string;
  Description?: string | null;
  Database: string;
  QueryString: string;
  ClientRequestToken?: string | null;
  WorkGroup?: string | null;
}

// refs: 1 - tags: named, input
export interface CreatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateWorkGroupInput {
  Name: string;
  Configuration?: WorkGroupConfiguration | null;
  Description?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteDataCatalogInput {
  Name: string;
}

// refs: 1 - tags: named, input
export interface DeleteNamedQueryInput {
  NamedQueryId: string;
}

// refs: 1 - tags: named, input
export interface DeletePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}

// refs: 1 - tags: named, input
export interface DeleteWorkGroupInput {
  WorkGroup: string;
  RecursiveDeleteOption?: boolean | null;
}

// refs: 1 - tags: named, input
export interface GetDataCatalogInput {
  Name: string;
}

// refs: 1 - tags: named, input
export interface GetDatabaseInput {
  CatalogName: string;
  DatabaseName: string;
}

// refs: 1 - tags: named, input
export interface GetNamedQueryInput {
  NamedQueryId: string;
}

// refs: 1 - tags: named, input
export interface GetPreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}

// refs: 1 - tags: named, input
export interface GetQueryExecutionInput {
  QueryExecutionId: string;
}

// refs: 1 - tags: named, input
export interface GetQueryResultsInput {
  QueryExecutionId: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface GetTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  TableName: string;
}

// refs: 1 - tags: named, input
export interface GetWorkGroupInput {
  WorkGroup: string;
}

// refs: 1 - tags: named, input
export interface ListDataCatalogsInput {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDatabasesInput {
  CatalogName: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEngineVersionsInput {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListNamedQueriesInput {
  NextToken?: string | null;
  MaxResults?: number | null;
  WorkGroup?: string | null;
}

// refs: 1 - tags: named, input
export interface ListPreparedStatementsInput {
  WorkGroup: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListQueryExecutionsInput {
  NextToken?: string | null;
  MaxResults?: number | null;
  WorkGroup?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  Expression?: string | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceInput {
  ResourceARN: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListWorkGroupsInput {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface StartQueryExecutionInput {
  QueryString: string;
  ClientRequestToken?: string | null;
  QueryExecutionContext?: QueryExecutionContext | null;
  ResultConfiguration?: ResultConfiguration | null;
  WorkGroup?: string | null;
}

// refs: 1 - tags: named, input
export interface StopQueryExecutionInput {
  QueryExecutionId: string;
}

// refs: 1 - tags: named, input
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string | null;
  Parameters?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface UpdatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateWorkGroupInput {
  WorkGroup: string;
  Description?: string | null;
  ConfigurationUpdates?: WorkGroupConfigurationUpdates | null;
  State?: WorkGroupState | null;
}

// refs: 1 - tags: named, output
export interface BatchGetNamedQueryOutput {
  NamedQueries?: NamedQuery[] | null;
  UnprocessedNamedQueryIds?: UnprocessedNamedQueryId[] | null;
}

// refs: 1 - tags: named, output
export interface BatchGetQueryExecutionOutput {
  QueryExecutions?: QueryExecution[] | null;
  UnprocessedQueryExecutionIds?: UnprocessedQueryExecutionId[] | null;
}

// refs: 1 - tags: named, output
export interface CreateNamedQueryOutput {
  NamedQueryId?: string | null;
}

// refs: 1 - tags: named, output
export interface GetDataCatalogOutput {
  DataCatalog?: DataCatalog | null;
}

// refs: 1 - tags: named, output
export interface GetDatabaseOutput {
  Database?: Database | null;
}

// refs: 1 - tags: named, output
export interface GetNamedQueryOutput {
  NamedQuery?: NamedQuery | null;
}

// refs: 1 - tags: named, output
export interface GetPreparedStatementOutput {
  PreparedStatement?: PreparedStatement | null;
}

// refs: 1 - tags: named, output
export interface GetQueryExecutionOutput {
  QueryExecution?: QueryExecution | null;
}

// refs: 1 - tags: named, output
export interface GetQueryResultsOutput {
  UpdateCount?: number | null;
  ResultSet?: ResultSet | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetTableMetadataOutput {
  TableMetadata?: TableMetadata | null;
}

// refs: 1 - tags: named, output
export interface GetWorkGroupOutput {
  WorkGroup?: WorkGroup | null;
}

// refs: 1 - tags: named, output
export interface ListDataCatalogsOutput {
  DataCatalogsSummary?: DataCatalogSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDatabasesOutput {
  DatabaseList?: Database[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEngineVersionsOutput {
  EngineVersions?: EngineVersion[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListNamedQueriesOutput {
  NamedQueryIds?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListPreparedStatementsOutput {
  PreparedStatements?: PreparedStatementSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListQueryExecutionsOutput {
  QueryExecutionIds?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTableMetadataOutput {
  TableMetadataList?: TableMetadata[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceOutput {
  Tags?: Tag[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListWorkGroupsOutput {
  WorkGroups?: WorkGroupSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface StartQueryExecutionOutput {
  QueryExecutionId?: string | null;
}

// refs: 4 - tags: input, named, enum, output
export type DataCatalogType =
| "LAMBDA"
| "GLUE"
| "HIVE"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface Tag {
  Key?: string | null;
  Value?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface WorkGroupConfiguration {
  ResultConfiguration?: ResultConfiguration | null;
  EnforceWorkGroupConfiguration?: boolean | null;
  PublishCloudWatchMetricsEnabled?: boolean | null;
  BytesScannedCutoffPerQuery?: number | null;
  RequesterPaysEnabled?: boolean | null;
  EngineVersion?: EngineVersion | null;
}

// refs: 5 - tags: input, named, interface, output
export interface ResultConfiguration {
  OutputLocation?: string | null;
  EncryptionConfiguration?: EncryptionConfiguration | null;
}

// refs: 6 - tags: input, named, interface, output
export interface EncryptionConfiguration {
  EncryptionOption: EncryptionOption;
  KmsKey?: string | null;
}

// refs: 6 - tags: input, named, enum, output
export type EncryptionOption =
| "SSE_S3"
| "SSE_KMS"
| "CSE_KMS"
| cmnP.UnexpectedEnumValue;

// refs: 7 - tags: input, named, interface, output
export interface EngineVersion {
  SelectedEngineVersion?: string | null;
  EffectiveEngineVersion?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface QueryExecutionContext {
  Database?: string | null;
  Catalog?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface WorkGroupConfigurationUpdates {
  EnforceWorkGroupConfiguration?: boolean | null;
  ResultConfigurationUpdates?: ResultConfigurationUpdates | null;
  PublishCloudWatchMetricsEnabled?: boolean | null;
  BytesScannedCutoffPerQuery?: number | null;
  RemoveBytesScannedCutoffPerQuery?: boolean | null;
  RequesterPaysEnabled?: boolean | null;
  EngineVersion?: EngineVersion | null;
}

// refs: 1 - tags: input, named, interface
export interface ResultConfigurationUpdates {
  OutputLocation?: string | null;
  RemoveOutputLocation?: boolean | null;
  EncryptionConfiguration?: EncryptionConfiguration | null;
  RemoveEncryptionConfiguration?: boolean | null;
}

// refs: 3 - tags: input, named, enum, output
export type WorkGroupState =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface NamedQuery {
  Name: string;
  Description?: string | null;
  Database: string;
  QueryString: string;
  NamedQueryId?: string | null;
  WorkGroup?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface UnprocessedNamedQueryId {
  NamedQueryId?: string | null;
  ErrorCode?: string | null;
  ErrorMessage?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface QueryExecution {
  QueryExecutionId?: string | null;
  Query?: string | null;
  StatementType?: StatementType | null;
  ResultConfiguration?: ResultConfiguration | null;
  QueryExecutionContext?: QueryExecutionContext | null;
  Status?: QueryExecutionStatus | null;
  Statistics?: QueryExecutionStatistics | null;
  WorkGroup?: string | null;
  EngineVersion?: EngineVersion | null;
}

// refs: 2 - tags: output, named, enum
export type StatementType =
| "DDL"
| "DML"
| "UTILITY"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface QueryExecutionStatus {
  State?: QueryExecutionState | null;
  StateChangeReason?: string | null;
  SubmissionDateTime?: Date | number | null;
  CompletionDateTime?: Date | number | null;
}

// refs: 2 - tags: output, named, enum
export type QueryExecutionState =
| "QUEUED"
| "RUNNING"
| "SUCCEEDED"
| "FAILED"
| "CANCELLED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface QueryExecutionStatistics {
  EngineExecutionTimeInMillis?: number | null;
  DataScannedInBytes?: number | null;
  DataManifestLocation?: string | null;
  TotalExecutionTimeInMillis?: number | null;
  QueryQueueTimeInMillis?: number | null;
  QueryPlanningTimeInMillis?: number | null;
  ServiceProcessingTimeInMillis?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface UnprocessedQueryExecutionId {
  QueryExecutionId?: string | null;
  ErrorCode?: string | null;
  ErrorMessage?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface DataCatalog {
  Name: string;
  Description?: string | null;
  Type: DataCatalogType;
  Parameters?: { [key: string]: string | null | undefined } | null;
}

// refs: 2 - tags: output, named, interface
export interface Database {
  Name: string;
  Description?: string | null;
  Parameters?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, interface
export interface PreparedStatement {
  StatementName?: string | null;
  QueryStatement?: string | null;
  WorkGroupName?: string | null;
  Description?: string | null;
  LastModifiedTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface ResultSet {
  Rows?: Row[] | null;
  ResultSetMetadata?: ResultSetMetadata | null;
}

// refs: 1 - tags: output, named, interface
export interface Row {
  Data?: Datum[] | null;
}

// refs: 1 - tags: output, named, interface
export interface Datum {
  VarCharValue?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ResultSetMetadata {
  ColumnInfo?: ColumnInfo[] | null;
}

// refs: 1 - tags: output, named, interface
export interface ColumnInfo {
  CatalogName?: string | null;
  SchemaName?: string | null;
  TableName?: string | null;
  Name: string;
  Label?: string | null;
  Type: string;
  Precision?: number | null;
  Scale?: number | null;
  Nullable?: ColumnNullable | null;
  CaseSensitive?: boolean | null;
}

// refs: 1 - tags: output, named, enum
export type ColumnNullable =
| "NOT_NULL"
| "NULLABLE"
| "UNKNOWN"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface TableMetadata {
  Name: string;
  CreateTime?: Date | number | null;
  LastAccessTime?: Date | number | null;
  TableType?: string | null;
  Columns?: Column[] | null;
  PartitionKeys?: Column[] | null;
  Parameters?: { [key: string]: string | null | undefined } | null;
}

// refs: 4 - tags: output, named, interface
export interface Column {
  Name: string;
  Type?: string | null;
  Comment?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface WorkGroup {
  Name: string;
  State?: WorkGroupState | null;
  Configuration?: WorkGroupConfiguration | null;
  Description?: string | null;
  CreationTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface DataCatalogSummary {
  CatalogName?: string | null;
  Type?: DataCatalogType | null;
}

// refs: 1 - tags: output, named, interface
export interface PreparedStatementSummary {
  StatementName?: string | null;
  LastModifiedTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface WorkGroupSummary {
  Name?: string | null;
  State?: WorkGroupState | null;
  Description?: string | null;
  CreationTime?: Date | number | null;
  EngineVersion?: EngineVersion | null;
}
