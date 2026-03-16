import type { Block } from 'payload'

export const BulletListBlock: Block = {
  slug: 'bulletList',
  interfaceName: 'BulletListBlock',
  labels: {
    singular: 'Bullet List',
    plural: 'Bullet Lists',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
      required: false,
      label: 'Section Title',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 10,
      labels: {
        singular: 'List Item',
        plural: 'List Items',
      },
      fields: [
        {
          name: 'leadIn',
          type: 'text',
          localized: true,
          required: true,
          label: 'Lead-in',
        },
        {
          name: 'body',
          type: 'text',
          localized: true,
          required: true,
          label: 'Body',
        },
      ],
    },
  ],
}
