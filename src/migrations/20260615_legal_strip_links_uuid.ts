import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_legal_strip_links" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
    ALTER TABLE "_pages_v_blocks_legal_strip_links" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_legal_strip_links" DROP COLUMN IF EXISTS "_uuid";
    ALTER TABLE "_pages_v_blocks_legal_strip_links" DROP COLUMN IF EXISTS "_uuid";
  `)
}
