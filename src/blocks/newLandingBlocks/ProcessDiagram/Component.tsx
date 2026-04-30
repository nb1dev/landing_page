'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'light' | 'dark' | 'darkNavy' | 'teal' | 'white' | 'custom'

const LIGHT_BG = '#FFFFFF'
const DARK_BG = 'linear-gradient(180deg,#FAF8F2 0%,#F5F3ED 100%)'

function isDarkPreset(preset?: BgColorPreset | null) {
  return preset === 'dark' || preset === 'darkNavy' || preset === 'teal'
}

function resolveBg(preset?: BgColorPreset | null, custom?: string | null) {
  if (!preset || preset === 'light') return LIGHT_BG
  if (preset === 'white') return '#FFFFFF'
  if (preset === 'custom') return custom || LIGHT_BG
  if (isDarkPreset(preset)) return DARK_BG
  return LIGHT_BG
}

type MediaLike = {
  url?: string | null
  alt?: string | null
}

type MockRow = {
  label?: string | null
  percentage?: number | null
  status?: 'ok' | 'low' | null
}

type ListItem = {
  marker?: string | null
  text?: string | null
  dose?: string | null
  benefit?: string | null
}

type Step = {
  number?: string | null
  timelineEyebrow?: string | null
  timelineName?: string | null
  panelTag?: string | null
  panelHeading?: string | null
  panelBody?: string | null
  visualType?: 'image' | 'mockReport' | null
  image?: MediaLike | string | null
  imageUrl?: string | null
  imageAlt?: string | null
  mockEyebrow?: string | null
  mockRows?: MockRow[] | null
  mockFootLabel?: string | null
  mockFootText?: string | null
  listItems?: ListItem[] | null
  pills?: Array<{ label?: string | null }> | null
}

type Variant = {
  variantKey: string
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
}

export type ProcessDiagramBlockType = {
  blockName?: string
  blockType?: 'processDiagram'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  steps?: Step[] | null
  variants?: Variant[] | null
}

function getUploadUrl(image?: MediaLike | string | null) {
  if (!image || typeof image === 'string') return ''
  return image.url ? getMediaUrl(image.url) : ''
}

