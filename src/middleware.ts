import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'de'] as const
const DEFAULT_LOCALE = 'en'

// ✅ ROOT routes that must NOT be localized (served by something else on same host)
const ROOT_NON_LOCALIZED_ROUTES = ['/login'] as const

function isRootNonLocalized(pathname: string) {
  return ROOT_NON_LOCALIZED_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isLocalePath(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
}

function normalizeSiteURL(raw: string) {
  if (!raw) return 'http://localhost:3000'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

/**
 * URL normalization for SEO rules:
 * - lowercase
 * - underscores -> hyphens
 * - collapse multiple hyphens
 * - collapse multiple slashes
 */
function normalizePathname(pathname: string) {
  return pathname
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\/{2,}/g, '/')
    .replace(/-{2,}/g, '-')
}

/**
 * Safe redirect lookup:
 * - short timeout so middleware never hangs builds
 * - try/catch so a failed fetch never breaks routing
 */
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
    // fail-open: never block requests because redirects API is unreachable
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Clean URL rule:
 * Allow query params only on specific routes (e.g., /search?q=..., /posts?page=...)
 * Everything else gets stripped via 301 to canonical URL.
 */
const ALLOWED_QUERY_BY_PREFIX: Array<[string, string[]]> = [
  ['/search', ['q']],
  ['/posts', ['page']],
]

function stripLocalePrefix(pathname: string) {
  for (const l of LOCALES) {
    if (pathname === `/${l}`) return '/'
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1) || '/'
  }
  return pathname
}

function allowedKeysForPath(pathname: string) {
  const pathNoLocale = stripLocalePrefix(pathname)

  for (const [prefix, keys] of ALLOWED_QUERY_BY_PREFIX) {
    if (pathNoLocale === prefix || pathNoLocale.startsWith(`${prefix}/`)) return keys
  }
  return []
}

function stripDisallowedQuery(req: NextRequest) {
  const url = req.nextUrl.clone()
  const allowed = allowedKeysForPath(url.pathname)

  const kept = new URLSearchParams()
  for (const key of allowed) {
    const v = url.searchParams.get(key)
    if (v !== null) kept.set(key, v)
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

  // 1) never touch Payload at root
  if (pathname.startsWith('/cms')) return NextResponse.next()

  // 2) ignore Next internals
  if (pathname.startsWith('/_next')) return NextResponse.next()

  // ✅ Prevent localized Payload routes like /en/cms/admin -> /cms/admin
  const localeCmsMatch = pathname.match(/^\/(en|de|fr)\/cms(\/.*)?$/)
  if (localeCmsMatch) {
    const rest = localeCmsMatch[2] || ''
    const url = req.nextUrl.clone()
    url.pathname = `/cms${rest}`
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  // ✅ Prevent localized non-local routes like /en/login -> /login
  const localeLoginMatch = pathname.match(/^\/(en|de|fr)\/login(\/.*)?$/)
  if (localeLoginMatch) {
    const rest = localeLoginMatch[2] || ''
    const url = req.nextUrl.clone()
    url.pathname = `/login${rest}`
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  // ✅ ROOT special routes that must NOT be localized
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return NextResponse.next()
  }

  // ✅ ROOT routes that must NOT be localized (served by something else on same host)
  if (isRootNonLocalized(pathname)) {
    return NextResponse.next()
  }

  // ✅ allow localized sitemap endpoints even though they contain dots
  const isLocalizedSitemap =
    pathname.endsWith('/pages-sitemap.xml') || pathname.endsWith('/posts-sitemap.xml')

  // 3) ignore other file-like requests (.png, .css, etc.)
  if (pathname.includes('.') && !isLocalizedSitemap) {
    return NextResponse.next()
  }

  // -----------------------------
  // A0) Normalize URL (case + separators) with 301
  // -----------------------------
  const normalizedPath = normalizePathname(pathname)
  if (normalizedPath !== pathname) {
    const url = req.nextUrl.clone()
    url.pathname = normalizedPath
    url.search = search
    return NextResponse.redirect(url, 301)
  }

  // -----------------------------
  // A1) Strip disallowed query params (clean canonical URLs)
  // -----------------------------
  const stripped = stripDisallowedQuery(req)
  if (stripped) {
    stripped.pathname = normalizedPath
    return NextResponse.redirect(stripped, 301)
  }

  // -----------------------------
  // A2) Redirect check (Payload redirects)
  // -----------------------------
  const siteURLRaw =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
  const siteURL = normalizeSiteURL(siteURLRaw)

  // Only attempt redirect lookup if we have a real env value (prevents build/edge weirdness)
  if (siteURLRaw) {
    const hit = await lookupRedirect(siteURL, normalizedPath)
    if (hit) {
      const dest = new URL(hit.to, siteURL)

      // preserve query string if destination doesn't have one
      if (!dest.search) dest.search = search

      // prevent loops
      if (dest.pathname !== normalizedPath) {
        return NextResponse.redirect(dest, hit.code)
      }
    }
  }

  // -----------------------------
  // B) Locale enforcement
  // -----------------------------
  if (isLocalePath(normalizedPath)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${normalizedPath}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
