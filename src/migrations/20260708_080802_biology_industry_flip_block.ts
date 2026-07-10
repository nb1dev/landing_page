import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed
// tableNameMap (not guessed) — see BiologyReadingToFormula's migration for
// why dbName:'bif' is set on the block.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "bif" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "bif_locales" (
   "heading" jsonb,
   "lede" varchar,
   "closing_text" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "bif_stats" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "bif_stats_locales" (
   "number" varchar,
   "unit" varchar,
   "tag" varchar,
   "front_text" varchar,
   "back_text" varchar,
   "read_more_label" varchar,
   "back_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_bif_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_bif_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "closing_text" jsonb,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_bif_v_stats" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_bif_v_stats_locales" (
   "number" varchar,
   "unit" varchar,
   "tag" varchar,
   "front_text" varchar,
   "back_text" varchar,
   "read_more_label" varchar,
   "back_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "bif" ADD CONSTRAINT "bif_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bif_locales" ADD CONSTRAINT "bif_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bif"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bif_stats" ADD CONSTRAINT "bif_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bif"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bif_stats_locales" ADD CONSTRAINT "bif_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bif_stats"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_bif_v" ADD CONSTRAINT "_bif_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bif_v_locales" ADD CONSTRAINT "_bif_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bif_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bif_v_stats" ADD CONSTRAINT "_bif_v_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bif_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bif_v_stats_locales" ADD CONSTRAINT "_bif_v_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bif_v_stats"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "bif_order_idx" ON "bif" USING btree ("_order");
  CREATE INDEX "bif_parent_id_idx" ON "bif" USING btree ("_parent_id");
  CREATE INDEX "bif_path_idx" ON "bif" USING btree ("_path");
  CREATE UNIQUE INDEX "bif_locales_locale_parent_id_unique" ON "bif_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bif_stats_order_idx" ON "bif_stats" USING btree ("_order");
  CREATE INDEX "bif_stats_parent_id_idx" ON "bif_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bif_stats_locales_locale_parent_id_unique" ON "bif_stats_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_bif_v_order_idx" ON "_bif_v" USING btree ("_order");
  CREATE INDEX "_bif_v_parent_id_idx" ON "_bif_v" USING btree ("_parent_id");
  CREATE INDEX "_bif_v_path_idx" ON "_bif_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_bif_v_locales_locale_parent_id_unique" ON "_bif_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bif_v_stats_order_idx" ON "_bif_v_stats" USING btree ("_order");
  CREATE INDEX "_bif_v_stats_parent_id_idx" ON "_bif_v_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bif_v_stats_locales_locale_parent_id_unique" ON "_bif_v_stats_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "bif_stats_locales";
  DROP TABLE IF EXISTS "bif_stats";
  DROP TABLE IF EXISTS "bif_locales";
  DROP TABLE IF EXISTS "bif";

  DROP TABLE IF EXISTS "_bif_v_stats_locales";
  DROP TABLE IF EXISTS "_bif_v_stats";
  DROP TABLE IF EXISTS "_bif_v_locales";
  DROP TABLE IF EXISTS "_bif_v";
  `)
}
