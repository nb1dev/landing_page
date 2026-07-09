'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { makeFingerprint } from '@/lib/gutFingerprint'

export type BiologyTwoPeopleBlockType = {
  blockType?: 'biologyTwoPeople'
  heading?: DefaultTypedEditorState | null
  body?: string | null
  note?: DefaultTypedEditorState | null
  personALabel?: string | null
  personAMeta?: string | null
  personBLabel?: string | null
  personBMeta?: string | null
  dnaCaption?: string | null
}

// Ported from the mockup's local "makeHelix" function (part of the "03 two
// people — funnel" script) — draws the shared double-helix strip.
function makeHelix(cv: HTMLCanvasElement, gspr: HTMLCanvasElement[], turnsArg?: number) {
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ctx = cv.getContext('2d')!
  let W = 0
  let H = 0
  let DPR = 1
  let raf = 0
  let t0: number | null = null
  const turns = turnsArg || 3.0
  const N = Math.max(42, Math.round(14 * turns))

  function layout() {
    const r = cv.getBoundingClientRect()
    DPR = Math.min(window.devicePixelRatio || 1, 2)
    W = r.width || 600
    H = r.height || 150
    cv.width = W * DPR
    cv.height = H * DPR
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  }

  function draw(intro: number) {
    const ph = 0.7
    ctx.clearRect(0, 0, W, H)
    const cy = H / 2
    const amp = H * 0.34
    const x0 = W * 0.04
    const x1 = W * 0.96
    ctx.globalCompositeOperation = 'source-over'
    for (let k = 1; k < N; k += 2) {
      const u = k / (N - 1)
      const ang = u * turns * Math.PI * 2 + ph
      const x = x0 + (x1 - x0) * u
      const dep = Math.abs(Math.cos(ang))
      ctx.globalAlpha = 0.18 * intro * (0.35 + 0.65 * (1 - dep))
      ctx.strokeStyle = 'rgba(150,210,235,1)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(x, cy + Math.sin(ang) * amp)
      ctx.lineTo(x, cy - Math.sin(ang) * amp)
      ctx.stroke()
    }
    const pts: { x: number; y: number; d: number; ph: number }[] = []
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1)
      const ang = u * turns * Math.PI * 2 + ph
      const x = x0 + (x1 - x0) * u
      pts.push({ x, y: cy + Math.sin(ang) * amp, d: Math.cos(ang), ph: ang })
      pts.push({ x, y: cy - Math.sin(ang) * amp, d: -Math.cos(ang), ph: ang + 3.14159 })
    }
    pts.sort((a, b) => a.d - b.d)
    for (let p = 0; p < pts.length; p++) {
      const pt = pts[p]
      const f = pt.d * 0.5 + 0.5
      const s = 2.5 + f * 4.05
      ctx.globalAlpha = (0.42 + 0.64 * f) * intro
      ctx.drawImage(gspr[((pt.ph * 3) | 0) % gspr.length], pt.x - s, pt.y - s, s * 2, s * 2)
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  let shown = false
  function loop(now: number) {
    if (t0 === null) t0 = now
    const k = Math.min((now - t0) / 700, 1)
    const intro = reduce ? 1 : ease(k)
    draw(intro)
    if (k < 1) raf = requestAnimationFrame(loop)
    else shown = true
  }
  function ease(t: number) {
    return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3)
  }
  let rt: ReturnType<typeof setTimeout> | null = null
  function onResize() {
    if (rt) clearTimeout(rt)
    rt = setTimeout(() => {
      layout()
      if (shown) draw(1)
    }, 120)
  }
  layout()
  window.addEventListener('resize', onResize)

  return {
    run: () => {
      if (raf) cancelAnimationFrame(raf)
      t0 = null
      if (reduce) {
        layout()
        draw(1)
        shown = true
        return
      }
      raf = requestAnimationFrame(loop)
    },
    cleanup: () => {
      window.removeEventListener('resize', onResize)
      if (rt) clearTimeout(rt)
      if (raf) cancelAnimationFrame(raf)
    },
  }
}

