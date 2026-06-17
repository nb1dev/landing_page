import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section" DROP COLUMN "core_price";
  ALTER TABLE "pages_blocks_plans_section" DROP COLUMN "adv_price";
  ALTER TABLE "_pages_v_blocks_plans_section" DROP COLUMN "core_price";
  ALTER TABLE "_pages_v_blocks_plans_section" DROP COLUMN "adv_price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section" ADD COLUMN "core_price" varchar;
  ALTER TABLE "pages_blocks_plans_section" ADD COLUMN "adv_price" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD COLUMN "core_price" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD COLUMN "adv_price" varchar;`)
}
