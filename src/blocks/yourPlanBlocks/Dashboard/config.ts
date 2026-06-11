import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const headingEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
  ],
})
const inlineEditor = lexicalEditor({
  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()],
})

const isType = (t: string) => (_: unknown, s: any) => s?.cardType === t

export const YpDashboardBlock: Block = {
  slug: 'ypDashboard',
  interfaceName: 'YpDashboardBlock',
  labels: { singular: 'YP — Dashboard', plural: 'YP — Dashboards' },
  fields: [
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'off',
      options: [
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Paper / White (#FFFFFF)', value: 'paper' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex)',
      type: 'text',
      admin: { condition: (_, s) => s?.backgroundColor === 'custom' },
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'color',
      options: [
        { label: 'Color', value: 'color' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.backgroundType === 'image' },
    },
    { name: 'grain', label: 'Grain Texture', type: 'checkbox', defaultValue: true },
    // ── Section head ────────────────────────────────────────────
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true },
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      localized: true,
      editor: headingEditor,
      admin: { description: 'Apply teal text color to a phrase for the accent.' },
    },
    { name: 'lede', label: 'Lede', type: 'richText', localized: true, editor: inlineEditor },
    // ── Phone + report CTA (shared across tabs) ─────────────────
    {
      name: 'phoneImage',
      label: 'Phone Screen Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Blurred screenshot shown inside the phone (same across all tabs).' },
    },
    {
      name: 'reportLabel',
      label: 'Report CTA Label',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "See a full sample health report". Opens the sample report modal.' },
    },
    {
      name: 'reportModalTitle',
      label: 'Report Modal Title',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Sample health report".' },
    },
    {
      name: 'reportImage',
      label: 'Report Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Full sample report image shown in the modal.' },
    },
    // ── Tabs (views) ────────────────────────────────────────────
    {
      name: 'views',
      labels: { singular: 'Tab (view)', plural: 'Tabs (views)' },
      type: 'array',
      admin: { description: 'Each pill is a tab. Accordion auto-advances; phone card differs per tab.' },
      fields: [
        { name: 'pillLabel', label: 'Pill Label', type: 'text', localized: true, required: true },
        { name: 'title', label: 'Title', type: 'text', localized: true },
        {
          name: 'items',
          label: 'Accordion Items',
          type: 'array',
          admin: { description: 'Numbered 01, 02, 03… automatically.' },
          fields: [
            { name: 'heading', label: 'Heading', type: 'text', localized: true, required: true },
            { name: 'body', label: 'Body', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'card',
          label: 'Phone Card',
          type: 'group',
          fields: [
            {
              name: 'cardType',
              label: 'Card Type',
              type: 'select',
              defaultValue: 'gauge',
              options: [
                { label: 'Gauge (overall score + metrics)', value: 'gauge' },
                { label: 'Scales (horizontal sliders)', value: 'scales' },
                { label: 'Teams (bars + status)', value: 'teams' },
                { label: 'Map (reading → ingredient)', value: 'map' },
              ],
            },
            {
              name: 'heading',
              label: 'Card Heading',
              type: 'text',
              localized: true,
              admin: { description: 'Gauge: label above score (e.g. "Overall score"). Others: small uppercase title.' },
            },
            // GAUGE
            { name: 'flag', label: 'Gauge — Flag', type: 'text', localized: true, admin: { condition: isType('gauge'), description: 'e.g. "Excellent".' } },
            { name: 'score', label: 'Gauge — Score', type: 'text', localized: true, admin: { condition: isType('gauge'), description: 'e.g. "85.5". The track fill is computed as score / 100.' } },
            {
              name: 'metrics',
              label: 'Gauge — Metrics',
              type: 'array',
              admin: { condition: isType('gauge') },
              fields: [
                { name: 'name', label: 'Name', type: 'text', localized: true, required: true },
                { name: 'value', label: 'Value', type: 'text', localized: true, admin: { description: 'e.g. "18.7". Bar width is computed as value / max.' } },
                { name: 'max', label: 'Max', type: 'text', localized: true, admin: { description: 'e.g. "20" → shown as "/20".' } },
                { name: 'amber', label: 'Amber', type: 'checkbox', defaultValue: false },
              ],
            },
            // SCALES
            {
              name: 'scales',
              label: 'Scales',
              type: 'array',
              admin: { condition: isType('scales') },
              fields: [
                { name: 'label', label: 'Label', type: 'text', localized: true, required: true },
                { name: 'pct', label: 'Percent', type: 'number', admin: { description: '0–100 (dot position + shown as "%").' } },
                { name: 'amber', label: 'Amber', type: 'checkbox', defaultValue: false },
              ],
            },
            // TEAMS
            {
              name: 'teams',
              label: 'Teams',
              type: 'array',
              admin: { condition: isType('teams') },
              fields: [
                { name: 'name', label: 'Name', type: 'text', localized: true, required: true },
                { name: 'pct', label: 'Bar %', type: 'number' },
                { name: 'statusLabel', label: 'Status Label', type: 'text', localized: true, admin: { description: 'e.g. "Healthy" / "Below range" / "Controlled".' } },
                {
                  name: 'statusType',
                  label: 'Status Type',
                  type: 'select',
                  defaultValue: 'ok',
                  options: [
                    { label: 'OK (teal)', value: 'ok' },
                    { label: 'Low (amber, amber bar)', value: 'low' },
                  ],
                },
              ],
            },
            // MAP
            {
              name: 'mapRows',
              label: 'Map Rows',
              type: 'array',
              admin: { condition: isType('map') },
              fields: [
                { name: 'key', label: 'Reading (key)', type: 'text', localized: true, required: true },
                { name: 'value', label: 'Decision (value)', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
      ],
    },
    // ── Science board strip ─────────────────────────────────────
    {
      name: 'boardFaces',
      label: 'Board Faces',
      type: 'array',
      maxRows: 6,
      fields: [{ name: 'image', label: 'Portrait', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'boardText', label: 'Board Text', type: 'text', localized: true, admin: { description: 'e.g. "Reviewed by our science board before manufacture."' } },
    { name: 'boardLinkLabel', label: 'Board Link Label', type: 'text', localized: true, admin: { description: 'e.g. "Meet the board" (→ appended).' } },
    { name: 'boardLinkUrl', label: 'Board Link URL', type: 'text' },
    // ── Ownership note ──────────────────────────────────────────
    { name: 'ownLabel', label: 'Footer Label', type: 'text', localized: true, admin: { description: 'e.g. "A health layer, not just supplementation".' } },
    { name: 'ownBody', label: 'Footer Body', type: 'textarea', localized: true },
  ],
}
