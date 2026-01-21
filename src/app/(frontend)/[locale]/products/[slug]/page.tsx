import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { JsonLd } from '@/components/JsonLd'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = res.docs?.[0]
  if (!product) return notFound()

  return (
    <>
      {/* ✅ Per-product JSON-LD */}
      <JsonLd data={product.jsonLd ?? null} />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </main>
    </>
  )
}
