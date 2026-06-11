import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_components_components_lead_chips_locales" DROP COLUMN IF EXISTS "rest";
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" DROP COLUMN IF EXISTS "rest";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_components_components_lead_chips_locales" ADD COLUMN "rest" varchar;
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" ADD COLUMN "rest" varchar;`)
}
