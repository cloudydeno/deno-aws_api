// Autogenerated API client for: Amazon Polly

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class Polly {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Polly.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2016-06-10",
    "endpointPrefix": "polly",
    "protocol": "rest-json",
    "serviceFullName": "Amazon Polly",
    "serviceId": "Polly",
    "signatureVersion": "v4",
    "uid": "polly-2016-06-10"
  };

  async deleteLexicon(
    {abortSignal, ...params}: RequestConfig & s.DeleteLexiconInput,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteLexicon",
      method: "DELETE",
      requestUri: cmnP.encodePath`/v1/lexicons/${params["Name"]}`,
      responseCode: 200,
    });
    await resp.text();
  }

  async describeVoices(
    {abortSignal, ...params}: RequestConfig & s.DescribeVoicesInput = {},
  ): Promise<s.DescribeVoicesOutput> {
    const query = new URLSearchParams;
    if (params["Engine"] != null) query.set("Engine", params["Engine"]?.toString() ?? "");
    if (params["LanguageCode"] != null) query.set("LanguageCode", params["LanguageCode"]?.toString() ?? "");
    if (params["IncludeAdditionalLanguageCodes"] != null) query.set("IncludeAdditionalLanguageCodes", params["IncludeAdditionalLanguageCodes"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeVoices",
      method: "GET",
      requestUri: "/v1/voices",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Voices": [toVoice],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async getLexicon(
    {abortSignal, ...params}: RequestConfig & s.GetLexiconInput,
  ): Promise<s.GetLexiconOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetLexicon",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/lexicons/${params["Name"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Lexicon": toLexicon,
        "LexiconAttributes": toLexiconAttributes,
      },
    }, await resp.json());
  }

  async getSpeechSynthesisTask(
    {abortSignal, ...params}: RequestConfig & s.GetSpeechSynthesisTaskInput,
  ): Promise<s.GetSpeechSynthesisTaskOutput> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "GetSpeechSynthesisTask",
      method: "GET",
      requestUri: cmnP.encodePath`/v1/synthesisTasks/${params["TaskId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "SynthesisTask": toSynthesisTask,
      },
    }, await resp.json());
  }

  async listLexicons(
    {abortSignal, ...params}: RequestConfig & s.ListLexiconsInput = {},
  ): Promise<s.ListLexiconsOutput> {
    const query = new URLSearchParams;
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListLexicons",
      method: "GET",
      requestUri: "/v1/lexicons",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Lexicons": [toLexiconDescription],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async listSpeechSynthesisTasks(
    {abortSignal, ...params}: RequestConfig & s.ListSpeechSynthesisTasksInput = {},
  ): Promise<s.ListSpeechSynthesisTasksOutput> {
    const query = new URLSearchParams;
    if (params["MaxResults"] != null) query.set("MaxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    if (params["Status"] != null) query.set("Status", params["Status"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListSpeechSynthesisTasks",
      method: "GET",
      requestUri: "/v1/synthesisTasks",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "SynthesisTasks": [toSynthesisTask],
      },
    }, await resp.json());
  }

  async putLexicon(
    {abortSignal, ...params}: RequestConfig & s.PutLexiconInput,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Content: params["Content"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutLexicon",
      method: "PUT",
      requestUri: cmnP.encodePath`/v1/lexicons/${params["Name"]}`,
      responseCode: 200,
    });
    await resp.text();
  }

  async startSpeechSynthesisTask(
    {abortSignal, ...params}: RequestConfig & s.StartSpeechSynthesisTaskInput,
  ): Promise<s.StartSpeechSynthesisTaskOutput> {
    const body: jsonP.JSONObject = {
      Engine: params["Engine"],
      LanguageCode: params["LanguageCode"],
      LexiconNames: params["LexiconNames"],
      OutputFormat: params["OutputFormat"],
      OutputS3BucketName: params["OutputS3BucketName"],
      OutputS3KeyPrefix: params["OutputS3KeyPrefix"],
      SampleRate: params["SampleRate"],
      SnsTopicArn: params["SnsTopicArn"],
      SpeechMarkTypes: params["SpeechMarkTypes"],
      Text: params["Text"],
      TextType: params["TextType"],
      VoiceId: params["VoiceId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartSpeechSynthesisTask",
      requestUri: "/v1/synthesisTasks",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "SynthesisTask": toSynthesisTask,
      },
    }, await resp.json());
  }

  async synthesizeSpeech(
    {abortSignal, ...params}: RequestConfig & s.SynthesizeSpeechInput,
  ): Promise<s.SynthesizeSpeechOutput> {
    const body: jsonP.JSONObject = {
      Engine: params["Engine"],
      LanguageCode: params["LanguageCode"],
      LexiconNames: params["LexiconNames"],
      OutputFormat: params["OutputFormat"],
      SampleRate: params["SampleRate"],
      SpeechMarkTypes: params["SpeechMarkTypes"],
      Text: params["Text"],
      TextType: params["TextType"],
      VoiceId: params["VoiceId"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SynthesizeSpeech",
      requestUri: "/v1/speech",
      responseCode: 200,
    });
    return {
      ContentType: resp.headers.get("Content-Type"),
      RequestCharacters: cmnP.readNum(resp.headers.get("x-amzn-RequestCharacters")),
      AudioStream: await resp.text(), // TODO: maybe allow proper body streaming,
    };
  }

}

function toVoice(root: jsonP.JSONValue): s.Voice {
  return jsonP.readObj({
    required: {},
    optional: {
      "Gender": (x: jsonP.JSONValue) => cmnP.readEnum<s.Gender>(x),
      "Id": (x: jsonP.JSONValue) => cmnP.readEnum<s.VoiceId>(x),
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "LanguageName": "s",
      "Name": "s",
      "AdditionalLanguageCodes": [(x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x)],
      "SupportedEngines": [(x: jsonP.JSONValue) => cmnP.readEnum<s.Engine>(x)],
    },
  }, root);
}

function toLexicon(root: jsonP.JSONValue): s.Lexicon {
  return jsonP.readObj({
    required: {},
    optional: {
      "Content": "s",
      "Name": "s",
    },
  }, root);
}

function toLexiconAttributes(root: jsonP.JSONValue): s.LexiconAttributes {
  return jsonP.readObj({
    required: {},
    optional: {
      "Alphabet": "s",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "LastModified": "d",
      "LexiconArn": "s",
      "LexemesCount": "n",
      "Size": "n",
    },
  }, root);
}

function toSynthesisTask(root: jsonP.JSONValue): s.SynthesisTask {
  return jsonP.readObj({
    required: {},
    optional: {
      "Engine": (x: jsonP.JSONValue) => cmnP.readEnum<s.Engine>(x),
      "TaskId": "s",
      "TaskStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TaskStatus>(x),
      "TaskStatusReason": "s",
      "OutputUri": "s",
      "CreationTime": "d",
      "RequestCharacters": "n",
      "SnsTopicArn": "s",
      "LexiconNames": ["s"],
      "OutputFormat": (x: jsonP.JSONValue) => cmnP.readEnum<s.OutputFormat>(x),
      "SampleRate": "s",
      "SpeechMarkTypes": [(x: jsonP.JSONValue) => cmnP.readEnum<s.SpeechMarkType>(x)],
      "TextType": (x: jsonP.JSONValue) => cmnP.readEnum<s.TextType>(x),
      "VoiceId": (x: jsonP.JSONValue) => cmnP.readEnum<s.VoiceId>(x),
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
    },
  }, root);
}

function toLexiconDescription(root: jsonP.JSONValue): s.LexiconDescription {
  return jsonP.readObj({
    required: {},
    optional: {
      "Name": "s",
      "Attributes": toLexiconAttributes,
    },
  }, root);
}
