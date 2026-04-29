import type { Block } from 'payload'

export const EarlyAccessBlock: Block = {
  slug: 'earlyAccess',
  interfaceName: 'EarlyAccessBlock',
  labels: {
    singular: 'Early Access',
    plural: 'Early Access Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
      admin: { description: 'Main heading shown by default.' },
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      localized: true,
      admin: { description: 'Supporting text below the title.' },
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'text',
      localized: true,
      admin: { description: 'Small eyebrow label displayed above the title.' },
    },
    {
      name: 'buttonText',
      label: 'Button Text Override',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional. Overrides the submit button label from the selected form.',
      },
    },
    {
      name: 'form',
      label: 'Form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select the Form Builder form to render.',
      },
    },
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        description:
          'Each entry overrides content when ?variant=<key> is present in the URL. Leave override fields empty to fall back to the defaults above.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'variantKey',
          label: 'Variant Key',
          type: 'text',
          required: true,
          admin: {
            description: 'URL param value matched against ?variant=. Example: "existence"',
          },
        },
        {
          name: 'title',
          label: 'Title Override',
          type: 'text',
          localized: true,
          admin: { description: 'Replaces the default title for this variant.' },
        },
        {
          name: 'subtitle',
          label: 'Subtitle Override',
          type: 'text',
          localized: true,
          admin: { description: 'Replaces the default subtitle for this variant.' },
        },
        {
          name: 'headline',
          label: 'Headline Override',
          type: 'text',
          localized: true,
          admin: { description: 'Replaces the default headline for this variant.' },
        },
        {
          name: 'buttonText',
          label: 'Button Text Override',
          type: 'text',
          localized: true,
          admin: { description: 'Replaces the default button text for this variant.' },
        },
      ],
    },
  ],
}
