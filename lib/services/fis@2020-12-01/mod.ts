// Autogenerated API client for: AWS Fault Injection Simulator

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

export default class Fis {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Fis.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2020-12-01",
    "endpointPrefix": "fis",
    "jsonVersion": "1.1",
    "protocol": "rest-json",
    "serviceAbbreviation": "FIS",
    "serviceFullName": "AWS Fault Injection Simulator",
    "serviceId": "fis",
    "signatureVersion": "v4",
    "signingName": "fis",
    "uid": "fis-2020-12-01"
  };

  async createExperimentTemplate(
    {abortSignal, ...params}: RequestConfig & s.CreateExperimentTemplateRequest,
  ): Promise<s.CreateExperimentTemplateResponse> {
    const body: jsonP.JSONObject = {
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      description: params["description"],
      stopConditions: params["stopConditions"]?.map(x => fromCreateExperimentTemplateStopConditionInput(x)),
      targets: jsonP.serializeMap(params["targets"], x => fromCreateExperimentTemplateTargetInput(x)),
      actions: jsonP.serializeMap(params["actions"], x => fromCreateExperimentTemplateActionInput(x)),
      roleArn: params["roleArn"],
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateExperimentTemplate",
      requestUri: "/experimentTemplates",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experimentTemplate": toExperimentTemplate,
      },
    }, await resp.json());
  }

  async deleteExperimentTemplate(
    {abortSignal, ...params}: RequestConfig & s.DeleteExperimentTemplateRequest,
  ): Promise<s.DeleteExperimentTemplateResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteExperimentTemplate",
      method: "DELETE",
      requestUri: cmnP.encodePath`/experimentTemplates/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experimentTemplate": toExperimentTemplate,
      },
    }, await resp.json());
  }

  async getAction(
    {abortSignal, ...params}: RequestConfig & s.GetActionRequest,
  ): Promise<s.GetActionResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetAction",
      method: "GET",
      requestUri: cmnP.encodePath`/actions/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "action": toAction,
      },
    }, await resp.json());
  }

  async getExperiment(
    {abortSignal, ...params}: RequestConfig & s.GetExperimentRequest,
  ): Promise<s.GetExperimentResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetExperiment",
      method: "GET",
      requestUri: cmnP.encodePath`/experiments/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experiment": toExperiment,
      },
    }, await resp.json());
  }

  async getExperimentTemplate(
    {abortSignal, ...params}: RequestConfig & s.GetExperimentTemplateRequest,
  ): Promise<s.GetExperimentTemplateResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetExperimentTemplate",
      method: "GET",
      requestUri: cmnP.encodePath`/experimentTemplates/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experimentTemplate": toExperimentTemplate,
      },
    }, await resp.json());
  }

  async listActions(
    {abortSignal, ...params}: RequestConfig & s.ListActionsRequest = {},
  ): Promise<s.ListActionsResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListActions",
      method: "GET",
      requestUri: "/actions",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "actions": [toActionSummary],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listExperimentTemplates(
    {abortSignal, ...params}: RequestConfig & s.ListExperimentTemplatesRequest = {},
  ): Promise<s.ListExperimentTemplatesResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListExperimentTemplates",
      method: "GET",
      requestUri: "/experimentTemplates",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experimentTemplates": [toExperimentTemplateSummary],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listExperiments(
    {abortSignal, ...params}: RequestConfig & s.ListExperimentsRequest = {},
  ): Promise<s.ListExperimentsResponse> {
    const query = new URLSearchParams;
    if (params["maxResults"] != null) query.set("maxResults", params["maxResults"]?.toString() ?? "");
    if (params["nextToken"] != null) query.set("nextToken", params["nextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListExperiments",
      method: "GET",
      requestUri: "/experiments",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experiments": [toExperimentSummary],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "ListTagsForResource",
      method: "GET",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": x => jsonP.readMap(String, String, x),
      },
    }, await resp.json());
  }

  async startExperiment(
    {abortSignal, ...params}: RequestConfig & s.StartExperimentRequest,
  ): Promise<s.StartExperimentResponse> {
    const body: jsonP.JSONObject = {
      clientToken: params["clientToken"] ?? generateIdemptToken(),
      experimentTemplateId: params["experimentTemplateId"],
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartExperiment",
      requestUri: "/experiments",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experiment": toExperiment,
      },
    }, await resp.json());
  }

  async stopExperiment(
    {abortSignal, ...params}: RequestConfig & s.StopExperimentRequest,
  ): Promise<s.StopExperimentResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "StopExperiment",
      method: "DELETE",
      requestUri: cmnP.encodePath`/experiments/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experiment": toExperiment,
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      tags: params["tags"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
      responseCode: 200,
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<void> {
    const query = new URLSearchParams;
    for (const item of params["tagKeys"] ?? []) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/tags/${params["resourceArn"]}`,
      responseCode: 200,
    });
    await resp.text();
  }

  async updateExperimentTemplate(
    {abortSignal, ...params}: RequestConfig & s.UpdateExperimentTemplateRequest,
  ): Promise<s.UpdateExperimentTemplateResponse> {
    const body: jsonP.JSONObject = {
      description: params["description"],
      stopConditions: params["stopConditions"]?.map(x => fromUpdateExperimentTemplateStopConditionInput(x)),
      targets: jsonP.serializeMap(params["targets"], x => fromUpdateExperimentTemplateTargetInput(x)),
      actions: jsonP.serializeMap(params["actions"], x => fromUpdateExperimentTemplateActionInputItem(x)),
      roleArn: params["roleArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateExperimentTemplate",
      method: "PATCH",
      requestUri: cmnP.encodePath`/experimentTemplates/${params["id"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "experimentTemplate": toExperimentTemplate,
      },
    }, await resp.json());
  }

}

function fromCreateExperimentTemplateStopConditionInput(input?: s.CreateExperimentTemplateStopConditionInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: input["source"],
    value: input["value"],
  }
}

function fromCreateExperimentTemplateTargetInput(input?: s.CreateExperimentTemplateTargetInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    resourceType: input["resourceType"],
    resourceArns: input["resourceArns"],
    resourceTags: input["resourceTags"],
    filters: input["filters"]?.map(x => fromExperimentTemplateTargetInputFilter(x)),
    selectionMode: input["selectionMode"],
  }
}

function fromExperimentTemplateTargetInputFilter(input?: s.ExperimentTemplateTargetInputFilter | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    path: input["path"],
    values: input["values"],
  }
}

function fromCreateExperimentTemplateActionInput(input?: s.CreateExperimentTemplateActionInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    actionId: input["actionId"],
    description: input["description"],
    parameters: input["parameters"],
    targets: input["targets"],
    startAfter: input["startAfter"],
  }
}

function fromUpdateExperimentTemplateStopConditionInput(input?: s.UpdateExperimentTemplateStopConditionInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    source: input["source"],
    value: input["value"],
  }
}

function fromUpdateExperimentTemplateTargetInput(input?: s.UpdateExperimentTemplateTargetInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    resourceType: input["resourceType"],
    resourceArns: input["resourceArns"],
    resourceTags: input["resourceTags"],
    filters: input["filters"]?.map(x => fromExperimentTemplateTargetInputFilter(x)),
    selectionMode: input["selectionMode"],
  }
}

function fromUpdateExperimentTemplateActionInputItem(input?: s.UpdateExperimentTemplateActionInputItem | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    actionId: input["actionId"],
    description: input["description"],
    parameters: input["parameters"],
    targets: input["targets"],
    startAfter: input["startAfter"],
  }
}

function toExperimentTemplate(root: jsonP.JSONValue): s.ExperimentTemplate {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "description": "s",
      "targets": x => jsonP.readMap(String, toExperimentTemplateTarget, x),
      "actions": x => jsonP.readMap(String, toExperimentTemplateAction, x),
      "stopConditions": [toExperimentTemplateStopCondition],
      "creationTime": "d",
      "lastUpdateTime": "d",
      "roleArn": "s",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toExperimentTemplateTarget(root: jsonP.JSONValue): s.ExperimentTemplateTarget {
  return jsonP.readObj({
    required: {},
    optional: {
      "resourceType": "s",
      "resourceArns": ["s"],
      "resourceTags": x => jsonP.readMap(String, String, x),
      "filters": [toExperimentTemplateTargetFilter],
      "selectionMode": "s",
    },
  }, root);
}

function toExperimentTemplateTargetFilter(root: jsonP.JSONValue): s.ExperimentTemplateTargetFilter {
  return jsonP.readObj({
    required: {},
    optional: {
      "path": "s",
      "values": ["s"],
    },
  }, root);
}

function toExperimentTemplateAction(root: jsonP.JSONValue): s.ExperimentTemplateAction {
  return jsonP.readObj({
    required: {},
    optional: {
      "actionId": "s",
      "description": "s",
      "parameters": x => jsonP.readMap(String, String, x),
      "targets": x => jsonP.readMap(String, String, x),
      "startAfter": ["s"],
    },
  }, root);
}

function toExperimentTemplateStopCondition(root: jsonP.JSONValue): s.ExperimentTemplateStopCondition {
  return jsonP.readObj({
    required: {},
    optional: {
      "source": "s",
      "value": "s",
    },
  }, root);
}

function toAction(root: jsonP.JSONValue): s.Action {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "description": "s",
      "parameters": x => jsonP.readMap(String, toActionParameter, x),
      "targets": x => jsonP.readMap(String, toActionTarget, x),
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toActionParameter(root: jsonP.JSONValue): s.ActionParameter {
  return jsonP.readObj({
    required: {},
    optional: {
      "description": "s",
      "required": "b",
    },
  }, root);
}

function toActionTarget(root: jsonP.JSONValue): s.ActionTarget {
  return jsonP.readObj({
    required: {},
    optional: {
      "resourceType": "s",
    },
  }, root);
}

function toExperiment(root: jsonP.JSONValue): s.Experiment {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "experimentTemplateId": "s",
      "roleArn": "s",
      "state": toExperimentState,
      "targets": x => jsonP.readMap(String, toExperimentTarget, x),
      "actions": x => jsonP.readMap(String, toExperimentAction, x),
      "stopConditions": [toExperimentStopCondition],
      "creationTime": "d",
      "startTime": "d",
      "endTime": "d",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toExperimentState(root: jsonP.JSONValue): s.ExperimentState {
  return jsonP.readObj({
    required: {},
    optional: {
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<s.ExperimentStatus>(x),
      "reason": "s",
    },
  }, root);
}

function toExperimentTarget(root: jsonP.JSONValue): s.ExperimentTarget {
  return jsonP.readObj({
    required: {},
    optional: {
      "resourceType": "s",
      "resourceArns": ["s"],
      "resourceTags": x => jsonP.readMap(String, String, x),
      "filters": [toExperimentTargetFilter],
      "selectionMode": "s",
    },
  }, root);
}

function toExperimentTargetFilter(root: jsonP.JSONValue): s.ExperimentTargetFilter {
  return jsonP.readObj({
    required: {},
    optional: {
      "path": "s",
      "values": ["s"],
    },
  }, root);
}

function toExperimentAction(root: jsonP.JSONValue): s.ExperimentAction {
  return jsonP.readObj({
    required: {},
    optional: {
      "actionId": "s",
      "description": "s",
      "parameters": x => jsonP.readMap(String, String, x),
      "targets": x => jsonP.readMap(String, String, x),
      "startAfter": ["s"],
      "state": toExperimentActionState,
    },
  }, root);
}

function toExperimentActionState(root: jsonP.JSONValue): s.ExperimentActionState {
  return jsonP.readObj({
    required: {},
    optional: {
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<s.ExperimentActionStatus>(x),
      "reason": "s",
    },
  }, root);
}

function toExperimentStopCondition(root: jsonP.JSONValue): s.ExperimentStopCondition {
  return jsonP.readObj({
    required: {},
    optional: {
      "source": "s",
      "value": "s",
    },
  }, root);
}

function toActionSummary(root: jsonP.JSONValue): s.ActionSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "description": "s",
      "targets": x => jsonP.readMap(String, toActionTarget, x),
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toExperimentTemplateSummary(root: jsonP.JSONValue): s.ExperimentTemplateSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "description": "s",
      "creationTime": "d",
      "lastUpdateTime": "d",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}

function toExperimentSummary(root: jsonP.JSONValue): s.ExperimentSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "id": "s",
      "experimentTemplateId": "s",
      "state": toExperimentState,
      "creationTime": "d",
      "tags": x => jsonP.readMap(String, String, x),
    },
  }, root);
}
