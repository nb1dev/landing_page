import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React, { cache } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/400.css'

// ✅ JSON-LD component
import { JsonLd } from '@/components/JsonLd'

// ✅ Payload local API access
import { getPayload } from 'payload'
import config from '@payload-config'

const LOCALES = ['en', 'de'] as const
type AppLocale = (typeof LOCALES)[number]

function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

// ✅ Cache global fetch
const getSiteSettings = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'site-settings',
  })
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  // ✅ Next wants params awaited in this environment
  params: Promise<{ locale: string }>
}) {
  const { isEnabled } = await draftMode()

  const resolved = await params
  const locale: AppLocale = isAppLocale(resolved.locale) ? resolved.locale : 'en'

  // ✅ Fetch Organization JSON-LD
  let organizationJsonLd: unknown = null
  try {
    const site = await getSiteSettings()
    organizationJsonLd = (site as any)?.organizationJsonLd ?? null
  } catch {
    organizationJsonLd = null
  }

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon-1.ico" rel="icon" sizes="32x32" />
        <link href="/favicon-1.svg" rel="icon" type="image/svg+xml" />

        {/* ✅ Site-wide Organization JSON-LD */}
        <JsonLd data={organizationJsonLd} />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header locale={locale} />

          {children}

          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'NB1 - One gut, One plan',
    template: '%s | NB1',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
