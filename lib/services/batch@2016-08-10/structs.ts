// Autogenerated API structures for: AWS Batch

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CancelJobRequest {
  jobId: string;
  reason: string;
}

// refs: 1 - tags: named, input
export interface CreateComputeEnvironmentRequest {
  computeEnvironmentName: string;
  type: CEType;
  state?: CEState | null;
  computeResources?: ComputeResource | null;
  serviceRole: string;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface CreateJobQueueRequest {
  jobQueueName: string;
  state?: JQState | null;
  priority: number;
  computeEnvironmentOrder: ComputeEnvironmentOrder[];
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface DeleteComputeEnvironmentRequest {
  computeEnvironment: string;
}

// refs: 1 - tags: named, input
export interface DeleteJobQueueRequest {
  jobQueue: string;
}

// refs: 1 - tags: named, input
export interface DeregisterJobDefinitionRequest {
  jobDefinition: string;
}

// refs: 1 - tags: named, input
export interface DescribeComputeEnvironmentsRequest {
  computeEnvironments?: string[] | null;
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeJobDefinitionsRequest {
  jobDefinitions?: string[] | null;
  maxResults?: number | null;
  jobDefinitionName?: string | null;
  status?: string | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeJobQueuesRequest {
  jobQueues?: string[] | null;
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeJobsRequest {
  jobs: string[];
}

// refs: 1 - tags: named, input
export interface ListJobsRequest {
  jobQueue?: string | null;
  arrayJobId?: string | null;
  multiNodeJobId?: string | null;
  jobStatus?: JobStatus | null;
  maxResults?: number | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  resourceArn: string;
}

// refs: 1 - tags: named, input
export interface RegisterJobDefinitionRequest {
  jobDefinitionName: string;
  type: JobDefinitionType;
  parameters?: { [key: string]: string | null | undefined } | null;
  containerProperties?: ContainerProperties | null;
  nodeProperties?: NodeProperties | null;
  retryStrategy?: RetryStrategy | null;
  propagateTags?: boolean | null;
  timeout?: JobTimeout | null;
  tags?: { [key: string]: string | null | undefined } | null;
  platformCapabilities?: PlatformCapability[] | null;
}

// refs: 1 - tags: named, input
export interface SubmitJobRequest {
  jobName: string;
  jobQueue: string;
  arrayProperties?: ArrayProperties | null;
  dependsOn?: JobDependency[] | null;
  jobDefinition: string;
  parameters?: { [key: string]: string | null | undefined } | null;
  containerOverrides?: ContainerOverrides | null;
  nodeOverrides?: NodeOverrides | null;
  retryStrategy?: RetryStrategy | null;
  propagateTags?: boolean | null;
  timeout?: JobTimeout | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | null | undefined };
}

// refs: 1 - tags: named, input
export interface TerminateJobRequest {
  jobId: string;
  reason: string;
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateComputeEnvironmentRequest {
  computeEnvironment: string;
  state?: CEState | null;
  computeResources?: ComputeResourceUpdate | null;
  serviceRole?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateJobQueueRequest {
  jobQueue: string;
  state?: JQState | null;
  priority?: number | null;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[] | null;
}

// refs: 1 - tags: named, output
export interface CancelJobResponse {
}

// refs: 1 - tags: named, output
export interface CreateComputeEnvironmentResponse {
  computeEnvironmentName?: string | null;
  computeEnvironmentArn?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateJobQueueResponse {
  jobQueueName: string;
  jobQueueArn: string;
}

// refs: 1 - tags: named, output
export interface DeleteComputeEnvironmentResponse {
}

// refs: 1 - tags: named, output
export interface DeleteJobQueueResponse {
}

// refs: 1 - tags: named, output
export interface DeregisterJobDefinitionResponse {
}

// refs: 1 - tags: named, output
export interface DescribeComputeEnvironmentsResponse {
  computeEnvironments?: ComputeEnvironmentDetail[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeJobDefinitionsResponse {
  jobDefinitions?: JobDefinition[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeJobQueuesResponse {
  jobQueues?: JobQueueDetail[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeJobsResponse {
  jobs?: JobDetail[] | null;
}

// refs: 1 - tags: named, output
export interface ListJobsResponse {
  jobSummaryList: JobSummary[];
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface RegisterJobDefinitionResponse {
  jobDefinitionName: string;
  jobDefinitionArn: string;
  revision: number;
}

// refs: 1 - tags: named, output
export interface SubmitJobResponse {
  jobArn?: string | null;
  jobName: string;
  jobId: string;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
}

// refs: 1 - tags: named, output
export interface TerminateJobResponse {
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UpdateComputeEnvironmentResponse {
  computeEnvironmentName?: string | null;
  computeEnvironmentArn?: string | null;
}

// refs: 1 - tags: named, output
export interface UpdateJobQueueResponse {
  jobQueueName?: string | null;
  jobQueueArn?: string | null;
}

// refs: 2 - tags: input, named, enum, output
export type CEType =
| "MANAGED"
| "UNMANAGED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type CEState =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface ComputeResource {
  type: CRType;
  allocationStrategy?: CRAllocationStrategy | null;
  minvCpus?: number | null;
  maxvCpus: number;
  desiredvCpus?: number | null;
  instanceTypes?: string[] | null;
  imageId?: string | null;
  subnets: string[];
  securityGroupIds?: string[] | null;
  ec2KeyPair?: string | null;
  instanceRole?: string | null;
  tags?: { [key: string]: string | null | undefined } | null;
  placementGroup?: string | null;
  bidPercentage?: number | null;
  spotIamFleetRole?: string | null;
  launchTemplate?: LaunchTemplateSpecification | null;
  ec2Configuration?: Ec2Configuration[] | null;
}

// refs: 2 - tags: input, named, enum, output
export type CRType =
| "EC2"
| "SPOT"
| "FARGATE"
| "FARGATE_SPOT"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type CRAllocationStrategy =
| "BEST_FIT"
| "BEST_FIT_PROGRESSIVE"
| "SPOT_CAPACITY_OPTIMIZED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface LaunchTemplateSpecification {
  launchTemplateId?: string | null;
  launchTemplateName?: string | null;
  version?: string | null;
}

// refs: 2 - tags: input, named, interface, output
export interface Ec2Configuration {
  imageType: string;
  imageIdOverride?: string | null;
}

// refs: 3 - tags: input, named, enum, output
export type JQState =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface ComputeEnvironmentOrder {
  order: number;
  computeEnvironment: string;
}

// refs: 3 - tags: input, named, enum, output
export type JobStatus =
| "SUBMITTED"
| "PENDING"
| "RUNNABLE"
| "STARTING"
| "RUNNING"
| "SUCCEEDED"
| "FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type JobDefinitionType =
| "container"
| "multinode"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, interface, output
export interface ContainerProperties {
  image?: string | null;
  vcpus?: number | null;
  memory?: number | null;
  command?: string[] | null;
  jobRoleArn?: string | null;
  executionRoleArn?: string | null;
  volumes?: Volume[] | null;
  environment?: KeyValuePair[] | null;
  mountPoints?: MountPoint[] | null;
  readonlyRootFilesystem?: boolean | null;
  privileged?: boolean | null;
  ulimits?: Ulimit[] | null;
  user?: string | null;
  instanceType?: string | null;
  resourceRequirements?: ResourceRequirement[] | null;
  linuxParameters?: LinuxParameters | null;
  logConfiguration?: LogConfiguration | null;
  secrets?: Secret[] | null;
  networkConfiguration?: NetworkConfiguration | null;
  fargatePlatformConfiguration?: FargatePlatformConfiguration | null;
}

// refs: 6 - tags: input, named, interface, output
export interface Volume {
  host?: Host | null;
  name?: string | null;
}

// refs: 6 - tags: input, named, interface, output
export interface Host {
  sourcePath?: string | null;
}

// refs: 8 - tags: input, named, interface, output
export interface KeyValuePair {
  name?: string | null;
  value?: string | null;
}

// refs: 6 - tags: input, named, interface, output
export interface MountPoint {
  containerPath?: string | null;
  readOnly?: boolean | null;
  sourceVolume?: string | null;
}

// refs: 6 - tags: input, named, interface, output
export interface Ulimit {
  hardLimit: number;
  name: string;
  softLimit: number;
}

// refs: 8 - tags: input, named, interface, output
export interface ResourceRequirement {
  value: string;
  type: ResourceType;
}

// refs: 8 - tags: input, named, enum, output
export type ResourceType =
| "GPU"
| "VCPU"
| "MEMORY"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface LinuxParameters {
  devices?: Device[] | null;
  initProcessEnabled?: boolean | null;
  sharedMemorySize?: number | null;
  tmpfs?: Tmpfs[] | null;
  maxSwap?: number | null;
  swappiness?: number | null;
}

// refs: 6 - tags: input, named, interface, output
export interface Device {
  hostPath: string;
  containerPath?: string | null;
  permissions?: DeviceCgroupPermission[] | null;
}

// refs: 6 - tags: input, named, enum, output
export type DeviceCgroupPermission =
| "READ"
| "WRITE"
| "MKNOD"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface Tmpfs {
  containerPath: string;
  size: number;
  mountOptions?: string[] | null;
}

// refs: 6 - tags: input, named, interface, output
export interface LogConfiguration {
  logDriver: LogDriver;
  options?: { [key: string]: string | null | undefined } | null;
  secretOptions?: Secret[] | null;
}

// refs: 6 - tags: input, named, enum, output
export type LogDriver =
| "json-file"
| "syslog"
| "journald"
| "gelf"
| "fluentd"
| "awslogs"
| "splunk"
| cmnP.UnexpectedEnumValue;

// refs: 12 - tags: input, named, interface, output
export interface Secret {
  name: string;
  valueFrom: string;
}

// refs: 6 - tags: input, named, interface, output
export interface NetworkConfiguration {
  assignPublicIp?: AssignPublicIp | null;
}

// refs: 6 - tags: input, named, enum, output
export type AssignPublicIp =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, interface, output
export interface FargatePlatformConfiguration {
  platformVersion?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface NodeProperties {
  numNodes: number;
  mainNode: number;
  nodeRangeProperties: NodeRangeProperty[];
}

// refs: 3 - tags: input, named, interface, output
export interface NodeRangeProperty {
  targetNodes: string;
  container?: ContainerProperties | null;
}

// refs: 4 - tags: input, named, interface, output
export interface RetryStrategy {
  attempts?: number | null;
  evaluateOnExit?: EvaluateOnExit[] | null;
}

// refs: 4 - tags: input, named, interface, output
export interface EvaluateOnExit {
  onStatusReason?: string | null;
  onReason?: string | null;
  onExitCode?: string | null;
  action: RetryAction;
}

// refs: 4 - tags: input, named, enum, output
export type RetryAction =
| "RETRY"
| "EXIT"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface JobTimeout {
  attemptDurationSeconds?: number | null;
}

// refs: 3 - tags: input, named, enum, output
export type PlatformCapability =
| "EC2"
| "FARGATE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ArrayProperties {
  size?: number | null;
}

// refs: 2 - tags: input, named, interface, output
export interface JobDependency {
  jobId?: string | null;
  type?: ArrayJobDependency | null;
}

// refs: 2 - tags: input, named, enum, output
export type ArrayJobDependency =
| "N_TO_N"
| "SEQUENTIAL"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface
export interface ContainerOverrides {
  vcpus?: number | null;
  memory?: number | null;
  command?: string[] | null;
  instanceType?: string | null;
  environment?: KeyValuePair[] | null;
  resourceRequirements?: ResourceRequirement[] | null;
}

// refs: 1 - tags: input, named, interface
export interface NodeOverrides {
  numNodes?: number | null;
  nodePropertyOverrides?: NodePropertyOverride[] | null;
}

// refs: 1 - tags: input, named, interface
export interface NodePropertyOverride {
  targetNodes: string;
  containerOverrides?: ContainerOverrides | null;
}

// refs: 1 - tags: input, named, interface
export interface ComputeResourceUpdate {
  minvCpus?: number | null;
  maxvCpus?: number | null;
  desiredvCpus?: number | null;
  subnets?: string[] | null;
  securityGroupIds?: string[] | null;
}

// refs: 1 - tags: output, named, interface
export interface ComputeEnvironmentDetail {
  computeEnvironmentName: string;
  computeEnvironmentArn: string;
  ecsClusterArn: string;
  tags?: { [key: string]: string | null | undefined } | null;
  type?: CEType | null;
  state?: CEState | null;
  status?: CEStatus | null;
  statusReason?: string | null;
  computeResources?: ComputeResource | null;
  serviceRole?: string | null;
}

// refs: 1 - tags: output, named, enum
export type CEStatus =
| "CREATING"
| "UPDATING"
| "DELETING"
| "DELETED"
| "VALID"
| "INVALID"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface JobDefinition {
  jobDefinitionName: string;
  jobDefinitionArn: string;
  revision: number;
  status?: string | null;
  type: string;
  parameters?: { [key: string]: string | null | undefined } | null;
  retryStrategy?: RetryStrategy | null;
  containerProperties?: ContainerProperties | null;
  timeout?: JobTimeout | null;
  nodeProperties?: NodeProperties | null;
  tags?: { [key: string]: string | null | undefined } | null;
  propagateTags?: boolean | null;
  platformCapabilities?: PlatformCapability[] | null;
}

// refs: 1 - tags: output, named, interface
export interface JobQueueDetail {
  jobQueueName: string;
  jobQueueArn: string;
  state: JQState;
  status?: JQStatus | null;
  statusReason?: string | null;
  priority: number;
  computeEnvironmentOrder: ComputeEnvironmentOrder[];
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: output, named, enum
export type JQStatus =
| "CREATING"
| "UPDATING"
| "DELETING"
| "DELETED"
| "VALID"
| "INVALID"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface JobDetail {
  jobArn?: string | null;
  jobName: string;
  jobId: string;
  jobQueue: string;
  status: JobStatus;
  attempts?: AttemptDetail[] | null;
  statusReason?: string | null;
  createdAt?: number | null;
  retryStrategy?: RetryStrategy | null;
  startedAt: number;
  stoppedAt?: number | null;
  dependsOn?: JobDependency[] | null;
  jobDefinition: string;
  parameters?: { [key: string]: string | null | undefined } | null;
  container?: ContainerDetail | null;
  nodeDetails?: NodeDetails | null;
  nodeProperties?: NodeProperties | null;
  arrayProperties?: ArrayPropertiesDetail | null;
  timeout?: JobTimeout | null;
  tags?: { [key: string]: string | null | undefined } | null;
  propagateTags?: boolean | null;
  platformCapabilities?: PlatformCapability[] | null;
}

// refs: 1 - tags: output, named, interface
export interface AttemptDetail {
  container?: AttemptContainerDetail | null;
  startedAt?: number | null;
  stoppedAt?: number | null;
  statusReason?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface AttemptContainerDetail {
  containerInstanceArn?: string | null;
  taskArn?: string | null;
  exitCode?: number | null;
  reason?: string | null;
  logStreamName?: string | null;
  networkInterfaces?: NetworkInterface[] | null;
}

// refs: 2 - tags: output, named, interface
export interface NetworkInterface {
  attachmentId?: string | null;
  ipv6Address?: string | null;
  privateIpv4Address?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ContainerDetail {
  image?: string | null;
  vcpus?: number | null;
  memory?: number | null;
  command?: string[] | null;
  jobRoleArn?: string | null;
  executionRoleArn?: string | null;
  volumes?: Volume[] | null;
  environment?: KeyValuePair[] | null;
  mountPoints?: MountPoint[] | null;
  readonlyRootFilesystem?: boolean | null;
  ulimits?: Ulimit[] | null;
  privileged?: boolean | null;
  user?: string | null;
  exitCode?: number | null;
  reason?: string | null;
  containerInstanceArn?: string | null;
  taskArn?: string | null;
  logStreamName?: string | null;
  instanceType?: string | null;
  networkInterfaces?: NetworkInterface[] | null;
  resourceRequirements?: ResourceRequirement[] | null;
  linuxParameters?: LinuxParameters | null;
  logConfiguration?: LogConfiguration | null;
  secrets?: Secret[] | null;
  networkConfiguration?: NetworkConfiguration | null;
  fargatePlatformConfiguration?: FargatePlatformConfiguration | null;
}

// refs: 1 - tags: output, named, interface
export interface NodeDetails {
  nodeIndex?: number | null;
  isMainNode?: boolean | null;
}

// refs: 1 - tags: output, named, interface
export interface ArrayPropertiesDetail {
  statusSummary?: { [key: string]: number | null | undefined } | null;
  size?: number | null;
  index?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface JobSummary {
  jobArn?: string | null;
  jobId: string;
  jobName: string;
  createdAt?: number | null;
  status?: JobStatus | null;
  statusReason?: string | null;
  startedAt?: number | null;
  stoppedAt?: number | null;
  container?: ContainerSummary | null;
  arrayProperties?: ArrayPropertiesSummary | null;
  nodeProperties?: NodePropertiesSummary | null;
}

// refs: 1 - tags: output, named, interface
export interface ContainerSummary {
  exitCode?: number | null;
  reason?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ArrayPropertiesSummary {
  size?: number | null;
  index?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface NodePropertiesSummary {
  isMainNode?: boolean | null;
  numNodes?: number | null;
  nodeIndex?: number | null;
}