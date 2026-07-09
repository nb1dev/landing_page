import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolWhatArrivesBlock: Block = {
  slug: 'protocolWhatArrives',
  interfaceName: 'ProtocolWhatArrivesBlock',
  // Short dbName: the default (pages_blocks_protocol_what_arrives_...) pushes
  // the nested "calls" array's locale index name past Postgres's 63-char limit.
  dbName: 'pwa',
  labels: {
    singular: 'Protocol: What Arrives (Before/After)',
    plural: 'Protocol: What Arrives Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "Your day is two moments, not seven bottles.", matching the mockup emphasis.',
      },
    },
    {
      name: 'dek',
      label: 'Dek',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "morning pack" and "evening pack", matching the mockup.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: { description: 'Hidden on mobile (≤760px), matching the mockup.' },
    },
    {
      name: 'before',
      label: 'Before (drawer)',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'This was the drawer.' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'after',
      label: 'After (whole thing)',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'richText',
          localized: true,
          editor: inlineRichTextEditor,
          admin: { description: 'Apply the "Brand Teal" text color to "the whole thing", matching the mockup.' },
        },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'calls',
      label: 'Calls',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'sorted',
          options: [
            { label: 'Pre-sorted (grid)', value: 'sorted' },
            { label: 'Travels (paper plane)', value: 'travel' },
            { label: 'Never runs out (refresh)', value: 'refresh' },
          ],
        },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}
