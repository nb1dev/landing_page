'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { fields as formFields } from '@/blocks/Form/fields'

type BgPreset = 'white' | 'creamGradient' | 'custom'

function resolveBg(preset?: BgPreset | null, custom?: string | null): string {
  if (preset === 'creamGradient') return 'linear-gradient(180deg,#FAF8F2 0%,#F0EDE2 100%)'
  if (preset === 'custom') return custom || '#FFFFFF'
  return '#FFFFFF'
}

export type ReserveCtaVariant = {
  variantKey?: string | null
  backgroundColor?: BgPreset | null
  backgroundColorCustom?: string | null
  pillText?: string | null
  heading?: DefaultTypedEditorState | null
  subText?: string | null
  ctaButtonText?: string | null
}

export type ReserveCtaBlockType = {
  blockType?: 'reserveCta'
  backgroundColor?: BgPreset | null
  backgroundColorCustom?: string | null
  pillText?: string | null
  heading?: DefaultTypedEditorState | null
  subText?: string | null
  form?: FormType | null
  ctaButtonText?: string | null
  footNoteText?: string | null
  footNoteHighlight?: string | null
  successMessage?: string | null
  recapItems?: Array<{ label?: string | null }> | null
  variants?: ReserveCtaVariant[] | null
}

export const ReserveCtaComponent: React.FC<ReserveCtaBlockType> = (props) => {
  const { form: formFromProps, recapItems, variants } = props

  const { id: formID, confirmationType, redirect, submitButtonLabel } = (formFromProps ?? {}) as any

  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [variantKey, setVariantKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v')
    setVariantKey(v ?? '')
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activeVariant = variants?.find((v) => v.variantKey === variantKey) ?? null

  const backgroundColor = activeVariant?.backgroundColor ?? props.backgroundColor
  const backgroundColorCustom = activeVariant?.backgroundColorCustom ?? props.backgroundColorCustom
  const pillText = activeVariant?.pillText ?? props.pillText
  const heading = activeVariant?.heading ?? props.heading
  const subText = activeVariant?.subText ?? props.subText
  const ctaButtonText = activeVariant?.ctaButtonText ?? props.ctaButtonText
  const footNoteText = props.footNoteText
  const footNoteHighlight = props.footNoteHighlight
  const successMessage = props.successMessage

  const isDark = backgroundColor === 'creamGradient'
  const sectionBg = resolveBg(backgroundColor, backgroundColorCustom)

  const resolvedButtonText = useMemo(
    () => ctaButtonText || submitButtonLabel || 'Reserve my kit →',
    [ctaButtonText, submitButtonLabel],
  )

  const formMethods = useForm({
    defaultValues: (formFromProps as any)?.fields || {},
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        setError(undefined)
        const dataToSend = Object.entries(data).map(([name, value]) => ({ field: name, value }))
        setIsLoading(true)
        try {
          const req = await fetch('/cms/api/form-submissions', {
            body: JSON.stringify({ form: formID, submissionData: dataToSend }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })
          const res = await req.json()
          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res?.errors?.[0]?.message || 'Internal Server Error',
              status: String(res?.status || req.status),
            })
            return
          }
          setIsLoading(false)
          setHasSubmitted(true)
          if (confirmationType === 'redirect' && redirect?.url) router.push(redirect.url)
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }
      void submitForm()
    },
    [formID, confirmationType, redirect, router],
  )

  return (
    <section ref={sectionRef} style={{ background: sectionBg }} className="rc-section">
      <style jsx>{`
        @keyframes rcPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }

        .rc-section {
          padding: 3rem 1.5rem 4rem;
          position: relative;
          overflow: hidden;
        }

        .rc-rev {
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 0.9s ease,
            transform 0.9s ease;
        }
        .rc-rev.in {
          opacity: 1;
          transform: translateY(0);
        }
        .rc-d1 {
          transition-delay: 0.1s;
        }
        .rc-d2 {
          transition-delay: 0.2s;
        }
        .rc-d3 {
          transition-delay: 0.3s;
        }

        .rc-inner {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }

        .rc-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #008498;
          background: rgba(10, 143, 176, 0.08);
          border: 1px solid rgba(10, 143, 176, 0.28);
          border-radius: 100px;
          padding: 0.45rem 1.1rem;
          margin-bottom: 1.75rem;
        }

        .rc-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #008498;
          animation: rcPulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }

        .rc-h-wrap :global(h1),
        .rc-h-wrap :global(h2),
        .rc-h-wrap :global(h3),
        .rc-h-wrap :global(p) {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1.85rem, 3.3vw, 2.7rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #12314d;
          margin-bottom: 0.85rem;
          margin-top: 0;
        }
        .rc-h-wrap :global(.ac) {
          font-style: italic;
          color: #008498;
        }

        .rc-sub {
          font-size: 1.05rem;
          font-weight: 300;
          color: rgba(18, 49, 77, 0.65);
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 2.75rem;
        }

        .rc-sub.rc-dark-text,
        .rc-recap-cell.rc-dark-text {
          color: rgba(18, 49, 77, 0.78);
        }

        /* Form wrap */
        .rc-form-wrap {
          max-width: 520px;
          margin: 0 auto;
          background: transparent;
          padding: 0;
          position: relative;
        }

        .rc-form-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(10, 143, 176, 0.28) 50%,
            transparent 100%
          );
          border-radius: 18px 18px 0 0;
          z-index: 1;
        }

        /* Light version: teal gradient card wrapper */
        .rc-form-wrap.rc-card {
          background: linear-gradient(180deg, #e2f0f2 0%, #eaf3f4 100%);
          border-radius: 18px;
          padding: 1.5rem;
        }

        .rc-form-row {
          display: flex;
          gap: 0.5rem;
          background: #ffffff;
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          border: 1px solid rgba(18, 49, 77, 0.1);
          border-radius: 12px;
          padding: 6px;
          transition:
            border-color 0.25s,
            background 0.25s,
            box-shadow 0.25s;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.7) inset,
            0 12px 30px -10px rgba(18, 49, 77, 0.15);
        }

        .rc-form-row.rc-row-dark {
          background: #ffffff !important;
          border: 1px solid rgba(18, 49, 77, 0.15) !important;
          box-shadow:
            0 1px 2px rgba(18, 49, 77, 0.04),
            0 8px 24px rgba(18, 49, 77, 0.06);
        }

        .rc-form-row:focus-within {
          border-color: rgba(10, 143, 176, 0.5);
          background: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.7) inset,
            0 12px 30px -10px rgba(18, 49, 77, 0.18),
            0 0 0 4px rgba(10, 143, 176, 0.12);
        }

        .rc-form-fields {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .rc-form-fields :global(input) {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          color: #12314d;
          padding: 11px 14px;
          font-weight: 400;
          width: 100%;
        }
        .rc-form-fields :global(input::placeholder) {
          color: rgba(18, 49, 77, 0.4);
        }

        .rc-form-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-family: inherit;
          font-size: 0.86rem;
          font-weight: 600;
          background: linear-gradient(180deg, #11a2c5 0%, #0a8fb0 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 11px 22px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.18) inset,
            0 6px 18px rgba(10, 143, 176, 0.35);
          transition:
            background 0.2s,
            transform 0.15s;
          flex-shrink: 0;
          align-self: stretch;
        }
        .rc-form-btn:hover {
          background: linear-gradient(180deg, #13aece 0%, #0d99bd 100%);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.22) inset,
            0 8px 22px rgba(10, 143, 176, 0.45);
          transform: translateY(-1px);
        }
        .rc-form-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .rc-form-foot {
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(18, 49, 77, 0.65);
          margin-top: 0.95rem;
          line-height: 1.55;
          text-align: center;
        }
        .rc-form-foot :global(.ac) {
          font-weight: 500;
          color: #008498;
          font-style: normal;
        }
        .rc-form-foot :global(p) {
          margin: 0;
        }

        .rc-form-success {
          background: rgba(10, 143, 176, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(10, 143, 176, 0.28);
          border-radius: 12px;
          padding: 18px 20px;
          font-size: 0.9rem;
          color: #12314d;
          line-height: 1.55;
          text-align: left;
        }
        .rc-form-success strong {
          color: #008498;
          font-weight: 600;
        }

        .rc-form-error {
          font-size: 0.82rem;
          color: #c0392b;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .rc-recap {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
          margin: 2.5rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid rgba(18, 49, 77, 0.06);
          max-width: 880px;
        }

        .rc-recap-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(18, 49, 77, 0.65);
          letter-spacing: 0.005em;
        }

        .rr-tick {
          color: #008498;
          font-weight: 700;
          font-size: 0.85rem;
        }

        @media (max-width: 880px) {
          .rc-section {
            padding: 1.5rem 1rem 3rem !important;
          }
          .rc-form-row {
            flex-direction: column;
          }
          .rc-form-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 680px) {
          .rc-recap {
            gap: 0.75rem 1.5rem;
          }
          .rc-recap-cell {
            font-size: 0.78rem;
          }
        }
      `}</style>

      <div className="rc-inner">
        {pillText && (
          <div className={['rc-pill rc-rev', revealed ? 'in' : ''].join(' ')}>
            <div className="rc-pill-dot" />
            {pillText}
          </div>
        )}

        {heading && (
          <div className={['rc-h-wrap rc-rev rc-d1', revealed ? 'in' : ''].join(' ')}>
            <RichText data={heading as any} enableGutter={false} enableProse={false} />
          </div>
        )}

        {subText && (
          <p
            className={['rc-sub rc-rev rc-d2', revealed ? 'in' : '', isDark ? 'rc-dark-text' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {subText}
          </p>
        )}

        <div
          className={['rc-form-wrap rc-rev rc-d3', revealed ? 'in' : '', isDark ? '' : 'rc-card']
            .filter(Boolean)
            .join(' ')}
        >
          {error && <p className="rc-form-error">{`${error.status || '500'}: ${error.message}`}</p>}

          {hasSubmitted ? (
            <div className="rc-form-success">
              <strong>{"You're on the list. "}</strong>
              {successMessage || 'Your kit ships two weeks before public launch.'}
            </div>
          ) : (
            <FormProvider {...formMethods}>
              <form id={`reserve-cta-${String(formID)}`} onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={['rc-form-row', isDark ? 'rc-row-dark' : ''].filter(Boolean).join(' ')}
                >
                  <div className="rc-form-fields">
                    {(formFromProps as any)?.fields?.map((field: any, index: number) => {
                      const Field: React.FC<any> =
                        formFields?.[field.blockType as keyof typeof formFields]
                      if (!Field) return null
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    })}
                  </div>

                  <button type="submit" disabled={isLoading} className="rc-form-btn">
                    {isLoading ? 'Please wait…' : resolvedButtonText}
                  </button>
                </div>

                {(footNoteText || footNoteHighlight) && (
                  <p className="rc-form-foot">
                    {footNoteText}
                    {footNoteText && footNoteHighlight && ' · '}
                    {footNoteHighlight && <span className="ac">{footNoteHighlight}</span>}
                  </p>
                )}
              </form>
            </FormProvider>
          )}
        </div>
      </div>

      {recapItems && recapItems.length > 0 && (
        <div className="rc-recap">
          {recapItems.map((item, i) => (
            <div
              key={i}
              className={['rc-recap-cell', isDark ? 'rc-dark-text' : ''].filter(Boolean).join(' ')}
            >
              <span className="rr-tick">✓</span>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
