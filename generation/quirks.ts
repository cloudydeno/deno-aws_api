/**
 * Quirks: problems with the 'official' API specifications that need to be fixed up
 * Some of these are minor and only Typescript really noticed.
 * Others are like actual mistakes that are visible in the official SDKs and just no one cares about I guess.
 */

import type * as Schema from './sdk-schema.ts';

////////////////////////////////
// Operation/Shape problems

/** Mutate an api spec to fix any known inconsistencies. */
export function fixupApiSpec(spec: Schema.Api) {
  switch (spec.metadata.serviceId) {

    case "SQS": {
      // ReceiveMessage is asking for queue attribute names, should be message system-attribute names.
      const receiveReqShape = spec.shapes["ReceiveMessageRequest"];
      if (receiveReqShape.type === 'structure') {
        const attrNameMember = receiveReqShape.members["AttributeNames"];
        if (attrNameMember?.shape === "AttributeNameList") {
          // Change to the correct list shape.
          attrNameMember.shape = "MessageSystemAttributeNameList";
          // Add the correct shape since it doesn't even exist.
          spec.shapes["MessageSystemAttributeNameList"] = {
            "type": "list",
            "member": {
              "shape": "MessageSystemAttributeName",
              "locationName": "AttributeName",
            },
            "flattened": true,
          };
          // Finally, add 'All' to the attribute list
          // This is kinda wrong ('All' is only valid in name lists, not the results) but it matches the other shapes.
          if (spec.shapes["MessageSystemAttributeName"]?.type === 'string') {
            spec.shapes["MessageSystemAttributeName"].enum?.splice(0, 0, 'All');
          }
        }
      }
      break;
    }

  }
}


////////////////////////////////
// Waiter problems
// TODO: these should be auto detected by comparing the jmespath to the api's shapes

/** waiters which simply aren't compilable, likely due to outdated waiterspecs */
export const brokenWaiters = new Set([
  'ConversionTaskDeleted', // ec2 - seems like Cancelled is the actual operation?
]);

/** watier conditions that  */
export const brokenWaiterConditions = new Set([
  'resp["Stacks"].flatMap(x => x["StackStatus"]).some(x => x === "UPDATE_FAILED")', // cloudformation
]);
