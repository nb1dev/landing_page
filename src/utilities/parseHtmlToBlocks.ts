/**
 * parseHtmlToBlocks
 *
 * Converts raw HTML (from the content pipeline) into a Payload Lexical JSON document
 * suitable for storing in the Post `content` richText field.
 *
 * Block sections must be wrapped in HTML comment markers:
 *
 *   <!-- block:keyTakeaways -->
 *   <ul>
 *     <li><strong>Lead-in phrase.</strong> Explanation text here.</li>
 *     <!-- 3–5 items -->
 *   </ul>
 *   <!-- /block -->
 *
 *   <!-- block:faq -->
 *   <dl>
 *     <dt>Question text?</dt>
 *     <dd>Answer paragraph.</dd>
 *     <!-- 3–6 pairs -->
 *   </dl>
 *   <!-- /block -->
 *   (or use <h3> + <p> pairs inside the marker)
 *
 *   <!-- block:cta -->
 *   <p>Body text connecting article topic to the NB1 kit.</p>
 *   <!-- /block -->
 *   (buttonUrl defaults to /order unless an <a href="..."> is present)
 *
 *   <!-- block:bulletList -->
 *   <h3>Optional Section Title</h3>
 *   <ul>
 *     <li><strong>Lead-in.</strong> Body text.</li>
 *     <!-- 2–10 items -->
 *   </ul>
 *   <!-- /block -->
 *
 *   <!-- block:dataTable -->
 *   <h3>Optional Section Title</h3>
 *   <table>
 *     <thead><tr><th>Term</th><th>Definition</th></tr></thead>
 *     <tbody>
 *       <tr><td>Microbiome</td><td>The community of microorganisms...</td></tr>
 *     </tbody>
 *   </table>
 *   <!-- /block -->
 *   (2-column table → glossary variant; 3+ columns → comparison variant)
 *
 * Everything outside block markers is converted to Lexical paragraph/heading nodes
 * and written into the richText content directly.
 *
 * The `intro` field must be sent separately in the API payload — it is not parsed here.
 */

import { parse } from 'node-html-parser'
import type { HTMLElement as NHTMLElement } from 'node-html-parser'
import { randomUUID } from 'crypto'

// ---------------------------------------------------------------------------
// Lexical node builders
// ---------------------------------------------------------------------------

function textNode(text: string, format = 0) {
  return {
    type: 'text',
    version: 1,
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
  }
}

function paragraphNode(children: ReturnType<typeof textNode>[]) {
  return {
    type: 'paragraph',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
    children,
  }
}

function headingNode(tag: 'h1' | 'h2' | 'h3' | 'h4', children: ReturnType<typeof textNode>[]) {
  return {
    type: 'heading',
    version: 1,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    tag,
    children,
  }
}

/** Wraps a parsed block's fields as a Lexical embedded block node */
function blockNode(blockType: string, fields: Record<string, unknown>) {
  return {
    type: 'block',
    version: 2,
    fields: {
      id: randomUUID(),
      blockType,
      ...fields,
    },
  }
}

/** Minimal Lexical document used for richText sub-fields (e.g. FAQ answers) */
function richTextDoc(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: [paragraphNode([textNode(text)])],
    },
  }
}

// ---------------------------------------------------------------------------
// Inline HTML → Lexical text nodes
// ---------------------------------------------------------------------------

function parseInlineChildren(el: NHTMLElement): ReturnType<typeof textNode>[] {
  const nodes: ReturnType<typeof textNode>[] = []

  for (const child of el.childNodes) {
    if (child.nodeType === 3) {
      // plain text node
      const text = child.text
      if (text.trim()) nodes.push(textNode(text))
    } else if (child.nodeType === 1) {
      const el2 = child as NHTMLElement
      const tag = el2.tagName?.toLowerCase()
      const text = el2.text.trim()
      if (!text) continue

      if (tag === 'strong' || tag === 'b') {
        nodes.push(textNode(text, 1)) // 1 = bold
      } else if (tag === 'em' || tag === 'i') {
        nodes.push(textNode(text, 2)) // 2 = italic
      } else if (tag === 'u') {
        nodes.push(textNode(text, 8)) // 8 = underline
      } else {
        nodes.push(textNode(text))
      }
    }
  }

  return nodes
}

// ---------------------------------------------------------------------------
// Block parsers — each returns a Lexical block node
// ---------------------------------------------------------------------------

function parseKeyTakeaways(container: NHTMLElement) {
  const items: Array<{ leadIn: string; explanation: string }> = []

  for (const li of container.querySelectorAll('li')) {
    const strong = li.querySelector('strong') ?? li.querySelector('b')
    const leadIn = strong?.text?.trim() ?? ''
    const fullText = li.text.trim()
    // strip the lead-in from the full text to get the explanation
    const explanation = fullText
      .replace(leadIn, '')
      .replace(/^\s*[.\s]+/, '')
      .trim()
    if (leadIn || explanation) {
      items.push({ leadIn, explanation })
    }
  }

  return blockNode('keyTakeaways', { items })
}

function parseFAQ(container: NHTMLElement) {
  const items: Array<{ question: string; answer: ReturnType<typeof richTextDoc> }> = []

  const dts = container.querySelectorAll('dt')

  if (dts.length > 0) {
    // <dl><dt>Question</dt><dd>Answer</dd></dl>
    for (const dt of dts) {
      const dd = dt.nextElementSibling
      const question = dt.text.trim()
      const answerText = dd?.text?.trim() ?? ''
      if (question) {
        items.push({ question, answer: richTextDoc(answerText) })
      }
    }
  } else {
    // <h3>Question</h3><p>Answer</p> pairs
    const children = container.childNodes.filter((n) => n.nodeType === 1) as NHTMLElement[]
    for (let i = 0; i < children.length; i++) {
      const el = children[i]!
      if (el.tagName?.toLowerCase() === 'h3') {
        const next = children[i + 1]
        const question = el.text.trim()
        const answerText = next?.text?.trim() ?? ''
        if (question) {
          items.push({ question, answer: richTextDoc(answerText) })
          i++ // skip the paired answer element
        }
      }
    }
  }

  return blockNode('faq', { items })
}

