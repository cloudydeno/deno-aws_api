// Autogenerated API client for: Amazon Athena

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import * as uuidv4 from "https://deno.land/std@0.91.0/uuid/v4.ts";
import type * as s from "./structs.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class Athena {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Athena.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-05-18",
    "endpointPrefix": "athena",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "Amazon Athena",
    "serviceId": "Athena",
    "signatureVersion": "v4",
    "targetPrefix": "AmazonAthena",
    "uid": "athena-2017-05-18"
  };

  async batchGetNamedQuery(
    {abortSignal, ...params}: RequestConfig & s.BatchGetNamedQueryInput,
  ): Promise<s.BatchGetNamedQueryOutput> {
    const body: jsonP.JSONObject = {
      NamedQueryIds: params["NamedQueryIds"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchGetNamedQuery",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NamedQueries": [toNamedQuery],
        "UnprocessedNamedQueryIds": [toUnprocessedNamedQueryId],
      },
    }, await resp.json());
  }

  async batchGetQueryExecution(
    {abortSignal, ...params}: RequestConfig & s.BatchGetQueryExecutionInput,
  ): Promise<s.BatchGetQueryExecutionOutput> {
    const body: jsonP.JSONObject = {
      QueryExecutionIds: params["QueryExecutionIds"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchGetQueryExecution",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "QueryExecutions": [toQueryExecution],
        "UnprocessedQueryExecutionIds": [toUnprocessedQueryExecutionId],
      },
    }, await resp.json());
  }

  async createDataCatalog(
    {abortSignal, ...params}: RequestConfig & s.CreateDataCatalogInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Type: params["Type"],
      Description: params["Description"],
      Parameters: params["Parameters"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateDataCatalog",
    });
    await resp.text();
  }

  async createNamedQuery(
    {abortSignal, ...params}: RequestConfig & s.CreateNamedQueryInput,
  ): Promise<s.CreateNamedQueryOutput> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Description: params["Description"],
      Database: params["Database"],
      QueryString: params["QueryString"],
      ClientRequestToken: params["ClientRequestToken"] ?? generateIdemptToken(),
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateNamedQuery",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NamedQueryId": "s",
      },
    }, await resp.json());
  }

  async createPreparedStatement(
    {abortSignal, ...params}: RequestConfig & s.CreatePreparedStatementInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      StatementName: params["StatementName"],
      WorkGroup: params["WorkGroup"],
      QueryStatement: params["QueryStatement"],
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreatePreparedStatement",
    });
    await resp.text();
  }

  async createWorkGroup(
    {abortSignal, ...params}: RequestConfig & s.CreateWorkGroupInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Configuration: fromWorkGroupConfiguration(params["Configuration"]),
      Description: params["Description"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateWorkGroup",
    });
    await resp.text();
  }

  async deleteDataCatalog(
    {abortSignal, ...params}: RequestConfig & s.DeleteDataCatalogInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteDataCatalog",
    });
    await resp.text();
  }

  async deleteNamedQuery(
    {abortSignal, ...params}: RequestConfig & s.DeleteNamedQueryInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      NamedQueryId: params["NamedQueryId"] ?? generateIdemptToken(),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteNamedQuery",
    });
    await resp.text();
  }

  async deletePreparedStatement(
    {abortSignal, ...params}: RequestConfig & s.DeletePreparedStatementInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      StatementName: params["StatementName"],
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeletePreparedStatement",
    });
    await resp.text();
  }

  async deleteWorkGroup(
    {abortSignal, ...params}: RequestConfig & s.DeleteWorkGroupInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      WorkGroup: params["WorkGroup"],
      RecursiveDeleteOption: params["RecursiveDeleteOption"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteWorkGroup",
    });
    await resp.text();
  }

  async getDataCatalog(
    {abortSignal, ...params}: RequestConfig & s.GetDataCatalogInput,
  ): Promise<s.GetDataCatalogOutput> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetDataCatalog",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "DataCatalog": toDataCatalog,
      },
    }, await resp.json());
  }

  async getDatabase(
    {abortSignal, ...params}: RequestConfig & s.GetDatabaseInput,
  ): Promise<s.GetDatabaseOutput> {
    const body: jsonP.JSONObject = {
      CatalogName: params["CatalogName"],
      DatabaseName: params["DatabaseName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetDatabase",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Database": toDatabase,
      },
    }, await resp.json());
  }

  async getNamedQuery(
    {abortSignal, ...params}: RequestConfig & s.GetNamedQueryInput,
  ): Promise<s.GetNamedQueryOutput> {
    const body: jsonP.JSONObject = {
      NamedQueryId: params["NamedQueryId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetNamedQuery",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NamedQuery": toNamedQuery,
      },
    }, await resp.json());
  }

  async getPreparedStatement(
    {abortSignal, ...params}: RequestConfig & s.GetPreparedStatementInput,
  ): Promise<s.GetPreparedStatementOutput> {
    const body: jsonP.JSONObject = {
      StatementName: params["StatementName"],
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetPreparedStatement",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PreparedStatement": toPreparedStatement,
      },
    }, await resp.json());
  }

  async getQueryExecution(
    {abortSignal, ...params}: RequestConfig & s.GetQueryExecutionInput,
  ): Promise<s.GetQueryExecutionOutput> {
    const body: jsonP.JSONObject = {
      QueryExecutionId: params["QueryExecutionId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetQueryExecution",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "QueryExecution": toQueryExecution,
      },
    }, await resp.json());
  }

  async getQueryResults(
    {abortSignal, ...params}: RequestConfig & s.GetQueryResultsInput,
  ): Promise<s.GetQueryResultsOutput> {
    const body: jsonP.JSONObject = {
      QueryExecutionId: params["QueryExecutionId"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetQueryResults",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "UpdateCount": "n",
        "ResultSet": toResultSet,
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getTableMetadata(
    {abortSignal, ...params}: RequestConfig & s.GetTableMetadataInput,
  ): Promise<s.GetTableMetadataOutput> {
    const body: jsonP.JSONObject = {
      CatalogName: params["CatalogName"],
      DatabaseName: params["DatabaseName"],
      TableName: params["TableName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetTableMetadata",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TableMetadata": toTableMetadata,
      },
    }, await resp.json());
  }

  async getWorkGroup(
    {abortSignal, ...params}: RequestConfig & s.GetWorkGroupInput,
  ): Promise<s.GetWorkGroupOutput> {
    const body: jsonP.JSONObject = {
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetWorkGroup",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "WorkGroup": toWorkGroup,
      },
    }, await resp.json());
  }

  async listDataCatalogs(
    {abortSignal, ...params}: RequestConfig & s.ListDataCatalogsInput = {},
  ): Promise<s.ListDataCatalogsOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListDataCatalogs",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "DataCatalogsSummary": [toDataCatalogSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listDatabases(
    {abortSignal, ...params}: RequestConfig & s.ListDatabasesInput,
  ): Promise<s.ListDatabasesOutput> {
    const body: jsonP.JSONObject = {
      CatalogName: params["CatalogName"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListDatabases",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "DatabaseList": [toDatabase],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listEngineVersions(
    {abortSignal, ...params}: RequestConfig & s.ListEngineVersionsInput = {},
  ): Promise<s.ListEngineVersionsOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListEngineVersions",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "EngineVersions": [toEngineVersion],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listNamedQueries(
    {abortSignal, ...params}: RequestConfig & s.ListNamedQueriesInput = {},
  ): Promise<s.ListNamedQueriesOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListNamedQueries",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NamedQueryIds": ["s"],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listPreparedStatements(
    {abortSignal, ...params}: RequestConfig & s.ListPreparedStatementsInput,
  ): Promise<s.ListPreparedStatementsOutput> {
    const body: jsonP.JSONObject = {
      WorkGroup: params["WorkGroup"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListPreparedStatements",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "PreparedStatements": [toPreparedStatementSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listQueryExecutions(
    {abortSignal, ...params}: RequestConfig & s.ListQueryExecutionsInput = {},
  ): Promise<s.ListQueryExecutionsOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListQueryExecutions",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "QueryExecutionIds": ["s"],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTableMetadata(
    {abortSignal, ...params}: RequestConfig & s.ListTableMetadataInput,
  ): Promise<s.ListTableMetadataOutput> {
    const body: jsonP.JSONObject = {
      CatalogName: params["CatalogName"],
      DatabaseName: params["DatabaseName"],
      Expression: params["Expression"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTableMetadata",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TableMetadataList": [toTableMetadata],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceInput,
  ): Promise<s.ListTagsForResourceOutput> {
    const body: jsonP.JSONObject = {
      ResourceARN: params["ResourceARN"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": [toTag],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listWorkGroups(
    {abortSignal, ...params}: RequestConfig & s.ListWorkGroupsInput = {},
  ): Promise<s.ListWorkGroupsOutput> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListWorkGroups",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "WorkGroups": [toWorkGroupSummary],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async startQueryExecution(
    {abortSignal, ...params}: RequestConfig & s.StartQueryExecutionInput,
  ): Promise<s.StartQueryExecutionOutput> {
    const body: jsonP.JSONObject = {
      QueryString: params["QueryString"],
      ClientRequestToken: params["ClientRequestToken"] ?? generateIdemptToken(),
      QueryExecutionContext: fromQueryExecutionContext(params["QueryExecutionContext"]),
      ResultConfiguration: fromResultConfiguration(params["ResultConfiguration"]),
      WorkGroup: params["WorkGroup"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartQueryExecution",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "QueryExecutionId": "s",
      },
    }, await resp.json());
  }

  async stopQueryExecution(
    {abortSignal, ...params}: RequestConfig & s.StopQueryExecutionInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      QueryExecutionId: params["QueryExecutionId"] ?? generateIdemptToken(),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StopQueryExecution",
    });
    await resp.text();
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ResourceARN: params["ResourceARN"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ResourceARN: params["ResourceARN"],
      TagKeys: params["TagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    await resp.text();
  }

  async updateDataCatalog(
    {abortSignal, ...params}: RequestConfig & s.UpdateDataCatalogInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Name: params["Name"],
      Type: params["Type"],
      Description: params["Description"],
      Parameters: params["Parameters"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateDataCatalog",
    });
    await resp.text();
  }

  async updatePreparedStatement(
    {abortSignal, ...params}: RequestConfig & s.UpdatePreparedStatementInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      StatementName: params["StatementName"],
      WorkGroup: params["WorkGroup"],
      QueryStatement: params["QueryStatement"],
      Description: params["Description"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdatePreparedStatement",
    });
    await resp.text();
  }

  async updateWorkGroup(
    {abortSignal, ...params}: RequestConfig & s.UpdateWorkGroupInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      WorkGroup: params["WorkGroup"],
      Description: params["Description"],
      ConfigurationUpdates: fromWorkGroupConfigurationUpdates(params["ConfigurationUpdates"]),
      State: params["State"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateWorkGroup",
    });
    await resp.text();
  }

}

