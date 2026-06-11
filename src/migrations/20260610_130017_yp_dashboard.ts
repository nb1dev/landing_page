import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_teams_status_type" AS ENUM('ok', 'low');
  CREATE TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_card_type" AS ENUM('gauge', 'scales', 'teams', 'map');
  CREATE TYPE "public"."enum_pages_blocks_yp_dashboard_background_color" AS ENUM('off', 'paper', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_dashboard_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_teams_status_type" AS ENUM('ok', 'low');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_card_type" AS ENUM('gauge', 'scales', 'teams', 'map');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_color" AS ENUM('off', 'paper', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_dashboard_views_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_items_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"amber" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_metrics_locales" (
  	"name" varchar,
  	"value" varchar,
  	"max" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_scales" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"amber" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_scales_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_teams" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"status_type" "enum_pages_blocks_yp_dashboard_views_card_teams_status_type" DEFAULT 'ok'
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_teams_locales" (
  	"name" varchar,
  	"status_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_map_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_card_map_rows_locales" (
  	"key" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_card_type" "enum_pages_blocks_yp_dashboard_views_card_card_type" DEFAULT 'gauge',
  	"card_track_pct" numeric
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_views_locales" (
  	"pill_label" varchar,
  	"title" varchar,
  	"card_heading" varchar,
  	"card_flag" varchar,
  	"card_score" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_board_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_dashboard_background_color" DEFAULT 'off',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_dashboard_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"phone_image_id" integer,
  	"report_url" varchar,
  	"board_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_dashboard_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"report_label" varchar,
  	"board_text" varchar,
  	"board_link_label" varchar,
  	"own_label" varchar,
  	"own_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_items_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"amber" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics_locales" (
  	"name" varchar,
  	"value" varchar,
  	"max" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_scales" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"amber" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_scales_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_teams" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pct" numeric,
  	"status_type" "enum__pages_v_blocks_yp_dashboard_views_card_teams_status_type" DEFAULT 'ok',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_teams_locales" (
  	"name" varchar,
  	"status_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales" (
  	"key" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"card_card_type" "enum__pages_v_blocks_yp_dashboard_views_card_card_type" DEFAULT 'gauge',
  	"card_track_pct" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_views_locales" (
  	"pill_label" varchar,
  	"title" varchar,
  	"card_heading" varchar,
  	"card_flag" varchar,
  	"card_score" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_board_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_dashboard_background_color" DEFAULT 'off',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_dashboard_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"phone_image_id" integer,
  	"report_url" varchar,
  	"board_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_dashboard_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"report_label" varchar,
  	"board_text" varchar,
  	"board_link_label" varchar,
  	"own_label" varchar,
  	"own_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_dashboard_views_items" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_items_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_metrics_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views_card_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_scales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_scales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_scales_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_scales_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views_card_scales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_teams" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_teams_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_teams_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_teams_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views_card_teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_map_rows" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_map_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_map_rows_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_card_map_rows_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views_card_map_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_views_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_views_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_board_faces" ADD CONSTRAINT "pages_blocks_yp_dashboard_board_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_board_faces" ADD CONSTRAINT "pages_blocks_yp_dashboard_board_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard" ADD CONSTRAINT "pages_blocks_yp_dashboard_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard" ADD CONSTRAINT "pages_blocks_yp_dashboard_phone_image_id_media_id_fk" FOREIGN KEY ("phone_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard" ADD CONSTRAINT "pages_blocks_yp_dashboard_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_dashboard_locales" ADD CONSTRAINT "pages_blocks_yp_dashboard_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_items" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_items_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_metrics_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views_card_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_scales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_scales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_scales_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_scales_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views_card_scales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_teams" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_teams_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_teams_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_teams_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views_card_teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_map_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views_card_map_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_views_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard_views"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_board_faces" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_board_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_board_faces" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_board_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_phone_image_id_media_id_fk" FOREIGN KEY ("phone_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_locales" ADD CONSTRAINT "_pages_v_blocks_yp_dashboard_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_dashboard"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_dashboard_views_items_order_idx" ON "pages_blocks_yp_dashboard_views_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_items_parent_id_idx" ON "pages_blocks_yp_dashboard_views_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_items_locales_locale_parent_" ON "pages_blocks_yp_dashboard_views_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_metrics_order_idx" ON "pages_blocks_yp_dashboard_views_card_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_metrics_parent_id_idx" ON "pages_blocks_yp_dashboard_views_card_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_card_metrics_locales_locale_" ON "pages_blocks_yp_dashboard_views_card_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_scales_order_idx" ON "pages_blocks_yp_dashboard_views_card_scales" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_scales_parent_id_idx" ON "pages_blocks_yp_dashboard_views_card_scales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_card_scales_locales_locale_p" ON "pages_blocks_yp_dashboard_views_card_scales_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_teams_order_idx" ON "pages_blocks_yp_dashboard_views_card_teams" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_teams_parent_id_idx" ON "pages_blocks_yp_dashboard_views_card_teams" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_card_teams_locales_locale_pa" ON "pages_blocks_yp_dashboard_views_card_teams_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_map_rows_order_idx" ON "pages_blocks_yp_dashboard_views_card_map_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_card_map_rows_parent_id_idx" ON "pages_blocks_yp_dashboard_views_card_map_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_card_map_rows_locales_locale" ON "pages_blocks_yp_dashboard_views_card_map_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_views_order_idx" ON "pages_blocks_yp_dashboard_views" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_views_parent_id_idx" ON "pages_blocks_yp_dashboard_views" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_views_locales_locale_parent_id_uni" ON "pages_blocks_yp_dashboard_views_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_board_faces_order_idx" ON "pages_blocks_yp_dashboard_board_faces" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_board_faces_parent_id_idx" ON "pages_blocks_yp_dashboard_board_faces" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_board_faces_image_idx" ON "pages_blocks_yp_dashboard_board_faces" USING btree ("image_id");
  CREATE INDEX "pages_blocks_yp_dashboard_order_idx" ON "pages_blocks_yp_dashboard" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_dashboard_parent_id_idx" ON "pages_blocks_yp_dashboard" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_dashboard_path_idx" ON "pages_blocks_yp_dashboard" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_dashboard_background_image_idx" ON "pages_blocks_yp_dashboard" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_yp_dashboard_phone_image_idx" ON "pages_blocks_yp_dashboard" USING btree ("phone_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_dashboard_locales_locale_parent_id_unique" ON "pages_blocks_yp_dashboard_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_items_order_idx" ON "_pages_v_blocks_yp_dashboard_views_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_items_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_items_locales_locale_pare" ON "_pages_v_blocks_yp_dashboard_views_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_metrics_order_idx" ON "_pages_v_blocks_yp_dashboard_views_card_metrics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_metrics_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views_card_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_card_metrics_locales_loca" ON "_pages_v_blocks_yp_dashboard_views_card_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_scales_order_idx" ON "_pages_v_blocks_yp_dashboard_views_card_scales" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_scales_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views_card_scales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_card_scales_locales_local" ON "_pages_v_blocks_yp_dashboard_views_card_scales_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_teams_order_idx" ON "_pages_v_blocks_yp_dashboard_views_card_teams" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_teams_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views_card_teams" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_card_teams_locales_locale" ON "_pages_v_blocks_yp_dashboard_views_card_teams_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_map_rows_order_idx" ON "_pages_v_blocks_yp_dashboard_views_card_map_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_card_map_rows_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views_card_map_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales_loc" ON "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_order_idx" ON "_pages_v_blocks_yp_dashboard_views" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_views_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_views" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_views_locales_locale_parent_id_" ON "_pages_v_blocks_yp_dashboard_views_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_board_faces_order_idx" ON "_pages_v_blocks_yp_dashboard_board_faces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_board_faces_parent_id_idx" ON "_pages_v_blocks_yp_dashboard_board_faces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_board_faces_image_idx" ON "_pages_v_blocks_yp_dashboard_board_faces" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_order_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_parent_id_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_path_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_background_image_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_yp_dashboard_phone_image_idx" ON "_pages_v_blocks_yp_dashboard" USING btree ("phone_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_dashboard_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_dashboard_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_dashboard_views_items" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_metrics" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_metrics_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_scales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_scales_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_teams" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_teams_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_map_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_card_map_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_views_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_board_faces" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard" CASCADE;
  DROP TABLE "pages_blocks_yp_dashboard_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_scales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_scales_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_teams" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_teams_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_views_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_board_faces" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_dashboard_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_teams_status_type";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_card_type";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_teams_status_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_card_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_type";`)
}
