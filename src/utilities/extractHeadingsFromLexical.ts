type Heading = { id: string; depth: 2 | 3; text: string }

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export function extractHeadingsFromLexical(doc: any, maxDepth: 'h2' | 'h3' = 'h3'): Heading[] {
  const headings: Heading[] = []
  const max = maxDepth === 'h2' ? 2 : 3

  const collectText = (n: any): string => {
    if (!n) return ''
    if (typeof n.text === 'string') return n.text
    const kids = Array.isArray(n.children) ? n.children : []
    return kids.map(collectText).join('')
  }

  const walk = (node: any) => {
    if (!node) return
    const children = Array.isArray(node.children) ? node.children : []

    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const depth = node.tag === 'h2' ? 2 : 3
      if (depth <= max) {
        const text = collectText(node).trim()
        if (text) headings.push({ id: slugify(text), depth, text })
      }
    }

    for (const c of children) walk(c)
  }

  walk(doc?.root ?? doc)
  return headings
}
