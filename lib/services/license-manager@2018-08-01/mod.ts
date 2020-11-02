// Autogenerated API client for: AWS License Manager

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class LicenseManager {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(LicenseManager.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2018-08-01",
    "endpointPrefix": "license-manager",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "AWS License Manager",
    "serviceId": "License Manager",
    "signatureVersion": "v4",
    "targetPrefix": "AWSLicenseManager",
    "uid": "license-manager-2018-08-01"
  };

  async createLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & CreateLicenseConfigurationRequest,
  ): Promise<CreateLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      Name: params["Name"],
      Description: params["Description"],
      LicenseCountingType: params["LicenseCountingType"],
      LicenseCount: params["LicenseCount"],
      LicenseCountHardLimit: params["LicenseCountHardLimit"],
      LicenseRules: params["LicenseRules"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
      ProductInformationList: params["ProductInformationList"]?.map(x => fromProductInformation(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseConfigurationArn": "s",
      },
    }, await resp.json());
  }

  async deleteLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & DeleteLicenseConfigurationRequest,
  ): Promise<DeleteLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async getLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & GetLicenseConfigurationRequest,
  ): Promise<GetLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseConfigurationId": "s",
        "LicenseConfigurationArn": "s",
        "Name": "s",
        "Description": "s",
        "LicenseCountingType": (x: jsonP.JSONValue) => cmnP.readEnum<LicenseCountingType>(x),
        "LicenseRules": ["s"],
        "LicenseCount": "n",
        "LicenseCountHardLimit": "b",
        "ConsumedLicenses": "n",
        "Status": "s",
        "OwnerAccountId": "s",
        "ConsumedLicenseSummaryList": [toConsumedLicenseSummary],
        "ManagedResourceSummaryList": [toManagedResourceSummary],
        "Tags": [toTag],
        "ProductInformationList": [toProductInformation],
        "AutomatedDiscoveryInformation": toAutomatedDiscoveryInformation,
      },
    }, await resp.json());
  }

  async getServiceSettings(
    {abortSignal, ...params}: RequestConfig & GetServiceSettingsRequest = {},
  ): Promise<GetServiceSettingsResponse> {
    const body: jsonP.JSONObject = params ? {
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetServiceSettings",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "S3BucketArn": "s",
        "SnsTopicArn": "s",
        "OrganizationConfiguration": toOrganizationConfiguration,
        "EnableCrossAccountsDiscovery": "b",
        "LicenseManagerResourceShareArn": "s",
      },
    }, await resp.json());
  }

  async listAssociationsForLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & ListAssociationsForLicenseConfigurationRequest,
  ): Promise<ListAssociationsForLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListAssociationsForLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseConfigurationAssociations": [toLicenseConfigurationAssociation],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listFailuresForLicenseConfigurationOperations(
    {abortSignal, ...params}: RequestConfig & ListFailuresForLicenseConfigurationOperationsRequest,
  ): Promise<ListFailuresForLicenseConfigurationOperationsResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListFailuresForLicenseConfigurationOperations",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseOperationFailureList": [toLicenseOperationFailure],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listLicenseConfigurations(
    {abortSignal, ...params}: RequestConfig & ListLicenseConfigurationsRequest = {},
  ): Promise<ListLicenseConfigurationsResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArns: params["LicenseConfigurationArns"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
      Filters: params["Filters"]?.map(x => fromFilter(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListLicenseConfigurations",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseConfigurations": [toLicenseConfiguration],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listLicenseSpecificationsForResource(
    {abortSignal, ...params}: RequestConfig & ListLicenseSpecificationsForResourceRequest,
  ): Promise<ListLicenseSpecificationsForResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceArn: params["ResourceArn"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListLicenseSpecificationsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseSpecifications": [toLicenseSpecification],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listResourceInventory(
    {abortSignal, ...params}: RequestConfig & ListResourceInventoryRequest = {},
  ): Promise<ListResourceInventoryResponse> {
    const body: jsonP.JSONObject = params ? {
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
      Filters: params["Filters"]?.map(x => fromInventoryFilter(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListResourceInventory",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ResourceInventoryList": [toResourceInventory],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & ListTagsForResourceRequest,
  ): Promise<ListTagsForResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceArn: params["ResourceArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": [toTag],
      },
    }, await resp.json());
  }

  async listUsageForLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & ListUsageForLicenseConfigurationRequest,
  ): Promise<ListUsageForLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
      MaxResults: params["MaxResults"],
      NextToken: params["NextToken"],
      Filters: params["Filters"]?.map(x => fromFilter(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListUsageForLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LicenseConfigurationUsageList": [toLicenseConfigurationUsage],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & TagResourceRequest,
  ): Promise<TagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceArn: params["ResourceArn"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & UntagResourceRequest,
  ): Promise<UntagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceArn: params["ResourceArn"],
      TagKeys: params["TagKeys"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateLicenseConfiguration(
    {abortSignal, ...params}: RequestConfig & UpdateLicenseConfigurationRequest,
  ): Promise<UpdateLicenseConfigurationResponse> {
    const body: jsonP.JSONObject = params ? {
      LicenseConfigurationArn: params["LicenseConfigurationArn"],
      LicenseConfigurationStatus: params["LicenseConfigurationStatus"],
      LicenseRules: params["LicenseRules"],
      LicenseCount: params["LicenseCount"],
      LicenseCountHardLimit: params["LicenseCountHardLimit"],
      Name: params["Name"],
      Description: params["Description"],
      ProductInformationList: params["ProductInformationList"]?.map(x => fromProductInformation(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateLicenseConfiguration",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateLicenseSpecificationsForResource(
    {abortSignal, ...params}: RequestConfig & UpdateLicenseSpecificationsForResourceRequest,
  ): Promise<UpdateLicenseSpecificationsForResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      ResourceArn: params["ResourceArn"],
      AddLicenseSpecifications: params["AddLicenseSpecifications"]?.map(x => fromLicenseSpecification(x)),
      RemoveLicenseSpecifications: params["RemoveLicenseSpecifications"]?.map(x => fromLicenseSpecification(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateLicenseSpecificationsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateServiceSettings(
    {abortSignal, ...params}: RequestConfig & UpdateServiceSettingsRequest = {},
  ): Promise<UpdateServiceSettingsResponse> {
    const body: jsonP.JSONObject = params ? {
      S3BucketArn: params["S3BucketArn"],
      SnsTopicArn: params["SnsTopicArn"],
      OrganizationConfiguration: fromOrganizationConfiguration(params["OrganizationConfiguration"]),
      EnableCrossAccountsDiscovery: params["EnableCrossAccountsDiscovery"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateServiceSettings",
    });
    return jsonP.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

}

// refs: 1 - tags: named, input
export interface CreateLicenseConfigurationRequest {
  Name: string;
  Description?: string | null;
  LicenseCountingType: LicenseCountingType;
  LicenseCount?: number | null;
  LicenseCountHardLimit?: boolean | null;
  LicenseRules?: string[] | null;
  Tags?: Tag[] | null;
  ProductInformationList?: ProductInformation[] | null;
}

// refs: 1 - tags: named, input
export interface DeleteLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}

// refs: 1 - tags: named, input
export interface GetLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}

// refs: 1 - tags: named, input
export interface GetServiceSettingsRequest {
}

// refs: 1 - tags: named, input
export interface ListAssociationsForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListFailuresForLicenseConfigurationOperationsRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListLicenseConfigurationsRequest {
  LicenseConfigurationArns?: string[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
  Filters?: Filter[] | null;
}

// refs: 1 - tags: named, input
export interface ListLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface ListResourceInventoryRequest {
  MaxResults?: number | null;
  NextToken?: string | null;
  Filters?: InventoryFilter[] | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface ListUsageForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number | null;
  NextToken?: string | null;
  Filters?: Filter[] | null;
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
export interface UpdateLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  LicenseConfigurationStatus?: LicenseConfigurationStatus | null;
  LicenseRules?: string[] | null;
  LicenseCount?: number | null;
  LicenseCountHardLimit?: boolean | null;
  Name?: string | null;
  Description?: string | null;
  ProductInformationList?: ProductInformation[] | null;
}

// refs: 1 - tags: named, input
export interface UpdateLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  AddLicenseSpecifications?: LicenseSpecification[] | null;
  RemoveLicenseSpecifications?: LicenseSpecification[] | null;
}

// refs: 1 - tags: named, input
export interface UpdateServiceSettingsRequest {
  S3BucketArn?: string | null;
  SnsTopicArn?: string | null;
  OrganizationConfiguration?: OrganizationConfiguration | null;
  EnableCrossAccountsDiscovery?: boolean | null;
}

// refs: 1 - tags: named, output
export interface CreateLicenseConfigurationResponse {
  LicenseConfigurationArn?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteLicenseConfigurationResponse {
}

// refs: 1 - tags: named, output
export interface GetLicenseConfigurationResponse {
  LicenseConfigurationId?: string | null;
  LicenseConfigurationArn?: string | null;
  Name?: string | null;
  Description?: string | null;
  LicenseCountingType?: LicenseCountingType | null;
  LicenseRules?: string[] | null;
  LicenseCount?: number | null;
  LicenseCountHardLimit?: boolean | null;
  ConsumedLicenses?: number | null;
  Status?: string | null;
  OwnerAccountId?: string | null;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[] | null;
  ManagedResourceSummaryList?: ManagedResourceSummary[] | null;
  Tags?: Tag[] | null;
  ProductInformationList?: ProductInformation[] | null;
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation | null;
}

// refs: 1 - tags: named, output
export interface GetServiceSettingsResponse {
  S3BucketArn?: string | null;
  SnsTopicArn?: string | null;
  OrganizationConfiguration?: OrganizationConfiguration | null;
  EnableCrossAccountsDiscovery?: boolean | null;
  LicenseManagerResourceShareArn?: string | null;
}

// refs: 1 - tags: named, output
export interface ListAssociationsForLicenseConfigurationResponse {
  LicenseConfigurationAssociations?: LicenseConfigurationAssociation[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListFailuresForLicenseConfigurationOperationsResponse {
  LicenseOperationFailureList?: LicenseOperationFailure[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListLicenseConfigurationsResponse {
  LicenseConfigurations?: LicenseConfiguration[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListLicenseSpecificationsForResourceResponse {
  LicenseSpecifications?: LicenseSpecification[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListResourceInventoryResponse {
  ResourceInventoryList?: ResourceInventory[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface ListUsageForLicenseConfigurationResponse {
  LicenseConfigurationUsageList?: LicenseConfigurationUsage[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UpdateLicenseConfigurationResponse {
}

// refs: 1 - tags: named, output
export interface UpdateLicenseSpecificationsForResourceResponse {
}

// refs: 1 - tags: named, output
export interface UpdateServiceSettingsResponse {
}

// refs: 3 - tags: input, named, enum, output
export type LicenseCountingType =
| "vCPU"
| "Instance"
| "Core"
| "Socket"
| cmnP.UnexpectedEnumValue;

// refs: 4 - tags: input, named, interface, output
export interface Tag {
  Key?: string | null;
  Value?: string | null;
}
function fromTag(input?: Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): Tag {
  return jsonP.readObj({
    required: {},
    optional: {
      "Key": "s",
      "Value": "s",
    },
  }, root);
}

// refs: 4 - tags: input, named, interface, output
export interface ProductInformation {
  ResourceType: string;
  ProductInformationFilterList: ProductInformationFilter[];
}
function fromProductInformation(input?: ProductInformation | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ResourceType: input["ResourceType"],
    ProductInformationFilterList: input["ProductInformationFilterList"]?.map(x => fromProductInformationFilter(x)),
  }
}
function toProductInformation(root: jsonP.JSONValue): ProductInformation {
  return jsonP.readObj({
    required: {
      "ResourceType": "s",
      "ProductInformationFilterList": [toProductInformationFilter],
    },
    optional: {},
  }, root);
}

// refs: 4 - tags: input, named, interface, output
export interface ProductInformationFilter {
  ProductInformationFilterName: string;
  ProductInformationFilterValue: string[];
  ProductInformationFilterComparator: string;
}
function fromProductInformationFilter(input?: ProductInformationFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ProductInformationFilterName: input["ProductInformationFilterName"],
    ProductInformationFilterValue: input["ProductInformationFilterValue"],
    ProductInformationFilterComparator: input["ProductInformationFilterComparator"],
  }
}
function toProductInformationFilter(root: jsonP.JSONValue): ProductInformationFilter {
  return jsonP.readObj({
    required: {
      "ProductInformationFilterName": "s",
      "ProductInformationFilterValue": ["s"],
      "ProductInformationFilterComparator": "s",
    },
    optional: {},
  }, root);
}

// refs: 2 - tags: input, named, interface
export interface Filter {
  Name?: string | null;
  Values?: string[] | null;
}
function fromFilter(input?: Filter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Values: input["Values"],
  }
}

// refs: 1 - tags: input, named, interface
export interface InventoryFilter {
  Name: string;
  Condition: InventoryFilterCondition;
  Value?: string | null;
}
function fromInventoryFilter(input?: InventoryFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Name: input["Name"],
    Condition: input["Condition"],
    Value: input["Value"],
  }
}

// refs: 1 - tags: input, named, enum
export type InventoryFilterCondition =
| "EQUALS"
| "NOT_EQUALS"
| "BEGINS_WITH"
| "CONTAINS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, enum
export type LicenseConfigurationStatus =
| "AVAILABLE"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, interface, output
export interface LicenseSpecification {
  LicenseConfigurationArn: string;
}
function fromLicenseSpecification(input?: LicenseSpecification | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    LicenseConfigurationArn: input["LicenseConfigurationArn"],
  }
}
function toLicenseSpecification(root: jsonP.JSONValue): LicenseSpecification {
  return jsonP.readObj({
    required: {
      "LicenseConfigurationArn": "s",
    },
    optional: {},
  }, root);
}

// refs: 2 - tags: input, named, interface, output
export interface OrganizationConfiguration {
  EnableIntegration: boolean;
}
function fromOrganizationConfiguration(input?: OrganizationConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    EnableIntegration: input["EnableIntegration"],
  }
}
function toOrganizationConfiguration(root: jsonP.JSONValue): OrganizationConfiguration {
  return jsonP.readObj({
    required: {
      "EnableIntegration": "b",
    },
    optional: {},
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface ConsumedLicenseSummary {
  ResourceType?: ResourceType | null;
  ConsumedLicenses?: number | null;
}
function toConsumedLicenseSummary(root: jsonP.JSONValue): ConsumedLicenseSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "ConsumedLicenses": "n",
    },
  }, root);
}

// refs: 8 - tags: output, named, enum
export type ResourceType =
| "EC2_INSTANCE"
| "EC2_HOST"
| "EC2_AMI"
| "RDS"
| "SYSTEMS_MANAGER_MANAGED_INSTANCE"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface ManagedResourceSummary {
  ResourceType?: ResourceType | null;
  AssociationCount?: number | null;
}
function toManagedResourceSummary(root: jsonP.JSONValue): ManagedResourceSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "AssociationCount": "n",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface AutomatedDiscoveryInformation {
  LastRunTime?: Date | number | null;
}
function toAutomatedDiscoveryInformation(root: jsonP.JSONValue): AutomatedDiscoveryInformation {
  return jsonP.readObj({
    required: {},
    optional: {
      "LastRunTime": "d",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface LicenseConfigurationAssociation {
  ResourceArn?: string | null;
  ResourceType?: ResourceType | null;
  ResourceOwnerId?: string | null;
  AssociationTime?: Date | number | null;
}
function toLicenseConfigurationAssociation(root: jsonP.JSONValue): LicenseConfigurationAssociation {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "ResourceOwnerId": "s",
      "AssociationTime": "d",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface LicenseOperationFailure {
  ResourceArn?: string | null;
  ResourceType?: ResourceType | null;
  ErrorMessage?: string | null;
  FailureTime?: Date | number | null;
  OperationName?: string | null;
  ResourceOwnerId?: string | null;
  OperationRequestedBy?: string | null;
  MetadataList?: Metadata[] | null;
}
function toLicenseOperationFailure(root: jsonP.JSONValue): LicenseOperationFailure {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "ErrorMessage": "s",
      "FailureTime": "d",
      "OperationName": "s",
      "ResourceOwnerId": "s",
      "OperationRequestedBy": "s",
      "MetadataList": [toMetadata],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface Metadata {
  Name?: string | null;
  Value?: string | null;
}
function toMetadata(root: jsonP.JSONValue): Metadata {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": "s",
      "Value": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface LicenseConfiguration {
  LicenseConfigurationId?: string | null;
  LicenseConfigurationArn?: string | null;
  Name?: string | null;
  Description?: string | null;
  LicenseCountingType?: LicenseCountingType | null;
  LicenseRules?: string[] | null;
  LicenseCount?: number | null;
  LicenseCountHardLimit?: boolean | null;
  ConsumedLicenses?: number | null;
  Status?: string | null;
  OwnerAccountId?: string | null;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[] | null;
  ManagedResourceSummaryList?: ManagedResourceSummary[] | null;
  ProductInformationList?: ProductInformation[] | null;
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation | null;
}
function toLicenseConfiguration(root: jsonP.JSONValue): LicenseConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "LicenseConfigurationId": "s",
      "LicenseConfigurationArn": "s",
      "Name": "s",
      "Description": "s",
      "LicenseCountingType": (x: jsonP.JSONValue) => cmnP.readEnum<LicenseCountingType>(x),
      "LicenseRules": ["s"],
      "LicenseCount": "n",
      "LicenseCountHardLimit": "b",
      "ConsumedLicenses": "n",
      "Status": "s",
      "OwnerAccountId": "s",
      "ConsumedLicenseSummaryList": [toConsumedLicenseSummary],
      "ManagedResourceSummaryList": [toManagedResourceSummary],
      "ProductInformationList": [toProductInformation],
      "AutomatedDiscoveryInformation": toAutomatedDiscoveryInformation,
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ResourceInventory {
  ResourceId?: string | null;
  ResourceType?: ResourceType | null;
  ResourceArn?: string | null;
  Platform?: string | null;
  PlatformVersion?: string | null;
  ResourceOwningAccountId?: string | null;
}
function toResourceInventory(root: jsonP.JSONValue): ResourceInventory {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceId": "s",
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "ResourceArn": "s",
      "Platform": "s",
      "PlatformVersion": "s",
      "ResourceOwningAccountId": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface LicenseConfigurationUsage {
  ResourceArn?: string | null;
  ResourceType?: ResourceType | null;
  ResourceStatus?: string | null;
  ResourceOwnerId?: string | null;
  AssociationTime?: Date | number | null;
  ConsumedLicenses?: number | null;
}
function toLicenseConfigurationUsage(root: jsonP.JSONValue): LicenseConfigurationUsage {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "ResourceType": (x: jsonP.JSONValue) => cmnP.readEnum<ResourceType>(x),
      "ResourceStatus": "s",
      "ResourceOwnerId": "s",
      "AssociationTime": "d",
      "ConsumedLicenses": "n",
    },
  }, root);
}
