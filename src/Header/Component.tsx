import { getCachedHeader } from '@/utilities/getHeaderFooter'
import React, { Suspense } from 'react'

import type { Media } from '@/payload-types'
import { getServerCurrency } from '@/utilities/currency'
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
  // Resolved server-side from the cookie so the initial currency label
  // matches what HeaderClient hydrates with — previously HeaderClient read
  // localStorage in its useState initializer, which is unavailable during
  // SSR (always fell back to 'EUR') but available on the client (the real
  // stored value), causing a text mismatch on hydration whenever a
  // returning visitor had a non-EUR currency saved.
  const initialCurrency = await getServerCurrency(locale)

  if (!data) return null

  return (
    <Suspense>
      <HeaderClient
        locale={locale}
        initialCurrency={initialCurrency}
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
                url: (() => {
                  const linkType = (item.link as any).type
                  if (linkType === 'custom') {
                    const customUrl = (item.link as any).url as string | null | undefined
                    if (!customUrl) return null
                    // Ensure absolute path — a relative value like 'be/slug' would
                    // resolve incorrectly in the browser relative to the current locale URL.
                    return customUrl.startsWith('/') || customUrl.startsWith('http') ? customUrl : `/${customUrl}`
                  }
                  // Internal link — resolve the referenced page's localized slug.
                  // Payload returns polymorphic relationships as { relationTo, value }
                  // but guard against direct-document population as well.
                  const ref = (item.link as any).reference
                  const refDoc = ref?.value ?? ref
                  const rawSlug = typeof refDoc === 'object' && refDoc !== null ? refDoc.slug : undefined
                  if (!rawSlug) return null
                  const slug = typeof rawSlug === 'string' ? rawSlug : (rawSlug as any)?.[locale] ?? (rawSlug as any)?.['en']
                  if (!slug || slug === 'home-page') return `/${locale}`
                  return `/${locale}/${slug}`
                })(),
                newTab: (item.link as any).newTab ?? null,
              }
            : null,
        }))}
        variants={data?.variants ?? []}
      />
    </Suspense>
  )
}
