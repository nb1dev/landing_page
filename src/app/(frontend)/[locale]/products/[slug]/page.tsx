import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { JsonLd, type JsonLdValue } from '@/components/JsonLd'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params

  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = res.docs?.[0]
  if (!product) return notFound()

  const productJsonLd: JsonLdValue = ((product as any)?.jsonLd ?? null) as JsonLdValue

  return (
    <>
      <Header locale={locale} />

      {/* ✅ Per-product JSON-LD */}
      <JsonLd data={productJsonLd} />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </main>

      <Footer locale={locale} />
    </>
  )
}
