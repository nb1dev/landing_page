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
import { extractHeadingsFromLexical } from '@/utilities/extractHeadingsFromLexical'
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
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale}/posts/${decodedSlug}`

  const post = await queryPostBySlug({ slug: decodedSlug, locale })

  if (!post) return <PayloadRedirects url={url} />

  const siteURL = getServerSideURL()
  const jsonLd = buildPostSchema({ post, siteURL, locale })
  const headings = extractHeadingsFromLexical(post.content as any, 'h3')
  const populatedAuthors = (post as any).populatedAuthors || []

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <JsonLd data={jsonLd} />

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {post.intro ? (
            <RichText
              className="max-w-[48rem] mx-auto mb-8"
              data={post.intro}
              enableGutter={false}
              locale={locale}
            />
          ) : null}

          <RichText
            className="max-w-[48rem] mx-auto"
            data={post.content}
            enableGutter={false}
            locale={locale}
            headings={headings}
            populatedAuthors={populatedAuthors}
          />

          {post.relatedArticles && post.relatedArticles.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedArticles.filter((p) => typeof p === 'object')}
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

  if (!post) return {}

  const siteURL = getServerSideURL()

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
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return (result.docs?.[0] as Post) || null
})
