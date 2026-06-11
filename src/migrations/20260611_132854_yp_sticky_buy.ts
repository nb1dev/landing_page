import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_color" AS ENUM('glass', 'paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_type" AS ENUM('color', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_color" AS ENUM('glass', 'paper', 'off', 'cream', 'navy', 'navyDeep', 'teal', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_type" AS ENUM('color', 'image');
  CREATE TABLE "pages_blocks_yp_sticky_buy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_yp_sticky_buy_background_color" DEFAULT 'glass',
  	"background_color_custom" varchar,
  	"background_type" "enum_pages_blocks_yp_sticky_buy_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"cta_href" varchar DEFAULT '#',
  	"show_after_sel" varchar DEFAULT '.yp-hero, [data-screen-label="Hero"], .hero',
  	"hide_at_sel" varchar DEFAULT '.yp-plans, .buy-close, footer, .nbf',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yp_sticky_buy_locales" (
  	"left_key" varchar,
  	"left_value" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_yp_sticky_buy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_yp_sticky_buy_background_color" DEFAULT 'glass',
  	"background_color_custom" varchar,
  	"background_type" "enum__pages_v_blocks_yp_sticky_buy_background_type" DEFAULT 'color',
  	"background_image_id" integer,
  	"cta_href" varchar DEFAULT '#',
  	"show_after_sel" varchar DEFAULT '.yp-hero, [data-screen-label="Hero"], .hero',
  	"hide_at_sel" varchar DEFAULT '.yp-plans, .buy-close, footer, .nbf',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yp_sticky_buy_locales" (
  	"left_key" varchar,
  	"left_value" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_sticky_buy" ADD CONSTRAINT "pages_blocks_yp_sticky_buy_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_sticky_buy" ADD CONSTRAINT "pages_blocks_yp_sticky_buy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yp_sticky_buy_locales" ADD CONSTRAINT "pages_blocks_yp_sticky_buy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_yp_sticky_buy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_sticky_buy" ADD CONSTRAINT "_pages_v_blocks_yp_sticky_buy_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_sticky_buy" ADD CONSTRAINT "_pages_v_blocks_yp_sticky_buy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_sticky_buy_locales" ADD CONSTRAINT "_pages_v_blocks_yp_sticky_buy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_yp_sticky_buy"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_sticky_buy_order_idx" ON "pages_blocks_yp_sticky_buy" USING btree ("_order");
  CREATE INDEX "pages_blocks_yp_sticky_buy_parent_id_idx" ON "pages_blocks_yp_sticky_buy" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yp_sticky_buy_path_idx" ON "pages_blocks_yp_sticky_buy" USING btree ("_path");
  CREATE INDEX "pages_blocks_yp_sticky_buy_background_image_idx" ON "pages_blocks_yp_sticky_buy" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "pages_blocks_yp_sticky_buy_locales_locale_parent_id_unique" ON "pages_blocks_yp_sticky_buy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_sticky_buy_order_idx" ON "_pages_v_blocks_yp_sticky_buy" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yp_sticky_buy_parent_id_idx" ON "_pages_v_blocks_yp_sticky_buy" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yp_sticky_buy_path_idx" ON "_pages_v_blocks_yp_sticky_buy" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_yp_sticky_buy_background_image_idx" ON "_pages_v_blocks_yp_sticky_buy" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_yp_sticky_buy_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_yp_sticky_buy_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_yp_sticky_buy" CASCADE;
  DROP TABLE "pages_blocks_yp_sticky_buy_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_sticky_buy" CASCADE;
  DROP TABLE "_pages_v_blocks_yp_sticky_buy_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_color";
  DROP TYPE "public"."enum_pages_blocks_yp_sticky_buy_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_yp_sticky_buy_background_type";`)
}
