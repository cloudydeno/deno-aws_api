// Autogenerated API client for: AWS Certificate Manager

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";

export default class ACM {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ACM.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2015-12-08",
    "endpointPrefix": "acm",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "ACM",
    "serviceFullName": "AWS Certificate Manager",
    "serviceId": "ACM",
    "signatureVersion": "v4",
    "targetPrefix": "CertificateManager",
    "uid": "acm-2015-12-08"
  };

  async addTagsToCertificate(
    {abortSignal, ...params}: RequestConfig & AddTagsToCertificateRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AddTagsToCertificate",
    });
  }

  async deleteCertificate(
    {abortSignal, ...params}: RequestConfig & DeleteCertificateRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteCertificate",
    });
  }

  async describeCertificate(
    {abortSignal, ...params}: RequestConfig & DescribeCertificateRequest,
  ): Promise<DescribeCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Certificate": toCertificateDetail,
      },
    }, await resp.json());
  }

  async exportCertificate(
    {abortSignal, ...params}: RequestConfig & ExportCertificateRequest,
  ): Promise<ExportCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Passphrase: jsonP.serializeBlob(params["Passphrase"]),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ExportCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Certificate": "s",
        "CertificateChain": "s",
        "PrivateKey": "s",
      },
    }, await resp.json());
  }

  async getCertificate(
    {abortSignal, ...params}: RequestConfig & GetCertificateRequest,
  ): Promise<GetCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Certificate": "s",
        "CertificateChain": "s",
      },
    }, await resp.json());
  }

  async importCertificate(
    {abortSignal, ...params}: RequestConfig & ImportCertificateRequest,
  ): Promise<ImportCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Certificate: jsonP.serializeBlob(params["Certificate"]),
      PrivateKey: jsonP.serializeBlob(params["PrivateKey"]),
      CertificateChain: jsonP.serializeBlob(params["CertificateChain"]),
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ImportCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CertificateArn": "s",
      },
    }, await resp.json());
  }

  async listCertificates(
    {abortSignal, ...params}: RequestConfig & ListCertificatesRequest = {},
  ): Promise<ListCertificatesResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateStatuses: params["CertificateStatuses"],
      Includes: fromFilters(params["Includes"]),
      NextToken: params["NextToken"],
      MaxItems: params["MaxItems"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListCertificates",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "CertificateSummaryList": [toCertificateSummary],
      },
    }, await resp.json());
  }

  async listTagsForCertificate(
    {abortSignal, ...params}: RequestConfig & ListTagsForCertificateRequest,
  ): Promise<ListTagsForCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": [toTag],
      },
    }, await resp.json());
  }

  async removeTagsFromCertificate(
    {abortSignal, ...params}: RequestConfig & RemoveTagsFromCertificateRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RemoveTagsFromCertificate",
    });
  }

  async renewCertificate(
    {abortSignal, ...params}: RequestConfig & RenewCertificateRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RenewCertificate",
    });
  }

  async requestCertificate(
    {abortSignal, ...params}: RequestConfig & RequestCertificateRequest,
  ): Promise<RequestCertificateResponse> {
    const body: jsonP.JSONObject = params ? {
      DomainName: params["DomainName"],
      ValidationMethod: params["ValidationMethod"],
      SubjectAlternativeNames: params["SubjectAlternativeNames"],
      IdempotencyToken: params["IdempotencyToken"],
      DomainValidationOptions: params["DomainValidationOptions"]?.map(x => fromDomainValidationOption(x)),
      Options: fromCertificateOptions(params["Options"]),
      CertificateAuthorityArn: params["CertificateAuthorityArn"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RequestCertificate",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "CertificateArn": "s",
      },
    }, await resp.json());
  }

  async resendValidationEmail(
    {abortSignal, ...params}: RequestConfig & ResendValidationEmailRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Domain: params["Domain"],
      ValidationDomain: params["ValidationDomain"],
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ResendValidationEmail",
    });
  }

  async updateCertificateOptions(
    {abortSignal, ...params}: RequestConfig & UpdateCertificateOptionsRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = params ? {
      CertificateArn: params["CertificateArn"],
      Options: fromCertificateOptions(params["Options"]),
    } : {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateCertificateOptions",
    });
  }

  // Resource State Waiters

  /** Checks state up to 40 times, 60 seconds apart (about 40 minutes max wait time). */
  async waitForCertificateValidated(
    params: RequestConfig & DescribeCertificateRequest,
  ): Promise<DescribeCertificateResponse> {
    const errMessage = 'ResourceNotReady: Resource is not in the state CertificateValidated';
    for (let i = 0; i < 40; i++) {
      try {
        const resp = await this.describeCertificate(params);
        if (resp?.Certificate?.DomainValidationOptions?.flatMap(x => x?.ValidationStatus)?.every(x => x === "SUCCESS")) return resp;
        if (resp?.Certificate?.DomainValidationOptions?.flatMap(x => x?.ValidationStatus)?.some(x => x === "PENDING_VALIDATION")) continue;
        if (resp?.Certificate?.Status === "FAILED") throw new Error(errMessage);
      } catch (err) {
        if (["ResourceNotFoundException"].includes(err.code)) throw err;
        throw err;
      }
      await new Promise(r => setTimeout(r, 60000));
    }
    throw new Error(errMessage);
  }

}

