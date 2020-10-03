import type * as common from './common.ts';

// apparently based on segmentio xml parser
// https://github.com/nekobato/deno-xml-parser
// this is a really bad parser though, TBH

export interface Document {
  declaration: XmlDeclaration | null;
  root: XmlNode | null;
}
export interface XmlDeclaration {
  attributes: {[key: string]: string};
}
export class XmlNode implements common.XmlNode {
  name: string;
  attributes: {[key: string]: string} = {};
  content?: string;
  children: XmlNode[] = [];
  constructor(name: string) {
    this.name = name;
  }

  first(name: string, required: true): XmlNode;
  first<T>(name: string, required: true, accessor: (node: XmlNode) => T): T;
  first(name: string, required?: false): XmlNode | undefined;
  first<T>(name: string, required: false, accessor: (node: XmlNode) => T): T | undefined;

  first<T>(name: string, required = false, accessor?: (node: XmlNode) => T): XmlNode | T | undefined {
    const node = this.children.find(x => x.name === name);
    if (!node && required) {
      this.throwMissingKeys([name]);
    } else if (accessor) {
      if (node) return accessor(node);
    } else {
      return node;
    }
  }

  getList(...names: string[]): XmlNode[] { // you can just map this
    let listParent: XmlNode | undefined = this;
    while (names.length > 1) {
      listParent = listParent?.first(names.shift() ?? '');
    }
    return listParent?.children.filter(x => x.name === names[0]) ?? [];
  }

  strings<
    R extends {[key: string]: true},
    O extends {[key: string]: true},
  >(opts: {
    required?: R,
    optional?: O,
  }): { [key in keyof R]: string }
    & { [key in keyof O]: string | undefined }
  {
    const required: Array<keyof R> = Object.keys(opts.required ?? {});
    const optional: Array<keyof O> = Object.keys(opts.optional ?? {});
    type T = keyof R | keyof O;

    const obj = Object.create(null);
    const missing = new Set(required);
    const strings: Set<T> = new Set(new Array<keyof O|keyof R>().concat(required, optional));
    for (const child of this.children) {
      if (strings.has(child.name)) {
        obj[child.name as T] = child.content ?? '';
        missing.delete(child.name);
      }
    }
    if (missing.size > 0) this.throwMissingKeys(missing);
    return obj;
  }

  throwMissingKeys(missingKeys: Iterable<string|number|symbol>): never {
    throw new Error(`BUG: XmlNode ${JSON.stringify(this.name)
      } missing required keys ${JSON.stringify(Array.from(missingKeys))
      } - had keys ${JSON.stringify(Array.from(new Set(this.children.map(x => x.name))))}`);
  }
}

// interface Tag {
//   Key?: string;
//   Value?: string;
// }
// interface Error {
//   Code: string;
//   Message: string;
//   Sender?: string;
//   Tags: Array<Tag>;
// }
// interface Errors {
//   Error: Error[];
// }
// interface Response {
//   Errors: Errors;
//   RequestID: string;
// }

// const err = parseXml(`<?xml version="1.0" encoding="UTF-8"?>
// <Response><Errors><Error><Code>RequestExpired</Code><Message>Request has expired.</Message></Error></Errors><RequestID>433741ec-94c9-49bc-a9c8-ba59ab8972c2</RequestID></Response>`);
// if (!err.root) throw new Error(`TODO`);

// const vals: Error = {
//   Tags: err.root.getList('Errors', 'Error').map(x => x.strings({
//     optional: {
//       Key: true,
//       Value: true,
//     },
//   })),
//   ...err.root.strings({
//     required: {
//       "Code": true,
//       "Message": true,
//     },
//     optional: {
//       "Sender": true,
//     },
//   }),
// };


// console.log(vals);


/**
 * Parse the given string of `xml`.
 *
 * @param {String} xml
 * @return {Object}
 * @api public
 */

export function parseXml(xml: string): Document {
  xml = xml.trim();

  // strip comments
  xml = xml.replace(/<!--[\s\S]*?-->/g, '');

  return {
    declaration: declaration(),
    root: tag(),
  };

  /** Declaration. */
  function declaration(): XmlDeclaration | null {
    var m = match(/^<\?xml\s*/);
    if (!m) return null;

    // tag
    var node: XmlDeclaration = {
      attributes: {},
    };

    // attributes
    while (!(eos() || is('?>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    match(/\?>\s*/);

    return node;
  }

  /** Tag. */
  function tag(): XmlNode | null {
    var m = match(/^<([\w-:.]+)\s*/);
    if (!m) return null;

    // name
    var node = new XmlNode(m[1]);

    // attributes
    while (!(eos() || is('>') || is('?>') || is('/>'))) {
      var attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    // self closing tag
    if (match(/^\s*\/>\s*/)) {
      return node;
    }

    match(/\??>\s*/);

    // content
    node.content = content();

    // children
    var child;
    while ((child = tag())) {
      node.children.push(child);
    }

    // closing
    match(/^<\/[\w-:.]+>\s*/);

    return node;
  }

  /** Text content. */
  function content() {
    var m = match(/^([^<]*)/);
    if (m) return m[1];
    return '';
  }

  /** Attribute. */
  function attribute() {
    var m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
    if (!m) return;
    return { name: m[1], value: strip(m[2]) };
  }

  /** Strip quotes from `val`. */
  function strip(val: string) {
    return val.replace(/^['"]|['"]$/g, '');
  }

  /** Match `re` and advance the string. */
  function match(re: RegExp) {
    var m = xml.match(re);
    if (!m) return;
    xml = xml.slice(m[0].length);
    return m;
  }

  /** End-of-source. */
  function eos() {
    return 0 == xml.length;
  }

  /** Check for `prefix`. */
  function is(prefix: string) {
    return xml.startsWith(prefix);
  }
}
