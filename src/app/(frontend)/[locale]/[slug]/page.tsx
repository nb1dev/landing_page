import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { JsonLd } from '@/components/JsonLd/index'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import React from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { buildPageJsonLd } from '@/utilities/buildPageJsonLd'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { getServerSideURL } from '@/utilities/getURL'
import { buildHreflangForSharedSlug } from '@/utilities/hreflang'

const LOCALES = ['en', 'de'] as const
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
  const decodedSlug = decodeURIComponent(slug)

  const url =
    `/${locale}/${decodedSlug === 'home' ? '' : decodedSlug}`.replace(/\/+$/, '') || `/${locale}`

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page && decodedSlug === 'home') {
    page = homeStatic as any
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page as any

  const absoluteUrl =
    decodedSlug === 'home'
      ? new URL(`/${locale}`, getServerSideURL()).toString()
      : new URL(`/${locale}/${encodeURIComponent(decodedSlug)}`, getServerSideURL()).toString()

  const pageJsonLd = buildPageJsonLd(page, absoluteUrl)

  return (
    <>
      <JsonLd data={pageJsonLd} />

      <article
        style={{
          backgroundColor: 'rgba(241, 245, 249, 1)',
          maxWidth: '1440px',
          width: '100%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <PageClient />

        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        {hero ? <RenderHero {...hero} /> : null}
        <RenderBlocks blocks={layout || []} locale={locale} />
      </article>
    </>
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

  if (!page && decodedSlug !== 'home') return {}

  const siteURL = getServerSideURL()

  const metaCanonical = (page as any)?.meta?.canonicalURL as string | undefined
  const computedCanonical =
    decodedSlug === 'home'
      ? new URL(`/${locale}`, siteURL).toString()
      : new URL(`/${locale}/${encodeURIComponent(decodedSlug)}`, siteURL).toString()

  const canonical = metaCanonical || computedCanonical

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
  noStore()
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
