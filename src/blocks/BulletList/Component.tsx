import React from 'react'
import type { BulletListBlock as BulletListBlockProps } from '@/payload-types'
import '@/styles/article-template.css'

type Props = BulletListBlockProps & {
  locale?: string
}

export const BulletListBlockComponent: React.FC<Props> = ({ sectionTitle, items }) => {
  if (!items?.length) return null

  return (
    <section className="art-card">
      {sectionTitle && <h2 className="art-heading">{sectionTitle}</h2>}

      <ul className="art-list">
        {items.map((item, index) => (
          <li key={index} className="art-list__item">
            <span className="art-list__dot" />
            <p className="art-list__text">
              {item.leadIn && (
                <span className="art-list__lead">{item.leadIn}{' '}</span>
              )}
              <span className="art-list__body">{item.body}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
