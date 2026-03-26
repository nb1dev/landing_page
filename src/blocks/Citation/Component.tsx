import React from 'react'
import '@/styles/article-template.css'

export function CitationComponent({
  quote,
  sourceName,
  sourceUrl,
}: {
  quote: string
  sourceName: string
  sourceUrl: string
}) {
  return (
    <blockquote className="art-citation">
      <p className="art-citation__quote">&ldquo;{quote}&rdquo;</p>
      <div className="art-citation__source">
        &mdash;{' '}
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="art-citation__link"
          >
            {sourceName}
          </a>
        ) : (
          <span>{sourceName}</span>
        )}
      </div>
    </blockquote>
  )
}
