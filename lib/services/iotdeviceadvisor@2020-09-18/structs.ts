// Autogenerated API structures for: AWS IoT Core Device Advisor

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateSuiteDefinitionRequest {
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface DeleteSuiteDefinitionRequest {
  suiteDefinitionId: string;
}

// refs: 1 - tags: named, input
export interface GetSuiteDefinitionRequest {
  suiteDefinitionId: string;
  suiteDefinitionVersion?: string | null;
}

// refs: 1 - tags: named, input
export interface GetSuiteRunRequest {
  suiteDefinitionId: string;
  suiteRunId: string;
}

// refs: 1 - tags: named, input
export interface GetSuiteRunReportRequest {
  suiteDefinitionId: string;
  suiteRunId: string;
}

// refs: 1 - tags: named, input
export interface ListSuiteDefinitionsRequest {
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListSuiteRunsRequest {
  suiteDefinitionId?: string | null;
  suiteDefinitionVersion?: string | null;
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  resourceArn: string;
}

// refs: 1 - tags: named, input
export interface ListTestCasesRequest {
  intendedForQualification?: boolean | null;
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface StartSuiteRunRequest {
  suiteDefinitionId: string;
  suiteDefinitionVersion?: string | null;
  suiteRunConfiguration?: SuiteRunConfiguration | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateSuiteDefinitionRequest {
  suiteDefinitionId: string;
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration | null;
}

// refs: 1 - tags: named, output
export interface CreateSuiteDefinitionResponse {
  suiteDefinitionId?: string | null;
  suiteDefinitionArn?: string | null;
  suiteDefinitionName?: string | null;
  createdAt?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface DeleteSuiteDefinitionResponse {
}

// refs: 1 - tags: named, output
export interface GetSuiteDefinitionResponse {
  suiteDefinitionId?: string | null;
  suiteDefinitionArn?: string | null;
  suiteDefinitionVersion?: string | null;
  latestVersion?: string | null;
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration | null;
  createdAt?: Date | number | null;
  lastModifiedAt?: Date | number | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface GetSuiteRunResponse {
  suiteDefinitionId?: string | null;
  suiteDefinitionVersion?: string | null;
  suiteRunId?: string | null;
  suiteRunArn?: string | null;
  suiteRunConfiguration?: SuiteRunConfiguration | null;
  testResult?: TestResult | null;
  startTime?: Date | number | null;
  endTime?: Date | number | null;
  status?: SuiteRunStatus | null;
  errorReason?: string | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface GetSuiteRunReportResponse {
  qualificationReportDownloadUrl?: string | null;
}

// refs: 1 - tags: named, output
export interface ListSuiteDefinitionsResponse {
  suiteDefinitionInformationList?: SuiteDefinitionInformation[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListSuiteRunsResponse {
  suiteRunsList?: SuiteRunInformation[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface ListTestCasesResponse {
  categories?: TestCaseCategory[] | null;
  rootGroupConfiguration?: { [key: string]: string | null | undefined } | null;
  groupConfiguration?: { [key: string]: string | null | undefined } | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface StartSuiteRunResponse {
  suiteRunId?: string | null;
  suiteRunArn?: string | null;
  createdAt?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UpdateSuiteDefinitionResponse {
  suiteDefinitionId?: string | null;
  suiteDefinitionArn?: string | null;
  suiteDefinitionName?: string | null;
  suiteDefinitionVersion?: string | null;
  createdAt?: Date | number | null;
  lastUpdatedAt?: Date | number | null;
}

// refs: 3 - tags: input, named, interface, output
export interface SuiteDefinitionConfiguration {
  suiteDefinitionName?: string | null;
  devices?: DeviceUnderTest[] | null;
  intendedForQualification?: boolean | null;
  rootGroup?: string | null;
  devicePermissionRoleArn?: string | null;
}

// refs: 8 - tags: input, named, interface, output
export interface DeviceUnderTest {
  thingArn?: string | null;
  certificateArn?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface SuiteRunConfiguration {
  primaryDevice?: DeviceUnderTest | null;
  secondaryDevice?: DeviceUnderTest | null;
  selectedTestList?: string[] | null;
}

// refs: 1 - tags: output, named, interface
export interface TestResult {
  groups?: GroupResult[] | null;
}

// refs: 1 - tags: output, named, interface
export interface GroupResult {
  groupId?: string | null;
  groupName?: string | null;
  tests?: TestCaseRun[] | null;
}

// refs: 1 - tags: output, named, interface
export interface TestCaseRun {
  testCaseRunId?: string | null;
  testCaseDefinitionId?: string | null;
  testCaseDefinitionName?: string | null;
  status?: Status | null;
  startTime?: Date | number | null;
  endTime?: Date | number | null;
  logUrl?: string | null;
  warnings?: string | null;
  failure?: string | null;
}

// refs: 1 - tags: output, named, enum
export type Status =
| "PASS"
| "FAIL"
| "CANCELED"
| "PENDING"
| "RUNNING"
| "PASS_WITH_WARNINGS"
| "ERROR"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type SuiteRunStatus =
| "PASS"
| "FAIL"
| "CANCELED"
| "PENDING"
| "RUNNING"
| "PASS_WITH_WARNINGS"
| "ERROR"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SuiteDefinitionInformation {
  suiteDefinitionId?: string | null;
  suiteDefinitionName?: string | null;
  defaultDevices?: DeviceUnderTest[] | null;
  intendedForQualification?: boolean | null;
  createdAt?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface SuiteRunInformation {
  suiteDefinitionId?: string | null;
  suiteDefinitionVersion?: string | null;
  suiteDefinitionName?: string | null;
  suiteRunId?: string | null;
  createdAt?: Date | number | null;
  startedAt?: Date | number | null;
  endAt?: Date | number | null;
  status?: SuiteRunStatus | null;
  passed?: number | null;
  failed?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface TestCaseCategory {
  name?: string | null;
  tests?: TestCase[] | null;
}

// refs: 1 - tags: output, named, interface
export interface TestCase {
  name?: string | null;
  configuration?: { [key: string]: string | null | undefined } | null;
  test?: TestCaseDefinition | null;
}

// refs: 1 - tags: output, named, interface
export interface TestCaseDefinition {
  id?: string | null;
  testCaseVersion?: string | null;
}