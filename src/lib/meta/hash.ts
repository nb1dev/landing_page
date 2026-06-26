import { createHash } from 'node:crypto'

const sha256 = (v: string) => createHash('sha256').update(v, 'utf8').digest('hex')
const lower = (v: string) => v.trim().toLowerCase()

export const hEmail = (v?: string) => (v ? sha256(lower(v)) : undefined)
export const hName = (v?: string) => (v ? sha256(lower(v)) : undefined)
export const hCity = (v?: string) =>
  v ? sha256(lower(v).replace(/[^a-z]/g, '')) : undefined
export const hState = (v?: string) =>
  v ? sha256(lower(v).replace(/[^a-z]/g, '')) : undefined
export const hZip = (v?: string) =>
  v ? sha256(lower(v).split('-')[0].replace(/\s/g, '')) : undefined
export const hCountry = (v?: string) => (v ? sha256(lower(v)) : undefined)

export const hPhone = (v?: string) => {
  if (!v) return undefined
  const digits = v.replace(/\D/g, '').replace(/^0+/, '')
  return digits ? sha256(digits) : undefined
}
