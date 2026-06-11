import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_science_board_background_color" AS ENUM('cream', 'paper', 'off', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_science_board_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_science_board_background_color" AS ENUM('cream', 'paper', 'off', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_science_board_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_science_board_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_yp_science_board_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"detail" varchar,
  	"pill" varchar,
  	"modal_title" varchar,
  	"bio" jsonb,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_science_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_science_board_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_science_board_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"more_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_science_board_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_science_board_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_science_board_members_locales" (
  	"name" varchar,
  	"role" varchar,
  	"detail" varchar,
  	"pill" varchar,
  	"modal_title" varchar,
  	"bio" jsonb,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_science_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_science_board_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_science_board_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT false,
  	"more_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_science_board_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" jsonb,
  	"more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_science_board_members" ADD CONSTRAINT "pages_blocks_yp_science_board_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_science_board_members" ADD CONSTRAINT "pages_blocks_yp_science_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_science_board_members_locales" ADD CONSTRAINT "pages_blocks_yp_science_board_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_science_board_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_science_board" ADD CONSTRAINT "pages_blocks_yp_science_board_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_science_board" ADD CONSTRAINT "pages_blocks_yp_science_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_science_board_locales" ADD CONSTRAINT "pages_blocks_yp_science_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board_members_locales" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_members_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_science_board_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_science_board_locales" ADD CONSTRAINT "_pages_v_blocks_yp_science_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_science_board"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_science_board_members_order_idx" ON "pages_blocks_yp_science_board_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_science_board_members_parent_id_idx" ON "pages_blocks_yp_science_board_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_science_board_members_photo_idx" ON "pages_blocks_yp_science_board_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_science_board_members_locales_locale_parent_" ON "pages_blocks_yp_science_board_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_science_board_order_idx" ON "pages_blocks_yp_science_board" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_science_board_parent_id_idx" ON "pages_blocks_yp_science_board" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_science_board_path_idx" ON "pages_blocks_yp_science_board" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_science_board_background_image_idx" ON "pages_blocks_yp_science_board" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_science_board_locales_locale_parent_id_uniqu" ON "pages_blocks_yp_science_board_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_science_board_members_order_idx" ON "_pages_v_blocks_yp_science_board_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_science_board_members_parent_id_idx" ON "_pages_v_blocks_yp_science_board_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_science_board_members_photo_idx" ON "_pages_v_blocks_yp_science_board_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_science_board_members_locales_locale_pare" ON "_pages_v_blocks_yp_science_board_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_science_board_order_idx" ON "_pages_v_blocks_yp_science_board" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_science_board_parent_id_idx" ON "_pages_v_blocks_yp_science_board" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_science_board_path_idx" ON "_pages_v_blocks_yp_science_board" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_science_board_background_image_idx" ON "_pages_v_blocks_yp_science_board" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_science_board_locales_locale_parent_id_un" ON "_pages_v_blocks_yp_science_board_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_science_board_members" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board_members_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board" CASCADE;
  DROP TABLE "pages_blocks_yp_science_board_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_members" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_science_board_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_science_board_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_science_board_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_science_board_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_science_board_background_type";`)
}
