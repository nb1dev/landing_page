import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'
import { brandColorSwatches } from './brandColors'

const baseFeatures = [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
  TextColorFeature({ colors: brandColorSwatches }),
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
