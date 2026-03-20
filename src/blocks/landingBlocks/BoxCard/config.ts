import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const BoxCardBlock: Block = {
  slug: 'box-card',
  fields: [
    {
      name: 'title',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,

          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
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
      name: 'itemsList',
      type: 'array',
      fields: [
        {
          name: 'textLabel',
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
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'redirect',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'group',
      fields: [
        {
          name: 'web',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mobile',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'boxImage',
      type: 'group',
      fields: [
        {
          name: 'web',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'mobile',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  interfaceName: 'BoxCardBlock',
}
