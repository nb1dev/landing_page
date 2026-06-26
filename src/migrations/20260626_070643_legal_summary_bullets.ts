import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_legal_doc_summary_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_summary_items_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_summary_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_summary_items_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_legal_doc_summary_items" ADD CONSTRAINT "pages_blocks_legal_doc_summary_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_summary_items_locales" ADD CONSTRAINT "pages_blocks_legal_doc_summary_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_summary_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_summary_items" ADD CONSTRAINT "_pages_v_blocks_legal_doc_summary_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_summary_items_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_summary_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_summary_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_legal_doc_summary_items_order_idx" ON "pages_blocks_legal_doc_summary_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_doc_summary_items_parent_id_idx" ON "pages_blocks_legal_doc_summary_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_legal_doc_summary_items_locales_locale_parent_i" ON "pages_blocks_legal_doc_summary_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_doc_summary_items_order_idx" ON "_pages_v_blocks_legal_doc_summary_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_doc_summary_items_parent_id_idx" ON "_pages_v_blocks_legal_doc_summary_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_legal_doc_summary_items_locales_locale_paren" ON "_pages_v_blocks_legal_doc_summary_items_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_legal_doc_locales" DROP COLUMN "summary_body";
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" DROP COLUMN "summary_body";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_legal_doc_summary_items" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_summary_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_summary_items" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_summary_items_locales" CASCADE;
  ALTER TABLE "pages_blocks_legal_doc_locales" ADD COLUMN "summary_body" jsonb;
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" ADD COLUMN "summary_body" jsonb;`)
}
