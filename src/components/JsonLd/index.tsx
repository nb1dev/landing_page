import React from 'react'

export type JsonLdValue =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | null
  | undefined

type Props = {
  data: JsonLdValue
}

export const JsonLd: React.FC<Props> = ({ data }) => {
  if (!data) return null

  const json = Array.isArray(data)
    ? {
        '@context': 'https://schema.org',
        '@graph': data.map((item) => {
          const { ['@context']: _context, ...rest } = item
          return rest
        }),
      }
    : data

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, '\\u003c'),
      }}
    />
  )
}
