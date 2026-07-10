'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined
type SealFace = { image?: MediaLike; name?: string | null }
type Stage = { status?: string | null; phase?: string | null }
type Row = { tagVariant?: 'act' | 'nour' | 'rest' | null; tagLabel?: string | null; name?: string | null; dose?: string | null }
type Panel = {
  stages?: Stage[] | null
  cardTitle?: string | null
  cardMeta?: string | null
  rows?: Row[] | null
  moreLabel?: string | null
  moreMeta?: string | null
  footNote?: string | null
}

export type ProtocolHeroBlockType = {
  blockType?: 'protocolHero'
  heading?: DefaultTypedEditorState | null
  lede?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  sealText?: DefaultTypedEditorState | null
  sealFaces?: SealFace[] | null
  panel?: Panel | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

// Ported verbatim from the mockup's hbPanel/hbSpores script: mixed-size organic
// spore clusters (not canvas — real DOM divs) that gather from chaos into 5
// fixed communities, each with a soft neutral halo, staged by the run() timeline.
const PAL = ['#5BC0D8', '#5BC0D8', '#5BC0D8', '#7FD4E6', '#7FD4E6', '#0A8FB0', '#0A8FB0', '#9AE0EE']
const GROUPS = [
  { cx: 182, cy: 150, r: 82, n: 48 },
  { cx: 430, cy: 96, r: 44, n: 24 },
  { cx: 448, cy: 208, r: 33, n: 14 },
  { cx: 96, cy: 236, r: 19, n: 6 },
  { cx: 288, cy: 252, r: 22, n: 7 },
]
const W = 560
const H = 300

export const ProtocolHeroComponent: React.FC<ProtocolHeroBlockType> = ({
  heading,
  lede,
  ctaLabel,
  ctaUrl,
  sealText,
  sealFaces,
  panel,
}) => {
  const faces = (sealFaces ?? []).filter((f) => imgUrl(f?.image))
  const stages = panel?.stages ?? []
  const rows = panel?.rows ?? []

  const panelRef = useRef<HTMLDivElement | null>(null)
  const sporesRef = useRef<HTMLDivElement | null>(null)
  const statusRef = useRef<HTMLSpanElement | null>(null)
  const phaseRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const panelEl = panelRef.current
    const sporesEl = sporesRef.current
    const statusEl = statusRef.current
    const phaseEl = phaseRef.current
    if (!panelEl || !sporesEl || !statusEl || !phaseEl) return
    if (stages.length < 4) return

    let seed = 13
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    GROUPS.forEach((g, k) => {
      const pad = 16
      const halo = document.createElement('div')
      halo.className = 'hb-halo'
      halo.style.left = `${g.cx - g.r - pad}px`
      halo.style.top = `${g.cy - g.r - pad}px`
      halo.style.width = `${g.r * 2 + pad * 2}px`
      halo.style.height = `${g.r * 2 + pad * 2}px`
      halo.style.transitionDelay = `${k * 0.1}s`
      sporesEl.appendChild(halo)
    })

    GROUPS.forEach((g, gk) => {
      for (let j = 0; j < g.n; j++) {
        const el = document.createElement('div')
        el.className = 'hb-spore'
        let w = 2 + rnd() * 2.4
        if (rnd() > 0.86) w += 1.8
        el.style.width = `${w}px`
        el.style.height = `${w}px`
        el.style.background = PAL[Math.floor(rnd() * PAL.length)]
        el.style.setProperty('--op', (0.5 + rnd() * 0.42).toFixed(2))
        const sx = 20 + rnd() * (W - 40)
        const sy = 20 + rnd() * (H - 40)
        const a = rnd() * Math.PI * 2
        const rad = g.r * Math.pow(rnd(), 0.62)
        const gx = g.cx + Math.cos(a) * rad + (rnd() - 0.5) * 6
        const gy = g.cy + Math.sin(a) * rad + (rnd() - 0.5) * 6
        el.style.setProperty('--sx', `${sx}px`)
        el.style.setProperty('--sy', `${sy}px`)
        el.style.setProperty('--gx', `${gx}px`)
        el.style.setProperty('--gy', `${gy}px`)
        el.style.setProperty('--sr', `${rnd() * 180}deg`)
        el.style.transitionDelay = `${gk * 0.09 + rnd() * 0.3}s`
        sporesEl.appendChild(el)
      }
    })

    const timers: ReturnType<typeof setTimeout>[] = []
    const clr = () => {
      timers.forEach((t) => clearTimeout(t))
      timers.length = 0
    }
    const run = () => {
      clr()
      panelEl.classList.remove('is-gather', 'is-built', 'is-running')
      statusEl.textContent = stages[0]?.status ?? ''
      phaseEl.textContent = stages[0]?.phase ?? ''
      void panelEl.offsetWidth
      panelEl.classList.add('is-running')
      timers.push(
        setTimeout(() => {
          statusEl.textContent = stages[1]?.status ?? ''
          phaseEl.textContent = stages[1]?.phase ?? ''
          panelEl.classList.add('is-gather')
        }, 1800),
      )
      timers.push(
        setTimeout(() => {
          statusEl.textContent = stages[2]?.status ?? ''
          phaseEl.textContent = stages[2]?.phase ?? ''
          panelEl.classList.add('is-built')
        }, 3200),
      )
      timers.push(
        setTimeout(() => {
          statusEl.textContent = stages[3]?.status ?? ''
          phaseEl.textContent = stages[3]?.phase ?? ''
        }, 5000),
      )
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(panelEl)

    return () => {
      clr()
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="pr-hero">
      <style jsx>{`
        .pr-hero {
          /* Mockup body font is --font (Inter); app global is Geist, so set it
             explicitly here. Headings override to Instrument Sans below. */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          padding: 132px 0 96px;
          overflow: hidden;
          background:
            radial-gradient(58% 72% at 86% 32%, rgba(10, 143, 176, 0.1), transparent 68%),
            linear-gradient(100deg, #fafdfe 0%, #f6fbfc 45%, #eaf3f7 61%, #e2edf3 100%);
        }
        .pr-wrap {
          position: relative;
          z-index: 2;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .pr-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.42fr;
          gap: 52px;
          align-items: center;
        }
        .pr-hero-copy {
          min-width: 0;
        }
        .pr-hero-copy :global(h1) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(34px, 4.4vw, 52px);
          line-height: 1.03;
          letter-spacing: -0.035em;
          color: #12314d;
          margin: 0;
          max-width: 13ch;
        }
        .pr-hero-copy :global(h1 span) {
          color: #0a8fb0;
        }
        .pr-hero-lede {
          font-size: clamp(17px, 1.9vw, 19px);
          line-height: 1.55;
          color: rgba(18, 49, 77, 0.7);
          margin: 22px 0 0;
          max-width: 42ch;
        }
        .pr-hero-cta {
          margin-top: 34px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .pr-hero-order {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #0e2740;
          background: #c6ff5b;
          border-radius: 100px;
          padding: 15px 26px;
          text-decoration: none;
          transition:
            background 0.15s,
            transform 0.15s,
            box-shadow 0.15s;
          box-shadow: 0 14px 30px -16px rgba(120, 160, 40, 0.55);
        }
        .pr-hero-order:hover {
          background: #aaea42;
          transform: translateY(-1px);
        }
        .pr-hero-order :global(svg) {
          width: 17px;
          height: 17px;
          transition: transform 0.18s ease;
        }
        .pr-hero-order:hover :global(svg) {
          transform: translateX(3px);
        }
        .pr-hero-seal {
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .pr-seal-faces {
          display: flex;
          flex: none;
        }
        .pr-seal-faces img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2.5px solid #fff;
          box-shadow: 0 4px 11px -6px rgba(18, 49, 77, 0.55);
          margin-left: -12px;
        }
        .pr-seal-faces img:first-child {
          margin-left: 0;
        }
        .pr-seal-txt {
          font-size: 14.5px;
          line-height: 1.4;
          color: rgba(18, 49, 77, 0.7);
          max-width: 30ch;
        }
        .pr-seal-txt :global(b),
        .pr-seal-txt :global(strong) {
          color: #12314d;
          font-weight: 600;
        }

        /* build panel */
        .hb-panel {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          padding: 24px;
          background: linear-gradient(162deg, #15315a 0%, #0b1e38 100%);
          border: 1px solid rgba(120, 175, 215, 0.2);
          box-shadow:
            0 44px 90px -46px rgba(0, 0, 0, 0.72),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .hb-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(90% 70% at 80% 8%, rgba(91, 192, 216, 0.2), transparent 62%);
        }
        .hb-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hb-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #dce6f2;
        }
        .hb-live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5bc0d8;
          box-shadow: 0 0 0 0 rgba(91, 192, 216, 0.6);
          animation: hbPulse 1.8s infinite;
        }
        @keyframes hbPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(91, 192, 216, 0.6);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(91, 192, 216, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(91, 192, 216, 0);
          }
        }
        .hb-phase {
          font-family: ui-monospace, Menlo, monospace;
          font-size: 11.5px;
          letter-spacing: 0.04em;
          color: rgba(147, 160, 178, 0.9);
        }
        .hb-stage {
          position: relative;
          height: 288px;
          margin-top: 14px;
        }
        .hb-stage > svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .hb-scan {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          left: 2%;
          opacity: 0;
          background: linear-gradient(transparent, rgba(91, 192, 216, 0.9), transparent);
          box-shadow: 0 0 18px 4px rgba(91, 192, 216, 0.5);
        }
        .hb-panel.is-running .hb-scan {
          animation: hbSweep 1.4s ease-in-out 0.2s 1 forwards;
        }
        @keyframes hbSweep {
          0% {
            left: 2%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 98%;
            opacity: 0;
          }
        }
        /* Spores/halos are created via document.createElement (not JSX), so
           they never receive styled-jsx's scoping hash — these rules must be
           :global or they silently never match anything. */
        :global(.hb-spore) {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          background: #0a8fb0;
          opacity: 0.22;
          transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
          transition:
            transform 1.2s cubic-bezier(0.5, 0, 0.2, 1),
            opacity 0.6s;
        }
        .hb-panel.is-gather :global(.hb-spore) {
          transform: translate(var(--gx), var(--gy)) rotate(0deg);
          opacity: var(--op, 0.8);
        }
        :global(.hb-halo) {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(closest-side, rgba(91, 192, 216, 0.16), rgba(91, 192, 216, 0.05) 55%, transparent 76%);
          transition: opacity 0.7s ease;
        }
        .hb-panel.is-gather :global(.hb-halo) {
          opacity: 1;
        }
        .hb-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 84%;
          transform: translate(-50%, -50%) scale(0.92);
          background: linear-gradient(162deg, rgba(20, 44, 74, 0.55), rgba(11, 26, 48, 0.62));
          border: 1px solid rgba(122, 164, 200, 0.28);
          border-radius: 15px;
          padding: 15px 17px;
          -webkit-backdrop-filter: blur(7px);
          backdrop-filter: blur(7px);
          opacity: 0;
          box-shadow: 0 22px 48px -26px rgba(0, 0, 0, 0.6);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .hb-panel.is-built .hb-card {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .hb-card h4 {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          color: #eaf2fb;
        }
        .hb-card h4 span {
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(147, 160, 178, 0.95);
          letter-spacing: 0.01em;
        }
        .hb-rows {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hb-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.45s ease,
            transform 0.45s ease;
        }
        .hb-panel.is-built .hb-row {
          opacity: 1;
          transform: none;
        }
        .hb-panel.is-built .hb-row:nth-child(1) {
          transition-delay: 0.15s;
        }
        .hb-panel.is-built .hb-row:nth-child(2) {
          transition-delay: 0.35s;
        }
        .hb-panel.is-built .hb-row:nth-child(3) {
          transition-delay: 0.55s;
        }
        .hb-panel.is-built .hb-row:nth-child(4) {
          transition-delay: 0.75s;
        }
        .hb-panel.is-built .hb-row:nth-child(5) {
          transition-delay: 0.95s;
        }
        .hb-panel.is-built .hb-row:nth-child(6) {
          transition-delay: 1.15s;
        }
        .hb-row .n {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: #dce6f2;
          white-space: nowrap;
        }
        .hb-tag {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .hb-tag.act {
          background: rgba(198, 255, 91, 0.16);
          color: #c6ff5b;
        }
        .hb-tag.nour {
          background: rgba(91, 192, 216, 0.18);
          color: #5bc0d8;
        }
        .hb-tag.rest {
          background: rgba(230, 169, 59, 0.2);
          color: #e6a93b;
        }
        .hb-row .d {
          font-size: 12.5px;
          color: rgba(147, 160, 178, 0.95);
          font-variant-numeric: tabular-nums;
        }
        .hb-row.hb-more {
          margin-top: 3px;
          padding-top: 9px;
          border-top: 1px dashed rgba(122, 164, 200, 0.24);
        }
        .hb-row.hb-more .n {
          font-size: 12.5px;
          color: #b7c6da;
          font-weight: 600;
          white-space: normal;
        }
        .hb-row.hb-more .d {
          font-size: 11px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: rgba(147, 160, 178, 0.85);
        }
        .hb-foot {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 16px;
        }
        .hb-note {
          font-size: 11px;
          line-height: 1.35;
          color: rgba(147, 160, 178, 0.9);
          max-width: 100%;
        }

        @media (max-width: 900px) {
          .pr-hero-grid {
            grid-template-columns: 1fr;
            gap: 38px;
          }
          .pr-hero {
            padding: 60px 0 56px;
          }
          .pr-hero-copy :global(h1) {
            max-width: 16ch;
          }
          .pr-hero-lede {
            max-width: 52ch;
          }
        }
        @media (max-width: 760px) {
          .hb-panel {
            display: flex;
            flex-direction: column;
            height: min(560px, 78vh);
          }
          .hb-top {
            flex: none;
            align-items: flex-start;
            gap: 14px;
          }
          .hb-status {
            flex: 1;
            min-width: 0;
            align-items: flex-start;
          }
          .hb-status .hb-live {
            margin-top: 5px;
          }
          .hb-phase {
            flex: none;
            white-space: nowrap;
            margin-top: 2px;
          }
          .hb-stage {
            flex: 1 1 auto;
            min-height: 0;
            height: auto;
          }
          .hb-foot {
            flex: none;
            margin-top: 14px;
          }
          .hb-card {
            width: 92%;
            padding: 14px 15px;
          }
          .hb-card h4 {
            font-size: 13.5px;
          }
          .hb-rows {
            margin-top: 11px;
            gap: 9px;
          }
          .hb-row {
            align-items: flex-start;
            gap: 10px;
          }
          .hb-row .n {
            white-space: normal;
            font-size: 12.5px;
            line-height: 1.3;
          }
          .hb-row .d {
            flex: none;
            white-space: nowrap;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.hb-spore) {
            transition: none;
          }
          .hb-scan {
            display: none;
          }
          .pr-hero-order :global(svg) {
            transition: none;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pr-wrap">
        <div className="pr-hero-grid">
          <div className="pr-hero-copy">
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && <p className="pr-hero-lede">{lede}</p>}
            <div className="pr-hero-cta">
              <a className="pr-hero-order" href={ctaUrl || '#'}>
                {ctaLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              </a>
            </div>
            {faces.length > 0 && (
              <div className="pr-hero-seal">
                <div className="pr-seal-faces">
                  {faces.map((f, i) => (
                    <img key={i} src={imgUrl(f.image)} alt={imgAlt(f.image) || f.name || ''} />
                  ))}
                </div>
                {sealText && (
                  <div className="pr-seal-txt">
                    <RichText data={sealText as any} enableGutter={false} enableProse={false} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pr-hero-panelcol">
            <div className="hb-panel" ref={panelRef}>
              <div className="hb-top">
                <div className="hb-status">
                  <span className="hb-live"></span>
                  <span ref={statusRef}>{stages[0]?.status}</span>
                </div>
                <div className="hb-phase" ref={phaseRef}>
                  {stages[0]?.phase}
                </div>
              </div>
              <div className="hb-stage">
                <svg viewBox="0 0 560 300" preserveAspectRatio="none">
                  <defs>
                    <radialGradient id="hbSg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#5BC0D8" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#5BC0D8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="280" cy="150" r="150" fill="url(#hbSg)" />
                </svg>
                <div className="hb-scan"></div>
                <div ref={sporesRef}></div>
                <div className="hb-card">
                  <h4>
                    {panel?.cardTitle}
                    <span>{panel?.cardMeta}</span>
                  </h4>
                  <div className="hb-rows">
                    {rows.map((row, i) => (
                      <div className="hb-row" key={i}>
                        <div className="n">
                          <span className={`hb-tag ${row.tagVariant || 'act'}`}>{row.tagLabel}</span>
                          {row.name}
                        </div>
                        <div className="d">{row.dose}</div>
                      </div>
                    ))}
                    <div className="hb-row hb-more">
                      <div className="n">{panel?.moreLabel}</div>
                      <div className="d">{panel?.moreMeta}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hb-foot">
                <div className="hb-note">{panel?.footNote}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
