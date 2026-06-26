import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_doc_sections_locales" ADD COLUMN "toc_label" varchar;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" ADD COLUMN "toc_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_doc_sections_locales" DROP COLUMN "toc_label";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" DROP COLUMN "toc_label";`)
}
