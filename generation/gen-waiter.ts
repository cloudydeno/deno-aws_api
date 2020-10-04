import type * as Schema from "./sdk-schema.ts";
import type ShapeLibrary from "./shape-library.ts";
import { compileJMESPath } from "./jmespath.ts";
import { fixupJmesCode } from "./quirks.ts";

export default class GenWaiter {
  name: string;
  spec: Schema.WaiterSpec;
  operation: Schema.ApiOperation;
  shapes: ShapeLibrary;
  constructor(name: string, spec: Schema.WaiterSpec, operation: Schema.ApiOperation, shapes: ShapeLibrary) {
    this.name = name;
    this.spec = spec;
    this.operation = operation;
    this.shapes = shapes;
  }

  compilePathWaiter(spec: Schema.WaiterPathMatcher): [string, string] {
    return [
      fixupJmesCode(compileJMESPath(spec.argument, 'resp')),
      spec.expected === true ? '' : ` === ${JSON.stringify(spec.expected)}`
    ];
  }

  generateTypescript(): string {
    // We expect that every waiter will use operations with input and output
    const inputShape = this.shapes.get(this.operation.input ?? {shape: 'missing'});
    const outputShape = this.shapes.get(this.operation.output ?? {shape: 'missing'});
    if (inputShape?.spec.type !== 'structure') throw new Error(`TODO: ${inputShape.spec.type} input`);
    if (outputShape?.spec.type !== 'structure') throw new Error(`TODO: ${outputShape.spec.type} input`);

    // Build a doc comment
    const docLines = new Array<string>();
    if (this.spec.description) {
      docLines.push(this.spec.description);
    }
    const totalMinutes = Math.ceil((this.spec.maxAttempts * this.spec.delay) / 60);
    docLines.push(`Checks state up to ${this.spec.maxAttempts} times, ${this.spec.delay} seconds apart (about ${totalMinutes} minutes max wait time).`);

    // Preprocess what the matchers are up to
    const goodErrs = new Array<string>();
    const badErrs = new Array<string>();
    const retryErrs = new Array<string>();
    const allPaths = new Array<string>();
    for (const acceptor of this.spec.acceptors) {
      switch (acceptor.matcher) {

        case 'error':
          switch (acceptor.state) {
            case 'success': goodErrs.push(acceptor.expected); break;
            case 'failure': badErrs.push(acceptor.expected); break;
            case 'retry': retryErrs.push(acceptor.expected); break;
          }
          break;

        case 'path':
        case 'pathAny':
        case 'pathAll':
          allPaths.push(acceptor.argument);
          break;

      }
    }
    const handlesAnyErr = this.spec.acceptors.some(x => x.matcher === 'error');
    const collapsePathEval = allPaths.length > 1 && allPaths.every(x => x === allPaths[0]);

    const inputSignature = `RequestConfig & ${inputShape.censoredName}`;
    const outputSignature = `${goodErrs.length > 0 ? 'Error | ' : ''}${outputShape.censoredName}`;

    const innerChunks: string[] = [];
    const lowerCamelName = this.operation.name[0].toLowerCase() + this.operation.name.slice(1);
    innerChunks.push(`      const resp = await this.${lowerCamelName}(params);`);

    if (collapsePathEval) {
      const code = fixupJmesCode(compileJMESPath(allPaths[0], 'resp'));
      innerChunks.push(`      const field = ${code};`);
    }

    for (const acceptor of this.spec.acceptors) {
      const commented = acceptor.knownBroken ? '// BROKEN: ' : '';

      const statements: {[key: string]: string} = {
        'retry': 'continue;',
        'failure': 'throw new Error(errMessage);',
        'success': 'return resp;',
      };
      const statement = statements[acceptor.state];

      switch (acceptor.matcher) {
        case 'error': continue; // handled in catch block

        case 'path': {
          const [evaluator, comparision] = this.compilePathWaiter(acceptor);
          const evalSource = collapsePathEval ? 'field' : evaluator;
          const condition = `${evalSource}${comparision}`;
          innerChunks.push(`      ${commented}if (${condition}) ${statement}`);
          break;
        }
        case 'pathAny': {
          const [evaluator, comparision] = this.compilePathWaiter(acceptor);
          const evalSource = collapsePathEval ? 'field' : evaluator;
          const condition = `${evalSource}.some(x => x${comparision})`;
          innerChunks.push(`      ${commented}if (${condition}) ${statement}`);
          break;
        }
        case 'pathAll': {
          const [evaluator, comparision] = this.compilePathWaiter(acceptor);
          const evalSource = collapsePathEval ? 'field' : evaluator;
          const condition = `${evalSource}.every(x => x${comparision})`;
          innerChunks.push(`      ${commented}if (${condition}) ${statement}`);
          break;
        }

        case 'status': {
          if (acceptor.expected < 300) {
            innerChunks.push(`      ${statement} // for status ${acceptor.expected}`);
          } else {
            // TODO: 400s and 500s should throw, so can't be handled here.
            // But how are they handled...
            innerChunks.push(`      // TODO: if (statusCode == ${acceptor.expected}) ${statement}`);
          }
          break;
        }

      }
    }

    const chunks: string[] = [];

    // Write out the doc comment
    // TODO: this can be generalized somewhere else
    if (docLines.length > 1) {
      chunks.push(`  /**`);
      for (const docLine of docLines) {
        chunks.push(`   * ${docLine}`);
      }
      chunks.push(`   */`);
    } else {
      chunks.push(`  /** ${docLines[0]} */`);
    }

    chunks.push(`  async waitFor${this.name}(`);
    chunks.push(`    params: ${inputSignature},`);
    chunks.push(`  ): Promise<${outputSignature}> {`);
    chunks.push(`    const errMessage = 'ResourceNotReady: Resource is not in the state ${this.name}';`);
    chunks.push(`    for (let i = 0; i < ${this.spec.maxAttempts}; i++) {`);
    if (handlesAnyErr) {
      chunks.push(`      try {`);
      chunks.push(...innerChunks.map(x => '  '+x));
      chunks.push(`      } catch (err) {`);
      if (goodErrs.length > 0) {
        chunks.push(`        if (${JSON.stringify(goodErrs)}.includes(err.code)) return err;`);
      }
      if (badErrs.length > 0) {
        chunks.push(`        if (${JSON.stringify(badErrs)}.includes(err.code)) throw err;`);
      }
      if (retryErrs.length > 0) {
        chunks.push(`        if (!${JSON.stringify(retryErrs)}.includes(err.code)) throw err;`);
      } else {
        chunks.push(`        throw err;`);
      }
      chunks.push(`      }`);
    } else {
      chunks.push(...innerChunks);
    }
    chunks.push(`      await new Promise(r => setTimeout(r, ${this.spec.delay}000));`);
    chunks.push(`    }`);
    chunks.push(`    throw new Error(errMessage);`);
    chunks.push(`  }\n`);
    return chunks.join('\n');
  }
}
