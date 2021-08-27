# `aws_api` for Deno

![CI Status](https://github.com/danopia/deno-aws_api/workflows/CI/badge.svg?branch=main)
[![Latest /x/ version](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Faws_api%2Fdemo.ts)][x-pkg]
[![external dependency count](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fx%2Faws_api%2Fdemo.ts)][dep-vis]
[![dependency outdatedness](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fupdates%2Fx%2Faws_api%2Fdemo.ts)][dep-vis]

[x-pkg]: https://deno.land/x/aws_api
[dep-vis]: https://deno-visualizer.danopia.net/dependencies-of/https/deno.land/x/aws_api/demo.ts


From-scratch Typescript AWS API client built for Deno.

A leading focus of this library is to be as lean as possible
on the number of files downloaded to use a specific service.
Each service has its own isolated Typescript module;
you'll need to make an `ApiFactory` from `client/mod.ts`
and then pass it to the service you want to use.

Package layout:

* `client/`: A handwritten generic AWS API client (credentials, signing, etc)
* `encoding/`: Shared modules for dealing with XML, JSON, & querystrings
* `services/`: Generated Typescript classes and interfaces for a few most useful AWS services
* `demo.ts`: A trivial example of using this library
* `examples/`: Several full examples of using individual services

A full listing of all AWS services and their import URLs can be found
on the [/x/aws_api Web Service][webservice].
More information on [the accompanying Wiki page][webservice-docs].

Please reach out on Github Issues about missing features, weird exceptions, or API issues,
or ping `dantheman#8546` in the Deno Discord if you just wanna chat about this effort.

## Usage

Basic example: (a subset of `demo.ts`)

```typescript
import { ApiFactory } from 'https://deno.land/x/aws_api/client/mod.ts';
import { STS } from 'https://deno.land/x/aws_api/services/sts.ts';

const sts = new ApiFactory().makeNew(STS);
const identity = await sts.getCallerIdentity();
console.log('You are', identity.UserId, 'in account', identity.Account);
console.log('Identity ARN:', identity.Arn);
```

A couple more-detailed examples are in `examples/` and show concepts such as
managing an EC2 instance's lifecycle, redriving SQS messages,
and working directly with a Kinesis stream.

To use a customized build, or a less-common service, you can import from the web service:

```typescript
import { ApiFactory } from 'https://deno.land/x/aws_api/client/mod.ts';
import { Pricing } from 'https://aws-api.deno.dev/v0.1/services/pricing.ts';

const pricing = new ApiFactory().makeNew(Pricing);
const { Services } = await pricing.describeServices('AmazonEC2');
console.log('Found', Services.length, 'services:');
for (const serviceItem of Services) {
  console.log('  -', serviceItem.ServiceCode);
}
```

## `ApiFactory` Configuration
The `opts` bag can contain a few settings if necesary:

* `credentialProvider?: CredentialsProvider` to use a specific credential source. `CredentialsProvider` can refresh tokens and implementing one could be useful for dynamic configuration. The default provider is `DefaultCredentialsProvider`, a singleton `CredentialsProviderChain` instance.
* `credentials?: Credentials` to force a particular credential. No refresh support.
* `region?: string` to configure a specific AWS region, ignoring the default region. Useful for apps working in multiple regions.
* `fixedEndpoint?: string` to force a particular base URL to send all requests to. Useful for MinIO or localstack. Specify a full URL including protocol://. Also disables subdomain-style S3 access.

```typescript
const ec2_europe = new ApiFactory({
  region: 'eu-west-1',
}).makeNew(EC2);
```

## ⚠️ BREAKING CHANGES ⚠️ v0.4.0 ⚠️

1. **Version 0.4.0** of this library stopped
  including every service's API in the published module.
  Instead, the code-generation process is running on Deno Deploy
  and allows importing extremely precise modules,
  generated on the fly based on multiple configuration options.
  Check out [this Web Service wiki page][webservice-docs]
  for more details on this new URL endpoint.
  *This is a bit experimental!*
  Please report any issues or concerns with this new approach.

1. For services that are still bundled (SQS, S3, SNS, etc),
  the import URL no longer includes an API version
  (the `@year-month-date` part). Only the most recent API version gets bundled.

1. The primary class export on each service module is no longer 'default'.
  So instead of `import SQS from ...`,
  you'll do `import { SQS } from ....`.

1. Removed `AbortSignal` inputs which were allowed everywhere previously.
  These never did anything, and I'll add them back
  once Deno itself supports request cancellation.

## Changelog

* `v0.5.0` on `2021-08-TBD`: Requires Deno 1.11 or later, for `crypto.randomUUID`.
  * Using definitions from `aws-sdk-js@2.971.0`
  * Formalize `.makeNew(constructor)` method on `ApiFactory`
  * Add `fixedEndpoint` option to `ApiFactory` for localstack, minio, etc.
  * Automatically select GovCloud, AWS China, and the S3/EC2 dualstack endpoints.
* `v0.4.1` on `2021-05-23`: Also fix Deno 1.9 regression for unsigned requests.
  * Addresses startup issue when using EKS Pod Identity.
* `v0.4.0` on `2021-05-01`: Deno 1.9 compatibility. Remove most less-common AWS services.
  * To use a service that is no longer bundled, use the [Web Service][webservice].
  * API Version has been removed from module filenames.
  * The primary export of each service module is no longer `export default`.
* `v0.3.1` on `2021-03-28`: Fix ini-parsing edgecase. Remove zero-field API types.
  * Using definitions from `aws-sdk-js@2.874.0`
* `v0.3.0` on `2021-02-14`: Clean up generation, rename modules to match AWS-SDK
  * Using definitions from `aws-sdk-js@2.839.0`
* `v0.2.1` on `2020-12-21`: Add EC2 instance metadata integration (IMDSv2)
  * Now supports using EC2 Instance IAM Roles automatically.
  * Using definitions from `aws-sdk-js@2.814.0`
* `v0.2.0` on `2020-11-07`: Completed bindings for all API services.
  * Using definitions from `aws-sdk-js@2.784.0`
* `v0.1.1` on `2020-11-02`: Generation improvements, most services have been generated.
  * Using definitions from `aws-sdk-js@2.780.0`
* `v0.1.0` on `2020-10-15`: Initial publication with about half of the services bound.
  * Using definitions from `aws-sdk-js@2.768.0`

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
runs in the generation step so that the downloaded code is ready to run.

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
* Custom alternative endpoints
* AWS endpoints other than `**.amazonaws.com` (#3)
    * govcloud, China AWS, IPv6, etc.

Multiple bits are *missing*:

* Automatic pagination (#1)
* AssumeRole credentials (#4)
* Debug logging/tracing of API calls
* Automatic retries
* Getting EKS credentials from regional STS endpoints (#2)

## List of Pre-Generated API Clients

[//]: # (Generated Content Barrier)

All API definitions are current as of [aws-sdk-js `v2.971.0`](https://github.com/aws/aws-sdk-js/releases/tag/v2.971.0).

| Class | Module | Protocol | File size | Approx check time |
| --- | --- | --- | ---: | ---: |
| `CloudWatch` | `cloudwatch/mod.ts` | query | 66 KiB | 3.2 sec |
| `DynamoDB` | `dynamodb/mod.ts` | json | 121 KiB | 3.2 sec |
| `ECR` | `ecr/mod.ts` | json | 47 KiB | 1.9 sec |
| `Kinesis` | `kinesis/mod.ts` | json | 30 KiB | 2.1 sec |
| `KMS` | `kms/mod.ts` | json | 49 KiB | 4.3 sec |
| `Lambda` | `lambda/mod.ts` | rest-json | 97 KiB | 3.7 sec |
| `Route53` | `route53/mod.ts` | rest-xml | 95 KiB | 3.4 sec |
| `S3` | `s3/mod.ts` | rest-xml | 256 KiB | 6.7 sec |
| `SESV2` | `sesv2/mod.ts` | rest-json | 107 KiB | 4.3 sec |
| `SNS` | `sns/mod.ts` | query | 37 KiB | 2.8 sec |
| `SQS` | `sqs/mod.ts` | query | 28 KiB | 2.5 sec |
| `STS` | `sts/mod.ts` | query | 14 KiB | 2.0 sec |

[//]: # (Generated Content Barrier)

For any other services, please check out [the code generation web service][webservice]
which performs on-the-fly code generation.
You can import the generated URL directly in your application,
or download a copy of the file and save it in your source code for safe keeping.

The last version of this library to include every then-current API client
on `/x/` is [v0.3.1](https://deno.land/x/aws_api@v0.3.1).

[webservice-docs]: https://github.com/cloudydeno/deno-aws_api/wiki/Web-Service
[webservice]: https://aws-api.deno.dev/latest/