// refs: 1 - tags: named, input
export interface AddTagsToCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface DeleteCertificateRequest {
  CertificateArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeCertificateRequest {
  CertificateArn: string;
}

// refs: 1 - tags: named, input
export interface ExportCertificateRequest {
  CertificateArn: string;
  Passphrase: Uint8Array | string;
}

// refs: 1 - tags: named, input
export interface GetCertificateRequest {
  CertificateArn: string;
}

// refs: 1 - tags: named, input
export interface ImportCertificateRequest {
  CertificateArn?: string | null;
  Certificate: Uint8Array | string;
  PrivateKey: Uint8Array | string;
  CertificateChain?: Uint8Array | string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface ListCertificatesRequest {
  CertificateStatuses?: CertificateStatus[] | null;
  Includes?: Filters | null;
  NextToken?: string | null;
  MaxItems?: number | null;
}

// refs: 1 - tags: named, input
export interface ListTagsForCertificateRequest {
  CertificateArn: string;
}

// refs: 1 - tags: named, input
export interface RemoveTagsFromCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}

// refs: 1 - tags: named, input
export interface RenewCertificateRequest {
  CertificateArn: string;
}

// refs: 1 - tags: named, input
export interface RequestCertificateRequest {
  DomainName: string;
  ValidationMethod?: ValidationMethod | null;
  SubjectAlternativeNames?: string[] | null;
  IdempotencyToken?: string | null;
  DomainValidationOptions?: DomainValidationOption[] | null;
  Options?: CertificateOptions | null;
  CertificateAuthorityArn?: string | null;
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, input
export interface ResendValidationEmailRequest {
  CertificateArn: string;
  Domain: string;
  ValidationDomain: string;
}

// refs: 1 - tags: named, input
export interface UpdateCertificateOptionsRequest {
  CertificateArn: string;
  Options: CertificateOptions;
}

// refs: 1 - tags: named, output
export interface DescribeCertificateResponse {
  Certificate?: CertificateDetail | null;
}

// refs: 1 - tags: named, output
export interface ExportCertificateResponse {
  Certificate?: string | null;
  CertificateChain?: string | null;
  PrivateKey?: string | null;
}

// refs: 1 - tags: named, output
export interface GetCertificateResponse {
  Certificate?: string | null;
  CertificateChain?: string | null;
}

// refs: 1 - tags: named, output
export interface ImportCertificateResponse {
  CertificateArn?: string | null;
}

// refs: 1 - tags: named, output
export interface ListCertificatesResponse {
  NextToken?: string | null;
  CertificateSummaryList?: CertificateSummary[] | null;
}

// refs: 1 - tags: named, output
export interface ListTagsForCertificateResponse {
  Tags?: Tag[] | null;
}

// refs: 1 - tags: named, output
export interface RequestCertificateResponse {
  CertificateArn?: string | null;
}

// refs: 5 - tags: input, named, interface, output
export interface Tag {
  Key: string;
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
    required: {
      "Key": "s",
    },
    optional: {
      "Value": "s",
    },
  }, root);
}

// refs: 2 - tags: input, named, enum, output
export type CertificateStatus =
| "PENDING_VALIDATION"
| "ISSUED"
| "INACTIVE"
| "EXPIRED"
| "VALIDATION_TIMED_OUT"
| "REVOKED"
| "FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface Filters {
  extendedKeyUsage?: ExtendedKeyUsageName[] | null;
  keyUsage?: KeyUsageName[] | null;
  keyTypes?: KeyAlgorithm[] | null;
}
function fromFilters(input?: Filters | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    extendedKeyUsage: input["extendedKeyUsage"],
    keyUsage: input["keyUsage"],
    keyTypes: input["keyTypes"],
  }
}

