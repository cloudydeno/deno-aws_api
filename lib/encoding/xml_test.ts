import * as xmlP from './xml.ts';
// import type * as SQS from '../generated/sqs@2012-11-05.ts';

function sqsSendMessageBatch(raw: string) {
  const xml = xmlP.parseXml(raw).root;
  const result = xml?.first('SendMessageBatchResult');
  return {
    Successful: result?.getList('SendMessageBatchResultEntry').map(x => ({
      ...x.strings({
        required: {Id: true, MessageId: true, MD5OfMessageBody: true},
      }),
    })),
    Failed: result?.getList('BatchResultErrorEntry').map(x => ({
      ...x.strings({
        required: {Id: true, Code: true, Message: true},
      }),
      SenderFault: x.first('SenderFault', false, x => x.content === 'true'),
    })),
  };
}

console.log(sqsSendMessageBatch(`<?xml version="1.0"?><SendMessageBatchResponse xmlns="http://queue.amazonaws.com/doc/2012-11-05/"><SendMessageBatchResult><SendMessageBatchResultEntry><Id>hi</Id><MessageId>6a3181d4-952c-4f6f-8065-87c4a1cc599c</MessageId><MD5OfMessageBody>5d41402abc4b2a76b9719d911017c592</MD5OfMessageBody></SendMessageBatchResultEntry><SendMessageBatchResultEntry><Id>two</Id><MessageId>ee1b0e57-e9e2-4bc6-a3e1-d0fb6a1410ba</MessageId><MD5OfMessageBody>b32d73e56ec99bc5ec8f83871cde708a</MD5OfMessageBody></SendMessageBatchResultEntry></SendMessageBatchResult><ResponseMetadata><RequestId>98c619c9-1ca8-530b-97fe-4e2792844ea2</RequestId></ResponseMetadata></SendMessageBatchResponse>`));
console.log(sqsSendMessageBatch(`<?xml version="1.0"?><SendMessageBatchResponse xmlns="http://queue.amazonaws.com/doc/2012-11-05/"><SendMessageBatchResult><SendMessageBatchResultEntry><Id>hi</Id><MessageId>3fb453dd-9b90-408c-8d08-a240766abd39</MessageId><MD5OfMessageBody>5d41402abc4b2a76b9719d911017c592</MD5OfMessageBody></SendMessageBatchResultEntry><SendMessageBatchResultEntry><Id>two</Id><MessageId>60eddb77-6a62-4c3b-a106-ad1ddab106dd</MessageId><MD5OfMessageBody>b32d73e56ec99bc5ec8f83871cde708a</MD5OfMessageBody></SendMessageBatchResultEntry><BatchResultErrorEntry><Id>hii</Id><Code>EmptyValue</Code><Message>No Value Found for SendMessageBatchRequestEntry.3.MessageBody.</Message><SenderFault>true</SenderFault></BatchResultErrorEntry></SendMessageBatchResult><ResponseMetadata><RequestId>e5baa5aa-c86d-56f3-8587-f24447f56f70</RequestId></ResponseMetadata></SendMessageBatchResponse>`));

const orig = `<SendMessageBatchResponse xmlns="http://queue.amazonaws.com/doc/2012-11-05/"><SendMessageBatchResult><SendMessageBatchResultEntry><Id>hi&gt;&quot;</Id><MessageId>3fb453dd-9b90-408c-8d08-a240766abd39</MessageId><MD5OfMessageBody>5d41402abc4b2a76b9719d911017c592</MD5OfMessageBody></SendMessageBatchResultEntry><SendMessageBatchResultEntry><Id>two</Id><MessageId>60eddb77-6a62-4c3b-a106-ad1ddab106dd</MessageId><MD5OfMessageBody>b32d73e56ec99bc5ec8f83871cde708a</MD5OfMessageBody></SendMessageBatchResultEntry><BatchResultErrorEntry><Id>hii</Id><Code>EmptyValue</Code><Message>No Value Found for SendMessageBatchRequestEntry.3.MessageBody.</Message><SenderFault>true</SenderFault></BatchResultErrorEntry></SendMessageBatchResult><ResponseMetadata><RequestId>e5baa5aa-c86d-56f3-8587-f24447f56f70&gt;&quot;</RequestId></ResponseMetadata></SendMessageBatchResponse>`;
console.log(orig)
const parsed = xmlP.parseXml(orig).root!;
const stringed = xmlP.stringify(parsed);
console.log(stringed)
console.log('round triped:', orig === stringed)
