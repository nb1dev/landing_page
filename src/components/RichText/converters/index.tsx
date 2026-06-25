import React from 'react'

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { textConverter } from './textConverter'

import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps,
  CallToActionBlock as CTABlockProps,
  KeyTakeawaysBlock as KeyTakeawaysBlockProps,
  FAQBlock as FAQBlockProps,
  DataTableBlock as DataTableBlockProps,
  CtaBlock as CtaBlockProps,
  BulletListBlock as BulletListBlockProps,
} from '@/payload-types'

// existing blocks
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import type { CodeBlockProps } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'

// existing modules
import { TableOfContentsComponent } from '@/blocks/TableOfContents/Component'
import { AuthorBoxComponent } from '@/blocks/AuthorBox/Component'
import { FAQAccordionComponent } from '@/blocks/FAQAccordion/Component'
import { CitationComponent } from '@/blocks/Citation/Component'
import { ExpertQuoteComponent } from '@/blocks/ExpertQuote/Component'
import { ComparisonTableComponent } from '@/blocks/ComparisonTable/Component'

// newly added blocks/modules
import { KeyTakeawaysBlock } from '@/blocks/KeyTakeways/Component'
import { FAQBlockComponent } from '@/blocks/FAQ/Component'
import { DataTableBlockComponent } from '@/blocks/DataTable/Component'
import { CtaBlockComponent } from '@/blocks/CTA/Component'
import { BulletListBlockComponent } from '@/blocks/BulletList/Component'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

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

type LexicalNodeLike = SerializedLexicalNode & {
  children?: LexicalNodeLike[]
  text?: string
}

function getNodeText(node: LexicalNodeLike | null | undefined): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  const kids = Array.isArray(node.children) ? node.children : []
  return kids.map(getNodeText).join('')
}

function isHeadingTag(tag: unknown): tag is HeadingTag {
  return (
    tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6'
  )
}

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
    const slug = (value as { slug?: string }).slug

    return relationTo === 'posts' ? `${prefix}/posts/${slug}` : `${prefix}/${slug}`
  }

  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...textConverter,
    ...LinkJSXConverter({ internalDocToHref }),

    heading: ({
      node,
      nodesToJSX,
    }: {
      node: SerializedHeadingNode
      nodesToJSX: (args: { nodes: SerializedLexicalNode[] }) => React.ReactNode[]
    }) => {
      const rawTag = node?.tag
      const tag: HeadingTag = isHeadingTag(rawTag) ? rawTag : 'h2'
      const children = nodesToJSX({ nodes: node.children })
      const isTocHeading = tag === 'h2' || tag === 'h3'

      if (!isTocHeading) return React.createElement(tag, null, ...children)

      const text = getNodeText(node).trim()
      const id = slugify(text)
      return React.createElement(tag, { id }, ...children)
    },

    blocks: {
      banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
        <BannerBlock className="col-start-2 mb-4" {...node.fields} />
      ),

      mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),

      code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
        <CodeBlock className="col-start-2" {...node.fields} />
      ),

      cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
        <CallToActionBlock {...node.fields} />
      ),

      tableOfContents: ({ node }: { node: SerializedBlockNode }) => {
        const title = node.fields?.title
        const maxDepth = node.fields?.maxDepth === 'h2' ? 2 : 3
        const filtered = (headings || []).filter((h) => h.depth <= maxDepth)
        return <TableOfContentsComponent title={title} headings={filtered} />
      },

      authorBox: ({ node }: { node: SerializedBlockNode }) => {
        const title = node.fields?.overrideTitle
        const showAll = node.fields?.showAllAuthors !== false
        const authors = showAll ? populatedAuthors || [] : (populatedAuthors || []).slice(0, 1)
        return <AuthorBoxComponent title={title} locale={safeLocale} authors={authors} />
      },

      faqAccordion: ({ node }: { node: SerializedBlockNode }) => {
        const title = node.fields?.title
        const items = Array.isArray(node.fields?.items) ? node.fields.items : []
        return <FAQAccordionComponent title={title} items={items} />
      },

      citation: ({ node }: { node: SerializedBlockNode }) => (
        <CitationComponent
          quote={node.fields?.quote}
          sourceName={node.fields?.sourceName}
          sourceUrl={node.fields?.sourceUrl}
        />
      ),

      expertQuote: ({ node }: { node: SerializedBlockNode }) => (
        <ExpertQuoteComponent
          quote={node.fields?.quote}
          expert={node.fields?.expert}
          expertName={node.fields?.expertName}
          credentials={node.fields?.credentials}
          avatar={node.fields?.avatar}
          locale={safeLocale}
        />
      ),

      comparisonTable: ({ node }: { node: SerializedBlockNode }) => (
        <ComparisonTableComponent
          title={node.fields?.title}
          columns={Array.isArray(node.fields?.columns) ? node.fields.columns : []}
          rows={Array.isArray(node.fields?.rows) ? node.fields.rows : []}
        />
      ),

      keyTakeaways: ({ node }: { node: SerializedBlockNode<KeyTakeawaysBlockProps> }) => (
        <KeyTakeawaysBlock {...node.fields} locale={safeLocale} />
      ),

      faq: ({ node }: { node: SerializedBlockNode<FAQBlockProps> }) => (
        <FAQBlockComponent {...node.fields} locale={safeLocale} />
      ),

      dataTable: ({ node }: { node: SerializedBlockNode<DataTableBlockProps> }) => (
        <DataTableBlockComponent {...node.fields} locale={safeLocale} />
      ),

      ctaBlock: ({ node }: { node: SerializedBlockNode<CtaBlockProps> }) => (
        <CtaBlockComponent {...node.fields} locale={safeLocale} />
      ),

      bulletList: ({ node }: { node: SerializedBlockNode<BulletListBlockProps> }) => (
        <BulletListBlockComponent {...node.fields} locale={safeLocale} />
      ),
    },
  })
}