// refs: 2 - tags: input, named, enum, output
export type ExtendedKeyUsageName =
| "TLS_WEB_SERVER_AUTHENTICATION"
| "TLS_WEB_CLIENT_AUTHENTICATION"
| "CODE_SIGNING"
| "EMAIL_PROTECTION"
| "TIME_STAMPING"
| "OCSP_SIGNING"
| "IPSEC_END_SYSTEM"
| "IPSEC_TUNNEL"
| "IPSEC_USER"
| "ANY"
| "NONE"
| "CUSTOM"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type KeyUsageName =
| "DIGITAL_SIGNATURE"
| "NON_REPUDIATION"
| "KEY_ENCIPHERMENT"
| "DATA_ENCIPHERMENT"
| "KEY_AGREEMENT"
| "CERTIFICATE_SIGNING"
| "CRL_SIGNING"
| "ENCIPHER_ONLY"
| "DECIPHER_ONLY"
| "ANY"
| "CUSTOM"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: input, named, enum, output
export type KeyAlgorithm =
| "RSA_2048"
| "RSA_1024"
| "RSA_4096"
| "EC_prime256v1"
| "EC_secp384r1"
| "EC_secp521r1"
| cmnP.UnexpectedEnumValue;

// refs: 3 - tags: input, named, enum, output
export type ValidationMethod =
| "EMAIL"
| "DNS"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: input, named, interface
export interface DomainValidationOption {
  DomainName: string;
  ValidationDomain: string;
}
function fromDomainValidationOption(input?: DomainValidationOption | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    DomainName: input["DomainName"],
    ValidationDomain: input["ValidationDomain"],
  }
}

// refs: 3 - tags: input, named, interface, output
export interface CertificateOptions {
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference | null;
}
function fromCertificateOptions(input?: CertificateOptions | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    CertificateTransparencyLoggingPreference: input["CertificateTransparencyLoggingPreference"],
  }
}
function toCertificateOptions(root: jsonP.JSONValue): CertificateOptions {
  return jsonP.readObj({
    required: {},
    optional: {
      "CertificateTransparencyLoggingPreference": (x: jsonP.JSONValue) => cmnP.readEnum<CertificateTransparencyLoggingPreference>(x),
    },
  }, root);
}

// refs: 3 - tags: input, named, enum, output
export type CertificateTransparencyLoggingPreference =
| "ENABLED"
| "DISABLED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface CertificateDetail {
  CertificateArn?: string | null;
  DomainName?: string | null;
  SubjectAlternativeNames?: string[] | null;
  DomainValidationOptions?: DomainValidation[] | null;
  Serial?: string | null;
  Subject?: string | null;
  Issuer?: string | null;
  CreatedAt?: Date | number | null;
  IssuedAt?: Date | number | null;
  ImportedAt?: Date | number | null;
  Status?: CertificateStatus | null;
  RevokedAt?: Date | number | null;
  RevocationReason?: RevocationReason | null;
  NotBefore?: Date | number | null;
  NotAfter?: Date | number | null;
  KeyAlgorithm?: KeyAlgorithm | null;
  SignatureAlgorithm?: string | null;
  InUseBy?: string[] | null;
  FailureReason?: FailureReason | null;
  Type?: CertificateType | null;
  RenewalSummary?: RenewalSummary | null;
  KeyUsages?: KeyUsage[] | null;
  ExtendedKeyUsages?: ExtendedKeyUsage[] | null;
  CertificateAuthorityArn?: string | null;
  RenewalEligibility?: RenewalEligibility | null;
  Options?: CertificateOptions | null;
}
function toCertificateDetail(root: jsonP.JSONValue): CertificateDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "CertificateArn": "s",
      "DomainName": "s",
      "SubjectAlternativeNames": ["s"],
      "DomainValidationOptions": [toDomainValidation],
      "Serial": "s",
      "Subject": "s",
      "Issuer": "s",
      "CreatedAt": "d",
      "IssuedAt": "d",
      "ImportedAt": "d",
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<CertificateStatus>(x),
      "RevokedAt": "d",
      "RevocationReason": (x: jsonP.JSONValue) => cmnP.readEnum<RevocationReason>(x),
      "NotBefore": "d",
      "NotAfter": "d",
      "KeyAlgorithm": (x: jsonP.JSONValue) => cmnP.readEnum<KeyAlgorithm>(x),
      "SignatureAlgorithm": "s",
      "InUseBy": ["s"],
      "FailureReason": (x: jsonP.JSONValue) => cmnP.readEnum<FailureReason>(x),
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<CertificateType>(x),
      "RenewalSummary": toRenewalSummary,
      "KeyUsages": [toKeyUsage],
      "ExtendedKeyUsages": [toExtendedKeyUsage],
      "CertificateAuthorityArn": "s",
      "RenewalEligibility": (x: jsonP.JSONValue) => cmnP.readEnum<RenewalEligibility>(x),
      "Options": toCertificateOptions,
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface DomainValidation {
  DomainName: string;
  ValidationEmails?: string[] | null;
  ValidationDomain?: string | null;
  ValidationStatus?: DomainStatus | null;
  ResourceRecord?: ResourceRecord | null;
  ValidationMethod?: ValidationMethod | null;
}
function toDomainValidation(root: jsonP.JSONValue): DomainValidation {
  return jsonP.readObj({
    required: {
      "DomainName": "s",
    },
    optional: {
      "ValidationEmails": ["s"],
      "ValidationDomain": "s",
      "ValidationStatus": (x: jsonP.JSONValue) => cmnP.readEnum<DomainStatus>(x),
      "ResourceRecord": toResourceRecord,
      "ValidationMethod": (x: jsonP.JSONValue) => cmnP.readEnum<ValidationMethod>(x),
    },
  }, root);
}

