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

**Version 0.4.0** of this library stopped
including every service's API in the published module.
Instead, the code-generation process is running on Deno Deploy
and allows importing extremely precise modules,
generated on the fly based on multiple configuration options.
*This is a bit experimental!*
While any issues are worked out, feel free to import APIs
from [v0.3.1](https://deno.land/x/aws_api@v0.3.1) for now.

Package layout:

* `client/`: A handwritten generic AWS API client (credentials, signing, etc)
* `encoding/`: Shared modules for dealing with XML, JSON, & querystrings
* `services/`: Generated Typescript classes and interfaces for the most popular AWS services
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

import STS from 'https://deno.land/x/aws_api/services/sts/mod.ts';
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
* `v0.3.1` on `2021-03-28`: Fix ini-parsing edgecase. Remove zero-field API types.
  * Using definitions from `aws-sdk-js@2.874.0`
* `v0.4.0`: Deno 1.9 compatibility. Remove most less-common AWS services.
  * To use a service that is no longer bundled, see https://aws-api.deno.dev/

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

## List of Pre-Generated API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of [aws-sdk-js `v2.874.0`](https://github.com/aws/aws-sdk-js/releases/tag/v2.874.0).

| Module | Protocol | File size | Approx check time |
| --- | --- | ---: | ---: |
| `cloudwatch/mod.ts` | query | 58 KiB | 3.0 sec |
| `dynamodb/mod.ts` | json | 121 KiB | 4.6 sec |
| `dynamodbstreams/mod.ts` | json | 10 KiB | 2.1 sec |
| `ec2/mod.ts` | ec2 | 1093 KiB | 18.9 sec |
| `ecr/mod.ts` | json | 47 KiB | 2.7 sec |
| `eks/mod.ts` | rest-json | 60 KiB | 4.3 sec |
| `elb/mod.ts` | query | 45 KiB | 4.7 sec |
| `elbv2/mod.ts` | query | 75 KiB | 5.7 sec |
| `es/mod.ts` | rest-json | 88 KiB | 5.9 sec |
| `iam/mod.ts` | query | 181 KiB | 9.5 sec |
| `kinesis/mod.ts` | json | 30 KiB | 3.3 sec |
| `kms/mod.ts` | json | 46 KiB | 2.8 sec |
| `lambda/mod.ts` | rest-json | 97 KiB | 4.5 sec |
| `pricing/mod.ts` | json | 5 KiB | 2.8 sec |
| `rds/mod.ts` | query | 315 KiB | 10.3 sec |
| `route53/mod.ts` | rest-xml | 95 KiB | 3.8 sec |
| `s3/mod.ts` | rest-xml | 256 KiB | 8.6 sec |
| `ses/mod.ts` | query | 90 KiB | 3.7 sec |
| `sesv2/mod.ts` | rest-json | 107 KiB | 4.3 sec |
| `sns/mod.ts` | query | 31 KiB | 3.6 sec |
| `sqs/mod.ts` | query | 28 KiB | 3.2 sec |
| `ssm/mod.ts` | json | 258 KiB | 8.4 sec |
| `sts/mod.ts` | query | 14 KiB | 2.1 sec |

[//]: # (Generated Content Barrier)

For any other services, please check out https://aws-api.deno.dev/
which performs on-the-fly code generation.
You can import the generated URL directly in your application,
or download a copy of the file and save it in your source code for safe keeping.

The generation service also allows skipping methods that doesn't match a passlist,
allowing for much smaller byte-counts on the imported modules.
