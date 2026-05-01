'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
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
    const colorMatch =
      typeof node.style === 'string'
        ? node.style.match(/color:\s*([^;]+)/)
        : null
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
// CSS (scoped to .nb1sc- prefix)
// ─────────────────────────────────────────────────────────────────────────────

const CSS = `
/* Science Board Block — NB1 */
.nb1sc-section {
  padding: 4rem 1.5rem 2rem;
  position: relative;
  overflow: hidden;
  transition: background .3s;
}
.nb1sc-inner {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

/* ── Head ── */
.nb1sc-head {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem;
}
.nb1sc-eyebrow {
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #0A8FB0;
  margin-bottom: .75rem;
  display: inline-flex;
  align-items: center;
  gap: .7rem;
}
.nb1sc-eyebrow::before,
.nb1sc-eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: #0A8FB0;
}
.nb1sc-h {
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1.85rem, 3.3vw, 2.7rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -.03em;
  margin-bottom: .85rem;
}

/* ── Sub rich ── */
.nb1sc-sub-rich {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.nb1sc-sub-lead {
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1.15rem, 1.6vw, 1.4rem);
  font-weight: 500;
  letter-spacing: -.01em;
  line-height: 1.4;
  margin: 0 0 1.25rem;
}
.nb1sc-sub-credits {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: .92rem;
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
}

/* ── Scientist grid ── */
.nb1sc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}
.nb1sc-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform .25s, box-shadow .25s;
  color: #12314D;
}
.nb1sc-card--light {
  background: #FFFFFF;
  box-shadow: inset 0 1px 0 rgba(18,49,77,0.8),
              0 1px 2px rgba(18,49,77,0.04),
              0 8px 24px -8px rgba(18,49,77,0.12),
              0 0 0 1px rgba(18,49,77,0.06);
}
.nb1sc-card--dark {
  background: linear-gradient(155deg, #FAF8F2 0%, #F0EDE2 100%);
  border: 1px solid rgba(10,143,176,0.12);
  box-shadow: 0 1px 2px rgba(0,0,0,0.15),
              0 8px 24px -8px rgba(0,0,0,0.25);
}
.nb1sc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(18,49,77,0.4);
}
.nb1sc-photo {
  aspect-ratio: 1/1;
  overflow: hidden;
  background: linear-gradient(135deg, #e8eaee 0%, #cfd4dc 100%);
  position: relative;
}
.nb1sc-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .55s ease;
}
.nb1sc-card:hover .nb1sc-photo img {
  transform: scale(1.04);
}
.nb1sc-body {
  padding: 2rem 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  flex: 1;
}
.nb1sc-info-name {
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #12314D;
  letter-spacing: -.02em;
  line-height: 1.2;
}
.nb1sc-info-role {
  font-size: .78rem;
  font-weight: 500;
  color: #0A8FB0;
}
.nb1sc-info-meta {
  font-size: .78rem;
  font-weight: 300;
  color: rgba(18,49,77,0.65);
  line-height: 1.55;
  margin-top: .25rem;
}
.nb1sc-bio-hint {
  margin-top: auto;
  padding-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  font-size: .62rem;
  font-weight: 600;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: #0A8FB0;
  transition: color .2s;
  align-self: flex-start;
}
.nb1sc-bio-hint::after {
  content: '→';
  font-weight: 400;
  font-size: .85rem;
  letter-spacing: 0;
  transition: transform .2s;
}
.nb1sc-card:hover .nb1sc-bio-hint::after {
  transform: translateX(3px);
}

/* ── Numbers band ── */
.nb1sc-numbers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1100px;
  margin: 4rem auto 0;
  border-top: 1px solid var(--nb1sc-bw2);
  border-bottom: 1px solid var(--nb1sc-bw2);
  padding: 2.5rem 0;
}
.nb1sc-num-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  border-right: 1px solid var(--nb1sc-bw2);
}
.nb1sc-num-cell:last-child {
  border-right: none;
}
.nb1sc-num-big {
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1.3rem, 1.8vw, 1.7rem);
  font-weight: 600;
  letter-spacing: -.03em;
  line-height: 1;
  margin-bottom: .4rem;
  display: flex;
  align-items: flex-start;
}
.nb1sc-num-suffix {
  color: #0A8FB0;
}
.nb1sc-num-label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: .58rem;
  font-weight: 500;
  letter-spacing: .04em;
  line-height: 1.35;
  text-transform: uppercase;
}

/* ── Scroll reveal ── */
.nb1sc-rev {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity .9s ease, transform .9s ease;
}
.nb1sc-rev.nb1sc-in {
  opacity: 1;
  transform: translateY(0);
}
.nb1sc-d1 { transition-delay: .1s; }
.nb1sc-d2 { transition-delay: .2s; }
.nb1sc-d3 { transition-delay: .3s; }
.nb1sc-d4 { transition-delay: .4s; }

/* ── Modal ── */
.nb1sc-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,23,41,0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 300;
  opacity: 0;
  pointer-events: none;
  transition: opacity .35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.nb1sc-modal-overlay.nb1sc-open {
  opacity: 1;
  pointer-events: auto;
}
.nb1sc-modal {
  position: relative;
  width: 100%;
  max-width: 580px;
  max-height: 88vh;
  overflow-y: auto;
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 50px 120px -20px rgba(18,49,77,0.4),
              0 24px 60px -12px rgba(18,49,77,0.2),
              0 0 0 1px rgba(18,49,77,0.06);
  transform: translateY(10px) scale(0.97);
  transition: transform .3s ease;
}
.nb1sc-modal-overlay.nb1sc-open .nb1sc-modal {
  transform: translateY(0) scale(1);
}
.nb1sc-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(10,143,176,0.28) 50%, transparent 100%);
  border-radius: 20px 20px 0 0;
}
.nb1sc-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(18,49,77,0.06);
  border: 1px solid rgba(18,49,77,0.1);
  color: #12314D;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background .2s, border-color .2s;
}
.nb1sc-modal-close:hover {
  background: rgba(18,49,77,0.12);
  border-color: rgba(10,143,176,0.28);
}
.nb1sc-modal-body {
  padding: 3rem 2.5rem 2.5rem;
}
.nb1sc-modal-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.nb1sc-modal-img {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #E2F0F2 0%, #EAF3F4 100%);
  border: 1px solid rgba(10,143,176,0.2);
}
.nb1sc-modal-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.nb1sc-modal-tag {
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #0A8FB0;
  margin-bottom: .5rem;
}
.nb1sc-modal-name {
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #12314D;
  letter-spacing: -.025em;
  line-height: 1.1;
  margin-bottom: .35rem;
}
.nb1sc-modal-inst {
  font-size: .82rem;
  font-weight: 300;
  color: rgba(18,49,77,0.55);
  line-height: 1.5;
}
.nb1sc-modal-bio {
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(18,49,77,0.06);
  color: rgba(18,49,77,0.65);
}
.nb1sc-modal-bio p {
  font-size: .92rem;
  font-weight: 300;
  color: rgba(18,49,77,0.55);
  line-height: 1.7;
  margin-bottom: .85rem;
}
.nb1sc-modal-bio p:last-child {
  margin-bottom: 0;
}
.nb1sc-modal-bio strong {
  color: #12314D;
  font-weight: 500;
}

/* ── Mobile ── */
@media (max-width: 880px) {
  .nb1sc-grid {
    display: flex !important;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: visible;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 1.25rem;
    -webkit-overflow-scrolling: touch;
    padding: 0 1.25rem 1.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 2rem;
  }
  .nb1sc-grid::-webkit-scrollbar { display: none; }
  .nb1sc-card {
    flex: 0 0 78vw;
    max-width: 340px;
    scroll-snap-align: start;
  }
  /* Cards are off-screen horizontally — bypass reveal on mobile */
  .nb1sc-grid .nb1sc-rev {
    opacity: 1 !important;
    transform: none !important;
  }
  .nb1sc-numbers {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    padding: 1.2rem 0;
    max-width: none;
  }
  .nb1sc-num-cell {
    padding: .85rem 1rem;
  }
  .nb1sc-num-cell:nth-child(odd) {
    border-right: 1px solid var(--nb1sc-bw2);
  }
  .nb1sc-num-cell:nth-child(1),
  .nb1sc-num-cell:nth-child(2) {
    border-bottom: 1px solid var(--nb1sc-bw2);
  }
  .nb1sc-num-big { font-size: 1.4rem; }
  .nb1sc-num-label { font-size: .55rem; }
  .nb1sc-modal-body { padding: 2rem 1.5rem 1.5rem; }
  .nb1sc-modal-name { font-size: 1.3rem; }
}
@media (max-width: 520px) {
  .nb1sc-section { padding: 2rem 1rem; }
}
`

