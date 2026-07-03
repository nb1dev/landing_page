import type { Block } from 'payload'

export const YpStickyBuyBlock: Block = {
  slug: 'ypStickyBuy',
  interfaceName: 'YpStickyBuyBlock',
  labels: { singular: 'YP — Sticky Buy Bar', plural: 'YP — Sticky Buy Bars' },
  fields: [
    {
      name: 'priceTokenHelp',
      type: 'ui',
      admin: {
        components: {
          Field: { path: '/blocks/yourPlanBlocks/PriceTokenHelp', exportName: 'PriceTokenHelp' },
        },
      },
    },
    // ── Appearance ──────────────────────────────────────────────
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      defaultValue: 'glass',
      options: [
        { label: 'Glass / White (frosted, default)', value: 'glass' },
        { label: 'Paper / White (solid)', value: 'paper' },
        { label: 'Cool Light (#F1F4F7)', value: 'off' },
        { label: 'Cream (#FAF8F2)', value: 'cream' },
        { label: 'Navy (#12314D)', value: 'navy' },
        { label: 'Deep Navy (#0E2740)', value: 'navyDeep' },
        { label: 'Teal (#0A8FB0)', value: 'teal' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'backgroundColorCustom',
      label: 'Custom Background Color (hex or rgba)',
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
    // ── Content ─────────────────────────────────────────────────
    {
      name: 'leftKey',
      label: 'Left Text (bold)',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Your formula, built from your gut".' },
    },
    {
      name: 'leftValue',
      label: 'Secondary Text',
      type: 'text',
      localized: true,
      admin: { description: 'Muted text after the bold part — hidden on small screens. Supports live-price tokens, e.g. "from {{price:core:4}}/mo".' },
    },
    {
      name: 'ctaLabel',
      label: 'CTA Label',
      type: 'text',
      localized: true,
      admin: { description: 'e.g. "Order your kit". Add an arrow yourself if you want one.' },
    },
    { name: 'ctaHref', label: 'CTA URL', type: 'text', localized: true, defaultValue: '#' },
    // ── Behaviour (advanced) ────────────────────────────────────
    {
      name: 'showAfterSel',
      label: 'Show After (CSS selector)',
      type: 'text',
      defaultValue: '.yp-hero, [data-screen-label="Hero"], .hero',
      admin: { description: 'The bar appears once this element scrolls past the top. Falls back to ~700px scrolled if not found.' },
    },
    {
      name: 'hideAtSel',
      label: 'Hide At (CSS selectors)',
      type: 'text',
      defaultValue: '.yp-plans, .buy-close, footer, .nbf',
      admin: { description: 'Comma-separated. The bar hides once any of these enters the viewport.' },
    },
  ],
}
