import { assertEquals, assertThrows } from "https://deno.land/std@0.115.0/testing/asserts.ts";
import type { ApiMetadata } from "./common.ts";
import { AwsEndpointResolver, FixedBaseEndpointResolver, S3CompatibleEndpointResolver } from "./endpoints.ts";

Deno.test('aws ec2 / use aws china partition', async () => {
  const resolver = new AwsEndpointResolver();

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'cn-none-1',
    apiMetadata: apiMetadata.ec2,
  }).url.toString(), 'https://ec2.cn-none-1.amazonaws.com.cn/path');
});

Deno.test('aws ec2 / use aws iso partition', async () => {
  const resolver = new AwsEndpointResolver();

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'us-iso-none-1',
    apiMetadata: apiMetadata.ec2,
  }).url.toString(), 'https://ec2.us-iso-none-1.c2s.ic.gov/path');
});

Deno.test('aws ec2 / opportunistic dualstack', async () => {
  const resolver = new AwsEndpointResolver();

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'us-east-2',
    apiMetadata: apiMetadata.ec2,
  }).url.toString(), 'https://api.ec2.us-east-2.aws/path');

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'na-none-1',
    apiMetadata: apiMetadata.ec2,
  }).url.toString(), 'https://ec2.na-none-1.amazonaws.com/path');
});

Deno.test('aws ec2 / allow disabling dualstack', async () => {
  const resolver = new AwsEndpointResolver({
    useDualstack: false,
  });

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'us-east-2',
    apiMetadata: apiMetadata.ec2,
  }).url.toString(), 'https://ec2.us-east-2.amazonaws.com/path');
});

Deno.test('aws lambda / opportunistic dualstack', async () => {
  assertEquals(new AwsEndpointResolver().resolveUrl({
    requestPath: '/path',
    region: 'us-east-2',
    apiMetadata: apiMetadata.lambda,
  }).url.toString(), 'https://lambda.us-east-2.api.aws/path');
});

Deno.test('aws lambda / no dualstack in govcloud', async () => {
    assertEquals(new AwsEndpointResolver().resolveUrl({
    requestPath: '/path',
    region: 'us-gov-east-1',
    apiMetadata: apiMetadata.lambda,
  }).url.toString(), 'https://lambda.us-gov-east-1.amazonaws.com/path');
});

Deno.test('aws lambda / china endpoint', async () => {
  assertEquals(new AwsEndpointResolver().resolveUrl({
    requestPath: '/path',
    region: 'cn-north-1',
    apiMetadata: apiMetadata.lambda,
  }).url.toString(), 'https://lambda.cn-north-1.amazonaws.com.cn/path');
});

