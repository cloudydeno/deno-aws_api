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
  getChild(name: string): XmlNode | undefined {
    return this.children.find(x => x.name = name);
  }
  mapChildren({lists=[]}: {lists?: string[]}): [
    {[key: string]: XmlNode},
    {[key: string]: XmlNode[]},
  ] {
    const nMap: {[key: string]: XmlNode} = Object.create(null);
    const lMap: {[key: string]: XmlNode[]} = Object.create(null);
    for (const list of lists) {
      lMap[list] = new Array<XmlNode>();
    }
    for (const node of this.children) {
      if (lists.includes(node.name)) {
        lMap[node.name].push(node);
      } else {
        nMap[node.name] = node;
      }
    }
    return [nMap, lMap];
  }
}

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
