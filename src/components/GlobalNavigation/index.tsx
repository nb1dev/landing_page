import Link from 'next/link'
import type { Navigation as NavigationType } from '../../payload-types'
import { isAppLocale } from '@/i18n/config'

function withLocale(locale: string, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}

function resolveSlug(slug: unknown, locale: string): string | null {
  if (!slug) return null
  if (typeof slug === 'string') return slug
  // Localized slug: { en: 'home', de: 'startseite', ... }
  if (typeof slug === 'object') {
    const map = slug as Partial<Record<string, string>>
    return map[locale] ?? map['en'] ?? null
  }
  return null
}

export default function GlobalNavigation({
  navData,
  locale,
}: {
  navData: NavigationType
  locale: string
}) {
  const safeLocale = isAppLocale(locale) ? locale : 'en'
  const items = navData?.items || []

  const renderItems = (keyPrefix: string) =>
    items.map((item, i) => {
      const rawSlug =
        typeof item?.link === 'object' && item.link && 'slug' in item.link
          ? (item.link as any).slug
          : null

      const pageSlug = resolveSlug(rawSlug, safeLocale)
      if (!pageSlug) return null

      const href =
        pageSlug === 'home' ? `/${safeLocale}` : withLocale(safeLocale, `/${pageSlug}`)

      return (
        <li key={`${keyPrefix}-${pageSlug}-${i}`}>
          <Link href={href}>{item.label}</Link>
        </li>
      )
    })

  return (
    <nav role="navigation" aria-label="Main menu">
      <ul className="desktop-menu">{renderItems('d')}</ul>
      <ul className="mobile-menu">{renderItems('m')}</ul>
    </nav>
  )
}
