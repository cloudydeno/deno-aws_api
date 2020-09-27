#!/bin/sh -eux

Tag="v2.760.0"

wget https://github.com/aws/aws-sdk-js/archive/$Tag.tar.gz

tar -xf $Tag.tar.gz \
  --one-top-level=apis-$Tag \
  --strip-components=2 \
  --wildcards '*/apis/*'

rm $Tag.tar.gz
