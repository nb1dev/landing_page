import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const DetailsBanner: Block = {
  slug: 'details-banner',
  interfaceName: 'DetailsBannerBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true, // ✅
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
      }),
      label: false,
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 4,
      admin: {
        description: 'Exactly 4 cards (layout expects 4).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true, // ✅
        },
        {
          name: 'description',
          type: 'text',
          localized: true, // ✅
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundImageMobile',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageContent',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
