import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  locale?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    locale,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href: string | null | undefined = url

  if (type === 'reference' && typeof reference?.value === 'object') {
    const val = reference.value as Page | Post
    // Slug may be a plain string (posts, non-localized) or a localized object { en: '...', de: '...' }
    const rawSlug = (val as any).slug
    const slug =
      typeof rawSlug === 'string'
        ? rawSlug
        : typeof rawSlug === 'object' && rawSlug !== null
          ? ((rawSlug as Record<string, string>)[locale ?? 'en'] ?? (rawSlug as Record<string, string>)['en'])
          : null

    if (slug) {
      const localePrefix = locale ? `/${locale}` : ''
      const collectionPrefix = reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''
      href = `${localePrefix}${collectionPrefix}/${slug}`
    }
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
