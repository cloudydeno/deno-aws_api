import type * as Schema from './sdk-schema.ts';
import ProtocolRestBase from './protocol-rest.ts';

export default class ProtocolRestXml extends ProtocolRestBase {

  requestBodyTypeName = 'Uint8Array';
  globalHelpers = super.globalHelpers+``;
}
