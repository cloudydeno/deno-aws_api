import { ApiFactory } from '../client/mod.ts';
import Kinesis from '../services/kinesis@2013-12-02.ts';

const factory = new ApiFactory();
const kinesis = new Kinesis(factory);

await kinesis.createStream({
  StreamName: 'deno-aws-test',
  ShardCount: 1,
});
await kinesis.waitForStreamExists({
  StreamName: 'deno-aws-test',
});

await kinesis.putRecords({
  StreamName: 'deno-aws-test',
  Records: [
    {PartitionKey: 'hi', Data: 'hello 1'},
    {PartitionKey: 'hi', Data: 'hello 2'},
    {PartitionKey: 'hi', Data: 'hello 3'},
  ],
});

const {Shards} = await kinesis.listShards({
  StreamName: 'deno-aws-test',
});

const {ShardIterator} = await kinesis.getShardIterator({
  StreamName: 'deno-aws-test',
  ShardId: Shards![0].ShardId,
  ShardIteratorType: "TRIM_HORIZON",
});

const {Records, MillisBehindLatest} = await kinesis.getRecords({
  ShardIterator: ShardIterator!,
});
console.log(MillisBehindLatest, Records);

await kinesis.deleteStream({
  StreamName: 'deno-aws-test',
});
await kinesis.waitForStreamNotExists({
  StreamName: 'deno-aws-test',
});
