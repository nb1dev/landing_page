import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import '@/styles/article-template.css'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ content, style }) => {
  const variantClass = `art-callout art-callout--${style ?? 'info'}`

  return (
    <div className={variantClass}>
      <RichText data={content} enableGutter={false} enableProse={false} />
    </div>
  )
}
