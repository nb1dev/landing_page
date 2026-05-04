'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense, CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ScienceBoardMember = {
  photo?: { url?: string | null } | number | null
  photoUrl?: string | null
  name?: string | null
  role?: string | null
  meta?: string | null
  tag?: string | null
  institution?: string | null
  bio?: any | null
}

export type ScienceBoardStat = {
  target?: number | null
  suffix?: string | null
  label?: string | null
}

export type ScienceBoardVariant = {
  variantKey: string
  darkMode?: boolean | null
}

export type ScienceBoardBlockType = {
  blockName?: string
  blockType?: 'scienceBoard'
  eyebrow?: string | null
  heading?: any | null
  subLead?: string | null
  subCredits?: any | null
  members?: ScienceBoardMember[] | null
  stats?: ScienceBoardStat[] | null
  darkMode?: boolean | null
  variants?: ScienceBoardVariant[] | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline Lexical richtext renderer (same pattern as EvolutionBandBlock)
// ─────────────────────────────────────────────────────────────────────────────

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8

function renderLexicalNode(node: any, key: string): React.ReactNode {
  if (node.type === 'text') {
    const colorMatch = typeof node.style === 'string' ? node.style.match(/color:\s*([^;]+)/) : null
    const color = colorMatch ? colorMatch[1].trim() : undefined

    let el: React.ReactNode = node.text as string

    if (node.format & IS_BOLD) el = <strong key={key}>{el}</strong>
    if (node.format & IS_ITALIC) el = <em key={key}>{el}</em>
    if (node.format & IS_UNDERLINE) el = <u key={key}>{el}</u>

    if (color) {
      el = (
        <span key={key} style={{ color }}>
          {el}
        </span>
      )
    }

    return <React.Fragment key={key}>{el}</React.Fragment>
  }

  if (!node.children?.length) return null

  const children = node.children.map((child: any, i: number) =>
    renderLexicalNode(child, `${key}-${i}`),
  )

  if (node.type === 'paragraph') {
    return <p key={key}>{children}</p>
  }

  if (node.type === 'root') {
    return <React.Fragment key={key}>{children}</React.Fragment>
  }

  return <span key={key}>{children}</span>
}

function RichTextInline({ content }: { content: any }): React.ReactElement {
  if (!content?.root) return <></>
  return <>{renderLexicalNode(content.root, 'root')}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

function ScienceBoardBlockInner(props: ScienceBoardBlockType) {
  const searchParams = useSearchParams()
  const vParam = searchParams?.get('v') ?? null

  // Resolve active variant
  const activeVariant = props.variants?.find((v) => v.variantKey === vParam) ?? null
  const isDark = activeVariant ? (activeVariant.darkMode ?? false) : (props.darkMode ?? false)

  // Theme tokens
  const TEAL = '#0A8FB0'
  const TEAL_L = '#1ba8c9'
  const acColor = isDark ? TEAL_L : TEAL
  const sectionBg = isDark ? '#12314D' : '#FFFFFF'
  const headingColor = isDark ? '#FFFFFF' : '#12314D'
  const subLeadColor = isDark ? '#FFFFFF' : '#12314D'
  const subCreditsColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.65)'
  const numBigColor = isDark ? '#FFFFFF' : '#12314D'
  const numLabelColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.55)'
  const borderW2 = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(18,49,77,0.1)'

  // Responsive breakpoint
  const [isMobile, setIsMobile] = useState(false)
  const [isXsMobile, setIsXsMobile] = useState(false)
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth <= 880)
      setIsXsMobile(window.innerWidth <= 520)
    }
    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  // Modal state
  const [modalMember, setModalMember] = useState<ScienceBoardMember | null>(null)
  const [modalCloseHover, setModalCloseHover] = useState(false)

  // Counter state (starts at 0, animates up)
  const stats = props.stats ?? []
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))
  const numbersRef = useRef<HTMLDivElement>(null)
  const countDone = useRef(false)

  // Scroll reveal
  const revElements = useRef<HTMLElement[]>([])
  const revStates = useRef<Map<HTMLElement, boolean>>(new Map())
  const [, forceRevealUpdate] = useState(0)
  const revRef = useCallback((el: HTMLElement | null) => {
    if (el && !revElements.current.includes(el)) {
      revElements.current.push(el)
      revStates.current.set(el, false)
    }
  }, [])

  // Counter animation
  useEffect(() => {
    if (!numbersRef.current || !stats.length) return
    const numIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !countDone.current) {
            countDone.current = true
            stats.forEach((stat, i) => {
              const target = stat.target ?? 0
              const dur = 1800
              const start = performance.now()
              const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
              const tick = (now: number) => {
                const t = Math.min(1, (now - start) / dur)
                const v = Math.floor(easeOut(t) * target)
                setCounts((prev) => {
                  const next = [...prev]
                  next[i] = v
                  return next
                })
                if (t < 1) {
                  requestAnimationFrame(tick)
                } else {
                  setCounts((prev) => {
                    const next = [...prev]
                    next[i] = target
                    return next
                  })
                }
              }
              requestAnimationFrame(tick)
            })
          }
        })
      },
      { threshold: 0.4 },
    )
    numIo.observe(numbersRef.current)
    return () => numIo.disconnect()
  }, [stats])

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalMember])

  // Keyboard close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalMember(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const getPhotoUrl = (member: ScienceBoardMember): string | null => {
    if (member.photo && typeof member.photo === 'object' && member.photo.url) {
      return member.photo.url
    }
    return member.photoUrl ?? null
  }

  const members = props.members ?? []

  const revStyle = (el: HTMLElement | null, delay: number = 0): CSSProperties => {
    const visible = el ? (revStates.current.get(el) ?? false) : false
    return {
      opacity: (isMobile ? true : visible) ? 1 : 0,
      transform: (isMobile ? true : visible) ? 'translateY(0)' : 'translateY(34px)',
      transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
    }
  }

  // Per-element refs for reveal
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const numCellRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els: HTMLElement[] = [
      eyebrowRef.current,
      headingRef.current,
      ...cardRefs.current,
      ...numCellRefs.current,
    ].filter(Boolean) as HTMLElement[]

    els.forEach((el) => {
      if (!revElements.current.includes(el)) {
        revElements.current.push(el)
        revStates.current.set(el, false)
      }
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          revStates.current.set(e.target as HTMLElement, e.isIntersecting)
          forceRevealUpdate((n) => n + 1)
        })
      },
      { threshold: 0.1, rootMargin: '-40px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [members.length, stats.length])

  const cardBg = isDark ? 'linear-gradient(155deg, #FAF8F2 0%, #F0EDE2 100%)' : '#FFFFFF'
  const cardBorder = isDark ? '1px solid rgba(10,143,176,0.12)' : undefined
  const cardBoxShadow = isDark
    ? '0 1px 2px rgba(0,0,0,0.15), 0 8px 24px -8px rgba(0,0,0,0.25)'
    : 'inset 0 1px 0 rgba(18,49,77,0.8), 0 1px 2px rgba(18,49,77,0.04), 0 8px 24px -8px rgba(18,49,77,0.12), 0 0 0 1px rgba(18,49,77,0.06)'

  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <>
      <section
        style={{
          padding: isXsMobile ? '2rem 1rem' : '4rem 1.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background .3s',
          background: sectionBg,
          color: headingColor,
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto' }}>
          {/* ── Head ── */}
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 2.5rem' }}>
            {props.eyebrow && (
              <div
                ref={(el) => {
                  eyebrowRef.current = el!
                  revRef(el)
                }}
                style={{
                  ...revStyle(eyebrowRef.current, 0),
                  fontSize: '.7rem',
                  fontWeight: 600,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: acColor,
                  marginBottom: '.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.7rem',
                }}
              >
                <span
                  style={{ width: 32, height: 1, background: acColor, display: 'inline-block' }}
                />
                {props.eyebrow}
                <span
                  style={{ width: 32, height: 1, background: acColor, display: 'inline-block' }}
                />
              </div>
            )}
            {props.heading && (
              <h2
                ref={(el) => {
                  headingRef.current = el!
                  revRef(el)
                }}
                style={{
                  ...revStyle(headingRef.current, 0.1),
                  fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 'clamp(1.85rem, 3.3vw, 2.7rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-.03em',
                  marginBottom: '.85rem',
                  color: headingColor,
                }}
              >
                <RichTextInline content={props.heading} />
              </h2>
            )}
          </div>

          {/* ── Sub rich ── */}
          {(props.subLead || props.subCredits) && (
            <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
              {props.subLead && (
                <p
                  style={{
                    fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                    fontWeight: 500,
                    letterSpacing: '-.01em',
                    lineHeight: 1.4,
                    margin: '0 0 1.25rem',
                    color: subLeadColor,
                  }}
                >
                  {props.subLead}
                </p>
              )}
              {props.subCredits && (
                <div className="nb1sc-sub-credits" style={{ color: subCreditsColor }}>
                  <RichTextInline content={props.subCredits} />
                </div>
              )}
            </div>
          )}

          {/* ── Scientist cards ── */}
          {members.length > 0 && (
            <div
              style={
                isMobile
                  ? {
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      gap: '1rem',
                      overflowX: 'auto',
                      overflowY: 'visible',
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch',
                      padding: '0 1.25rem 1.5rem',
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                      marginTop: '2rem',
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '1.5rem',
                      marginTop: '3rem',
                    }
              }
            >
              {members.map((member, i) => {
                const delayVal = i === 0 ? 0.1 : i === 1 ? 0.2 : 0.3
                const photoUrl = getPhotoUrl(member)
                const isHovered = hoveredCard === i
                return (
                  <article
                    key={i}
                    ref={(el) => {
                      cardRefs.current[i] = el
                      revRef(el)
                    }}
                    onClick={() => setModalMember(member)}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View bio for ${member.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setModalMember(member)
                      }
                    }}
                    style={{
                      ...revStyle(cardRefs.current[i], delayVal),
                      position: 'relative',
                      borderRadius: 18,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition:
                        'transform .25s, box-shadow .25s, opacity .9s ease, transform .9s ease',
                      color: '#12314D',
                      background: cardBg,
                      border: cardBorder,
                      boxShadow: isHovered ? '0 20px 50px rgba(18,49,77,0.4)' : cardBoxShadow,
                      transform: isHovered
                        ? `translateY(-4px) ${(isMobile ? true : (revStates.current.get(cardRefs.current[i]!) ?? false)) ? '' : 'translateY(34px)'}`
                        : (isMobile ? true : (revStates.current.get(cardRefs.current[i]!) ?? false))
                          ? 'translateY(0)'
                          : 'translateY(34px)',
                      ...(isMobile
                        ? { flex: '0 0 78vw', maxWidth: 340, scrollSnapAlign: 'start' }
                        : {}),
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: '1/1',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #e8eaee 0%, #cfd4dc 100%)',
                        position: 'relative',
                      }}
                    >
                      {photoUrl && (
                        <img
                          src={photoUrl}
                          alt={member.name ?? ''}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform .55s ease',
                            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        padding: '2rem 2rem 2.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontFamily:
                            "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '1.15rem',
                          fontWeight: 600,
                          color: '#12314D',
                          letterSpacing: '-.02em',
                          lineHeight: 1.2,
                        }}
                      >
                        {member.name}
                      </div>
                      {member.role && (
                        <div style={{ fontSize: '.78rem', fontWeight: 500, color: acColor }}>
                          {member.role}
                        </div>
                      )}
                      {member.meta && (
                        <div
                          style={{
                            fontSize: '.78rem',
                            fontWeight: 300,
                            color: 'rgba(18,49,77,0.65)',
                            lineHeight: 1.55,
                            marginTop: '.25rem',
                          }}
                        >
                          {member.meta}
                        </div>
                      )}
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '1rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.45rem',
                          fontSize: '.62rem',
                          fontWeight: 600,
                          letterSpacing: '.13em',
                          textTransform: 'uppercase',
                          color: acColor,
                          alignSelf: 'flex-start',
                        }}
                      >
                        View bio
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: '.85rem',
                            letterSpacing: 0,
                            transition: 'transform .2s',
                            display: 'inline-block',
                            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                          }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* ── Stats band ── */}
          {stats.length > 0 && (
            <div
              ref={numbersRef}
              style={
                isMobile
                  ? {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 0,
                      margin: '4rem auto 0',
                      borderTop: `1px solid ${borderW2}`,
                      borderBottom: `1px solid ${borderW2}`,
                      padding: '1.2rem 0',
                      maxWidth: 'none',
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 0,
                      maxWidth: 1100,
                      margin: '4rem auto 0',
                      borderTop: `1px solid ${borderW2}`,
                      borderBottom: `1px solid ${borderW2}`,
                      padding: '2.5rem 0',
                    }
              }
            >
              {stats.map((stat, i) => {
                const delayVal = i === 0 ? 0.1 : i === 1 ? 0.2 : i === 2 ? 0.3 : 0.4
                const isLast = i === stats.length - 1
                const mobileRightBorder = isMobile && i % 2 === 0
                const mobileBottomBorder = isMobile && (i === 0 || i === 1) && stats.length > 2
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      numCellRefs.current[i] = el
                      revRef(el)
                    }}
                    style={{
                      ...revStyle(numCellRefs.current[i], delayVal),
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: isMobile ? '.85rem 1rem' : '0 1rem',
                      borderRight:
                        (!isMobile && !isLast) || mobileRightBorder
                          ? `1px solid ${borderW2}`
                          : undefined,
                      borderBottom: mobileBottomBorder ? `1px solid ${borderW2}` : undefined,
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: isMobile ? '1.4rem' : 'clamp(1.3rem, 1.8vw, 1.7rem)',
                        fontWeight: 600,
                        letterSpacing: '-.03em',
                        lineHeight: 1,
                        marginBottom: '.4rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: numBigColor,
                      }}
                    >
                      <span>{counts[i]?.toLocaleString()}</span>
                      {stat.suffix && <span style={{ color: acColor }}>{stat.suffix}</span>}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: isMobile ? '.55rem' : '.58rem',
                        fontWeight: 500,
                        letterSpacing: '.04em',
                        lineHeight: 1.35,
                        textTransform: 'uppercase',
                        color: numLabelColor,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Modal ── */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalMember(null)
        }}
        role="dialog"
        aria-modal="true"
        aria-label={modalMember?.name ?? 'Scientist bio'}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,23,41,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 300,
          opacity: modalMember ? 1 : 0,
          pointerEvents: modalMember ? 'auto' : 'none',
          transition: 'opacity .35s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 580,
            maxHeight: '88vh',
            overflowY: 'auto',
            background: '#FFFFFF',
            borderRadius: 20,
            boxShadow:
              '0 50px 120px -20px rgba(18,49,77,0.4), 0 24px 60px -12px rgba(18,49,77,0.2), 0 0 0 1px rgba(18,49,77,0.06)',
            transform: modalMember ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.97)',
            transition: 'transform .3s ease',
          }}
        >
          {/* top highlight line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(10,143,176,0.28) 50%, transparent 100%)',
              borderRadius: '20px 20px 0 0',
            }}
          />
          <button
            onClick={() => setModalMember(null)}
            aria-label="Close"
            onMouseEnter={() => setModalCloseHover(true)}
            onMouseLeave={() => setModalCloseHover(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: modalCloseHover ? 'rgba(18,49,77,0.12)' : 'rgba(18,49,77,0.06)',
              border: modalCloseHover
                ? '1px solid rgba(10,143,176,0.28)'
                : '1px solid rgba(18,49,77,0.1)',
              color: '#12314D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'background .2s, border-color .2s',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {modalMember && (
            <div style={{ padding: isMobile ? '2rem 1.5rem 1.5rem' : '3rem 2.5rem 2.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    flexShrink: 0,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #E2F0F2 0%, #EAF3F4 100%)',
                    border: '1px solid rgba(10,143,176,0.2)',
                  }}
                >
                  {getPhotoUrl(modalMember) && (
                    <img
                      src={getPhotoUrl(modalMember)!}
                      alt={modalMember.name ?? ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  )}
                </div>
                <div>
                  {modalMember.tag && (
                    <div
                      style={{
                        fontSize: '.6rem',
                        fontWeight: 600,
                        letterSpacing: '.16em',
                        textTransform: 'uppercase',
                        color: acColor,
                        marginBottom: '.5rem',
                      }}
                    >
                      {modalMember.tag}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily:
                        "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: isMobile ? '1.3rem' : '1.55rem',
                      fontWeight: 700,
                      color: '#12314D',
                      letterSpacing: '-.025em',
                      lineHeight: 1.1,
                      marginBottom: '.35rem',
                    }}
                  >
                    {modalMember.name}
                  </div>
                  {modalMember.institution && (
                    <div
                      style={{
                        fontSize: '.82rem',
                        fontWeight: 300,
                        color: 'rgba(18,49,77,0.55)',
                        lineHeight: 1.5,
                      }}
                    >
                      {modalMember.institution}
                    </div>
                  )}
                </div>
              </div>
              {modalMember.bio && (
                <div
                  style={{
                    paddingTop: '1.5rem',
                    marginTop: '1.5rem',
                    borderTop: '1px solid rgba(18,49,77,0.06)',
                    color: 'rgba(18,49,77,0.65)',
                    fontSize: '.92rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  <RichTextInline content={modalMember.bio} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export function ScienceBoardBlockComponent(props: ScienceBoardBlockType) {
  return (
    <Suspense fallback={null}>
      <ScienceBoardBlockInner {...props} />
    </Suspense>
  )
}
