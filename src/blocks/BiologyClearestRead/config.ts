import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const BiologyClearestReadBlock: Block = {
  slug: 'biologyClearestRead',
  interfaceName: 'BiologyClearestReadBlock',
  labels: {
    singular: 'Biology: Clearest Read',
    plural: 'Biology: Clearest Read Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply "Brand Teal" color to "and not you.", matching the mockup emphasis.',
      },
    },
    { name: 'subheading', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'items',
      label: 'Reasons',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'richText',
          localized: true,
          editor: makeHeadingEditor(['h3']),
          admin: {
            description: 'Apply "Brand Teal" color to the lead word (e.g. "Absorption."), matching the mockup.',
          },
        },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
    { name: 'closingText', label: 'Closing Text', type: 'textarea', localized: true },
  ],
}
