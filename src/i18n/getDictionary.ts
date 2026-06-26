import { defaultLocale, type AppLocale } from './config'
import { en } from './dictionaries/en'
import { de } from './dictionaries/de'
import { fr } from './dictionaries/fr'
import { nl } from './dictionaries/nl'

const dictionaries = {
  en,
  de,
  fr,
  nl,
} as const

export function getDictionary(locale?: string) {
  const safeLocale: AppLocale =
    locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'nl' ? 'nl' : defaultLocale
  return dictionaries[safeLocale]
}
