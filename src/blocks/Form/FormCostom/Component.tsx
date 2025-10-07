'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from '../fields'
import { getClientSideURL } from '@/utilities/getURL'
import { Media } from '@/payload-types'
import { useIsMobile } from '@/hooks/useIsMobile'

export type FormCustomBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  heading: DefaultTypedEditorState
  description: string
  icon: number | Media
}

export const FormCustomBlock: React.FC<
  {
    id?: string
  } & FormCustomBlockType
> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const isMobile = useIsMobile()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
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
        style={{
          paddingRight: isMobile ? '24px' : '',
          paddingLeft: isMobile ? '24px' : '',
          paddingTop: isMobile ? '32px' : '',
          paddingBottom: isMobile ? '32px' : '',
        }}
      >
        <div className={`${isMobile ? 'w-full' : 'w-1/2 text-center'} mr-auto ml-auto `}>
          <div
            style={{
              fontSize: isMobile ? '38px' : '72px',
              marginBottom: '24px',
              fontFamily: 'Instrument Sans',
              fontWeight: '500',
            }}
          >
            <RichText data={props.heading} />
          </div>
          <div
            style={{
              fontSize: isMobile ? '20px' : '24px',
              marginBottom: isMobile ? '24px' : '60px',
              color: 'black',
              fontFamily: 'Inter',
              fontWeight: '400',
            }}
          >
            {props.description}
          </div>
          <div>
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="text-center" style={{ color: 'black' }}>
                  <RichText data={confirmationMessage} />
                </div>
              )}

              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 last:mb-0">
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]
                        if (Field) {
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
                        }
                        return null
                      })}
                  </div>

                  <Button
                    form={formID}
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
                    {submitButtonLabel}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
      {/* <div className="flex w-1/2">
        <img
          style={{ width: '100%' }}
          src={typeof props.icon === 'object' ? getMediaUrl(props.icon.url).toString() : undefined}
          alt="icon"
        />
      </div> */}
    </div>
  )
}
