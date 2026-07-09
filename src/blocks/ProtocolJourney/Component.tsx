'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { useProtocolReveal } from '@/hooks/useProtocolReveal'

type IconKey = 'kit' | 'collect' | 'lab' | 'clock' | 'delivery'
type Step = {
  icon?: IconKey | null
  dayRange?: string | null
  name?: string | null
  description?: string | null
  isPayStep?: boolean | null
  payTagLabel?: string | null
}
type Paygate = { title?: string | null; description?: DefaultTypedEditorState | null }

export type ProtocolJourneyBlockType = {
  blockType?: 'protocolJourney'
  heading?: DefaultTypedEditorState | null
  lede?: string | null
  steps?: Step[] | null
  paygate?: Paygate | null
  underBadge?: string | null
  footnote?: string | null
}

const ICONS: Record<IconKey, React.ReactNode> = {
  kit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8l9-5 9 5v8l-9 5-9-5z"></path>
      <path d="M3 8l9 5 9-5M12 13v8"></path>
    </svg>
  ),
  collect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3"></circle>
      <path d="M9.1 9.1 19 19"></path>
    </svg>
  ),
  lab: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8"></path>
      <path d="M3 22h18"></path>
      <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
      <path d="M9 14h2"></path>
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3a9 9 0 109 9"></path>
      <path d="M12 7v5l3 2"></path>
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <path d="M3 9h18M8 4v5M16 4v5"></path>
    </svg>
  ),
}

