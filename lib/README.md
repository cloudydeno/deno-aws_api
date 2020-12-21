# `aws_api` for Deno

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

* Automatic pagination
* AssumeRole credentials
* Debug logging/tracing of API calls
* Automatic retries
* Getting EKS credentials from regional STS endpoints
* AWS endpoints other than `**.amazonaws.com` (govcloud, China AWS, etc)

## List of Typechecked API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of aws-sdk-js `v2.784.0`.

The check time column is a measurement of how long `deno check` on the file ran for on my Intel i5 server, with a sample size of 1.

| Class | Module | File size | Approx check time |
| --- | --- | ---: | ---: |
| MigrationHub | `AWSMigrationHub@2017-05-31` | 21 KiB | 0.8 sec |
| AccessAnalyzer | `accessanalyzer@2019-11-01` | 25 KiB | 0.8 sec |
| ACM | `acm@2015-12-08` | 21 KiB | 0.8 sec |
| ACMPCA | `acm-pca@2017-08-22` | 29 KiB | 0.8 sec |
| AlexaForBusiness | `alexaforbusiness@2017-11-09` | 115 KiB | 1.4 sec |
| Amplify | `amplify@2017-07-25` | 50 KiB | 1.0 sec |
| APIGateway | `apigateway@2015-07-09` | 148 KiB | 1.7 sec |
| ApiGatewayManagementApi | `apigatewaymanagementapi@2018-11-29` | 3 KiB | 0.6 sec |
| ApiGatewayV2 | `apigatewayv2@2018-11-29` | 118 KiB | 1.4 sec |
| AppConfig | `appconfig@2019-10-09` | 42 KiB | 0.9 sec |
| Appflow | `appflow@2020-08-23` | 88 KiB | 1.2 sec |
| ApplicationAutoScaling | `application-autoscaling@2016-02-06` | 26 KiB | 2.3 sec |
| ApplicationInsights | `application-insights@2018-11-25` | 32 KiB | 0.9 sec |
| AppMesh | `appmesh@2018-10-01` | 30 KiB | 0.9 sec |
| AppMesh | `appmesh@2019-01-25` | 104 KiB | 1.4 sec |
| AppStream | `appstream@2016-12-01` | 69 KiB | 1.1 sec |
| AppSync | `appsync@2017-07-25` | 59 KiB | 1.1 sec |
| Athena | `athena@2017-05-18` | 38 KiB | 0.9 sec |
| AutoScaling | `autoscaling@2011-01-01` | 102 KiB | 1.3 sec |
| AutoScalingPlans | `autoscaling-plans@2018-01-06` | 22 KiB | 0.8 sec |
| Backup | `backup@2018-11-15` | 67 KiB | 1.1 sec |
| Batch | `batch@2016-08-10` | 49 KiB | 1.0 sec |
| Braket | `braket@2019-09-01` | 13 KiB | 0.8 sec |
| Budgets | `budgets@2016-10-20` | 37 KiB | 0.9 sec |
| CostExplorer | `ce@2017-10-25` | 82 KiB | 1.2 sec |
| Chime | `chime@2018-05-01` | 136 KiB | 1.5 sec |
| Cloud9 | `cloud9@2017-09-23` | 14 KiB | 0.7 sec |
| CloudDirectory | `clouddirectory@2016-05-10` | 120 KiB | 1.3 sec |
| CloudDirectory | `clouddirectory@2017-01-11` | 123 KiB | 1.3 sec |
| CloudFormation | `cloudformation@2010-05-15` | 128 KiB | 1.5 sec |
| CloudFront | `cloudfront@2016-11-25` | 82 KiB | 1.2 sec |
| CloudFront | `cloudfront@2017-03-25` | 83 KiB | 1.2 sec |
| CloudFront | `cloudfront@2017-10-30` | 118 KiB | 1.4 sec |
| CloudFront | `cloudfront@2018-06-18` | 119 KiB | 1.4 sec |
| CloudFront | `cloudfront@2018-11-05` | 123 KiB | 1.4 sec |
| CloudFront | `cloudfront@2019-03-26` | 124 KiB | 1.4 sec |
| CloudFront | `cloudfront@2020-05-31` | 182 KiB | 1.7 sec |
| CloudHSM | `cloudhsm@2014-05-30` | 19 KiB | 0.8 sec |
| CloudHSMV2 | `cloudhsmv2@2017-04-28` | 16 KiB | 0.8 sec |
| CloudSearch | `cloudsearch@2011-02-01` | 34 KiB | 0.9 sec |
| CloudSearch | `cloudsearch@2013-01-01` | 58 KiB | 1.1 sec |
| CloudSearchDomain | `cloudsearchdomain@2013-01-01` | 9 KiB | 0.7 sec |
| CloudTrail | `cloudtrail@2013-11-01` | 26 KiB | 0.8 sec |
| CodeArtifact | `codeartifact@2018-09-22` | 55 KiB | 1.1 sec |
| CodeBuild | `codebuild@2016-10-06` | 87 KiB | 1.2 sec |
| CodeCommit | `codecommit@2015-04-13` | 108 KiB | 1.3 sec |
| CodeDeploy | `codedeploy@2014-10-06` | 84 KiB | 1.2 sec |
| CodeGuruReviewer | `codeguru-reviewer@2019-09-19` | 23 KiB | 0.8 sec |
| CodeGuruProfiler | `codeguruprofiler@2019-07-18` | 36 KiB | 0.9 sec |
| CodePipeline | `codepipeline@2015-07-09` | 64 KiB | 1.1 sec |
| CodeStar | `codestar@2017-04-19` | 22 KiB | 0.8 sec |
| CodeStarconnections | `codestar-connections@2019-12-01` | 12 KiB | 0.7 sec |
| CodeStarNotifications | `codestar-notifications@2019-10-15` | 16 KiB | 0.8 sec |
| CognitoIdentity | `cognito-identity@2014-06-30` | 25 KiB | 0.8 sec |
| CognitoIdentityServiceProvider | `cognito-idp@2016-04-18` | 146 KiB | 1.5 sec |
| CognitoSync | `cognito-sync@2014-06-30` | 22 KiB | 0.8 sec |
| Comprehend | `comprehend@2017-11-27` | 92 KiB | 1.3 sec |
| ComprehendMedical | `comprehendmedical@2018-10-30` | 33 KiB | 0.9 sec |
| ComputeOptimizer | `compute-optimizer@2019-11-01` | 25 KiB | 0.8 sec |
| ConfigService | `config@2014-11-12` | 134 KiB | 1.4 sec |
| Connect | `connect@2017-08-08` | 65 KiB | 1.1 sec |
| ConnectParticipant | `connectparticipant@2018-09-07` | 9 KiB | 0.7 sec |
| CUR | `cur@2017-01-06` | 7 KiB | 0.7 sec |
| DataExchange | `dataexchange@2017-07-25` | 37 KiB | 0.9 sec |
| DataPipeline | `datapipeline@2012-10-29` | 23 KiB | 0.8 sec |
| DataSync | `datasync@2018-11-09` | 44 KiB | 1.0 sec |
| DAX | `dax@2017-04-19` | 28 KiB | 0.9 sec |
| Detective | `detective@2018-10-26` | 11 KiB | 0.7 sec |
| DeviceFarm | `devicefarm@2015-06-23` | 101 KiB | 1.3 sec |
| DirectConnect | `directconnect@2012-10-25` | 70 KiB | 1.1 sec |
| Discovery | `discovery@2015-11-01` | 33 KiB | 0.9 sec |
| DLM | `dlm@2018-01-12` | 17 KiB | 0.8 sec |
| DMS | `dms@2016-01-01` | 121 KiB | 1.4 sec |
| DocDB | `docdb@2014-10-31` | 86 KiB | 1.3 sec |
| DirectoryService | `ds@2015-04-16` | 67 KiB | 1.1 sec |
| DynamoDB | `dynamodb@2011-12-05` | 25 KiB | 0.9 sec |
| DynamoDB | `dynamodb@2012-08-10` | 109 KiB | 1.4 sec |
| EBS | `ebs@2019-11-02` | 11 KiB | 0.7 sec |
| EC2 | `ec2@2016-11-15` | 1044 KiB | 4.5 sec |
| EC2InstanceConnect | `ec2-instance-connect@2018-04-02` | 2 KiB | 0.6 sec |
| ECR | `ecr@2015-09-21` | 44 KiB | 1.0 sec |
| ECS | `ecs@2014-11-13` | 117 KiB | 1.4 sec |
| EKS | `eks@2017-11-01` | 41 KiB | 1.0 sec |
| ElasticInference | `elastic-inference@2017-07-25` | 9 KiB | 0.7 sec |
| ElastiCache | `elasticache@2015-02-02` | 147 KiB | 1.5 sec |
| ElasticBeanstalk | `elasticbeanstalk@2010-12-01` | 100 KiB | 1.3 sec |
| EFS | `elasticfilesystem@2015-02-01` | 31 KiB | 0.9 sec |
| ELB | `elasticloadbalancing@2012-06-01` | 48 KiB | 1.0 sec |
| ELBv2 | `elasticloadbalancingv2@2015-12-01` | 77 KiB | 1.2 sec |
| EMR | `elasticmapreduce@2009-03-31` | 98 KiB | 3.1 sec |
| ElasticTranscoder | `elastictranscoder@2012-09-25` | 42 KiB | 1.0 sec |
| SES | `email@2010-12-01` | 98 KiB | 1.2 sec |
| MarketplaceEntitlementService | `entitlement.marketplace@2017-01-11` | 3 KiB | 0.6 sec |
| ES | `es@2015-01-01` | 76 KiB | 1.1 sec |
| EventBridge | `eventbridge@2015-10-07` | 42 KiB | 0.9 sec |
| CloudWatchEvents | `events@2015-10-07` | 42 KiB | 0.9 sec |
| Firehose | `firehose@2015-08-04` | 66 KiB | 1.0 sec |
| FMS | `fms@2018-01-01` | 36 KiB | 0.9 sec |
| ForecastService | `forecast@2018-06-26` | 47 KiB | 1.0 sec |
| ForecastQueryService | `forecastquery@2018-06-26` | 3 KiB | 0.6 sec |
| FraudDetector | `frauddetector@2019-11-15` | 61 KiB | 1.1 sec |
| FSx | `fsx@2018-03-01` | 38 KiB | 0.9 sec |
| GameLift | `gamelift@2015-10-01` | 125 KiB | 1.4 sec |
| Glacier | `glacier@2012-06-01` | 47 KiB | 1.0 sec |
| GlobalAccelerator | `globalaccelerator@2018-08-08` | 29 KiB | 0.9 sec |
| Glue | `glue@2017-03-31` | 217 KiB | 1.8 sec |
| Greengrass | `greengrass@2017-06-07` | 131 KiB | 1.4 sec |
| GroundStation | `groundstation@2019-05-23` | 45 KiB | 1.0 sec |
| GuardDuty | `guardduty@2017-11-28` | 87 KiB | 1.2 sec |
| Health | `health@2016-08-04` | 24 KiB | 0.8 sec |
| Honeycode | `honeycode@2020-03-01` | 5 KiB | 0.7 sec |
| IAM | `iam@2010-05-08` | 167 KiB | 1.7 sec |
| IdentityStore | `identitystore@2020-06-15` | 5 KiB | 0.7 sec |
| Imagebuilder | `imagebuilder@2019-12-02` | 69 KiB | 1.5 sec |
| ImportExport | `importexport@2010-06-01` | 11 KiB | 0.8 sec |
| Inspector | `inspector@2016-02-16` | 51 KiB | 1.0 sec |
| Iot | `iot@2015-05-28` | 327 KiB | 5.7 sec |
| IotData | `iot-data@2015-05-28` | 5 KiB | 0.7 sec |
| IoTJobsDataPlane | `iot-jobs-data@2017-09-29` | 8 KiB | 0.7 sec |
| IoT1ClickDevicesService | `iot1click-devices@2018-05-14` | 13 KiB | 0.7 sec |
| IoT1ClickProjects | `iot1click-projects@2018-05-14` | 17 KiB | 0.8 sec |
| IoTAnalytics | `iotanalytics@2017-11-27` | 67 KiB | 1.5 sec |
| IoTEvents | `iotevents@2018-07-27` | 40 KiB | 1.0 sec |
| IoTEventsData | `iotevents-data@2018-10-23` | 10 KiB | 0.7 sec |
| IoTSecureTunneling | `iotsecuretunneling@2018-10-05` | 10 KiB | 0.7 sec |
| IoTSiteWise | `iotsitewise@2019-12-02` | 93 KiB | 1.3 sec |
| IoTThingsGraph | `iotthingsgraph@2018-09-06` | 42 KiB | 0.9 sec |
| IVS | `ivs@2020-07-14` | 22 KiB | 0.8 sec |
| Kafka | `kafka@2018-11-14` | 52 KiB | 1.0 sec |
| Kendra | `kendra@2019-02-03` | 82 KiB | 1.2 sec |
| Kinesis | `kinesis@2013-12-02` | 31 KiB | 0.9 sec |
| KinesisVideoArchivedMedia | `kinesis-video-archived-media@2017-09-30` | 12 KiB | 0.7 sec |
| KinesisVideoMedia | `kinesis-video-media@2017-09-30` | 3 KiB | 0.6 sec |
| KinesisVideoSignalingChannels | `kinesis-video-signaling@2019-12-04` | 3 KiB | 0.7 sec |
| KinesisAnalytics | `kinesisanalytics@2015-08-14` | 47 KiB | 0.9 sec |
| KinesisAnalyticsV2 | `kinesisanalyticsv2@2018-05-23` | 81 KiB | 1.1 sec |
| KinesisVideo | `kinesisvideo@2017-09-30` | 22 KiB | 0.8 sec |
| KMS | `kms@2014-11-01` | 47 KiB | 0.9 sec |
| LakeFormation | `lakeformation@2017-03-31` | 24 KiB | 0.8 sec |
| Lambda | `lambda@2014-11-11` | 14 KiB | 0.8 sec |
| Lambda | `lambda@2015-03-31` | 80 KiB | 1.2 sec |
| LexModelBuildingService | `lex-models@2017-04-19` | 66 KiB | 1.1 sec |
| LicenseManager | `license-manager@2018-08-01` | 28 KiB | 0.9 sec |
| Lightsail | `lightsail@2016-11-28` | 177 KiB | 1.7 sec |
| CloudWatchLogs | `logs@2014-03-28` | 43 KiB | 0.9 sec |
| MachineLearning | `machinelearning@2014-12-12` | 47 KiB | 1.0 sec |
| Macie | `macie@2017-12-19` | 10 KiB | 0.7 sec |
| Macie2 | `macie2@2020-01-01` | 101 KiB | 1.4 sec |
| ManagedBlockchain | `managedblockchain@2018-09-24` | 39 KiB | 0.9 sec |
| MarketplaceCatalog | `marketplace-catalog@2018-09-17` | 11 KiB | 0.7 sec |
| MarketplaceCommerceAnalytics | `marketplacecommerceanalytics@2015-07-01` | 5 KiB | 0.6 sec |
| MediaConnect | `mediaconnect@2018-11-14` | 42 KiB | 0.9 sec |
| MediaConvert | `mediaconvert@2017-08-29` | 244 KiB | 1.9 sec |
| MediaLive | `medialive@2017-10-14` | 298 KiB | 2.1 sec |
| MediaPackage | `mediapackage@2017-10-12` | 46 KiB | 1.0 sec |
| MediaPackageVod | `mediapackage-vod@2018-11-07` | 31 KiB | 0.9 sec |
| MediaStore | `mediastore@2017-09-01` | 18 KiB | 0.8 sec |
| MediaStoreData | `mediastore-data@2017-09-01` | 7 KiB | 0.7 sec |
| MediaTailor | `mediatailor@2018-04-23` | 17 KiB | 0.8 sec |
| MarketplaceMetering | `meteringmarketplace@2016-01-14` | 6 KiB | 0.7 sec |
| MigrationHubConfig | `migrationhub-config@2019-06-30` | 5 KiB | 0.7 sec |
| Mobile | `mobile@2017-07-01` | 11 KiB | 0.7 sec |
| MobileAnalytics | `mobileanalytics@2014-06-05` | 3 KiB | 0.7 sec |
| CloudWatch | `monitoring@2010-08-01` | 59 KiB | 1.1 sec |
| MQ | `mq@2017-11-27` | 40 KiB | 1.0 sec |
| MTurk | `mturk-requester@2017-01-17` | 51 KiB | 1.0 sec |
| Neptune | `neptune@2014-10-31` | 138 KiB | 1.5 sec |
| NetworkManager | `networkmanager@2019-07-05` | 36 KiB | 0.9 sec |
| OpsWorks | `opsworks@2013-02-18` | 104 KiB | 1.3 sec |
| OpsWorksCM | `opsworkscm@2016-11-01` | 25 KiB | 0.8 sec |
| Organizations | `organizations@2016-11-28` | 50 KiB | 1.0 sec |
| Outposts | `outposts@2019-12-03` | 8 KiB | 0.7 sec |
| Personalize | `personalize@2018-05-22` | 65 KiB | 1.1 sec |
| PersonalizeEvents | `personalize-events@2018-03-22` | 4 KiB | 0.7 sec |
| PersonalizeRuntime | `personalize-runtime@2018-05-22` | 3 KiB | 0.6 sec |
| PI | `pi@2018-02-27` | 7 KiB | 0.7 sec |
| Pinpoint | `pinpoint@2016-12-01` | 240 KiB | 1.9 sec |
| PinpointEmail | `pinpoint-email@2018-07-26` | 61 KiB | 1.0 sec |
| Polly | `polly@2016-06-10` | 15 KiB | 0.8 sec |
| Pricing | `pricing@2017-10-15` | 5 KiB | 0.7 sec |
| QLDB | `qldb@2019-01-02` | 24 KiB | 0.8 sec |
| QLDBSession | `qldb-session@2019-07-11` | 8 KiB | 0.7 sec |
| QuickSight | `quicksight@2018-04-01` | 196 KiB | 1.7 sec |
| RAM | `ram@2018-01-04` | 33 KiB | 0.9 sec |
| RDS | `rds@2013-01-10` | 94 KiB | 1.3 sec |
| RDS | `rds@2013-02-12` | 100 KiB | 1.3 sec |
| RDS | `rds@2013-09-09` | 109 KiB | 1.3 sec |
| RDS | `rds@2014-09-01` | 111 KiB | 1.4 sec |
| RDS | `rds@2014-10-31` | 303 KiB | 2.1 sec |
| RDSDataService | `rds-data@2018-08-01` | 14 KiB | 0.8 sec |
| Redshift | `redshift@2012-12-01` | 177 KiB | 1.7 sec |
| RedshiftData | `redshift-data@2019-12-20` | 13 KiB | 0.8 sec |
| Rekognition | `rekognition@2016-06-27` | 90 KiB | 1.3 sec |
| ResourceGroups | `resource-groups@2017-11-27` | 20 KiB | 0.8 sec |
| ResourceGroupsTaggingAPI | `resourcegroupstaggingapi@2017-01-26` | 11 KiB | 0.7 sec |
| RoboMaker | `robomaker@2018-06-29` | 103 KiB | 1.4 sec |
| Route53 | `route53@2013-04-01` | 91 KiB | 1.2 sec |
| Route53Domains | `route53domains@2014-05-15` | 35 KiB | 0.9 sec |
| Route53Resolver | `route53resolver@2018-04-01` | 39 KiB | 0.9 sec |
| LexRuntime | `runtime.lex@2016-11-28` | 16 KiB | 0.8 sec |
| SageMakerRuntime | `runtime.sagemaker@2017-05-13` | 3 KiB | 0.6 sec |
| S3 | `s3@2006-03-01` | 240 KiB | 2.0 sec |
| S3Control | `s3control@2018-08-20` | 72 KiB | 1.1 sec |
| S3Outposts | `s3outposts@2017-07-25` | 4 KiB | 0.7 sec |
| SageMaker | `sagemaker@2017-07-24` | 366 KiB | 2.3 sec |
| AugmentedAIRuntime | `sagemaker-a2i-runtime@2019-11-07` | 8 KiB | 0.7 sec |
| SavingsPlans | `savingsplans@2019-06-28` | 22 KiB | 0.8 sec |
| Schemas | `schemas@2019-12-02` | 36 KiB | 0.9 sec |
| SimpleDB | `sdb@2009-04-15` | 13 KiB | 0.8 sec |
| SecretsManager | `secretsmanager@2017-10-17` | 23 KiB | 0.8 sec |
| SecurityHub | `securityhub@2018-10-26` | 272 KiB | 2.0 sec |
| ServerlessApplicationRepository | `serverlessrepo@2017-09-08` | 25 KiB | 0.8 sec |
| ServiceQuotas | `service-quotas@2019-06-24` | 20 KiB | 0.8 sec |
| ServiceCatalog | `servicecatalog@2015-12-10` | 123 KiB | 1.3 sec |
| ServiceDiscovery | `servicediscovery@2017-03-14` | 33 KiB | 0.9 sec |
| SESV2 | `sesv2@2019-09-27` | 116 KiB | 1.3 sec |
| Shield | `shield@2016-06-02` | 24 KiB | 0.8 sec |
| Signer | `signer@2017-08-25` | 24 KiB | 0.9 sec |
| SMS | `sms@2016-10-24` | 56 KiB | 1.1 sec |
| PinpointSMSVoice | `sms-voice@2018-09-05` | 14 KiB | 0.7 sec |
| Snowball | `snowball@2016-06-30` | 35 KiB | 0.9 sec |
| SNS | `sns@2010-03-31` | 32 KiB | 0.9 sec |
| SQS | `sqs@2012-11-05` | 28 KiB | 0.9 sec |
| SSM | `ssm@2014-11-06` | 243 KiB | 2.0 sec |
| SSO | `sso@2019-06-10` | 6 KiB | 0.7 sec |
| SSOAdmin | `sso-admin@2020-07-20` | 33 KiB | 0.9 sec |
| SSOOIDC | `sso-oidc@2019-06-10` | 4 KiB | 0.7 sec |
| StepFunctions | `states@2016-11-23` | 43 KiB | 0.9 sec |
| StorageGateway | `storagegateway@2013-06-30` | 96 KiB | 1.2 sec |
| DynamoDBStreams | `streams.dynamodb@2012-08-10` | 10 KiB | 0.7 sec |
| STS | `sts@2011-06-15` | 14 KiB | 0.8 sec |
| Support | `support@2013-04-15` | 21 KiB | 0.8 sec |
| SWF | `swf@2012-01-25` | 101 KiB | 1.2 sec |
| Synthetics | `synthetics@2017-10-11` | 20 KiB | 0.8 sec |
| Textract | `textract@2018-06-27` | 15 KiB | 0.8 sec |
| TimestreamQuery | `timestream-query@2018-11-01` | 6 KiB | 0.7 sec |
| TimestreamWrite | `timestream-write@2018-11-01` | 15 KiB | 0.8 sec |
| TranscribeService | `transcribe@2017-10-26` | 44 KiB | 1.0 sec |
| Transfer | `transfer@2018-11-05` | 24 KiB | 0.8 sec |
| Translate | `translate@2017-07-01` | 16 KiB | 0.8 sec |
| WAF | `waf@2015-08-24` | 91 KiB | 1.2 sec |
| WAFRegional | `waf-regional@2016-11-28` | 94 KiB | 1.2 sec |
| WAFV2 | `wafv2@2019-07-29` | 70 KiB | 1.1 sec |
| WorkDocs | `workdocs@2016-05-01` | 64 KiB | 1.1 sec |
| WorkLink | `worklink@2018-09-25` | 34 KiB | 0.9 sec |
| WorkMail | `workmail@2017-10-01` | 52 KiB | 1.0 sec |
| WorkMailMessageFlow | `workmailmessageflow@2019-05-01` | 2 KiB | 0.6 sec |
| WorkSpaces | `workspaces@2015-04-08` | 66 KiB | 1.1 sec |
| XRay | `xray@2016-04-12` | 46 KiB | 1.0 sec |

[//]: # (Generated Content Barrier)

If something new is missing from this list, feel free to open an issue!