function fromTag(input?: s.Tag | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Key: input["Key"],
    Value: input["Value"],
  }
}
function toTag(root: jsonP.JSONValue): s.Tag {
  return jsonP.readObj({
    required: {},
    optional: {
      "Key": "s",
      "Value": "s",
    },
  }, root);
}

function fromWorkGroupConfiguration(input?: s.WorkGroupConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ResultConfiguration: fromResultConfiguration(input["ResultConfiguration"]),
    EnforceWorkGroupConfiguration: input["EnforceWorkGroupConfiguration"],
    PublishCloudWatchMetricsEnabled: input["PublishCloudWatchMetricsEnabled"],
    BytesScannedCutoffPerQuery: input["BytesScannedCutoffPerQuery"],
    RequesterPaysEnabled: input["RequesterPaysEnabled"],
    EngineVersion: fromEngineVersion(input["EngineVersion"]),
  }
}
function toWorkGroupConfiguration(root: jsonP.JSONValue): s.WorkGroupConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "ResultConfiguration": toResultConfiguration,
      "EnforceWorkGroupConfiguration": "b",
      "PublishCloudWatchMetricsEnabled": "b",
      "BytesScannedCutoffPerQuery": "n",
      "RequesterPaysEnabled": "b",
      "EngineVersion": toEngineVersion,
    },
  }, root);
}

