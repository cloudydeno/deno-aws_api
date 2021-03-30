#!/bin/sh -eux

deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-run \
  generation/script/update-services.ts \
  monitoring,dynamodb,streams.dynamodb,ec2,ecr,eks,elasticloadbalancing,elasticloadbalancingv2,es,iam,kinesis,kms,lambda,pricing,rds,route53,s3,email,sesv2,sns,sqs,ssm,sts

deno run \
  --allow-read=. \
  --allow-write=lib \
  generation/script/update-readme.ts
