import { assertObjectMatch } from "@std/assert/object-match";
import { assertRejects } from "@std/assert/rejects";

import { BaseApiFactory, handleErrorResponse } from "./client.ts";
import { AwsServiceError } from "./mod.ts";

Deno.test("Request cancellation", async () => {
  const apiFactory = new BaseApiFactory({
    credentials: {
      region: '',
      awsAccessKeyId: '',
      awsSecretKey: '',
    },
    endpointResolver: {
      resolveUrl(params) {
        return {
          url: new URL("https://example.com"),
          signingRegion: params.region,
        };
      },
    },
  });

  const client = apiFactory.buildServiceClient({
    apiVersion: "",
    endpointPrefix: "",
    protocol: "json",
    serviceFullName: "",
    serviceId: "",
    signatureVersion: "v4",
  });

  const aborter = new AbortController();
  aborter.abort();

  await assertRejects(() => client
    .performRequest({
      action: "",
      authType: "anonymous",
      opts: {
        signal: aborter.signal
      },
    }), DOMException, 'aborted');

});


async function assertErrorFrom(opts: {
  body: string;
  statusCode?: number;
  headers: Record<string, string>;
  protocol: string;
  matches: Record<string, string>;
}) {
  const err = await assertRejects(() => handleErrorResponse(
    new Response(opts.body, {
      status: opts.statusCode ?? 400,
      headers: opts.headers,
    }), 'POST', opts.protocol)
  , AwsServiceError);
  assertObjectMatch(err, opts.matches);
}

Deno.test("Error parsing: STS / expired creds", () => assertErrorFrom({
  body: `
    <ErrorResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
      <Error>
        <Type>Sender</Type>
        <Code>ExpiredToken</Code>
        <Message>The security token included in the request is expired</Message>
      </Error>
      <RequestId>90caa9d3-e248-4a7f-8fcf-c2a5d54c12b9</RequestId>
    </ErrorResponse>`,
  headers: {
    'content-type': 'text/xml',
    'x-amzn-RequestId': '90caa9d3-e248-4a7f-8fcf-c2a5d54c12b9',
  },
  protocol: 'query',
  matches: {
    message: 'ExpiredToken: The security token included in the request is expired [Type: Sender, Request ID: 90caa9d3-e248-4a7f-8fcf-c2a5d54c12b9]',
    requestId: '90caa9d3-e248-4a7f-8fcf-c2a5d54c12b9',
    code: 'ExpiredToken',
    errorType: 'Sender',
  },
}));

