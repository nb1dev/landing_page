import type { Block } from 'payload'

export const ReinforceCta: Block = {
  slug: 'reinforceCta',
  interfaceName: 'ReinforceCtaBlock',
  labels: { singular: 'Reinforce CTA', plural: 'Reinforce CTAs' },
  fields: [
    {
      name: 'athleteText',
      type: 'text',
      label: 'Athlete reminder text',
      localized: true,
      admin: { placeholder: 'Used by HYROX world champions Tim Wenisch & Alexander Rončević' },
    },
    {
      name: 'athleteImages',
      type: 'array',
      label: 'Athlete face images',
      maxRows: 6,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text', label: 'Alt text' },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Primary CTA text',
      localized: true,
      admin: { placeholder: 'Continue with Core →' },
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Primary CTA href',
      localized: true,
    },
    {
      name: 'ctaText2',
      type: 'text',
      label: 'Secondary CTA text',
      localized: true,
      admin: { placeholder: 'Continue with Advanced →' },
    },
    {
      name: 'ctaHref2',
      type: 'text',
      label: 'Secondary CTA href',
      localized: true,
    },
    {
      name: 'seals',
      type: 'array',
      label: 'Trust seals (legacy)',
      fields: [
        { name: 'boldText', type: 'text', label: 'Bold part', localized: true },
        { name: 'regularText', type: 'text', label: 'Regular part', localized: true },
      ],
    },
  ],
}
