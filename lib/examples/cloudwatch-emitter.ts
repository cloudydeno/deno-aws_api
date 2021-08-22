#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net --unstable

import { ApiFactory } from '../client/mod.ts';
import { CloudWatch } from '../services/cloudwatch/mod.ts';

const cw = new ApiFactory().makeNew(CloudWatch);

while (true) {
  console.log(new Date);
  const resp = await cw.putMetricData({
    Namespace: 'DenoTest',
    MetricData: [{
      MetricName: 'test',
      Timestamp: new Date,
      Value: Math.random(),
      StorageResolution: 1,
      Unit: 'None',
      Dimensions: [{
        Name: 'Host',
        Value: Deno.hostname(),
      }]
    }],
  });

  await new Promise(ok => setTimeout(ok, 5000))
}
