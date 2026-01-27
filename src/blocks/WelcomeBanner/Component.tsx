'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '@/components/RichText'
import { useIsMobile } from '@/hooks/useIsMobile'

import { CarouselBanner } from './CarouselBanner'

const LOCALES = ['en', 'de'] as const
type AppLocale = (typeof LOCALES)[number]

function detectLocaleFromPath(pathname: string): AppLocale {
  const seg = (pathname || '/').split('/').filter(Boolean)[0]
  if (seg === 'de' || seg === 'en') return seg
  return 'en'
}

function stripLocalePrefix(pathname: string): string {
  const parts = (pathname || '/').split('/').filter(Boolean)
  const first = parts[0]
  if (first === 'de' || first === 'en') {
    const rest = parts.slice(1).join('/')
    return '/' + rest
  }
  return pathname || '/'
}

/**
 * Convert absolute media URLs (https://stg.nb1.com/...) to relative (/cms/...)
 * so Next Image treats them as same-origin and doesn't require remotePatterns.
 */
function toRelativeSrc(input?: string): string | undefined {
  if (!input) return undefined

  // already relative
  if (input.startsWith('/')) return input

  try {
    const u = new URL(input)
    return `${u.pathname}${u.search}`
  } catch {
    // if it's not a valid absolute URL, return as-is
    return input
  }
}

export const WelcomeBannerBlock: React.FC<WelcomeBannerBlockProps> = (props) => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname() || '/'

  const locale = useMemo(() => detectLocaleFromPath(pathname), [pathname])
  const pathWithoutLocale = useMemo(() => stripLocalePrefix(pathname), [pathname])

  const [locationUrl, setLocationUrl] = useState(pathname)

  useEffect(() => {
    setLocationUrl(pathname)
  }, [pathname])

  const goToLocale = (target: AppLocale) => {
    const nextPath = `/${target}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    router.push(nextPath)
  }

  const goLogin = () => {
    router.push(`/${locale}/login`)
  }

  const bgDesktop =
    typeof props?.backgroundImage === 'object'
      ? {
          src: toRelativeSrc(getMediaUrl(props.backgroundImage.url).toString()),
          alt: props.backgroundImage.alt || 'Hero background',
        }
      : null

  const bgMobile =
    typeof props?.backgroundImageMobile === 'object'
      ? {
          src: toRelativeSrc(getMediaUrl(props.backgroundImageMobile.url).toString()),
          alt: props.backgroundImageMobile.alt || 'Hero background mobile',
        }
      : null

  const logo =
    typeof props?.logo === 'object'
      ? {
          src: toRelativeSrc(getMediaUrl(props.logo.url).toString()),
          alt: props.logo.alt || 'Logo',
        }
      : null

  return (
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '20px' : '' }}
    >
      <div
        className={`relative flex ${isMobile ? 'flex-col' : 'flex-row gap-2'}`}
        style={{
          width: '100%',
          minHeight: isMobile ? '620px' : '640px',
          backgroundColor: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {(isMobile ? bgMobile : bgDesktop)?.src && (
          <Image
            src={(isMobile ? bgMobile : bgDesktop)!.src as string}
            alt={(isMobile ? bgMobile : bgDesktop)!.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className={`relative z-10 ${isMobile ? 'flex-col' : 'flex'} w-full`}>
          <div
            className={`${isMobile ? 'w-full' : 'w-1/2'}`}
            style={{
              paddingTop: isMobile ? '37px' : '100px',
              paddingLeft: isMobile ? '37px' : '87px',
              paddingRight: isMobile ? '37px' : '',
            }}
          >
            <div className={`${isMobile ? '' : 'mb-16'}`}>
              {logo?.src && (
                <Image
                  src={logo.src as string}
                  alt={logo.alt}
                  width={220}
                  height={90}
                  priority
                  quality={95}
                  style={{ height: 'auto', width: 'auto', maxWidth: '240px' }}
                />
              )}
            </div>

            <div className={`flex w-full gap-8 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              <div className={`flex ${isMobile ? 'w-full' : ''} flex-col gap-8`}>
                <div className={`${isMobile ? 'mb-4 pt-4 mt-8' : 'mb-16'}`}>
                  <div
                    style={{
                      fontSize: isMobile ? '38px' : '70px',
                      fontFamily: 'Instrument Sans',
                      fontWeight: '500',
                      lineHeight: isMobile ? '42px' : '74px',
                      marginBottom: '24px',
                      width: isMobile ? '85%' : '100%',
                    }}
                    className="mb-6"
                  >
                    <RichText
                      data={props.heading as any}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: isMobile ? '20px' : '24px',
                      color: '#292929',
                      fontWeight: '400',
                      fontFamily: 'Inter',
                      lineHeight: isMobile ? '26px' : '34px',
                      width: isMobile ? '85%' : '100%',
                    }}
                  >
                    {props.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isMobile ? 'w-full' : 'w-1/2 ml-auto'}`}>
            {!isMobile && (
              <div className="w-full">
                <div
                  className="ml-auto"
                  style={{
                    width: 'fit-content',
                    marginRight: '22px',
                    marginTop: '22px',
                    fontSize: '14px',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    lineHeight: '34px',
                    color: '#646464',
                  }}
                >
                  {props.copyrightText}
                </div>
              </div>
            )}

            <div style={{ marginTop: isMobile ? undefined : '206px' }}>
              <CarouselBanner {...props} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isMobile ? 'w-full' : 'w-1/2'}`}
        style={{
          fontSize: isMobile ? '15px' : '18px',
          marginTop: isMobile ? '32px' : '80px',
          color: '#a6a6a6',
          fontFamily: 'Inter',
          fontWeight: '400',
          lineHeight: isMobile ? '22px' : '30px',
        }}
      >
        {props.lineText}
      </div>
    </div>
  )
}
