import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_evolution_band_biology_deltas_direction" AS ENUM('up', 'down', 'new');
  CREATE TYPE "public"."enum_pages_blocks_evolution_band_cycle2_items_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added');
  CREATE TYPE "public"."enum_pages_blocks_evolution_band_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_evolution_band_biology_deltas_direction" AS ENUM('up', 'down', 'new');
  CREATE TYPE "public"."enum__pages_v_blocks_evolution_band_cycle2_items_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added');
  CREATE TYPE "public"."enum__pages_v_blocks_evolution_band_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_posts_source" AS ENUM('manual', 'api');
  CREATE TYPE "public"."enum__posts_v_version_source" AS ENUM('manual', 'api');
  CREATE TABLE "pages_blocks_early_access_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar
  );
  
  CREATE TABLE "pages_blocks_early_access_variants_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"headline" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_early_access" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_early_access_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"headline" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band_cycle1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dose" varchar
  );
  
  CREATE TABLE "pages_blocks_evolution_band_cycle1_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band_biology_deltas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum_pages_blocks_evolution_band_biology_deltas_direction"
  );
  
  CREATE TABLE "pages_blocks_evolution_band_biology_deltas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band_cycle2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"status" "enum_pages_blocks_evolution_band_cycle2_items_status" DEFAULT 'unchanged'
  );
  
  CREATE TABLE "pages_blocks_evolution_band_cycle2_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color_mode" "enum_pages_blocks_evolution_band_color_mode" DEFAULT 'light',
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_evolution_band_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_italic" varchar,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"biology_eyebrow" varchar,
  	"cycle2_footer" varchar,
  	"caption" varchar,
  	"caption_highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_early_access_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_early_access_variants_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"headline" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_early_access" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_early_access_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"headline" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_cycle1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_biology_deltas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum__pages_v_blocks_evolution_band_biology_deltas_direction",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_biology_deltas_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_cycle2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"status" "enum__pages_v_blocks_evolution_band_cycle2_items_status" DEFAULT 'unchanged',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"color_mode" "enum__pages_v_blocks_evolution_band_color_mode" DEFAULT 'light',
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_italic" varchar,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"biology_eyebrow" varchar,
  	"cycle2_footer" varchar,
  	"caption" varchar,
  	"caption_highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_fk";
  
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_par_fk";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_image_fk";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_par_fk";
  
  DROP INDEX "psc_panel_thumbs_locales_locale_parent_unique";
  DROP INDEX "_pages_v_psc_panel_thumbs_locales_locale_parent_unique";
  ALTER TABLE "posts" ADD COLUMN "source" "enum_posts_source" DEFAULT 'manual';
  ALTER TABLE "posts" ADD COLUMN "html_content" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_source" "enum__posts_v_version_source" DEFAULT 'manual';
  ALTER TABLE "_posts_v" ADD COLUMN "version_html_content" varchar;
  ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
  ALTER TABLE "pages_blocks_early_access_variants" ADD CONSTRAINT "pages_blocks_early_access_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access_variants_locales" ADD CONSTRAINT "pages_blocks_early_access_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access" ADD CONSTRAINT "pages_blocks_early_access_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access" ADD CONSTRAINT "pages_blocks_early_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access_locales" ADD CONSTRAINT "pages_blocks_early_access_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items" ADD CONSTRAINT "pages_blocks_evolution_band_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items_locales" ADD CONSTRAINT "pages_blocks_evolution_band_cycle1_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_biology_deltas" ADD CONSTRAINT "pages_blocks_evolution_band_biology_deltas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_biology_deltas_locales" ADD CONSTRAINT "pages_blocks_evolution_band_biology_deltas_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_biology_deltas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items" ADD CONSTRAINT "pages_blocks_evolution_band_cycle2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items_locales" ADD CONSTRAINT "pages_blocks_evolution_band_cycle2_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_cycle2_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band" ADD CONSTRAINT "pages_blocks_evolution_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_locales" ADD CONSTRAINT "pages_blocks_evolution_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_variants" ADD CONSTRAINT "_pages_v_blocks_early_access_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_variants_locales" ADD CONSTRAINT "_pages_v_blocks_early_access_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access" ADD CONSTRAINT "_pages_v_blocks_early_access_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access" ADD CONSTRAINT "_pages_v_blocks_early_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_locales" ADD CONSTRAINT "_pages_v_blocks_early_access_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle1_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_biology_deltas" ADD CONSTRAINT "_pages_v_blocks_evolution_band_biology_deltas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_biology_deltas_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_biology_deltas_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_biology_deltas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle2_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_cycle2_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band" ADD CONSTRAINT "_pages_v_blocks_evolution_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_early_access_variants_order_idx" ON "pages_blocks_early_access_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_early_access_variants_parent_id_idx" ON "pages_blocks_early_access_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_early_access_variants_locales_locale_parent_id_" ON "pages_blocks_early_access_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_early_access_order_idx" ON "pages_blocks_early_access" USING btree ("_order");
  CREATE INDEX "pages_blocks_early_access_parent_id_idx" ON "pages_blocks_early_access" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_early_access_path_idx" ON "pages_blocks_early_access" USING btree ("_path");
  CREATE INDEX "pages_blocks_early_access_form_idx" ON "pages_blocks_early_access" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_early_access_locales_locale_parent_id_unique" ON "pages_blocks_early_access_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_cycle1_items_order_idx" ON "pages_blocks_evolution_band_cycle1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_cycle1_items_parent_id_idx" ON "pages_blocks_evolution_band_cycle1_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_cycle1_items_locales_locale_pare" ON "pages_blocks_evolution_band_cycle1_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_biology_deltas_order_idx" ON "pages_blocks_evolution_band_biology_deltas" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_biology_deltas_parent_id_idx" ON "pages_blocks_evolution_band_biology_deltas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_biology_deltas_locales_locale_pa" ON "pages_blocks_evolution_band_biology_deltas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_cycle2_items_order_idx" ON "pages_blocks_evolution_band_cycle2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_cycle2_items_parent_id_idx" ON "pages_blocks_evolution_band_cycle2_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_cycle2_items_locales_locale_pare" ON "pages_blocks_evolution_band_cycle2_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_order_idx" ON "pages_blocks_evolution_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_parent_id_idx" ON "pages_blocks_evolution_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_path_idx" ON "pages_blocks_evolution_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_locales_locale_parent_id_unique" ON "pages_blocks_evolution_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_early_access_variants_order_idx" ON "_pages_v_blocks_early_access_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_early_access_variants_parent_id_idx" ON "_pages_v_blocks_early_access_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_early_access_variants_locales_locale_parent_" ON "_pages_v_blocks_early_access_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_early_access_order_idx" ON "_pages_v_blocks_early_access" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_early_access_parent_id_idx" ON "_pages_v_blocks_early_access" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_early_access_path_idx" ON "_pages_v_blocks_early_access" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_early_access_form_idx" ON "_pages_v_blocks_early_access" USING btree ("form_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_early_access_locales_locale_parent_id_unique" ON "_pages_v_blocks_early_access_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle1_items_order_idx" ON "_pages_v_blocks_evolution_band_cycle1_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle1_items_parent_id_idx" ON "_pages_v_blocks_evolution_band_cycle1_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_cycle1_items_locales_locale_p" ON "_pages_v_blocks_evolution_band_cycle1_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_biology_deltas_order_idx" ON "_pages_v_blocks_evolution_band_biology_deltas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_biology_deltas_parent_id_idx" ON "_pages_v_blocks_evolution_band_biology_deltas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_biology_deltas_locales_locale" ON "_pages_v_blocks_evolution_band_biology_deltas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle2_items_order_idx" ON "_pages_v_blocks_evolution_band_cycle2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle2_items_parent_id_idx" ON "_pages_v_blocks_evolution_band_cycle2_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_cycle2_items_locales_locale_p" ON "_pages_v_blocks_evolution_band_cycle2_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_order_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_parent_id_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_path_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_locales_locale_parent_id_uniq" ON "_pages_v_blocks_evolution_band_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_showcase_panel_thumbnails_image_idx" ON "pages_blocks_product_showcase_panel_thumbnails_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "pages_blocks_product_showcase_panel_thumbnails_locales_local" ON "pages_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_panel_thumbnails_image_idx" ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_blocks_product_showcase_panel_thumbnails_locales_lo" ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_early_access_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_biology_deltas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_biology_deltas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_biology_deltas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_biology_deltas_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_early_access_variants" CASCADE;
  DROP TABLE "pages_blocks_early_access_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_early_access" CASCADE;
  DROP TABLE "pages_blocks_early_access_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle1_items" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle1_items_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_biology_deltas" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_biology_deltas_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle2_items" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle2_items_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle1_items" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_biology_deltas" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_biology_deltas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_locales" CASCADE;
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_pa_fk";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_fk";
  
  DROP INDEX "pages_blocks_product_showcase_panel_thumbnails_image_idx";
  DROP INDEX "pages_blocks_product_showcase_panel_thumbnails_locales_local";
  DROP INDEX "_pages_v_blocks_product_showcase_panel_thumbnails_image_idx";
  DROP INDEX "_pages_v_blocks_product_showcase_panel_thumbnails_locales_lo";
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "psc_panel_thumbs_locales_locale_parent_unique" ON "pages_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_psc_panel_thumbs_locales_locale_parent_unique" ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "posts" DROP COLUMN "source";
  ALTER TABLE "posts" DROP COLUMN "html_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_source";
  ALTER TABLE "_posts_v" DROP COLUMN "version_html_content";
  ALTER TABLE "users" DROP COLUMN "enable_a_p_i_key";
  ALTER TABLE "users" DROP COLUMN "api_key";
  ALTER TABLE "users" DROP COLUMN "api_key_index";
  DROP TYPE "public"."enum_pages_blocks_evolution_band_biology_deltas_direction";
  DROP TYPE "public"."enum_pages_blocks_evolution_band_cycle2_items_status";
  DROP TYPE "public"."enum_pages_blocks_evolution_band_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_evolution_band_biology_deltas_direction";
  DROP TYPE "public"."enum__pages_v_blocks_evolution_band_cycle2_items_status";
  DROP TYPE "public"."enum__pages_v_blocks_evolution_band_color_mode";
  DROP TYPE "public"."enum_posts_source";
  DROP TYPE "public"."enum__posts_v_version_source";`)
}
