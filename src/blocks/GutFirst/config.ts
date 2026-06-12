import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const GutFirstBlock: Block = {
  slug: 'gutFirst',
  interfaceName: 'GutFirstBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'bodyCopy', type: 'textarea', localized: true },
    { name: 'hintText', type: 'text', localized: true },
    {
      name: 'nodes',
      type: 'array',
      fields: [
        { name: 'key', type: 'text' },
        { name: 'label', type: 'text', localized: true },
        { name: 'title', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
  ],
}
