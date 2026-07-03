import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section_locales" ADD COLUMN "core_cta_href" varchar;
  ALTER TABLE "pages_blocks_plans_section_locales" ADD COLUMN "adv_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section_locales" ADD COLUMN "core_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section_locales" ADD COLUMN "adv_cta_href" varchar;
  ALTER TABLE "pages_blocks_plans_section" DROP COLUMN "core_cta_href";
  ALTER TABLE "pages_blocks_plans_section" DROP COLUMN "adv_cta_href";
  ALTER TABLE "_pages_v_blocks_plans_section" DROP COLUMN "core_cta_href";
  ALTER TABLE "_pages_v_blocks_plans_section" DROP COLUMN "adv_cta_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plans_section" ADD COLUMN "core_cta_href" varchar;
  ALTER TABLE "pages_blocks_plans_section" ADD COLUMN "adv_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD COLUMN "core_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD COLUMN "adv_cta_href" varchar;
  ALTER TABLE "pages_blocks_plans_section_locales" DROP COLUMN "core_cta_href";
  ALTER TABLE "pages_blocks_plans_section_locales" DROP COLUMN "adv_cta_href";
  ALTER TABLE "_pages_v_blocks_plans_section_locales" DROP COLUMN "core_cta_href";
  ALTER TABLE "_pages_v_blocks_plans_section_locales" DROP COLUMN "adv_cta_href";`)
}
