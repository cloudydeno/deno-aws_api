// Autogenerated API client for: Amazon Simple Queue Service

export * from "./structs.ts";
import * as Base64 from "https://deno.land/std@0.140.0/encoding/base64.ts";
import * as client from "../../client/common.ts";
import * as qsP from "../../encoding/querystring.ts";
import * as xmlP from "../../encoding/xml.ts";
import type * as s from "./structs.ts";
function serializeBlob(input: string | Uint8Array | null | undefined) {
  if (input == null) return input;
  return Base64.encode(input);
}
function parseBlob(input: string | null | undefined) {
  if (input == null) return input;
  return Base64.decode(input);
}

export class SQS {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(SQS.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2012-11-05",
    "endpointPrefix": "sqs",
    "protocol": "query",
    "serviceAbbreviation": "Amazon SQS",
    "serviceFullName": "Amazon Simple Queue Service",
    "serviceId": "SQS",
    "signatureVersion": "v4",
    "uid": "sqs-2012-11-05",
    "xmlNamespace": "http://queue.amazonaws.com/doc/2012-11-05/"
  };

  async addPermission(
    params: s.AddPermissionRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    body.append(prefix+"Label", (params["Label"] ?? '').toString());
    if (params["AWSAccountIds"]) qsP.appendList(body, prefix+"AWSAccountId", params["AWSAccountIds"], {"entryPrefix":"."})
    if (params["Actions"]) qsP.appendList(body, prefix+"ActionName", params["Actions"], {"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "AddPermission",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async changeMessageVisibility(
    params: s.ChangeMessageVisibilityRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    body.append(prefix+"ReceiptHandle", (params["ReceiptHandle"] ?? '').toString());
    body.append(prefix+"VisibilityTimeout", (params["VisibilityTimeout"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ChangeMessageVisibility",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async changeMessageVisibilityBatch(
    params: s.ChangeMessageVisibilityBatchRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.ChangeMessageVisibilityBatchResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["Entries"]) qsP.appendList(body, prefix+"ChangeMessageVisibilityBatchRequestEntry", params["Entries"], {"appender":ChangeMessageVisibilityBatchRequestEntry_Serialize,"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ChangeMessageVisibilityBatch",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ChangeMessageVisibilityBatchResult");
    return {
      Successful: xml.getList("ChangeMessageVisibilityBatchResultEntry").map(ChangeMessageVisibilityBatchResultEntry_Parse),
      Failed: xml.getList("BatchResultErrorEntry").map(BatchResultErrorEntry_Parse),
    };
  }

  async createQueue(
    params: s.CreateQueueRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.CreateQueueResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueName", (params["QueueName"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attribute", params["Attributes"], {"keyName":".Name","valName":".Value","entryPrefix":"."})
    if (params["tags"]) qsP.appendMap(body, prefix+"Tag", params["tags"], {"keyName":".Key","valName":".Value","entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "CreateQueue",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "CreateQueueResult");
    return xml.strings({
      optional: {"QueueUrl":true},
    });
  }

  async deleteMessage(
    params: s.DeleteMessageRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    body.append(prefix+"ReceiptHandle", (params["ReceiptHandle"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "DeleteMessage",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async deleteMessageBatch(
    params: s.DeleteMessageBatchRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.DeleteMessageBatchResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["Entries"]) qsP.appendList(body, prefix+"DeleteMessageBatchRequestEntry", params["Entries"], {"appender":DeleteMessageBatchRequestEntry_Serialize,"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "DeleteMessageBatch",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "DeleteMessageBatchResult");
    return {
      Successful: xml.getList("DeleteMessageBatchResultEntry").map(DeleteMessageBatchResultEntry_Parse),
      Failed: xml.getList("BatchResultErrorEntry").map(BatchResultErrorEntry_Parse),
    };
  }

  async deleteQueue(
    params: s.DeleteQueueRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "DeleteQueue",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async getQueueAttributes(
    params: s.GetQueueAttributesRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.GetQueueAttributesResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["AttributeNames"]) qsP.appendList(body, prefix+"AttributeName", params["AttributeNames"], {"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "GetQueueAttributes",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetQueueAttributesResult");
    return {
      Attributes: xmlP.readXmlMap(xml.getList("Attribute"), x => x.content ?? '', {"keyName":"Name","valName":"Value"}),
    };
  }

  async getQueueUrl(
    params: s.GetQueueUrlRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.GetQueueUrlResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueName", (params["QueueName"] ?? '').toString());
    if ("QueueOwnerAWSAccountId" in params) body.append(prefix+"QueueOwnerAWSAccountId", (params["QueueOwnerAWSAccountId"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "GetQueueUrl",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "GetQueueUrlResult");
    return xml.strings({
      optional: {"QueueUrl":true},
    });
  }

  async listDeadLetterSourceQueues(
    params: s.ListDeadLetterSourceQueuesRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.ListDeadLetterSourceQueuesResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    if ("MaxResults" in params) body.append(prefix+"MaxResults", (params["MaxResults"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ListDeadLetterSourceQueues",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListDeadLetterSourceQueuesResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      queueUrls: xml.getList("QueueUrl").map(x => x.content ?? ''),
    };
  }

  async listQueueTags(
    params: s.ListQueueTagsRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.ListQueueTagsResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ListQueueTags",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListQueueTagsResult");
    return {
      Tags: xmlP.readXmlMap(xml.getList("Tag"), x => x.content ?? '', {"keyName":"Key","valName":"Value"}),
    };
  }

  async listQueues(
    params: s.ListQueuesRequest = {},
    opts: client.RequestOptions = {},
  ): Promise<s.ListQueuesResult> {
    const body = new URLSearchParams;
    const prefix = '';
    if ("QueueNamePrefix" in params) body.append(prefix+"QueueNamePrefix", (params["QueueNamePrefix"] ?? '').toString());
    if ("NextToken" in params) body.append(prefix+"NextToken", (params["NextToken"] ?? '').toString());
    if ("MaxResults" in params) body.append(prefix+"MaxResults", (params["MaxResults"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ListQueues",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ListQueuesResult");
    return {
      ...xml.strings({
        optional: {"NextToken":true},
      }),
      QueueUrls: xml.getList("QueueUrl").map(x => x.content ?? ''),
    };
  }

  async purgeQueue(
    params: s.PurgeQueueRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "PurgeQueue",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async receiveMessage(
    params: s.ReceiveMessageRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.ReceiveMessageResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["AttributeNames"]) qsP.appendList(body, prefix+"AttributeName", params["AttributeNames"], {"entryPrefix":"."})
    if (params["MessageAttributeNames"]) qsP.appendList(body, prefix+"MessageAttributeName", params["MessageAttributeNames"], {"entryPrefix":"."})
    if ("MaxNumberOfMessages" in params) body.append(prefix+"MaxNumberOfMessages", (params["MaxNumberOfMessages"] ?? '').toString());
    if ("VisibilityTimeout" in params) body.append(prefix+"VisibilityTimeout", (params["VisibilityTimeout"] ?? '').toString());
    if ("WaitTimeSeconds" in params) body.append(prefix+"WaitTimeSeconds", (params["WaitTimeSeconds"] ?? '').toString());
    if ("ReceiveRequestAttemptId" in params) body.append(prefix+"ReceiveRequestAttemptId", (params["ReceiveRequestAttemptId"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "ReceiveMessage",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "ReceiveMessageResult");
    return {
      Messages: xml.getList("Message").map(Message_Parse),
    };
  }

  async removePermission(
    params: s.RemovePermissionRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    body.append(prefix+"Label", (params["Label"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "RemovePermission",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async sendMessage(
    params: s.SendMessageRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.SendMessageResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    body.append(prefix+"MessageBody", (params["MessageBody"] ?? '').toString());
    if ("DelaySeconds" in params) body.append(prefix+"DelaySeconds", (params["DelaySeconds"] ?? '').toString());
    if (params["MessageAttributes"]) qsP.appendMap(body, prefix+"MessageAttribute", params["MessageAttributes"], {"appender":MessageAttributeValue_Serialize,"keyName":".Name","valName":".Value","entryPrefix":"."})
    if (params["MessageSystemAttributes"]) qsP.appendMap(body, prefix+"MessageSystemAttribute", params["MessageSystemAttributes"], {"appender":MessageSystemAttributeValue_Serialize,"keyName":".Name","valName":".Value","entryPrefix":"."})
    if ("MessageDeduplicationId" in params) body.append(prefix+"MessageDeduplicationId", (params["MessageDeduplicationId"] ?? '').toString());
    if ("MessageGroupId" in params) body.append(prefix+"MessageGroupId", (params["MessageGroupId"] ?? '').toString());
    const resp = await this.#client.performRequest({
      opts, body,
      action: "SendMessage",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SendMessageResult");
    return xml.strings({
      optional: {"MD5OfMessageBody":true,"MD5OfMessageAttributes":true,"MD5OfMessageSystemAttributes":true,"MessageId":true,"SequenceNumber":true},
    });
  }

  async sendMessageBatch(
    params: s.SendMessageBatchRequest,
    opts: client.RequestOptions = {},
  ): Promise<s.SendMessageBatchResult> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["Entries"]) qsP.appendList(body, prefix+"SendMessageBatchRequestEntry", params["Entries"], {"appender":SendMessageBatchRequestEntry_Serialize,"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "SendMessageBatch",
    });
    const xml = xmlP.readXmlResult(await resp.text(), "SendMessageBatchResult");
    return {
      Successful: xml.getList("SendMessageBatchResultEntry").map(SendMessageBatchResultEntry_Parse),
      Failed: xml.getList("BatchResultErrorEntry").map(BatchResultErrorEntry_Parse),
    };
  }

  async setQueueAttributes(
    params: s.SetQueueAttributesRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["Attributes"]) qsP.appendMap(body, prefix+"Attribute", params["Attributes"], {"keyName":".Name","valName":".Value","entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "SetQueueAttributes",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async tagQueue(
    params: s.TagQueueRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["Tags"]) qsP.appendMap(body, prefix+"Tag", params["Tags"], {"keyName":".Key","valName":".Value","entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "TagQueue",
    });
    await resp.arrayBuffer(); // consume body without use
  }

  async untagQueue(
    params: s.UntagQueueRequest,
    opts: client.RequestOptions = {},
  ): Promise<void> {
    const body = new URLSearchParams;
    const prefix = '';
    body.append(prefix+"QueueUrl", (params["QueueUrl"] ?? '').toString());
    if (params["TagKeys"]) qsP.appendList(body, prefix+"TagKey", params["TagKeys"], {"entryPrefix":"."})
    const resp = await this.#client.performRequest({
      opts, body,
      action: "UntagQueue",
    });
    await resp.arrayBuffer(); // consume body without use
  }

}

function ChangeMessageVisibilityBatchRequestEntry_Serialize(body: URLSearchParams, prefix: string, params: s.ChangeMessageVisibilityBatchRequestEntry) {
  body.append(prefix+".Id", (params["Id"] ?? '').toString());
  body.append(prefix+".ReceiptHandle", (params["ReceiptHandle"] ?? '').toString());
  if ("VisibilityTimeout" in params) body.append(prefix+".VisibilityTimeout", (params["VisibilityTimeout"] ?? '').toString());
}

function DeleteMessageBatchRequestEntry_Serialize(body: URLSearchParams, prefix: string, params: s.DeleteMessageBatchRequestEntry) {
  body.append(prefix+".Id", (params["Id"] ?? '').toString());
  body.append(prefix+".ReceiptHandle", (params["ReceiptHandle"] ?? '').toString());
}

function MessageAttributeValue_Serialize(body: URLSearchParams, prefix: string, params: s.MessageAttributeValue) {
  if ("StringValue" in params) body.append(prefix+".StringValue", (params["StringValue"] ?? '').toString());
  if ("BinaryValue" in params) body.append(prefix+".BinaryValue", serializeBlob(params["BinaryValue"]) ?? '');
  if (params["StringListValues"]) qsP.appendList(body, prefix+".StringListValue", params["StringListValues"], {"entryPrefix":"."})
  if (params["BinaryListValues"]) qsP.appendList(body, prefix+".BinaryListValue", params["BinaryListValues"], {"encoder":(x)=>serializeBlob(x) ?? '',"entryPrefix":"."})
  body.append(prefix+".DataType", (params["DataType"] ?? '').toString());
}
function MessageAttributeValue_Parse(node: xmlP.XmlNode): s.MessageAttributeValue {
  return {
    ...node.strings({
      required: {"DataType":true},
      optional: {"StringValue":true},
    }),
    BinaryValue: node.first("BinaryValue", false, x => parseBlob(x.content) ?? new Uint8Array(0)),
    StringListValues: node.getList("StringListValue").map(x => x.content ?? ''),
    BinaryListValues: node.getList("BinaryListValue").map(x => parseBlob(x.content) ?? new Uint8Array(0)),
  };
}

function MessageSystemAttributeValue_Serialize(body: URLSearchParams, prefix: string, params: s.MessageSystemAttributeValue) {
  if ("StringValue" in params) body.append(prefix+".StringValue", (params["StringValue"] ?? '').toString());
  if ("BinaryValue" in params) body.append(prefix+".BinaryValue", serializeBlob(params["BinaryValue"]) ?? '');
  if (params["StringListValues"]) qsP.appendList(body, prefix+".StringListValue", params["StringListValues"], {"entryPrefix":"."})
  if (params["BinaryListValues"]) qsP.appendList(body, prefix+".BinaryListValue", params["BinaryListValues"], {"encoder":(x)=>serializeBlob(x) ?? '',"entryPrefix":"."})
  body.append(prefix+".DataType", (params["DataType"] ?? '').toString());
}

function SendMessageBatchRequestEntry_Serialize(body: URLSearchParams, prefix: string, params: s.SendMessageBatchRequestEntry) {
  body.append(prefix+".Id", (params["Id"] ?? '').toString());
  body.append(prefix+".MessageBody", (params["MessageBody"] ?? '').toString());
  if ("DelaySeconds" in params) body.append(prefix+".DelaySeconds", (params["DelaySeconds"] ?? '').toString());
  if (params["MessageAttributes"]) qsP.appendMap(body, prefix+".MessageAttribute", params["MessageAttributes"], {"appender":MessageAttributeValue_Serialize,"keyName":".Name","valName":".Value","entryPrefix":"."})
  if (params["MessageSystemAttributes"]) qsP.appendMap(body, prefix+".MessageSystemAttribute", params["MessageSystemAttributes"], {"appender":MessageSystemAttributeValue_Serialize,"keyName":".Name","valName":".Value","entryPrefix":"."})
  if ("MessageDeduplicationId" in params) body.append(prefix+".MessageDeduplicationId", (params["MessageDeduplicationId"] ?? '').toString());
  if ("MessageGroupId" in params) body.append(prefix+".MessageGroupId", (params["MessageGroupId"] ?? '').toString());
}

function ChangeMessageVisibilityBatchResultEntry_Parse(node: xmlP.XmlNode): s.ChangeMessageVisibilityBatchResultEntry {
  return node.strings({
    required: {"Id":true},
  });
}

function BatchResultErrorEntry_Parse(node: xmlP.XmlNode): s.BatchResultErrorEntry {
  return {
    ...node.strings({
      required: {"Id":true,"Code":true},
      optional: {"Message":true},
    }),
    SenderFault: node.first("SenderFault", true, x => x.content === 'true'),
  };
}

function DeleteMessageBatchResultEntry_Parse(node: xmlP.XmlNode): s.DeleteMessageBatchResultEntry {
  return node.strings({
    required: {"Id":true},
  });
}

function Message_Parse(node: xmlP.XmlNode): s.Message {
  return {
    ...node.strings({
      optional: {"MessageId":true,"ReceiptHandle":true,"MD5OfBody":true,"Body":true,"MD5OfMessageAttributes":true},
    }),
    Attributes: xmlP.readXmlMap(node.getList("Attribute"), x => x.content ?? '', {"keyName":"Name","valName":"Value"}),
    MessageAttributes: xmlP.readXmlMap(node.getList("MessageAttribute"), MessageAttributeValue_Parse, {"keyName":"Name","valName":"Value"}),
  };
}

function SendMessageBatchResultEntry_Parse(node: xmlP.XmlNode): s.SendMessageBatchResultEntry {
  return node.strings({
    required: {"Id":true,"MessageId":true,"MD5OfMessageBody":true},
    optional: {"MD5OfMessageAttributes":true,"MD5OfMessageSystemAttributes":true,"SequenceNumber":true},
  });
}
