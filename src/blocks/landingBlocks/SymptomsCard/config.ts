import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const SymptomsCardBlock: Block = {
  slug: 'symptoms-card',
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
      name: 'symptoms',
      type: 'array',
      fields: [
        {
          name: 'symptom',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'moreButton',
      localized: true,
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'testButton',
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
      name: 'symptomsImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  interfaceName: 'SymptomsCardBlock',
}
