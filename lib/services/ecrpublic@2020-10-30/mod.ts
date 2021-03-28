// Autogenerated API client for: Amazon Elastic Container Registry Public

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as Base64 from "https://deno.land/std@0.91.0/encoding/base64.ts";
import * as client from "../../client/common.ts";
import * as cmnP from "../../encoding/common.ts";
import * as jsonP from "../../encoding/json.ts";
import type * as s from "./structs.ts";
function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (input == null) return input;
  return Base64.encode(input);
}

export default class ECRPUBLIC {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ECRPUBLIC.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2020-10-30",
    "endpointPrefix": "api.ecr-public",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceAbbreviation": "Amazon ECR Public",
    "serviceFullName": "Amazon Elastic Container Registry Public",
    "serviceId": "ECR PUBLIC",
    "signatureVersion": "v4",
    "signingName": "ecr-public",
    "targetPrefix": "SpencerFrontendService",
    "uid": "ecr-public-2020-10-30"
  };

  async batchCheckLayerAvailability(
    {abortSignal, ...params}: RequestConfig & s.BatchCheckLayerAvailabilityRequest,
  ): Promise<s.BatchCheckLayerAvailabilityResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      layerDigests: params["layerDigests"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchCheckLayerAvailability",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "layers": [toLayer],
        "failures": [toLayerFailure],
      },
    }, await resp.json());
  }

  async batchDeleteImage(
    {abortSignal, ...params}: RequestConfig & s.BatchDeleteImageRequest,
  ): Promise<s.BatchDeleteImageResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      imageIds: params["imageIds"]?.map(x => fromImageIdentifier(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "BatchDeleteImage",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "imageIds": [toImageIdentifier],
        "failures": [toImageFailure],
      },
    }, await resp.json());
  }

  async completeLayerUpload(
    {abortSignal, ...params}: RequestConfig & s.CompleteLayerUploadRequest,
  ): Promise<s.CompleteLayerUploadResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      uploadId: params["uploadId"],
      layerDigests: params["layerDigests"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CompleteLayerUpload",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "registryId": "s",
        "repositoryName": "s",
        "uploadId": "s",
        "layerDigest": "s",
      },
    }, await resp.json());
  }

  async createRepository(
    {abortSignal, ...params}: RequestConfig & s.CreateRepositoryRequest,
  ): Promise<s.CreateRepositoryResponse> {
    const body: jsonP.JSONObject = {
      repositoryName: params["repositoryName"],
      catalogData: fromRepositoryCatalogDataInput(params["catalogData"]),
      tags: params["tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateRepository",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "repository": toRepository,
        "catalogData": toRepositoryCatalogData,
      },
    }, await resp.json());
  }

  async deleteRepository(
    {abortSignal, ...params}: RequestConfig & s.DeleteRepositoryRequest,
  ): Promise<s.DeleteRepositoryResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      force: params["force"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteRepository",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "repository": toRepository,
      },
    }, await resp.json());
  }

  async deleteRepositoryPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteRepositoryPolicyRequest,
  ): Promise<s.DeleteRepositoryPolicyResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteRepositoryPolicy",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "registryId": "s",
        "repositoryName": "s",
        "policyText": "s",
      },
    }, await resp.json());
  }

  async describeImageTags(
    {abortSignal, ...params}: RequestConfig & s.DescribeImageTagsRequest,
  ): Promise<s.DescribeImageTagsResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeImageTags",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "imageTagDetails": [toImageTagDetail],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async describeImages(
    {abortSignal, ...params}: RequestConfig & s.DescribeImagesRequest,
  ): Promise<s.DescribeImagesResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      imageIds: params["imageIds"]?.map(x => fromImageIdentifier(x)),
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeImages",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "imageDetails": [toImageDetail],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async describeRegistries(
    {abortSignal, ...params}: RequestConfig & s.DescribeRegistriesRequest = {},
  ): Promise<s.DescribeRegistriesResponse> {
    const body: jsonP.JSONObject = {
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeRegistries",
    });
    return jsonP.readObj({
      required: {
        "registries": [toRegistry],
      },
      optional: {
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async describeRepositories(
    {abortSignal, ...params}: RequestConfig & s.DescribeRepositoriesRequest = {},
  ): Promise<s.DescribeRepositoriesResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryNames: params["repositoryNames"],
      nextToken: params["nextToken"],
      maxResults: params["maxResults"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeRepositories",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "repositories": [toRepository],
        "nextToken": "s",
      },
    }, await resp.json());
  }

  async getAuthorizationToken(
    {abortSignal}: RequestConfig = {},
  ): Promise<s.GetAuthorizationTokenResponse> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetAuthorizationToken",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "authorizationData": toAuthorizationData,
      },
    }, await resp.json());
  }

  async getRegistryCatalogData(
    {abortSignal}: RequestConfig = {},
  ): Promise<s.GetRegistryCatalogDataResponse> {
    const body: jsonP.JSONObject = {};
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetRegistryCatalogData",
    });
    return jsonP.readObj({
      required: {
        "registryCatalogData": toRegistryCatalogData,
      },
      optional: {},
    }, await resp.json());
  }

  async getRepositoryCatalogData(
    {abortSignal, ...params}: RequestConfig & s.GetRepositoryCatalogDataRequest,
  ): Promise<s.GetRepositoryCatalogDataResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetRepositoryCatalogData",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "catalogData": toRepositoryCatalogData,
      },
    }, await resp.json());
  }

  async getRepositoryPolicy(
    {abortSignal, ...params}: RequestConfig & s.GetRepositoryPolicyRequest,
  ): Promise<s.GetRepositoryPolicyResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetRepositoryPolicy",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "registryId": "s",
        "repositoryName": "s",
        "policyText": "s",
      },
    }, await resp.json());
  }

  async initiateLayerUpload(
    {abortSignal, ...params}: RequestConfig & s.InitiateLayerUploadRequest,
  ): Promise<s.InitiateLayerUploadResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "InitiateLayerUpload",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "uploadId": "s",
        "partSize": "n",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {
    const body: jsonP.JSONObject = {
      resourceArn: params["resourceArn"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListTagsForResource",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "tags": [toTag],
      },
    }, await resp.json());
  }

  async putImage(
    {abortSignal, ...params}: RequestConfig & s.PutImageRequest,
  ): Promise<s.PutImageResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      imageManifest: params["imageManifest"],
      imageManifestMediaType: params["imageManifestMediaType"],
      imageTag: params["imageTag"],
      imageDigest: params["imageDigest"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutImage",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "image": toImage,
      },
    }, await resp.json());
  }

  async putRegistryCatalogData(
    {abortSignal, ...params}: RequestConfig & s.PutRegistryCatalogDataRequest = {},
  ): Promise<s.PutRegistryCatalogDataResponse> {
    const body: jsonP.JSONObject = {
      displayName: params["displayName"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutRegistryCatalogData",
    });
    return jsonP.readObj({
      required: {
        "registryCatalogData": toRegistryCatalogData,
      },
      optional: {},
    }, await resp.json());
  }

  async putRepositoryCatalogData(
    {abortSignal, ...params}: RequestConfig & s.PutRepositoryCatalogDataRequest,
  ): Promise<s.PutRepositoryCatalogDataResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      catalogData: fromRepositoryCatalogDataInput(params["catalogData"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutRepositoryCatalogData",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "catalogData": toRepositoryCatalogData,
      },
    }, await resp.json());
  }

  async setRepositoryPolicy(
    {abortSignal, ...params}: RequestConfig & s.SetRepositoryPolicyRequest,
  ): Promise<s.SetRepositoryPolicyResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      policyText: params["policyText"],
      force: params["force"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SetRepositoryPolicy",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "registryId": "s",
        "repositoryName": "s",
        "policyText": "s",
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      resourceArn: params["resourceArn"],
      tags: params["tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
    });
    await resp.text();
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      resourceArn: params["resourceArn"],
      tagKeys: params["tagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UntagResource",
    });
    await resp.text();
  }

  async uploadLayerPart(
    {abortSignal, ...params}: RequestConfig & s.UploadLayerPartRequest,
  ): Promise<s.UploadLayerPartResponse> {
    const body: jsonP.JSONObject = {
      registryId: params["registryId"],
      repositoryName: params["repositoryName"],
      uploadId: params["uploadId"],
      partFirstByte: params["partFirstByte"],
      partLastByte: params["partLastByte"],
      layerPartBlob: serializeBlob(params["layerPartBlob"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UploadLayerPart",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "registryId": "s",
        "repositoryName": "s",
        "uploadId": "s",
        "lastByteReceived": "n",
      },
    }, await resp.json());
  }

}

