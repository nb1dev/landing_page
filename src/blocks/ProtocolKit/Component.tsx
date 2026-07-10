'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useProtocolReveal } from '@/hooks/useProtocolReveal'

type MediaLike = { url?: string | null; alt?: string | null; mimeType?: string | null } | string | null | undefined

type WatchPill = { title?: string | null; meta?: string | null; ariaLabel?: string | null }
type Video = { file?: MediaLike; poster?: MediaLike; modalAriaLabel?: string | null }

export type ProtocolKitBlockType = {
  blockType?: 'protocolKit'
  heading?: DefaultTypedEditorState | null
  kitImage?: MediaLike
  reassure1?: DefaultTypedEditorState | null
  reassure2?: string | null
  watchPill?: WatchPill | null
  video?: Video | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

export const ProtocolKitComponent: React.FC<ProtocolKitBlockType> = ({
  heading,
  kitImage,
  reassure1,
  reassure2,
  watchPill,
  video,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  useProtocolReveal(sectionRef, '[data-rv]')

  const modalRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const videoUrl = imgUrl(video?.file)
  const posterUrl = imgUrl(video?.poster)
  const hasVideo = !!videoUrl

  useEffect(() => {
    if (!hasVideo) return
    const modal = modalRef.current
    const v = videoRef.current
    if (!modal || !v) return
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !modal.hidden) close()
    }
    function close() {
      v?.pause()
      if (modal) {
        modal.hidden = true
        modal.setAttribute('aria-hidden', 'true')
      }
      document.body.style.overflow = ''
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [hasVideo])

  const openModal = () => {
    const modal = modalRef.current
    const v = videoRef.current
    if (!modal || !v) return
    modal.hidden = false
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }
  const closeModal = () => {
    const modal = modalRef.current
    const v = videoRef.current
    if (!modal || !v) return
    v.pause()
    modal.hidden = true
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  return (
    <section className="pr-kit-sec" id="kit" ref={sectionRef}>
      <style jsx>{`
        .pr-kit-sec {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          padding: 88px 0;
          background: #fff;
        }
        .pr-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .pr-kit {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: stretch;
          margin-top: 30px;
        }
        .kit-head-m {
          display: none;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
        }
        .kit-head-m :global(em) {
          display: block;
          white-space: normal;
          font-style: normal;
          color: #0a8fb0;
        }
        .pr-kit-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 20px;
          border: 1px solid #e7edf3;
          box-shadow: 0 34px 66px -42px rgba(14, 39, 64, 0.42);
        }
        .pr-kit-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }
        .pr-kit-col :global(h2) {
          margin-top: 14px;
          max-width: 30ch;
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
        }
        .pr-kit-col :global(em) {
          display: block;
          white-space: normal;
          font-style: normal;
          color: #0a8fb0;
        }
        .pr-reassure {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          font-size: 17px;
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.7);
        }
        .pr-reassure :global(b),
        .pr-reassure :global(strong) {
          color: #12314d;
        }
        .pr-reassure2 {
          margin-top: 20px;
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.55);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
        }

        :global(html.pr-rv-on) .pr-kit-sec [data-rv] {
          opacity: 0;
          transform: translateY(15px);
        }
        :global(html.pr-rv-on) .pr-kit-sec [data-rv].in {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .pr-watchpill {
          margin-top: 44px;
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 12px 26px 12px 12px;
          background: #fff;
          border: 1px solid #e4ebf1;
          border-radius: 999px;
          cursor: pointer;
          font: inherit;
          text-align: left;
          box-shadow: 0 16px 38px -30px rgba(14, 39, 56, 0.5);
          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease,
            transform 0.18s ease;
        }
        .pr-watchpill:hover {
          border-color: rgba(10, 143, 176, 0.4);
          box-shadow: 0 22px 46px -28px rgba(14, 39, 56, 0.55);
          transform: translateY(-1px);
        }
        .pr-watchpill-ico {
          flex: none;
          width: 54px;
          height: 54px;
          border-radius: 13px;
          background: #0e2740;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s ease;
        }
        .pr-watchpill:hover .pr-watchpill-ico {
          background: #12314d;
        }
        .pr-watchpill-ico :global(svg) {
          width: 22px;
          height: 22px;
          fill: currentColor;
          margin-left: 3px;
        }
        .pr-watchpill-txt {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .pr-watchpill-t {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: #12314d;
        }
        .pr-watchpill-m {
          font-family: ui-monospace, Menlo, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(18, 49, 77, 0.45);
        }

        .pr-vmodal {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .pr-vmodal[hidden] {
          display: none;
        }
        .pr-vmodal-scrim {
          position: absolute;
          inset: 0;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(9, 22, 38, 0.72);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          animation: vmfade 0.25s ease;
        }
        .pr-vmodal-box {
          position: relative;
          width: min(880px, 92vw);
          border-radius: 18px;
          overflow: hidden;
          background: #0e2740;
          box-shadow: 0 50px 100px -40px rgba(0, 0, 0, 0.7);
          animation: vmpop 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pr-vmodal-box video {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          background: #0e2740;
        }
        .pr-vmodal-x {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: rgba(9, 22, 38, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.16s ease;
        }
        .pr-vmodal-x:hover {
          background: rgba(9, 22, 38, 0.85);
        }
        .pr-vmodal-x :global(svg) {
          width: 20px;
          height: 20px;
        }
        @keyframes vmfade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes vmpop {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 760px) {
          .pr-kit {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .pr-kit-img {
            height: auto;
          }
          .pr-kit-col {
            justify-content: flex-start;
          }
          .pr-kit-col :global(h2) {
            display: none;
          }
          .kit-head-m {
            display: block;
            margin: 0 0 2px;
            max-width: 30ch;
          }
          .pr-watchpill {
            margin-top: 34px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pr-watchpill,
          .pr-vmodal-scrim,
          .pr-vmodal-box {
            transition: none;
            animation: none;
          }
        }
      `}</style>

      <div className="pr-wrap">
        <div className="pr-kit">
          {heading && (
            <h2 className="kit-head-m">
              <RichText data={heading as any} enableGutter={false} enableProse={false} />
            </h2>
          )}
          {kitImage && <img className="pr-kit-img" src={imgUrl(kitImage)} alt={imgAlt(kitImage)} data-rv="" />}
          <div className="pr-kit-col" data-rv="">
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {reassure1 && (
              <div className="pr-reassure" style={{ marginTop: 30 }}>
                <RichText data={reassure1 as any} enableGutter={false} enableProse={false} />
              </div>
            )}
            {reassure2 && <p className="pr-reassure2">{reassure2}</p>}
            {hasVideo && (
              <button className="pr-watchpill" type="button" aria-label={watchPill?.ariaLabel || undefined} onClick={openModal}>
                <span className="pr-watchpill-ico">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </span>
                <span className="pr-watchpill-txt">
                  <span className="pr-watchpill-t">{watchPill?.title}</span>
                  <span className="pr-watchpill-m">{watchPill?.meta}</span>
                </span>
              </button>
            )}
          </div>
        </div>

        {hasVideo && (
          <div className="pr-vmodal" hidden ref={modalRef} aria-hidden="true">
            <button className="pr-vmodal-scrim" aria-label="Close video" tabIndex={-1} onClick={closeModal}></button>
            <div className="pr-vmodal-box" role="dialog" aria-label={video?.modalAriaLabel || undefined}>
              <button className="pr-vmodal-x" aria-label="Close video" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18"></path>
                </svg>
              </button>
              <video ref={videoRef} controls playsInline preload="metadata" poster={posterUrl || undefined}>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
