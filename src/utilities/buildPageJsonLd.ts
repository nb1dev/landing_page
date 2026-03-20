import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

type RichTextValue = SerializedEditorState<SerializedLexicalNode> | null | undefined

function extractPlainTextFromLexical(value: RichTextValue): string {
  if (!value?.root?.children) return ''

  const walk = (nodes: any[]): string => {
    return nodes
      .map((node) => {
        if (node?.type === 'text') return node.text || ''
        if (Array.isArray(node?.children)) return walk(node.children)
        return ''
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return walk(value.root.children)
}

export function buildPageJsonLd(page: any, url: string) {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'WebPage',
    url,
    name: page?.meta?.title || page?.title || '',
    description: page?.meta?.description || '',
  })

  const faqBlocks =
    page?.layout?.filter(
      (block: any) => block?.blockType === 'faq' && Array.isArray(block?.items),
    ) || []

  if (faqBlocks.length > 0) {
    const allFaqItems = faqBlocks.flatMap((block: any) => block.items || [])

    graph.push({
      '@type': 'FAQPage',
      mainEntity: allFaqItems.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: extractPlainTextFromLexical(item.answer as RichTextValue),
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
