import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect, useState } from 'react'
import type { WelcomeBannerBlock as WelcomeBannerBlockProps } from 'src/payload-types'

type Props = WelcomeBannerBlockProps

export const CarouselBanner: React.FC<Props> = ({ bannerLabels }) => {
  const [yPositions, setYPositions] = useState([0, 100, 200])
  const [locationUrl, setLocationUrl] = useState('/')
  const isMobile = useIsMobile()

  useEffect(() => {
    const loc = window.location.pathname
    setLocationUrl(loc)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setYPositions([0, 60, 120])
    } else {
      setYPositions([0, 100, 200])
    }
  }, [isMobile])

  useEffect(() => {
    setInterval(() => {
      const pos = yPositions.slice()
      const elem = pos.shift()
      if (elem !== undefined) {
        pos.push(elem)
      }
      setYPositions(pos)
    }, 4000)
  }, [yPositions])

  const determineStyle = (index: number, showAnimation: boolean) => {
    const num = yPositions[index]

    if (showAnimation) {
      return {
        transform: `translate3d(0px,${num}px,0px)`,
        WebkitTransition: 'all 400ms linear',
        MozTransition: 'all 400ms linear',
        msTransition: 'all 400ms linear',
        OTransition: 'all 400ms linear',
        width: 'max-content',
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: isMobile ? '3.75rem' : '6rem',
        color: yPositions[index] === 200 || yPositions[index] === 120 ? '#00a8c2' : 'white',
        opacity: yPositions[index] === 200 || yPositions[index] === 120 ? '1' : '0.5',
        // display: yPositions[index] === 0 ? 'none' : 'inherit',
      }
    } else {
      return {
        transform: `translate3d(0px,${num}px,0px)`,
      }
    }
  }

  return (
    <div
      className="absolute"
      style={{ marginLeft: locationUrl === '/' && !isMobile ? '100px' : isMobile ? '50px' : '0' }}
    >
      {bannerLabels?.map((item, index) => {
        const showAnimation = true
        const position = 'animate absolute image'
        const imgStyle = determineStyle(index, showAnimation)
        return (
          <div key={item.id}>
            <div style={imgStyle} className={position}>
              {`+ ${item.textLabel}`}
            </div>
          </div>
        )
      })}
      <div className="box"></div>
    </div>
  )
}
