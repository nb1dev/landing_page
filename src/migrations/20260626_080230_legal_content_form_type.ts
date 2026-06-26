import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" ADD VALUE 'form';
  ALTER TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" ADD VALUE 'form';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::text;
  DROP TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type";
  CREATE TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card');
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::"public"."enum_pages_blocks_legal_doc_sections_content_type";
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" USING "type"::"public"."enum_pages_blocks_legal_doc_sections_content_type";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::text;
  DROP TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type";
  CREATE TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card');
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::"public"."enum__pages_v_blocks_legal_doc_sections_content_type";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" USING "type"::"public"."enum__pages_v_blocks_legal_doc_sections_content_type";`)
}
