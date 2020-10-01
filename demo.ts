import {ApiFactory} from './deno-client/mod.ts';
const factory = new ApiFactory();

import STS from './generated/sts@2011-06-15.ts';
const sts = new STS(factory);
console.log(await sts.getCallerIdentity().catch(err => err));

// const credential = await sts.assumeRole({
//   RoleArn: '',
//   RoleSessionName: '',
// });
// console.log(credential);

// import EC2 from './generated/ec2@2016-11-15.ts';
// const ec2 = new EC2(factory);
// console.log(await ec2.describeInstances().catch(err => err));

// import SQS from './generated/sqs@2012-11-05.ts';
// const sqs = new SQS(factory);
// console.log(await sqs.listQueues().catch(err => err));

// import SNS from './generated/sns@2010-03-31.ts';
// const sns = new SNS(factory);
// console.log(await sns.listTopics().catch(err => err));

// import S3 from './generated/s3@2006-03-01.ts';
// const s3 = new S3(factory);
// console.log(await s3.listBuckets().catch(err => err));
// // s3.waitForBucketExists({Bucket: 'stardust-blobs'})
