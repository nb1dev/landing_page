import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'prh' is set
// on the block because the default prefix (pages_blocks_protocol_hero_...)
// pushes nested array/locale index names past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prh_panel_rows_tag_variant" AS ENUM('act', 'nour', 'rest');
  CREATE TYPE "public"."enum__prh_v_panel_rows_tag_variant" AS ENUM('act', 'nour', 'rest');

  CREATE TABLE "prh" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "prh_locales" (
   "heading" jsonb,
   "lede" varchar,
   "cta_label" varchar,
   "cta_url" varchar,
   "seal_text" jsonb,
   "panel_card_title" varchar,
   "panel_card_meta" varchar,
   "panel_more_label" varchar,
   "panel_more_meta" varchar,
   "panel_foot_note" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "prh_seal_faces" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar
  );

  CREATE TABLE "prh_seal_faces_locales" (
   "name" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "prh_panel_stages" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "prh_panel_stages_locales" (
   "status" varchar,
   "phase" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "prh_panel_rows" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "tag_variant" "enum_prh_panel_rows_tag_variant" DEFAULT 'act'
  );

  CREATE TABLE "prh_panel_rows_locales" (
   "tag_label" varchar,
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_prh_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_prh_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "cta_label" varchar,
   "cta_url" varchar,
   "seal_text" jsonb,
   "panel_card_title" varchar,
   "panel_card_meta" varchar,
   "panel_more_label" varchar,
   "panel_more_meta" varchar,
   "panel_foot_note" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_prh_v_seal_faces" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar,
   "_uuid" varchar
  );

  CREATE TABLE "_prh_v_seal_faces_locales" (
   "name" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_prh_v_panel_stages" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_prh_v_panel_stages_locales" (
   "status" varchar,
   "phase" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_prh_v_panel_rows" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "tag_variant" "enum__prh_v_panel_rows_tag_variant" DEFAULT 'act',
   "_uuid" varchar
  );

  CREATE TABLE "_prh_v_panel_rows_locales" (
   "tag_label" varchar,
   "name" varchar,
   "dose" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "prh" ADD CONSTRAINT "prh_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_locales" ADD CONSTRAINT "prh_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_seal_faces" ADD CONSTRAINT "prh_seal_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prh_seal_faces" ADD CONSTRAINT "prh_seal_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_seal_faces_locales" ADD CONSTRAINT "prh_seal_faces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh_seal_faces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_panel_stages" ADD CONSTRAINT "prh_panel_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_panel_stages_locales" ADD CONSTRAINT "prh_panel_stages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh_panel_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_panel_rows" ADD CONSTRAINT "prh_panel_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prh_panel_rows_locales" ADD CONSTRAINT "prh_panel_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prh_panel_rows"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_prh_v" ADD CONSTRAINT "_prh_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_locales" ADD CONSTRAINT "_prh_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_seal_faces" ADD CONSTRAINT "_prh_v_seal_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_prh_v_seal_faces" ADD CONSTRAINT "_prh_v_seal_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_seal_faces_locales" ADD CONSTRAINT "_prh_v_seal_faces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v_seal_faces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_panel_stages" ADD CONSTRAINT "_prh_v_panel_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_panel_stages_locales" ADD CONSTRAINT "_prh_v_panel_stages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v_panel_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_panel_rows" ADD CONSTRAINT "_prh_v_panel_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prh_v_panel_rows_locales" ADD CONSTRAINT "_prh_v_panel_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prh_v_panel_rows"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "prh_order_idx" ON "prh" USING btree ("_order");
  CREATE INDEX "prh_parent_id_idx" ON "prh" USING btree ("_parent_id");
  CREATE INDEX "prh_path_idx" ON "prh" USING btree ("_path");
  CREATE UNIQUE INDEX "prh_locales_locale_parent_id_unique" ON "prh_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prh_seal_faces_order_idx" ON "prh_seal_faces" USING btree ("_order");
  CREATE INDEX "prh_seal_faces_parent_id_idx" ON "prh_seal_faces" USING btree ("_parent_id");
  CREATE INDEX "prh_seal_faces_image_idx" ON "prh_seal_faces" USING btree ("image_id");
  CREATE UNIQUE INDEX "prh_seal_faces_locales_locale_parent_id_unique" ON "prh_seal_faces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prh_panel_stages_order_idx" ON "prh_panel_stages" USING btree ("_order");
  CREATE INDEX "prh_panel_stages_parent_id_idx" ON "prh_panel_stages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prh_panel_stages_locales_locale_parent_id_unique" ON "prh_panel_stages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prh_panel_rows_order_idx" ON "prh_panel_rows" USING btree ("_order");
  CREATE INDEX "prh_panel_rows_parent_id_idx" ON "prh_panel_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prh_panel_rows_locales_locale_parent_id_unique" ON "prh_panel_rows_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_prh_v_order_idx" ON "_prh_v" USING btree ("_order");
  CREATE INDEX "_prh_v_parent_id_idx" ON "_prh_v" USING btree ("_parent_id");
  CREATE INDEX "_prh_v_path_idx" ON "_prh_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_prh_v_locales_locale_parent_id_unique" ON "_prh_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prh_v_seal_faces_order_idx" ON "_prh_v_seal_faces" USING btree ("_order");
  CREATE INDEX "_prh_v_seal_faces_parent_id_idx" ON "_prh_v_seal_faces" USING btree ("_parent_id");
  CREATE INDEX "_prh_v_seal_faces_image_idx" ON "_prh_v_seal_faces" USING btree ("image_id");
  CREATE UNIQUE INDEX "_prh_v_seal_faces_locales_locale_parent_id_unique" ON "_prh_v_seal_faces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prh_v_panel_stages_order_idx" ON "_prh_v_panel_stages" USING btree ("_order");
  CREATE INDEX "_prh_v_panel_stages_parent_id_idx" ON "_prh_v_panel_stages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prh_v_panel_stages_locales_locale_parent_id_unique" ON "_prh_v_panel_stages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prh_v_panel_rows_order_idx" ON "_prh_v_panel_rows" USING btree ("_order");
  CREATE INDEX "_prh_v_panel_rows_parent_id_idx" ON "_prh_v_panel_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prh_v_panel_rows_locales_locale_parent_id_unique" ON "_prh_v_panel_rows_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "prh_locales";
  DROP TABLE IF EXISTS "prh_seal_faces_locales";
  DROP TABLE IF EXISTS "prh_seal_faces";
  DROP TABLE IF EXISTS "prh_panel_stages_locales";
  DROP TABLE IF EXISTS "prh_panel_stages";
  DROP TABLE IF EXISTS "prh_panel_rows_locales";
  DROP TABLE IF EXISTS "prh_panel_rows";
  DROP TABLE IF EXISTS "prh";

  DROP TABLE IF EXISTS "_prh_v_locales";
  DROP TABLE IF EXISTS "_prh_v_seal_faces_locales";
  DROP TABLE IF EXISTS "_prh_v_seal_faces";
  DROP TABLE IF EXISTS "_prh_v_panel_stages_locales";
  DROP TABLE IF EXISTS "_prh_v_panel_stages";
  DROP TABLE IF EXISTS "_prh_v_panel_rows_locales";
  DROP TABLE IF EXISTS "_prh_v_panel_rows";
  DROP TABLE IF EXISTS "_prh_v";

  DROP TYPE IF EXISTS "public"."enum_prh_panel_rows_tag_variant";
  DROP TYPE IF EXISTS "public"."enum__prh_v_panel_rows_tag_variant";
  `)
}
