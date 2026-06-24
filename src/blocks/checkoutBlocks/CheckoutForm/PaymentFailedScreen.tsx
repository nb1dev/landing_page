'use client'

import React from 'react'

type Props = {
  locale: string
  t: any
  onRetry: () => void
}

export function PaymentFailedScreen({ locale, t, onRetry }: Props) {
  const td = t.done
  const tf = td.failed

  return (
    <div className="nb1-fail-wrap">
      <style jsx>{`
        .nb1-fail-wrap { max-width: 640px; margin: 0 auto; padding: 18px 28px 0; text-align: center; }
        .nb1-fail-icon { width: 62px; height: 62px; border-radius: 50%; background: #c23c3c; display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; box-shadow: 0 14px 34px -16px rgba(194,60,60,.6); }
        .nb1-fail-wrap h1 { font-family: 'Instrument Sans','Inter',sans-serif; font-weight: 600; font-size: clamp(30px, 4vw, 42px); line-height: 1.05; letter-spacing: -.03em; color: #12314d; margin: 0 0 14px; }
        .nb1-fail-wrap p { font-size: 16px; line-height: 1.55; color: rgba(18,49,77,.70); margin: 14px 0 32px; }
        .nb1-fail-retry { display: inline-block; background: #12314d; color: #fff; border-radius: 100px; padding: 15px 32px; font-weight: 700; font-size: 15px; text-decoration: none; cursor: pointer; border: none; font-family: inherit; }
        .nb1-fail-retry:hover { background: #0e2740; }
        .nb1-fail-help { display: block; margin-top: 18px; font-size: 13px; color: rgba(18,49,77,.55); font-weight: 500; text-decoration: none; }
        .nb1-fail-help:hover { color: #12314d; }
        .nb1-fail-legal { text-align: center; font-size: 12px; color: rgba(18,49,77,.40); padding: 28px 0 60px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 4px 8px; }
        .nb1-fail-legal-link { color: rgba(18,49,77,.40); text-decoration: none; transition: color .15s; }
        .nb1-fail-legal-link:hover { color: #12314d; }
        .nb1-fail-legal-dot { color: rgba(18,49,77,.25); }
      `}</style>

      <div className="nb1-fail-icon">
        <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>

      <h1>{tf.heading}</h1>
      <p>{tf.body}</p>

      <button className="nb1-fail-retry" onClick={onRetry}>{tf.retry}</button>
      <a href={`mailto:${td.supportEmail}`} className="nb1-fail-help">{tf.help}</a>

      {/* Legal footer */}
      <div className="nb1-fail-legal">
        {[
          { label: t.legal.privacy, href: `/${locale}/privacy` },
          { label: t.legal.terms,   href: `/${locale}/terms` },
          { label: t.legal.imprint, href: `/${locale}/imprint` },
          { label: t.legal.gdpr,    href: `/${locale}/gdpr` },
        ].map((l, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="nb1-fail-legal-dot">·</span>}
            <a href={l.href} className="nb1-fail-legal-link">{l.label}</a>
          </React.Fragment>
        ))}
        <span className="nb1-fail-legal-dot">·</span>
        <span>{t.legal.copyright}</span>
      </div>
    </div>
  )
}
