'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from '@/payload-types'

type Props = Pick<WelcomeBannerBlockProps, 'bannerLabels'>

export const CarouselBanner: React.FC<Props> = ({ bannerLabels }) => {
  const isMobile = useIsMobile()
  const pathname = usePathname() || '/'

  const [yPositions, setYPositions] = useState([0, 100, 200, 300])
  const [yPositionsMobile, setYPositionsMobile] = useState([0, 60, 120, 180])

  // ✅ Create interval once (desktop)
  useEffect(() => {
    const id = setInterval(() => {
      setYPositions((prev) => {
        const next = prev.slice()
        const first = next.shift()
        if (first !== undefined) next.push(first)
        return next
      })
    }, 4000)

    return () => clearInterval(id)
  }, [])

  // ✅ Create interval once (mobile)
  useEffect(() => {
    const id = setInterval(() => {
      setYPositionsMobile((prev) => {
        const next = prev.slice()
        const first = next.shift()
        if (first !== undefined) next.push(first)
        return next
      })
    }, 4000)

    return () => clearInterval(id)
  }, [])

  const determineStyle = (index: number, showAnimation: boolean) => {
    const num = yPositions[index]
    if (!showAnimation) return { transform: `translate3d(0px,${num}px,0px)` }

    return {
      transform: `translate3d(0px,${num}px,0px)`,
      WebkitTransition: 'all 400ms linear',
      MozTransition: 'all 400ms linear',
      msTransition: 'all 400ms linear',
      OTransition: 'all 400ms linear',
      width: 'max-content',
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: '6rem',
      color: yPositions[index] === 200 ? '#00a8c2' : 'white',
      opacity: yPositions[index] === 200 ? '1' : '0.5',
    } as const
  }

  const determineStyleMobile = (index: number, showAnimation: boolean) => {
    const num = yPositionsMobile[index]
    if (!showAnimation) return { transform: `translate3d(0px,${num}px,0px)` }

    return {
      transform: `translate3d(0px,${num}px,0px)`,
      WebkitTransition: 'all 400ms linear',
      MozTransition: 'all 400ms linear',
      msTransition: 'all 400ms linear',
      OTransition: 'all 400ms linear',
      width: 'max-content',
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: '3rem',
      color: yPositionsMobile[index] === 120 ? '#00a8c2' : 'white',
      opacity: yPositionsMobile[index] === 120 ? '1' : '0.5',
    } as const
  }

  return (
    <>
      {!isMobile ? (
        <div className="absolute" style={{ right: '500px' }}>
          {bannerLabels?.map((item, index) => {
            const imgStyle = determineStyle(index, true)
            return (
              <div key={item.id}>
                <div style={imgStyle} className="animate absolute image">
                  {`+ ${item.textLabel}`}
                </div>
              </div>
            )
          })}
          <div className="box" />
        </div>
      ) : (
        <div
          className="absolute"
          style={{
            // keep your original positioning behavior but without relying on "/" vs "/de"
            left: '95px',
          }}
        >
          {bannerLabels?.map((item, index) => {
            const imgStyle = determineStyleMobile(index, true)
            return (
              <div key={item.id}>
                <div style={imgStyle} className="animate absolute image">
                  {`+ ${item.textLabel}`}
                </div>
              </div>
            )
          })}
          <div className="box" />
        </div>
      )}
    </>
  )
}
