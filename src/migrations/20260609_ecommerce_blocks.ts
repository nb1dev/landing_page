import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_order_step_hero_seals_type" AS ENUM('stars', 'dot');
  CREATE TYPE "public"."enum_pages_blocks_trust_seals_bar_seals_type" AS ENUM('stars', 'dot');
  CREATE TYPE "public"."enum_pages_blocks_formula_kit_components_icon" AS ENUM('sun', 'moon', 'shield');
  CREATE TYPE "public"."enum_pages_blocks_end_card_ctas_variant" AS ENUM('advanced', 'core', 'core-primary', 'core-alt');
  CREATE TYPE "public"."enum__pages_v_blocks_order_step_hero_seals_type" AS ENUM('stars', 'dot');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_seals_bar_seals_type" AS ENUM('stars', 'dot');
  CREATE TYPE "public"."enum__pages_v_blocks_formula_kit_components_icon" AS ENUM('sun', 'moon', 'shield');
  CREATE TYPE "public"."enum__pages_v_blocks_end_card_ctas_variant" AS ENUM('advanced', 'core', 'core-primary', 'core-alt');
  CREATE TABLE "pages_blocks_order_step_hero_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_order_step_hero_seals_type" DEFAULT 'dot',
  	"rating" varchar
  );
  
  CREATE TABLE "pages_blocks_order_step_hero_seals_locales" (
  	"label" varchar,
  	"short_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_step_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_seals" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_order_step_hero_locales" (
  	"headline_prefix" varchar,
  	"headline_teal" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_seals_bar_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_trust_seals_bar_seals_type" DEFAULT 'dot',
  	"rating" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_seals_bar_seals_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_trust_seals_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_order_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_payment_step" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_order_timeline_steps_locales" (
  	"week_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_timeline_advanced_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_timeline_advanced_extras_locales" (
  	"week_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_advanced_extras" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_order_timeline_locales" (
  	"section_title" varchar,
  	"subtitle" varchar,
  	"advanced_pill_label" varchar DEFAULT 'Advanced',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_formula_kit_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_formula_kit_components_icon" DEFAULT 'sun'
  );
  
  CREATE TABLE "pages_blocks_formula_kit_components_locales" (
  	"name" varchar,
  	"timing" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_formula_kit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kit_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_formula_kit_locales" (
  	"section_title_prefix" varchar,
  	"section_title_teal" varchar,
  	"kit_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_checkout_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_checkout_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_checkout_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_checkout_faq_locales" (
  	"section_title" varchar DEFAULT 'Common questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_end_card_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"variant" "enum_pages_blocks_end_card_ctas_variant" DEFAULT 'advanced'
  );
  
  CREATE TABLE "pages_blocks_end_card_ctas_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_end_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_end_card_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_step_hero_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_order_step_hero_seals_type" DEFAULT 'dot',
  	"rating" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_step_hero_seals_locales" (
  	"label" varchar,
  	"short_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_step_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_seals" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_step_hero_locales" (
  	"headline_prefix" varchar,
  	"headline_teal" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_seals_bar_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_trust_seals_bar_seals_type" DEFAULT 'dot',
  	"rating" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_seals_bar_seals_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_trust_seals_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_payment_step" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline_steps_locales" (
  	"week_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline_advanced_extras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline_advanced_extras_locales" (
  	"week_label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_advanced_extras" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_timeline_locales" (
  	"section_title" varchar,
  	"subtitle" varchar,
  	"advanced_pill_label" varchar DEFAULT 'Advanced',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_formula_kit_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_formula_kit_components_icon" DEFAULT 'sun',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_formula_kit_components_locales" (
  	"name" varchar,
  	"timing" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_formula_kit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kit_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_formula_kit_locales" (
  	"section_title_prefix" varchar,
  	"section_title_teal" varchar,
  	"kit_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_checkout_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_checkout_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_checkout_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_checkout_faq_locales" (
  	"section_title" varchar DEFAULT 'Common questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_end_card_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_end_card_ctas_variant" DEFAULT 'advanced',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_end_card_ctas_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_end_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_end_card_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_order_step_hero_seals" ADD CONSTRAINT "pages_blocks_order_step_hero_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_step_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_step_hero_seals_locales" ADD CONSTRAINT "pages_blocks_order_step_hero_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_step_hero_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_step_hero" ADD CONSTRAINT "pages_blocks_order_step_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_step_hero_locales" ADD CONSTRAINT "pages_blocks_order_step_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_step_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_seals_bar_seals" ADD CONSTRAINT "pages_blocks_trust_seals_bar_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_seals_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_seals_bar_seals_locales" ADD CONSTRAINT "pages_blocks_trust_seals_bar_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_seals_bar_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_seals_bar" ADD CONSTRAINT "pages_blocks_trust_seals_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline_steps" ADD CONSTRAINT "pages_blocks_order_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline_steps_locales" ADD CONSTRAINT "pages_blocks_order_timeline_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_timeline_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline_advanced_extras" ADD CONSTRAINT "pages_blocks_order_timeline_advanced_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline_advanced_extras_locales" ADD CONSTRAINT "pages_blocks_order_timeline_advanced_extras_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_timeline_advanced_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline" ADD CONSTRAINT "pages_blocks_order_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_timeline_locales" ADD CONSTRAINT "pages_blocks_order_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formula_kit_components" ADD CONSTRAINT "pages_blocks_formula_kit_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_formula_kit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formula_kit_components_locales" ADD CONSTRAINT "pages_blocks_formula_kit_components_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_formula_kit_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formula_kit" ADD CONSTRAINT "pages_blocks_formula_kit_kit_image_id_media_id_fk" FOREIGN KEY ("kit_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_formula_kit" ADD CONSTRAINT "pages_blocks_formula_kit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_formula_kit_locales" ADD CONSTRAINT "pages_blocks_formula_kit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_formula_kit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checkout_faq_items" ADD CONSTRAINT "pages_blocks_checkout_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checkout_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checkout_faq_items_locales" ADD CONSTRAINT "pages_blocks_checkout_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checkout_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checkout_faq" ADD CONSTRAINT "pages_blocks_checkout_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_checkout_faq_locales" ADD CONSTRAINT "pages_blocks_checkout_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_checkout_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_end_card_ctas" ADD CONSTRAINT "pages_blocks_end_card_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_end_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_end_card_ctas_locales" ADD CONSTRAINT "pages_blocks_end_card_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_end_card_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_end_card" ADD CONSTRAINT "pages_blocks_end_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_end_card_locales" ADD CONSTRAINT "pages_blocks_end_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_end_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_step_hero_seals" ADD CONSTRAINT "_pages_v_blocks_order_step_hero_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_step_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_step_hero_seals_locales" ADD CONSTRAINT "_pages_v_blocks_order_step_hero_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_step_hero_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_step_hero" ADD CONSTRAINT "_pages_v_blocks_order_step_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" ADD CONSTRAINT "_pages_v_blocks_order_step_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_step_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_seals_bar_seals" ADD CONSTRAINT "_pages_v_blocks_trust_seals_bar_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_seals_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_seals_bar_seals_locales" ADD CONSTRAINT "_pages_v_blocks_trust_seals_bar_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_seals_bar_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_seals_bar" ADD CONSTRAINT "_pages_v_blocks_trust_seals_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline_steps" ADD CONSTRAINT "_pages_v_blocks_order_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline_steps_locales" ADD CONSTRAINT "_pages_v_blocks_order_timeline_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_timeline_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline_advanced_extras" ADD CONSTRAINT "_pages_v_blocks_order_timeline_advanced_extras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline_advanced_extras_locales" ADD CONSTRAINT "_pages_v_blocks_order_timeline_advanced_extras_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_timeline_advanced_extras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline" ADD CONSTRAINT "_pages_v_blocks_order_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_timeline_locales" ADD CONSTRAINT "_pages_v_blocks_order_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formula_kit_components" ADD CONSTRAINT "_pages_v_blocks_formula_kit_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_formula_kit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formula_kit_components_locales" ADD CONSTRAINT "_pages_v_blocks_formula_kit_components_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_formula_kit_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formula_kit" ADD CONSTRAINT "_pages_v_blocks_formula_kit_kit_image_id_media_id_fk" FOREIGN KEY ("kit_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formula_kit" ADD CONSTRAINT "_pages_v_blocks_formula_kit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" ADD CONSTRAINT "_pages_v_blocks_formula_kit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_formula_kit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checkout_faq_items" ADD CONSTRAINT "_pages_v_blocks_checkout_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checkout_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checkout_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_checkout_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checkout_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checkout_faq" ADD CONSTRAINT "_pages_v_blocks_checkout_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checkout_faq_locales" ADD CONSTRAINT "_pages_v_blocks_checkout_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_checkout_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_end_card_ctas" ADD CONSTRAINT "_pages_v_blocks_end_card_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_end_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_end_card_ctas_locales" ADD CONSTRAINT "_pages_v_blocks_end_card_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_end_card_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_end_card" ADD CONSTRAINT "_pages_v_blocks_end_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_end_card_locales" ADD CONSTRAINT "_pages_v_blocks_end_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_end_card"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_order_step_hero_seals_order_idx" ON "pages_blocks_order_step_hero_seals" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_step_hero_seals_parent_id_idx" ON "pages_blocks_order_step_hero_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_order_step_hero_seals_locales_locale_parent_id_" ON "pages_blocks_order_step_hero_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_order_step_hero_order_idx" ON "pages_blocks_order_step_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_step_hero_parent_id_idx" ON "pages_blocks_order_step_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_step_hero_path_idx" ON "pages_blocks_order_step_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_order_step_hero_locales_locale_parent_id_unique" ON "pages_blocks_order_step_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_seals_bar_seals_order_idx" ON "pages_blocks_trust_seals_bar_seals" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_seals_bar_seals_parent_id_idx" ON "pages_blocks_trust_seals_bar_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_trust_seals_bar_seals_locales_locale_parent_id_" ON "pages_blocks_trust_seals_bar_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_trust_seals_bar_order_idx" ON "pages_blocks_trust_seals_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_seals_bar_parent_id_idx" ON "pages_blocks_trust_seals_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_seals_bar_path_idx" ON "pages_blocks_trust_seals_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_order_timeline_steps_order_idx" ON "pages_blocks_order_timeline_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_timeline_steps_parent_id_idx" ON "pages_blocks_order_timeline_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_order_timeline_steps_locales_locale_parent_id_u" ON "pages_blocks_order_timeline_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_order_timeline_advanced_extras_order_idx" ON "pages_blocks_order_timeline_advanced_extras" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_timeline_advanced_extras_parent_id_idx" ON "pages_blocks_order_timeline_advanced_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_order_timeline_advanced_extras_locales_locale_p" ON "pages_blocks_order_timeline_advanced_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_order_timeline_order_idx" ON "pages_blocks_order_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_timeline_parent_id_idx" ON "pages_blocks_order_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_timeline_path_idx" ON "pages_blocks_order_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_order_timeline_locales_locale_parent_id_unique" ON "pages_blocks_order_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_formula_kit_components_order_idx" ON "pages_blocks_formula_kit_components" USING btree ("_order");
  CREATE INDEX "pages_blocks_formula_kit_components_parent_id_idx" ON "pages_blocks_formula_kit_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_formula_kit_components_locales_locale_parent_id" ON "pages_blocks_formula_kit_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_formula_kit_order_idx" ON "pages_blocks_formula_kit" USING btree ("_order");
  CREATE INDEX "pages_blocks_formula_kit_parent_id_idx" ON "pages_blocks_formula_kit" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_formula_kit_path_idx" ON "pages_blocks_formula_kit" USING btree ("_path");
  CREATE INDEX "pages_blocks_formula_kit_kit_image_idx" ON "pages_blocks_formula_kit" USING btree ("kit_image_id");
  CREATE UNIQUE INDEX "pages_blocks_formula_kit_locales_locale_parent_id_unique" ON "pages_blocks_formula_kit_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_checkout_faq_items_order_idx" ON "pages_blocks_checkout_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_checkout_faq_items_parent_id_idx" ON "pages_blocks_checkout_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_checkout_faq_items_locales_locale_parent_id_uni" ON "pages_blocks_checkout_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_checkout_faq_order_idx" ON "pages_blocks_checkout_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_checkout_faq_parent_id_idx" ON "pages_blocks_checkout_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checkout_faq_path_idx" ON "pages_blocks_checkout_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_checkout_faq_locales_locale_parent_id_unique" ON "pages_blocks_checkout_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_end_card_ctas_order_idx" ON "pages_blocks_end_card_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_end_card_ctas_parent_id_idx" ON "pages_blocks_end_card_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_end_card_ctas_locales_locale_parent_id_unique" ON "pages_blocks_end_card_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_end_card_order_idx" ON "pages_blocks_end_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_end_card_parent_id_idx" ON "pages_blocks_end_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_end_card_path_idx" ON "pages_blocks_end_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_end_card_locales_locale_parent_id_unique" ON "pages_blocks_end_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_step_hero_seals_order_idx" ON "_pages_v_blocks_order_step_hero_seals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_step_hero_seals_parent_id_idx" ON "_pages_v_blocks_order_step_hero_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_step_hero_seals_locales_locale_parent_" ON "_pages_v_blocks_order_step_hero_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_step_hero_order_idx" ON "_pages_v_blocks_order_step_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_step_hero_parent_id_idx" ON "_pages_v_blocks_order_step_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_step_hero_path_idx" ON "_pages_v_blocks_order_step_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_step_hero_locales_locale_parent_id_uni" ON "_pages_v_blocks_order_step_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_seals_bar_seals_order_idx" ON "_pages_v_blocks_trust_seals_bar_seals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_seals_bar_seals_parent_id_idx" ON "_pages_v_blocks_trust_seals_bar_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_trust_seals_bar_seals_locales_locale_parent_" ON "_pages_v_blocks_trust_seals_bar_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_seals_bar_order_idx" ON "_pages_v_blocks_trust_seals_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_seals_bar_parent_id_idx" ON "_pages_v_blocks_trust_seals_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_seals_bar_path_idx" ON "_pages_v_blocks_trust_seals_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_order_timeline_steps_order_idx" ON "_pages_v_blocks_order_timeline_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_timeline_steps_parent_id_idx" ON "_pages_v_blocks_order_timeline_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_timeline_steps_locales_locale_parent_i" ON "_pages_v_blocks_order_timeline_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_timeline_advanced_extras_order_idx" ON "_pages_v_blocks_order_timeline_advanced_extras" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_timeline_advanced_extras_parent_id_idx" ON "_pages_v_blocks_order_timeline_advanced_extras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_timeline_advanced_extras_locales_local" ON "_pages_v_blocks_order_timeline_advanced_extras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_timeline_order_idx" ON "_pages_v_blocks_order_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_timeline_parent_id_idx" ON "_pages_v_blocks_order_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_timeline_path_idx" ON "_pages_v_blocks_order_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_timeline_locales_locale_parent_id_uniq" ON "_pages_v_blocks_order_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_formula_kit_components_order_idx" ON "_pages_v_blocks_formula_kit_components" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_formula_kit_components_parent_id_idx" ON "_pages_v_blocks_formula_kit_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_formula_kit_components_locales_locale_parent" ON "_pages_v_blocks_formula_kit_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_formula_kit_order_idx" ON "_pages_v_blocks_formula_kit" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_formula_kit_parent_id_idx" ON "_pages_v_blocks_formula_kit" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_formula_kit_path_idx" ON "_pages_v_blocks_formula_kit" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_formula_kit_kit_image_idx" ON "_pages_v_blocks_formula_kit" USING btree ("kit_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_formula_kit_locales_locale_parent_id_unique" ON "_pages_v_blocks_formula_kit_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_checkout_faq_items_order_idx" ON "_pages_v_blocks_checkout_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checkout_faq_items_parent_id_idx" ON "_pages_v_blocks_checkout_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_checkout_faq_items_locales_locale_parent_id_" ON "_pages_v_blocks_checkout_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_checkout_faq_order_idx" ON "_pages_v_blocks_checkout_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checkout_faq_parent_id_idx" ON "_pages_v_blocks_checkout_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checkout_faq_path_idx" ON "_pages_v_blocks_checkout_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_checkout_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_checkout_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_end_card_ctas_order_idx" ON "_pages_v_blocks_end_card_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_end_card_ctas_parent_id_idx" ON "_pages_v_blocks_end_card_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_end_card_ctas_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_end_card_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_end_card_order_idx" ON "_pages_v_blocks_end_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_end_card_parent_id_idx" ON "_pages_v_blocks_end_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_end_card_path_idx" ON "_pages_v_blocks_end_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_end_card_locales_locale_parent_id_unique" ON "_pages_v_blocks_end_card_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_order_step_hero_locales" ADD COLUMN "headline" jsonb;
  ALTER TABLE "pages_blocks_formula_kit_locales" ADD COLUMN "section_title" jsonb;
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" ADD COLUMN "headline" jsonb;
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" ADD COLUMN "section_title" jsonb;
  ALTER TABLE "pages_blocks_order_step_hero_locales" DROP COLUMN "headline_prefix";
  ALTER TABLE "pages_blocks_order_step_hero_locales" DROP COLUMN "headline_teal";
  ALTER TABLE "pages_blocks_formula_kit_locales" DROP COLUMN "section_title_prefix";
  ALTER TABLE "pages_blocks_formula_kit_locales" DROP COLUMN "section_title_teal";
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" DROP COLUMN "headline_prefix";
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" DROP COLUMN "headline_teal";
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" DROP COLUMN "section_title_prefix";
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" DROP COLUMN "section_title_teal";`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_plan_summary_card_plan_variant" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_reinforce_cta_variant" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_plan_pivot_direction" AS ENUM('upsell', 'downsell');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_summary_card_plan_variant" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_reinforce_cta_variant" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_pivot_direction" AS ENUM('upsell', 'downsell');
  CREATE TABLE "pages_blocks_plan_summary_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_summary_card_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_summary_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_variant" "enum_pages_blocks_plan_summary_card_plan_variant" DEFAULT 'core',
  	"switch_link_href" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plan_summary_card_locales" (
  	"plan_name" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"switch_link_text" varchar,
  	"primary_cta_text" varchar,
  	"primary_cta_price" varchar,
  	"secondary_cta_text" varchar,
  	"cta_sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_guarantee_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_guarantee_badges_items_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_guarantee_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_athlete_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_athlete_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_locales" (
  	"section_title" varchar,
  	"subtitle" varchar,
  	"athlete_seal_text" varchar,
  	"plan_name" varchar,
  	"monthly_note" varchar,
  	"footer_note" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reinforce_cta_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reinforce_cta_seals_locales" (
  	"bold_text" varchar,
  	"regular_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reinforce_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"variant" "enum_pages_blocks_reinforce_cta_variant" DEFAULT 'core',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reinforce_cta_locales" (
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_pivot_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_pivot_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_pivot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"direction" "enum_pages_blocks_plan_pivot_direction" DEFAULT 'upsell',
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plan_pivot_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sticky_cta_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_cta_bar_locales" (
  	"primary_cta_text" varchar,
  	"secondary_cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"plan_variant" "enum__pages_v_blocks_plan_summary_card_plan_variant" DEFAULT 'core',
  	"switch_link_href" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card_locales" (
  	"plan_name" varchar,
  	"price" varchar,
  	"price_note" varchar,
  	"switch_link_text" varchar,
  	"primary_cta_text" varchar,
  	"primary_cta_price" varchar,
  	"secondary_cta_text" varchar,
  	"cta_sub_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_guarantee_badges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_guarantee_badges_items_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_guarantee_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_locales" (
  	"section_title" varchar,
  	"subtitle" varchar,
  	"athlete_seal_text" varchar,
  	"plan_name" varchar,
  	"monthly_note" varchar,
  	"footer_note" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reinforce_cta_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reinforce_cta_seals_locales" (
  	"bold_text" varchar,
  	"regular_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reinforce_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"variant" "enum__pages_v_blocks_reinforce_cta_variant" DEFAULT 'core',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reinforce_cta_locales" (
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_pivot_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_pivot_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_pivot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"direction" "enum__pages_v_blocks_plan_pivot_direction" DEFAULT 'upsell',
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_pivot_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_cta_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_cta_href" varchar,
  	"secondary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_cta_bar_locales" (
  	"primary_cta_text" varchar,
  	"secondary_cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_plan_summary_card_bullets" ADD CONSTRAINT "pages_blocks_plan_summary_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_summary_card_bullets_locales" ADD CONSTRAINT "pages_blocks_plan_summary_card_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_summary_card_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_summary_card" ADD CONSTRAINT "pages_blocks_plan_summary_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_summary_card_locales" ADD CONSTRAINT "pages_blocks_plan_summary_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guarantee_badges_items" ADD CONSTRAINT "pages_blocks_guarantee_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_guarantee_badges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guarantee_badges_items_locales" ADD CONSTRAINT "pages_blocks_guarantee_badges_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_guarantee_badges_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guarantee_badges" ADD CONSTRAINT "pages_blocks_guarantee_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_athlete_images" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_athlete_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_athlete_images" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_athlete_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_athlete_images_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_athlete_images_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid_athlete_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reinforce_cta_seals" ADD CONSTRAINT "pages_blocks_reinforce_cta_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reinforce_cta_seals_locales" ADD CONSTRAINT "pages_blocks_reinforce_cta_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reinforce_cta_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reinforce_cta" ADD CONSTRAINT "pages_blocks_reinforce_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reinforce_cta_locales" ADD CONSTRAINT "pages_blocks_reinforce_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_pivot_bullets" ADD CONSTRAINT "pages_blocks_plan_pivot_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_pivot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_pivot_bullets_locales" ADD CONSTRAINT "pages_blocks_plan_pivot_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_pivot_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_pivot" ADD CONSTRAINT "pages_blocks_plan_pivot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_pivot_locales" ADD CONSTRAINT "pages_blocks_plan_pivot_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_pivot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_cta_bar" ADD CONSTRAINT "pages_blocks_sticky_cta_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_cta_bar_locales" ADD CONSTRAINT "pages_blocks_sticky_cta_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_cta_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_bullets" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_bullets_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_summary_card_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guarantee_badges_items" ADD CONSTRAINT "_pages_v_blocks_guarantee_badges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_guarantee_badges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guarantee_badges_items_locales" ADD CONSTRAINT "_pages_v_blocks_guarantee_badges_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_guarantee_badges_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guarantee_badges" ADD CONSTRAINT "_pages_v_blocks_guarantee_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_athlete_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_athlete_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_athlete_images_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid_athlete_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_seals" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_seals_locales" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reinforce_cta_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_locales" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_pivot_bullets" ADD CONSTRAINT "_pages_v_blocks_plan_pivot_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_pivot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_pivot_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_plan_pivot_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_pivot_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_pivot" ADD CONSTRAINT "_pages_v_blocks_plan_pivot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_pivot_locales" ADD CONSTRAINT "_pages_v_blocks_plan_pivot_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_pivot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_cta_bar" ADD CONSTRAINT "_pages_v_blocks_sticky_cta_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_cta_bar_locales" ADD CONSTRAINT "_pages_v_blocks_sticky_cta_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sticky_cta_bar"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plan_summary_card_bullets_order_idx" ON "pages_blocks_plan_summary_card_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_summary_card_bullets_parent_id_idx" ON "pages_blocks_plan_summary_card_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_summary_card_bullets_locales_locale_parent" ON "pages_blocks_plan_summary_card_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_summary_card_order_idx" ON "pages_blocks_plan_summary_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_summary_card_parent_id_idx" ON "pages_blocks_plan_summary_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plan_summary_card_path_idx" ON "pages_blocks_plan_summary_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plan_summary_card_locales_locale_parent_id_uniq" ON "pages_blocks_plan_summary_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_guarantee_badges_items_order_idx" ON "pages_blocks_guarantee_badges_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_guarantee_badges_items_parent_id_idx" ON "pages_blocks_guarantee_badges_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_guarantee_badges_items_locales_locale_parent_id" ON "pages_blocks_guarantee_badges_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_guarantee_badges_order_idx" ON "pages_blocks_guarantee_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_guarantee_badges_parent_id_idx" ON "pages_blocks_guarantee_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guarantee_badges_path_idx" ON "pages_blocks_guarantee_badges" USING btree ("_path");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_athlete_images_order_idx" ON "pages_blocks_cycles_pricing_grid_athlete_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_athlete_images_parent_id_idx" ON "pages_blocks_cycles_pricing_grid_athlete_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_athlete_images_image_idx" ON "pages_blocks_cycles_pricing_grid_athlete_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_athlete_images_locales_loca" ON "pages_blocks_cycles_pricing_grid_athlete_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows_order_idx" ON "pages_blocks_cycles_pricing_grid_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows_parent_id_idx" ON "pages_blocks_cycles_pricing_grid_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_rows_locales_locale_parent_" ON "pages_blocks_cycles_pricing_grid_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_order_idx" ON "pages_blocks_cycles_pricing_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_parent_id_idx" ON "pages_blocks_cycles_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_path_idx" ON "pages_blocks_cycles_pricing_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_locales_locale_parent_id_un" ON "pages_blocks_cycles_pricing_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_reinforce_cta_seals_order_idx" ON "pages_blocks_reinforce_cta_seals" USING btree ("_order");
  CREATE INDEX "pages_blocks_reinforce_cta_seals_parent_id_idx" ON "pages_blocks_reinforce_cta_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_reinforce_cta_seals_locales_locale_parent_id_un" ON "pages_blocks_reinforce_cta_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_reinforce_cta_order_idx" ON "pages_blocks_reinforce_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_reinforce_cta_parent_id_idx" ON "pages_blocks_reinforce_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reinforce_cta_path_idx" ON "pages_blocks_reinforce_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_reinforce_cta_locales_locale_parent_id_unique" ON "pages_blocks_reinforce_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_pivot_bullets_order_idx" ON "pages_blocks_plan_pivot_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_pivot_bullets_parent_id_idx" ON "pages_blocks_plan_pivot_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_pivot_bullets_locales_locale_parent_id_uni" ON "pages_blocks_plan_pivot_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_pivot_order_idx" ON "pages_blocks_plan_pivot" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_pivot_parent_id_idx" ON "pages_blocks_plan_pivot" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plan_pivot_path_idx" ON "pages_blocks_plan_pivot" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plan_pivot_locales_locale_parent_id_unique" ON "pages_blocks_plan_pivot_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_sticky_cta_bar_order_idx" ON "pages_blocks_sticky_cta_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_cta_bar_parent_id_idx" ON "pages_blocks_sticky_cta_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_cta_bar_path_idx" ON "pages_blocks_sticky_cta_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_sticky_cta_bar_locales_locale_parent_id_unique" ON "pages_blocks_sticky_cta_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_bullets_order_idx" ON "_pages_v_blocks_plan_summary_card_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_bullets_parent_id_idx" ON "_pages_v_blocks_plan_summary_card_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_summary_card_bullets_locales_locale_par" ON "_pages_v_blocks_plan_summary_card_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_order_idx" ON "_pages_v_blocks_plan_summary_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_parent_id_idx" ON "_pages_v_blocks_plan_summary_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_path_idx" ON "_pages_v_blocks_plan_summary_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_summary_card_locales_locale_parent_id_u" ON "_pages_v_blocks_plan_summary_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_guarantee_badges_items_order_idx" ON "_pages_v_blocks_guarantee_badges_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guarantee_badges_items_parent_id_idx" ON "_pages_v_blocks_guarantee_badges_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_guarantee_badges_items_locales_locale_parent" ON "_pages_v_blocks_guarantee_badges_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_guarantee_badges_order_idx" ON "_pages_v_blocks_guarantee_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guarantee_badges_parent_id_idx" ON "_pages_v_blocks_guarantee_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guarantee_badges_path_idx" ON "_pages_v_blocks_guarantee_badges" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_athlete_images_order_idx" ON "_pages_v_blocks_cycles_pricing_grid_athlete_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_athlete_images_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid_athlete_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_athlete_images_image_idx" ON "_pages_v_blocks_cycles_pricing_grid_athlete_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_athlete_images_locales_l" ON "_pages_v_blocks_cycles_pricing_grid_athlete_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_order_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_locales_locale_pare" ON "_pages_v_blocks_cycles_pricing_grid_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_order_idx" ON "_pages_v_blocks_cycles_pricing_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_path_idx" ON "_pages_v_blocks_cycles_pricing_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_locales_locale_parent_id" ON "_pages_v_blocks_cycles_pricing_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_seals_order_idx" ON "_pages_v_blocks_reinforce_cta_seals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_seals_parent_id_idx" ON "_pages_v_blocks_reinforce_cta_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_reinforce_cta_seals_locales_locale_parent_id" ON "_pages_v_blocks_reinforce_cta_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_order_idx" ON "_pages_v_blocks_reinforce_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_parent_id_idx" ON "_pages_v_blocks_reinforce_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_path_idx" ON "_pages_v_blocks_reinforce_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_reinforce_cta_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_reinforce_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_pivot_bullets_order_idx" ON "_pages_v_blocks_plan_pivot_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_pivot_bullets_parent_id_idx" ON "_pages_v_blocks_plan_pivot_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_pivot_bullets_locales_locale_parent_id_" ON "_pages_v_blocks_plan_pivot_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_pivot_order_idx" ON "_pages_v_blocks_plan_pivot" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_pivot_parent_id_idx" ON "_pages_v_blocks_plan_pivot" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_pivot_path_idx" ON "_pages_v_blocks_plan_pivot" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_pivot_locales_locale_parent_id_unique" ON "_pages_v_blocks_plan_pivot_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_cta_bar_order_idx" ON "_pages_v_blocks_sticky_cta_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_cta_bar_parent_id_idx" ON "_pages_v_blocks_sticky_cta_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_cta_bar_path_idx" ON "_pages_v_blocks_sticky_cta_bar" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_sticky_cta_bar_locales_locale_parent_id_uniq" ON "_pages_v_blocks_sticky_cta_bar_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_plan_selector_plans_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_selector_plans_plan_key" AS ENUM('core', 'advanced');
  CREATE TABLE "pages_blocks_plan_selector_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_guarantee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_key" "enum_pages_blocks_plan_selector_plans_plan_key",
  	"is_recommended" boolean DEFAULT false,
  	"monthly_link_href" varchar,
  	"cta_href" varchar
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans_locales" (
  	"name" varchar,
  	"price" varchar,
  	"strike_price" varchar,
  	"min_note" varchar,
  	"monthly_link_text" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"core_positive" boolean DEFAULT false,
  	"advanced_positive" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_plan_selector_comparison_rows_locales" (
  	"label" varchar,
  	"core_value" varchar,
  	"advanced_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_comparison" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plan_selector_locales" (
  	"section_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_guarantee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"plan_key" "enum__pages_v_blocks_plan_selector_plans_plan_key",
  	"is_recommended" boolean DEFAULT false,
  	"monthly_link_href" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans_locales" (
  	"name" varchar,
  	"price" varchar,
  	"strike_price" varchar,
  	"min_note" varchar,
  	"monthly_link_text" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"core_positive" boolean DEFAULT false,
  	"advanced_positive" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_comparison_rows_locales" (
  	"label" varchar,
  	"core_value" varchar,
  	"advanced_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_comparison" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_locales" (
  	"section_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_plan_selector_guarantee_items" ADD CONSTRAINT "pages_blocks_plan_selector_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_guarantee_items_locales" ADD CONSTRAINT "pages_blocks_plan_selector_guarantee_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans_bullets" ADD CONSTRAINT "pages_blocks_plan_selector_plans_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans_bullets_locales" ADD CONSTRAINT "pages_blocks_plan_selector_plans_bullets_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_plans_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans" ADD CONSTRAINT "pages_blocks_plan_selector_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans_locales" ADD CONSTRAINT "pages_blocks_plan_selector_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_comparison_rows" ADD CONSTRAINT "pages_blocks_plan_selector_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_comparison_rows_locales" ADD CONSTRAINT "pages_blocks_plan_selector_comparison_rows_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector" ADD CONSTRAINT "pages_blocks_plan_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_locales" ADD CONSTRAINT "pages_blocks_plan_selector_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_guarantee_items" ADD CONSTRAINT "_pages_v_blocks_plan_selector_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_guarantee_items_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_guarantee_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_bullets" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_bullets_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_plans_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_comparison_rows" ADD CONSTRAINT "_pages_v_blocks_plan_selector_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_comparison_rows_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_comparison_rows_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_comparison_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector" ADD CONSTRAINT "_pages_v_blocks_plan_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plan_selector_guarantee_items_order_idx" ON "pages_blocks_plan_selector_guarantee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_guarantee_items_parent_id_idx" ON "pages_blocks_plan_selector_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_guarantee_items_locales_locale_pa" ON "pages_blocks_plan_selector_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_plans_bullets_order_idx" ON "pages_blocks_plan_selector_plans_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_plans_bullets_parent_id_idx" ON "pages_blocks_plan_selector_plans_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_plans_bullets_locales_locale_pare" ON "pages_blocks_plan_selector_plans_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_plans_order_idx" ON "pages_blocks_plan_selector_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_plans_parent_id_idx" ON "pages_blocks_plan_selector_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_plans_locales_locale_parent_id_un" ON "pages_blocks_plan_selector_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_comparison_rows_order_idx" ON "pages_blocks_plan_selector_comparison_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_comparison_rows_parent_id_idx" ON "pages_blocks_plan_selector_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_comparison_rows_locales_locale_pa" ON "pages_blocks_plan_selector_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_order_idx" ON "pages_blocks_plan_selector" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_parent_id_idx" ON "pages_blocks_plan_selector" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_path_idx" ON "pages_blocks_plan_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_locales_locale_parent_id_unique" ON "pages_blocks_plan_selector_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_guarantee_items_order_idx" ON "_pages_v_blocks_plan_selector_guarantee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_guarantee_items_parent_id_idx" ON "_pages_v_blocks_plan_selector_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_guarantee_items_locales_locale" ON "_pages_v_blocks_plan_selector_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_bullets_order_idx" ON "_pages_v_blocks_plan_selector_plans_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_bullets_parent_id_idx" ON "_pages_v_blocks_plan_selector_plans_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_plans_bullets_locales_locale_p" ON "_pages_v_blocks_plan_selector_plans_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_order_idx" ON "_pages_v_blocks_plan_selector_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_parent_id_idx" ON "_pages_v_blocks_plan_selector_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_plans_locales_locale_parent_id" ON "_pages_v_blocks_plan_selector_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_comparison_rows_order_idx" ON "_pages_v_blocks_plan_selector_comparison_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_comparison_rows_parent_id_idx" ON "_pages_v_blocks_plan_selector_comparison_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_comparison_rows_locales_locale" ON "_pages_v_blocks_plan_selector_comparison_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_order_idx" ON "_pages_v_blocks_plan_selector" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_parent_id_idx" ON "_pages_v_blocks_plan_selector" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_path_idx" ON "_pages_v_blocks_plan_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_plan_selector_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_cycle_selector_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"checkout_href" varchar
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_tiers_locales" (
  	"months" varchar,
  	"monthly_rate" varchar,
  	"save_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycle_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"switch_link_href" varchar,
  	"show_monthly_option" boolean DEFAULT false,
  	"monthly_checkout_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_locales" (
  	"plan_name" varchar,
  	"switch_link_label" varchar,
  	"monthly_rate" varchar,
  	"faq_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"checkout_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_tiers_locales" (
  	"months" varchar,
  	"monthly_rate" varchar,
  	"save_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"switch_link_href" varchar,
  	"show_monthly_option" boolean DEFAULT false,
  	"monthly_checkout_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_locales" (
  	"plan_name" varchar,
  	"switch_link_label" varchar,
  	"monthly_rate" varchar,
  	"faq_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cycle_selector_tiers" ADD CONSTRAINT "pages_blocks_cycle_selector_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_tiers_locales" ADD CONSTRAINT "pages_blocks_cycle_selector_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_faq_items" ADD CONSTRAINT "pages_blocks_cycle_selector_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_faq_items_locales" ADD CONSTRAINT "pages_blocks_cycle_selector_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector" ADD CONSTRAINT "pages_blocks_cycle_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD CONSTRAINT "pages_blocks_cycle_selector_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_tiers" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_tiers_locales" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_faq_items" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_faq_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cycle_selector_tiers_order_idx" ON "pages_blocks_cycle_selector_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_selector_tiers_parent_id_idx" ON "pages_blocks_cycle_selector_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycle_selector_tiers_locales_locale_parent_id_u" ON "pages_blocks_cycle_selector_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cycle_selector_faq_items_order_idx" ON "pages_blocks_cycle_selector_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_selector_faq_items_parent_id_idx" ON "pages_blocks_cycle_selector_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycle_selector_faq_items_locales_locale_parent_" ON "pages_blocks_cycle_selector_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cycle_selector_order_idx" ON "pages_blocks_cycle_selector" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_selector_parent_id_idx" ON "pages_blocks_cycle_selector" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cycle_selector_path_idx" ON "pages_blocks_cycle_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cycle_selector_locales_locale_parent_id_unique" ON "pages_blocks_cycle_selector_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_tiers_order_idx" ON "_pages_v_blocks_cycle_selector_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_selector_tiers_parent_id_idx" ON "_pages_v_blocks_cycle_selector_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycle_selector_tiers_locales_locale_parent_i" ON "_pages_v_blocks_cycle_selector_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_faq_items_order_idx" ON "_pages_v_blocks_cycle_selector_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_selector_faq_items_parent_id_idx" ON "_pages_v_blocks_cycle_selector_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycle_selector_faq_items_locales_locale_pare" ON "_pages_v_blocks_cycle_selector_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_order_idx" ON "_pages_v_blocks_cycle_selector" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_selector_parent_id_idx" ON "_pages_v_blocks_cycle_selector" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_path_idx" ON "_pages_v_blocks_cycle_selector" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycle_selector_locales_locale_parent_id_uniq" ON "_pages_v_blocks_cycle_selector_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_order_step_hero_accent_color" AS ENUM('teal', 'lime', 'white', 'navy');
  CREATE TYPE "public"."enum__pages_v_blocks_order_step_hero_accent_color" AS ENUM('teal', 'lime', 'white', 'navy');
  ALTER TABLE "pages_blocks_order_step_hero" ADD COLUMN "accent_color" "enum_pages_blocks_order_step_hero_accent_color" DEFAULT 'teal';
  ALTER TABLE "_pages_v_blocks_order_step_hero" ADD COLUMN "accent_color" "enum__pages_v_blocks_order_step_hero_accent_color" DEFAULT 'teal';`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_cycles_pricing_grid_rows2" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD COLUMN "show_second_plan" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD COLUMN "cta_href2" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" ADD COLUMN "plan_name2" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" ADD COLUMN "monthly_note2" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" ADD COLUMN "cta_text2" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD COLUMN "show_second_plan" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD COLUMN "cta_href2" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" ADD COLUMN "plan_name2" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" ADD COLUMN "monthly_note2" varchar;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" ADD COLUMN "cta_text2" varchar;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows2" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid_rows2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows2_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid_rows2"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows2_order_idx" ON "pages_blocks_cycles_pricing_grid_rows2" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows2_parent_id_idx" ON "pages_blocks_cycles_pricing_grid_rows2" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_rows2_locales_locale_parent" ON "pages_blocks_cycles_pricing_grid_rows2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_order_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows2" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_locales_locale_par" ON "_pages_v_blocks_cycles_pricing_grid_rows2_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_order_step_hero" DROP COLUMN "accent_color";
  ALTER TABLE "_pages_v_blocks_order_step_hero" DROP COLUMN "accent_color";
  DROP TYPE "public"."enum_pages_blocks_order_step_hero_accent_color";
  DROP TYPE "public"."enum__pages_v_blocks_order_step_hero_accent_color";`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_plan_selector_science_board_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_plan_selector_science_board_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_science_board_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_science_board_images_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_plan_selector_locales" ADD COLUMN "science_board_label" varchar;
  ALTER TABLE "pages_blocks_plan_selector_locales" ADD COLUMN "science_board_sub" varchar;
  ALTER TABLE "_pages_v_blocks_plan_selector_locales" ADD COLUMN "science_board_label" varchar;
  ALTER TABLE "_pages_v_blocks_plan_selector_locales" ADD COLUMN "science_board_sub" varchar;
  ALTER TABLE "pages_blocks_plan_selector_science_board_images" ADD CONSTRAINT "pages_blocks_plan_selector_science_board_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_science_board_images" ADD CONSTRAINT "pages_blocks_plan_selector_science_board_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_science_board_images_locales" ADD CONSTRAINT "pages_blocks_plan_selector_science_board_images_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_science_board_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_science_board_images" ADD CONSTRAINT "_pages_v_blocks_plan_selector_science_board_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_science_board_images" ADD CONSTRAINT "_pages_v_blocks_plan_selector_science_board_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_science_board_images_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_science_board_images_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_science_board_images"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plan_selector_science_board_images_order_idx" ON "pages_blocks_plan_selector_science_board_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_science_board_images_parent_id_idx" ON "pages_blocks_plan_selector_science_board_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_science_board_images_image_idx" ON "pages_blocks_plan_selector_science_board_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_science_board_images_locales_loca" ON "pages_blocks_plan_selector_science_board_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_science_board_images_order_idx" ON "_pages_v_blocks_plan_selector_science_board_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_science_board_images_parent_id_idx" ON "_pages_v_blocks_plan_selector_science_board_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_science_board_images_image_idx" ON "_pages_v_blocks_plan_selector_science_board_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_science_board_images_locales_l" ON "_pages_v_blocks_plan_selector_science_board_images_locales" USING btree ("_locale","_parent_id");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_checkout_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"back_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_checkout_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"back_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_checkout_form" ADD CONSTRAINT "pages_blocks_checkout_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_checkout_form" ADD CONSTRAINT "_pages_v_blocks_checkout_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_checkout_form_order_idx" ON "pages_blocks_checkout_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_checkout_form_parent_id_idx" ON "pages_blocks_checkout_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_checkout_form_path_idx" ON "pages_blocks_checkout_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_checkout_form_order_idx" ON "_pages_v_blocks_checkout_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_checkout_form_parent_id_idx" ON "_pages_v_blocks_checkout_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_checkout_form_path_idx" ON "_pages_v_blocks_checkout_form" USING btree ("_path");`)

  await db.execute(sql`
   CREATE TABLE "pages_blocks_reinforce_cta_athlete_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reinforce_cta_athlete_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_reinforce_cta" ADD COLUMN "cta_href2" varchar;
  ALTER TABLE "pages_blocks_reinforce_cta_locales" ADD COLUMN "athlete_text" varchar;
  ALTER TABLE "pages_blocks_reinforce_cta_locales" ADD COLUMN "cta_text2" varchar;
  ALTER TABLE "_pages_v_blocks_reinforce_cta" ADD COLUMN "cta_href2" varchar;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_locales" ADD COLUMN "athlete_text" varchar;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_locales" ADD COLUMN "cta_text2" varchar;
  ALTER TABLE "pages_blocks_reinforce_cta_athlete_images" ADD CONSTRAINT "pages_blocks_reinforce_cta_athlete_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reinforce_cta_athlete_images" ADD CONSTRAINT "pages_blocks_reinforce_cta_athlete_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_athlete_images" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_athlete_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reinforce_cta_athlete_images" ADD CONSTRAINT "_pages_v_blocks_reinforce_cta_athlete_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reinforce_cta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_reinforce_cta_athlete_images_order_idx" ON "pages_blocks_reinforce_cta_athlete_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_reinforce_cta_athlete_images_parent_id_idx" ON "pages_blocks_reinforce_cta_athlete_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reinforce_cta_athlete_images_image_idx" ON "pages_blocks_reinforce_cta_athlete_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_athlete_images_order_idx" ON "_pages_v_blocks_reinforce_cta_athlete_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_athlete_images_parent_id_idx" ON "_pages_v_blocks_reinforce_cta_athlete_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reinforce_cta_athlete_images_image_idx" ON "_pages_v_blocks_reinforce_cta_athlete_images" USING btree ("image_id");
  ALTER TABLE "pages_blocks_reinforce_cta" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_reinforce_cta" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_reinforce_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_reinforce_cta_variant";`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_plan_summary_card_locales" ADD COLUMN "section_title" varchar;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" ADD COLUMN "section_title" varchar;`)

}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_plan_summary_card_locales" DROP COLUMN "section_title";
  ALTER TABLE "_pages_v_blocks_plan_summary_card_locales" DROP COLUMN "section_title";`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_reinforce_cta_variant" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_reinforce_cta_variant" AS ENUM('core', 'advanced');
  DROP TABLE "pages_blocks_reinforce_cta_athlete_images" CASCADE;
  DROP TABLE "_pages_v_blocks_reinforce_cta_athlete_images" CASCADE;
  ALTER TABLE "pages_blocks_reinforce_cta" ADD COLUMN "variant" "enum_pages_blocks_reinforce_cta_variant" DEFAULT 'core';
  ALTER TABLE "_pages_v_blocks_reinforce_cta" ADD COLUMN "variant" "enum__pages_v_blocks_reinforce_cta_variant" DEFAULT 'core';
  ALTER TABLE "pages_blocks_reinforce_cta" DROP COLUMN "cta_href2";
  ALTER TABLE "pages_blocks_reinforce_cta_locales" DROP COLUMN "athlete_text";
  ALTER TABLE "pages_blocks_reinforce_cta_locales" DROP COLUMN "cta_text2";
  ALTER TABLE "_pages_v_blocks_reinforce_cta" DROP COLUMN "cta_href2";
  ALTER TABLE "_pages_v_blocks_reinforce_cta_locales" DROP COLUMN "athlete_text";
  ALTER TABLE "_pages_v_blocks_reinforce_cta_locales" DROP COLUMN "cta_text2";`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_checkout_form" CASCADE;
  DROP TABLE "_pages_v_blocks_checkout_form" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_plan_selector_science_board_images" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_science_board_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_science_board_images" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_science_board_images_locales" CASCADE;
  ALTER TABLE "pages_blocks_plan_selector_locales" DROP COLUMN "science_board_label";
  ALTER TABLE "pages_blocks_plan_selector_locales" DROP COLUMN "science_board_sub";
  ALTER TABLE "_pages_v_blocks_plan_selector_locales" DROP COLUMN "science_board_label";
  ALTER TABLE "_pages_v_blocks_plan_selector_locales" DROP COLUMN "science_board_sub";`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_order_step_hero_accent_color" AS ENUM('teal', 'lime', 'white', 'navy');
  CREATE TYPE "public"."enum__pages_v_blocks_order_step_hero_accent_color" AS ENUM('teal', 'lime', 'white', 'navy');
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows2" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" CASCADE;
  ALTER TABLE "pages_blocks_order_step_hero" ADD COLUMN "accent_color" "enum_pages_blocks_order_step_hero_accent_color" DEFAULT 'teal';
  ALTER TABLE "_pages_v_blocks_order_step_hero" ADD COLUMN "accent_color" "enum__pages_v_blocks_order_step_hero_accent_color" DEFAULT 'teal';
  ALTER TABLE "pages_blocks_cycles_pricing_grid" DROP COLUMN "cta_href";
  ALTER TABLE "pages_blocks_cycles_pricing_grid" DROP COLUMN "show_second_plan";
  ALTER TABLE "pages_blocks_cycles_pricing_grid" DROP COLUMN "cta_href2";
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" DROP COLUMN "cta_text";
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" DROP COLUMN "plan_name2";
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" DROP COLUMN "monthly_note2";
  ALTER TABLE "pages_blocks_cycles_pricing_grid_locales" DROP COLUMN "cta_text2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" DROP COLUMN "cta_href";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" DROP COLUMN "show_second_plan";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" DROP COLUMN "cta_href2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" DROP COLUMN "cta_text";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" DROP COLUMN "plan_name2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" DROP COLUMN "monthly_note2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_locales" DROP COLUMN "cta_text2";`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_order_step_hero" DROP COLUMN "accent_color";
  ALTER TABLE "_pages_v_blocks_order_step_hero" DROP COLUMN "accent_color";
  DROP TYPE "public"."enum_pages_blocks_order_step_hero_accent_color";
  DROP TYPE "public"."enum__pages_v_blocks_order_step_hero_accent_color";`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_cycle_selector_tiers" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_tiers_locales" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_faq_items" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_tiers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_locales" CASCADE;`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_plan_selector_guarantee_items" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_guarantee_items_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans_bullets" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_comparison_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_selector" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_guarantee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_guarantee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_comparison_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_plan_selector_plans_plan_key";
  DROP TYPE "public"."enum__pages_v_blocks_plan_selector_plans_plan_key";`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_plan_summary_card_bullets" CASCADE;
  DROP TABLE "pages_blocks_plan_summary_card_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_summary_card" CASCADE;
  DROP TABLE "pages_blocks_plan_summary_card_locales" CASCADE;
  DROP TABLE "pages_blocks_guarantee_badges_items" CASCADE;
  DROP TABLE "pages_blocks_guarantee_badges_items_locales" CASCADE;
  DROP TABLE "pages_blocks_guarantee_badges" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_athlete_images" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_athlete_images_locales" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_reinforce_cta_seals" CASCADE;
  DROP TABLE "pages_blocks_reinforce_cta_seals_locales" CASCADE;
  DROP TABLE "pages_blocks_reinforce_cta" CASCADE;
  DROP TABLE "pages_blocks_reinforce_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_pivot_bullets" CASCADE;
  DROP TABLE "pages_blocks_plan_pivot_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_pivot" CASCADE;
  DROP TABLE "pages_blocks_plan_pivot_locales" CASCADE;
  DROP TABLE "pages_blocks_sticky_cta_bar" CASCADE;
  DROP TABLE "pages_blocks_sticky_cta_bar_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_guarantee_badges_items" CASCADE;
  DROP TABLE "_pages_v_blocks_guarantee_badges_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_guarantee_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_athlete_images_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reinforce_cta_seals" CASCADE;
  DROP TABLE "_pages_v_blocks_reinforce_cta_seals_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reinforce_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_reinforce_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_pivot_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_pivot_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_pivot" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_pivot_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_cta_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_cta_bar_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_plan_summary_card_plan_variant";
  DROP TYPE "public"."enum_pages_blocks_reinforce_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_plan_pivot_direction";
  DROP TYPE "public"."enum__pages_v_blocks_plan_summary_card_plan_variant";
  DROP TYPE "public"."enum__pages_v_blocks_reinforce_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_plan_pivot_direction";`)

  await db.execute(sql`
   ALTER TABLE "pages_blocks_order_step_hero_locales" ADD COLUMN "headline_prefix" varchar;
  ALTER TABLE "pages_blocks_order_step_hero_locales" ADD COLUMN "headline_teal" varchar;
  ALTER TABLE "pages_blocks_formula_kit_locales" ADD COLUMN "section_title_prefix" varchar;
  ALTER TABLE "pages_blocks_formula_kit_locales" ADD COLUMN "section_title_teal" varchar;
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" ADD COLUMN "headline_prefix" varchar;
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" ADD COLUMN "headline_teal" varchar;
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" ADD COLUMN "section_title_prefix" varchar;
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" ADD COLUMN "section_title_teal" varchar;
  ALTER TABLE "pages_blocks_order_step_hero_locales" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_formula_kit_locales" DROP COLUMN "section_title";
  ALTER TABLE "_pages_v_blocks_order_step_hero_locales" DROP COLUMN "headline";
  ALTER TABLE "_pages_v_blocks_formula_kit_locales" DROP COLUMN "section_title";`)

  await db.execute(sql`
   DROP TABLE "pages_blocks_order_step_hero_seals" CASCADE;
  DROP TABLE "pages_blocks_order_step_hero_seals_locales" CASCADE;
  DROP TABLE "pages_blocks_order_step_hero" CASCADE;
  DROP TABLE "pages_blocks_order_step_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_seals_bar_seals" CASCADE;
  DROP TABLE "pages_blocks_trust_seals_bar_seals_locales" CASCADE;
  DROP TABLE "pages_blocks_trust_seals_bar" CASCADE;
  DROP TABLE "pages_blocks_order_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_order_timeline_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_order_timeline_advanced_extras" CASCADE;
  DROP TABLE "pages_blocks_order_timeline_advanced_extras_locales" CASCADE;
  DROP TABLE "pages_blocks_order_timeline" CASCADE;
  DROP TABLE "pages_blocks_order_timeline_locales" CASCADE;
  DROP TABLE "pages_blocks_formula_kit_components" CASCADE;
  DROP TABLE "pages_blocks_formula_kit_components_locales" CASCADE;
  DROP TABLE "pages_blocks_formula_kit" CASCADE;
  DROP TABLE "pages_blocks_formula_kit_locales" CASCADE;
  DROP TABLE "pages_blocks_checkout_faq_items" CASCADE;
  DROP TABLE "pages_blocks_checkout_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_checkout_faq" CASCADE;
  DROP TABLE "pages_blocks_checkout_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_end_card_ctas" CASCADE;
  DROP TABLE "pages_blocks_end_card_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_end_card" CASCADE;
  DROP TABLE "pages_blocks_end_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_step_hero_seals" CASCADE;
  DROP TABLE "_pages_v_blocks_order_step_hero_seals_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_step_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_order_step_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_seals_bar_seals" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_seals_bar_seals_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_seals_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline_advanced_extras" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline_advanced_extras_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_order_timeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_formula_kit_components" CASCADE;
  DROP TABLE "_pages_v_blocks_formula_kit_components_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_formula_kit" CASCADE;
  DROP TABLE "_pages_v_blocks_formula_kit_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_checkout_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_checkout_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_checkout_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_checkout_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_end_card_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_end_card_ctas_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_end_card" CASCADE;
  DROP TABLE "_pages_v_blocks_end_card_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_order_step_hero_seals_type";
  DROP TYPE "public"."enum_pages_blocks_trust_seals_bar_seals_type";
  DROP TYPE "public"."enum_pages_blocks_formula_kit_components_icon";
  DROP TYPE "public"."enum_pages_blocks_end_card_ctas_variant";
  DROP TYPE "public"."enum__pages_v_blocks_order_step_hero_seals_type";
  DROP TYPE "public"."enum__pages_v_blocks_trust_seals_bar_seals_type";
  DROP TYPE "public"."enum__pages_v_blocks_formula_kit_components_icon";
  DROP TYPE "public"."enum__pages_v_blocks_end_card_ctas_variant";`)

}
