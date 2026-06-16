import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_order_step_nav"
      ADD COLUMN IF NOT EXISTS "logo_id" integer REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "pages_blocks_order_step_nav"
      ADD COLUMN IF NOT EXISTS "logo_url" varchar;

    ALTER TABLE "_pages_v_blocks_order_step_nav"
      ADD COLUMN IF NOT EXISTS "logo_id" integer REFERENCES "public"."media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_pages_v_blocks_order_step_nav"
      ADD COLUMN IF NOT EXISTS "logo_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN IF EXISTS "logo_id";
    ALTER TABLE "pages_blocks_order_step_nav" DROP COLUMN IF EXISTS "logo_url";
    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN IF EXISTS "logo_id";
    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP COLUMN IF EXISTS "logo_url";
  `)
}
