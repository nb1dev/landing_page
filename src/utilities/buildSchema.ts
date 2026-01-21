import type { Post } from '@/payload-types'

function absoluteURL(siteURL: string, maybeRelative?: string | null) {
  if (!maybeRelative) return undefined
  try {
    return new URL(maybeRelative, siteURL).toString()
  } catch {
    return undefined
  }
}

function buildAuthors(post: Post, siteURL: string, locale: string) {
  const authors = (post as any)?.populatedAuthors as
    | Array<{ name?: string; slug?: string; credentials?: string }>
    | undefined

  const clean = (authors ?? [])
    .map((a) => ({
      name: String(a?.name ?? '').trim(),
      slug: String(a?.slug ?? '').trim(),
    }))
    .filter((a) => a.name)

  if (!clean.length) return undefined

  const toPerson = (a: { name: string; slug?: string }) => ({
    '@type': 'Person',
    name: a.name,
    ...(a.slug ? { url: `${siteURL}/${locale}/authors/${a.slug}` } : {}),
  })

  return clean.length === 1 ? toPerson(clean[0]) : clean.map(toPerson)
}

function extractFaqAccordionItems(post: Post) {
  const content = (post as any)?.content
  const rootChildren = content?.root?.children
  if (!Array.isArray(rootChildren)) return []

  const items: Array<{ question: string; answer: string }> = []

  const walk = (node: any) => {
    if (!node) return
    const children = Array.isArray(node.children) ? node.children : []

    // Common Payload Lexical block shape:
    if (node.type === 'block' && node.fields?.blockType === 'faqAccordion') {
      const arr = Array.isArray(node.fields?.items) ? node.fields.items : []
      for (const it of arr) {
        const q = String(it?.question ?? '').trim()
        const a = String(it?.answer ?? '').trim()
        if (q && a) items.push({ question: q, answer: a })
      }
    }

    for (const c of children) walk(c)
  }

  for (const c of rootChildren) walk(c)
  return items
}

function extractComparisonProducts(post: Post) {
  const content = (post as any)?.content
  const rootChildren = content?.root?.children
  if (!Array.isArray(rootChildren)) return []

  const products: Array<{
    name: string
    url?: string
    brand?: string
    manufacturer?: string
    description?: string
  }> = []

  const walk = (node: any) => {
    if (!node) return
    const children = Array.isArray(node.children) ? node.children : []

    if (node.type === 'block' && node.fields?.blockType === 'comparisonTable') {
      const generateSchema = Boolean(node.fields?.generateSchema)
      if (!generateSchema) return

      const rows = Array.isArray(node.fields?.rows) ? node.fields.rows : []
      for (const r of rows) {
        const name = String(r?.productName ?? '').trim()
        if (!name) continue
        products.push({
          name,
          url: r?.productUrl ? String(r.productUrl) : undefined,
          brand: r?.brand ? String(r.brand) : undefined,
          manufacturer: r?.manufacturer ? String(r.manufacturer) : undefined,
          description: r?.description ? String(r.description) : undefined,
        })
      }
    }

    for (const c of children) walk(c)
  }

  for (const c of rootChildren) walk(c)
  return products
}

export function buildPostSchema({
  post,
  siteURL,
  locale,
}: {
  post: Post
  siteURL: string
  locale: string
}) {
  if (!post) return null

  const slug = typeof post.slug === 'string' ? post.slug : ''
  const url = `${siteURL}/${locale}/posts/${encodeURIComponent(slug)}`

  const schemaMarkup = (post as any)?.schemaMarkup as
    | {
        type?: 'Article' | 'TechArticle' | 'FAQPage' | 'MedicalWebPage'
        headline?: string
        faqItems?: Array<{ question?: string; answer?: string }>
        medical?: any
      }
    | undefined

  const schemaType = schemaMarkup?.type || 'Article'
  const headline =
    (schemaMarkup?.headline || '').trim() || (typeof post.title === 'string' ? post.title : '')

  const description = (post as any)?.meta?.description || undefined
  const imageURL =
    absoluteURL(siteURL, (post as any)?.meta?.image?.url) ||
    absoluteURL(siteURL, (post as any)?.heroImage?.url) ||
    undefined

  const datePublished = (post as any)?.publishedAt || undefined
  const dateModified = (post as any)?.updatedAt || undefined

  const author = buildAuthors(post, siteURL, locale)

  // ✅ Auto FAQ from FAQAccordion blocks
  const blockFaq = extractFaqAccordionItems(post)

  // ✅ Explicit FAQ items (if using schemaMarkup.type === FAQPage)
  const explicitFaq = (schemaMarkup?.faqItems ?? [])
    .map((i) => ({
      question: String(i?.question ?? '').trim(),
      answer: String(i?.answer ?? '').trim(),
    }))
    .filter((i) => i.question && i.answer)

  // If editor explicitly set FAQPage, use explicit items; otherwise use block items.
  const faqItems = schemaType === 'FAQPage' ? explicitFaq : blockFaq

  const faqSchema =
    faqItems.length > 0
      ? {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((i) => ({
            '@type': 'Question',
            name: i.question,
            acceptedAnswer: { '@type': 'Answer', text: i.answer },
          })),
        }
      : null

  // ✅ Auto schema from ComparisonTable blocks (simple ItemList of Products)
  const comparisonProducts = extractComparisonProducts(post)
  const comparisonSchema =
    comparisonProducts.length > 0
      ? {
          '@type': 'ItemList',
          itemListElement: comparisonProducts.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'Product',
              name: p.name,
              ...(p.description ? { description: p.description } : {}),
              ...(p.url ? { url: p.url } : {}),
              ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}),
              ...(p.manufacturer
                ? { manufacturer: { '@type': 'Organization', name: p.manufacturer } }
                : {}),
            },
          })),
        }
      : null

  // ✅ Main schema (keeps your previous behavior)
  let main: any = null

  if (schemaType === 'Article' || schemaType === 'TechArticle') {
    main = {
      '@type': schemaType,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      headline,
      ...(description ? { description } : {}),
      ...(imageURL ? { image: [imageURL] } : {}),
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      ...(author ? { author } : {}),
      publisher: { '@type': 'Organization', name: 'NB1 Health GmbH' },
    }
  } else if (schemaType === 'MedicalWebPage') {
    const med = schemaMarkup?.medical || {}
    main = {
      '@type': 'MedicalWebPage',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      name: headline,
      ...(description ? { description } : {}),
      ...(imageURL ? { image: [imageURL] } : {}),
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      ...(author ? { author } : {}),
      ...(med?.aboutName
        ? { about: { '@type': med.aboutType || 'MedicalCondition', name: med.aboutName } }
        : {}),
      ...(med?.medicalSpecialty ? { medicalSpecialty: med.medicalSpecialty } : {}),
      publisher: { '@type': 'Organization', name: 'NB1 Health GmbH' },
    }
  } else if (schemaType === 'FAQPage') {
    main = faqSchema
  }

  // ✅ Merge everything with @graph (best practice when multiple schemas exist)
  const graph = [main, schemaType !== 'FAQPage' ? faqSchema : null, comparisonSchema].filter(
    Boolean,
  )
  if (!graph.length) return null

  return { '@context': 'https://schema.org', '@graph': graph }
}
