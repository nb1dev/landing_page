'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BgColorPreset = 'off' | 'paper' | 'cream' | 'navy' | 'navyDeep' | 'teal' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

function isDarkPreset(p?: BgColorPreset | null) {
  return p === 'navy' || p === 'navyDeep' || p === 'teal'
}
function resolveBg(p?: BgColorPreset | null, c?: string | null) {
  if (!p || p === 'off') return '#F1F4F7'
  if (p === 'paper') return '#FFFFFF'
  if (p === 'cream') return '#FAF8F2'
  if (p === 'navy') return '#12314D'
  if (p === 'navyDeep') return '#0E2740'
  if (p === 'teal') return '#0A8FB0'
  if (p === 'custom') return c || '#F1F4F7'
  return '#F1F4F7'
}

type Metric = { name?: string | null; value?: string | null; max?: string | null; amber?: boolean | null }
type Scale = { label?: string | null; pct?: number | null; amber?: boolean | null }
type Team = { name?: string | null; pct?: number | null; statusLabel?: string | null; statusType?: 'ok' | 'low' | null }
type MapRow = { key?: string | null; value?: string | null }
type Card = {
  cardType?: 'gauge' | 'scales' | 'teams' | 'map' | null
  heading?: string | null
  flag?: string | null
  score?: string | null
  metrics?: Metric[] | null
  scales?: Scale[] | null
  teams?: Team[] | null
  mapRows?: MapRow[] | null
}
type View = {
  pillLabel?: string | null
  title?: string | null
  items?: { heading?: string | null; body?: string | null }[] | null
  card?: Card | null
}

export type YpDashboardBlockType = {
  blockType?: 'ypDashboard'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  eyebrow?: string | null
  heading?: DefaultTypedEditorState | null
  lede?: DefaultTypedEditorState | null
  phoneImage?: MediaLike
  reportLabel?: string | null
  reportModalTitle?: string | null
  reportImage?: MediaLike
  views?: View[] | null
  boardFaces?: { image?: MediaLike | string }[] | null
  boardText?: string | null
  boardLinkLabel?: string | null
  boardLinkUrl?: string | null
  ownLabel?: string | null
  ownBody?: string | null
}

