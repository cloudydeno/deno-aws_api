import { AWSSignerV4 } from "https://deno.land/x/aws_sign_v4@0.1.1/mod.ts";

const signer = new AWSSignerV4();
const body = new TextEncoder().encode("Hello World!");
const request = new Request("https://test-bucket.s3.amazonaws.com/test", {
  method: "PUT",
  headers: { "content-length": body.length.toString() },
  body,
});
const req = await signer.sign("s3", request);

const response = await fetch(req);
console.log(response);
