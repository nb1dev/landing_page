type FAQItem = { question: string; answer: string }
type FAQSection = { title?: string; items: FAQItem[] }

export function buildFAQPageSchema(sections: FAQSection[]) {
  const mainEntity = (sections ?? [])
    .flatMap((s) => s.items ?? [])
    .filter((i) => i.question && i.answer)
    .map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: i.answer,
      },
    }))

  if (!mainEntity.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}
