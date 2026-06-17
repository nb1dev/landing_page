import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_plans_plan_cards_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_cards_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_plan_cards_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_cards_plan_family" AS ENUM('core', 'advanced');
  ALTER TABLE "pages_blocks_yp_plans_plan_cards" ADD COLUMN "plan_family" "enum_pages_blocks_yp_plans_plan_cards_plan_family";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" ADD COLUMN "plan_family" "enum_pages_blocks_yp_plans_comparison_cards_plan_family";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" ADD COLUMN "plan_family" "enum__pages_v_blocks_yp_plans_plan_cards_plan_family";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" ADD COLUMN "plan_family" "enum__pages_v_blocks_yp_plans_comparison_cards_plan_family";
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" DROP COLUMN "price_period";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "price_period";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" DROP COLUMN "price_period";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "price_period";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" ADD COLUMN "price_period" varchar DEFAULT '/mo';
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "price_period" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" ADD COLUMN "price_period" varchar DEFAULT '/mo';
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "price_period" varchar;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards" DROP COLUMN "plan_family";
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" DROP COLUMN "plan_family";
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" DROP COLUMN "plan_family";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" DROP COLUMN "plan_family";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_plan_cards_plan_family";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_cards_plan_family";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_plan_cards_plan_family";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_cards_plan_family";`)
}
