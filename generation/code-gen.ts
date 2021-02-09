import type * as Schema from './sdk-schema.ts';
import ProtocolQueryCodegen from './protocol-query.ts';
import ProtocolJsonCodegen from './protocol-json.ts';
import ShapeLibrary, { KnownShape } from './shape-library.ts';
import { fixupApiSpec, fixupWaitersSpec, unauthenticatedApis, cleanFuncName } from './quirks.ts';
import GenWaiter from "./gen-waiter.ts";
import HelperLibrary from "./helper-library.ts";
import ProtocolRestCodegen from "./protocol-rest.ts";
import ProtocolXmlCodegen from "./protocol-xml.ts";

interface ProtocolCodegen {
  generateOperationInputParsingTypescript(inputShape: KnownShape, meta: Schema.LocationInfo): {
    inputParsingCode: string;
    inputVariables: string[];
    pathParts?: Map<string,string>;
  };
  generateOperationOutputParsingTypescript(shape: KnownShape, resultWrapper?: string): {
    outputParsingCode: string;
    outputVariables: string[];
  };
  generateShapeInputParsingTypescript(shape: KnownShape): {
    inputParsingFunction: string;
  };
  generateShapeOutputParsingTypescript(shape: KnownShape): {
    outputParsingFunction: string;
  };
}

export default class ServiceCodeGen {
  apiSpec: Schema.Api;
  pagersSpec?: Schema.Pagination;
  waitersSpec?: Schema.Waiters;

  shapes: ShapeLibrary;
  protocol: ProtocolCodegen;
  helpers: HelperLibrary;

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

    // mutate the specs to fix inaccuracies
    fixupApiSpec(this.apiSpec);
    if (this.waitersSpec) {
      fixupWaitersSpec(this.waitersSpec, this.apiSpec);
    }
    if (!this.apiSpec.metadata.uid) {
      this.apiSpec.metadata.uid = specs.uid;
    }

    const inputShapes = new Set<string>();
    const outputShapes = new Set<string>();
    for (const op of Object.values(specs.api.operations)) {
      if (op.input) inputShapes.add(op.input.shape);
      if (op.output) outputShapes.add(op.output.shape);
    }

    this.shapes = new ShapeLibrary({
      shapeSpecs: specs.api.shapes,
      inputNames: Array.from(inputShapes),
      outputNames: Array.from(outputShapes),
    });
    this.helpers = new HelperLibrary();
    this.helpers.addDep("cmnP", "../../encoding/common.ts");

    switch (specs.api.metadata.protocol) {
      case 'ec2':
        this.protocol = new ProtocolQueryCodegen(this.shapes, this.helpers, {ec2: true});
        break;
      case 'query':
        this.protocol = new ProtocolQueryCodegen(this.shapes, this.helpers);
        break;
      case 'json':
        this.protocol = new ProtocolJsonCodegen(this.shapes, this.helpers);
        break;
      case 'rest-xml': {
        const inner = new ProtocolXmlCodegen(this.shapes, this.helpers);
        this.protocol = new ProtocolRestCodegen(inner);
        break;
      }
      case 'rest-json': {
        const inner = new ProtocolJsonCodegen(this.shapes, this.helpers);
        this.protocol = new ProtocolRestCodegen(inner);
        break;
      }
      default: throw new Error(
        `TODO: unimpl protocol ${specs.api.metadata.protocol}`);
    }

    if (specs.isTest) {
      this.helpers.addHelper('generateIdemptToken', {
        chunks: [
          `function generateIdemptToken() {`,
          `  return "00000000-0000-4000-8000-000000000000";`,
          `}`,
        ],
      });
    } else {
      this.helpers.addHelper('generateIdemptToken', {
        deps: {
          uuidv4: `https://deno.land/std@0.86.0/uuid/v4.ts`,
        },
        chunks: [
          `function generateIdemptToken() {`,
          `  return uuidv4.generate();`,
          `}`,
        ],
      });
    }

