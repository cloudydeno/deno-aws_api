// Autogenerated API client for: Amazon Elastic File System

interface RequestConfig {
  abortSignal?: AbortSignal;
}

import * as uuidv4 from "https://deno.land/std@0.86.0/uuid/v4.ts";
import * as cmnP from "../../encoding/common.ts";
import * as client from "../../client/common.ts";
import type * as s from "./structs.ts";
import * as jsonP from "../../encoding/json.ts";
function generateIdemptToken() {
  return uuidv4.generate();
}

export default class EFS {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(EFS.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2015-02-01",
    "endpointPrefix": "elasticfilesystem",
    "protocol": "rest-json",
    "serviceAbbreviation": "EFS",
    "serviceFullName": "Amazon Elastic File System",
    "serviceId": "EFS",
    "signatureVersion": "v4",
    "uid": "elasticfilesystem-2015-02-01"
  };

  async createAccessPoint(
    {abortSignal, ...params}: RequestConfig & s.CreateAccessPointRequest,
  ): Promise<s.AccessPointDescription> {
    const body: jsonP.JSONObject = {
      ClientToken: params["ClientToken"] ?? generateIdemptToken(),
      Tags: params["Tags"]?.map(x => fromTag(x)),
      FileSystemId: params["FileSystemId"],
      PosixUser: fromPosixUser(params["PosixUser"]),
      RootDirectory: fromRootDirectory(params["RootDirectory"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateAccessPoint",
      requestUri: "/2015-02-01/access-points",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "ClientToken": "s",
        "Name": "s",
        "Tags": [toTag],
        "AccessPointId": "s",
        "AccessPointArn": "s",
        "FileSystemId": "s",
        "PosixUser": toPosixUser,
        "RootDirectory": toRootDirectory,
        "OwnerId": "s",
        "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
      },
    }, await resp.json());
  }

