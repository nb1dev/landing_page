'use client'

import React, { useRef } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useProtocolReveal } from '@/hooks/useProtocolReveal'

type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined
type BeforeGroup = { label?: string | null; image?: MediaLike }
type AfterGroup = { label?: DefaultTypedEditorState | null; image?: MediaLike }
type IconKey = 'sorted' | 'travel' | 'refresh'
type Call = { icon?: IconKey | null; title?: string | null; description?: string | null }

export type ProtocolWhatArrivesBlockType = {
  blockType?: 'protocolWhatArrives'
  heading?: DefaultTypedEditorState | null
  dek?: DefaultTypedEditorState | null
  intro?: string | null
  before?: BeforeGroup | null
  after?: AfterGroup | null
  calls?: Call[] | null
}

function imgUrl(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.url ? getMediaUrl(img.url) : ''
}
function imgAlt(img?: MediaLike): string {
  if (!img || typeof img === 'string') return ''
  return img.alt ?? ''
}

const ICONS: Record<IconKey, React.ReactNode> = {
  sorted: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
      <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
      <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
      <path d="M17.5 14.5v6M14.5 17.5h6"></path>
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8L8 11l-2 2H3l1.5 3L8 18l3-2 3.5 3.7a.5.5 0 0 0 .8-.5Z"></path>
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M21 12a9 9 0 1 1-3-6.7"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  ),
}

export const ProtocolWhatArrivesComponent: React.FC<ProtocolWhatArrivesBlockType> = ({
  heading,
  dek,
  intro,
  before,
  after,
  calls,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  useProtocolReveal(sectionRef, '[data-rv]')

  const callList = calls ?? []

  return (
    <section className="pwa-sec" id="formula" ref={sectionRef}>
      <style jsx>{`
        .pwa-sec {
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
        .pwa-sec :global(h2) {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(28px, 3.8vw, 46px);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: #12314d;
          margin: 0;
          max-width: 26ch;
        }
        .pwa-sec :global(h2 span) {
          color: #0a8fb0;
        }

        :global(html.pr-rv-on) .pwa-sec [data-rv] {
          opacity: 0;
          transform: translateY(15px);
        }
        :global(html.pr-rv-on) .pwa-sec [data-rv].in {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .pr-simp-dek {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 500;
          font-size: 21px;
          line-height: 1.4;
          color: rgba(18, 49, 77, 0.7);
          margin-top: 18px;
          max-width: 64ch;
        }
        .pr-simp-dek :global(b),
        .pr-simp-dek :global(strong) {
          color: #12314d;
          font-weight: 600;
        }
        .pr-simp-intro {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(18, 49, 77, 0.55);
          max-width: 78ch;
          margin-top: 14px;
        }

        .pr-simp {
          display: grid;
          grid-template-columns: 1fr 1.18fr;
          gap: 28px;
          align-items: end;
          margin-top: 72px;
        }
        .pr-ba .st {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(18px, 2vw, 23px);
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin-bottom: 14px;
          color: #12314d;
        }
        .pr-ba .st.muted {
          color: rgba(18, 49, 77, 0.55);
        }
        .pr-ba .st :global(em) {
          font-style: normal;
          color: #0a8fb0;
        }
        .pr-ba .img {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 22px 50px -32px rgba(14, 39, 64, 0.5);
        }
        .pr-ba-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .pr-ba.before .pr-ba-img {
          aspect-ratio: 4 / 3.3;
        }
        .pr-ba.after .pr-ba-img {
          aspect-ratio: 4 / 3.05;
        }

        .pr-calls {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 64px;
        }
        .pr-call {
          background: #eef3f6;
          border: none;
          border-radius: 16px;
          padding: 22px 20px 24px;
        }
        .pr-call .ic {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #fff;
          border: 1px solid rgba(18, 49, 77, 0.1);
          color: #0a8fb0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        .pr-call .t {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16.5px;
          color: #12314d;
          margin-top: 0;
        }
        .pr-call p {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(18, 49, 77, 0.55);
          margin: 6px 0 0;
        }

        @media (max-width: 760px) {
          .pr-simp {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .pr-calls {
            grid-template-columns: 1fr;
          }
          .pr-simp-intro {
            display: none;
          }
        }
      `}</style>

      <div className="pr-wrap">
        {heading && (
          <div data-rv="">
            <RichText data={heading as any} enableGutter={false} enableProse={false} />
          </div>
        )}
        {dek && (
          <div className="pr-simp-dek" data-rv="">
            <RichText data={dek as any} enableGutter={false} enableProse={false} />
          </div>
        )}
        {intro && (
          <p className="pr-simp-intro" data-rv="">
            {intro}
          </p>
        )}

        <div className="pr-simp">
          {before?.image && (
            <div className="pr-ba before" data-rv="">
              <div className="st muted">{before.label}</div>
              <div className="img">
                <img className="pr-ba-img" src={imgUrl(before.image)} alt={imgAlt(before.image)} loading="lazy" />
              </div>
            </div>
          )}
          {after?.image && (
            <div className="pr-ba after" data-rv="">
              {after.label && (
                <div className="st">
                  <RichText data={after.label as any} enableGutter={false} enableProse={false} />
                </div>
              )}
              <div className="img">
                <img className="pr-ba-img" src={imgUrl(after.image)} alt={imgAlt(after.image)} loading="lazy" />
              </div>
            </div>
          )}
        </div>

        {callList.length > 0 && (
          <div className="pr-calls">
            {callList.map((call, i) => (
              <div className="pr-call" data-rv="" key={i}>
                <div className="ic">{ICONS[call.icon || 'sorted']}</div>
                <div className="t">{call.title}</div>
                <p>{call.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
