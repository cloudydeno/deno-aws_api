// Autogenerated API client for: AWS Import/Export

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as qsP from "../../encoding/querystring.ts";
import * as xmlP from "../../encoding/xml.ts";
import type * as s from "./structs.ts";

export default class ImportExport {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ImportExport.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "uid": "importexport-2010-06-01",
    "apiVersion": "2010-06-01",
    "endpointPrefix": "importexport",
    "globalEndpoint": "importexport.amazonaws.com",
    "serviceFullName": "AWS Import/Export",
    "serviceId": "ImportExport",
    "signatureVersion": "v2",
    "xmlNamespace": "http://importexport.amazonaws.com/doc/2010-06-01/",
    "protocol": "query"
  };

  async cancelJob(
    {abortSignal, ...params}: RequestConfig & s.CancelJobInput,
  ): Promise<s.CancelJobOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"JobId", (params["JobId"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CancelJob",
      requestUri: "/?Operation=CancelJob",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CancelJobResult");
    return {
      Success: xml.first("Success", false, x => x.content === 'true'),
    };
  }

  async createJob(
    {abortSignal, ...params}: RequestConfig & s.CreateJobInput,
  ): Promise<s.CreateJobOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"JobType", (params["JobType"] ?? '').toString());
    body.append(prefix+"Manifest", (params["Manifest"] ?? '').toString());
    if ("ManifestAddendum" in params) body.append(prefix+"ManifestAddendum", (params["ManifestAddendum"] ?? '').toString());
    body.append(prefix+"ValidateOnly", (params["ValidateOnly"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateJob",
      requestUri: "/?Operation=CreateJob",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateJobResult");
    return {
      ...xml.strings({
        optional: {"JobId":true,"Signature":true,"SignatureFileContents":true,"WarningMessage":true},
      }),
      JobType: xml.first("JobType", false, x => (x.content ?? '') as s.JobType),
      ArtifactList: xml.getList("ArtifactList", "member").map(Artifact_Parse),
    };
  }

  async getShippingLabel(
    {abortSignal, ...params}: RequestConfig & s.GetShippingLabelInput,
  ): Promise<s.GetShippingLabelOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["jobIds"]) qsP.appendList(body, prefix+"jobIds", params["jobIds"], {"entryPrefix":".member."})
    if ("name" in params) body.append(prefix+"name", (params["name"] ?? '').toString());
    if ("company" in params) body.append(prefix+"company", (params["company"] ?? '').toString());
    if ("phoneNumber" in params) body.append(prefix+"phoneNumber", (params["phoneNumber"] ?? '').toString());
    if ("country" in params) body.append(prefix+"country", (params["country"] ?? '').toString());
    if ("stateOrProvince" in params) body.append(prefix+"stateOrProvince", (params["stateOrProvince"] ?? '').toString());
    if ("city" in params) body.append(prefix+"city", (params["city"] ?? '').toString());
    if ("postalCode" in params) body.append(prefix+"postalCode", (params["postalCode"] ?? '').toString());
    if ("street1" in params) body.append(prefix+"street1", (params["street1"] ?? '').toString());
    if ("street2" in params) body.append(prefix+"street2", (params["street2"] ?? '').toString());
    if ("street3" in params) body.append(prefix+"street3", (params["street3"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetShippingLabel",
      requestUri: "/?Operation=GetShippingLabel",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetShippingLabelResult");
    return xml.strings({
      optional: {"ShippingLabelURL":true,"Warning":true},
    });
  }

  async getStatus(
    {abortSignal, ...params}: RequestConfig & s.GetStatusInput,
  ): Promise<s.GetStatusOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"JobId", (params["JobId"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "GetStatus",
      requestUri: "/?Operation=GetStatus",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetStatusResult");
    return {
      ...xml.strings({
        optional: {"JobId":true,"LocationCode":true,"LocationMessage":true,"ProgressCode":true,"ProgressMessage":true,"Carrier":true,"TrackingNumber":true,"LogBucket":true,"LogKey":true,"Signature":true,"SignatureFileContents":true,"CurrentManifest":true},
      }),
      JobType: xml.first("JobType", false, x => (x.content ?? '') as s.JobType),
      ErrorCount: xml.first("ErrorCount", false, x => parseInt(x.content ?? '0')),
      CreationDate: xml.first("CreationDate", false, x => xmlP.parseTimestamp(x.content)),
      ArtifactList: xml.getList("ArtifactList", "member").map(Artifact_Parse),
    };
  }

  async listJobs(
    {abortSignal, ...params}: RequestConfig & s.ListJobsInput = {},
  ): Promise<s.ListJobsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("MaxJobs" in params) body.append(prefix+"MaxJobs", (params["MaxJobs"] ?? '').toString());
    if ("Marker" in params) body.append(prefix+"Marker", (params["Marker"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ListJobs",
      requestUri: "/?Operation=ListJobs",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListJobsResult");
    return {
      Jobs: xml.getList("Jobs", "member").map(Job_Parse),
      IsTruncated: xml.first("IsTruncated", false, x => x.content === 'true'),
    };
  }

  async updateJob(
    {abortSignal, ...params}: RequestConfig & s.UpdateJobInput,
  ): Promise<s.UpdateJobOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"JobId", (params["JobId"] ?? '').toString());
    body.append(prefix+"Manifest", (params["Manifest"] ?? '').toString());
    body.append(prefix+"JobType", (params["JobType"] ?? '').toString());
    body.append(prefix+"ValidateOnly", (params["ValidateOnly"] ?? '').toString());
    if ("APIVersion" in params) body.append(prefix+"APIVersion", (params["APIVersion"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "UpdateJob",
      requestUri: "/?Operation=UpdateJob",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "UpdateJobResult");
    return {
      ...xml.strings({
        optional: {"WarningMessage":true},
      }),
      Success: xml.first("Success", false, x => x.content === 'true'),
      ArtifactList: xml.getList("ArtifactList", "member").map(Artifact_Parse),
    };
  }

}

function Artifact_Parse(node: xmlP.XmlNode): s.Artifact {
  return node.strings({
    optional: {"Description":true,"URL":true},
  });
}

function Job_Parse(node: xmlP.XmlNode): s.Job {
  return {
    ...node.strings({
      optional: {"JobId":true},
    }),
    CreationDate: node.first("CreationDate", false, x => xmlP.parseTimestamp(x.content)),
    IsCanceled: node.first("IsCanceled", false, x => x.content === 'true'),
    JobType: node.first("JobType", false, x => (x.content ?? '') as s.JobType),
  };
}
