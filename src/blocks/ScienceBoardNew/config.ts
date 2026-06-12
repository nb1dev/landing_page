import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

export const ScienceBoardNewBlock: Block = {
  slug: 'scienceBoardSection',
  interfaceName: 'ScienceBoardSectionBlock',
  fields: [
    { name: 'heading', type: 'richText', localized: true, editor: makeHeadingEditor() },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'members',
      type: 'array',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text', localized: true },
        { name: 'detail', type: 'text', localized: true },
        { name: 'pill', type: 'text', localized: true },
        { name: 'modalTitle', type: 'text', localized: true },
        { name: 'bio', type: 'array', fields: [{ name: 'paragraph', type: 'textarea', localized: true }] },
        { name: 'quote', type: 'textarea', localized: true },
      ],
    },
  ],
}
