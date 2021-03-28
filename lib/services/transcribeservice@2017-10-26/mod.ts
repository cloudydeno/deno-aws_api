// Autogenerated API client for: Amazon Transcribe Service

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";

export default class TranscribeService {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(TranscribeService.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2017-10-26",
    "endpointPrefix": "transcribe",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "Amazon Transcribe Service",
    "serviceId": "Transcribe",
    "signatureVersion": "v4",
    "signingName": "transcribe",
    "targetPrefix": "Transcribe",
    "uid": "transcribe-2017-10-26"
  };

  async createLanguageModel(
    {abortSignal, ...params}: RequestConfig & s.CreateLanguageModelRequest,
  ): Promise<s.CreateLanguageModelResponse> {
    const body: jsonP.JSONObject = {
      LanguageCode: params["LanguageCode"],
      BaseModelName: params["BaseModelName"],
      ModelName: params["ModelName"],
      InputDataConfig: fromInputDataConfig(params["InputDataConfig"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLanguageModel",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.CLMLanguageCode>(x),
        "BaseModelName": (x: jsonP.JSONValue) => cmnP.readEnum<s.BaseModelName>(x),
        "ModelName": "s",
        "InputDataConfig": toInputDataConfig,
        "ModelStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.ModelStatus>(x),
      },
    }, await resp.json());
  }

