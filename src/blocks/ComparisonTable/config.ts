import type { Block } from 'payload'

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  labels: { singular: 'Comparison Table', plural: 'Comparison Tables' },
  fields: [
    { name: 'title', type: 'text', localized: true, defaultValue: 'Comparison' },
    {
      name: 'generateSchema',
      label: 'Generate schema from this table',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      fields: [
        { name: 'productName', type: 'text', required: true, localized: true },
        { name: 'productUrl', type: 'text' },
        { name: 'brand', type: 'text' },
        { name: 'manufacturer', type: 'text' },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'cells',
          type: 'json',
          admin: { description: 'Key-value map matching column keys.' },
        },
      ],
    },
  ],
}
