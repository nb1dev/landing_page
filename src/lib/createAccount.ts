import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from './firebase'

function generatePassword(): string {
  return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-6).toUpperCase()
}

export async function createFirebaseAccount(email: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, generatePassword())
  await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/email-verified`,
  })
}