function imgUrl(img?: MediaLike | string) {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
const pctStr = (n?: number | null) => `${Math.max(0, Math.min(100, Number(n) || 0))}%`
const numFrom = (s?: string | null) => {
  const n = parseFloat(String(s ?? '').replace(',', '.'))
  return isFinite(n) ? n : 0
}
const ratioPct = (value?: string | null, max?: string | null) => {
  const m = numFrom(max)
  return m > 0 ? (numFrom(value) / m) * 100 : 0
}

export const YpDashboardComponent: React.FC<YpDashboardBlockType> = ({
  backgroundColor,
  backgroundColorCustom,
  backgroundType,
  backgroundImage,
  grain,
  eyebrow,
  heading,
  lede,
  phoneImage,
  reportLabel,
  reportModalTitle,
  reportImage,
  views,
  boardFaces,
  boardText,
  boardLinkLabel,
  boardLinkUrl,
  ownLabel,
  ownBody,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLSpanElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const aRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoveringRef = useRef(false)

  const [revealed, setRevealed] = useState(false)
  const [inView, setInView] = useState(false)
  const [activeView, setActiveView] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [stopped, setStopped] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

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

  const reportImageUrl = imgUrl(reportImage)

  useEffect(() => {
    if (!reportOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReportOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [reportOpen])

  const safeViews = views ?? []
  const vCount = safeViews.length
  const view = safeViews[activeView] || safeViews[0]
  const items = view?.items ?? []
  const iCount = items.length
  const phone = imgUrl(phoneImage)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setRevealed(true), { threshold: 0.08 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    section.querySelectorAll<HTMLElement>('[data-cv]').forEach((el) => {
      const raw = el.dataset.cv ?? ''
      const target = parseFloat(raw)
      if (isNaN(target)) return
      const dec = (raw.split('.')[1] ?? '').length
      let t0: number | null = null
      const dur = 1150
      const step = (ts: number) => {
        if (!t0) t0 = ts
        const p = Math.min((ts - t0) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = (target * e).toFixed(dec) + '%'
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = raw + '%'
      }
      requestAnimationFrame(step)
    })
  }, [revealed])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    // Lower threshold so the section counts as "in view" as soon as any part
    // of it enters the viewport — 0.3 was too high for tall mobile layouts.
    const o = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.08 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  // auto-advance accordion within the active view
  useEffect(() => {
    if (!inView || iCount <= 1) return
    // Resume auto-advance 6s after the user last clicked an item.
    let resumeTimer: ReturnType<typeof setTimeout> | null = null
    if (stopped) {
      resumeTimer = setTimeout(() => setStopped(false), 6000)
      return () => { if (resumeTimer) clearTimeout(resumeTimer) }
    }
    const id = setInterval(() => {
      if (!hoveringRef.current) setActiveItem((i) => (i + 1) % iCount)
    }, 3600)
    return () => clearInterval(id)
  }, [inView, stopped, iCount, activeView])

  // paint accordion heights + progress rail
  useLayoutEffect(() => {
    aRefs.current.forEach((a, i) => {
      if (!a) return
      a.style.maxHeight = i === activeItem ? `${a.scrollHeight}px` : '0px'
    })
    const act = itemRefs.current[activeItem]
    if (railRef.current && act) {
      railRef.current.style.height = `${Math.max(0, act.offsetTop + act.offsetHeight - 8)}px`
    }
  }, [activeItem, activeView, iCount, revealed])

  const onPill = (i: number) => {
    setActiveView(i)
    setActiveItem(0)
  }
  const onItem = (i: number) => {
    setStopped(true)
    setActiveItem(i)
  }

  const card = view?.card
  const cardType = card?.cardType || 'gauge'

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className={['wt-sec', grain !== false ? 'grain' : '', isDark ? 'is-dark' : ''].join(' ')}
    >
      <style jsx>{`
        .wt-sec {
          padding: 84px 0;
          position: relative;
          overflow: hidden;
          color: #12314d;
        }
        .wt-sec.is-dark {
          color: #ffffff;
        }
        .wt-sec::after {
          display: none;
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
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          position: relative;
          z-index: 1;
        }
        .reveal {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 0.84, 0.44, 1);
        }
        .reveal.in {
          opacity: 1;
        }

        /* head */
        .eyebrow {
          /* Hidden per design direction — headlines lead the section heads.
             Field stays editable in Payload; it simply never renders. */
          display: none !important;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a8fb0;
        }
        .eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #0a8fb0;
        }
        .wt-head :global(h2) {
          margin-top: 14px;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.02;
          font-size: clamp(32px, 4vw, 52px);
          color: #12314d;
        }
        .wt-sec.is-dark .wt-head :global(h2) {
          color: #ffffff;
        }
        .wt-head :global(.teal) {
          color: #0a8fb0;
        }
        .wt-lede {
          margin-top: 14px;
          max-width: 560px;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 400;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
        }
        .wt-sec.is-dark .wt-lede {
          color: rgba(255, 255, 255, 0.7);
        }
        .wt-lede :global(p) {
          margin: 0;
        }

        /* pills */
        .wt-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 32px 0 36px;
        }
        .wt-pill {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(18, 49, 77, 0.55);
          background: #fff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 100px;
          padding: 11px 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wt-pill:hover {
          color: #12314d;
          border-color: rgba(18, 49, 77, 0.4);
        }
        .wt-pill.active {
          background: #12314d;
          color: #fff;
          border-color: #12314d;
        }

        /* view grid */
        .wt-view {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 48px;
          align-items: start;
        }
        .wt-left {
          display: flex;
          flex-direction: column;
        }
        .wt-title {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(24px, 2.6vw, 32px);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .wt-list {
          position: relative;
          padding-left: 22px;
          overflow: hidden;
        }
        .wt-rail {
          position: absolute;
          left: 3px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 3px;
          background: rgba(18, 49, 77, 0.1);
          overflow: hidden;
          pointer-events: none;
        }
        .wt-rail i {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 0;
          max-height: 100%;
          background: #0a8fb0;
          border-radius: 3px;
          transition: height 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wt-item {
          border-top: 1px solid rgba(18, 49, 77, 0.1);
        }
        .wt-item:last-child {
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
        }
        .wt-q {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 20px 0;
          cursor: pointer;
          color: #12314d;
          font-family: 'Inter', sans-serif;
        }
        .wt-n {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #0a8fb0;
          font-weight: 500;
        }
        .wt-h {
          font-size: 16.5px;
          font-weight: 600;
          color: rgba(18, 49, 77, 0.55);
          transition: color 0.2s;
        }
        .wt-item.open .wt-h,
        .wt-q:hover .wt-h {
          color: #12314d;
        }
        .wt-a {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 0.84, 0.44, 1);
        }
        .wt-a p {
          padding: 0 0 22px 38px;
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
          max-width: 440px;
          margin: 0;
        }
        .wt-report-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #12314d;
          background: #fff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 100px;
          padding: 11px 20px;
          cursor: pointer;
          transition: all 0.18s;
          text-decoration: none;
        }
        .wt-report-cta:hover {
          border-color: #12314d;
          transform: translateY(-1px);
        }
        .wt-report-cta .arr {
          transition: transform 0.2s;
        }
        .wt-report-cta:hover .arr {
          transform: translateX(3px);
        }
        .wt-report-inline {
          margin-top: 32px;
          align-self: flex-start;
        }

        /* right: phone + card */
        .wt-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 540px;
        }
        .wt-right::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 4%;
          transform: translateX(-50%);
          width: 40%;
          height: 34px;
          background: radial-gradient(ellipse at center, rgba(18, 49, 77, 0.34), transparent 72%);
          filter: blur(10px);
          pointer-events: none;
          z-index: 0;
        }
        .wt-phone {
          position: relative;
          width: 46%;
          aspect-ratio: 9/19;
          border-radius: 54px;
          padding: 3px;
          background: linear-gradient(
            150deg,
            #9fb0bf 0%,
            #eef3f7 8%,
            #54636f 24%,
            #c8d2db 50%,
            #4d5b69 78%,
            #d2dae2 93%,
            #8493a2 100%
          );
          box-shadow: 0 50px 80px -38px rgba(18, 49, 77, 0.55);
        }
        .wt-bezel {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 51px;
          background: #000;
          overflow: hidden;
        }
        .wt-bezel::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: 51px;
          box-shadow: inset 0 0 0 8px #000;
          pointer-events: none;
        }
        .wt-screen {
          position: absolute;
          inset: 7px;
          width: auto;
          height: auto;
          border-radius: 44px;
          object-fit: cover;
          object-position: center;
          opacity: 1;
          filter: blur(3px) brightness(0.5) saturate(1.1);
        }
        .wt-pscrim {
          position: absolute;
          inset: 7px;
          border-radius: 44px;
          background: rgba(6, 12, 20, 0.42);
        }
        .wt-notch {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 32%;
          height: 24px;
          border-radius: 14px;
          background: #05080d;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
          z-index: 4;
        }
        .wt-card {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 62%;
          min-width: 288px;
          background:
            radial-gradient(120% 90% at 100% 0%, rgba(10, 143, 176, 0.22) 0%, transparent 55%),
            linear-gradient(158deg, rgba(20, 48, 70, 0.88) 0%, rgba(9, 21, 36, 0.9) 80%);
          -webkit-backdrop-filter: blur(12px) saturate(130%);
          backdrop-filter: blur(12px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 20px;
          padding: 24px 26px;
          color: #fff;
          box-shadow: 0 40px 80px -36px rgba(0, 0, 0, 0.6);
        }
        .wt-ch {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #13a6cc;
          margin-bottom: 18px;
        }

        /* gauge */
        .wtg-lbl {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }
        .wtg-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 6px 0 14px;
        }
        .wtg-flag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #5a4410;
          background: #e8c26a;
          border-radius: 100px;
          padding: 5px 12px;
        }
        .wtg-score {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 40px;
          letter-spacing: -0.03em;
          color: #fff;
          margin-left: auto;
        }
        .wtg-track {
          position: relative;
          height: 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.16);
        }
        .wtg-track i {
          display: block;
          height: 100%;
          border-radius: 4px;
          background: #13a6cc;
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }
        .wtg-knob {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #13a6cc;
          border: 3px solid #0c1f33;
          transition: left 1s cubic-bezier(.4,0,.2,1);
        }
        .wtg-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 14px;
        }
        .wpr {
          display: grid;
          grid-template-columns: 96px 1fr 54px;
          gap: 12px;
          align-items: center;
          padding: 6px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wpr:first-child {
          border-top: none;
        }
        .wpr .n {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.7);
        }
        .wpr .t {
          height: 4px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.16);
          overflow: hidden;
        }
        .wpr .t i {
          display: block;
          height: 100%;
          background: #13a6cc;
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }
        .wpr .t i.am {
          background: #e0863c;
        }
        .wpr .v {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #fff;
          text-align: right;
        }
        .wpr .v small {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        /* scales */
        .wt-scales {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ws-t {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 9px;
        }
        .ws-t b {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          color: #fff;
        }
        .ws-t b.am {
          color: #e0863c;
        }
        .ws-tr {
          position: relative;
          height: 4px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.16);
        }
        .ws-tr i {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #13a6cc;
          border: 2px solid #0c1f33;
          transition: left 1s cubic-bezier(.4,0,.2,1);
        }
        .ws-tr i.am {
          background: #e0863c;
        }

        /* teams */
        .wt-teams {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .wtm {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 70px auto;
          gap: 12px;
          align-items: center;
          font-size: 13px;
        }
        .wtm-n {
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wtm-bar {
          height: 4px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.16);
          overflow: hidden;
        }
        .wtm-bar i {
          display: block;
          height: 100%;
          background: #13a6cc;
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }
        .wtm-bar i.am {
          background: #e0863c;
        }
        @media (prefers-reduced-motion: reduce) {
          .wtg-track i, .wtg-knob, .wpr .t i, .ws-tr i, .wtm-bar i { transition: none !important; }
        }
        .wtm-s {
          font-size: 11px;
          font-weight: 600;
        }
        .wtm-s.ok {
          color: #13a6cc;
        }
        .wtm-s.low {
          color: #e0863c;
        }

        /* map */
        .wt-map {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wm {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wm:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .wm-k {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.55);
        }
        .wm-v {
          font-size: 14.5px;
          font-weight: 500;
          color: #fff;
        }

        /* board + own */
        .wt-board {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 18px auto 0;
          max-width: 660px;
          padding-top: 28px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
          position: relative;
          z-index: 3;
          text-align: left;
        }
        .wt-board .faces {
          display: flex;
          flex-shrink: 0;
        }
        .wt-board .faces img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(18, 49, 77, 0.18);
          margin-left: -11px;
        }
        .wt-board .faces img:first-child {
          margin-left: 0;
        }
        .wt-board .bcopy {
          font-size: 13px;
          color: rgba(18, 49, 77, 0.55);
        }
        .wt-sec.is-dark .wt-board .bcopy {
          color: rgba(255, 255, 255, 0.55);
        }
        .wt-board .bcopy a {
          color: #0a8fb0;
          font-weight: 600;
        }
        .wt-own {
          margin: 26px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(18, 49, 77, 0.1);
          max-width: 720px;
          text-align: center;
        }
        .wt-own-k {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0a8fb0;
          margin-bottom: 10px;
        }
        .wt-own p {
          font-size: 15px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.6;
          margin: 0;
        }
        .wt-sec.is-dark .wt-own p {
          color: rgba(255, 255, 255, 0.7);
        }

        /* sample report modal */
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        .report-modal {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
        }
        .report-modal.open {
          display: flex;
        }
        .report-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(8, 20, 34, 0.6);
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          animation: fadein 0.25s ease;
        }
        .report-dialog {
          position: relative;
          width: 100%;
          max-width: 680px;
          height: 88vh;
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 50px 100px -30px rgba(8, 20, 34, 0.6);
          animation: fadeup 0.3s ease;
        }
        .report-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 22px;
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
          flex-shrink: 0;
        }
        .report-ttl {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #12314d;
        }
        .report-x {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(18, 49, 77, 0.1);
          background: #fff;
          color: rgba(18, 49, 77, 0.55);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          transition: all 0.18s;
        }
        .report-x:hover {
          background: #f1f4f7;
          color: #12314d;
        }
        .report-scroll {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          background: #f1f4f7;
        }
        .report-scroll img {
          display: block;
          width: 100%;
          height: auto;
        }

        @media (max-width: 860px) {
          .wt-view {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .wt-right {
            order: -1;
            position: relative;
            display: block;
            width: 100%;
            min-height: 0;
            padding: 44px 0 0;
            overflow: hidden;
          }
          .wt-right::after {
            display: none;
          }
          .wt-left {
            order: 1;
          }
          .wt-phone {
            display: block;
            position: absolute;
            top: 14px;
            left: 50%;
            transform: translateX(-50%);
            width: 64%;
            max-width: 212px;
            z-index: 1;
            box-shadow: 0 22px 44px -28px rgba(18, 49, 77, 0.4);
          }
          .wt-card {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            z-index: 2;
            width: 100%;
            min-width: 0;
            margin-top: 50px;
          }
        }
        @media (max-width: 640px) {
          .wt-sec {
            padding: 56px 0;
          }
          .wrap {
            padding: 0 20px;
          }
          .wt-pills {
            gap: 7px;
          }
          .wt-pill {
            padding: 9px 15px;
            font-size: 12.5px;
          }
          .wt-report-inline {
            margin-top: 22px;
          }
          .wt-own p {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="wrap">
        {(eyebrow || heading || lede) && (
          <div className={['wt-head reveal', revealed ? 'in' : ''].join(' ')}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {lede && (
              <div className="wt-lede">
                <RichText data={lede as any} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>
        )}

        {vCount > 0 && (
          <>
            <div className={['wt-pills reveal', revealed ? 'in' : ''].join(' ')} role="tablist">
              {safeViews.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeView}
                  className={['wt-pill', i === activeView ? 'active' : ''].join(' ')}
                  onClick={() => onPill(i)}
                >
                  {v.pillLabel}
                </button>
              ))}
            </div>

            <div
              ref={stageRef}
              className={['reveal', revealed ? 'in' : ''].join(' ')}
              onMouseEnter={() => (hoveringRef.current = true)}
              onMouseLeave={() => (hoveringRef.current = false)}
            >
              <div className="wt-view" key={activeView}>
                <div className="wt-left">
                  {view?.title && <div className="wt-title">{view.title}</div>}
                  <div className="wt-list" ref={listRef}>
                    {items.map((it, i) => (
                      <div
                        key={i}
                        ref={(el) => {
                          itemRefs.current[i] = el
                        }}
                        className={['wt-item', i === activeItem ? 'open' : ''].join(' ')}
                      >
                        <button type="button" className="wt-q" onClick={() => onItem(i)}>
                          <span className="wt-n">{String(i + 1).padStart(2, '0')}</span>
                          <span className="wt-h">{it.heading}</span>
                        </button>
                        <div
                          className="wt-a"
                          ref={(el) => {
                            aRefs.current[i] = el
                          }}
                        >
                          <p>{it.body}</p>
                        </div>
                      </div>
                    ))}
                    <div className="wt-rail" aria-hidden="true">
                      <i ref={railRef} />
                    </div>
                  </div>
                  {reportLabel && (
                    <button
                      type="button"
                      className="wt-report-cta wt-report-inline"
                      onClick={() => reportImageUrl && setReportOpen(true)}
                    >
                      {reportLabel} <span className="arr">→</span>
                    </button>
                  )}
                </div>

                <div className="wt-right">
                  <div className="wt-phone">
                    <div className="wt-bezel">
                      {phone && <img className="wt-screen" src={phone} alt="" />}
                      <div className="wt-pscrim" />
                      <div className="wt-notch" />
                    </div>
                  </div>

                  <div className="wt-card" style={{ opacity: 0.9 }}>
                    {cardType === 'gauge' && (
                      <>
                        {card?.heading && <div className="wtg-lbl">{card.heading}</div>}
                        <div className="wtg-row">
                          {card?.flag && <span className="wtg-flag">{card.flag}</span>}
                          {card?.score && <span className="wtg-score">{card.score}</span>}
                        </div>
                        <div className="wtg-track">
                          <i style={{ width: revealed ? pctStr(numFrom(card?.score)) : '0%' }} />
                          <span className="wtg-knob" style={{ left: revealed ? pctStr(numFrom(card?.score)) : '0%' }} />
                        </div>
                        {card?.metrics && card.metrics.length > 0 && (
                          <div className="wtg-list">
                            {card.metrics.map((m, i) => (
                              <div className="wpr" key={i}>
                                <span className="n">{m.name}</span>
                                <span className="t">
                                  <i className={m.amber ? 'am' : ''} style={{ width: revealed ? pctStr(ratioPct(m.value, m.max)) : '0%', transitionDelay: `${i * 0.06 + 0.12}s` }} />
                                </span>
                                <span className="v">
                                  {m.value}
                                  {m.max && <small>/{m.max}</small>}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {cardType === 'scales' && (
                      <>
                        {card?.heading && <div className="wt-ch">{card.heading}</div>}
                        <div className="wt-scales">
                          {(card?.scales ?? []).map((s, i) => (
                            <div className="ws" key={i}>
                              <div className="ws-t">
                                <span>{s.label}</span>
                                <b className={s.amber ? 'am' : ''} data-cv={s.pct != null ? String(s.pct) : undefined}>{pctStr(s.pct)}</b>
                              </div>
                              <div className="ws-tr">
                                <i className={s.amber ? 'am' : ''} style={{ left: revealed ? pctStr(s.pct) : '0%', transitionDelay: `${i * 0.06 + 0.12}s` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {cardType === 'teams' && (
                      <>
                        {card?.heading && <div className="wt-ch">{card.heading}</div>}
                        <div className="wt-teams">
                          {(card?.teams ?? []).map((t, i) => {
                            const low = t.statusType === 'low'
                            return (
                              <div className="wtm" key={i}>
                                <span className="wtm-n">{t.name}</span>
                                <span className="wtm-bar">
                                  <i className={low ? 'am' : ''} style={{ width: revealed ? pctStr(t.pct) : '0%', transitionDelay: `${i * 0.06 + 0.12}s` }} />
                                </span>
                                <span className={['wtm-s', low ? 'low' : 'ok'].join(' ')}>
                                  {t.statusLabel}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}

                    {cardType === 'map' && (
                      <>
                        {card?.heading && <div className="wt-ch">{card.heading}</div>}
                        <div className="wt-map">
                          {(card?.mapRows ?? []).map((m, i) => (
                            <div className="wm" key={i}>
                              <span className="wm-k">{m.key}</span>
                              <span className="wm-v">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {(boardFaces?.length || boardText) && (
          <div className={['wt-board reveal', revealed ? 'in' : ''].join(' ')}>
            {boardFaces && boardFaces.length > 0 && (
              <div className="faces">
                {boardFaces.map((f, i) => {
                  const u = imgUrl(f.image)
                  return u ? <img key={i} src={u} alt="" /> : null
                })}
              </div>
            )}
            <div className="bcopy">
              {boardText}{' '}
              {boardLinkLabel && (
                <a href={boardLinkUrl || '#'}>
                  {boardLinkLabel} →
                </a>
              )}
            </div>
          </div>
        )}

        {(ownLabel || ownBody) && (
          <div className={['wt-own reveal', revealed ? 'in' : ''].join(' ')}>
            {ownLabel && <div className="wt-own-k">{ownLabel}</div>}
            {ownBody && <p>{ownBody}</p>}
          </div>
        )}
      </div>

      {reportOpen && reportImageUrl && (
        <div className="report-modal open" aria-hidden="false">
          <div className="report-backdrop" onClick={() => setReportOpen(false)} />
          <div
            className="report-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={reportModalTitle || 'Sample report'}
          >
            <div className="report-bar">
              <span className="report-ttl">{reportModalTitle}</span>
              <button
                className="report-x"
                type="button"
                aria-label="Close"
                onClick={() => setReportOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="report-scroll">
              <img src={reportImageUrl} alt={reportModalTitle || ''} loading="lazy" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
