import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed
// tableNameMap (not guessed) — the block config sets dbName:'brf' to keep
// every nested array/locales table name comfortably under Postgres's
// 63-char identifier limit. Versions tables reuse the SAME enum types as
// the live tables (Payload does not create separate "_v" enum variants
// here), so there are only two enum types total, not four.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_brf_signal_kind" AS ENUM('gut', 'blood');
  CREATE TYPE "public"."enum_brf_pill_variant" AS ENUM('low', 'ok');

  CREATE TABLE "brf" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "brf_locales" (
   "heading" jsonb,
   "lede" varchar,
   "reading_title" varchar,
   "reading_subtitle" varchar,
   "blood_title" varchar,
   "blood_badge" varchar,
   "blood_subtitle" varchar,
   "blood_note_prefix" varchar,
   "blood_note_badge" varchar,
   "blood_note_suffix" varchar,
   "blood_measured_label" varchar,
   "support_divider_label" varchar,
   "more_label" varchar,
   "more_detail" varchar,
   "formula_title" varchar,
   "formula_empty_text" varchar,
   "formula_link_label" varchar,
   "formula_link_url" varchar,
   "caption_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "brf_signals" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "kind" "enum_brf_signal_kind" DEFAULT 'gut',
   "pill_variant" "enum_brf_pill_variant" DEFAULT 'low',
   "fill_percent" numeric
  );

  CREATE TABLE "brf_signals_locales" (
   "gut_name" varchar,
   "gut_sub" varchar,
   "pill_label" varchar,
   "blood_name" varchar,
   "hold_label" varchar,
   "hold_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "brf_signals_outputs" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "brf_signals_outputs_locales" (
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "brf_support_items" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "brf_support_items_locales" (
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_brf_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_brf_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "reading_title" varchar,
   "reading_subtitle" varchar,
   "blood_title" varchar,
   "blood_badge" varchar,
   "blood_subtitle" varchar,
   "blood_note_prefix" varchar,
   "blood_note_badge" varchar,
   "blood_note_suffix" varchar,
   "blood_measured_label" varchar,
   "support_divider_label" varchar,
   "more_label" varchar,
   "more_detail" varchar,
   "formula_title" varchar,
   "formula_empty_text" varchar,
   "formula_link_label" varchar,
   "formula_link_url" varchar,
   "caption_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_brf_v_signals" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "kind" "enum_brf_signal_kind" DEFAULT 'gut',
   "pill_variant" "enum_brf_pill_variant" DEFAULT 'low',
   "fill_percent" numeric,
   "_uuid" varchar
  );

  CREATE TABLE "_brf_v_signals_locales" (
   "gut_name" varchar,
   "gut_sub" varchar,
   "pill_label" varchar,
   "blood_name" varchar,
   "hold_label" varchar,
   "hold_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_brf_v_signals_outputs" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_brf_v_signals_outputs_locales" (
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_brf_v_support_items" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_brf_v_support_items_locales" (
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "brf" ADD CONSTRAINT "brf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_locales" ADD CONSTRAINT "brf_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_signals" ADD CONSTRAINT "brf_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_signals_locales" ADD CONSTRAINT "brf_signals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_signals_outputs" ADD CONSTRAINT "brf_signals_outputs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_signals_outputs_locales" ADD CONSTRAINT "brf_signals_outputs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf_signals_outputs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_support_items" ADD CONSTRAINT "brf_support_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brf_support_items_locales" ADD CONSTRAINT "brf_support_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brf_support_items"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_brf_v" ADD CONSTRAINT "_brf_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_locales" ADD CONSTRAINT "_brf_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_signals" ADD CONSTRAINT "_brf_v_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_signals_locales" ADD CONSTRAINT "_brf_v_signals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_signals_outputs" ADD CONSTRAINT "_brf_v_signals_outputs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_signals_outputs_locales" ADD CONSTRAINT "_brf_v_signals_outputs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v_signals_outputs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_support_items" ADD CONSTRAINT "_brf_v_support_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brf_v_support_items_locales" ADD CONSTRAINT "_brf_v_support_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brf_v_support_items"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "brf_order_idx" ON "brf" USING btree ("_order");
  CREATE INDEX "brf_parent_id_idx" ON "brf" USING btree ("_parent_id");
  CREATE INDEX "brf_path_idx" ON "brf" USING btree ("_path");
  CREATE UNIQUE INDEX "brf_locales_locale_parent_id_unique" ON "brf_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brf_signals_order_idx" ON "brf_signals" USING btree ("_order");
  CREATE INDEX "brf_signals_parent_id_idx" ON "brf_signals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brf_signals_locales_locale_parent_id_unique" ON "brf_signals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brf_signals_outputs_order_idx" ON "brf_signals_outputs" USING btree ("_order");
  CREATE INDEX "brf_signals_outputs_parent_id_idx" ON "brf_signals_outputs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brf_signals_outputs_locales_locale_parent_id_unique" ON "brf_signals_outputs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brf_support_items_order_idx" ON "brf_support_items" USING btree ("_order");
  CREATE INDEX "brf_support_items_parent_id_idx" ON "brf_support_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brf_support_items_locales_locale_parent_id_unique" ON "brf_support_items_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_brf_v_order_idx" ON "_brf_v" USING btree ("_order");
  CREATE INDEX "_brf_v_parent_id_idx" ON "_brf_v" USING btree ("_parent_id");
  CREATE INDEX "_brf_v_path_idx" ON "_brf_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_brf_v_locales_locale_parent_id_unique" ON "_brf_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_brf_v_signals_order_idx" ON "_brf_v_signals" USING btree ("_order");
  CREATE INDEX "_brf_v_signals_parent_id_idx" ON "_brf_v_signals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_brf_v_signals_locales_locale_parent_id_unique" ON "_brf_v_signals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_brf_v_signals_outputs_order_idx" ON "_brf_v_signals_outputs" USING btree ("_order");
  CREATE INDEX "_brf_v_signals_outputs_parent_id_idx" ON "_brf_v_signals_outputs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_brf_v_signals_outputs_locales_locale_parent_id_unique" ON "_brf_v_signals_outputs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_brf_v_support_items_order_idx" ON "_brf_v_support_items" USING btree ("_order");
  CREATE INDEX "_brf_v_support_items_parent_id_idx" ON "_brf_v_support_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_brf_v_support_items_locales_locale_parent_id_unique" ON "_brf_v_support_items_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "brf_signals_outputs_locales";
  DROP TABLE IF EXISTS "brf_signals_outputs";
  DROP TABLE IF EXISTS "brf_signals_locales";
  DROP TABLE IF EXISTS "brf_signals";
  DROP TABLE IF EXISTS "brf_support_items_locales";
  DROP TABLE IF EXISTS "brf_support_items";
  DROP TABLE IF EXISTS "brf_locales";
  DROP TABLE IF EXISTS "brf";

  DROP TABLE IF EXISTS "_brf_v_signals_outputs_locales";
  DROP TABLE IF EXISTS "_brf_v_signals_outputs";
  DROP TABLE IF EXISTS "_brf_v_signals_locales";
  DROP TABLE IF EXISTS "_brf_v_signals";
  DROP TABLE IF EXISTS "_brf_v_support_items_locales";
  DROP TABLE IF EXISTS "_brf_v_support_items";
  DROP TABLE IF EXISTS "_brf_v_locales";
  DROP TABLE IF EXISTS "_brf_v";

  DROP TYPE IF EXISTS "public"."enum_brf_signal_kind";
  DROP TYPE IF EXISTS "public"."enum_brf_pill_variant";
  `)
}
