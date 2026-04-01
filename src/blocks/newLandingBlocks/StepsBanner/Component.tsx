import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { StepsBannerBlock } from '@/payload-types'

type MediaValue = {
  url?: string | null
  alt?: string | null
}

type Props = StepsBannerBlock & {
  className?: string
}

function isMediaObject(value: unknown): value is MediaValue {
  return typeof value === 'object' && value !== null
}

export const StepsBannerComponent: React.FC<Props> = ({
  title,
  subtitle,
  arrowIcon,
  steps,
  className,
}) => {
  if (!steps?.length) return null

  const arrow = isMediaObject(arrowIcon) ? arrowIcon : null
  const desktopIconSize = 64
  const mobileIconSize = 48

  return (
    <section className={className ?? 'my-12'}>
      <div className="container">
        <div className="bg-transparent">
          <div className="mx-auto mb-8 max-w-[760px] text-center md:mb-12">
            {title ? (
              <div className="steps-banner-title [&_h1]:m-0 [&_h1]:font-['Instrument_Sans'] [&_h1]:text-[32px] [&_h1]:font-medium [&_h1]:leading-[42px] [&_h1]:tracking-[-0.03em] [&_h2]:m-0 [&_h2]:font-['Instrument_Sans'] [&_h2]:text-[32px] [&_h2]:font-medium [&_h2]:leading-[42px] [&_h2]:tracking-[-0.03em] [&_p]:m-0 [&_p]:font-['Instrument_Sans'] [&_p]:text-[32px] [&_p]:font-medium [&_p]:leading-[42px] [&_p]:tracking-[-0.03em] md:[&_h1]:text-[48px] md:[&_h1]:leading-[56px] md:[&_h1]:tracking-[-0.02em] md:[&_h2]:text-[48px] md:[&_h2]:leading-[56px] md:[&_h2]:tracking-[-0.02em] md:[&_p]:text-[48px] md:[&_p]:leading-[56px] md:[&_p]:tracking-[-0.02em]">
                <RichText data={title} />
              </div>
            ) : null}

            {subtitle ? (
              <p className="mt-2 font-['Inter'] text-[15px] font-normal leading-[24px] tracking-[-0.03em] text-[#303438] md:mt-3 md:text-[16px] md:leading-[22px]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="mx-auto flex max-w-[980px] items-start" style={{ paddingBottom: '48px' }}>
              {steps.map((step, index) => {
                const icon = isMediaObject(step.icon) ? step.icon : null
                const isLast = index === steps.length - 1

                return (
                  <React.Fragment key={step.id ?? index}>
                    {/* Step: fixed icon width, label absolutely centered below */}
                    <div
                      className="relative flex shrink-0 flex-col items-center"
                      style={{ width: `${desktopIconSize}px` }}
                    >
                      <div
                        className="relative"
                        style={{ width: `${desktopIconSize}px`, height: `${desktopIconSize}px` }}
                      >
                        {icon?.url ? (
                          <Image
                            src={icon.url}
                            alt={icon.alt || step.label}
                            fill
                            className="object-contain"
                          />
                        ) : null}
                      </div>
                      {/* Label: absolute so it doesn't affect step width */}
                      <div
                        className="absolute whitespace-nowrap text-center font-['Inter'] text-[24px] font-medium leading-[1] tracking-[-0.03em] text-[#111111]"
                        style={{ top: `${desktopIconSize + 12}px`, left: '50%', transform: 'translateX(-50%)' }}
                      >
                        {index + 1}. {step.label}
                      </div>
                    </div>

                    {/* Connector: fixed height = icon height, touches icon edges */}
                    {!isLast ? (
                      <div
                        className="flex flex-1 items-center"
                        style={{ alignSelf: 'flex-start', height: `${desktopIconSize}px` }}
                      >
                        <div className="h-px flex-1 bg-black" />
                        {arrow?.url ? (
                          <div className="relative mx-2 h-[14px] w-[28px] shrink-0">
                            <Image
                              src={arrow.url}
                              alt={arrow.alt || ''}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <div className="h-px flex-1 bg-black" />
                      </div>
                    ) : null}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="mx-auto flex max-w-[320px] flex-col">
              {steps.map((step, index) => {
                const icon = isMediaObject(step.icon) ? step.icon : null
                const isLast = index === steps.length - 1

                return (
                  <React.Fragment key={step.id ?? index}>
                    {/* Step row: icon + label */}
                    <div className="flex items-center gap-4">
                      <div
                        className="relative shrink-0"
                        style={{ width: `${mobileIconSize}px`, height: `${mobileIconSize}px` }}
                      >
                        {icon?.url ? (
                          <Image
                            src={icon.url}
                            alt={icon.alt || step.label}
                            fill
                            className="object-contain"
                          />
                        ) : null}
                      </div>
                      <div className="font-['Inter'] text-[18px] font-medium leading-[1] tracking-[-0.03em] text-[#111111]">
                        {index + 1}.&nbsp;&nbsp;{step.label}
                      </div>
                    </div>

                    {/* Vertical connector centered under icon */}
                    {!isLast ? (
                      <div
                        className="flex flex-col items-center py-2"
                        style={{ marginLeft: `${mobileIconSize / 2 - 1}px`, minHeight: '80px', width: '2px' }}
                      >
                        <div className="w-px flex-1 bg-black" />
                        {arrow?.url ? (
                          <div className="relative my-1 h-[14px] w-[20px] shrink-0 rotate-90">
                            <Image
                              src={arrow.url}
                              alt={arrow.alt || ''}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : null}
                        <div className="w-px flex-1 bg-black" />
                      </div>
                    ) : null}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
