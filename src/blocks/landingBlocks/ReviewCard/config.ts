import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ReviewCardBlock: Block = {
  slug: 'review-card',
  fields: [
    {
      name: 'title',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          ]
        },
      }),
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'reviews',
      type: 'array',
      fields: [
        {
          name: 'reviewTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'reviewerName',
          type: 'text',
          localized: true,
        },
        {
          name: 'reviewerCountry',
          type: 'text',
          localized: true,
        },
        {
          name: 'reviewIcon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'right',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'left',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'note',
      type: 'group',
      fields: [
        {
          name: 'noteText',
          type: 'text',
          localized: true,
        },
        {
          name: 'noteIcon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  interfaceName: 'ReviewCardBlock',
}
