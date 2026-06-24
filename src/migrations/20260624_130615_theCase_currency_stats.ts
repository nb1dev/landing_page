import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_the_case_stats" ADD COLUMN "use_currency" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_the_case_stats" ADD COLUMN "stat_e_u_r" varchar;
  ALTER TABLE "pages_blocks_the_case_stats" ADD COLUMN "stat_g_b_p" varchar;
  ALTER TABLE "pages_blocks_the_case_stats" ADD COLUMN "stat_a_e_d" varchar;
  ALTER TABLE "pages_blocks_the_case_stats" ADD COLUMN "stat_c_h_f" varchar;
  ALTER TABLE "_pages_v_blocks_the_case_stats" ADD COLUMN "use_currency" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_the_case_stats" ADD COLUMN "stat_e_u_r" varchar;
  ALTER TABLE "_pages_v_blocks_the_case_stats" ADD COLUMN "stat_g_b_p" varchar;
  ALTER TABLE "_pages_v_blocks_the_case_stats" ADD COLUMN "stat_a_e_d" varchar;
  ALTER TABLE "_pages_v_blocks_the_case_stats" ADD COLUMN "stat_c_h_f" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_the_case_stats" DROP COLUMN "use_currency";
  ALTER TABLE "pages_blocks_the_case_stats" DROP COLUMN "stat_e_u_r";
  ALTER TABLE "pages_blocks_the_case_stats" DROP COLUMN "stat_g_b_p";
  ALTER TABLE "pages_blocks_the_case_stats" DROP COLUMN "stat_a_e_d";
  ALTER TABLE "pages_blocks_the_case_stats" DROP COLUMN "stat_c_h_f";
  ALTER TABLE "_pages_v_blocks_the_case_stats" DROP COLUMN "use_currency";
  ALTER TABLE "_pages_v_blocks_the_case_stats" DROP COLUMN "stat_e_u_r";
  ALTER TABLE "_pages_v_blocks_the_case_stats" DROP COLUMN "stat_g_b_p";
  ALTER TABLE "_pages_v_blocks_the_case_stats" DROP COLUMN "stat_a_e_d";
  ALTER TABLE "_pages_v_blocks_the_case_stats" DROP COLUMN "stat_c_h_f";`)
}
