import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { JsonLd } from '@/components/JsonLd/index'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { buildPageJsonLd } from '@/utilities/buildPageJsonLd'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { getServerSideURL } from '@/utilities/getURL'
import { buildHreflangForSharedSlug } from '@/utilities/hreflang'
import { getServerCurrency } from '@/utilities/currency'
import { resolvePriceTokensDeep } from '@/lib/plans/priceTokens'

const LOCALES = ['en', 'de', 'fr', 'nl'] as const
type AppLocale = (typeof LOCALES)[number]

function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

// Pages are served from the static / full-route cache and refreshed on publish
// via the revalidatePage afterChange hook (revalidatePath). This time-based value
// is just a backstop. Keeps the heavy ~260KB per-page query off the runtime hot
// path — critical on the 1 vCPU staging DB where it was saturating the pool.
export const revalidate = 600

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

  // Skip 'home' (rendered at the locale root) and any test/clone page (slug starting with
  // "test", e.g. "test-clone"). Test pages get synced STG → PROD and a single one with bad
  // block data would otherwise crash the whole `next build` (prerender error). They're not
  // prerendered now (still reachable on-demand if ever needed); real pages are unaffected.
  const slugs = pages.docs
    ?.filter((doc) => doc.slug && doc.slug !== 'home-page' && !/^test\b/i.test(doc.slug))
    .map((d) => d.slug) ?? []

  return slugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      locale,
      slug,
    })),
  )
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home-page', locale: localeParam } = await paramsPromise

  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)

  const url =
    `/${locale}/${decodedSlug === 'home-page' ? '' : decodedSlug}`.replace(/\/+$/, '') || `/${locale}`

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page && decodedSlug === 'home-page') {
    page = homeStatic as any
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero: rawHero, layout: rawLayout, header: pageHeader, footer: pageFooter, hideHeader, hideFooter } = page as any
  const headerId = typeof pageHeader === 'object' ? pageHeader?.id : pageHeader
  const footerId = typeof pageFooter === 'object' ? pageFooter?.id : pageFooter

  // Resolve live-price tokens — incl. arithmetic like
  // {{(price:core:4-price:core:12)*12}} — in EVERY field of EVERY block (and the
  // hero), once, in the visitor's currency. This makes tokens work everywhere in
  // page content without per-block wiring. No-op (returns input) when a section
  // has no tokens, so it's cheap for token-free pages.
  const currency = await getServerCurrency(locale)
  const [hero, layout] = await Promise.all([
    resolvePriceTokensDeep(rawHero, currency, locale),
    resolvePriceTokensDeep(rawLayout, currency, locale),
  ])

  const absoluteUrl =
    decodedSlug === 'home'
      ? new URL(`/${locale}`, getServerSideURL()).toString()
      : new URL(`/${locale}/${encodeURIComponent(decodedSlug)}`, getServerSideURL()).toString()

  const pageJsonLd = buildPageJsonLd(page, absoluteUrl)

  return (
    <>
      <JsonLd data={pageJsonLd} />

      {!hideHeader && <Header locale={locale} id={headerId} />}

      <article
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
        }}
      >
        <PageClient />

        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        {hero ? <RenderHero {...hero} /> : null}
        <RenderBlocks blocks={layout || []} locale={locale} />
      </article>

      {!hideFooter && <Footer locale={locale} id={footerId} />}
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home-page', locale: localeParam } = await paramsPromise
  const locale: AppLocale = isAppLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageMetaBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page && decodedSlug !== 'home-page') return {}

  const siteURL = getServerSideURL()

  const metaCanonical = (page as any)?.meta?.canonicalURL as string | undefined
  const computedCanonical =
    decodedSlug === 'home-page'
      ? new URL(`/${locale}`, siteURL).toString()
      : new URL(`/${locale}/${encodeURIComponent(decodedSlug)}`, siteURL).toString()

  const canonical = metaCanonical || computedCanonical

  const alternates =
    decodedSlug === 'home-page'
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

async function queryPageBySlug({ slug, locale }: { slug: string; locale: AppLocale }) {
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
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return (result.docs?.[0] as RequiredDataFromCollectionSlug<'pages'>) || null
}

// generateMetadata only needs the SEO group + slug — never the page's blocks.
// Reusing queryPageBySlug here would run the SAME ~300KB query that LEFT JOINs all
// ~85 block types (and on the small STG DB that draft query trips the DB-level
// statement_timeout → "canceling statement due to statement timeout"). `select`
// keeps this query tiny: just the scalar SEO columns + the meta image relation.
async function queryPageMetaBySlug({ slug, locale }: { slug: string; locale: AppLocale }) {
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
    locale,
    fallbackLocale: 'en',
    depth: 1,
    select: {
      slug: true,
      title: true,
      meta: true,
    },
  })

  return (result.docs?.[0] as RequiredDataFromCollectionSlug<'pages'>) || null
}
