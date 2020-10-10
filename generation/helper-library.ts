export default class HelperLibrary {
  #helpers = new Map<string, Helper>();
  #inUse = new Set<string>();
  #extraDeps = new Map<string, string>();

  addHelper(name: string, helper: Helper) {
    this.#helpers.set(name, helper);
  }
  addDep(name: string, sourceUrl: string) {
    this.#extraDeps.set(name, sourceUrl);
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
      depChunks.push(`import * as ${dep[0]} from ${JSON.stringify(dep[1])};`);
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
