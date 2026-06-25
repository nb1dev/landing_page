'use client'

import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'

type Step = {
  week?: string | null
  stepNum?: string | null
  stepLabel?: string | null
  title?: string | null
  iconSvg?: string | null
  isGate?: boolean | null
  calloutLabel?: string | null
  calloutNumber?: string | null
  calloutNumberSuffix?: string | null
  calloutText?: any
}

type Props = {
  heading?: any
  lede?: string | null
  steps?: Step[] | null
}

export const HowItWorksComponent: React.FC<Props> = ({ heading, lede, steps }) => {
  const railRef = useRef<HTMLDivElement>(null)
  const defaultIdx = steps?.findIndex(s => s.isGate) ?? 0
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx < 0 ? 0 : defaultIdx)
  const [swapping, setSwapping] = useState(false)
  const [visible, setVisible] = useState(false)

  const stepCount = steps?.length ?? 0

  const select = (idx: number, animate: boolean) => {
    if (animate) {
      setSwapping(true)
      setTimeout(() => { setSelectedIdx(idx); setSwapping(false) }, 170)
    } else {
      setSelectedIdx(idx)
    }
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(rail)
    return () => obs.disconnect()
  }, [])

  const step = steps?.[selectedIdx]

  // CSS-calc fill: center of col i = (i + 0.5) / N * 100% of rail width
  // fill width from col 0 to col i = i / N * 100% of rail width
  const fillPct = stepCount > 1 ? `calc(${selectedIdx} * 100% / ${stepCount})` : '0%'

  return (
    <>
      <style jsx>{`
        .hiw-sec {
          position: relative;
          background: #FAF8F2;
          padding: 120px 32px;
        }
        @media (max-width: 760px) { .hiw-sec { padding: 72px 22px; } }

        .hiw-in { max-width: 1200px; margin: 0 auto; }

        .hiw-head { max-width: 880px; }
        .hiw-head :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.6vw, 44px);
          line-height: 1.07;
          letter-spacing: -0.03em;
          color: #12314D;
          margin: 0;
        }
        .hiw-head :global(h2 em) { font-style: normal; color: #0A8FB0; }
        .hiw-lede {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(18,49,77,.70);
          max-width: 560px;
          margin-top: 18px;
        }
        @media (max-width: 760px) { .hiw-lede { font-size: 16px; } }

        /* ── Rail ── */
        .gate-rail {
          position: relative;
          display: grid;
          grid-template-columns: repeat(${stepCount}, 1fr);
          margin-top: 76px;
        }

        /* Gray baseline line: spans from center of first col to center of last col */
        .gate-rail::before {
          content: '';
          position: absolute;
          left: calc(50% / ${stepCount});
          right: calc(50% / ${stepCount});
          top: 51px;
          height: 2px;
          background: rgba(18,49,77,.10);
          z-index: 0;
          pointer-events: none;
        }

        /* Teal progress fill: starts at center of first col, width grows per selected step */
        .gate-fill {
          position: absolute;
          left: calc(50% / ${stepCount});
          top: 51px;
          height: 2px;
          width: 0;
          background: #0A8FB0;
          border-radius: 2px;
          z-index: 1;
          transition: width 0.55s cubic-bezier(.4,0,.2,1);
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) { .gate-fill { transition: none; } }
        @media (max-width: 760px) { .gate-rail::before { display: none; } }

        /* ── Nodes ── */
        .gate-node {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .gate-node:focus { outline: none; }
        .gate-day {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(18,49,77,.40);
          margin-bottom: 14px;
        }
        .gate-node.active .gate-day { color: #0A8FB0; }
        .gate-mark {
          position: relative;
          z-index: 2;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid rgba(18,49,77,.10);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 18px;
          transition: border-color .25s ease, background-color .25s ease, box-shadow .25s ease;
        }
        .gate-mark :global(svg) {
          width: 23px; height: 23px;
          fill: none;
          stroke: #0A8FB0;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .gate-node:hover .gate-mark { border-color: #0A8FB0; }
        .gate-node:hover .gate-title { color: #0A8FB0; }
        .gate-node.active .gate-mark { border-color: #0A8FB0; background: #DCEFF4; }
        .gate-node.active .gate-title { color: #0A8FB0; }
        .gate-node.gate-gate .gate-mark {
          background: #fff;
          border-color: #C6FF5B;
          box-shadow: 0 0 0 5px rgba(198,255,91,.22), 0 0 20px rgba(198,255,91,.55);
        }
        .gate-num {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0A8FB0;
          margin-bottom: 8px;
        }
        .gate-title {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          font-weight: 500;
          line-height: 1.35;
          color: #12314D;
          max-width: 16ch;
          transition: color .25s ease;
        }
        .gstar { color: #AAEA42; }

        /* ── Callout panel ── */
        .gate-callout {
          position: relative;
          overflow: hidden;
          margin-top: 60px;
          border-radius: 16px;
          padding: 32px 40px;
          display: flex;
          align-items: center;
          gap: 36px;
          transition: opacity .25s ease;
          background:
            radial-gradient(135% 165% at 90% -30%, rgba(19,166,204,.20) 0%, rgba(19,166,204,.05) 40%, transparent 64%),
            radial-gradient(90% 150% at 6% 120%, rgba(127,208,236,.08) 0%, transparent 50%),
            linear-gradient(158deg, rgba(23,54,81,.97) 0%, rgba(14,39,64,.95) 60%, rgba(11,29,49,.96) 100%);
          border: 1px solid rgba(127,208,236,.22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.14),
            inset 0 -40px 60px -40px rgba(8,24,40,.5),
            0 26px 54px -38px rgba(8,24,40,.6);
        }
        .gate-callout::after {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,228,244,.5), transparent);
          pointer-events: none;
        }
        .gate-callout.swap { opacity: 0; }

        .gate-stamp { flex: none; text-align: center; min-width: 80px; }
        .gate-stamp-l {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #13A6CC;
          margin-bottom: 4px;
        }
        .gate-stamp-n {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 54px;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .gate-stamp-n sup { color: #C6FF5B; font-size: 0.4em; vertical-align: super; }
        .gate-ctext {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,.70);
          flex: 1;
        }
        .gate-ctext :global(strong) { color: #fff; font-weight: 600; }
        .gate-ctext :global(p) { margin: 0; }

        /* ── Mobile: vertical static timeline ── */
        @media (max-width: 760px) {
          .gate-rail {
            display: flex;
            flex-direction: column;
            gap: 0;
            max-width: 460px;
            margin: 40px auto 0;
          }
          .gate-rail::before {
            content: '';
            position: absolute;
            left: 23px;
            top: 38px;
            bottom: 38px;
            width: 2px;
            height: auto;
            right: auto;
            background: rgba(18,49,77,.10);
          }
          .gate-fill { display: none; }
          .gate-node {
            display: grid;
            grid-template-columns: 48px 1fr;
            column-gap: 18px;
            align-items: center;
            text-align: left;
            padding: 13px 0;
            cursor: pointer;
          }
          .gate-node:hover .gate-title { color: #12314D !important; }
          .gate-node:hover .gate-mark { border-color: rgba(18,49,77,.10); }
          .gate-node.active .gate-day { color: rgba(18,49,77,.40); }
          .gate-node.active .gate-title { color: #12314D; }
          .gate-mark { grid-column: 1; grid-row: 1 / span 3; margin: 0; }
          .gate-day { grid-column: 2; grid-row: 1; margin: 0 0 3px; }
          .gate-num { grid-column: 2; grid-row: 2; }
          .gate-title { grid-column: 2; grid-row: 3; margin-top: 4px; max-width: none; }
          .gate-callout { margin-top: 34px; padding: 24px 22px; flex-direction: column; align-items: center; gap: 16px; }
          .gate-stamp { text-align: center; width: 100%; }
          .gate-stamp-n { font-size: 42px; }
        }

        /* ── Scroll-in ── */
        .r-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1);
        }
        .r-up.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .r-up { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <section className="hiw-sec" data-screen-label="How it works">
        <div className="hiw-in">

          <div className={`hiw-head r-up${visible ? ' in' : ''}`}>
            {heading && <RichText data={heading} enableGutter={false} enableProse={false} />}
            {lede && <p className="hiw-lede">{lede}</p>}
          </div>

          {steps && steps.length > 0 && (
            <div ref={railRef} className="gate-rail">
              {/* Teal progress fill — width driven by CSS calc via inline style */}
              <div
                className="gate-fill"
                style={{ width: fillPct }}
                aria-hidden="true"
              />

              {steps.map((s, i) => {
                const isActive = i === selectedIdx
                const isGate = !!s.isGate
                let cls = `gate-node r-up${visible ? ' in' : ''}`
                if (isActive) cls += ' active'
                if (isGate) cls += ' gate-gate'

                return (
                  <div
                    key={i}
                    className={cls}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive ? 'true' : 'false'}
                    aria-label={s.calloutLabel || s.stepLabel || ''}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                    onClick={() => { if (i !== selectedIdx) select(i, true) }}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true) } }}
                  >
                    <div className="gate-day">
                      {s.week}{isGate && <span className="gstar"> ★</span>}
                    </div>
                    <div className="gate-mark">
                      {s.iconSvg && (
                        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: s.iconSvg }} />
                      )}
                    </div>
                    <div className="gate-num">{s.stepNum} · {s.stepLabel}</div>
                    <div className="gate-title">{s.title}</div>
                  </div>
                )
              })}
            </div>
          )}

          {step && (
            <div className={`gate-callout r-up${visible ? ' in' : ''}${swapping ? ' swap' : ''}`}>
              <div className="gate-stamp">
                <div className="gate-stamp-l">{step.calloutLabel}</div>
                <div className="gate-stamp-n">
                  {step.calloutNumber}
                  {step.calloutNumberSuffix && <sup>{step.calloutNumberSuffix}</sup>}
                </div>
              </div>
              <div className="gate-ctext">
                {step.calloutText && (
                  <RichText data={step.calloutText} enableGutter={false} enableProse={false} />
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