  async createMedicalVocabulary(
    {abortSignal, ...params}: RequestConfig & s.CreateMedicalVocabularyRequest,
  ): Promise<s.CreateMedicalVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
      LanguageCode: params["LanguageCode"],
      VocabularyFileUri: params["VocabularyFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateMedicalVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "LastModifiedTime": "d",
        "FailureReason": "s",
      },
    }, await resp.json());
  }

  async createVocabulary(
    {abortSignal, ...params}: RequestConfig & s.CreateVocabularyRequest,
  ): Promise<s.CreateVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
      LanguageCode: params["LanguageCode"],
      Phrases: params["Phrases"],
      VocabularyFileUri: params["VocabularyFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "LastModifiedTime": "d",
        "FailureReason": "s",
      },
    }, await resp.json());
  }

  async createVocabularyFilter(
    {abortSignal, ...params}: RequestConfig & s.CreateVocabularyFilterRequest,
  ): Promise<s.CreateVocabularyFilterResponse> {
    const body: jsonP.JSONObject = {
      VocabularyFilterName: params["VocabularyFilterName"],
      LanguageCode: params["LanguageCode"],
      Words: params["Words"],
      VocabularyFilterFileUri: params["VocabularyFilterFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateVocabularyFilter",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyFilterName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "LastModifiedTime": "d",
      },
    }, await resp.json());
  }

  async deleteLanguageModel(
    {abortSignal, ...params}: RequestConfig & s.DeleteLanguageModelRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      ModelName: params["ModelName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLanguageModel",
    });
    await resp.text();
  }

  async deleteMedicalTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.DeleteMedicalTranscriptionJobRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      MedicalTranscriptionJobName: params["MedicalTranscriptionJobName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteMedicalTranscriptionJob",
    });
    await resp.text();
  }

  async deleteMedicalVocabulary(
    {abortSignal, ...params}: RequestConfig & s.DeleteMedicalVocabularyRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteMedicalVocabulary",
    });
    await resp.text();
  }

  async deleteTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.DeleteTranscriptionJobRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      TranscriptionJobName: params["TranscriptionJobName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteTranscriptionJob",
    });
    await resp.text();
  }

  async deleteVocabulary(
    {abortSignal, ...params}: RequestConfig & s.DeleteVocabularyRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteVocabulary",
    });
    await resp.text();
  }

  async deleteVocabularyFilter(
    {abortSignal, ...params}: RequestConfig & s.DeleteVocabularyFilterRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      VocabularyFilterName: params["VocabularyFilterName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteVocabularyFilter",
    });
    await resp.text();
  }

  async describeLanguageModel(
    {abortSignal, ...params}: RequestConfig & s.DescribeLanguageModelRequest,
  ): Promise<s.DescribeLanguageModelResponse> {
    const body: jsonP.JSONObject = {
      ModelName: params["ModelName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeLanguageModel",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LanguageModel": toLanguageModel,
      },
    }, await resp.json());
  }

  async getMedicalTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.GetMedicalTranscriptionJobRequest,
  ): Promise<s.GetMedicalTranscriptionJobResponse> {
    const body: jsonP.JSONObject = {
      MedicalTranscriptionJobName: params["MedicalTranscriptionJobName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetMedicalTranscriptionJob",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "MedicalTranscriptionJob": toMedicalTranscriptionJob,
      },
    }, await resp.json());
  }

  async getMedicalVocabulary(
    {abortSignal, ...params}: RequestConfig & s.GetMedicalVocabularyRequest,
  ): Promise<s.GetMedicalVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetMedicalVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "LastModifiedTime": "d",
        "FailureReason": "s",
        "DownloadUri": "s",
      },
    }, await resp.json());
  }

  async getTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.GetTranscriptionJobRequest,
  ): Promise<s.GetTranscriptionJobResponse> {
    const body: jsonP.JSONObject = {
      TranscriptionJobName: params["TranscriptionJobName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetTranscriptionJob",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TranscriptionJob": toTranscriptionJob,
      },
    }, await resp.json());
  }

  async getVocabulary(
    {abortSignal, ...params}: RequestConfig & s.GetVocabularyRequest,
  ): Promise<s.GetVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "LastModifiedTime": "d",
        "FailureReason": "s",
        "DownloadUri": "s",
      },
    }, await resp.json());
  }

  async getVocabularyFilter(
    {abortSignal, ...params}: RequestConfig & s.GetVocabularyFilterRequest,
  ): Promise<s.GetVocabularyFilterResponse> {
    const body: jsonP.JSONObject = {
      VocabularyFilterName: params["VocabularyFilterName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetVocabularyFilter",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyFilterName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "LastModifiedTime": "d",
        "DownloadUri": "s",
      },
    }, await resp.json());
  }

  async listLanguageModels(
    {abortSignal, ...params}: RequestConfig & s.ListLanguageModelsRequest = {},
  ): Promise<s.ListLanguageModelsResponse> {
    const body: jsonP.JSONObject = {
      StatusEquals: params["StatusEquals"],
      NameContains: params["NameContains"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListLanguageModels",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "Models": [toLanguageModel],
      },
    }, await resp.json());
  }

  async listMedicalTranscriptionJobs(
    {abortSignal, ...params}: RequestConfig & s.ListMedicalTranscriptionJobsRequest = {},
  ): Promise<s.ListMedicalTranscriptionJobsResponse> {
    const body: jsonP.JSONObject = {
      Status: params["Status"],
      JobNameContains: params["JobNameContains"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListMedicalTranscriptionJobs",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
        "NextToken": "s",
        "MedicalTranscriptionJobSummaries": [toMedicalTranscriptionJobSummary],
      },
    }, await resp.json());
  }

  async listMedicalVocabularies(
    {abortSignal, ...params}: RequestConfig & s.ListMedicalVocabulariesRequest = {},
  ): Promise<s.ListMedicalVocabulariesResponse> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
      StateEquals: params["StateEquals"],
      NameContains: params["NameContains"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListMedicalVocabularies",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "NextToken": "s",
        "Vocabularies": [toVocabularyInfo],
      },
    }, await resp.json());
  }

  async listTranscriptionJobs(
    {abortSignal, ...params}: RequestConfig & s.ListTranscriptionJobsRequest = {},
  ): Promise<s.ListTranscriptionJobsResponse> {
    const body: jsonP.JSONObject = {
      Status: params["Status"],
      JobNameContains: params["JobNameContains"],
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTranscriptionJobs",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
        "NextToken": "s",
        "TranscriptionJobSummaries": [toTranscriptionJobSummary],
      },
    }, await resp.json());
  }

  async listVocabularies(
    {abortSignal, ...params}: RequestConfig & s.ListVocabulariesRequest = {},
  ): Promise<s.ListVocabulariesResponse> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
      StateEquals: params["StateEquals"],
      NameContains: params["NameContains"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListVocabularies",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
        "NextToken": "s",
        "Vocabularies": [toVocabularyInfo],
      },
    }, await resp.json());
  }

  async listVocabularyFilters(
    {abortSignal, ...params}: RequestConfig & s.ListVocabularyFiltersRequest = {},
  ): Promise<s.ListVocabularyFiltersResponse> {
    const body: jsonP.JSONObject = {
      NextToken: params["NextToken"],
      MaxResults: params["MaxResults"],
      NameContains: params["NameContains"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListVocabularyFilters",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "NextToken": "s",
        "VocabularyFilters": [toVocabularyFilterInfo],
      },
    }, await resp.json());
  }

  async startMedicalTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.StartMedicalTranscriptionJobRequest,
  ): Promise<s.StartMedicalTranscriptionJobResponse> {
    const body: jsonP.JSONObject = {
      MedicalTranscriptionJobName: params["MedicalTranscriptionJobName"],
      LanguageCode: params["LanguageCode"],
      MediaSampleRateHertz: params["MediaSampleRateHertz"],
      MediaFormat: params["MediaFormat"],
      Media: fromMedia(params["Media"]),
      OutputBucketName: params["OutputBucketName"],
      OutputKey: params["OutputKey"],
      OutputEncryptionKMSKeyId: params["OutputEncryptionKMSKeyId"],
      Settings: fromMedicalTranscriptionSetting(params["Settings"]),
      Specialty: params["Specialty"],
      Type: params["Type"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartMedicalTranscriptionJob",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "MedicalTranscriptionJob": toMedicalTranscriptionJob,
      },
    }, await resp.json());
  }

  async startTranscriptionJob(
    {abortSignal, ...params}: RequestConfig & s.StartTranscriptionJobRequest,
  ): Promise<s.StartTranscriptionJobResponse> {
    const body: jsonP.JSONObject = {
      TranscriptionJobName: params["TranscriptionJobName"],
      LanguageCode: params["LanguageCode"],
      MediaSampleRateHertz: params["MediaSampleRateHertz"],
      MediaFormat: params["MediaFormat"],
      Media: fromMedia(params["Media"]),
      OutputBucketName: params["OutputBucketName"],
      OutputKey: params["OutputKey"],
      OutputEncryptionKMSKeyId: params["OutputEncryptionKMSKeyId"],
      Settings: fromSettings(params["Settings"]),
      ModelSettings: fromModelSettings(params["ModelSettings"]),
      JobExecutionSettings: fromJobExecutionSettings(params["JobExecutionSettings"]),
      ContentRedaction: fromContentRedaction(params["ContentRedaction"]),
      IdentifyLanguage: params["IdentifyLanguage"],
      LanguageOptions: params["LanguageOptions"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "StartTranscriptionJob",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "TranscriptionJob": toTranscriptionJob,
      },
    }, await resp.json());
  }

  async updateMedicalVocabulary(
    {abortSignal, ...params}: RequestConfig & s.UpdateMedicalVocabularyRequest,
  ): Promise<s.UpdateMedicalVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
      LanguageCode: params["LanguageCode"],
      VocabularyFileUri: params["VocabularyFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateMedicalVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "LastModifiedTime": "d",
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
      },
    }, await resp.json());
  }

  async updateVocabulary(
    {abortSignal, ...params}: RequestConfig & s.UpdateVocabularyRequest,
  ): Promise<s.UpdateVocabularyResponse> {
    const body: jsonP.JSONObject = {
      VocabularyName: params["VocabularyName"],
      LanguageCode: params["LanguageCode"],
      Phrases: params["Phrases"],
      VocabularyFileUri: params["VocabularyFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateVocabulary",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "LastModifiedTime": "d",
        "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
      },
    }, await resp.json());
  }

  async updateVocabularyFilter(
    {abortSignal, ...params}: RequestConfig & s.UpdateVocabularyFilterRequest,
  ): Promise<s.UpdateVocabularyFilterResponse> {
    const body: jsonP.JSONObject = {
      VocabularyFilterName: params["VocabularyFilterName"],
      Words: params["Words"],
      VocabularyFilterFileUri: params["VocabularyFilterFileUri"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateVocabularyFilter",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "VocabularyFilterName": "s",
        "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
        "LastModifiedTime": "d",
      },
    }, await resp.json());
  }

}

