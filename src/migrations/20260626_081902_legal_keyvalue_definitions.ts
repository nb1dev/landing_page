import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" ADD VALUE 'keyvalue';
  ALTER TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" ADD VALUE 'definitions';
  ALTER TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" ADD VALUE 'keyvalue';
  ALTER TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" ADD VALUE 'definitions';
  CREATE TABLE "pages_blocks_legal_doc_sections_content_pair_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_pair_rows_locales" (
  	"left" varchar,
  	"right" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows_locales" (
  	"left" varchar,
  	"right" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_legal_doc_sections_content_pair_rows" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_pair_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_pair_rows_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_pair_rows_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_pair_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_pair_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_pair_rows_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_pair_rows"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_doc_sections_content_pair_rows_order_idx" ON "pages_blocks_legal_doc_sections_content_pair_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_pair_rows_parent_id_idx" ON "pages_blocks_legal_doc_sections_content_pair_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_pair_rows_locales_lo" ON "pages_blocks_legal_doc_sections_content_pair_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_pair_rows_order_idx" ON "_pages_v_blocks_legal_doc_sections_content_pair_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_pair_rows_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_content_pair_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_pair_rows_local_1" ON "_pages_v_blocks_legal_doc_sections_content_pair_rows_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_legal_doc_sections_content_pair_rows" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_pair_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_pair_rows_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::text;
  DROP TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type";
  CREATE TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card', 'form');
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::"public"."enum_pages_blocks_legal_doc_sections_content_type";
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" USING "type"::"public"."enum_pages_blocks_legal_doc_sections_content_type";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::text;
  DROP TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type";
  CREATE TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card', 'form');
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DEFAULT 'clause'::"public"."enum__pages_v_blocks_legal_doc_sections_content_type";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ALTER COLUMN "type" SET DATA TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" USING "type"::"public"."enum__pages_v_blocks_legal_doc_sections_content_type";`)
}
