'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import RichText from '@/components/RichText'

type NodeData = {
  key?: string | null
  label?: string | null
  title?: string | null
  body?: string | null
}

type Props = {
  heading?: any
  bodyCopy?: string | null
  hintText?: string | null
  nodes?: NodeData[] | null
}

const NODE_COORDS: Record<string, { cx: number; cy: number; labelAnchor: string; labelX: number; labelY: number }> = {
  energy:    { cx: 633, cy: 147, labelAnchor: 'start',  labelX: 662, labelY: 151 },
  focus:     { cx: 779, cy: 152, labelAnchor: 'start',  labelX: 808, labelY: 156 },
  immunity:  { cx: 881, cy: 257, labelAnchor: 'end',    labelX: 850, labelY: 261 },
  digestion: { cx: 881, cy: 403, labelAnchor: 'end',    labelX: 850, labelY: 407 },
  sleep:     { cx: 633, cy: 513, labelAnchor: 'end',    labelX: 602, labelY: 517 },
  stress:    { cx: 779, cy: 508, labelAnchor: 'start',  labelX: 808, labelY: 512 },
}

const PATH_D: Record<string, string> = {
  energy:    'M280 430 Q 450 250 633 147',
  focus:     'M280 430 Q 520 250 779 152',
  immunity:  'M280 430 Q 590 300 881 257',
  digestion: 'M280 430 Q 600 410 881 403',
  sleep:     'M280 430 Q 440 500 633 513',
  stress:    'M280 430 Q 540 500 779 508',
}

const PULSE_DELAYS: Record<string, number> = {
  energy: 0, focus: 0.55, immunity: 1.1, digestion: 1.65, sleep: 2.2, stress: 2.75,
}

const PATH_ANIM_DELAYS: Record<string, number> = {
  energy: 0.25, focus: 0.45, immunity: 0.65, digestion: 0.85, sleep: 1.05, stress: 1.25,
}
const NODE_ANIM_DELAYS: Record<string, number> = {
  energy: 1.0, focus: 1.2, immunity: 1.4, digestion: 1.6, sleep: 1.8, stress: 2.0,
}

const NODE_ICONS: Record<string, string> = {
  energy:    '<path d="M10 2.4 4.6 9H7.6L6.2 13.6 11.4 6.8H8.2Z"/>',
  focus:     '<circle cx="8" cy="8" r="4.4"/><path d="M8 1.4V3.4M8 12.6V14.6M1.4 8H3.4M12.6 8H14.6"/>',
  immunity:  '<path d="M8 2.6 12.2 4.2V8.2C12.2 11 10.3 12.7 8 13.5 5.7 12.7 3.8 11 3.8 8.2V4.2Z"/><path d="M6.1 8 7.4 9.4 10 6.3"/>',
  digestion: '<path d="M3.6 7.6A4.4 4.4 0 0 0 12.4 7.6Z"/><path d="M6.2 5.4Q7.2 4.2 6.2 3M9.8 5.4Q10.8 4.2 9.8 3"/>',
  sleep:     '<path d="M11.8 9.6A4.8 4.8 0 1 1 6.4 4.2 3.9 3.9 0 1 0 11.8 9.6Z"/>',
  stress:    '<path d="M2 6.5 Q4.5 3.5 7 6.5 T12 6.5"/><path d="M2 10.5 Q4.5 7.5 7 10.5 T12 10.5"/>',
}

const MOBILE_NODE_POSITIONS = [
  { k: 'energy',    x: 180, y: 56  },
  { k: 'focus',     x: 282, y: 116 },
  { k: 'immunity',  x: 282, y: 236 },
  { k: 'digestion', x: 180, y: 296 },
  { k: 'sleep',     x: 78,  y: 236 },
  { k: 'stress',    x: 78,  y: 116 },
]
const MOBILE_CX = 180, MOBILE_CY = 176

