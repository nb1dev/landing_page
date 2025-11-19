import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
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
import Script from 'next/script'
import { KetchScriptLoader } from './KetchScriptLoader' // 👈 add this

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <Script src="https://cdn.botpress.cloud/webchat/v3.4/inject.js" />
        <Script
          src="https://files.bpcontent.cloud/2025/11/19/08/20251119085549-S157I4GF.js"
          defer
        />
        <link href="/favicon-1.ico" rel="icon" sizes="32x32" />
        <link href="/favicon-1.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        {/* Load Ketch only on the client after hydration */}
        <KetchScriptLoader />

        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
