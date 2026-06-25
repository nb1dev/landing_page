import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { Page } from '@/payload-types'

type RichTextValue = SerializedEditorState<SerializedLexicalNode> | null | undefined

type LexicalNodeLike = SerializedLexicalNode & {
  children?: LexicalNodeLike[]
  text?: string
}

function extractPlainTextFromLexical(value: RichTextValue): string {
  if (!value?.root?.children) return ''

  const walk = (nodes: LexicalNodeLike[]): string => {
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

  return walk(value.root.children as LexicalNodeLike[])
}

type FaqBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'faq' }>
type FaqItem = FaqBlock['items'][number]

// Accept both a fully-saved Page and the draft shape returned by queries
// (where `id`/`createdAt`/`updatedAt` may be optional).
type PageLike = Partial<Page>

export function buildPageJsonLd(page: PageLike | null | undefined, url: string) {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'WebPage',
    url,
    name: page?.meta?.title || page?.title || '',
    description: page?.meta?.description || '',
  })

  const faqBlocks = (page?.layout ?? []).filter(
    (block): block is FaqBlock => block?.blockType === 'faq' && Array.isArray(block?.items),
  )

  if (faqBlocks.length > 0) {
    const allFaqItems = faqBlocks.flatMap((block) => block.items || [])

    graph.push({
      '@type': 'FAQPage',
      mainEntity: allFaqItems.map((item: FaqItem) => ({
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
