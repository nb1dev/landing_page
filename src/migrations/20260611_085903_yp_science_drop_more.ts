import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_science_board" DROP COLUMN "more_href";
  ALTER TABLE "pages_blocks_yp_science_board_locales" DROP COLUMN "more_label";
  ALTER TABLE "_pages_v_blocks_yp_science_board" DROP COLUMN "more_href";
  ALTER TABLE "_pages_v_blocks_yp_science_board_locales" DROP COLUMN "more_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_science_board" ADD COLUMN "more_href" varchar;
  ALTER TABLE "pages_blocks_yp_science_board_locales" ADD COLUMN "more_label" varchar;
  ALTER TABLE "_pages_v_blocks_yp_science_board" ADD COLUMN "more_href" varchar;
  ALTER TABLE "_pages_v_blocks_yp_science_board_locales" ADD COLUMN "more_label" varchar;`)
}
