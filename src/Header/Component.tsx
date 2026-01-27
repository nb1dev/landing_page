import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'

export async function Header({ locale }: { locale: string }) {
  // Use a higher depth so link fields/relationships resolve properly
  const headerData = (await getCachedGlobal('header', 3, locale)()) as HeaderType

  return <HeaderClient data={headerData} locale={locale} />
}
