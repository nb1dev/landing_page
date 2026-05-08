import { getCachedGlobal } from '@/utilities/getGlobals'
import React, { Suspense } from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'
import { FooterClient } from './FooterClient'

type Props = {
  locale: string
}

type FooterData = FooterType & {
  logo?: number | Media | null
  theme?: 'light' | 'dark' | null
  tagline?: string | null
  address?: string | null
  copyrightText?: string | null
  navItems?: Array<{
    link?: {
      label?: string | null
      localizedLabel?: string | null
      [key: string]: unknown
    } | null
  }> | null
  linkColor?: string | null
  variants?: Array<{
    variantKey: string
    theme: 'light' | 'dark'
    linkColor?: string | null
    logo?: number | Media | null
  }> | null
}

export async function Footer({ locale }: Props) {
  const footerData = (await getCachedGlobal('footer', 1, locale)()) as FooterData

  const logo =
    typeof footerData?.logo === 'object' && footerData.logo !== null
      ? (footerData.logo as Media)
      : null

  return (
    <Suspense>
      <FooterClient
        logo={logo ? { url: logo.url, alt: logo.alt } : null}
        tagline={footerData?.tagline ?? null}
        navItems={footerData?.navItems ?? []}
        address={footerData?.address ?? null}
        copyrightText={footerData?.copyrightText ?? null}
        defaultTheme={footerData?.theme ?? 'light'}
        defaultLinkColor={footerData?.linkColor ?? null}
        variants={(footerData?.variants ?? []).map((v) => {
          const raw = v as typeof v & { logo?: number | Media | null }
          const variantLogo =
            typeof raw.logo === 'object' && raw.logo !== null ? (raw.logo as Media) : null
          return {
            variantKey: v.variantKey,
            theme: v.theme,
            linkColor: v.linkColor,
            logo: variantLogo ? { url: variantLogo.url, alt: variantLogo.alt } : null,
          }
        })}
      />
    </Suspense>
  )
}
