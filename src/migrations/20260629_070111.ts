import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_hero_locales" ADD COLUMN "secondary_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_hero_locales" ADD COLUMN "secondary_link_url" varchar;
  ALTER TABLE "pages_blocks_yp_hero" DROP COLUMN "secondary_link_url";
  ALTER TABLE "_pages_v_blocks_yp_hero" DROP COLUMN "secondary_link_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_hero" ADD COLUMN "secondary_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_hero" ADD COLUMN "secondary_link_url" varchar;
  ALTER TABLE "pages_blocks_yp_hero_locales" DROP COLUMN "secondary_link_url";
  ALTER TABLE "_pages_v_blocks_yp_hero_locales" DROP COLUMN "secondary_link_url";`)
}