function getMobilePath(x: number, y: number) {
  const dx = x - MOBILE_CX, dy = y - MOBILE_CY
  const dist = Math.hypot(dx, dy) || 1
  const px = -dy / dist, py = dx / dist
  const bow = dist * 0.16
  const qx = ((MOBILE_CX + x) / 2 + px * bow).toFixed(1)
  const qy = ((MOBILE_CY + y) / 2 + py * bow).toFixed(1)
  return `M${MOBILE_CX} ${MOBILE_CY} Q${qx} ${qy} ${x} ${y}`
}

export const GutFirstComponent: React.FC<Props> = ({ heading, bodyCopy, hintText, nodes }) => {
  const secRef = useRef<HTMLElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const stemRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [hintGone, setHintGone] = useState(false)
  const [sheetKey, setSheetKey] = useState<string | null>(null)

  const nodeMap = React.useMemo(() => {
    const m: Record<string, NodeData> = {}
    nodes?.forEach(n => { if (n.key) m[n.key] = n })
    return m
  }, [nodes])

  useEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(sec)
    return () => obs.disconnect()
  }, [])

  const placePopover = useCallback((key: string) => {
    const sec = secRef.current
    const pop = popRef.current
    const stem = stemRef.current
    if (!sec || !pop || !stem) return

    const coords = NODE_COORDS[key]
    if (!coords) return

    const sr = sec.getBoundingClientRect()
    // SVG viewBox is 1000x640, map to actual rendered dimensions
    const svgW = sr.width, svgH = sr.height
    const scaleX = svgW / 1000, scaleY = svgH / 640
    const nx = coords.cx * scaleX
    const ny = coords.cy * scaleY
    const pw = pop.offsetWidth, ph = pop.offsetHeight
    const onRight = coords.cx > 550
    let left = onRight ? nx - pw - 56 : nx + 56
    left = Math.max(16, Math.min(left, svgW - pw - 16))
    const top = Math.max(16, Math.min(ny - ph / 2, svgH - ph - 16))
    pop.style.left = left + 'px'
    pop.style.top = top + 'px'
    const cx2 = left + pw / 2, cy2 = top + ph / 2
    const dx = cx2 - nx, dy = cy2 - ny
    pop.style.setProperty('--gs-sx', (-dx * 0.16).toFixed(1) + 'px')
    pop.style.setProperty('--gs-sy', (-dy * 0.16).toFixed(1) + 'px')
    pop.style.setProperty('--gs-ox', onRight ? 'right' : 'left')
    pop.style.setProperty('--gs-oy', 'center')

    const ax = onRight ? left + pw : left
    const ay = Math.max(top + 16, Math.min(ny, top + ph - 16))
    const sdx = ax - nx, sdy = ay - ny
    const dist = Math.sqrt(sdx * sdx + sdy * sdy)
    const ang = Math.atan2(sdy, sdx) * 180 / Math.PI
    const ux = dist > 0 ? sdx / dist : 1, uy = dist > 0 ? sdy / dist : 0
    const nodeR = 23 * scaleX + 3
    stem.style.left = (nx + ux * nodeR) + 'px'
    stem.style.top = (ny + uy * nodeR) + 'px'
    const line = stem.querySelector('.gs-stem-line') as HTMLElement
    if (line) {
      line.style.width = Math.max(0, dist - nodeR) + 'px'
      line.style.transform = `rotate(${ang}deg) scaleX(0)`
      void line.offsetWidth
      line.style.transform = `rotate(${ang}deg)`
    }
  }, [])

  const openNode = useCallback((key: string) => {
    setSelectedKey(key)
    setHintGone(true)
    setTimeout(() => placePopover(key), 10)
  }, [placePopover])

  const closeNode = useCallback(() => {
    setSelectedKey(null)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (selectedKey) placePopover(selectedKey) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [selectedKey, placePopover])

  useEffect(() => {
    const handleDocClick = () => { if (selectedKey) closeNode() }
    document.addEventListener('click', handleDocClick)
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && selectedKey) closeNode() }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('click', handleDocClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [selectedKey, closeNode])

  const selectedNode = selectedKey ? nodeMap[selectedKey] : null
  const orderedKeys = ['energy', 'focus', 'immunity', 'digestion', 'sleep', 'stress']

  return (
    <>
      <style jsx>{`
        .gs-wrap { background: #F3F6F8; padding: 48px 30px; }
        @media (max-width: 760px) { .gs-wrap { padding: 22px 13px; } }

        .gs-sec {
          position: relative;
          width: 100%;
          min-height: clamp(660px, 80vh, 820px);
          overflow: hidden;
          isolation: isolate;
          background: #0A1A2C;
          border-radius: 30px;
          box-shadow: 0 36px 70px -50px rgba(8,24,40,.42), 0 8px 24px -20px rgba(8,24,40,.22);
        }
        @media (max-width: 760px) { .gs-sec { border-radius: 22px; min-height: 0; } }

        .gs-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(150% 120% at 90% -14%, rgba(20,150,184,.26) 0%, rgba(14,95,120,.10) 32%, rgba(14,39,64,0) 64%),
            radial-gradient(90% 72% at 6% -12%, rgba(150,196,222,.10) 0%, transparent 56%),
            radial-gradient(120% 96% at 18% 116%, rgba(4,11,20,.62) 0%, transparent 66%),
            linear-gradient(166deg, #103248 0%, #0A1F33 48%, #06121F 100%);
        }
        .gs-svg-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .gs-svg-wrap svg { width: 100%; height: 100%; display: block; }
        @media (max-width: 760px) { .gs-svg-wrap { display: none; } }
        .gs-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 78px 32px 0;
          pointer-events: none;
        }
        .gs-content :global(a), .gs-content :global(button) { pointer-events: auto; }
        @media (max-width: 760px) { .gs-content { padding: 42px 24px 46px; } }

        .gs-h :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(34px, 4.6vw, 60px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          max-width: 15ch;
          color: #fff;
          margin: 0;
        }
        .gs-h :global(h2 em) {
          color: #7FD0E6;
          font-style: normal;
        }
        @media (max-width: 760px) {
          .gs-h :global(h2) { font-size: clamp(29px, 8vw, 40px); max-width: none; }
        }

        .gs-cap {
          margin-top: 28px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255,255,255,.7);
          max-width: 40ch;
        }
        @media (max-width: 760px) { .gs-cap { font-size: 15px; max-width: none; margin-top: 18px; } }

        .gs-hint {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(127,208,236,.85);
          transition: opacity .4s;
        }
        .gs-hint.gone { opacity: 0; pointer-events: none; }
        .gs-hint-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #7FD0E6;
          animation: gsHintPulse 2s ease-in-out infinite;
        }
        @keyframes gsHintPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(127,208,236,.22); }
          50% { box-shadow: 0 0 0 7px rgba(127,208,236,.05); }
        }
        @media (max-width: 760px) { .gs-hint { display: none; } }

        /* SVG signal paths */
        .gs-signal { stroke-dasharray: 1; }
        .gs-arm .gs-signal { stroke-dashoffset: 1; }
        .gs-arm .gs-glowin, .gs-arm .gs-nfade { opacity: 0; }
        .gs-arm.gs-go .gs-signal { animation: gsdraw 1.5s ease forwards; }
        .gs-arm.gs-go .gs-nfade { animation: gsrise .8s ease forwards; }
        .gs-arm.gs-go .gs-glowin { animation: gsfade 1.6s ease forwards; }
        @keyframes gsdraw { to { stroke-dashoffset: 0; } }
        @keyframes gsrise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gsfade { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .gs-arm.gs-go .gs-signal,
          .gs-arm.gs-go .gs-nfade,
          .gs-arm.gs-go .gs-glowin { animation: none; opacity: 1; stroke-dashoffset: 0; }
        }

        /* nodes */
        .gs-node { cursor: pointer; }
        .gs-ring { opacity: .2; transition: opacity .25s; }
        .gs-ndot { transition: fill .2s; }
        .gs-nlabel { transition: fill .2s; }
        .gs-nicon { stroke: #7FD0E6; stroke-width: 1.4; fill: none; stroke-linecap: round; stroke-linejoin: round; transition: stroke .2s; pointer-events: none; }
        .gs-node:hover .gs-ring, .gs-node.sel .gs-ring { opacity: .85; }
        .gs-node:hover .gs-ndot, .gs-node.sel .gs-ndot { fill: #CFF3FB; }
        .gs-node:hover .gs-nicon, .gs-node.sel .gs-nicon { stroke: #CFF3FB; }
        .gs-node:hover .gs-nlabel, .gs-node.sel .gs-nlabel { fill: #fff; }
        .gs-node:focus { outline: none; }
        .gs-node:focus-visible .gs-ring { opacity: .95; }
        .gs-ping { pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .gs-ping { display: none; } }

        /* stem */
        .gs-stem {
          position: absolute;
          z-index: 5;
          left: 0; top: 0;
          width: 0; height: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity .2s ease;
        }
        .gs-stem.open { opacity: 1; }
        .gs-stem-line {
          position: absolute;
          left: 0; top: -1px;
          height: 2px;
          transform-origin: 0 50%;
          background: linear-gradient(90deg, rgba(127,208,236,.15) 0%, rgba(127,208,236,.85) 100%);
          transform: scaleX(0);
          transition: transform .34s cubic-bezier(.4,0,.2,1) .04s;
          border-radius: 2px;
        }
        .gs-stem.open .gs-stem-line { transform: scaleX(1); }
        .gs-stem-dot {
          position: absolute;
          left: -4px; top: -4px;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #CFF3FB;
          box-shadow: 0 0 0 4px rgba(127,208,236,.18), 0 0 10px rgba(127,208,236,.7);
        }
        @media (max-width: 760px) { .gs-stem { display: none !important; } }

        /* popover */
        .gs-pop {
          position: absolute;
          z-index: 6;
          width: 312px;
          max-width: calc(100vw - 32px);
          background: linear-gradient(168deg, #1B4060 0%, #133048 58%, #0E2740 100%);
          border: 1px solid rgba(127,208,236,.13);
          border-radius: 15px;
          padding: 19px 21px 21px;
          box-shadow: 0 30px 70px -26px rgba(0,0,0,.72), 0 3px 10px -3px rgba(0,0,0,.45);
          opacity: 0;
          transform: translate(var(--gs-sx, 0px), var(--gs-sy, 8px)) scale(.94);
          transform-origin: var(--gs-ox, center) var(--gs-oy, top);
          pointer-events: none;
          transition: opacity .26s ease, transform .4s cubic-bezier(.34,1.32,.42,1);
        }
        .gs-pop.open { opacity: 1; transform: translate(0,0) scale(1); pointer-events: auto; }
        @media (max-width: 760px) { .gs-pop { display: none !important; } }

        .gs-pop-k {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #7FD0E6;
          margin-bottom: 10px;
        }
        .gs-pop-t {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 20px;
          letter-spacing: -0.01em;
          color: #fff;
          margin: 0 0 10px;
        }
        .gs-pop-b {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255,255,255,.76);
          margin: 0;
        }
        .gs-pop-x {
          position: absolute;
          top: 12px; right: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px; height: 24px;
          border: none;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.7);
          border-radius: 50%;
          font-size: 15px;
          line-height: 1;
          cursor: pointer;
          transition: background .15s, color .15s;
        }
        .gs-pop-x:hover { background: rgba(255,255,255,.16); color: #fff; }

        /* mobile radial */
        .gs-radial {
          display: none;
          pointer-events: auto;
          margin: 24px auto 0;
          max-width: 380px;
        }
        .gs-radial svg { width: 100%; height: auto; display: block; overflow: visible; }
        .gs-radial-hint {
          display: block;
          text-align: center;
          margin-top: 10px;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12.5px;
          color: rgba(127,208,236,.8);
        }
        .gs-rnode { cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .gs-rnode:focus { outline: none; }
        .rring { fill: none; stroke: #7FD0E6; stroke-width: 1.3; opacity: .5; transition: opacity .2s; }
        .ricon { fill: none; stroke: #9FE0F0; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; transition: stroke .2s; }
        .rlabel { font-family: 'Inter', -apple-system, sans-serif; font-size: 12px; font-weight: 600; fill: rgba(255,255,255,.82); letter-spacing: .04em; text-transform: uppercase; }
        .gs-rnode:active .rring, .gs-rnode.sel .rring { opacity: 1; }
        .gs-rnode.sel .ricon { stroke: #CFF3FB; }
        .gs-rnode.sel .rlabel { fill: #fff; }
        .gs-rline { stroke: rgba(125,182,206,.4); stroke-width: 1; }
        .gs-rgut-label { font-family: 'Inter', -apple-system, sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; fill: #7FD0E6; }
        @media (max-width: 760px) { .gs-radial { display: block; } }

        /* bottom sheet */
        .gs-sheet-scrim {
          position: fixed;
          inset: 0;
          z-index: 9400;
          background: rgba(6,17,28,.55);
          opacity: 0;
          visibility: hidden;
          transition: opacity .25s, visibility .25s;
        }
        .gs-sheet-scrim.open { opacity: 1; visibility: visible; }
        .gs-sheet {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          z-index: 9401;
          background: linear-gradient(180deg, #103248, #0A1F33);
          border-radius: 24px 24px 0 0;
          padding: 14px 26px 36px;
          transform: translateY(100%);
          transition: transform .34s cubic-bezier(.16,.84,.44,1);
          box-shadow: 0 -22px 54px -20px rgba(0,0,0,.6);
          border-top: 1px solid rgba(127,208,236,.18);
        }
        .gs-sheet.open { transform: translateY(0); }
        .gs-sheet-grip { width: 42px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.26); margin: 0 auto 20px; }
        .gs-sheet-k { font-family: 'Inter', -apple-system, sans-serif; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: #7FD0E6; font-weight: 700; }
        .gs-sheet-t { font-family: 'Instrument Sans', 'Inter', sans-serif; font-weight: 500; font-size: 26px; letter-spacing: -0.02em; color: #fff; margin-top: 9px; }
        .gs-sheet-b { font-family: 'Inter', -apple-system, sans-serif; font-size: 15px; line-height: 1.62; color: rgba(255,255,255,.76); margin-top: 12px; }
      `}</style>

      <div className="gs-wrap">
        <section
          ref={secRef}
          className="gs-sec"
          data-screen-label="Why gut-first"
        >
          <div className="gs-bg" />

          {/* Desktop SVG diagram */}
          <div className="gs-svg-wrap">
            <svg viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="gsGutGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#5FD3E8" stopOpacity="0.5" />
                  <stop offset="28%" stopColor="#19A8CC" stopOpacity="0.30" />
                  <stop offset="60%" stopColor="#0A8FB0" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#0E2740" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="gsNodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#19A8CC" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#19A8CC" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Signal paths */}
              <g className={`gs-arm${animated ? ' gs-go' : ''}`} fill="none" stroke="rgba(125,182,206,.5)" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
                {orderedKeys.map((k, i) => (
                  <path
                    key={k}
                    className={`gs-signal gs-s${i + 1}`}
                    pathLength={1}
                    d={PATH_D[k]}
                    style={{ animationDelay: `${PATH_ANIM_DELAYS[k]}s` }}
                  />
                ))}
              </g>

              {/* Gut center glow */}
              <g className={`gs-arm gs-glowin${animated ? ' gs-go' : ''}`} aria-hidden="true" style={{ animationDelay: '0s' }}>
                <circle cx="280" cy="430" r="150" fill="url(#gsGutGlow)" />
                <circle cx="280" cy="430" r="5.5" fill="#CFF1FB" />
                <g fill="#7FD6EC">
                  {[
                    [262,416,1.6,.9],[298,420,1.3,.7],[272,448,1.8,.8],[306,446,1.2,.55],
                    [250,436,1.1,.5],[290,404,1.4,.65],[316,430,1,.45],[258,458,1.2,.5],
                    [284,466,1,.4],[238,422,.9,.35],
                  ].map(([x,y,r,o], i) => (
                    <circle key={i} cx={x} cy={y} r={r} opacity={o} />
                  ))}
                </g>
                <text className="gs-gutlabel" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', fill: '#7FD0E6' }} x="280" y="498" textAnchor="middle">Your gut</text>
              </g>

              {/* Nodes */}
              {orderedKeys.map((k, i) => {
                const c = NODE_COORDS[k]
                const node = nodeMap[k]
                const label = node?.label || k.charAt(0).toUpperCase() + k.slice(1)
                const pingDelay = PULSE_DELAYS[k]
                return (
                  <g
                    key={k}
                    className={`gs-arm gs-nfade gs-n${i+1} gs-node${selectedKey === k ? ' sel' : ''}`}
                    data-k={k}
                    role="button"
                    tabIndex={0}
                    aria-label={`How your gut connects to ${label}`}
                    style={{ animationDelay: `${NODE_ANIM_DELAYS[k]}s` }}
                    onClick={e => { e.stopPropagation(); selectedKey === k ? closeNode() : openNode(k) }}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNode(k) } }}
                  >
                    <circle className="gs-hit" cx={c.cx} cy={c.cy} r="34" fill="transparent" />
                    <circle className="gs-ring" cx={c.cx} cy={c.cy} r="23" fill="none" stroke="#7FD0E6" strokeWidth="1.3" />
                    <circle cx={c.cx} cy={c.cy} r="16" fill="url(#gsNodeGlow)" />
                    <circle className="gs-ping" cx={c.cx} cy={c.cy} r="15" fill="none" stroke="#7FD0E6" strokeWidth="1.3" opacity="0">
                      <animate attributeName="r" values="14;31" dur="3.2s" begin={`${pingDelay}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;.5;0" dur="3.2s" begin={`${pingDelay}s`} repeatCount="indefinite" />
                    </circle>
                    <g className="gs-nicon" transform={`translate(${c.cx - 8},${c.cy - 8})`} dangerouslySetInnerHTML={{ __html: NODE_ICONS[k] || '' }} />
                    <text
                      className="gs-nlabel"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', fill: 'rgba(255,255,255,.56)' }}
                      x={c.labelX}
                      y={c.labelY}
                      textAnchor={c.labelAnchor as any}
                    >
                      {label}
                    </text>
                  </g>
                )
              })}

              {/* Traveling pulses */}
              <g className="gs-pulses" aria-hidden="true">
                {orderedKeys.map((k, i) => {
                  const delay = PULSE_DELAYS[k]
                  return (
                    <circle key={k} r="2.8" fill="#BFEFFA">
                      <animateMotion dur="3.4s" begin={`${delay}s`} repeatCount="indefinite" path={PATH_D[k]} />
                      <animate attributeName="opacity" dur="3.4s" begin={`${delay}s`} repeatCount="indefinite" values="0;.95;.95;0" keyTimes="0;.12;.8;1" />
                    </circle>
                  )
                })}
              </g>
            </svg>
          </div>

          {/* Content overlay */}
          <div className="gs-content">
            {heading && (
              <div className="gs-h">
                <RichText data={heading} enableGutter={false} enableProse={false} />
              </div>
            )}
            {bodyCopy && <p className="gs-cap">{bodyCopy}</p>}
            {hintText && (
              <div className={`gs-hint${hintGone ? ' gone' : ''}`}>
                <span className="gs-hint-dot" />
                {hintText}
              </div>
            )}

            {/* Mobile radial mini-map */}
            <div className="gs-radial">
              <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="gsMiniGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5FD3E8" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#19A8CC" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#0E2740" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="gsMiniNodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#19A8CC" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#19A8CC" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Lines */}
                {MOBILE_NODE_POSITIONS.map(m => (
                  <path key={m.k} className="gs-rline" fill="none" d={getMobilePath(m.x, m.y)} />
                ))}

                {/* Traveling pulses */}
                {MOBILE_NODE_POSITIONS.map((m, i) => (
                  <circle key={m.k} r="2.6" fill="#BFEFFA">
                    <animateMotion dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={getMobilePath(m.x, m.y)} />
                    <animate attributeName="opacity" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" values="0;.95;.95;0" keyTimes="0;.15;.8;1" />
                  </circle>
                ))}

                {/* Center gut */}
                <circle cx={MOBILE_CX} cy={MOBILE_CY} r="50" fill="url(#gsMiniGlow)" />
                {[[-16,-12,1.6,.9],[18,-9,1.3,.7],[-10,14,1.7,.8],[12,15,1.2,.6],[-23,3,1.1,.5],[7,-18,1.3,.6],[22,8,1,.45],[-6,21,1,.4]].map(([ox,oy,r,op], i) => (
                  <circle key={i} cx={MOBILE_CX + ox} cy={MOBILE_CY + oy} r={r} fill="#7FD6EC" opacity={op} />
                ))}
                <circle cx={MOBILE_CX} cy={MOBILE_CY} r="6" fill="#CFF1FB" />
                <text className="gs-rgut-label" x={MOBILE_CX} y={MOBILE_CY + 36} textAnchor="middle">Your gut</text>

                {/* Mobile nodes */}
                {MOBILE_NODE_POSITIONS.map(m => {
                  const node = nodeMap[m.k]
                  const label = node?.label || m.k.charAt(0).toUpperCase() + m.k.slice(1)
                  return (
                    <g
                      key={m.k}
                      className={`gs-rnode${sheetKey === m.k ? ' sel' : ''}`}
                      data-k={m.k}
                      role="button"
                      tabIndex={0}
                      aria-label={`How your gut connects to ${label}`}
                      onClick={() => setSheetKey(m.k)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSheetKey(m.k) } }}
                    >
                      <circle className="rhit" cx={m.x} cy={m.y} r="32" fill="transparent" />
                      <circle cx={m.x} cy={m.y} r="19" fill="url(#gsMiniNodeGlow)" />
                      <circle className="rring" cx={m.x} cy={m.y} r="20" />
                      <g className="ricon" transform={`translate(${m.x - 8},${m.y - 8})`} dangerouslySetInnerHTML={{ __html: NODE_ICONS[m.k] || '' }} />
                      <text className="rlabel" x={m.x} y={m.y + 36} textAnchor="middle">{label}</text>
                    </g>
                  )
                })}
              </svg>
              <span className="gs-radial-hint">Tap any connection to see what your gut reveals</span>
            </div>
          </div>

          {/* Connector stem */}
          <div ref={stemRef} className={`gs-stem${selectedKey ? ' open' : ''}`}>
            <span className="gs-stem-dot" />
            <span className="gs-stem-line" />
          </div>

          {/* Desktop popover */}
          <div
            ref={popRef}
            className={`gs-pop${selectedKey ? ' open' : ''}`}
            role="dialog"
            aria-live="polite"
            onClick={e => e.stopPropagation()}
          >
            <button className="gs-pop-x" type="button" aria-label="Close" onClick={e => { e.stopPropagation(); closeNode() }}>×</button>
            <div className="gs-pop-k">What your gut reveals</div>
            <h3 className="gs-pop-t">{selectedNode?.title || ''}</h3>
            <p className="gs-pop-b">{selectedNode?.body || ''}</p>
          </div>
        </section>
      </div>

      {/* Mobile bottom sheet — portaled via direct DOM */}
      {sheetKey !== null && (
        <>
          <div className="gs-sheet-scrim open" onClick={() => setSheetKey(null)} />
          <div className="gs-sheet open" role="dialog" aria-live="polite">
            <div className="gs-sheet-grip" />
            <div className="gs-sheet-k">What your gut reveals</div>
            <h3 className="gs-sheet-t">{nodeMap[sheetKey]?.title || ''}</h3>
            <p className="gs-sheet-b">{nodeMap[sheetKey]?.body || ''}</p>
          </div>
        </>
      )}
    </>
  )
}
