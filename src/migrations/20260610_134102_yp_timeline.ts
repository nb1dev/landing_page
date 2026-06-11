import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_timeline_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_timeline_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_timeline_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_timeline_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_timeline_items_locales" (
  	"time_wk" varchar,
  	"title" varchar,
  	"badge" varchar,
  	"body" jsonb,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_timeline_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_timeline_stats_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_timeline_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_timeline_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"photo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_timeline_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"stats_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline_items_locales" (
  	"time_wk" varchar,
  	"title" varchar,
  	"badge" varchar,
  	"body" jsonb,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline_stats_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_timeline_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_timeline_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"photo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_timeline_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"stats_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_timeline_items" ADD CONSTRAINT "pages_blocks_yp_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline_items_locales" ADD CONSTRAINT "pages_blocks_yp_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline_stats" ADD CONSTRAINT "pages_blocks_yp_timeline_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline_stats_locales" ADD CONSTRAINT "pages_blocks_yp_timeline_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_timeline_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline" ADD CONSTRAINT "pages_blocks_yp_timeline_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline" ADD CONSTRAINT "pages_blocks_yp_timeline_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline" ADD CONSTRAINT "pages_blocks_yp_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_timeline_locales" ADD CONSTRAINT "pages_blocks_yp_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline_items" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline_items_locales" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_timeline_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline_stats" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline_stats_locales" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_timeline_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_timeline_locales" ADD CONSTRAINT "_pages_v_blocks_yp_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_timeline"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_timeline_items_order_idx" ON "pages_blocks_yp_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_timeline_items_parent_id_idx" ON "pages_blocks_yp_timeline_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_timeline_items_locales_locale_parent_id_uniq" ON "pages_blocks_yp_timeline_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_timeline_stats_order_idx" ON "pages_blocks_yp_timeline_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_timeline_stats_parent_id_idx" ON "pages_blocks_yp_timeline_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_timeline_stats_locales_locale_parent_id_uniq" ON "pages_blocks_yp_timeline_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_timeline_order_idx" ON "pages_blocks_yp_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_timeline_parent_id_idx" ON "pages_blocks_yp_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_timeline_path_idx" ON "pages_blocks_yp_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_timeline_background_image_idx" ON "pages_blocks_yp_timeline" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_yp_timeline_photo_idx" ON "pages_blocks_yp_timeline" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_timeline_locales_locale_parent_id_unique" ON "pages_blocks_yp_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_timeline_items_order_idx" ON "_pages_v_blocks_yp_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_timeline_items_parent_id_idx" ON "_pages_v_blocks_yp_timeline_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_timeline_items_locales_locale_parent_id_u" ON "_pages_v_blocks_yp_timeline_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_timeline_stats_order_idx" ON "_pages_v_blocks_yp_timeline_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_timeline_stats_parent_id_idx" ON "_pages_v_blocks_yp_timeline_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_timeline_stats_locales_locale_parent_id_u" ON "_pages_v_blocks_yp_timeline_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_timeline_order_idx" ON "_pages_v_blocks_yp_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_timeline_parent_id_idx" ON "_pages_v_blocks_yp_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_timeline_path_idx" ON "_pages_v_blocks_yp_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_timeline_background_image_idx" ON "_pages_v_blocks_yp_timeline" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_yp_timeline_photo_idx" ON "_pages_v_blocks_yp_timeline" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_timeline_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_timeline_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_stats" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline" CASCADE;
  DROP TABLE "pages_blocks_yp_timeline_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_timeline_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_timeline_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_timeline_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_timeline_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_timeline_background_type";`)
}
