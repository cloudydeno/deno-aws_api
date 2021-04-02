#!/usr/bin/env -S deno run --allow-env --allow-read=${HOME}/.aws --allow-net

import { ApiFactory } from '../client/mod.ts';
import DynamoDB from '../services/dynamodb@2012-08-10/mod.ts';

const factory = new ApiFactory();
const ddb = new DynamoDB(factory);

const TableName = `asdfajghwragds`;

console.log('Creating table...');
const {TableDescription} = await ddb.createTable({
  TableName,
  KeySchema: [
    {AttributeName: 'NodeId', KeyType: 'HASH'},
  ],
  AttributeDefinitions: [
    {AttributeName: 'NodeId', AttributeType: 'S'},
  ],
  Tags: [
    {Key: 'Purpose', Value: 'deno test'},
  ],
  BillingMode: "PAY_PER_REQUEST",
});
await ddb.waitForTableExists({TableName});

await ddb.tagResource({
  ResourceArn: TableDescription?.TableArn!,
  Tags: [
    {Key: 'Demo', Value: 'yup'},
  ],
});
console.log('Tags:', await ddb.listTagsOfResource({
  ResourceArn: TableDescription?.TableArn!,
}));

await ddb.putItem({
  TableName,
  Item: {
    NodeId: {S: 'hello world'},
    Meta: {SS: ['1', '2', '3']},
  },
});

console.log('Scan:', await ddb.scan({
  TableName,
  Limit: 5,
}));

console.log('Get:', await ddb.getItem({
  TableName,
  Key: {
    NodeId: {S: 'hello world'},
  },
}));

await ddb.deleteItem({
  TableName,
  Key: {
    NodeId: {S: 'hello world'},
  },
});

console.log('Deleting table...');
await ddb.deleteTable({TableName});
await ddb.waitForTableNotExists({TableName});
