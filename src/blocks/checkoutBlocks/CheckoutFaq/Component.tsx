'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useReveal } from '../useReveal'

type FaqItem = {
  question?: string | null
  answer?: string | null
}

type Props = {
  sectionTitle?: string | null
  items?: FaqItem[] | null
}

export const CheckoutFaqComponent: React.FC<Props> = ({ sectionTitle, items }) => {
  const { ref, revealed } = useReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.maxHeight = openIndex === i ? `${el.scrollHeight}px` : '0px'
    })
  }, [openIndex])

  if (!items?.length) return null

  return (
    <section ref={ref} className={`nb1-cfaq-sec${revealed ? ' nb1-in' : ''}`}>
      <style jsx>{`
        .nb1-cfaq-sec {
          padding: 56px 0;
          border-top: 1px solid rgba(18, 49, 77, 0.07);
          position: relative;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .nb1-cfaq-sec.nb1-in {
          opacity: 1;
          transform: translateY(0);
        }
        .nb1-cfaq-sec::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          background: #f1f4f7;
          z-index: 0;
        }
        .nb1-cfaq-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
        }
        .nb1-cfaq-title {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: -0.02em;
          color: #12314d;
          margin-bottom: 24px;
        }
        .nb1-faq-list {
          /* items separated by border */
        }
        .nb1-faq-item {
          border-bottom: 1px solid rgba(18, 49, 77, 0.1);
        }
        .nb1-faq-item:first-child {
          border-top: 1px solid rgba(18, 49, 77, 0.1);
        }
        .nb1-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          text-align: left;
          padding: 18px 0;
          font-size: 15px;
          font-weight: 600;
          color: #12314d;
          transition: color 0.15s;
        }
        .nb1-faq-q:hover {
          color: #0a8fb0;
        }
        .nb1-faq-item.open .nb1-faq-q {
          color: #0a8fb0;
        }
        .nb1-faq-pm {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          position: relative;
        }
        .nb1-faq-pm::before,
        .nb1-faq-pm::after {
          content: '';
          position: absolute;
          background: rgba(18, 49, 77, 0.4);
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
        .nb1-faq-pm::before {
          top: 9px;
          left: 2px;
          right: 2px;
          height: 2px;
        }
        .nb1-faq-pm::after {
          left: 9px;
          top: 2px;
          bottom: 2px;
          width: 2px;
        }
        .nb1-faq-item.open .nb1-faq-pm::after {
          transform: scaleY(0);
          opacity: 0;
        }
        .nb1-faq-item.open .nb1-faq-pm::before {
          background: #0a8fb0;
        }
        .nb1-faq-a {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .nb1-faq-a-in {
          padding: 0 0 18px;
          font-size: 14.5px;
          color: rgba(18, 49, 77, 0.7);
          line-height: 1.65;
          max-width: 680px;
        }
      `}</style>

      <div className="nb1-cfaq-inner">
        {sectionTitle && <div className="nb1-cfaq-title">{sectionTitle}</div>}

        <div className="nb1-faq-list">
          {items.map((item, i) => (
            <div key={i} className={`nb1-faq-item${openIndex === i ? ' open' : ''}`}>
              <button
                className="nb1-faq-q"
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="nb1-faq-pm" aria-hidden="true" />
              </button>
              <div
                className="nb1-faq-a"
                ref={(el) => { answerRefs.current[i] = el }}
              >
                <div className="nb1-faq-a-in">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
