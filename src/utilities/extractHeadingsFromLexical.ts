import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

type Heading = { id: string; depth: 2 | 3; text: string }

/**
 * Loosely-typed view of a serialized lexical node. The base `SerializedLexicalNode`
 * only guarantees `type`/`version`; element/heading/text nodes carry extra fields,
 * so we describe the ones we read while walking the tree.
 */
type LexicalNodeLike = SerializedLexicalNode & {
  children?: LexicalNodeLike[]
  text?: string
  tag?: string
}

type LexicalDoc =
  | SerializedEditorState<SerializedLexicalNode>
  | { root?: LexicalNodeLike }
  | LexicalNodeLike
  | null
  | undefined

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export function extractHeadingsFromLexical(doc: LexicalDoc, maxDepth: 'h2' | 'h3' = 'h3'): Heading[] {
  const headings: Heading[] = []
  const max = maxDepth === 'h2' ? 2 : 3

  const collectText = (n: LexicalNodeLike | null | undefined): string => {
    if (!n) return ''
    if (typeof n.text === 'string') return n.text
    const kids = Array.isArray(n.children) ? n.children : []
    return kids.map(collectText).join('')
  }

  const walk = (node: LexicalNodeLike | null | undefined) => {
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

  const root =
    doc && typeof doc === 'object' && 'root' in doc
      ? (doc.root as LexicalNodeLike | undefined)
      : (doc as LexicalNodeLike | null | undefined)

  walk(root)
  return headings
}
