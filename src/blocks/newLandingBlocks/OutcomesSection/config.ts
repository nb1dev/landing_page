import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    TextColorFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  ],
})

export const OutcomesSectionBlock: Block = {
  slug: 'outcomesSection',
  interfaceName: 'OutcomesSectionBlock',
  labels: {
    singular: 'Outcomes Section',
    plural: 'Outcomes Sections',
  },
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Navy (#12314D)', value: 'dark' },
        { label: 'Deeper Navy (#0e2640)', value: 'darkNavy' },
        { label: 'Teal (#008498)', value: 'teal' },
        { label: 'White', value: 'white' },
        { label: 'Cream (warm off-white)', value: 'cream' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Small uppercase label above the heading.',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: {
        description: 'Section heading. Apply .ac class to spans for teal italic highlight.',
      },
    },
    {
      name: 'subText',
      label: 'Subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'outcomeCards',
      label: 'Outcome Cards',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Up to 4 flip cards. Hover/focus to reveal back face.',
      },
      fields: [
        {
          name: 'image',
          label: 'Card Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'frontName',
          label: 'Front — Name',
          type: 'text',
          localized: true,
        },
        {
          name: 'backEyebrow',
          label: 'Back — Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'backTitle',
          label: 'Back — Title',
          type: 'text',
          localized: true,
        },
        {
          name: 'backBody',
          label: 'Back — Body',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'backFoot',
          label: 'Back — Footer Text',
          type: 'text',
          localized: true,
          admin: {
            description: '← arrow is prepended automatically.',
          },
        },
      ],
    },
  ],
}