  async createFileSystem(
    {abortSignal, ...params}: RequestConfig & s.CreateFileSystemRequest,
  ): Promise<s.FileSystemDescription> {
    const body: jsonP.JSONObject = {
      CreationToken: params["CreationToken"] ?? generateIdemptToken(),
      PerformanceMode: params["PerformanceMode"],
      Encrypted: params["Encrypted"],
      KmsKeyId: params["KmsKeyId"],
      ThroughputMode: params["ThroughputMode"],
      ProvisionedThroughputInMibps: params["ProvisionedThroughputInMibps"],
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateFileSystem",
      requestUri: "/2015-02-01/file-systems",
      responseCode: 201,
    });
    return jsonP.readObj({
      required: {
        "OwnerId": "s",
        "CreationToken": "s",
        "FileSystemId": "s",
        "CreationTime": "d",
        "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
        "NumberOfMountTargets": "n",
        "SizeInBytes": toFileSystemSize,
        "PerformanceMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.PerformanceMode>(x),
        "Tags": [toTag],
      },
      optional: {
        "FileSystemArn": "s",
        "Name": "s",
        "Encrypted": "b",
        "KmsKeyId": "s",
        "ThroughputMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ThroughputMode>(x),
        "ProvisionedThroughputInMibps": "n",
      },
    }, await resp.json());
  }

  async createMountTarget(
    {abortSignal, ...params}: RequestConfig & s.CreateMountTargetRequest,
  ): Promise<s.MountTargetDescription> {
    const body: jsonP.JSONObject = {
      FileSystemId: params["FileSystemId"],
      SubnetId: params["SubnetId"],
      IpAddress: params["IpAddress"],
      SecurityGroups: params["SecurityGroups"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateMountTarget",
      requestUri: "/2015-02-01/mount-targets",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {
        "MountTargetId": "s",
        "FileSystemId": "s",
        "SubnetId": "s",
        "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
      },
      optional: {
        "OwnerId": "s",
        "IpAddress": "s",
        "NetworkInterfaceId": "s",
        "AvailabilityZoneId": "s",
        "AvailabilityZoneName": "s",
        "VpcId": "s",
      },
    }, await resp.json());
  }

  async createTags(
    {abortSignal, ...params}: RequestConfig & s.CreateTagsRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateTags",
      requestUri: cmnP.encodePath`/2015-02-01/create-tags/${params["FileSystemId"]}`,
      responseCode: 204,
    });
  }

  async deleteAccessPoint(
    {abortSignal, ...params}: RequestConfig & s.DeleteAccessPointRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteAccessPoint",
      method: "DELETE",
      requestUri: cmnP.encodePath`/2015-02-01/access-points/${params["AccessPointId"]}`,
      responseCode: 204,
    });
  }

  async deleteFileSystem(
    {abortSignal, ...params}: RequestConfig & s.DeleteFileSystemRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteFileSystem",
      method: "DELETE",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}`,
      responseCode: 204,
    });
  }

  async deleteFileSystemPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteFileSystemPolicyRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteFileSystemPolicy",
      method: "DELETE",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/policy`,
      responseCode: 200,
    });
  }

  async deleteMountTarget(
    {abortSignal, ...params}: RequestConfig & s.DeleteMountTargetRequest,
  ): Promise<void> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DeleteMountTarget",
      method: "DELETE",
      requestUri: cmnP.encodePath`/2015-02-01/mount-targets/${params["MountTargetId"]}`,
      responseCode: 204,
    });
  }

  async deleteTags(
    {abortSignal, ...params}: RequestConfig & s.DeleteTagsRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      TagKeys: params["TagKeys"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteTags",
      requestUri: cmnP.encodePath`/2015-02-01/delete-tags/${params["FileSystemId"]}`,
      responseCode: 204,
    });
  }

  async describeAccessPoints(
    {abortSignal, ...params}: RequestConfig & s.DescribeAccessPointsRequest = {},
  ): Promise<s.DescribeAccessPointsResponse> {
    const query = new URLSearchParams;
    if (params["MaxResults"] != null) query.set("MaxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    if (params["AccessPointId"] != null) query.set("AccessPointId", params["AccessPointId"]?.toString() ?? "");
    if (params["FileSystemId"] != null) query.set("FileSystemId", params["FileSystemId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeAccessPoints",
      method: "GET",
      requestUri: "/2015-02-01/access-points",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "AccessPoints": [toAccessPointDescription],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async describeBackupPolicy(
    {abortSignal, ...params}: RequestConfig & s.DescribeBackupPolicyRequest,
  ): Promise<s.BackupPolicyDescription> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeBackupPolicy",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/backup-policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "BackupPolicy": toBackupPolicy,
      },
    }, await resp.json());
  }

  async describeFileSystemPolicy(
    {abortSignal, ...params}: RequestConfig & s.DescribeFileSystemPolicyRequest,
  ): Promise<s.FileSystemPolicyDescription> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeFileSystemPolicy",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "FileSystemId": "s",
        "Policy": "s",
      },
    }, await resp.json());
  }

  async describeFileSystems(
    {abortSignal, ...params}: RequestConfig & s.DescribeFileSystemsRequest = {},
  ): Promise<s.DescribeFileSystemsResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("MaxItems", params["MaxItems"]?.toString() ?? "");
    if (params["Marker"] != null) query.set("Marker", params["Marker"]?.toString() ?? "");
    if (params["CreationToken"] != null) query.set("CreationToken", params["CreationToken"]?.toString() ?? "");
    if (params["FileSystemId"] != null) query.set("FileSystemId", params["FileSystemId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeFileSystems",
      method: "GET",
      requestUri: "/2015-02-01/file-systems",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Marker": "s",
        "FileSystems": [toFileSystemDescription],
        "NextMarker": "s",
      },
    }, await resp.json());
  }

  async describeLifecycleConfiguration(
    {abortSignal, ...params}: RequestConfig & s.DescribeLifecycleConfigurationRequest,
  ): Promise<s.LifecycleConfigurationDescription> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeLifecycleConfiguration",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/lifecycle-configuration`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LifecyclePolicies": [toLifecyclePolicy],
      },
    }, await resp.json());
  }

  async describeMountTargetSecurityGroups(
    {abortSignal, ...params}: RequestConfig & s.DescribeMountTargetSecurityGroupsRequest,
  ): Promise<s.DescribeMountTargetSecurityGroupsResponse> {

    const resp = await this.#client.performRequest({
      abortSignal,
      action: "DescribeMountTargetSecurityGroups",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/mount-targets/${params["MountTargetId"]}/security-groups`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {
        "SecurityGroups": ["s"],
      },
      optional: {},
    }, await resp.json());
  }

  async describeMountTargets(
    {abortSignal, ...params}: RequestConfig & s.DescribeMountTargetsRequest = {},
  ): Promise<s.DescribeMountTargetsResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("MaxItems", params["MaxItems"]?.toString() ?? "");
    if (params["Marker"] != null) query.set("Marker", params["Marker"]?.toString() ?? "");
    if (params["FileSystemId"] != null) query.set("FileSystemId", params["FileSystemId"]?.toString() ?? "");
    if (params["MountTargetId"] != null) query.set("MountTargetId", params["MountTargetId"]?.toString() ?? "");
    if (params["AccessPointId"] != null) query.set("AccessPointId", params["AccessPointId"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeMountTargets",
      method: "GET",
      requestUri: "/2015-02-01/mount-targets",
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Marker": "s",
        "MountTargets": [toMountTargetDescription],
        "NextMarker": "s",
      },
    }, await resp.json());
  }

  async describeTags(
    {abortSignal, ...params}: RequestConfig & s.DescribeTagsRequest,
  ): Promise<s.DescribeTagsResponse> {
    const query = new URLSearchParams;
    if (params["MaxItems"] != null) query.set("MaxItems", params["MaxItems"]?.toString() ?? "");
    if (params["Marker"] != null) query.set("Marker", params["Marker"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "DescribeTags",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/tags/${params["FileSystemId"]}/`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {
        "Tags": [toTag],
      },
      optional: {
        "Marker": "s",
        "NextMarker": "s",
      },
    }, await resp.json());
  }

  async listTagsForResource(
    {abortSignal, ...params}: RequestConfig & s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {
    const query = new URLSearchParams;
    if (params["MaxResults"] != null) query.set("MaxResults", params["MaxResults"]?.toString() ?? "");
    if (params["NextToken"] != null) query.set("NextToken", params["NextToken"]?.toString() ?? "");
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "ListTagsForResource",
      method: "GET",
      requestUri: cmnP.encodePath`/2015-02-01/resource-tags/${params["ResourceId"]}`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "Tags": [toTag],
        "NextToken": "s",
      },
    }, await resp.json());
  }

  async modifyMountTargetSecurityGroups(
    {abortSignal, ...params}: RequestConfig & s.ModifyMountTargetSecurityGroupsRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      SecurityGroups: params["SecurityGroups"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ModifyMountTargetSecurityGroups",
      method: "PUT",
      requestUri: cmnP.encodePath`/2015-02-01/mount-targets/${params["MountTargetId"]}/security-groups`,
      responseCode: 204,
    });
  }

  async putBackupPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutBackupPolicyRequest,
  ): Promise<s.BackupPolicyDescription> {
    const body: jsonP.JSONObject = {
      BackupPolicy: fromBackupPolicy(params["BackupPolicy"]),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutBackupPolicy",
      method: "PUT",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/backup-policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "BackupPolicy": toBackupPolicy,
      },
    }, await resp.json());
  }

  async putFileSystemPolicy(
    {abortSignal, ...params}: RequestConfig & s.PutFileSystemPolicyRequest,
  ): Promise<s.FileSystemPolicyDescription> {
    const body: jsonP.JSONObject = {
      Policy: params["Policy"],
      BypassPolicyLockoutSafetyCheck: params["BypassPolicyLockoutSafetyCheck"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutFileSystemPolicy",
      method: "PUT",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/policy`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "FileSystemId": "s",
        "Policy": "s",
      },
    }, await resp.json());
  }

  async putLifecycleConfiguration(
    {abortSignal, ...params}: RequestConfig & s.PutLifecycleConfigurationRequest,
  ): Promise<s.LifecycleConfigurationDescription> {
    const body: jsonP.JSONObject = {
      LifecyclePolicies: params["LifecyclePolicies"]?.map(x => fromLifecyclePolicy(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "PutLifecycleConfiguration",
      method: "PUT",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}/lifecycle-configuration`,
      responseCode: 200,
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "LifecyclePolicies": [toLifecyclePolicy],
      },
    }, await resp.json());
  }

  async tagResource(
    {abortSignal, ...params}: RequestConfig & s.TagResourceRequest,
  ): Promise<void> {
    const body: jsonP.JSONObject = {
      Tags: params["Tags"]?.map(x => fromTag(x)),
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "TagResource",
      requestUri: cmnP.encodePath`/2015-02-01/resource-tags/${params["ResourceId"]}`,
      responseCode: 200,
    });
  }

  async untagResource(
    {abortSignal, ...params}: RequestConfig & s.UntagResourceRequest,
  ): Promise<void> {
    const query = new URLSearchParams;
    for (const item of params["TagKeys"]) {
      query.append("tagKeys", item?.toString() ?? "");
    }
    const resp = await this.#client.performRequest({
      abortSignal, query,
      action: "UntagResource",
      method: "DELETE",
      requestUri: cmnP.encodePath`/2015-02-01/resource-tags/${params["ResourceId"]}`,
      responseCode: 200,
    });
  }

  async updateFileSystem(
    {abortSignal, ...params}: RequestConfig & s.UpdateFileSystemRequest,
  ): Promise<s.FileSystemDescription> {
    const body: jsonP.JSONObject = {
      ThroughputMode: params["ThroughputMode"],
      ProvisionedThroughputInMibps: params["ProvisionedThroughputInMibps"],
    };
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateFileSystem",
      method: "PUT",
      requestUri: cmnP.encodePath`/2015-02-01/file-systems/${params["FileSystemId"]}`,
      responseCode: 202,
    });
    return jsonP.readObj({
      required: {
        "OwnerId": "s",
        "CreationToken": "s",
        "FileSystemId": "s",
        "CreationTime": "d",
        "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
        "NumberOfMountTargets": "n",
        "SizeInBytes": toFileSystemSize,
        "PerformanceMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.PerformanceMode>(x),
        "Tags": [toTag],
      },
      optional: {
        "FileSystemArn": "s",
        "Name": "s",
        "Encrypted": "b",
        "KmsKeyId": "s",
        "ThroughputMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ThroughputMode>(x),
        "ProvisionedThroughputInMibps": "n",
      },
    }, await resp.json());
  }

}