export const ProtocolJourneyComponent: React.FC<ProtocolJourneyBlockType> = ({
  heading,
  lede,
  steps,
  paygate,
  underBadge,
  footnote,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  useProtocolReveal(sectionRef, '[data-rv]')

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rail.classList.add('drawn')
            io.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )
    io.observe(rail)
    return () => io.disconnect()
  }, [])

  const list = steps ?? []

  return (
    <section className="pr-journey" id="journey" ref={sectionRef}>
      <style jsx>{`
        .pr-journey {
          position: relative;
          padding: 88px 0;
          background: #f6f9fc;
        }
        .pr-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .pr-journey :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
          margin: 0;
          max-width: 20ch;
        }
        .pr-journey :global(h2 span) {
          color: #0a8fb0;
        }
        .pr-lede {
          font-size: clamp(16px, 1.7vw, 19px);
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.7);
          margin: 18px 0 0;
          max-width: 60ch;
        }

        :global(html.pr-rv-on) .pr-journey [data-rv] {
          opacity: 0;
          transform: translateY(15px);
        }
        :global(html.pr-rv-on) .pr-journey [data-rv].in {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .pr-rail {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          margin-top: 60px;
        }
        .pr-stp {
          position: relative;
          padding: 0 14px;
        }
        .pr-stp::before {
          content: '';
          position: absolute;
          top: 19px;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(10, 143, 176, 0.25);
        }
        .pr-stp:first-child::before {
          left: 50%;
        }
        .pr-stp:last-child::before {
          right: 50%;
        }
        :global(html.pr-rv-on) .pr-rail .pr-stp::before {
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp::before {
          transform: scaleX(1);
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp:nth-child(1)::before {
          transition-delay: 0.05s;
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp:nth-child(2)::before {
          transition-delay: 0.17s;
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp:nth-child(3)::before {
          transition-delay: 0.29s;
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp:nth-child(4)::before {
          transition-delay: 0.41s;
        }
        :global(html.pr-rv-on) .pr-rail.drawn .pr-stp:nth-child(5)::before {
          transition-delay: 0.53s;
        }
        .pr-dot {
          position: relative;
          z-index: 2;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #0a8fb0;
          color: #0a8fb0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .pr-dot :global(svg) {
          width: 19px;
          height: 19px;
        }
        .pr-stp.pay .pr-dot {
          background: #0a8fb0;
          border-color: #0a8fb0;
          color: #fff;
          box-shadow: 0 0 0 5px rgba(10, 143, 176, 0.14);
        }
        .pr-stp-t {
          font-family: ui-monospace, Menlo, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #0a8fb0;
          text-align: center;
          margin-top: 14px;
        }
        .pr-stp-n {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #12314d;
          text-align: center;
          margin-top: 6px;
          letter-spacing: -0.01em;
        }
        .pr-stp-d {
          font-size: 12.5px;
          line-height: 1.45;
          color: rgba(18, 49, 77, 0.55);
          text-align: center;
          margin-top: 6px;
        }
        .pr-paytag {
          position: absolute;
          top: -32px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          font-family: ui-monospace, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0b1e33;
          background: #c6ff5b;
          border-radius: 999px;
          padding: 3px 10px;
        }
        .pr-paytag :global(svg) {
          width: 11px;
          height: 11px;
        }

        .pr-paygate {
          margin-top: 52px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: linear-gradient(180deg, #fff, #f5fafc);
          border: 1px solid rgba(10, 143, 176, 0.28);
          border-radius: 16px;
          padding: 18px 22px;
          box-shadow: 0 20px 46px -38px rgba(14, 39, 56, 0.5);
        }
        .pr-gate-ico {
          flex: none;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: #0a8fb0;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pr-gate-ico :global(svg) {
          width: 20px;
          height: 20px;
        }
        .pr-gate-t {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16.5px;
          color: #12314d;
          margin-top: 5px;
          letter-spacing: -0.01em;
        }
        .pr-gate-d {
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(18, 49, 77, 0.55);
          margin-top: 4px;
          max-width: 64ch;
        }
        .pr-gate-d :global(b),
        .pr-gate-d :global(strong) {
          color: #12314d;
          font-weight: 600;
        }

        .pr-under-wrap {
          margin-top: 38px;
        }
        .pr-under {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #12314d;
          background: #c6ff5b;
          border-radius: 999px;
          padding: 11px 20px;
        }
        .pr-footnote {
          margin-top: 12px;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(18, 49, 77, 0.55);
          max-width: 52ch;
        }

        @media (max-width: 760px) {
          .pr-rail {
            display: block;
            grid-template-columns: none;
            gap: 0;
            margin-top: 34px;
          }
          .pr-stp {
            position: relative;
            display: grid;
            grid-template-columns: 40px 1fr;
            column-gap: 14px;
            text-align: left;
            padding: 0 0 30px;
          }
          .pr-stp::before {
            content: '';
            display: block;
            position: absolute;
            left: 20px;
            right: auto;
            top: 0;
            bottom: 0;
            width: 2px;
            height: auto;
            transform: translateX(-50%);
            background: rgba(10, 143, 176, 0.25);
          }
          .pr-stp:first-child::before {
            top: 22px;
            left: 20px;
            right: auto;
          }
          .pr-stp:last-child::before {
            top: 0;
            bottom: calc(100% - 22px);
            left: 20px;
            right: auto;
          }
          .pr-dot {
            position: relative;
            z-index: 2;
            margin: 2px 0 0;
          }
          .pr-stp-t {
            grid-column: 2;
            text-align: left;
            margin: 4px 0 5px;
          }
          .pr-stp-n {
            grid-column: 2;
            text-align: left;
            margin: 0 0 5px;
          }
          .pr-stp-d {
            grid-column: 2;
            text-align: left;
            margin: 0;
            max-width: 36ch;
          }
          .pr-stp.pay {
            grid-template-columns: 40px auto 1fr;
          }
          .pr-stp.pay::before {
            background: linear-gradient(to bottom, rgba(10, 143, 176, 0.25) 0 22px, #c6ff5b 22px 100%);
          }
          .pr-stp.pay + .pr-stp::before {
            background: #c6ff5b;
          }
          .pr-stp.pay .pr-dot {
            grid-column: 1;
            grid-row: 1;
          }
          .pr-stp.pay .pr-stp-t {
            grid-column: 2;
            grid-row: 1;
            align-self: center;
            margin: 0;
            white-space: nowrap;
          }
          .pr-stp.pay .pr-paytag {
            position: static;
            transform: none;
            grid-column: 3;
            grid-row: 1;
            justify-self: start;
            align-self: center;
            margin: 0 0 0 10px;
          }
          .pr-stp.pay .pr-stp-n {
            grid-column: 2 / 4;
            grid-row: 2;
            margin-top: 6px;
          }
          .pr-stp.pay .pr-stp-d {
            grid-column: 2 / 4;
            grid-row: 3;
          }
          .pr-paygate {
            padding: 16px;
          }
          :global(html.pr-rv-on) .pr-rail .pr-stp::before {
            transform: scaleY(0);
            transform-origin: center top;
          }
          :global(html.pr-rv-on) .pr-rail.drawn .pr-stp::before {
            transform: scaleY(1);
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

        <div className="pr-rail" ref={railRef}>
          {list.map((step, i) => (
            <div className={['pr-stp', step.isPayStep ? 'pay' : ''].join(' ')} data-rv="" key={i}>
              {step.isPayStep && (
                <span className="pr-paytag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="4" y="10" width="16" height="10" rx="2"></rect>
                    <path d="M8 10V7a4 4 0 018 0v3"></path>
                  </svg>
                  {step.payTagLabel}
                </span>
              )}
              <div className="pr-dot">{ICONS[step.icon || 'kit']}</div>
              <div className="pr-stp-t">{step.dayRange}</div>
              <div className="pr-stp-n">{step.name}</div>
              <div className="pr-stp-d">{step.description}</div>
            </div>
          ))}
        </div>

        {paygate?.title && (
          <div className="pr-paygate" data-rv="">
            <div className="pr-gate-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="11" width="16" height="10" rx="2"></rect>
                <path d="M8 11V7a4 4 0 017.4-2"></path>
              </svg>
            </div>
            <div>
              <div className="pr-gate-t">{paygate.title}</div>
              {paygate.description && (
                <div className="pr-gate-d">
                  <RichText data={paygate.description as any} enableGutter={false} enableProse={false} />
                </div>
              )}
            </div>
          </div>
        )}

        {underBadge && (
          <div className="pr-under-wrap" data-rv="">
            <span className="pr-under">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12314D" strokeWidth="2.2">
                <path d="M5 12l5 5L20 7"></path>
              </svg>
              {underBadge}
              <sup style={{ fontWeight: 700 }}>*</sup>
            </span>
            {footnote && (
              <p className="pr-footnote">
                <span style={{ fontWeight: 700 }}>*</span>
                {footnote}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
