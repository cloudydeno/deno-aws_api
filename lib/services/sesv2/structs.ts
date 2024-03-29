// Autogenerated API structures for: Amazon Simple Email Service

import * as cmnP from "../../encoding/common.ts";

// refs: 1 - tags: named, input
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  TrackingOptions?: TrackingOptions | null;
  DeliveryOptions?: DeliveryOptions | null;
  ReputationOptions?: ReputationOptions | null;
  SendingOptions?: SendingOptions | null;
  Tags?: Tag[] | null;
  SuppressionOptions?: SuppressionOptions | null;
}

// refs: 1 - tags: named, input
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}

// refs: 1 - tags: named, input
export interface CreateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[] | null;
  UnsubscribeAll?: boolean | null;
  AttributesData?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateContactListRequest {
  ContactListName: string;
  Topics?: Topic[] | null;
  Description?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}

// refs: 1 - tags: named, input
export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateDeliverabilityTestReportRequest {
  ReportName?: string | null;
  FromEmailAddress: string;
  Content: EmailContent;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[] | null;
  DkimSigningAttributes?: DkimSigningAttributes | null;
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, input
export interface CreateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}

// refs: 1 - tags: named, input
export interface CreateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
}

// refs: 1 - tags: named, input
export interface CreateImportJobRequest {
  ImportDestination: ImportDestination;
  ImportDataSource: ImportDataSource;
}

// refs: 1 - tags: named, input
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}

// refs: 1 - tags: named, input
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}

// refs: 1 - tags: named, input
export interface DeleteContactRequest {
  ContactListName: string;
  EmailAddress: string;
}

// refs: 1 - tags: named, input
export interface DeleteContactListRequest {
  ContactListName: string;
}

// refs: 1 - tags: named, input
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}

// refs: 1 - tags: named, input
export interface DeleteDedicatedIpPoolRequest {
  PoolName: string;
}

// refs: 1 - tags: named, input
export interface DeleteEmailIdentityRequest {
  EmailIdentity: string;
}

// refs: 1 - tags: named, input
export interface DeleteEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
}

// refs: 1 - tags: named, input
export interface DeleteEmailTemplateRequest {
  TemplateName: string;
}

// refs: 1 - tags: named, input
export interface DeleteSuppressedDestinationRequest {
  EmailAddress: string;
}

// refs: 1 - tags: named, input
export interface GetBlacklistReportsRequest {
  BlacklistItemNames: string[];
}

// refs: 1 - tags: named, input
export interface GetConfigurationSetRequest {
  ConfigurationSetName: string;
}

// refs: 1 - tags: named, input
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}

// refs: 1 - tags: named, input
export interface GetContactRequest {
  ContactListName: string;
  EmailAddress: string;
}

// refs: 1 - tags: named, input
export interface GetContactListRequest {
  ContactListName: string;
}

// refs: 1 - tags: named, input
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}

// refs: 1 - tags: named, input
export interface GetDedicatedIpRequest {
  Ip: string;
}

