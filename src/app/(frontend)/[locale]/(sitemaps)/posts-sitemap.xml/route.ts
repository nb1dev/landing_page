import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const LOCALES = ['en', 'de', 'fr'] as const
type AppLocale = (typeof LOCALES)[number] // "en" | "de" | "fr"
type PayloadLocale = AppLocale | 'all'

function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value)
}

function getSiteURL() {
  const raw =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  // Vercel sometimes provides host without protocol
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

function withLocale(siteURL: string, locale: AppLocale, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${siteURL}/${locale}${clean}`
}

export async function GET(
  _req: Request,
  // ✅ In your Next version, route handler params are a Promise
  { params }: { params: Promise<{ locale: string }> },
) {
  const resolved = await params

  // ✅ Narrow URL locale to allowed union
  const locale: AppLocale = isAppLocale(resolved?.locale) ? resolved.locale : 'en'

  const getPostsSitemap = unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const SITE_URL = getSiteURL()

      const results = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,

        // ✅ localized fetch (fallback handled by Payload if enabled)
        locale: locale as PayloadLocale,

        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      const dateFallback = new Date().toISOString()

      const sitemap =
        results.docs
          ?.filter((post) => Boolean(post?.slug))
          .map((post) => ({
            // ✅ prefix with locale
            loc: withLocale(SITE_URL, locale, `/posts/${post.slug}`),
            lastmod: post.updatedAt || dateFallback,
          })) || []

      return sitemap
    },
    // ✅ cache per locale
    ['posts-sitemap', locale],
    { tags: ['posts-sitemap', `posts-sitemap-${locale}`] },
  )

  const sitemap = await getPostsSitemap()
  return getServerSideSitemap(sitemap)
}
