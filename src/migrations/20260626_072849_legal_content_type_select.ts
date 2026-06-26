import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type" AS ENUM('clause', 'card');
  CREATE TABLE "pages_blocks_legal_doc_sections_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_legal_doc_sections_content_type" DEFAULT 'clause'
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"table_caption" varchar,
  	"col1_heading" varchar,
  	"col2_heading" varchar,
  	"col3_heading" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_legal_doc_sections_content_type" DEFAULT 'clause',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"table_caption" varchar,
  	"col1_heading" varchar,
  	"col2_heading" varchar,
  	"col3_heading" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_legal_clause" CASCADE;
  DROP TABLE "pages_blocks_legal_clause_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_card_rows" CASCADE;
  DROP TABLE "pages_blocks_legal_card_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_card" CASCADE;
  DROP TABLE "pages_blocks_legal_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_clause" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_clause_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_card_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_card_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_card" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_card_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_rows" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_rows_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_rows_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_rows" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_rows_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_doc_sections_content_rows_order_idx" ON "pages_blocks_legal_doc_sections_content_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_rows_parent_id_idx" ON "pages_blocks_legal_doc_sections_content_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_rows_locales_locale_" ON "pages_blocks_legal_doc_sections_content_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_order_idx" ON "pages_blocks_legal_doc_sections_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_parent_id_idx" ON "pages_blocks_legal_doc_sections_content" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_locales_locale_paren" ON "pages_blocks_legal_doc_sections_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_order_idx" ON "_pages_v_blocks_legal_doc_sections_content_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_content_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_locales_loca" ON "_pages_v_blocks_legal_doc_sections_content_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_order_idx" ON "_pages_v_blocks_legal_doc_sections_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_content" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_locales_locale_pa" ON "_pages_v_blocks_legal_doc_sections_content_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_legal_clause" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_clause_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_card_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_card_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_card_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"table_caption" varchar,
  	"col1_heading" varchar,
  	"col2_heading" varchar,
  	"col3_heading" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_clause" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_clause_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_card_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_card_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_card_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"table_caption" varchar,
  	"col1_heading" varchar,
  	"col2_heading" varchar,
  	"col3_heading" varchar,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_legal_doc_sections_content_rows" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_clause" ADD CONSTRAINT "pages_blocks_legal_clause_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_clause_locales" ADD CONSTRAINT "pages_blocks_legal_clause_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_clause"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_card_rows" ADD CONSTRAINT "pages_blocks_legal_card_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_card_rows_locales" ADD CONSTRAINT "pages_blocks_legal_card_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_card_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_card" ADD CONSTRAINT "pages_blocks_legal_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_card_locales" ADD CONSTRAINT "pages_blocks_legal_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_clause" ADD CONSTRAINT "_pages_v_blocks_legal_clause_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_clause_locales" ADD CONSTRAINT "_pages_v_blocks_legal_clause_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_clause"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_card_rows" ADD CONSTRAINT "_pages_v_blocks_legal_card_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_card_rows_locales" ADD CONSTRAINT "_pages_v_blocks_legal_card_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_card_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_card" ADD CONSTRAINT "_pages_v_blocks_legal_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_card_locales" ADD CONSTRAINT "_pages_v_blocks_legal_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_card"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_clause_order_idx" ON "pages_blocks_legal_clause" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_clause_parent_id_idx" ON "pages_blocks_legal_clause" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_clause_path_idx" ON "pages_blocks_legal_clause" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_legal_clause_locales_locale_parent_id_unique" ON "pages_blocks_legal_clause_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legal_card_rows_order_idx" ON "pages_blocks_legal_card_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_card_rows_parent_id_idx" ON "pages_blocks_legal_card_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_card_rows_locales_locale_parent_id_unique" ON "pages_blocks_legal_card_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legal_card_order_idx" ON "pages_blocks_legal_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_card_parent_id_idx" ON "pages_blocks_legal_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_card_path_idx" ON "pages_blocks_legal_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_legal_card_locales_locale_parent_id_unique" ON "pages_blocks_legal_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_clause_order_idx" ON "_pages_v_blocks_legal_clause" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_clause_parent_id_idx" ON "_pages_v_blocks_legal_clause" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_clause_path_idx" ON "_pages_v_blocks_legal_clause" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_clause_locales_locale_parent_id_unique" ON "_pages_v_blocks_legal_clause_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_card_rows_order_idx" ON "_pages_v_blocks_legal_card_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_card_rows_parent_id_idx" ON "_pages_v_blocks_legal_card_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_card_rows_locales_locale_parent_id_uni" ON "_pages_v_blocks_legal_card_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_card_order_idx" ON "_pages_v_blocks_legal_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_card_parent_id_idx" ON "_pages_v_blocks_legal_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_card_path_idx" ON "_pages_v_blocks_legal_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_legal_card_locales" USING btree ("_locale","_parent_id");
  DROP TYPE "public"."enum_pages_blocks_legal_doc_sections_content_type";
  DROP TYPE "public"."enum__pages_v_blocks_legal_doc_sections_content_type";`)
}
