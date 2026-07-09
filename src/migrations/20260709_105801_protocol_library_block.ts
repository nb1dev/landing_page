import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'plb' is set
// on the block because the nested "items"/"categories" arrays push the
// default prefix's locale index names past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_plb_categories_key" AS ENUM('strains', 'fibres', 'vitamins', 'actives');
  CREATE TYPE "public"."enum_plb_items_category" AS ENUM('strains', 'fibres', 'vitamins', 'actives');
  CREATE TYPE "public"."enum__plb_v_categories_key" AS ENUM('strains', 'fibres', 'vitamins', 'actives');
  CREATE TYPE "public"."enum__plb_v_items_category" AS ENUM('strains', 'fibres', 'vitamins', 'actives');

  CREATE TABLE "plb" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "plb_locales" (
   "vetted_text" jsonb,
   "foot_line" jsonb,
   "toggle_label_closed" varchar,
   "toggle_label_open" varchar,
   "all_pill_label" varchar,
   "search_placeholder" varchar,
   "search_aria_label" varchar,
   "empty_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "plb_categories" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "key" "enum_plb_categories_key" DEFAULT 'strains'
  );

  CREATE TABLE "plb_categories_locales" (
   "family_label" varchar,
   "pill_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "plb_vetted_faces" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar
  );

  CREATE TABLE "plb_items" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "category" "enum_plb_items_category" DEFAULT 'strains'
  );

  CREATE TABLE "plb_items_locales" (
   "name" varchar,
   "type" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_plb_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_plb_v_locales" (
   "vetted_text" jsonb,
   "foot_line" jsonb,
   "toggle_label_closed" varchar,
   "toggle_label_open" varchar,
   "all_pill_label" varchar,
   "search_placeholder" varchar,
   "search_aria_label" varchar,
   "empty_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_plb_v_categories" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "key" "enum__plb_v_categories_key" DEFAULT 'strains',
   "_uuid" varchar
  );

  CREATE TABLE "_plb_v_categories_locales" (
   "family_label" varchar,
   "pill_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_plb_v_vetted_faces" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar,
   "_uuid" varchar
  );

  CREATE TABLE "_plb_v_items" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "category" "enum__plb_v_items_category" DEFAULT 'strains',
   "_uuid" varchar
  );

  CREATE TABLE "_plb_v_items_locales" (
   "name" varchar,
   "type" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "plb" ADD CONSTRAINT "plb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_locales" ADD CONSTRAINT "plb_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_categories" ADD CONSTRAINT "plb_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_categories_locales" ADD CONSTRAINT "plb_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_vetted_faces" ADD CONSTRAINT "plb_vetted_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plb_vetted_faces" ADD CONSTRAINT "plb_vetted_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_items" ADD CONSTRAINT "plb_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plb_items_locales" ADD CONSTRAINT "plb_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plb_items"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_plb_v" ADD CONSTRAINT "_plb_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_locales" ADD CONSTRAINT "_plb_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_categories" ADD CONSTRAINT "_plb_v_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_categories_locales" ADD CONSTRAINT "_plb_v_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_vetted_faces" ADD CONSTRAINT "_plb_v_vetted_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_plb_v_vetted_faces" ADD CONSTRAINT "_plb_v_vetted_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_items" ADD CONSTRAINT "_plb_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_plb_v_items_locales" ADD CONSTRAINT "_plb_v_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_plb_v_items"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "plb_order_idx" ON "plb" USING btree ("_order");
  CREATE INDEX "plb_parent_id_idx" ON "plb" USING btree ("_parent_id");
  CREATE INDEX "plb_path_idx" ON "plb" USING btree ("_path");
  CREATE UNIQUE INDEX "plb_locales_locale_parent_id_unique" ON "plb_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "plb_categories_order_idx" ON "plb_categories" USING btree ("_order");
  CREATE INDEX "plb_categories_parent_id_idx" ON "plb_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "plb_categories_locales_locale_parent_id_unique" ON "plb_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "plb_vetted_faces_order_idx" ON "plb_vetted_faces" USING btree ("_order");
  CREATE INDEX "plb_vetted_faces_parent_id_idx" ON "plb_vetted_faces" USING btree ("_parent_id");
  CREATE INDEX "plb_vetted_faces_image_idx" ON "plb_vetted_faces" USING btree ("image_id");
  CREATE INDEX "plb_items_order_idx" ON "plb_items" USING btree ("_order");
  CREATE INDEX "plb_items_parent_id_idx" ON "plb_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "plb_items_locales_locale_parent_id_unique" ON "plb_items_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_plb_v_order_idx" ON "_plb_v" USING btree ("_order");
  CREATE INDEX "_plb_v_parent_id_idx" ON "_plb_v" USING btree ("_parent_id");
  CREATE INDEX "_plb_v_path_idx" ON "_plb_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_plb_v_locales_locale_parent_id_unique" ON "_plb_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_plb_v_categories_order_idx" ON "_plb_v_categories" USING btree ("_order");
  CREATE INDEX "_plb_v_categories_parent_id_idx" ON "_plb_v_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_plb_v_categories_locales_locale_parent_id_unique" ON "_plb_v_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_plb_v_vetted_faces_order_idx" ON "_plb_v_vetted_faces" USING btree ("_order");
  CREATE INDEX "_plb_v_vetted_faces_parent_id_idx" ON "_plb_v_vetted_faces" USING btree ("_parent_id");
  CREATE INDEX "_plb_v_vetted_faces_image_idx" ON "_plb_v_vetted_faces" USING btree ("image_id");
  CREATE INDEX "_plb_v_items_order_idx" ON "_plb_v_items" USING btree ("_order");
  CREATE INDEX "_plb_v_items_parent_id_idx" ON "_plb_v_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_plb_v_items_locales_locale_parent_id_unique" ON "_plb_v_items_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "plb_categories_locales";
  DROP TABLE IF EXISTS "plb_categories";
  DROP TABLE IF EXISTS "plb_vetted_faces";
  DROP TABLE IF EXISTS "plb_items_locales";
  DROP TABLE IF EXISTS "plb_items";
  DROP TABLE IF EXISTS "plb_locales";
  DROP TABLE IF EXISTS "plb";

  DROP TABLE IF EXISTS "_plb_v_categories_locales";
  DROP TABLE IF EXISTS "_plb_v_categories";
  DROP TABLE IF EXISTS "_plb_v_vetted_faces";
  DROP TABLE IF EXISTS "_plb_v_items_locales";
  DROP TABLE IF EXISTS "_plb_v_items";
  DROP TABLE IF EXISTS "_plb_v_locales";
  DROP TABLE IF EXISTS "_plb_v";

  DROP TYPE IF EXISTS "public"."enum_plb_categories_key";
  DROP TYPE IF EXISTS "public"."enum_plb_items_category";
  DROP TYPE IF EXISTS "public"."enum__plb_v_categories_key";
  DROP TYPE IF EXISTS "public"."enum__plb_v_items_category";
  `)
}
