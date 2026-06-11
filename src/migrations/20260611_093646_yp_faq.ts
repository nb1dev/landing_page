import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_faq_background_color" AS ENUM('cream', 'off', 'paper', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_faq_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_faq_background_color" AS ENUM('cream', 'off', 'paper', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_faq_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_yp_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_faq_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_faq_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_faq_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_faq_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_faq_background_color" DEFAULT 'cream',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_faq_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"grain" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_faq_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_faq_items" ADD CONSTRAINT "pages_blocks_yp_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_faq_items_locales" ADD CONSTRAINT "pages_blocks_yp_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_faq" ADD CONSTRAINT "pages_blocks_yp_faq_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_faq" ADD CONSTRAINT "pages_blocks_yp_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_faq_locales" ADD CONSTRAINT "pages_blocks_yp_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_faq_items" ADD CONSTRAINT "_pages_v_blocks_yp_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_yp_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_faq" ADD CONSTRAINT "_pages_v_blocks_yp_faq_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_faq" ADD CONSTRAINT "_pages_v_blocks_yp_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_faq_locales" ADD CONSTRAINT "_pages_v_blocks_yp_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_faq_items_order_idx" ON "pages_blocks_yp_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_faq_items_parent_id_idx" ON "pages_blocks_yp_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_yp_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_yp_faq_order_idx" ON "pages_blocks_yp_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_faq_parent_id_idx" ON "pages_blocks_yp_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_faq_path_idx" ON "pages_blocks_yp_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_faq_background_image_idx" ON "pages_blocks_yp_faq" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_faq_locales_locale_parent_id_unique" ON "pages_blocks_yp_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_faq_items_order_idx" ON "_pages_v_blocks_yp_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_faq_items_parent_id_idx" ON "_pages_v_blocks_yp_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_faq_order_idx" ON "_pages_v_blocks_yp_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_faq_parent_id_idx" ON "_pages_v_blocks_yp_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_faq_path_idx" ON "_pages_v_blocks_yp_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_faq_background_image_idx" ON "_pages_v_blocks_yp_faq" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_yp_faq_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_faq_items" CASCADE;
  DROP TABLE "pages_blocks_yp_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_yp_faq" CASCADE;
  DROP TABLE "pages_blocks_yp_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_faq_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_faq_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_faq_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_faq_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_faq_background_type";`)
}
