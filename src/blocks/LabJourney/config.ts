import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

const nodeFields = (withTimestamp: boolean) => [
  { name: 'name', type: 'text' as const, localized: true, required: true },
  { name: 'desc', type: 'textarea' as const, localized: true },
  ...(withTimestamp ? [{ name: 'timestamp', type: 'text' as const, localized: true, admin: { description: 'e.g. "Day 0 · 10 min"' } }] : []),
]

export const LabJourneyBlock: Block = {
  slug: 'labJourney',
  interfaceName: 'LabJourneyBlock',
  labels: {
    singular: 'Lab: Journey',
    plural: 'Lab: Journey Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'sub', type: 'textarea', localized: true },
    { name: 'legendYourPartLabel', type: 'text', localized: true },
    { name: 'legendOurPartLabel', type: 'text', localized: true },
    { name: 'scrollCueText', type: 'text', localized: true },

    // Act 0 aside panel — "Your part" (timer viz)
    { name: 'act0Label', type: 'text', localized: true },
    { name: 'act0Heading', type: 'text', localized: true },
    { name: 'act0Body', type: 'textarea', localized: true },
    { name: 'act0VizValue', type: 'text', defaultValue: '10', admin: { description: 'e.g. "10"' } },
    { name: 'act0VizUnit', type: 'text', localized: true, defaultValue: 'MIN' },

    // Act 1 aside panel — "Our part · in the lab" (spinner + N/7 viz)
    { name: 'act1Label', type: 'text', localized: true },
    { name: 'act1Heading', type: 'text', localized: true },
    { name: 'act1Body', type: 'textarea', localized: true },

    // Act 2 aside panel — "Your part · ongoing" (infinity viz)
    { name: 'act2Label', type: 'text', localized: true },
    { name: 'act2Heading', type: 'text', localized: true },
    { name: 'act2Body', type: 'textarea', localized: true },

    {
      name: 'yourPartNodes',
      type: 'array',
      minRows: 1,
      admin: { description: 'Chapter 1 (teal) — e.g. Intake questionnaire, Gut sample' },
      fields: nodeFields(true),
    },
    {
      name: 'labNodes',
      type: 'array',
      minRows: 1,
      admin: { description: 'Chapter 2 (amber) — the 7 in-lab steps. Drives the "N/7" counter in the aside panel.' },
      fields: nodeFields(false),
    },
    {
      name: 'ongoingNodes',
      type: 'array',
      minRows: 1,
      admin: { description: 'Chapter 3 — e.g. First box, Take it daily, Retest' },
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Big (first box)', value: 'big' },
            { label: 'Infinite (dashed, ongoing)', value: 'inf' },
            { label: 'Gold (Advanced retest)', value: 'gold' },
          ],
        },
        ...nodeFields(true),
      ],
    },

    {
      name: 'footNote',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "Your part:" / "Ours:"; apply the "Amber" color to "Advanced", matching the mockup.' },
    },
  ],
}
