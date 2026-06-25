import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_plan_summary_card_cycle_month" AS ENUM('4', '8', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_summary_card_cycle_month" AS ENUM('4', '8', '12');
  ALTER TABLE "pages_blocks_plan_summary_card" ADD COLUMN "cycle_month" "enum_pages_blocks_plan_summary_card_cycle_month" DEFAULT '4';
  ALTER TABLE "_pages_v_blocks_plan_summary_card" ADD COLUMN "cycle_month" "enum__pages_v_blocks_plan_summary_card_cycle_month" DEFAULT '4';
  ALTER TABLE "pages_blocks_plan_summary_card_locales" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_plan_summary_card_locales" DROP COLUMN "primary_cta_price";
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" DROP COLUMN "primary_cta_price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plan_summary_card_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_plan_summary_card_locales" ADD COLUMN "primary_cta_price" varchar;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" ADD COLUMN "primary_cta_price" varchar;
  ALTER TABLE "pages_blocks_plan_summary_card" DROP COLUMN "cycle_month";
  ALTER TABLE "_pages_v_blocks_plan_summary_card" DROP COLUMN "cycle_month";
  DROP TYPE "public"."enum_pages_blocks_plan_summary_card_cycle_month";
  DROP TYPE "public"."enum__pages_v_blocks_plan_summary_card_cycle_month";`)
}
