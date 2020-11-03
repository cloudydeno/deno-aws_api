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
* `v0.2.0` (future): Completed bindings for all API services.

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
* Kinesis
* DynamoDB

The following credential sources are supported:

* Environment variables
* Static credentials in `~/.aws/credentials`
* EKS Pod Identity (web identity token files)

Some individual features that are implemented:

* Waiters (as `.waitForXYZ({...})`)
* Automatic credential loading

Multiple bits are *missing*:

* Automatic pagination
* AssumeRole credentials
* EC2 instance metadata endpoint
* EC2 instance credentials
* Credential chaining
* Debug logging/tracing of API calls
* Automatic retries
* AWS endpoints other than `**.amazonaws.com` (govcloud, China AWS, etc)

## List of Typechecked API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of aws-sdk-js `v2.780.0`.

| Class | Module | File size | Approx check time |
| --- | --- | ---: | ---: |
| MigrationHub | `AWSMigrationHub@2017-05-31` | 22 KiB | 1.0 sec |
| AccessAnalyzer | `accessanalyzer@2019-11-01` | 26 KiB | 1.5 sec |
| ACM | `acm@2015-12-08` | 21 KiB | 1.4 sec |
| ACMPCA | `acm-pca@2017-08-22` | 29 KiB | 1.1 sec |
| AlexaForBusiness | `alexaforbusiness@2017-11-09` | 116 KiB | 1.9 sec |
| Amplify | `amplify@2017-07-25` | 51 KiB | 1.8 sec |
| APIGateway | `apigateway@2015-07-09` | 152 KiB | 1.8 sec |
| ApiGatewayManagementApi | `apigatewaymanagementapi@2018-11-29` | 3 KiB | 1.0 sec |
| ApiGatewayV2 | `apigatewayv2@2018-11-29` | 121 KiB | 2.1 sec |
| AppConfig | `appconfig@2019-10-09` | 43 KiB | 1.3 sec |
| Appflow | `appflow@2020-08-23` | 89 KiB | 1.9 sec |
| ApplicationAutoScaling | `application-autoscaling@2016-02-06` | 26 KiB | 1.3 sec |
| ApplicationInsights | `application-insights@2018-11-25` | 33 KiB | 1.3 sec |
| AppMesh | `appmesh@2018-10-01` | 30 KiB | 1.2 sec |
| AppMesh | `appmesh@2019-01-25` | 105 KiB | 2.8 sec |
| AppStream | `appstream@2016-12-01` | 69 KiB | 2.4 sec |
| AppSync | `appsync@2017-07-25` | 60 KiB | 1.8 sec |
| Athena | `athena@2017-05-18` | 39 KiB | 2.6 sec |
| AutoScaling | `autoscaling@2011-01-01` | 102 KiB | 3.0 sec |
| AutoScalingPlans | `autoscaling-plans@2018-01-06` | 22 KiB | 1.7 sec |
| Backup | `backup@2018-11-15` | 69 KiB | 4.2 sec |
| Batch | `batch@2016-08-10` | 50 KiB | 2.0 sec |
| Braket | `braket@2019-09-01` | 10 KiB | 1.5 sec |
| Budgets | `budgets@2016-10-20` | 38 KiB | 1.6 sec |
| CostExplorer | `ce@2017-10-25` | 82 KiB | 2.2 sec |
| Chime | `chime@2018-05-01` | 139 KiB | 2.8 sec |
| Cloud9 | `cloud9@2017-09-23` | 15 KiB | 1.3 sec |
| CloudDirectory | `clouddirectory@2016-05-10` | 122 KiB | 2.3 sec |
| CloudDirectory | `clouddirectory@2017-01-11` | 125 KiB | 2.3 sec |
| CloudFormation | `cloudformation@2010-05-15` | 128 KiB | 3.6 sec |
| CloudFront | `cloudfront@2016-11-25` | 82 KiB | 1.9 sec |
| CloudFront | `cloudfront@2017-03-25` | 83 KiB | 1.9 sec |
| CloudFront | `cloudfront@2017-10-30` | 118 KiB | 2.3 sec |
| CloudFront | `cloudfront@2018-06-18` | 119 KiB | 2.4 sec |
| CloudFront | `cloudfront@2018-11-05` | 123 KiB | 2.4 sec |
| CloudFront | `cloudfront@2019-03-26` | 124 KiB | 2.3 sec |
| CloudFront | `cloudfront@2020-05-31` | 182 KiB | 2.9 sec |
| CloudHSM | `cloudhsm@2014-05-30` | 19 KiB | 1.3 sec |
| CloudHSMV2 | `cloudhsmv2@2017-04-28` | 16 KiB | 1.2 sec |
| CloudSearch | `cloudsearch@2011-02-01` | 34 KiB | 1.5 sec |
| CloudSearch | `cloudsearch@2013-01-01` | 58 KiB | 1.7 sec |
| CloudSearchDomain | `cloudsearchdomain@2013-01-01` | 10 KiB | 1.3 sec |
| CloudTrail | `cloudtrail@2013-11-01` | 26 KiB | 1.4 sec |
| CodeArtifact | `codeartifact@2018-09-22` | 53 KiB | 2.0 sec |
| CodeBuild | `codebuild@2016-10-06` | 87 KiB | 1.8 sec |
| CodeCommit | `codecommit@2015-04-13` | 109 KiB | 2.3 sec |
| CodeDeploy | `codedeploy@2014-10-06` | 85 KiB | 2.0 sec |
| CodeGuruReviewer | `codeguru-reviewer@2019-09-19` | 23 KiB | 1.5 sec |
| CodeGuruProfiler | `codeguruprofiler@2019-07-18` | 37 KiB | 1.2 sec |
| CodePipeline | `codepipeline@2015-07-09` | 65 KiB | 1.9 sec |
| CodeStar | `codestar@2017-04-19` | 22 KiB | 1.3 sec |
| CodeStarconnections | `codestar-connections@2019-12-01` | 12 KiB | 1.2 sec |
| CodeStarNotifications | `codestar-notifications@2019-10-15` | 17 KiB | 1.4 sec |
| CognitoIdentity | `cognito-identity@2014-06-30` | 25 KiB | 1.4 sec |
| CognitoIdentityServiceProvider | `cognito-idp@2016-04-18` | 148 KiB | 2.6 sec |
| CognitoSync | `cognito-sync@2014-06-30` | 22 KiB | 1.4 sec |
| Comprehend | `comprehend@2017-11-27` | 93 KiB | 2.1 sec |
| ComprehendMedical | `comprehendmedical@2018-10-30` | 33 KiB | 1.5 sec |
| ComputeOptimizer | `compute-optimizer@2019-11-01` | 25 KiB | 1.4 sec |
| ConfigService | `config@2014-11-12` | 135 KiB | 2.2 sec |
| Connect | `connect@2017-08-08` | 66 KiB | 1.9 sec |
| ConnectParticipant | `connectparticipant@2018-09-07` | 9 KiB | 2.1 sec |
| CUR | `cur@2017-01-06` | 7 KiB | 1.9 sec |
| DataExchange | `dataexchange@2017-07-25` | 37 KiB | 2.5 sec |
| DataPipeline | `datapipeline@2012-10-29` | 23 KiB | 3.2 sec |
| DataSync | `datasync@2018-11-09` | 44 KiB | 1.7 sec |
| DAX | `dax@2017-04-19` | 28 KiB | 3.1 sec |
| Detective | `detective@2018-10-26` | 11 KiB | 3.4 sec |
| DeviceFarm | `devicefarm@2015-06-23` | 102 KiB | 2.4 sec |
| DirectConnect | `directconnect@2012-10-25` | 71 KiB | 3.4 sec |
| Discovery | `discovery@2015-11-01` | 34 KiB | 3.2 sec |
| DLM | `dlm@2018-01-12` | 17 KiB | 2.1 sec |
| DMS | `dms@2016-01-01` | 120 KiB | 3.1 sec |
| DocDB | `docdb@2014-10-31` | 86 KiB | 3.1 sec |
| DirectoryService | `ds@2015-04-16` | 68 KiB | 3.9 sec |
| DynamoDB | `dynamodb@2011-12-05` | 25 KiB | 1.4 sec |
| DynamoDB | `dynamodb@2012-08-10` | 110 KiB | 2.8 sec |
| EBS | `ebs@2019-11-02` | 11 KiB | 1.3 sec |
| EC2 | `ec2@2016-11-15` | 1034 KiB | 14.5 sec |
| EC2InstanceConnect | `ec2-instance-connect@2018-04-02` | 2 KiB | 2.5 sec |
| ECR | `ecr@2015-09-21` | 44 KiB | 1.6 sec |
| ECS | `ecs@2014-11-13` | 118 KiB | 2.1 sec |
| EKS | `eks@2017-11-01` | 42 KiB | 1.7 sec |
| ElasticInference | `elastic-inference@2017-07-25` | 9 KiB | 2.7 sec |
| ElastiCache | `elasticache@2015-02-02` | 147 KiB | 5.5 sec |
| ElasticBeanstalk | `elasticbeanstalk@2010-12-01` | 100 KiB | 3.6 sec |
| EFS | `elasticfilesystem@2015-02-01` | 31 KiB | 3.0 sec |
| ELB | `elasticloadbalancing@2012-06-01` | 48 KiB | 2.0 sec |
| ELBv2 | `elasticloadbalancingv2@2015-12-01` | 77 KiB | 2.3 sec |
| EMR | `elasticmapreduce@2009-03-31` | 98 KiB | 2.2 sec |
| ElasticTranscoder | `elastictranscoder@2012-09-25` | 42 KiB | 1.6 sec |
| SES | `email@2010-12-01` | 98 KiB | 5.1 sec |
| MarketplaceEntitlementService | `entitlement.marketplace@2017-01-11` | 3 KiB | 1.5 sec |
| ES | `es@2015-01-01` | 77 KiB | 1.8 sec |
| EventBridge | `eventbridge@2015-10-07` | 43 KiB | 1.6 sec |
| CloudWatchEvents | `events@2015-10-07` | 43 KiB | 1.6 sec |
| Firehose | `firehose@2015-08-04` | 66 KiB | 5.0 sec |
| FMS | `fms@2018-01-01` | 36 KiB | 1.5 sec |
| ForecastService | `forecast@2018-06-26` | 48 KiB | 5.3 sec |
| ForecastQueryService | `forecastquery@2018-06-26` | 3 KiB | 3.3 sec |
| FraudDetector | `frauddetector@2019-11-15` | 61 KiB | 6.3 sec |
| FSx | `fsx@2018-03-01` | 38 KiB | 4.5 sec |
| GameLift | `gamelift@2015-10-01` | 126 KiB | 7.7 sec |
| Glacier | `glacier@2012-06-01` | 48 KiB | 5.3 sec |
| GlobalAccelerator | `globalaccelerator@2018-08-08` | 30 KiB | 1.5 sec |
| Glue | `glue@2017-03-31` | 219 KiB | 3.3 sec |
| Greengrass | `greengrass@2017-06-07` | 134 KiB | 2.8 sec |
| GroundStation | `groundstation@2019-05-23` | 46 KiB | 1.8 sec |
| GuardDuty | `guardduty@2017-11-28` | 89 KiB | 2.4 sec |
| Health | `health@2016-08-04` | 24 KiB | 1.6 sec |
| Honeycode | `honeycode@2020-03-01` | 5 KiB | 1.6 sec |
| IAM | `iam@2010-05-08` | 167 KiB | 3.0 sec |
| IdentityStore | `identitystore@2020-06-15` | 5 KiB | 1.2 sec |
| Imagebuilder | `imagebuilder@2019-12-02` | 71 KiB | 2.0 sec |
| ImportExport | `importexport@2010-06-01` | 11 KiB | 1.3 sec |
| Inspector | `inspector@2016-02-16` | 51 KiB | 1.6 sec |
| Iot | `iot@2015-05-28` | 331 KiB | 4.0 sec |
| IotData | `iot-data@2015-05-28` | 5 KiB | 1.2 sec |
| IoTJobsDataPlane | `iot-jobs-data@2017-09-29` | 8 KiB | 1.2 sec |
| IoT1ClickDevicesService | `iot1click-devices@2018-05-14` | 14 KiB | 1.3 sec |
| IoT1ClickProjects | `iot1click-projects@2018-05-14` | 18 KiB | 1.4 sec |
| IoTAnalytics | `iotanalytics@2017-11-27` | 68 KiB | 2.0 sec |
| IoTEvents | `iotevents@2018-07-27` | 40 KiB | 1.7 sec |
| IoTEventsData | `iotevents-data@2018-10-23` | 10 KiB | 1.3 sec |
| IoTSecureTunneling | `iotsecuretunneling@2018-10-05` | 10 KiB | 1.2 sec |
| IoTSiteWise | `iotsitewise@2019-12-02` | 95 KiB | 2.1 sec |
| IoTThingsGraph | `iotthingsgraph@2018-09-06` | 42 KiB | 1.6 sec |
| IVS | `ivs@2020-07-14` | 23 KiB | 1.5 sec |
| Kafka | `kafka@2018-11-14` | 53 KiB | 1.9 sec |
| Kendra | `kendra@2019-02-03` | 82 KiB | 2.0 sec |
| Kinesis | `kinesis@2013-12-02` | 31 KiB | 1.4 sec |
| KinesisVideoArchivedMedia | `kinesis-video-archived-media@2017-09-30` | 12 KiB | 1.3 sec |
| KinesisVideoMedia | `kinesis-video-media@2017-09-30` | 3 KiB | 1.2 sec |
| KinesisVideoSignalingChannels | `kinesis-video-signaling@2019-12-04` | 3 KiB | 1.2 sec |
| KinesisAnalytics | `kinesisanalytics@2015-08-14` | 47 KiB | 1.3 sec |
| KinesisAnalyticsV2 | `kinesisanalyticsv2@2018-05-23` | 81 KiB | 1.6 sec |
| KinesisVideo | `kinesisvideo@2017-09-30` | 23 KiB | 1.4 sec |
| KMS | `kms@2014-11-01` | 48 KiB | 1.6 sec |
| LakeFormation | `lakeformation@2017-03-31` | 24 KiB | 1.3 sec |
| Lambda | `lambda@2014-11-11` | 15 KiB | 1.3 sec |
| Lambda | `lambda@2015-03-31` | 81 KiB | 2.1 sec |
| LexModelBuildingService | `lex-models@2017-04-19` | 67 KiB | 2.0 sec |
| LicenseManager | `license-manager@2018-08-01` | 28 KiB | 1.5 sec |
| Lightsail | `lightsail@2016-11-28` | 179 KiB | 2.7 sec |
| CloudWatchLogs | `logs@2014-03-28` | 44 KiB | 1.5 sec |
| MachineLearning | `machinelearning@2014-12-12` | 48 KiB | 3.5 sec |
| Macie | `macie@2017-12-19` | 10 KiB | 1.1 sec |
| Macie2 | `macie2@2020-01-01` | 103 KiB | 2.4 sec |
| ManagedBlockchain | `managedblockchain@2018-09-24` | 40 KiB | 1.6 sec |
| MarketplaceCatalog | `marketplace-catalog@2018-09-17` | 12 KiB | 1.3 sec |
| MarketplaceCommerceAnalytics | `marketplacecommerceanalytics@2015-07-01` | 5 KiB | 1.0 sec |
| MediaConnect | `mediaconnect@2018-11-14` | 42 KiB | 1.8 sec |
| MediaConvert | `mediaconvert@2017-08-29` | 244 KiB | 3.3 sec |
| MediaLive | `medialive@2017-10-14` | 297 KiB | 3.5 sec |
| MediaPackage | `mediapackage@2017-10-12` | 46 KiB | 1.7 sec |
| MediaPackageVod | `mediapackage-vod@2018-11-07` | 32 KiB | 1.5 sec |
| MediaStore | `mediastore@2017-09-01` | 19 KiB | 1.4 sec |
| MediaStoreData | `mediastore-data@2017-09-01` | 7 KiB | 1.2 sec |
| MediaTailor | `mediatailor@2018-04-23` | 17 KiB | 1.4 sec |
| MarketplaceMetering | `meteringmarketplace@2016-01-14` | 6 KiB | 1.1 sec |
| MigrationHubConfig | `migrationhub-config@2019-06-30` | 5 KiB | 1.1 sec |
| Mobile | `mobile@2017-07-01` | 11 KiB | 1.3 sec |
| MobileAnalytics | `mobileanalytics@2014-06-05` | 3 KiB | 1.2 sec |
| CloudWatch | `monitoring@2010-08-01` | 59 KiB | 1.7 sec |
| MQ | `mq@2017-11-27` | 41 KiB | 1.7 sec |
| MTurk | `mturk-requester@2017-01-17` | 52 KiB | 1.7 sec |
| Neptune | `neptune@2014-10-31` | 138 KiB | 2.7 sec |
| NetworkManager | `networkmanager@2019-07-05` | 37 KiB | 1.6 sec |
| OpsWorks | `opsworks@2013-02-18` | 105 KiB | 3.6 sec |
| OpsWorksCM | `opsworkscm@2016-11-01` | 25 KiB | 1.6 sec |
| Organizations | `organizations@2016-11-28` | 51 KiB | 1.7 sec |
| Outposts | `outposts@2019-12-03` | 8 KiB | 1.2 sec |
| Personalize | `personalize@2018-05-22` | 65 KiB | 1.9 sec |
| PersonalizeEvents | `personalize-events@2018-03-22` | 4 KiB | 1.1 sec |
| PersonalizeRuntime | `personalize-runtime@2018-05-22` | 4 KiB | 1.2 sec |
| PI | `pi@2018-02-27` | 7 KiB | 1.1 sec |
| Pinpoint | `pinpoint@2016-12-01` | 240 KiB | 6.3 sec |
| PinpointEmail | `pinpoint-email@2018-07-26` | 62 KiB | 1.8 sec |
| Polly | `polly@2016-06-10` | 15 KiB | 1.5 sec |
| Pricing | `pricing@2017-10-15` | 5 KiB | 1.1 sec |
| QLDB | `qldb@2019-01-02` | 24 KiB | 1.4 sec |
| QLDBSession | `qldb-session@2019-07-11` | 8 KiB | 1.1 sec |
| QuickSight | `quicksight@2018-04-01` | 195 KiB | 3.0 sec |
| RAM | `ram@2018-01-04` | 34 KiB | 1.5 sec |
| RDS | `rds@2013-01-10` | 94 KiB | 2.2 sec |
| RDS | `rds@2013-02-12` | 100 KiB | 2.2 sec |
| RDS | `rds@2013-09-09` | 109 KiB | 3.6 sec |
| RDS | `rds@2014-09-01` | 111 KiB | 2.5 sec |
| RDS | `rds@2014-10-31` | 303 KiB | 4.7 sec |
| RDSDataService | `rds-data@2018-08-01` | 14 KiB | 1.4 sec |
| Redshift | `redshift@2012-12-01` | 177 KiB | 3.4 sec |
| RedshiftData | `redshift-data@2019-12-20` | 13 KiB | 1.2 sec |
| Rekognition | `rekognition@2016-06-27` | 90 KiB | 2.8 sec |
| ResourceGroups | `resource-groups@2017-11-27` | 20 KiB | 1.4 sec |
| ResourceGroupsTaggingAPI | `resourcegroupstaggingapi@2017-01-26` | 11 KiB | 1.2 sec |
| RoboMaker | `robomaker@2018-06-29` | 106 KiB | 2.4 sec |
| Route53 | `route53@2013-04-01` | 91 KiB | 2.1 sec |
| Route53Domains | `route53domains@2014-05-15` | 36 KiB | 1.5 sec |
| Route53Resolver | `route53resolver@2018-04-01` | 40 KiB | 1.5 sec |
| LexRuntime | `runtime.lex@2016-11-28` | 16 KiB | 1.4 sec |
| SageMakerRuntime | `runtime.sagemaker@2017-05-13` | 3 KiB | 1.2 sec |
| S3 | `s3@2006-03-01` | 239 KiB | 3.1 sec |
| S3Control | `s3control@2018-08-20` | 73 KiB | 1.8 sec |
| S3Outposts | `s3outposts@2017-07-25` | 4 KiB | 1.2 sec |
| SageMaker | `sagemaker@2017-07-24` | 368 KiB | 4.1 sec |
| AugmentedAIRuntime | `sagemaker-a2i-runtime@2019-11-07` | 8 KiB | 1.2 sec |
| SavingsPlans | `savingsplans@2019-06-28` | 22 KiB | 1.5 sec |
| Schemas | `schemas@2019-12-02` | 37 KiB | 1.5 sec |
| SimpleDB | `sdb@2009-04-15` | 13 KiB | 1.3 sec |
| SecretsManager | `secretsmanager@2017-10-17` | 23 KiB | 1.4 sec |
| SecurityHub | `securityhub@2018-10-26` | 273 KiB | 3.7 sec |
| ServerlessApplicationRepository | `serverlessrepo@2017-09-08` | 25 KiB | 1.5 sec |
| ServiceQuotas | `service-quotas@2019-06-24` | 21 KiB | 1.3 sec |
| ServiceCatalog | `servicecatalog@2015-12-10` | 124 KiB | 2.3 sec |
| ServiceDiscovery | `servicediscovery@2017-03-14` | 34 KiB | 1.5 sec |
| SESV2 | `sesv2@2019-09-27` | 104 KiB | 2.2 sec |
| Shield | `shield@2016-06-02` | 25 KiB | 1.4 sec |
| Signer | `signer@2017-08-25` | 24 KiB | 1.5 sec |
| SMS | `sms@2016-10-24` | 57 KiB | 1.8 sec |
| PinpointSMSVoice | `sms-voice@2018-09-05` | 14 KiB | 1.3 sec |
| Snowball | `snowball@2016-06-30` | 35 KiB | 1.6 sec |
| SNS | `sns@2010-03-31` | 32 KiB | 1.4 sec |
| SQS | `sqs@2012-11-05` | 28 KiB | 1.4 sec |
| SSM | `ssm@2014-11-06` | 244 KiB | 3.2 sec |
| SSO | `sso@2019-06-10` | 6 KiB | 1.2 sec |
| SSOAdmin | `sso-admin@2020-07-20` | 33 KiB | 1.4 sec |
| SSOOIDC | `sso-oidc@2019-06-10` | 5 KiB | 1.2 sec |
| StepFunctions | `states@2016-11-23` | 44 KiB | 1.6 sec |
| StorageGateway | `storagegateway@2013-06-30` | 96 KiB | 2.1 sec |
| DynamoDBStreams | `streams.dynamodb@2012-08-10` | 10 KiB | 1.2 sec |
| STS | `sts@2011-06-15` | 14 KiB | 1.3 sec |
| Support | `support@2013-04-15` | 21 KiB | 1.3 sec |
| SWF | `swf@2012-01-25` | 102 KiB | 2.0 sec |
| Synthetics | `synthetics@2017-10-11` | 20 KiB | 1.4 sec |
| Textract | `textract@2018-06-27` | 15 KiB | 1.2 sec |
| TimestreamQuery | `timestream-query@2018-11-01` | 6 KiB | 1.1 sec |
| TimestreamWrite | `timestream-write@2018-11-01` | 16 KiB | 1.3 sec |
| TranscribeService | `transcribe@2017-10-26` | 44 KiB | 1.6 sec |
| Transfer | `transfer@2018-11-05` | 24 KiB | 1.5 sec |
| Translate | `translate@2017-07-01` | 16 KiB | 1.6 sec |
| WAF | `waf@2015-08-24` | 92 KiB | 2.2 sec |
| WAFRegional | `waf-regional@2016-11-28` | 95 KiB | 2.2 sec |
| WAFV2 | `wafv2@2019-07-29` | 71 KiB | 2.0 sec |
| WorkDocs | `workdocs@2016-05-01` | 65 KiB | 1.7 sec |
| WorkLink | `worklink@2018-09-25` | 35 KiB | 1.5 sec |
| WorkMail | `workmail@2017-10-01` | 52 KiB | 1.9 sec |
| WorkMailMessageFlow | `workmailmessageflow@2019-05-01` | 2 KiB | 1.2 sec |
| WorkSpaces | `workspaces@2015-04-08` | 67 KiB | 2.0 sec |
| XRay | `xray@2016-04-12` | 47 KiB | 1.8 sec |

[//]: # (Generated Content Barrier)

The check time column is a measurement of how long `deno check` on the file ran for on my laptop, with a sample size of 1.
