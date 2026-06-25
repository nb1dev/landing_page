import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hide_header" boolean DEFAULT false;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hide_footer" boolean DEFAULT false;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hide_header" boolean DEFAULT false;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hide_footer" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hide_header";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hide_footer";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hide_header";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hide_footer";
  `)
}
