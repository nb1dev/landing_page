'use client'

import React, { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type FloatingCTABlockType = {
  blockName?: string
  blockType?: 'floatingCTA'
  text?: string | null
  highlightedText?: string | null
  buttonText?: string | null
  buttonHref?: string | null
  heroSelector?: string | null
  reserveSelector?: string | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens (matches early-access-EU-dark.html)
// ─────────────────────────────────────────────────────────────────────────────
const TEAL = '#0a8fb0'
const TEAL_D = '#078ba9'
const NAVY_DARK = '#0a1e35'
const WHITE = '#ffffff'

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function FloatingCTABlockComponent(props: FloatingCTABlockType) {
  const {
    text = 'Get your kit',
    highlightedText = '2 weeks before anyone else',
    buttonText = 'Reserve my kit →',
    buttonHref = '#reserve',
    heroSelector = '.hero',
    reserveSelector = '#reserve',
  } = props

  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  // Detect mobile breakpoint (≤ 520px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 520px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Show/hide logic: visible after hero scrolls out AND before reserve comes into view
  useEffect(() => {
    const selector = heroSelector || '.hero'
    const reserveSel = reserveSelector || '#reserve'

    const update = () => {
      const hero = document.querySelector(selector)
      if (!hero) return
      const heroBottom = hero.getBoundingClientRect().bottom
      const reserve = document.querySelector(reserveSel)
      const reserveTop = reserve ? reserve.getBoundingClientRect().top : 99999

      // Also hide when within 200px of the page bottom (fallback if reserve element not found)
      const nearBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 200

      setVisible(heroBottom < 0 && reserveTop > window.innerHeight - 80 && !nearBottom)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [heroSelector, reserveSelector])

  // ── Styles (all inline, matching HTML reference) ──────────────────────────

  const translateY = visible
    ? 'translateX(-50%) translateY(0)'
    : 'translateX(-50%) translateY(140%)'

  const containerStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: translateY,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: 0,
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        maxWidth: 'calc(100% - 2rem)',
        transition: 'transform .55s cubic-bezier(.45,0,.15,1)',
      }
    : {
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: translateY,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '.85rem',
        padding: '.5rem .5rem .5rem 1.35rem',
        background: NAVY_DARK,
        border: 'none',
        borderRadius: '100px',
        boxShadow: '0 12px 40px rgba(8,23,41,0.32), 0 2px 8px rgba(8,23,41,0.18)',
        maxWidth: 'calc(100% - 2rem)',
        transition: 'transform .55s cubic-bezier(.45,0,.15,1)',
      }

  const textStyle: React.CSSProperties = {
    fontSize: '.82rem',
    fontWeight: 500,
    color: WHITE,
    whiteSpace: 'nowrap',
    letterSpacing: '-.005em',
  }

  const acStyle: React.CSSProperties = {
    color: TEAL,
    fontWeight: 600,
  }

  const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '18px',
    background: 'rgba(255,255,255,0.14)',
    flexShrink: 0,
  }

  const btnStyle: React.CSSProperties = isMobile
    ? {
        fontSize: '.85rem',
        padding: '.85rem 1.55rem',
        borderRadius: '100px',
        background: btnHovered ? TEAL_D : TEAL,
        color: WHITE,
        fontWeight: 600,
        letterSpacing: '.01em',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.4rem',
        transition: 'background .2s, transform .2s',
        boxShadow: '0 14px 36px rgba(10,143,176,0.45), 0 4px 12px rgba(8,23,41,0.25)',
      }
    : {
        fontSize: '.78rem',
        padding: '.6rem 1.1rem',
        borderRadius: '100px',
        background: btnHovered ? TEAL_D : TEAL,
        color: WHITE,
        fontWeight: 600,
        letterSpacing: '.01em',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.4rem',
        transition: 'background .2s, transform .2s',
      }

  return (
    <div style={containerStyle}>
      {/* Text + divider — hidden on mobile */}
      {!isMobile && text && (
        <>
          <span style={textStyle}>
            {text}
            {highlightedText && (
              <>
                {' '}
                <span style={acStyle}>{highlightedText}</span>
              </>
            )}
          </span>
          <span style={dividerStyle} />
        </>
      )}

      {/* CTA Button */}
      <a
        href={buttonHref || '#reserve'}
        style={btnStyle}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        {buttonText}
      </a>
    </div>
  )
}
