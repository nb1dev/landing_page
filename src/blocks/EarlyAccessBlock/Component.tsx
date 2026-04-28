'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { fields } from '@/blocks/Form/fields'

export type EarlyAccessVariant = {
  variantKey: string
  title?: string | null
  subtitle?: string | null
  headline?: string | null
  buttonText?: string | null
}

export type EarlyAccessBlockType = {
  blockName?: string
  blockType?: 'earlyAccess'
  title: string
  subtitle?: string | null
  headline?: string | null
  buttonText?: string | null
  form: FormType
  variants?: EarlyAccessVariant[] | null
}

export const EarlyAccessBlockComponent: React.FC<EarlyAccessBlockType> = (props) => {
  const { title, subtitle, headline, buttonText, form: formFromProps, variants } = props

  const { id: formID, confirmationType, redirect, submitButtonLabel } = (formFromProps ?? {}) as any

  const [variantKey, setVariantKey] = useState<string>('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('v') ?? ''
    setVariantKey(key)
  }, [])

  const activeVariant = variants?.find((v) => v.variantKey === variantKey) ?? null

  const resolvedTitle = activeVariant?.title || title
  const resolvedSubtitle = activeVariant?.subtitle ?? subtitle
  const resolvedHeadline = activeVariant?.headline ?? headline
  const resolvedButtonText = useMemo(
    () => activeVariant?.buttonText || buttonText || submitButtonLabel || 'Get Early Access',
    [activeVariant, buttonText, submitButtonLabel],
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

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        setIsLoading(true)

        try {
          const req = await fetch(`/cms/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
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

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
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
    <section className="my-12 mx-[1rem] lg:mx-[40px] overflow-hidden rounded-[20px] bg-[#222E3E] px-[2rem] py-[4rem] lg:px-[64px] lg:py-[95px]">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center">
        {resolvedHeadline && (
          <p className="font-['Instrument_Sans'] text-[14px] font-semibold uppercase tracking-[0.12em] text-[#008498]">
            {resolvedHeadline}
          </p>
        )}

        <h2 className="m-0 font-['Instrument_Sans'] text-[40px] font-medium leading-[48px] tracking-[-0.03em] text-white lg:text-[56px] lg:leading-[64px]">
          {resolvedTitle}
        </h2>

        {resolvedSubtitle && (
          <p className="font-['Inter'] text-[18px] font-normal leading-[26px] tracking-[-0.02em] text-[#D9D9D9] lg:text-[20px] lg:leading-[30px]">
            {resolvedSubtitle}
          </p>
        )}

        <FormProvider {...formMethods}>
          {isLoading && !hasSubmitted && (
            <p className="text-white/70">Please wait...</p>
          )}

          {hasSubmitted && (
            <p className="font-['Inter'] text-[18px] font-medium text-[#008498]">
              You&apos;re on the list! We&apos;ll reach out soon.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-400">
              {`${error.status || '500'}: ${error.message}`}
            </p>
          )}

          {!hasSubmitted && (
            <form
              id={`early-access-${String(formID)}`}
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1 space-y-3 [&_input]:border [&_input]:border-[#717171] [&_input]:!bg-transparent [&_input]:text-[#D9D9D9] [&_input]:placeholder:text-[#717171]">
                {(formFromProps as any)?.fields?.map((field: any, index: number) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
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

              <button
                form={`early-access-${String(formID)}`}
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-[#008498] px-6 py-4 font-['Instrument_Sans'] text-[18px] font-medium text-white transition-colors hover:bg-[#006f80] disabled:opacity-60 sm:shrink-0"
              >
                {resolvedButtonText}
              </button>
            </form>
          )}
        </FormProvider>
      </div>
    </section>
  )
}
