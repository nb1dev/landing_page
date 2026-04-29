import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { appLocales, defaultLocale } from '@/i18n/config'

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

const ALLOWED_QUERY_BY_PREFIX: Array<[string, string[]]> = [
  ['/search', ['q']],
  ['/posts', ['page']],
]

function stripLocalePrefix(pathname: string) {
  for (const l of appLocales) {
    if (pathname === `/${l}`) return '/'
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1) || '/'
  }

  return pathname
}

const GLOBAL_ALLOWED_QUERY_KEYS = ['v']

function allowedKeysForPath(pathname: string) {
  const pathNoLocale = stripLocalePrefix(pathname)

  for (const [prefix, keys] of ALLOWED_QUERY_BY_PREFIX) {
    if (pathNoLocale === prefix || pathNoLocale.startsWith(`${prefix}/`)) {
      return [...GLOBAL_ALLOWED_QUERY_KEYS, ...keys]
    }
  }

  return GLOBAL_ALLOWED_QUERY_KEYS
}

function stripDisallowedQuery(req: NextRequest) {
  const url = req.nextUrl.clone()
  const allowed = allowedKeysForPath(url.pathname)

  const kept = new URLSearchParams()
  for (const key of allowed) {
    const value = url.searchParams.get(key)
    if (value !== null) kept.set(key, value)
  }

  const newSearch = kept.toString()
  const oldSearch = url.searchParams.toString()

  if (newSearch !== oldSearch) {
    url.search = newSearch ? `?${newSearch}` : ''
    return url
  }

  return null
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

  const stripped = stripDisallowedQuery(req)
  if (stripped) {
    stripped.pathname = normalizedPath
    return NextResponse.redirect(stripped, 302)
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

  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${normalizedPath}`
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
