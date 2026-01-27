import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { JsonLd } from '@/components/JsonLd'
import { buildPostSchema } from '@/utilities/buildSchema'
import { getServerSideURL } from '@/utilities/getURL'

// ✅ add this
import { extractHeadingsFromLexical } from '@/utilities/extractHeadingsFromLexical'

// ✅ add hreflang helper
import { buildHreflangForSharedSlug } from '@/utilities/hreflang'

const LOCALES = ['en', 'de'] as const
type AppLocale = (typeof LOCALES)[number]

function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // ✅ create locale+slug permutations
  return posts.docs.flatMap(({ slug }) =>
    LOCALES.map((locale) => ({
      locale,
      slug,
    })),
  )
}

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale: localeParam } = await paramsPromise

  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  // ✅ localized URL used by PayloadRedirects
  const url = `/${locale}/posts/${decodedSlug}`

  // ✅ pass locale so localized fields + structured data match language
  const post = await queryPostBySlug({ slug: decodedSlug, locale })

  // If post doesn't exist, let PayloadRedirects handle redirects (or 404)
  if (!post) return <PayloadRedirects url={url} />

  // ✅ Schema.org JSON-LD
  const siteURL = getServerSideURL()
  const jsonLd = buildPostSchema({ post, siteURL, locale })

  // ✅ headings for Table of Contents (H2/H3)
  const headings = extractHeadingsFromLexical(post.content as any, 'h3')

  // ✅ author box data (from your populateAuthors hook)
  const populatedAuthors = (post as any).populatedAuthors || []

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* ✅ Structured data */}
      <JsonLd data={jsonLd} />

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="max-w-[48rem] mx-auto"
            data={post.content}
            enableGutter={false}
            // ✅ NEW props for modules
            locale={locale}
            headings={headings}
            populatedAuthors={populatedAuthors}
          />

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((p) => typeof p === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale: localeParam } = await paramsPromise
  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'

  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug, locale })

  // If post doesn't exist, return empty; redirects/404 handled elsewhere
  if (!post) return {}

  const siteURL = getServerSideURL()

  // ✅ Hreflang mapping per your requirement:
  // de-DE, de-AT, de-CH => same /de/ URL
  // en + x-default => /en/ URL
  //
  // This helper assumes slugs are shared between locales.
  // If you localize slugs later, tell me and I’ll adjust to fetch per-locale slugs.
  const alternates = buildHreflangForSharedSlug({
    siteURL,
    basePath: 'posts',
    slug: encodeURIComponent(decodedSlug),
    trailingSlash: false,
  })

  return {
    ...generateMeta({ doc: post }),
    alternates: {
      canonical: new URL(`/${locale}/posts/${encodeURIComponent(decodedSlug)}`, siteURL).toString(),
      ...alternates,
    },
  }
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: AppLocale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    // ✅ Localization
    locale,
    fallbackLocale: 'en',
    // ✅ Optional but helpful for blocks like expertQuote relationship
    depth: 2,
  })

  return (result.docs?.[0] as Post) || null
})
