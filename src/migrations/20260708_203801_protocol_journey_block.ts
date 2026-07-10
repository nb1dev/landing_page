import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. dbName:'prj' is set
// on the block because the default prefix (pages_blocks_protocol_journey_...)
// pushes the "steps" array's locale index name past Postgres's 63-char limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prj_steps_icon" AS ENUM('kit', 'collect', 'lab', 'clock', 'delivery');
  CREATE TYPE "public"."enum__prj_v_steps_icon" AS ENUM('kit', 'collect', 'lab', 'clock', 'delivery');

  CREATE TABLE "prj" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "prj_locales" (
   "heading" jsonb,
   "lede" varchar,
   "paygate_title" varchar,
   "paygate_description" jsonb,
   "under_badge" varchar,
   "footnote" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "prj_steps" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "icon" "enum_prj_steps_icon" DEFAULT 'kit',
   "is_pay_step" boolean DEFAULT false
  );

  CREATE TABLE "prj_steps_locales" (
   "day_range" varchar,
   "name" varchar,
   "description" varchar,
   "pay_tag_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_prj_v" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_prj_v_locales" (
   "heading" jsonb,
   "lede" varchar,
   "paygate_title" varchar,
   "paygate_description" jsonb,
   "under_badge" varchar,
   "footnote" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_prj_v_steps" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "icon" "enum__prj_v_steps_icon" DEFAULT 'kit',
   "is_pay_step" boolean DEFAULT false,
   "_uuid" varchar
  );

  CREATE TABLE "_prj_v_steps_locales" (
   "day_range" varchar,
   "name" varchar,
   "description" varchar,
   "pay_tag_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "prj" ADD CONSTRAINT "prj_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prj_locales" ADD CONSTRAINT "prj_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prj"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prj_steps" ADD CONSTRAINT "prj_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prj"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prj_steps_locales" ADD CONSTRAINT "prj_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prj_steps"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_prj_v" ADD CONSTRAINT "_prj_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prj_v_locales" ADD CONSTRAINT "_prj_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prj_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prj_v_steps" ADD CONSTRAINT "_prj_v_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prj_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_prj_v_steps_locales" ADD CONSTRAINT "_prj_v_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_prj_v_steps"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "prj_order_idx" ON "prj" USING btree ("_order");
  CREATE INDEX "prj_parent_id_idx" ON "prj" USING btree ("_parent_id");
  CREATE INDEX "prj_path_idx" ON "prj" USING btree ("_path");
  CREATE UNIQUE INDEX "prj_locales_locale_parent_id_unique" ON "prj_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "prj_steps_order_idx" ON "prj_steps" USING btree ("_order");
  CREATE INDEX "prj_steps_parent_id_idx" ON "prj_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "prj_steps_locales_locale_parent_id_unique" ON "prj_steps_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_prj_v_order_idx" ON "_prj_v" USING btree ("_order");
  CREATE INDEX "_prj_v_parent_id_idx" ON "_prj_v" USING btree ("_parent_id");
  CREATE INDEX "_prj_v_path_idx" ON "_prj_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_prj_v_locales_locale_parent_id_unique" ON "_prj_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_prj_v_steps_order_idx" ON "_prj_v_steps" USING btree ("_order");
  CREATE INDEX "_prj_v_steps_parent_id_idx" ON "_prj_v_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_prj_v_steps_locales_locale_parent_id_unique" ON "_prj_v_steps_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "prj_locales";
  DROP TABLE IF EXISTS "prj_steps_locales";
  DROP TABLE IF EXISTS "prj_steps";
  DROP TABLE IF EXISTS "prj";

  DROP TABLE IF EXISTS "_prj_v_locales";
  DROP TABLE IF EXISTS "_prj_v_steps_locales";
  DROP TABLE IF EXISTS "_prj_v_steps";
  DROP TABLE IF EXISTS "_prj_v";

  DROP TYPE IF EXISTS "public"."enum_prj_steps_icon";
  DROP TYPE IF EXISTS "public"."enum__prj_v_steps_icon";
  `)
}
