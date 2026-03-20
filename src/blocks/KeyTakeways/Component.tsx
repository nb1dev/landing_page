import React from 'react'
import type { KeyTakeawaysBlock as KeyTakeawaysBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'

type Props = KeyTakeawaysBlockProps & {
  locale?: string
}

export const KeyTakeawaysBlock: React.FC<Props> = ({ items, locale }) => {
  const dict = getDictionary(locale)

  if (!items?.length) return null

  return (
    <section className="my-12">
      <div className="container">
        <div className="max-w-4xl">
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.06)',
            }}
          >
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
              {dict.keyTakeaways.heading}
            </h2>

            <ul className="flex flex-col" style={{ gap: '20px' }}>
              {items.map((item, index) => (
                <li key={index} className="flex items-start" style={{ gap: '14px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      minWidth: '10px',
                      borderRadius: '9999px',
                      marginTop: '10px',
                      backgroundColor: 'rgba(0, 126, 158, 1)',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '17px',
                      lineHeight: '28px',
                      color: 'rgba(33, 43, 54, 1)',
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        color: 'rgba(0, 126, 158, 1)',
                      }}
                    >
                      {item.leadIn}
                    </span>{' '}
                    <span
                      style={{
                        fontWeight: 400,
                        color: 'rgba(33, 43, 54, 1)',
                      }}
                    >
                      {item.explanation}
                    </span>
                  </p>
                </li>
              ))}
            </ul>

            <p
              style={{
                marginTop: '24px',
                fontSize: '14px',
                lineHeight: '22px',
                fontStyle: 'italic',
                color: 'rgba(33, 43, 54, 0.7)',
              }}
            >
              {dict.disclaimer.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
