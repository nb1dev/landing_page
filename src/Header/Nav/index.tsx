'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

function prefixLocale(locale: string, href: string) {
  if (!href) return href
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href
  }
  // already localized
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href

  // normalize "/"
  if (href === '/') return `/${locale}`

  // only prefix internal absolute paths
  if (href.startsWith('/')) return `/${locale}${href}`

  return href
}

export const HeaderNav: React.FC<{ data: HeaderType; locale: string }> = ({ data, locale }) => {
  const navItems = data?.navItems || []

  return (
    <nav role="navigation" aria-label="Main menu" className="flex items-center gap-3">
      {/* ✅ Desktop menu (semantic) */}
      <ul className="desktop-menu flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          // If your CMSLink supports passing className / appearance, keep it
          // We’ll just fix locale for internal links by adjusting link.url when present.
          const patchedLink =
            link &&
            typeof link === 'object' &&
            'url' in link &&
            typeof (link as any).url === 'string'
              ? { ...(link as any), url: prefixLocale(locale, (link as any).url) }
              : link

          return (
            <li key={i}>
              <CMSLink {...(patchedLink as any)} appearance="link" />
            </li>
          )
        })}
        {/* <li>
          <Link href={`/${locale}/search`}>
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </li> */}
      </ul>

      {/* ✅ Mobile menu exists in DOM (can be visually hidden and toggled with CSS) */}
      <ul className="mobile-menu hidden">
        {navItems.map(({ link }, i) => {
          const patchedLink =
            link &&
            typeof link === 'object' &&
            'url' in link &&
            typeof (link as any).url === 'string'
              ? { ...(link as any), url: prefixLocale(locale, (link as any).url) }
              : link

          return (
            <li key={`m-${i}`}>
              <CMSLink {...(patchedLink as any)} appearance="link" />
            </li>
          )
        })}
        {/* <li>
          <Link href={`/${locale}/search`}>Search</Link>
        </li> */}
      </ul>
    </nav>
  )
}