function parseCTA(container: NHTMLElement) {
  const p = container.querySelector('p')
  const a = container.querySelector('a')
  const body = p?.text?.trim() ?? container.text.trim()
  const buttonUrl = a?.getAttribute('href') ?? '/order'

  return blockNode('ctaBlock', { body, buttonUrl })
}

function parseBulletList(container: NHTMLElement) {
  const h3 = container.querySelector('h3')
  const sectionTitle = h3?.text?.trim() || undefined

  const items: Array<{ leadIn: string; body: string }> = []

  for (const li of container.querySelectorAll('li')) {
    const strong = li.querySelector('strong') ?? li.querySelector('b')
    const leadIn = strong?.text?.trim() ?? ''
    const fullText = li.text.trim()
    const body = fullText
      .replace(leadIn, '')
      .replace(/^\s*[.\s]+/, '')
      .trim()
    items.push({ leadIn, body })
  }

  return blockNode('bulletList', { sectionTitle, items })
}

function parseDataTable(container: NHTMLElement) {
  const h3 = container.querySelector('h3')
  const sectionTitle = h3?.text?.trim() || undefined

  const table = container.querySelector('table')
  if (!table) return null

  const ths = table.querySelectorAll('thead tr th')
  const columnHeaders =
    ths.length > 0 ? Array.from(ths).map((th) => ({ label: th.text.trim() })) : []

  const colCount = ths.length || 2
  const variant: 'glossary' | 'comparison' = colCount >= 3 ? 'comparison' : 'glossary'

  const bodyRows =
    table.querySelectorAll('tbody tr').length > 0
      ? table.querySelectorAll('tbody tr')
      : // fall back: all <tr> rows that aren't the header
        table.querySelectorAll('tr').filter((tr) => tr.querySelectorAll('td').length > 0)

  const rows = Array.from(bodyRows)
    .map((tr) => ({
      cells: Array.from(tr.querySelectorAll('td')).map((td) => ({ value: td.text.trim() })),
    }))
    .filter((row) => row.cells.length > 0)

  return blockNode('dataTable', { sectionTitle, variant, columnHeaders, rows })
}

// ---------------------------------------------------------------------------
// Regular HTML element → Lexical content nodes
// ---------------------------------------------------------------------------

function htmlElementToLexicalNodes(el: NHTMLElement) {
  const tag = el.tagName?.toLowerCase()
  if (!tag) return []

  if (['h1', 'h2', 'h3', 'h4'].includes(tag)) {
    const children = parseInlineChildren(el)
    if (!children.length) return []
    return [headingNode(tag as 'h1' | 'h2' | 'h3' | 'h4', children)]
  }

  if (tag === 'p') {
    const children = parseInlineChildren(el)
    if (!children.length) return []
    return [paragraphNode(children)]
  }

  // For any other block element, treat its text as a plain paragraph
  const text = el.text.trim()
  if (!text) return []
  return [paragraphNode([textNode(text)])]
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Parses `htmlContent` and returns a Lexical JSON document to be stored
 * in the Post `content` richText field.
 */
export function parseHtmlToContent(html: string) {
  const lexicalChildren: ReturnType<
    typeof paragraphNode | typeof headingNode | typeof blockNode
  >[] = []

  // Split on block comment markers
  // Matches: <!-- block:keyTakeaways --> and <!-- /block -->
  const parts = html.split(/(<!--\s*block:\w+\s*-->|<!--\s*\/block\s*-->)/gi)

  let currentBlockType: string | null = null
  let currentBlockHtml = ''

  for (const part of parts) {
    const openMatch = part.match(/<!--\s*block:(\w+)\s*-->/i)
    const isClose = /<!--\s*\/block\s*-->/i.test(part)

    if (openMatch) {
      currentBlockType = openMatch[1]!
      currentBlockHtml = ''
      continue
    }

    if (isClose && currentBlockType) {
      const container = parse(currentBlockHtml)
      let node: ReturnType<typeof blockNode> | null = null

      switch (currentBlockType) {
        case 'keyTakeaways':
          node = parseKeyTakeaways(container as unknown as NHTMLElement)
          break
        case 'faq':
          node = parseFAQ(container as unknown as NHTMLElement)
          break
        case 'cta':
          node = parseCTA(container as unknown as NHTMLElement)
          break
        case 'bulletList':
          node = parseBulletList(container as unknown as NHTMLElement)
          break
        case 'dataTable':
          node = parseDataTable(container as unknown as NHTMLElement)
          break
        default:
          node = null
      }

      if (node) lexicalChildren.push(node)
      currentBlockType = null
      currentBlockHtml = ''
      continue
    }

    if (currentBlockType) {
      // accumulate inner HTML for current block
      currentBlockHtml += part
      continue
    }

    // Regular HTML outside any block marker → Lexical paragraph/heading nodes
    const parsed = parse(part)
    for (const child of parsed.childNodes) {
      if (child.nodeType === 1) {
        const nodes = htmlElementToLexicalNodes(child as NHTMLElement)
        lexicalChildren.push(...nodes)
      }
    }
  }

  // Lexical requires at least one child in root
  if (lexicalChildren.length === 0) {
    lexicalChildren.push(paragraphNode([textNode('')]))
  }

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: lexicalChildren,
    },
  }
}
