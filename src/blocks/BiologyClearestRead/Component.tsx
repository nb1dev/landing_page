'use client'

import React, { useEffect, useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined
type Item = { title?: DefaultTypedEditorState | null; body?: string | null }

export type BiologyClearestReadBlockType = {
  blockType?: 'biologyClearestRead'
  heading?: DefaultTypedEditorState | null
  subheading?: string | null
  image?: MediaLike
  items?: Item[] | null
  closingText?: string | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

export const BiologyClearestReadComponent: React.FC<BiologyClearestReadBlockType> = ({
  heading,
  subheading,
  image,
  items,
  closingText,
}) => {
  const rows = items ?? []
  const sectionRef = useRef<HTMLElement | null>(null)

  // Ported from the mockup's ".wl-item" reveal script: staggered class-add
  // (not a CSS transition-delay stagger) triggered once the list scrolls
  // into view.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const list = section.querySelector('.bcr-list')
    if (!list) return
    const cards = Array.from(section.querySelectorAll<HTMLElement>('.bcr-item'))
    const timeouts: ReturnType<typeof setTimeout>[] = []

    function reveal() {
      cards.forEach((c, i) => {
        timeouts.push(
          setTimeout(
            () => {
              c.classList.add('on')
            },
            reduce ? 0 : i * 130,
          ),
        )
      })
    }

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal()
              io?.disconnect()
            }
          })
        },
        { threshold: 0.2 },
      )
      io.observe(list)
    } else {
      reveal()
    }

    return () => {
      io?.disconnect()
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [])

  return (
    <section className="bcr" ref={sectionRef as React.RefObject<HTMLElement>}>
      <style jsx>{`
        .bcr {
          background: linear-gradient(180deg, #f7f4ec, #f3efe6);
          padding-block: clamp(64px, 9vw, 120px);
        }
        .bcr-wrap {
          max-width: 1160px;
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 72px);
        }
        .bcr-lead {
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }
        .bcr-lead-media {
          align-self: stretch;
          display: flex;
        }
        .bcr-img {
          flex: 1;
          width: 100%;
          min-height: 340px;
          object-fit: cover;
          border-radius: 24px;
          background: #efe9de;
          box-shadow: 0 24px 60px -28px rgba(18, 49, 77, 0.3);
          border: 1px solid rgba(18, 49, 77, 0.06);
          display: block;
        }
        .bcr-lead-copy :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.04;
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          max-width: 18ch;
          color: #12314d;
          margin: 0;
        }
        .bcr-sub {
          color: rgba(18, 49, 77, 0.55);
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          margin-top: 22px;
          max-width: 50ch;
        }
        .bcr-list {
          margin-top: clamp(28px, 4vw, 44px);
          list-style: none;
          display: flex;
          flex-direction: column;
          padding: 0;
        }
        .bcr-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(20px, 3vw, 44px);
          align-items: baseline;
          padding: clamp(24px, 3vw, 32px) 0;
          border-top: 1px solid rgba(18, 49, 77, 0.14);
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .bcr-item.on {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .bcr-item {
            transition: none;
          }
        }
        .bcr-num {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          line-height: 1;
          color: #0a8fb0;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .bcr-body {
          max-width: 56ch;
        }
        .bcr-body :global(h3) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.02em;
          font-size: clamp(1.3rem, 2vw, 1.7rem);
          color: #12314d;
          line-height: 1.16;
          margin: 0;
        }
        .bcr-body p {
          color: rgba(18, 49, 77, 0.55);
          margin-top: 10px;
          font-size: clamp(1rem, 1.3vw, 1.1rem);
          line-height: 1.55;
        }
        .bcr-close {
          margin-top: clamp(48px, 6vw, 80px);
          max-width: 840px;
        }
        .bcr-scope {
          color: rgba(18, 49, 77, 0.55);
          font-size: clamp(1.08rem, 1.5vw, 1.25rem);
          line-height: 1.5;
          max-width: 52ch;
          margin-bottom: 20px;
        }
        @media (max-width: 900px) {
          .bcr-lead {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .bcr-img {
            min-height: 280px;
            order: -1;
          }
        }
      `}</style>

      <div className="bcr-wrap">
        <div className="bcr-lead">
          <div className="bcr-lead-copy">
            {heading && <RichText data={heading as any} enableGutter={false} enableProse={false} />}
            {subheading && <p className="bcr-sub">{subheading}</p>}
          </div>
          <div className="bcr-lead-media">
            {imgUrl(image) && <img className="bcr-img" src={imgUrl(image)} alt={imgAlt(image)} />}
          </div>
        </div>

        <div className="bcr-list">
          {rows.map((item, i) => (
            <div className="bcr-item" key={i}>
              <span className="bcr-num">{i + 1}</span>
              <div className="bcr-body">
                {item.title && <RichText data={item.title as any} enableGutter={false} enableProse={false} />}
                {item.body && <p>{item.body}</p>}
              </div>
            </div>
          ))}
        </div>

        {closingText && (
          <div className="bcr-close">
            <p className="bcr-scope">{closingText}</p>
          </div>
        )}
      </div>
    </section>
  )
}
