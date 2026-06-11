import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_plans_plan_cards_cta_style" AS ENUM('out', 'cta');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_row_type" AS ENUM('feature', 'group');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_core_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_adv_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_guarantee_items_icon" AS ENUM('clock', 'cycle', 'capsule', 'none');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_background_color" AS ENUM('cream', 'paper', 'off', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_plans_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_plan_cards_cta_style" AS ENUM('out', 'cta');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_row_type" AS ENUM('feature', 'group');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_core_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_adv_kind" AS ENUM('check', 'cross', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_guarantee_items_icon" AS ENUM('clock', 'cycle', 'capsule', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_background_color" AS ENUM('cream', 'paper', 'off', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_plans_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_plans_plan_cards_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_plans_plan_cards_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_plans_plan_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"featured" boolean DEFAULT false,
  	"cta_url" varchar,
  	"cta_style" "enum_pages_blocks_yp_plans_plan_cards_cta_style" DEFAULT 'out'
  );
  
  CREATE TABLE "pages_blocks_yp_plans_plan_cards_locales" (
  	"badge" varchar,
  	"name" varchar,
  	"tag" varchar,
  	"price" varchar,
  	"price_period" varchar DEFAULT '/mo',
  	"monthly" varchar,
  	"commit" varchar,
  	"list_label" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "pages_blocks_yp_plans_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_yp_plans_guarantee_items_icon" DEFAULT 'clock'
  );
  
  CREATE TABLE "pages_blocks_yp_plans_guarantee_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_plans_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_plans_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"show_comparison" boolean DEFAULT true,
  	"comparison_core_cta_url" varchar,
  	"comparison_adv_cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_plans_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"comparison_toggle_label_closed" varchar DEFAULT 'Compare side by side',
  	"comparison_toggle_label_open" varchar DEFAULT 'Hide full comparison',
  	"comparison_core_label" varchar DEFAULT 'Core',
  	"comparison_core_price" varchar DEFAULT '€99',
  	"comparison_adv_label" varchar DEFAULT 'Advanced',
  	"comparison_adv_price" varchar DEFAULT '€149',
  	"comparison_price_period" varchar DEFAULT '/mo',
  	"comparison_core_cta_label" varchar DEFAULT 'Start with Core',
  	"comparison_adv_cta_label" varchar DEFAULT 'Start with Advanced',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_plan_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured" boolean DEFAULT false,
  	"cta_url" varchar,
  	"cta_style" "enum__pages_v_blocks_yp_plans_plan_cards_cta_style" DEFAULT 'out',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" (
  	"badge" varchar,
  	"name" varchar,
  	"tag" varchar,
  	"price" varchar,
  	"price_period" varchar DEFAULT '/mo',
  	"monthly" varchar,
  	"commit" varchar,
  	"list_label" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_yp_plans_guarantee_items_icon" DEFAULT 'clock',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_guarantee_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_plans_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_plans_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"show_comparison" boolean DEFAULT true,
  	"comparison_core_cta_url" varchar,
  	"comparison_adv_cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_plans_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"comparison_toggle_label_closed" varchar DEFAULT 'Compare side by side',
  	"comparison_toggle_label_open" varchar DEFAULT 'Hide full comparison',
  	"comparison_core_label" varchar DEFAULT 'Core',
  	"comparison_core_price" varchar DEFAULT '€99',
  	"comparison_adv_label" varchar DEFAULT 'Advanced',
  	"comparison_adv_price" varchar DEFAULT '€149',
  	"comparison_price_period" varchar DEFAULT '/mo',
  	"comparison_core_cta_label" varchar DEFAULT 'Start with Core',
  	"comparison_adv_cta_label" varchar DEFAULT 'Start with Advanced',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_list_items" ADD CONSTRAINT "pages_blocks_yp_plans_plan_cards_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_plan_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_list_items_locales" ADD CONSTRAINT "pages_blocks_yp_plans_plan_cards_list_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_plan_cards_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards" ADD CONSTRAINT "pages_blocks_yp_plans_plan_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" ADD CONSTRAINT "pages_blocks_yp_plans_plan_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_plan_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_rows" ADD CONSTRAINT "pages_blocks_yp_plans_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_comparison_rows_locales" ADD CONSTRAINT "pages_blocks_yp_plans_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_guarantee_items" ADD CONSTRAINT "pages_blocks_yp_plans_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_guarantee_items_locales" ADD CONSTRAINT "pages_blocks_yp_plans_guarantee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans" ADD CONSTRAINT "pages_blocks_yp_plans_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans" ADD CONSTRAINT "pages_blocks_yp_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_plans_locales" ADD CONSTRAINT "pages_blocks_yp_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items" ADD CONSTRAINT "_pages_v_blocks_yp_plans_plan_cards_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_plan_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" ADD CONSTRAINT "_pages_v_blocks_yp_plans_plan_cards_list_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_plan_cards_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" ADD CONSTRAINT "_pages_v_blocks_yp_plans_plan_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" ADD CONSTRAINT "_pages_v_blocks_yp_plans_plan_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_plan_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_rows" ADD CONSTRAINT "_pages_v_blocks_yp_plans_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_rows_locales" ADD CONSTRAINT "_pages_v_blocks_yp_plans_comparison_rows_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_guarantee_items" ADD CONSTRAINT "_pages_v_blocks_yp_plans_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_guarantee_items_locales" ADD CONSTRAINT "_pages_v_blocks_yp_plans_guarantee_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans" ADD CONSTRAINT "_pages_v_blocks_yp_plans_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans" ADD CONSTRAINT "_pages_v_blocks_yp_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" ADD CONSTRAINT "_pages_v_blocks_yp_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_plans_plan_cards_list_items_order_idx" ON "pages_blocks_yp_plans_plan_cards_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_plans_plan_cards_list_items_parent_id_idx" ON "pages_blocks_yp_plans_plan_cards_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_plans_plan_cards_list_items_locales_locale_p" ON "pages_blocks_yp_plans_plan_cards_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_plans_plan_cards_order_idx" ON "pages_blocks_yp_plans_plan_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_plans_plan_cards_parent_id_idx" ON "pages_blocks_yp_plans_plan_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_plans_plan_cards_locales_locale_parent_id_un" ON "pages_blocks_yp_plans_plan_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_plans_comparison_rows_order_idx" ON "pages_blocks_yp_plans_comparison_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_plans_comparison_rows_parent_id_idx" ON "pages_blocks_yp_plans_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_plans_comparison_rows_locales_locale_parent_" ON "pages_blocks_yp_plans_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_plans_guarantee_items_order_idx" ON "pages_blocks_yp_plans_guarantee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_plans_guarantee_items_parent_id_idx" ON "pages_blocks_yp_plans_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_plans_guarantee_items_locales_locale_parent_" ON "pages_blocks_yp_plans_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_plans_order_idx" ON "pages_blocks_yp_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_plans_parent_id_idx" ON "pages_blocks_yp_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_plans_path_idx" ON "pages_blocks_yp_plans" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_plans_background_image_idx" ON "pages_blocks_yp_plans" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_plans_locales_locale_parent_id_unique" ON "pages_blocks_yp_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_plan_cards_list_items_order_idx" ON "_pages_v_blocks_yp_plans_plan_cards_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_plans_plan_cards_list_items_parent_id_idx" ON "_pages_v_blocks_yp_plans_plan_cards_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_plans_plan_cards_list_items_locales_local" ON "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_plan_cards_order_idx" ON "_pages_v_blocks_yp_plans_plan_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_plans_plan_cards_parent_id_idx" ON "_pages_v_blocks_yp_plans_plan_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_plans_plan_cards_locales_locale_parent_id" ON "_pages_v_blocks_yp_plans_plan_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_comparison_rows_order_idx" ON "_pages_v_blocks_yp_plans_comparison_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_plans_comparison_rows_parent_id_idx" ON "_pages_v_blocks_yp_plans_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_plans_comparison_rows_locales_locale_pare" ON "_pages_v_blocks_yp_plans_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_guarantee_items_order_idx" ON "_pages_v_blocks_yp_plans_guarantee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_plans_guarantee_items_parent_id_idx" ON "_pages_v_blocks_yp_plans_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_plans_guarantee_items_locales_locale_pare" ON "_pages_v_blocks_yp_plans_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_order_idx" ON "_pages_v_blocks_yp_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_plans_parent_id_idx" ON "_pages_v_blocks_yp_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_plans_path_idx" ON "_pages_v_blocks_yp_plans" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_plans_background_image_idx" ON "_pages_v_blocks_yp_plans" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_plans_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_plans_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_plans_plan_cards_list_items" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards_list_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_guarantee_items" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_guarantee_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_guarantee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_guarantee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_plans_plan_cards_cta_style";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_row_type";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_core_kind";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_rows_adv_kind";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_guarantee_items_icon";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_plan_cards_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_row_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_core_kind";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_rows_adv_kind";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_guarantee_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_background_type";`)
}
