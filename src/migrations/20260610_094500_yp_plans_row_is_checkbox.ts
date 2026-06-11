import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "is_checkbox" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "is_checkbox" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "is_checkbox";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "is_checkbox";`)
}
