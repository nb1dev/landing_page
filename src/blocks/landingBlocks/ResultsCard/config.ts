import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ResultsCardBlock: Block = {
  slug: 'results-card',
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
      name: 'itemsList',
      type: 'array',
      fields: [
        {
          name: 'itemTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'resultsCards',
      type: 'array',
      fields: [
        {
          name: 'resultTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'resultDescription',
          type: 'text',
          localized: true,
        },
        {
          name: 'resultImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  interfaceName: 'ResultsCardBlock',
}
