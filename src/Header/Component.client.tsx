'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { getDictionary } from '@/i18n/getDictionary'

type Theme = 'light' | 'dark'

type HeaderVariant = {
  variantKey: string
  theme: Theme
  loginTextColor?: string | null
}

export interface HeaderClientProps {
  locale: string
  /** Resolved server-side from the currency cookie (see src/utilities/currency.ts).
   * Used as the initial state below instead of reading localStorage, so the
   * SSR markup and the first client render match exactly — reading
   * localStorage in a useState initializer caused a hydration mismatch for
   * any returning visitor whose stored currency differed from the 'EUR'
   * fallback used during SSR (localStorage isn't available on the server). */
  initialCurrency?: string
  logo?: { url?: string | null; alt?: string | null } | null
  logoDark?: { url?: string | null; alt?: string | null } | null
  defaultTheme?: Theme
  darkHero?: boolean
  loginText?: string | null
  loginUrl?: string | null
  loginTextColor?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  navItems?: Array<{ link?: { label?: string | null; localizedLabel?: string | null; url?: string | null; newTab?: boolean | null } | null }>
  variants?: HeaderVariant[]
  langs?: Array<[string, string]>
  currencies?: Array<[string, string, string]>
  langCurrencies?: Record<string, string[]>
}

const GLOBE = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
)
const CHEV = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const DEFAULT_LANGS: Array<[string, string]> = [
  ['en', 'English'],
  ['de', 'Deutsch'],
  ['fr', 'Français'],
  ['nl', 'Nederlands'],
]
const DEFAULT_CURRENCIES: Array<[string, string, string]> = [
  ['EUR', '€', 'Euro'],
  ['GBP', '£', 'Pound'],
  ['AED', 'AED', 'Dirham'],
  ['CHF', 'CHF', 'Franc'],
]
const DEFAULT_LANG_CURRENCIES: Record<string, string[]> = {
  en: ['EUR', 'GBP', 'AED'],
  de: ['EUR', 'CHF'],
  fr: ['EUR', 'CHF'],
  nl: ['EUR', 'CHF'],
}

