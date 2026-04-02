import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'
import React from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = {
  locale: string
}

type FooterNavItem = {
  link?: {
    label?: string | null
    localizedLabel?: string | null
    [key: string]: unknown
  } | null
}

export async function Footer({ locale }: Props) {
  const footerData = (await getCachedGlobal('footer', 1, locale)()) as FooterType & {
    logo?: number | Media | null
    copyrightText?: string | null
    navItems?: FooterNavItem[] | null
  }

  const navItems = footerData?.navItems || []

  const logo =
    typeof footerData?.logo === 'object' && footerData.logo !== null
      ? (footerData.logo as Media)
      : null

  const copyrightText = footerData?.copyrightText || null

  return (
    <footer className="bg-transparent">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-[40px] py-6 lg:flex-row lg:items-center lg:justify-between">
        {navItems.length > 0 ? (
          <nav className="flex flex-col gap-4 lg:order-2 lg:flex-row lg:items-center lg:gap-8">
            {navItems.map(({ link }, i) => {
              if (!link) return null

              const resolvedLabel =
                typeof link.localizedLabel === 'string' && link.localizedLabel.trim().length > 0
                  ? link.localizedLabel
                  : link.label

              return (
                <CMSLink
                  key={i}
                  {...link}
                  label={resolvedLabel}
                  className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#303438] hover:text-[#111]"
                />
              )
            })}
          </nav>
        ) : null}

        <div className="flex items-center justify-between gap-3 lg:order-1 lg:justify-start">
          {logo?.url ? (
            <div className="relative h-[28px]" style={{ width: 'fit-content' }}>
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                height={28}
                width={60}
                className="object-contain"
              />
            </div>
          ) : null}

          {copyrightText ? (
            <span
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#303438',
              }}
            >
              {copyrightText}
            </span>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
