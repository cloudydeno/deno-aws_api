// Autogenerated API client for: Elastic Load Balancing

interface RequestConfig {
  abortSignal?: AbortSignal;
}

export * from "./structs.ts";
import * as client from "../../client/common.ts";
import * as qsP from "../../encoding/querystring.ts";
import * as xmlP from "../../encoding/xml.ts";
import type * as s from "./structs.ts";

export default class ELB {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(ELB.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2012-06-01",
    "endpointPrefix": "elasticloadbalancing",
    "protocol": "query",
    "serviceFullName": "Elastic Load Balancing",
    "serviceId": "Elastic Load Balancing",
    "signatureVersion": "v4",
    "uid": "elasticloadbalancing-2012-06-01",
    "xmlNamespace": "http://elasticloadbalancing.amazonaws.com/doc/2012-06-01/"
  };

  async addTags(
    {abortSignal, ...params}: RequestConfig & s.AddTagsInput,
  ): Promise<s.AddTagsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["LoadBalancerNames"]) qsP.appendList(body, prefix+"LoadBalancerNames", params["LoadBalancerNames"], {"entryPrefix":".member."})
    if (params["Tags"]) qsP.appendList(body, prefix+"Tags", params["Tags"], {"appender":Tag_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AddTags",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "AddTagsResult");
    return {};
  }

  async applySecurityGroupsToLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.ApplySecurityGroupsToLoadBalancerInput,
  ): Promise<s.ApplySecurityGroupsToLoadBalancerOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["SecurityGroups"]) qsP.appendList(body, prefix+"SecurityGroups", params["SecurityGroups"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ApplySecurityGroupsToLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ApplySecurityGroupsToLoadBalancerResult");
    return {
      SecurityGroups: xml.getList("SecurityGroups", "member").map(x => x.content ?? ''),
    };
  }

  async attachLoadBalancerToSubnets(
    {abortSignal, ...params}: RequestConfig & s.AttachLoadBalancerToSubnetsInput,
  ): Promise<s.AttachLoadBalancerToSubnetsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Subnets"]) qsP.appendList(body, prefix+"Subnets", params["Subnets"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "AttachLoadBalancerToSubnets",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "AttachLoadBalancerToSubnetsResult");
    return {
      Subnets: xml.getList("Subnets", "member").map(x => x.content ?? ''),
    };
  }

  async configureHealthCheck(
    {abortSignal, ...params}: RequestConfig & s.ConfigureHealthCheckInput,
  ): Promise<s.ConfigureHealthCheckOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    HealthCheck_Serialize(body, prefix+"HealthCheck", params["HealthCheck"]);
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ConfigureHealthCheck",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ConfigureHealthCheckResult");
    return {
      HealthCheck: xml.first("HealthCheck", false, HealthCheck_Parse),
    };
  }

  async createAppCookieStickinessPolicy(
    {abortSignal, ...params}: RequestConfig & s.CreateAppCookieStickinessPolicyInput,
  ): Promise<s.CreateAppCookieStickinessPolicyOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"PolicyName", (params["PolicyName"] ?? '').toString());
    body.append(prefix+"CookieName", (params["CookieName"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateAppCookieStickinessPolicy",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateAppCookieStickinessPolicyResult");
    return {};
  }

  async createLBCookieStickinessPolicy(
    {abortSignal, ...params}: RequestConfig & s.CreateLBCookieStickinessPolicyInput,
  ): Promise<s.CreateLBCookieStickinessPolicyOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"PolicyName", (params["PolicyName"] ?? '').toString());
    if ("CookieExpirationPeriod" in params) body.append(prefix+"CookieExpirationPeriod", (params["CookieExpirationPeriod"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLBCookieStickinessPolicy",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateLBCookieStickinessPolicyResult");
    return {};
  }

  async createLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.CreateAccessPointInput,
  ): Promise<s.CreateAccessPointOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Listeners"]) qsP.appendList(body, prefix+"Listeners", params["Listeners"], {"appender":Listener_Serialize,"entryPrefix":".member."})
    if (params["AvailabilityZones"]) qsP.appendList(body, prefix+"AvailabilityZones", params["AvailabilityZones"], {"entryPrefix":".member."})
    if (params["Subnets"]) qsP.appendList(body, prefix+"Subnets", params["Subnets"], {"entryPrefix":".member."})
    if (params["SecurityGroups"]) qsP.appendList(body, prefix+"SecurityGroups", params["SecurityGroups"], {"entryPrefix":".member."})
    if ("Scheme" in params) body.append(prefix+"Scheme", (params["Scheme"] ?? '').toString());
    if (params["Tags"]) qsP.appendList(body, prefix+"Tags", params["Tags"], {"appender":Tag_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateLoadBalancerResult");
    return xml.strings({
      optional: {"DNSName":true},
    });
  }

  async createLoadBalancerListeners(
    {abortSignal, ...params}: RequestConfig & s.CreateLoadBalancerListenerInput,
  ): Promise<s.CreateLoadBalancerListenerOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Listeners"]) qsP.appendList(body, prefix+"Listeners", params["Listeners"], {"appender":Listener_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLoadBalancerListeners",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateLoadBalancerListenersResult");
    return {};
  }

  async createLoadBalancerPolicy(
    {abortSignal, ...params}: RequestConfig & s.CreateLoadBalancerPolicyInput,
  ): Promise<s.CreateLoadBalancerPolicyOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"PolicyName", (params["PolicyName"] ?? '').toString());
    body.append(prefix+"PolicyTypeName", (params["PolicyTypeName"] ?? '').toString());
    if (params["PolicyAttributes"]) qsP.appendList(body, prefix+"PolicyAttributes", params["PolicyAttributes"], {"appender":PolicyAttribute_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "CreateLoadBalancerPolicy",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateLoadBalancerPolicyResult");
    return {};
  }

  async deleteLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.DeleteAccessPointInput,
  ): Promise<s.DeleteAccessPointOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DeleteLoadBalancerResult");
    return {};
  }

  async deleteLoadBalancerListeners(
    {abortSignal, ...params}: RequestConfig & s.DeleteLoadBalancerListenerInput,
  ): Promise<s.DeleteLoadBalancerListenerOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["LoadBalancerPorts"]) qsP.appendList(body, prefix+"LoadBalancerPorts", params["LoadBalancerPorts"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLoadBalancerListeners",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DeleteLoadBalancerListenersResult");
    return {};
  }

  async deleteLoadBalancerPolicy(
    {abortSignal, ...params}: RequestConfig & s.DeleteLoadBalancerPolicyInput,
  ): Promise<s.DeleteLoadBalancerPolicyOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"PolicyName", (params["PolicyName"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeleteLoadBalancerPolicy",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DeleteLoadBalancerPolicyResult");
    return {};
  }

  async deregisterInstancesFromLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.DeregisterEndPointsInput,
  ): Promise<s.DeregisterEndPointsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Instances"]) qsP.appendList(body, prefix+"Instances", params["Instances"], {"appender":Instance_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DeregisterInstancesFromLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DeregisterInstancesFromLoadBalancerResult");
    return {
      Instances: xml.getList("Instances", "member").map(Instance_Parse),
    };
  }

  async describeAccountLimits(
    {abortSignal, ...params}: RequestConfig & s.DescribeAccountLimitsInput = {},
  ): Promise<s.DescribeAccountLimitsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("Marker" in params) body.append(prefix+"Marker", (params["Marker"] ?? '').toString());
    if ("PageSize" in params) body.append(prefix+"PageSize", (params["PageSize"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeAccountLimits",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeAccountLimitsResult");
    return {
      ...xml.strings({
        optional: {"NextMarker":true},
      }),
      Limits: xml.getList("Limits", "member").map(Limit_Parse),
    };
  }

  async describeInstanceHealth(
    {abortSignal, ...params}: RequestConfig & s.DescribeEndPointStateInput,
  ): Promise<s.DescribeEndPointStateOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Instances"]) qsP.appendList(body, prefix+"Instances", params["Instances"], {"appender":Instance_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeInstanceHealth",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeInstanceHealthResult");
    return {
      InstanceStates: xml.getList("InstanceStates", "member").map(InstanceState_Parse),
    };
  }

  async describeLoadBalancerAttributes(
    {abortSignal, ...params}: RequestConfig & s.DescribeLoadBalancerAttributesInput,
  ): Promise<s.DescribeLoadBalancerAttributesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeLoadBalancerAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeLoadBalancerAttributesResult");
    return {
      LoadBalancerAttributes: xml.first("LoadBalancerAttributes", false, LoadBalancerAttributes_Parse),
    };
  }

  async describeLoadBalancerPolicies(
    {abortSignal, ...params}: RequestConfig & s.DescribeLoadBalancerPoliciesInput = {},
  ): Promise<s.DescribeLoadBalancerPoliciesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("LoadBalancerName" in params) body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["PolicyNames"]) qsP.appendList(body, prefix+"PolicyNames", params["PolicyNames"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeLoadBalancerPolicies",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeLoadBalancerPoliciesResult");
    return {
      PolicyDescriptions: xml.getList("PolicyDescriptions", "member").map(PolicyDescription_Parse),
    };
  }

  async describeLoadBalancerPolicyTypes(
    {abortSignal, ...params}: RequestConfig & s.DescribeLoadBalancerPolicyTypesInput = {},
  ): Promise<s.DescribeLoadBalancerPolicyTypesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["PolicyTypeNames"]) qsP.appendList(body, prefix+"PolicyTypeNames", params["PolicyTypeNames"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeLoadBalancerPolicyTypes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeLoadBalancerPolicyTypesResult");
    return {
      PolicyTypeDescriptions: xml.getList("PolicyTypeDescriptions", "member").map(PolicyTypeDescription_Parse),
    };
  }

  async describeLoadBalancers(
    {abortSignal, ...params}: RequestConfig & s.DescribeAccessPointsInput = {},
  ): Promise<s.DescribeAccessPointsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["LoadBalancerNames"]) qsP.appendList(body, prefix+"LoadBalancerNames", params["LoadBalancerNames"], {"entryPrefix":".member."})
    if ("Marker" in params) body.append(prefix+"Marker", (params["Marker"] ?? '').toString());
    if ("PageSize" in params) body.append(prefix+"PageSize", (params["PageSize"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeLoadBalancers",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeLoadBalancersResult");
    return {
      ...xml.strings({
        optional: {"NextMarker":true},
      }),
      LoadBalancerDescriptions: xml.getList("LoadBalancerDescriptions", "member").map(LoadBalancerDescription_Parse),
    };
  }

  async describeTags(
    {abortSignal, ...params}: RequestConfig & s.DescribeTagsInput,
  ): Promise<s.DescribeTagsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["LoadBalancerNames"]) qsP.appendList(body, prefix+"LoadBalancerNames", params["LoadBalancerNames"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DescribeTags",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DescribeTagsResult");
    return {
      TagDescriptions: xml.getList("TagDescriptions", "member").map(TagDescription_Parse),
    };
  }

  async detachLoadBalancerFromSubnets(
    {abortSignal, ...params}: RequestConfig & s.DetachLoadBalancerFromSubnetsInput,
  ): Promise<s.DetachLoadBalancerFromSubnetsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Subnets"]) qsP.appendList(body, prefix+"Subnets", params["Subnets"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DetachLoadBalancerFromSubnets",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DetachLoadBalancerFromSubnetsResult");
    return {
      Subnets: xml.getList("Subnets", "member").map(x => x.content ?? ''),
    };
  }

  async disableAvailabilityZonesForLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.RemoveAvailabilityZonesInput,
  ): Promise<s.RemoveAvailabilityZonesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["AvailabilityZones"]) qsP.appendList(body, prefix+"AvailabilityZones", params["AvailabilityZones"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "DisableAvailabilityZonesForLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DisableAvailabilityZonesForLoadBalancerResult");
    return {
      AvailabilityZones: xml.getList("AvailabilityZones", "member").map(x => x.content ?? ''),
    };
  }

  async enableAvailabilityZonesForLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.AddAvailabilityZonesInput,
  ): Promise<s.AddAvailabilityZonesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["AvailabilityZones"]) qsP.appendList(body, prefix+"AvailabilityZones", params["AvailabilityZones"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "EnableAvailabilityZonesForLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "EnableAvailabilityZonesForLoadBalancerResult");
    return {
      AvailabilityZones: xml.getList("AvailabilityZones", "member").map(x => x.content ?? ''),
    };
  }

  async modifyLoadBalancerAttributes(
    {abortSignal, ...params}: RequestConfig & s.ModifyLoadBalancerAttributesInput,
  ): Promise<s.ModifyLoadBalancerAttributesOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    LoadBalancerAttributes_Serialize(body, prefix+"LoadBalancerAttributes", params["LoadBalancerAttributes"]);
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "ModifyLoadBalancerAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ModifyLoadBalancerAttributesResult");
    return {
      ...xml.strings({
        optional: {"LoadBalancerName":true},
      }),
      LoadBalancerAttributes: xml.first("LoadBalancerAttributes", false, LoadBalancerAttributes_Parse),
    };
  }

  async registerInstancesWithLoadBalancer(
    {abortSignal, ...params}: RequestConfig & s.RegisterEndPointsInput,
  ): Promise<s.RegisterEndPointsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    if (params["Instances"]) qsP.appendList(body, prefix+"Instances", params["Instances"], {"appender":Instance_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RegisterInstancesWithLoadBalancer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "RegisterInstancesWithLoadBalancerResult");
    return {
      Instances: xml.getList("Instances", "member").map(Instance_Parse),
    };
  }

  async removeTags(
    {abortSignal, ...params}: RequestConfig & s.RemoveTagsInput,
  ): Promise<s.RemoveTagsOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["LoadBalancerNames"]) qsP.appendList(body, prefix+"LoadBalancerNames", params["LoadBalancerNames"], {"entryPrefix":".member."})
    if (params["Tags"]) qsP.appendList(body, prefix+"Tags", params["Tags"], {"appender":TagKeyOnly_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "RemoveTags",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "RemoveTagsResult");
    return {};
  }

  async setLoadBalancerListenerSSLCertificate(
    {abortSignal, ...params}: RequestConfig & s.SetLoadBalancerListenerSSLCertificateInput,
  ): Promise<s.SetLoadBalancerListenerSSLCertificateOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"LoadBalancerPort", (params["LoadBalancerPort"] ?? '').toString());
    body.append(prefix+"SSLCertificateId", (params["SSLCertificateId"] ?? '').toString());
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SetLoadBalancerListenerSSLCertificate",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SetLoadBalancerListenerSSLCertificateResult");
    return {};
  }

  async setLoadBalancerPoliciesForBackendServer(
    {abortSignal, ...params}: RequestConfig & s.SetLoadBalancerPoliciesForBackendServerInput,
  ): Promise<s.SetLoadBalancerPoliciesForBackendServerOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"InstancePort", (params["InstancePort"] ?? '').toString());
    if (params["PolicyNames"]) qsP.appendList(body, prefix+"PolicyNames", params["PolicyNames"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SetLoadBalancerPoliciesForBackendServer",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SetLoadBalancerPoliciesForBackendServerResult");
    return {};
  }

  async setLoadBalancerPoliciesOfListener(
    {abortSignal, ...params}: RequestConfig & s.SetLoadBalancerPoliciesOfListenerInput,
  ): Promise<s.SetLoadBalancerPoliciesOfListenerOutput> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"LoadBalancerName", (params["LoadBalancerName"] ?? '').toString());
    body.append(prefix+"LoadBalancerPort", (params["LoadBalancerPort"] ?? '').toString());
    if (params["PolicyNames"]) qsP.appendList(body, prefix+"PolicyNames", params["PolicyNames"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      abortSignal, body,
      action: "SetLoadBalancerPoliciesOfListener",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SetLoadBalancerPoliciesOfListenerResult");
    return {};
  }

  // Resource State Waiters

  /** Checks state up to 40 times, 15 seconds apart (about 10 minutes max wait time). */
  async waitForInstanceDeregistered(
    params: RequestConfig & s.DescribeEndPointStateInput,
  ): Promise<Error | s.DescribeEndPointStateOutput> {
    const errMessage = 'ResourceNotReady: Resource is not in the state InstanceDeregistered';
    for (let i = 0; i < 40; i++) {
      try {
        const resp = await this.describeInstanceHealth(params);
        if (resp?.InstanceStates?.flatMap(x => x?.State)?.every(x => x === "OutOfService")) return resp;
      } catch (err) {
        if (["InvalidInstance"].includes(err.shortCode)) return err;
        throw err;
      }
      await new Promise(r => setTimeout(r, 15000));
    }
    throw new Error(errMessage);
  }

  /** Checks state up to 40 times, 15 seconds apart (about 10 minutes max wait time). */
  async waitForAnyInstanceInService(
    params: RequestConfig & s.DescribeEndPointStateInput,
  ): Promise<s.DescribeEndPointStateOutput> {
    const errMessage = 'ResourceNotReady: Resource is not in the state AnyInstanceInService';
    for (let i = 0; i < 40; i++) {
      const resp = await this.describeInstanceHealth(params);
      if (resp?.InstanceStates?.flatMap(x => x?.State)?.some(x => x === "InService")) return resp;
      await new Promise(r => setTimeout(r, 15000));
    }
    throw new Error(errMessage);
  }

  /** Checks state up to 40 times, 15 seconds apart (about 10 minutes max wait time). */
  async waitForInstanceInService(
    params: RequestConfig & s.DescribeEndPointStateInput,
  ): Promise<s.DescribeEndPointStateOutput> {
    const errMessage = 'ResourceNotReady: Resource is not in the state InstanceInService';
    for (let i = 0; i < 40; i++) {
      try {
        const resp = await this.describeInstanceHealth(params);
        if (resp?.InstanceStates?.flatMap(x => x?.State)?.every(x => x === "InService")) return resp;
      } catch (err) {
        if (!["InvalidInstance"].includes(err.shortCode)) throw err;
      }
      await new Promise(r => setTimeout(r, 15000));
    }
    throw new Error(errMessage);
  }

}

