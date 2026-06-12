import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const WhatArrivesBlock: Block = {
  slug: 'whatArrives',
  interfaceName: 'WhatArrivesBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'lede', type: 'richText', localized: true, editor: inlineRichTextEditor },
    { name: 'replacesLabel', type: 'text', localized: true },
    {
      name: 'replacesItems',
      type: 'array',
      fields: [{ name: 'label', type: 'text', localized: true }],
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'todColor', type: 'text', admin: { description: 'Hex color for time-of-day dot (e.g. #E8A93B)' } },
        { name: 'todLabel', type: 'text', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', localized: true },
        { name: 'timing', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'chipColor', type: 'text', admin: { description: 'Hex color for chip dot' } },
        { name: 'chipLabel', type: 'text', localized: true },
      ],
    },
    { name: 'closingText', type: 'richText', localized: true, editor: inlineRichTextEditor },
  ],
}
