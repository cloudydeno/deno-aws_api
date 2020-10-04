export interface Api {
  "version": "2.0";
  "metadata": ApiMetadata;
  "operations": { [name: string]: ApiOperation };
  "shapes": { [name: string]: ApiShape };
  "authorizers": { [name: string]: ApiAuthorizer }; // only for mq
  "documentation"?: string;
}

export interface ApiMetadata {
  "apiVersion": string;
  "checksumFormat"?: "md5" | "sha256";
  "endpointPrefix": string;
  "jsonVersion"?: "1.0" | "1.1",
  "globalEndpoint"?: string;
  "protocol": "rest-xml" | "query" | "ec2" | "json" | "rest-json";
  "protocolSettings"?: {
    "h2": "eventstream"; // only for kinesis
  };
  "serviceAbbreviation"?: string;
  "serviceFullName": string;
  "serviceId": string;
  "signatureVersion": "v2" | "v4" | "s3" | "s3v4";
  "signingName"?: string;
  "targetPrefix"?: string;
  "uid": string;
  "xmlNamespace"?: string;
};

export interface ApiOperation {
  "name": string;
  "http"?: {
    "method": "POST" | "GET" | "HEAD" | "DELETE" | "PUT" | "PATCH";
    "requestUri": string;
    "responseCode"?: number;
  };
  "input"?: ShapeRef;
  "output"?: ShapeRef & {
    "resultWrapper"?: string;
  };
  "errors": ShapeRef[];
  "deprecated"?: true;
  "authtype"?: "none" | "v4-unsigned-body";
  "endpoint"?: {
    "hostPrefix": string;
  };
  "endpointdiscovery"?: { // only in dynamodb
    "required"?: true;
  };
  "documentationUrl"?: string;
  "documentation": string;
}

export interface ShapeRef {
  "shape": string; // id for the shape in the api file
  "documentation"?: string;
}

export type ApiShape = ApiShapes & ApiShapeMetadata;
export interface ApiShapeMetadata {
  "locationName"?: string; // e.g. SSES3, seems to be to alias things for network
  "sensitive"?: boolean; // params that shouldn't be logged
  "documentation"?: string;
  "resultWrapper"?: string; // only used for test fixturesI guess
};
export type ApiShapes =
  | ShapeBoolean
  | ShapeCharacter
  | ShapeTimestamp
  | ShapePrimitive
  | ShapeBlob
  | ShapeList
  | ShapeMap
  | ShapeString
  | ShapeStructure;

export interface ShapeBoolean {
  "type": "boolean";
}

// this is literally only used in the test fixtures as far as I can tell
export interface ShapeCharacter {
  "type": "character";
}

export interface ShapeTimestamp {
  "type": "timestamp";
  // json and rest-json default to unixTimestamp, else iso8601
  "timestampFormat"?: "iso8601" | "unixTimestamp";
}

export interface ShapePrimitive {
  "type": "integer" | "long" | "double" | "float";
  "min"?: number;
  "max"?: number;
}

export interface ShapeBlob {
  "type": "blob";
  "streaming"?: true;
}

export interface ShapeList {
  "type": "list";
  "member": ShapeRef & {
    "locationName": string;
  };
  "flattened"?: true;
  "min"?: number;
  "max"?: number;
}

export interface ShapeMap {
  "type": "map";
  "key": ShapeRef & {
    "locationName": string;
  };
  "value": ShapeRef & {
    "locationName": string;
  };
  "flattened"?: true;
  "min"?: number;
  "max"?: number;
}

// 'rest-xml', 'query', 'ec2' should have empty strings instead of nulls
export interface ShapeString {
  "type": "string";
  "min"?: number;
  "max"?: number;
  "pattern"?: string;
  "enum"?: string[];
}

export interface ShapeStructure {
  "type": "structure";
  "required"?: string[];
  "members": {
    [name: string]: ShapeRef & StructureFieldDetails;
  };
  "endpointoperation"?: true, // only in dynamodb
  "deprecated"?: true,
}

export interface StructureFieldDetails {
  "location"?: "uri" | "querystring" | "header" | "headers" | "statusCode";
  "locationName"?: string;
  "queryName"?: string; // only in ec2
  "flattened"?: true;
  "streaming"?: true;
  "deprecated"?: true;
  "timestampFormat"?: "iso8601" | "unixTimestamp"; // default varies
  "idempotencyToken"?: true; // shuold be auto filled with guid if not given
  "xmlNamespace"?: { // used by s3
    "uri": string;
  };
};

// elastictranscoder does this string bs instead of an enum:
// "pattern": "(^Left$)|(^Right$)|(^Center$)"
// check with: match(/^\(\^[^^|$]+\$\)(?:\|\(\^[^^|$]+\$\))/)

// mq specifies this, not sure what it's for
export interface ApiAuthorizer {
  "name": string;
  "type": "provided";
  "placement": {
    "location": "header";
    "name": string;
  };
}


export interface Pagination {
  "pagination": { [name: string]: PaginationSpec };
}

export interface PaginationSpec {
  "input_token": string | string[]; // raw single key so far, outside of arrays
  // apparently can be pretty complex:
  //       "output_token": "StreamNames[-1]",
  //       "output_token": "NextMarker || Contents[-1].Key",
  //      "output_token": "Jobs[-1].JobId",
  "output_token": string | string[];

  "result_key"?: string | string[]; // alexaforbusiness lacks this
  "limit_key"?: string; // raw single key so far
  "more_results"?: string; // most complex is dotted path so far
}


export interface Waiters {
  "version": 2;
  "waiters": { [name: string]: WaiterSpec };
}

export interface WaiterSpec {
  "operation": string;
  "description"?: string;
  "delay": number;
  "maxAttempts": number;
  "acceptors": Array<(
    | WaiterPathMatcher
    | WaiterErrorMatcher
    | WaiterStatusMatcher
  ) & {
    "state": WaiterMatchResult;
    "knownBroken"?: true; // added by our quirks
  }>;
}

export type WaiterMatchResult = "success" | "retry" | "failure";

export interface WaiterPathMatcher {
  "matcher":
    | "pathAll" // pathmatches.all(eq argument)
    | "pathAny" // pathmatches.some(eq argument)
    | "path"; // pathmatch eq argument
  "expected": any; // TODO: string?
  "argument": string; // eg "Certificate.DomainValidationOptions[].ValidationStatus"
}

export interface WaiterErrorMatcher {
  "matcher": "error";
  "expected": string;
}

export interface WaiterStatusMatcher {
  "matcher": "status";
  "expected": number;
}
