import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'pwa' is set
// on the block because the nested "calls" array pushes the default prefix's
// locale index name past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pwa_calls_icon" AS ENUM('sorted', 'travel', 'refresh');
  CREATE TYPE "public"."enum__pwa_v_calls_icon" AS ENUM('sorted', 'travel', 'refresh');

  CREATE TABLE "pwa" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "before_image_id" integer,
   "after_image_id" integer,
   "block_name" varchar
  );

  CREATE TABLE "pwa_locales" (
   "heading" jsonb,
   "dek" jsonb,
   "intro" varchar,
   "before_label" varchar,
   "after_label" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pwa_calls" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "icon" "enum_pwa_calls_icon" DEFAULT 'sorted'
  );

  CREATE TABLE "pwa_calls_locales" (
   "title" varchar,
   "description" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pwa_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "before_image_id" integer,
   "after_image_id" integer,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pwa_v_locales" (
   "heading" jsonb,
   "dek" jsonb,
   "intro" varchar,
   "before_label" varchar,
   "after_label" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pwa_v_calls" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "icon" "enum__pwa_v_calls_icon" DEFAULT 'sorted',
   "_uuid" varchar
  );

  CREATE TABLE "_pwa_v_calls_locales" (
   "title" varchar,
   "description" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pwa" ADD CONSTRAINT "pwa_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pwa" ADD CONSTRAINT "pwa_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pwa" ADD CONSTRAINT "pwa_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pwa_locales" ADD CONSTRAINT "pwa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pwa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pwa_calls" ADD CONSTRAINT "pwa_calls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pwa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pwa_calls_locales" ADD CONSTRAINT "pwa_calls_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pwa_calls"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pwa_v" ADD CONSTRAINT "_pwa_v_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pwa_v" ADD CONSTRAINT "_pwa_v_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pwa_v" ADD CONSTRAINT "_pwa_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pwa_v_locales" ADD CONSTRAINT "_pwa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pwa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pwa_v_calls" ADD CONSTRAINT "_pwa_v_calls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pwa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pwa_v_calls_locales" ADD CONSTRAINT "_pwa_v_calls_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pwa_v_calls"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pwa_order_idx" ON "pwa" USING btree ("_order");
  CREATE INDEX "pwa_parent_id_idx" ON "pwa" USING btree ("_parent_id");
  CREATE INDEX "pwa_path_idx" ON "pwa" USING btree ("_path");
  CREATE INDEX "pwa_before_image_idx" ON "pwa" USING btree ("before_image_id");
  CREATE INDEX "pwa_after_image_idx" ON "pwa" USING btree ("after_image_id");
  CREATE UNIQUE INDEX "pwa_locales_locale_parent_id_unique" ON "pwa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pwa_calls_order_idx" ON "pwa_calls" USING btree ("_order");
  CREATE INDEX "pwa_calls_parent_id_idx" ON "pwa_calls" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pwa_calls_locales_locale_parent_id_unique" ON "pwa_calls_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pwa_v_order_idx" ON "_pwa_v" USING btree ("_order");
  CREATE INDEX "_pwa_v_parent_id_idx" ON "_pwa_v" USING btree ("_parent_id");
  CREATE INDEX "_pwa_v_path_idx" ON "_pwa_v" USING btree ("_path");
  CREATE INDEX "_pwa_v_before_image_idx" ON "_pwa_v" USING btree ("before_image_id");
  CREATE INDEX "_pwa_v_after_image_idx" ON "_pwa_v" USING btree ("after_image_id");
  CREATE UNIQUE INDEX "_pwa_v_locales_locale_parent_id_unique" ON "_pwa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pwa_v_calls_order_idx" ON "_pwa_v_calls" USING btree ("_order");
  CREATE INDEX "_pwa_v_calls_parent_id_idx" ON "_pwa_v_calls" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pwa_v_calls_locales_locale_parent_id_unique" ON "_pwa_v_calls_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pwa_calls_locales";
  DROP TABLE IF EXISTS "pwa_calls";
  DROP TABLE IF EXISTS "pwa_locales";
  DROP TABLE IF EXISTS "pwa";

  DROP TABLE IF EXISTS "_pwa_v_calls_locales";
  DROP TABLE IF EXISTS "_pwa_v_calls";
  DROP TABLE IF EXISTS "_pwa_v_locales";
  DROP TABLE IF EXISTS "_pwa_v";

  DROP TYPE IF EXISTS "public"."enum_pwa_calls_icon";
  DROP TYPE IF EXISTS "public"."enum__pwa_v_calls_icon";
  `)
}
