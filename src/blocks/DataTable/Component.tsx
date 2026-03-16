import React from 'react'
import type { DataTableBlock as DataTableBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'

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
    <section className="my-12">
      <div className="container">
        <div className={variant === 'comparison' ? 'w-full' : 'max-w-4xl'}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.06)',
            }}
          >
            {sectionTitle ? (
              <h2
                className="mb-6 md:text-[32px] md:leading-[40px]"
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '36px',
                  letterSpacing: '-0.02em',
                  color: 'rgba(0, 126, 158, 1)',
                }}
              >
                {sectionTitle}
              </h2>
            ) : null}

            <div className="overflow-x-auto">
              <table
                className={`w-full border-separate border-spacing-0 ${
                  variant === 'comparison' ? 'min-w-[760px]' : 'min-w-[520px]'
                }`}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                <thead>
                  <tr>
                    {normalizedHeaders.map((header, index) => {
                      const isHighlighted = highlightIndex === index

                      return (
                        <th
                          key={index}
                          className="px-4 py-4 text-left align-top"
                          style={{
                            borderBottom: '1px solid rgba(33, 43, 54, 0.12)',
                            backgroundColor:
                              variant === 'glossary'
                                ? 'rgba(0, 126, 158, 0.08)'
                                : isHighlighted
                                  ? 'rgba(0, 126, 158, 0.12)'
                                  : 'rgba(255, 255, 255, 1)',
                            fontSize: '14px',
                            fontWeight: 600,
                            lineHeight: '20px',
                            color: 'rgba(33, 43, 54, 1)',
                          }}
                        >
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
                        const isHighlighted = highlightIndex === cellIndex

                        return (
                          <td
                            key={cellIndex}
                            className="px-4 py-4 align-top"
                            style={{
                              borderBottom:
                                rowIndex !== rows.length - 1
                                  ? '1px solid rgba(33, 43, 54, 0.12)'
                                  : 'none',
                              backgroundColor:
                                variant === 'comparison' && isHighlighted
                                  ? 'rgba(0, 126, 158, 0.06)'
                                  : 'rgba(255, 255, 255, 1)',
                              fontSize: '16px',
                              lineHeight: '24px',
                              color: 'rgba(33, 43, 54, 1)',
                              fontWeight: variant === 'glossary' && cellIndex === 0 ? 600 : 400,
                            }}
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

            {caption ? (
              <p
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'rgba(33, 43, 54, 0.7)',
                }}
              >
                {caption}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
