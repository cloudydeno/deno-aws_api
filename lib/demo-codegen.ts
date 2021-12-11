#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from './client/mod.ts';
const factory = new ApiFactory();

await factory.ensureCredentialsAvailable();

// These imports reference a web service that generates Typescript on the fly

// This import includes full documentation text for each API call
import { STS } from 'https://aws-api.deno.dev/latest/services/sts.ts?docs=full';

const sts = new STS(factory);
await sts.getCallerIdentity().then(identity => {
  console.log('You are', identity.UserId, 'in account', identity.Account);
  console.log('ARN:', identity.Arn);
}).catch(console.log);


// This import only includes one specific API call
import { EC2 } from 'https://aws-api.deno.dev/latest/services/ec2.ts?actions=DescribeInstances';
const ec2 = new EC2(factory);
console.log(await ec2.describeInstances().then(x => x.Reservations).catch(err => err));


import { SQS } from 'https://aws-api.deno.dev/latest/services/sqs.ts';
const sqs = new SQS(factory);
console.log(await sqs.listQueues().catch(err => err));


import { SNS } from 'https://aws-api.deno.dev/latest/services/sns.ts';
const sns = new SNS(factory);
console.log(await sns.listTopics().catch(err => err));


import { S3 } from 'https://aws-api.deno.dev/latest/services/s3.ts';
const s3 = new S3(factory);
console.log(await s3.listBuckets().catch(err => err));
