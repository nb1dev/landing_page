import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_headers_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_headers_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_headers_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footers_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footers_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footers_theme" AS ENUM('light', 'dark');
  CREATE TABLE "headers_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_headers_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_localized_label" varchar
  );
  
  CREATE TABLE "headers_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar NOT NULL,
  	"theme" "enum_headers_variants_theme" NOT NULL,
  	"login_text_color" varchar
  );
  
  CREATE TABLE "headers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"is_default" boolean DEFAULT false,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"theme" "enum_headers_theme" DEFAULT 'light',
  	"login_url" varchar,
  	"login_text_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "headers_locales" (
  	"login_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "headers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footers_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footers_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footers_nav_items_locales" (
  	"link_localized_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footers_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar NOT NULL,
  	"theme" "enum_footers_variants_theme" NOT NULL,
  	"link_color" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "footers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"is_default" boolean DEFAULT false,
  	"logo_id" integer,
  	"theme" "enum_footers_theme" DEFAULT 'light',
  	"link_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footers_locales" (
  	"tagline" varchar,
  	"address" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_variants" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_nav_items_locales" CASCADE;
  DROP TABLE "footer_variants" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  ALTER TABLE "pages" ADD COLUMN "header_id" integer;
  ALTER TABLE "pages" ADD COLUMN "footer_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_footer_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "headers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "footers_id" integer;
  ALTER TABLE "headers_nav_items" ADD CONSTRAINT "headers_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers_variants" ADD CONSTRAINT "headers_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers" ADD CONSTRAINT "headers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "headers" ADD CONSTRAINT "headers_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "headers_locales" ADD CONSTRAINT "headers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers_rels" ADD CONSTRAINT "headers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers_rels" ADD CONSTRAINT "headers_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers_rels" ADD CONSTRAINT "headers_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_nav_items" ADD CONSTRAINT "footers_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_nav_items_locales" ADD CONSTRAINT "footers_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_variants" ADD CONSTRAINT "footers_variants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_variants" ADD CONSTRAINT "footers_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers" ADD CONSTRAINT "footers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_locales" ADD CONSTRAINT "footers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_rels" ADD CONSTRAINT "footers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_rels" ADD CONSTRAINT "footers_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_rels" ADD CONSTRAINT "footers_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "headers_nav_items_order_idx" ON "headers_nav_items" USING btree ("_order");
  CREATE INDEX "headers_nav_items_parent_id_idx" ON "headers_nav_items" USING btree ("_parent_id");
  CREATE INDEX "headers_nav_items_locale_idx" ON "headers_nav_items" USING btree ("_locale");
  CREATE INDEX "headers_variants_order_idx" ON "headers_variants" USING btree ("_order");
  CREATE INDEX "headers_variants_parent_id_idx" ON "headers_variants" USING btree ("_parent_id");
  CREATE INDEX "headers_logo_idx" ON "headers" USING btree ("logo_id");
  CREATE INDEX "headers_logo_dark_idx" ON "headers" USING btree ("logo_dark_id");
  CREATE INDEX "headers_updated_at_idx" ON "headers" USING btree ("updated_at");
  CREATE INDEX "headers_created_at_idx" ON "headers" USING btree ("created_at");
  CREATE UNIQUE INDEX "headers_locales_locale_parent_id_unique" ON "headers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "headers_rels_order_idx" ON "headers_rels" USING btree ("order");
  CREATE INDEX "headers_rels_parent_idx" ON "headers_rels" USING btree ("parent_id");
  CREATE INDEX "headers_rels_path_idx" ON "headers_rels" USING btree ("path");
  CREATE INDEX "headers_rels_locale_idx" ON "headers_rels" USING btree ("locale");
  CREATE INDEX "headers_rels_pages_id_idx" ON "headers_rels" USING btree ("pages_id","locale");
  CREATE INDEX "headers_rels_posts_id_idx" ON "headers_rels" USING btree ("posts_id","locale");
  CREATE INDEX "footers_nav_items_order_idx" ON "footers_nav_items" USING btree ("_order");
  CREATE INDEX "footers_nav_items_parent_id_idx" ON "footers_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footers_nav_items_locales_locale_parent_id_unique" ON "footers_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footers_variants_order_idx" ON "footers_variants" USING btree ("_order");
  CREATE INDEX "footers_variants_parent_id_idx" ON "footers_variants" USING btree ("_parent_id");
  CREATE INDEX "footers_variants_logo_idx" ON "footers_variants" USING btree ("logo_id");
  CREATE INDEX "footers_logo_idx" ON "footers" USING btree ("logo_id");
  CREATE INDEX "footers_updated_at_idx" ON "footers" USING btree ("updated_at");
  CREATE INDEX "footers_created_at_idx" ON "footers" USING btree ("created_at");
  CREATE UNIQUE INDEX "footers_locales_locale_parent_id_unique" ON "footers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footers_rels_order_idx" ON "footers_rels" USING btree ("order");
  CREATE INDEX "footers_rels_parent_idx" ON "footers_rels" USING btree ("parent_id");
  CREATE INDEX "footers_rels_path_idx" ON "footers_rels" USING btree ("path");
  CREATE INDEX "footers_rels_pages_id_idx" ON "footers_rels" USING btree ("pages_id");
  CREATE INDEX "footers_rels_posts_id_idx" ON "footers_rels" USING btree ("posts_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_header_id_headers_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."headers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_footer_id_footers_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_header_id_headers_id_fk" FOREIGN KEY ("version_header_id") REFERENCES "public"."headers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_footer_id_footers_id_fk" FOREIGN KEY ("version_footer_id") REFERENCES "public"."footers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_headers_fk" FOREIGN KEY ("headers_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_footers_fk" FOREIGN KEY ("footers_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_header_idx" ON "pages" USING btree ("header_id");
  CREATE INDEX "pages_footer_idx" ON "pages" USING btree ("footer_id");
  CREATE INDEX "_pages_v_version_version_header_idx" ON "_pages_v" USING btree ("version_header_id");
  CREATE INDEX "_pages_v_version_version_footer_idx" ON "_pages_v" USING btree ("version_footer_id");
  CREATE INDEX "payload_locked_documents_rels_headers_id_idx" ON "payload_locked_documents_rels" USING btree ("headers_id");
  CREATE INDEX "payload_locked_documents_rels_footers_id_idx" ON "payload_locked_documents_rels" USING btree ("footers_id");
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_variants_theme";
  DROP TYPE "public"."enum_header_theme";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_variants_theme";
  DROP TYPE "public"."enum_footer_theme";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_header_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footer_theme" AS ENUM('light', 'dark');
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_localized_label" varchar
  );
  
  CREATE TABLE "header_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar NOT NULL,
  	"theme" "enum_header_variants_theme" NOT NULL,
  	"login_text_color" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"theme" "enum_header_theme" DEFAULT 'light',
  	"login_url" varchar,
  	"login_text_color" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"login_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_items_locales" (
  	"link_localized_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar NOT NULL,
  	"theme" "enum_footer_variants_theme" NOT NULL,
  	"link_color" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"theme" "enum_footer_theme" DEFAULT 'light',
  	"link_color" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"address" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_yp_hero_board_faces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_list_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_plan_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_comparison_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_guarantee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_guarantee_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_replaces_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_replaces_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components_lead_chips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components_lead_chips_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_components_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_components_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_metrics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_scales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_scales_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_teams_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_map_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_card_map_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_views_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_board_faces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_dashboard_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_timeline_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_science_board_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_science_board_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_science_board" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_science_board_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_athletes_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_athletes_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_athletes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_athletes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_breakup" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_breakup_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance_cards_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance_cards_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_reassurance_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box_trust_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_buy_box_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_sticky_buy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yp_sticky_buy_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_hero_board_faces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_guarantee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_guarantee_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_replaces_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_replaces_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_components_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_components_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_metrics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_scales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_scales_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_teams_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_card_map_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_views_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_board_faces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_dashboard_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_timeline_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_science_board" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_science_board_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_athletes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_athletes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_breakup" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_breakup_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance_cards_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance_cards_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_reassurance_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_trust_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_sticky_buy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yp_sticky_buy_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "headers_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "headers_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "headers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "headers_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_yp_hero_board_faces" CASCADE;
  DROP TABLE "pages_blocks_yp_hero" CASCADE;
  DROP TABLE "pages_blocks_yp_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards_list_items" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards_list_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_plan_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_sections_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_comparison_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_guarantee_items" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_guarantee_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_plans" CASCADE;
  DROP TABLE "pages_blocks_yp_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_components_replaces_items" CASCADE;
  DROP TABLE "pages_blocks_yp_components_replaces_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components_lead_chips" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components_lead_chips_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components_rows" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components" CASCADE;
  DROP TABLE "pages_blocks_yp_components_components_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_components" CASCADE;
  DROP TABLE "pages_blocks_yp_components_locales" CASCADE;
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
  DROP TABLE "pages_blocks_yp_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_stats" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board_members" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board_members_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_breakup" CASCADE;
  DROP TABLE "pages_blocks_yp_breakup_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_faq_items" CASCADE;
  DROP TABLE "pages_blocks_yp_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_faq" CASCADE;
  DROP TABLE "pages_blocks_yp_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance_cards_points" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance_cards_points_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance" CASCADE;
  DROP TABLE "pages_blocks_yp_reassurance_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_options" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_options_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_trust" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_trust_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_sticky_buy" CASCADE;
  DROP TABLE "pages_blocks_yp_sticky_buy_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero_board_faces" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_list_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_plan_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_sections_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_comparison_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_guarantee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_guarantee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_replaces_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_replaces_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components_lead_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_components_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_components_locales" CASCADE;
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
  DROP TABLE "_pages_v_blocks_yp_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_members" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_breakup" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_breakup_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance_cards_points" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance_cards_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_reassurance_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_options" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_options_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_trust" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_trust_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_sticky_buy" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_sticky_buy_locales" CASCADE;
  DROP TABLE "headers_nav_items" CASCADE;
  DROP TABLE "headers_variants" CASCADE;
  DROP TABLE "headers" CASCADE;
  DROP TABLE "headers_locales" CASCADE;
  DROP TABLE "headers_rels" CASCADE;
  DROP TABLE "footers_nav_items" CASCADE;
  DROP TABLE "footers_nav_items_locales" CASCADE;
  DROP TABLE "footers_variants" CASCADE;
  DROP TABLE "footers" CASCADE;
  DROP TABLE "footers_locales" CASCADE;
  DROP TABLE "footers_rels" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_header_id_headers_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_footer_id_footers_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_header_id_headers_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_footer_id_footers_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_headers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_footers_fk";
  
  DROP INDEX "pages_header_idx";
  DROP INDEX "pages_footer_idx";
  DROP INDEX "_pages_v_version_version_header_idx";
  DROP INDEX "_pages_v_version_version_footer_idx";
  DROP INDEX "payload_locked_documents_rels_headers_id_idx";
  DROP INDEX "payload_locked_documents_rels_footers_id_idx";
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_variants" ADD CONSTRAINT "header_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_variants" ADD CONSTRAINT "footer_variants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_variants" ADD CONSTRAINT "footer_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_locale_idx" ON "header_nav_items" USING btree ("_locale");
  CREATE INDEX "header_variants_order_idx" ON "header_variants" USING btree ("_order");
  CREATE INDEX "header_variants_parent_id_idx" ON "header_variants" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_logo_dark_idx" ON "header" USING btree ("logo_dark_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_locale_idx" ON "header_rels" USING btree ("locale");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id","locale");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id","locale");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_nav_items_locales_locale_parent_id_unique" ON "footer_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_variants_order_idx" ON "footer_variants" USING btree ("_order");
  CREATE INDEX "footer_variants_parent_id_idx" ON "footer_variants" USING btree ("_parent_id");
  CREATE INDEX "footer_variants_logo_idx" ON "footer_variants" USING btree ("logo_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  ALTER TABLE "pages" DROP COLUMN "header_id";
  ALTER TABLE "pages" DROP COLUMN "footer_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_footer_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "headers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "footers_id";
  DROP TYPE "public"."enum_pages_blocks_yp_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_hero_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_plan_cards_cta_style";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_sections_rows_cell";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_comparison_cards_cta_style";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_guarantee_items_icon";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_plans_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_components_components_icon";
  DROP TYPE "public"."enum_pages_blocks_yp_components_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_components_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_teams_status_type";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_views_card_card_type";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_dashboard_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_timeline_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_timeline_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_science_board_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_science_board_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_athletes_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_athletes_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_breakup_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_breakup_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_faq_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_faq_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_reassurance_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_reassurance_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_buy_box_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_buy_box_background_type";
  DROP TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_hero_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_hero_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_plan_cards_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_sections_rows_cell";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_comparison_cards_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_guarantee_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_plans_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_components_components_icon";
  DROP TYPE "public"."enum__pages_v_blocks_yp_components_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_components_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_teams_status_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_views_card_card_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_dashboard_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_timeline_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_timeline_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_science_board_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_science_board_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_athletes_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_athletes_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_breakup_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_breakup_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_faq_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_faq_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_reassurance_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_reassurance_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_type";
  DROP TYPE "public"."enum_headers_nav_items_link_type";
  DROP TYPE "public"."enum_headers_variants_theme";
  DROP TYPE "public"."enum_headers_theme";
  DROP TYPE "public"."enum_footers_nav_items_link_type";
  DROP TYPE "public"."enum_footers_variants_theme";
  DROP TYPE "public"."enum_footers_theme";`)
}
