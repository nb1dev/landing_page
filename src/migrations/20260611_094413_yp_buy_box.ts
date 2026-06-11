import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_buy_box_background_color" AS ENUM('inkDeep', 'navyDeep', 'navy', 'teal', 'off', 'paper', 'cream', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_buy_box_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_color" AS ENUM('inkDeep', 'navyDeep', 'navy', 'teal', 'off', 'paper', 'cream', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_buy_box_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '#',
  	"recommended" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_yp_buy_box_options_locales" (
  	"name" varchar,
  	"price" varchar,
  	"price_suffix" varchar DEFAULT '/mo',
  	"alt_label" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"rec_flag_label" varchar DEFAULT 'Recommended',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_buy_box_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_buy_box_trust_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_buy_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_buy_box_background_color" DEFAULT 'inkDeep',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_buy_box_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_buy_box_locales" (
  	"heading" jsonb,
  	"sub" varchar,
  	"buy_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '#',
  	"recommended" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box_options_locales" (
  	"name" varchar,
  	"price" varchar,
  	"price_suffix" varchar DEFAULT '/mo',
  	"alt_label" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"rec_flag_label" varchar DEFAULT 'Recommended',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box_trust_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_buy_box_background_color" DEFAULT 'inkDeep',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_buy_box_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_buy_box_locales" (
  	"heading" jsonb,
  	"sub" varchar,
  	"buy_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_buy_box_options" ADD CONSTRAINT "pages_blocks_yp_buy_box_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box_options_locales" ADD CONSTRAINT "pages_blocks_yp_buy_box_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_buy_box_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box_trust" ADD CONSTRAINT "pages_blocks_yp_buy_box_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box_trust_locales" ADD CONSTRAINT "pages_blocks_yp_buy_box_trust_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_buy_box_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box" ADD CONSTRAINT "pages_blocks_yp_buy_box_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box" ADD CONSTRAINT "pages_blocks_yp_buy_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_buy_box_locales" ADD CONSTRAINT "pages_blocks_yp_buy_box_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_options_locales" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_buy_box_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_trust" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_trust_locales" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_trust_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_buy_box_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_buy_box_locales" ADD CONSTRAINT "_pages_v_blocks_yp_buy_box_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_buy_box"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_buy_box_options_order_idx" ON "pages_blocks_yp_buy_box_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_buy_box_options_parent_id_idx" ON "pages_blocks_yp_buy_box_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_buy_box_options_locales_locale_parent_id_uni" ON "pages_blocks_yp_buy_box_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_buy_box_trust_order_idx" ON "pages_blocks_yp_buy_box_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_buy_box_trust_parent_id_idx" ON "pages_blocks_yp_buy_box_trust" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_buy_box_trust_locales_locale_parent_id_uniqu" ON "pages_blocks_yp_buy_box_trust_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_buy_box_order_idx" ON "pages_blocks_yp_buy_box" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_buy_box_parent_id_idx" ON "pages_blocks_yp_buy_box" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_buy_box_path_idx" ON "pages_blocks_yp_buy_box" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_buy_box_background_image_idx" ON "pages_blocks_yp_buy_box" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_buy_box_locales_locale_parent_id_unique" ON "pages_blocks_yp_buy_box_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_options_order_idx" ON "_pages_v_blocks_yp_buy_box_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_options_parent_id_idx" ON "_pages_v_blocks_yp_buy_box_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_buy_box_options_locales_locale_parent_id_" ON "_pages_v_blocks_yp_buy_box_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_trust_order_idx" ON "_pages_v_blocks_yp_buy_box_trust" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_trust_parent_id_idx" ON "_pages_v_blocks_yp_buy_box_trust" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_buy_box_trust_locales_locale_parent_id_un" ON "_pages_v_blocks_yp_buy_box_trust_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_order_idx" ON "_pages_v_blocks_yp_buy_box" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_parent_id_idx" ON "_pages_v_blocks_yp_buy_box" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_path_idx" ON "_pages_v_blocks_yp_buy_box" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_buy_box_background_image_idx" ON "_pages_v_blocks_yp_buy_box" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_buy_box_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_buy_box_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_buy_box_options" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_options_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_trust" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_trust_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box" CASCADE;
  DROP TABLE "pages_blocks_yp_buy_box_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_options" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_options_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_trust" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_trust_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_buy_box_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_buy_box_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_buy_box_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_buy_box_background_type";`)
}
