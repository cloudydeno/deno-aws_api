// Autogenerated API client for: Amazon Macie

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class Macie {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Macie.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-12-19",
    "endpointPrefix": "macie",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "Amazon Macie",
    "serviceId": "Macie",
    "signatureVersion": "v4",
    "targetPrefix": "MacieService",
    "uid": "macie-2017-12-19"
  };

  async associateMemberAccount(
    {abortSignal, ...params}: RequestConfig & s.AssociateMemberAccountRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateMemberAccount",
    });
    await resp.text();
  }

  async associateS3Resources(
    {abortSignal, ...params}: RequestConfig & s.AssociateS3ResourcesRequest,
  ): Promise<s.AssociateS3ResourcesResult> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
      s3Resources: params["s3Resources"]?.map(x => fromS3ResourceClassification(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AssociateS3Resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "failedS3Resources": [toFailedS3Resource],
      },
    }, await resp.json());
  }

  async disassociateMemberAccount(
    {abortSignal, ...params}: RequestConfig & s.DisassociateMemberAccountRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisassociateMemberAccount",
    });
    await resp.text();
  }

  async disassociateS3Resources(
    {abortSignal, ...params}: RequestConfig & s.DisassociateS3ResourcesRequest,
  ): Promise<s.DisassociateS3ResourcesResult> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
      associatedS3Resources: params["associatedS3Resources"]?.map(x => fromS3Resource(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisassociateS3Resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "failedS3Resources": [toFailedS3Resource],
      },
    }, await resp.json());
  }

  async listMemberAccounts(
    {abortSignal, ...params}: RequestConfig & s.ListMemberAccountsRequest = {},
  ): Promise<s.ListMemberAccountsResult> {
    const body: jsonP.JSONObject = {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListMemberAccounts",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "memberAccounts": [toMemberAccount],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listS3Resources(
    {abortSignal, ...params}: RequestConfig & s.ListS3ResourcesRequest = {},
  ): Promise<s.ListS3ResourcesResult> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListS3Resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "s3Resources": [toS3ResourceClassification],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async updateS3Resources(
    {abortSignal, ...params}: RequestConfig & s.UpdateS3ResourcesRequest,
  ): Promise<s.UpdateS3ResourcesResult> {
    const body: jsonP.JSONObject = {
      memberAccountId: params["memberAccountId"],
      s3ResourcesUpdate: params["s3ResourcesUpdate"]?.map(x => fromS3ResourceClassificationUpdate(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateS3Resources",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "failedS3Resources": [toFailedS3Resource],
      },
    }, await resp.json());
  }

}

function fromS3ResourceClassification(input?: s.S3ResourceClassification | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bucketName: input["bucketName"],
    prefix: input["prefix"],
    classificationType: fromClassificationType(input["classificationType"]),
  }
}
function toS3ResourceClassification(root: jsonP.JSONValue): s.S3ResourceClassification {
  return jsonP.readObj({
    required: {
      "bucketName": "s",
      "classificationType": toClassificationType,
    },
    optional: {
      "prefix": "s",
    },
  }, root);
}

function fromClassificationType(input?: s.ClassificationType | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    oneTime: input["oneTime"],
    continuous: input["continuous"],
  }
}
function toClassificationType(root: jsonP.JSONValue): s.ClassificationType {
  return jsonP.readObj({
    required: {
      "oneTime": (x: jsonP.JSONValue) => cmnP.readEnum<s.S3OneTimeClassificationType>(x),
      "continuous": (x: jsonP.JSONValue) => cmnP.readEnum<s.S3ContinuousClassificationType>(x),
    },
    optional: {},
  }, root);
}

function fromS3Resource(input?: s.S3Resource | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bucketName: input["bucketName"],
    prefix: input["prefix"],
  }
}
function toS3Resource(root: jsonP.JSONValue): s.S3Resource {
  return jsonP.readObj({
    required: {
      "bucketName": "s",
    },
    optional: {
      "prefix": "s",
    },
  }, root);
}

function fromS3ResourceClassificationUpdate(input?: s.S3ResourceClassificationUpdate | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    bucketName: input["bucketName"],
    prefix: input["prefix"],
    classificationTypeUpdate: fromClassificationTypeUpdate(input["classificationTypeUpdate"]),
  }
}

function fromClassificationTypeUpdate(input?: s.ClassificationTypeUpdate | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    oneTime: input["oneTime"],
    continuous: input["continuous"],
  }
}

function toFailedS3Resource(root: jsonP.JSONValue): s.FailedS3Resource {
  return jsonP.readObj({
    required: {},
    optional: {
      "failedItem": toS3Resource,
      "errorCode": "s",
      "errorMessage": "s",
    },
  }, root);
}

function toMemberAccount(root: jsonP.JSONValue): s.MemberAccount {
  return jsonP.readObj({
    required: {},
    optional: {
      "accountId": "s",
    },
  }, root);
}
