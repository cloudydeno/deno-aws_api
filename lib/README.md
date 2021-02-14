# `aws_api` for Deno

![Test CI](https://github.com/danopia/deno-aws_api/workflows/Deno%20CI/badge.svg?branch=main)
[![Latest /x/ version](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Faws_api%2Fdemo.ts)][x-pkg]
[![external dependency count](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fx%2Faws_api%2Fdemo.ts)][dep-vis]
[![dependency outdatedness](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fupdates%2Fx%2Faws_api%2Fdemo.ts)][dep-vis]

[x-pkg]: https://deno.land/x/aws_api
[dep-vis]: https://deno-visualizer.danopia.net/dependencies-of/https/deno.land/x/aws_api/demo.ts


From-scratch Typescript AWS API client built for Deno.

A leading focus of this library is to be as lean as possible
on the number of files downloaded to use a specific service.
Each service has its own isolated `mod.ts`;
you'll need to make an `ApiFactory` from `client/mod.ts`
and then pass it to the service you want to use.

Package layout:

* `client/`: A handwritten generic AWS API client (credentials, signing, etc)
* `encoding/`: Shared modules for dealing with XML, JSON, & querystrings
* `services/`: Generated Typescript classes and interfaces for all supported AWS services
* `demo.ts`: A trivial example of using this library
* `examples/`: Several full examples of using individual services
* `SERVICES.md`: A complete list of all AWS APIs and their build status

Please reach out on Github Issues about missing features, weird exceptions, or API issues,
or ping `dantheman#8546` in the Deno Discord if you just wanna chat about this effort.

## Usage

Basic example: (a subset of `demo.ts`)

```typescript
import {ApiFactory} from 'https://deno.land/x/aws_api/client/mod.ts';
const factory = new ApiFactory();

import STS from 'https://deno.land/x/aws_api/services/sts@2011-06-15/mod.ts';
const sts = new STS(factory);

const identity = await sts.getCallerIdentity();
console.log('You are', identity.UserId, 'in account', identity.Account);
console.log('Identity ARN:', identity.Arn);
```

A couple more-detailed examples are in `examples/` and show concepts such as
managing an EC2 instance's lifecycle, redriving SQS messages,
and working directly with a Kinesis stream.

## Changelog

* `v0.1.0` on `2020-10-15`: Initial publication with about half of the services bound.
  * Using definitions from `aws-sdk-js@2.768.0`
* `v0.1.1` on `2020-11-02`: Generation improvements, most services have been generated.
  * Using definitions from `aws-sdk-js@2.780.0`
* `v0.2.0` on `2020-11-07`: Completed bindings for all API services.
  * Using definitions from `aws-sdk-js@2.784.0`
* `v0.2.1` on `2020-12-21`: Add EC2 instance metadata integration (IMDSv2)
  * Now supports using EC2 Instance IAM Roles automatically.
  * Using definitions from `aws-sdk-js@2.814.0`
* `v0.3.0` on `2021-02-14`: Clean up generation, rename modules to match AWS-SDK
  * Using definitions from `aws-sdk-js@2.839.0`

## Disclaimer

**This is NOT a port of the official AWS SDK JS.**
Though every AWS service has an API module here,
most have not actually been used yet
and the bindings might make bad assumptions about the API contracts.

Do not use this module in mission critical stuff.
It's supposed to be for automation scripts,
quick & dirty pieces of infrastructure,
and prototype microservices and so on.

If you just want the real, full-fat AWS SDK,
a port of it has been uploaded at
[/x/aws_sdk](https://deno.land/x/aws_sdk).

The generated source code is still pretty messy.
I used this project to learn more about the practicallity of API codegen.
I'll be going through and neatening up the services/ source
which shouldn't affect the published APIs.

Finally, the APIs within `client/` and `encoding/` are liable to change.
For best upgradability, stick to making an `ApiFactory` object
and passing it to the services.
At some point (before 1.0.0) the APIs should be ready to lock in.

## Methodology

All of the clients are compiled from `aws-sdk-js`'s JSON data files.
The code to generate clients isn't uploaded to `/x/`,
so if you want to read through it, make sure you're in the source Git repo.

"Most" of the heavy lifting (such as compiling waiter JMESPaths)
runs in the generation step so that the modules on /x/ are ready to run.

## Completeness

The following clients have been used in actual scripts
and should work quite well:

* SQS
* STS
* EC2
* S3
* Kinesis
* DynamoDB

The following credential sources are supported:

* Environment variables
* Static credentials in `~/.aws/credentials`
* EKS Pod Identity (web identity token files)
* EC2 instance credentials

Some individual features that are implemented:

* Waiters (as `.waitForXYZ({...})`)
* Automatic credential detection / loading
* EC2 instance metadata server v2

Multiple bits are *missing*:

* Automatic pagination (#1)
* AssumeRole credentials (#4)
* Debug logging/tracing of API calls
* Automatic retries
* Getting EKS credentials from regional STS endpoints (#2)
* AWS endpoints other than `**.amazonaws.com` (#3)
    * govcloud, China AWS, IPv6, etc.

## List of Typechecked API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of [aws-sdk-js `v2.839.0`](https://github.com/aws/aws-sdk-js/releases/tag/v2.839.0).

| Module | File size | Approx check time |
| --- | ---: | ---: |
| `accessanalyzer@2019-11-01` | 26 KiB | 1.8 sec |
| `acm@2015-12-08` | 22 KiB | 2.6 sec |
| `acmpca@2017-08-22` | 38 KiB | 1.9 sec |
| `alexaforbusiness@2017-11-09` | 116 KiB | 5.7 sec |
| `amp@2020-08-01` | 7 KiB | 2.1 sec |
| `amplify@2017-07-25` | 51 KiB | 2.4 sec |
| `amplifybackend@2020-08-11` | 49 KiB | 3.1 sec |
| `apigateway@2015-07-09` | 149 KiB | 7.3 sec |
| `apigatewaymanagementapi@2018-11-29` | 3 KiB | 1.2 sec |
| `apigatewayv2@2018-11-29` | 120 KiB | 3.2 sec |
| `appconfig@2019-10-09` | 42 KiB | 2.0 sec |
| `appflow@2020-08-23` | 91 KiB | 2.4 sec |
| `appintegrations@2020-07-29` | 11 KiB | 2.0 sec |
| `applicationautoscaling@2016-02-06` | 26 KiB | 1.7 sec |
| `applicationinsights@2018-11-25` | 34 KiB | 2.5 sec |
| `appmesh@2018-10-01` | 30 KiB | 2.0 sec |
| `appmesh@2019-01-25` | 122 KiB | 3.4 sec |
| `appstream@2016-12-01` | 69 KiB | 2.6 sec |
| `appsync@2017-07-25` | 60 KiB | 3.8 sec |
| `athena@2017-05-18` | 40 KiB | 2.1 sec |
| `auditmanager@2017-07-25` | 80 KiB | 3.2 sec |
| `augmentedairuntime@2019-11-07` | 8 KiB | 1.2 sec |
| `autoscaling@2011-01-01` | 103 KiB | 2.7 sec |
| `autoscalingplans@2018-01-06` | 22 KiB | 2.1 sec |
| `backup@2018-11-15` | 69 KiB | 2.8 sec |
| `batch@2016-08-10` | 53 KiB | 3.3 sec |
| `braket@2019-09-01` | 13 KiB | 2.3 sec |
| `budgets@2016-10-20` | 38 KiB | 3.1 sec |
| `chime@2018-05-01` | 218 KiB | 13.2 sec |
| `cloud9@2017-09-23` | 15 KiB | 2.1 sec |
| `clouddirectory@2016-05-10` | 121 KiB | 4.5 sec |
| `clouddirectory@2017-01-11` | 124 KiB | 3.5 sec |
| `cloudformation@2010-05-15` | 130 KiB | 5.6 sec |
| `cloudfront@2016-11-25` | 83 KiB | 2.8 sec |
| `cloudfront@2017-03-25` | 84 KiB | 4.4 sec |
| `cloudfront@2017-10-30` | 119 KiB | 6.0 sec |
| `cloudfront@2018-06-18` | 119 KiB | 4.8 sec |
| `cloudfront@2018-11-05` | 123 KiB | 5.5 sec |
| `cloudfront@2019-03-26` | 124 KiB | 5.1 sec |
| `cloudfront@2020-05-31` | 182 KiB | 13.5 sec |
| `cloudhsm@2014-05-30` | 19 KiB | 2.2 sec |
| `cloudhsmv2@2017-04-28` | 19 KiB | 2.3 sec |
| `cloudsearch@2011-02-01` | 35 KiB | 2.8 sec |
| `cloudsearch@2013-01-01` | 58 KiB | 7.9 sec |
| `cloudsearchdomain@2013-01-01` | 10 KiB | 2.1 sec |
| `cloudtrail@2013-11-01` | 28 KiB | 2.4 sec |
| `cloudwatch@2010-08-01` | 60 KiB | 3.4 sec |
| `cloudwatchevents@2015-10-07` | 55 KiB | 2.7 sec |
| `cloudwatchlogs@2014-03-28` | 43 KiB | 2.4 sec |
| `codeartifact@2018-09-22` | 55 KiB | 2.9 sec |
| `codebuild@2016-10-06` | 90 KiB | 9.9 sec |
| `codecommit@2015-04-13` | 109 KiB | 2.7 sec |
| `codedeploy@2014-10-06` | 85 KiB | 2.4 sec |
| `codeguruprofiler@2019-07-18` | 36 KiB | 3.4 sec |
| `codegurureviewer@2019-09-19` | 26 KiB | 2.8 sec |
| `codepipeline@2015-07-09` | 65 KiB | 8.7 sec |
| `codestar@2017-04-19` | 22 KiB | 2.5 sec |
| `codestarconnections@2019-12-01` | 13 KiB | 2.2 sec |
| `codestarnotifications@2019-10-15` | 16 KiB | 1.8 sec |
| `cognitoidentity@2014-06-30` | 28 KiB | 5.6 sec |
| `cognitoidentityserviceprovider@2016-04-18` | 150 KiB | 3.4 sec |
| `cognitosync@2014-06-30` | 22 KiB | 1.8 sec |
| `comprehend@2017-11-27` | 98 KiB | 3.7 sec |
| `comprehendmedical@2018-10-30` | 33 KiB | 1.9 sec |
| `computeoptimizer@2019-11-01` | 36 KiB | 6.8 sec |
| `configservice@2014-11-12` | 140 KiB | 10.8 sec |
| `connect@2017-08-08` | 127 KiB | 3.6 sec |
| `connectcontactlens@2020-08-21` | 5 KiB | 1.1 sec |
| `connectparticipant@2018-09-07` | 13 KiB | 1.7 sec |
| `costexplorer@2017-10-25` | 86 KiB | 6.5 sec |
| `cur@2017-01-06` | 7 KiB | 1.2 sec |
| `customerprofiles@2020-08-15` | 43 KiB | 2.3 sec |
| `databrew@2017-07-25` | 58 KiB | 2.8 sec |
| `dataexchange@2017-07-25` | 37 KiB | 1.7 sec |
| `datapipeline@2012-10-29` | 23 KiB | 2.2 sec |
| `datasync@2018-11-09` | 45 KiB | 2.7 sec |
| `dax@2017-04-19` | 28 KiB | 1.7 sec |
| `detective@2018-10-26` | 11 KiB | 1.4 sec |
| `devicefarm@2015-06-23` | 101 KiB | 3.4 sec |
| `devopsguru@2020-12-01` | 43 KiB | 2.8 sec |
| `directconnect@2012-10-25` | 71 KiB | 2.3 sec |
| `directoryservice@2015-04-16` | 75 KiB | 2.8 sec |
| `discovery@2015-11-01` | 34 KiB | 2.7 sec |
| `dlm@2018-01-12` | 23 KiB | 2.3 sec |
| `dms@2016-01-01` | 126 KiB | 3.1 sec |
| `docdb@2014-10-31` | 87 KiB | 4.5 sec |
| `dynamodb@2011-12-05` | 25 KiB | 1.8 sec |
| `dynamodb@2012-08-10` | 123 KiB | 2.9 sec |
| `dynamodbstreams@2012-08-10` | 10 KiB | 1.4 sec |
| `ebs@2019-11-02` | 11 KiB | 1.7 sec |
| `ec2@2016-11-15` | 1111 KiB | 12.9 sec |
| `ec2instanceconnect@2018-04-02` | 2 KiB | 1.2 sec |
| `ecr@2015-09-21` | 50 KiB | 1.9 sec |
| `ecrpublic@2020-10-30` | 28 KiB | 2.0 sec |
| `ecs@2014-11-13` | 123 KiB | 3.1 sec |
| `efs@2015-02-01` | 31 KiB | 2.9 sec |
| `eks@2017-11-01` | 53 KiB | 2.2 sec |
| `elasticache@2015-02-02` | 148 KiB | 3.5 sec |
| `elasticbeanstalk@2010-12-01` | 101 KiB | 3.1 sec |
| `elasticinference@2017-07-25` | 9 KiB | 1.2 sec |
| `elastictranscoder@2012-09-25` | 42 KiB | 1.9 sec |
| `elb@2012-06-01` | 49 KiB | 3.0 sec |
| `elbv2@2015-12-01` | 78 KiB | 2.9 sec |
| `emr@2009-03-31` | 109 KiB | 2.9 sec |
| `emrcontainers@2020-10-01` | 28 KiB | 1.7 sec |
| `es@2015-01-01` | 82 KiB | 2.2 sec |
| `eventbridge@2015-10-07` | 55 KiB | 2.2 sec |
| `firehose@2015-08-04` | 66 KiB | 2.2 sec |
| `fms@2018-01-01` | 41 KiB | 2.1 sec |
| `forecastqueryservice@2018-06-26` | 3 KiB | 1.7 sec |
| `forecastservice@2018-06-26` | 54 KiB | 2.7 sec |
| `frauddetector@2019-11-15` | 66 KiB | 4.0 sec |
| `fsx@2018-03-01` | 42 KiB | 2.8 sec |
| `gamelift@2015-10-01` | 126 KiB | 3.9 sec |
| `glacier@2012-06-01` | 48 KiB | 1.8 sec |
| `globalaccelerator@2018-08-08` | 56 KiB | 2.4 sec |
| `glue@2017-03-31` | 252 KiB | 5.8 sec |
| `greengrass@2017-06-07` | 132 KiB | 4.3 sec |
| `greengrassv2@2020-11-30` | 45 KiB | 1.8 sec |
| `groundstation@2019-05-23` | 46 KiB | 3.5 sec |
| `guardduty@2017-11-28` | 88 KiB | 3.0 sec |
| `health@2016-08-04` | 24 KiB | 2.6 sec |
| `healthlake@2017-07-01` | 14 KiB | 2.7 sec |
| `honeycode@2020-03-01` | 26 KiB | 1.7 sec |
| `iam@2010-05-08` | 168 KiB | 3.3 sec |
| `identitystore@2020-06-15` | 5 KiB | 1.8 sec |
| `imagebuilder@2019-12-02` | 82 KiB | 3.6 sec |
| `importexport@2010-06-01` | 11 KiB | 1.7 sec |
| `inspector@2016-02-16` | 51 KiB | 1.9 sec |
| `iot@2015-05-28` | 354 KiB | 7.4 sec |
| `iot1clickdevicesservice@2018-05-14` | 14 KiB | 2.7 sec |
| `iot1clickprojects@2018-05-14` | 18 KiB | 1.6 sec |
| `iotanalytics@2017-11-27` | 74 KiB | 3.9 sec |
| `iotdata@2015-05-28` | 5 KiB | 1.5 sec |
| `iotdeviceadvisor@2020-09-18` | 22 KiB | 2.2 sec |
| `iotevents@2018-07-27` | 40 KiB | 1.9 sec |
| `ioteventsdata@2018-10-23` | 11 KiB | 1.5 sec |
| `iotfleethub@2020-11-03` | 10 KiB | 1.7 sec |
| `iotjobsdataplane@2017-09-29` | 8 KiB | 1.9 sec |
| `iotsecuretunneling@2018-10-05` | 10 KiB | 1.4 sec |
| `iotsitewise@2019-12-02` | 103 KiB | 4.5 sec |
| `iotthingsgraph@2018-09-06` | 42 KiB | 2.6 sec |
| `iotwireless@2020-11-22` | 70 KiB | 2.5 sec |
| `ivs@2020-07-14` | 23 KiB | 1.6 sec |
| `kafka@2018-11-14` | 54 KiB | 3.2 sec |
| `kendra@2019-02-03` | 94 KiB | 2.9 sec |
| `kinesis@2013-12-02` | 31 KiB | 2.0 sec |
| `kinesisanalytics@2015-08-14` | 47 KiB | 1.9 sec |
| `kinesisanalyticsv2@2018-05-23` | 82 KiB | 2.4 sec |
| `kinesisvideo@2017-09-30` | 23 KiB | 1.7 sec |
| `kinesisvideoarchivedmedia@2017-09-30` | 12 KiB | 1.2 sec |
| `kinesisvideomedia@2017-09-30` | 3 KiB | 1.4 sec |
| `kinesisvideosignalingchannels@2019-12-04` | 3 KiB | 1.1 sec |
| `kms@2014-11-01` | 48 KiB | 2.4 sec |
| `lakeformation@2017-03-31` | 24 KiB | 1.5 sec |
| `lambda@2014-11-11` | 15 KiB | 1.7 sec |
| `lambda@2015-03-31` | 100 KiB | 2.8 sec |
| `lexmodelbuildingservice@2017-04-19` | 69 KiB | 2.9 sec |
| `lexmodelsv2@2020-08-07` | 101 KiB | 5.0 sec |
| `lexruntime@2016-11-28` | 19 KiB | 1.8 sec |
| `lexruntimev2@2020-08-07` | 18 KiB | 1.5 sec |
| `licensemanager@2018-08-01` | 65 KiB | 2.1 sec |
| `lightsail@2016-11-28` | 201 KiB | 3.5 sec |
| `location@2020-11-19` | 45 KiB | 2.1 sec |
| `lookoutvision@2020-11-20` | 28 KiB | 2.5 sec |
| `machinelearning@2014-12-12` | 48 KiB | 2.1 sec |
| `macie@2017-12-19` | 10 KiB | 1.3 sec |
| `macie2@2020-01-01` | 104 KiB | 2.7 sec |
| `managedblockchain@2018-09-24` | 44 KiB | 2.6 sec |
| `marketplacecatalog@2018-09-17` | 12 KiB | 1.6 sec |
| `marketplacecommerceanalytics@2015-07-01` | 5 KiB | 1.5 sec |
| `marketplaceentitlementservice@2017-01-11` | 3 KiB | 1.1 sec |
| `marketplacemetering@2016-01-14` | 7 KiB | 1.2 sec |
| `mediaconnect@2018-11-14` | 42 KiB | 2.7 sec |
| `mediaconvert@2017-08-29` | 252 KiB | 4.3 sec |
| `medialive@2017-10-14` | 306 KiB | 5.5 sec |
| `mediapackage@2017-10-12` | 46 KiB | 2.2 sec |
| `mediapackagevod@2018-11-07` | 31 KiB | 1.7 sec |
| `mediastore@2017-09-01` | 19 KiB | 1.4 sec |
| `mediastoredata@2017-09-01` | 7 KiB | 1.7 sec |
| `mediatailor@2018-04-23` | 17 KiB | 1.3 sec |
| `migrationhub@2017-05-31` | 22 KiB | 2.4 sec |
| `migrationhubconfig@2019-06-30` | 5 KiB | 1.8 sec |
| `mobile@2017-07-01` | 11 KiB | 1.6 sec |
| `mobileanalytics@2014-06-05` | 3 KiB | 1.1 sec |
| `mq@2017-11-27` | 41 KiB | 1.9 sec |
| `mturk@2017-01-17` | 52 KiB | 2.3 sec |
| `mwaa@2020-07-01` | 21 KiB | 2.3 sec |
| `neptune@2014-10-31` | 139 KiB | 3.3 sec |
| `networkfirewall@2020-11-12` | 54 KiB | 2.0 sec |
| `networkmanager@2019-07-05` | 47 KiB | 2.2 sec |
| `opsworks@2013-02-18` | 105 KiB | 2.8 sec |
| `opsworkscm@2016-11-01` | 25 KiB | 1.6 sec |
| `organizations@2016-11-28` | 51 KiB | 2.5 sec |
| `outposts@2019-12-03` | 11 KiB | 2.0 sec |
| `personalize@2018-05-22` | 65 KiB | 3.3 sec |
| `personalizeevents@2018-03-22` | 4 KiB | 1.2 sec |
| `personalizeruntime@2018-05-22` | 4 KiB | 1.2 sec |
| `pi@2018-02-27` | 7 KiB | 1.4 sec |
| `pinpoint@2016-12-01` | 242 KiB | 4.9 sec |
| `pinpointemail@2018-07-26` | 62 KiB | 3.0 sec |
| `pinpointsmsvoice@2018-09-05` | 14 KiB | 1.3 sec |
| `polly@2016-06-10` | 16 KiB | 1.3 sec |
| `pricing@2017-10-15` | 5 KiB | 1.4 sec |
| `qldb@2019-01-02` | 24 KiB | 1.7 sec |
| `qldbsession@2019-07-11` | 10 KiB | 2.1 sec |
| `quicksight@2018-04-01` | 201 KiB | 7.1 sec |
| `ram@2018-01-04` | 34 KiB | 2.5 sec |
| `rds@2013-01-10` | 94 KiB | 2.8 sec |
| `rds@2013-02-12` | 101 KiB | 3.3 sec |
| `rds@2013-09-09` | 109 KiB | 5.4 sec |
| `rds@2014-09-01` | 112 KiB | 3.2 sec |
| `rds@2014-10-31` | 311 KiB | 9.3 sec |
| `rdsdataservice@2018-08-01` | 14 KiB | 2.1 sec |
| `redshift@2012-12-01` | 180 KiB | 7.2 sec |
| `redshiftdata@2019-12-20` | 14 KiB | 1.8 sec |
| `rekognition@2016-06-27` | 91 KiB | 2.8 sec |
| `resourcegroups@2017-11-27` | 22 KiB | 2.7 sec |
| `resourcegroupstaggingapi@2017-01-26` | 11 KiB | 2.2 sec |
| `robomaker@2018-06-29` | 106 KiB | 5.7 sec |
| `route53@2013-04-01` | 99 KiB | 3.3 sec |
| `route53domains@2014-05-15` | 36 KiB | 1.7 sec |
| `route53resolver@2018-04-01` | 43 KiB | 1.8 sec |
| `s3@2006-03-01` | 252 KiB | 4.9 sec |
| `s3control@2018-08-20` | 92 KiB | 2.6 sec |
| `s3outposts@2017-07-25` | 4 KiB | 1.3 sec |
| `sagemaker@2017-07-24` | 534 KiB | 7.0 sec |
| `sagemakeredge@2020-09-23` | 4 KiB | 1.1 sec |
| `sagemakerfeaturestoreruntime@2020-07-01` | 4 KiB | 1.4 sec |
| `sagemakerruntime@2017-05-13` | 3 KiB | 1.0 sec |
| `savingsplans@2019-06-28` | 22 KiB | 1.8 sec |
| `schemas@2019-12-02` | 37 KiB | 1.9 sec |
| `secretsmanager@2017-10-17` | 23 KiB | 1.6 sec |
| `securityhub@2018-10-26` | 295 KiB | 5.0 sec |
| `serverlessapplicationrepository@2017-09-08` | 25 KiB | 1.5 sec |
| `servicecatalog@2015-12-10` | 128 KiB | 3.4 sec |
| `servicecatalogappregistry@2020-06-24` | 23 KiB | 1.5 sec |
| `servicediscovery@2017-03-14` | 34 KiB | 1.7 sec |
| `servicequotas@2019-06-24` | 23 KiB | 2.2 sec |
| `ses@2010-12-01` | 99 KiB | 2.6 sec |
| `sesv2@2019-09-27` | 118 KiB | 2.7 sec |
| `shield@2016-06-02` | 35 KiB | 1.7 sec |
| `signer@2017-08-25` | 34 KiB | 2.2 sec |
| `simpledb@2009-04-15` | 13 KiB | 1.6 sec |
| `sms@2016-10-24` | 57 KiB | 2.5 sec |
| `snowball@2016-06-30` | 36 KiB | 1.8 sec |
| `sns@2010-03-31` | 33 KiB | 1.7 sec |
| `sqs@2012-11-05` | 29 KiB | 2.3 sec |
| `ssm@2014-11-06` | 265 KiB | 5.9 sec |
| `sso@2019-06-10` | 6 KiB | 1.1 sec |
| `ssoadmin@2020-07-20` | 39 KiB | 2.0 sec |
| `ssooidc@2019-06-10` | 5 KiB | 1.1 sec |
| `stepfunctions@2016-11-23` | 46 KiB | 2.2 sec |
| `storagegateway@2013-06-30` | 100 KiB | 2.9 sec |
| `sts@2011-06-15` | 14 KiB | 1.3 sec |
| `support@2013-04-15` | 21 KiB | 1.7 sec |
| `swf@2012-01-25` | 102 KiB | 2.5 sec |
| `synthetics@2017-10-11` | 21 KiB | 1.8 sec |
| `textract@2018-06-27` | 15 KiB | 1.3 sec |
| `timestreamquery@2018-11-01` | 7 KiB | 1.5 sec |
| `timestreamwrite@2018-11-01` | 16 KiB | 1.4 sec |
| `transcribeservice@2017-10-26` | 44 KiB | 2.0 sec |
| `transfer@2018-11-05` | 26 KiB | 1.8 sec |
| `translate@2017-07-01` | 24 KiB | 1.8 sec |
| `waf@2015-08-24` | 91 KiB | 3.2 sec |
| `wafregional@2016-11-28` | 94 KiB | 4.9 sec |
| `wafv2@2019-07-29` | 71 KiB | 2.8 sec |
| `wellarchitected@2020-03-31` | 45 KiB | 2.1 sec |
| `workdocs@2016-05-01` | 65 KiB | 2.2 sec |
| `worklink@2018-09-25` | 34 KiB | 1.6 sec |
| `workmail@2017-10-01` | 52 KiB | 3.7 sec |
| `workmailmessageflow@2019-05-01` | 2 KiB | 1.0 sec |
| `workspaces@2015-04-08` | 67 KiB | 2.3 sec |
| `xray@2016-04-12` | 56 KiB | 2.0 sec |

[//]: # (Generated Content Barrier)

If something new is missing from this list, feel free to open an issue!
