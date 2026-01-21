'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getClientSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

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
  const {
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {} as any,
  } = props

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
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()
  const isMobile = useIsMobile()

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
    <div
      className={`${!isMobile ? 'pr-10 pl-10 pt-5 pb-5' : ''}`}
      style={{ padding: isMobile ? '20px' : '' }}
    >
      <div
        className="flex flex-row"
        style={{
          width: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '20px',
          background: 'white',
        }}
      >
        <div
          className={`flex w-full ${isMobile ? '' : 'p-16'}`}
          style={{ padding: isMobile ? '40px 24px' : undefined }}
        >
          <div className={`${isMobile ? 'w-full' : 'w-1/2 text-center'} mr-auto ml-auto`}>
            <div
              style={{
                fontSize: isMobile ? '38px' : '72px',
                marginBottom: '24px',
                fontFamily: 'Instrument Sans',
                fontWeight: '500',
                lineHeight: isMobile ? '42px' : '74px',
              }}
            >
              <RichText data={props.heading as any} enableGutter={false} enableProse={false} />
            </div>

            <div
              style={{
                fontSize: isMobile ? '20px' : '24px',
                marginBottom: isMobile ? '24px' : '60px',
                color: 'black',
                fontFamily: 'Inter',
                fontWeight: '400',
                lineHeight: isMobile ? '28px' : '24px',
              }}
            >
              {props.description}
            </div>

            {props.enableIntro && props.introContent ? (
              <div className="mb-6" style={{ color: 'black' }}>
                <RichText data={props.introContent as any} enableGutter={false} />
              </div>
            ) : null}

            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="text-center" style={{ color: 'black' }}>
                  <RichText data={confirmationMessage as any} />
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
                    {(formFromProps as any)?.fields?.map((field: any, index: number) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (!Field) return null

                      return (
                        <div className="mb-6 last:mb-0" key={index} style={{ color: 'black' }}>
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
                    style={{
                      borderRadius: '100px',
                      marginTop: '24px',
                      color: 'white',
                      backgroundColor: 'black',
                      height: '60px',
                      fontFamily: 'Instrument Sans',
                      fontWeight: '500',
                      fontSize: isMobile ? '18px' : '20px',
                    }}
                    className="w-full"
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
