import { getPayload } from 'payload'
import config from '@payload-config'

try {
  const payload = await getPayload({ config })
  await payload.delete({ collection: 'media', id: 130 })
  console.log('CLEANUP OK: deleted media 130')
} catch (err: any) {
  console.error('CLEANUP FAILED:', err?.message)
}
