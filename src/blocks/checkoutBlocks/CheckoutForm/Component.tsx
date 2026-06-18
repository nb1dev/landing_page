import React from 'react'
import { CheckoutFormClient } from './Component.client'

type Props = { backHref?: string | null; locale?: string }

export const CheckoutFormComponent: React.FC<Props> = (props) => {
  return <CheckoutFormClient backHref={props.backHref} locale={props.locale} />
}
