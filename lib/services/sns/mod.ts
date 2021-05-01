// Autogenerated API client for: Amazon Simple Notification Service

export * from "./structs.ts";
import * as Base64 from "https://deno.land/std@0.91.0/encoding/base64.ts";
import * as client from "../../client/common.ts";
import * as qsP from "../../encoding/querystring.ts";
import * as xmlP from "../../encoding/xml.ts";
import type * as s from "./structs.ts";
function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (input == null) return input;
  return Base64.encode(input);
}

export class SNS {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(SNS.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2010-03-31",
    "endpointPrefix": "sns",
    "protocol": "query",
    "serviceAbbreviation": "Amazon SNS",
    "serviceFullName": "Amazon Simple Notification Service",
    "serviceId": "SNS",
    "signatureVersion": "v4",
    "uid": "sns-2010-03-31",
    "xmlNamespace": "http://sns.amazonaws.com/doc/2010-03-31/"
  };

  async addPermission(
    params: s.AddPermissionInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    body.append(prefix+"Label", (params["Label"] ?? '').toString());
    if (params["AWSAccountId"]) qsP.appendList(body, prefix+"AWSAccountId", params["AWSAccountId"], {"entryPrefix":".member."})
    if (params["ActionName"]) qsP.appendList(body, prefix+"ActionName", params["ActionName"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      body,
      action: "AddPermission",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async checkIfPhoneNumberIsOptedOut(
    params: s.CheckIfPhoneNumberIsOptedOutInput,
  ): Promise<s.CheckIfPhoneNumberIsOptedOutResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"phoneNumber", (params["phoneNumber"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "CheckIfPhoneNumberIsOptedOut",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CheckIfPhoneNumberIsOptedOutResult");
    return {
      isOptedOut: xml.first("isOptedOut", false, x => x.content === 'true'),
    };
  }

  async confirmSubscription(
    params: s.ConfirmSubscriptionInput,
  ): Promise<s.ConfirmSubscriptionResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    body.append(prefix+"Token", (params["Token"] ?? '').toString());
    if ("AuthenticateOnUnsubscribe" in params) body.append(prefix+"AuthenticateOnUnsubscribe", (params["AuthenticateOnUnsubscribe"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ConfirmSubscription",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ConfirmSubscriptionResult");
    return xml.strings({
      optional: {"SubscriptionArn":true},
    });
  }

  async createPlatformApplication(
    params: s.CreatePlatformApplicationInput,
  ): Promise<s.CreatePlatformApplicationResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"Name", (params["Name"] ?? '').toString());
    body.append(prefix+"Platform", (params["Platform"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    const resp = await this.#client.performRequest({
      body,
      action: "CreatePlatformApplication",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreatePlatformApplicationResult");
    return xml.strings({
      optional: {"PlatformApplicationArn":true},
    });
  }

  async createPlatformEndpoint(
    params: s.CreatePlatformEndpointInput,
  ): Promise<s.CreateEndpointResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"PlatformApplicationArn", (params["PlatformApplicationArn"] ?? '').toString());
    body.append(prefix+"Token", (params["Token"] ?? '').toString());
    if ("CustomUserData" in params) body.append(prefix+"CustomUserData", (params["CustomUserData"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    const resp = await this.#client.performRequest({
      body,
      action: "CreatePlatformEndpoint",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreatePlatformEndpointResult");
    return xml.strings({
      optional: {"EndpointArn":true},
    });
  }

  async createTopic(
    params: s.CreateTopicInput,
  ): Promise<s.CreateTopicResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"Name", (params["Name"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    if (params["Tags"]) qsP.appendList(body, prefix+"Tags", params["Tags"], {"appender":Tag_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      body,
      action: "CreateTopic",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateTopicResult");
    return xml.strings({
      optional: {"TopicArn":true},
    });
  }

  async deleteEndpoint(
    params: s.DeleteEndpointInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"EndpointArn", (params["EndpointArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "DeleteEndpoint",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async deletePlatformApplication(
    params: s.DeletePlatformApplicationInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"PlatformApplicationArn", (params["PlatformApplicationArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "DeletePlatformApplication",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async deleteTopic(
    params: s.DeleteTopicInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "DeleteTopic",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async getEndpointAttributes(
    params: s.GetEndpointAttributesInput,
  ): Promise<s.GetEndpointAttributesResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"EndpointArn", (params["EndpointArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "GetEndpointAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetEndpointAttributesResult");
    return {
      Attributes: xmlP.readXmlMap(xml.getList("Attributes", "entry"), x => x.content ?? '', {}),
    };
  }

  async getPlatformApplicationAttributes(
    params: s.GetPlatformApplicationAttributesInput,
  ): Promise<s.GetPlatformApplicationAttributesResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"PlatformApplicationArn", (params["PlatformApplicationArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "GetPlatformApplicationAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetPlatformApplicationAttributesResult");
    return {
      Attributes: xmlP.readXmlMap(xml.getList("Attributes", "entry"), x => x.content ?? '', {}),
    };
  }

  async getSMSAttributes(
    params: s.GetSMSAttributesInput = {},
  ): Promise<s.GetSMSAttributesResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["attributes"]) qsP.appendList(body, prefix+"attributes", params["attributes"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      body,
      action: "GetSMSAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetSMSAttributesResult");
    return {
      attributes: xmlP.readXmlMap(xml.getList("attributes", "entry"), x => x.content ?? '', {}),
    };
  }

  async getSubscriptionAttributes(
    params: s.GetSubscriptionAttributesInput,
  ): Promise<s.GetSubscriptionAttributesResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"SubscriptionArn", (params["SubscriptionArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "GetSubscriptionAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetSubscriptionAttributesResult");
    return {
      Attributes: xmlP.readXmlMap(xml.getList("Attributes", "entry"), x => x.content ?? '', {}),
    };
  }

  async getTopicAttributes(
    params: s.GetTopicAttributesInput,
  ): Promise<s.GetTopicAttributesResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "GetTopicAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetTopicAttributesResult");
    return {
      Attributes: xmlP.readXmlMap(xml.getList("Attributes", "entry"), x => x.content ?? '', {}),
    };
  }

  async listEndpointsByPlatformApplication(
    params: s.ListEndpointsByPlatformApplicationInput,
  ): Promise<s.ListEndpointsByPlatformApplicationResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"PlatformApplicationArn", (params["PlatformApplicationArn"] ?? '').toString());
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListEndpointsByPlatformApplication",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListEndpointsByPlatformApplicationResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      Endpoints: xml.getList("Endpoints", "member").map(Endpoint_Parse),
    };
  }

  async listPhoneNumbersOptedOut(
    params: s.ListPhoneNumbersOptedOutInput = {},
  ): Promise<s.ListPhoneNumbersOptedOutResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("nextToken" in params) body.append(prefix+"nextToken", (params["nextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListPhoneNumbersOptedOut",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListPhoneNumbersOptedOutResult");
    return {
      ...xml.strings({
        optional: {"nextToken":true},
      }),
      phoneNumbers: xml.getList("phoneNumbers", "member").map(x => x.content ?? ''),
    };
  }

  async listPlatformApplications(
    params: s.ListPlatformApplicationsInput = {},
  ): Promise<s.ListPlatformApplicationsResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListPlatformApplications",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListPlatformApplicationsResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      PlatformApplications: xml.getList("PlatformApplications", "member").map(PlatformApplication_Parse),
    };
  }

  async listSubscriptions(
    params: s.ListSubscriptionsInput = {},
  ): Promise<s.ListSubscriptionsResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListSubscriptions",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListSubscriptionsResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      Subscriptions: xml.getList("Subscriptions", "member").map(Subscription_Parse),
    };
  }

  async listSubscriptionsByTopic(
    params: s.ListSubscriptionsByTopicInput,
  ): Promise<s.ListSubscriptionsByTopicResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListSubscriptionsByTopic",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListSubscriptionsByTopicResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      Subscriptions: xml.getList("Subscriptions", "member").map(Subscription_Parse),
    };
  }

  async listTagsForResource(
    params: s.ListTagsForResourceRequest,
  ): Promise<s.ListTagsForResourceResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"ResourceArn", (params["ResourceArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListTagsForResource",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListTagsForResourceResult");
    return {
      Tags: xml.getList("Tags", "member").map(Tag_Parse),
    };
  }

  async listTopics(
    params: s.ListTopicsInput = {},
  ): Promise<s.ListTopicsResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "ListTopics",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListTopicsResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      Topics: xml.getList("Topics", "member").map(Topic_Parse),
    };
  }

  async optInPhoneNumber(
    params: s.OptInPhoneNumberInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"phoneNumber", (params["phoneNumber"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "OptInPhoneNumber",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async publish(
    params: s.PublishInput,
  ): Promise<s.PublishResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("TopicArn" in params) body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    if ("TargetArn" in params) body.append(prefix+"TargetArn", (params["TargetArn"] ?? '').toString());
    if ("PhoneNumber" in params) body.append(prefix+"PhoneNumber", (params["PhoneNumber"] ?? '').toString());
    body.append(prefix+"Message", (params["Message"] ?? '').toString());
    if ("Subject" in params) body.append(prefix+"Subject", (params["Subject"] ?? '').toString());
    if ("MessageStructure" in params) body.append(prefix+"MessageStructure", (params["MessageStructure"] ?? '').toString());
    if (params["MessageAttributes"]) qsP.appendMap(body, prefix+"MessageAttributes", params["MessageAttributes"], {"appender":MessageAttributeValue_Serialize,"keyName":".Name","valName":".Value","entryPrefix":".entry."})
    if ("MessageDeduplicationId" in params) body.append(prefix+"MessageDeduplicationId", (params["MessageDeduplicationId"] ?? '').toString());
    if ("MessageGroupId" in params) body.append(prefix+"MessageGroupId", (params["MessageGroupId"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "Publish",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "PublishResult");
    return xml.strings({
      optional: {"MessageId":true,"SequenceNumber":true},
    });
  }

  async removePermission(
    params: s.RemovePermissionInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    body.append(prefix+"Label", (params["Label"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "RemovePermission",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async setEndpointAttributes(
    params: s.SetEndpointAttributesInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"EndpointArn", (params["EndpointArn"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    const resp = await this.#client.performRequest({
      body,
      action: "SetEndpointAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async setPlatformApplicationAttributes(
    params: s.SetPlatformApplicationAttributesInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"PlatformApplicationArn", (params["PlatformApplicationArn"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    const resp = await this.#client.performRequest({
      body,
      action: "SetPlatformApplicationAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async setSMSAttributes(
    params: s.SetSMSAttributesInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    if (params["attributes"]) qsP.appendMap(body, prefix+"attributes", params["attributes"], {"entryPrefix":".entry."})
    const resp = await this.#client.performRequest({
      body,
      action: "SetSMSAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async setSubscriptionAttributes(
    params: s.SetSubscriptionAttributesInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"SubscriptionArn", (params["SubscriptionArn"] ?? '').toString());
    body.append(prefix+"AttributeName", (params["AttributeName"] ?? '').toString());
    if ("AttributeValue" in params) body.append(prefix+"AttributeValue", (params["AttributeValue"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "SetSubscriptionAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async setTopicAttributes(
    params: s.SetTopicAttributesInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    body.append(prefix+"AttributeName", (params["AttributeName"] ?? '').toString());
    if ("AttributeValue" in params) body.append(prefix+"AttributeValue", (params["AttributeValue"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "SetTopicAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async subscribe(
    params: s.SubscribeInput,
  ): Promise<s.SubscribeResponse> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"TopicArn", (params["TopicArn"] ?? '').toString());
    body.append(prefix+"Protocol", (params["Protocol"] ?? '').toString());
    if ("Endpoint" in params) body.append(prefix+"Endpoint", (params["Endpoint"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attributes", params["Attributes"], {"entryPrefix":".entry."})
    if ("ReturnSubscriptionArn" in params) body.append(prefix+"ReturnSubscriptionArn", (params["ReturnSubscriptionArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "Subscribe",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SubscribeResult");
    return xml.strings({
      optional: {"SubscriptionArn":true},
    });
  }

  async tagResource(
    params: s.TagResourceRequest,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"ResourceArn", (params["ResourceArn"] ?? '').toString());
    if (params["Tags"]) qsP.appendList(body, prefix+"Tags", params["Tags"], {"appender":Tag_Serialize,"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      body,
      action: "TagResource",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async unsubscribe(
    params: s.UnsubscribeInput,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"SubscriptionArn", (params["SubscriptionArn"] ?? '').toString());
    const resp = await this.#client.performRequest({
      body,
      action: "Unsubscribe",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async untagResource(
    params: s.UntagResourceRequest,
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"ResourceArn", (params["ResourceArn"] ?? '').toString());
    if (params["TagKeys"]) qsP.appendList(body, prefix+"TagKeys", params["TagKeys"], {"entryPrefix":".member."})
    const resp = await this.#client.performRequest({
      body,
      action: "UntagResource",
    });
    await resp.arrayBuffer(); // consume body without use
  }

}

function Tag_Serialize(body: URLSearchParams, prefix: string, params: s.Tag) {
  body.append(prefix+".Key", (params["Key"] ?? '').toString());
  body.append(prefix+".Value", (params["Value"] ?? '').toString());
}
function Tag_Parse(node: xmlP.XmlNode): s.Tag {
  return node.strings({
    required: {"Key":true,"Value":true},
  });
}

function MessageAttributeValue_Serialize(body: URLSearchParams, prefix: string, params: s.MessageAttributeValue) {
  body.append(prefix+".DataType", (params["DataType"] ?? '').toString());
  if ("StringValue" in params) body.append(prefix+".StringValue", (params["StringValue"] ?? '').toString());
  if ("BinaryValue" in params) body.append(prefix+".BinaryValue", serializeBlob(params["BinaryValue"]) ?? '');
}

function Endpoint_Parse(node: xmlP.XmlNode): s.Endpoint {
  return {
    ...node.strings({
      optional: {"EndpointArn":true},
    }),
    Attributes: xmlP.readXmlMap(node.getList("Attributes", "entry"), x => x.content ?? '', {}),
  };
}

function PlatformApplication_Parse(node: xmlP.XmlNode): s.PlatformApplication {
  return {
    ...node.strings({
      optional: {"PlatformApplicationArn":true},
    }),
    Attributes: xmlP.readXmlMap(node.getList("Attributes", "entry"), x => x.content ?? '', {}),
  };
}

function Subscription_Parse(node: xmlP.XmlNode): s.Subscription {
  return node.strings({
    optional: {"SubscriptionArn":true,"Owner":true,"Protocol":true,"Endpoint":true,"TopicArn":true},
  });
}

function Topic_Parse(node: xmlP.XmlNode): s.Topic {
  return node.strings({
    optional: {"TopicArn":true},
  });
}