function fromInputDataConfig(input?: s.InputDataConfig | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    S3Uri: input["S3Uri"],
    TuningDataS3Uri: input["TuningDataS3Uri"],
    DataAccessRoleArn: input["DataAccessRoleArn"],
  }
}
function toInputDataConfig(root: jsonP.JSONValue): s.InputDataConfig {
  return jsonP.readObj({
    required: {
      "S3Uri": "s",
      "DataAccessRoleArn": "s",
    },
    optional: {
      "TuningDataS3Uri": "s",
    },
  }, root);
}

function fromMedia(input?: s.Media | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    MediaFileUri: input["MediaFileUri"],
  }
}
function toMedia(root: jsonP.JSONValue): s.Media {
  return jsonP.readObj({
    required: {},
    optional: {
      "MediaFileUri": "s",
    },
  }, root);
}

function fromMedicalTranscriptionSetting(input?: s.MedicalTranscriptionSetting | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    ShowSpeakerLabels: input["ShowSpeakerLabels"],
    MaxSpeakerLabels: input["MaxSpeakerLabels"],
    ChannelIdentification: input["ChannelIdentification"],
    ShowAlternatives: input["ShowAlternatives"],
    MaxAlternatives: input["MaxAlternatives"],
    VocabularyName: input["VocabularyName"],
  }
}
function toMedicalTranscriptionSetting(root: jsonP.JSONValue): s.MedicalTranscriptionSetting {
  return jsonP.readObj({
    required: {},
    optional: {
      "ShowSpeakerLabels": "b",
      "MaxSpeakerLabels": "n",
      "ChannelIdentification": "b",
      "ShowAlternatives": "b",
      "MaxAlternatives": "n",
      "VocabularyName": "s",
    },
  }, root);
}

