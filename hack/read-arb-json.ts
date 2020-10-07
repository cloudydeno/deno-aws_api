
// Things that JSON can encode directly
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = {[key: string]: JSONValue};
export type JSONArray = JSONValue[];

// Prebuilt types for decoding
type FieldType =
  | 's' | 'n' | 'b' | 'd' | 'a'
  | ((obj: JSONValue) => unknown);
const FieldTypeNames = {
  s: 'string', n: 'number', b: 'boolean',
  d: 'date', a: 'blob',
};

type ResolveFieldType<
  T extends FieldType | [FieldType],
  U = T extends [infer R] ? R : T,
  V = U extends (obj: JSONValue) => null | infer R ? R
    : U extends 's' ? string
    : U extends 'n' ? number
    : U extends 'b' ? boolean
    : U extends 'd' ? Date
    : U extends 'a' ? Uint8Array
    : never,
> = T extends [unknown] ? V[] : V;

function readFields<
  R extends {[key: string]: (FieldType | [FieldType])},
  O extends {[key: string]: (FieldType | [FieldType])},
>(
  data: JSONValue,
  opts: { required: R, optional: O, remap?: {[key: string]: keyof R | keyof O} }
): {[key in keyof R | keyof O]
  : key extends keyof R ? ResolveFieldType<R[key]>
  : key extends keyof O ? (ResolveFieldType<O[key]> | null)
  : never
} {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Object wasn't an object`);
  }
  const remap = opts.remap ?? {};
  const missing = new Set<string>(Object.keys(opts.required));
  const problems = new Array<string>();
  const obj = Object.create(null);

  for (const [key, raw] of Object.entries(data)) {
    const targetName = key in remap ? remap[key].toString() : key;
    const isRequired = targetName in opts.required;
    if (!isRequired && !(targetName in opts.optional)) continue;

    if (raw == null) {
      obj[targetName] = null;
    } else {
      const typeSig = isRequired ? opts.required[targetName] : opts.optional[targetName];
      const value = readField(typeSig, raw);
      if (value == null) {
        problems.push(`Key ${key} of type ${typeof raw} failed to parse as ${typeof typeSig === 'string' ? FieldTypeNames[typeSig] : typeof typeSig}`);
      } else {
        missing.delete(targetName);
      }
      obj[targetName] = value;
    }
  }
  if (problems.length > 0) throw new Error(`BUG: JSON object `+
    `failed to read some keys: ${problems.join(' ; ')
    } - had keys ${JSON.stringify(Object.keys(data))}`);
  if (missing.size > 0) throwMissingKeys(missing, Object.keys(data));

  return obj;
}
function readField(typeSig: FieldType | [FieldType], raw: JSONValue): unknown {
  if (raw == null) return null;
  switch (typeSig) {
    case 's':
      return typeof raw === 'string' ? raw : null;
    case 'n':
      return typeof raw === 'number' ? raw : null;
    case 'b':
      return typeof raw === 'boolean' ? raw : null
    case 'd':
      if (typeof raw === 'string') {
        return new Date(raw);
      } else if (typeof raw === 'number') {
        return new Date(raw * 1000);
      }
      break;
    case 'a':
      if (typeof raw === 'string') {
        return new Uint8Array; // TODO: base64
      }
      break;
    default:
      if (typeof typeSig === 'function') {
        return typeSig(raw);
      } else if (Array.isArray(typeSig)) {
        if (Array.isArray(raw)) {
          return raw.map(readField.bind(null, typeSig[0]));
        }
      }
  }
  return null;
}
function throwMissingKeys(missingKeys: Iterable<string>, hadKeys: Iterable<string>): never {
  throw new Error(`BUG: JSON object `+
    `missing required keys ${JSON.stringify(Array.from(missingKeys))
    } - had keys ${JSON.stringify(Array.from(hadKeys))}`);
}