function fromImageIdentifier(input?: s.ImageIdentifier | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    imageDigest: input["imageDigest"],
    imageTag: input["imageTag"],
  }
}
function toImageIdentifier(root: jsonP.JSONValue): s.ImageIdentifier {
  return jsonP.readObj({
    required: {},
    optional: {
      "imageDigest": "s",
      "imageTag": "s",
    },
  }, root);
}

function fromRepositoryCatalogDataInput(input?: s.RepositoryCatalogDataInput | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    description: input["description"],
    architectures: input["architectures"],
    operatingSystems: input["operatingSystems"],
    logoImageBlob: serializeBlob(input["logoImageBlob"]),
    aboutText: input["aboutText"],
    usageText: input["usageText"],
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

function toLayer(root: jsonP.JSONValue): s.Layer {
  return jsonP.readObj({
    required: {},
    optional: {
      "layerDigest": "s",
      "layerAvailability": (x: jsonP.JSONValue) => cmnP.readEnum<s.LayerAvailability>(x),
      "layerSize": "n",
      "mediaType": "s",
    },
  }, root);
}

function toLayerFailure(root: jsonP.JSONValue): s.LayerFailure {
  return jsonP.readObj({
    required: {},
    optional: {
      "layerDigest": "s",
      "failureCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.LayerFailureCode>(x),
      "failureReason": "s",
    },
  }, root);
}

function toImageFailure(root: jsonP.JSONValue): s.ImageFailure {
  return jsonP.readObj({
    required: {},
    optional: {
      "imageId": toImageIdentifier,
      "failureCode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ImageFailureCode>(x),
      "failureReason": "s",
    },
  }, root);
}

function toRepository(root: jsonP.JSONValue): s.Repository {
  return jsonP.readObj({
    required: {},
    optional: {
      "repositoryArn": "s",
      "registryId": "s",
      "repositoryName": "s",
      "repositoryUri": "s",
      "createdAt": "d",
    },
  }, root);
}

function toRepositoryCatalogData(root: jsonP.JSONValue): s.RepositoryCatalogData {
  return jsonP.readObj({
    required: {},
    optional: {
      "description": "s",
      "architectures": ["s"],
      "operatingSystems": ["s"],
      "logoUrl": "s",
      "aboutText": "s",
      "usageText": "s",
      "marketplaceCertified": "b",
    },
  }, root);
}

function toImageTagDetail(root: jsonP.JSONValue): s.ImageTagDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "imageTag": "s",
      "createdAt": "d",
      "imageDetail": toReferencedImageDetail,
    },
  }, root);
}

