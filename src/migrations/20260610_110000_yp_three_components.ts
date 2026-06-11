import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_components_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_components_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum_pages_blocks_yp_components_components_icon" AS ENUM('sun', 'moon', 'shield', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_components_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_components_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_components_components_icon" AS ENUM('sun', 'moon', 'shield', 'none');

  CREATE TABLE "pages_blocks_yp_components_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components_replaces_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components_components_lead_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components_components_lead_chips_locales" (
  	"bold" varchar,
  	"rest" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components_components_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"excluded" boolean DEFAULT false
  );
  CREATE TABLE "pages_blocks_yp_components_components_rows_locales" (
  	"name" varchar,
  	"dose" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_yp_components_components_icon" DEFAULT 'sun'
  );
  CREATE TABLE "pages_blocks_yp_components_components_locales" (
  	"tab_label" varchar,
  	"intro" varchar,
  	"lead_name" varchar,
  	"lead_dose" varchar,
  	"lead_read_label" varchar,
  	"lead_read_body" jsonb,
  	"ex_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  CREATE TABLE "pages_blocks_yp_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_components_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_components_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"image_id" integer,
  	"block_name" varchar
  );
  CREATE TABLE "pages_blocks_yp_components_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"replaces_prefix" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_yp_components_replaces_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_components_replaces_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components_lead_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" (
  	"bold" varchar,
  	"rest" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"excluded" boolean DEFAULT false,
  	"_uuid" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components_rows_locales" (
  	"name" varchar,
  	"dose" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_yp_components_components_icon" DEFAULT 'sun',
  	"_uuid" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_components_components_locales" (
  	"tab_label" varchar,
  	"intro" varchar,
  	"lead_name" varchar,
  	"lead_dose" varchar,
  	"lead_read_label" varchar,
  	"lead_read_body" jsonb,
  	"ex_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "_pages_v_blocks_yp_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_components_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_components_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_yp_components_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"replaces_prefix" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  -- foreign keys (main)
  ALTER TABLE "pages_blocks_yp_components_replaces_items" ADD CONSTRAINT "yp_comp_repl_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_replaces_items_locales" ADD CONSTRAINT "yp_comp_repl_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components_lead_chips" ADD CONSTRAINT "yp_comp_chips_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components_lead_chips_locales" ADD CONSTRAINT "yp_comp_chips_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_components_lead_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components_rows" ADD CONSTRAINT "yp_comp_rows_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components_rows_locales" ADD CONSTRAINT "yp_comp_rows_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_components_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components" ADD CONSTRAINT "yp_comp_co_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_components_locales" ADD CONSTRAINT "yp_comp_co_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components" ADD CONSTRAINT "yp_comp_bgimg_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components" ADD CONSTRAINT "yp_comp_img_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components" ADD CONSTRAINT "yp_comp_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_components_locales" ADD CONSTRAINT "yp_comp_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;

  -- foreign keys (versions)
  ALTER TABLE "_pages_v_blocks_yp_components_replaces_items" ADD CONSTRAINT "v_yp_comp_repl_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_replaces_items_locales" ADD CONSTRAINT "v_yp_comp_repl_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_replaces_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips" ADD CONSTRAINT "v_yp_comp_chips_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components_lead_chips_locales" ADD CONSTRAINT "v_yp_comp_chips_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_components_lead_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components_rows" ADD CONSTRAINT "v_yp_comp_rows_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components_rows_locales" ADD CONSTRAINT "v_yp_comp_rows_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_components_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components" ADD CONSTRAINT "v_yp_comp_co_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_components_locales" ADD CONSTRAINT "v_yp_comp_co_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components" ADD CONSTRAINT "v_yp_comp_bgimg_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components" ADD CONSTRAINT "v_yp_comp_img_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components" ADD CONSTRAINT "v_yp_comp_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_components_locales" ADD CONSTRAINT "v_yp_comp_loc_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_components"("id") ON DELETE cascade ON UPDATE no action;

  -- indexes (main)
  CREATE INDEX "yp_comp_repl_order_idx" ON "pages_blocks_yp_components_replaces_items" USING btree ("_order");
  CREATE INDEX "yp_comp_repl_parent_idx" ON "pages_blocks_yp_components_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_comp_repl_loc_uniq" ON "pages_blocks_yp_components_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_comp_chips_order_idx" ON "pages_blocks_yp_components_components_lead_chips" USING btree ("_order");
  CREATE INDEX "yp_comp_chips_parent_idx" ON "pages_blocks_yp_components_components_lead_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_comp_chips_loc_uniq" ON "pages_blocks_yp_components_components_lead_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_comp_rows_order_idx" ON "pages_blocks_yp_components_components_rows" USING btree ("_order");
  CREATE INDEX "yp_comp_rows_parent_idx" ON "pages_blocks_yp_components_components_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_comp_rows_loc_uniq" ON "pages_blocks_yp_components_components_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_comp_co_order_idx" ON "pages_blocks_yp_components_components" USING btree ("_order");
  CREATE INDEX "yp_comp_co_parent_idx" ON "pages_blocks_yp_components_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "yp_comp_co_loc_uniq" ON "pages_blocks_yp_components_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "yp_comp_order_idx" ON "pages_blocks_yp_components" USING btree ("_order");
  CREATE INDEX "yp_comp_parent_idx" ON "pages_blocks_yp_components" USING btree ("_parent_id");
  CREATE INDEX "yp_comp_path_idx" ON "pages_blocks_yp_components" USING btree ("_path");
  CREATE INDEX "yp_comp_bgimg_idx" ON "pages_blocks_yp_components" USING btree ("background_image_id");
  CREATE INDEX "yp_comp_img_idx" ON "pages_blocks_yp_components" USING btree ("image_id");
  CREATE UNIQUE INDEX "yp_comp_loc_uniq" ON "pages_blocks_yp_components_locales" USING btree ("_locale","_parent_id");

  -- indexes (versions)
  CREATE INDEX "v_yp_comp_repl_order_idx" ON "_pages_v_blocks_yp_components_replaces_items" USING btree ("_order");
  CREATE INDEX "v_yp_comp_repl_parent_idx" ON "_pages_v_blocks_yp_components_replaces_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_comp_repl_loc_uniq" ON "_pages_v_blocks_yp_components_replaces_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_comp_chips_order_idx" ON "_pages_v_blocks_yp_components_components_lead_chips" USING btree ("_order");
  CREATE INDEX "v_yp_comp_chips_parent_idx" ON "_pages_v_blocks_yp_components_components_lead_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_comp_chips_loc_uniq" ON "_pages_v_blocks_yp_components_components_lead_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_comp_rows_order_idx" ON "_pages_v_blocks_yp_components_components_rows" USING btree ("_order");
  CREATE INDEX "v_yp_comp_rows_parent_idx" ON "_pages_v_blocks_yp_components_components_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_comp_rows_loc_uniq" ON "_pages_v_blocks_yp_components_components_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_comp_co_order_idx" ON "_pages_v_blocks_yp_components_components" USING btree ("_order");
  CREATE INDEX "v_yp_comp_co_parent_idx" ON "_pages_v_blocks_yp_components_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "v_yp_comp_co_loc_uniq" ON "_pages_v_blocks_yp_components_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "v_yp_comp_order_idx" ON "_pages_v_blocks_yp_components" USING btree ("_order");
  CREATE INDEX "v_yp_comp_parent_idx" ON "_pages_v_blocks_yp_components" USING btree ("_parent_id");
  CREATE INDEX "v_yp_comp_path_idx" ON "_pages_v_blocks_yp_components" USING btree ("_path");
  CREATE INDEX "v_yp_comp_bgimg_idx" ON "_pages_v_blocks_yp_components" USING btree ("background_image_id");
  CREATE INDEX "v_yp_comp_img_idx" ON "_pages_v_blocks_yp_components" USING btree ("image_id");
  CREATE UNIQUE INDEX "v_yp_comp_loc_uniq" ON "_pages_v_blocks_yp_components_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_components_background_color";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_components_background_type";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_yp_components_components_icon";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_components_background_color";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_components_background_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_yp_components_components_icon";`)
}