function DescribeStreamOutput(root: JSONValue) { return readFields(root, {
  required: {
    StreamDescription,
  },
  optional: {},
}); }
function StreamDescription(root: JSONValue): StreamDescription { return readFields(root, {
  required: {
    StreamName: 's',
    StreamARN: 's',
    StreamStatus,
    Shards: [Shard],
    HasMoreShards: 'b',
    RetentionPeriodHours: 'n',
    StreamCreationTimestamp: 'd',
    EnhancedMonitoring: [EnhancedMetrics],
  },
  optional: {
    EncryptionType,
    KeyId: 's',
  },
  remap: {sssss: 'Shards'}
}); }
function StreamStatus(root: JSONValue): StreamStatus | null {
  return ( false
  || root == "CREATING"
  || root == "DELETING"
  || root == "ACTIVE"
  || root == "UPDATING"
  ) ? root : null;
}
function EncryptionType(root: JSONValue): EncryptionType | null {
  return ( false
  || root == "NONE"
  || root == "KMS"
  ) ? root : null;
}
function Shard(root: JSONValue): Shard { return readFields(root, {
  required: {
    ShardId: 's',
    HashKeyRange,
    SequenceNumberRange,
  },
  optional: {
    ParentShardId: 's',
    AdjacentParentShardId: 's',
  },
}); }
function HashKeyRange(root: JSONValue): HashKeyRange { return readFields(root, {
  required: {
    StartingHashKey: 's',
    EndingHashKey: 's',
  },
  optional: {},
}); }
function SequenceNumberRange(root: JSONValue): SequenceNumberRange { return readFields(root, {
  required: {
    StartingSequenceNumber: 's',
  },
  optional: {
    EndingSequenceNumber: 's',
  },
}); }
function EnhancedMetrics(root: JSONValue): EnhancedMetrics { return readFields(root, {
  required: {},
  optional: {
    ShardLevelMetrics: [MetricsName],
  },
}); }
function MetricsName(root: JSONValue): MetricsName | null {
  return ( false
  || root == "IncomingBytes"
  || root == "IncomingRecords"
  || root == "OutgoingBytes"
  || root == "OutgoingRecords"
  || root == "WriteProvisionedThroughputExceeded"
  || root == "ReadProvisionedThroughputExceeded"
  || root == "IteratorAgeMilliseconds"
  || root == "ALL"
  ) ? root : null;
}




console.log(DescribeStreamOutput({
  "StreamDescription": {
    "EncryptionType": "NONE",
    "EnhancedMonitoring": [
      {
        "ShardLevelMetrics": []
      },
    ],
    "HasMoreShards": false,
    "RetentionPeriodHours": 24,
    "sssss": [
      {
        "HashKeyRange": {
          "EndingHashKey": "340282366920938463463374607431768211455",
          "StartingHashKey": "0"
        },
        "SequenceNumberRange": {
          "StartingSequenceNumber": "49611506081608989696613962207223151639281315571247874050"
        },
        "ShardId": "shardId-000000000000"
      }
    ],
    "StreamARN": "arn:aws:kinesis:us-west-2:414064234042:stream/test",
    "StreamCreationTimestamp": 1602101101,
    "StreamName": "test",
    "StreamStatus": "ACTIVE"
  }
}).StreamDescription);







export interface DescribeStreamOutput {
  StreamDescription: StreamDescription;
}

// refs: 1 - tags: output, named, interface
export interface StreamDescription {
  StreamName: string;
  StreamARN: string;
  StreamStatus: StreamStatus;
  Shards: Shard[];
  HasMoreShards: boolean;
  RetentionPeriodHours: number;
  StreamCreationTimestamp: Date | number;
  EnhancedMonitoring: EnhancedMetrics[];
  EncryptionType?: EncryptionType | null;
  KeyId?: string | null;
}

// refs: 2 - tags: output, named, enum
export type StreamStatus =
| "CREATING"
| "DELETING"
| "ACTIVE"
| "UPDATING"
;

// refs: 2 - tags: output, named, interface
export interface Shard {
  ShardId: string;
  ParentShardId?: string | null;
  AdjacentParentShardId?: string | null;
  HashKeyRange: HashKeyRange;
  SequenceNumberRange: SequenceNumberRange;
}

// refs: 3 - tags: output, named, interface
export interface HashKeyRange {
  StartingHashKey: string;
  EndingHashKey: string;
}

// refs: 2 - tags: output, named, interface
export interface SequenceNumberRange {
  StartingSequenceNumber: string;
  EndingSequenceNumber: string | null;
}

// refs: 2 - tags: output, named, interface
export interface EnhancedMetrics {
  ShardLevelMetrics?: MetricsName[] | null;
}

// refs: 6 - tags: input, named, enum, output
export type MetricsName =
| "IncomingBytes"
| "IncomingRecords"
| "OutgoingBytes"
| "OutgoingRecords"
| "WriteProvisionedThroughputExceeded"
| "ReadProvisionedThroughputExceeded"
| "IteratorAgeMilliseconds"
| "ALL"
;

// refs: 7 - tags: input, named, enum, output
export type EncryptionType =
| "NONE"
| "KMS"
;
