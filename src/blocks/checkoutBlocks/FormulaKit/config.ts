import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const FormulaKit: Block = {
  slug: 'formulaKit',
  interfaceName: 'FormulaKitBlock',
  labels: { singular: 'Formula Kit', plural: 'Formula Kits' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      label: 'Section title (bold = teal)',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
      }),
    },
    {
      name: 'kitImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kit image',
    },
    {
      name: 'kitImageAlt',
      type: 'text',
      label: 'Kit image alt text',
      localized: true,
    },
    {
      name: 'components',
      type: 'array',
      label: 'Formula components',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          localized: true,
          admin: { placeholder: 'Activate' },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'sun',
          options: [
            { label: 'Sun (morning)', value: 'sun' },
            { label: 'Moon (evening)', value: 'moon' },
            { label: 'Shield (anytime)', value: 'shield' },
          ],
        },
        {
          name: 'timing',
          type: 'text',
          label: 'Timing label',
          localized: true,
          admin: { placeholder: 'Morning' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
        },
      ],
    },
  ],
}
