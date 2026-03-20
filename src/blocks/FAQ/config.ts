import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { defaultLexical } from '@/fields/defaultLexical'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'Frequently Asked Questions',
    plural: 'Frequently Asked Questions',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 6,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'richText',
          localized: true,
          required: true,
          label: 'Answer',
          editor: defaultLexical,
        },
      ],
    },
  ],
}