// refs: 1 - tags: named, input
export interface GetDedicatedIpsRequest {
  PoolName?: string | null;
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface GetDeliverabilityTestReportRequest {
  ReportId: string;
}

// refs: 1 - tags: named, input
export interface GetDomainDeliverabilityCampaignRequest {
  CampaignId: string;
}

// refs: 1 - tags: named, input
export interface GetDomainStatisticsReportRequest {
  Domain: string;
  StartDate: Date | number;
  EndDate: Date | number;
}

// refs: 1 - tags: named, input
export interface GetEmailIdentityRequest {
  EmailIdentity: string;
}

// refs: 1 - tags: named, input
export interface GetEmailIdentityPoliciesRequest {
  EmailIdentity: string;
}

// refs: 1 - tags: named, input
export interface GetEmailTemplateRequest {
  TemplateName: string;
}

// refs: 1 - tags: named, input
export interface GetImportJobRequest {
  JobId: string;
}

// refs: 1 - tags: named, input
export interface GetSuppressedDestinationRequest {
  EmailAddress: string;
}

// refs: 1 - tags: named, input
export interface ListConfigurationSetsRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListContactListsRequest {
  PageSize?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListContactsRequest {
  ContactListName: string;
  Filter?: ListContactsFilter | null;
  PageSize?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDedicatedIpPoolsRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDeliverabilityTestReportsRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListDomainDeliverabilityCampaignsRequest {
  StartDate: Date | number;
  EndDate: Date | number;
  SubscribedDomain: string;
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEmailIdentitiesRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListEmailTemplatesRequest {
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListImportJobsRequest {
  ImportDestinationType?: ImportDestinationType | null;
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListSuppressedDestinationsRequest {
  Reasons?: SuppressionListReason[] | null;
  StartDate?: Date | number | null;
  EndDate?: Date | number | null;
  NextToken?: string | null;
  PageSize?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutAccountDetailsRequest {
  MailType: MailType;
  WebsiteURL: string;
  ContactLanguage?: ContactLanguage | null;
  UseCaseDescription: string;
  AdditionalContactEmailAddresses?: string[] | null;
  ProductionAccessEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutAccountSuppressionAttributesRequest {
  SuppressedReasons?: SuppressionListReason[] | null;
}

// refs: 1 - tags: named, input
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy | null;
  SendingPoolName?: string | null;
}

// refs: 1 - tags: named, input
export interface PutConfigurationSetReputationOptionsRequest {
  ConfigurationSetName: string;
  ReputationMetricsEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutConfigurationSetSendingOptionsRequest {
  ConfigurationSetName: string;
  SendingEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutConfigurationSetSuppressionOptionsRequest {
  ConfigurationSetName: string;
  SuppressedReasons?: SuppressionListReason[] | null;
}

// refs: 1 - tags: named, input
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string | null;
}

// refs: 1 - tags: named, input
export interface PutDedicatedIpInPoolRequest {
  Ip: string;
  DestinationPoolName: string;
}

// refs: 1 - tags: named, input
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string;
  WarmupPercentage: number;
}

// refs: 1 - tags: named, input
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[] | null;
}

// refs: 1 - tags: named, input
export interface PutEmailIdentityConfigurationSetAttributesRequest {
  EmailIdentity: string;
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, input
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutEmailIdentityDkimSigningAttributesRequest {
  EmailIdentity: string;
  SigningAttributesOrigin: DkimSigningAttributesOrigin;
  SigningAttributes?: DkimSigningAttributes | null;
}

// refs: 1 - tags: named, input
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string;
  EmailForwardingEnabled?: boolean | null;
}

// refs: 1 - tags: named, input
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string;
  MailFromDomain?: string | null;
  BehaviorOnMxFailure?: BehaviorOnMxFailure | null;
}

// refs: 1 - tags: named, input
export interface PutSuppressedDestinationRequest {
  EmailAddress: string;
  Reason: SuppressionListReason;
}

// refs: 1 - tags: named, input
export interface SendBulkEmailRequest {
  FromEmailAddress?: string | null;
  FromEmailAddressIdentityArn?: string | null;
  ReplyToAddresses?: string[] | null;
  FeedbackForwardingEmailAddress?: string | null;
  FeedbackForwardingEmailAddressIdentityArn?: string | null;
  DefaultEmailTags?: MessageTag[] | null;
  DefaultContent: BulkEmailContent;
  BulkEmailEntries: BulkEmailEntry[];
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, input
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, input
export interface SendEmailRequest {
  FromEmailAddress?: string | null;
  FromEmailAddressIdentityArn?: string | null;
  Destination?: Destination | null;
  ReplyToAddresses?: string[] | null;
  FeedbackForwardingEmailAddress?: string | null;
  FeedbackForwardingEmailAddressIdentityArn?: string | null;
  Content: EmailContent;
  EmailTags?: MessageTag[] | null;
  ConfigurationSetName?: string | null;
  ListManagementOptions?: ListManagementOptions | null;
}

// refs: 1 - tags: named, input
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface TestRenderEmailTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}

// refs: 1 - tags: named, input
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}

// refs: 1 - tags: named, input
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}

// refs: 1 - tags: named, input
export interface UpdateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[] | null;
  UnsubscribeAll?: boolean | null;
  AttributesData?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateContactListRequest {
  ContactListName: string;
  Topics?: Topic[] | null;
  Description?: string | null;
}

// refs: 1 - tags: named, input
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}

// refs: 1 - tags: named, input
export interface UpdateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}

// refs: 1 - tags: named, input
export interface UpdateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
}

// refs: 1 - tags: named, output
export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}

