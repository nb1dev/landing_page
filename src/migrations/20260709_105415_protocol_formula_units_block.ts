import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'pfu' is set
// on the block because two levels of nested arrays (parts -> units -> chips)
// push the default prefix's locale index names past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pfu_parts_key" AS ENUM('activate', 'restore', 'nourish');
  CREATE TYPE "public"."enum_pfu_parts_units_icon" AS ENUM('capsule', 'softgel', 'prebiotic');
  CREATE TYPE "public"."enum_pfu_parts_units_tag_variant" AS ENUM('strains', 'fibres', 'vitamins', 'actives', 'cond');
  CREATE TYPE "public"."enum__pfu_v_parts_key" AS ENUM('activate', 'restore', 'nourish');
  CREATE TYPE "public"."enum__pfu_v_parts_units_icon" AS ENUM('capsule', 'softgel', 'prebiotic');
  CREATE TYPE "public"."enum__pfu_v_parts_units_tag_variant" AS ENUM('strains', 'fibres', 'vitamins', 'actives', 'cond');

  CREATE TABLE "pfu" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "pfu_locales" (
   "heading" jsonb,
   "lede" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pfu_parts" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "key" "enum_pfu_parts_key" DEFAULT 'activate'
  );

  CREATE TABLE "pfu_parts_locales" (
   "label" varchar,
   "meta" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pfu_parts_units" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "icon" "enum_pfu_parts_units_icon" DEFAULT 'capsule',
   "tag_variant" "enum_pfu_parts_units_tag_variant" DEFAULT 'strains',
   "default_open" boolean DEFAULT false
  );

  CREATE TABLE "pfu_parts_units_locales" (
   "name" varchar,
   "tag_label" varchar,
   "role" varchar,
   "count" varchar,
   "description" varchar,
   "more_note" varchar,
   "decide_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pfu_parts_units_chips" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pfu_parts_units_chips_locales" (
   "text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pfu_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pfu_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pfu_v_parts" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "key" "enum__pfu_v_parts_key" DEFAULT 'activate',
   "_uuid" varchar
  );

  CREATE TABLE "_pfu_v_parts_locales" (
   "label" varchar,
   "meta" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pfu_v_parts_units" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "icon" "enum__pfu_v_parts_units_icon" DEFAULT 'capsule',
   "tag_variant" "enum__pfu_v_parts_units_tag_variant" DEFAULT 'strains',
   "default_open" boolean DEFAULT false,
   "_uuid" varchar
  );

  CREATE TABLE "_pfu_v_parts_units_locales" (
   "name" varchar,
   "tag_label" varchar,
   "role" varchar,
   "count" varchar,
   "description" varchar,
   "more_note" varchar,
   "decide_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pfu_v_parts_units_chips" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_pfu_v_parts_units_chips_locales" (
   "text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pfu" ADD CONSTRAINT "pfu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_locales" ADD CONSTRAINT "pfu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts" ADD CONSTRAINT "pfu_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts_locales" ADD CONSTRAINT "pfu_parts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts_units" ADD CONSTRAINT "pfu_parts_units_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts_units_locales" ADD CONSTRAINT "pfu_parts_units_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu_parts_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts_units_chips" ADD CONSTRAINT "pfu_parts_units_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu_parts_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pfu_parts_units_chips_locales" ADD CONSTRAINT "pfu_parts_units_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pfu_parts_units_chips"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pfu_v" ADD CONSTRAINT "_pfu_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_locales" ADD CONSTRAINT "_pfu_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts" ADD CONSTRAINT "_pfu_v_parts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts_locales" ADD CONSTRAINT "_pfu_v_parts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts_units" ADD CONSTRAINT "_pfu_v_parts_units_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v_parts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts_units_locales" ADD CONSTRAINT "_pfu_v_parts_units_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v_parts_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts_units_chips" ADD CONSTRAINT "_pfu_v_parts_units_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v_parts_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pfu_v_parts_units_chips_locales" ADD CONSTRAINT "_pfu_v_parts_units_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pfu_v_parts_units_chips"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pfu_order_idx" ON "pfu" USING btree ("_order");
  CREATE INDEX "pfu_parent_id_idx" ON "pfu" USING btree ("_parent_id");
  CREATE INDEX "pfu_path_idx" ON "pfu" USING btree ("_path");
  CREATE UNIQUE INDEX "pfu_locales_locale_parent_id_unique" ON "pfu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pfu_parts_order_idx" ON "pfu_parts" USING btree ("_order");
  CREATE INDEX "pfu_parts_parent_id_idx" ON "pfu_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pfu_parts_locales_locale_parent_id_unique" ON "pfu_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pfu_parts_units_order_idx" ON "pfu_parts_units" USING btree ("_order");
  CREATE INDEX "pfu_parts_units_parent_id_idx" ON "pfu_parts_units" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pfu_parts_units_locales_locale_parent_id_unique" ON "pfu_parts_units_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pfu_parts_units_chips_order_idx" ON "pfu_parts_units_chips" USING btree ("_order");
  CREATE INDEX "pfu_parts_units_chips_parent_id_idx" ON "pfu_parts_units_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pfu_parts_units_chips_locales_locale_parent_id_unique" ON "pfu_parts_units_chips_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pfu_v_order_idx" ON "_pfu_v" USING btree ("_order");
  CREATE INDEX "_pfu_v_parent_id_idx" ON "_pfu_v" USING btree ("_parent_id");
  CREATE INDEX "_pfu_v_path_idx" ON "_pfu_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_pfu_v_locales_locale_parent_id_unique" ON "_pfu_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pfu_v_parts_order_idx" ON "_pfu_v_parts" USING btree ("_order");
  CREATE INDEX "_pfu_v_parts_parent_id_idx" ON "_pfu_v_parts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pfu_v_parts_locales_locale_parent_id_unique" ON "_pfu_v_parts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pfu_v_parts_units_order_idx" ON "_pfu_v_parts_units" USING btree ("_order");
  CREATE INDEX "_pfu_v_parts_units_parent_id_idx" ON "_pfu_v_parts_units" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pfu_v_parts_units_locales_locale_parent_id_unique" ON "_pfu_v_parts_units_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pfu_v_parts_units_chips_order_idx" ON "_pfu_v_parts_units_chips" USING btree ("_order");
  CREATE INDEX "_pfu_v_parts_units_chips_parent_id_idx" ON "_pfu_v_parts_units_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pfu_v_parts_units_chips_locales_locale_parent_id_unique" ON "_pfu_v_parts_units_chips_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pfu_parts_units_chips_locales";
  DROP TABLE IF EXISTS "pfu_parts_units_chips";
  DROP TABLE IF EXISTS "pfu_parts_units_locales";
  DROP TABLE IF EXISTS "pfu_parts_units";
  DROP TABLE IF EXISTS "pfu_parts_locales";
  DROP TABLE IF EXISTS "pfu_parts";
  DROP TABLE IF EXISTS "pfu_locales";
  DROP TABLE IF EXISTS "pfu";

  DROP TABLE IF EXISTS "_pfu_v_parts_units_chips_locales";
  DROP TABLE IF EXISTS "_pfu_v_parts_units_chips";
  DROP TABLE IF EXISTS "_pfu_v_parts_units_locales";
  DROP TABLE IF EXISTS "_pfu_v_parts_units";
  DROP TABLE IF EXISTS "_pfu_v_parts_locales";
  DROP TABLE IF EXISTS "_pfu_v_parts";
  DROP TABLE IF EXISTS "_pfu_v_locales";
  DROP TABLE IF EXISTS "_pfu_v";

  DROP TYPE IF EXISTS "public"."enum_pfu_parts_key";
  DROP TYPE IF EXISTS "public"."enum_pfu_parts_units_icon";
  DROP TYPE IF EXISTS "public"."enum_pfu_parts_units_tag_variant";
  DROP TYPE IF EXISTS "public"."enum__pfu_v_parts_key";
  DROP TYPE IF EXISTS "public"."enum__pfu_v_parts_units_icon";
  DROP TYPE IF EXISTS "public"."enum__pfu_v_parts_units_tag_variant";
  `)
}
