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
import { Footer } from './Footer/config'
import { Header } from './Header/config'
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

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
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
      ssl: { rejectUnauthorized: false },
      max: 10, // Maximum number of connections in the pool
      min: 2, // Minimum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 10000, // Timeout after 10 seconds if can't connect
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, Products, Authors],
  cors: [getServerSideURL()].filter(Boolean),

  // ✅ UPDATED
  globals: [Header, Footer, Navigation, SiteSettings, FAQ],

  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
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