function toAccessPointDescription(root: jsonP.JSONValue): s.AccessPointDescription {
  return jsonP.readObj({
    required: {},
    optional: {
      "ClientToken": "s",
      "Name": "s",
      "Tags": [toTag],
      "AccessPointId": "s",
      "AccessPointArn": "s",
      "FileSystemId": "s",
      "PosixUser": toPosixUser,
      "RootDirectory": toRootDirectory,
      "OwnerId": "s",
      "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
    },
  }, root);
}

function toFileSystemDescription(root: jsonP.JSONValue): s.FileSystemDescription {
  return jsonP.readObj({
    required: {
      "OwnerId": "s",
      "CreationToken": "s",
      "FileSystemId": "s",
      "CreationTime": "d",
      "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
      "NumberOfMountTargets": "n",
      "SizeInBytes": toFileSystemSize,
      "PerformanceMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.PerformanceMode>(x),
      "Tags": [toTag],
    },
    optional: {
      "FileSystemArn": "s",
      "Name": "s",
      "Encrypted": "b",
      "KmsKeyId": "s",
      "ThroughputMode": (x: jsonP.JSONValue) => cmnP.readEnum<s.ThroughputMode>(x),
      "ProvisionedThroughputInMibps": "n",
    },
  }, root);
}

function toMountTargetDescription(root: jsonP.JSONValue): s.MountTargetDescription {
  return jsonP.readObj({
    required: {
      "MountTargetId": "s",
      "FileSystemId": "s",
      "SubnetId": "s",
      "LifeCycleState": (x: jsonP.JSONValue) => cmnP.readEnum<s.LifeCycleState>(x),
    },
    optional: {
      "OwnerId": "s",
      "IpAddress": "s",
      "NetworkInterfaceId": "s",
      "AvailabilityZoneId": "s",
      "AvailabilityZoneName": "s",
      "VpcId": "s",
    },
  }, root);
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
    required: {
      "Key": "s",
      "Value": "s",
    },
    optional: {},
  }, root);
}

