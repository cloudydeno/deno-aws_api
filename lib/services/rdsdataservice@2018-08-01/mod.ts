// Autogenerated API client for: AWS RDS DataService

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as Base64 from "https://deno.land/std@0.86.0/encoding/base64.ts";
import * as client from "../../client/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";
function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (input == null) return input;
  return Base64.encode(input);
}

export default class RDSDataService {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(RDSDataService.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2018-08-01",
    "endpointPrefix": "rds-data",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceFullName": "AWS RDS DataService",
    "serviceId": "RDS Data",
    "signatureVersion": "v4",
    "signingName": "rds-data",
    "uid": "rds-data-2018-08-01"
  };

  async batchExecuteStatement(
    {abortSignal, ...params}: RequestConfig & s.BatchExecuteStatementRequest,
  ): Promise<s.BatchExecuteStatementResponse> {
    const body: jsonP.JSONObject = {
      database: params["database"],
      parameterSets: params["parameterSets"]?.map(x => x?.map(fromSqlParameter)),
      resourceArn: params["resourceArn"],
      schema: params["schema"],
      secretArn: params["secretArn"],
      sql: params["sql"],
      transactionId: params["transactionId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchExecuteStatement",
      requestUri: "/BatchExecute",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "updateResults": [toUpdateResult],
      },
    }, await resp.json());
  }

  async beginTransaction(
    {abortSignal, ...params}: RequestConfig & s.BeginTransactionRequest,
  ): Promise<s.BeginTransactionResponse> {
    const body: jsonP.JSONObject = {
      database: params["database"],
      resourceArn: params["resourceArn"],
      schema: params["schema"],
      secretArn: params["secretArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BeginTransaction",
      requestUri: "/BeginTransaction",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "transactionId": "s",
      },
    }, await resp.json());
  }

  async commitTransaction(
    {abortSignal, ...params}: RequestConfig & s.CommitTransactionRequest,
  ): Promise<s.CommitTransactionResponse> {
    const body: jsonP.JSONObject = {
      resourceArn: params["resourceArn"],
      secretArn: params["secretArn"],
      transactionId: params["transactionId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CommitTransaction",
      requestUri: "/CommitTransaction",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "transactionStatus": "s",
      },
    }, await resp.json());
  }

  async executeSql(
    {abortSignal, ...params}: RequestConfig & s.ExecuteSqlRequest,
  ): Promise<s.ExecuteSqlResponse> {
    const body: jsonP.JSONObject = {
      awsSecretStoreArn: params["awsSecretStoreArn"],
      database: params["database"],
      dbClusterOrInstanceArn: params["dbClusterOrInstanceArn"],
      schema: params["schema"],
      sqlStatements: params["sqlStatements"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ExecuteSql",
      requestUri: "/ExecuteSql",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "sqlStatementResults": [toSqlStatementResult],
      },
    }, await resp.json());
  }

  async executeStatement(
    {abortSignal, ...params}: RequestConfig & s.ExecuteStatementRequest,
  ): Promise<s.ExecuteStatementResponse> {
    const body: jsonP.JSONObject = {
      continueAfterTimeout: params["continueAfterTimeout"],
      database: params["database"],
      includeResultMetadata: params["includeResultMetadata"],
      parameters: params["parameters"]?.map(x => fromSqlParameter(x)),
      resourceArn: params["resourceArn"],
      resultSetOptions: fromResultSetOptions(params["resultSetOptions"]),
      schema: params["schema"],
      secretArn: params["secretArn"],
      sql: params["sql"],
      transactionId: params["transactionId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ExecuteStatement",
      requestUri: "/Execute",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "columnMetadata": [toColumnMetadata],
        "generatedFields": [toField],
        "numberOfRecordsUpdated": "n",
        "records": [x => jsonP.readList(toField, x)],
      },
    }, await resp.json());
  }

  async rollbackTransaction(
    {abortSignal, ...params}: RequestConfig & s.RollbackTransactionRequest,
  ): Promise<s.RollbackTransactionResponse> {
    const body: jsonP.JSONObject = {
      resourceArn: params["resourceArn"],
      secretArn: params["secretArn"],
      transactionId: params["transactionId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RollbackTransaction",
      requestUri: "/RollbackTransaction",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "transactionStatus": "s",
      },
    }, await resp.json());
  }

}

