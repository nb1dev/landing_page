import React from 'react'
import type { BulletListBlock as BulletListBlockProps } from '@/payload-types'

type Props = BulletListBlockProps & {
  locale?: string
}

export const BulletListBlockComponent: React.FC<Props> = ({ sectionTitle, items }) => {
  if (!items?.length) return null

  return (
    <section className="my-12">
      <div className="container">
        <div className="max-w-4xl">
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,1)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(16,24,40,0.06)',
            }}
          >
            {sectionTitle ? (
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '36px',
                  letterSpacing: '-0.02em',
                  marginBottom: '24px',
                  color: 'rgba(0,126,158,1)',
                }}
              >
                {sectionTitle}
              </h2>
            ) : null}

            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      minWidth: '10px',
                      marginTop: '10px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(0,126,158,1)',
                    }}
                  />

                  <p
                    style={{
                      fontSize: '17px',
                      lineHeight: '28px',
                      color: 'rgba(33,43,54,1)',
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        color: 'rgba(33,43,54,1)',
                      }}
                    >
                      {item.leadIn}
                    </span>{' '}
                    <span
                      style={{
                        fontWeight: 400,
                        color: 'rgba(33,43,54,1)',
                      }}
                    >
                      {item.body}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
