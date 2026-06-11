import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard" DROP COLUMN "report_url";
  ALTER TABLE "_pages_v_blocks_yp_dashboard" DROP COLUMN "report_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_dashboard" ADD COLUMN "report_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD COLUMN "report_url" varchar;`)
}
