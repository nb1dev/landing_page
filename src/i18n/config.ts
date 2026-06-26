export const appLocales = ['en', 'de', 'fr', 'nl'] as const

export type AppLocale = (typeof appLocales)[number]

export const defaultLocale: AppLocale = 'en'

export function isAppLocale(value: string): value is AppLocale {
  return appLocales.includes(value as AppLocale)
}
