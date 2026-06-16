import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footers } from './Footer/config'
import { Headers } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { Products } from './collections/Products'
import { Authors } from './collections/Authors'
import { FAQ } from './globals/FAQ'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// `next build` prerenders pages in several parallel worker processes, each of
// which imports this config and opens its OWN Postgres pool. A large per-pool
// max × worker count can exhaust the DB connection limit ("sorry, too many
// clients already"). So use a small pool during the build phase; the long-lived
// runtime server (single PM2 fork process) gets the full pool.
const isNextBuild = process.env.NEXT_PHASE === 'phase-production-build'
const pgPoolDefault = isNextBuild ? 2 : 10
const pgPoolEnv = isNextBuild ? process.env.PG_POOL_MAX_BUILD : process.env.PG_POOL_MAX
const pgPoolParsed = Number(pgPoolEnv ?? pgPoolDefault)
const pgPoolMax = Number.isFinite(pgPoolParsed) && pgPoolParsed > 0 ? pgPoolParsed : pgPoolDefault

export default buildConfig({
  // Canonical absolute URL for this deployment. Without it Payload falls back to
  // an empty serverURL and logs "Failed to create URL object from URL: , falling
  // back to http://localhost" on server-side requests that lack an origin header.
  serverURL: getServerSideURL(),
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'app', 'cms', '(payload)', 'admin', 'importMap.js'),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
      max: pgPoolMax,
      min: 0,
      idleTimeoutMillis: isNextBuild ? 1000 : 30000,
      connectionTimeoutMillis: 30000,
      options: '-c statement_timeout=0',
    },
    push: false,
  }),
  collections: [Pages, Posts, Media, Categories, Users, Products, Authors, Headers, Footers],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Navigation, SiteSettings, FAQ],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  // File upload (express-fileupload) options. Raise the size ceiling so larger
  // media (e.g. video) uploads aren't rejected. The actual upload fix is the
  // middleware matcher excluding `/cms` (see src/middleware.ts) — without that
  // Next.js capped the request body at 10MB. NOTE: do NOT enable `useTempFiles`
  // here — in this setup it persists 0-byte files to the static dir.
  upload: {
    limits: {
      fileSize: 512 * 1024 * 1024, // 512 MB
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  localization: {
    locales: [
      { code: 'en', label: 'English (EU)' },
      { code: 'de', label: 'German' },
      { code: 'fr', label: 'French' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
  },
})
