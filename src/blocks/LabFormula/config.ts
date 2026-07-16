import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'

export const LabFormulaBlock: Block = {
  slug: 'labFormula',
  interfaceName: 'LabFormulaBlock',
  labels: {
    singular: 'Lab: Formula',
    plural: 'Lab: Formula Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'e.g. "We build it"' } },
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h2']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'lede', type: 'textarea', localized: true },

    // 01 · First, the basics
    { name: 'stage1Label', type: 'text', localized: true, admin: { description: 'e.g. "First, the basics"' } },
    { name: 'stage1Sub', type: 'textarea', localized: true },
    { name: 'liveCulturesLabel', type: 'text', localized: true },
    { name: 'liveCulturesText', type: 'textarea', localized: true },
    { name: 'prebioticsLabel', type: 'text', localized: true },
    { name: 'prebioticsText', type: 'textarea', localized: true },
    { name: 'combinedLabel', type: 'text', localized: true },
    { name: 'combinedText', type: 'textarea', localized: true },

    // 02 · The cultures, up close
    { name: 'stage2Label', type: 'text', localized: true, admin: { description: 'e.g. "The cultures, up close"' } },
    { name: 'stage2Heading', type: 'text', localized: true, admin: { description: 'e.g. "Living strains, with the evidence to back them."' } },
    {
      name: 'stage2Intro',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the key word, matching the mockup, e.g. "We use **strains**: ..."' },
    },
    { name: 'jobsScopeLabel', type: 'text', localized: true, admin: { description: 'e.g. "A few of the jobs your reading might call for"' } },
    { name: 'jobsMoreLabel', type: 'text', localized: true, admin: { description: 'e.g. "and more, as your reading shows"' } },
    { name: 'jobsMoreMobileNote', type: 'text', localized: true, admin: { description: 'e.g. "+ many more. Your reading decides which apply to you"' } },
    { name: 'workedDetailLabel', type: 'text', localized: true, admin: { description: 'e.g. "One of them, in detail"' } },
    { name: 'workedFootNote', type: 'richText', localized: true, editor: inlineRichTextEditor, admin: { description: 'e.g. "Your formula includes **only the jobs your reading calls for**, ..."' } },
    {
      name: 'jobs',
      type: 'array',
      minRows: 1,
      admin: { description: 'Job selector tags. The first is shown expanded by default.' },
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'sourceType',
          type: 'select',
          required: true,
          defaultValue: 'sample',
          options: [
            { label: 'From your sample', value: 'sample' },
            { label: 'From your questionnaire', value: 'quest' },
          ],
        },
        { name: 'trigger', type: 'textarea', localized: true },
        {
          name: 'mode',
          type: 'select',
          required: true,
          defaultValue: 'flex',
          options: [
            { label: 'Single anchor strain + conditional adds', value: 'flex' },
            { label: 'Combination (no single strain)', value: 'combo' },
          ],
        },
        {
          name: 'leadName',
          type: 'text',
          admin: { condition: (_, siblingData) => siblingData?.mode !== 'combo' },
        },
        {
          name: 'leadNote',
          type: 'textarea',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.mode !== 'combo' },
        },
        {
          name: 'adds',
          type: 'array',
          maxRows: 2,
          admin: { condition: (_, siblingData) => siblingData?.mode !== 'combo' },
          fields: [
            { name: 'condition', type: 'text', localized: true },
            { name: 'strain', type: 'text', localized: true },
          ],
        },
        {
          name: 'comboCaption',
          type: 'text',
          localized: true,
          admin: { condition: (_, siblingData) => siblingData?.mode === 'combo' },
        },
        {
          name: 'members',
          type: 'array',
          admin: { condition: (_, siblingData) => siblingData?.mode === 'combo' },
          fields: [
            { name: 'name', type: 'text' },
            { name: 'note', type: 'textarea', localized: true },
          ],
        },
      ],
    },

    // 03 · Precision prebiotics
    { name: 'stage3Label', type: 'text', localized: true, admin: { description: 'e.g. "Precision prebiotics"' } },
    { name: 'stage3Heading', type: 'text', localized: true },
    { name: 'stage3Intro', type: 'textarea', localized: true },
    {
      name: 'blendRows',
      type: 'array',
      admin: { description: 'Mobile-only fibre dose bars (the desktop chart is a fixed illustration)' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'position', type: 'number', required: true, min: 0, max: 100 },
      ],
    },
    { name: 'notInBlendLabel', type: 'text', localized: true },
    { name: 'notInBlendNote', type: 'text', localized: true },
    {
      name: 'blendCaption',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the lead phrase, e.g. "**A few fibres, chosen from dozens.** Only the ones..."' },
    },

    // Closing quote
    {
      name: 'quoteText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold the closing clause, matching the mockup.' },
    },
    { name: 'quoteAuthorImage', type: 'upload', relationTo: 'media' },
    { name: 'quoteAuthorName', type: 'text' },
    { name: 'quoteAuthorInst', type: 'text', localized: true },
  ],
}
