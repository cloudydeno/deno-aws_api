#!/bin/sh -eux

deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-run \
  generation/script/update-services.ts \
  monitoring,dynamodb,ecr,kinesis,kms,lambda,route53,s3,sesv2,sns,sqs,sts

deno run \
  --allow-read=. \
  --allow-write=lib \
  generation/script/update-readme.ts
