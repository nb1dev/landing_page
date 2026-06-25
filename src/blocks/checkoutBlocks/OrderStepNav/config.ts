import type { Block } from 'payload'

export const OrderStepNav: Block = {
  slug: 'orderStepNav',
  interfaceName: 'OrderStepNavBlock',
  labels: { singular: 'Order Step Nav', plural: 'Order Step Navs' },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'logoUrl',
      label: 'Logo Link URL',
      type: 'text',
      defaultValue: '/',
    },
    {
      name: 'activeStep',
      label: 'Active Step',
      type: 'select',
      defaultValue: '1',
      required: true,
      options: [
        { label: '1 — Plan', value: '1' },
        { label: '2 — Duration', value: '2' },
        { label: '3 — Checkout', value: '3' },
        { label: 'All done (confirmed)', value: 'done' },
      ],
    },
    {
      name: 'step1Label',
      label: 'Step 1 Label',
      type: 'text',
      defaultValue: 'Plan',
      localized: true,
    },
    {
      name: 'step1Url',
      label: 'Step 1 URL',
      type: 'text',
    },
    {
      name: 'step2Label',
      label: 'Step 2 Label',
      type: 'text',
      defaultValue: 'Duration',
      localized: true,
    },
    {
      name: 'step2Url',
      label: 'Step 2 URL',
      type: 'text',
    },
    {
      name: 'step3Label',
      label: 'Step 3 Label',
      type: 'text',
      defaultValue: 'Checkout',
      localized: true,
    },
    {
      name: 'step3Url',
      label: 'Step 3 URL',
      type: 'text',
    },
    {
      name: 'backLabel',
      label: 'Back / Right Link Label',
      type: 'text',
      defaultValue: '← Back',
      localized: true,
    },
    {
      name: 'backUrl',
      label: 'Back / Right Link URL',
      type: 'text',
    },
  ],
}
