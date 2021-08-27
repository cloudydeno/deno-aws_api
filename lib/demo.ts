#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from './client/mod.ts';
const factory = new ApiFactory();

await factory.ensureCredentialsAvailable();


import { STS } from './services/sts/mod.ts';
const sts = new STS(factory);
await sts.getCallerIdentity().then(identity => {
  console.log('You are', identity.UserId, 'in account', identity.Account);
  console.log('ARN:', identity.Arn);
}).catch(console.log);


import { DynamoDB } from './services/dynamodb/mod.ts';
const dynamoDB = new DynamoDB(factory);
console.log(await dynamoDB.listTables().catch(err => err));


import { SQS } from './services/sqs/mod.ts';
const sqs = new SQS(factory);
console.log(await sqs.listQueues().catch(err => err));


import { SNS } from './services/sns/mod.ts';
const sns = new SNS(factory);
console.log(await sns.listTopics().catch(err => err));


import { S3 } from './services/s3/mod.ts';
const s3 = new S3(factory);
console.log(await s3.listBuckets().catch(err => err));
