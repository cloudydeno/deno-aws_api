![Test CI](https://github.com/danopia/deno-aws_api/workflows/Deno%20CI/badge.svg?branch=main)

# `aws_api` for Deno

From-scratch Typescript AWS API client built for Deno.

[See lib/README for information about using this library](./lib/README.md)

There's two main parts to this repo:

* `lib/` is the signing client, helpers, and generated API bindings that get uploaded to the `/x/` registry.
* `generation/` is a big mash of Typescript that uses `aws-sdk-js@2` API definitions to write out all the files in `lib/services/`.

I'm not affiliated to Amazon at all, but I do intend to support reasonable usecases. Don't be afraid to submit issues on this repository or reach out to me on the Deno Discord about this effort.
