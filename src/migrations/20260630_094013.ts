import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "features" jsonb;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" ADD COLUMN "features" jsonb;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" DROP COLUMN "features";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" DROP COLUMN "features";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_plans_comparison_cards" ADD COLUMN "features" jsonb;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" ADD COLUMN "features" jsonb;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "features";
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" DROP COLUMN "features";`)
}
