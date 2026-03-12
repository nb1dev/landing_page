import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const VideoCardBlock: Block = {
  slug: 'video-card',
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
          name: 'name',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
        {
          name: 'review',
          type: 'text',
          localized: true,
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'thumbnail',
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
  ],
  interfaceName: 'VideoCardBlock',
}
