import type { Block } from 'payload'
import { makeHeadingEditor, inlineRichTextEditor } from '@/fields/headingLexical'
import { ARCHETYPE_ID_OPTIONS } from './constants'

export const LabReadingPanelBlock: Block = {
  slug: 'labReadingPanel',
  interfaceName: 'LabReadingPanelBlock',
  labels: {
    singular: 'Lab: Reading Panel',
    plural: 'Lab: Reading Panel Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      localized: true,
      editor: makeHeadingEditor(['h1']),
      admin: { description: 'Apply "Brand Teal" color to the emphasized clause, matching the mockup.' },
    },
    { name: 'leadIn', type: 'textarea', localized: true, admin: { description: 'e.g. "Your sample comes back as 200–400 species..."' } },
    {
      name: 'transitionText',
      type: 'richText',
      localized: true,
      editor: inlineRichTextEditor,
      admin: { description: 'Bold "teams" / "ratios" / "balance score" to match the mockup.' },
    },

    { name: 'rawSpeciesLabel', type: 'text', localized: true, admin: { description: 'e.g. "What your sample comes back as"' } },
    {
      name: 'rawSpecies',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'name', type: 'text', required: true, admin: { description: 'Species name (Latin binomial, not localized)' } },
        { name: 'percent', type: 'number', required: true },
      ],
    },
    { name: 'rawMoreLabel', type: 'text', localized: true, admin: { description: 'e.g. "+ 390 more species"' } },

    { name: 'railLabel', type: 'text', localized: true, admin: { description: 'Desktop rail heading, e.g. "Select any pattern to see a typical reading"' } },
    { name: 'tapHintTitle', type: 'text', localized: true, admin: { description: 'Mobile only, e.g. "Tap a pattern to open its full reading"' } },
    { name: 'tapHintSub', type: 'text', localized: true, admin: { description: 'Mobile only, e.g. "Teams · ratios · score"' } },

    {
      name: 'seals',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: { description: 'The 3 evidence stats. Shown twice: a long form in the mobile rail, a short form under the panel.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "8,069"' } },
        { name: 'railLabel', type: 'textarea', localized: true, admin: { description: 'Long form (mobile rail)' } },
        { name: 'panelLabel', type: 'text', localized: true, admin: { description: 'Short form (under panel)' } },
      ],
    },

    { name: 'seeFullReadingLabel', type: 'text', localized: true, admin: { description: 'e.g. "See the full reading"' } },
    { name: 'seeFullReadingHint', type: 'text', localized: true, admin: { description: 'e.g. "Teams · Ratios · Balance"' } },
    { name: 'tabTeamsLabel', type: 'text', localized: true },
    { name: 'tabRatiosLabel', type: 'text', localized: true },
    { name: 'tabBalanceLabel', type: 'text', localized: true },
    { name: 'teamsIntro', type: 'textarea', localized: true },
    { name: 'ratiosIntro', type: 'textarea', localized: true },
    { name: 'scoreIntro', type: 'textarea', localized: true },

    {
      name: 'archetypes',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: { description: 'The 8 gut patterns. Order here is the order shown in the rail.' },
      fields: [
        { name: 'patternId', type: 'select', required: true, options: ARCHETYPE_ID_OPTIONS, admin: { description: 'Determines the icon and is the stable key for this pattern.' } },
        { name: 'name', type: 'text', localized: true, required: true, admin: { description: 'e.g. "Protein fermentation running hot"' } },
        { name: 'card', type: 'text', localized: true, required: true, admin: { description: 'Short label, e.g. "Bloating and gas"' } },
        { name: 'density', type: 'number', required: true, min: 0, max: 1, admin: { description: '0–1, affects how full the population chart looks' } },
        { name: 'score', type: 'number', required: true, min: 0, max: 100 },
        {
          name: 'band',
          type: 'select',
          required: true,
          options: [
            { label: 'Excellent', value: 'Excellent' },
            { label: 'Needs work', value: 'Needs work' },
          ],
        },
        { name: 'stress', type: 'checkbox', defaultValue: false, admin: { description: 'This pattern comes from questionnaire signals, not composition (changes the score note copy)' } },
        { name: 'hold', type: 'checkbox', defaultValue: false, admin: { description: 'In-range pattern — the goal is to hold steady (changes the score note copy)' } },

        {
          name: 'teams',
          type: 'group',
          admin: { description: 'Team %, in Fibre / Butyrate / Cross-feeders / Bifido / Mucus / Protein order' },
          fields: [
            { name: 'fibre', type: 'number', required: true },
            { name: 'butyrate', type: 'number', required: true },
            { name: 'crossFeeders', type: 'number', required: true },
            { name: 'bifido', type: 'number', required: true },
            { name: 'mucus', type: 'number', required: true },
            { name: 'protein', type: 'number', required: true },
          ],
        },
        {
          name: 'radar',
          type: 'group',
          admin: { description: '% of potential, in Health / Diversity / Metabolic / Team balance / Safety order' },
          fields: [
            { name: 'health', type: 'number', required: true },
            { name: 'diversity', type: 'number', required: true },
            { name: 'metabolic', type: 'number', required: true },
            { name: 'teamBalance', type: 'number', required: true },
            { name: 'safety', type: 'number', required: true },
          ],
        },
        {
          name: 'ratios',
          type: 'group',
          admin: { description: 'In the same order as the 4 ratio definitions (Main fuel / Fermentation / Gut-lining / By-products)' },
          fields: [
            { name: 'mainFuel', type: 'number', required: true },
            { name: 'fermentation', type: 'number', required: true },
            { name: 'gutLining', type: 'number', required: true },
            { name: 'byproducts', type: 'number', required: true },
          ],
        },

        {
          name: 'whats',
          type: 'textarea',
          localized: true,
          required: true,
          admin: { description: 'Full explanation. The first sentence is shown as the short summary automatically.' },
        },
        {
          name: 'focus',
          type: 'richText',
          localized: true,
          editor: inlineRichTextEditor,
          admin: { description: 'Bold the key phrase, matching the mockup, e.g. "...tip fermentation back toward fibre."' },
        },
      ],
    },
  ],
}
