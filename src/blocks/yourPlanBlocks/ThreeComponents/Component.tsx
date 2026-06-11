'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'paper' | 'off' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null
type IconKey = 'sun' | 'moon' | 'shield' | 'none'

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, custom?: string | null) {
  if (!p || p === 'paper') return '#FFFFFF'
  if (p === 'off') return '#F1F4F7'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return custom || '#FFFFFF'
  return '#FFFFFF'
}

type Chip = { bold?: string | null }
type Lead = {
  name?: string | null
  dose?: string | null
  readLabel?: string | null
  readBody?: DefaultTypedEditorState | null
  chips?: Chip[] | null
}
type Row = { name?: string | null; dose?: string | null; excluded?: boolean | null }
type ComponentTab = {
  tabLabel?: string | null
  icon?: IconKey | null
  intro?: string | null
  lead?: Lead | null
  rows?: Row[] | null
  exNote?: string | null
}

export type YpThreeComponentsBlockType = {
  blockType?: 'ypComponents'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  replacesPrefix?: string | null
  replacesItems?: { text?: string | null }[] | null
  image?: MediaLike
  components?: ComponentTab[] | null
}

const ICONS: Record<string, React.ReactNode> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  shield: (
    <>
      <path d="M12 22c5-2 8-6 8-12V4l-8 2-8-2v6c0 6 3 10 8 12z" />
      <path d="M12 8v9" />
    </>
  ),
}

function imgUrl(img?: MediaLike) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}