// Module-level flag to inject CSS only once
let cssInjected = false

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

function ScienceBoardBlockInner(props: ScienceBoardBlockType) {
  const searchParams = useSearchParams()
  const vParam = searchParams?.get('v') ?? null

  // Resolve active variant
  const activeVariant = props.variants?.find((v) => v.variantKey === vParam) ?? null
  const isDark = activeVariant
    ? (activeVariant.darkMode ?? false)
    : (props.darkMode ?? false)

  // Theme tokens
  const TEAL = '#0A8FB0'
  const TEAL_L = '#1ba8c9' // dark mode teal
  const acColor = isDark ? TEAL_L : TEAL
  const sectionBg = isDark ? '#12314D' : '#FFFFFF'
  const headingColor = isDark ? '#FFFFFF' : '#12314D'
  const subLeadColor = isDark ? '#FFFFFF' : '#12314D'
  const subCreditsColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.65)'
  const numBigColor = isDark ? '#FFFFFF' : '#12314D'
  const numLabelColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(18,49,77,0.55)'
  const borderW2 = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(18,49,77,0.1)'

  // Modal state
  const [modalMember, setModalMember] = useState<ScienceBoardMember | null>(null)

  // Counter state (starts at 0, animates up)
  const stats = props.stats ?? []
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))
  const numbersRef = useRef<HTMLDivElement>(null)
  const countDone = useRef(false)

  // Scroll reveal refs
  const revElements = useRef<HTMLElement[]>([])
  const revRef = useCallback((el: HTMLElement | null) => {
    if (el && !revElements.current.includes(el)) {
      revElements.current.push(el)
    }
  }, [])

  // Inject CSS once
  useEffect(() => {
    if (cssInjected) return
    cssInjected = true
    const style = document.createElement('style')
    style.setAttribute('data-nb1sc', '1')
    style.textContent = CSS
    document.head.appendChild(style)
  }, [])

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('nb1sc-in')
          else e.target.classList.remove('nb1sc-in')
        })
      },
      { threshold: 0.1, rootMargin: '-40px 0px -40px 0px' },
    )
    revElements.current.forEach((el) => io.observe(el))
    return () => io.disconnect()
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

  return (
    <>
      <section
        className="nb1sc-section"
        style={{ background: sectionBg, color: headingColor, '--nb1sc-bw2': borderW2 } as React.CSSProperties}
      >
        <div className="nb1sc-inner">
          {/* ── Head ── */}
          <div className="nb1sc-head">
            {props.eyebrow && (
              <div className="nb1sc-eyebrow nb1sc-rev" ref={revRef as any}>
                {props.eyebrow}
              </div>
            )}
            {props.heading && (
              <h2
                className="nb1sc-h nb1sc-rev nb1sc-d1"
                ref={revRef as any}
                style={{ color: headingColor }}
              >
                <span style={{ '--nb1sc-ac': acColor } as React.CSSProperties}>
                  <RichTextInline content={props.heading} />
                </span>
              </h2>
            )}
          </div>

          {/* ── Sub rich ── */}
          {(props.subLead || props.subCredits) && (
            <div className="nb1sc-sub-rich">
              {props.subLead && (
                <p className="nb1sc-sub-lead" style={{ color: subLeadColor }}>
                  {props.subLead}
                </p>
              )}
              {props.subCredits && (
                <p className="nb1sc-sub-credits" style={{ color: subCreditsColor }}>
                  <RichTextInline content={props.subCredits} />
                </p>
              )}
            </div>
          )}

          {/* ── Scientist cards ── */}
          {members.length > 0 && (
            <div className="nb1sc-grid">
              {members.map((member, i) => {
                const delay = i === 0 ? 'nb1sc-d1' : i === 1 ? 'nb1sc-d2' : 'nb1sc-d3'
                const photoUrl = getPhotoUrl(member)
                return (
                  <article
                    key={i}
                    className={`nb1sc-card nb1sc-rev ${delay} ${isDark ? 'nb1sc-card--dark' : 'nb1sc-card--light'}`}
                    ref={revRef as any}
                    onClick={() => setModalMember(member)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View bio for ${member.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setModalMember(member)
                      }
                    }}
                  >
                    <div className="nb1sc-photo">
                      {photoUrl && (
                        <img src={photoUrl} alt={member.name ?? ''} loading="lazy" />
                      )}
                    </div>
                    <div className="nb1sc-body">
                      <div className="nb1sc-info-name">{member.name}</div>
                      {member.role && (
                        <div className="nb1sc-info-role" style={{ color: acColor }}>
                          {member.role}
                        </div>
                      )}
                      {member.meta && (
                        <div className="nb1sc-info-meta">{member.meta}</div>
                      )}
                      <div className="nb1sc-bio-hint" style={{ color: acColor }}>
                        View bio
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* ── Stats band ── */}
          {stats.length > 0 && (
            <div className="nb1sc-numbers" ref={numbersRef}>
              {stats.map((stat, i) => {
                const delay =
                  i === 0
                    ? 'nb1sc-d1'
                    : i === 1
                      ? 'nb1sc-d2'
                      : i === 2
                        ? 'nb1sc-d3'
                        : 'nb1sc-d4'
                return (
                  <div
                    key={i}
                    className={`nb1sc-num-cell nb1sc-rev ${delay}`}
                    ref={revRef as any}
                    style={{}}
                  >
                    <div className="nb1sc-num-big" style={{ color: numBigColor }}>
                      <span>{counts[i]?.toLocaleString()}</span>
                      {stat.suffix && (
                        <span className="nb1sc-num-suffix" style={{ color: acColor }}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="nb1sc-num-label" style={{ color: numLabelColor }}>
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
        className={`nb1sc-modal-overlay${modalMember ? ' nb1sc-open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalMember(null)
        }}
        role="dialog"
        aria-modal="true"
        aria-label={modalMember?.name ?? 'Scientist bio'}
      >
        <div className="nb1sc-modal">
          <button
            className="nb1sc-modal-close"
            onClick={() => setModalMember(null)}
            aria-label="Close"
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
            <div className="nb1sc-modal-body">
              <div className="nb1sc-modal-head">
                <div className="nb1sc-modal-img">
                  {getPhotoUrl(modalMember) && (
                    <img
                      src={getPhotoUrl(modalMember)!}
                      alt={modalMember.name ?? ''}
                    />
                  )}
                </div>
                <div>
                  {modalMember.tag && (
                    <div className="nb1sc-modal-tag">{modalMember.tag}</div>
                  )}
                  <div className="nb1sc-modal-name">{modalMember.name}</div>
                  {modalMember.institution && (
                    <div className="nb1sc-modal-inst">{modalMember.institution}</div>
                  )}
                </div>
              </div>
              {modalMember.bio && (
                <div className="nb1sc-modal-bio">
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
