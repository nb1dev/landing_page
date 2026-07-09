'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { useReveal } from '@/hooks/useReveal'

type Card = {
  iconSvg?: string | null
  name?: string | null
  tag?: string | null
  body?: string | null
  badgeLabel?: string | null
  badgeVariant?: 'plan' | 'advanced' | null
  highlighted?: boolean | null
}

export type LabReadsBlockType = {
  blockType?: 'labReads'
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  cards?: Card[] | null
  formulaNodeLabel?: string | null
  closingLeadIn?: string | null
  closingEmphasis?: string | null
}

type LinePath = { d: string; stroke: string; strokeWidth: number; cx: number; r: number; dot: string }

export const LabReadsComponent: React.FC<LabReadsBlockType> = ({
  eyebrow,
  heading,
  cards,
  formulaNodeLabel,
  closingLeadIn,
  closingEmphasis,
}) => {
  const rows = useMemo(() => cards ?? [], [cards])
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const sectionRef = useRef<HTMLElement | null>(null)
  useReveal(sectionRef, '.eyebrow, h2')
  const [viewBox, setViewBox] = useState('0 0 0 0')
  const [lines, setLines] = useState<LinePath[]>([])
  const [go, setGo] = useState(false)

  const draw = useCallback(() => {
    const wrap = wrapRef.current
    const node = nodeRef.current
    if (!wrap || !node) return
    const wr = wrap.getBoundingClientRect()
    const w = wr.width
    const h = wr.height
    if (w < 2) return
    setViewBox(`0 0 ${w} ${h}`)
    const nr = node.getBoundingClientRect()
    const nx = nr.left + nr.width / 2 - wr.left
    const ny = nr.top - wr.top

    const next: LinePath[] = cardRefs.current
      .filter((el): el is HTMLDivElement => !!el)
      .map((el, i) => {
        const cr = el.getBoundingClientRect()
        const cx = cr.left + cr.width / 2 - wr.left
        const isGut = !!rows[i]?.highlighted
        const col = isGut ? 'var(--t3, #0A8FB0)' : '#C2D6E2'
        const sw = isGut ? 2.6 : 2
        const r = isGut ? 5.5 : 4.5
        const d = `M${cx} 3 C ${cx} ${(ny * 0.62).toFixed(1)} ${nx} ${(ny * 0.42).toFixed(1)} ${nx} ${ny.toFixed(1)}`
        return { d, stroke: col, strokeWidth: sw, cx, r, dot: isGut ? 'var(--t3, #0A8FB0)' : '#A9B7C2' }
      })
    setLines(next)
  }, [rows])

  useEffect(() => {
    const raf = requestAnimationFrame(draw)
    const onLoad = () => draw()
    const onResize = () => requestAnimationFrame(draw)
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', onResize)
    const t1 = setTimeout(draw, 250)
    const t2 = setTimeout(draw, 650)

    let observer: IntersectionObserver | null = null
    if (wrapRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setGo(true)
              observer?.disconnect()
            }
          })
        },
        { threshold: 0.3 },
      )
      observer.observe(wrapRef.current)
    } else {
      setGo(true)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', onResize)
      clearTimeout(t1)
      clearTimeout(t2)
      observer?.disconnect()
    }
  }, [draw])

  return (
    <section
      className="lab-reads"
      id="reads"
      style={{ scrollMarginTop: 80, background: '#fff' }}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <style jsx>{`
        .lab-reads {
          --bg: #f3f6f9;
          --card: #ffffff;
          --border: rgba(18, 49, 77, 0.1);
          --ink: #12314d;
          --ink-soft: rgba(18, 49, 77, 0.7);
          --ink-faint: rgba(18, 49, 77, 0.48);
          --t3: #0a8fb0;
          --t4: #3e96be;
          --accent: #0a8fb0;
          --muted: #a9b7c2;
          --lime: #c4f23e;
          --gold-bg: #fbefd2;
          --gold-ink: #a97d14;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          color: var(--ink);
          padding: 70px 0 86px;
        }
        .wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--t3);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .eyebrow::before {
          content: '';
          width: 30px;
          height: 1.5px;
          background: var(--t3);
        }
        .lab-reads :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(32px, 4.4vw, 52px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          max-width: 20ch;
          margin: 18px 0 0;
          color: var(--ink);
        }
        .reads-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1fr;
          gap: 16px;
          margin-top: 34px;
          align-items: stretch;
        }
        .rl {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px 24px 20px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .rl.flag {
          background: linear-gradient(165deg, #e7f3fa, #f2f9fc);
          border-color: #c5e1ef;
          box-shadow: 0 16px 40px -28px rgba(10, 143, 176, 0.55);
        }
        .rl-ic {
          color: var(--t4);
          margin-bottom: 14px;
          height: 26px;
        }
        .rl-ic :global(svg) {
          width: 26px;
          height: 26px;
        }
        .rl.flag .rl-ic {
          color: var(--accent);
        }
        .rl-head {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .rl-name {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .rl.flag .rl-name {
          font-size: 21px;
        }
        .rl-flagtag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink);
          background: var(--lime);
          padding: 4px 9px;
          border-radius: 999px;
        }
        .rl-body {
          font-size: 14px;
          line-height: 1.5;
          color: var(--ink-soft);
          margin-bottom: 14px;
        }
        .rl.flag .rl-body {
          font-size: 14.5px;
          color: #39515f;
        }
        .badge {
          display: inline-block;
          align-self: flex-start;
          margin-top: auto;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
        }
        .badge.b-plan {
          background: #edf0f3;
          color: rgba(18, 49, 77, 0.62);
        }
        .badge.b-adv {
          background: var(--gold-bg);
          color: var(--gold-ink);
        }
        .payoff {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .converge2 {
          position: relative;
          width: 100%;
          height: 104px;
        }
        .cv-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }
        .cv-svg :global(.cv-line) {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .converge2.cv-go :global(.cv-line) {
          animation: cvDraw 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .converge2.cv-go :global(.cv-line:nth-of-type(2)) {
          animation-delay: 0.1s;
        }
        .converge2.cv-go :global(.cv-line:nth-of-type(3)) {
          animation-delay: 0.2s;
        }
        @keyframes cvDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cv-svg :global(.cv-line) {
            stroke-dashoffset: 0;
          }
          .converge2.cv-go :global(.cv-line) {
            animation: none;
          }
        }
        .cv-node {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #fff;
          border: 1px solid #c5e1ef;
          border-radius: 999px;
          padding: 10px 20px 10px 15px;
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          white-space: nowrap;
          box-shadow: 0 12px 30px -16px rgba(10, 143, 176, 0.55);
        }
        .cv-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--t3);
          flex: none;
        }
        .rule {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(24px, 3.4vw, 38px);
          line-height: 1.16;
          letter-spacing: -0.02em;
          margin-top: 20px;
          max-width: 22ch;
          color: var(--ink);
        }
        .rule b {
          font-weight: 600;
          color: var(--accent);
        }
        @media (max-width: 860px) {
          .wrap {
            padding: 0 20px;
          }
          .reads-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="wrap">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}

        <div className="reads-grid">
          {rows.map((card, i) => (
            <div
              key={i}
              className={['rl', card.highlighted ? 'flag' : ''].join(' ')}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
            >
              {card.iconSvg && (
                <div className="rl-ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: card.iconSvg }}
                  />
                </div>
              )}
              <div className="rl-head">
                <span className="rl-name">{card.name}</span>
                {card.tag && <span className="rl-flagtag">{card.tag}</span>}
              </div>
              {card.body && <div className="rl-body">{card.body}</div>}
              {card.badgeLabel && (
                <span className={['badge', card.badgeVariant === 'advanced' ? 'b-adv' : 'b-plan'].join(' ')}>
                  {card.badgeLabel}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="payoff">
          <div className={['converge2', go ? 'cv-go' : ''].join(' ')} ref={wrapRef}>
            <svg className="cv-svg" viewBox={viewBox} aria-hidden="true">
              {lines.map((line, i) => (
                <React.Fragment key={i}>
                  <path
                    className="cv-line"
                    pathLength={1}
                    d={line.d}
                    fill="none"
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                  />
                  <circle cx={line.cx} cy={3} r={line.r} fill={line.dot} />
                </React.Fragment>
              ))}
            </svg>
            <div className="cv-node" ref={nodeRef}>
              <span className="cv-dot" />
              {formulaNodeLabel}
            </div>
          </div>
          {(closingLeadIn || closingEmphasis) && (
            <p className="rule">
              {closingLeadIn} {closingEmphasis && <b>{closingEmphasis}</b>}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