function Tag_Serialize(body: URLSearchParams, prefix: string, params: s.Tag) {
    body.append(prefix+".Key", (params["Key"] ?? '').toString());
    if ("Value" in params) body.append(prefix+".Value", (params["Value"] ?? '').toString());
}
function Tag_Parse(node: xmlP.XmlNode): s.Tag {
  return node.strings({
    required: {"Key":true},
    optional: {"Value":true},
  });
}

function HealthCheck_Serialize(body: URLSearchParams, prefix: string, params: s.HealthCheck) {
    body.append(prefix+".Target", (params["Target"] ?? '').toString());
    body.append(prefix+".Interval", (params["Interval"] ?? '').toString());
    body.append(prefix+".Timeout", (params["Timeout"] ?? '').toString());
    body.append(prefix+".UnhealthyThreshold", (params["UnhealthyThreshold"] ?? '').toString());
    body.append(prefix+".HealthyThreshold", (params["HealthyThreshold"] ?? '').toString());
}
function HealthCheck_Parse(node: xmlP.XmlNode): s.HealthCheck {
  return {
    ...node.strings({
      required: {"Target":true},
    }),
    Interval: node.first("Interval", true, x => parseInt(x.content ?? '0')),
    Timeout: node.first("Timeout", true, x => parseInt(x.content ?? '0')),
    UnhealthyThreshold: node.first("UnhealthyThreshold", true, x => parseInt(x.content ?? '0')),
    HealthyThreshold: node.first("HealthyThreshold", true, x => parseInt(x.content ?? '0')),
  };
}

