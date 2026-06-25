import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  ParagraphFeature,
  TextStateFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { brandColors } from './brandColors'

const baseFeatures = [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
  TextStateFeature({ state: { color: brandColors } }),
]

export const makeHeadingEditor = (
  sizes: ('h1' | 'h2' | 'h3' | 'h4')[] = ['h1', 'h2', 'h3', 'h4'],
) =>
  lexicalEditor({
    features: [...baseFeatures, HeadingFeature({ enabledHeadingSizes: sizes })],
  })

export const inlineRichTextEditor = lexicalEditor({
  features: baseFeatures,
})
