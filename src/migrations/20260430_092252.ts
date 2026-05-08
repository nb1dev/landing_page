import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_reserve_cta_variants_background_color" AS ENUM('white', 'creamGradient', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_reserve_cta_background_color" AS ENUM('white', 'creamGradient', 'custom');
  CREATE TYPE "public"."athlete_banner_icon_type" AS ENUM('checkCircle', 'pulse', 'checkSquare', 'plus', 'speechBubble');
  CREATE TYPE "public"."athlete_banner_variant_icon_type" AS ENUM('checkCircle', 'pulse', 'checkSquare', 'plus', 'speechBubble');
  CREATE TYPE "public"."enum_pages_blocks_athlete_banner_variants_background_color" AS ENUM('cream', 'creamGradient', 'white', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_athlete_banner_background_color" AS ENUM('cream', 'creamGradient', 'white', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_reserve_cta_variants_background_color" AS ENUM('white', 'creamGradient', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_reserve_cta_background_color" AS ENUM('white', 'creamGradient', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_athlete_banner_variants_background_color" AS ENUM('cream', 'creamGradient', 'white', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_athlete_banner_background_color" AS ENUM('cream', 'creamGradient', 'white', 'custom');
  CREATE TABLE "pages_blocks_reserve_cta_recap_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reserve_cta_recap_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reserve_cta_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum_pages_blocks_reserve_cta_variants_background_color",
  	"background_color_custom" varchar
  );
  
  CREATE TABLE "pages_blocks_reserve_cta_variants_locales" (
  	"pill_text" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reserve_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_reserve_cta_background_color" DEFAULT 'white',
  	"background_color_custom" varchar,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reserve_cta_locales" (
  	"pill_text" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"cta_button_text" varchar,
  	"foot_note_text" varchar,
  	"foot_note_highlight" varchar,
  	"success_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_athlete_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_athlete_cards_locales" (
  	"tag" varchar,
  	"name" varchar,
  	"title" varchar,
  	"quote_body" varchar,
  	"quote_attr" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_usp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_type" "athlete_banner_icon_type"
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_usp_items_locales" (
  	"heading" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants_athlete_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants_athlete_cards_locales" (
  	"tag" varchar,
  	"name" varchar,
  	"title" varchar,
  	"quote_body" varchar,
  	"quote_attr" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants_usp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_type" "athlete_banner_variant_icon_type"
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants_usp_items_locales" (
  	"heading" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum_pages_blocks_athlete_banner_variants_background_color",
  	"background_color_custom" varchar
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_athlete_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_athlete_banner_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_athlete_banner_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta_recap_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta_recap_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum__pages_v_blocks_reserve_cta_variants_background_color",
  	"background_color_custom" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta_variants_locales" (
  	"pill_text" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"cta_button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_reserve_cta_background_color" DEFAULT 'white',
  	"background_color_custom" varchar,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reserve_cta_locales" (
  	"pill_text" varchar,
  	"heading" jsonb,
  	"sub_text" varchar,
  	"cta_button_text" varchar,
  	"foot_note_text" varchar,
  	"foot_note_highlight" varchar,
  	"success_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_athlete_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_athlete_cards_locales" (
  	"tag" varchar,
  	"name" varchar,
  	"title" varchar,
  	"quote_body" varchar,
  	"quote_attr" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_usp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_type" "athlete_banner_icon_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_usp_items_locales" (
  	"heading" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards_locales" (
  	"tag" varchar,
  	"name" varchar,
  	"title" varchar,
  	"quote_body" varchar,
  	"quote_attr" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants_usp_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_type" "athlete_banner_variant_icon_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants_usp_items_locales" (
  	"heading" varchar,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"background_color" "enum__pages_v_blocks_athlete_banner_variants_background_color",
  	"background_color_custom" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_variants_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_athlete_banner_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_athlete_banner_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_reserve_cta_recap_items" ADD CONSTRAINT "pages_blocks_reserve_cta_recap_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta_recap_items_locales" ADD CONSTRAINT "pages_blocks_reserve_cta_recap_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reserve_cta_recap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta_variants" ADD CONSTRAINT "pages_blocks_reserve_cta_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta_variants_locales" ADD CONSTRAINT "pages_blocks_reserve_cta_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reserve_cta_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta" ADD CONSTRAINT "pages_blocks_reserve_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta" ADD CONSTRAINT "pages_blocks_reserve_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reserve_cta_locales" ADD CONSTRAINT "pages_blocks_reserve_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_athlete_cards" ADD CONSTRAINT "pages_blocks_athlete_banner_athlete_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_athlete_cards" ADD CONSTRAINT "pages_blocks_athlete_banner_athlete_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_athlete_cards_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_athlete_cards_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_athlete_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_usp_items" ADD CONSTRAINT "pages_blocks_athlete_banner_usp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_usp_items_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_usp_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_usp_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_athlete_cards" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_athlete_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_athlete_cards" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_athlete_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_athlete_cards_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_athlete_cards_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_variants_athlete_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_usp_items" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_usp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_usp_items_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_usp_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_variants_usp_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_variants_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner" ADD CONSTRAINT "pages_blocks_athlete_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_athlete_banner_locales" ADD CONSTRAINT "pages_blocks_athlete_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta_recap_items" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_recap_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta_recap_items_locales" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_recap_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reserve_cta_recap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta_variants" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta_variants_locales" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reserve_cta_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reserve_cta_locales" ADD CONSTRAINT "_pages_v_blocks_reserve_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reserve_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_athlete_cards" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_athlete_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_athlete_cards" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_athlete_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_athlete_cards_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_athlete_cards_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_athlete_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_usp_items" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_usp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_usp_items_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_usp_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_usp_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_athlete_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_athlete_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_athlete_cards_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_variants_athlete_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_usp_items" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_usp_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_usp_items_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_usp_items_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_variants_usp_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_variants_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athlete_banner_locales" ADD CONSTRAINT "_pages_v_blocks_athlete_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_athlete_banner"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_reserve_cta_recap_items_order_idx" ON "pages_blocks_reserve_cta_recap_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_reserve_cta_recap_items_parent_id_idx" ON "pages_blocks_reserve_cta_recap_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_reserve_cta_recap_items_locales_locale_parent_i" ON "pages_blocks_reserve_cta_recap_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_reserve_cta_variants_order_idx" ON "pages_blocks_reserve_cta_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_reserve_cta_variants_parent_id_idx" ON "pages_blocks_reserve_cta_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_reserve_cta_variants_locales_locale_parent_id_u" ON "pages_blocks_reserve_cta_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_reserve_cta_order_idx" ON "pages_blocks_reserve_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_reserve_cta_parent_id_idx" ON "pages_blocks_reserve_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reserve_cta_path_idx" ON "pages_blocks_reserve_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_reserve_cta_form_idx" ON "pages_blocks_reserve_cta" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_blocks_reserve_cta_locales_locale_parent_id_unique" ON "pages_blocks_reserve_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_athlete_cards_order_idx" ON "pages_blocks_athlete_banner_athlete_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_athlete_cards_parent_id_idx" ON "pages_blocks_athlete_banner_athlete_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_athlete_cards_image_idx" ON "pages_blocks_athlete_banner_athlete_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_athlete_cards_locales_locale_par" ON "pages_blocks_athlete_banner_athlete_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_usp_items_order_idx" ON "pages_blocks_athlete_banner_usp_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_usp_items_parent_id_idx" ON "pages_blocks_athlete_banner_usp_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_usp_items_locales_locale_parent_" ON "pages_blocks_athlete_banner_usp_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_variants_athlete_cards_order_idx" ON "pages_blocks_athlete_banner_variants_athlete_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_variants_athlete_cards_parent_id_idx" ON "pages_blocks_athlete_banner_variants_athlete_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_variants_athlete_cards_image_idx" ON "pages_blocks_athlete_banner_variants_athlete_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_variants_athlete_cards_locales_l" ON "pages_blocks_athlete_banner_variants_athlete_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_variants_usp_items_order_idx" ON "pages_blocks_athlete_banner_variants_usp_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_variants_usp_items_parent_id_idx" ON "pages_blocks_athlete_banner_variants_usp_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_variants_usp_items_locales_local" ON "pages_blocks_athlete_banner_variants_usp_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_variants_order_idx" ON "pages_blocks_athlete_banner_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_variants_parent_id_idx" ON "pages_blocks_athlete_banner_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_variants_locales_locale_parent_i" ON "pages_blocks_athlete_banner_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_order_idx" ON "pages_blocks_athlete_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_athlete_banner_parent_id_idx" ON "pages_blocks_athlete_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_athlete_banner_path_idx" ON "pages_blocks_athlete_banner" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_athlete_banner_locales_locale_parent_id_unique" ON "pages_blocks_athlete_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reserve_cta_recap_items_order_idx" ON "_pages_v_blocks_reserve_cta_recap_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reserve_cta_recap_items_parent_id_idx" ON "_pages_v_blocks_reserve_cta_recap_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_reserve_cta_recap_items_locales_locale_paren" ON "_pages_v_blocks_reserve_cta_recap_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reserve_cta_variants_order_idx" ON "_pages_v_blocks_reserve_cta_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reserve_cta_variants_parent_id_idx" ON "_pages_v_blocks_reserve_cta_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_reserve_cta_variants_locales_locale_parent_i" ON "_pages_v_blocks_reserve_cta_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reserve_cta_order_idx" ON "_pages_v_blocks_reserve_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reserve_cta_parent_id_idx" ON "_pages_v_blocks_reserve_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reserve_cta_path_idx" ON "_pages_v_blocks_reserve_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reserve_cta_form_idx" ON "_pages_v_blocks_reserve_cta" USING btree ("form_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_reserve_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_reserve_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_athlete_cards_order_idx" ON "_pages_v_blocks_athlete_banner_athlete_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_athlete_cards_parent_id_idx" ON "_pages_v_blocks_athlete_banner_athlete_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_athlete_cards_image_idx" ON "_pages_v_blocks_athlete_banner_athlete_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_athlete_cards_locales_locale_" ON "_pages_v_blocks_athlete_banner_athlete_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_usp_items_order_idx" ON "_pages_v_blocks_athlete_banner_usp_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_usp_items_parent_id_idx" ON "_pages_v_blocks_athlete_banner_usp_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_usp_items_locales_locale_pare" ON "_pages_v_blocks_athlete_banner_usp_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_athlete_cards_order_idx" ON "_pages_v_blocks_athlete_banner_variants_athlete_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_athlete_cards_parent_id_idx" ON "_pages_v_blocks_athlete_banner_variants_athlete_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_athlete_cards_im_idx" ON "_pages_v_blocks_athlete_banner_variants_athlete_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_variants_athlete_cards_locale" ON "_pages_v_blocks_athlete_banner_variants_athlete_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_usp_items_order_idx" ON "_pages_v_blocks_athlete_banner_variants_usp_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_usp_items_parent_id_idx" ON "_pages_v_blocks_athlete_banner_variants_usp_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_variants_usp_items_locales_lo" ON "_pages_v_blocks_athlete_banner_variants_usp_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_order_idx" ON "_pages_v_blocks_athlete_banner_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_variants_parent_id_idx" ON "_pages_v_blocks_athlete_banner_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_variants_locales_locale_paren" ON "_pages_v_blocks_athlete_banner_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_order_idx" ON "_pages_v_blocks_athlete_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_athlete_banner_parent_id_idx" ON "_pages_v_blocks_athlete_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_athlete_banner_path_idx" ON "_pages_v_blocks_athlete_banner" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_athlete_banner_locales_locale_parent_id_uniq" ON "_pages_v_blocks_athlete_banner_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_reserve_cta_recap_items" CASCADE;
  DROP TABLE "pages_blocks_reserve_cta_recap_items_locales" CASCADE;
  DROP TABLE "pages_blocks_reserve_cta_variants" CASCADE;
  DROP TABLE "pages_blocks_reserve_cta_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_reserve_cta" CASCADE;
  DROP TABLE "pages_blocks_reserve_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_athlete_cards" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_athlete_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_usp_items" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_usp_items_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants_athlete_cards" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants_athlete_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants_usp_items" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants_usp_items_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_variants_locales" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner" CASCADE;
  DROP TABLE "pages_blocks_athlete_banner_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta_recap_items" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta_recap_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_reserve_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_athlete_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_athlete_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_usp_items" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_usp_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants_athlete_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants_usp_items" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants_usp_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_athlete_banner_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_reserve_cta_variants_background_color";
  DROP TYPE "public"."enum_pages_blocks_reserve_cta_background_color";
  DROP TYPE "public"."athlete_banner_icon_type";
  DROP TYPE "public"."athlete_banner_variant_icon_type";
  DROP TYPE "public"."enum_pages_blocks_athlete_banner_variants_background_color";
  DROP TYPE "public"."enum_pages_blocks_athlete_banner_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_reserve_cta_variants_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_reserve_cta_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_athlete_banner_variants_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_athlete_banner_background_color";`)
}