function fromResultConfiguration(input?: s.ResultConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    OutputLocation: input["OutputLocation"],
    EncryptionConfiguration: fromEncryptionConfiguration(input["EncryptionConfiguration"]),
  }
}
function toResultConfiguration(root: jsonP.JSONValue): s.ResultConfiguration {
  return jsonP.readObj({
    required: {},
    optional: {
      "OutputLocation": "s",
      "EncryptionConfiguration": toEncryptionConfiguration,
    },
  }, root);
}

function fromEncryptionConfiguration(input?: s.EncryptionConfiguration | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    EncryptionOption: input["EncryptionOption"],
    KmsKey: input["KmsKey"],
  }
}
function toEncryptionConfiguration(root: jsonP.JSONValue): s.EncryptionConfiguration {
  return jsonP.readObj({
    required: {
      "EncryptionOption": (x: jsonP.JSONValue) => cmnP.readEnum<s.EncryptionOption>(x),
    },
    optional: {
      "KmsKey": "s",
    },
  }, root);
}

function fromEngineVersion(input?: s.EngineVersion | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    SelectedEngineVersion: input["SelectedEngineVersion"],
    EffectiveEngineVersion: input["EffectiveEngineVersion"],
  }
}
function toEngineVersion(root: jsonP.JSONValue): s.EngineVersion {
  return jsonP.readObj({
    required: {},
    optional: {
      "SelectedEngineVersion": "s",
      "EffectiveEngineVersion": "s",
    },
  }, root);
}

