import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_reading_panel_archetypes_band" AS ENUM('Excellent', 'Needs work');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_uuid" AS ENUM('protein', 'bifido', 'fibre', 'mucus', 'crowded', 'depletion', 'gutbrain', 'balance');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_band" AS ENUM('Excellent', 'Needs work');
  CREATE TABLE "pages_blocks_lab_reading_panel_raw_species" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"percent" numeric
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel_seals_locales" (
  	"rail_label" varchar,
  	"panel_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel_archetypes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"density" numeric,
  	"score" numeric,
  	"band" "enum_pages_blocks_lab_reading_panel_archetypes_band",
  	"stress" boolean DEFAULT false,
  	"hold" boolean DEFAULT false,
  	"teams_fibre" numeric,
  	"teams_butyrate" numeric,
  	"teams_cross_feeders" numeric,
  	"teams_bifido" numeric,
  	"teams_mucus" numeric,
  	"teams_protein" numeric,
  	"radar_health" numeric,
  	"radar_diversity" numeric,
  	"radar_metabolic" numeric,
  	"radar_team_balance" numeric,
  	"radar_safety" numeric,
  	"ratios_main_fuel" numeric,
  	"ratios_fermentation" numeric,
  	"ratios_gut_lining" numeric,
  	"ratios_byproducts" numeric
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel_archetypes_locales" (
  	"name" varchar,
  	"card" varchar,
  	"whats" varchar,
  	"focus" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_reading_panel_locales" (
  	"heading" jsonb,
  	"lead_in" varchar,
  	"transition_text" jsonb,
  	"raw_species_label" varchar,
  	"raw_more_label" varchar,
  	"rail_label" varchar,
  	"tap_hint_title" varchar,
  	"tap_hint_sub" varchar,
  	"see_full_reading_label" varchar,
  	"see_full_reading_hint" varchar,
  	"tab_teams_label" varchar,
  	"tab_ratios_label" varchar,
  	"tab_balance_label" varchar,
  	"teams_intro" varchar,
  	"ratios_intro" varchar,
  	"score_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_raw_species" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"percent" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_seals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_seals_locales" (
  	"rail_label" varchar,
  	"panel_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_archetypes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" "enum__pages_v_blocks_lab_reading_panel_archetypes_uuid",
  	"density" numeric,
  	"score" numeric,
  	"band" "enum__pages_v_blocks_lab_reading_panel_archetypes_band",
  	"stress" boolean DEFAULT false,
  	"hold" boolean DEFAULT false,
  	"teams_fibre" numeric,
  	"teams_butyrate" numeric,
  	"teams_cross_feeders" numeric,
  	"teams_bifido" numeric,
  	"teams_mucus" numeric,
  	"teams_protein" numeric,
  	"radar_health" numeric,
  	"radar_diversity" numeric,
  	"radar_metabolic" numeric,
  	"radar_team_balance" numeric,
  	"radar_safety" numeric,
  	"ratios_main_fuel" numeric,
  	"ratios_fermentation" numeric,
  	"ratios_gut_lining" numeric,
  	"ratios_byproducts" numeric
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" (
  	"name" varchar,
  	"card" varchar,
  	"whats" varchar,
  	"focus" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reading_panel_locales" (
  	"heading" jsonb,
  	"lead_in" varchar,
  	"transition_text" jsonb,
  	"raw_species_label" varchar,
  	"raw_more_label" varchar,
  	"rail_label" varchar,
  	"tap_hint_title" varchar,
  	"tap_hint_sub" varchar,
  	"see_full_reading_label" varchar,
  	"see_full_reading_hint" varchar,
  	"tab_teams_label" varchar,
  	"tab_ratios_label" varchar,
  	"tab_balance_label" varchar,
  	"teams_intro" varchar,
  	"ratios_intro" varchar,
  	"score_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_reading_panel_raw_species" ADD CONSTRAINT "pages_blocks_lab_reading_panel_raw_species_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel_seals" ADD CONSTRAINT "pages_blocks_lab_reading_panel_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel_seals_locales" ADD CONSTRAINT "pages_blocks_lab_reading_panel_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ADD CONSTRAINT "pages_blocks_lab_reading_panel_archetypes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "pages_blocks_lab_reading_panel_archetypes_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel" ADD CONSTRAINT "pages_blocks_lab_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reading_panel_locales" ADD CONSTRAINT "pages_blocks_lab_reading_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_raw_species" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_raw_species_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_seals" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_seals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_seals_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_seals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_seals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_reading_panel_raw_species_order_idx" ON "pages_blocks_lab_reading_panel_raw_species" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reading_panel_raw_species_parent_id_idx" ON "pages_blocks_lab_reading_panel_raw_species" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_reading_panel_seals_order_idx" ON "pages_blocks_lab_reading_panel_seals" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reading_panel_seals_parent_id_idx" ON "pages_blocks_lab_reading_panel_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_reading_panel_seals_locales_locale_parent_i" ON "pages_blocks_lab_reading_panel_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_reading_panel_archetypes_order_idx" ON "pages_blocks_lab_reading_panel_archetypes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reading_panel_archetypes_parent_id_idx" ON "pages_blocks_lab_reading_panel_archetypes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_reading_panel_archetypes_locales_locale_par" ON "pages_blocks_lab_reading_panel_archetypes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_reading_panel_order_idx" ON "pages_blocks_lab_reading_panel" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reading_panel_parent_id_idx" ON "pages_blocks_lab_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_reading_panel_path_idx" ON "pages_blocks_lab_reading_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_reading_panel_locales_locale_parent_id_uniq" ON "pages_blocks_lab_reading_panel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_raw_species_order_idx" ON "_pages_v_blocks_lab_reading_panel_raw_species" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_raw_species_parent_id_idx" ON "_pages_v_blocks_lab_reading_panel_raw_species" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_seals_order_idx" ON "_pages_v_blocks_lab_reading_panel_seals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_seals_parent_id_idx" ON "_pages_v_blocks_lab_reading_panel_seals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_reading_panel_seals_locales_locale_paren" ON "_pages_v_blocks_lab_reading_panel_seals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_archetypes_order_idx" ON "_pages_v_blocks_lab_reading_panel_archetypes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_archetypes_parent_id_idx" ON "_pages_v_blocks_lab_reading_panel_archetypes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_reading_panel_archetypes_locales_locale_" ON "_pages_v_blocks_lab_reading_panel_archetypes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_order_idx" ON "_pages_v_blocks_lab_reading_panel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_parent_id_idx" ON "_pages_v_blocks_lab_reading_panel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reading_panel_path_idx" ON "_pages_v_blocks_lab_reading_panel" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_reading_panel_locales_locale_parent_id_u" ON "_pages_v_blocks_lab_reading_panel_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_reading_panel_raw_species" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel_seals" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel_seals_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel_archetypes" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel_archetypes_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel" CASCADE;
  DROP TABLE "pages_blocks_lab_reading_panel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_raw_species" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_seals" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_seals_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_archetypes" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reading_panel_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_reading_panel_archetypes_band";
  DROP TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_uuid";
  DROP TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_band";`)
}
