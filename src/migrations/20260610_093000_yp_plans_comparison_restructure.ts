import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- ── drop old comparison "rows" model ─────────────────────────────────────
   DROP TABLE "pages_blocks_yp_plans_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_rows_locales" CASCADE;

  ALTER TABLE "pages_blocks_yp_plans" DROP COLUMN IF EXISTS "comparison_core_cta_url";
  ALTER TABLE "pages_blocks_yp_plans" DROP COLUMN IF EXISTS "comparison_adv_cta_url";
  ALTER TABLE "_pages_v_blocks_yp_plans" DROP COLUMN IF EXISTS "comparison_core_cta_url";
  ALTER TABLE "_pages_v_blocks_yp_plans" DROP COLUMN IF EXISTS "comparison_adv_cta_url";

  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_label";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_price";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_label";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_price";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_price_period";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_cta_label";
  ALTER TABLE "pages_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_cta_label";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_label";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_price";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_label";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_price";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_price_period";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_core_cta_label";
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DROP COLUMN IF EXISTS "comparison_adv_cta_label";

  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_plans_comparison_rows_row_type";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_plans_comparison_rows_core_kind";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_plans_comparison_rows_adv_kind";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_plans_comparison_rows_row_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_plans_comparison_rows_core_kind";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_plans_comparison_rows_adv_kind";

  -- ── new enums ────────────────────────────────────────────────────────────
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_cards_cta_style" AS ENUM('out', 'lime');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_cards_cta_style" AS ENUM('out', 'lime');

  -- ── sections + rows + cards (main) ───────────────────────────────────────
  CREATE TABLE "pages_blocks_yp_plans_comparison_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_yp_plans_comparison_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_yp_plans_comparison_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_yp_plans_comparison_sections_rows_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_yp_plans_comparison_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight" boolean DEFAULT false,
  	"features" jsonb,
  	"cta_url" varchar,
  	"cta_style" "enum_pages_blocks_yp_plans_comparison_cards_cta_style" DEFAULT 'out'
  );

  CREATE TABLE "pages_blocks_yp_plans_comparison_cards_locales" (
  	"label" varchar,
  	"price" varchar,
  	"price_period" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  -- ── sections + rows + cards (versions) ───────────────────────────────────
  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"highlight" boolean DEFAULT false,
  	"features" jsonb,
  	"cta_url" varchar,
  	"cta_style" "enum__pages_v_blocks_yp_plans_comparison_cards_cta_style" DEFAULT 'out',
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" (
  	"label" varchar,
  	"price" varchar,
  	"price_period" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  -- ── foreign keys ─────────────────────────────────────────────────────────
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections" ADD CONSTRAINT "yp_plans_cmp_sec_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_locales" ADD CONSTRAINT "yp_plans_cmp_sec_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_comparison_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" ADD CONSTRAINT "yp_plans_cmp_sec_rows_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_comparison_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows_locales" ADD CONSTRAINT "yp_plans_cmp_sec_rows_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_comparison_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" ADD CONSTRAINT "yp_plans_cmp_cards_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" ADD CONSTRAINT "yp_plans_cmp_cards_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_comparison_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections" ADD CONSTRAINT "v_yp_plans_cmp_sec_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_locales" ADD CONSTRAINT "v_yp_plans_cmp_sec_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_comparison_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" ADD CONSTRAINT "v_yp_plans_cmp_sec_rows_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_comparison_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" ADD CONSTRAINT "v_yp_plans_cmp_sec_rows_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_comparison_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" ADD CONSTRAINT "v_yp_plans_cmp_cards_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" ADD CONSTRAINT "v_yp_plans_cmp_cards_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_comparison_cards"("id") ON DELETE cascade ON UPDATE no action;

  -- ── indexes ──────────────────────────────────────────────────────────────
  CREATE INDEX "yp_plans_cmp_sec_order_idx" ON "pages_blocks_yp_plans_comparison_sections" USING btree ("_order");
  CREATE INDEX "yp_plans_cmp_sec_parent_idx" ON "pages_blocks_yp_plans_comparison_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_plans_cmp_sec_loc_uniq" ON "pages_blocks_yp_plans_comparison_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_plans_cmp_sec_rows_order_idx" ON "pages_blocks_yp_plans_comparison_sections_rows" USING btree ("_order");
  CREATE INDEX "yp_plans_cmp_sec_rows_parent_idx" ON "pages_blocks_yp_plans_comparison_sections_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_plans_cmp_sec_rows_loc_uniq" ON "pages_blocks_yp_plans_comparison_sections_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_plans_cmp_cards_order_idx" ON "pages_blocks_yp_plans_comparison_cards" USING btree ("_order");
  CREATE INDEX "yp_plans_cmp_cards_parent_idx" ON "pages_blocks_yp_plans_comparison_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_plans_cmp_cards_loc_uniq" ON "pages_blocks_yp_plans_comparison_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_plans_cmp_sec_order_idx" ON "_pages_v_blocks_yp_plans_comparison_sections" USING btree ("_order");
  CREATE INDEX "v_yp_plans_cmp_sec_parent_idx" ON "_pages_v_blocks_yp_plans_comparison_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_plans_cmp_sec_loc_uniq" ON "_pages_v_blocks_yp_plans_comparison_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_plans_cmp_sec_rows_order_idx" ON "_pages_v_blocks_yp_plans_comparison_sections_rows" USING btree ("_order");
  CREATE INDEX "v_yp_plans_cmp_sec_rows_parent_idx" ON "_pages_v_blocks_yp_plans_comparison_sections_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_plans_cmp_sec_rows_loc_uniq" ON "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_plans_cmp_cards_order_idx" ON "_pages_v_blocks_yp_plans_comparison_cards" USING btree ("_order");
  CREATE INDEX "v_yp_plans_cmp_cards_parent_idx" ON "_pages_v_blocks_yp_plans_comparison_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_plans_cmp_cards_loc_uniq" ON "_pages_v_blocks_yp_plans_comparison_cards_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- drop new model
   DROP TABLE "pages_blocks_yp_plans_comparison_sections" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_plans_comparison_cards_cta_style";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_plans_comparison_cards_cta_style";

  -- restore old "rows" model
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_row_type" AS ENUM('feature', 'group');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_core_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_adv_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_row_type" AS ENUM('feature', 'group');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_core_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_adv_kind" AS ENUM('check', 'cross', 'text');

  ALTER TABLE "pages_blocks_yp_plans" ADD COLUMN "comparison_core_cta_url" varchar;
  ALTER TABLE "pages_blocks_yp_plans" ADD COLUMN "comparison_adv_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans" ADD COLUMN "comparison_core_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans" ADD COLUMN "comparison_adv_cta_url" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_core_label" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_core_price" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_label" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_price" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_price_period" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_core_cta_label" varchar;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_cta_label" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_core_label" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_core_price" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_label" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_price" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_price_period" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_core_cta_label" varchar;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD COLUMN "comparison_adv_cta_label" varchar;

  CREATE TABLE "pages_blocks_yp_plans_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"row_type" "enum_pages_blocks_yp_plans_comparison_rows_row_type" DEFAULT 'feature',
  	"core_kind" "enum_pages_blocks_yp_plans_comparison_rows_core_kind" DEFAULT 'check',
  	"adv_kind" "enum_pages_blocks_yp_plans_comparison_rows_adv_kind" DEFAULT 'check'
  );
  CREATE TABLE "pages_blocks_yp_plans_comparison_rows_locales" (
  	"group_label" varchar,
  	"label" varchar,
  	"core_value" varchar,
  	"core_sub" varchar,
  	"adv_value" varchar,
  	"adv_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"row_type" "enum__pages_v_blocks_yp_plans_comparison_rows_row_type" DEFAULT 'feature',
  	"core_kind" "enum__pages_v_blocks_yp_plans_comparison_rows_core_kind" DEFAULT 'check',
  	"adv_kind" "enum__pages_v_blocks_yp_plans_comparison_rows_adv_kind" DEFAULT 'check',
  	"_uuid" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_plans_comparison_rows_locales" (
  	"group_label" varchar,
  	"label" varchar,
  	"core_value" varchar,
  	"core_sub" varchar,
  	"adv_value" varchar,
  	"adv_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );`)
}