Deno.test("Error parsing: EC2 / expired creds", () => assertErrorFrom({
  body: `<?xml version="1.0" encoding="UTF-8"?>
    <Response><Errors><Error><Code>RequestExpired</Code><Message>Request has expired.</Message></Error></Errors><RequestID>433741ec-94c9-49bc-a9c8-ba59ab8972c2</RequestID></Response>`,
  headers: {'content-type': 'text/xml'},
  protocol: 'query',
  matches: {
    message: 'RequestExpired: Request has expired. [Request ID: 433741ec-94c9-49bc-a9c8-ba59ab8972c2]',
    requestId: '433741ec-94c9-49bc-a9c8-ba59ab8972c2',
    code: 'RequestExpired',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: s3 / invalid creds", () => assertErrorFrom({
  body: `<?xml version="1.0" encoding="UTF-8"?>\
    <Error><Code>InvalidAccessKeyId</Code><Message>The AWS Access Key Id you provided does not exist in our records.</Message><AWSAccessKeyId>AKIAAAA</AWSAccessKeyId><RequestId>S4HB4VB13CJBZB9C</RequestId><HostId>vURwaDmMjwEo3pYi953I/joclY+f8F59tOBxd+de1kieVFG4OE1US5a23doc5smeuB3Lk43dqP8=</HostId></Error>`,
  headers: {
    'x-amz-request-id': 'S4HB4VB13CJBZB9C',
    'x-amz-id-2': 'vURwaDmMjwEo3pYi953I/joclY+f8F59tOBxd+de1kieVFG4OE1US5a23doc5smeuB3Lk43dqP8=',
    'Content-Type': 'application/xml',
  },
  protocol: 'rest-xml',
  matches: {
    message: 'InvalidAccessKeyId: The AWS Access Key Id you provided does not exist in our records. [Request ID: S4HB4VB13CJBZB9C]',
    requestId: 'S4HB4VB13CJBZB9C',
    shortCode: 'InvalidAccessKeyId',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: runtime.lex / invalid creds", () => assertErrorFrom({
  body: `{"message":"The security token included in the request is invalid."}`,
  headers: {
    'x-amzn-RequestId': 'e65470f2-e168-466d-b3c1-6360db1dfa3b',
    'x-amzn-ErrorType': 'UnrecognizedClientException:http://internal.amazon.com/coral/com.amazon.coral.service/',
    'Content-Type': 'application/json',
  },
  protocol: 'rest-json',
  matches: {
    message: 'UnrecognizedClientException: The security token included in the request is invalid. [Request ID: e65470f2-e168-466d-b3c1-6360db1dfa3b]',
    requestId: 'e65470f2-e168-466d-b3c1-6360db1dfa3b',
    shortCode: 'UnrecognizedClientException',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: kinesis / invalid creds", () => assertErrorFrom({
  body: `{"__type":"UnrecognizedClientException","message":"The security token included in the request is invalid."}`,
  headers: {
    'x-amzn-RequestId': 'e7b0b6b6-13f8-4b50-bdf3-ba1bd84ea830',
    'x-amz-id-2': '4jb1wavQBWEE2oRc1t/GQ6uIVhngw9WVOcH9dT3FIGkGp9YDIM/FUpA3HYsnUNpnUg8eqC1bIDB8vjWFjbUnQl+9vPITqk6n5q8aeVgbAEQ=',
    'Content-Type': 'application/x-amz-json-1.1',
  },
  protocol: 'json',
  matches: {
    message: 'UnrecognizedClientException: The security token included in the request is invalid. [Request ID: e7b0b6b6-13f8-4b50-bdf3-ba1bd84ea830]',
    requestId: 'e7b0b6b6-13f8-4b50-bdf3-ba1bd84ea830',
    shortCode: 'UnrecognizedClientException',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: step functions / invalid creds", () => assertErrorFrom({
  body: `{"__type":"com.amazon.coral.service#UnrecognizedClientException","message":"The security token included in the request is invalid."}`,
  headers: {
    'x-amzn-RequestId': '171c2c9e-295e-4a47-a2d5-a0138358755c',
    'Content-Type': 'application/x-amz-json-1.0',
  },
  protocol: 'json',
  matches: {
    message: 'UnrecognizedClientException: The security token included in the request is invalid. [Request ID: 171c2c9e-295e-4a47-a2d5-a0138358755c]',
    requestId: '171c2c9e-295e-4a47-a2d5-a0138358755c',
    shortCode: 'UnrecognizedClientException',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: rds / invalid creds", () => assertErrorFrom({
  body: `
    <ErrorResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">
      <Error>
        <Type>Sender</Type>
        <Code>InvalidClientTokenId</Code>
        <Message>The security token included in the request is invalid.</Message>
      </Error>
      <RequestId>4365d1dd-7db8-4fdc-9d50-c3341e63ef24</RequestId>
    </ErrorResponse>`,
  headers: {
    'x-amzn-RequestId': '4365d1dd-7db8-4fdc-9d50-c3341e63ef24',
    'Content-Type': 'text/xml',
  },
  protocol: 'query',
  matches: {
    message: 'InvalidClientTokenId: The security token included in the request is invalid. [Type: Sender, Request ID: 4365d1dd-7db8-4fdc-9d50-c3341e63ef24]',
    requestId: '4365d1dd-7db8-4fdc-9d50-c3341e63ef24',
    shortCode: 'InvalidClientTokenId',
    errorType: 'Sender',
  },
}));

Deno.test("Error parsing: s3 / redirect", () => assertErrorFrom({
  body: `<?xml version="1.0" encoding="UTF-8"?>
    <Error><Code>PermanentRedirect</Code><Message>The bucket you are attempting to access must be addressed using the specified endpoint. Please send all future requests to this endpoint.</Message><Endpoint>hello.s3-eu-west-1.amazonaws.com</Endpoint><Bucket>hello</Bucket><RequestId>G9R9SVHB8AHCFCNA</RequestId><HostId>crAFDbCnW3jz+1HYCpt/JGwozviz1CUUSMGqMVUWr+ANUEeYiBFrfWMqWNlec6VfmJ21tRzgbZM=</HostId></Error>`,
  headers: {
    'x-amz-bucket-region': 'eu-west-1',
    'x-amz-request-id': 'G9R9SVHB8AHCFCNA',
    'x-amz-id-2': 'crAFDbCnW3jz+1HYCpt/JGwozviz1CUUSMGqMVUWr+ANUEeYiBFrfWMqWNlec6VfmJ21tRzgbZM=',
    'Content-Type': 'application/xml',
  },
  protocol: 'rest-xml',
  matches: {
    message: 'PermanentRedirect: The bucket you are attempting to access must be addressed using the specified endpoint. Please send all future requests to this endpoint. [Request ID: G9R9SVHB8AHCFCNA]',
    requestId: 'G9R9SVHB8AHCFCNA',
    shortCode: 'PermanentRedirect',
    errorType: 'Unknown',

  },
}));

Deno.test("Error parsing: emr / access denied", () => assertErrorFrom({
  body: `{"__type":"AccessDeniedException","Message":"User: arn:aws:iam::xxx:user/xxx is not authorized to perform: elasticmapreduce:TerminateJobFlows on resource: arn:aws:elasticmapreduce:us-east-2:xxx:cluster/xxx because no identity-based policy allows the elasticmapreduce:TerminateJobFlows action"}`,
  headers: {
    'x-amzn-RequestId': 'c3a76888-730f-479c-a367-cc32d4326561',
    'Content-Type': 'application/x-amz-json-1.1',
  },
  protocol: 'json',
  matches: {
    message: 'AccessDeniedException: User: arn:aws:iam::xxx:user/xxx is not authorized to perform: elasticmapreduce:TerminateJobFlows on resource: arn:aws:elasticmapreduce:us-east-2:xxx:cluster/xxx because no identity-based policy allows the elasticmapreduce:TerminateJobFlows action [Request ID: c3a76888-730f-479c-a367-cc32d4326561]',
    requestId: 'c3a76888-730f-479c-a367-cc32d4326561',
    shortCode: 'AccessDeniedException',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: SQS / no action", () => assertErrorFrom({
  body: `<UnknownOperationException/>`,
  statusCode: 404,
  headers: {
    'content-type': 'null', // yes SQS actually does this
    'x-amzn-RequestId': '170aee66-ebba-5984-9f07-b423a5cb4c42',
  },
  protocol: 'query',
  matches: {
    message: 'UnknownOperationException: AwsServiceError [Request ID: 170aee66-ebba-5984-9f07-b423a5cb4c42]',
    requestId: '170aee66-ebba-5984-9f07-b423a5cb4c42',
    code: 'UnknownOperationException',
    errorType: 'Unknown',
  },
}));

Deno.test("Error parsing: elastic transcoder / example from docs", () => assertErrorFrom({
  body: `{"message":"1 validation error detected: Value null at 'inputBucket' failed to satisfy constraint: Member must not be null"}`,
  headers: {
    'x-amzn-RequestId': 'b0e91dc8-3807-11e2-83c6-5912bf8ad066',
    'x-amzn-ErrorType': 'ValidationException',
    'Content-Type': 'application/json',
  },
  protocol: 'rest-json',
  matches: {
    message: `ValidationException: 1 validation error detected: Value null at 'inputBucket' failed to satisfy constraint: Member must not be null [Request ID: b0e91dc8-3807-11e2-83c6-5912bf8ad066]`,
    requestId: 'b0e91dc8-3807-11e2-83c6-5912bf8ad066',
    shortCode: 'ValidationException',
    errorType: 'Unknown',
  },
}));
