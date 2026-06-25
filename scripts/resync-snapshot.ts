import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

/**
 * One-off: regenerate the drizzle snapshot baseline from the CURRENT config so
 * `migrate:create` diffs against reality again (hand-written migrations left it stale).
 */
try {
  const payload = await getPayload({ config })
  const adapter = payload.db as any
  const { generateDrizzleJson } = adapter.requireDrizzleKit()
  const json = await generateDrizzleJson(adapter.schema)
  const file = path.resolve(process.cwd(), 'src/migrations/20260610_120000_resync_baseline.json')
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
  console.log('OK wrote baseline snapshot:', file)
} catch (err) {
  console.error('RESYNC ERROR:', err)
  fs.writeFileSync('/tmp/resync-err.txt', String((err as Error)?.stack || err))
}