// refs: 2 - tags: output, named, enum
export type DomainStatus =
| "PENDING_VALIDATION"
| "SUCCESS"
| "FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, interface
export interface ResourceRecord {
  Name: string;
  Type: RecordType;
  Value: string;
}
function toResourceRecord(root: jsonP.JSONValue): ResourceRecord {
  return jsonP.readObj({
    required: {
      "Name": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<RecordType>(x),
      "Value": "s",
    },
    optional: {},
  }, root);
}

// refs: 2 - tags: output, named, enum
export type RecordType =
| "CNAME"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, enum
export type RevocationReason =
| "UNSPECIFIED"
| "KEY_COMPROMISE"
| "CA_COMPROMISE"
| "AFFILIATION_CHANGED"
| "SUPERCEDED"
| "CESSATION_OF_OPERATION"
| "CERTIFICATE_HOLD"
| "REMOVE_FROM_CRL"
| "PRIVILEGE_WITHDRAWN"
| "A_A_COMPROMISE"
| cmnP.UnexpectedEnumValue;

// refs: 2 - tags: output, named, enum
export type FailureReason =
| "NO_AVAILABLE_CONTACTS"
| "ADDITIONAL_VERIFICATION_REQUIRED"
| "DOMAIN_NOT_ALLOWED"
| "INVALID_PUBLIC_DOMAIN"
| "DOMAIN_VALIDATION_DENIED"
| "CAA_ERROR"
| "PCA_LIMIT_EXCEEDED"
| "PCA_INVALID_ARN"
| "PCA_INVALID_STATE"
| "PCA_REQUEST_FAILED"
| "PCA_NAME_CONSTRAINTS_VALIDATION"
| "PCA_RESOURCE_NOT_FOUND"
| "PCA_INVALID_ARGS"
| "PCA_INVALID_DURATION"
| "PCA_ACCESS_DENIED"
| "SLR_NOT_FOUND"
| "OTHER"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, enum
export type CertificateType =
| "IMPORTED"
| "AMAZON_ISSUED"
| "PRIVATE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface RenewalSummary {
  RenewalStatus: RenewalStatus;
  DomainValidationOptions: DomainValidation[];
  RenewalStatusReason?: FailureReason | null;
  UpdatedAt: Date | number;
}
function toRenewalSummary(root: jsonP.JSONValue): RenewalSummary {
  return jsonP.readObj({
    required: {
      "RenewalStatus": (x: jsonP.JSONValue) => cmnP.readEnum<RenewalStatus>(x),
      "DomainValidationOptions": [toDomainValidation],
      "UpdatedAt": "d",
    },
    optional: {
      "RenewalStatusReason": (x: jsonP.JSONValue) => cmnP.readEnum<FailureReason>(x),
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type RenewalStatus =
| "PENDING_AUTO_RENEWAL"
| "PENDING_VALIDATION"
| "SUCCESS"
| "FAILED"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface KeyUsage {
  Name?: KeyUsageName | null;
}
function toKeyUsage(root: jsonP.JSONValue): KeyUsage {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": (x: jsonP.JSONValue) => cmnP.readEnum<KeyUsageName>(x),
    },
  }, root);
}

// refs: 1 - tags: output, named, interface
export interface ExtendedKeyUsage {
  Name?: ExtendedKeyUsageName | null;
  OID?: string | null;
}
function toExtendedKeyUsage(root: jsonP.JSONValue): ExtendedKeyUsage {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": (x: jsonP.JSONValue) => cmnP.readEnum<ExtendedKeyUsageName>(x),
      "OID": "s",
    },
  }, root);
}

// refs: 1 - tags: output, named, enum
export type RenewalEligibility =
| "ELIGIBLE"
| "INELIGIBLE"
| cmnP.UnexpectedEnumValue;

// refs: 1 - tags: output, named, interface
export interface CertificateSummary {
  CertificateArn?: string | null;
  DomainName?: string | null;
}
function toCertificateSummary(root: jsonP.JSONValue): CertificateSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "CertificateArn": "s",
      "DomainName": "s",
    },
  }, root);
}