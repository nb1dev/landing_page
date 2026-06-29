import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { appLocales, defaultLocale } from '@/i18n/config'

// Maps ISO 3166-1 alpha-2 country codes → { locale, currency }
// Countries not listed fall back to defaultLocale + EUR
const GEO_MAP: Record<string, { locale: string; currency: string }> = {
  CH: { locale: 'de', currency: 'CHF' }, // Switzerland
  DE: { locale: 'de', currency: 'EUR' }, // Germany
  AT: { locale: 'de', currency: 'EUR' }, // Austria
  FR: { locale: 'fr', currency: 'EUR' }, // France
  GB: { locale: 'en', currency: 'GBP' }, // United Kingdom
}

const LOCALE_COOKIE = 'nb1_locale'
const CURRENCY_COOKIE = 'nb1_cur'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function geoLocale(req: NextRequest): { locale: string; currency: string } {
  // Vercel sets this header automatically; falls back to empty string locally
  const country = req.headers.get('x-vercel-ip-country') ?? ''
  const result = GEO_MAP[country] ?? { locale: defaultLocale, currency: 'EUR' }
  console.log(`[geo] country=${country || '(none)'} → locale=${result.locale} currency=${result.currency}`)
  return result
}

const ROOT_NON_LOCALIZED_ROUTES = ['/login'] as const

const localePattern = appLocales.join('|')

function isRootNonLocalized(pathname: string) {
  return ROOT_NON_LOCALIZED_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isLocalePath(pathname: string) {
  return appLocales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
}

function normalizeSiteURL(raw: string) {
  if (!raw) return 'http://localhost:3000'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

function normalizePathname(pathname: string) {
  return pathname
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\/{2,}/g, '/')
    .replace(/-{2,}/g, '-')
}

async function lookupRedirect(siteURL: string, fromPath: string) {
  if (!siteURL) return null

  const url =
    `${siteURL}/cms/api/redirects` +
    `?where[from][equals]=${encodeURIComponent(fromPath)}` +
    `&limit=1&depth=0`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 1500)

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { accept: 'application/json' },
    })

    if (!res.ok) return null

    const data = await res.json()
    const doc = data?.docs?.[0]
    if (!doc) return null

    const to = typeof doc.to === 'string' ? doc.to : doc.to?.url
    if (!to) return null

    const code = doc.type === '302' ? 302 : 308
    return { to, code }
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (pathname.startsWith('/cms')) return NextResponse.next()
  if (pathname.startsWith('/_next')) return NextResponse.next()

  const localeCmsMatch = pathname.match(new RegExp(`^/(${localePattern})/cms(/.*)?$`))
  if (localeCmsMatch) {
    const rest = localeCmsMatch[2] || ''
    const url = req.nextUrl.clone()
    url.pathname = `/cms${rest}`
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  const localeLoginMatch = pathname.match(new RegExp(`^/(${localePattern})/login(/.*)?$`))
  if (localeLoginMatch) {
    const rest = localeLoginMatch[2] || ''
    const url = req.nextUrl.clone()
    url.pathname = `/login${rest}`
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return NextResponse.next()
  }

  if (isRootNonLocalized(pathname)) {
    return NextResponse.next()
  }

  const isLocalizedSitemap =
    pathname.endsWith('/pages-sitemap.xml') || pathname.endsWith('/posts-sitemap.xml')

  if (pathname.includes('.') && !isLocalizedSitemap) {
    return NextResponse.next()
  }

  const normalizedPath = normalizePathname(pathname)
  if (normalizedPath !== pathname) {
    const url = req.nextUrl.clone()
    url.pathname = normalizedPath
    url.search = search
    return NextResponse.redirect(url, 301)
  }

  const siteURLRaw =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''

  const siteURL = normalizeSiteURL(siteURLRaw)

  if (siteURLRaw) {
    const hit = await lookupRedirect(siteURL, normalizedPath)

    if (hit) {
      const dest = new URL(hit.to, siteURL)

      if (!dest.search) dest.search = search

      if (dest.pathname !== normalizedPath) {
        return NextResponse.redirect(dest, hit.code)
      }
    }
  }

  if (isLocalePath(normalizedPath)) {
    return NextResponse.next()
  }

  // Determine locale: honour an explicit cookie preference, otherwise use geo
  const savedLocale = req.cookies.get(LOCALE_COOKIE)?.value
  const isValidSaved = savedLocale && (appLocales as readonly string[]).includes(savedLocale)
  const { locale: geoLoc, currency: geoCurrency } = geoLocale(req)
  const targetLocale = isValidSaved ? savedLocale : geoLoc

  const url = req.nextUrl.clone()
  url.pathname = `/${targetLocale}${normalizedPath}`
  const res = NextResponse.redirect(url, 307)

  // Persist currency for the first visit (don't overwrite a manual selection)
  if (!req.cookies.get(CURRENCY_COOKIE)) {
    res.cookies.set(CURRENCY_COOKIE, geoCurrency, { path: '/', maxAge: COOKIE_MAX_AGE, sameSite: 'lax' })
  }

  return res
}

export const config = {
  // Exclude `/cms` (Payload admin + REST API) so Next.js does not buffer/cap
  // their request bodies at the 10MB middleware default — this would truncate
  // large uploads (e.g. video) and break them. Localized `/{locale}/cms`
  // paths still match and are redirected to `/cms` below.
  matcher: ['/((?!_next|cms).*)'],
}
