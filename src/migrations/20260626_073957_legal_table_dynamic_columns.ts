import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_legal_doc_sections_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_columns_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_content_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_columns_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_legal_doc_sections_content_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_columns" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_columns_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_columns_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_rows_cells" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_rows_cells_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_rows_cells_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_columns" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_columns_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_rows_cells_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_rows_cells"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_doc_sections_content_columns_order_idx" ON "pages_blocks_legal_doc_sections_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_columns_parent_id_idx" ON "pages_blocks_legal_doc_sections_content_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_columns_locales_loca" ON "pages_blocks_legal_doc_sections_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_rows_cells_order_idx" ON "pages_blocks_legal_doc_sections_content_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_sections_content_rows_cells_parent_id_idx" ON "pages_blocks_legal_doc_sections_content_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_rows_cells_locales_l" ON "pages_blocks_legal_doc_sections_content_rows_cells_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_columns_order_idx" ON "_pages_v_blocks_legal_doc_sections_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_columns_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_content_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_columns_locales_l" ON "_pages_v_blocks_legal_doc_sections_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_cells_order_idx" ON "_pages_v_blocks_legal_doc_sections_content_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_cells_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_content_rows_cells" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_cells_locale" ON "_pages_v_blocks_legal_doc_sections_content_rows_cells_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" DROP COLUMN "col1_heading";
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" DROP COLUMN "col2_heading";
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" DROP COLUMN "col3_heading";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" DROP COLUMN "col1_heading";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" DROP COLUMN "col2_heading";
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" DROP COLUMN "col3_heading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_legal_doc_sections_content_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" (
  	"col1" varchar,
  	"col2" varchar,
  	"col3" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "pages_blocks_legal_doc_sections_content_columns" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_content_rows_cells_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_content_rows_cells_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" ADD COLUMN "col1_heading" varchar;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" ADD COLUMN "col2_heading" varchar;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_locales" ADD COLUMN "col3_heading" varchar;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" ADD COLUMN "col1_heading" varchar;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" ADD COLUMN "col2_heading" varchar;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_locales" ADD COLUMN "col3_heading" varchar;
  ALTER TABLE "pages_blocks_legal_doc_sections_content_rows_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_content_rows_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_content_rows_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_content_rows_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_content_rows"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_sections_content_rows_locales_locale_" ON "pages_blocks_legal_doc_sections_content_rows_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_sections_content_rows_locales_loca" ON "_pages_v_blocks_legal_doc_sections_content_rows_locales" USING btree ("_locale","_parent_id");`)
}
