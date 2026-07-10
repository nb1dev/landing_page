import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'pcs' is set
// on the block because the nested "faces"/"stats" arrays push the default
// prefix's locale index names past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pcs" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "pcs_locales" (
   "headline" varchar,
   "body" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pcs_faces" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar
  );

  CREATE TABLE "pcs_stats" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pcs_stats_locales" (
   "value" varchar,
   "label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pcs_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pcs_v_locales" (
   "headline" varchar,
   "body" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pcs_v_faces" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar,
   "_uuid" varchar
  );

  CREATE TABLE "_pcs_v_stats" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_pcs_v_stats_locales" (
   "value" varchar,
   "label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pcs" ADD CONSTRAINT "pcs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcs_locales" ADD CONSTRAINT "pcs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcs_faces" ADD CONSTRAINT "pcs_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pcs_faces" ADD CONSTRAINT "pcs_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcs_stats" ADD CONSTRAINT "pcs_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcs_stats_locales" ADD CONSTRAINT "pcs_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcs_stats"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pcs_v" ADD CONSTRAINT "_pcs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcs_v_locales" ADD CONSTRAINT "_pcs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcs_v_faces" ADD CONSTRAINT "_pcs_v_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pcs_v_faces" ADD CONSTRAINT "_pcs_v_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcs_v_stats" ADD CONSTRAINT "_pcs_v_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcs_v_stats_locales" ADD CONSTRAINT "_pcs_v_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcs_v_stats"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pcs_order_idx" ON "pcs" USING btree ("_order");
  CREATE INDEX "pcs_parent_id_idx" ON "pcs" USING btree ("_parent_id");
  CREATE INDEX "pcs_path_idx" ON "pcs" USING btree ("_path");
  CREATE UNIQUE INDEX "pcs_locales_locale_parent_id_unique" ON "pcs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pcs_faces_order_idx" ON "pcs_faces" USING btree ("_order");
  CREATE INDEX "pcs_faces_parent_id_idx" ON "pcs_faces" USING btree ("_parent_id");
  CREATE INDEX "pcs_faces_image_idx" ON "pcs_faces" USING btree ("image_id");
  CREATE INDEX "pcs_stats_order_idx" ON "pcs_stats" USING btree ("_order");
  CREATE INDEX "pcs_stats_parent_id_idx" ON "pcs_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pcs_stats_locales_locale_parent_id_unique" ON "pcs_stats_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pcs_v_order_idx" ON "_pcs_v" USING btree ("_order");
  CREATE INDEX "_pcs_v_parent_id_idx" ON "_pcs_v" USING btree ("_parent_id");
  CREATE INDEX "_pcs_v_path_idx" ON "_pcs_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_pcs_v_locales_locale_parent_id_unique" ON "_pcs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pcs_v_faces_order_idx" ON "_pcs_v_faces" USING btree ("_order");
  CREATE INDEX "_pcs_v_faces_parent_id_idx" ON "_pcs_v_faces" USING btree ("_parent_id");
  CREATE INDEX "_pcs_v_faces_image_idx" ON "_pcs_v_faces" USING btree ("image_id");
  CREATE INDEX "_pcs_v_stats_order_idx" ON "_pcs_v_stats" USING btree ("_order");
  CREATE INDEX "_pcs_v_stats_parent_id_idx" ON "_pcs_v_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pcs_v_stats_locales_locale_parent_id_unique" ON "_pcs_v_stats_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pcs_faces";
  DROP TABLE IF EXISTS "pcs_stats_locales";
  DROP TABLE IF EXISTS "pcs_stats";
  DROP TABLE IF EXISTS "pcs_locales";
  DROP TABLE IF EXISTS "pcs";

  DROP TABLE IF EXISTS "_pcs_v_faces";
  DROP TABLE IF EXISTS "_pcs_v_stats_locales";
  DROP TABLE IF EXISTS "_pcs_v_stats";
  DROP TABLE IF EXISTS "_pcs_v_locales";
  DROP TABLE IF EXISTS "_pcs_v";
  `)
}
