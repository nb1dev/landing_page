import slugify from 'slugify'

export function normalizeSlug(value: string) {
  return slugify(value, {
    lower: true, // lowercase
    strict: true, // remove special characters
    locale: 'de', // good for ä ö ü ß
    trim: true,
  })
}
