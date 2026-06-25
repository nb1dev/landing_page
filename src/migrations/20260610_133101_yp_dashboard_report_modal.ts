import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard" ADD COLUMN "report_image_id" integer;
  ALTER TABLE "pages_blocks_yp_dashboard_locales" ADD COLUMN "report_modal_title" varchar;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD COLUMN "report_image_id" integer;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_locales" ADD COLUMN "report_modal_title" varchar;
  ALTER TABLE "pages_blocks_yp_dashboard" ADD CONSTRAINT "pages_blocks_yp_dashboard_report_image_id_media_id_fk" FOREIGN KEY ("report_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_report_image_id_media_id_fk" FOREIGN KEY ("report_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_dashboard_report_image_idx" ON "pages_blocks_yp_dashboard" USING btree ("report_image_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_report_image_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("report_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard" DROP CONSTRAINT "pages_blocks_yp_dashboard_report_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_yp_dashboard" DROP CONSTRAINT "_pages_v_blocks_yp_dashboard_report_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_yp_dashboard_report_image_idx";
  DROP INDEX "_pages_v_blocks_yp_dashboard_report_image_idx";
  ALTER TABLE "pages_blocks_yp_dashboard" DROP COLUMN "report_image_id";
  ALTER TABLE "pages_blocks_yp_dashboard_locales" DROP COLUMN "report_modal_title";
  ALTER TABLE "_pages_v_blocks_yp_dashboard" DROP COLUMN "report_image_id";
  ALTER TABLE "_pages_v_blocks_yp_dashboard_locales" DROP COLUMN "report_modal_title";`)
}
