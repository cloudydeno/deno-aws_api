// Autogenerated API client for: AWS Savings Plans

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as uuidv4 from "https://deno.land/std@0.71.0/uuid/v4.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class SavingsPlans {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(SavingsPlans.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2019-06-28",
    "endpointPrefix": "savingsplans",
    "globalEndpoint": "savingsplans.amazonaws.com",
    "jsonVersion": "1.0",
    "protocol": "rest-json",
    "serviceAbbreviation": "AWSSavingsPlans",
    "serviceFullName": "AWS Savings Plans",
    "serviceId": "savingsplans",
    "signatureVersion": "v4",
    "uid": "savingsplans-2019-06-28"
  };

  async createSavingsPlan(
    {abortSignal, ...params}: RequestConfig & CreateSavingsPlanRequest,
  ): Promise<CreateSavingsPlanResponse> {
    const body: jsonP.JSONObject = params ? {
      savingsPlanOfferingId: params["savingsPlanOfferingId"],
      commitment: params["commitment"],
      upfrontPaymentAmount: params["upfrontPaymentAmount"],
      purchaseTime: jsonP.serializeDate_unixTimestamp(params["purchaseTime"]),
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      tags: params["tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateSavingsPlan",
      requestUri: "/CreateSavingsPlan",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "savingsPlanId": "s",
        },
      }, await resp.json()),
  };
  }

  async deleteQueuedSavingsPlan(
    {abortSignal, ...params}: RequestConfig & DeleteQueuedSavingsPlanRequest,
  ): Promise<DeleteQueuedSavingsPlanResponse> {
    const body: jsonP.JSONObject = params ? {
      savingsPlanId: params["savingsPlanId"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteQueuedSavingsPlan",
      requestUri: "/DeleteQueuedSavingsPlan",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

  async describeSavingsPlanRates(
    {abortSignal, ...params}: RequestConfig & DescribeSavingsPlanRatesRequest,
  ): Promise<DescribeSavingsPlanRatesResponse> {
    const body: jsonP.JSONObject = params ? {
      savingsPlanId: params["savingsPlanId"],
      filters: params["filters"]?.map(x => fromSavingsPlanRateFilter(x)),
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeSavingsPlanRates",
      requestUri: "/DescribeSavingsPlanRates",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "savingsPlanId": "s",
          "searchResults": [toSavingsPlanRate],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async describeSavingsPlans(
    {abortSignal, ...params}: RequestConfig & DescribeSavingsPlansRequest = {},
  ): Promise<DescribeSavingsPlansResponse> {
    const body: jsonP.JSONObject = params ? {
      savingsPlanArns: params["savingsPlanArns"],
      savingsPlanIds: params["savingsPlanIds"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
      states: params["states"],
      filters: params["filters"]?.map(x => fromSavingsPlanFilter(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeSavingsPlans",
      requestUri: "/DescribeSavingsPlans",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "savingsPlans": [toSavingsPlan],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async describeSavingsPlansOfferingRates(
    {abortSignal, ...params}: RequestConfig & DescribeSavingsPlansOfferingRatesRequest = {},
  ): Promise<DescribeSavingsPlansOfferingRatesResponse> {
    const body: jsonP.JSONObject = params ? {
      savingsPlanOfferingIds: params["savingsPlanOfferingIds"],
      savingsPlanPaymentOptions: params["savingsPlanPaymentOptions"],
      savingsPlanTypes: params["savingsPlanTypes"],
      products: params["products"],
      serviceCodes: params["serviceCodes"],
      usageTypes: params["usageTypes"],
      operations: params["operations"],
      filters: params["filters"]?.map(x => fromSavingsPlanOfferingRateFilterElement(x)),
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeSavingsPlansOfferingRates",
      requestUri: "/DescribeSavingsPlansOfferingRates",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "searchResults": [toSavingsPlanOfferingRate],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async describeSavingsPlansOfferings(
    {abortSignal, ...params}: RequestConfig & DescribeSavingsPlansOfferingsRequest = {},
  ): Promise<DescribeSavingsPlansOfferingsResponse> {
    const body: jsonP.JSONObject = params ? {
      offeringIds: params["offeringIds"],
      paymentOptions: params["paymentOptions"],
      productType: params["productType"],
      planTypes: params["planTypes"],
      durations: params["durations"],
      currencies: params["currencies"],
      descriptions: params["descriptions"],
      serviceCodes: params["serviceCodes"],
      usageTypes: params["usageTypes"],
      operations: params["operations"],
      filters: params["filters"]?.map(x => fromSavingsPlanOfferingFilterElement(x)),
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeSavingsPlansOfferings",
      requestUri: "/DescribeSavingsPlansOfferings",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "searchResults": [toSavingsPlanOffering],
          "nextToken": "s",
        },
      }, await resp.json()),
  };
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & ListTagsForResourceRequest,
  ): Promise<ListTagsForResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      resourceArn: params["resourceArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
      requestUri: "/ListTagsForResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {
          "tags": x => jsonP.readMap(String, String, x),
        },
      }, await resp.json()),
  };
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & TagResourceRequest,
  ): Promise<TagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      resourceArn: params["resourceArn"],
      tags: params["tags"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: "/TagResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & UntagResourceRequest,
  ): Promise<UntagResourceResponse> {
    const body: jsonP.JSONObject = params ? {
      resourceArn: params["resourceArn"],
      tagKeys: params["tagKeys"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
      requestUri: "/UntagResource",
    });
  return {
    ...jsonP.readObj({
        required: {},
        optional: {},
      }, await resp.json()),
  };
  }

}

// refs: 1 - tags: named, input
export interface CreateSavingsPlanRequest {
  savingsPlanOfferingId: string;
  commitment: string;
  upfrontPaymentAmount?: string | null;
  purchaseTime?: Date | number | null;
  clientToken?: string | null;
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, input
export interface DeleteQueuedSavingsPlanRequest {
  savingsPlanId: string;
}

// refs: 1 - tags: named, input
export interface DescribeSavingsPlanRatesRequest {
  savingsPlanId: string;
  filters?: SavingsPlanRateFilter[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface DescribeSavingsPlansRequest {
  savingsPlanArns?: string[] | null;
  savingsPlanIds?: string[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
  states?: SavingsPlanState[] | null;
  filters?: SavingsPlanFilter[] | null;
}

// refs: 1 - tags: named, input
export interface DescribeSavingsPlansOfferingRatesRequest {
  savingsPlanOfferingIds?: string[] | null;
  savingsPlanPaymentOptions?: SavingsPlanPaymentOption[] | null;
  savingsPlanTypes?: SavingsPlanType[] | null;
  products?: SavingsPlanProductType[] | null;
  serviceCodes?: SavingsPlanRateServiceCode[] | null;
  usageTypes?: string[] | null;
  operations?: string[] | null;
  filters?: SavingsPlanOfferingRateFilterElement[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface DescribeSavingsPlansOfferingsRequest {
  offeringIds?: string[] | null;
  paymentOptions?: SavingsPlanPaymentOption[] | null;
  productType?: SavingsPlanProductType | null;
  planTypes?: SavingsPlanType[] | null;
  durations?: number[] | null;
  currencies?: CurrencyCode[] | null;
  descriptions?: string[] | null;
  serviceCodes?: string[] | null;
  usageTypes?: string[] | null;
  operations?: string[] | null;
  filters?: SavingsPlanOfferingFilterElement[] | null;
  nextToken?: string | null;
  maxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForResourceRequest {
  resourceArn: string;
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

// refs: 1 - tags: named, output
export interface CreateSavingsPlanResponse {
  savingsPlanId?: string | null;
}

// refs: 1 - tags: named, output
export interface DeleteQueuedSavingsPlanResponse {
}

// refs: 1 - tags: named, output
export interface DescribeSavingsPlanRatesResponse {
  savingsPlanId?: string | null;
  searchResults?: SavingsPlanRate[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeSavingsPlansResponse {
  savingsPlans?: SavingsPlan[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeSavingsPlansOfferingRatesResponse {
  searchResults?: SavingsPlanOfferingRate[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface DescribeSavingsPlansOfferingsResponse {
  searchResults?: SavingsPlanOffering[] | null;
  nextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | null | undefined } | null;
}

// refs: 1 - tags: named, output
export interface TagResourceResponse {
}

// refs: 1 - tags: named, output
export interface UntagResourceResponse {
}

// refs: 1 - tags: input, named, interface
export interface SavingsPlanRateFilter {
  name?: SavingsPlanRateFilterName | null;
  values?: string[] | null;
}
function fromSavingsPlanRateFilter(input?: SavingsPlanRateFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    values: input["values"],
  }
}

// refs: 1 - tags: input, named, enum
export type SavingsPlanRateFilterName =
| "region"
| "instanceType"
| "productDescription"
| "tenancy"
| "productType"
| "serviceCode"
| "usageType"
| "operation"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type SavingsPlanState =
| "payment-pending"
| "payment-failed"
| "active"
| "retired"
| "queued"
| "queued-deleted"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface SavingsPlanFilter {
  name?: SavingsPlansFilterName | null;
  values?: string[] | null;
}
function fromSavingsPlanFilter(input?: SavingsPlanFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    values: input["values"],
  }
}

// refs: 1 - tags: input, named, enum
export type SavingsPlansFilterName =
| "region"
| "ec2-instance-family"
| "commitment"
| "upfront"
| "term"
| "savings-plan-type"
| "payment-option"
| "start"
| "end"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type SavingsPlanPaymentOption =
| "All Upfront"
| "Partial Upfront"
| "No Upfront"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type SavingsPlanType =
| "Compute"
| "EC2Instance"
| cmnP.UnexpectedEnumValue;

// refs: 6 - tags: input, named, enum, output
export type SavingsPlanProductType =
| "EC2"
| "Fargate"
| "Lambda"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type SavingsPlanRateServiceCode =
| "AmazonEC2"
| "AmazonECS"
| "AWSLambda"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface SavingsPlanOfferingRateFilterElement {
  name?: SavingsPlanRateFilterAttribute | null;
  values?: string[] | null;
}
function fromSavingsPlanOfferingRateFilterElement(input?: SavingsPlanOfferingRateFilterElement | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    values: input["values"],
  }
}

// refs: 1 - tags: input, named, enum
export type SavingsPlanRateFilterAttribute =
| "region"
| "instanceFamily"
| "instanceType"
| "productDescription"
| "tenancy"
| "productId"
| cmnP.UnexpectedEnumValue;

// refs: 5 - tags: input, named, enum, output
export type CurrencyCode =
| "CNY"
| "USD"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface SavingsPlanOfferingFilterElement {
  name?: SavingsPlanOfferingFilterAttribute | null;
  values?: string[] | null;
}
function fromSavingsPlanOfferingFilterElement(input?: SavingsPlanOfferingFilterElement | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    values: input["values"],
  }
}

// refs: 1 - tags: input, named, enum
export type SavingsPlanOfferingFilterAttribute =
| "region"
| "instanceFamily"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SavingsPlanRate {
  rate?: string | null;
  currency?: CurrencyCode | null;
  unit?: SavingsPlanRateUnit | null;
  productType?: SavingsPlanProductType | null;
  serviceCode?: SavingsPlanRateServiceCode | null;
  usageType?: string | null;
  operation?: string | null;
  properties?: SavingsPlanRateProperty[] | null;
}
function toSavingsPlanRate(root: jsonP.JSONValue): SavingsPlanRate {
  return jsonP.readObj({
    required: {},
    optional: {
      "rate": "s",
      "currency": (x: jsonP.JSONValue) => cmnP.readEnum<CurrencyCode>(x),
      "unit": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanRateUnit>(x),
      "productType": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanProductType>(x),
      "serviceCode": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanRateServiceCode>(x),
      "usageType": "s",
      "operation": "s",
      "properties": [toSavingsPlanRateProperty],
    },
  }, root);
}

// refs: 2 - tags: output, named, enum
export type SavingsPlanRateUnit =
| "Hrs"
| "Lambda-GB-Second"
| "Request"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SavingsPlanRateProperty {
  name?: SavingsPlanRatePropertyKey | null;
  value?: string | null;
}
function toSavingsPlanRateProperty(root: jsonP.JSONValue): SavingsPlanRateProperty {
  return jsonP.readObj({
    required: {},
    optional: {
      "name": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanRatePropertyKey>(x),
      "value": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type SavingsPlanRatePropertyKey =
| "region"
| "instanceType"
| "instanceFamily"
| "productDescription"
| "tenancy"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface SavingsPlan {
  offeringId?: string | null;
  savingsPlanId?: string | null;
  savingsPlanArn?: string | null;
  description?: string | null;
  start?: string | null;
  end?: string | null;
  state?: SavingsPlanState | null;
  region?: string | null;
  ec2InstanceFamily?: string | null;
  savingsPlanType?: SavingsPlanType | null;
  paymentOption?: SavingsPlanPaymentOption | null;
  productTypes?: SavingsPlanProductType[] | null;
  currency?: CurrencyCode | null;
  commitment?: string | null;
  upfrontPaymentAmount?: string | null;
  recurringPaymentAmount?: string | null;
  termDurationInSeconds?: number | null;
  tags?: { [key: string]: string | null | undefined } | null;
}
function toSavingsPlan(root: jsonP.JSONValue): SavingsPlan {
  return jsonP.readObj({
    required: {},
    optional: {
      "offeringId": "s",
      "savingsPlanId": "s",
      "savingsPlanArn": "s",
      "description": "s",
      "start": "s",
      "end": "s",
      "state": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanState>(x),
      "region": "s",
      "ec2InstanceFamily": "s",
      "savingsPlanType": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanType>(x),
      "paymentOption": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanPaymentOption>(x),
      "productTypes": [(x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanProductType>(x)],
      "currency": (x: jsonP.JSONValue) => cmnP.readEnum<CurrencyCode>(x),
      "commitment": "s",
      "upfrontPaymentAmount": "s",
      "recurringPaymentAmount": "s",
      "termDurationInSeconds": "n",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SavingsPlanOfferingRate {
  savingsPlanOffering?: ParentSavingsPlanOffering | null;
  rate?: string | null;
  unit?: SavingsPlanRateUnit | null;
  productType?: SavingsPlanProductType | null;
  serviceCode?: SavingsPlanRateServiceCode | null;
  usageType?: string | null;
  operation?: string | null;
  properties?: SavingsPlanOfferingRateProperty[] | null;
}
function toSavingsPlanOfferingRate(root: jsonP.JSONValue): SavingsPlanOfferingRate {
  return jsonP.readObj({
    required: {},
    optional: {
      "savingsPlanOffering": toParentSavingsPlanOffering,
      "rate": "s",
      "unit": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanRateUnit>(x),
      "productType": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanProductType>(x),
      "serviceCode": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanRateServiceCode>(x),
      "usageType": "s",
      "operation": "s",
      "properties": [toSavingsPlanOfferingRateProperty],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ParentSavingsPlanOffering {
  offeringId?: string | null;
  paymentOption?: SavingsPlanPaymentOption | null;
  planType?: SavingsPlanType | null;
  durationSeconds?: number | null;
  currency?: CurrencyCode | null;
  planDescription?: string | null;
}
function toParentSavingsPlanOffering(root: jsonP.JSONValue): ParentSavingsPlanOffering {
  return jsonP.readObj({
    required: {},
    optional: {
      "offeringId": "s",
      "paymentOption": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanPaymentOption>(x),
      "planType": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanType>(x),
      "durationSeconds": "n",
      "currency": (x: jsonP.JSONValue) => cmnP.readEnum<CurrencyCode>(x),
      "planDescription": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SavingsPlanOfferingRateProperty {
  name?: string | null;
  value?: string | null;
}
function toSavingsPlanOfferingRateProperty(root: jsonP.JSONValue): SavingsPlanOfferingRateProperty {
  return jsonP.readObj({
    required: {},
    optional: {
      "name": "s",
      "value": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SavingsPlanOffering {
  offeringId?: string | null;
  productTypes?: SavingsPlanProductType[] | null;
  planType?: SavingsPlanType | null;
  description?: string | null;
  paymentOption?: SavingsPlanPaymentOption | null;
  durationSeconds?: number | null;
  currency?: CurrencyCode | null;
  serviceCode?: string | null;
  usageType?: string | null;
  operation?: string | null;
  properties?: SavingsPlanOfferingProperty[] | null;
}
function toSavingsPlanOffering(root: jsonP.JSONValue): SavingsPlanOffering {
  return jsonP.readObj({
    required: {},
    optional: {
      "offeringId": "s",
      "productTypes": [(x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanProductType>(x)],
      "planType": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanType>(x),
      "description": "s",
      "paymentOption": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanPaymentOption>(x),
      "durationSeconds": "n",
      "currency": (x: jsonP.JSONValue) => cmnP.readEnum<CurrencyCode>(x),
      "serviceCode": "s",
      "usageType": "s",
      "operation": "s",
      "properties": [toSavingsPlanOfferingProperty],
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface SavingsPlanOfferingProperty {
  name?: SavingsPlanOfferingPropertyKey | null;
  value?: string | null;
}
function toSavingsPlanOfferingProperty(root: jsonP.JSONValue): SavingsPlanOfferingProperty {
  return jsonP.readObj({
    required: {},
    optional: {
      "name": (x: jsonP.JSONValue) => cmnP.readEnum<SavingsPlanOfferingPropertyKey>(x),
      "value": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type SavingsPlanOfferingPropertyKey =
| "region"
| "instanceFamily"
| cmnP.UnexpectedEnumValue;
