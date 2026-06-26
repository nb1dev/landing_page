import type { Page } from '@/payload-types'

// Accept both a fully-saved Page and the draft shape returned by queries
// (where `id`/`createdAt`/`updatedAt` may be optional).
type PageLike = Partial<Page>

// NOTE: this previously also emitted FAQPage JSON-LD from the legacy `faq` block,
// which has been removed from the Pages collection. If FAQ rich snippets are
// wanted again, wire them off the current `faqPage` block (groups → items).
export function buildPageJsonLd(page: PageLike | null | undefined, url: string) {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'WebPage',
    url,
    name: page?.meta?.title || page?.title || '',
    description: page?.meta?.description || '',
  })

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
