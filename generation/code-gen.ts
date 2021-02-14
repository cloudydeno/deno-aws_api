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
  shapes: ShapeLibrary;

  constructor(specs: {
    api: Schema.Api,
    pagers?: Schema.Pagination,
    waiters?: Schema.Waiters,
    uid: string,
    isTest?: true,
  }) {
    this.apiSpec = specs.api;
    this.pagersSpec = specs.pagers;
    this.waitersSpec = specs.waiters;
    this.isTest = specs.isTest ?? false;

    // mutate the specs to fix inaccuracies
    fixupApiSpec(this.apiSpec);
    if (this.waitersSpec) {
      fixupWaitersSpec(this.waitersSpec, this.apiSpec);
    }
    if (!this.apiSpec.metadata.uid) {
      this.apiSpec.metadata.uid = specs.uid;
    }

    this.shapes = ShapeLibrary.fromApiSpec(specs.api);
  }

  generateTypescript(namespace: string): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers);

    const chunks = new Array<string>();
    chunks.push(`export default class ${namespace} {`);

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol);
    chunks.push(generateApiTypescript(this.apiSpec, this.shapes, helpers, protocol, namespace, ''));

    if (this.waitersSpec && Object.keys(this.waitersSpec.waiters).length > 0) {
      chunks.push(`  // Resource State Waiters\n`);
      for (const [name, spec] of Object.entries(this.waitersSpec.waiters)) {
        const operation = this.apiSpec.operations[spec.operation];
        const waiter = new GenWaiter(name, spec, operation, this.shapes);
        chunks.push(waiter.generateTypescript(''));
      }
    }

    chunks.push(`}\n`);

    chunks.push(structGen.generateStructsTypescript(['iface', 'mapping']));

    return [
      `// Autogenerated API client for: ${this.apiSpec.metadata.serviceFullName}`,
      [
        `interface RequestConfig {`,
        `  abortSignal?: AbortSignal;`,
        `}`,
      ].join('\n'),
      helpers.toSourceString(),
      chunks.join('\n'),
    ].filter(x => x).join('\n\n');
  }

  generateModTypescript(namespace: string): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers);

    helpers.addDep("s", "./structs.ts");

    const chunks = new Array<string>();
    chunks.push(`export default class ${namespace} {`);

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol, 's.');
    chunks.push(generateApiTypescript(this.apiSpec, this.shapes, helpers, protocol, namespace, 's.'));

    if (this.waitersSpec && Object.keys(this.waitersSpec.waiters).length > 0) {
      chunks.push(`  // Resource State Waiters\n`);
      for (const [name, spec] of Object.entries(this.waitersSpec.waiters)) {
        const operation = this.apiSpec.operations[spec.operation];
        const waiter = new GenWaiter(name, spec, operation, this.shapes);
        chunks.push(waiter.generateTypescript('s.'));
      }
    }

    chunks.push(`}\n`);

    chunks.push(structGen.generateStructsTypescript(['mapping']));

    return [
      `// Autogenerated API client for: ${this.apiSpec.metadata.serviceFullName}`,
      [
        `interface RequestConfig {`,
        `  abortSignal?: AbortSignal;`,
        `}`,
      ].join('\n'),
      helpers.toSourceString(),
      chunks.join('\n'),
    ].filter(x => x).join('\n\n');
  }

  generateStructsTypescript(): string {
    const helpers = makeHelperLibrary({ isTest: this.isTest });
    const protocol = makeProtocolCodegenFor(this.apiSpec.metadata, this.shapes, helpers);

    const structGen = new StructEmitter(this.apiSpec, this.shapes, helpers, protocol);
    const structCode = structGen.generateStructsTypescript(['iface']);

    return [
      `// Autogenerated API structures for: ${this.apiSpec.metadata.serviceFullName}`,
      helpers.toSourceString(),
      structCode,
    ].filter(x => x).join('\n\n');
  }

}
