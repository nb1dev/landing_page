import React from 'react'
import type { KeyTakeawaysBlock as KeyTakeawaysBlockProps } from '@/payload-types'
import { getDictionary } from '@/i18n/getDictionary'
import '@/styles/article-template.css'

type Props = KeyTakeawaysBlockProps & {
  locale?: string
}

export const KeyTakeawaysBlock: React.FC<Props> = ({ items, locale }) => {
  const dict = getDictionary(locale)

  if (!items?.length) return null

  return (
    <section className="art-card">
      <h2 className="art-heading">{dict.keyTakeaways.heading}</h2>

      <ul className="art-list">
        {items.map((item, index) => (
          <li key={index} className="art-list__item">
            <span className="art-list__dot" />
            <p className="art-list__text">
              {item.leadIn && (
                <span className="art-list__lead">{item.leadIn}{' '}</span>
              )}
              <span className="art-list__body">{item.explanation}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="art-disclaimer">{dict.disclaimer.text}</p>
    </section>
  )
}
