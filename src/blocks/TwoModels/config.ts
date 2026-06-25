import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'


export const TwoModelsBlock: Block = {
  slug: 'twoModels',
  interfaceName: 'TwoModelsBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(),
    },
    {
      name: 'nb1Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'themValue', type: 'text', localized: true },
        { name: 'usValue', type: 'text', localized: true },
        { name: 'usIconSvg', type: 'textarea', admin: { description: 'SVG path data for the NB1 icon (contents of the <svg> tag)' } },
      ],
    },
  ],
}
