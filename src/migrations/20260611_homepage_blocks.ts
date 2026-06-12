import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_plans_grid_plans_style" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_plans_grid_plans_style" AS ENUM('light', 'dark');
  CREATE TABLE "pages_blocks_homepage_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"background_image_id" integer,
  	"background_image_mobile_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_homepage_hero_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar DEFAULT 'Order your kit â†’',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_stars" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_trust_strip_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_flip_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_flip_cards_cards_locales" (
  	"stat" varchar,
  	"stat_unit" varchar,
  	"tag" varchar,
  	"front_explanation" varchar,
  	"back_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_flip_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_flip_cards_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"pivot_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_model_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_model_comparison_rows_locales" (
  	"label" varchar,
  	"they_value" varchar,
  	"us_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_model_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"us_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_model_comparison_locales" (
  	"heading" jsonb,
  	"they_label" varchar DEFAULT 'Everyone else',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_process_timeline_steps_locales" (
  	"time_label" varchar,
  	"step_number" varchar,
  	"title" varchar,
  	"detail_label" varchar,
  	"detail_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_timeline_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_trio_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_trio_replaces_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_trio_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dot_color" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_product_trio_products_locales" (
  	"name" varchar,
  	"time_of_day" varchar,
  	"timing_note" varchar,
  	"description" varchar,
  	"chip_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_trio_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"replaces_label" varchar,
  	"closing_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_standards_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_standards_bar_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_standards_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plans_grid_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_grid_plans_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_grid_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"style" "enum_pages_blocks_plans_grid_plans_style" DEFAULT 'light'
  );
  
  CREATE TABLE "pages_blocks_plans_grid_plans_locales" (
  	"name" varchar,
  	"badge" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_unit" varchar,
  	"monthly_option" varchar,
  	"commit_note" varchar,
  	"features_label" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_grid_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_plans_grid_guarantee_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plans_grid_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_close_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_close_band_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar DEFAULT 'Order your kit â†’',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"background_image_id" integer,
  	"background_image_mobile_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar DEFAULT 'Order your kit â†’',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_flip_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_flip_cards_cards_locales" (
  	"stat" varchar,
  	"stat_unit" varchar,
  	"tag" varchar,
  	"front_explanation" varchar,
  	"back_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stat_flip_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_flip_cards_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"pivot_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_two_model_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_model_comparison_rows_locales" (
  	"label" varchar,
  	"they_value" varchar,
  	"us_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_two_model_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"us_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_model_comparison_locales" (
  	"heading" jsonb,
  	"they_label" varchar DEFAULT 'Everyone else',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline_steps_locales" (
  	"time_label" varchar,
  	"step_number" varchar,
  	"title" varchar,
  	"detail_label" varchar,
  	"detail_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio_replaces_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dot_color" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio_products_locales" (
  	"name" varchar,
  	"time_of_day" varchar,
  	"timing_note" varchar,
  	"description" varchar,
  	"chip_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_trio_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"replaces_label" varchar,
  	"closing_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_standards_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_standards_bar_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_standards_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_plans_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"style" "enum__pages_v_blocks_plans_grid_plans_style" DEFAULT 'light',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_plans_locales" (
  	"name" varchar,
  	"badge" varchar,
  	"description" varchar,
  	"price" varchar,
  	"price_unit" varchar,
  	"monthly_option" varchar,
  	"commit_note" varchar,
  	"features_label" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_guarantee_items_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_grid_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_close_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_close_band_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar DEFAULT 'Order your kit â†’',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_homepage_hero" ADD CONSTRAINT "pages_blocks_homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero" ADD CONSTRAINT "pages_blocks_homepage_hero_background_image_mobile_id_media_id_fk" FOREIGN KEY ("background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero" ADD CONSTRAINT "pages_blocks_homepage_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_locales" ADD CONSTRAINT "pages_blocks_homepage_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip_items" ADD CONSTRAINT "pages_blocks_trust_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip_items_locales" ADD CONSTRAINT "pages_blocks_trust_strip_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_strip_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip" ADD CONSTRAINT "pages_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_flip_cards_cards" ADD CONSTRAINT "pages_blocks_stat_flip_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_flip_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_flip_cards_cards_locales" ADD CONSTRAINT "pages_blocks_stat_flip_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_flip_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_flip_cards" ADD CONSTRAINT "pages_blocks_stat_flip_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_flip_cards_locales" ADD CONSTRAINT "pages_blocks_stat_flip_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_flip_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_model_comparison_rows" ADD CONSTRAINT "pages_blocks_two_model_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_model_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_model_comparison_rows_locales" ADD CONSTRAINT "pages_blocks_two_model_comparison_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_model_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_model_comparison" ADD CONSTRAINT "pages_blocks_two_model_comparison_us_logo_id_media_id_fk" FOREIGN KEY ("us_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_model_comparison" ADD CONSTRAINT "pages_blocks_two_model_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_model_comparison_locales" ADD CONSTRAINT "pages_blocks_two_model_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_model_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline_steps" ADD CONSTRAINT "pages_blocks_process_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline_steps_locales" ADD CONSTRAINT "pages_blocks_process_timeline_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline" ADD CONSTRAINT "pages_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline_locales" ADD CONSTRAINT "pages_blocks_process_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_replaces_items" ADD CONSTRAINT "pages_blocks_product_trio_replaces_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_replaces_items_locales" ADD CONSTRAINT "pages_blocks_product_trio_replaces_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_trio_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_products" ADD CONSTRAINT "pages_blocks_product_trio_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_products" ADD CONSTRAINT "pages_blocks_product_trio_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_products_locales" ADD CONSTRAINT "pages_blocks_product_trio_products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_trio_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio" ADD CONSTRAINT "pages_blocks_product_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_trio_locales" ADD CONSTRAINT "pages_blocks_product_trio_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standards_bar_items" ADD CONSTRAINT "pages_blocks_standards_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standards_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standards_bar_items_locales" ADD CONSTRAINT "pages_blocks_standards_bar_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standards_bar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standards_bar" ADD CONSTRAINT "pages_blocks_standards_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_plans_features" ADD CONSTRAINT "pages_blocks_plans_grid_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_plans_features_locales" ADD CONSTRAINT "pages_blocks_plans_grid_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_plans" ADD CONSTRAINT "pages_blocks_plans_grid_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_plans_locales" ADD CONSTRAINT "pages_blocks_plans_grid_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_guarantee_items" ADD CONSTRAINT "pages_blocks_plans_grid_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_guarantee_items_locales" ADD CONSTRAINT "pages_blocks_plans_grid_guarantee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid" ADD CONSTRAINT "pages_blocks_plans_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_grid_locales" ADD CONSTRAINT "pages_blocks_plans_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_close_band" ADD CONSTRAINT "pages_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_close_band_locales" ADD CONSTRAINT "pages_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_background_image_mobile_id_media_id_fk" FOREIGN KEY ("background_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_locales" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip_items" ADD CONSTRAINT "_pages_v_blocks_trust_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip_items_locales" ADD CONSTRAINT "_pages_v_blocks_trust_strip_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_strip_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip" ADD CONSTRAINT "_pages_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_flip_cards_cards" ADD CONSTRAINT "_pages_v_blocks_stat_flip_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_flip_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_flip_cards_cards_locales" ADD CONSTRAINT "_pages_v_blocks_stat_flip_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_flip_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_flip_cards" ADD CONSTRAINT "_pages_v_blocks_stat_flip_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_flip_cards_locales" ADD CONSTRAINT "_pages_v_blocks_stat_flip_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_flip_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_model_comparison_rows" ADD CONSTRAINT "_pages_v_blocks_two_model_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_model_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_model_comparison_rows_locales" ADD CONSTRAINT "_pages_v_blocks_two_model_comparison_rows_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_model_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_model_comparison" ADD CONSTRAINT "_pages_v_blocks_two_model_comparison_us_logo_id_media_id_fk" FOREIGN KEY ("us_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_model_comparison" ADD CONSTRAINT "_pages_v_blocks_two_model_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_model_comparison_locales" ADD CONSTRAINT "_pages_v_blocks_two_model_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_model_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline_steps" ADD CONSTRAINT "_pages_v_blocks_process_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_timeline_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline" ADD CONSTRAINT "_pages_v_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline_locales" ADD CONSTRAINT "_pages_v_blocks_process_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_replaces_items" ADD CONSTRAINT "_pages_v_blocks_product_trio_replaces_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_replaces_items_locales" ADD CONSTRAINT "_pages_v_blocks_product_trio_replaces_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_trio_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_products" ADD CONSTRAINT "_pages_v_blocks_product_trio_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_products" ADD CONSTRAINT "_pages_v_blocks_product_trio_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_products_locales" ADD CONSTRAINT "_pages_v_blocks_product_trio_products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_trio_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio" ADD CONSTRAINT "_pages_v_blocks_product_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_trio_locales" ADD CONSTRAINT "_pages_v_blocks_product_trio_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_bar_items" ADD CONSTRAINT "_pages_v_blocks_standards_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standards_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_bar_items_locales" ADD CONSTRAINT "_pages_v_blocks_standards_bar_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standards_bar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_bar" ADD CONSTRAINT "_pages_v_blocks_standards_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_plans_features" ADD CONSTRAINT "_pages_v_blocks_plans_grid_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_plans_features_locales" ADD CONSTRAINT "_pages_v_blocks_plans_grid_plans_features_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_plans" ADD CONSTRAINT "_pages_v_blocks_plans_grid_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_plans_locales" ADD CONSTRAINT "_pages_v_blocks_plans_grid_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_guarantee_items" ADD CONSTRAINT "_pages_v_blocks_plans_grid_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_guarantee_items_locales" ADD CONSTRAINT "_pages_v_blocks_plans_grid_guarantee_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid" ADD CONSTRAINT "_pages_v_blocks_plans_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_grid_locales" ADD CONSTRAINT "_pages_v_blocks_plans_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_close_band" ADD CONSTRAINT "_pages_v_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_close_band_locales" ADD CONSTRAINT "_pages_v_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_order_idx" ON "pages_blocks_homepage_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_parent_id_idx" ON "pages_blocks_homepage_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_path_idx" ON "pages_blocks_homepage_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_homepage_hero_background_image_idx" ON "pages_blocks_homepage_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_homepage_hero_background_image_mobile_idx" ON "pages_blocks_homepage_hero" USING btree ("background_image_mobile_id");
  CREATE UNIQUE INDEX "pages_blocks_homepage_hero_locales_locale_parent_id_unique" ON "pages_blocks_homepage_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_items_order_idx" ON "pages_blocks_trust_strip_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_strip_items_parent_id_idx" ON "pages_blocks_trust_strip_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_trust_strip_items_locales_locale_parent_id_uniq" ON "pages_blocks_trust_strip_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_order_idx" ON "pages_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_strip_parent_id_idx" ON "pages_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_path_idx" ON "pages_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_stat_flip_cards_cards_order_idx" ON "pages_blocks_stat_flip_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_flip_cards_cards_parent_id_idx" ON "pages_blocks_stat_flip_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stat_flip_cards_cards_locales_locale_parent_id_" ON "pages_blocks_stat_flip_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stat_flip_cards_order_idx" ON "pages_blocks_stat_flip_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_flip_cards_parent_id_idx" ON "pages_blocks_stat_flip_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_flip_cards_path_idx" ON "pages_blocks_stat_flip_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stat_flip_cards_locales_locale_parent_id_unique" ON "pages_blocks_stat_flip_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_two_model_comparison_rows_order_idx" ON "pages_blocks_two_model_comparison_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_model_comparison_rows_parent_id_idx" ON "pages_blocks_two_model_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_two_model_comparison_rows_locales_locale_parent" ON "pages_blocks_two_model_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_two_model_comparison_order_idx" ON "pages_blocks_two_model_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_model_comparison_parent_id_idx" ON "pages_blocks_two_model_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_model_comparison_path_idx" ON "pages_blocks_two_model_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_model_comparison_us_logo_idx" ON "pages_blocks_two_model_comparison" USING btree ("us_logo_id");
  CREATE UNIQUE INDEX "pages_blocks_two_model_comparison_locales_locale_parent_id_u" ON "pages_blocks_two_model_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_steps_order_idx" ON "pages_blocks_process_timeline_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_timeline_steps_parent_id_idx" ON "pages_blocks_process_timeline_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_timeline_steps_locales_locale_parent_id" ON "pages_blocks_process_timeline_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_order_idx" ON "pages_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_timeline_parent_id_idx" ON "pages_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_path_idx" ON "pages_blocks_process_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_timeline_locales_locale_parent_id_uniqu" ON "pages_blocks_process_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_product_trio_replaces_items_order_idx" ON "pages_blocks_product_trio_replaces_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_trio_replaces_items_parent_id_idx" ON "pages_blocks_product_trio_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_product_trio_replaces_items_locales_locale_pare" ON "pages_blocks_product_trio_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_product_trio_products_order_idx" ON "pages_blocks_product_trio_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_trio_products_parent_id_idx" ON "pages_blocks_product_trio_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_trio_products_image_idx" ON "pages_blocks_product_trio_products" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_product_trio_products_locales_locale_parent_id_" ON "pages_blocks_product_trio_products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_product_trio_order_idx" ON "pages_blocks_product_trio" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_trio_parent_id_idx" ON "pages_blocks_product_trio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_trio_path_idx" ON "pages_blocks_product_trio" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_product_trio_locales_locale_parent_id_unique" ON "pages_blocks_product_trio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_standards_bar_items_order_idx" ON "pages_blocks_standards_bar_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_standards_bar_items_parent_id_idx" ON "pages_blocks_standards_bar_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_standards_bar_items_locales_locale_parent_id_un" ON "pages_blocks_standards_bar_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_standards_bar_order_idx" ON "pages_blocks_standards_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_standards_bar_parent_id_idx" ON "pages_blocks_standards_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_standards_bar_path_idx" ON "pages_blocks_standards_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_plans_grid_plans_features_order_idx" ON "pages_blocks_plans_grid_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_grid_plans_features_parent_id_idx" ON "pages_blocks_plans_grid_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_grid_plans_features_locales_locale_parent" ON "pages_blocks_plans_grid_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_grid_plans_order_idx" ON "pages_blocks_plans_grid_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_grid_plans_parent_id_idx" ON "pages_blocks_plans_grid_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_grid_plans_locales_locale_parent_id_uniqu" ON "pages_blocks_plans_grid_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_grid_guarantee_items_order_idx" ON "pages_blocks_plans_grid_guarantee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_grid_guarantee_items_parent_id_idx" ON "pages_blocks_plans_grid_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_grid_guarantee_items_locales_locale_paren" ON "pages_blocks_plans_grid_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_grid_order_idx" ON "pages_blocks_plans_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_grid_parent_id_idx" ON "pages_blocks_plans_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plans_grid_path_idx" ON "pages_blocks_plans_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plans_grid_locales_locale_parent_id_unique" ON "pages_blocks_plans_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_close_band_order_idx" ON "pages_blocks_close_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_close_band_parent_id_idx" ON "pages_blocks_close_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_close_band_path_idx" ON "pages_blocks_close_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_close_band_locales_locale_parent_id_unique" ON "pages_blocks_close_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_order_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_parent_id_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_path_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_homepage_hero_background_image_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_background_image_mobile_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("background_image_mobile_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_homepage_hero_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_homepage_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_items_order_idx" ON "_pages_v_blocks_trust_strip_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_strip_items_parent_id_idx" ON "_pages_v_blocks_trust_strip_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_trust_strip_items_locales_locale_parent_id_u" ON "_pages_v_blocks_trust_strip_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_order_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_strip_parent_id_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_path_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stat_flip_cards_cards_order_idx" ON "_pages_v_blocks_stat_flip_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_flip_cards_cards_parent_id_idx" ON "_pages_v_blocks_stat_flip_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_flip_cards_cards_locales_locale_parent_" ON "_pages_v_blocks_stat_flip_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_flip_cards_order_idx" ON "_pages_v_blocks_stat_flip_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_flip_cards_parent_id_idx" ON "_pages_v_blocks_stat_flip_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_flip_cards_path_idx" ON "_pages_v_blocks_stat_flip_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_flip_cards_locales_locale_parent_id_uni" ON "_pages_v_blocks_stat_flip_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_rows_order_idx" ON "_pages_v_blocks_two_model_comparison_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_rows_parent_id_idx" ON "_pages_v_blocks_two_model_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_two_model_comparison_rows_locales_locale_par" ON "_pages_v_blocks_two_model_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_order_idx" ON "_pages_v_blocks_two_model_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_parent_id_idx" ON "_pages_v_blocks_two_model_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_path_idx" ON "_pages_v_blocks_two_model_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_two_model_comparison_us_logo_idx" ON "_pages_v_blocks_two_model_comparison" USING btree ("us_logo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_two_model_comparison_locales_locale_parent_i" ON "_pages_v_blocks_two_model_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_steps_order_idx" ON "_pages_v_blocks_process_timeline_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_timeline_steps_parent_id_idx" ON "_pages_v_blocks_process_timeline_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_timeline_steps_locales_locale_parent" ON "_pages_v_blocks_process_timeline_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_order_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_timeline_parent_id_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_path_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_timeline_locales_locale_parent_id_un" ON "_pages_v_blocks_process_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_product_trio_replaces_items_order_idx" ON "_pages_v_blocks_product_trio_replaces_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_trio_replaces_items_parent_id_idx" ON "_pages_v_blocks_product_trio_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_product_trio_replaces_items_locales_locale_p" ON "_pages_v_blocks_product_trio_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_product_trio_products_order_idx" ON "_pages_v_blocks_product_trio_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_trio_products_parent_id_idx" ON "_pages_v_blocks_product_trio_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_trio_products_image_idx" ON "_pages_v_blocks_product_trio_products" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_product_trio_products_locales_locale_parent_" ON "_pages_v_blocks_product_trio_products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_product_trio_order_idx" ON "_pages_v_blocks_product_trio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_trio_parent_id_idx" ON "_pages_v_blocks_product_trio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_trio_path_idx" ON "_pages_v_blocks_product_trio" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_product_trio_locales_locale_parent_id_unique" ON "_pages_v_blocks_product_trio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_standards_bar_items_order_idx" ON "_pages_v_blocks_standards_bar_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standards_bar_items_parent_id_idx" ON "_pages_v_blocks_standards_bar_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_standards_bar_items_locales_locale_parent_id" ON "_pages_v_blocks_standards_bar_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_standards_bar_order_idx" ON "_pages_v_blocks_standards_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standards_bar_parent_id_idx" ON "_pages_v_blocks_standards_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_standards_bar_path_idx" ON "_pages_v_blocks_standards_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_plans_grid_plans_features_order_idx" ON "_pages_v_blocks_plans_grid_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_grid_plans_features_parent_id_idx" ON "_pages_v_blocks_plans_grid_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_grid_plans_features_locales_locale_par" ON "_pages_v_blocks_plans_grid_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_grid_plans_order_idx" ON "_pages_v_blocks_plans_grid_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_grid_plans_parent_id_idx" ON "_pages_v_blocks_plans_grid_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_grid_plans_locales_locale_parent_id_un" ON "_pages_v_blocks_plans_grid_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_grid_guarantee_items_order_idx" ON "_pages_v_blocks_plans_grid_guarantee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_grid_guarantee_items_parent_id_idx" ON "_pages_v_blocks_plans_grid_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_grid_guarantee_items_locales_locale_pa" ON "_pages_v_blocks_plans_grid_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_grid_order_idx" ON "_pages_v_blocks_plans_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_grid_parent_id_idx" ON "_pages_v_blocks_plans_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_grid_path_idx" ON "_pages_v_blocks_plans_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_plans_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_close_band_order_idx" ON "_pages_v_blocks_close_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_close_band_parent_id_idx" ON "_pages_v_blocks_close_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_close_band_path_idx" ON "_pages_v_blocks_close_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_close_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_close_band_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_two_models_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"us_icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_two_models_rows_locales" (
  	"label" varchar,
  	"them_value" varchar,
  	"us_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_models_locales" (
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_two_models_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"us_icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_models_rows_locales" (
  	"label" varchar,
  	"them_value" varchar,
  	"us_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_two_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_two_models_locales" (
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_two_models_rows" ADD CONSTRAINT "pages_blocks_two_models_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_models_rows_locales" ADD CONSTRAINT "pages_blocks_two_models_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_models_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_models" ADD CONSTRAINT "pages_blocks_two_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_models_locales" ADD CONSTRAINT "pages_blocks_two_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_models_rows" ADD CONSTRAINT "_pages_v_blocks_two_models_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_models_rows_locales" ADD CONSTRAINT "_pages_v_blocks_two_models_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_models_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_models" ADD CONSTRAINT "_pages_v_blocks_two_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_models_locales" ADD CONSTRAINT "_pages_v_blocks_two_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_two_models"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_two_models_rows_order_idx" ON "pages_blocks_two_models_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_models_rows_parent_id_idx" ON "pages_blocks_two_models_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_two_models_rows_locales_locale_parent_id_unique" ON "pages_blocks_two_models_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_two_models_order_idx" ON "pages_blocks_two_models" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_models_parent_id_idx" ON "pages_blocks_two_models" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_models_path_idx" ON "pages_blocks_two_models" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_two_models_locales_locale_parent_id_unique" ON "pages_blocks_two_models_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_two_models_rows_order_idx" ON "_pages_v_blocks_two_models_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_models_rows_parent_id_idx" ON "_pages_v_blocks_two_models_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_two_models_rows_locales_locale_parent_id_uni" ON "_pages_v_blocks_two_models_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_two_models_order_idx" ON "_pages_v_blocks_two_models" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_two_models_parent_id_idx" ON "_pages_v_blocks_two_models" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_two_models_path_idx" ON "_pages_v_blocks_two_models" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_two_models_locales_locale_parent_id_unique" ON "_pages_v_blocks_two_models_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_two_models" ADD COLUMN "nb1_logo_id" integer;
  ALTER TABLE "_pages_v_blocks_two_models" ADD COLUMN "nb1_logo_id" integer;
  ALTER TABLE "pages_blocks_two_models" ADD CONSTRAINT "pages_blocks_two_models_nb1_logo_id_media_id_fk" FOREIGN KEY ("nb1_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_two_models" ADD CONSTRAINT "_pages_v_blocks_two_models_nb1_logo_id_media_id_fk" FOREIGN KEY ("nb1_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_two_models_nb1_logo_idx" ON "pages_blocks_two_models" USING btree ("nb1_logo_id");
  CREATE INDEX "_pages_v_blocks_two_models_nb1_logo_idx" ON "_pages_v_blocks_two_models" USING btree ("nb1_logo_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_gut_first_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar
  );
  
  CREATE TABLE "pages_blocks_gut_first_nodes_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gut_first" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gut_first_locales" (
  	"heading" jsonb,
  	"body_copy" varchar,
  	"hint_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gut_first_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gut_first_nodes_locales" (
  	"label" varchar,
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gut_first" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gut_first_locales" (
  	"heading" jsonb,
  	"body_copy" varchar,
  	"hint_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_gut_first_nodes" ADD CONSTRAINT "pages_blocks_gut_first_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gut_first"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gut_first_nodes_locales" ADD CONSTRAINT "pages_blocks_gut_first_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gut_first_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gut_first" ADD CONSTRAINT "pages_blocks_gut_first_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gut_first_locales" ADD CONSTRAINT "pages_blocks_gut_first_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gut_first"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gut_first_nodes" ADD CONSTRAINT "_pages_v_blocks_gut_first_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gut_first"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gut_first_nodes_locales" ADD CONSTRAINT "_pages_v_blocks_gut_first_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gut_first_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gut_first" ADD CONSTRAINT "_pages_v_blocks_gut_first_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gut_first_locales" ADD CONSTRAINT "_pages_v_blocks_gut_first_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gut_first"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_gut_first_nodes_order_idx" ON "pages_blocks_gut_first_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_gut_first_nodes_parent_id_idx" ON "pages_blocks_gut_first_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gut_first_nodes_locales_locale_parent_id_unique" ON "pages_blocks_gut_first_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gut_first_order_idx" ON "pages_blocks_gut_first" USING btree ("_order");
  CREATE INDEX "pages_blocks_gut_first_parent_id_idx" ON "pages_blocks_gut_first" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gut_first_path_idx" ON "pages_blocks_gut_first" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gut_first_locales_locale_parent_id_unique" ON "pages_blocks_gut_first_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gut_first_nodes_order_idx" ON "_pages_v_blocks_gut_first_nodes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gut_first_nodes_parent_id_idx" ON "_pages_v_blocks_gut_first_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gut_first_nodes_locales_locale_parent_id_uni" ON "_pages_v_blocks_gut_first_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gut_first_order_idx" ON "_pages_v_blocks_gut_first" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gut_first_parent_id_idx" ON "_pages_v_blocks_gut_first" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gut_first_path_idx" ON "_pages_v_blocks_gut_first" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gut_first_locales_locale_parent_id_unique" ON "_pages_v_blocks_gut_first_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_num" varchar,
  	"icon_svg" varchar,
  	"is_gate" boolean DEFAULT false,
  	"callout_number" varchar,
  	"callout_number_suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps_locales" (
  	"week" varchar,
  	"step_label" varchar,
  	"title" varchar,
  	"callout_label" varchar,
  	"callout_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step_num" varchar,
  	"icon_svg" varchar,
  	"is_gate" boolean DEFAULT false,
  	"callout_number" varchar,
  	"callout_number_suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps_locales" (
  	"week" varchar,
  	"step_label" varchar,
  	"title" varchar,
  	"callout_label" varchar,
  	"callout_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps_locales" ADD CONSTRAINT "pages_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_locales" ADD CONSTRAINT "pages_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD CONSTRAINT "_pages_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_steps_locales_locale_parent_id_uni" ON "pages_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_locales_locale_parent_id_unique" ON "pages_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_parent_id_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_steps_locales_locale_parent_id_" ON "_pages_v_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_order_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_parent_id_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_path_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_locales_locale_parent_id_unique" ON "_pages_v_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_what_arrives_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_what_arrives_replaces_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_what_arrives_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tod_color" varchar,
  	"image_id" integer,
  	"chip_color" varchar
  );
  
  CREATE TABLE "pages_blocks_what_arrives_cards_locales" (
  	"tod_label" varchar,
  	"name" varchar,
  	"timing" varchar,
  	"description" varchar,
  	"chip_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_what_arrives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_what_arrives_locales" (
  	"heading" jsonb,
  	"lede" jsonb,
  	"replaces_label" varchar,
  	"closing_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives_replaces_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tod_color" varchar,
  	"image_id" integer,
  	"chip_color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives_cards_locales" (
  	"tod_label" varchar,
  	"name" varchar,
  	"timing" varchar,
  	"description" varchar,
  	"chip_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_what_arrives_locales" (
  	"heading" jsonb,
  	"lede" jsonb,
  	"replaces_label" varchar,
  	"closing_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_what_arrives_replaces_items" ADD CONSTRAINT "pages_blocks_what_arrives_replaces_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives_replaces_items_locales" ADD CONSTRAINT "pages_blocks_what_arrives_replaces_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_arrives_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives_cards" ADD CONSTRAINT "pages_blocks_what_arrives_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives_cards" ADD CONSTRAINT "pages_blocks_what_arrives_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives_cards_locales" ADD CONSTRAINT "pages_blocks_what_arrives_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_arrives_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives" ADD CONSTRAINT "pages_blocks_what_arrives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_what_arrives_locales" ADD CONSTRAINT "pages_blocks_what_arrives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_replaces_items" ADD CONSTRAINT "_pages_v_blocks_what_arrives_replaces_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_replaces_items_locales" ADD CONSTRAINT "_pages_v_blocks_what_arrives_replaces_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_arrives_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_cards" ADD CONSTRAINT "_pages_v_blocks_what_arrives_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_cards" ADD CONSTRAINT "_pages_v_blocks_what_arrives_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_cards_locales" ADD CONSTRAINT "_pages_v_blocks_what_arrives_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_arrives_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives" ADD CONSTRAINT "_pages_v_blocks_what_arrives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_what_arrives_locales" ADD CONSTRAINT "_pages_v_blocks_what_arrives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_what_arrives"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_what_arrives_replaces_items_order_idx" ON "pages_blocks_what_arrives_replaces_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_what_arrives_replaces_items_parent_id_idx" ON "pages_blocks_what_arrives_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_what_arrives_replaces_items_locales_locale_pare" ON "pages_blocks_what_arrives_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_what_arrives_cards_order_idx" ON "pages_blocks_what_arrives_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_what_arrives_cards_parent_id_idx" ON "pages_blocks_what_arrives_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_what_arrives_cards_image_idx" ON "pages_blocks_what_arrives_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_what_arrives_cards_locales_locale_parent_id_uni" ON "pages_blocks_what_arrives_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_what_arrives_order_idx" ON "pages_blocks_what_arrives" USING btree ("_order");
  CREATE INDEX "pages_blocks_what_arrives_parent_id_idx" ON "pages_blocks_what_arrives" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_what_arrives_path_idx" ON "pages_blocks_what_arrives" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_what_arrives_locales_locale_parent_id_unique" ON "pages_blocks_what_arrives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_what_arrives_replaces_items_order_idx" ON "_pages_v_blocks_what_arrives_replaces_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_what_arrives_replaces_items_parent_id_idx" ON "_pages_v_blocks_what_arrives_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_what_arrives_replaces_items_locales_locale_p" ON "_pages_v_blocks_what_arrives_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_what_arrives_cards_order_idx" ON "_pages_v_blocks_what_arrives_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_what_arrives_cards_parent_id_idx" ON "_pages_v_blocks_what_arrives_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_what_arrives_cards_image_idx" ON "_pages_v_blocks_what_arrives_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_what_arrives_cards_locales_locale_parent_id_" ON "_pages_v_blocks_what_arrives_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_what_arrives_order_idx" ON "_pages_v_blocks_what_arrives" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_what_arrives_parent_id_idx" ON "_pages_v_blocks_what_arrives" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_what_arrives_path_idx" ON "_pages_v_blocks_what_arrives" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_what_arrives_locales_locale_parent_id_unique" ON "_pages_v_blocks_what_arrives_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_outcomes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"delta_chip" varchar,
  	"value_before" varchar,
  	"value_after" varchar,
  	"value_unit" varchar,
  	"track_seg_left" varchar,
  	"track_seg_right" varchar,
  	"track_dot_before" varchar,
  	"track_dot_after" varchar
  );
  
  CREATE TABLE "pages_blocks_outcomes_cards_locales" (
  	"category" varchar,
  	"front_title" varchar,
  	"track_footnote" varchar,
  	"back_eyebrow" varchar,
  	"back_body" varchar,
  	"flip_aria_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gauge_score" varchar,
  	"gauge_max" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_outcomes_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"gauge_label" varchar,
  	"delta_label" varchar,
  	"delta_from" varchar,
  	"built_in_text" jsonb,
  	"felt_text" jsonb,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"delta_chip" varchar,
  	"value_before" varchar,
  	"value_after" varchar,
  	"value_unit" varchar,
  	"track_seg_left" varchar,
  	"track_seg_right" varchar,
  	"track_dot_before" varchar,
  	"track_dot_after" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_cards_locales" (
  	"category" varchar,
  	"front_title" varchar,
  	"track_footnote" varchar,
  	"back_eyebrow" varchar,
  	"back_body" varchar,
  	"flip_aria_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"gauge_score" varchar,
  	"gauge_max" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"gauge_label" varchar,
  	"delta_label" varchar,
  	"delta_from" varchar,
  	"built_in_text" jsonb,
  	"felt_text" jsonb,
  	"footnote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_outcomes_cards" ADD CONSTRAINT "pages_blocks_outcomes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_cards" ADD CONSTRAINT "pages_blocks_outcomes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_cards_locales" ADD CONSTRAINT "pages_blocks_outcomes_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes" ADD CONSTRAINT "pages_blocks_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_locales" ADD CONSTRAINT "pages_blocks_outcomes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_cards" ADD CONSTRAINT "_pages_v_blocks_outcomes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_cards" ADD CONSTRAINT "_pages_v_blocks_outcomes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_cards_locales" ADD CONSTRAINT "_pages_v_blocks_outcomes_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes" ADD CONSTRAINT "_pages_v_blocks_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_locales" ADD CONSTRAINT "_pages_v_blocks_outcomes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_outcomes_cards_order_idx" ON "pages_blocks_outcomes_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_cards_parent_id_idx" ON "pages_blocks_outcomes_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_cards_image_idx" ON "pages_blocks_outcomes_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_outcomes_cards_locales_locale_parent_id_unique" ON "pages_blocks_outcomes_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_outcomes_order_idx" ON "pages_blocks_outcomes" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_parent_id_idx" ON "pages_blocks_outcomes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_path_idx" ON "pages_blocks_outcomes" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_outcomes_locales_locale_parent_id_unique" ON "pages_blocks_outcomes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_cards_order_idx" ON "_pages_v_blocks_outcomes_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcomes_cards_parent_id_idx" ON "_pages_v_blocks_outcomes_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_cards_image_idx" ON "_pages_v_blocks_outcomes_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_outcomes_cards_locales_locale_parent_id_uniq" ON "_pages_v_blocks_outcomes_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_order_idx" ON "_pages_v_blocks_outcomes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcomes_parent_id_idx" ON "_pages_v_blocks_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_path_idx" ON "_pages_v_blocks_outcomes" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_outcomes_locales_locale_parent_id_unique" ON "_pages_v_blocks_outcomes_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_athletes_section_athletes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer,
  	"has_video" boolean DEFAULT false,
  	"video_id" integer
  );
  
  CREATE TABLE "pages_blocks_athletes_section_athletes_locales" (
  	"credential" varchar,
  	"video_aria_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athletes_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_athletes_section_locales" (
  	"quote_text" jsonb,
  	"quote_attribution" jsonb,
  	"record_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athletes_section_athletes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"photo_id" integer,
  	"has_video" boolean DEFAULT false,
  	"video_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athletes_section_athletes_locales" (
  	"credential" varchar,
  	"video_aria_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athletes_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athletes_section_locales" (
  	"quote_text" jsonb,
  	"quote_attribution" jsonb,
  	"record_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athletes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_athletes_locales" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athletes_section_athletes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section" ADD CONSTRAINT "pages_blocks_athletes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_locales" ADD CONSTRAINT "pages_blocks_athletes_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athletes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athletes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes_locales" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athletes_section_athletes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section" ADD CONSTRAINT "_pages_v_blocks_athletes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_locales" ADD CONSTRAINT "_pages_v_blocks_athletes_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athletes_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_athletes_section_athletes_order_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("_order");
  CREATE INDEX "pages_blocks_athletes_section_athletes_parent_id_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_athletes_section_athletes_photo_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_athletes_section_athletes_video_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("video_id");
  CREATE UNIQUE INDEX "pages_blocks_athletes_section_athletes_locales_locale_parent" ON "pages_blocks_athletes_section_athletes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athletes_section_order_idx" ON "pages_blocks_athletes_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_athletes_section_parent_id_idx" ON "pages_blocks_athletes_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_athletes_section_path_idx" ON "pages_blocks_athletes_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_athletes_section_locales_locale_parent_id_uniqu" ON "pages_blocks_athletes_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_athletes_order_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athletes_section_athletes_parent_id_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_athletes_photo_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_athletes_video_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athletes_section_athletes_locales_locale_par" ON "_pages_v_blocks_athletes_section_athletes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_order_idx" ON "_pages_v_blocks_athletes_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athletes_section_parent_id_idx" ON "_pages_v_blocks_athletes_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_path_idx" ON "_pages_v_blocks_athletes_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_athletes_section_locales_locale_parent_id_un" ON "_pages_v_blocks_athletes_section_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_science_board_section_members_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_science_board_section_members_bio_locales" (
  	"paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_science_board_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_science_board_section_members_locales" (
  	"role" varchar,
  	"detail" varchar,
  	"pill" varchar,
  	"modal_title" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_science_board_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_science_board_section_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section_members_bio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section_members_bio_locales" (
  	"paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section_members_locales" (
  	"role" varchar,
  	"detail" varchar,
  	"pill" varchar,
  	"modal_title" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_science_board_section_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_science_board_section_members_bio" ADD CONSTRAINT "pages_blocks_science_board_section_members_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_science_board_section_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section_members_bio_locales" ADD CONSTRAINT "pages_blocks_science_board_section_members_bio_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_science_board_section_members_bio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section_members" ADD CONSTRAINT "pages_blocks_science_board_section_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section_members" ADD CONSTRAINT "pages_blocks_science_board_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_science_board_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section_members_locales" ADD CONSTRAINT "pages_blocks_science_board_section_members_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_science_board_section_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section" ADD CONSTRAINT "pages_blocks_science_board_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_science_board_section_locales" ADD CONSTRAINT "pages_blocks_science_board_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_science_board_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_members_bio" ADD CONSTRAINT "_pages_v_blocks_science_board_section_members_bio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_science_board_section_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_members_bio_locales" ADD CONSTRAINT "_pages_v_blocks_science_board_section_members_bio_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_science_board_section_members_bio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_members" ADD CONSTRAINT "_pages_v_blocks_science_board_section_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_members" ADD CONSTRAINT "_pages_v_blocks_science_board_section_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_science_board_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_members_locales" ADD CONSTRAINT "_pages_v_blocks_science_board_section_members_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_science_board_section_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section" ADD CONSTRAINT "_pages_v_blocks_science_board_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_science_board_section_locales" ADD CONSTRAINT "_pages_v_blocks_science_board_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_science_board_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_science_board_section_members_bio_order_idx" ON "pages_blocks_science_board_section_members_bio" USING btree ("_order");
  CREATE INDEX "pages_blocks_science_board_section_members_bio_parent_id_idx" ON "pages_blocks_science_board_section_members_bio" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_science_board_section_members_bio_locales_local" ON "pages_blocks_science_board_section_members_bio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_science_board_section_members_order_idx" ON "pages_blocks_science_board_section_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_science_board_section_members_parent_id_idx" ON "pages_blocks_science_board_section_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_science_board_section_members_photo_idx" ON "pages_blocks_science_board_section_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_science_board_section_members_locales_locale_pa" ON "pages_blocks_science_board_section_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_science_board_section_order_idx" ON "pages_blocks_science_board_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_science_board_section_parent_id_idx" ON "pages_blocks_science_board_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_science_board_section_path_idx" ON "pages_blocks_science_board_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_science_board_section_locales_locale_parent_id_" ON "pages_blocks_science_board_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_science_board_section_members_bio_order_idx" ON "_pages_v_blocks_science_board_section_members_bio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_science_board_section_members_bio_parent_id_idx" ON "_pages_v_blocks_science_board_section_members_bio" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_science_board_section_members_bio_locales_lo" ON "_pages_v_blocks_science_board_section_members_bio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_science_board_section_members_order_idx" ON "_pages_v_blocks_science_board_section_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_science_board_section_members_parent_id_idx" ON "_pages_v_blocks_science_board_section_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_science_board_section_members_photo_idx" ON "_pages_v_blocks_science_board_section_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_science_board_section_members_locales_locale" ON "_pages_v_blocks_science_board_section_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_science_board_section_order_idx" ON "_pages_v_blocks_science_board_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_science_board_section_parent_id_idx" ON "_pages_v_blocks_science_board_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_science_board_section_path_idx" ON "_pages_v_blocks_science_board_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_science_board_section_locales_locale_parent_" ON "_pages_v_blocks_science_board_section_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_standards_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_standards_section_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_standards_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_standards_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_standards_section_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_standards_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_standards_section_items" ADD CONSTRAINT "pages_blocks_standards_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standards_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standards_section_items_locales" ADD CONSTRAINT "pages_blocks_standards_section_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_standards_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standards_section" ADD CONSTRAINT "pages_blocks_standards_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_section_items" ADD CONSTRAINT "_pages_v_blocks_standards_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standards_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_section_items_locales" ADD CONSTRAINT "_pages_v_blocks_standards_section_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_standards_section_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standards_section" ADD CONSTRAINT "_pages_v_blocks_standards_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_standards_section_items_order_idx" ON "pages_blocks_standards_section_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_standards_section_items_parent_id_idx" ON "pages_blocks_standards_section_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_standards_section_items_locales_locale_parent_i" ON "pages_blocks_standards_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_standards_section_order_idx" ON "pages_blocks_standards_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_standards_section_parent_id_idx" ON "pages_blocks_standards_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_standards_section_path_idx" ON "pages_blocks_standards_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_standards_section_items_order_idx" ON "_pages_v_blocks_standards_section_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standards_section_items_parent_id_idx" ON "_pages_v_blocks_standards_section_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_standards_section_items_locales_locale_paren" ON "_pages_v_blocks_standards_section_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_standards_section_order_idx" ON "_pages_v_blocks_standards_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_standards_section_parent_id_idx" ON "_pages_v_blocks_standards_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_standards_section_path_idx" ON "_pages_v_blocks_standards_section" USING btree ("_path");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_plans_section_core_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_section_core_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_section_adv_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_section_adv_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_section_guarantees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar
  );
  
  CREATE TABLE "pages_blocks_plans_section_guarantees_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plans_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"core_price" varchar,
  	"core_cta_href" varchar,
  	"adv_price" varchar,
  	"adv_cta_href" varchar,
  	"compare_rows_json" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plans_section_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"core_label" varchar,
  	"core_desc" varchar,
  	"core_monthly" varchar,
  	"core_commit" varchar,
  	"core_features_label" varchar,
  	"core_cta_label" varchar,
  	"adv_badge" varchar,
  	"adv_label" varchar,
  	"adv_desc" varchar,
  	"adv_commit" varchar,
  	"adv_features_label" varchar,
  	"adv_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_core_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_core_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_adv_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_adv_features_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_guarantees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_guarantees_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"core_price" varchar,
  	"core_cta_href" varchar,
  	"adv_price" varchar,
  	"adv_cta_href" varchar,
  	"compare_rows_json" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plans_section_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"core_label" varchar,
  	"core_desc" varchar,
  	"core_monthly" varchar,
  	"core_commit" varchar,
  	"core_features_label" varchar,
  	"core_cta_label" varchar,
  	"adv_badge" varchar,
  	"adv_label" varchar,
  	"adv_desc" varchar,
  	"adv_commit" varchar,
  	"adv_features_label" varchar,
  	"adv_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_plans_section_core_features" ADD CONSTRAINT "pages_blocks_plans_section_core_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_core_features_locales" ADD CONSTRAINT "pages_blocks_plans_section_core_features_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section_core_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_adv_features" ADD CONSTRAINT "pages_blocks_plans_section_adv_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_adv_features_locales" ADD CONSTRAINT "pages_blocks_plans_section_adv_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section_adv_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_guarantees" ADD CONSTRAINT "pages_blocks_plans_section_guarantees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_guarantees_locales" ADD CONSTRAINT "pages_blocks_plans_section_guarantees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section_guarantees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section" ADD CONSTRAINT "pages_blocks_plans_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plans_section_locales" ADD CONSTRAINT "pages_blocks_plans_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_core_features" ADD CONSTRAINT "_pages_v_blocks_plans_section_core_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_core_features_locales" ADD CONSTRAINT "_pages_v_blocks_plans_section_core_features_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section_core_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_adv_features" ADD CONSTRAINT "_pages_v_blocks_plans_section_adv_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_adv_features_locales" ADD CONSTRAINT "_pages_v_blocks_plans_section_adv_features_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section_adv_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_guarantees" ADD CONSTRAINT "_pages_v_blocks_plans_section_guarantees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_guarantees_locales" ADD CONSTRAINT "_pages_v_blocks_plans_section_guarantees_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section_guarantees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section" ADD CONSTRAINT "_pages_v_blocks_plans_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plans_section_locales" ADD CONSTRAINT "_pages_v_blocks_plans_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plans_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plans_section_core_features_order_idx" ON "pages_blocks_plans_section_core_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_section_core_features_parent_id_idx" ON "pages_blocks_plans_section_core_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_section_core_features_locales_locale_pare" ON "pages_blocks_plans_section_core_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_section_adv_features_order_idx" ON "pages_blocks_plans_section_adv_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_section_adv_features_parent_id_idx" ON "pages_blocks_plans_section_adv_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_section_adv_features_locales_locale_paren" ON "pages_blocks_plans_section_adv_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_section_guarantees_order_idx" ON "pages_blocks_plans_section_guarantees" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_section_guarantees_parent_id_idx" ON "pages_blocks_plans_section_guarantees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plans_section_guarantees_locales_locale_parent_" ON "pages_blocks_plans_section_guarantees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plans_section_order_idx" ON "pages_blocks_plans_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_plans_section_parent_id_idx" ON "pages_blocks_plans_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plans_section_path_idx" ON "pages_blocks_plans_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plans_section_locales_locale_parent_id_unique" ON "pages_blocks_plans_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_section_core_features_order_idx" ON "_pages_v_blocks_plans_section_core_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_section_core_features_parent_id_idx" ON "_pages_v_blocks_plans_section_core_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_section_core_features_locales_locale_p" ON "_pages_v_blocks_plans_section_core_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_section_adv_features_order_idx" ON "_pages_v_blocks_plans_section_adv_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_section_adv_features_parent_id_idx" ON "_pages_v_blocks_plans_section_adv_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_section_adv_features_locales_locale_pa" ON "_pages_v_blocks_plans_section_adv_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_section_guarantees_order_idx" ON "_pages_v_blocks_plans_section_guarantees" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_section_guarantees_parent_id_idx" ON "_pages_v_blocks_plans_section_guarantees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_section_guarantees_locales_locale_pare" ON "_pages_v_blocks_plans_section_guarantees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_section_order_idx" ON "_pages_v_blocks_plans_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plans_section_parent_id_idx" ON "_pages_v_blocks_plans_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plans_section_path_idx" ON "_pages_v_blocks_plans_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plans_section_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_plans_section_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_close_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_close_band_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_close_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_close_band_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_close_band" ADD CONSTRAINT "pages_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_close_band_locales" ADD CONSTRAINT "pages_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_close_band" ADD CONSTRAINT "_pages_v_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_close_band_locales" ADD CONSTRAINT "_pages_v_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_close_band_order_idx" ON "pages_blocks_close_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_close_band_parent_id_idx" ON "pages_blocks_close_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_close_band_path_idx" ON "pages_blocks_close_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_close_band_locales_locale_parent_id_unique" ON "pages_blocks_close_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_close_band_order_idx" ON "_pages_v_blocks_close_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_close_band_parent_id_idx" ON "_pages_v_blocks_close_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_close_band_path_idx" ON "_pages_v_blocks_close_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_close_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_close_band_locales" USING btree ("_locale","_parent_id");`)

}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_close_band" CASCADE;
  DROP TABLE "pages_blocks_close_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_close_band" CASCADE;
  DROP TABLE "_pages_v_blocks_close_band_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_plans_section_core_features" CASCADE;
  DROP TABLE "pages_blocks_plans_section_core_features_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_section_adv_features" CASCADE;
  DROP TABLE "pages_blocks_plans_section_adv_features_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_section_guarantees" CASCADE;
  DROP TABLE "pages_blocks_plans_section_guarantees_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_section" CASCADE;
  DROP TABLE "pages_blocks_plans_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_core_features" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_core_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_adv_features" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_adv_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_guarantees" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_guarantees_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_section_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_standards_section_items" CASCADE;
  DROP TABLE "pages_blocks_standards_section_items_locales" CASCADE;
  DROP TABLE "pages_blocks_standards_section" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_section_items" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_section_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_section" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_science_board_section_members_bio" CASCADE;
  DROP TABLE "pages_blocks_science_board_section_members_bio_locales" CASCADE;
  DROP TABLE "pages_blocks_science_board_section_members" CASCADE;
  DROP TABLE "pages_blocks_science_board_section_members_locales" CASCADE;
  DROP TABLE "pages_blocks_science_board_section" CASCADE;
  DROP TABLE "pages_blocks_science_board_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section_members_bio" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section_members_bio_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section_members" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section" CASCADE;
  DROP TABLE "_pages_v_blocks_science_board_section_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_athletes_section_athletes" CASCADE;
  DROP TABLE "pages_blocks_athletes_section_athletes_locales" CASCADE;
  DROP TABLE "pages_blocks_athletes_section" CASCADE;
  DROP TABLE "pages_blocks_athletes_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athletes_section_athletes" CASCADE;
  DROP TABLE "_pages_v_blocks_athletes_section_athletes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athletes_section" CASCADE;
  DROP TABLE "_pages_v_blocks_athletes_section_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_outcomes_cards" CASCADE;
  DROP TABLE "pages_blocks_outcomes_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_outcomes" CASCADE;
  DROP TABLE "pages_blocks_outcomes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_what_arrives_replaces_items" CASCADE;
  DROP TABLE "pages_blocks_what_arrives_replaces_items_locales" CASCADE;
  DROP TABLE "pages_blocks_what_arrives_cards" CASCADE;
  DROP TABLE "pages_blocks_what_arrives_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_what_arrives" CASCADE;
  DROP TABLE "pages_blocks_what_arrives_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives_replaces_items" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives_replaces_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives" CASCADE;
  DROP TABLE "_pages_v_blocks_what_arrives_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_gut_first_nodes" CASCADE;
  DROP TABLE "pages_blocks_gut_first_nodes_locales" CASCADE;
  DROP TABLE "pages_blocks_gut_first" CASCADE;
  DROP TABLE "pages_blocks_gut_first_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gut_first_nodes" CASCADE;
  DROP TABLE "_pages_v_blocks_gut_first_nodes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gut_first" CASCADE;
  DROP TABLE "_pages_v_blocks_gut_first_locales" CASCADE;`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_two_models" DROP CONSTRAINT "pages_blocks_two_models_nb1_logo_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_two_models" DROP CONSTRAINT "_pages_v_blocks_two_models_nb1_logo_id_media_id_fk";
  
  DROP INDEX "pages_blocks_two_models_nb1_logo_idx";
  DROP INDEX "_pages_v_blocks_two_models_nb1_logo_idx";
  ALTER TABLE "pages_blocks_two_models" DROP COLUMN "nb1_logo_id";
  ALTER TABLE "_pages_v_blocks_two_models" DROP COLUMN "nb1_logo_id";`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_two_models_rows" CASCADE;
  DROP TABLE "pages_blocks_two_models_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_two_models" CASCADE;
  DROP TABLE "pages_blocks_two_models_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_two_models_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_two_models_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_two_models" CASCADE;
  DROP TABLE "_pages_v_blocks_two_models_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_homepage_hero" CASCADE;
  DROP TABLE "pages_blocks_homepage_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_strip_items" CASCADE;
  DROP TABLE "pages_blocks_trust_strip_items_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_strip" CASCADE;
  DROP TABLE "pages_blocks_stat_flip_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_stat_flip_cards_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_stat_flip_cards" CASCADE;
  DROP TABLE "pages_blocks_stat_flip_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_two_model_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_two_model_comparison_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_two_model_comparison" CASCADE;
  DROP TABLE "pages_blocks_two_model_comparison_locales" CASCADE;
  DROP TABLE "pages_blocks_process_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_process_timeline_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process_timeline" CASCADE;
  DROP TABLE "pages_blocks_process_timeline_locales" CASCADE;
  DROP TABLE "pages_blocks_product_trio_replaces_items" CASCADE;
  DROP TABLE "pages_blocks_product_trio_replaces_items_locales" CASCADE;
  DROP TABLE "pages_blocks_product_trio_products" CASCADE;
  DROP TABLE "pages_blocks_product_trio_products_locales" CASCADE;
  DROP TABLE "pages_blocks_product_trio" CASCADE;
  DROP TABLE "pages_blocks_product_trio_locales" CASCADE;
  DROP TABLE "pages_blocks_standards_bar_items" CASCADE;
  DROP TABLE "pages_blocks_standards_bar_items_locales" CASCADE;
  DROP TABLE "pages_blocks_standards_bar" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_plans_features" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_plans_features_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_plans" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_guarantee_items" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_guarantee_items_locales" CASCADE;
  DROP TABLE "pages_blocks_plans_grid" CASCADE;
  DROP TABLE "pages_blocks_plans_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_close_band" CASCADE;
  DROP TABLE "pages_blocks_close_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_homepage_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_homepage_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip_items" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_flip_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_flip_cards_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_flip_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_flip_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_two_model_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_two_model_comparison_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_two_model_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_two_model_comparison_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio_replaces_items" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio_replaces_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio_products" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio_products_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio" CASCADE;
  DROP TABLE "_pages_v_blocks_product_trio_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_bar_items" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_bar_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_standards_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_plans_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_guarantee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_guarantee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_plans_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_close_band" CASCADE;
  DROP TABLE "_pages_v_blocks_close_band_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_plans_grid_plans_style";
  DROP TYPE "public"."enum__pages_v_blocks_plans_grid_plans_style";`)

}
