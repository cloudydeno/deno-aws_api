#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import { Kinesis } from '../services/kinesis/mod.ts';

const kinesis = new ApiFactory().makeNew(Kinesis);
const StreamName = 'deno-aws-test';

// Provision a single-shard stream
await kinesis.createStream({ StreamName, ShardCount: 1 });
await kinesis.waitForStreamExists({ StreamName });

// Stuff a little bit of data into it
// The partition key values have no ordering impact here
// because we created a single-shard stream.
await kinesis.putRecords({ StreamName, Records: [
  { PartitionKey: 'hi', Data: 'this is record #1' },
  { PartitionKey: 'hey', Data: 'this is record #2' },
  { PartitionKey: 'hi', Data: 'this is record #3' },
]});
await kinesis.putRecords({ StreamName, Records: [
  { PartitionKey: 'hi', Data: 'this is record #4' },
  { PartitionKey: 'hey', Data: 'this is record #5' },
]});

// Get the shard list to find our data
// If you have multiple shards this whole procedure becomes really complicated!
// The official "Kinesis Consumer Library" has complex logic to handle shards
const {Shards} = await kinesis.listShards({ StreamName });

// Get a pointer to the very beginning of this shard
const {ShardIterator} = await kinesis.getShardIterator({ StreamName,
  ShardId: Shards![0].ShardId,
  ShardIteratorType: "TRIM_HORIZON",
});

// Get a batch of our records and print them
const {Records, MillisBehindLatest} = await kinesis.getRecords({
  ShardIterator: ShardIterator!,
});
console.log('Received records:');
for (const record of Records) {
  console.log(record.SequenceNumber, new TextDecoder().decode(record.Data));
}
console.log('Reportedly', MillisBehindLatest, 'milliseconds behind the latest record');

// Clean up
await kinesis.deleteStream({ StreamName });
await kinesis.waitForStreamNotExists({ StreamName });