function fromSqlParameter(input?: s.SqlParameter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    name: input["name"],
    typeHint: input["typeHint"],
    value: fromField(input["value"]),
  }
}

function fromField(input?: s.Field | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    arrayValue: fromArrayValue(input["arrayValue"]),
    blobValue: serializeBlob(input["blobValue"]),
    booleanValue: input["booleanValue"],
    doubleValue: input["doubleValue"],
    isNull: input["isNull"],
    longValue: input["longValue"],
    stringValue: input["stringValue"],
  }
}
function toField(root: jsonP.JSONValue): s.Field {
  return jsonP.readObj({
    required: {},
    optional: {
      "arrayValue": toArrayValue,
      "blobValue": "a",
      "booleanValue": "b",
      "doubleValue": "n",
      "isNull": "b",
      "longValue": "n",
      "stringValue": "s",
    },
  }, root);
}

function fromArrayValue(input?: s.ArrayValue | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    arrayValues: input["arrayValues"]?.map(x => fromArrayValue(x)),
    booleanValues: input["booleanValues"],
    doubleValues: input["doubleValues"],
    longValues: input["longValues"],
    stringValues: input["stringValues"],
  }
}
function toArrayValue(root: jsonP.JSONValue): s.ArrayValue {
  return jsonP.readObj({
    required: {},
    optional: {
      "arrayValues": [toArrayValue],
      "booleanValues": ["b"],
      "doubleValues": ["n"],
      "longValues": ["n"],
      "stringValues": ["s"],
    },
  }, root);
}

function fromResultSetOptions(input?: s.ResultSetOptions | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    decimalReturnType: input["decimalReturnType"],
  }
}

function toUpdateResult(root: jsonP.JSONValue): s.UpdateResult {
  return jsonP.readObj({
    required: {},
    optional: {
      "generatedFields": [toField],
    },
  }, root);
}

function toSqlStatementResult(root: jsonP.JSONValue): s.SqlStatementResult {
  return jsonP.readObj({
    required: {},
    optional: {
      "numberOfRecordsUpdated": "n",
      "resultFrame": toResultFrame,
    },
  }, root);
}

function toResultFrame(root: jsonP.JSONValue): s.ResultFrame {
  return jsonP.readObj({
    required: {},
    optional: {
      "records": [toRecord],
      "resultSetMetadata": toResultSetMetadata,
    },
  }, root);
}

function toRecord(root: jsonP.JSONValue): s.Record {
  return jsonP.readObj({
    required: {},
    optional: {
      "values": [toValue],
    },
  }, root);
}

function toValue(root: jsonP.JSONValue): s.Value {
  return jsonP.readObj({
    required: {},
    optional: {
      "arrayValues": [toValue],
      "bigIntValue": "n",
      "bitValue": "b",
      "blobValue": "a",
      "doubleValue": "n",
      "intValue": "n",
      "isNull": "b",
      "realValue": "n",
      "stringValue": "s",
      "structValue": toStructValue,
    },
  }, root);
}

function toStructValue(root: jsonP.JSONValue): s.StructValue {
  return jsonP.readObj({
    required: {},
    optional: {
      "attributes": [toValue],
    },
  }, root);
}

function toResultSetMetadata(root: jsonP.JSONValue): s.ResultSetMetadata {
  return jsonP.readObj({
    required: {},
    optional: {
      "columnCount": "n",
      "columnMetadata": [toColumnMetadata],
    },
  }, root);
}

function toColumnMetadata(root: jsonP.JSONValue): s.ColumnMetadata {
  return jsonP.readObj({
    required: {},
    optional: {
      "arrayBaseColumnType": "n",
      "isAutoIncrement": "b",
      "isCaseSensitive": "b",
      "isCurrency": "b",
      "isSigned": "b",
      "label": "s",
      "name": "s",
      "nullable": "n",
      "precision": "n",
      "scale": "n",
      "schemaName": "s",
      "tableName": "s",
      "type": "n",
      "typeName": "s",
    },
  }, root);
}
