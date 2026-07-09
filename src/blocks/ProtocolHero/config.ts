import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const ProtocolHeroBlock: Block = {
  slug: 'protocolHero',
  interfaceName: 'ProtocolHeroBlock',
  // Short dbName: the default (pages_blocks_protocol_hero_...) pushes nested
  // array/locale index names (seal_faces, panel_stages, panel_rows) past
  // Postgres's 63-char identifier limit.
  dbName: 'prh',
  labels: {
    singular: 'Protocol: Hero + Build Panel',
    plural: 'Protocol: Hero + Build Panel Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h1']),
      admin: {
        description: 'Apply the "Brand Teal" text color to "get built.", matching the mockup emphasis.',
      },
    },
    { name: 'lede', type: 'textarea', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Order your kit' },
    { name: 'ctaUrl', type: 'text', localized: true, defaultValue: '/order-cold' },
    {
      name: 'sealText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: {
        description: 'Bold the "6-person science board" phrase, matching the mockup.',
      },
    },
    {
      name: 'sealFaces',
      label: 'Seal Faces',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
      ],
    },
    {
      name: 'panel',
      label: 'Build Panel',
      type: 'group',
      fields: [
        {
          name: 'stages',
          label: 'Staged Status Text',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          admin: {
            description:
              'Exactly 4 stages, matching the panel\'s fixed timeline (start, +1.8s, +3.2s, +5s): Reading → Matching → Building → Ready.',
          },
          fields: [
            { name: 'status', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Reading your sample"' } },
            { name: 'phase', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Step 1 of 3" or "Complete"' } },
          ],
        },
        { name: 'cardTitle', label: 'Card Title', type: 'text', localized: true, defaultValue: 'Your formula' },
        { name: 'cardMeta', label: 'Card Meta', type: 'text', localized: true, defaultValue: 'example build · 5 of 19 shown' },
        {
          name: 'rows',
          label: 'Formula Rows',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'tagVariant',
              label: 'Tag Variant',
              type: 'select',
              defaultValue: 'act',
              options: [
                { label: 'Activate (lime)', value: 'act' },
                { label: 'Nourish (teal)', value: 'nour' },
                { label: 'Restore (amber)', value: 'rest' },
              ],
            },
            { name: 'tagLabel', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Activate"' } },
            { name: 'name', type: 'text', localized: true, required: true, admin: { description: 'e.g. "B. longum"' } },
            { name: 'dose', type: 'text', localized: true, required: true, admin: { description: 'e.g. "10B CFU"' } },
          ],
        },
        { name: 'moreLabel', label: 'More Label', type: 'text', localized: true, defaultValue: '+ 14 more, matched to your reading' },
        { name: 'moreMeta', label: 'More Meta', type: 'text', localized: true, defaultValue: 'FROM 125+ LIBRARY' },
        {
          name: 'footNote',
          label: 'Foot Note',
          type: 'textarea',
          localized: true,
          defaultValue: 'Illustrative build. Your formula is drawn from your own gut reading and reviewed before it is made.',
        },
      ],
    },
  ],
}
