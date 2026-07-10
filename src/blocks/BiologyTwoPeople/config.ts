import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const BiologyTwoPeopleBlock: Block = {
  slug: 'biologyTwoPeople',
  interfaceName: 'BiologyTwoPeopleBlock',
  labels: {
    singular: 'Biology: Two People',
    plural: 'Biology: Two People Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: {
        description: 'Apply "Brand Teal" color to "and almost none of their gut.", matching the mockup emphasis.',
      },
    },
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'note',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: {
        description: 'Apply "Brand Teal" color to "read at completely different levels.", matching the mockup emphasis.',
      },
    },
    { name: 'personALabel', label: 'Person A Label', type: 'text', localized: true, defaultValue: 'Person A' },
    { name: 'personAMeta', label: 'Person A Meta', type: 'text', localized: true, defaultValue: 'One of one' },
    { name: 'personBLabel', label: 'Person B Label', type: 'text', localized: true, defaultValue: 'Person B' },
    { name: 'personBMeta', label: 'Person B Meta', type: 'text', localized: true, defaultValue: 'One of one' },
    { name: 'dnaCaption', label: 'DNA Strip Caption', type: 'text', localized: true },
  ],
}