function toReferencedImageDetail(root: jsonP.JSONValue): s.ReferencedImageDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "imageDigest": "s",
      "imageSizeInBytes": "n",
      "imagePushedAt": "d",
      "imageManifestMediaType": "s",
      "artifactMediaType": "s",
    },
  }, root);
}

function toImageDetail(root: jsonP.JSONValue): s.ImageDetail {
  return jsonP.readObj({
    required: {},
    optional: {
      "registryId": "s",
      "repositoryName": "s",
      "imageDigest": "s",
      "imageTags": ["s"],
      "imageSizeInBytes": "n",
      "imagePushedAt": "d",
      "imageManifestMediaType": "s",
      "artifactMediaType": "s",
    },
  }, root);
}

function toRegistry(root: jsonP.JSONValue): s.Registry {
  return jsonP.readObj({
    required: {
      "registryId": "s",
      "registryArn": "s",
      "registryUri": "s",
      "verified": "b",
      "aliases": [toRegistryAlias],
    },
    optional: {},
  }, root);
}

function toRegistryAlias(root: jsonP.JSONValue): s.RegistryAlias {
  return jsonP.readObj({
    required: {
      "name": "s",
      "status": (x: jsonP.JSONValue) => cmnP.readEnum<s.RegistryAliasStatus>(x),
      "primaryRegistryAlias": "b",
      "defaultRegistryAlias": "b",
    },
    optional: {},
  }, root);
}

function toAuthorizationData(root: jsonP.JSONValue): s.AuthorizationData {
  return jsonP.readObj({
    required: {},
    optional: {
      "authorizationToken": "s",
      "expiresAt": "d",
    },
  }, root);
}

function toRegistryCatalogData(root: jsonP.JSONValue): s.RegistryCatalogData {
  return jsonP.readObj({
    required: {},
    optional: {
      "displayName": "s",
    },
  }, root);
}

function toImage(root: jsonP.JSONValue): s.Image {
  return jsonP.readObj({
    required: {},
    optional: {
      "registryId": "s",
      "repositoryName": "s",
      "imageId": toImageIdentifier,
      "imageManifest": "s",
      "imageManifestMediaType": "s",
    },
  }, root);
}
