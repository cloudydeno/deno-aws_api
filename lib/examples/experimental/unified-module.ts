#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

// These imports reference a web service that generates Typescript on the fly
// We're requesting full documentation text for each API & property
import AWS from 'https://aws-api.deno.dev/latest/services/mod.ts?docs=full\
&actions[sts]=GetCallerIdentity\
&actions[ec2]=DescribeInstances\
&actions[sqs]=ListQueues\
&actions[sns]=ListTopics\
&actions[s3]=ListBuckets';

const aws = new AWS();

await aws.sts.getCallerIdentity().then(identity => {
  console.log('You are', identity.UserId, 'in account', identity.Account);
  console.log('ARN:', identity.Arn);
});

console.log(await aws.ec2.describeInstances().then(x => x.Reservations).catch(err => err));

console.log(await aws.sqs.listQueues().catch(err => err));

console.log(await aws.sns.listTopics().catch(err => err));

console.log(await aws.s3.listBuckets().catch(err => err));