function Listener_Serialize(body: URLSearchParams, prefix: string, params: s.Listener) {
    body.append(prefix+".Protocol", (params["Protocol"] ?? '').toString());
    body.append(prefix+".LoadBalancerPort", (params["LoadBalancerPort"] ?? '').toString());
    if ("InstanceProtocol" in params) body.append(prefix+".InstanceProtocol", (params["InstanceProtocol"] ?? '').toString());
    body.append(prefix+".InstancePort", (params["InstancePort"] ?? '').toString());
    if ("SSLCertificateId" in params) body.append(prefix+".SSLCertificateId", (params["SSLCertificateId"] ?? '').toString());
}
function Listener_Parse(node: xmlP.XmlNode): s.Listener {
  return {
    ...node.strings({
      required: {"Protocol":true},
      optional: {"InstanceProtocol":true,"SSLCertificateId":true},
    }),
    LoadBalancerPort: node.first("LoadBalancerPort", true, x => parseInt(x.content ?? '0')),
    InstancePort: node.first("InstancePort", true, x => parseInt(x.content ?? '0')),
  };
}

function PolicyAttribute_Serialize(body: URLSearchParams, prefix: string, params: s.PolicyAttribute) {
    if ("AttributeName" in params) body.append(prefix+".AttributeName", (params["AttributeName"] ?? '').toString());
    if ("AttributeValue" in params) body.append(prefix+".AttributeValue", (params["AttributeValue"] ?? '').toString());
}

