// Autogenerated API client for: AWS Lake Formation

import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';
interface RequestConfig {
  abortSignal?: AbortSignal;
}

import { JSONObject, JSONValue } from '../../encoding/json.ts';
import * as prt from "../../encoding/json.ts";

export default class LakeFormation {
  #client: ServiceClient;
  constructor(apiFactory: ApiFactory) {
    this.#client = apiFactory.buildServiceClient(LakeFormation.ApiMetadata);
  }

  static ApiMetadata: ApiMetadata = {
    "apiVersion": "2017-03-31",
    "endpointPrefix": "lakeformation",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "AWS Lake Formation",
    "serviceId": "LakeFormation",
    "signatureVersion": "v4",
    "signingName": "lakeformation",
    "targetPrefix": "AWSLakeFormation",
    "uid": "lakeformation-2017-03-31"
  };

  async batchGrantPermissions(
    {abortSignal, ...params}: RequestConfig & BatchGrantPermissionsRequest,
  ): Promise<BatchGrantPermissionsResponse> {
    const body: JSONObject = {...params,
    Entries: params["Entries"]?.map(x => fromBatchPermissionsRequestEntry(x)),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchGrantPermissions",
    });
    return prt.readObj({
      required: {},
      optional: {
        "Failures": [toBatchPermissionsFailureEntry],
      },
    }, await resp.json());
  }

  async batchRevokePermissions(
    {abortSignal, ...params}: RequestConfig & BatchRevokePermissionsRequest,
  ): Promise<BatchRevokePermissionsResponse> {
    const body: JSONObject = {...params,
    Entries: params["Entries"]?.map(x => fromBatchPermissionsRequestEntry(x)),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchRevokePermissions",
    });
    return prt.readObj({
      required: {},
      optional: {
        "Failures": [toBatchPermissionsFailureEntry],
      },
    }, await resp.json());
  }

  async deregisterResource(
    {abortSignal, ...params}: RequestConfig & DeregisterResourceRequest,
  ): Promise<DeregisterResourceResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeregisterResource",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async describeResource(
    {abortSignal, ...params}: RequestConfig & DescribeResourceRequest,
  ): Promise<DescribeResourceResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeResource",
    });
    return prt.readObj({
      required: {},
      optional: {
        "ResourceInfo": toResourceInfo,
      },
    }, await resp.json());
  }

  async getDataLakeSettings(
    {abortSignal, ...params}: RequestConfig & GetDataLakeSettingsRequest = {},
  ): Promise<GetDataLakeSettingsResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetDataLakeSettings",
    });
    return prt.readObj({
      required: {},
      optional: {
        "DataLakeSettings": toDataLakeSettings,
      },
    }, await resp.json());
  }

  async getEffectivePermissionsForPath(
    {abortSignal, ...params}: RequestConfig & GetEffectivePermissionsForPathRequest,
  ): Promise<GetEffectivePermissionsForPathResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetEffectivePermissionsForPath",
    });
    return prt.readObj({
      required: {},
      optional: {
        "Permissions": [toPrincipalResourcePermissions],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async grantPermissions(
    {abortSignal, ...params}: RequestConfig & GrantPermissionsRequest,
  ): Promise<GrantPermissionsResponse> {
    const body: JSONObject = {...params,
    Principal: fromDataLakePrincipal(params["Principal"]),
    Resource: fromResource(params["Resource"]),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GrantPermissions",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async listPermissions(
    {abortSignal, ...params}: RequestConfig & ListPermissionsRequest = {},
  ): Promise<ListPermissionsResponse> {
    const body: JSONObject = {...params,
    Principal: fromDataLakePrincipal(params["Principal"]),
    Resource: fromResource(params["Resource"]),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListPermissions",
    });
    return prt.readObj({
      required: {},
      optional: {
        "PrincipalResourcePermissions": [toPrincipalResourcePermissions],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listResources(
    {abortSignal, ...params}: RequestConfig & ListResourcesRequest = {},
  ): Promise<ListResourcesResponse> {
    const body: JSONObject = {...params,
    FilterConditionList: params["FilterConditionList"]?.map(x => fromFilterCondition(x)),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListResources",
    });
    return prt.readObj({
      required: {},
      optional: {
        "ResourceInfoList": [toResourceInfo],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async putDataLakeSettings(
    {abortSignal, ...params}: RequestConfig & PutDataLakeSettingsRequest,
  ): Promise<PutDataLakeSettingsResponse> {
    const body: JSONObject = {...params,
    DataLakeSettings: fromDataLakeSettings(params["DataLakeSettings"]),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutDataLakeSettings",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async registerResource(
    {abortSignal, ...params}: RequestConfig & RegisterResourceRequest,
  ): Promise<RegisterResourceResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RegisterResource",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async revokePermissions(
    {abortSignal, ...params}: RequestConfig & RevokePermissionsRequest,
  ): Promise<RevokePermissionsResponse> {
    const body: JSONObject = {...params,
    Principal: fromDataLakePrincipal(params["Principal"]),
    Resource: fromResource(params["Resource"]),
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RevokePermissions",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

  async updateResource(
    {abortSignal, ...params}: RequestConfig & UpdateResourceRequest,
  ): Promise<UpdateResourceResponse> {
    const body: JSONObject = {...params,
  };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateResource",
    });
    return prt.readObj({
      required: {},
      optional: {},
    }, await resp.json());
  }

}

// refs: 1 - tags: named, input
export interface BatchGrantPermissionsRequest {
  CatalogId?: string | null;
  Entries: BatchPermissionsRequestEntry[];
}

// refs: 1 - tags: named, input
export interface BatchRevokePermissionsRequest {
  CatalogId?: string | null;
  Entries: BatchPermissionsRequestEntry[];
}

// refs: 1 - tags: named, input
export interface DeregisterResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface DescribeResourceRequest {
  ResourceArn: string;
}

// refs: 1 - tags: named, input
export interface GetDataLakeSettingsRequest {
  CatalogId?: string | null;
}

// refs: 1 - tags: named, input
export interface GetEffectivePermissionsForPathRequest {
  CatalogId?: string | null;
  ResourceArn: string;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface GrantPermissionsRequest {
  CatalogId?: string | null;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  PermissionsWithGrantOption?: Permission[] | null;
}

// refs: 1 - tags: named, input
export interface ListPermissionsRequest {
  CatalogId?: string | null;
  Principal?: DataLakePrincipal | null;
  ResourceType?: DataLakeResourceType | null;
  Resource?: Resource | null;
  NextToken?: string | null;
  MaxResults?: number | null;
}

// refs: 1 - tags: named, input
export interface ListResourcesRequest {
  FilterConditionList?: FilterCondition[] | null;
  MaxResults?: number | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, input
export interface PutDataLakeSettingsRequest {
  CatalogId?: string | null;
  DataLakeSettings: DataLakeSettings;
}

// refs: 1 - tags: named, input
export interface RegisterResourceRequest {
  ResourceArn: string;
  UseServiceLinkedRole?: boolean | null;
  RoleArn?: string | null;
}

// refs: 1 - tags: named, input
export interface RevokePermissionsRequest {
  CatalogId?: string | null;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  PermissionsWithGrantOption?: Permission[] | null;
}

// refs: 1 - tags: named, input
export interface UpdateResourceRequest {
  RoleArn: string;
  ResourceArn: string;
}

// refs: 1 - tags: named, output
export interface BatchGrantPermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[] | null;
}

// refs: 1 - tags: named, output
export interface BatchRevokePermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[] | null;
}

// refs: 1 - tags: named, output
export interface DeregisterResourceResponse {
}

// refs: 1 - tags: named, output
export interface DescribeResourceResponse {
  ResourceInfo?: ResourceInfo | null;
}

// refs: 1 - tags: named, output
export interface GetDataLakeSettingsResponse {
  DataLakeSettings?: DataLakeSettings | null;
}

// refs: 1 - tags: named, output
export interface GetEffectivePermissionsForPathResponse {
  Permissions?: PrincipalResourcePermissions[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface GrantPermissionsResponse {
}

// refs: 1 - tags: named, output
export interface ListPermissionsResponse {
  PrincipalResourcePermissions?: PrincipalResourcePermissions[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface ListResourcesResponse {
  ResourceInfoList?: ResourceInfo[] | null;
  NextToken?: string | null;
}

// refs: 1 - tags: named, output
export interface PutDataLakeSettingsResponse {
}

// refs: 1 - tags: named, output
export interface RegisterResourceResponse {
}

// refs: 1 - tags: named, output
export interface RevokePermissionsResponse {
}

// refs: 1 - tags: named, output
export interface UpdateResourceResponse {
}

// refs: 4 - tags: input, named, interface, output
export interface BatchPermissionsRequestEntry {
  Id: string;
  Principal?: DataLakePrincipal | null;
  Resource?: Resource | null;
  Permissions?: Permission[] | null;
  PermissionsWithGrantOption?: Permission[] | null;
}
function fromBatchPermissionsRequestEntry(input?: BatchPermissionsRequestEntry | null): JSONValue {
  if (!input) return input;
  return {...input,
    Principal: fromDataLakePrincipal(input["Principal"]),
    Resource: fromResource(input["Resource"]),
  }
}
function toBatchPermissionsRequestEntry(root: JSONValue): BatchPermissionsRequestEntry {
  return prt.readObj({
    required: {
      "Id": "s",
    },
    optional: {
      "Principal": toDataLakePrincipal,
      "Resource": toResource,
      "Permissions": [toPermission],
      "PermissionsWithGrantOption": [toPermission],
    },
  }, root);
}

// refs: 15 - tags: input, named, interface, output
export interface DataLakePrincipal {
  DataLakePrincipalIdentifier?: string | null;
}
function fromDataLakePrincipal(input?: DataLakePrincipal | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toDataLakePrincipal(root: JSONValue): DataLakePrincipal {
  return prt.readObj({
    required: {},
    optional: {
      "DataLakePrincipalIdentifier": "s",
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface Resource {
  Catalog?: CatalogResource | null;
  Database?: DatabaseResource | null;
  Table?: TableResource | null;
  TableWithColumns?: TableWithColumnsResource | null;
  DataLocation?: DataLocationResource | null;
}
function fromResource(input?: Resource | null): JSONValue {
  if (!input) return input;
  return {...input,
    Catalog: fromCatalogResource(input["Catalog"]),
    Database: fromDatabaseResource(input["Database"]),
    Table: fromTableResource(input["Table"]),
    TableWithColumns: fromTableWithColumnsResource(input["TableWithColumns"]),
    DataLocation: fromDataLocationResource(input["DataLocation"]),
  }
}
function toResource(root: JSONValue): Resource {
  return prt.readObj({
    required: {},
    optional: {
      "Catalog": toCatalogResource,
      "Database": toDatabaseResource,
      "Table": toTableResource,
      "TableWithColumns": toTableWithColumnsResource,
      "DataLocation": toDataLocationResource,
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface CatalogResource {
}
function fromCatalogResource(input?: CatalogResource | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toCatalogResource(root: JSONValue): CatalogResource {
  return prt.readObj({
    required: {},
    optional: {},
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface DatabaseResource {
  CatalogId?: string | null;
  Name: string;
}
function fromDatabaseResource(input?: DatabaseResource | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toDatabaseResource(root: JSONValue): DatabaseResource {
  return prt.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "CatalogId": "s",
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface TableResource {
  CatalogId?: string | null;
  DatabaseName: string;
  Name?: string | null;
  TableWildcard?: TableWildcard | null;
}
function fromTableResource(input?: TableResource | null): JSONValue {
  if (!input) return input;
  return {...input,
    TableWildcard: fromTableWildcard(input["TableWildcard"]),
  }
}
function toTableResource(root: JSONValue): TableResource {
  return prt.readObj({
    required: {
      "DatabaseName": "s",
    },
    optional: {
      "CatalogId": "s",
      "Name": "s",
      "TableWildcard": toTableWildcard,
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface TableWildcard {
}
function fromTableWildcard(input?: TableWildcard | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toTableWildcard(root: JSONValue): TableWildcard {
  return prt.readObj({
    required: {},
    optional: {},
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface TableWithColumnsResource {
  CatalogId?: string | null;
  DatabaseName: string;
  Name: string;
  ColumnNames?: string[] | null;
  ColumnWildcard?: ColumnWildcard | null;
}
function fromTableWithColumnsResource(input?: TableWithColumnsResource | null): JSONValue {
  if (!input) return input;
  return {...input,
    ColumnWildcard: fromColumnWildcard(input["ColumnWildcard"]),
  }
}
function toTableWithColumnsResource(root: JSONValue): TableWithColumnsResource {
  return prt.readObj({
    required: {
      "DatabaseName": "s",
      "Name": "s",
    },
    optional: {
      "CatalogId": "s",
      "ColumnNames": ["s"],
      "ColumnWildcard": toColumnWildcard,
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface ColumnWildcard {
  ExcludedColumnNames?: string[] | null;
}
function fromColumnWildcard(input?: ColumnWildcard | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toColumnWildcard(root: JSONValue): ColumnWildcard {
  return prt.readObj({
    required: {},
    optional: {
      "ExcludedColumnNames": ["s"],
    },
  }, root);
}

// refs: 9 - tags: input, named, interface, output
export interface DataLocationResource {
  CatalogId?: string | null;
  ResourceArn: string;
}
function fromDataLocationResource(input?: DataLocationResource | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}
function toDataLocationResource(root: JSONValue): DataLocationResource {
  return prt.readObj({
    required: {
      "ResourceArn": "s",
    },
    optional: {
      "CatalogId": "s",
    },
  }, root);
}

// refs: 20 - tags: input, named, enum, output
export type Permission =
| "ALL"
| "SELECT"
| "ALTER"
| "DROP"
| "DELETE"
| "INSERT"
| "DESCRIBE"
| "CREATE_DATABASE"
| "CREATE_TABLE"
| "DATA_LOCATION_ACCESS"
;

function toPermission(root: JSONValue): Permission | null {
  return ( false
    || root == "ALL"
    || root == "SELECT"
    || root == "ALTER"
    || root == "DROP"
    || root == "DELETE"
    || root == "INSERT"
    || root == "DESCRIBE"
    || root == "CREATE_DATABASE"
    || root == "CREATE_TABLE"
    || root == "DATA_LOCATION_ACCESS"
  ) ? root : null;
}

// refs: 1 - tags: input, named, enum
export type DataLakeResourceType =
| "CATALOG"
| "DATABASE"
| "TABLE"
| "DATA_LOCATION"
;


// refs: 1 - tags: input, named, interface
export interface FilterCondition {
  Field?: FieldNameString | null;
  ComparisonOperator?: ComparisonOperator | null;
  StringValueList?: string[] | null;
}
function fromFilterCondition(input?: FilterCondition | null): JSONValue {
  if (!input) return input;
  return {...input,
  }
}

// refs: 1 - tags: input, named, enum
export type FieldNameString =
| "RESOURCE_ARN"
| "ROLE_ARN"
| "LAST_MODIFIED"
;


// refs: 1 - tags: input, named, enum
export type ComparisonOperator =
| "EQ"
| "NE"
| "LE"
| "LT"
| "GE"
| "GT"
| "CONTAINS"
| "NOT_CONTAINS"
| "BEGINS_WITH"
| "IN"
| "BETWEEN"
;


// refs: 2 - tags: input, named, interface, output
export interface DataLakeSettings {
  DataLakeAdmins?: DataLakePrincipal[] | null;
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[] | null;
  CreateTableDefaultPermissions?: PrincipalPermissions[] | null;
  TrustedResourceOwners?: string[] | null;
}
function fromDataLakeSettings(input?: DataLakeSettings | null): JSONValue {
  if (!input) return input;
  return {...input,
    DataLakeAdmins: input["DataLakeAdmins"]?.map(x => fromDataLakePrincipal(x)),
    CreateDatabaseDefaultPermissions: input["CreateDatabaseDefaultPermissions"]?.map(x => fromPrincipalPermissions(x)),
    CreateTableDefaultPermissions: input["CreateTableDefaultPermissions"]?.map(x => fromPrincipalPermissions(x)),
  }
}
function toDataLakeSettings(root: JSONValue): DataLakeSettings {
  return prt.readObj({
    required: {},
    optional: {
      "DataLakeAdmins": [toDataLakePrincipal],
      "CreateDatabaseDefaultPermissions": [toPrincipalPermissions],
      "CreateTableDefaultPermissions": [toPrincipalPermissions],
      "TrustedResourceOwners": ["s"],
    },
  }, root);
}

// refs: 4 - tags: input, named, interface, output
export interface PrincipalPermissions {
  Principal?: DataLakePrincipal | null;
  Permissions?: Permission[] | null;
}
function fromPrincipalPermissions(input?: PrincipalPermissions | null): JSONValue {
  if (!input) return input;
  return {...input,
    Principal: fromDataLakePrincipal(input["Principal"]),
  }
}
function toPrincipalPermissions(root: JSONValue): PrincipalPermissions {
  return prt.readObj({
    required: {},
    optional: {
      "Principal": toDataLakePrincipal,
      "Permissions": [toPermission],
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface BatchPermissionsFailureEntry {
  RequestEntry?: BatchPermissionsRequestEntry | null;
  Error?: ErrorDetail | null;
}
function toBatchPermissionsFailureEntry(root: JSONValue): BatchPermissionsFailureEntry {
  return prt.readObj({
    required: {},
    optional: {
      "RequestEntry": toBatchPermissionsRequestEntry,
      "Error": toErrorDetail,
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface ErrorDetail {
  ErrorCode?: string | null;
  ErrorMessage?: string | null;
}
function toErrorDetail(root: JSONValue): ErrorDetail {
  return prt.readObj({
    required: {},
    optional: {
      "ErrorCode": "s",
      "ErrorMessage": "s",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface ResourceInfo {
  ResourceArn?: string | null;
  RoleArn?: string | null;
  LastModified?: Date | number | null;
}
function toResourceInfo(root: JSONValue): ResourceInfo {
  return prt.readObj({
    required: {},
    optional: {
      "ResourceArn": "s",
      "RoleArn": "s",
      "LastModified": "d",
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface PrincipalResourcePermissions {
  Principal?: DataLakePrincipal | null;
  Resource?: Resource | null;
  Permissions?: Permission[] | null;
  PermissionsWithGrantOption?: Permission[] | null;
  AdditionalDetails?: DetailsMap | null;
}
function toPrincipalResourcePermissions(root: JSONValue): PrincipalResourcePermissions {
  return prt.readObj({
    required: {},
    optional: {
      "Principal": toDataLakePrincipal,
      "Resource": toResource,
      "Permissions": [toPermission],
      "PermissionsWithGrantOption": [toPermission],
      "AdditionalDetails": toDetailsMap,
    },
  }, root);
}

// refs: 2 - tags: output, named, interface
export interface DetailsMap {
  ResourceShare?: string[] | null;
}
function toDetailsMap(root: JSONValue): DetailsMap {
  return prt.readObj({
    required: {},
    optional: {
      "ResourceShare": ["s"],
    },
  }, root);
}