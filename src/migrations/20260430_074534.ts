import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_bio_groups_rows_direction" AS ENUM('up', 'down', 'new'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_evolution_band_cycle2_items_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_var_bio_groups_rows_direction" AS ENUM('up', 'down', 'new'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_var_cycle2_items_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_hero_banner_variants_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_hero_banner_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_outcomes_section_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_process_diagram_steps_mock_rows_status" AS ENUM('ok', 'low'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_process_diagram_steps_visual_type" AS ENUM('image', 'mockReport'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_process_diagram_variants_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_process_diagram_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_stat_break_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__bio_groups_v_rows_direction" AS ENUM('up', 'down', 'new'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_evolution_band_cycle2_items_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__var_bio_groups_v_rows_direction" AS ENUM('up', 'down', 'new'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__var_cycle2_items_v_status" AS ENUM('unchanged', 'up', 'down', 'removed', 'added'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_variants_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_outcomes_section_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_process_diagram_steps_mock_rows_status" AS ENUM('ok', 'low'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_process_diagram_steps_visual_type" AS ENUM('image', 'mockReport'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_process_diagram_variants_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_process_diagram_background_color" AS ENUM('light', 'dark', 'darkNavy', 'teal', 'white', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_stat_break_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum_posts_source" AS ENUM('manual', 'api'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__posts_v_version_source" AS ENUM('manual', 'api'); EXCEPTION WHEN duplicate_object THEN null; END $$;
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
  
  CREATE TABLE "bio_groups_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum_bio_groups_rows_direction"
  );
  
  CREATE TABLE "bio_groups_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "bio_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "bio_groups_locales" (
  	"eyebrow" varchar,
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
  
  CREATE TABLE "pages_blocks_evolution_band_variants_cycle1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dose" varchar
  );
  
  CREATE TABLE "pages_blocks_evolution_band_variants_cycle1_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "var_bio_groups_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum_var_bio_groups_rows_direction"
  );
  
  CREATE TABLE "var_bio_groups_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "var_bio_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "var_bio_groups_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "var_cycle2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"status" "enum_var_cycle2_items_status" DEFAULT 'unchanged'
  );
  
  CREATE TABLE "var_cycle2_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"dark_mode" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_evolution_band_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"cycle2_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_evolution_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_evolution_band_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"cycle2_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_banner_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_banner_trust_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_banner_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_banner_outcomes_locales" (
  	"claim" varchar,
  	"anchor" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_banner_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum_pages_blocks_hero_banner_variants_background_color",
  	"background_color_custom" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_banner_variants_locales" (
  	"pill_text" jsonb,
  	"heading" jsonb,
  	"description" jsonb,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_hero_banner_background_color" DEFAULT 'light',
  	"background_color_custom" varchar,
  	"price" varchar,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_banner_locales" (
  	"pill_text" jsonb,
  	"heading" jsonb,
  	"price_prefix" varchar,
  	"price_suffix" varchar,
  	"description" jsonb,
  	"cta_button_text" varchar,
  	"launch_date" varchar,
  	"form_foot_note" varchar,
  	"success_message" varchar,
  	"outcomes_heading" varchar,
  	"outcomes_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_outcomes_section_outcome_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_outcomes_section_outcome_cards_locales" (
  	"front_name" varchar,
  	"back_eyebrow" varchar,
  	"back_title" varchar,
  	"back_body" varchar,
  	"back_foot" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_outcomes_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_outcomes_section_background_color" DEFAULT 'dark',
  	"background_color_custom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_outcomes_section_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_mock_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"percentage" numeric,
  	"status" "enum_pages_blocks_process_diagram_steps_mock_rows_status" DEFAULT 'ok'
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_mock_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marker" varchar
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_list_items_locales" (
  	"text" varchar,
  	"dose" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"visual_type" "enum_pages_blocks_process_diagram_steps_visual_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_url" varchar
  );
  
  CREATE TABLE "pages_blocks_process_diagram_steps_locales" (
  	"timeline_eyebrow" varchar,
  	"timeline_name" varchar,
  	"panel_tag" varchar,
  	"panel_heading" varchar,
  	"panel_body" varchar,
  	"image_alt" varchar,
  	"mock_eyebrow" varchar,
  	"mock_foot_label" varchar,
  	"mock_foot_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum_pages_blocks_process_diagram_variants_background_color",
  	"background_color_custom" varchar
  );
  
  CREATE TABLE "pages_blocks_process_diagram_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_diagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_process_diagram_background_color" DEFAULT 'light',
  	"background_color_custom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_diagram_locales" (
  	"eyebrow" varchar DEFAULT 'How NB¹ works',
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stat_break" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_stat_break_background_color" DEFAULT 'dark',
  	"background_color_custom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stat_break_locales" (
  	"stat_number" varchar,
  	"stat_suffix" varchar,
  	"heading_line1" varchar,
  	"heading_line2" varchar,
  	"highlighted_word" varchar,
  	"heading_after" varchar,
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
  
  CREATE TABLE "_bio_groups_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum__bio_groups_v_rows_direction",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bio_groups_v_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_bio_groups_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bio_groups_v_locales" (
  	"eyebrow" varchar,
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
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_var_bio_groups_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"delta" varchar,
  	"direction" "enum__var_bio_groups_v_rows_direction",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_var_bio_groups_v_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_var_bio_groups_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_var_bio_groups_v_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_var_cycle2_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dose" varchar,
  	"status" "enum__var_cycle2_items_v_status" DEFAULT 'unchanged',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_var_cycle2_items_v_locales" (
  	"name" varchar,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"dark_mode" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"cycle2_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"cycle2_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_trust_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_outcomes_locales" (
  	"claim" varchar,
  	"anchor" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum__pages_v_blocks_hero_banner_variants_background_color",
  	"background_color_custom" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_variants_locales" (
  	"pill_text" jsonb,
  	"heading" jsonb,
  	"description" jsonb,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_hero_banner_background_color" DEFAULT 'light',
  	"background_color_custom" varchar,
  	"price" varchar,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner_locales" (
  	"pill_text" jsonb,
  	"heading" jsonb,
  	"price_prefix" varchar,
  	"price_suffix" varchar,
  	"description" jsonb,
  	"cta_button_text" varchar,
  	"launch_date" varchar,
  	"form_foot_note" varchar,
  	"success_message" varchar,
  	"outcomes_heading" varchar,
  	"outcomes_footer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_section_outcome_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_section_outcome_cards_locales" (
  	"front_name" varchar,
  	"back_eyebrow" varchar,
  	"back_title" varchar,
  	"back_body" varchar,
  	"back_foot" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_outcomes_section_background_color" DEFAULT 'dark',
  	"background_color_custom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcomes_section_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_mock_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"percentage" numeric,
  	"status" "enum__pages_v_blocks_process_diagram_steps_mock_rows_status" DEFAULT 'ok',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_mock_rows_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"marker" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" (
  	"text" varchar,
  	"dose" varchar,
  	"benefit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_pills_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"visual_type" "enum__pages_v_blocks_process_diagram_steps_visual_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_steps_locales" (
  	"timeline_eyebrow" varchar,
  	"timeline_name" varchar,
  	"panel_tag" varchar,
  	"panel_heading" varchar,
  	"panel_body" varchar,
  	"image_alt" varchar,
  	"mock_eyebrow" varchar,
  	"mock_foot_label" varchar,
  	"mock_foot_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum__pages_v_blocks_process_diagram_variants_background_color",
  	"background_color_custom" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_process_diagram_background_color" DEFAULT 'light',
  	"background_color_custom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_diagram_locales" (
  	"eyebrow" varchar DEFAULT 'How NB¹ works',
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stat_break" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_stat_break_background_color" DEFAULT 'dark',
  	"background_color_custom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stat_break_locales" (
  	"stat_number" varchar,
  	"stat_suffix" varchar,
  	"heading_line1" varchar,
  	"heading_line2" varchar,
  	"highlighted_word" varchar,
  	"heading_after" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_id";
  
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_pa_fk";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_image";
  
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" DROP CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_fk";
  
  DROP INDEX "pages_blocks_product_showcase_panel_thumbnails_locales_local";
  DROP INDEX "_pages_v_blocks_product_showcase_panel_thumbnails_locales_lo";
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "source" "enum_posts_source" DEFAULT 'manual';
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "html_content" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_source" "enum__posts_v_version_source" DEFAULT 'manual';
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_html_content" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "api_key_index" varchar;
  ALTER TABLE "pages_blocks_early_access_variants" ADD CONSTRAINT "pages_blocks_early_access_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access_variants_locales" ADD CONSTRAINT "pages_blocks_early_access_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access" ADD CONSTRAINT "pages_blocks_early_access_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access" ADD CONSTRAINT "pages_blocks_early_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_early_access_locales" ADD CONSTRAINT "pages_blocks_early_access_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items" ADD CONSTRAINT "pages_blocks_evolution_band_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items_locales" ADD CONSTRAINT "pages_blocks_evolution_band_cycle1_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bio_groups_rows" ADD CONSTRAINT "bio_groups_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bio_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bio_groups_rows_locales" ADD CONSTRAINT "bio_groups_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bio_groups_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bio_groups" ADD CONSTRAINT "bio_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bio_groups_locales" ADD CONSTRAINT "bio_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bio_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items" ADD CONSTRAINT "pages_blocks_evolution_band_cycle2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items_locales" ADD CONSTRAINT "pages_blocks_evolution_band_cycle2_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_cycle2_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_variants_cycle1_items" ADD CONSTRAINT "pages_blocks_evolution_band_variants_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_variants_cycle1_items_locales" ADD CONSTRAINT "pages_blocks_evolution_band_variants_cycle1_items_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_bio_groups_rows" ADD CONSTRAINT "var_bio_groups_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."var_bio_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_bio_groups_rows_locales" ADD CONSTRAINT "var_bio_groups_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."var_bio_groups_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_bio_groups" ADD CONSTRAINT "var_bio_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_bio_groups_locales" ADD CONSTRAINT "var_bio_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."var_bio_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_cycle2_items" ADD CONSTRAINT "var_cycle2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "var_cycle2_items_locales" ADD CONSTRAINT "var_cycle2_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."var_cycle2_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_variants" ADD CONSTRAINT "pages_blocks_evolution_band_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_variants_locales" ADD CONSTRAINT "pages_blocks_evolution_band_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band" ADD CONSTRAINT "pages_blocks_evolution_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_locales" ADD CONSTRAINT "pages_blocks_evolution_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_trust_items" ADD CONSTRAINT "pages_blocks_hero_banner_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_trust_items_locales" ADD CONSTRAINT "pages_blocks_hero_banner_trust_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner_trust_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_outcomes" ADD CONSTRAINT "pages_blocks_hero_banner_outcomes_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_outcomes" ADD CONSTRAINT "pages_blocks_hero_banner_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_outcomes_locales" ADD CONSTRAINT "pages_blocks_hero_banner_outcomes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_variants" ADD CONSTRAINT "pages_blocks_hero_banner_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_variants_locales" ADD CONSTRAINT "pages_blocks_hero_banner_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner" ADD CONSTRAINT "pages_blocks_hero_banner_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner" ADD CONSTRAINT "pages_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner_locales" ADD CONSTRAINT "pages_blocks_hero_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_section_outcome_cards" ADD CONSTRAINT "pages_blocks_outcomes_section_outcome_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_section_outcome_cards" ADD CONSTRAINT "pages_blocks_outcomes_section_outcome_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_section_outcome_cards_locales" ADD CONSTRAINT "pages_blocks_outcomes_section_outcome_cards_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_section_outcome_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_section" ADD CONSTRAINT "pages_blocks_outcomes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcomes_section_locales" ADD CONSTRAINT "pages_blocks_outcomes_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_mock_rows" ADD CONSTRAINT "pages_blocks_process_diagram_steps_mock_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_mock_rows_locales" ADD CONSTRAINT "pages_blocks_process_diagram_steps_mock_rows_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps_mock_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items" ADD CONSTRAINT "pages_blocks_process_diagram_steps_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales" ADD CONSTRAINT "pages_blocks_process_diagram_steps_list_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_pills" ADD CONSTRAINT "pages_blocks_process_diagram_steps_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_pills_locales" ADD CONSTRAINT "pages_blocks_process_diagram_steps_pills_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps" ADD CONSTRAINT "pages_blocks_process_diagram_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps" ADD CONSTRAINT "pages_blocks_process_diagram_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_steps_locales" ADD CONSTRAINT "pages_blocks_process_diagram_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_variants" ADD CONSTRAINT "pages_blocks_process_diagram_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_variants_locales" ADD CONSTRAINT "pages_blocks_process_diagram_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram" ADD CONSTRAINT "pages_blocks_process_diagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_diagram_locales" ADD CONSTRAINT "pages_blocks_process_diagram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_break" ADD CONSTRAINT "pages_blocks_stat_break_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stat_break_locales" ADD CONSTRAINT "pages_blocks_stat_break_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_break"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_variants" ADD CONSTRAINT "_pages_v_blocks_early_access_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_variants_locales" ADD CONSTRAINT "_pages_v_blocks_early_access_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access" ADD CONSTRAINT "_pages_v_blocks_early_access_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access" ADD CONSTRAINT "_pages_v_blocks_early_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_early_access_locales" ADD CONSTRAINT "_pages_v_blocks_early_access_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_early_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle1_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bio_groups_v_rows" ADD CONSTRAINT "_bio_groups_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bio_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bio_groups_v_rows_locales" ADD CONSTRAINT "_bio_groups_v_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bio_groups_v_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bio_groups_v" ADD CONSTRAINT "_bio_groups_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bio_groups_v_locales" ADD CONSTRAINT "_bio_groups_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bio_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_cycle2_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_cycle2_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_cycle1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_cycle1_items_loca_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants_cycle1_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_bio_groups_v_rows" ADD CONSTRAINT "_var_bio_groups_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_var_bio_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_bio_groups_v_rows_locales" ADD CONSTRAINT "_var_bio_groups_v_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_var_bio_groups_v_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_bio_groups_v" ADD CONSTRAINT "_var_bio_groups_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_bio_groups_v_locales" ADD CONSTRAINT "_var_bio_groups_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_var_bio_groups_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_cycle2_items_v" ADD CONSTRAINT "_var_cycle2_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_var_cycle2_items_v_locales" ADD CONSTRAINT "_var_cycle2_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_var_cycle2_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band" ADD CONSTRAINT "_pages_v_blocks_evolution_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_trust_items" ADD CONSTRAINT "_pages_v_blocks_hero_banner_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_trust_items_locales" ADD CONSTRAINT "_pages_v_blocks_hero_banner_trust_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner_trust_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_outcomes" ADD CONSTRAINT "_pages_v_blocks_hero_banner_outcomes_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_outcomes" ADD CONSTRAINT "_pages_v_blocks_hero_banner_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_outcomes_locales" ADD CONSTRAINT "_pages_v_blocks_hero_banner_outcomes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_variants" ADD CONSTRAINT "_pages_v_blocks_hero_banner_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_variants_locales" ADD CONSTRAINT "_pages_v_blocks_hero_banner_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner" ADD CONSTRAINT "_pages_v_blocks_hero_banner_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner" ADD CONSTRAINT "_pages_v_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner_locales" ADD CONSTRAINT "_pages_v_blocks_hero_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_section_outcome_cards" ADD CONSTRAINT "_pages_v_blocks_outcomes_section_outcome_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_section_outcome_cards" ADD CONSTRAINT "_pages_v_blocks_outcomes_section_outcome_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_section_outcome_cards_locales" ADD CONSTRAINT "_pages_v_blocks_outcomes_section_outcome_cards_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_section_outcome_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_section" ADD CONSTRAINT "_pages_v_blocks_outcomes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcomes_section_locales" ADD CONSTRAINT "_pages_v_blocks_outcomes_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_mock_rows" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_mock_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_mock_rows_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_mock_rows_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps_mock_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_list_items_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_pills" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_pills_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_pills_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps_pills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_variants" ADD CONSTRAINT "_pages_v_blocks_process_diagram_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_variants_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_variants_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram" ADD CONSTRAINT "_pages_v_blocks_process_diagram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_diagram_locales" ADD CONSTRAINT "_pages_v_blocks_process_diagram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_diagram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_break" ADD CONSTRAINT "_pages_v_blocks_stat_break_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stat_break_locales" ADD CONSTRAINT "_pages_v_blocks_stat_break_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_break"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "bio_groups_rows_order_idx" ON "bio_groups_rows" USING btree ("_order");
  CREATE INDEX "bio_groups_rows_parent_id_idx" ON "bio_groups_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bio_groups_rows_locales_locale_parent_id_unique" ON "bio_groups_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bio_groups_order_idx" ON "bio_groups" USING btree ("_order");
  CREATE INDEX "bio_groups_parent_id_idx" ON "bio_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bio_groups_locales_locale_parent_id_unique" ON "bio_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_cycle2_items_order_idx" ON "pages_blocks_evolution_band_cycle2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_cycle2_items_parent_id_idx" ON "pages_blocks_evolution_band_cycle2_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_cycle2_items_locales_locale_pare" ON "pages_blocks_evolution_band_cycle2_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_variants_cycle1_items_order_idx" ON "pages_blocks_evolution_band_variants_cycle1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_variants_cycle1_items_parent_id_idx" ON "pages_blocks_evolution_band_variants_cycle1_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_variants_cycle1_items_locales_lo" ON "pages_blocks_evolution_band_variants_cycle1_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "var_bio_groups_rows_order_idx" ON "var_bio_groups_rows" USING btree ("_order");
  CREATE INDEX "var_bio_groups_rows_parent_id_idx" ON "var_bio_groups_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "var_bio_groups_rows_locales_locale_parent_id_unique" ON "var_bio_groups_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "var_bio_groups_order_idx" ON "var_bio_groups" USING btree ("_order");
  CREATE INDEX "var_bio_groups_parent_id_idx" ON "var_bio_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "var_bio_groups_locales_locale_parent_id_unique" ON "var_bio_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "var_cycle2_items_order_idx" ON "var_cycle2_items" USING btree ("_order");
  CREATE INDEX "var_cycle2_items_parent_id_idx" ON "var_cycle2_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "var_cycle2_items_locales_locale_parent_id_unique" ON "var_cycle2_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_variants_order_idx" ON "pages_blocks_evolution_band_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_variants_parent_id_idx" ON "pages_blocks_evolution_band_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_variants_locales_locale_parent_i" ON "pages_blocks_evolution_band_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_order_idx" ON "pages_blocks_evolution_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_parent_id_idx" ON "pages_blocks_evolution_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_evolution_band_path_idx" ON "pages_blocks_evolution_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_locales_locale_parent_id_unique" ON "pages_blocks_evolution_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_trust_items_order_idx" ON "pages_blocks_hero_banner_trust_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_banner_trust_items_parent_id_idx" ON "pages_blocks_hero_banner_trust_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_banner_trust_items_locales_locale_parent_i" ON "pages_blocks_hero_banner_trust_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_outcomes_order_idx" ON "pages_blocks_hero_banner_outcomes" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_banner_outcomes_parent_id_idx" ON "pages_blocks_hero_banner_outcomes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_outcomes_icon_idx" ON "pages_blocks_hero_banner_outcomes" USING btree ("icon_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_banner_outcomes_locales_locale_parent_id_u" ON "pages_blocks_hero_banner_outcomes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_variants_order_idx" ON "pages_blocks_hero_banner_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_banner_variants_parent_id_idx" ON "pages_blocks_hero_banner_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_banner_variants_locales_locale_parent_id_u" ON "pages_blocks_hero_banner_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_order_idx" ON "pages_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_banner_parent_id_idx" ON "pages_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_path_idx" ON "pages_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_banner_form_idx" ON "pages_blocks_hero_banner" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_banner_locales_locale_parent_id_unique" ON "pages_blocks_hero_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_outcomes_section_outcome_cards_order_idx" ON "pages_blocks_outcomes_section_outcome_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_section_outcome_cards_parent_id_idx" ON "pages_blocks_outcomes_section_outcome_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_section_outcome_cards_image_idx" ON "pages_blocks_outcomes_section_outcome_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_outcomes_section_outcome_cards_locales_locale_p" ON "pages_blocks_outcomes_section_outcome_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_outcomes_section_order_idx" ON "pages_blocks_outcomes_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcomes_section_parent_id_idx" ON "pages_blocks_outcomes_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcomes_section_path_idx" ON "pages_blocks_outcomes_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_outcomes_section_locales_locale_parent_id_uniqu" ON "pages_blocks_outcomes_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_steps_mock_rows_order_idx" ON "pages_blocks_process_diagram_steps_mock_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_steps_mock_rows_parent_id_idx" ON "pages_blocks_process_diagram_steps_mock_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_steps_mock_rows_locales_locale_" ON "pages_blocks_process_diagram_steps_mock_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_steps_list_items_order_idx" ON "pages_blocks_process_diagram_steps_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_steps_list_items_parent_id_idx" ON "pages_blocks_process_diagram_steps_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_steps_list_items_locales_locale" ON "pages_blocks_process_diagram_steps_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_steps_pills_order_idx" ON "pages_blocks_process_diagram_steps_pills" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_steps_pills_parent_id_idx" ON "pages_blocks_process_diagram_steps_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_steps_pills_locales_locale_pare" ON "pages_blocks_process_diagram_steps_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_steps_order_idx" ON "pages_blocks_process_diagram_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_steps_parent_id_idx" ON "pages_blocks_process_diagram_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_steps_image_idx" ON "pages_blocks_process_diagram_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_steps_locales_locale_parent_id_" ON "pages_blocks_process_diagram_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_variants_order_idx" ON "pages_blocks_process_diagram_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_variants_parent_id_idx" ON "pages_blocks_process_diagram_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_variants_locales_locale_parent_" ON "pages_blocks_process_diagram_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_order_idx" ON "pages_blocks_process_diagram" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_diagram_parent_id_idx" ON "pages_blocks_process_diagram" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_diagram_path_idx" ON "pages_blocks_process_diagram" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_process_diagram_locales_locale_parent_id_unique" ON "pages_blocks_process_diagram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stat_break_order_idx" ON "pages_blocks_stat_break" USING btree ("_order");
  CREATE INDEX "pages_blocks_stat_break_parent_id_idx" ON "pages_blocks_stat_break" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stat_break_path_idx" ON "pages_blocks_stat_break" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_stat_break_locales_locale_parent_id_unique" ON "pages_blocks_stat_break_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "_bio_groups_v_rows_order_idx" ON "_bio_groups_v_rows" USING btree ("_order");
  CREATE INDEX "_bio_groups_v_rows_parent_id_idx" ON "_bio_groups_v_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bio_groups_v_rows_locales_locale_parent_id_unique" ON "_bio_groups_v_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bio_groups_v_order_idx" ON "_bio_groups_v" USING btree ("_order");
  CREATE INDEX "_bio_groups_v_parent_id_idx" ON "_bio_groups_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bio_groups_v_locales_locale_parent_id_unique" ON "_bio_groups_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle2_items_order_idx" ON "_pages_v_blocks_evolution_band_cycle2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_cycle2_items_parent_id_idx" ON "_pages_v_blocks_evolution_band_cycle2_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_cycle2_items_locales_locale_p" ON "_pages_v_blocks_evolution_band_cycle2_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_cycle1_items_order_idx" ON "_pages_v_blocks_evolution_band_variants_cycle1_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_cycle1_items_parent_id_idx" ON "_pages_v_blocks_evolution_band_variants_cycle1_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_variants_cycle1_items_local_1" ON "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_var_bio_groups_v_rows_order_idx" ON "_var_bio_groups_v_rows" USING btree ("_order");
  CREATE INDEX "_var_bio_groups_v_rows_parent_id_idx" ON "_var_bio_groups_v_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_var_bio_groups_v_rows_locales_locale_parent_id_unique" ON "_var_bio_groups_v_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_var_bio_groups_v_order_idx" ON "_var_bio_groups_v" USING btree ("_order");
  CREATE INDEX "_var_bio_groups_v_parent_id_idx" ON "_var_bio_groups_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_var_bio_groups_v_locales_locale_parent_id_unique" ON "_var_bio_groups_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_var_cycle2_items_v_order_idx" ON "_var_cycle2_items_v" USING btree ("_order");
  CREATE INDEX "_var_cycle2_items_v_parent_id_idx" ON "_var_cycle2_items_v" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_var_cycle2_items_v_locales_locale_parent_id_unique" ON "_var_cycle2_items_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_order_idx" ON "_pages_v_blocks_evolution_band_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_parent_id_idx" ON "_pages_v_blocks_evolution_band_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_variants_locales_locale_paren" ON "_pages_v_blocks_evolution_band_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_order_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_parent_id_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_path_idx" ON "_pages_v_blocks_evolution_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_locales_locale_parent_id_uniq" ON "_pages_v_blocks_evolution_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_trust_items_order_idx" ON "_pages_v_blocks_hero_banner_trust_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_banner_trust_items_parent_id_idx" ON "_pages_v_blocks_hero_banner_trust_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_banner_trust_items_locales_locale_paren" ON "_pages_v_blocks_hero_banner_trust_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_outcomes_order_idx" ON "_pages_v_blocks_hero_banner_outcomes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_banner_outcomes_parent_id_idx" ON "_pages_v_blocks_hero_banner_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_outcomes_icon_idx" ON "_pages_v_blocks_hero_banner_outcomes" USING btree ("icon_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_banner_outcomes_locales_locale_parent_i" ON "_pages_v_blocks_hero_banner_outcomes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_variants_order_idx" ON "_pages_v_blocks_hero_banner_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_banner_variants_parent_id_idx" ON "_pages_v_blocks_hero_banner_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_banner_variants_locales_locale_parent_i" ON "_pages_v_blocks_hero_banner_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_order_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_banner_parent_id_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_path_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_banner_form_idx" ON "_pages_v_blocks_hero_banner" USING btree ("form_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_banner_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_section_outcome_cards_order_idx" ON "_pages_v_blocks_outcomes_section_outcome_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcomes_section_outcome_cards_parent_id_idx" ON "_pages_v_blocks_outcomes_section_outcome_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_section_outcome_cards_image_idx" ON "_pages_v_blocks_outcomes_section_outcome_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_outcomes_section_outcome_cards_locales_local" ON "_pages_v_blocks_outcomes_section_outcome_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_section_order_idx" ON "_pages_v_blocks_outcomes_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcomes_section_parent_id_idx" ON "_pages_v_blocks_outcomes_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcomes_section_path_idx" ON "_pages_v_blocks_outcomes_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_outcomes_section_locales_locale_parent_id_un" ON "_pages_v_blocks_outcomes_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_mock_rows_order_idx" ON "_pages_v_blocks_process_diagram_steps_mock_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_mock_rows_parent_id_idx" ON "_pages_v_blocks_process_diagram_steps_mock_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_steps_mock_rows_locales_loca" ON "_pages_v_blocks_process_diagram_steps_mock_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_list_items_order_idx" ON "_pages_v_blocks_process_diagram_steps_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_list_items_parent_id_idx" ON "_pages_v_blocks_process_diagram_steps_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_steps_list_items_locales_loc" ON "_pages_v_blocks_process_diagram_steps_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_pills_order_idx" ON "_pages_v_blocks_process_diagram_steps_pills" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_pills_parent_id_idx" ON "_pages_v_blocks_process_diagram_steps_pills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_steps_pills_locales_locale_p" ON "_pages_v_blocks_process_diagram_steps_pills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_order_idx" ON "_pages_v_blocks_process_diagram_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_parent_id_idx" ON "_pages_v_blocks_process_diagram_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_steps_image_idx" ON "_pages_v_blocks_process_diagram_steps" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_steps_locales_locale_parent_" ON "_pages_v_blocks_process_diagram_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_variants_order_idx" ON "_pages_v_blocks_process_diagram_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_variants_parent_id_idx" ON "_pages_v_blocks_process_diagram_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_variants_locales_locale_pare" ON "_pages_v_blocks_process_diagram_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_order_idx" ON "_pages_v_blocks_process_diagram" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_diagram_parent_id_idx" ON "_pages_v_blocks_process_diagram" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_diagram_path_idx" ON "_pages_v_blocks_process_diagram" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_diagram_locales_locale_parent_id_uni" ON "_pages_v_blocks_process_diagram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_break_order_idx" ON "_pages_v_blocks_stat_break" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stat_break_parent_id_idx" ON "_pages_v_blocks_stat_break" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stat_break_path_idx" ON "_pages_v_blocks_stat_break" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_stat_break_locales_locale_parent_id_unique" ON "_pages_v_blocks_stat_break_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales" ADD CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase_panel_thumbnails"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "pages_blocks_product_showcase_panel_thumbnails_image_idx" ON "pages_blocks_product_showcase_panel_thumbnails_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_product_showcase_panel_thumbnails_locales_local" ON "pages_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_image_idx" ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_locales_lo" ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_early_access_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_early_access_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bio_groups_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bio_groups_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bio_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bio_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_cycle2_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_variants_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_variants_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_bio_groups_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_bio_groups_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_bio_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_bio_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_cycle2_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "var_cycle2_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_evolution_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_trust_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_trust_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_outcomes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcomes_section_outcome_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcomes_section_outcome_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcomes_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcomes_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_mock_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_mock_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_pills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_pills_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_diagram_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_break" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stat_break_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_early_access_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bio_groups_v_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bio_groups_v_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bio_groups_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_bio_groups_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_bio_groups_v_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_bio_groups_v_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_bio_groups_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_bio_groups_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_cycle2_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_var_cycle2_items_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_evolution_band_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_trust_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_trust_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_outcomes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcomes_section_outcome_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcomes_section_outcome_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcomes_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcomes_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_mock_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_mock_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_pills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_pills_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_diagram_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_break" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stat_break_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_early_access_variants" CASCADE;
  DROP TABLE "pages_blocks_early_access_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_early_access" CASCADE;
  DROP TABLE "pages_blocks_early_access_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle1_items" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle1_items_locales" CASCADE;
  DROP TABLE "bio_groups_rows" CASCADE;
  DROP TABLE "bio_groups_rows_locales" CASCADE;
  DROP TABLE "bio_groups" CASCADE;
  DROP TABLE "bio_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle2_items" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_cycle2_items_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_variants_cycle1_items" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_variants_cycle1_items_locales" CASCADE;
  DROP TABLE "var_bio_groups_rows" CASCADE;
  DROP TABLE "var_bio_groups_rows_locales" CASCADE;
  DROP TABLE "var_bio_groups" CASCADE;
  DROP TABLE "var_bio_groups_locales" CASCADE;
  DROP TABLE "var_cycle2_items" CASCADE;
  DROP TABLE "var_cycle2_items_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_variants" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_evolution_band" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_trust_items" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_trust_items_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_outcomes" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_outcomes_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_variants" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_banner" CASCADE;
  DROP TABLE "pages_blocks_hero_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_outcomes_section_outcome_cards" CASCADE;
  DROP TABLE "pages_blocks_outcomes_section_outcome_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_outcomes_section" CASCADE;
  DROP TABLE "pages_blocks_outcomes_section_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_mock_rows" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_mock_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_list_items" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_list_items_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_pills" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_pills_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_variants" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_process_diagram" CASCADE;
  DROP TABLE "pages_blocks_process_diagram_locales" CASCADE;
  DROP TABLE "pages_blocks_stat_break" CASCADE;
  DROP TABLE "pages_blocks_stat_break_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access" CASCADE;
  DROP TABLE "_pages_v_blocks_early_access_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle1_items" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle1_items_locales" CASCADE;
  DROP TABLE "_bio_groups_v_rows" CASCADE;
  DROP TABLE "_bio_groups_v_rows_locales" CASCADE;
  DROP TABLE "_bio_groups_v" CASCADE;
  DROP TABLE "_bio_groups_v_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_cycle2_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" CASCADE;
  DROP TABLE "_var_bio_groups_v_rows" CASCADE;
  DROP TABLE "_var_bio_groups_v_rows_locales" CASCADE;
  DROP TABLE "_var_bio_groups_v" CASCADE;
  DROP TABLE "_var_bio_groups_v_locales" CASCADE;
  DROP TABLE "_var_cycle2_items_v" CASCADE;
  DROP TABLE "_var_cycle2_items_v_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_trust_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_trust_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_outcomes" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_outcomes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_section_outcome_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_section_outcome_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_section" CASCADE;
  DROP TABLE "_pages_v_blocks_outcomes_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_mock_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_mock_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_pills" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_pills_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram" CASCADE;
  DROP TABLE "_pages_v_blocks_process_diagram_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_break" CASCADE;
  DROP TABLE "_pages_v_blocks_stat_break_locales" CASCADE;
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
  DROP TYPE "public"."enum_bio_groups_rows_direction";
  DROP TYPE "public"."enum_pages_blocks_evolution_band_cycle2_items_status";
  DROP TYPE "public"."enum_var_bio_groups_rows_direction";
  DROP TYPE "public"."enum_var_cycle2_items_status";
  DROP TYPE "public"."enum_pages_blocks_hero_banner_variants_background_color";
  DROP TYPE "public"."enum_pages_blocks_hero_banner_background_color";
  DROP TYPE "public"."enum_pages_blocks_outcomes_section_background_color";
  DROP TYPE "public"."enum_pages_blocks_process_diagram_steps_mock_rows_status";
  DROP TYPE "public"."enum_pages_blocks_process_diagram_steps_visual_type";
  DROP TYPE "public"."enum_pages_blocks_process_diagram_variants_background_color";
  DROP TYPE "public"."enum_pages_blocks_process_diagram_background_color";
  DROP TYPE "public"."enum_pages_blocks_stat_break_background_color";
  DROP TYPE "public"."enum__bio_groups_v_rows_direction";
  DROP TYPE "public"."enum__pages_v_blocks_evolution_band_cycle2_items_status";
  DROP TYPE "public"."enum__var_bio_groups_v_rows_direction";
  DROP TYPE "public"."enum__var_cycle2_items_v_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_banner_variants_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_banner_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_outcomes_section_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_process_diagram_steps_mock_rows_status";
  DROP TYPE "public"."enum__pages_v_blocks_process_diagram_steps_visual_type";
  DROP TYPE "public"."enum__pages_v_blocks_process_diagram_variants_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_process_diagram_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_stat_break_background_color";
  DROP TYPE "public"."enum_posts_source";
  DROP TYPE "public"."enum__posts_v_version_source";`)
}
