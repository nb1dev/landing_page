import Link from 'next/link'
import type { Navigation as NavigationType } from '../../payload-types'

const LOCALES = ['en', 'de', 'fr'] as const
type AppLocale = (typeof LOCALES)[number]

function isLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v)
}

function withLocale(locale: string, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}

export default function GlobalNavigation({
  navData,
  locale,
}: {
  navData: NavigationType
  locale: string
}) {
  const safeLocale = isLocale(locale) ? locale : 'en'
  const items = navData?.items || []

  return (
    <nav role="navigation" aria-label="Main menu">
      <ul className="desktop-menu">
        {items.map((item, i) => {
          // relationship may be populated or just an id, depending on depth
          const pageSlug =
            typeof item?.link === 'object' && item.link && 'slug' in item.link
              ? (item.link.slug as string)
              : null

          if (!pageSlug) return null

          const href =
            pageSlug === 'home' ? `/${safeLocale}` : withLocale(safeLocale, `/${pageSlug}`)

          return (
            <li key={`${pageSlug}-${i}`}>
              <Link href={href}>{item.label}</Link>
            </li>
          )
        })}
      </ul>

      {/* ✅ Mobile menu should exist in DOM (can be visually hidden) */}
      <ul className="mobile-menu">
        {items.map((item, i) => {
          const pageSlug =
            typeof item?.link === 'object' && item.link && 'slug' in item.link
              ? (item.link.slug as string)
              : null

          if (!pageSlug) return null

          const href =
            pageSlug === 'home' ? `/${safeLocale}` : withLocale(safeLocale, `/${pageSlug}`)

          return (
            <li key={`m-${pageSlug}-${i}`}>
              <Link href={href}>{item.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
