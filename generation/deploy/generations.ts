import LatestCodeGen from '../code-gen.ts';

import * as Schema from '../sdk-schema.ts';

interface ApiSpecsBundle {
  api: Schema.Api;
  pagers?: Schema.Pagination;
  waiters?: Schema.Waiters;
  examples?: Schema.Examples;
}

interface CodeGen {
  generateTypescript(namespace: string): string;
  generateModTypescript(namespace: string): string;
  generateStructsTypescript(): string;
}

export class ModuleGenerator {
  constructor(
    public readonly clientModRoot: string,
    public readonly stdModRoot: string,
    public readonly sdkVersion: string,
    public readonly defaults: URLSearchParams,
    public readonly codegenConstr: (config: ApiSpecsBundle, opts: URLSearchParams) => CodeGen,
  ) {}

  setDefaults(options: URLSearchParams) {
    const newOpts = new URLSearchParams(options);
    for (const [option, value] of this.defaults) {
      if (!options.has(option)) {
        newOpts.append(option, value);
      }
    }
    return newOpts;
  }

  buildApi(opts: {
    apiSpecs: ApiSpecsBundle,
    options: URLSearchParams,
    className: string,
  }) {
    const clientModRoot = opts.options.get('aws_api_root') || this.clientModRoot;
    const fullOptions = this.setDefaults(opts.options);

    const codeGen = this.codegenConstr(opts.apiSpecs, fullOptions);
    return codeGen.generateTypescript(opts.className)
      .replaceAll(/from "https:\/\/deno.land\/std@[0-9.]+\//g, `from "${this.stdModRoot}/`)
      .replaceAll('from "../../', `from "${clientModRoot}/`);
  }
}

// Newest versions come first
export const Generations = new Map<string, ModuleGenerator>([
  ['v0.1', new ModuleGenerator(
    'https://deno.land/x/aws_api@v0.4.0',
    'https://deno.land/std@0.95.0',
    'v2.895.0',
    new URLSearchParams([
      ['includeOpts', 'no'],
      ['docs', 'none'],
    ]),
    (config, opts) => new LatestCodeGen(config, opts),
  )],
  ['v0.2', new ModuleGenerator(
    'https://deno.land/x/aws_api@v0.5.0',
    'https://deno.land/std@0.105.0',
    'v2.971.0',
    new URLSearchParams([
      ['docs', 'none'],
    ]),
    (config, opts) => new LatestCodeGen(config, opts),
  )],
  ['v0.3', new ModuleGenerator(
    'https://deno.land/x/aws_api@v0.5.0', // TODO: new version
    'https://deno.land/std@0.115.0',
    'v2.1046.0', // https://github.com/aws/aws-sdk-js/releases
    new URLSearchParams([
      ['docs', 'short'],
    ]),
    (config, opts) => new LatestCodeGen(config, opts),
  )],
]);
export const LatestGeneration = 'v0.2';
