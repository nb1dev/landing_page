import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
})

export const YpBreakupBlock: Block = {
  slug: 'ypBreakup',
  interfaceName: 'YpBreakupBlock',
  labels: { singular: 'YP — Breakup Strip', plural: 'YP — Breakup Strips' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'navyDeep',
      options: [
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Ink Deep (#0A1B2E)', value: 'inkDeep' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
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
      defaultValue: 'image',
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
      admin: {
        condition: (_, s) => s?.backgroundType === 'image',
        description: 'Full-bleed image behind the glass card (e.g. athlete at rest).',
      },
    },
    { name: 'grain', label: 'Grain Texture', type: 'checkbox', defaultValue: false },
    // ── Content ─────────────────────────────────────────────────
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: { description: 'Optional small teal label above the line.' },
    },
    {
      name: 'line',
      label: 'Statement',
      type: 'richText',
      localized: true,
      editor: inlineEditor,
      admin: { description: 'Apply teal color to a phrase for emphasis.' },
    },
  ],
}
