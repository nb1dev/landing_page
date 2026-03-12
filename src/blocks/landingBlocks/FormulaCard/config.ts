import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const FormulaCardBlock: Block = {
  slug: 'formula-card',
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
      name: 'kitImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'itemsList',
      type: 'array',
      fields: [
        {
          name: 'textLabel1',
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
          name: 'textLabel2',
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
          name: 'textLabel3',
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
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          localized: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      localized: true,
    },
  ],
  interfaceName: 'FormulaCardBlock',
}
