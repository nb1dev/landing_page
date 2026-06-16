import { getCachedHeader } from '@/utilities/getHeaderFooter'
import React, { Suspense } from 'react'

import type { Media } from '@/payload-types'
import { HeaderClient } from './Component.client'

type HeaderData = {
  logo?: number | Media | null
  logoDark?: number | Media | null
  theme?: 'light' | 'dark' | null
  darkHero?: boolean | null
  loginText?: string | null
  loginUrl?: string | null
  loginTextColor?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  navItems?: Array<{
    link?: {
      label?: string | null
      localizedLabel?: string | null
      url?: string | null
      newTab?: boolean | null
      [key: string]: unknown
    } | null
  }> | null
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

type Props = {
  locale: string
  id?: string | null
}

export async function Header({ locale, id }: Props) {
  const data = (await getCachedHeader(id, locale)()) as HeaderData | null

  if (!data) return null

  return (
    <Suspense>
      <HeaderClient
        locale={locale}
        logo={pickMedia(data?.logo)}
        logoDark={pickMedia(data?.logoDark)}
        defaultTheme={data?.theme ?? 'light'}
        darkHero={data?.darkHero ?? false}
        loginText={data?.loginText ?? null}
        loginUrl={data?.loginUrl ?? null}
        loginTextColor={data?.loginTextColor ?? null}
        ctaLabel={data?.ctaLabel ?? null}
        ctaUrl={data?.ctaUrl ?? null}
        navItems={(data?.navItems ?? []).map((item) => ({
          link: item.link
            ? {
                label: item.link.label ?? null,
                localizedLabel: item.link.localizedLabel ?? null,
                url: (item.link as any).url ?? (item.link as any).reference?.value?.slug ?? null,
                newTab: (item.link as any).newTab ?? null,
              }
            : null,
        }))}
        variants={data?.variants ?? []}
      />
    </Suspense>
  )
}