function Instance_Serialize(body: URLSearchParams, prefix: string, params: s.Instance) {
    if ("InstanceId" in params) body.append(prefix+".InstanceId", (params["InstanceId"] ?? '').toString());
}
function Instance_Parse(node: xmlP.XmlNode): s.Instance {
  return node.strings({
    optional: {"InstanceId":true},
  });
}

function LoadBalancerAttributes_Serialize(body: URLSearchParams, prefix: string, params: s.LoadBalancerAttributes) {
    if (params["CrossZoneLoadBalancing"] != null) CrossZoneLoadBalancing_Serialize(body, prefix+".CrossZoneLoadBalancing", params["CrossZoneLoadBalancing"]);
    if (params["AccessLog"] != null) AccessLog_Serialize(body, prefix+".AccessLog", params["AccessLog"]);
    if (params["ConnectionDraining"] != null) ConnectionDraining_Serialize(body, prefix+".ConnectionDraining", params["ConnectionDraining"]);
    if (params["ConnectionSettings"] != null) ConnectionSettings_Serialize(body, prefix+".ConnectionSettings", params["ConnectionSettings"]);
    if (params["AdditionalAttributes"]) qsP.appendList(body, prefix+".AdditionalAttributes", params["AdditionalAttributes"], {"appender":AdditionalAttribute_Serialize,"entryPrefix":".member."})
}
function LoadBalancerAttributes_Parse(node: xmlP.XmlNode): s.LoadBalancerAttributes {
  return {
    CrossZoneLoadBalancing: node.first("CrossZoneLoadBalancing", false, CrossZoneLoadBalancing_Parse),
    AccessLog: node.first("AccessLog", false, AccessLog_Parse),
    ConnectionDraining: node.first("ConnectionDraining", false, ConnectionDraining_Parse),
    ConnectionSettings: node.first("ConnectionSettings", false, ConnectionSettings_Parse),
    AdditionalAttributes: node.getList("AdditionalAttributes", "member").map(AdditionalAttribute_Parse),
  };
}

