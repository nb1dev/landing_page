import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "is_checkbox";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "is_checkbox";

  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_sections_rows_cell" AS ENUM('checkbox', 'oneLine', 'twoLine');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_sections_rows_cell" AS ENUM('checkbox', 'oneLine', 'twoLine');

  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "cell" "enum_pages_blocks_yp_plans_comparison_sections_rows_cell" DEFAULT 'checkbox';
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "cell" "enum__pages_v_blocks_yp_plans_comparison_sections_rows_cell" DEFAULT 'checkbox';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "cell";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" DROP COLUMN IF EXISTS "cell";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_plans_comparison_sections_rows_cell";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_plans_comparison_sections_rows_cell";

  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "is_checkbox" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" ADD COLUMN "is_checkbox" boolean DEFAULT true;`)
}
