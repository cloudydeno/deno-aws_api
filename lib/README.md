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
| AutoScaling | `autoscaling@2011-01-01.ts` | query | 101 KiB | 1.2 sec |
| CloudFormation | `cloudformation@2010-05-15.ts` | query | 126 KiB | 1.6 sec |
| CloudSearch | `cloudsearch@2011-02-01.ts` | query | 34 KiB | 0.7 sec |
| CloudSearch | `cloudsearch@2013-01-01.ts` | query | 57 KiB | 0.9 sec |
| DocDB | `docdb@2014-10-31.ts` | query | 85 KiB | 1.2 sec |
| EC2 | `ec2@2016-11-15.ts` | ec2 | 1019 KiB | 6.7 sec |
| ElastiCache | `elasticache@2015-02-02.ts` | query | 131 KiB | 1.6 sec |
| ElasticBeanstalk | `elasticbeanstalk@2010-12-01.ts` | query | 99 KiB | 1.4 sec |
| ELB | `elasticloadbalancing@2012-06-01.ts` | query | 47 KiB | 0.9 sec |
| ELBv2 | `elasticloadbalancingv2@2015-12-01.ts` | query | 76 KiB | 1.3 sec |
| SES | `email@2010-12-01.ts` | query | 96 KiB | 1.3 sec |
| IAM | `iam@2010-05-08.ts` | query | 164 KiB | 2.5 sec |
| ImportExport | `importexport@2010-06-01.ts` | query | 11 KiB | 0.6 sec |
| CloudWatch | `monitoring@2010-08-01.ts` | query | 59 KiB | 1.1 sec |
| Neptune | `neptune@2014-10-31.ts` | query | 128 KiB | 1.6 sec |
| RDS | `rds@2013-01-10.ts` | query | 92 KiB | 1.4 sec |
| RDS | `rds@2013-02-12.ts` | query | 99 KiB | 2.1 sec |
| RDS | `rds@2013-09-09.ts` | query | 107 KiB | 3.6 sec |
| RDS | `rds@2014-09-01.ts` | query | 110 KiB | 4.5 sec |
| RDS | `rds@2014-10-31.ts` | query | 299 KiB | 3.7 sec |
| Redshift | `redshift@2012-12-01.ts` | query | 175 KiB | 4.5 sec |
| SimpleDB | `sdb@2009-04-15.ts` | query | 13 KiB | 0.5 sec |
| SNS | `sns@2010-03-31.ts` | query | 31 KiB | 0.9 sec |
| SQS | `sqs@2012-11-05.ts` | query | 28 KiB | 0.8 sec |
| STS | `sts@2011-06-15.ts` | query | 14 KiB | 0.6 sec |

[//]: # (Generated Content Barrier)

The check time column is a measurement of how long `deno check` on the file ran for on my laptop, with a sample size of 1.