// refs: 1 - tags: named, output
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType | null;
  VerifiedForSendingStatus?: boolean | null;
  DkimAttributes?: DkimAttributes | null;
}

// refs: 1 - tags: named, output
export interface CreateImportJobResponse {
  JobId?: string | null;
}

// refs: 1 - tags: named, output
export interface GetAccountResponse {
  DedicatedIpAutoWarmupEnabled?: boolean | null;
  EnforcementStatus?: string | null;
  ProductionAccessEnabled?: boolean | null;
  SendQuota?: SendQuota | null;
  SendingEnabled?: boolean | null;
  SuppressionAttributes?: SuppressionAttributes | null;
  Details?: AccountDetails | null;
}

// refs: 1 - tags: named, output
export interface GetBlacklistReportsResponse {
  BlacklistReport: { [key: string]: BlacklistEntry[] | null | undefined };
}

// refs: 1 - tags: named, output
export interface GetConfigurationSetResponse {
  ConfigurationSetName?: string | null;
  TrackingOptions?: TrackingOptions | null;
  DeliveryOptions?: DeliveryOptions | null;
  ReputationOptions?: ReputationOptions | null;
  SendingOptions?: SendingOptions | null;
  Tags?: Tag[] | null;
  SuppressionOptions?: SuppressionOptions | null;
}

// refs: 1 - tags: named, output
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[] | null;
}

// refs: 1 - tags: named, output
export interface GetContactResponse {
  ContactListName?: string | null;
  EmailAddress?: string | null;
  TopicPreferences?: TopicPreference[] | null;
  TopicDefaultPreferences?: TopicPreference[] | null;
  UnsubscribeAll?: boolean | null;
  AttributesData?: string | null;
  CreatedTimestamp?: Date | number | null;
  LastUpdatedTimestamp?: Date | number | null;
}

// refs: 1 - tags: named, output
export interface GetContactListResponse {
  ContactListName?: string | null;
  Topics?: Topic[] | null;
  Description?: string | null;
  CreatedTimestamp?: Date | number | null;
  LastUpdatedTimestamp?: Date | number | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string | null;
  FromEmailAddress?: string | null;
  TemplateSubject?: string | null;
  TemplateContent?: string | null;
  SuccessRedirectionURL?: string | null;
  FailureRedirectionURL?: string | null;
}

// refs: 1 - tags: named, output
export interface GetDedicatedIpResponse {
  DedicatedIp?: DedicatedIp | null;
}

