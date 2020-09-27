import {ApiFactory} from './deno-client/mod.ts';
const factory = new ApiFactory();

import STS from './generated/sts@2011-06-15.ts';
import SQS from './generated/sqs@2012-11-05.ts';
import S3 from './generated/s3@2006-03-01.ts';

const sts = new STS(factory);
console.log(await sts.getCallerIdentity());

const sqs = new SQS(factory);
console.log(await sqs.listQueues());

const s3 = new S3(factory);
console.log(await s3.listBuckets());
s3.waitFor.


// import {SNS} from 'https://deno.land/x/aws_sdk@v0.0.1/client-sns/SNS.ts';
// new SNS({}).publish({}, {})
