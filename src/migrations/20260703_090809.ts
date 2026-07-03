import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "pages_blocks_plan_selector_plans_locales" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_locales" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards" DROP COLUMN "cta_url";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" DROP COLUMN "cta_url";
  ALTER TABLE "pages_blocks_plan_selector_plans" DROP COLUMN "cta_href";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" DROP COLUMN "cta_url";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" DROP COLUMN "cta_url";
  ALTER TABLE "_pages_v_blocks_plan_selector_plans" DROP COLUMN "cta_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_plan_cards" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "pages_blocks_plan_selector_plans" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" DROP COLUMN "cta_url";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "cta_url";
  ALTER TABLE "pages_blocks_plan_selector_plans_locales" DROP COLUMN "cta_href";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" DROP COLUMN "cta_url";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "cta_url";
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_locales" DROP COLUMN "cta_href";`)
}
