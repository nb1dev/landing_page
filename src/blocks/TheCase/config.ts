import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'


export const TheCaseBlock: Block = {
  slug: 'theCase',
  interfaceName: 'TheCaseBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(),
    },
    {
      name: 'lede',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'stat', type: 'text' },
        { name: 'unit', type: 'text', localized: true },
        { name: 'tag', type: 'text', localized: true },
        { name: 'frontBody', type: 'textarea', localized: true },
        { name: 'backBody', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'pivotHtml',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Closing paragraph. Supports <strong> and <em> tags.',
      },
    },
  ],
}
