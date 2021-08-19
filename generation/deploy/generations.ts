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
    public readonly codegenConstr: (config: ApiSpecsBundle, opts: URLSearchParams) => CodeGen,
  ) {}

  buildApi(opts: {
    apiSpecs: ApiSpecsBundle,
    options: URLSearchParams,
    className: string,
  }) {
    const codeGen = this.codegenConstr(opts.apiSpecs, opts.options);
    return codeGen.generateTypescript(opts.className)
      .replaceAll(/from "https:\/\/deno.land\/std@[0-9.]+\//g, `from "${this.stdModRoot}/`)
      .replaceAll('from "../../', `from "${this.clientModRoot}/`);
  }
}

// Newest versions come first
export const Generations = new Map<string, ModuleGenerator>([
  ['v0.1', new ModuleGenerator(
    'https://deno.land/x/aws_api@v0.4.0',
    'https://deno.land/std@0.105.0',
    'v2.895.0',
    (config, opts) => new LatestCodeGen(config, opts),
  )],
]);
export const LatestGeneration = 'v0.1';
