import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const StepsBanner: Block = {
  slug: 'stepsBanner',
  interfaceName: 'StepsBannerBlock',
  labels: {
    singular: 'Steps Banner',
    plural: 'Steps Banners',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'arrowIcon',
      label: 'Arrow icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Single shared arrow used between all steps. On mobile it will be rotated 90 degrees.',
      },
    },
    {
      name: 'steps',
      label: 'Steps',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          label: 'Step label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          label: 'Step icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
