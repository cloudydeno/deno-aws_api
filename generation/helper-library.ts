export class HelperLibrary {
  #helpers = new Map<string, Helper>();
  #inUse = new Set<string>();
  #extraDeps = new Map<string, string>();

  addHelper(name: string, helper: Helper) {
    this.#helpers.set(name, helper);
  }
  addDep(name: string, sourceUrl: string) {
    this.#extraDeps.set(name, sourceUrl);
  }
  hasDep(name: string) {
    return this.#extraDeps.has(name);
  }

  useHelper(name: string) {
    if (!this.#helpers.has(name)) throw new Error(
      `TODO: helper ${name} isn't known`);
    this.#inUse.add(name);
  }

  toSourceString(): string {
    const helpers = Array
      .from(this.#helpers.entries())
      .filter(x => this.#inUse.has(x[0]))
      .map(x => x[1]);

    const deps = new Set<string>();
    const depChunks = new Array<string>();
    for (const helper of helpers) {
      if (!helper.deps) continue;
      for (const dep of Object.entries(helper.deps)) {
        if (deps.has(dep[0])) console.error('dup dep', dep);
        deps.add(dep[0]);
        depChunks.push(`import * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
      }
    }
    for (const dep of this.#extraDeps.entries()) {
      if (deps.has(dep[0])) console.error('dup dep', dep);
      deps.add(dep[0]);
      if (dep[1].endsWith('/structs.ts')) {
        depChunks.push(`import type * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
      } else {
        depChunks.push(`import * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
      }
    }

    return [
      ...depChunks,
      ...helpers.flatMap(x => x.chunks),
    ].join('\n');
  }
}

export interface Helper {
  chunks: string[];
  deps?: Record<string,string>;
}


export const HashMD5: Helper = {
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
};

export const IdemptToken: Helper = {
  deps: {
    uuidv4: `https://deno.land/std@0.86.0/uuid/v4.ts`,
  },
  chunks: [
    `function generateIdemptToken() {`,
    `  return uuidv4.generate();`,
    `}`,
  ],
};
export const IdemptTokenMock: Helper = {
  chunks: [
    `function generateIdemptToken() {`,
    `  return "00000000-0000-4000-8000-000000000000";`,
    `}`,
  ],
};

export function makeHelperLibrary(opts: {
  isTest?: boolean;
} = {}) {
  const lib = new HelperLibrary();

  lib.addDep("cmnP", "../../encoding/common.ts");

  lib.addHelper('generateIdemptToken', opts.isTest
    ? IdemptTokenMock
    : IdemptToken);

  lib.addHelper('hashMD5', HashMD5);

  return lib;
}
