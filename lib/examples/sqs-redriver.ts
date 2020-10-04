import { ApiFactory } from '../client/mod.ts';
import SQS from '../services/sqs@2012-11-05.ts';

const factory = new ApiFactory();
const sqs = new SQS(factory);

// we'll be taking input
import { parse as parseFlags } from "https://deno.land/std@0.71.0/flags/mod.ts";
import Ask from 'https://deno.land/x/ask@1.0.5/mod.ts';

let { dlq, target, automatic } = parseFlags(Deno.args, {
  string: ['dlq', 'target'],
  boolean: ['automatic'],
  default: { automatic: false },
});
const ask = new Ask;

// helpers for inactivity

async function selectFromList(list: string[]): Promise<string | undefined> {
  list.forEach((url, idx) => {
    console.log(` ${idx + 1}.`, url);
  });
  const { idx } = await ask.input({
    name: 'idx',
    type: 'number',
    message: 'Enter a number, or 0 to cancel',
  });
  if (typeof idx === 'number' && idx > 0) {
    return list[idx - 1];
  }
}

function die(message: string): never {
  console.log();
  console.log('-->', message);
  console.log();
  Deno.exit(5);
}

// SQS API helper functions

async function getQueueUrl(QueueName: string) {
  const {QueueUrl} = await sqs.getQueueUrl({ QueueName });
  if (!QueueUrl) die(`queue "${QueueName}" could not be resolved to URL`);
  return QueueUrl;
}

async function getQueueMessageCounts(QueueUrl: string) {
  const {Attributes} = await sqs.getQueueAttributes({
    QueueUrl,
    AttributeNames: ['ApproximateNumberOfMessages', 'ApproximateNumberOfMessagesNotVisible'],
  });
  return {
    visibleMsgs: parseInt(Attributes.ApproximateNumberOfMessages ?? '-1'),
    notVisibleMsgs: parseInt(Attributes.ApproximateNumberOfMessagesNotVisible ?? '-1'),
  };
}

// Start business logic

if (typeof dlq !== 'string') die(`--dlq <queuename> is always required`);
const dlqUrl = dlq.startsWith('https://') ? dlq : await getQueueUrl(dlq);
console.log('    Using DLQ', dlqUrl);

if (!target) {
  const { queueUrls } = await sqs.listDeadLetterSourceQueues({ QueueUrl: dlqUrl });
  console.log('    DLQ has', queueUrls.length, 'registered sources');
  if (queueUrls.length === 1) {
    target = queueUrls[0];
  }
  else if (queueUrls.length < 1) {
    console.log('--> Unable to discover any DLQ source');
  }
  else {
    console.log('--> Select a source queue:');
    target = await selectFromList(queueUrls);
  }
}

if (typeof target !== 'string') die(`Failed to discover target; supply --target <queuename>`);
const targetUrl = target.startsWith('https://') ? target : await getQueueUrl(target);
console.log('    Using target queue', targetUrl);

const {visibleMsgs, notVisibleMsgs} = await getQueueMessageCounts(dlqUrl);
console.log('--> There are approx.', visibleMsgs, 'visible and',
    notVisibleMsgs, 'invisible messages in the DLQ.');

while (true) {
  const {Messages: [message]} = await sqs.receiveMessage({
    QueueUrl: dlqUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 15,
    AttributeNames: ['SentTimestamp', 'MessageDeduplicationId', 'MessageGroupId'],
  });
  console.log('==> Received dead letter', message);


  Deno.exit(0);
}
