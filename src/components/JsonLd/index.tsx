import React from 'react'

export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null

  return (
    <script
      type="application/ld+json"
      // JSON stringify is the correct way for structured data scripts
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
