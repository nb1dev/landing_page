import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payloadcms-lexical-ext'

export const ProductBanner: Block = {
  slug: 'productBanner',
  interfaceName: 'ProductBannerBlock',
  labels: {
    singular: 'Product Banner',
    plural: 'Product Banners',
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
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      defaultValue: false,
    },
    {
      name: 'introContent',
      type: 'richText',
      localized: true,
      label: 'Intro Content',
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
    },
    {
      name: 'carouselText',
      label: 'Carousel text',
      type: 'array',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'bannerImage',
      label: 'Banner image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bannerBackground',
      label: 'Banner background',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mobileBannerBackground',
      label: 'Mobile Banner background',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional logo displayed above the title.',
      },
    },
    {
      name: 'loginButton',
      label: 'Login button',
      type: 'group',
      fields: [
        {
          name: 'show',
          label: 'Show login button',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'label',
          label: 'Button label',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.show),
          },
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.show),
          },
        },
      ],
    },
  ],
}
