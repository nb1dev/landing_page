import React from 'react'
import type { DataTableBlock as DataTableBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'
import '@/styles/article-template.css'

type Props = DataTableBlockProps & {
  locale?: string
}

export const DataTableBlockComponent: React.FC<Props> = ({
  sectionTitle,
  variant,
  columnHeaders,
  rows,
  highlightColumn,
  caption,
  locale,
}) => {
  const dict = getDictionary(locale)

  if (!rows?.length) return null

  const resolvedHeaders =
    variant === 'glossary' && (!columnHeaders || columnHeaders.length === 0)
      ? [
          { label: dict.dataTable.glossary.termHeader },
          { label: dict.dataTable.glossary.definitionHeader },
        ]
      : columnHeaders || []

  const normalizedHeaders = resolvedHeaders.map((header) => header?.label || '')
  const highlightIndex =
    variant === 'comparison' && Number.isInteger(highlightColumn) ? Number(highlightColumn) : null

  return (
    <section className="art-card">
      {sectionTitle && <h2 className="art-heading">{sectionTitle}</h2>}

      <div className="art-table-wrap">
        <table className="art-table" style={{ minWidth: variant === 'comparison' ? '760px' : '520px' }}>
          <thead>
            <tr>
              {normalizedHeaders.map((header, index) => {
                const isAccent =
                  variant === 'glossary' || (variant === 'comparison' && highlightIndex === index)

                return (
                  <th key={index} className={isAccent ? 'art-th--accent' : undefined}>
                    {header}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {(row?.cells || []).map((cell, cellIndex) => {
                  const isAccent = variant === 'comparison' && highlightIndex === cellIndex
                  const isBold = variant === 'glossary' && cellIndex === 0

                  return (
                    <td
                      key={cellIndex}
                      className={[
                        isAccent ? 'art-td--accent' : '',
                        isBold ? 'art-td--bold' : '',
                      ]
                        .filter(Boolean)
                        .join(' ') || undefined}
                    >
                      {cell?.value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && <p className="art-caption">{caption}</p>}
    </section>
  )
}
