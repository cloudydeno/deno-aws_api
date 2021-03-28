// Autogenerated API structures for: Amazon Comprehend

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface BatchDetectDominantLanguageRequest {
  TextList: string[];
}

// refs: 1 - tags: named, input
export interface BatchDetectEntitiesRequest {
  TextList: string[];
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface BatchDetectKeyPhrasesRequest {
  TextList: string[];
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface BatchDetectSentimentRequest {
  TextList: string[];
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface BatchDetectSyntaxRequest {
  TextList: string[];
  LanguageCode: SyntaxLanguageCode;
}

// refs: 1 - tags: named, input
export interface ClassifyDocumentRequest {
  Text: string;
  EndpointArn: string;
}

// refs: 1 - tags: named, input
export interface ContainsPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface CreateDocumentClassifierRequest {
  DocumentClassifierName: string;
  DataAccessRoleArn: string;
  Tags?: Tag[] | null;
  InputDataConfig: DocumentClassifierInputDataConfig;
  OutputDataConfig?: DocumentClassifierOutputDataConfig | null;
  ClientRequestToken?: string | null;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
  Mode?: DocumentClassifierMode | null;
}

// refs: 1 - tags: named, input
export interface CreateEndpointRequest {
  EndpointName: string;
  ModelArn: string;
  DesiredInferenceUnits: number;
  ClientRequestToken?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateEntityRecognizerRequest {
  RecognizerName: string;
  DataAccessRoleArn: string;
  Tags?: Tag[] | null;
  InputDataConfig: EntityRecognizerInputDataConfig;
  ClientRequestToken?: string | null;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface DeleteDocumentClassifierRequest {
  DocumentClassifierArn: string;
}

// refs: 1 - tags: named, input
export interface DeleteEndpointRequest {
  EndpointArn: string;
}

// refs: 1 - tags: named, input
export interface DeleteEntityRecognizerRequest {
  EntityRecognizerArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeDocumentClassificationJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeDocumentClassifierRequest {
  DocumentClassifierArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeDominantLanguageDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeEndpointRequest {
  EndpointArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeEntitiesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeEntityRecognizerRequest {
  EntityRecognizerArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeEventsDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeKeyPhrasesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribePiiEntitiesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeSentimentDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DescribeTopicsDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface DetectDominantLanguageRequest {
  Text: string;
}

// refs: 1 - tags: named, input
export interface DetectEntitiesRequest {
  Text: string;
  LanguageCode?: LanguageCode | null;
  EndpointArn?: string | null;
}

// refs: 1 - tags: named, input
export interface DetectKeyPhrasesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface DetectPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface DetectSentimentRequest {
  Text: string;
  LanguageCode: LanguageCode;
}

// refs: 1 - tags: named, input
export interface DetectSyntaxRequest {
  Text: string;
  LanguageCode: SyntaxLanguageCode;
}

// refs: 1 - tags: named, input
export interface ListDocumentClassificationJobsRequest {
  Filter?: DocumentClassificationJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDocumentClassifiersRequest {
  Filter?: DocumentClassifierFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDominantLanguageDetectionJobsRequest {
  Filter?: DominantLanguageDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEndpointsRequest {
  Filter?: EndpointFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEntitiesDetectionJobsRequest {
  Filter?: EntitiesDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEntityRecognizersRequest {
  Filter?: EntityRecognizerFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEventsDetectionJobsRequest {
  Filter?: EventsDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListKeyPhrasesDetectionJobsRequest {
  Filter?: KeyPhrasesDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListPiiEntitiesDetectionJobsRequest {
  Filter?: PiiEntitiesDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListSentimentDetectionJobsRequest {
  Filter?: SentimentDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface ListTopicsDetectionJobsRequest {
  Filter?: TopicsDetectionJobFilter | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface StartDocumentClassificationJobRequest {
  JobName?: string | null;
  DocumentClassifierArn: string;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StartDominantLanguageDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StartEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  EntityRecognizerArn?: string | null;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StartEventsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string | null;
  TargetEventTypes: string[];
}

// refs: 1 - tags: named, input
export interface StartKeyPhrasesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StartPiiEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  Mode: PiiEntitiesDetectionMode;
  RedactionConfig?: RedactionConfig | null;
  DataAccessRoleArn: string;
  JobName?: string | null;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string | null;
}

// refs: 1 - tags: named, input
export interface StartSentimentDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StartTopicsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string | null;
  NumberOfTopics?: number | null;
  ClientRequestToken?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: named, input
export interface StopDominantLanguageDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopEntitiesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopEventsDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopKeyPhrasesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopPiiEntitiesDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopSentimentDetectionJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface StopTrainingDocumentClassifierRequest {
  DocumentClassifierArn: string;
}

// refs: 1 - tags: named, input
export interface StopTrainingEntityRecognizerRequest {
  EntityRecognizerArn: string;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateEndpointRequest {
  EndpointArn: string;
  DesiredInferenceUnits: number;
}

// refs: 1 - tags: named, output
export interface BatchDetectDominantLanguageResponse {
  ResultList: BatchDetectDominantLanguageItemResult[];
  ErrorList: BatchItemError[];
}

// refs: 1 - tags: named, output
export interface BatchDetectEntitiesResponse {
  ResultList: BatchDetectEntitiesItemResult[];
  ErrorList: BatchItemError[];
}

// refs: 1 - tags: named, output
export interface BatchDetectKeyPhrasesResponse {
  ResultList: BatchDetectKeyPhrasesItemResult[];
  ErrorList: BatchItemError[];
}

// refs: 1 - tags: named, output
export interface BatchDetectSentimentResponse {
  ResultList: BatchDetectSentimentItemResult[];
  ErrorList: BatchItemError[];
}

// refs: 1 - tags: named, output
export interface BatchDetectSyntaxResponse {
  ResultList: BatchDetectSyntaxItemResult[];
  ErrorList: BatchItemError[];
}

// refs: 1 - tags: named, output
export interface ClassifyDocumentResponse {
  Classes?: DocumentClass[] | null;
  Labels?: DocumentLabel[] | null;
}

// refs: 1 - tags: named, output
export interface ContainsPiiEntitiesResponse {
  Labels?: EntityLabel[] | null;
}

// refs: 1 - tags: named, output
export interface CreateDocumentClassifierResponse {
  DocumentClassifierArn?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateEndpointResponse {
  EndpointArn?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateEntityRecognizerResponse {
  EntityRecognizerArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeDocumentClassificationJobResponse {
  DocumentClassificationJobProperties?: DocumentClassificationJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeDocumentClassifierResponse {
  DocumentClassifierProperties?: DocumentClassifierProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeDominantLanguageDetectionJobResponse {
  DominantLanguageDetectionJobProperties?: DominantLanguageDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeEndpointResponse {
  EndpointProperties?: EndpointProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeEntitiesDetectionJobResponse {
  EntitiesDetectionJobProperties?: EntitiesDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeEntityRecognizerResponse {
  EntityRecognizerProperties?: EntityRecognizerProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeEventsDetectionJobResponse {
  EventsDetectionJobProperties?: EventsDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeKeyPhrasesDetectionJobResponse {
  KeyPhrasesDetectionJobProperties?: KeyPhrasesDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribePiiEntitiesDetectionJobResponse {
  PiiEntitiesDetectionJobProperties?: PiiEntitiesDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeSentimentDetectionJobResponse {
  SentimentDetectionJobProperties?: SentimentDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DescribeTopicsDetectionJobResponse {
  TopicsDetectionJobProperties?: TopicsDetectionJobProperties | null;
}

// refs: 1 - tags: named, output
export interface DetectDominantLanguageResponse {
  Languages?: DominantLanguage[] | null;
}

// refs: 1 - tags: named, output
export interface DetectEntitiesResponse {
  Entities?: Entity[] | null;
}

// refs: 1 - tags: named, output
export interface DetectKeyPhrasesResponse {
  KeyPhrases?: KeyPhrase[] | null;
}

// refs: 1 - tags: named, output
export interface DetectPiiEntitiesResponse {
  Entities?: PiiEntity[] | null;
}

// refs: 1 - tags: named, output
export interface DetectSentimentResponse {
  Sentiment?: SentimentType | null;
  SentimentScore?: SentimentScore | null;
}

// refs: 1 - tags: named, output
export interface DetectSyntaxResponse {
  SyntaxTokens?: SyntaxToken[] | null;
}

// refs: 1 - tags: named, output
export interface ListDocumentClassificationJobsResponse {
  DocumentClassificationJobPropertiesList?: DocumentClassificationJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDocumentClassifiersResponse {
  DocumentClassifierPropertiesList?: DocumentClassifierProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDominantLanguageDetectionJobsResponse {
  DominantLanguageDetectionJobPropertiesList?: DominantLanguageDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEndpointsResponse {
  EndpointPropertiesList?: EndpointProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEntitiesDetectionJobsResponse {
  EntitiesDetectionJobPropertiesList?: EntitiesDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEntityRecognizersResponse {
  EntityRecognizerPropertiesList?: EntityRecognizerProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEventsDetectionJobsResponse {
  EventsDetectionJobPropertiesList?: EventsDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListKeyPhrasesDetectionJobsResponse {
  KeyPhrasesDetectionJobPropertiesList?: KeyPhrasesDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListPiiEntitiesDetectionJobsResponse {
  PiiEntitiesDetectionJobPropertiesList?: PiiEntitiesDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListSentimentDetectionJobsResponse {
  SentimentDetectionJobPropertiesList?: SentimentDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  ResourceArn?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface ListTopicsDetectionJobsResponse {
  TopicsDetectionJobPropertiesList?: TopicsDetectionJobProperties[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface StartDocumentClassificationJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartDominantLanguageDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartEntitiesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartEventsDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartKeyPhrasesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartPiiEntitiesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartSentimentDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StartTopicsDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopDominantLanguageDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopEntitiesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopEventsDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopKeyPhrasesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopPiiEntitiesDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 1 - tags: named, output
export interface StopSentimentDetectionJobResponse {
  JobId?: string | null;
  JobStatus?: JobStatus | null;
}

// refs: 29 - tags: input, named, enum, output
export type LanguageCode =
| "en"
| "es"
| "fr"
| "de"
| "it"
| "pt"
| "ar"
| "hi"
| "ja"
| "ko"
| "zh"
| "zh-TW"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type SyntaxLanguageCode =
| "en"
| "es"
| "fr"
| "de"
| "it"
| "pt"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface DocumentClassifierInputDataConfig {
  DataFormat?: DocumentClassifierDataFormat | null;
  S3Uri?: string | null;
  LabelDelimiter?: string | null;
  AugmentedManifests?: AugmentedManifestsListItem[] | null;
}

// refs: 3 - tags: input, named, enum, output
export type DocumentClassifierDataFormat =
| "COMPREHEND_CSV"
| "AUGMENTED_MANIFEST"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface AugmentedManifestsListItem {
  S3Uri: string;
  AttributeNames: string[];
}

// refs: 3 - tags: input, named, interface, output
export interface DocumentClassifierOutputDataConfig {
  S3Uri?: string | null;
  KmsKeyId?: string | null;
}

// refs: 24 - tags: input, named, interface, output
export interface VpcConfig {
  SecurityGroupIds: string[];
  Subnets: string[];
}

// refs: 3 - tags: input, named, enum, output
export type DocumentClassifierMode =
| "MULTI_CLASS"
| "MULTI_LABEL"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface EntityRecognizerInputDataConfig {
  DataFormat?: EntityRecognizerDataFormat | null;
  EntityTypes: EntityTypesListItem[];
  Documents?: EntityRecognizerDocuments | null;
  Annotations?: EntityRecognizerAnnotations | null;
  EntityList?: EntityRecognizerEntityList | null;
  AugmentedManifests?: AugmentedManifestsListItem[] | null;
}

// refs: 3 - tags: input, named, enum, output
export type EntityRecognizerDataFormat =
| "COMPREHEND_CSV"
| "AUGMENTED_MANIFEST"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface EntityTypesListItem {
  Type: string;
}

// refs: 3 - tags: input, named, interface, output
export interface EntityRecognizerDocuments {
  S3Uri: string;
}

// refs: 3 - tags: input, named, interface, output
export interface EntityRecognizerAnnotations {
  S3Uri: string;
}

// refs: 3 - tags: input, named, interface, output
export interface EntityRecognizerEntityList {
  S3Uri: string;
}

// refs: 1 - tags: input, named, interface
export interface DocumentClassificationJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 38 - tags: input, named, enum, output
export type JobStatus =
| "SUBMITTED"
| "IN_PROGRESS"
| "COMPLETED"
| "FAILED"
| "STOP_REQUESTED"
| "STOPPED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DocumentClassifierFilter {
  Status?: ModelStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 6 - tags: input, named, enum, output
export type ModelStatus =
| "SUBMITTED"
| "TRAINING"
| "DELETING"
| "STOP_REQUESTED"
| "STOPPED"
| "IN_ERROR"
| "TRAINED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DominantLanguageDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface EndpointFilter {
  ModelArn?: string | null;
  Status?: EndpointStatus | null;
  CreationTimeBefore?: Date | number | null;
  CreationTimeAfter?: Date | number | null;
}

// refs: 3 - tags: input, named, enum, output
export type EndpointStatus =
| "CREATING"
| "DELETING"
| "FAILED"
| "IN_SERVICE"
| "UPDATING"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface EntitiesDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface EntityRecognizerFilter {
  Status?: ModelStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface EventsDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface KeyPhrasesDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface PiiEntitiesDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface SentimentDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 1 - tags: input, named, interface
export interface TopicsDetectionJobFilter {
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  SubmitTimeBefore?: Date | number | null;
  SubmitTimeAfter?: Date | number | null;
}

// refs: 24 - tags: input, named, interface, output
export interface InputDataConfig {
  S3Uri: string;
  InputFormat?: InputFormat | null;
}

// refs: 24 - tags: input, named, enum, output
export type InputFormat =
| "ONE_DOC_PER_FILE"
| "ONE_DOC_PER_LINE"
| cmnP.UnexpectedEnumValue;

// refs: 22 - tags: input, named, interface, output
export interface OutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string | null;
}

// refs: 3 - tags: input, named, enum, output
export type PiiEntitiesDetectionMode =
| "ONLY_REDACTION"
| "ONLY_OFFSETS"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface RedactionConfig {
  PiiEntityTypes?: PiiEntityType[] | null;
  MaskMode?: PiiEntitiesDetectionMaskMode | null;
  MaskCharacter?: string | null;
}

// refs: 5 - tags: input, named, enum, output
export type PiiEntityType =
| "BANK_ACCOUNT_NUMBER"
| "BANK_ROUTING"
| "CREDIT_DEBIT_NUMBER"
| "CREDIT_DEBIT_CVV"
| "CREDIT_DEBIT_EXPIRY"
| "PIN"
| "EMAIL"
| "ADDRESS"
| "NAME"
| "PHONE"
| "SSN"
| "DATE_TIME"
| "PASSPORT_NUMBER"
| "DRIVER_ID"
| "URL"
| "AGE"
| "USERNAME"
| "PASSWORD"
| "AWS_ACCESS_KEY"
| "AWS_SECRET_KEY"
| "IP_ADDRESS"
| "MAC_ADDRESS"
| "ALL"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type PiiEntitiesDetectionMaskMode =
| "MASK"
| "REPLACE_WITH_PII_ENTITY_TYPE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface BatchDetectDominantLanguageItemResult {
  Index?: number | null;
  Languages?: DominantLanguage[] | null;
}

// refs: 2 - tags: output, named, interface
export interface DominantLanguage {
  LanguageCode?: string | null;
  Score?: number | null;
}

// refs: 5 - tags: output, named, interface
export interface BatchItemError {
  Index?: number | null;
  ErrorCode?: string | null;
  ErrorMessage?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface BatchDetectEntitiesItemResult {
  Index?: number | null;
  Entities?: Entity[] | null;
}

// refs: 2 - tags: output, named, interface
export interface Entity {
  Score?: number | null;
  Type?: EntityType | null;
  Text?: string | null;
  BeginOffset?: number | null;
  EndOffset?: number | null;
}

// refs: 2 - tags: output, named, enum
export type EntityType =
| "PERSON"
| "LOCATION"
| "ORGANIZATION"
| "COMMERCIAL_ITEM"
| "EVENT"
| "DATE"
| "QUANTITY"
| "TITLE"
| "OTHER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface BatchDetectKeyPhrasesItemResult {
  Index?: number | null;
  KeyPhrases?: KeyPhrase[] | null;
}

// refs: 2 - tags: output, named, interface
export interface KeyPhrase {
  Score?: number | null;
  Text?: string | null;
  BeginOffset?: number | null;
  EndOffset?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface BatchDetectSentimentItemResult {
  Index?: number | null;
  Sentiment?: SentimentType | null;
  SentimentScore?: SentimentScore | null;
}

// refs: 2 - tags: output, named, enum
export type SentimentType =
| "POSITIVE"
| "NEGATIVE"
| "NEUTRAL"
| "MIXED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface SentimentScore {
  Positive?: number | null;
  Negative?: number | null;
  Neutral?: number | null;
  Mixed?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface BatchDetectSyntaxItemResult {
  Index?: number | null;
  SyntaxTokens?: SyntaxToken[] | null;
}

// refs: 2 - tags: output, named, interface
export interface SyntaxToken {
  TokenId?: number | null;
  Text?: string | null;
  BeginOffset?: number | null;
  EndOffset?: number | null;
  PartOfSpeech?: PartOfSpeechTag | null;
}

// refs: 2 - tags: output, named, interface
export interface PartOfSpeechTag {
  Tag?: PartOfSpeechTagType | null;
  Score?: number | null;
}

// refs: 2 - tags: output, named, enum
export type PartOfSpeechTagType =
| "ADJ"
| "ADP"
| "ADV"
| "AUX"
| "CONJ"
| "CCONJ"
| "DET"
| "INTJ"
| "NOUN"
| "NUM"
| "O"
| "PART"
| "PRON"
| "PROPN"
| "PUNCT"
| "SCONJ"
| "SYM"
| "VERB"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface DocumentClass {
  Name?: string | null;
  Score?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface DocumentLabel {
  Name?: string | null;
  Score?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface EntityLabel {
  Name?: PiiEntityType | null;
  Score?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface DocumentClassificationJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  DocumentClassifierArn?: string | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface DocumentClassifierProperties {
  DocumentClassifierArn?: string | null;
  LanguageCode?: LanguageCode | null;
  Status?: ModelStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  TrainingStartTime?: Date | number | null;
  TrainingEndTime?: Date | number | null;
  InputDataConfig?: DocumentClassifierInputDataConfig | null;
  OutputDataConfig?: DocumentClassifierOutputDataConfig | null;
  ClassifierMetadata?: ClassifierMetadata | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
  Mode?: DocumentClassifierMode | null;
}

// refs: 2 - tags: output, named, interface
export interface ClassifierMetadata {
  NumberOfLabels?: number | null;
  NumberOfTrainedDocuments?: number | null;
  NumberOfTestDocuments?: number | null;
  EvaluationMetrics?: ClassifierEvaluationMetrics | null;
}

// refs: 2 - tags: output, named, interface
export interface ClassifierEvaluationMetrics {
  Accuracy?: number | null;
  Precision?: number | null;
  Recall?: number | null;
  F1Score?: number | null;
  MicroPrecision?: number | null;
  MicroRecall?: number | null;
  MicroF1Score?: number | null;
  HammingLoss?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface DominantLanguageDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface EndpointProperties {
  EndpointArn?: string | null;
  Status?: EndpointStatus | null;
  Message?: string | null;
  ModelArn?: string | null;
  DesiredInferenceUnits?: number | null;
  CurrentInferenceUnits?: number | null;
  CreationTime?: Date | number | null;
  LastModifiedTime?: Date | number | null;
}

// refs: 2 - tags: output, named, interface
export interface EntitiesDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  EntityRecognizerArn?: string | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  LanguageCode?: LanguageCode | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface EntityRecognizerProperties {
  EntityRecognizerArn?: string | null;
  LanguageCode?: LanguageCode | null;
  Status?: ModelStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  TrainingStartTime?: Date | number | null;
  TrainingEndTime?: Date | number | null;
  InputDataConfig?: EntityRecognizerInputDataConfig | null;
  RecognizerMetadata?: EntityRecognizerMetadata | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface EntityRecognizerMetadata {
  NumberOfTrainedDocuments?: number | null;
  NumberOfTestDocuments?: number | null;
  EvaluationMetrics?: EntityRecognizerEvaluationMetrics | null;
  EntityTypes?: EntityRecognizerMetadataEntityTypesListItem[] | null;
}

// refs: 2 - tags: output, named, interface
export interface EntityRecognizerEvaluationMetrics {
  Precision?: number | null;
  Recall?: number | null;
  F1Score?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface EntityRecognizerMetadataEntityTypesListItem {
  Type?: string | null;
  EvaluationMetrics?: EntityTypesEvaluationMetrics | null;
  NumberOfTrainMentions?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface EntityTypesEvaluationMetrics {
  Precision?: number | null;
  Recall?: number | null;
  F1Score?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface EventsDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  LanguageCode?: LanguageCode | null;
  DataAccessRoleArn?: string | null;
  TargetEventTypes?: string[] | null;
}

// refs: 2 - tags: output, named, interface
export interface KeyPhrasesDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  LanguageCode?: LanguageCode | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface PiiEntitiesDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: PiiOutputDataConfig | null;
  RedactionConfig?: RedactionConfig | null;
  LanguageCode?: LanguageCode | null;
  DataAccessRoleArn?: string | null;
  Mode?: PiiEntitiesDetectionMode | null;
}

// refs: 2 - tags: output, named, interface
export interface PiiOutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface SentimentDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  LanguageCode?: LanguageCode | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 2 - tags: output, named, interface
export interface TopicsDetectionJobProperties {
  JobId?: string | null;
  JobName?: string | null;
  JobStatus?: JobStatus | null;
  Message?: string | null;
  SubmitTime?: Date | number | null;
  EndTime?: Date | number | null;
  InputDataConfig?: InputDataConfig | null;
  OutputDataConfig?: OutputDataConfig | null;
  NumberOfTopics?: number | null;
  DataAccessRoleArn?: string | null;
  VolumeKmsKeyId?: string | null;
  VpcConfig?: VpcConfig | null;
}

// refs: 1 - tags: output, named, interface
export interface PiiEntity {
  Score?: number | null;
  Type?: PiiEntityType | null;
  BeginOffset?: number | null;
  EndOffset?: number | null;
}
