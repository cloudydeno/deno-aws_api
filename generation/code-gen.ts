import type * as Schema from './sdk-schema.ts';
import { ShapeLibrary } from './shape-library.ts';
import { makeHelperLibrary } from "./helper-library.ts";
import { makeProtocolCodegenFor } from "./protocol.ts";

import { fixupApiSpec, fixupWaitersSpec } from './quirks.ts';
import GenWaiter from "./gen-waiter.ts";
import { generateApiTypescript } from "./gen-api.ts";
import { StructEmitter } from "./gen-structs.ts";

export default class ServiceCodeGen {
  apiSpec: Schema.Api;
  pagersSpec?: Schema.Pagination;
  waitersSpec?: Schema.Waiters;

  isTest: boolean;
  docMode: 'none' | 'short' | 'full';
  includeOpts: boolean; // for codegen v0.2
  includeJsonRemap: boolean; // for codegen v0.3
  includeClientExtras: boolean; // for aws-api v0.6.0
  useAuthType: boolean; // for aws-api v0.6.0
  alwaysReqLists: boolean; // for codegen v0.2 and earlier
  shapes: ShapeLibrary;

  constructor(specs: {
    api: Schema.Api,
    pagers?: Schema.Pagination,
    waiters?: Schema.Waiters,
    isTest?: true,
  }, opts: URLSearchParams) {

    this.apiSpec = specs.api;
    this.pagersSpec = specs.pagers;
    this.waitersSpec = specs.waiters;
    this.isTest = specs.isTest ?? false;

    const docMode = opts.get('docs');
    if (docMode === 'short' || docMode === 'full') {
      this.docMode = docMode;
    } else {
      this.docMode = 'none';
    }

    this.includeOpts = (opts.get('includeOpts') || 'yes') !== 'no';
    this.includeJsonRemap = (opts.get('includeJsonRemap') || 'yes') !== 'no';
    this.includeClientExtras = (opts.get('includeClientExtras') || 'yes') !== 'no';
    this.useAuthType = (opts.get('useAuthType') || 'yes') !== 'no';
    this.alwaysReqLists = (opts.get('alwaysReqLists') || 'no') !== 'no';

    // mutate the specs to fix inaccuracies
    fixupApiSpec(this.apiSpec);
    if (this.waitersSpec) {
      fixupWaitersSpec(this.waitersSpec, this.apiSpec);
    }

    this.shapes = ShapeLibrary.fromApiSpec(specs.api);
  }

  generateTypescript(namespace: string): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers, {
      includeJsonRemap: this.includeJsonRemap,
    });

    const chunks = new Array<string>();
    chunks.push(`export class ${namespace} {`);

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol, '', this.docMode, this.alwaysReqLists);
    chunks.push(generateApiTypescript(this.apiSpec, this.shapes, helpers, protocol, namespace, '', this.docMode, this.includeOpts, this.includeClientExtras, this.useAuthType, this.alwaysReqLists));

    if (this.waitersSpec && Object.keys(this.waitersSpec.waiters).length > 0) {
      chunks.push(`  // Resource State Waiters\n`);
      for (const [name, spec] of Object.entries(this.waitersSpec.waiters)) {
        const operation = this.apiSpec.operations[spec.operation];
        if (operation) {
          const waiter = new GenWaiter(name, spec, operation, this.shapes, this.includeOpts);
          chunks.push(waiter.generateTypescript(''));
        } else {
          chunks.push(`  // waitFor${name}() skipped - depends on ${spec.operation}`);
        }
      }
    }

    chunks.push(`}\n`);

    chunks.push(structGen.generateStructsTypescript(['iface', 'mapping']));

    return [
      `// Autogenerated API client for: ${this.apiSpec.metadata.serviceFullName}`,
      helpers.toSourceString(),
      chunks.join('\n'),
    ].filter(x => x).join('\n\n');
  }

  generateModTypescript(namespace: string): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers, {
      includeJsonRemap: this.includeJsonRemap,
    });

    helpers.addDep("s", "./structs.ts");

    const chunks = new Array<string>();
    chunks.push(`export class ${namespace} {`);

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol, 's.', this.docMode, this.alwaysReqLists);
    chunks.push(generateApiTypescript(this.apiSpec, this.shapes, helpers, protocol, namespace, 's.', this.docMode, this.includeOpts, this.includeClientExtras, this.useAuthType, this.alwaysReqLists));

    if (this.waitersSpec && Object.keys(this.waitersSpec.waiters).length > 0) {
      chunks.push(`  // Resource State Waiters\n`);
      for (const [name, spec] of Object.entries(this.waitersSpec.waiters)) {
        const operation = this.apiSpec.operations[spec.operation];
        const waiter = new GenWaiter(name, spec, operation, this.shapes, this.includeOpts);
        chunks.push(waiter.generateTypescript('s.'));
      }
    }

    chunks.push(`}\n`);

    chunks.push(structGen.generateStructsTypescript(['mapping']));

    return [
      `// Autogenerated API client for: ${this.apiSpec.metadata.serviceFullName}`,
      helpers.toSourceString(),
      chunks.join('\n'),
    ].filter(x => x).join('\n\n');
  }

  generateStructsTypescript(): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers, {
      includeJsonRemap: this.includeJsonRemap,
    });

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol, '', this.docMode, this.alwaysReqLists);
    const structCode = structGen.generateStructsTypescript(['iface']);

    return [
      `// Autogenerated API structures for: ${this.apiSpec.metadata.serviceFullName}`,
      helpers.toSourceString(),
      structCode,
    ].filter(x => x).join('\n\n');
  }

}
