import React from 'react'
import Link from 'next/link'
import type { CtaBlock as CtaBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'
import '@/styles/article-template.css'

type Props = CtaBlockProps & {
  locale?: string
}

export const CtaBlockComponent: React.FC<Props> = ({ body, buttonUrl, locale }) => {
  const dict = getDictionary(locale)

  return (
    <section className="art-card">
      <h2 className="art-heading">{dict.cta.heading}</h2>

      <p className="art-body">{body}</p>

      <Link href={buttonUrl} className="art-btn art-btn--brand mt-6">
        {dict.cta.buttonText}
      </Link>
    </section>
  )
}
