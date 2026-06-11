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

export const YpTimelineBlock: Block = {
  slug: 'ypTimeline',
  interfaceName: 'YpTimelineBlock',
  labels: { singular: 'YP — Timeline', plural: 'YP — Timelines' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'paper',
      options: [
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Custom', value: 'custom' },
      ],
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
    { name: 'grain', label: 'Grain Texture', type: 'checkbox', defaultValue: true },
    // ── Section head ────────────────────────────────────────────
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Apply teal text color to a phrase. Use Shift+Enter for a line break.' },
    },
    { name: 'lede', label: 'Lede', type: 'richText', localized: true, editor: inlineEditor },
    // ── Timeline steps ──────────────────────────────────────────
    {
      name: 'items',
      labels: { singular: 'Timeline Step', plural: 'Timeline Steps' },
      type: 'array',
      admin: { description: 'Vertical milestones. Dots/connector animate in on scroll.' },
      fields: [
        { name: 'timeWk', label: 'Period Pill', type: 'text', localized: true, admin: { description: 'e.g. "Month 1".' } },
        { name: 'title', label: 'Title', type: 'text', localized: true, required: true },
        { name: 'badge', label: 'Title Badge', type: 'text', localized: true, admin: { description: 'Optional teal pill next to the title (e.g. "Advanced").' } },
        {
          name: 'body',
          label: 'Body',
          type: 'richText',
          localized: true,
          editor: inlineEditor,
          admin: { description: 'Bold a phrase to emphasise it.' },
        },
        { name: 'note', label: 'Sub-note', type: 'textarea', localized: true, admin: { description: 'Optional smaller line below the body (e.g. the Core caveat).' } },
      ],
    },
    // ── Stats card ──────────────────────────────────────────────
    {
      name: 'photo',
      label: 'Stats Photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Background photo for the stats card.' },
    },
    { name: 'statsLabel', label: 'Stats Label', type: 'text', localized: true, admin: { description: 'e.g. "What early members report".' } },
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      admin: { description: 'Bar fills to the percentage in Value (e.g. "95%" → 95% bar).' },
      fields: [
        { name: 'label', label: 'Label', type: 'text', localized: true, required: true },
        { name: 'value', label: 'Value', type: 'text', localized: true, required: true, admin: { description: 'e.g. "95%".' } },
      ],
    },
  ],
}
