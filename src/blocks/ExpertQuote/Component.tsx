/* eslint-disable @next/next/no-img-element */
import React from 'react'
import '@/styles/article-template.css'

export function ExpertQuoteComponent({
  quote,
  expert,
  expertName,
  credentials,
  avatar,
  locale,
}: {
  quote: string
  locale: string
  expert?: any
  expertName?: string
  credentials?: string
  avatar?: any
}) {
  const resolvedName = expert?.name || expertName || 'Expert'
  const resolvedCreds = expert?.credentials || credentials || ''
  const resolvedAvatar = expert?.avatar?.url || avatar?.url || ''
  const href = expert?.slug ? `/${locale}/authors/${expert.slug}` : undefined

  return (
    <section className="art-card" style={{ marginTop: '32px' }}>
      <div className="art-expert-quote">
        <svg
          width="24"
          height="18"
          viewBox="0 0 24 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="art-expert-quote__icon"
        >
          <path
            d="M0 18V10.8C0 8.4 0.6 6.2 1.8 4.2C3 2.2 4.8 0.8 7.2 0L8.4 1.8C6.8 2.4 5.5 3.4 4.5 4.8C3.5 6.2 3 7.7 3 9.3H6V18H0ZM13.2 18V10.8C13.2 8.4 13.8 6.2 15 4.2C16.2 2.2 18 0.8 20.4 0L21.6 1.8C20 2.4 18.7 3.4 17.7 4.8C16.7 6.2 16.2 7.7 16.2 9.3H19.2V18H13.2Z"
            fill="currentColor"
          />
        </svg>

        <p className="art-expert-quote__text">{quote}</p>

        <div className="art-author-row">
          {resolvedAvatar ? (
            <img
              src={resolvedAvatar}
              alt={resolvedName}
              className="art-author-row__avatar"
            />
          ) : (
            <div className="art-author-row__avatar art-author-row__avatar--placeholder" />
          )}

          <div className="art-author-row__info">
            {href ? (
              <a href={href} className="art-author-row__name">{resolvedName}</a>
            ) : (
              <div className="art-author-row__name">{resolvedName}</div>
            )}
            {resolvedCreds && (
              <div className="art-author-row__creds">{resolvedCreds}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
