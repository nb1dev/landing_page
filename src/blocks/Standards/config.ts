import type { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'


export const StandardsBlock: Block = {
  slug: 'standardsSection',
  interfaceName: 'StandardsSectionBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'iconSvg', type: 'textarea' },
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
