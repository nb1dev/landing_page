import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_legal_strip_links" ALTER COLUMN "url" DROP NOT NULL;
    ALTER TABLE "_pages_v_blocks_legal_strip_links" ALTER COLUMN "url" DROP NOT NULL;
    ALTER TABLE "pages_blocks_legal_strip_links_locales" ALTER COLUMN "label" DROP NOT NULL;
    ALTER TABLE "_pages_v_blocks_legal_strip_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_legal_strip_links" ALTER COLUMN "url" SET NOT NULL;
    ALTER TABLE "_pages_v_blocks_legal_strip_links" ALTER COLUMN "url" SET NOT NULL;
    ALTER TABLE "pages_blocks_legal_strip_links_locales" ALTER COLUMN "label" SET NOT NULL;
    ALTER TABLE "_pages_v_blocks_legal_strip_links_locales" ALTER COLUMN "label" SET NOT NULL;
  `)
}