Deno.test('aws s3 / upgrades to host style routing', async () => {
  const resolver = new AwsEndpointResolver();

  assertEquals(resolver.resolveUrl({
    requestPath: '/bucket/key',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://bucket.s3.dualstack.us-east-2.amazonaws.com/key');

  assertEquals(resolver.resolveUrl({
    requestPath: '/bucket/key',
    region: 'region',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://bucket.s3.dualstack.region.amazonaws.com/key');

  assertEquals(resolver.resolveUrl({
    requestPath: '/bucket',
    region: 'region',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://bucket.s3.dualstack.region.amazonaws.com/');

  assertEquals(resolver.resolveUrl({
    requestPath: '/',
    region: 'region',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://s3.dualstack.region.amazonaws.com/');

  assertEquals(resolver.resolveUrl({
    requestPath: '/?query',
    region: 'region',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://s3.dualstack.region.amazonaws.com/?query');
});

Deno.test('aws s3 / does not upgrade buckets with dots', async () => {
  const resolver = new AwsEndpointResolver();

  assertEquals(resolver.resolveUrl({
    requestPath: '/dotted.bucket/key',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://s3.dualstack.us-east-2.amazonaws.com/dotted.bucket/key');
});

Deno.test('aws sts / uses global endpoint by default', async () => {
  const resolver = new AwsEndpointResolver();

  const endpoint = resolver.resolveUrl({
    requestPath: '/path',
    region: 'eu-west-1',
    apiMetadata: apiMetadata.sts,
  });

  assertEquals(endpoint.url.toString(), 'https://sts.amazonaws.com/path');
  assertEquals(endpoint.signingRegion, 'us-east-1');
});

Deno.test('aws sts / can use regional endpoint by request', async () => {
  const resolver = new AwsEndpointResolver({
    forceRegional: true,
  });

  const endpoint = resolver.resolveUrl({
    requestPath: '/path',
    region: 'eu-west-1',
    apiMetadata: apiMetadata.sts,
  });

  assertEquals(endpoint.url.toString(), 'https://sts.eu-west-1.amazonaws.com/path');
  assertEquals(endpoint.signingRegion, 'eu-west-1');
});


const apiMetadata: Record<string, ApiMetadata> = {
  ec2: {
    "apiVersion": "2016-11-15",
    "endpointPrefix": "ec2",
    "protocol": "ec2",
    "serviceAbbreviation": "Amazon EC2",
    "serviceFullName": "Amazon Elastic Compute Cloud",
    "serviceId": "EC2",
    "signatureVersion": "v4",
  },
  lambda: {
    "apiVersion": "2015-03-31",
    "endpointPrefix": "lambda",
    "protocol": "rest-json",
    "serviceFullName": "AWS Lambda",
    "serviceId": "Lambda",
    "signatureVersion": "v4",
  },
  s3: {
    "apiVersion": "2006-03-01",
    "endpointPrefix": "s3",
    "protocol": "rest-xml",
    "serviceAbbreviation": "Amazon S3",
    "serviceFullName": "Amazon Simple Storage Service",
    "serviceId": "S3",
    "signatureVersion": "s3",
  },
  sts: {
    "apiVersion": "2011-06-15",
    "endpointPrefix": "sts",
    "globalEndpoint": "sts.amazonaws.com",
    "protocol": "query",
    "serviceAbbreviation": "AWS STS",
    "serviceFullName": "AWS Security Token Service",
    "serviceId": "STS",
    "signatureVersion": "v4",
  },
};



Deno.test('s3 compat / basic assembly', async () => {
  const resolver = new S3CompatibleEndpointResolver('vendor.tld');

  assertEquals(resolver.resolveUrl({
    requestPath: '/',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://us-east-2.vendor.tld/');
});

Deno.test('s3 compat / virtual host upgrade', async () => {
  const resolver = new S3CompatibleEndpointResolver('vendor.tld');

  assertEquals(resolver.resolveUrl({
    requestPath: '/bucket/key',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://bucket.us-east-2.vendor.tld/key');

  assertEquals(resolver.resolveUrl({
    requestPath: '/dotted.bucket/key',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'https://us-east-2.vendor.tld/dotted.bucket/key');
});

Deno.test('s3 compat / validation', async () => {
  assertThrows(() => {
    new S3CompatibleEndpointResolver('http://localhost');
  }, Error, 'must be a naked domain name');
});

Deno.test('s3 compat / refuse non-S3', async () => {
  const resolver = new S3CompatibleEndpointResolver('vendor.tld');

  assertThrows(() => {
    resolver.resolveUrl({
      requestPath: '/path',
      region: 'region',
      apiMetadata: apiMetadata.ec2,
    })
  }, Error, 'only implements S3 requests');
});



Deno.test('fixed base / basic assembly', async () => {
  const resolver = new FixedBaseEndpointResolver('http://localhost:9000');

  assertEquals(resolver.resolveUrl({
    requestPath: '/path',
    region: 'us-east-2',
    apiMetadata: apiMetadata.s3,
  }).url.toString(), 'http://localhost:9000/path');
});

Deno.test('fixed base / validation', async () => {
  assertThrows(() => {
    new FixedBaseEndpointResolver('localhost');
  }, Error, 'must be a full URL');
});
