import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step1_url" varchar;
    ALTER TABLE "pages_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step2_url" varchar;
    ALTER TABLE "pages_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step3_url" varchar;

    ALTER TABLE "_pages_v_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step1_url" varchar;
    ALTER TABLE "_pages_v_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step2_url" varchar;
    ALTER TABLE "_pages_v_blocks_order_step_nav" ADD COLUMN IF NOT EXISTS "step3_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN IF EXISTS "step1_url";
    ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN IF EXISTS "step2_url";
    ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN IF EXISTS "step3_url";

    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN IF EXISTS "step1_url";
    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN IF EXISTS "step2_url";
    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN IF EXISTS "step3_url";
  `)
}