function fromQueryExecutionContext(input?: s.QueryExecutionContext | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Database: input["Database"],
    Catalog: input["Catalog"],
  }
}
function toQueryExecutionContext(root: jsonP.JSONValue): s.QueryExecutionContext {
  return jsonP.readObj({
    required: {},
    optional: {
      "Database": "s",
      "Catalog": "s",
    },
  }, root);
}

function fromWorkGroupConfigurationUpdates(input?: s.WorkGroupConfigurationUpdates | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    EnforceWorkGroupConfiguration: input["EnforceWorkGroupConfiguration"],
    ResultConfigurationUpdates: fromResultConfigurationUpdates(input["ResultConfigurationUpdates"]),
    PublishCloudWatchMetricsEnabled: input["PublishCloudWatchMetricsEnabled"],
    BytesScannedCutoffPerQuery: input["BytesScannedCutoffPerQuery"],
    RemoveBytesScannedCutoffPerQuery: input["RemoveBytesScannedCutoffPerQuery"],
    RequesterPaysEnabled: input["RequesterPaysEnabled"],
    EngineVersion: fromEngineVersion(input["EngineVersion"]),
  }
}

function fromResultConfigurationUpdates(input?: s.ResultConfigurationUpdates | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    OutputLocation: input["OutputLocation"],
    RemoveOutputLocation: input["RemoveOutputLocation"],
    EncryptionConfiguration: fromEncryptionConfiguration(input["EncryptionConfiguration"]),
    RemoveEncryptionConfiguration: input["RemoveEncryptionConfiguration"],
  }
}

function toNamedQuery(root: jsonP.JSONValue): s.NamedQuery {
  return jsonP.readObj({
    required: {
      "Name": "s",
      "Database": "s",
      "QueryString": "s",
    },
    optional: {
      "Description": "s",
      "NamedQueryId": "s",
      "WorkGroup": "s",
    },
  }, root);
}

function toUnprocessedNamedQueryId(root: jsonP.JSONValue): s.UnprocessedNamedQueryId {
  return jsonP.readObj({
    required: {},
    optional: {
      "NamedQueryId": "s",
      "ErrorCode": "s",
      "ErrorMessage": "s",
    },
  }, root);
}

function toQueryExecution(root: jsonP.JSONValue): s.QueryExecution {
  return jsonP.readObj({
    required: {},
    optional: {
      "QueryExecutionId": "s",
      "Query": "s",
      "StatementType": (x: jsonP.JSONValue) => cmnP.readEnum<s.StatementType>(x),
      "ResultConfiguration": toResultConfiguration,
      "QueryExecutionContext": toQueryExecutionContext,
      "Status": toQueryExecutionStatus,
      "Statistics": toQueryExecutionStatistics,
      "WorkGroup": "s",
      "EngineVersion": toEngineVersion,
    },
  }, root);
}

function toQueryExecutionStatus(root: jsonP.JSONValue): s.QueryExecutionStatus {
  return jsonP.readObj({
    required: {},
    optional: {
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.QueryExecutionState>(x),
      "StateChangeReason": "s",
      "SubmissionDateTime": "d",
      "CompletionDateTime": "d",
    },
  }, root);
}

