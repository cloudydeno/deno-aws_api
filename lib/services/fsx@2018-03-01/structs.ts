// Autogenerated API structures for: Amazon FSx

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface AssociateFileSystemAliasesRequest {
  ClientRequestToken?: string | null;
  FileSystemId: string;
  Aliases: string[];
}

// refs: 1 - tags: named, input
export interface CancelDataRepositoryTaskRequest {
  TaskId: string;
}

// refs: 1 - tags: named, input
export interface CreateBackupRequest {
  FileSystemId: string;
  ClientRequestToken?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateDataRepositoryTaskRequest {
  Type: DataRepositoryTaskType;
  Paths?: string[] | null;
  FileSystemId: string;
  Report: CompletionReport;
  ClientRequestToken?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateFileSystemRequest {
  ClientRequestToken?: string | null;
  FileSystemType: FileSystemType;
  StorageCapacity: number;
  StorageType?: StorageType | null;
  SubnetIds: string[];
  SecurityGroupIds?: string[] | null;
  Tags?: Tag[] | null;
  KmsKeyId?: string | null;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration | null;
  LustreConfiguration?: CreateFileSystemLustreConfiguration | null;
}

// refs: 1 - tags: named, input
export interface CreateFileSystemFromBackupRequest {
  BackupId: string;
  ClientRequestToken?: string | null;
  SubnetIds: string[];
  SecurityGroupIds?: string[] | null;
  Tags?: Tag[] | null;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration | null;
  LustreConfiguration?: CreateFileSystemLustreConfiguration | null;
  StorageType?: StorageType | null;
}

// refs: 1 - tags: named, input
export interface DeleteBackupRequest {
  BackupId: string;
  ClientRequestToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DeleteFileSystemRequest {
  FileSystemId: string;
  ClientRequestToken?: string | null;
  WindowsConfiguration?: DeleteFileSystemWindowsConfiguration | null;
  LustreConfiguration?: DeleteFileSystemLustreConfiguration | null;
}

// refs: 1 - tags: named, input
export interface DescribeBackupsRequest {
  BackupIds?: string[] | null;
  Filters?: Filter[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeDataRepositoryTasksRequest {
  TaskIds?: string[] | null;
  Filters?: DataRepositoryTaskFilter[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeFileSystemAliasesRequest {
  ClientRequestToken?: string | null;
  FileSystemId: string;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DescribeFileSystemsRequest {
  FileSystemIds?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface DisassociateFileSystemAliasesRequest {
  ClientRequestToken?: string | null;
  FileSystemId: string;
  Aliases: string[];
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceARN: string;
  MaxResults?: number | null;
  NextToken?: string | null;
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
export interface UpdateFileSystemRequest {
  FileSystemId: string;
  ClientRequestToken?: string | null;
  StorageCapacity?: number | null;
  WindowsConfiguration?: UpdateFileSystemWindowsConfiguration | null;
  LustreConfiguration?: UpdateFileSystemLustreConfiguration | null;
}

// refs: 1 - tags: named, output
export interface AssociateFileSystemAliasesResponse {
  Aliases?: Alias[] | null;
}

// refs: 1 - tags: named, output
export interface CancelDataRepositoryTaskResponse {
  Lifecycle?: DataRepositoryTaskLifecycle | null;
  TaskId?: string | null;
}

// refs: 1 - tags: named, output
export interface CreateBackupResponse {
  Backup?: Backup | null;
}

// refs: 1 - tags: named, output
export interface CreateDataRepositoryTaskResponse {
  DataRepositoryTask?: DataRepositoryTask | null;
}

// refs: 1 - tags: named, output
export interface CreateFileSystemResponse {
  FileSystem?: FileSystem | null;
}

// refs: 1 - tags: named, output
export interface CreateFileSystemFromBackupResponse {
  FileSystem?: FileSystem | null;
}

// refs: 1 - tags: named, output
export interface DeleteBackupResponse {
  BackupId?: string | null;
  Lifecycle?: BackupLifecycle | null;
}

// refs: 1 - tags: named, output
export interface DeleteFileSystemResponse {
  FileSystemId?: string | null;
  Lifecycle?: FileSystemLifecycle | null;
  WindowsResponse?: DeleteFileSystemWindowsResponse | null;
  LustreResponse?: DeleteFileSystemLustreResponse | null;
}

// refs: 1 - tags: named, output
export interface DescribeBackupsResponse {
  Backups?: Backup[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeDataRepositoryTasksResponse {
  DataRepositoryTasks?: DataRepositoryTask[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeFileSystemAliasesResponse {
  Aliases?: Alias[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeFileSystemsResponse {
  FileSystems?: FileSystem[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DisassociateFileSystemAliasesResponse {
  Aliases?: Alias[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface UpdateFileSystemResponse {
  FileSystem?: FileSystem | null;
}

// refs: 20 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 3 - tags: input, named, enum, output
export type DataRepositoryTaskType =
| "EXPORT_TO_REPOSITORY"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface CompletionReport {
  Enabled: boolean;
  Path?: string | null;
  Format?: ReportFormat | null;
  Scope?: ReportScope | null;
}

// refs: 3 - tags: input, named, enum, output
export type ReportFormat =
| "REPORT_CSV_20191124"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type ReportScope =
| "FAILED_FILES_ONLY"
| cmnP.UnexpectedEnumValue;

// refs: 7 - tags: input, named, enum, output
export type FileSystemType =
| "WINDOWS"
| "LUSTRE"
| cmnP.UnexpectedEnumValue;

// refs: 8 - tags: input, named, enum, output
export type StorageType =
| "SSD"
| "HDD"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface
export interface CreateFileSystemWindowsConfiguration {
  ActiveDirectoryId?: string | null;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration | null;
  DeploymentType?: WindowsDeploymentType | null;
  PreferredSubnetId?: string | null;
  ThroughputCapacity: number;
  WeeklyMaintenanceStartTime?: string | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  CopyTagsToBackups?: boolean | null;
  Aliases?: string[] | null;
}

// refs: 2 - tags: input, named, interface
export interface SelfManagedActiveDirectoryConfiguration {
  DomainName: string;
  OrganizationalUnitDistinguishedName?: string | null;
  FileSystemAdministratorsGroup?: string | null;
  UserName: string;
  Password: string;
  DnsIps: string[];
}

// refs: 8 - tags: input, named, enum, output
export type WindowsDeploymentType =
| "MULTI_AZ_1"
| "SINGLE_AZ_1"
| "SINGLE_AZ_2"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface
export interface CreateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string | null;
  ImportPath?: string | null;
  ExportPath?: string | null;
  ImportedFileChunkSize?: number | null;
  DeploymentType?: LustreDeploymentType | null;
  AutoImportPolicy?: AutoImportPolicyType | null;
  PerUnitStorageThroughput?: number | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  CopyTagsToBackups?: boolean | null;
  DriveCacheType?: DriveCacheType | null;
}

// refs: 8 - tags: input, named, enum, output
export type LustreDeploymentType =
| "SCRATCH_1"
| "SCRATCH_2"
| "PERSISTENT_1"
| cmnP.UnexpectedEnumValue;

// refs: 9 - tags: input, named, enum, output
export type AutoImportPolicyType =
| "NONE"
| "NEW"
| "NEW_CHANGED"
| cmnP.UnexpectedEnumValue;

// refs: 8 - tags: input, named, enum, output
export type DriveCacheType =
| "NONE"
| "READ"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DeleteFileSystemWindowsConfiguration {
  SkipFinalBackup?: boolean | null;
  FinalBackupTags?: Tag[] | null;
}

// refs: 1 - tags: input, named, interface
export interface DeleteFileSystemLustreConfiguration {
  SkipFinalBackup?: boolean | null;
  FinalBackupTags?: Tag[] | null;
}

// refs: 1 - tags: input, named, interface
export interface Filter {
  Name?: FilterName | null;
  Values?: string[] | null;
}

// refs: 1 - tags: input, named, enum
export type FilterName =
| "file-system-id"
| "backup-type"
| "file-system-type"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DataRepositoryTaskFilter {
  Name?: DataRepositoryTaskFilterName | null;
  Values?: string[] | null;
}

// refs: 1 - tags: input, named, enum
export type DataRepositoryTaskFilterName =
| "file-system-id"
| "task-lifecycle"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface UpdateFileSystemWindowsConfiguration {
  WeeklyMaintenanceStartTime?: string | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  ThroughputCapacity?: number | null;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfigurationUpdates | null;
}

// refs: 1 - tags: input, named, interface
export interface SelfManagedActiveDirectoryConfigurationUpdates {
  UserName?: string | null;
  Password?: string | null;
  DnsIps?: string[] | null;
}

// refs: 1 - tags: input, named, interface
export interface UpdateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  AutoImportPolicy?: AutoImportPolicyType | null;
}

// refs: 9 - tags: output, named, interface
export interface Alias {
  Name?: string | null;
  Lifecycle?: AliasLifecycle | null;
}

// refs: 9 - tags: output, named, enum
export type AliasLifecycle =
| "AVAILABLE"
| "CREATING"
| "DELETING"
| "CREATE_FAILED"
| "DELETE_FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, enum
export type DataRepositoryTaskLifecycle =
| "PENDING"
| "EXECUTING"
| "FAILED"
| "SUCCEEDED"
| "CANCELED"
| "CANCELING"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface Backup {
  BackupId: string;
  Lifecycle: BackupLifecycle;
  FailureDetails?: BackupFailureDetails | null;
  Type: BackupType;
  ProgressPercent?: number | null;
  CreationTime: Date | number;
  KmsKeyId?: string | null;
  ResourceARN?: string | null;
  Tags?: Tag[] | null;
  FileSystem: FileSystem;
  DirectoryInformation?: ActiveDirectoryBackupAttributes | null;
}

// refs: 3 - tags: output, named, enum
export type BackupLifecycle =
| "AVAILABLE"
| "CREATING"
| "TRANSFERRING"
| "DELETED"
| "FAILED"
| "PENDING"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface BackupFailureDetails {
  Message?: string | null;
}

// refs: 2 - tags: output, named, enum
export type BackupType =
| "AUTOMATIC"
| "USER_INITIATED"
| "AWS_BACKUP"
| cmnP.UnexpectedEnumValue;

// refs: 12 - tags: output, named, interface, recursed
export interface FileSystem {
  OwnerId?: string | null;
  CreationTime?: Date | number | null;
  FileSystemId?: string | null;
  FileSystemType?: FileSystemType | null;
  Lifecycle?: FileSystemLifecycle | null;
  FailureDetails?: FileSystemFailureDetails | null;
  StorageCapacity?: number | null;
  StorageType?: StorageType | null;
  VpcId?: string | null;
  SubnetIds?: string[] | null;
  NetworkInterfaceIds?: string[] | null;
  DNSName?: string | null;
  KmsKeyId?: string | null;
  ResourceARN?: string | null;
  Tags?: Tag[] | null;
  WindowsConfiguration?: WindowsFileSystemConfiguration | null;
  LustreConfiguration?: LustreFileSystemConfiguration | null;
  AdministrativeActions?: AdministrativeAction[] | null;
}

// refs: 7 - tags: output, named, enum
export type FileSystemLifecycle =
| "AVAILABLE"
| "CREATING"
| "FAILED"
| "DELETING"
| "MISCONFIGURED"
| "UPDATING"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, interface
export interface FileSystemFailureDetails {
  Message?: string | null;
}

// refs: 6 - tags: output, named, interface
export interface WindowsFileSystemConfiguration {
  ActiveDirectoryId?: string | null;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes | null;
  DeploymentType?: WindowsDeploymentType | null;
  RemoteAdministrationEndpoint?: string | null;
  PreferredSubnetId?: string | null;
  PreferredFileServerIp?: string | null;
  ThroughputCapacity?: number | null;
  MaintenanceOperationsInProgress?: FileSystemMaintenanceOperation[] | null;
  WeeklyMaintenanceStartTime?: string | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  CopyTagsToBackups?: boolean | null;
  Aliases?: Alias[] | null;
}

// refs: 6 - tags: output, named, interface
export interface SelfManagedActiveDirectoryAttributes {
  DomainName?: string | null;
  OrganizationalUnitDistinguishedName?: string | null;
  FileSystemAdministratorsGroup?: string | null;
  UserName?: string | null;
  DnsIps?: string[] | null;
}

// refs: 6 - tags: output, named, enum
export type FileSystemMaintenanceOperation =
| "PATCHING"
| "BACKING_UP"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, interface
export interface LustreFileSystemConfiguration {
  WeeklyMaintenanceStartTime?: string | null;
  DataRepositoryConfiguration?: DataRepositoryConfiguration | null;
  DeploymentType?: LustreDeploymentType | null;
  PerUnitStorageThroughput?: number | null;
  MountName?: string | null;
  DailyAutomaticBackupStartTime?: string | null;
  AutomaticBackupRetentionDays?: number | null;
  CopyTagsToBackups?: boolean | null;
  DriveCacheType?: DriveCacheType | null;
}

// refs: 6 - tags: output, named, interface
export interface DataRepositoryConfiguration {
  Lifecycle?: DataRepositoryLifecycle | null;
  ImportPath?: string | null;
  ExportPath?: string | null;
  ImportedFileChunkSize?: number | null;
  AutoImportPolicy?: AutoImportPolicyType | null;
  FailureDetails?: DataRepositoryFailureDetails | null;
}

// refs: 6 - tags: output, named, enum
export type DataRepositoryLifecycle =
| "CREATING"
| "AVAILABLE"
| "MISCONFIGURED"
| "UPDATING"
| "DELETING"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, interface
export interface DataRepositoryFailureDetails {
  Message?: string | null;
}

// refs: 6 - tags: output, named, interface, recursive
export interface AdministrativeAction {
  AdministrativeActionType?: AdministrativeActionType | null;
  ProgressPercent?: number | null;
  RequestTime?: Date | number | null;
  Status?: Status | null;
  TargetFileSystemValues?: FileSystem | null;
  FailureDetails?: AdministrativeActionFailureDetails | null;
}

// refs: 6 - tags: output, named, enum
export type AdministrativeActionType =
| "FILE_SYSTEM_UPDATE"
| "STORAGE_OPTIMIZATION"
| "FILE_SYSTEM_ALIAS_ASSOCIATION"
| "FILE_SYSTEM_ALIAS_DISASSOCIATION"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, enum
export type Status =
| "FAILED"
| "IN_PROGRESS"
| "PENDING"
| "COMPLETED"
| "UPDATED_OPTIMIZING"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: output, named, interface
export interface AdministrativeActionFailureDetails {
  Message?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface ActiveDirectoryBackupAttributes {
  DomainName?: string | null;
  ActiveDirectoryId?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface DataRepositoryTask {
  TaskId: string;
  Lifecycle: DataRepositoryTaskLifecycle;
  Type: DataRepositoryTaskType;
  CreationTime: Date | number;
  StartTime?: Date | number | null;
  EndTime?: Date | number | null;
  ResourceARN?: string | null;
  Tags?: Tag[] | null;
  FileSystemId: string;
  Paths?: string[] | null;
  FailureDetails?: DataRepositoryTaskFailureDetails | null;
  Status?: DataRepositoryTaskStatus | null;
  Report?: CompletionReport | null;
}

// refs: 2 - tags: output, named, interface
export interface DataRepositoryTaskFailureDetails {
  Message?: string | null;
}

// refs: 2 - tags: output, named, interface
export interface DataRepositoryTaskStatus {
  TotalCount?: number | null;
  SucceededCount?: number | null;
  FailedCount?: number | null;
  LastUpdatedTime?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface DeleteFileSystemWindowsResponse {
  FinalBackupId?: string | null;
  FinalBackupTags?: Tag[] | null;
}

// refs: 1 - tags: output, named, interface
export interface DeleteFileSystemLustreResponse {
  FinalBackupId?: string | null;
  FinalBackupTags?: Tag[] | null;
}
