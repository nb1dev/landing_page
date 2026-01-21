import React from 'react'

export function AuthorBoxComponent({
  title,
  locale,
  authors,
}: {
  title?: string
  locale: string
  authors: Array<{ name: string; slug?: string; credentials?: string; avatarUrl?: string }>
}) {
  if (!authors?.length) return null

  return (
    <section className="border rounded-xl p-4 mt-10">
      <div className="font-semibold mb-3">{title || 'About the author'}</div>

      <div className="grid gap-4">
        {authors.map((a, i) => (
          <div key={i} className="flex gap-3 items-start">
            {a.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.avatarUrl} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}

            <div>
              {a.slug ? (
                <a className="font-semibold underline" href={`/${locale}/authors/${a.slug}`}>
                  {a.name}
                </a>
              ) : (
                <div className="font-semibold">{a.name}</div>
              )}
              {a.credentials ? <div className="text-sm opacity-80">{a.credentials}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
