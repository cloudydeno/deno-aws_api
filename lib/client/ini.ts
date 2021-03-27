// stripped-down subset of https://deno.land/x/ini@v2.1.0/ini.ts
// doesn't handle bools, numbers, or arrays

export const DEFAULT_SECTION = Symbol.for('ini default section');

/**
 * Decode the given ini-style formatted document into a nested object.
 * @param str ini-style document
 */
export function decode (str: string) {
  const out: Record<string | typeof DEFAULT_SECTION, Record<string, string>> = {
    [DEFAULT_SECTION]: {},
  };
  let p = out[DEFAULT_SECTION];

  //          section     |key      = value
  const re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i
  const lines = str.split(/[\r\n]+/g)

  for (const line of lines) {
    if (!line || line.match(/^\s*[;#]/)) continue
    const match = line.match(re)
    if (!match) continue
    if (match[1] !== undefined) {
      let section = unsafe(match[1])
      p = out[section] = out[section] || {}
      continue
    }
    let key = unsafe(match[2])
    let value = match[3] ? unsafe(match[4]) : ''

    p[key] = value
  }

  return out
}

function isQuoted (val: string) {
  return (val.charAt(0) === '"' && val.slice(-1) === '"') ||
    (val.charAt(0) === "'" && val.slice(-1) === "'")
}

/**
 * Unescapes the given string value.
 * @param val String to unescape
 */
function unsafe (val = '') {
  val = val.trim()
  if (isQuoted(val)) {
    // remove the quotes
    val = val.substr(1, -1)
  } else {
    // walk the val to find the first unescaped ; character
    let esc = false
    let unesc = ''
    for (let i = 0, l = val.length; i < l; i++) {
      const c = val.charAt(i)
      if (esc) {
        if ('\\;#'.indexOf(c) !== -1) {
          unesc += c
        } else {
          unesc += '\\' + c
        }
        esc = false
      } else if (';#'.indexOf(c) !== -1) {
        break
      } else if (c === '\\') {
        esc = true
      } else {
        unesc += c
      }
    }
    if (esc) {
      unesc += '\\'
    }
    return unesc.trim()
  }
  return val
}
