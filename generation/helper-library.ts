export class HelperLibrary {
  #helpers = new Map<string, Helper>();
  #inUse = new Set<string>();
  #extraDeps = new Map<string, string>();

  addHelper(name: string, helper: Helper) {
    this.#helpers.set(name, helper);
  }
  // TODO: rename to useDepFromUrl or something
  addDep(name: string, sourceUrl: string) {
    this.#extraDeps.set(name, sourceUrl);
  }
  addOptionalDep(name: string, depUrl: string) {
    this.addHelper(name, {
      chunks: [],
      deps: {
        [name]: depUrl,
      },
    });
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
        if (deps.has(dep[0])) continue;
        deps.add(dep[0]);
        depChunks.push(`import * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
      }
    }
    for (const dep of this.#extraDeps.entries()) {
      if (deps.has(dep[0])) continue;
      deps.add(dep[0]);
      if (dep[1] === './structs.ts') {
        // Re-export our related structs
        depChunks.push(`import type * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
        depChunks.push(`export * from ${JSON.stringify(dep[1])};`);
      } else {
        depChunks.push(`import * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
      }
    }

    return [
      ...depChunks.sort(),
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
    HashMd5: "https://deno.land/std@0.105.0/hash/md5.ts",
  },
  chunks: [
    `function hashMD5(data: HashMd5.Message): string {`,
    `  const hasher = new HashMd5.Md5();`,
    `  hasher.update(data);`,
    `  return hasher.toString('base64');`,
    `}`,
  ],
};

export const SerializeBlob: Helper = {
  deps: {
    Base64: "https://deno.land/std@0.105.0/encoding/base64.ts",
  },
  chunks: [
    `function serializeBlob(input: string | Uint8Array | null | undefined) {`,
    `  if (input == null) return input;`,
    `  return Base64.encode(input);`,
    `}`,
  ],
};
export const ParseBlob: Helper = {
  deps: {
    Base64: "https://deno.land/std@0.105.0/encoding/base64.ts",
  },
  chunks: [
    `function parseBlob(input: string | null | undefined) {`,
    `  if (input == null) return input;`,
    `  return Base64.decode(input);`,
    `}`,
  ],
};

export const IdemptToken: Helper = {
  deps: {
    uuidv4: `https://deno.land/std@0.105.0/uuid/v4.ts`,
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

  // lib.addOptionalDep('Base64', 'https://deno.land/x/base64@v0.2.1/mod.ts');
  lib.addOptionalDep('client', '../../client/common.ts');

  lib.addOptionalDep('cmnP', '../../encoding/common.ts');
  lib.addOptionalDep('jsonP', '../../encoding/json.ts');
  lib.addOptionalDep('qsP', '../../encoding/querystring.ts');
  lib.addOptionalDep('xmlP', '../../encoding/xml.ts');

  lib.addHelper('generateIdemptToken', opts.isTest
    ? IdemptTokenMock
    : IdemptToken);

  lib.addHelper('hashMD5', HashMD5);

  lib.addHelper('serializeBlob', SerializeBlob);
  lib.addHelper('parseBlob', ParseBlob);

  return lib;
}
