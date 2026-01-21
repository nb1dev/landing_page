import React from 'react'

export function TableOfContentsComponent({
  title,
  headings,
}: {
  title?: string
  headings: Array<{ id: string; depth: 2 | 3; text: string }>
}) {
  if (!headings?.length) return null

  return (
    <nav className="border rounded-xl p-4 mb-6">
      <div className="font-semibold mb-2">{title || 'Table of Contents'}</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'ml-4' : ''}>
            <a className="underline" href={`#${h.id}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
