import type * as Schema from './sdk-schema.ts';

export default class ShapeLibrary {
  knownShapes: Map<string, KnownShape>;

  inputShapes: Array<KnownShape>;
  outputShapes: Array<KnownShape>;
  inputInnerShapes: Array<KnownShape>;
  outputInnerShapes: Array<KnownShape>;
  allNamedShapes: Set<KnownShape>;

  constructor({
    shapeSpecs,
    inputNames,
    inputInnerNames = [],
    outputNames,
    outputInnerNames = [],
  }: {
    shapeSpecs: {[name: string]: Schema.ApiShape},
    inputInnerNames?: string[],
    outputInnerNames?: string[],
    inputNames: string[],
    outputNames: string[],
  }) {
    this.knownShapes = new Map;
    for (const [name, spec] of Object.entries(shapeSpecs)) {
      this.knownShapes.set(name, new KnownShape(name, spec));
    }

    this.inputShapes = inputNames.map(x => this.knownShapes.get(x)).filter((x): x is KnownShape => !!x);
    this.outputShapes = outputNames.map(x => this.knownShapes.get(x)).filter((x): x is KnownShape => !!x);
    this.inputInnerShapes = inputInnerNames.map(x => this.knownShapes.get(x)).filter((x): x is KnownShape => !!x);
    this.outputInnerShapes = outputInnerNames.map(x => this.knownShapes.get(x)).filter((x): x is KnownShape => !!x);

    const allNamedShapes = new Set<KnownShape>([
      ...this.inputShapes, ...this.inputInnerShapes,
      ...this.outputShapes, ...this.outputInnerShapes,
    ]);
    const visitShape = (ref: Schema.ShapeRef, tagWith: string) => {
      const shape = this.get(ref);
      shape.refCount++;
      shape.tags.add(tagWith);
      if (shape.spec.type === 'structure') {
        allNamedShapes.add(shape);
        shape.tags.add('named');
        shape.tags.add('interface');
      } else if (shape.spec.type === 'string' && shape.spec.enum) {
        allNamedShapes.add(shape);
        shape.tags.add('named');
        shape.tags.add('enum');
      }
    };
    for (const shape of this.inputShapes) {
      shape.refCount++;
      shape.tags.add('named');
      shape.tags.add('input');
      this.visitAllShapesDeep(shape, ref => visitShape(ref, 'input'));
    }
    for (const shape of this.inputInnerShapes) {
      shape.tags.add('input');
    }
    for (const shape of this.outputShapes) {
      shape.refCount++;
      shape.tags.add('named');
      shape.tags.add('output');
      this.visitAllShapesDeep(shape, ref => visitShape(ref, 'output'));
    }
    for (const shape of this.outputInnerShapes) {
      shape.tags.add('output');
    }
    this.allNamedShapes = allNamedShapes;

    // for (const shape of this.knownShapes.values()) {
    //   if (shape.tags.has('named') && shape.refCount < 2) {
    //     if (shape.tags.has('input')) continue;
    //     if (shape.tags.has('output')) continue;
    //     shape.tags.add('inlined');
    //     shape.tags.delete('named');
    //   }
    // }

    // console.log('All Named Shapes:', Array.from(allNamedShapes).map(x => [x.name, x.tags, x.refCount]));
    // console.log('All Shapes:', Array.from(this.knownShapes.values()).map(x => [x.name, x.tags, x.refCount]));
    // Deno.exit(5);
  }

  get(ref: Schema.ShapeRef): KnownShape {
    const shape = this.knownShapes.get(ref.shape);
    if (!shape) throw new Error(`BUG: shape ref ${ref.shape} didn't resolve`);
    return shape;
  }



  visitAllShapesDeep(shape: KnownShape, visit: (ref: Schema.ShapeRef) => void) {
    switch (shape.spec.type) {
      case 'structure':
        for (const member of Object.values(shape.spec.members)) {
          visit(member);
          this.visitAllShapesDeep(this.get(member), visit);
        }
        break;
      case 'map':
        const {key, value} = shape.spec;
        visit(key); visit(value);
        this.visitAllShapesDeep(this.get(key), visit);
        this.visitAllShapesDeep(this.get(value), visit);
        break;
      case 'list':
        const {member} = shape.spec;
        visit(member);
        this.visitAllShapesDeep(this.get(member), visit);
        break;
    }
  }

  // findSingleRefShapes(): Set<KnownShape> {
    // return Array.from(this.allNamedShapes
  //   const multiRefShapes = new Set(this.allNamedShapes);
  //   const singleRefShapes = new Set<KnownShape>();
  //   const namedShapes = new Set(this.allNamedShapes);
  //   function countRef(ref: Schema.ShapeRef) {
  //     if (multiRefShapes.has(ref.shape)) return;
  //     if (singleRefShapes.has(ref.shape)) {
  //       multiRefShapes.add(ref.shape);
  //       singleRefShapes.delete(ref.shape);
  //     } else {
  //       singleRefShapes.add(ref.shape);
  //     }
  //   }

  //   for (const shapeName of namedShapes) {
  //     const shape = this.apiSpec.shapes[shapeName];
  //     this.visitAllShapesDeep(shape, countRef);
  //   }

  //   return singleRefShapes;
  // }

};

export class KnownShape {
  name: string;
  spec: Schema.ApiShape;
  tags = new Set<string>();
  refCount = 0;
  constructor(name: string, spec: Schema.ApiShape) {
    this.name = name;
    this.spec = spec;
  }

  get censoredName(): string {
    if (['Object', 'Date', 'String'].includes(this.name))
      return '_'+this.name;
    return this.name;
  }

}
