// src/app/(frontend)/[locale]/[slug]/page.tsx
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { getServerSideURL } from '@/utilities/getURL'
import { buildHreflangForSharedSlug } from '@/utilities/hreflang'

const LOCALES = ['en', 'de', 'fr'] as const
type AppLocale = (typeof LOCALES)[number]

function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

// ✅ include locale in params
type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

// ✅ include locale permutations
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  // Exclude "home" from [slug] SSG because /[locale] is handled by /[locale]/page.tsx
  const slugs = pages.docs?.filter((doc) => doc.slug !== 'home').map((d) => d.slug) ?? []

  return slugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      locale,
      slug,
    })),
  )
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale: localeParam } = await paramsPromise

  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  // ✅ localized URL for redirects
  const url =
    `/${locale}/${decodedSlug === 'home' ? '' : decodedSlug}`.replace(/\/+$/, '') || `/${locale}`

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  // Remove this code once your website is seeded
  if (!page && decodedSlug === 'home') {
    page = homeStatic as any
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page as any

  return (
    <article
      style={{
        backgroundColor: '#1D1D1D',
        maxWidth: '1440px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {hero ? <RenderHero {...hero} /> : null}
      <RenderBlocks blocks={layout || []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', locale: localeParam } = await paramsPromise
  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  // If missing, still allow redirects/404 elsewhere
  if (!page && decodedSlug !== 'home') return {}

  const siteURL = getServerSideURL()

  // ✅ Canonical:
  // - if page.meta.canonicalURL exists, use it
  // - else computed based on locale + slug
  const metaCanonical = (page as any)?.meta?.canonicalURL as string | undefined
  const computedCanonical =
    decodedSlug === 'home'
      ? new URL(`/${locale}`, siteURL).toString()
      : new URL(`/${locale}/${encodeURIComponent(decodedSlug)}`, siteURL).toString()

  const canonical = metaCanonical || computedCanonical

  // ✅ Hreflang per your requirement:
  // de-DE, de-AT, de-CH => same /de/ URL
  // en + x-default => /en/ URL
  const alternates =
    decodedSlug === 'home'
      ? {
          languages: {
            'de-DE': new URL('/de', siteURL).toString(),
            'de-AT': new URL('/de', siteURL).toString(),
            'de-CH': new URL('/de', siteURL).toString(),
            en: new URL('/en', siteURL).toString(),
            'x-default': new URL('/en', siteURL).toString(),
          },
        }
      : buildHreflangForSharedSlug({
          siteURL,
          basePath: '',
          slug: encodeURIComponent(decodedSlug),
          trailingSlash: false,
        })

  // ✅ Robots meta (optional override)
  const robotsValue = (page as any)?.meta?.robots as string | undefined
  const robots =
    robotsValue && typeof robotsValue === 'string'
      ? {
          index: robotsValue.includes('index'),
          follow: robotsValue.includes('follow'),
        }
      : undefined

  return {
    ...generateMeta({ doc: page as any }),
    ...(robots ? { robots } : {}),
    alternates: {
      canonical,
      ...alternates,
    },
  }
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: AppLocale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
    // ✅ Localization
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return (result.docs?.[0] as RequiredDataFromCollectionSlug<'pages'>) || null
})
