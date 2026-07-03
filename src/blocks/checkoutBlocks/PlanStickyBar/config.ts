import type { Block } from 'payload'

export const PlanStickyBar: Block = {
  slug: 'planStickyBar',
  interfaceName: 'PlanStickyBarBlock',
  labels: { singular: 'Plan Sticky Bar', plural: 'Plan Sticky Bars' },
  fields: [
    {
      name: 'defaultPlanKey',
      type: 'select',
      label: 'Default selected plan',
      defaultValue: 'advanced',
      options: [
        { label: 'Core', value: 'core' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Per-plan config',
      minRows: 1,
      fields: [
        {
          name: 'planKey',
          type: 'select',
          label: 'Plan key',
          required: true,
          options: [
            { label: 'Core', value: 'core' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
        {
          name: 'selectedLabel',
          type: 'text',
          label: 'Selected label (e.g. "Selected Advanced")',
          localized: true,
          required: true,
        },
        {
          name: 'switchLinkText',
          type: 'text',
          label: 'Switch link text (e.g. "switch")',
          localized: true,
        },
        {
          name: 'switchToPlanKey',
          type: 'select',
          label: 'Switch changes selection to',
          options: [
            { label: 'Core', value: 'core' },
            { label: 'Advanced', value: 'advanced' },
          ],
          admin: { description: 'Which plan to activate in PlanSelector when switch is clicked' },
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA button text',
          localized: true,
          required: true,
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'CTA button href',
          required: true,
          localized: true,
        },
        {
          name: 'ctaVariant',
          type: 'select',
          label: 'CTA button style',
          defaultValue: 'advanced',
          options: [
            { label: 'Yellow (Advanced)', value: 'advanced' },
            { label: 'Outline (Core)', value: 'core' },
          ],
        },
      ],
    },
  ],
}