function CrossZoneLoadBalancing_Serialize(body: URLSearchParams, prefix: string, params: s.CrossZoneLoadBalancing) {
    body.append(prefix+".Enabled", (params["Enabled"] ?? '').toString());
}
function CrossZoneLoadBalancing_Parse(node: xmlP.XmlNode): s.CrossZoneLoadBalancing {
  return {
    Enabled: node.first("Enabled", true, x => x.content === 'true'),
  };
}

function AccessLog_Serialize(body: URLSearchParams, prefix: string, params: s.AccessLog) {
    body.append(prefix+".Enabled", (params["Enabled"] ?? '').toString());
    if ("S3BucketName" in params) body.append(prefix+".S3BucketName", (params["S3BucketName"] ?? '').toString());
    if ("EmitInterval" in params) body.append(prefix+".EmitInterval", (params["EmitInterval"] ?? '').toString());
    if ("S3BucketPrefix" in params) body.append(prefix+".S3BucketPrefix", (params["S3BucketPrefix"] ?? '').toString());
}
function AccessLog_Parse(node: xmlP.XmlNode): s.AccessLog {
  return {
    ...node.strings({
      optional: {"S3BucketName":true,"S3BucketPrefix":true},
    }),
    Enabled: node.first("Enabled", true, x => x.content === 'true'),
    EmitInterval: node.first("EmitInterval", false, x => parseInt(x.content ?? '0')),
  };
}

