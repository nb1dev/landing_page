/* eslint-disable @next/next/no-img-element */
import React from 'react'
import '@/styles/article-template.css'

export function AuthorBoxComponent({
  title,
  locale,
  authors,
}: {
  title?: string
  locale: string
  authors: Array<{ name: string; slug?: string; credentials?: string; avatarUrl?: string }>
}) {
  if (!authors?.length) return null

  return (
    <section className="art-card" style={{ marginTop: '40px' }}>
      <div className="art-heading--label">{title || 'About the author'}</div>

      {authors.map((a, i) => (
        <div key={i} className="art-author-row">
          {a.avatarUrl ? (
            <img
              src={a.avatarUrl}
              alt={a.name}
              className="art-author-row__avatar art-author-row__avatar--lg"
            />
          ) : (
            <div className="art-author-row__avatar art-author-row__avatar--lg art-author-row__avatar--placeholder" />
          )}

          <div className="art-author-row__info">
            {a.slug ? (
              <a
                href={`/${locale}/authors/${a.slug}`}
                className="art-author-row__name art-author-row__name--lg"
              >
                {a.name}
              </a>
            ) : (
              <div className="art-author-row__name art-author-row__name--lg">{a.name}</div>
            )}
            {a.credentials && (
              <div className="art-author-row__creds">{a.credentials}</div>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
