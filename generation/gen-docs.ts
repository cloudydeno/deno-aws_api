import { parseXml, XmlNode } from "../lib/encoding/xml.ts";

export function genDocsComment(docsXml: string) {
  try {
    const {root} = parseXml(`<top>${docsXml}</top>`, true);
    const body = genBlock(root!, true);
    if (!body.includes('\n')) {
      return `  /** ${body} */`;
    }
    return `  /**\n${body.replace(/^/gm, `   * `)}\n   */`;
  } catch (err) {
    return `  /** TODO: Failed to render documentation: ${err.message} */`;
  }
}

export function genBlock(root: XmlNode, isRoot = false) {
  const chunks = new Array<string>();
l:for (const top of root.children) {
    switch (top.name) {
      case '':
        if ((top.content || '').length < 3) continue l;
        chunks.push(`${top.content}`);
        break;
      case 'p':
      case 'div':
        chunks.push(genParagraph(top));
        break;
      case 'ul':
        for (const child of top.children) {
          if (child.name === '') continue;
          if (child.name !== 'li') throw new Error(
            `unhandled ul tag ${child.name}`);
          chunks.push(`  - ${genBlock(child).split('\n').join('\n    ')}`);
        }
        break;
      case 'ol': {
        let idx = 1;
        for (const child of top.children) {
          if (child.name === '') continue;
          if (child.name !== 'li') throw new Error(
            `unhandled ol tag ${child.name}`);
          chunks.push(` ${idx++}. ${genBlock(child).split('\n').join('\n    ')}`);
        }
      } break;
      case 'dl':
        for (const child of top.children) {
          if (child.name === '') continue;
          if (child.name === 'dt') {
            chunks.push(`${genBlock(child)}:`.replace(/^/gm, `  `));
          } else if (child.name === 'dd') {
            chunks.push(genBlock(child).replace(/^/gm, `    `));
            chunks.push('');
          } else throw new Error(
            `unhandled dl tag ${child.name}`);
        }
        break;
      case 'important':
        chunks.push(`! IMPORTANT:`);
        chunks.push(genBlock(top).replace(/^/gm, `! `));
        break;
      case 'note':
        chunks.push(`  Note:`);
        chunks.push(genBlock(top).replace(/^/gm, `  `));
        break;
      case 'code':
        chunks.push(genBlock(top).replace(/^/gm, `    `));
        break;
      default:
        throw new Error(`unhandled top level doc tag ${top.name}`);
    }
    if (isRoot) chunks.push('');
  }
  return chunks.join('\n').trimEnd();
}

function genParagraph(node: XmlNode) {
  const pieces = new Array<string>();
  for (const top of node.children) {
    switch (top.name) {
      case '':
        pieces.push(top.content ?? '');
        break;
      case 'i':
        pieces.push(`_${genParagraph(top)}_`);
        break;
      case 'b':
        pieces.push(`*${genParagraph(top)}*`);
        break;
      case 'a':
        const { href } = top.attributes;
        if (href) {
          pieces.push(`"${genParagraph(top).trim()}" (${href})\n`);
        } else {
          pieces.push(`"${genParagraph(top).trim()}"`);
        }
        break;
      case 'code':
        pieces.push(`\`${genParagraph(top)}\``);
        // pieces.push(genParagraph(top).split('\n').map(x => `    *    ${x}`).join('\n'));
        break;
      // case 'p':
      //   genParagraph(chunks, top);
      //   break;
      // case 'note':
      //   break;
      default:
        throw new Error(`unhandled paragraph inner tag ${top.name}`);
    }
  }
  return pieces.join('')
    .trim()
    .replace(/\)\n\./g, ').')
    .replace(/(\.`?) +/g, '$1\n')
    .replace(/, (see|go to) "/g, ',\n $1 "')
    .replace(/^\*([^*]+)\*$/, '\n## $1')
    .replace(/^\`([^`]+)\`$/, '    $1')
    .trimEnd();
}
