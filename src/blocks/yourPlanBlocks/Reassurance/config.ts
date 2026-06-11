import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  ],
})
const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
})

export const YpReassuranceBlock: Block = {
  slug: 'ypReassurance',
  interfaceName: 'YpReassuranceBlock',
  labels: { singular: 'YP — Reassurance', plural: 'YP — Reassurance Sections' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'navyDeep',
      options: [
        { label: 'Deep Navy Gradient (default)', value: 'navyDeep' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Ink Deep (#0A1B2E)', value: 'inkDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Custom', value: 'custom' },
      ],
      admin: { description: 'Default renders the signature 160° deep-navy gradient + teal glow.' },
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: { condition: (_, s) => s?.backgroundColor === 'custom' },
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.backgroundType === 'image' },
    },
    { name: 'grain', label: 'Grain Texture', type: 'checkbox', defaultValue: false },
    // ── Section head ────────────────────────────────────────────
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Apply teal color to a phrase. Shift+Enter for a line break.' },
    },
    { name: 'lede', label: 'Lede', type: 'richText', localized: true, editor: inlineEditor },
    // ── Cards ───────────────────────────────────────────────────
    {
      name: 'cards',
      labels: { singular: 'Card', plural: 'Cards' },
      type: 'array',
      admin: { description: 'Glass cards (the source uses two: guarantee + commitment).' },
      fields: [
        { name: 'tag', label: 'Tag', type: 'text', localized: true, admin: { description: 'Teal pill label (e.g. "The guarantee").' } },
        { name: 'title', label: 'Title', type: 'text', localized: true },
        { name: 'body', label: 'Body', type: 'textarea', localized: true },
        {
          name: 'points',
          labels: { singular: 'Point', plural: 'Points' },
          type: 'array',
          fields: [{ name: 'text', label: 'Text', type: 'text', localized: true, required: true }],
        },
      ],
    },
  ],
}
