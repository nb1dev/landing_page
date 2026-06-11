import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics" DROP COLUMN "pct";
  ALTER TABLE "pages_blocks_yp_dashboard_views" DROP COLUMN "card_track_pct";
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" DROP COLUMN "pct";
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views" DROP COLUMN "card_track_pct";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics" ADD COLUMN "pct" numeric;
  ALTER TABLE "pages_blocks_yp_dashboard_views" ADD COLUMN "card_track_pct" numeric;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" ADD COLUMN "pct" numeric;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views" ADD COLUMN "card_track_pct" numeric;`)
}
