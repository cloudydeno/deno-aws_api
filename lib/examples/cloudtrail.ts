import { ApiFactory } from '../client/mod.ts';
const factory = new ApiFactory();

import { CloudTrail } from 'https://aws-api.deno.dev/v0.1/services/cloudtrail.ts';
const cloudTrail = new CloudTrail(factory);

// Fetch most recent non-readonly operations from past 90 days
const { Events } = await cloudTrail.lookupEvents({
  LookupAttributes: [{
    AttributeKey: 'ReadOnly',
    AttributeValue: 'false',
  }]
});

// Print a subset of fields in a table
console.table(Events?.map(x => ({
  Username: x.Username,
  API: x.EventName,
  Timestamp: x.EventTime,
})));
