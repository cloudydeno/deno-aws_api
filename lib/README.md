# `aws_api` for Deno

Artisanal, pure Typescript AWS API client built for Deno. This is NOT a port of the official AWS SDK JS.

Package layout:

* `client/`: A handwritten generic AWS API client (credentials, signing, etc)
* `services/`: Generated Typescript classes and interfaces for all supported AWS services
* `demo.ts`: A trivial example of using this library
* `examples/`: Several full examples of using individual services
* `SERVICES.md`: A full list of all AWS APIs and their build status

Only some services have completed clients at this time. Please reach out on Github Issues about missing clients or API issues, or ping `dantheman#8546` in the Deno Discord if you just wanna chat about this effort.

## List of Typechecked API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of aws-sdk-js `v2.768.0`.

| Class | Module | Protocol | File size | Approx check time |
| --- | --- | --- | ---: | ---: |
| MigrationHub | `AWSMigrationHub@2017-05-31.ts` | json | 19 KiB | 1.0 sec |
| ACMPCA | `acm-pca@2017-08-22.ts` | json | 27 KiB | 1.2 sec |
| AlexaForBusiness | `alexaforbusiness@2017-11-09.ts` | json | 107 KiB | 1.9 sec |
| ApplicationAutoScaling | `application-autoscaling@2016-02-06.ts` | json | 25 KiB | 1.4 sec |
| Athena | `athena@2017-05-18.ts` | json | 35 KiB | 1.4 sec |
| AutoScaling | `autoscaling@2011-01-01.ts` | query | 101 KiB | 1.2 sec |
| AutoScalingPlans | `autoscaling-plans@2018-01-06.ts` | json | 22 KiB | 1.2 sec |
| Budgets | `budgets@2016-10-20.ts` | json | 20 KiB | 1.2 sec |
| CostExplorer | `ce@2017-10-25.ts` | json | 77 KiB | 1.7 sec |
| Cloud9 | `cloud9@2017-09-23.ts` | json | 14 KiB | 1.1 sec |
| CloudFormation | `cloudformation@2010-05-15.ts` | query | 126 KiB | 1.6 sec |
| CloudHSM | `cloudhsm@2014-05-30.ts` | json | 17 KiB | 1.2 sec |
| CloudHSMV2 | `cloudhsmv2@2017-04-28.ts` | json | 15 KiB | 1.2 sec |
| CloudSearch | `cloudsearch@2011-02-01.ts` | query | 34 KiB | 0.7 sec |
| CloudSearch | `cloudsearch@2013-01-01.ts` | query | 57 KiB | 0.9 sec |
| CloudTrail | `cloudtrail@2013-11-01.ts` | json | 23 KiB | 1.7 sec |
| CodeCommit | `codecommit@2015-04-13.ts` | json | 95 KiB | 2.8 sec |
| CodePipeline | `codepipeline@2015-07-09.ts` | json | 60 KiB | 2.1 sec |
| CodeStar | `codestar@2017-04-19.ts` | json | 19 KiB | 1.5 sec |
| CodeStarconnections | `codestar-connections@2019-12-01.ts` | json | 11 KiB | 1.3 sec |
| CognitoIdentityServiceProvider | `cognito-idp@2016-04-18.ts` | json | 131 KiB | 2.6 sec |
| Comprehend | `comprehend@2017-11-27.ts` | json | 87 KiB | 2.0 sec |
| ComprehendMedical | `comprehendmedical@2018-10-30.ts` | json | 34 KiB | 1.5 sec |
| ComputeOptimizer | `compute-optimizer@2019-11-01.ts` | json | 23 KiB | 1.4 sec |
| ConfigService | `config@2014-11-12.ts` | json | 127 KiB | 2.4 sec |
| CUR | `cur@2017-01-06.ts` | json | 8 KiB | 1.2 sec |
| DataPipeline | `datapipeline@2012-10-29.ts` | json | 20 KiB | 1.4 sec |
| DataSync | `datasync@2018-11-09.ts` | json | 42 KiB | 1.7 sec |
| DAX | `dax@2017-04-19.ts` | json | 25 KiB | 1.4 sec |
| Discovery | `discovery@2015-11-01.ts` | json | 32 KiB | 1.6 sec |
| DocDB | `docdb@2014-10-31.ts` | query | 85 KiB | 1.2 sec |
| DirectoryService | `ds@2015-04-16.ts` | json | 64 KiB | 1.8 sec |
| EC2 | `ec2@2016-11-15.ts` | ec2 | 1019 KiB | 6.7 sec |
| EC2InstanceConnect | `ec2-instance-connect@2018-04-02.ts` | json | 2 KiB | 1.0 sec |
| ElastiCache | `elasticache@2015-02-02.ts` | query | 131 KiB | 1.6 sec |
| ElasticBeanstalk | `elasticbeanstalk@2010-12-01.ts` | query | 99 KiB | 1.4 sec |
| ELB | `elasticloadbalancing@2012-06-01.ts` | query | 47 KiB | 0.9 sec |
| ELBv2 | `elasticloadbalancingv2@2015-12-01.ts` | query | 76 KiB | 1.3 sec |
| EMR | `elasticmapreduce@2009-03-31.ts` | json | 95 KiB | 2.3 sec |
| SES | `email@2010-12-01.ts` | query | 96 KiB | 1.3 sec |
| MarketplaceEntitlementService | `entitlement.marketplace@2017-01-11.ts` | json | 3 KiB | 1.1 sec |
| EventBridge | `eventbridge@2015-10-07.ts` | json | 37 KiB | 1.5 sec |
| CloudWatchEvents | `events@2015-10-07.ts` | json | 37 KiB | 1.5 sec |
| Firehose | `firehose@2015-08-04.ts` | json | 62 KiB | 1.7 sec |
| ForecastService | `forecast@2018-06-26.ts` | json | 44 KiB | 1.7 sec |
| ForecastQueryService | `forecastquery@2018-06-26.ts` | json | 2 KiB | 1.1 sec |
| FraudDetector | `frauddetector@2019-11-15.ts` | json | 55 KiB | 1.9 sec |
| FSx | `fsx@2018-03-01.ts` | json | 36 KiB | 1.6 sec |
| GameLift | `gamelift@2015-10-01.ts` | json | 119 KiB | 2.4 sec |
| GlobalAccelerator | `globalaccelerator@2018-08-08.ts` | json | 27 KiB | 1.5 sec |
| Health | `health@2016-08-04.ts` | json | 22 KiB | 1.4 sec |
| IAM | `iam@2010-05-08.ts` | query | 164 KiB | 2.5 sec |
| IdentityStore | `identitystore@2020-06-15.ts` | json | 5 KiB | 1.2 sec |
| ImportExport | `importexport@2010-06-01.ts` | query | 11 KiB | 0.6 sec |
| IoTSecureTunneling | `iotsecuretunneling@2018-10-05.ts` | json | 9 KiB | 1.2 sec |
| IoTThingsGraph | `iotthingsgraph@2018-09-06.ts` | json | 40 KiB | 1.6 sec |
| Kendra | `kendra@2019-02-03.ts` | json | 67 KiB | 1.9 sec |
| KMS | `kms@2014-11-01.ts` | json | 44 KiB | 1.7 sec |
| LakeFormation | `lakeformation@2017-03-31.ts` | json | 21 KiB | 1.4 sec |
| LicenseManager | `license-manager@2018-08-01.ts` | json | 25 KiB | 1.4 sec |
| Macie | `macie@2017-12-19.ts` | json | 9 KiB | 1.3 sec |
| MarketplaceCommerceAnalytics | `marketplacecommerceanalytics@2015-07-01.ts` | json | 4 KiB | 1.1 sec |
| MediaStore | `mediastore@2017-09-01.ts` | json | 17 KiB | 1.3 sec |
| MarketplaceMetering | `meteringmarketplace@2016-01-14.ts` | json | 5 KiB | 1.2 sec |
| MigrationHubConfig | `migrationhub-config@2019-06-30.ts` | json | 4 KiB | 1.1 sec |
| CloudWatch | `monitoring@2010-08-01.ts` | query | 59 KiB | 1.1 sec |
| MTurk | `mturk-requester@2017-01-17.ts` | json | 46 KiB | 1.7 sec |
| Neptune | `neptune@2014-10-31.ts` | query | 128 KiB | 1.6 sec |
| OpsWorksCM | `opsworkscm@2016-11-01.ts` | json | 23 KiB | 1.5 sec |
| Organizations | `organizations@2016-11-28.ts` | json | 48 KiB | 1.8 sec |
| Personalize | `personalize@2018-05-22.ts` | json | 59 KiB | 1.9 sec |
| PI | `pi@2018-02-27.ts` | json | 6 KiB | 1.2 sec |
| Pricing | `pricing@2017-10-15.ts` | json | 4 KiB | 1.1 sec |
| QLDBSession | `qldb-session@2019-07-11.ts` | json | 8 KiB | 1.1 sec |
| RDS | `rds@2013-01-10.ts` | query | 92 KiB | 1.4 sec |
| RDS | `rds@2013-02-12.ts` | query | 99 KiB | 2.1 sec |
| RDS | `rds@2013-09-09.ts` | query | 107 KiB | 3.6 sec |
| RDS | `rds@2014-09-01.ts` | query | 110 KiB | 4.5 sec |
| RDS | `rds@2014-10-31.ts` | query | 299 KiB | 3.7 sec |
| Redshift | `redshift@2012-12-01.ts` | query | 175 KiB | 4.5 sec |
| ResourceGroupsTaggingAPI | `resourcegroupstaggingapi@2017-01-26.ts` | json | 10 KiB | 1.2 sec |
| Route53Domains | `route53domains@2014-05-15.ts` | json | 39 KiB | 1.8 sec |
| Route53Resolver | `route53resolver@2018-04-01.ts` | json | 38 KiB | 1.6 sec |
| SageMaker | `sagemaker@2017-07-24.ts` | json | 327 KiB | 4.0 sec |
| SimpleDB | `sdb@2009-04-15.ts` | query | 13 KiB | 0.5 sec |
| SecretsManager | `secretsmanager@2017-10-17.ts` | json | 20 KiB | 1.4 sec |
| ServiceQuotas | `service-quotas@2019-06-24.ts` | json | 19 KiB | 1.3 sec |
| Shield | `shield@2016-06-02.ts` | json | 24 KiB | 1.4 sec |
| SMS | `sms@2016-10-24.ts` | json | 54 KiB | 1.8 sec |
| Snowball | `snowball@2016-06-30.ts` | json | 30 KiB | 1.5 sec |
| SNS | `sns@2010-03-31.ts` | query | 31 KiB | 0.9 sec |
| SQS | `sqs@2012-11-05.ts` | query | 28 KiB | 0.8 sec |
| SSM | `ssm@2014-11-06.ts` | json | 222 KiB | 3.3 sec |
| SSOAdmin | `sso-admin@2020-07-20.ts` | json | 29 KiB | 1.4 sec |
| StepFunctions | `states@2016-11-23.ts` | json | 43 KiB | 1.7 sec |
| StorageGateway | `storagegateway@2013-06-30.ts` | json | 85 KiB | 2.3 sec |
| DynamoDBStreams | `streams.dynamodb@2012-08-10.ts` | json | 10 KiB | 1.2 sec |
| STS | `sts@2011-06-15.ts` | query | 14 KiB | 0.6 sec |
| Support | `support@2013-04-15.ts` | json | 19 KiB | 1.4 sec |
| SWF | `swf@2012-01-25.ts` | json | 101 KiB | 2.0 sec |
| Textract | `textract@2018-06-27.ts` | json | 14 KiB | 1.3 sec |
| TimestreamQuery | `timestream-query@2018-11-01.ts` | json | 6 KiB | 1.2 sec |
| TimestreamWrite | `timestream-write@2018-11-01.ts` | json | 14 KiB | 1.4 sec |
| TranscribeService | `transcribe@2017-10-26.ts` | json | 39 KiB | 1.6 sec |
| Transfer | `transfer@2018-11-05.ts` | json | 22 KiB | 1.4 sec |
| Translate | `translate@2017-07-01.ts` | json | 15 KiB | 1.3 sec |
| WAF | `waf@2015-08-24.ts` | json | 89 KiB | 2.6 sec |
| WAFRegional | `waf-regional@2016-11-28.ts` | json | 92 KiB | 2.8 sec |
| WAFV2 | `wafv2@2019-07-29.ts` | json | 71 KiB | 2.3 sec |
| WorkMail | `workmail@2017-10-01.ts` | json | 44 KiB | 1.7 sec |
| WorkSpaces | `workspaces@2015-04-08.ts` | json | 62 KiB | 2.0 sec |

[//]: # (Generated Content Barrier)

The check time column is a measurement of how long `deno check` on the file ran for on my laptop, with a sample size of 1.
