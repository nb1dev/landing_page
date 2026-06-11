import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_science_board_members_locales" DROP COLUMN "modal_title";
  ALTER TABLE "_pages_v_blocks_yp_science_board_members_locales" DROP COLUMN "modal_title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_yp_science_board_members_locales" ADD COLUMN "modal_title" varchar;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members_locales" ADD COLUMN "modal_title" varchar;`)
}
