import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'pll' is set
// on the block because the nested "milestones" array pushes the default
// prefix's locale index name past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pll" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "pll_locales" (
   "heading" jsonb,
   "lede" varchar,
   "origin_label" varchar,
   "core_name" varchar,
   "core_copy" varchar,
   "advanced_name" varchar,
   "advanced_badge" varchar,
   "advanced_copy" varchar,
   "compare_label" varchar,
   "compare_url" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pll_milestones" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "muted" boolean DEFAULT false
  );

  CREATE TABLE "pll_milestones_locales" (
   "label" varchar,
   "month" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pll_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pll_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "origin_label" varchar,
   "core_name" varchar,
   "core_copy" varchar,
   "advanced_name" varchar,
   "advanced_badge" varchar,
   "advanced_copy" varchar,
   "compare_label" varchar,
   "compare_url" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pll_v_milestones" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "muted" boolean DEFAULT false,
   "_uuid" varchar
  );

  CREATE TABLE "_pll_v_milestones_locales" (
   "label" varchar,
   "month" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pll" ADD CONSTRAINT "pll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pll_locales" ADD CONSTRAINT "pll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pll_milestones" ADD CONSTRAINT "pll_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pll_milestones_locales" ADD CONSTRAINT "pll_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pll_milestones"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pll_v" ADD CONSTRAINT "_pll_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pll_v_locales" ADD CONSTRAINT "_pll_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pll_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pll_v_milestones" ADD CONSTRAINT "_pll_v_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pll_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pll_v_milestones_locales" ADD CONSTRAINT "_pll_v_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pll_v_milestones"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pll_order_idx" ON "pll" USING btree ("_order");
  CREATE INDEX "pll_parent_id_idx" ON "pll" USING btree ("_parent_id");
  CREATE INDEX "pll_path_idx" ON "pll" USING btree ("_path");
  CREATE UNIQUE INDEX "pll_locales_locale_parent_id_unique" ON "pll_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pll_milestones_order_idx" ON "pll_milestones" USING btree ("_order");
  CREATE INDEX "pll_milestones_parent_id_idx" ON "pll_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pll_milestones_locales_locale_parent_id_unique" ON "pll_milestones_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pll_v_order_idx" ON "_pll_v" USING btree ("_order");
  CREATE INDEX "_pll_v_parent_id_idx" ON "_pll_v" USING btree ("_parent_id");
  CREATE INDEX "_pll_v_path_idx" ON "_pll_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_pll_v_locales_locale_parent_id_unique" ON "_pll_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pll_v_milestones_order_idx" ON "_pll_v_milestones" USING btree ("_order");
  CREATE INDEX "_pll_v_milestones_parent_id_idx" ON "_pll_v_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pll_v_milestones_locales_locale_parent_id_unique" ON "_pll_v_milestones_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pll_milestones_locales";
  DROP TABLE IF EXISTS "pll_milestones";
  DROP TABLE IF EXISTS "pll_locales";
  DROP TABLE IF EXISTS "pll";

  DROP TABLE IF EXISTS "_pll_v_milestones_locales";
  DROP TABLE IF EXISTS "_pll_v_milestones";
  DROP TABLE IF EXISTS "_pll_v_locales";
  DROP TABLE IF EXISTS "_pll_v";
  `)
}
