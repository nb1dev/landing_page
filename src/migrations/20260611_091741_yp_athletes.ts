import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_athletes_background_color" AS ENUM('off', 'paper', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_athletes_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_athletes_background_color" AS ENUM('off', 'paper', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_athletes_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_athletes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"is_video" boolean DEFAULT false,
  	"video_id" integer,
  	"subtitles_url" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_athletes_cards_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"credit" varchar,
  	"watch_label" varchar DEFAULT 'Watch',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_athletes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_athletes_background_color" DEFAULT 'off',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_athletes_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_athletes_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"record_left" varchar,
  	"record_value" varchar,
  	"record_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_athletes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"is_video" boolean DEFAULT false,
  	"video_id" integer,
  	"subtitles_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_athletes_cards_locales" (
  	"quote" varchar,
  	"name" varchar,
  	"credit" varchar,
  	"watch_label" varchar DEFAULT 'Watch',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_athletes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_athletes_background_color" DEFAULT 'off',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_athletes_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_athletes_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"record_left" varchar,
  	"record_value" varchar,
  	"record_right" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_athletes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes_cards_locales" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_athletes_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes" ADD CONSTRAINT "pages_blocks_yp_athletes_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes" ADD CONSTRAINT "pages_blocks_yp_athletes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_athletes_locales" ADD CONSTRAINT "pages_blocks_yp_athletes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_athletes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_athletes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards_locales" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_athletes_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_locales" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_athletes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_athletes_cards_order_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_athletes_cards_parent_id_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_athletes_cards_image_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_yp_athletes_cards_video_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("video_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_athletes_cards_locales_locale_parent_id_uniq" ON "pages_blocks_yp_athletes_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_athletes_order_idx" ON "pages_blocks_yp_athletes" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_athletes_parent_id_idx" ON "pages_blocks_yp_athletes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_athletes_path_idx" ON "pages_blocks_yp_athletes" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_athletes_background_image_idx" ON "pages_blocks_yp_athletes" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_athletes_locales_locale_parent_id_unique" ON "pages_blocks_yp_athletes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_cards_order_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_athletes_cards_parent_id_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_cards_image_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_cards_video_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("video_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_athletes_cards_locales_locale_parent_id_u" ON "_pages_v_blocks_yp_athletes_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_order_idx" ON "_pages_v_blocks_yp_athletes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_athletes_parent_id_idx" ON "_pages_v_blocks_yp_athletes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_path_idx" ON "_pages_v_blocks_yp_athletes" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_athletes_background_image_idx" ON "_pages_v_blocks_yp_athletes" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_athletes_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_athletes_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_athletes_cards" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes" CASCADE;
  DROP TABLE "pages_blocks_yp_athletes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_athletes_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_athletes_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_athletes_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_athletes_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_athletes_background_type";`)
}
