const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const LOCALES = ['en', 'de', 'fr']

function normalizeSiteURL(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

export async function GET(_req: Request, { params }: { params: { locale: string } }) {
  const locale = params?.locale

  if (!locale || !LOCALES.includes(locale)) {
    return new Response('Not found', { status: 404 })
  }

  const site = normalizeSiteURL(SITE_URL).replace(/\/$/, '')
  const lastmod = new Date().toISOString()

  const entries = [
    `<sitemap>
       <loc>${site}/${locale}/pages-sitemap.xml</loc>
       <lastmod>${lastmod}</lastmod>
     </sitemap>`,
    `<sitemap>
       <loc>${site}/${locale}/posts-sitemap.xml</loc>
       <lastmod>${lastmod}</lastmod>
     </sitemap>`,
  ].join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
