import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section_locales" ADD COLUMN "compare_rows_json" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section_locales" ADD COLUMN "compare_rows_json" varchar;
  ALTER TABLE "pages_blocks_plans_section" DROP COLUMN "compare_rows_json";
  ALTER TABLE "_pages_v_blocks_plans_section" DROP COLUMN "compare_rows_json";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section" ADD COLUMN "compare_rows_json" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD COLUMN "compare_rows_json" varchar;
  ALTER TABLE "pages_blocks_plans_section_locales" DROP COLUMN "compare_rows_json";
  ALTER TABLE "_pages_v_blocks_plans_section_locales" DROP COLUMN "compare_rows_json";`)
}
