import {ApiFactory} from './client/mod.ts';
const factory = new ApiFactory();


import STS from './services/sts@2011-06-15/mod.ts';
const sts = new STS(factory);
await sts.getCallerIdentity().then(identity => {
  console.log('You are', identity.UserId, 'in account', identity.Account);
  console.log('ARN:', identity.Arn);
}).catch(console.log);


import EC2 from './services/ec2@2016-11-15/mod.ts';
const ec2 = new EC2(factory);
console.log(await ec2.describeInstances().then(x => x.Reservations).catch(err => err));


import SQS from './services/sqs@2012-11-05/mod.ts';
const sqs = new SQS(factory);
console.log(await sqs.listQueues().catch(err => err));


import SNS from './services/sns@2010-03-31/mod.ts';
const sns = new SNS(factory);
console.log(await sns.listTopics().catch(err => err));


import S3 from './services/s3@2006-03-01/mod.ts';
const s3 = new S3(factory);
console.log(await s3.listBuckets().catch(err => err));
