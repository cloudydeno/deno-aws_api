#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import { SQS } from '../services/sqs/mod.ts';

const sqs = new ApiFactory().makeNew(SQS);

// we'll be taking input
import { parseArgs } from "@std/cli";
import { Ask } from '@sallai/ask';

let { dlq, target, automatic } = parseArgs(Deno.args, {
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

function die(message: string, exitCode = 0): never {
  console.log();
  console.log('-->', message);
  console.log();
  Deno.exit(exitCode);
}

// SQS API helper functions

async function getQueueUrl(QueueName: string) {
  const {QueueUrl} = await sqs.getQueueUrl({ QueueName });
  if (!QueueUrl) die(`queue "${QueueName}" could not be resolved to URL`, 5);
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

if (typeof dlq !== 'string') die(`--dlq <queuename> is always required`, 6);
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

if (typeof target !== 'string') die(`Failed to discover target; supply --target <queuename>`, 7);
const targetUrl = target.startsWith('https://') ? target : await getQueueUrl(target);
console.log('    Using target queue', targetUrl);

const {visibleMsgs, notVisibleMsgs} = await getQueueMessageCounts(dlqUrl);
console.log('--> There are approx.', visibleMsgs, 'visible and',
    notVisibleMsgs, 'invisible messages in the DLQ.');

while (true) {
  console.log();
  console.log('    Fetching another letter...');

  const {Messages: [message]} = await sqs.receiveMessage({
    QueueUrl: dlqUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 15,
    AttributeNames: ['SentTimestamp', 'MessageDeduplicationId', 'MessageGroupId', 'ApproximateReceiveCount'],
  });

  if (!message) {
    die(`Received no further messages from queue. Maybe it's empty?`, 0)
  }

  const sentTime = new Date(parseInt(message.Attributes.SentTimestamp ?? '0'));
  console.log('==> Received dead letter',
    'from', Math.floor((new Date().valueOf() - sentTime.valueOf()) / 1000 / 60 / 60), 'hours ago',
    '-', sentTime.toISOString(),
    '- receive #', parseInt(message.Attributes.ApproximateReceiveCount ?? '-1'));
  const { MessageGroupId, MessageDeduplicationId } = message.Attributes;

  console.log({ MessageGroupId, MessageDeduplicationId });
  const hasAttributes = Object.keys(message.MessageAttributes).length > 0;
  if (hasAttributes) {
    console.log('Mesage attributes:', message.MessageAttributes);
  }
  console.log(message.Body);

  let actioned = false;
  while (!actioned) {
    const { action } = await ask.input({
      name: 'action',
      type: 'input',
      message: 'Select action: [j]son / [d]elete / [r]edeliver / [s]kip / [q]uit',
    });
    switch (action?.toString().toLowerCase()[0]) {

      case 'j':
        console.log(JSON.stringify(JSON.parse(message.Body ?? '{}'), null, 2));
        break;

      case 'd':
        await sqs.deleteMessage({
          QueueUrl: dlqUrl,
          ReceiptHandle: message.ReceiptHandle ?? '',
        });
        console.log('--> Dead letter deleted.');
        actioned = true;
        break;

      case 'r':
        await sqs.sendMessage({
          QueueUrl: targetUrl,
          MessageBody: message.Body ?? '',
          MessageAttributes: hasAttributes ? message.MessageAttributes : undefined,
          MessageGroupId, MessageDeduplicationId,
        });
        console.log('--> Message retransmitted to target queue.');
        await sqs.deleteMessage({
          QueueUrl: dlqUrl,
          ReceiptHandle: message.ReceiptHandle ?? '',
        });
        console.log('    Dead letter deleted.');
        actioned = true;
        break;

      case 's':
        actioned = true;
        break;

      case 'q':
        die('Bye!', 0);

    }
  }

}
