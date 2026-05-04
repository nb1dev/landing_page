import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

import type { Media } from '@/payload-types'
import { HeaderClient } from './Component.client'

type HeaderData = {
  logo?: number | Media | null
  logoDark?: number | Media | null
  theme?: 'light' | 'dark' | null
  loginText?: string | null
  loginUrl?: string | null
  loginTextColor?: string | null
  variants?: Array<{
    variantKey: string
    theme: 'light' | 'dark'
    loginTextColor?: string | null
  }> | null
}

function pickMedia(val: number | Media | null | undefined) {
  if (typeof val === 'object' && val !== null) {
    const m = val as Media
    return { url: m.url, alt: m.alt }
  }
  return null
}

export async function Header({ locale }: { locale: string }) {
  const data = (await getCachedGlobal('header', 2, locale)()) as HeaderData

  return (
    <Suspense>
      <HeaderClient
        locale={locale}
        logo={pickMedia(data?.logo)}
        logoDark={pickMedia(data?.logoDark)}
        defaultTheme={data?.theme ?? 'light'}
        loginText={data?.loginText ?? null}
        loginUrl={data?.loginUrl ?? null}
        loginTextColor={data?.loginTextColor ?? null}
        variants={data?.variants ?? []}
      />
    </Suspense>
  )
}
