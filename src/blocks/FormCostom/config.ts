import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const FormCustom: Block = {
  // ✅ IMPORTANT: slug becomes blockType
  slug: 'form-custom',
  interfaceName: 'FormCustomBlock',
  labels: {
    singular: 'Form Custom',
    plural: 'Form Custom',
  },
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
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true, // ✅
      required: true,
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

    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      defaultValue: false,
    },
    {
      name: 'introContent',
      type: 'richText',
      localized: true, // ✅
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro Content',
    },
  ],
}
