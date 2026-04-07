'use client'

import type { Form as FormType, FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { Media } from '@/payload-types'
import '@/styles/banner-template.css'

import { fields } from '../Form/fields'

export type FormCustomBlockType = {
  blockName?: string
  blockType?: 'form-custom'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  heading: DefaultTypedEditorState
  description: string
  icon: number | Media
}

export const FormCustomBlock: React.FC<{ id?: string } & FormCustomBlockType> = (props) => {
  const { form: formFromProps } = props

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = (formFromProps ?? {}) as Partial<FormType>

  const formMethods = useForm<Record<string, unknown>>({
    defaultValues: {},
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
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
            return
          }

          // Optional behavior: push to login with email
          const emailEntry = dataToSend.find((d) => d.field === 'email')
          const emailValue = emailEntry?.value
          if (typeof emailValue === 'string' && emailValue) {
            router.push(`/login?email=${encodeURIComponent(emailValue)}`)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const submitLabel = useMemo(() => submitButtonLabel || 'Submit', [submitButtonLabel])

  return (
    <div className="banner-wrapper">
      <div className="form-wrapper">
        <div className="form-content">
          <div className="form-col">
            <div className="form-heading">
              <RichText data={props.heading} enableGutter={false} enableProse={false} />
            </div>

            <div className="form-description">{props.description}</div>

            {props.enableIntro && props.introContent ? (
              <div className="mb-6" style={{ color: 'black' }}>
                <RichText data={props.introContent} enableGutter={false} />
              </div>
            ) : null}

            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="text-center" style={{ color: 'black' }}>
                  <RichText data={confirmationMessage} />
                </div>
              )}

              {isLoading && !hasSubmitted && (
                <p style={{ color: 'black' }} className="mb-3">
                  Please wait...
                </p>
              )}

              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}

              {!hasSubmitted && (
                <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 last:mb-0">
                    {formFromProps?.fields?.map((field: FormFieldBlock, index: number) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (!Field) return null

                      return (
                        <div className="form-field" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    form={String(formID)}
                    type="submit"
                    variant="default"
                    className="form-submit"
                  >
                    {submitLabel}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
