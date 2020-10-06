#!/bin/sh -eux

deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-run \
  generation/script/update-services.ts

deno run \
  --allow-read=. \
  --allow-write=lib \
  generation/script/update-readme.ts