export const YpThreeComponentsComponent: React.FC<YpThreeComponentsBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  replacesPrefix,
  replacesItems,
  image,
  components,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const unitRef = useRef<HTMLDivElement | null>(null)
  const hoveringRef = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const [inView, setInView] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [stopped, setStopped] = useState(false)

  const isImageMode = backgroundType === 'image'
  const isDark = isImageMode || isDarkPreset(backgroundColor)
  const resolvedBg = resolveBg(backgroundColor, backgroundColorCustom)
  const bgImg = imgUrl(backgroundImage)
  const sectionStyle: React.CSSProperties =
    isImageMode && bgImg
      ? {
          background: `linear-gradient(180deg, rgba(10,27,46,.55) 0%, rgba(10,27,46,.35) 100%), url('${bgImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      : { background: resolvedBg }

  const tabs = components ?? []
  const count = tabs.length
  const heroPhoto = imgUrl(image)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), {
      threshold: 0.08,
    })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    const el = unitRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  // auto-advance every 4200ms while in view, not hovering, until a tab is clicked
  useEffect(() => {
    if (!inView || stopped || count <= 1) return
    const id = setInterval(() => {
      if (!hoveringRef.current) setActiveIdx((i) => (i + 1) % count)
    }, 4200)
    return () => clearInterval(id)
  }, [inView, stopped, count])

  const onTabClick = (i: number) => {
    setStopped(true)
    setActiveIdx(i)
  }

  const safeActive = count ? activeIdx % count : 0

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['yp-comp', grain !== false ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .yp-comp {
          padding: 84px 0;
          position: relative;
          color: #12314d;
        }
        .yp-comp.is-dark {
          color: #ffffff;
        }
        .grain {
          position: relative;
        }
        .grain::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        .grain > :global(*) {
          position: relative;
          z-index: 1;
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 0.84, 0.44, 1),
            transform 0.7s cubic-bezier(0.16, 0.84, 0.44, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }
        .reveal.d1 {
          transition-delay: 0.08s;
        }

        /* section head */
        .section-head {
          max-width: 680px;
        }
        .section-head.center {
          margin: 0 auto;
          text-align: center;
        }
        .eyebrow {
          /* Hidden per design direction — headlines lead the section heads.
             Field stays editable in Payload; it simply never renders. */
          display: none !important;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a8fb0;
        }
        .eyebrow::before,
        .eyebrow.center::after {
          content: '';
          width: 28px;
          height: 1px;
          background: #0a8fb0;
        }
        .section-head :global(h2),
        .section-head :global(h3) {
          margin-top: 18px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
        }
        .yp-comp.is-dark .section-head :global(h2),
        .yp-comp.is-dark .section-head :global(h3) {
          color: #ffffff;
        }
        .section-head :global(.teal) {
          color: #0a8fb0;
        }
        .yp-comp.is-dark .section-head :global(.teal) {
          color: #13a6cc;
        }
        .cp-lede {
          margin-top: 18px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .yp-comp.is-dark .cp-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .cp-lede :global(p) {
          margin: 0;
        }
        .cp-lede :global(strong),
        .cp-lede :global(b) {
          color: #12314d;
          font-weight: 600;
        }
        .yp-comp.is-dark .cp-lede :global(strong),
        .yp-comp.is-dark .cp-lede :global(b) {
          color: #ffffff;
        }
        .cp-replaces {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 13px;
          color: rgba(18, 49, 77, 0.55);
        }
        .yp-comp.is-dark .cp-replaces {
          color: rgba(255, 255, 255, 0.55);
        }
        .cp-replaces span {
          font-size: 12px;
          color: rgba(18, 49, 77, 0.4);
          background: #f1f4f7;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 7px;
          padding: 4px 9px;
          text-decoration: line-through;
          text-decoration-color: rgba(18, 49, 77, 0.4);
        }

        /* unit */
        .cp-unit {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-top: 48px;
          background:
            radial-gradient(110% 90% at 100% 0%, rgba(10, 143, 176, 0.06) 0%, transparent 50%),
            linear-gradient(168deg, rgba(255, 255, 255, 0.82) 0%, rgba(244, 249, 251, 0.74) 100%);
          -webkit-backdrop-filter: blur(16px) saturate(125%);
          backdrop-filter: blur(16px) saturate(125%);
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 30px 70px -44px rgba(18, 49, 77, 0.4);
        }
        .cp-visual {
          background: transparent;
          padding: 34px 34px 34px 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* floating product render (inline-style override from source) */
        .cp-imgbox {
          position: relative;
          width: 100%;
          background: none;
          border-radius: 0;
          overflow: visible;
          box-shadow: none;
        }
        .cp-imgbox img {
          position: static;
          width: 100%;
          height: auto;
          object-fit: contain;
          transform: perspective(1100px) rotateX(9deg) rotateZ(-3deg);
          transform-origin: center;
          filter: drop-shadow(0 34px 44px rgba(12, 30, 52, 0.3))
            drop-shadow(0 10px 16px rgba(12, 30, 52, 0.18));
        }

        .cp-right {
          padding: 38px 38px 30px;
          display: flex;
          flex-direction: column;
        }
        .cp-tabs {
          display: inline-flex;
          align-self: flex-start;
          background: #f1f4f7;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 100px;
          padding: 4px;
          gap: 3px;
        }
        .cp-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(18, 49, 77, 0.55);
          background: none;
          border: none;
          border-radius: 100px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.18s;
        }
        .cp-tab:hover {
          color: #12314d;
        }
        .cp-tab.active {
          background: #fff;
          color: #12314d;
          box-shadow: 0 1px 3px rgba(18, 49, 77, 0.16);
        }
        .cp-tab :global(svg) {
          width: 14px;
          height: 14px;
        }
        .cp-panel {
          flex: 1;
          padding-top: 22px;
          min-height: 534px;
        }
        @keyframes fadeup {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .cp-comp {
          animation: fadeup 0.35s ease;
        }
        .cp-intro {
          font-size: 13.5px;
          color: rgba(18, 49, 77, 0.55);
          margin-bottom: 16px;
        }
        .cp-lead {
          padding: 0 0 18px;
        }
        .cp-lead-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          padding: 15px 2px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
          margin-bottom: 14px;
        }
        .cp-comp > .cp-lead:first-child .cp-lead-top {
          border-top: none;
          padding-top: 2px;
        }
        .cp-nm {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #12314d;
        }
        .cp-ds {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 11.5px;
          color: rgba(18, 49, 77, 0.55);
          white-space: nowrap;
        }
        .cp-read {
          border-left: 2px solid #0a8fb0;
          background: rgba(10, 143, 176, 0.08);
          border-radius: 0 10px 10px 0;
          padding: 11px 14px;
        }
        .cp-rk {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin-bottom: 6px;
        }
        .cp-read :global(p) {
          font-size: 13px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.5;
          margin: 0;
        }
        .cp-read :global(p b),
        .cp-read :global(p strong) {
          color: #0a8fb0;
          font-weight: 600;
        }
        .cp-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 13px;
        }
        .cp-chip {
          font-size: 11.5px;
          color: rgba(18, 49, 77, 0.7);
          background: #fff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 8px;
          padding: 5px 9px;
        }
        .cp-chip b {
          color: #12314d;
          font-weight: 600;
        }
        .cp-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 2px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
        }
        .cp-rows .cp-row:last-child {
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
        }
        .cp-rnm {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          color: #12314d;
        }
        .cp-rds {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 11.5px;
          color: rgba(18, 49, 77, 0.55);
          white-space: nowrap;
        }
        .cp-row.excluded .cp-rnm {
          color: rgba(18, 49, 77, 0.4);
          text-decoration: line-through;
          text-decoration-color: rgba(18, 49, 77, 0.4);
        }
        .cp-row.excluded .cp-rds {
          color: rgba(18, 49, 77, 0.4);
          font-style: italic;
        }
        .cp-exnote {
          display: flex;
          gap: 9px;
          align-items: flex-start;
          font-size: 12.5px;
          color: rgba(18, 49, 77, 0.55);
          line-height: 1.5;
          margin-top: 14px;
        }
        .cp-ex-ico {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f1f4f7;
          border: 1px solid rgba(18, 49, 77, 0.1);
          color: rgba(18, 49, 77, 0.4);
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        @media (max-width: 860px) {
          .cp-unit {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .yp-comp {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
          .cp-tabs {
            display: flex;
            width: 100%;
            align-self: stretch;
            flex-wrap: nowrap;
          }
          .cp-tab {
            flex: 1;
            justify-content: center;
            padding: 10px 6px;
            font-size: 13px;
            gap: 5px;
          }
          .cp-tab :global(svg) {
            width: 13px;
            height: 13px;
          }
          .cp-right {
            padding: 28px 24px 26px;
          }
          .cp-panel {
            min-height: 0;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede || replacesPrefix) && (
          <div className={['section-head center reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow center">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="cp-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
            {(replacesPrefix || (replacesItems && replacesItems.length > 0)) && (
              <p className="cp-replaces">
                {replacesPrefix}
                {replacesItems?.map((it, i) => <span key={i}>{it.text}</span>)}
              </p>
            )}
          </div>
        )}

        <div
          ref={unitRef}
          className={['cp-unit reveal', revealed ? 'in d1' : 'd1'].join(' ')}
          onMouseEnter={() => (hoveringRef.current = true)}
          onMouseLeave={() => (hoveringRef.current = false)}
        >
          <div className="cp-visual">
            <div className="cp-imgbox">
              {heroPhoto && <img src={heroPhoto} alt={(image && (image as any).alt) || ''} />}
            </div>
          </div>

          <div className="cp-right">
            {count > 0 && (
              <div className="cp-tabs" role="tablist">
                {tabs.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === safeActive}
                    className={['cp-tab', i === safeActive ? 'active' : ''].join(' ')}
                    onClick={() => onTabClick(i)}
                  >
                    {t.icon && t.icon !== 'none' && ICONS[t.icon] && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {ICONS[t.icon]}
                      </svg>
                    )}
                    {t.tabLabel}
                  </button>
                ))}
              </div>
            )}

            <div className="cp-panel">
              {tabs[safeActive] &&
                (() => {
                  const c = tabs[safeActive]
                  const lead = c.lead
                  const hasLead =
                    lead && (lead.name || lead.dose || lead.readLabel || lead.readBody || (lead.chips && lead.chips.length > 0))
                  const rows = c.rows ?? []
                  return (
                    <div className="cp-comp" key={safeActive}>
                      {c.intro && <div className="cp-intro">{c.intro}</div>}

                      {hasLead && (
                        <div className="cp-lead">
                          {(lead!.name || lead!.dose) && (
                            <div className="cp-lead-top">
                              {lead!.name && <span className="cp-nm">{lead!.name}</span>}
                              {lead!.dose && <span className="cp-ds">{lead!.dose}</span>}
                            </div>
                          )}
                          {(lead!.readLabel || lead!.readBody) && (
                            <div className="cp-read">
                              {lead!.readLabel && <div className="cp-rk">{lead!.readLabel}</div>}
                              {lead!.readBody && (
                                <RichText
                                  data={lead!.readBody as any}
                                  enableGutter={false}
                                  enableProse={false}
                                />
                              )}
                            </div>
                          )}
                          {lead!.chips && lead!.chips.length > 0 && (
                            <div className="cp-chips">
                              {lead!.chips.map((chip, ci) => (
                                <span key={ci} className="cp-chip">
                                  <b>{chip.bold}</b>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {rows.length > 0 && (
                        <div className="cp-rows">
                          {rows.map((r, ri) => (
                            <div
                              key={ri}
                              className={['cp-row', r.excluded ? 'excluded' : ''].join(' ')}
                            >
                              {r.name && <span className="cp-rnm">{r.name}</span>}
                              {r.dose && <span className="cp-rds">{r.dose}</span>}
                            </div>
                          ))}
                        </div>
                      )}

                      {c.exNote && (
                        <p className="cp-exnote">
                          <span className="cp-ex-ico">✕</span>
                          {c.exNote}
                        </p>
                      )}
                    </div>
                  )
                })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
