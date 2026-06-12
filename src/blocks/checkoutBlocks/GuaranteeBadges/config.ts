import {
  BoldFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const GuaranteeBadges: Block = {
  slug: 'guaranteeBadges',
  interfaceName: 'GuaranteeBadgesBlock',
  labels: { singular: 'Guarantee Badges', plural: 'Guarantee Badges' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Guarantee items',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'text',
          type: 'richText',
          label: 'Text (bold = strong emphasis)',
          localized: true,
          editor: lexicalEditor({
            features: () => [BoldFeature(), InlineToolbarFeature()],
          }),
        },
      ],
    },
  ],
}
