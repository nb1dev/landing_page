import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_closed" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_open" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_price" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_price" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_price_period" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_cta_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_cta_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_closed" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_open" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_price" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_price" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_price_period" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_cta_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_cta_label" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_closed" SET DEFAULT 'Compare side by side';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_open" SET DEFAULT 'Hide full comparison';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_label" SET DEFAULT 'Core';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_price" SET DEFAULT '€99';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_label" SET DEFAULT 'Advanced';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_price" SET DEFAULT '€149';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_price_period" SET DEFAULT '/mo';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_cta_label" SET DEFAULT 'Start with Core';
  ALTER TABLE "pages_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_cta_label" SET DEFAULT 'Start with Advanced';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_closed" SET DEFAULT 'Compare side by side';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_toggle_label_open" SET DEFAULT 'Hide full comparison';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_label" SET DEFAULT 'Core';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_price" SET DEFAULT '€99';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_label" SET DEFAULT 'Advanced';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_price" SET DEFAULT '€149';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_price_period" SET DEFAULT '/mo';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_core_cta_label" SET DEFAULT 'Start with Core';
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ALTER COLUMN "comparison_adv_cta_label" SET DEFAULT 'Start with Advanced';`)
}