function toQueryExecutionStatistics(root: jsonP.JSONValue): s.QueryExecutionStatistics {
  return jsonP.readObj({
    required: {},
    optional: {
      "EngineExecutionTimeInMillis": "n",
      "DataScannedInBytes": "n",
      "DataManifestLocation": "s",
      "TotalExecutionTimeInMillis": "n",
      "QueryQueueTimeInMillis": "n",
      "QueryPlanningTimeInMillis": "n",
      "ServiceProcessingTimeInMillis": "n",
    },
  }, root);
}

function toUnprocessedQueryExecutionId(root: jsonP.JSONValue): s.UnprocessedQueryExecutionId {
  return jsonP.readObj({
    required: {},
    optional: {
      "QueryExecutionId": "s",
      "ErrorCode": "s",
      "ErrorMessage": "s",
    },
  }, root);
}

function toDataCatalog(root: jsonP.JSONValue): s.DataCatalog {
  return jsonP.readObj({
    required: {
      "Name": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.DataCatalogType>(x),
    },
    optional: {
      "Description": "s",
      "Parameters": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toDatabase(root: jsonP.JSONValue): s.Database {
  return jsonP.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "Description": "s",
      "Parameters": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toPreparedStatement(root: jsonP.JSONValue): s.PreparedStatement {
  return jsonP.readObj({
    required: {},
    optional: {
      "StatementName": "s",
      "QueryStatement": "s",
      "WorkGroupName": "s",
      "Description": "s",
      "LastModifiedTime": "d",
    },
  }, root);
}

function toResultSet(root: jsonP.JSONValue): s.ResultSet {
  return jsonP.readObj({
    required: {},
    optional: {
      "Rows": [toRow],
      "ResultSetMetadata": toResultSetMetadata,
    },
  }, root);
}

function toRow(root: jsonP.JSONValue): s.Row {
  return jsonP.readObj({
    required: {},
    optional: {
      "Data": [toDatum],
    },
  }, root);
}

function toDatum(root: jsonP.JSONValue): s.Datum {
  return jsonP.readObj({
    required: {},
    optional: {
      "VarCharValue": "s",
    },
  }, root);
}

function toResultSetMetadata(root: jsonP.JSONValue): s.ResultSetMetadata {
  return jsonP.readObj({
    required: {},
    optional: {
      "ColumnInfo": [toColumnInfo],
    },
  }, root);
}

function toColumnInfo(root: jsonP.JSONValue): s.ColumnInfo {
  return jsonP.readObj({
    required: {
      "Name": "s",
      "Type": "s",
    },
    optional: {
      "CatalogName": "s",
      "SchemaName": "s",
      "TableName": "s",
      "Label": "s",
      "Precision": "n",
      "Scale": "n",
      "Nullable": (x: jsonP.JSONValue) => cmnP.readEnum<s.ColumnNullable>(x),
      "CaseSensitive": "b",
    },
  }, root);
}

function toTableMetadata(root: jsonP.JSONValue): s.TableMetadata {
  return jsonP.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "CreateTime": "d",
      "LastAccessTime": "d",
      "TableType": "s",
      "Columns": [toColumn],
      "PartitionKeys": [toColumn],
      "Parameters": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toColumn(root: jsonP.JSONValue): s.Column {
  return jsonP.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "Type": "s",
      "Comment": "s",
    },
  }, root);
}

function toWorkGroup(root: jsonP.JSONValue): s.WorkGroup {
  return jsonP.readObj({
    required: {
      "Name": "s",
    },
    optional: {
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.WorkGroupState>(x),
      "Configuration": toWorkGroupConfiguration,
      "Description": "s",
      "CreationTime": "d",
    },
  }, root);
}

function toDataCatalogSummary(root: jsonP.JSONValue): s.DataCatalogSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "CatalogName": "s",
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.DataCatalogType>(x),
    },
  }, root);
}

function toPreparedStatementSummary(root: jsonP.JSONValue): s.PreparedStatementSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "StatementName": "s",
      "LastModifiedTime": "d",
    },
  }, root);
}

function toWorkGroupSummary(root: jsonP.JSONValue): s.WorkGroupSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": "s",
      "State": (x: jsonP.JSONValue) => cmnP.readEnum<s.WorkGroupState>(x),
      "Description": "s",
      "CreationTime": "d",
      "EngineVersion": toEngineVersion,
    },
  }, root);
}
