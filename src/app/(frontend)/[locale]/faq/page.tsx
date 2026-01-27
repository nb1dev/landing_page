import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { JsonLd } from '@/components/JsonLd'
import { buildFAQPageSchema } from '@/utilities/buildFAQPageSchema'

const LOCALES = ['en', 'de'] as const
type AppLocale = (typeof LOCALES)[number]
const isAppLocale = (v: string): v is AppLocale => (LOCALES as readonly string[]).includes(v)

type Props = {
  params: Promise<{ locale: string }>
}

export default async function FAQPage({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : 'en'

  const payload = await getPayload({ config })

  const faq = await payload.findGlobal({
    slug: 'faq' as any, // remove cast after generate:types + tsconfig include fix
    locale,
    fallbackLocale: 'en',
  })

  const sections =
    ((faq as any)?.sections ?? []).map((s: any) => ({
      title: s.title,
      items: (s.items ?? []).map((it: any) => ({
        question: String(it.question ?? ''),
        answer: String(it.answer ?? ''),
      })),
    })) ?? []

  // same “override or generate” pattern you likely use in posts
  const override = (faq as any)?.structuredData ?? null
  const generated = buildFAQPageSchema(sections)
  const jsonLd = override || generated

  return (
    <>
      <JsonLd data={jsonLd} />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
        <h1>FAQ</h1>

        {sections.map((section: any, idx: number) => (
          <section key={idx} style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>{section.title}</h2>

            <div style={{ display: 'grid', gap: 12 }}>
              {section.items.map((item: any, j: number) => (
                <details
                  key={j}
                  style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}
                >
                  <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.question}</summary>
                  <div style={{ marginTop: 10, lineHeight: 1.6 }}>{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}
