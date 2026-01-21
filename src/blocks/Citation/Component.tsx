import React from 'react'

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
    <blockquote className="border-l-4 pl-4 py-2 my-8 opacity-90">
      <p className="italic">“{quote}”</p>
      <div className="mt-2 text-sm">
        —{' '}
        <a className="underline" href={sourceUrl} target="_blank" rel="noreferrer">
          {sourceName}
        </a>
      </div>
    </blockquote>
  )
}