function ConnectionDraining_Serialize(body: URLSearchParams, prefix: string, params: s.ConnectionDraining) {
    body.append(prefix+".Enabled", (params["Enabled"] ?? '').toString());
    if ("Timeout" in params) body.append(prefix+".Timeout", (params["Timeout"] ?? '').toString());
}
function ConnectionDraining_Parse(node: xmlP.XmlNode): s.ConnectionDraining {
  return {
    Enabled: node.first("Enabled", true, x => x.content === 'true'),
    Timeout: node.first("Timeout", false, x => parseInt(x.content ?? '0')),
  };
}

function ConnectionSettings_Serialize(body: URLSearchParams, prefix: string, params: s.ConnectionSettings) {
    body.append(prefix+".IdleTimeout", (params["IdleTimeout"] ?? '').toString());
}
function ConnectionSettings_Parse(node: xmlP.XmlNode): s.ConnectionSettings {
  return {
    IdleTimeout: node.first("IdleTimeout", true, x => parseInt(x.content ?? '0')),
  };
}

function AdditionalAttribute_Serialize(body: URLSearchParams, prefix: string, params: s.AdditionalAttribute) {
    if ("Key" in params) body.append(prefix+".Key", (params["Key"] ?? '').toString());
    if ("Value" in params) body.append(prefix+".Value", (params["Value"] ?? '').toString());
}
function AdditionalAttribute_Parse(node: xmlP.XmlNode): s.AdditionalAttribute {
  return node.strings({
    optional: {"Key":true,"Value":true},
  });
}

