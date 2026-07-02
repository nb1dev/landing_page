type MarketCode =
  | 'de-DE'
  | 'de-AT'
  | 'de-CH'
  | 'en'
  | 'en-GB'
  | 'en-AE'
  | 'fr-FR'
  | 'nl-NL'
  | 'nl-BE'
  | 'x-default'

function abs(siteURL: string, path: string) {
  return new URL(path, siteURL).toString()
}

/**
 * Build hreflang alternates for all 8 market paths:
 *   /de  Germany & Austria
 *   /ch  Switzerland
 *   /fr  France
 *   /nl  Netherlands
 *   /be  Belgium
 *   /uk  United Kingdom
 *   /uae UAE
 *   /en  Rest of World (x-default)
 */
export function buildHreflangAlternates(args: {
  siteURL: string
  dePath: string
  enPath: string
  frPath?: string
  nlPath?: string
  chPath?: string
  bePath?: string
  ukPath?: string
  uaePath?: string
}) {
  const { siteURL, dePath, enPath, frPath, nlPath, chPath, bePath, ukPath, uaePath } = args

  const deURL = abs(siteURL, dePath)
  const enURL = abs(siteURL, enPath)

  const languages: Partial<Record<MarketCode, string>> = {
    'de-DE': deURL,
    'de-AT': deURL,
    'de-CH': chPath ? abs(siteURL, chPath) : deURL,
    en: enURL,
    'x-default': enURL,
    ...(frPath ? { 'fr-FR': abs(siteURL, frPath) } : {}),
    ...(nlPath ? { 'nl-NL': abs(siteURL, nlPath) } : {}),
    ...(bePath ? { 'nl-BE': abs(siteURL, bePath) } : nlPath ? { 'nl-BE': abs(siteURL, nlPath) } : {}),
    ...(ukPath ? { 'en-GB': abs(siteURL, ukPath) } : {}),
    ...(uaePath ? { 'en-AE': abs(siteURL, uaePath) } : {}),
  }

  return { languages } as const
}

/**
 * Build hreflang alternates when each locale has its own translated slug.
 * `slugsByLocale` is a map of locale → slug (e.g. `{ en: 'our-plans', de: 'unsere-plaene' }`).
 * Falls back to the `en` slug for any locale not present in the map.
 */
export function buildHreflangForLocalizedSlugs(args: {
  siteURL: string
  slugsByLocale: Partial<Record<string, string>>
  basePath?: string
  trailingSlash?: boolean
}) {
  const { siteURL, slugsByLocale, basePath = '', trailingSlash = false } = args
  const prefix = basePath ? `/${basePath}` : ''
  const suffix = trailingSlash ? '/' : ''
  const fallback = slugsByLocale['en'] ?? ''

  const path = (locale: string) => {
    const slug = slugsByLocale[locale] ?? fallback
    return `/${locale}${prefix}/${encodeURIComponent(slug)}${suffix}`.replace(/\/+/g, '/')
  }

  return buildHreflangAlternates({
    siteURL,
    dePath: path('de'),
    enPath: path('en'),
    frPath: path('fr'),
    nlPath: path('nl'),
    chPath: path('ch'),
    bePath: path('be'),
    ukPath: path('uk'),
    uaePath: path('uae'),
  })
}

/**
 * Convenience helper when all locales share the same slug.
 */
export function buildHreflangForSharedSlug(args: {
  siteURL: string
  basePath?: string
  slug: string
  trailingSlash?: boolean
}) {
  const { siteURL, basePath = '', slug, trailingSlash = false } = args
  const prefix = basePath ? `/${basePath}` : ''
  const suffix = trailingSlash ? '/' : ''
  const path = (locale: string) =>
    `/${locale}${prefix}/${slug}${suffix}`.replace(/\/+/g, '/')

  return buildHreflangAlternates({
    siteURL,
    dePath: path('de'),
    enPath: path('en'),
    frPath: path('fr'),
    nlPath: path('nl'),
    chPath: path('ch'),
    bePath: path('be'),
    ukPath: path('uk'),
    uaePath: path('uae'),
  })
}
