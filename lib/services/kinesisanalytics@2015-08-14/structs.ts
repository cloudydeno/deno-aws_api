// Autogenerated API structures for: Amazon Kinesis Analytics

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
}

// refs: 1 - tags: named, input
export interface AddApplicationInputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Input: Input;
}

// refs: 1 - tags: named, input
export interface AddApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
  InputProcessingConfiguration: InputProcessingConfiguration;
}

// refs: 1 - tags: named, input
export interface AddApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Output: Output;
}

// refs: 1 - tags: named, input
export interface AddApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceDataSource: ReferenceDataSource;
}

// refs: 1 - tags: named, input
export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string | null;
  Inputs?: Input[] | null;
  Outputs?: Output[] | null;
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[] | null;
  ApplicationCode?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteApplicationRequest {
  ApplicationName: string;
  CreateTimestamp: Date | number;
}

// refs: 1 - tags: named, input
export interface DeleteApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOptionId: string;
}

// refs: 1 - tags: named, input
export interface DeleteApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
}

// refs: 1 - tags: named, input
export interface DeleteApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  OutputId: string;
}

// refs: 1 - tags: named, input
export interface DeleteApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceId: string;
}

// refs: 1 - tags: named, input
export interface DescribeApplicationRequest {
  ApplicationName: string;
}

// refs: 1 - tags: named, input
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string | null;
  RoleARN?: string | null;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration | null;
  S3Configuration?: S3Configuration | null;
  InputProcessingConfiguration?: InputProcessingConfiguration | null;
}

// refs: 1 - tags: named, input
export interface ListApplicationsRequest {
  Limit?: number | null;
  ExclusiveStartApplicationName?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}

// refs: 1 - tags: named, input
export interface StartApplicationRequest {
  ApplicationName: string;
  InputConfigurations: InputConfiguration[];
}

// refs: 1 - tags: named, input
export interface StopApplicationRequest {
  ApplicationName: string;
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
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ApplicationUpdate: ApplicationUpdate;
}

// refs: 1 - tags: named, output
export interface CreateApplicationResponse {
  ApplicationSummary: ApplicationSummary;
}

// refs: 1 - tags: named, output
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}

// refs: 1 - tags: named, output
export interface DiscoverInputSchemaResponse {
  InputSchema?: SourceSchema | null;
  ParsedInputRecords?: string[][] | null;
  ProcessedInputRecords?: string[] | null;
  RawInputRecords?: string[] | null;
}

// refs: 1 - tags: named, output
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  HasMoreApplications: boolean;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 2 - tags: input, named, interface
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
  RoleARN: string;
}

// refs: 2 - tags: input, named, interface
export interface Input {
  NamePrefix: string;
  InputProcessingConfiguration?: InputProcessingConfiguration | null;
  KinesisStreamsInput?: KinesisStreamsInput | null;
  KinesisFirehoseInput?: KinesisFirehoseInput | null;
  InputParallelism?: InputParallelism | null;
  InputSchema: SourceSchema;
}

// refs: 4 - tags: input, named, interface
export interface InputProcessingConfiguration {
  InputLambdaProcessor: InputLambdaProcessor;
}

