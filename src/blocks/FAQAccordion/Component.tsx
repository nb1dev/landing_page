import React from 'react'

export function FAQAccordionComponent({
  title,
  items,
}: {
  title?: string
  items: Array<{ question: string; answer: string }>
}) {
  if (!items?.length) return null

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">{title || 'FAQ'}</h2>
      <div className="grid gap-3">
        {items.map((it, i) => (
          <details key={i} className="border rounded-xl p-4">
            <summary className="cursor-pointer font-semibold">{it.question}</summary>
            <div className="mt-2 leading-relaxed">{it.answer}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
