import { defaultLocale, type AppLocale } from './config'
import { en } from './dictionaries/en'
import { de } from './dictionaries/de'

const dictionaries = {
  en,
  de,
} as const

export function getDictionary(locale?: string) {
  const safeLocale: AppLocale = locale === 'de' ? 'de' : defaultLocale
  return dictionaries[safeLocale]
}