export const ProcessDiagramComponent: React.FC<ProcessDiagramBlockType> = (props) => {
  const { backgroundColor, backgroundColorCustom, eyebrow, heading, steps, variants } = props

  const rootRef = useRef<HTMLElement | null>(null)
  const [variantKey, setVariantKey] = useState('')
  const [activeStep, setActiveStep] = useState(1)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setVariantKey(params.get('v') ?? '')
  }, [])

  const activeVariant = variants?.find((variant) => variant.variantKey === variantKey) ?? null

  const effectiveBgPreset = activeVariant?.backgroundColor ?? backgroundColor
  const effectiveBgCustom = activeVariant?.backgroundColorCustom ?? backgroundColorCustom
  const resolvedBg = resolveBg(effectiveBgPreset, effectiveBgCustom)

  const resolvedEyebrow = activeVariant?.eyebrow ?? eyebrow
  const resolvedHeading = activeVariant?.heading ?? heading

  const safeSteps = useMemo(() => (steps && steps.length ? steps.slice(0, 3) : []), [steps])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.1, rootMargin: '-40px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!safeSteps.length) return

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current >= safeSteps.length ? 1 : current + 1))
    }, 5200)

    return () => window.clearInterval(interval)
  }, [safeSteps.length])

  if (!safeSteps.length) return null

  return (
    <section ref={rootRef} style={{ background: resolvedBg }} className="diagram">
      <style jsx>{`
        @keyframes dxProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes dxFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dxFill {
          from {
            width: 0%;
          }
          to {
            width: var(--w, 0%);
          }
        }

        @keyframes dxPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        .diagram {
          padding: 5rem 1.5rem 4rem;
          position: relative;
          overflow: hidden;
          color: #12314d;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        }

        .diagram-glow1,
        .diagram-glow2,
        .diagram-grid {
          display: none;
        }

        .diagram-inner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
        }

        .diagram-head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 3rem;
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 0.9s ease,
            transform 0.9s ease;
        }

        .diagram-head.in {
          opacity: 1;
          transform: translateY(0);
        }

        .diagram-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin-bottom: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
        }

        .diagram-eyebrow::before,
        .diagram-eyebrow::after {
          content: '';
          width: 32px;
          height: 1px;
          background: #0a8fb0;
        }

        .diagram-h :global(h2),
        .diagram-h :global(h3),
        .diagram-h :global(p) {
          margin: 0;
          font-family:
            'Instrument Sans',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: clamp(1.7rem, 2.6vw, 2.1rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #12314d;
        }

        .diagram-h :global(*) {
          font-family:
            'Instrument Sans',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif !important;
          font-weight: 500 !important;
        }

        .diagram-h :global(.ac),
        .diagram-h :global(span[style*='color']) {
          color: #0a8fb0 !important;
        }

        /* ── Stage ── */
        .dx-stage {
          max-width: 1080px;
          margin: 1rem auto 0;
          padding: 0 1rem;
        }

        /* ── Timeline ── */
        .dx-timeline {
          display: grid;
          grid-template-columns: auto 1fr auto 1fr auto;
          align-items: center;
          gap: 0;
          margin-bottom: 2.5rem;
          padding: 0;
        }

        .dx-step {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
          text-align: center;
          color: rgba(18, 49, 77, 0.65);
          transition: color 0.25s;
          min-width: 160px;
        }

        .dx-step-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          transition:
            background 0.3s,
            border-color 0.3s,
            box-shadow 0.3s,
            transform 0.3s;
        }

        .dx-step-num {
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(18, 49, 77, 0.65);
          transition: color 0.3s;
          font-variant-numeric: tabular-nums;
        }

        .dx-step-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0a8fb0;
          opacity: 0;
          transform: scale(0.5);
          transition:
            opacity 0.3s,
            transform 0.3s;
        }

        .dx-step-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }

        .dx-step-eyebrow {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a8fb0;
          opacity: 0.65;
          transition: opacity 0.3s;
          text-align: center;
        }

        .dx-step-name {
          font-family:
            'Instrument Sans',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #12314d;
          letter-spacing: -0.005em;
          line-height: 1.3;
          min-height: 2.6em;
          display: flex;
          align-items: center;
          text-align: center;
        }

        .dx-step:hover .dx-step-marker {
          border-color: rgba(10, 143, 176, 0.4);
        }

        .dx-step-active .dx-step-marker {
          background: #0a8fb0;
          border-color: #0a8fb0;
          box-shadow:
            0 0 0 6px rgba(10, 143, 176, 0.1),
            0 4px 16px rgba(10, 143, 176, 0.25);
        }

        .dx-step-active .dx-step-num {
          color: #ffffff;
        }

        .dx-step-active .dx-step-eyebrow {
          opacity: 1;
        }

        .dx-step-active .dx-step-name {
          color: #12314d;
          font-weight: 600;
        }

        /* ── Track (static decorative line between steps) ── */
        .dx-track {
          height: 2px;
          background: rgba(18, 49, 77, 0.08);
          border-radius: 1px;
          position: relative;
          margin: 0 -0.5rem;
          align-self: start;
          margin-top: 30px;
        }

        /* ── Step progress bar (animated line under each active step) ── */
        .dx-step-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.9rem;
          height: 2px;
          overflow: hidden;
          background: rgba(18, 49, 77, 0.08);
          border-radius: 999px;
        }

        .dx-step-progress-fill {
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: left;
          transform: scaleX(0);
          background: #0a8fb0;
          border-radius: inherit;
        }

        .dx-step-active .dx-step-progress-fill {
          animation: dxProgress 5.2s linear forwards;
        }

        /* ── Card ── */
        .dx-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          box-shadow:
            0 1px 2px rgba(18, 49, 77, 0.04),
            0 8px 24px rgba(18, 49, 77, 0.06),
            0 24px 56px -12px rgba(18, 49, 77, 0.1),
            0 0 0 1px rgba(18, 49, 77, 0.07);
          overflow: hidden;
          min-height: 480px;
        }

        .dx-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(10, 143, 176, 0.45) 50%,
            transparent 100%
          );
          z-index: 2;
        }

        .dx-panel {
          display: none;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          animation: dxFade 0.4s ease;
        }

        .dx-card[data-active-step='1'] .dx-panel[data-panel='1'],
        .dx-card[data-active-step='2'] .dx-panel[data-panel='2'],
        .dx-card[data-active-step='3'] .dx-panel[data-panel='3'] {
          display: grid;
        }

        .dx-panel-active {
          display: grid;
        }

        .dx-panel-visual {
          position: relative;
          background: #ffffff;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        .dx-panel-img {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 24px 48px rgba(18, 49, 77, 0.15));
        }

        .dx-panel-content {
          padding: 3rem 2.5rem 2.5rem;
          display: flex;
          flex-direction: column;
        }

        .dx-panel-tag {
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin-bottom: 1rem;
        }

        .dx-panel-h {
          font-family:
            'Instrument Sans',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: clamp(1.45rem, 2.2vw, 1.75rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #12314d;
          margin-bottom: 1rem;
        }

        .dx-panel-body {
          font-size: 0.92rem;
          font-weight: 400;
          color: rgba(18, 49, 77, 0.65);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .dx-panel-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 0 0 1.5rem;
          padding: 0;
        }

        .dx-panel-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          font-size: 0.85rem;
          color: #12314d;
          line-height: 1.4;
        }

        .dx-panel-li-num {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(10, 143, 176, 0.1);
          color: #0a8fb0;
          font-size: 0.7rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .dx-panel-list-rx li {
          display: grid;
          grid-template-columns: 22px minmax(0, 1fr) auto;
          gap: 0.85rem;
          align-items: start;
        }

        .dx-panel-rx-l {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
          min-width: 0;
        }

        .dx-panel-rx-dose {
          font-size: 0.72rem;
          color: rgba(18, 49, 77, 0.45);
        }

        .dx-panel-rx-benefit {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0a8fb0;
          text-align: right;
          white-space: nowrap;
        }

        .dx-panel-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
          padding-top: 1rem;
        }

        .dx-pill {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0a8fb0;
          background: rgba(10, 143, 176, 0.08);
          border: 1px solid rgba(10, 143, 176, 0.18);
          border-radius: 999px;
          padding: 0.42rem 0.7rem;
        }

        .dx-pill-mini {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          color: #0a8fb0;
          background: rgba(10, 143, 176, 0.08);
          border: 1px solid rgba(10, 143, 176, 0.18);
          padding: 0.24rem 0.55rem;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
        }

        /* ── Mock Report ── */
        .dx-mock-report {
          width: min(100%, 410px);
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid rgba(18, 49, 77, 0.08);
          box-shadow: 0 16px 45px rgba(18, 49, 77, 0.1);
          padding: 1.35rem;
        }

        .dx-mock-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin-bottom: 1rem;
        }

        .dx-pulse {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #0a8fb0;
          box-shadow: 0 0 0 5px rgba(10, 143, 176, 0.15);
          animation: dxPulse 1.5s ease-in-out infinite;
        }

        .dx-mock-rows {
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
        }

        .dx-mock-row {
          display: grid;
          grid-template-columns: 120px 1fr 10px;
          gap: 0.65rem;
          align-items: center;
        }

        .dx-mock-label {
          font-size: 0.78rem;
          color: rgba(18, 49, 77, 0.7);
        }

        .dx-mock-bar {
          height: 7px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(18, 49, 77, 0.08);
        }

        .dx-mock-fill {
          height: 100%;
          width: var(--w);
          border-radius: inherit;
          background: #0a8fb0;
          animation: dxFill 1s cubic-bezier(0.45, 0, 0.15, 1) forwards;
        }

        .dx-mock-fill.amber {
          background: #d9a55c;
        }

        .dx-mock-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
        }

        .dx-mock-dot.ok {
          background: #0a8fb0;
        }

        .dx-mock-dot.low {
          background: #d9a55c;
        }

        .dx-mock-foot {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(18, 49, 77, 0.08);
        }

        .dx-mock-foot-t {
          font-size: 0.78rem;
          color: rgba(18, 49, 77, 0.55);
        }

        /* ── Responsive ── */
        @media (max-width: 880px) {
          .diagram {
            padding: 4rem 1.25rem 3rem;
          }

          .diagram-head {
            margin-bottom: 2.25rem;
          }

          .dx-stage {
            padding: 0;
          }

          .dx-timeline {
            grid-template-columns: 1fr 1fr 1fr;
            margin-bottom: 1.75rem;
            padding: 0 0.5rem;
          }

          .dx-step {
            min-width: 0;
            padding: 0.5rem 0.25rem;
            gap: 0.5rem;
          }

          .dx-step-marker {
            width: 42px;
            height: 42px;
          }

          .dx-step-num {
            font-size: 0.7rem;
          }

          .dx-step-eyebrow {
            font-size: 0.55rem;
            letter-spacing: 0.12em;
          }

          .dx-step-name {
            font-size: 0.72rem;
            line-height: 1.2;
          }

          .dx-track {
            display: none;
          }

          .dx-step-progress {
            bottom: -0.35rem;
          }

          .dx-card {
            min-height: auto;
            border-radius: 18px;
          }

          .dx-panel,
          .dx-card[data-active-step='1'] .dx-panel[data-panel='1'],
          .dx-card[data-active-step='2'] .dx-panel[data-panel='2'],
          .dx-card[data-active-step='3'] .dx-panel[data-panel='3'] {
            grid-template-columns: 1fr;
          }

          .dx-panel-visual {
            min-height: 240px;
            padding: 1.75rem;
          }

          .dx-panel-img {
            max-width: 100%;
            max-height: 380px;
            object-fit: contain;
            filter: drop-shadow(0 24px 48px rgba(18, 49, 77, 0.15));
          }

          .dx-panel-content {
            padding: 2rem 1.5rem 1.75rem;
          }

          .dx-mock-report {
            padding: 1rem;
          }

          .dx-panel-list-rx li {
            grid-template-columns: 22px 1fr;
          }

          .dx-panel-rx-benefit {
            grid-column: 2;
            text-align: left;
            white-space: normal;
          }
        }
      `}</style>

      <div className="diagram-glow1" />
      <div className="diagram-glow2" />
      <div className="diagram-grid" />

      <div className="diagram-inner">
        <div className={`diagram-head ${revealed ? 'in' : ''}`}>
          {resolvedEyebrow && <div className="diagram-eyebrow">{resolvedEyebrow}</div>}

          {resolvedHeading && (
            <div className="diagram-h">
              <RichText data={resolvedHeading as any} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>

        <div className="dx-stage">
          <div
            className="dx-timeline"
            data-progress={activeStep}
            role="tablist"
            aria-label="Process steps"
          >
            {safeSteps.map((step, index) => {
              const stepNumber = index + 1
              const active = activeStep === stepNumber

              return (
                <React.Fragment key={stepNumber}>
                  {index > 0 && (
                    <div className={`dx-track dx-track-${index}`} aria-hidden="true">
                      <div className="dx-track-fill" />
                    </div>
                  )}

                  <button
                    type="button"
                    className={`dx-step ${active ? 'dx-step-active' : ''}`}
                    data-step={stepNumber}
                    role="tab"
                    aria-selected={active}
                    aria-controls="dx-panel"
                    onClick={() => setActiveStep(stepNumber)}
                  >
                    <div className="dx-step-marker">
                      <span className="dx-step-num">{step.number || `0${stepNumber}`}</span>
                      <span className="dx-step-dot" />
                    </div>

                    <div className="dx-step-meta">
                      <div className="dx-step-eyebrow">{step.timelineEyebrow}</div>
                      <div className="dx-step-name">{step.timelineName}</div>
                    </div>

                    <div className="dx-step-progress">
                      <span className="dx-step-progress-fill" />
                    </div>
                  </button>
                </React.Fragment>
              )
            })}
          </div>

          <article className="dx-card" id="dx-panel" data-active-step={activeStep} role="tabpanel">
            {safeSteps.map((step, index) => {
              const stepNumber = index + 1
              const active = activeStep === stepNumber
              const uploadUrl = getUploadUrl(step.image)
              const imageSrc = uploadUrl || step.imageUrl || ''

              return (
                <div
                  key={stepNumber}
                  className={`dx-panel ${active ? 'dx-panel-active' : ''}`}
                  data-panel={stepNumber}
                >
                  <div className="dx-panel-visual">
                    {step.visualType === 'mockReport' ? (
                      <div className="dx-mock-report">
                        {step.mockEyebrow && (
                          <div className="dx-mock-eyebrow">
                            <span className="dx-pulse" />
                            {step.mockEyebrow}
                          </div>
                        )}

                        {step.mockRows && step.mockRows.length > 0 && (
                          <div className="dx-mock-rows">
                            {step.mockRows.map((row, rowIndex) => {
                              const status = row.status || 'ok'
                              const percentage = Math.max(0, Math.min(100, row.percentage || 0))

                              return (
                                <div className="dx-mock-row" key={rowIndex}>
                                  <span className="dx-mock-label">{row.label}</span>
                                  <div className="dx-mock-bar">
                                    <div
                                      className={`dx-mock-fill ${status === 'low' ? 'amber' : ''}`}
                                      style={{ '--w': `${percentage}%` } as React.CSSProperties}
                                    />
                                  </div>
                                  <span className={`dx-mock-dot ${status}`} />
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {(step.mockFootLabel || step.mockFootText) && (
                          <div className="dx-mock-foot">
                            {step.mockFootLabel && (
                              <span className="dx-pill-mini">{step.mockFootLabel}</span>
                            )}
                            {step.mockFootText && (
                              <span className="dx-mock-foot-t">{step.mockFootText}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={
                          step.imageAlt ||
                          (typeof step.image === 'object' ? step.image?.alt || '' : '')
                        }
                        className="dx-panel-img"
                      />
                    ) : null}
                  </div>

                  <div className="dx-panel-content">
                    {step.panelTag && <div className="dx-panel-tag">{step.panelTag}</div>}
                    {step.panelHeading && <h3 className="dx-panel-h">{step.panelHeading}</h3>}
                    {step.panelBody && <p className="dx-panel-body">{step.panelBody}</p>}

                    {step.listItems && step.listItems.length > 0 && (
                      <ul
                        className={`dx-panel-list ${
                          step.listItems.some((item) => item.dose || item.benefit)
                            ? 'dx-panel-list-rx'
                            : ''
                        }`}
                      >
                        {step.listItems.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <span className="dx-panel-li-num">{item.marker}</span>

                            {item.dose || item.benefit ? (
                              <>
                                <span className="dx-panel-rx-l">
                                  {item.text}
                                  {item.dose && (
                                    <span className="dx-panel-rx-dose">{item.dose}</span>
                                  )}
                                </span>
                                {item.benefit && (
                                  <span className="dx-panel-rx-benefit">{item.benefit}</span>
                                )}
                              </>
                            ) : (
                              <span>{item.text}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.pills && step.pills.length > 0 && (
                      <div className="dx-panel-pills">
                        {step.pills.map((pill, pillIndex) => (
                          <span className="dx-pill" key={pillIndex}>
                            {pill.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </article>
        </div>
      </div>
    </section>
  )
}
