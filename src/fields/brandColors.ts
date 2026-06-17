export const brandColors = {
  'text-white': { css: { color: '#ffffff' }, label: 'White' },
  'text-black': { css: { color: '#000000' }, label: 'Black' },
  'text-brand': { css: { color: '#0A8FB0' }, label: 'Brand' },
} as const

export const brandColorSwatches = [
  { type: 'button' as const, label: 'White', color: '#ffffff' },
  { type: 'button' as const, label: 'Black', color: '#000000' },
  { type: 'button' as const, label: 'Brand Teal', color: '#0A8FB0' },
]
