import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_buy_box_options_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_buy_box_options_plan_family" AS ENUM('core', 'advanced');
  ALTER TABLE "pages_blocks_yp_buy_box_options" ADD COLUMN "plan_family" "enum_pages_blocks_yp_buy_box_options_plan_family";
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options" ADD COLUMN "plan_family" "enum__pages_v_blocks_yp_buy_box_options_plan_family";
  ALTER TABLE "pages_blocks_yp_buy_box_options_locales" DROP COLUMN "price";
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options_locales" DROP COLUMN "price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_buy_box_options_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options_locales" ADD COLUMN "price" varchar;
  ALTER TABLE "pages_blocks_yp_buy_box_options" DROP COLUMN "plan_family";
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options" DROP COLUMN "plan_family";
  DROP TYPE "public"."enum_pages_blocks_yp_buy_box_options_plan_family";
  DROP TYPE "public"."enum__pages_v_blocks_yp_buy_box_options_plan_family";`)
}
