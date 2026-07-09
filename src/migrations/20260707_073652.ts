import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_formula_jobs_source_type" AS ENUM('sample', 'quest');
  CREATE TYPE "public"."enum_pages_blocks_lab_formula_jobs_mode" AS ENUM('flex', 'combo');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_formula_jobs_source_type" AS ENUM('sample', 'quest');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_formula_jobs_mode" AS ENUM('flex', 'combo');
  CREATE TABLE "pages_blocks_lab_formula_jobs_adds" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"strain" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_formula_jobs_adds_locales" (
  	"condition" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_formula_jobs_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_formula_jobs_members_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_formula_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source_type" "enum_pages_blocks_lab_formula_jobs_source_type" DEFAULT 'sample',
  	"mode" "enum_pages_blocks_lab_formula_jobs_mode" DEFAULT 'flex',
  	"lead_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_formula_jobs_locales" (
  	"name" varchar,
  	"trigger" varchar,
  	"lead_note" varchar,
  	"combo_caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_formula_blend_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"position" numeric
  );
  
  CREATE TABLE "pages_blocks_lab_formula" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote_author_image_id" integer,
  	"quote_author_name" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_formula_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" varchar,
  	"stage1_label" varchar,
  	"stage1_sub" varchar,
  	"live_cultures_label" varchar,
  	"live_cultures_text" varchar,
  	"prebiotics_label" varchar,
  	"prebiotics_text" varchar,
  	"combined_label" varchar,
  	"combined_text" varchar,
  	"stage2_label" varchar,
  	"stage2_heading" varchar,
  	"stage2_intro" jsonb,
  	"jobs_scope_label" varchar,
  	"jobs_more_label" varchar,
  	"jobs_more_mobile_note" varchar,
  	"worked_detail_label" varchar,
  	"worked_foot_note" jsonb,
  	"stage3_label" varchar,
  	"stage3_heading" varchar,
  	"stage3_intro" varchar,
  	"not_in_blend_label" varchar,
  	"not_in_blend_note" varchar,
  	"blend_caption" jsonb,
  	"quote_text" jsonb,
  	"quote_author_inst" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs_adds" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"strain" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs_adds_locales" (
  	"condition" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs_members_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_type" "enum__pages_v_blocks_lab_formula_jobs_source_type" DEFAULT 'sample',
  	"mode" "enum__pages_v_blocks_lab_formula_jobs_mode" DEFAULT 'flex',
  	"lead_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_jobs_locales" (
  	"name" varchar,
  	"trigger" varchar,
  	"lead_note" varchar,
  	"combo_caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_blend_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"position" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote_author_image_id" integer,
  	"quote_author_name" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_formula_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" varchar,
  	"stage1_label" varchar,
  	"stage1_sub" varchar,
  	"live_cultures_label" varchar,
  	"live_cultures_text" varchar,
  	"prebiotics_label" varchar,
  	"prebiotics_text" varchar,
  	"combined_label" varchar,
  	"combined_text" varchar,
  	"stage2_label" varchar,
  	"stage2_heading" varchar,
  	"stage2_intro" jsonb,
  	"jobs_scope_label" varchar,
  	"jobs_more_label" varchar,
  	"jobs_more_mobile_note" varchar,
  	"worked_detail_label" varchar,
  	"worked_foot_note" jsonb,
  	"stage3_label" varchar,
  	"stage3_heading" varchar,
  	"stage3_intro" varchar,
  	"not_in_blend_label" varchar,
  	"not_in_blend_note" varchar,
  	"blend_caption" jsonb,
  	"quote_text" jsonb,
  	"quote_author_inst" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_formula_jobs_adds" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_adds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_jobs_adds_locales" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_adds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula_jobs_adds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_jobs_members" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_jobs_members_locales" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula_jobs_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_jobs" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_jobs_locales" ADD CONSTRAINT "pages_blocks_lab_formula_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_blend_rows" ADD CONSTRAINT "pages_blocks_lab_formula_blend_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula" ADD CONSTRAINT "pages_blocks_lab_formula_quote_author_image_id_media_id_fk" FOREIGN KEY ("quote_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula" ADD CONSTRAINT "pages_blocks_lab_formula_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_formula_locales" ADD CONSTRAINT "pages_blocks_lab_formula_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs_adds" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_adds_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs_adds_locales" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_adds_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula_jobs_adds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs_members" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs_members_locales" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_members_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula_jobs_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_jobs_locales" ADD CONSTRAINT "_pages_v_blocks_lab_formula_jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_blend_rows" ADD CONSTRAINT "_pages_v_blocks_lab_formula_blend_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula" ADD CONSTRAINT "_pages_v_blocks_lab_formula_quote_author_image_id_media_id_fk" FOREIGN KEY ("quote_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula" ADD CONSTRAINT "_pages_v_blocks_lab_formula_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_formula_locales" ADD CONSTRAINT "_pages_v_blocks_lab_formula_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_formula"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_formula_jobs_adds_order_idx" ON "pages_blocks_lab_formula_jobs_adds" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_formula_jobs_adds_parent_id_idx" ON "pages_blocks_lab_formula_jobs_adds" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_formula_jobs_adds_locales_locale_parent_id_" ON "pages_blocks_lab_formula_jobs_adds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_formula_jobs_members_order_idx" ON "pages_blocks_lab_formula_jobs_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_formula_jobs_members_parent_id_idx" ON "pages_blocks_lab_formula_jobs_members" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_formula_jobs_members_locales_locale_parent_" ON "pages_blocks_lab_formula_jobs_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_formula_jobs_order_idx" ON "pages_blocks_lab_formula_jobs" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_formula_jobs_parent_id_idx" ON "pages_blocks_lab_formula_jobs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_formula_jobs_locales_locale_parent_id_uniqu" ON "pages_blocks_lab_formula_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_formula_blend_rows_order_idx" ON "pages_blocks_lab_formula_blend_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_formula_blend_rows_parent_id_idx" ON "pages_blocks_lab_formula_blend_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_formula_order_idx" ON "pages_blocks_lab_formula" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_formula_parent_id_idx" ON "pages_blocks_lab_formula" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_formula_path_idx" ON "pages_blocks_lab_formula" USING btree ("_path");
  CREATE INDEX "pages_blocks_lab_formula_quote_author_image_idx" ON "pages_blocks_lab_formula" USING btree ("quote_author_image_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_formula_locales_locale_parent_id_unique" ON "pages_blocks_lab_formula_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_adds_order_idx" ON "_pages_v_blocks_lab_formula_jobs_adds" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_adds_parent_id_idx" ON "_pages_v_blocks_lab_formula_jobs_adds" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_formula_jobs_adds_locales_locale_parent_" ON "_pages_v_blocks_lab_formula_jobs_adds_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_members_order_idx" ON "_pages_v_blocks_lab_formula_jobs_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_members_parent_id_idx" ON "_pages_v_blocks_lab_formula_jobs_members" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_formula_jobs_members_locales_locale_pare" ON "_pages_v_blocks_lab_formula_jobs_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_order_idx" ON "_pages_v_blocks_lab_formula_jobs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_formula_jobs_parent_id_idx" ON "_pages_v_blocks_lab_formula_jobs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_formula_jobs_locales_locale_parent_id_un" ON "_pages_v_blocks_lab_formula_jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_blend_rows_order_idx" ON "_pages_v_blocks_lab_formula_blend_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_formula_blend_rows_parent_id_idx" ON "_pages_v_blocks_lab_formula_blend_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_order_idx" ON "_pages_v_blocks_lab_formula" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_formula_parent_id_idx" ON "_pages_v_blocks_lab_formula" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_formula_path_idx" ON "_pages_v_blocks_lab_formula" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lab_formula_quote_author_image_idx" ON "_pages_v_blocks_lab_formula" USING btree ("quote_author_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_formula_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_formula_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_formula_jobs_adds" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_jobs_adds_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_jobs_members" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_jobs_members_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_jobs" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_jobs_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_blend_rows" CASCADE;
  DROP TABLE "pages_blocks_lab_formula" CASCADE;
  DROP TABLE "pages_blocks_lab_formula_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs_adds" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs_adds_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs_members" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_jobs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_blend_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_formula_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_formula_jobs_source_type";
  DROP TYPE "public"."enum_pages_blocks_lab_formula_jobs_mode";
  DROP TYPE "public"."enum__pages_v_blocks_lab_formula_jobs_source_type";
  DROP TYPE "public"."enum__pages_v_blocks_lab_formula_jobs_mode";`)
}