function lsGet(k: string, d: string) {
  try { return localStorage.getItem(k) || d } catch { return d }
}
function lsSet(k: string, v: string) {
  try { localStorage.setItem(k, v) } catch { /* noop */ }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  locale,
  initialCurrency,
  logo,
  logoDark,
  defaultTheme = 'light',
  darkHero = false,
  loginText,
  loginUrl,
  loginTextColor: defaultLoginTextColor,
  ctaLabel,
  ctaUrl,
  navItems = [],
  variants = [],
  langs = DEFAULT_LANGS,
  currencies = DEFAULT_CURRENCIES,
  langCurrencies = DEFAULT_LANG_CURRENCIES,
}) => {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get('v')

  let theme: Theme = defaultTheme
  let loginTextColor: string | null | undefined = defaultLoginTextColor
  if (variantParam) {
    const match = variants.find((v) => v.variantKey === variantParam)
    if (match) {
      theme = match.theme
      if (match.loginTextColor) loginTextColor = match.loginTextColor
    }
  }

  const isDark = theme === 'dark'
  const router = useRouter()
  const pathname = usePathname()

  // Scroll / hide state
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const upDelta = useRef(0)
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0
      if (darkHero) setScrolled(y > 80)
      const isMobile = window.innerWidth <= 860
      if (y > lastY.current + 6 && y > 120) {
        setHidden(true)
        upDelta.current = 0
      } else if (y < lastY.current) {
        upDelta.current += lastY.current - y
        const upThreshold = isMobile ? 40 : 6
        if (upDelta.current > upThreshold || y < 80) setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [darkHero])

  // Mobile sheet
  const [sheetOpen, setSheetOpen] = useState(false)
  const [locPopOpen, setLocPopOpen] = useState(false)
  const locPopTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!locPopOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLocPopOpen(false); locPopTriggerRef.current?.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [locPopOpen])
  useEffect(() => {
    if (sheetOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sheetOpen])

  // Lang / currency — derive from URL pathname (e.g. /de/...) so the selector
  // always reflects the page the user is actually on, regardless of localStorage.
  const langFromPath = pathname.split('/')[1]
  const validLangCodes = langs.map(([code]) => code)
  const activeLang = validLangCodes.includes(langFromPath) ? langFromPath : (locale || 'en')
  const dict = getDictionary(activeLang)
  const [curLang, setCurLang] = useState(activeLang)
  useEffect(() => {
    setCurLang(activeLang)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  // Seeded from the server-resolved cookie value (not localStorage) so this
  // matches the SSR HTML exactly — see initialCurrency prop doc above.
  const [curCur, setCurCur] = useState(initialCurrency || 'EUR')
  // Pending selections — only committed when Apply is clicked.
  // Initialised to match current applied values; reset again whenever the menu opens.
  const [pendingLang, setPendingLang] = useState(activeLang)
  const [pendingCur, setPendingCur] = useState(initialCurrency || 'EUR')
  const [locOpen, setLocOpen] = useState(false)
  const locRef = useRef<HTMLDivElement>(null)

  const allowedCurs = (lang = pendingLang) => {
    const codes = langCurrencies[lang] || currencies.map((c) => c[0])
    return currencies.filter((c) => codes.includes(c[0]))
  }
  const curSym = (code: string) => currencies.find((c) => c[0] === code)?.[1] || code

  // When pending lang changes, ensure pending currency is valid for that lang
  useEffect(() => {
    const ac = allowedCurs(pendingLang)
    if (!ac.some((c) => c[0] === pendingCur)) {
      setPendingCur(ac[0]?.[0] || 'EUR')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingLang])

  // close loc menu on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (locRef.current && !locRef.current.contains(e.target as Node)) setLocOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  function applyLang(lang: string) {
    setCurLang(lang)
    lsSet('nb1_lang', lang)
    // Persist in a cookie so middleware can respect manual locale choice
    // on return visits to a bare path like '/'
    try {
      document.cookie = `nb1_locale=${lang}; path=/; max-age=31536000; samesite=lax`
    } catch { /* noop */ }
    document.documentElement.setAttribute('lang', lang)
    // Navigate to the same page under the new locale
    // pathname is like /en/some-slug — swap the first segment
    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/'))
    setLocOpen(false)
  }
  function applyCur(cur: string) {
    setCurCur(cur)
    lsSet('nb1_cur', cur)
    // Mirror the selection into a cookie so server components (e.g. live
    // pricing blocks) can read it on the next render — localStorage isn't
    // visible to the server. router.refresh() re-renders server components
    // with the new cookie value without a full page reload or losing the
    // client state of components further down the tree.
    try {
      document.cookie = `nb1_cur=${cur}; path=/; max-age=31536000; samesite=lax`
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent('nb1:currencychange', { detail: cur }))
    router.refresh()
  }

  const isTransparent = darkHero && !scrolled
  // After scrolling past dark hero, always go light — dark theme only applies to permanently dark (non-hero) nav
  const scrolledDark = !isTransparent && isDark && !darkHero
  const activeLogo = isTransparent && logoDark?.url ? logoDark : logo
  const resolvedLoginColor = loginTextColor || (isTransparent ? '#ffffff' : (scrolledDark ? '#ffffff' : 'rgba(18,49,77,0.65)'))

  const linkColor = (isTransparent || scrolledDark) ? 'rgba(255,255,255,0.78)' : 'rgba(18,49,77,0.65)'
  const locBtnColor = isTransparent ? '#ffffff' : (scrolledDark ? 'rgba(255,255,255,0.85)' : 'rgba(18,49,77,0.7)')
  const locBtnBg = isTransparent ? 'rgba(255,255,255,0.13)' : (scrolledDark ? 'rgba(255,255,255,0.10)' : 'rgba(18,49,77,0.05)')
  const locBtnBorder = isTransparent ? 'rgba(255,255,255,0.22)' : (scrolledDark ? 'rgba(255,255,255,0.20)' : 'rgba(18,49,77,0.12)')
  const navBg = isTransparent
    ? 'transparent'
    : scrolledDark
      ? 'rgba(10,30,53,0.92)'
      : 'rgba(255,255,255,0.92)'
  const navBackdrop = isTransparent ? 'none' : 'blur(20px) saturate(140%)'
  const navBorder = isTransparent ? 'transparent' : scrolledDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,49,77,0.10)'
  const navShadow = isTransparent ? 'none' : '0 2px 16px -10px rgba(18,49,77,0.18)'
  const burgerColor = isTransparent ? '#fff' : scrolledDark ? '#fff' : 'rgb(18,49,77)'

  const css = `
    .nb1-nav {
      position: ${darkHero ? 'fixed' : 'sticky'};
      top: 0; left: 0; right: 0; z-index: 9000;
      background: ${navBg};
      -webkit-backdrop-filter: ${navBackdrop};
      backdrop-filter: ${navBackdrop};
      border-bottom: 1px solid ${navBorder};
      box-shadow: ${navShadow};
      transition: transform .35s cubic-bezier(.16,.84,.44,1), background .3s, border-color .3s, backdrop-filter .3s;
    }
    .nb1-nav.nb1-hidden { transform: translateY(-100%); }
    .nb1-nav-in { max-width:1380px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; height:68px; padding:0 32px; }
    .nb1-logo { display:inline-flex; align-items:center; text-decoration:none; }
    .nb1-logo img { height:24px; width:auto; display:block; }
    .nb1-nav-links { display:flex; gap:30px; font-size:14px; font-weight:500; color:${linkColor}; }
    .nb1-nav-links a { color:${linkColor} !important; text-decoration:none; transition:color .2s; }
    .nb1-nav-links a:hover { color:${(isTransparent || scrolledDark) ? '#ffffff' : '#12314D'} !important; }
    .nb1-nav-right { display:flex; align-items:center; gap:20px; }
    .nb1-nav-login { font-size:14px; font-weight:500; color:${resolvedLoginColor}; text-decoration:none; white-space:nowrap; transition:color .2s; }
    .nb1-nav-login:hover { color:${isTransparent ? '#fff' : 'rgb(18,49,77)'}; }
    .nb1-nav-cta { display:inline-flex; align-items:center; font-size:14px; font-weight:700; border-radius:100px; padding:10px 20px; background:#C6FF5B; color:#0B1E33; white-space:nowrap; transition:background .15s; text-decoration:none; }
    .nb1-nav-cta:hover { background:#b8f04a; }
    .nb1-loc { position:relative; }
    .nb1-loc-btn { display:inline-flex; align-items:center; gap:7px; font-family:inherit; font-size:13.5px; font-weight:600; color:${locBtnColor}; background:none; border:1px solid transparent; border-radius:100px; padding:7px 13px; cursor:pointer; transition:background .15s,border-color .15s; white-space:nowrap; }
    .nb1-loc-btn:hover { border-color:${locBtnBorder}; background:${isTransparent ? 'rgba(255,255,255,0.13)' : 'rgba(18,49,77,0.05)'}; }
    .nb1-loc-btn svg.glb { opacity:.75; }
    .nb1-loc-btn svg.chev { opacity:.6; transition:transform .2s; }
    .nb1-loc.open .nb1-loc-btn svg.chev { transform:rotate(180deg); }
    .nb1-loc-menu { position:absolute; top:calc(100% + 12px); right:0; z-index:60; width:248px; background:#fff; border:1px solid rgba(18,49,77,.1); border-radius:16px; box-shadow:0 26px 54px -22px rgba(12,30,52,.34); padding:14px; opacity:0; visibility:hidden; transform:translateY(-6px); transition:opacity .18s,transform .18s,visibility .18s; }
    .nb1-loc.open .nb1-loc-menu { opacity:1; visibility:visible; transform:none; }
    .nb1-loc-menu h5 { margin:4px 6px 8px; font-size:10.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:rgba(18,49,77,.42); }
    .nb1-loc-menu h5:not(:first-child) { margin-top:14px; border-top:1px solid rgba(18,49,77,.08); padding-top:14px; }
    .nb1-loc-grid { display:grid; grid-template-columns:1fr 1fr; gap:4px; }
    .nb1-loc-opt { display:flex; align-items:center; gap:8px; font-family:inherit; font-size:13.5px; font-weight:500; color:rgb(18,49,77); background:none; border:none; border-radius:10px; padding:9px 10px; cursor:pointer; text-align:left; transition:background .12s; }
    .nb1-loc-opt:hover { background:rgba(18,49,77,.06); }
    .nb1-loc-opt.sel { background:rgba(10,143,176,.12); color:#0A8FB0; font-weight:700; }
    .nb1-cur-sym { display:inline-flex; width:22px; justify-content:center; font-weight:700; }
    .nb1-loc-done { display:block; width:100%; margin-top:14px; padding:11px; font-family:inherit; font-size:13.5px; font-weight:700; color:#fff; background:#0A8FB0; border:none; border-radius:11px; cursor:pointer; transition:background .15s; }
    .nb1-loc-done:hover { background:#0B7E9C; }
    .nb1-burger { display:none; flex-direction:column; justify-content:center; gap:5px; width:44px; height:44px; padding:0; background:none; border:none; cursor:pointer; }
    .nb1-burger span { display:block; width:22px; height:2px; border-radius:2px; background:${burgerColor}; margin:0 auto; transition:transform .26s,opacity .18s; }
    .nb1-burger[aria-expanded="true"] span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
    .nb1-burger[aria-expanded="true"] span:nth-child(2) { opacity:0; }
    .nb1-burger[aria-expanded="true"] span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
    .nb1-scrim { position:fixed; inset:68px 0 0; z-index:8998; background:rgba(8,18,30,.2); opacity:0; visibility:hidden; transition:opacity .25s,visibility .25s; }
    .nb1-scrim.open { opacity:1; visibility:visible; }
    .nb1-sheet { position:fixed; left:0; right:0; top:68px; z-index:8999; background:rgba(247,250,251,.92); -webkit-backdrop-filter:blur(26px); backdrop-filter:blur(26px); border-bottom:1px solid rgba(18,49,77,.10); box-shadow:0 26px 44px -26px rgba(12,30,52,.34); padding:6px 0 20px; transform:translateY(-14px); opacity:0; visibility:hidden; transition:transform .28s cubic-bezier(.16,.84,.44,1),opacity .2s,visibility .28s; }
    .nb1-sheet.open { transform:translateY(0); opacity:1; visibility:visible; }
    .nb1-sheet a { display:block; padding:16px 28px; font-size:17px; font-weight:500; color:rgb(18,49,77); border-bottom:1px solid rgba(18,49,77,.08); text-decoration:none; }
    .nb1-sheet a:hover { color:rgb(10,143,176); }
    .nb1-sheet-cta { margin:18px 24px 0 !important; padding:16px !important; text-align:center; border-radius:100px; background:#C6FF5B; color:#0B1E33 !important; font-weight:700 !important; font-size:15.5px; border-bottom:none !important; display:block; }
    .nb1-sheet-cta:hover { background:#b8f04a; color:#0B1E33 !important; }
    .nb1-sheet-loc { margin:14px 24px 0; padding:16px 0 2px; border-top:1px solid rgba(18,49,77,.10); }
    .nb1-sheet-locbtn { display:flex; align-items:center; gap:9px; width:100%; font:inherit; font-size:14px; font-weight:500; color:rgba(18,49,77,.6); background:transparent; border:1px solid rgba(18,49,77,.16); border-radius:100px; padding:11px 16px; cursor:pointer; transition:color .15s,border-color .15s; }
    .nb1-sheet-locbtn:hover { color:#12314D; border-color:rgba(18,49,77,.3); }
    .nb1-sheet-locbtn .glb { width:15px; height:15px; opacity:.55; flex:none; }
    .nb1-sheet-locbtn .chev { width:12px; height:12px; opacity:.5; margin-left:auto; flex:none; }
    .nb1-sheet-locval { font-weight:600; letter-spacing:.01em; }
    .nb1-locpop { position:fixed; inset:0; z-index:9200; display:flex; align-items:flex-end; justify-content:center; background:rgba(11,26,43,.5); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); opacity:0; visibility:hidden; transition:opacity .22s,visibility .22s; }
    .nb1-locpop.open { opacity:1; visibility:visible; }
    .nb1-locpop-card { width:100%; max-width:520px; background:#fff; border-radius:22px 22px 0 0; padding:22px 22px calc(22px + env(safe-area-inset-bottom)); box-shadow:0 -20px 60px -20px rgba(12,30,52,.5); transform:translateY(14px); transition:transform .26s cubic-bezier(.16,.84,.44,1); }
    .nb1-locpop.open .nb1-locpop-card { transform:none; }
    .nb1-locpop-card h5 { margin:4px 6px 8px; font-size:10.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:rgba(18,49,77,.42); }
    .nb1-locpop-card h5:not(:first-child) { margin-top:14px; border-top:1px solid rgba(18,49,77,.08); padding-top:14px; }
    @media (max-width:860px) { .nb1-burger{display:flex;} .nb1-nav-links{display:none;} .nb1-nav-right .nb1-nav-login{display:none;} .nb1-nav-right .nb1-nav-cta{display:none;} .nb1-nav-right .nb1-loc{display:none;} }
    @media (min-width:861px) { .nb1-sheet,.nb1-scrim,.nb1-burger{display:none !important;} }
  `

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className={`nb1-nav${hidden ? ' nb1-hidden' : ''}`} aria-label="Main navigation">
        <div className="nb1-nav-in">
          <Link href={`/${locale}/home-page`} className="nb1-logo" aria-label="NB1">
            {activeLogo?.url
              ? <img src={activeLogo.url} alt={activeLogo.alt || 'NB1'} />
              : <span style={{ fontWeight: 800, fontSize: 18, color: isTransparent ? '#fff' : '#0B1E33' }}>NB<sup>1</sup></span>
            }
          </Link>

          {navItems.length > 0 && (
            <nav className="nb1-nav-links">
              {navItems.map(({ link }, i) => {
                if (!link) return null
                const label = link.localizedLabel || link.label || ''
                const raw = link.url || ''
                const href = raw && raw.startsWith('/') && !raw.startsWith(`/${curLang}`)
                  ? `/${curLang}${raw}`
                  : raw || '#'
                return (
                  <a key={i} href={href} target={link.newTab ? '_blank' : undefined} rel={link.newTab ? 'noopener noreferrer' : undefined}>
                    {label}
                  </a>
                )
              })}
            </nav>
          )}

          <div className="nb1-nav-right">
            {/* Language / currency picker */}
            <div className="nb1-loc" ref={locRef}>
              <button
                className="nb1-loc-btn"
                type="button"
                aria-haspopup="true"
                aria-expanded={locOpen}
                aria-label="Language and currency"
                onClick={(e) => { e.stopPropagation(); setLocOpen((o) => { if (!o) { setPendingLang(curLang); setPendingCur(curCur) } return !o }) }}
              >
                {GLOBE}
                <span>{curLang.toUpperCase()} · {curSym(curCur)}</span>
                {CHEV}
              </button>
              <div className={`nb1-loc-menu${locOpen ? '' : ''}`} style={locOpen ? { opacity: 1, visibility: 'visible', transform: 'none' } : {}}>
                <h5>{dict.header.language}</h5>
                <div className="nb1-loc-grid">
                  {langs.map(([code, label]) => (
                    <button
                      key={code}
                      type="button"
                      className={`nb1-loc-opt${pendingLang === code ? ' sel' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setPendingLang(code) }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <h5>{dict.header.currency}</h5>
                <div className="nb1-loc-grid">
                  {allowedCurs(pendingLang).map(([code, sym, name]) => (
                    <button
                      key={code}
                      type="button"
                      className={`nb1-loc-opt${pendingCur === code ? ' sel' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setPendingCur(code) }}
                    >
                      <span className="nb1-cur-sym">{sym}</span>{name}
                    </button>
                  ))}
                </div>
                <button type="button" className="nb1-loc-done" onClick={() => { applyLang(pendingLang); applyCur(pendingCur); setLocOpen(false) }}>{dict.header.apply}</button>
              </div>
            </div>

            {loginText && loginUrl && (
              <a href={loginUrl} className="nb1-nav-login">{loginText}</a>
            )}

            {ctaLabel && ctaUrl && (
              <a href={`/${curLang}${ctaUrl.startsWith('/') ? ctaUrl : `/${ctaUrl}`}`} className="nb1-nav-cta">{ctaLabel}</a>
            )}

            {/* Mobile burger */}
            <button
              className="nb1-burger"
              type="button"
              aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile scrim */}
      <div
        className={`nb1-scrim${sheetOpen ? ' open' : ''}`}
        onClick={() => setSheetOpen(false)}
      />

      {/* Mobile sheet */}
      <nav className={`nb1-sheet${sheetOpen ? ' open' : ''}`} aria-label="Mobile menu">
        {navItems.map(({ link }, i) => {
          if (!link) return null
          const label = link.localizedLabel || link.label || ''
          const rawM = link.url || ''
          const hrefM = rawM && rawM.startsWith('/') && !rawM.startsWith(`/${curLang}`)
            ? `/${curLang}${rawM}`
            : rawM || '#'
          return (
            <a key={i} href={hrefM} onClick={() => setSheetOpen(false)}>{label}</a>
          )
        })}
        {loginText && loginUrl && (
          <a href={loginUrl} onClick={() => setSheetOpen(false)}>{loginText}</a>
        )}
        {ctaLabel && ctaUrl && (
          <a href={`/${curLang}${ctaUrl.startsWith('/') ? ctaUrl : `/${ctaUrl}`}`} className="nb1-sheet-cta" onClick={() => setSheetOpen(false)}>{ctaLabel}</a>
        )}
        <div className="nb1-sheet-loc">
          <button
            ref={locPopTriggerRef}
            type="button"
            className="nb1-sheet-locbtn"
            aria-haspopup="dialog"
            onClick={(e) => { e.stopPropagation(); setPendingLang(curLang); setPendingCur(curCur); setLocPopOpen(true) }}
          >
            <svg className="glb" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>
            </svg>
            <span className="nb1-sheet-locval">
              {langs.find(([c]) => c === curLang)?.[1] ?? curLang.toUpperCase()} · {curSym(curCur)}
            </span>
            <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Locale bottom-sheet popup */}
      <div
        className={`nb1-locpop${locPopOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Language and currency"
        onClick={(e) => { if (e.target === e.currentTarget) { setLocPopOpen(false); locPopTriggerRef.current?.focus() } }}
        onKeyDown={(e) => { if (e.key === 'Escape') { setLocPopOpen(false); locPopTriggerRef.current?.focus() } }}
      >
        <div className="nb1-locpop-card">
          <h5>{dict.header.language}</h5>
          <div className="nb1-loc-grid">
            {langs.map(([code, label]) => (
              <button
                key={code}
                type="button"
                className={`nb1-loc-opt${pendingLang === code ? ' sel' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPendingLang(code) }}
              >
                {label}
              </button>
            ))}
          </div>
          <h5>{dict.header.currency}</h5>
          <div className="nb1-loc-grid">
            {allowedCurs(pendingLang).map(([code, sym, name]) => (
              <button
                key={code}
                type="button"
                className={`nb1-loc-opt${pendingCur === code ? ' sel' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPendingCur(code) }}
              >
                <span className="nb1-cur-sym">{sym}</span>{name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="nb1-loc-done"
            onClick={() => { applyLang(pendingLang); applyCur(pendingCur); setLocPopOpen(false); locPopTriggerRef.current?.focus() }}
          >
            {dict.header.apply}
          </button>
        </div>
      </div>
    </>
  )
}
