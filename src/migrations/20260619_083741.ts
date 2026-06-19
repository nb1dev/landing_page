import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero_locales" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_homepage_hero_locales" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_homepage_hero" DROP COLUMN "cta_href";
  ALTER TABLE "_pages_v_blocks_homepage_hero" DROP COLUMN "cta_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_homepage_hero_locales" DROP COLUMN "cta_href";
  ALTER TABLE "_pages_v_blocks_homepage_hero_locales" DROP COLUMN "cta_href";`)
}