function TagKeyOnly_Serialize(body: URLSearchParams, prefix: string, params: s.TagKeyOnly) {
    if ("Key" in params) body.append(prefix+".Key", (params["Key"] ?? '').toString());
}

function Limit_Parse(node: xmlP.XmlNode): s.Limit {
  return node.strings({
    optional: {"Name":true,"Max":true},
  });
}

function InstanceState_Parse(node: xmlP.XmlNode): s.InstanceState {
  return node.strings({
    optional: {"InstanceId":true,"State":true,"ReasonCode":true,"Description":true},
  });
}

function PolicyDescription_Parse(node: xmlP.XmlNode): s.PolicyDescription {
  return {
    ...node.strings({
      optional: {"PolicyName":true,"PolicyTypeName":true},
    }),
    PolicyAttributeDescriptions: node.getList("PolicyAttributeDescriptions", "member").map(PolicyAttributeDescription_Parse),
  };
}

function PolicyAttributeDescription_Parse(node: xmlP.XmlNode): s.PolicyAttributeDescription {
  return node.strings({
    optional: {"AttributeName":true,"AttributeValue":true},
  });
}

function PolicyTypeDescription_Parse(node: xmlP.XmlNode): s.PolicyTypeDescription {
  return {
    ...node.strings({
      optional: {"PolicyTypeName":true,"Description":true},
    }),
    PolicyAttributeTypeDescriptions: node.getList("PolicyAttributeTypeDescriptions", "member").map(PolicyAttributeTypeDescription_Parse),
  };
}

