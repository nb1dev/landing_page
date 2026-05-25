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
import { TextColorFeature, type Color } from 'payloadcms-lexical-ext'

const brandColorSwatches: Color[] = [
  { type: 'button', label: 'White', color: '#ffffff' },
  { type: 'button', label: 'Black', color: '#000000' },
  { type: 'button', label: 'Brand Teal', color: 'rgb(0, 168, 194)' },
]

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
