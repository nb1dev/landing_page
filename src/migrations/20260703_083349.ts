import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_order_step_nav_locales" ADD COLUMN "back_url" varchar;
  ALTER TABLE "_pages_v_blocks_order_step_nav_locales" ADD COLUMN "back_url" varchar;
  ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN "back_url";
  ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN "back_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_order_step_nav" ADD COLUMN "back_url" varchar;
  ALTER TABLE "_pages_v_blocks_order_step_nav" ADD COLUMN "back_url" varchar;
  ALTER TABLE "pages_blocks_order_step_nav_locales" DROP COLUMN "back_url";
  ALTER TABLE "_pages_v_blocks_order_step_nav_locales" DROP COLUMN "back_url";`)
}