function fromSettings(input?: s.Settings | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    VocabularyName: input["VocabularyName"],
    ShowSpeakerLabels: input["ShowSpeakerLabels"],
    MaxSpeakerLabels: input["MaxSpeakerLabels"],
    ChannelIdentification: input["ChannelIdentification"],
    ShowAlternatives: input["ShowAlternatives"],
    MaxAlternatives: input["MaxAlternatives"],
    VocabularyFilterName: input["VocabularyFilterName"],
    VocabularyFilterMethod: input["VocabularyFilterMethod"],
  }
}
function toSettings(root: jsonP.JSONValue): s.Settings {
  return jsonP.readObj({
    required: {},
    optional: {
      "VocabularyName": "s",
      "ShowSpeakerLabels": "b",
      "MaxSpeakerLabels": "n",
      "ChannelIdentification": "b",
      "ShowAlternatives": "b",
      "MaxAlternatives": "n",
      "VocabularyFilterName": "s",
      "VocabularyFilterMethod": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyFilterMethod>(x),
    },
  }, root);
}

function fromModelSettings(input?: s.ModelSettings | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    LanguageModelName: input["LanguageModelName"],
  }
}
function toModelSettings(root: jsonP.JSONValue): s.ModelSettings {
  return jsonP.readObj({
    required: {},
    optional: {
      "LanguageModelName": "s",
    },
  }, root);
}

function fromJobExecutionSettings(input?: s.JobExecutionSettings | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    AllowDeferredExecution: input["AllowDeferredExecution"],
    DataAccessRoleArn: input["DataAccessRoleArn"],
  }
}
function toJobExecutionSettings(root: jsonP.JSONValue): s.JobExecutionSettings {
  return jsonP.readObj({
    required: {},
    optional: {
      "AllowDeferredExecution": "b",
      "DataAccessRoleArn": "s",
    },
  }, root);
}

function fromContentRedaction(input?: s.ContentRedaction | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    RedactionType: input["RedactionType"],
    RedactionOutput: input["RedactionOutput"],
  }
}
function toContentRedaction(root: jsonP.JSONValue): s.ContentRedaction {
  return jsonP.readObj({
    required: {
      "RedactionType": (x: jsonP.JSONValue) => cmnP.readEnum<s.RedactionType>(x),
      "RedactionOutput": (x: jsonP.JSONValue) => cmnP.readEnum<s.RedactionOutput>(x),
    },
    optional: {},
  }, root);
}

function toLanguageModel(root: jsonP.JSONValue): s.LanguageModel {
  return jsonP.readObj({
    required: {},
    optional: {
      "ModelName": "s",
      "CreateTime": "d",
      "LastModifiedTime": "d",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.CLMLanguageCode>(x),
      "BaseModelName": (x: jsonP.JSONValue) => cmnP.readEnum<s.BaseModelName>(x),
      "ModelStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.ModelStatus>(x),
      "UpgradeAvailability": "b",
      "FailureReason": "s",
      "InputDataConfig": toInputDataConfig,
    },
  }, root);
}

