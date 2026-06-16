import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './firebase'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

const COUNTRY_CODES: Record<string, string> = {
  Germany:     'DE',
  Austria:     'AT',
  Netherlands: 'NL',
  Belgium:     'BE',
  France:      'FR',
  Luxembourg:  'LU',
  Ireland:     'IE',
}

export type CheckoutProfile = {
  firstName: string
  lastName: string
  phone: string
}

export type CheckoutAddress = {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  zip: string
  country: string
}

function generatePassword(): string {
  return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-6).toUpperCase()
}

export async function createAccountAndSave(
  email: string,
  profile: CheckoutProfile,
  address: CheckoutAddress,
): Promise<void> {
  // Create Firebase account with a generated password
  const { user } = await createUserWithEmailAndPassword(auth, email, generatePassword())

  // Send password reset so the user can set their own password via frontend-web's flow
  await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/email-verified`,
  })

  const token = await user.getIdToken()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    accept: 'application/json',
  }

  // Get backend user id
  const meRes = await fetch(`${BACKEND}/users/me`, { headers })
  if (!meRes.ok) throw new Error('Failed to fetch user profile')
  const me = await meRes.json()
  const userId = me.id ?? me._id ?? me.data?.id

  // Update profile with only the fields collected in the form
  await fetch(`${BACKEND}/users/${userId}/`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      first_name: profile.firstName,
      last_name:  profile.lastName,
      phone:      profile.phone,
    }),
  })

  // Save shipping address
  await fetch(`${BACKEND}/shipping-addresses/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      first_name:    address.firstName,
      last_name:     address.lastName,
      email:         address.email,
      phone:         address.phone,
      address_line1: address.addressLine1,
      address_line2: address.addressLine2,
      city:          address.city,
      state:         '',
      postal_code:   address.zip,
      country:       address.country,
      country_code:  COUNTRY_CODES[address.country] ?? '',
      is_default:    true,
    }),
  })
}
