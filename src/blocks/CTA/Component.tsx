import React from 'react'
import Link from 'next/link'
import type { CtaBlock as CtaBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'

type Props = CtaBlockProps & {
  locale?: string
}

export const CtaBlockComponent: React.FC<Props> = ({ body, buttonUrl, locale }) => {
  const dict = getDictionary(locale)

  return (
    <section className="my-16">
      <div className="container">
        <div className="max-w-4xl">
          {/* Horizontal rule */}
          <hr
            style={{
              border: 'none',
              borderTop: '1px solid rgba(33,43,54,0.12)',
              marginBottom: '32px',
            }}
          />

          {/* Card */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,1)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0px 4px 20px rgba(16,24,40,0.06)',
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 600,
                lineHeight: '36px',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
                color: 'rgba(0,126,158,1)',
              }}
            >
              {dict.cta.heading}
            </h2>

            {/* Body */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                marginBottom: '24px',
                color: 'rgba(33,43,54,1)',
              }}
            >
              {body}
            </p>

            {/* Button */}
            <Link
              href={buttonUrl}
              style={{
                display: 'inline-block',
                padding: '12px 22px',
                borderRadius: '10px',
                backgroundColor: 'rgba(0,126,158,1)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {dict.cta.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