function toMedicalTranscriptionJob(root: jsonP.JSONValue): s.MedicalTranscriptionJob {
  return jsonP.readObj({
    required: {},
    optional: {
      "MedicalTranscriptionJobName": "s",
      "TranscriptionJobStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "MediaSampleRateHertz": "n",
      "MediaFormat": (x: jsonP.JSONValue) => cmnP.readEnum<s.MediaFormat>(x),
      "Media": toMedia,
      "Transcript": toMedicalTranscript,
      "StartTime": "d",
      "CreationTime": "d",
      "CompletionTime": "d",
      "FailureReason": "s",
      "Settings": toMedicalTranscriptionSetting,
      "Specialty": (x: jsonP.JSONValue) => cmnP.readEnum<s.Specialty>(x),
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.Type>(x),
    },
  }, root);
}

function toMedicalTranscript(root: jsonP.JSONValue): s.MedicalTranscript {
  return jsonP.readObj({
    required: {},
    optional: {
      "TranscriptFileUri": "s",
    },
  }, root);
}

function toTranscriptionJob(root: jsonP.JSONValue): s.TranscriptionJob {
  return jsonP.readObj({
    required: {},
    optional: {
      "TranscriptionJobName": "s",
      "TranscriptionJobStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "MediaSampleRateHertz": "n",
      "MediaFormat": (x: jsonP.JSONValue) => cmnP.readEnum<s.MediaFormat>(x),
      "Media": toMedia,
      "Transcript": toTranscript,
      "StartTime": "d",
      "CreationTime": "d",
      "CompletionTime": "d",
      "FailureReason": "s",
      "Settings": toSettings,
      "ModelSettings": toModelSettings,
      "JobExecutionSettings": toJobExecutionSettings,
      "ContentRedaction": toContentRedaction,
      "IdentifyLanguage": "b",
      "LanguageOptions": [(x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x)],
      "IdentifiedLanguageScore": "n",
    },
  }, root);
}

function toTranscript(root: jsonP.JSONValue): s.Transcript {
  return jsonP.readObj({
    required: {},
    optional: {
      "TranscriptFileUri": "s",
      "RedactedTranscriptFileUri": "s",
    },
  }, root);
}

function toMedicalTranscriptionJobSummary(root: jsonP.JSONValue): s.MedicalTranscriptionJobSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "MedicalTranscriptionJobName": "s",
      "CreationTime": "d",
      "StartTime": "d",
      "CompletionTime": "d",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "TranscriptionJobStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
      "FailureReason": "s",
      "OutputLocationType": (x: jsonP.JSONValue) => cmnP.readEnum<s.OutputLocationType>(x),
      "Specialty": (x: jsonP.JSONValue) => cmnP.readEnum<s.Specialty>(x),
      "Type": (x: jsonP.JSONValue) => cmnP.readEnum<s.Type>(x),
    },
  }, root);
}

function toVocabularyInfo(root: jsonP.JSONValue): s.VocabularyInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "VocabularyName": "s",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "LastModifiedTime": "d",
      "VocabularyState": (x: jsonP.JSONValue) => cmnP.readEnum<s.VocabularyState>(x),
    },
  }, root);
}

function toTranscriptionJobSummary(root: jsonP.JSONValue): s.TranscriptionJobSummary {
  return jsonP.readObj({
    required: {},
    optional: {
      "TranscriptionJobName": "s",
      "CreationTime": "d",
      "StartTime": "d",
      "CompletionTime": "d",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "TranscriptionJobStatus": (x: jsonP.JSONValue) => cmnP.readEnum<s.TranscriptionJobStatus>(x),
      "FailureReason": "s",
      "OutputLocationType": (x: jsonP.JSONValue) => cmnP.readEnum<s.OutputLocationType>(x),
      "ContentRedaction": toContentRedaction,
      "ModelSettings": toModelSettings,
      "IdentifyLanguage": "b",
      "IdentifiedLanguageScore": "n",
    },
  }, root);
}

function toVocabularyFilterInfo(root: jsonP.JSONValue): s.VocabularyFilterInfo {
  return jsonP.readObj({
    required: {},
    optional: {
      "VocabularyFilterName": "s",
      "LanguageCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LanguageCode>(x),
      "LastModifiedTime": "d",
    },
  }, root);
}
