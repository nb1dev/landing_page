'use client'

import React, { useEffect, useRef, useState } from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'glass' | 'paper' | 'off' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}

export type YpStickyBuyBlockType = {
  blockType?: 'ypStickyBuy'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  leftKey?: string | null
  leftValue?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  showAfterSel?: string | null
  hideAtSel?: string | null
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpStickyBuyClient: React.FC<YpStickyBuyBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  leftKey,
  leftValue,
  ctaLabel,
  ctaHref,
  showAfterSel,
  hideAtSel,
}) => {
  const [show, setShow] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)

  const isImageMode = backgroundType === 'image'
  const bgImg = imgUrl(backgroundImage)
  const hasImage = isImageMode && !!bgImg
  const isGlass = (!backgroundColor || backgroundColor === 'glass') && !hasImage
  const isDark = hasImage || isDarkPreset(backgroundColor)

  const showAfter = showAfterSel || '.yp-hero, [data-screen-label="Hero"], .hero'
  const hideAt = hideAtSel || '.yp-plans, .buy-close, footer, .nbf'

  const barStyle: React.CSSProperties = (() => {
    if (hasImage) {
      return {
        background: `linear-gradient(0deg, rgba(10,27,46,.62), rgba(10,27,46,.62)), url('${bgImg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    switch (backgroundColor) {
      case 'paper':
        return { background: '#FFFFFF' }
      case 'off':
        return { background: '#F1F4F7' }
      case 'cream':
        return { background: '#FAF8F2' }
      case 'navy':
        return { background: '#12314D' }
      case 'navyDeep':
        return { background: '#0E2740' }
      case 'teal':
        return { background: '#0A8FB0' }
      case 'custom':
        return { background: backgroundColorCustom || 'rgba(255,255,255,.82)' }
      default:
        return {} // glass — handled in CSS
    }
  })()

  useEffect(() => {
    const showEl = showAfter ? document.querySelector(showAfter) : null
    const hideEls = hideAt
      ? Array.from(document.querySelectorAll(hideAt))
      : []
    // An element counts as "hiding" only when it is actually intersecting the
    // viewport — not merely scrolled above it. (The source used `top <
    // innerHeight`, which stays true after an element scrolls past the top, so
    // on this page the early .yp-plans block would keep the bar hidden forever.)
    const inViewport = (el: Element) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }
    const onScroll = () => {
      const past = showEl
        ? showEl.getBoundingClientRect().bottom < 0
        : (window.scrollY || 0) > 700
      const atHide = hideEls.some(inViewport)
      setShow(past && !atHide)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [showAfter, hideAt])

  if (!leftKey && !ctaLabel) return null

  return (
    <div
      ref={barRef}
      style={barStyle}
      className={[
        'yp-sticky',
        show ? 'show' : '',
        isGlass ? 'is-glass' : '',
        isDark ? 'is-dark' : '',
      ].join(' ')}
    >
      <style jsx>{`
        .yp-sticky {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 55;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.16, 0.84, 0.44, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          white-space: nowrap;
          padding: 14px 32px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
          box-shadow: 0 -8px 28px -14px rgba(18, 49, 77, 0.22);
        }
        .yp-sticky.is-glass {
          background: rgba(255, 255, 255, 0.82);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          backdrop-filter: blur(22px) saturate(160%);
        }
        .yp-sticky.is-dark {
          border-top-color: rgba(255, 255, 255, 0.14);
        }
        .yp-sticky.show {
          transform: translateY(0);
        }
        .nb1-sk-info {
          display: flex;
          align-items: baseline;
          gap: 12px;
          min-width: 0;
        }
        .nb1-sk-k {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          color: #12314d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .yp-sticky.is-dark .nb1-sk-k {
          color: #ffffff;
        }
        .nb1-sk-v {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: rgba(18, 49, 77, 0.55);
          white-space: nowrap;
        }
        .yp-sticky.is-dark .nb1-sk-v {
          color: rgba(255, 255, 255, 0.6);
        }
        .nb1-sk-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 14px;
          border-radius: 100px;
          padding: 11px 22px;
          background: #c6ff5b;
          color: #0e2740;
          text-decoration: none;
          white-space: nowrap;
          flex: none;
          transition: background 0.15s ease;
        }
        .nb1-sk-cta:hover {
          background: #aaea42;
        }
        @media (max-width: 760px) {
          .yp-sticky {
            padding: 12px 18px;
            gap: 12px;
          }
        }
        @media (max-width: 600px) {
          .yp-sticky {
            padding: 12px 16px;
            gap: 14px;
            align-items: center;
          }
          .nb1-sk-v {
            display: none;
          }
          .nb1-sk-k {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            font-size: 14px;
            line-height: 1.3;
          }
          .nb1-sk-cta {
            flex: none;
            padding: 14px 22px;
            font-size: 15px;
          }
        }
        @media print {
          .yp-sticky {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .yp-sticky {
            transition: none;
          }
        }
      `}</style>

      <div className="nb1-sk-info">
        {leftKey && <span className="nb1-sk-k">{leftKey}</span>}
        {leftValue && <span className="nb1-sk-v">{leftValue}</span>}
      </div>
      {ctaLabel && (
        <a className="nb1-sk-cta" href={ctaHref || '#'}>
          {ctaLabel}
        </a>
      )}
    </div>
  )
}
