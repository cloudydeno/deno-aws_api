#!/bin/sh -eux

ApisRoot="aws-sdk-js/apis/"
mkdir -p lib/services

find "$ApisRoot" \
  -type f \
  -name '*.normal.json' \
  -exec basename {} \; \
| cut -d. -f1 \
| grep -E '^(iam|sts|sns|sqs|ec2|cloudformation)-20' \
| xargs -n1 \
  -- deno run \
    --allow-read="$ApisRoot" \
    --allow-write="lib/services/" \
    ./generation/mod.ts "$ApisRoot"

du -sh lib/services/*