// refs: 1 - tags: named, output
export interface GetDedicatedIpsResponse {
  DedicatedIps?: DedicatedIp[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GetDeliverabilityDashboardOptionsResponse {
  DashboardEnabled: boolean;
  SubscriptionExpiryDate?: Date | number | null;
  AccountStatus?: DeliverabilityDashboardAccountStatus | null;
  ActiveSubscribedDomains?: DomainDeliverabilityTrackingOption[] | null;
  PendingExpirationSubscribedDomains?: DomainDeliverabilityTrackingOption[] | null;
}

// refs: 1 - tags: named, output
export interface GetDeliverabilityTestReportResponse {
  DeliverabilityTestReport: DeliverabilityTestReport;
  OverallPlacement: PlacementStatistics;
  IspPlacements: IspPlacement[];
  Message?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface GetDomainDeliverabilityCampaignResponse {
  DomainDeliverabilityCampaign: DomainDeliverabilityCampaign;
}

// refs: 1 - tags: named, output
export interface GetDomainStatisticsReportResponse {
  OverallVolume: OverallVolume;
  DailyVolumes: DailyVolume[];
}

// refs: 1 - tags: named, output
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType | null;
  FeedbackForwardingStatus?: boolean | null;
  VerifiedForSendingStatus?: boolean | null;
  DkimAttributes?: DkimAttributes | null;
  MailFromAttributes?: MailFromAttributes | null;
  Policies?: { [key: string]: string | null | undefined } | null;
  Tags?: Tag[] | null;
  ConfigurationSetName?: string | null;
}

// refs: 1 - tags: named, output
export interface GetEmailIdentityPoliciesResponse {
  Policies?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface GetEmailTemplateResponse {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
}

// refs: 1 - tags: named, output
export interface GetImportJobResponse {
  JobId?: string | null;
  ImportDestination?: ImportDestination | null;
  ImportDataSource?: ImportDataSource | null;
  FailureInfo?: FailureInfo | null;
  JobStatus?: JobStatus | null;
  CreatedTimestamp?: Date | number | null;
  CompletedTimestamp?: Date | number | null;
  ProcessedRecordsCount?: number | null;
  FailedRecordsCount?: number | null;
}

// refs: 1 - tags: named, output
export interface GetSuppressedDestinationResponse {
  SuppressedDestination: SuppressedDestination;
}

// refs: 1 - tags: named, output
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListContactListsResponse {
  ContactLists?: ContactList[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListContactsResponse {
  Contacts?: Contact[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplateMetadata[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDedicatedIpPoolsResponse {
  DedicatedIpPools?: string[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDeliverabilityTestReportsResponse {
  DeliverabilityTestReports: DeliverabilityTestReport[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListDomainDeliverabilityCampaignsResponse {
  DomainDeliverabilityCampaigns: DomainDeliverabilityCampaign[];
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListEmailTemplatesResponse {
  TemplatesMetadata?: EmailTemplateMetadata[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListImportJobsResponse {
  ImportJobs?: ImportJobSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListSuppressedDestinationsResponse {
  SuppressedDestinationSummaries?: SuppressedDestinationSummary[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}

// refs: 1 - tags: named, output
export interface PutEmailIdentityDkimSigningAttributesResponse {
  DkimStatus?: DkimStatus | null;
  DkimTokens?: string[] | null;
}

// refs: 1 - tags: named, output
export interface SendBulkEmailResponse {
  BulkEmailEntryResults: BulkEmailEntryResult[];
}

// refs: 1 - tags: named, output
export interface SendCustomVerificationEmailResponse {
  MessageId?: string | null;
}

// refs: 1 - tags: named, output
export interface SendEmailResponse {
  MessageId?: string | null;
}

// refs: 1 - tags: named, output
export interface TestRenderEmailTemplateResponse {
  RenderedTemplate: string;
}

// refs: 2 - tags: input, named, interface, output
export interface TrackingOptions {
  CustomRedirectDomain: string;
}

// refs: 2 - tags: input, named, interface, output
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy | null;
  SendingPoolName?: string | null;
}

// refs: 3 - tags: input, named, enum, output
export type TlsPolicy =
| "REQUIRE"
| "OPTIONAL"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface ReputationOptions {
  ReputationMetricsEnabled?: boolean | null;
  LastFreshStart?: Date | number | null;
}

// refs: 2 - tags: input, named, interface, output
export interface SendingOptions {
  SendingEnabled?: boolean | null;
}

// refs: 11 - tags: input, named, interface, output
export interface Tag {
  Key: string;
  Value: string;
}

// refs: 2 - tags: input, named, interface, output
export interface SuppressionOptions {
  SuppressedReasons?: SuppressionListReason[] | null;
}

// refs: 9 - tags: input, named, enum, output
export type SuppressionListReason =
| "BOUNCE"
| "COMPLAINT"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface
export interface EventDestinationDefinition {
  Enabled?: boolean | null;
  MatchingEventTypes?: EventType[] | null;
  KinesisFirehoseDestination?: KinesisFirehoseDestination | null;
  CloudWatchDestination?: CloudWatchDestination | null;
  SnsDestination?: SnsDestination | null;
  PinpointDestination?: PinpointDestination | null;
}

// refs: 3 - tags: input, named, enum, output
export type EventType =
| "SEND"
| "REJECT"
| "BOUNCE"
| "COMPLAINT"
| "DELIVERY"
| "OPEN"
| "CLICK"
| "RENDERING_FAILURE"
| "DELIVERY_DELAY"
| "SUBSCRIPTION"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}

// refs: 3 - tags: input, named, interface, output
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[];
}

// refs: 3 - tags: input, named, interface, output
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}

// refs: 3 - tags: input, named, enum, output
export type DimensionValueSource =
| "MESSAGE_TAG"
| "EMAIL_HEADER"
| "LINK_TAG"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface SnsDestination {
  TopicArn: string;
}

// refs: 3 - tags: input, named, interface, output
export interface PinpointDestination {
  ApplicationArn?: string | null;
}

// refs: 6 - tags: input, named, interface, output
export interface TopicPreference {
  TopicName: string;
  SubscriptionStatus: SubscriptionStatus;
}

// refs: 10 - tags: input, named, enum, output
export type SubscriptionStatus =
| "OPT_IN"
| "OPT_OUT"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface Topic {
  TopicName: string;
  DisplayName: string;
  Description?: string | null;
  DefaultSubscriptionStatus: SubscriptionStatus;
}

// refs: 2 - tags: input, named, interface
export interface EmailContent {
  Simple?: Message | null;
  Raw?: RawMessage | null;
  Template?: Template | null;
}

// refs: 2 - tags: input, named, interface
export interface Message {
  Subject: Content;
  Body: Body;
}

// refs: 6 - tags: input, named, interface
export interface Content {
  Data: string;
  Charset?: string | null;
}

// refs: 2 - tags: input, named, interface
export interface Body {
  Text?: Content | null;
  Html?: Content | null;
}

// refs: 2 - tags: input, named, interface
export interface RawMessage {
  Data: Uint8Array | string;
}

// refs: 3 - tags: input, named, interface
export interface Template {
  TemplateName?: string | null;
  TemplateArn?: string | null;
  TemplateData?: string | null;
}

// refs: 2 - tags: input, named, interface
export interface DkimSigningAttributes {
  DomainSigningSelector?: string | null;
  DomainSigningPrivateKey?: string | null;
  NextSigningKeyLength?: DkimSigningKeyLength | null;
}

// refs: 6 - tags: input, named, enum, output
export type DkimSigningKeyLength =
| "RSA_1024_BIT"
| "RSA_2048_BIT"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface EmailTemplateContent {
  Subject?: string | null;
  Text?: string | null;
  Html?: string | null;
}

// refs: 3 - tags: input, named, interface, output
export interface ImportDestination {
  SuppressionListDestination?: SuppressionListDestination | null;
  ContactListDestination?: ContactListDestination | null;
}

// refs: 3 - tags: input, named, interface, output
export interface SuppressionListDestination {
  SuppressionListImportAction: SuppressionListImportAction;
}

// refs: 3 - tags: input, named, enum, output
export type SuppressionListImportAction =
| "DELETE"
| "PUT"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface ContactListDestination {
  ContactListName: string;
  ContactListImportAction: ContactListImportAction;
}

// refs: 3 - tags: input, named, enum, output
export type ContactListImportAction =
| "DELETE"
| "PUT"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, interface, output
export interface ImportDataSource {
  S3Url: string;
  DataFormat: DataFormat;
}

// refs: 2 - tags: input, named, enum, output
export type DataFormat =
| "CSV"
| "JSON"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface ListContactsFilter {
  FilteredStatus?: SubscriptionStatus | null;
  TopicFilter?: TopicFilter | null;
}

// refs: 1 - tags: input, named, interface
export interface TopicFilter {
  TopicName?: string | null;
  UseDefaultIfPreferenceUnavailable?: boolean | null;
}

// refs: 1 - tags: input, named, enum
export type ImportDestinationType =
| "SUPPRESSION_LIST"
| "CONTACT_LIST"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type MailType =
| "MARKETING"
| "TRANSACTIONAL"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type ContactLanguage =
| "EN"
| "JA"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface DomainDeliverabilityTrackingOption {
  Domain?: string | null;
  SubscriptionStartDate?: Date | number | null;
  InboxPlacementTrackingOption?: InboxPlacementTrackingOption | null;
}

// refs: 3 - tags: input, named, interface, output
export interface InboxPlacementTrackingOption {
  Global?: boolean | null;
  TrackedIsps?: string[] | null;
}

// refs: 3 - tags: input, named, enum, output
export type DkimSigningAttributesOrigin =
| "AWS_SES"
| "EXTERNAL"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type BehaviorOnMxFailure =
| "USE_DEFAULT_VALUE"
| "REJECT_MESSAGE"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface
export interface MessageTag {
  Name: string;
  Value: string;
}

// refs: 1 - tags: input, named, interface
export interface BulkEmailContent {
  Template?: Template | null;
}

// refs: 1 - tags: input, named, interface
export interface BulkEmailEntry {
  Destination: Destination;
  ReplacementTags?: MessageTag[] | null;
  ReplacementEmailContent?: ReplacementEmailContent | null;
}

// refs: 2 - tags: input, named, interface
export interface Destination {
  ToAddresses?: string[] | null;
  CcAddresses?: string[] | null;
  BccAddresses?: string[] | null;
}

// refs: 1 - tags: input, named, interface
export interface ReplacementEmailContent {
  ReplacementTemplate?: ReplacementTemplate | null;
}

// refs: 1 - tags: input, named, interface
export interface ReplacementTemplate {
  ReplacementTemplateData?: string | null;
}

// refs: 1 - tags: input, named, interface
export interface ListManagementOptions {
  ContactListName: string;
  TopicName?: string | null;
}

// refs: 3 - tags: output, named, enum
export type DeliverabilityTestStatus =
| "IN_PROGRESS"
| "COMPLETED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: output, named, enum
export type IdentityType =
| "EMAIL_ADDRESS"
| "DOMAIN"
| "MANAGED_DOMAIN"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface DkimAttributes {
  SigningEnabled?: boolean | null;
  Status?: DkimStatus | null;
  Tokens?: string[] | null;
  SigningAttributesOrigin?: DkimSigningAttributesOrigin | null;
  NextSigningKeyLength?: DkimSigningKeyLength | null;
  CurrentSigningKeyLength?: DkimSigningKeyLength | null;
  LastKeyGenerationTimestamp?: Date | number | null;
}

// refs: 3 - tags: output, named, enum
export type DkimStatus =
| "PENDING"
| "SUCCESS"
| "FAILED"
| "TEMPORARY_FAILURE"
| "NOT_STARTED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SendQuota {
  Max24HourSend?: number | null;
  MaxSendRate?: number | null;
  SentLast24Hours?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface SuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[] | null;
}

// refs: 1 - tags: output, named, interface
export interface AccountDetails {
  MailType?: MailType | null;
  WebsiteURL?: string | null;
  ContactLanguage?: ContactLanguage | null;
  UseCaseDescription?: string | null;
  AdditionalContactEmailAddresses?: string[] | null;
  ReviewDetails?: ReviewDetails | null;
}

// refs: 1 - tags: output, named, interface
export interface ReviewDetails {
  Status?: ReviewStatus | null;
  CaseId?: string | null;
}

// refs: 1 - tags: output, named, enum
export type ReviewStatus =
| "PENDING"
| "FAILED"
| "GRANTED"
| "DENIED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface BlacklistEntry {
  RblName?: string | null;
  ListingTime?: Date | number | null;
  Description?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface EventDestination {
  Name: string;
  Enabled?: boolean | null;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination | null;
  CloudWatchDestination?: CloudWatchDestination | null;
  SnsDestination?: SnsDestination | null;
  PinpointDestination?: PinpointDestination | null;
}

// refs: 2 - tags: output, named, interface
export interface DedicatedIp {
  Ip: string;
  WarmupStatus: WarmupStatus;
  WarmupPercentage: number;
  PoolName?: string | null;
}

// refs: 2 - tags: output, named, enum
export type WarmupStatus =
| "IN_PROGRESS"
| "DONE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, enum
export type DeliverabilityDashboardAccountStatus =
| "ACTIVE"
| "PENDING_EXPIRATION"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface DeliverabilityTestReport {
  ReportId?: string | null;
  ReportName?: string | null;
  Subject?: string | null;
  FromEmailAddress?: string | null;
  CreateDate?: Date | number | null;
  DeliverabilityTestStatus?: DeliverabilityTestStatus | null;
}

// refs: 2 - tags: output, named, interface
export interface PlacementStatistics {
  InboxPercentage?: number | null;
  SpamPercentage?: number | null;
  MissingPercentage?: number | null;
  SpfPercentage?: number | null;
  DkimPercentage?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface IspPlacement {
  IspName?: string | null;
  PlacementStatistics?: PlacementStatistics | null;
}

// refs: 2 - tags: output, named, interface
export interface DomainDeliverabilityCampaign {
  CampaignId?: string | null;
  ImageUrl?: string | null;
  Subject?: string | null;
  FromAddress?: string | null;
  SendingIps?: string[] | null;
  FirstSeenDateTime?: Date | number | null;
  LastSeenDateTime?: Date | number | null;
  InboxCount?: number | null;
  SpamCount?: number | null;
  ReadRate?: number | null;
  DeleteRate?: number | null;
  ReadDeleteRate?: number | null;
  ProjectedVolume?: number | null;
  Esps?: string[] | null;
}

// refs: 1 - tags: output, named, interface
export interface OverallVolume {
  VolumeStatistics?: VolumeStatistics | null;
  ReadRatePercent?: number | null;
  DomainIspPlacements?: DomainIspPlacement[] | null;
}

// refs: 2 - tags: output, named, interface
export interface VolumeStatistics {
  InboxRawCount?: number | null;
  SpamRawCount?: number | null;
  ProjectedInbox?: number | null;
  ProjectedSpam?: number | null;
}

// refs: 2 - tags: output, named, interface
export interface DomainIspPlacement {
  IspName?: string | null;
  InboxRawCount?: number | null;
  SpamRawCount?: number | null;
  InboxPercentage?: number | null;
  SpamPercentage?: number | null;
}

// refs: 1 - tags: output, named, interface
export interface DailyVolume {
  StartDate?: Date | number | null;
  VolumeStatistics?: VolumeStatistics | null;
  DomainIspPlacements?: DomainIspPlacement[] | null;
}

// refs: 1 - tags: output, named, interface
export interface MailFromAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: MailFromDomainStatus;
  BehaviorOnMxFailure: BehaviorOnMxFailure;
}

// refs: 1 - tags: output, named, enum
export type MailFromDomainStatus =
| "PENDING"
| "SUCCESS"
| "FAILED"
| "TEMPORARY_FAILURE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface FailureInfo {
  FailedRecordsS3Url?: string | null;
  ErrorMessage?: string | null;
}

// refs: 2 - tags: output, named, enum
export type JobStatus =
| "CREATED"
| "PROCESSING"
| "COMPLETED"
| "FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SuppressedDestination {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date | number;
  Attributes?: SuppressedDestinationAttributes | null;
}

// refs: 1 - tags: output, named, interface
export interface SuppressedDestinationAttributes {
  MessageId?: string | null;
  FeedbackId?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface ContactList {
  ContactListName?: string | null;
  LastUpdatedTimestamp?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface Contact {
  EmailAddress?: string | null;
  TopicPreferences?: TopicPreference[] | null;
  TopicDefaultPreferences?: TopicPreference[] | null;
  UnsubscribeAll?: boolean | null;
  LastUpdatedTimestamp?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface CustomVerificationEmailTemplateMetadata {
  TemplateName?: string | null;
  FromEmailAddress?: string | null;
  TemplateSubject?: string | null;
  SuccessRedirectionURL?: string | null;
  FailureRedirectionURL?: string | null;
}

// refs: 1 - tags: output, named, interface
export interface IdentityInfo {
  IdentityType?: IdentityType | null;
  IdentityName?: string | null;
  SendingEnabled?: boolean | null;
}

// refs: 1 - tags: output, named, interface
export interface EmailTemplateMetadata {
  TemplateName?: string | null;
  CreatedTimestamp?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface ImportJobSummary {
  JobId?: string | null;
  ImportDestination?: ImportDestination | null;
  JobStatus?: JobStatus | null;
  CreatedTimestamp?: Date | number | null;
}

// refs: 1 - tags: output, named, interface
export interface SuppressedDestinationSummary {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date | number;
}

// refs: 1 - tags: output, named, interface
export interface BulkEmailEntryResult {
  Status?: BulkEmailStatus | null;
  Error?: string | null;
  MessageId?: string | null;
}

// refs: 1 - tags: output, named, enum
export type BulkEmailStatus =
| "SUCCESS"
| "MESSAGE_REJECTED"
| "MAIL_FROM_DOMAIN_NOT_VERIFIED"
| "CONFIGURATION_SET_NOT_FOUND"
| "TEMPLATE_NOT_FOUND"
| "ACCOUNT_SUSPENDED"
| "ACCOUNT_THROTTLED"
| "ACCOUNT_DAILY_QUOTA_EXCEEDED"
| "INVALID_SENDING_POOL_NAME"
| "ACCOUNT_SENDING_PAUSED"
| "CONFIGURATION_SET_SENDING_PAUSED"
| "INVALID_PARAMETER"
| "TRANSIENT_FAILURE"
| "FAILED"
| cmnP.UnexpectedEnumValue;
