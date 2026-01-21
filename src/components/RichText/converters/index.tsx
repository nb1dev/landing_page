import React from 'react'

import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { textConverter } from './textConverter'

// your existing blocks
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'

// your “modules”
import { TableOfContentsComponent } from '@/blocks/TableOfContents/Component'
import { AuthorBoxComponent } from '@/blocks/AuthorBox/Component'
import { FAQAccordionComponent } from '@/blocks/FAQAccordion/Component'
import { CitationComponent } from '@/blocks/Citation/Component'
import { ExpertQuoteComponent } from '@/blocks/ExpertQuote/Component'
import { ComparisonTableComponent } from '@/blocks/ComparisonTable/Component'

// Keep typing flexible to avoid maintaining unions when blocks change
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>

export type HeadingItem = { id: string; depth: 2 | 3; text: string }
export type PopulatedAuthor = {
  name: string
  slug?: string
  credentials?: string
  avatarUrl?: string
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

function slugify(s: string) {
  return (s || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function getNodeText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  const kids = Array.isArray(node.children) ? node.children : []
  return kids.map(getNodeText).join('')
}

function isHeadingTag(tag: any): tag is HeadingTag {
  return (
    tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6'
  )
}

/**
 * ✅ This replaces a static `jsxConverter` with a factory so you can still pass locale/headings/authors.
 */
export function createJSXConverter({
  locale,
  headings,
  populatedAuthors,
}: {
  locale?: string
  headings?: HeadingItem[]
  populatedAuthors?: PopulatedAuthor[]
} = {}): JSXConvertersFunction<NodeTypes> {
  const safeLocale = locale || 'en'
  const prefix = `/${safeLocale}`

  const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const doc = linkNode.fields?.doc
    if (!doc) return prefix

    const { value, relationTo } = doc
    if (typeof value !== 'object') throw new Error('Expected value to be an object')
    const slug = (value as any).slug

    return relationTo === 'posts' ? `${prefix}/posts/${slug}` : `${prefix}/${slug}`
  }

  return ({ defaultConverters }) => ({
    ...defaultConverters,

    // ✅ your custom text styling support
    ...textConverter,

    // ✅ localized internal links
    ...LinkJSXConverter({ internalDocToHref }),

    // ✅ Add IDs to H2/H3 so TOC can anchor-link
    heading: ({ node, children }: any) => {
      const rawTag = node?.tag
      const tag: HeadingTag = isHeadingTag(rawTag) ? rawTag : 'h2'
      const isTocHeading = tag === 'h2' || tag === 'h3'

      if (!isTocHeading) return React.createElement(tag, null, children)

      const text = getNodeText(node).trim()
      const id = slugify(text)
      return React.createElement(tag, { id }, children)
    },

    blocks: {
      // existing blocks
      banner: ({ node }: any) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }: any) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }: any) => <CodeBlock className="col-start-2" {...node.fields} />,
      cta: ({ node }: any) => <CallToActionBlock {...node.fields} />,

      // new modules
      tableOfContents: ({ node }: any) => {
        const title = node.fields?.title
        const maxDepth = node.fields?.maxDepth === 'h2' ? 2 : 3
        const filtered = (headings || []).filter((h) => h.depth <= maxDepth)
        return <TableOfContentsComponent title={title} headings={filtered} />
      },

      authorBox: ({ node }: any) => {
        const title = node.fields?.overrideTitle
        const showAll = node.fields?.showAllAuthors !== false
        const authors = showAll ? populatedAuthors || [] : (populatedAuthors || []).slice(0, 1)
        return <AuthorBoxComponent title={title} locale={safeLocale} authors={authors} />
      },

      faqAccordion: ({ node }: any) => {
        const title = node.fields?.title
        const items = Array.isArray(node.fields?.items) ? node.fields.items : []
        return <FAQAccordionComponent title={title} items={items} />
      },

      citation: ({ node }: any) => (
        <CitationComponent
          quote={node.fields?.quote}
          sourceName={node.fields?.sourceName}
          sourceUrl={node.fields?.sourceUrl}
        />
      ),

      expertQuote: ({ node }: any) => (
        <ExpertQuoteComponent
          quote={node.fields?.quote}
          expert={node.fields?.expert}
          expertName={node.fields?.expertName}
          credentials={node.fields?.credentials}
          avatar={node.fields?.avatar}
          locale={safeLocale}
        />
      ),

      comparisonTable: ({ node }: any) => (
        <ComparisonTableComponent
          title={node.fields?.title}
          columns={Array.isArray(node.fields?.columns) ? node.fields.columns : []}
          rows={Array.isArray(node.fields?.rows) ? node.fields.rows : []}
        />
      ),
    },
  })
}
