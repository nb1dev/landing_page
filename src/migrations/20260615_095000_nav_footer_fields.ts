import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// NOTE: the footers_explore_links / footers_get_started_links table creation
// that used to live here was removed — those tables (without a `_locale`
// column) are created by `20260615_footer_nav_fix`, which already ran in
// production. Recreating/altering them here would conflict with that
// migration (duplicate constraint names, and an index on a `_locale` column
// that table doesn't have).
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "headers" ADD COLUMN IF NOT EXISTS "dark_hero" boolean DEFAULT false;
    ALTER TABLE "headers" ADD COLUMN IF NOT EXISTS "cta_url" varchar;
    ALTER TABLE "headers_locales" ADD COLUMN IF NOT EXISTS "cta_label" varchar;

    ALTER TABLE "footers" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;
    ALTER TABLE "footers_locales" ADD COLUMN IF NOT EXISTS "subnote" varchar;
    ALTER TABLE "footers_locales" ADD COLUMN IF NOT EXISTS "disclaimer" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "headers" DROP COLUMN IF EXISTS "dark_hero";
    ALTER TABLE "headers" DROP COLUMN IF EXISTS "cta_url";
    ALTER TABLE "headers_locales" DROP COLUMN IF EXISTS "cta_label";
    ALTER TABLE "footers" DROP COLUMN IF EXISTS "instagram_url";
    ALTER TABLE "footers_locales" DROP COLUMN IF EXISTS "subnote";
    ALTER TABLE "footers_locales" DROP COLUMN IF EXISTS "disclaimer";
  `)
}
