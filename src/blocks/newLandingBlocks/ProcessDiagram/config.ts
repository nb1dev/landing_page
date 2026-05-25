import type { Block } from 'payload'
import { makeHeadingEditor } from '@/fields/headingLexical'

const headingEditor = makeHeadingEditor(['h2', 'h3'])

export const ProcessDiagramBlock: Block = {
  slug: 'processDiagram',
  interfaceName: 'ProcessDiagramBlock',
  labels: {
    singular: 'Process Diagram',
    plural: 'Process Diagrams',
  },
  fields: [
    {
      name: 'backgroundColor',
      label: 'Theme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Dark Navy', value: 'darkNavy' },
        { label: 'Teal', value: 'teal' },
        { label: 'White', value: 'white' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'How NB¹ works',
    },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      required: true,
      editor: headingEditor,
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'timelineEyebrow', type: 'text', localized: true, required: true },
        { name: 'timelineName', type: 'text', localized: true, required: true },
        { name: 'panelTag', type: 'text', localized: true, required: true },
        { name: 'panelHeading', type: 'text', localized: true, required: true },
        { name: 'panelBody', type: 'textarea', localized: true, required: true },
        {
          name: 'visualType',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Mock Report', value: 'mockReport' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'image',
          },
        },
        {
          name: 'imageUrl',
          label: 'External Image URL fallback',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'image',
          },
        },
        {
          name: 'imageAlt',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'image',
          },
        },
        {
          name: 'mockEyebrow',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'mockReport',
          },
        },
        {
          name: 'mockRows',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'mockReport',
          },
          fields: [
            { name: 'label', type: 'text', localized: true, required: true },
            { name: 'percentage', type: 'number', min: 0, max: 100, required: true },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'ok',
              options: [
                { label: 'OK', value: 'ok' },
                { label: 'Low / Amber', value: 'low' },
              ],
            },
          ],
        },
        {
          name: 'mockFootLabel',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'mockReport',
          },
        },
        {
          name: 'mockFootText',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.visualType === 'mockReport',
          },
        },
        {
          name: 'listItems',
          type: 'array',
          fields: [
            { name: 'marker', type: 'text', required: true },
            { name: 'text', type: 'text', localized: true, required: true },
            {
              name: 'subLine',
              type: 'text',
              localized: true,
              admin: {
                description: 'Optional sub-line shown below the ingredient name (e.g. strain list)',
              },
            },
            { name: 'dose', type: 'text', localized: true },
            { name: 'benefit', type: 'text', localized: true },
          ],
        },
        {
          name: 'strainCaption',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional italic caption between the ingredient list and the pills row',
          },
        },
        {
          name: 'pills',
          type: 'array',
          fields: [{ name: 'label', type: 'text', localized: true, required: true }],
        },
      ],
    },
    {
      name: 'variants',
      label: 'A/B Variants',
      type: 'array',
      admin: {
        initCollapsed: true,
        description: 'Overrides when ?v=<key> is present.',
      },
      fields: [
        { name: 'variantKey', type: 'text', required: true },
        {
          name: 'backgroundColor',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Dark Navy', value: 'darkNavy' },
            { label: 'Teal', value: 'teal' },
            { label: 'White', value: 'white' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'backgroundColorCustom',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
          },
        },
        { name: 'eyebrow', type: 'text', localized: true },
        {
          name: 'heading',
          type: 'richText',
          localized: true,
          editor: headingEditor,
        },
      ],
    },
  ],
}
