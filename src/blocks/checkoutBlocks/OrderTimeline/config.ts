import type { Block } from 'payload'

export const OrderTimeline: Block = {
  slug: 'orderTimeline',
  interfaceName: 'OrderTimelineBlock',
  labels: { singular: 'Order Timeline', plural: 'Order Timelines' },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section title',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Timeline steps',
      minRows: 1,
      fields: [
        {
          name: 'weekLabel',
          type: 'text',
          label: 'Week label',
          localized: true,
          admin: { placeholder: 'Week 0' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step title',
          localized: true,
          admin: { placeholder: 'Kit ships' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
        },
        {
          name: 'isPaymentStep',
          type: 'checkbox',
          label: 'Highlight as payment / first charge step',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'showAdvancedExtras',
      type: 'checkbox',
      label: 'Show Advanced-only extra steps',
      defaultValue: false,
    },
    {
      name: 'advancedPillLabel',
      type: 'text',
      label: 'Advanced pill label',
      defaultValue: 'Advanced',
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.showAdvancedExtras),
      },
    },
    {
      name: 'advancedExtras',
      type: 'array',
      label: 'Advanced extra steps',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.showAdvancedExtras),
      },
      fields: [
        {
          name: 'weekLabel',
          type: 'text',
          label: 'Week label',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step title',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
        },
      ],
    },
  ],
}