function fromPosixUser(input?: s.PosixUser | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Uid: input["Uid"],
    Gid: input["Gid"],
    SecondaryGids: input["SecondaryGids"],
  }
}
function toPosixUser(root: jsonP.JSONValue): s.PosixUser {
  return jsonP.readObj({
    required: {
      "Uid": "n",
      "Gid": "n",
    },
    optional: {
      "SecondaryGids": ["n"],
    },
  }, root);
}

function fromRootDirectory(input?: s.RootDirectory | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Path: input["Path"],
    CreationInfo: fromCreationInfo(input["CreationInfo"]),
  }
}
function toRootDirectory(root: jsonP.JSONValue): s.RootDirectory {
  return jsonP.readObj({
    required: {},
    optional: {
      "Path": "s",
      "CreationInfo": toCreationInfo,
    },
  }, root);
}

function fromCreationInfo(input?: s.CreationInfo | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    OwnerUid: input["OwnerUid"],
    OwnerGid: input["OwnerGid"],
    Permissions: input["Permissions"],
  }
}
function toCreationInfo(root: jsonP.JSONValue): s.CreationInfo {
  return jsonP.readObj({
    required: {
      "OwnerUid": "n",
      "OwnerGid": "n",
      "Permissions": "s",
    },
    optional: {},
  }, root);
}

function fromBackupPolicy(input?: s.BackupPolicy | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    Status: input["Status"],
  }
}
function toBackupPolicy(root: jsonP.JSONValue): s.BackupPolicy {
  return jsonP.readObj({
    required: {
      "Status": (x: jsonP.JSONValue) => cmnP.readEnum<s.Status>(x),
    },
    optional: {},
  }, root);
}

function fromLifecyclePolicy(input?: s.LifecyclePolicy | null): jsonP.JSONValue {
  if (!input) return input;
  return {
    TransitionToIA: input["TransitionToIA"],
  }
}
function toLifecyclePolicy(root: jsonP.JSONValue): s.LifecyclePolicy {
  return jsonP.readObj({
    required: {},
    optional: {
      "TransitionToIA": (x: jsonP.JSONValue) => cmnP.readEnum<s.TransitionToIARules>(x),
    },
  }, root);
}

function toFileSystemSize(root: jsonP.JSONValue): s.FileSystemSize {
  return jsonP.readObj({
    required: {
      "Value": "n",
    },
    optional: {
      "Timestamp": "d",
      "ValueInIA": "n",
      "ValueInStandard": "n",
    },
  }, root);
}