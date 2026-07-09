'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { useProtocolReveal } from '@/hooks/useProtocolReveal'

type Track = { name?: string | null; badge?: string | null; copy?: string | null }
type Milestone = { label?: string | null; month?: string | null; muted?: boolean | null }

export type ProtocolLivingLifelineBlockType = {
  blockType?: 'protocolLivingLifeline'
  heading?: DefaultTypedEditorState | null
  lede?: string | null
  originLabel?: string | null
  core?: Track | null
  advanced?: Track | null
  milestones?: Milestone[] | null
  compareLabel?: string | null
  compareUrl?: string | null
}

export const ProtocolLivingLifelineComponent: React.FC<ProtocolLivingLifelineBlockType> = ({
  heading,
  lede,
  originLabel,
  core,
  advanced,
  milestones,
  compareLabel,
  compareUrl,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  useProtocolReveal(sectionRef, '[data-rv]')

  const stageRef = useRef<HTMLDivElement | null>(null)
  const diaRef = useRef<HTMLDivElement | null>(null)
  const sporesRef = useRef<SVGGElement | null>(null)

  const ms = milestones ?? []
  const m1 = ms[0]
  const m2 = ms[1]
  const m3 = ms[2]

  // Ported verbatim from the mockup's ll-spores/ll-dia script: decorative
  // particle field around the shared origin, exact path lengths computed at
  // runtime (not hardcoded) so the stroke-draw-in never clips, and the whole
  // fixed 1120x462 diagram is scaled via transform to fit its container.
  useEffect(() => {
    const g = sporesRef.current
    if (g) {
      let seed = 7
      const rnd = () => {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
      }
      const ox = 64
      const oy = 205
      const svgns = 'http://www.w3.org/2000/svg'
      for (let i = 0; i < 120; i++) {
        const ang = rnd() * Math.PI * 2
        const dist = Math.pow(rnd(), 1.7) * 440
        const x = ox + Math.cos(ang) * dist * 1.4
        const y = oy + Math.sin(ang) * dist * 0.7
        if (x < -30 || x > 1140 || y < 20 || y > 400) continue
        const near = 1 - Math.min(dist / 440, 1)
        const len = 1.5 + rnd() * 4
        const rot = rnd() * 180
        const el = document.createElementNS(svgns, 'line')
        el.setAttribute('x1', String(x))
        el.setAttribute('y1', String(y))
        el.setAttribute('x2', String(x + Math.cos(rot) * len))
        el.setAttribute('y2', String(y + Math.sin(rot) * len))
        el.setAttribute('stroke', rnd() > 0.5 ? '#0A8FB0' : '#12314D')
        el.setAttribute('stroke-width', '1.4')
        el.setAttribute('stroke-linecap', 'round')
        el.setAttribute('class', 'll-spore')
        el.style.setProperty('--so', (0.05 + near * 0.22).toFixed(2))
        g.appendChild(el)
      }
    }

    const stage = stageRef.current
    const dia = diaRef.current
    if (dia) {
      dia.querySelectorAll<SVGPathElement>('path.ll-draw').forEach((p) => {
        try {
          p.style.setProperty('--len', String(Math.ceil(p.getTotalLength()) + 2))
        } catch {
          // ignore
        }
      })
    }

    if (stage && dia) {
      const fit = () => {
        const s = Math.min(1, stage.clientWidth / 1120)
        dia.style.transform = `scale(${s})`
        stage.style.height = `${462 * s}px`
      }
      fit()
      let ro: ResizeObserver | null = null
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(fit)
        ro.observe(stage)
      } else {
        window.addEventListener('resize', fit)
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              dia.classList.add('ll-animate')
              io.disconnect()
            }
          })
        },
        { threshold: 0.28 },
      )
      io.observe(dia)
      return () => {
        ro?.disconnect()
        window.removeEventListener('resize', fit)
        io.disconnect()
      }
    }
  }, [])

  return (
    <section className="pll-sec" id="plans" ref={sectionRef}>
      <style jsx>{`
        .pll-sec {
          position: relative;
          padding: 88px 0;
          background: #f6f9fc;
        }
        .pr-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .pll-sec :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
          margin: 0;
          max-width: 20ch;
        }
        .pll-sec :global(h2 em) {
          font-style: normal;
          color: #0a8fb0;
        }
        .pr-lede {
          font-size: clamp(16px, 1.7vw, 19px);
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.7);
          margin: 18px 0 0;
          max-width: 52ch;
        }

        :global(html.pr-rv-on) .pll-sec [data-rv] {
          opacity: 0;
          transform: translateY(15px);
        }
        :global(html.pr-rv-on) .pll-sec [data-rv].in {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .ll-stage {
          position: relative;
          margin-top: 52px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%);
        }
        .ll-diagram {
          position: relative;
          width: 1120px;
          height: 462px;
          transform-origin: top left;
        }
        .ll-diagram :global(svg) {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 410px;
          overflow: visible;
        }
        .ll-lab {
          position: absolute;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .ll-diagram.ll-animate .ll-lab {
          opacity: 1;
          transform: translateY(0);
        }
        .ll-diagram.ll-animate .ll-lab.d1 {
          transition-delay: 0.15s;
        }
        .ll-diagram.ll-animate .ll-lab.d2 {
          transition-delay: 0.9s;
        }
        .ll-diagram.ll-animate .ll-lab.d3 {
          transition-delay: 1.5s;
        }
        .ll-diagram.ll-animate .ll-lab.d4 {
          transition-delay: 2s;
        }
        .ll-diagram.ll-animate .ll-lab.d5 {
          transition-delay: 2.5s;
        }
        .ll-track-name {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 23px;
          letter-spacing: -0.02em;
          color: #12314d;
        }
        .ll-track-name.adv {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ll-track-copy {
          font-size: 14.5px;
          line-height: 1.5;
          color: rgba(18, 49, 77, 0.55);
          max-width: 300px;
          margin-top: 7px;
        }
        .ll-badge {
          font-family: ui-monospace, Menlo, monospace;
          background: #c6ff5b;
          color: #12314d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 100px;
          white-space: nowrap;
        }
        .ll-o-s {
          font-size: 12px;
          color: rgba(18, 49, 77, 0.55);
          line-height: 1.35;
        }
        .ll-ncap {
          font-size: 13px;
          color: #12314d;
          font-weight: 600;
          line-height: 1.25;
          width: 130px;
        }
        .ll-ncap .w {
          display: block;
          font-size: 11.5px;
          color: rgba(18, 49, 77, 0.4);
          font-weight: 600;
          margin-top: 3px;
        }
        .ll-ncap.muted {
          color: rgba(18, 49, 77, 0.4);
          font-weight: 500;
        }

        :global(.ll-draw) {
          stroke-dasharray: var(--len);
          stroke-dashoffset: var(--len);
        }
        .ll-diagram.ll-animate :global(.ll-draw) {
          transition: stroke-dashoffset 1.8s cubic-bezier(0.5, 0, 0.2, 1);
          stroke-dashoffset: 0;
        }
        .ll-diagram.ll-animate :global(.ll-draw.slow) {
          transition-duration: 2.2s;
        }
        :global(.ll-dot) {
          opacity: 0;
          transition: opacity 1s ease;
        }
        .ll-diagram.ll-animate :global(.ll-dot) {
          opacity: 1;
          transition-delay: 1.2s;
        }
        :global(.ll-node) {
          opacity: 0;
          transform: scale(0.5);
          transform-box: fill-box;
          transform-origin: center;
          transition:
            opacity 0.5s ease,
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ll-diagram.ll-animate :global(.ll-node) {
          opacity: 1;
          transform: scale(1);
        }
        .ll-diagram.ll-animate :global(.ll-node.n1) {
          transition-delay: 1s;
        }
        .ll-diagram.ll-animate :global(.ll-node.n2) {
          transition-delay: 1.6s;
        }
        .ll-diagram.ll-animate :global(.ll-node.n3) {
          transition-delay: 2.2s;
        }
        :global(.ll-halo) {
          opacity: 0;
          transition: opacity 1s ease;
        }
        .ll-diagram.ll-animate :global(.ll-halo) {
          opacity: 1;
        }
        .ll-diagram.ll-animate :global(.ll-halo.h1) {
          transition-delay: 1.1s;
        }
        .ll-diagram.ll-animate :global(.ll-halo.h2) {
          transition-delay: 1.7s;
        }
        :global(.ll-spore),
        :global(.ll-tick) {
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ll-diagram.ll-animate :global(.ll-spore) {
          opacity: var(--so);
          transition-delay: 0.2s;
        }
        .ll-diagram.ll-animate :global(.ll-tick) {
          opacity: 1;
          transition-delay: 0.6s;
        }

        .ll-m {
          display: none;
        }
        .ll-compare {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 34px;
          font-size: 15px;
          font-weight: 600;
          color: #0a8fb0;
          text-decoration: none;
        }
        .ll-compare :global(svg) {
          width: 16px;
          height: 16px;
          position: static;
          transition: transform 0.18s ease;
        }
        .ll-compare:hover {
          color: #0a6e8a;
        }
        .ll-compare:hover :global(svg) {
          transform: translateX(3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .ll-lab,
          :global(.ll-draw),
          :global(.ll-node),
          :global(.ll-halo),
          :global(.ll-spore),
          :global(.ll-tick) {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
          :global(.ll-spore) {
            opacity: var(--so) !important;
          }
        }

        @media (max-width: 760px) {
          .ll-stage {
            display: none;
          }
          .ll-m {
            display: block;
            margin-top: 30px;
          }
          .ll-m-origin {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            font-size: 13.5px;
            font-weight: 600;
            color: rgba(18, 49, 77, 0.7);
            background: rgba(10, 143, 176, 0.06);
            border: 1px solid rgba(10, 143, 176, 0.16);
            padding: 9px 15px;
            border-radius: 100px;
          }
          .ll-m-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #12314d;
            box-shadow: 0 0 0 4px rgba(63, 176, 206, 0.18);
            flex: none;
          }
          .ll-m-card {
            margin-top: 16px;
            padding: 20px;
            border-radius: 16px;
            background: #fff;
            border: 1px solid rgba(18, 49, 77, 0.1);
          }
          .ll-m-card.adv {
            border-color: rgba(10, 143, 176, 0.28);
            background: linear-gradient(180deg, #fff, rgba(10, 143, 176, 0.04));
          }
          .ll-m-h {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
            font-family: 'Instrument Sans', 'Inter', sans-serif;
            font-weight: 600;
            font-size: 22px;
            letter-spacing: -0.02em;
            color: #12314d;
          }
          .ll-m-copy {
            font-size: 14.5px;
            line-height: 1.55;
            color: rgba(18, 49, 77, 0.55);
            margin: 9px 0 0;
          }
          .ll-m-tl {
            margin-top: 16px;
            padding-left: 2px;
            border-left: 2px solid rgba(10, 143, 176, 0.22);
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .ll-m-step {
            position: relative;
            padding-left: 18px;
            font-size: 14px;
            font-weight: 600;
            color: #12314d;
          }
          .ll-m-step::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 16px;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #0a8fb0;
          }
          .ll-m-step.muted {
            color: rgba(18, 49, 77, 0.4);
            font-weight: 500;
          }
          .ll-m-step.muted::before {
            background: #fff;
            border: 2px solid #0a8fb0;
            left: -7px;
          }
          .ll-m-mo {
            display: block;
            font-size: 11.5px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #0a8fb0;
            margin-bottom: 1px;
          }
        }
      `}</style>

      <div className="pr-wrap">
        {heading && (
          <div data-rv="">
            <RichText data={heading as any} enableGutter={false} enableProse={false} />
          </div>
        )}
        {lede && (
          <p className="pr-lede" data-rv="">
            {lede}
          </p>
        )}

        <div className="ll-stage" data-rv="" ref={stageRef}>
          <div className="ll-diagram" ref={diaRef}>
            <svg viewBox="0 0 1120 410" preserveAspectRatio="none">
              <defs>
                <radialGradient id="ll-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3FB0CE" stopOpacity="0.2" />
                  <stop offset="55%" stopColor="#3FB0CE" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#3FB0CE" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ll-advline" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0A6E8A" />
                  <stop offset="45%" stopColor="#0A8FB0" />
                  <stop offset="100%" stopColor="#3FB0CE" />
                </linearGradient>
                <filter id="ll-soft" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>

              <circle cx="64" cy="205" r="150" fill="url(#ll-glow)" />
              <g ref={sporesRef}></g>

              {/* CORE line */}
              <path className="ll-draw slow" style={{ ['--len' as any]: 960 }} d="M64 205 C 120 155 150 112 210 112 L 1040 112" fill="none" stroke="#A9C2D2" strokeWidth="1.6" />
              <circle className="ll-node" cx="1040" cy="112" r="4.5" fill="#A9C2D2" />
              <circle className="ll-node" cx="1058" cy="112" r="3" fill="#A9C2D2" opacity="0.5" />
              <g stroke="#C2D2DE" strokeWidth="1.6">
                <line className="ll-tick" x1="360" y1="106" x2="360" y2="118" />
                <line className="ll-tick" x1="470" y1="106" x2="470" y2="118" />
                <line className="ll-tick" x1="580" y1="106" x2="580" y2="118" />
                <line className="ll-tick" x1="690" y1="106" x2="690" y2="118" />
                <line className="ll-tick" x1="800" y1="106" x2="800" y2="118" />
                <line className="ll-tick" x1="910" y1="106" x2="910" y2="118" />
              </g>

              {/* ADVANCED line */}
              <path className="ll-draw" style={{ ['--len' as any]: 520 }} d="M64 205 C 120 255 150 298 210 298 L 690 298" fill="none" stroke="url(#ll-advline)" strokeWidth="3" />
              <path className="ll-dot" d="M690 298 L 1060 298" fill="none" stroke="#3FB0CE" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />

              <circle className="ll-halo h1" cx="470" cy="298" r="26" fill="#E8B53A" filter="url(#ll-soft)" opacity="0.28" />
              <circle className="ll-halo h2" cx="690" cy="298" r="28" fill="#0A8FB0" filter="url(#ll-soft)" opacity="0.28" />

              <circle className="ll-node n1" cx="470" cy="298" r="15" fill="#E8B53A" />
              <circle className="ll-node n2" cx="690" cy="298" r="17" fill="#12314D" />
              <circle className="ll-node n3" cx="910" cy="298" r="9" fill="none" stroke="#3FB0CE" strokeWidth="2" />

              {/* shared origin */}
              <circle cx="64" cy="205" r="36" fill="#12314D" />
              <circle cx="64" cy="205" r="36" fill="none" stroke="#3FB0CE" strokeWidth="1" opacity="0.4" />
              <g transform="translate(64 205) scale(1.12) translate(-12 -12)" stroke="#5BC0D8" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18h8"></path>
                <path d="M3 22h18"></path>
                <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
                <path d="M9 14h2"></path>
                <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
                <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
              </g>
            </svg>

            <div className="ll-lab d1" style={{ left: 0, top: 258, width: 158, textAlign: 'center' }}>
              <div className="ll-o-s">{originLabel}</div>
            </div>

            <div className="ll-lab d2" style={{ left: 210, top: 2 }}>
              <div className="ll-track-name">{core?.name}</div>
              <div className="ll-track-copy">{core?.copy}</div>
            </div>

            <div className="ll-lab d2" style={{ left: 210, top: 336 }}>
              <div className="ll-track-name adv">
                {advanced?.name} <span className="ll-badge">{advanced?.badge}</span>
              </div>
              <div className="ll-track-copy">{advanced?.copy}</div>
            </div>

            {m1 && (
              <div className="ll-lab ll-ncap d3" style={{ left: 410, top: 228, textAlign: 'center' }}>
                {m1.label}
                <span className="w">{m1.month}</span>
              </div>
            )}
            {m2 && (
              <div className="ll-lab ll-ncap d4" style={{ left: 628, top: 228, textAlign: 'center' }}>
                {m2.label}
                <span className="w">{m2.month}</span>
              </div>
            )}
            {m3 && (
              <div className="ll-lab ll-ncap muted d5" style={{ left: 855, top: 236, textAlign: 'center' }}>
                {m3.label}
              </div>
            )}
          </div>
        </div>

        <div className="ll-m" data-rv="">
          <div className="ll-m-origin">
            <span className="ll-m-dot"></span>
            {originLabel}
          </div>
          <div className="ll-m-card">
            <div className="ll-m-h">{core?.name}</div>
            <p className="ll-m-copy">{core?.copy}</p>
          </div>
          <div className="ll-m-card adv">
            <div className="ll-m-h">
              {advanced?.name} <span className="ll-badge">{advanced?.badge}</span>
            </div>
            <p className="ll-m-copy">{advanced?.copy}</p>
            <div className="ll-m-tl">
              {m1 && (
                <div className="ll-m-step">
                  <span className="ll-m-mo">{m1.month}</span>
                  {m1.label}
                </div>
              )}
              {m2 && (
                <div className="ll-m-step">
                  <span className="ll-m-mo">{m2.month}</span>
                  {m2.label}
                </div>
              )}
              {m3 && (
                <div className="ll-m-step muted">
                  <span className="ll-m-mo">Ongoing</span>
                  {m3.label}
                </div>
              )}
            </div>
          </div>
        </div>

        {compareLabel && (
          <a className="ll-compare" href={compareUrl || '#'}>
            {compareLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </a>
        )}
      </div>
    </section>
  )
}
