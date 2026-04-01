import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const AccessBanner: Block = {
  slug: 'accessBanner',
  interfaceName: 'AccessBannerBlock',
  labels: {
    singular: 'Access Banner',
    plural: 'Access Banners',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'richText',
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        ],
      }),
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'text',
      localized: true,
    },
    {
      name: 'formText',
      label: 'Form text',
      type: 'text',
      localized: true,
    },
    {
      name: 'buttonText',
      label: 'Submit button text override',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Optional override for the submit button label. If empty, the selected form submit label will be used.',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select the Form Builder form to submit.',
      },
    },
  ],
}
