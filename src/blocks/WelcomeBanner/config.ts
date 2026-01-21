import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const WelcomeBannerBlock: Block = {
  slug: 'welcome-banner',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image/svg+xml' },
      },
    },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            TextColorFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImageMobile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'copyrightText',
      type: 'text',
      // required: true,
    },
    {
      name: 'bannerLabels',
      type: 'array',
      fields: [
        {
          name: 'textLabel',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'lineText',
      type: 'text',
      localized: true,
      // required: true,
    },
  ],
  interfaceName: 'WelcomeBannerBlock',
}
