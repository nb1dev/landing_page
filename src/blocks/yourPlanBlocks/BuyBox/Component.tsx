import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { YpBuyBoxClient } from './Component.client'

type BgColorPreset = 'inkDeep' | 'navyDeep' | 'navy' | 'teal' | 'off' | 'paper' | 'cream' | 'custom'
type BgType = 'color' | 'image'
type MediaLike = { url?: string | null; alt?: string | null } | null

type Option = {
  name?: string | null
  planFamily?: 'core' | 'advanced' | null
  priceSuffix?: string | null
  altLabel?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  recommended?: boolean | null
  recFlagLabel?: string | null
}

export type YpBuyBoxBlockType = {
  blockType?: 'ypBuyBox'
  backgroundColor?: BgColorPreset | null
  backgroundColorCustom?: string | null
  backgroundType?: BgType | null
  backgroundImage?: MediaLike
  grain?: boolean | null
  heading?: DefaultTypedEditorState | null
  sub?: string | null
  options?: Option[] | null
  buyNote?: string | null
  trust?: { text?: string | null }[] | null
  locale?: string
}

export const YpBuyBoxComponent: React.FC<YpBuyBoxBlockType> = (props) => {
  return <YpBuyBoxClient {...props} />
}
