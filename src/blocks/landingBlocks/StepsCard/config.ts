import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const StepsCardBlock: Block = {
  slug: 'steps-card',
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
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'stepNumber',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'stepDescription',
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
      ],
    },
    {
      name: 'note',
      type: 'text',
      localized: true,
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'redirectUrl',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
  interfaceName: 'StepsCardBlock',
}
