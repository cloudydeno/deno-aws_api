// Autogenerated API structures for: Amazon CloudWatch

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface DeleteAlarmsInput {
  AlarmNames: string[];
}

// refs: 1 - tags: named, input
export interface DeleteAnomalyDetectorInput {
  Namespace: string;
  MetricName: string;
  Dimensions?: Dimension[] | null;
  Stat: string;
}

// refs: 1 - tags: named, input
export interface DeleteDashboardsInput {
  DashboardNames: string[];
}

// refs: 1 - tags: named, input
export interface DeleteInsightRulesInput {
  RuleNames: string[];
}

// refs: 1 - tags: named, input
export interface DescribeAlarmHistoryInput {
  AlarmName?: string | null;
  AlarmTypes?: AlarmType[] | null;
  HistoryItemType?: HistoryItemType | null;
  StartDate?: Date | number | null;
  EndDate?: Date | number | null;
  MaxRecords?: number | null;
  NextToken?: string | null;
  ScanBy?: ScanBy | null;
}

// refs: 1 - tags: named, input
export interface DescribeAlarmsInput {
  AlarmNames?: string[] | null;
  AlarmNamePrefix?: string | null;
  AlarmTypes?: AlarmType[] | null;
  ChildrenOfAlarmName?: string | null;
  ParentsOfAlarmName?: string | null;
  StateValue?: StateValue | null;
  ActionPrefix?: string | null;
  MaxRecords?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeAlarmsForMetricInput {
  MetricName: string;
  Namespace: string;
  Statistic?: Statistic | null;
  ExtendedStatistic?: string | null;
  Dimensions?: Dimension[] | null;
  Period?: number | null;
  Unit?: StandardUnit | null;
}

// refs: 1 - tags: named, input
export interface DescribeAnomalyDetectorsInput {
  NextToken?: string | null;
  MaxResults?: number | null;
  Namespace?: string | null;
  MetricName?: string | null;
  Dimensions?: Dimension[] | null;
}

// refs: 1 - tags: named, input
export interface DescribeInsightRulesInput {
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface DisableAlarmActionsInput {
  AlarmNames: string[];
}

// refs: 1 - tags: named, input
export interface DisableInsightRulesInput {
  RuleNames: string[];
}

// refs: 1 - tags: named, input
export interface EnableAlarmActionsInput {
  AlarmNames: string[];
}

// refs: 1 - tags: named, input
export interface EnableInsightRulesInput {
  RuleNames: string[];
}

// refs: 1 - tags: named, input
export interface GetDashboardInput {
  DashboardName: string;
}

// refs: 1 - tags: named, input
export interface GetInsightRuleReportInput {
  RuleName: string;
  StartTime: Date | number;
  EndTime: Date | number;
  Period: number;
  MaxContributorCount?: number | null;
  Metrics?: string[] | null;
  OrderBy?: string | null;
}

// refs: 1 - tags: named, input
export interface GetMetricDataInput {
  MetricDataQueries: MetricDataQuery[];
  StartTime: Date | number;
  EndTime: Date | number;
  NextToken?: string | null;
  ScanBy?: ScanBy | null;
  MaxDatapoints?: number | null;
  LabelOptions?: LabelOptions | null;
}

// refs: 1 - tags: named, input
export interface GetMetricStatisticsInput {
  Namespace: string;
  MetricName: string;
  Dimensions?: Dimension[] | null;
  StartTime: Date | number;
  EndTime: Date | number;
  Period: number;
  Statistics?: Statistic[] | null;
  ExtendedStatistics?: string[] | null;
  Unit?: StandardUnit | null;
}

// refs: 1 - tags: named, input
export interface GetMetricWidgetImageInput {
  MetricWidget: string;
  OutputFormat?: string | null;
}

// refs: 1 - tags: named, input
export interface ListDashboardsInput {
  DashboardNamePrefix?: string | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListMetricsInput {
  Namespace?: string | null;
  MetricName?: string | null;
  Dimensions?: DimensionFilter[] | null;
  NextToken?: string | null;
  RecentlyActive?: RecentlyActive | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceInput {
  ResourceARN: string;
}

// refs: 1 - tags: named, input
export interface PutAnomalyDetectorInput {
  Namespace: string;
  MetricName: string;
  Dimensions?: Dimension[] | null;
  Stat: string;
  Configuration?: AnomalyDetectorConfiguration | null;
}

// refs: 1 - tags: named, input
export interface PutCompositeAlarmInput {
  ActionsEnabled?: boolean | null;
  AlarmActions?: string[] | null;
  AlarmDescription?: string | null;
  AlarmName: string;
  AlarmRule: string;
  InsufficientDataActions?: string[] | null;
  OKActions?: string[] | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface PutDashboardInput {
  DashboardName: string;
  DashboardBody: string;
}

// refs: 1 - tags: named, input
export interface PutInsightRuleInput {
  RuleName: string;
  RuleState?: string | null;
  RuleDefinition: string;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface PutMetricAlarmInput {
  AlarmName: string;
  AlarmDescription?: string | null;
  ActionsEnabled?: boolean | null;
  OKActions?: string[] | null;
  AlarmActions?: string[] | null;
  InsufficientDataActions?: string[] | null;
  MetricName?: string | null;
  Namespace?: string | null;
  Statistic?: Statistic | null;
  ExtendedStatistic?: string | null;
  Dimensions?: Dimension[] | null;
  Period?: number | null;
  Unit?: StandardUnit | null;
  EvaluationPeriods: number;
  DatapointsToAlarm?: number | null;
  Threshold?: number | null;
  ComparisonOperator: ComparisonOperator;
  TreatMissingData?: string | null;
  EvaluateLowSampleCountPercentile?: string | null;
  Metrics?: MetricDataQuery[] | null;
  Tags?: Tag[] | null;
  ThresholdMetricId?: string | null;
}

// refs: 1 - tags: named, input
export interface PutMetricDataInput {
  Namespace: string;
  MetricData: MetricDatum[];
}

// refs: 1 - tags: named, input
export interface SetAlarmStateInput {
  AlarmName: string;
  StateValue: StateValue;
  StateReason: string;
  StateReasonData?: string | null;
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

// refs: 1 - tags: named, output
export interface DeleteInsightRulesOutput {
  Failures: PartialFailure[];
}

// refs: 1 - tags: named, output
export interface DescribeAlarmHistoryOutput {
  AlarmHistoryItems: AlarmHistoryItem[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeAlarmsOutput {
  CompositeAlarms: CompositeAlarm[];
  MetricAlarms: MetricAlarm[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeAlarmsForMetricOutput {
  MetricAlarms: MetricAlarm[];
}

// refs: 1 - tags: named, output
export interface DescribeAnomalyDetectorsOutput {
  AnomalyDetectors: AnomalyDetector[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeInsightRulesOutput {
  NextToken?: string | null;
  InsightRules: InsightRule[];
}

// refs: 1 - tags: named, output
export interface DisableInsightRulesOutput {
  Failures: PartialFailure[];
}

// refs: 1 - tags: named, output
export interface EnableInsightRulesOutput {
  Failures: PartialFailure[];
}

// refs: 1 - tags: named, output
export interface GetDashboardOutput {
  DashboardArn?: string | null;
  DashboardBody?: string | null;
  DashboardName?: string | null;
}

// refs: 1 - tags: named, output
export interface GetInsightRuleReportOutput {
  KeyLabels: string[];
  AggregationStatistic?: string | null;
  AggregateValue?: number | null;
  ApproximateUniqueCount?: number | null;
  Contributors: InsightRuleContributor[];
  MetricDatapoints: InsightRuleMetricDatapoint[];
}

// refs: 1 - tags: named, output
export interface GetMetricDataOutput {
  MetricDataResults: MetricDataResult[];
  NextToken?: string | null;
  Messages: MessageData[];
}

// refs: 1 - tags: named, output
export interface GetMetricStatisticsOutput {
  Label?: string | null;
  Datapoints: Datapoint[];
}

// refs: 1 - tags: named, output
export interface GetMetricWidgetImageOutput {
  MetricWidgetImage?: Uint8Array | string | null;
}

// refs: 1 - tags: named, output
export interface ListDashboardsOutput {
  DashboardEntries: DashboardEntry[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListMetricsOutput {
  Metrics: Metric[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceOutput {
  Tags: Tag[];
}

// refs: 1 - tags: named, output
export interface PutDashboardOutput {
  DashboardValidationMessages: DashboardValidationMessage[];
}

// refs: 15 - tags: input, named, interface, output
export interface Dimension {
  Name: string;
  Value: string;
}

// refs: 3 - tags: input, named, enum, output
export type AlarmType =
| "CompositeAlarm"
| "MetricAlarm"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type HistoryItemType =
| "ConfigurationUpdate"
| "StateUpdate"
| "Action"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum
export type ScanBy =
| "TimestampDescending"
| "TimestampAscending"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type StateValue =
| "OK"
| "ALARM"
| "INSUFFICIENT_DATA"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type Statistic =
| "SampleCount"
| "Average"
| "Sum"
| "Minimum"
| "Maximum"
| cmnP.UnexpectedEnumValue;

// refs: 11 - tags: input, named, enum, output
export type StandardUnit =
| "Seconds"
| "Microseconds"
| "Milliseconds"
| "Bytes"
| "Kilobytes"
| "Megabytes"
| "Gigabytes"
| "Terabytes"
| "Bits"
| "Kilobits"
| "Megabits"
| "Gigabits"
| "Terabits"
| "Percent"
| "Count"
| "Bytes/Second"
| "Kilobytes/Second"
| "Megabytes/Second"
| "Gigabytes/Second"
| "Terabytes/Second"
| "Bits/Second"
| "Kilobits/Second"
| "Megabits/Second"
| "Gigabits/Second"
| "Terabits/Second"
| "Count/Second"
| "None"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface MetricDataQuery {
  Id: string;
  MetricStat?: MetricStat | null;
  Expression?: string | null;
  Label?: string | null;
  ReturnData?: boolean | null;
  Period?: number | null;
}

// refs: 4 - tags: input, named, interface, output
export interface MetricStat {
  Metric: Metric;
  Period: number;
  Stat: string;
  Unit?: StandardUnit | null;
}

// refs: 5 - tags: input, named, interface, output
export interface Metric {
  Namespace?: string | null;
  MetricName?: string | null;
  Dimensions: Dimension[];
}

// refs: 1 - tags: input, named, interface
export interface LabelOptions {
  Timezone?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface DimensionFilter {
  Name: string;
  Value?: string | null;
}

// refs: 1 - tags: input, named, enum
export type RecentlyActive =
| "PT3H"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface AnomalyDetectorConfiguration {
  ExcludedTimeRanges: Range[];
  MetricTimezone?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface Range {
  StartTime: Date | number;
  EndTime: Date | number;
}

// refs: 5 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 3 - tags: input, named, enum, output
export type ComparisonOperator =
| "GreaterThanOrEqualToThreshold"
| "GreaterThanThreshold"
| "LessThanThreshold"
| "LessThanOrEqualToThreshold"
| "LessThanLowerOrGreaterThanUpperThreshold"
| "LessThanLowerThreshold"
| "GreaterThanUpperThreshold"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface MetricDatum {
  MetricName: string;
  Dimensions?: Dimension[] | null;
  Timestamp?: Date | number | null;
  Value?: number | null;
  StatisticValues?: StatisticSet | null;
  Values?: number[] | null;
  Counts?: number[] | null;
  Unit?: StandardUnit | null;
  StorageResolution?: number | null;
}

// refs: 1 - tags: input, named, interface
export interface StatisticSet {
  SampleCount: number;
  Sum: number;
  Minimum: number;
  Maximum: number;
}

// refs: 3 - tags: output, named, interface
export interface PartialFailure {
  FailureResource?: string | null;
  ExceptionType?: string | null;
  FailureCode?: string | null;
  FailureDescription?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface AlarmHistoryItem {
  AlarmName?: string | null;
  AlarmType?: AlarmType | null;
  Timestamp?: Date | number | null;
  HistoryItemType?: HistoryItemType | null;
  HistorySummary?: string | null;
  HistoryData?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface CompositeAlarm {
  ActionsEnabled?: boolean | null;
  AlarmActions: string[];
  AlarmArn?: string | null;
  AlarmConfigurationUpdatedTimestamp?: Date | number | null;
  AlarmDescription?: string | null;
  AlarmName?: string | null;
  AlarmRule?: string | null;
  InsufficientDataActions: string[];
  OKActions: string[];
  StateReason?: string | null;
  StateReasonData?: string | null;
  StateUpdatedTimestamp?: Date | number | null;
  StateValue?: StateValue | null;
}

// refs: 2 - tags: output, named, interface
export interface MetricAlarm {
  AlarmName?: string | null;
  AlarmArn?: string | null;
  AlarmDescription?: string | null;
  AlarmConfigurationUpdatedTimestamp?: Date | number | null;
  ActionsEnabled?: boolean | null;
  OKActions: string[];
  AlarmActions: string[];
  InsufficientDataActions: string[];
  StateValue?: StateValue | null;
  StateReason?: string | null;
  StateReasonData?: string | null;
  StateUpdatedTimestamp?: Date | number | null;
  MetricName?: string | null;
  Namespace?: string | null;
  Statistic?: Statistic | null;
  ExtendedStatistic?: string | null;
  Dimensions: Dimension[];
  Period?: number | null;
  Unit?: StandardUnit | null;
  EvaluationPeriods?: number | null;
  DatapointsToAlarm?: number | null;
  Threshold?: number | null;
  ComparisonOperator?: ComparisonOperator | null;
  TreatMissingData?: string | null;
  EvaluateLowSampleCountPercentile?: string | null;
  Metrics: MetricDataQuery[];
  ThresholdMetricId?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface AnomalyDetector {
  Namespace?: string | null;
  MetricName?: string | null;
  Dimensions: Dimension[];
  Stat?: string | null;
  Configuration?: AnomalyDetectorConfiguration | null;
  StateValue?: AnomalyDetectorStateValue | null;
}

// refs: 1 - tags: output, named, enum
export type AnomalyDetectorStateValue =
| "PENDING_TRAINING"
| "TRAINED_INSUFFICIENT_DATA"
| "TRAINED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface InsightRule {
  Name: string;
  State: string;
  Schema: string;
  Definition: string;
}

// refs: 1 - tags: output, named, interface
export interface InsightRuleContributor {
  Keys: string[];
  ApproximateAggregateValue: number;
  Datapoints: InsightRuleContributorDatapoint[];
}

// refs: 1 - tags: output, named, interface
export interface InsightRuleContributorDatapoint {
  Timestamp: Date | number;
  ApproximateValue: number;
}

// refs: 1 - tags: output, named, interface
export interface InsightRuleMetricDatapoint {
  Timestamp: Date | number;
  UniqueContributors?: number | null;
  MaxContributorValue?: number | null;
  SampleCount?: number | null;
  Average?: number | null;
  Sum?: number | null;
  Minimum?: number | null;
  Maximum?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface MetricDataResult {
  Id?: string | null;
  Label?: string | null;
  Timestamps: (Date | number)[];
  Values: number[];
  StatusCode?: StatusCode | null;
  Messages: MessageData[];
}

// refs: 1 - tags: output, named, enum
export type StatusCode =
| "Complete"
| "InternalError"
| "PartialData"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface MessageData {
  Code?: string | null;
  Value?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface Datapoint {
  Timestamp?: Date | number | null;
  SampleCount?: number | null;
  Average?: number | null;
  Sum?: number | null;
  Minimum?: number | null;
  Maximum?: number | null;
  Unit?: StandardUnit | null;
  ExtendedStatistics: { [key: string]: number | null | undefined };
}

// refs: 1 - tags: output, named, interface
export interface DashboardEntry {
  DashboardName?: string | null;
  DashboardArn?: string | null;
  LastModified?: Date | number | null;
  Size?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface DashboardValidationMessage {
  DataPath?: string | null;
  Message?: string | null;
}
