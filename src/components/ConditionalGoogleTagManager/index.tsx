'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

type Props = {
  gtmId: string
}

export function ConditionalGoogleTagManager({ gtmId }: Props) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/cms/admin')

  if (isAdminRoute) {
    return null
  }

  return <GoogleTagManager gtmId={gtmId} />
}