    this.helpers.addHelper('hashMD5', {
      deps: {
        HashMd5: "https://deno.land/std@0.86.0/hash/md5.ts",
      },
      chunks: [
        `function hashMD5(data: HashMd5.Message): string {`,
        `  const hasher = new HashMd5.Md5();`,
        `  hasher.update(data);`,
        `  return hasher.toString('base64');`,
        `}`,
      ],
    });
  }

  generateTypescript(namespace: string): string {
    const chunks = new Array<string>();
    chunks.push(`export default class ${namespace} {`);
    chunks.push(`  #client: ServiceClient;`);
    chunks.push(`  constructor(apiFactory: ApiFactory) {`);
    chunks.push(`    this.#client = apiFactory.buildServiceClient(${namespace}.ApiMetadata);`);
    chunks.push(`  }\n`);
    chunks.push(`  static ApiMetadata: ApiMetadata = ${JSON.stringify(this.apiSpec.metadata, null, 2).replace(/\n/g, `\n  `)};\n`);

    for (const operation of Object.values(this.apiSpec.operations)) {
      const inputShape =  operation.input ? this.shapes.get(operation.input) : null;
      const outputShape = operation.output ? this.shapes.get(operation.output) : null;

      let signature = `(\n    {abortSignal, ...params}: RequestConfig`;
      if (inputShape?.spec.type === 'structure') {
        signature += ' & ' + this.specifyShapeType(inputShape, {isJson: operation.input?.jsonvalue});
        if (operation.input?.payload) {
          inputShape.payloadField = operation.input.payload;
        }
        if (!inputShape.spec.required?.length && Object.values(inputShape.spec.members).every(x => x.location !== 'uri')) {
          signature += ' = {}';
        }
      } else if (inputShape) {
        throw new Error(`TODO: ${inputShape.spec.type} input`);
      } else {
        signature += ' = {}';
      }

      signature += `,\n  ): Promise<`;
      if (outputShape?.spec.type === 'structure') {
        signature += this.specifyShapeType(outputShape, {isJson: operation.output?.jsonvalue});
      } else if (outputShape) {
        throw new Error(`TODO: ${outputShape.spec.type} output`);
      } else {
        signature += 'void';
      }
      signature += '>';

      const lowerCamelName = operation.name[0].toLowerCase() + operation.name.slice(1);
      chunks.push(`  async ${cleanFuncName(lowerCamelName)}${signature} {`);
      let protoPathParts: Map<string,string> | undefined;
      const referencedInputs = new Set(['abortSignal']);
      if (operation.input && inputShape?.spec.type === 'structure') {
        const {inputParsingCode, inputVariables, pathParts} = this.protocol
          .generateOperationInputParsingTypescript(inputShape, operation.input);
        chunks.push(inputParsingCode);
        inputVariables.forEach(x => referencedInputs.add(x));
        protoPathParts = pathParts;
      }

      chunks.push(`    const resp = await this.#client.performRequest({`);
      if (unauthenticatedApis.has(namespace+'.'+operation.name)) {
        chunks.push(`      skipSigning: true,`);
      }
      chunks.push(`      ${Array.from(referencedInputs).join(', ')},`);
      chunks.push(`      action: ${JSON.stringify(operation.name)},`);
      if (operation.http?.method && operation.http.method !== 'POST') {
        chunks.push(`      method: ${JSON.stringify(operation.http.method)},`);
      }
      if (operation.http?.requestUri && operation.http.requestUri !== '/') {
        // this.helpers.useHelper('encodePath');
        const formattedPath = operation.http?.requestUri?.includes('{')
          ? ('cmnP.encodePath`'+operation.http.requestUri
              .replace(/{[^}]+}/g, x => protoPathParts?.get(x)||x)
            +'`')
          : JSON.stringify(operation.http?.requestUri || '/');
        chunks.push(`      requestUri: ${formattedPath},`);
      }
      if (operation.http?.responseCode) {
        chunks.push(`      responseCode: ${JSON.stringify(operation.http.responseCode)},`);
      }
      if (operation.endpoint?.hostPrefix) {
        const templatedPrefix = operation.endpoint.hostPrefix.replace(/{/g, '${params.');
        chunks.push(`      hostPrefix: \`${templatedPrefix}\`,`);
      }
      chunks.push(`    });`);

      if (outputShape?.spec.type === 'structure') {
        const {outputParsingCode, outputVariables} = this.protocol
          .generateOperationOutputParsingTypescript(outputShape, operation.output?.resultWrapper ?? outputShape?.spec.resultWrapper);
        chunks.push(outputParsingCode);
      }

      // TODO: is this a sane way of doing pagination?
      // type PaginatedResult<T> = T & {
      //   hasNextPage(this: T): boolean;
      //   nextPage(this: T, config?: RequestConfig): Promise<PaginatedResult<T>>;
      // }
      // hasNextPage() { return !!(this.NextToken); },
      // nextPage(config: RequestConfig = {}) {
      //   return self.describeInstances({ ...params, ...config,
      //     NextToken: this.NextToken,
      //   });
      // },

      chunks.push(`  }\n`);
    }

    if (this.waitersSpec && Object.keys(this.waitersSpec.waiters).length > 0) {
      chunks.push(`  // Resource State Waiters\n`);
      for (const [name, spec] of Object.entries(this.waitersSpec.waiters)) {
        const operation = this.apiSpec.operations[spec.operation];
        const waiter = new GenWaiter(name, spec, operation, this.shapes);
        chunks.push(waiter.generateTypescript());
      }
    }

    chunks.push(`}\n`);

    for (const shape of this.shapes.allNamedShapes) {
      if (!shape.tags.has('named')) continue;

      chunks.push(`// refs: ${shape.refCount
        } - tags: ${Array.from(shape.tags).join(', ')}`);

      // if (this.#singleRefShapes.has(shape.name)) {
      //   chunks.push(`// TODO: can be inlined (only used once)`);
      // }
      chunks.push(`${
        this.writeStructureType(shape)}`);

      // TODO: other types might want a helper func... enums??
      // TODO QUIRK: IdentityPool isn't tagged right, out of the entire API surface
      if (shape.tags.has('interface') || shape.censoredName === 'IdentityPool') {
        // Maybe include input reading (prep for wire)
        if (!(this.shapes.inputShapes.includes(shape) && shape.refCount === 1) && shape.tags.has('input')) {
          chunks.push(this.protocol.generateShapeInputParsingTypescript(shape).inputParsingFunction);
        }
        // Maybe include output reading (post-wire enriching)
        if (!(this.shapes.outputShapes.includes(shape) && shape.refCount === 1) && shape.tags.has('output')) {
          chunks.push(this.protocol.generateShapeOutputParsingTypescript(shape).outputParsingFunction);
        }
      }
      chunks.push('');
    }

    return [
      `// Autogenerated API client for: ${this.apiSpec.metadata.serviceFullName}`,
      [
        `import type { ServiceClient, ApiFactory, ApiMetadata } from '../../client/common.ts';`,
        `interface RequestConfig {`,
        `  abortSignal?: AbortSignal;`,
        `}`,
      ].join('\n'),
      this.helpers.toSourceString(),
      chunks.join('\n'),
    ].filter(x => x).join('\n\n');
  }

  writeStructureType(shape: KnownShape): string {
    switch (shape.spec.type) {

      case 'structure':
        const required = new Set(shape.spec.required?.map(x => x.toLowerCase()) || []);
        const reqLists = shape.tags.has('output') && !this.apiSpec.metadata.protocol.includes('json');
        return [`export interface ${shape.censoredName} {`,
          ...Object.entries(shape.spec.members).map(([key, spec]) => {
            const innerShape = this.shapes.get(spec);
            const isRequired = required.has(key.toLowerCase())
              || (reqLists && (innerShape.spec.type === 'list' || innerShape.spec.type === 'map'))
              || spec.location === 'uri';
            return `  ${key}${isRequired ? '' : '?'}: ${this.specifyShapeType(innerShape, {isJson: spec.jsonvalue})}${isRequired ? '' : ' | null'};`;
          }),
        '}'].join('\n');

      case 'string':
        if (shape.spec.enum) {
          return [`export type ${shape.censoredName} =`,
            ...shape.spec.enum.map(value => `| ${JSON.stringify(value)}`),
          '| cmnP.UnexpectedEnumValue;'].join('\n');
        }
        break;

    }
    return `// TODO: forgotten shape ${shape.name} of type ${shape.spec.type}\n`;
  }

  // TODO: enums as a map key type should become an object instead
  specifyShapeType(shape: KnownShape, opts: {isDictKey?: true; isJson?: true}): string {
    if (shape.tags.has('named') && !opts.isDictKey) {
      return shape.censoredName;
    }

    switch (shape.spec.type) {
      case 'string':
        if (shape.spec.enum && !opts.isDictKey) {
          return shape.spec.enum.map(x => JSON.stringify(x)).join(' | ');
        } else if (opts.isJson && !opts.isDictKey) {
          return 'jsonP.JSONValue';
        }
      case 'boolean':
        return shape.spec.type;
      case 'character':
        return 'string';
      case 'double':
      case 'float':
      case 'long':
      case 'integer':
        return 'number';
      case 'list':
        const memberShape = this.shapes.get(shape.spec.member);
        let memberType = this.specifyShapeType(memberShape, {isJson: shape.spec.member.jsonvalue});
        if (memberType.includes(' ')) memberType = `(${memberType})`;
        return `${memberType}[]`;
      case 'map':
        const keyShape = this.shapes.get(shape.spec.key);
        const valueShape = this.shapes.get(shape.spec.value);
        const keyType = (keyShape.spec.type === 'string' && keyShape.spec.enum)
          ? `key in ${keyShape.censoredName}`
          : `key: ${this.specifyShapeType(keyShape, {isDictKey: true})}`;
        return `{ [${keyType}]: ${this.specifyShapeType(valueShape, {isJson: shape.spec.value.jsonvalue})} | null | undefined }`;
      case 'structure':
        return this.writeStructureType(shape).replace(/\n/g, '\n  ');
      case 'timestamp':
        return 'Date | number';
      case 'blob':
        return 'Uint8Array | string'; // TODO
      default:
        console.log(shape);
        throw new Error(`TODO: unimpl shape type ${(shape as any).spec.type}`);
    }
  }

}
