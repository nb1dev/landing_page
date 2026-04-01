import React from 'react'
import Image from 'next/image'
import type { BenefitsBannerBlock } from '@/payload-types'

type Props = BenefitsBannerBlock & {
  className?: string
}

export const BenefitsBannerComponent: React.FC<Props> = ({ items, className }) => {
  if (!items?.length) return null

  return (
    <section className={className ?? 'my-10'}>
      <div className="mx-[1rem] lg:mx-[40px]">
        <div className="grid grid-cols-2 justify-items-center gap-[10px] md:gap-5 md:justify-items-stretch xl:grid-cols-4">
          {items.map((item, index) => {
            const icon = typeof item.icon === 'object' && item.icon !== null ? item.icon : null

            return (
              <div
                key={item.id ?? index}
                className="flex h-[123px] w-[162px] flex-col items-center justify-center gap-[10px] rounded-[20px] bg-[white] py-[16px] text-center md:h-auto md:w-auto md:min-h-[164px] md:gap-5 md:rounded-[24px] md:px-6 md:py-8"
              >
                <h3 className="font-['Inter'] text-[16px] font-medium leading-[1] tracking-[-0.03em] text-[#111111] md:text-[20px] md:leading-[28px]">
                  {item.title}
                </h3>

                {icon?.url ? (
                  <div className="relative h-[60px] w-[60px] md:h-[68px] md:w-[68px]">
                    <Image
                      src={icon.url}
                      alt={icon.alt || item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
