import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plan_selector_plans_locales" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_locales" DROP COLUMN "price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plan_selector_plans_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_locales" ADD COLUMN "price" varchar;`)
}
