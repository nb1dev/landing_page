type MarketCode = 'de-DE' | 'de-AT' | 'de-CH' | 'en' | 'x-default'

const GERMAN_MARKETS: Array<Extract<MarketCode, 'de-DE' | 'de-AT' | 'de-CH'>> = [
  'de-DE',
  'de-AT',
  'de-CH',
]

function abs(siteURL: string, path: string) {
  // path must start with /
  return new URL(path, siteURL).toString()
}

/**
 * Build hreflang alternates according to your table:
 * - de-DE / de-AT / de-CH => same /de/ URL
 * - en => /en/
 * - x-default => /en/
 *
 * Pass the *same page path* for each locale (no need to have Pages collection).
 *
 * Example:
 *  buildHreflangAlternates({
 *    siteURL,
 *    dePath: '/de/mikrobiom-analyse/',
 *    enPath: '/en/microbiome-analysis/',
 *  })
 */
export function buildHreflangAlternates(args: { siteURL: string; dePath: string; enPath: string }) {
  const { siteURL, dePath, enPath } = args

  const deURL = abs(siteURL, dePath)
  const enURL = abs(siteURL, enPath)

  const languages: Record<MarketCode, string> = {
    'de-DE': deURL,
    'de-AT': deURL,
    'de-CH': deURL,
    en: enURL,
    'x-default': enURL,
  }

  return {
    languages,
  } as const
}

/**
 * Convenience: if you only know the current locale + slug and your slugs are NOT localized,
 * you can generate both paths automatically:
 *
 * - /de/<basePath>/<slug>
 * - /en/<basePath>/<slug>
 *
 * basePath examples: 'posts', 'products', '' (for root pages)
 */
export function buildHreflangForSharedSlug(args: {
  siteURL: string
  basePath?: string // e.g. 'posts'
  slug: string // already encoded if needed
  trailingSlash?: boolean
}) {
  const { siteURL, basePath = '', slug, trailingSlash = false } = args
  const prefix = basePath ? `/${basePath}` : ''
  const suffix = trailingSlash ? '/' : ''

  const dePath = `/de${prefix}/${slug}${suffix}`.replace(/\/+/g, '/')
  const enPath = `/en${prefix}/${slug}${suffix}`.replace(/\/+/g, '/')

  return buildHreflangAlternates({ siteURL, dePath, enPath })
}