function sprite(r: number, g: number, b: number) {
  const s = 48
  const c = document.createElement('canvas')
  c.width = c.height = s
  const x = c.getContext('2d')!
  const gr = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  gr.addColorStop(0, `rgba(${r},${g},${b},.9)`)
  gr.addColorStop(0.3, `rgba(${r},${g},${b},.4)`)
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`)
  x.fillStyle = gr
  x.fillRect(0, 0, s, s)
  return c
}

export const BiologyTwoPeopleComponent: React.FC<BiologyTwoPeopleBlockType> = ({
  heading,
  body,
  note,
  personALabel,
  personAMeta,
  personBLabel,
  personBMeta,
  dnaCaption,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const popARef = useRef<HTMLCanvasElement | null>(null)
  const popBRef = useRef<HTMLCanvasElement | null>(null)
  const dnaRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const dnaCanvas = dnaRef.current
    if (!section || !dnaCanvas) return

    const gspr = [sprite(120, 205, 235), sprite(90, 180, 215), sprite(150, 220, 240)]
    const helix = makeHelix(dnaCanvas, gspr, 5.5)
    let rendered = false

    function sequence() {
      helix.run()
      if (!rendered) {
        rendered = true
        if (popARef.current) makeFingerprint(popARef.current, 'A').play()
        if (popBRef.current) makeFingerprint(popBRef.current, 'B').play()
      }
      requestAnimationFrame(() => {
        section!.classList.add('on')
      })
    }

    const trigEl = section.querySelector('.tw2-gut-grid') || section
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width:900px)').matches
    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              sequence()
              io?.disconnect()
            }
          })
        },
        { threshold: isMobile ? 0.04 : 0.35, rootMargin: isMobile ? '0px 0px 12% 0px' : '0px' },
      )
      io.observe(trigEl)
    } else {
      sequence()
    }

    return () => {
      io?.disconnect()
      helix.cleanup()
    }
  }, [])

  return (
    <section className="tw2" id="tw" ref={sectionRef as React.RefObject<HTMLElement>}>
      <style jsx>{`
        .tw2 {
          position: relative;
          background: linear-gradient(180deg, #fbfaf5 0%, #f7f4ec 100%);
          color: #12314d;
          padding-block: clamp(56px, 7.5vw, 96px);
          overflow: hidden;
        }
        .tw2-wrap {
          position: relative;
          max-width: 1160px;
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 72px);
          display: grid;
          grid-template-columns: 1.02fr 1fr;
          align-items: center;
          gap: clamp(40px, 6vw, 88px);
        }
        .tw2-copy {
          min-width: 0;
        }
        .tw2-copy :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1.08;
          font-size: clamp(1.9rem, 3.6vw, 3rem);
          max-width: 16ch;
          color: #12314d;
          text-align: left;
          margin: 0;
        }
        .tw2-say {
          color: rgba(18, 49, 77, 0.55);
          font-size: clamp(1.02rem, 1.3vw, 1.14rem);
          margin: 18px 0 0;
          max-width: 46ch;
          line-height: 1.55;
          text-align: left;
        }
        .tw2-note {
          margin: 22px 0 0;
          max-width: 40ch;
          text-align: left;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1.16rem, 1.7vw, 1.42rem);
          line-height: 1.34;
          color: #12314d;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 0.7s 0.35s,
            transform 0.7s 0.35s;
        }
        .tw2.on .tw2-note {
          opacity: 1;
          transform: none;
        }
        .tw2-vis {
          min-width: 0;
        }
        .tw2-gut-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          gap: clamp(16px, 3vw, 34px);
          margin: 0;
        }
        .tw2-gut-col {
          min-width: 0;
        }
        .tw2-gut-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          margin-bottom: 8px;
        }
        .tw2-who {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(1.02rem, 1.5vw, 1.18rem);
          color: #12314d;
          white-space: nowrap;
        }
        .tw2-meta {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.4);
        }
        .tw2-field {
          background: none;
          padding: 0;
          border-radius: 0;
        }
        .tw2-field canvas {
          width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
          display: block;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 0.7s,
            transform 0.7s;
        }
        .tw2.on .tw2-field canvas {
          opacity: 1;
          transform: none;
        }
        .tw2-dna-strip {
          position: relative;
          margin: clamp(20px, 3vw, 34px) auto 0;
          opacity: 0;
          transition: opacity 0.9s 0.3s;
        }
        .tw2.on .tw2-dna-strip {
          opacity: 1;
        }
        .tw2-dna-strip canvas {
          width: 100%;
          aspect-ratio: 16 / 2.4;
          display: block;
        }
        .tw2-dna-cap {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.4);
          text-align: center;
          margin: 8px auto 0;
        }
        @media (max-width: 900px) {
          .tw2-wrap {
            grid-template-columns: 1fr;
            gap: clamp(28px, 6vw, 48px);
          }
          .tw2-copy :global(h2),
          .tw2-say,
          .tw2-note {
            text-align: left;
          }
        }
        @media (max-width: 820px) {
          .tw2-gut-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .tw2-gut-grid {
            gap: 14px;
          }
        }
      `}</style>

      <div className="tw2-wrap">
        <div className="tw2-copy">
          {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
          {body && <p className="tw2-say">{body}</p>}
          {note && (
            <div className="tw2-note">
              <RichText data={note as any} enableGutter={false} enableProse={false} />
            </div>
          )}
        </div>

        <div className="tw2-vis">
          <div className="tw2-gut-grid">
            <div className="tw2-gut-col">
              <div className="tw2-gut-head">
                <span className="tw2-who">{personALabel}</span>
                <span className="tw2-meta">{personAMeta}</span>
              </div>
              <div className="tw2-field">
                <canvas ref={popARef} width={440} height={440} role="img" aria-label="Person A gut reading resolving into a unique fingerprint" />
              </div>
            </div>
            <div className="tw2-gut-col">
              <div className="tw2-gut-head">
                <span className="tw2-who">{personBLabel}</span>
                <span className="tw2-meta">{personBMeta}</span>
              </div>
              <div className="tw2-field">
                <canvas ref={popBRef} width={440} height={440} role="img" aria-label="Person B gut reading resolving into a unique fingerprint" />
              </div>
            </div>
          </div>

          <div className="tw2-dna-strip">
            <canvas ref={dnaRef} aria-hidden="true" />
            {dnaCaption && <p className="tw2-dna-cap">{dnaCaption}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
