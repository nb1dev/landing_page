'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

type Props = {
  gaId: string
}

export function ConditionalGoogleTagManager({ gaId }: Props) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/cms/admin')

  if (isAdminRoute) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
