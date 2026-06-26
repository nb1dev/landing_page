import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_doc_sections_locales" ADD COLUMN "number_label" varchar;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" ADD COLUMN "number_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_doc_sections_locales" DROP COLUMN "number_label";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" DROP COLUMN "number_label";`)
}
