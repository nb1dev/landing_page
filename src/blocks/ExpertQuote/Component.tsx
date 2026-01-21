import React from 'react'

export function ExpertQuoteComponent({
  quote,
  expert,
  expertName,
  credentials,
  avatar,
  locale,
}: {
  quote: string
  locale: string
  expert?: any
  expertName?: string
  credentials?: string
  avatar?: any
}) {
  const resolvedName = expert?.name || expertName || 'Expert'
  const resolvedCreds = expert?.credentials || credentials || ''
  const resolvedAvatar = expert?.avatar?.url || avatar?.url || ''
  const href = expert?.slug ? `/${locale}/authors/${expert.slug}` : undefined

  return (
    <section className="border rounded-xl p-5 my-8">
      <p className="text-lg leading-relaxed">“{quote}”</p>

      <div className="flex items-center gap-3 mt-4">
        {resolvedAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedAvatar}
            alt={resolvedName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}

        <div>
          {href ? (
            <a className="font-semibold underline" href={href}>
              {resolvedName}
            </a>
          ) : (
            <div className="font-semibold">{resolvedName}</div>
          )}
          {resolvedCreds ? <div className="text-sm opacity-80">{resolvedCreds}</div> : null}
        </div>
      </div>
    </section>
  )
}
