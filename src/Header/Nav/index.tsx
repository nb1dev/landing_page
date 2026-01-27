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
    <nav
      role="navigation"
      aria-label="Main menu"
      className="flex items-center gap-3"
      data-nav-count={navItems.length}
      data-locale={locale}
    >
      <ul className="hidden lg:flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
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
      </ul>

      <ul className="flex lg:hidden flex-col gap-3">
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
      </ul>
    </nav>
  )
}