// refs: 4 - tags: input, named, interface
export interface InputLambdaProcessor {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 2 - tags: input, named, interface
export interface KinesisStreamsInput {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 2 - tags: input, named, interface
export interface KinesisFirehoseInput {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 3 - tags: input, named, interface, output
export interface InputParallelism {
  Count?: number | null;
}

// refs: 7 - tags: input, named, interface, output
export interface SourceSchema {
  RecordFormat: RecordFormat;
  RecordEncoding?: string | null;
  RecordColumns: RecordColumn[];
}

// refs: 8 - tags: input, named, interface, output
export interface RecordFormat {
  RecordFormatType: RecordFormatType;
  MappingParameters?: MappingParameters | null;
}

// refs: 12 - tags: input, named, enum, output
export type RecordFormatType =
| "JSON"
| "CSV"
| cmnP.UnexpectedEnumValue;

// refs: 8 - tags: input, named, interface, output
export interface MappingParameters {
  JSONMappingParameters?: JSONMappingParameters | null;
  CSVMappingParameters?: CSVMappingParameters | null;
}

// refs: 8 - tags: input, named, interface, output
export interface JSONMappingParameters {
  RecordRowPath: string;
}

// refs: 8 - tags: input, named, interface, output
export interface CSVMappingParameters {
  RecordRowDelimiter: string;
  RecordColumnDelimiter: string;
}

// refs: 8 - tags: input, named, interface, output
export interface RecordColumn {
  Name: string;
  Mapping?: string | null;
  SqlType: string;
}

// refs: 2 - tags: input, named, interface
export interface Output {
  Name: string;
  KinesisStreamsOutput?: KinesisStreamsOutput | null;
  KinesisFirehoseOutput?: KinesisFirehoseOutput | null;
  LambdaOutput?: LambdaOutput | null;
  DestinationSchema: DestinationSchema;
}

// refs: 2 - tags: input, named, interface
export interface KinesisStreamsOutput {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 2 - tags: input, named, interface
export interface KinesisFirehoseOutput {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 2 - tags: input, named, interface
export interface LambdaOutput {
  ResourceARN: string;
  RoleARN: string;
}

// refs: 4 - tags: input, named, interface, output
export interface DestinationSchema {
  RecordFormatType: RecordFormatType;
}

// refs: 1 - tags: input, named, interface
export interface ReferenceDataSource {
  TableName: string;
  S3ReferenceDataSource?: S3ReferenceDataSource | null;
  ReferenceSchema: SourceSchema;
}

// refs: 1 - tags: input, named, interface
export interface S3ReferenceDataSource {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
}

// refs: 3 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface InputStartingPositionConfiguration {
  InputStartingPosition?: InputStartingPosition | null;
}

// refs: 3 - tags: input, named, enum, output
export type InputStartingPosition =
| "NOW"
| "TRIM_HORIZON"
| "LAST_STOPPED_POINT"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface S3Configuration {
  RoleARN: string;
  BucketARN: string;
  FileKey: string;
}

// refs: 1 - tags: input, named, interface
export interface InputConfiguration {
  Id: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}

// refs: 1 - tags: input, named, interface
export interface ApplicationUpdate {
  InputUpdates?: InputUpdate[] | null;
  ApplicationCodeUpdate?: string | null;
  OutputUpdates?: OutputUpdate[] | null;
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[] | null;
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[] | null;
}

// refs: 1 - tags: input, named, interface
export interface InputUpdate {
  InputId: string;
  NamePrefixUpdate?: string | null;
  InputProcessingConfigurationUpdate?: InputProcessingConfigurationUpdate | null;
  KinesisStreamsInputUpdate?: KinesisStreamsInputUpdate | null;
  KinesisFirehoseInputUpdate?: KinesisFirehoseInputUpdate | null;
  InputSchemaUpdate?: InputSchemaUpdate | null;
  InputParallelismUpdate?: InputParallelismUpdate | null;
}

// refs: 1 - tags: input, named, interface
export interface InputProcessingConfigurationUpdate {
  InputLambdaProcessorUpdate: InputLambdaProcessorUpdate;
}

// refs: 1 - tags: input, named, interface
export interface InputLambdaProcessorUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface KinesisStreamsInputUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface KinesisFirehoseInputUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface InputSchemaUpdate {
  RecordFormatUpdate?: RecordFormat | null;
  RecordEncodingUpdate?: string | null;
  RecordColumnUpdates?: RecordColumn[] | null;
}

// refs: 1 - tags: input, named, interface
export interface InputParallelismUpdate {
  CountUpdate?: number | null;
}

// refs: 1 - tags: input, named, interface
export interface OutputUpdate {
  OutputId: string;
  NameUpdate?: string | null;
  KinesisStreamsOutputUpdate?: KinesisStreamsOutputUpdate | null;
  KinesisFirehoseOutputUpdate?: KinesisFirehoseOutputUpdate | null;
  LambdaOutputUpdate?: LambdaOutputUpdate | null;
  DestinationSchemaUpdate?: DestinationSchema | null;
}

// refs: 1 - tags: input, named, interface
export interface KinesisStreamsOutputUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface KinesisFirehoseOutputUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface LambdaOutputUpdate {
  ResourceARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface ReferenceDataSourceUpdate {
  ReferenceId: string;
  TableNameUpdate?: string | null;
  S3ReferenceDataSourceUpdate?: S3ReferenceDataSourceUpdate | null;
  ReferenceSchemaUpdate?: SourceSchema | null;
}

// refs: 1 - tags: input, named, interface
export interface S3ReferenceDataSourceUpdate {
  BucketARNUpdate?: string | null;
  FileKeyUpdate?: string | null;
  ReferenceRoleARNUpdate?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string | null;
  RoleARNUpdate?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
}

// refs: 3 - tags: output, named, enum
export type ApplicationStatus =
| "DELETING"
| "STARTING"
| "STOPPING"
| "READY"
| "RUNNING"
| "UPDATING"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface ApplicationDetail {
  ApplicationName: string;
  ApplicationDescription?: string | null;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  CreateTimestamp?: Date | number | null;
  LastUpdateTimestamp?: Date | number | null;
  InputDescriptions?: InputDescription[] | null;
  OutputDescriptions?: OutputDescription[] | null;
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[] | null;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[] | null;
  ApplicationCode?: string | null;
  ApplicationVersionId: number;
}

// refs: 1 - tags: output, named, interface
export interface InputDescription {
  InputId?: string | null;
  NamePrefix?: string | null;
  InAppStreamNames?: string[] | null;
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription | null;
  KinesisStreamsInputDescription?: KinesisStreamsInputDescription | null;
  KinesisFirehoseInputDescription?: KinesisFirehoseInputDescription | null;
  InputSchema?: SourceSchema | null;
  InputParallelism?: InputParallelism | null;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration | null;
}

// refs: 1 - tags: output, named, interface
export interface InputProcessingConfigurationDescription {
  InputLambdaProcessorDescription?: InputLambdaProcessorDescription | null;
}

// refs: 1 - tags: output, named, interface
export interface InputLambdaProcessorDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface KinesisStreamsInputDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface KinesisFirehoseInputDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface OutputDescription {
  OutputId?: string | null;
  Name?: string | null;
  KinesisStreamsOutputDescription?: KinesisStreamsOutputDescription | null;
  KinesisFirehoseOutputDescription?: KinesisFirehoseOutputDescription | null;
  LambdaOutputDescription?: LambdaOutputDescription | null;
  DestinationSchema?: DestinationSchema | null;
}

// refs: 1 - tags: output, named, interface
export interface KinesisStreamsOutputDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface KinesisFirehoseOutputDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface LambdaOutputDescription {
  ResourceARN?: string | null;
  RoleARN?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ReferenceDataSourceDescription {
  ReferenceId: string;
  TableName: string;
  S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription;
  ReferenceSchema?: SourceSchema | null;
}

// refs: 1 - tags: output, named, interface
export interface S3ReferenceDataSourceDescription {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
}

// refs: 1 - tags: output, named, interface
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string | null;
  LogStreamARN: string;
  RoleARN: string;
}
