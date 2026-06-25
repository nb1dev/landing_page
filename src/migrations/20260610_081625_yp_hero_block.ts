import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_hero_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_hero_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_hero_background_color" AS ENUM('paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_hero_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_hero_board_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );

  CREATE TABLE "pages_blocks_yp_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_hero_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_hero_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"primary_button_url" varchar,
  	"secondary_link_url" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_yp_hero_locales" (
  	"heading" jsonb,
  	"description" jsonb,
  	"primary_button_label" varchar,
  	"secondary_link_label" varchar,
  	"board_copy" varchar,
  	"board_sub_copy" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_yp_hero_board_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_yp_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_hero_background_color" DEFAULT 'paper',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_hero_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"primary_button_url" varchar,
  	"secondary_link_url" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_yp_hero_locales" (
  	"heading" jsonb,
  	"description" jsonb,
  	"primary_button_label" varchar,
  	"secondary_link_label" varchar,
  	"board_copy" varchar,
  	"board_sub_copy" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_yp_hero_board_faces" ADD CONSTRAINT "pages_blocks_yp_hero_board_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_hero_board_faces" ADD CONSTRAINT "pages_blocks_yp_hero_board_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_hero" ADD CONSTRAINT "pages_blocks_yp_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_hero" ADD CONSTRAINT "pages_blocks_yp_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_hero" ADD CONSTRAINT "pages_blocks_yp_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_hero_locales" ADD CONSTRAINT "pages_blocks_yp_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero_board_faces" ADD CONSTRAINT "_pages_v_blocks_yp_hero_board_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero_board_faces" ADD CONSTRAINT "_pages_v_blocks_yp_hero_board_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero" ADD CONSTRAINT "_pages_v_blocks_yp_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero" ADD CONSTRAINT "_pages_v_blocks_yp_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero" ADD CONSTRAINT "_pages_v_blocks_yp_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_hero_locales" ADD CONSTRAINT "_pages_v_blocks_yp_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_hero_board_faces_order_idx" ON "pages_blocks_yp_hero_board_faces" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_hero_board_faces_parent_id_idx" ON "pages_blocks_yp_hero_board_faces" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_hero_board_faces_image_idx" ON "pages_blocks_yp_hero_board_faces" USING btree ("image_id");
  CREATE INDEX "pages_blocks_yp_hero_order_idx" ON "pages_blocks_yp_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_hero_parent_id_idx" ON "pages_blocks_yp_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_hero_path_idx" ON "pages_blocks_yp_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_hero_background_image_idx" ON "pages_blocks_yp_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_yp_hero_image_idx" ON "pages_blocks_yp_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_hero_locales_locale_parent_id_unique" ON "pages_blocks_yp_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_hero_board_faces_order_idx" ON "_pages_v_blocks_yp_hero_board_faces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_hero_board_faces_parent_id_idx" ON "_pages_v_blocks_yp_hero_board_faces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_hero_board_faces_image_idx" ON "_pages_v_blocks_yp_hero_board_faces" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_yp_hero_order_idx" ON "_pages_v_blocks_yp_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_hero_parent_id_idx" ON "_pages_v_blocks_yp_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_hero_path_idx" ON "_pages_v_blocks_yp_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_hero_background_image_idx" ON "_pages_v_blocks_yp_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_yp_hero_image_idx" ON "_pages_v_blocks_yp_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_hero_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_hero_board_faces" CASCADE;
  DROP TABLE "pages_blocks_yp_hero" CASCADE;
  DROP TABLE "pages_blocks_yp_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero_board_faces" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_hero_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_hero_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_hero_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_hero_background_type";`)
}