function PolicyAttributeTypeDescription_Parse(node: xmlP.XmlNode): s.PolicyAttributeTypeDescription {
  return node.strings({
    optional: {"AttributeName":true,"AttributeType":true,"Description":true,"DefaultValue":true,"Cardinality":true},
  });
}

function LoadBalancerDescription_Parse(node: xmlP.XmlNode): s.LoadBalancerDescription {
  return {
    ...node.strings({
      optional: {"LoadBalancerName":true,"DNSName":true,"CanonicalHostedZoneName":true,"CanonicalHostedZoneNameID":true,"VPCId":true,"Scheme":true},
    }),
    ListenerDescriptions: node.getList("ListenerDescriptions", "member").map(ListenerDescription_Parse),
    Policies: node.first("Policies", false, Policies_Parse),
    BackendServerDescriptions: node.getList("BackendServerDescriptions", "member").map(BackendServerDescription_Parse),
    AvailabilityZones: node.getList("AvailabilityZones", "member").map(x => x.content ?? ''),
    Subnets: node.getList("Subnets", "member").map(x => x.content ?? ''),
    Instances: node.getList("Instances", "member").map(Instance_Parse),
    HealthCheck: node.first("HealthCheck", false, HealthCheck_Parse),
    SourceSecurityGroup: node.first("SourceSecurityGroup", false, SourceSecurityGroup_Parse),
    SecurityGroups: node.getList("SecurityGroups", "member").map(x => x.content ?? ''),
    CreatedTime: node.first("CreatedTime", false, x => xmlP.parseTimestamp(x.content)),
  };
}

function ListenerDescription_Parse(node: xmlP.XmlNode): s.ListenerDescription {
  return {
    Listener: node.first("Listener", false, Listener_Parse),
    PolicyNames: node.getList("PolicyNames", "member").map(x => x.content ?? ''),
  };
}

function Policies_Parse(node: xmlP.XmlNode): s.Policies {
  return {
    AppCookieStickinessPolicies: node.getList("AppCookieStickinessPolicies", "member").map(AppCookieStickinessPolicy_Parse),
    LBCookieStickinessPolicies: node.getList("LBCookieStickinessPolicies", "member").map(LBCookieStickinessPolicy_Parse),
    OtherPolicies: node.getList("OtherPolicies", "member").map(x => x.content ?? ''),
  };
}

function AppCookieStickinessPolicy_Parse(node: xmlP.XmlNode): s.AppCookieStickinessPolicy {
  return node.strings({
    optional: {"PolicyName":true,"CookieName":true},
  });
}

function LBCookieStickinessPolicy_Parse(node: xmlP.XmlNode): s.LBCookieStickinessPolicy {
  return {
    ...node.strings({
      optional: {"PolicyName":true},
    }),
    CookieExpirationPeriod: node.first("CookieExpirationPeriod", false, x => parseInt(x.content ?? '0')),
  };
}

function BackendServerDescription_Parse(node: xmlP.XmlNode): s.BackendServerDescription {
  return {
    InstancePort: node.first("InstancePort", false, x => parseInt(x.content ?? '0')),
    PolicyNames: node.getList("PolicyNames", "member").map(x => x.content ?? ''),
  };
}

function SourceSecurityGroup_Parse(node: xmlP.XmlNode): s.SourceSecurityGroup {
  return node.strings({
    optional: {"OwnerAlias":true,"GroupName":true},
  });
}

function TagDescription_Parse(node: xmlP.XmlNode): s.TagDescription {
  return {
    ...node.strings({
      optional: {"LoadBalancerName":true},
    }),
    Tags: node.getList("Tags", "member").map(Tag_Parse),
  };
}
