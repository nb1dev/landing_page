import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_price_break_variants_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_price_break_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_price_break_variants_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_price_break_background_color" AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
  CREATE TYPE "public"."enum_header_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_header_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footer_variants_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_footer_theme" AS ENUM('light', 'dark');
  CREATE TABLE "header_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar NOT NULL,
  	"theme" "enum_header_variants_theme" NOT NULL,
  	"login_text_color" varchar
  );
  
  CREATE TABLE "header_locales" (
  	"login_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_text" DROP DEFAULT;
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_href" DROP DEFAULT;
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" DROP DEFAULT;
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "text" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_text" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_href" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" DROP DEFAULT;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales" ADD COLUMN "sub_line" varchar;
  ALTER TABLE "pages_blocks_process_diagram_steps_locales" ADD COLUMN "strain_caption" varchar;
  ALTER TABLE "pages_blocks_price_break_variants" ADD COLUMN "background_color" "enum_pages_blocks_price_break_variants_background_color";
  ALTER TABLE "pages_blocks_price_break_variants" ADD COLUMN "background_color_custom" varchar;
  ALTER TABLE "pages_blocks_price_break" ADD COLUMN "background_color" "enum_pages_blocks_price_break_background_color" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_price_break" ADD COLUMN "background_color_custom" varchar;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" ADD COLUMN "sub_line" varchar;
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales" ADD COLUMN "strain_caption" varchar;
  ALTER TABLE "_pages_v_blocks_price_break_variants" ADD COLUMN "background_color" "enum__pages_v_blocks_price_break_variants_background_color";
  ALTER TABLE "_pages_v_blocks_price_break_variants" ADD COLUMN "background_color_custom" varchar;
  ALTER TABLE "_pages_v_blocks_price_break" ADD COLUMN "background_color" "enum__pages_v_blocks_price_break_background_color" DEFAULT 'dark';
  ALTER TABLE "_pages_v_blocks_price_break" ADD COLUMN "background_color_custom" varchar;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_dark_id" integer;
  ALTER TABLE "header" ADD COLUMN "theme" "enum_header_theme" DEFAULT 'light';
  ALTER TABLE "header" ADD COLUMN "login_url" varchar;
  ALTER TABLE "header" ADD COLUMN "login_text_color" varchar;
  ALTER TABLE "footer" ADD COLUMN "theme" "enum_footer_theme" DEFAULT 'light';
  ALTER TABLE "footer" ADD COLUMN "link_color" varchar;
  ALTER TABLE "footer_locales" ADD COLUMN "tagline" varchar;
  ALTER TABLE "footer_locales" ADD COLUMN "address" varchar;
  ALTER TABLE "header_variants" ADD CONSTRAINT "header_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_variants" ADD CONSTRAINT "footer_variants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_variants" ADD CONSTRAINT "footer_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_variants_order_idx" ON "header_variants" USING btree ("_order");
  CREATE INDEX "header_variants_parent_id_idx" ON "header_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_variants_order_idx" ON "footer_variants" USING btree ("_order");
  CREATE INDEX "footer_variants_parent_id_idx" ON "footer_variants" USING btree ("_parent_id");
  CREATE INDEX "footer_variants_logo_idx" ON "footer_variants" USING btree ("logo_id");
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_logo_dark_idx" ON "header" USING btree ("logo_dark_id");
  ALTER TABLE "pages_blocks_price_break_variants" DROP COLUMN "dark_mode";
  ALTER TABLE "_pages_v_blocks_price_break_variants" DROP COLUMN "dark_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_variants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_variants" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_variants" CASCADE;
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_dark_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  DROP INDEX "header_logo_dark_idx";
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "text" SET DEFAULT 'Get your kit';
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" SET DEFAULT '2 weeks before anyone else';
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_text" SET DEFAULT 'Reserve my kit →';
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_href" SET DEFAULT '#reserve';
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" SET DEFAULT '.hero';
  ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" SET DEFAULT '#reserve';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "text" SET DEFAULT 'Get your kit';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" SET DEFAULT '2 weeks before anyone else';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_text" SET DEFAULT 'Reserve my kit →';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_href" SET DEFAULT '#reserve';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" SET DEFAULT '.hero';
  ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" SET DEFAULT '#reserve';
  ALTER TABLE "pages_blocks_price_break_variants" ADD COLUMN "dark_mode" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_price_break_variants" ADD COLUMN "dark_mode" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales" DROP COLUMN "sub_line";
  ALTER TABLE "pages_blocks_process_diagram_steps_locales" DROP COLUMN "strain_caption";
  ALTER TABLE "pages_blocks_price_break_variants" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_price_break_variants" DROP COLUMN "background_color_custom";
  ALTER TABLE "pages_blocks_price_break" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_price_break" DROP COLUMN "background_color_custom";
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales" DROP COLUMN "sub_line";
  ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales" DROP COLUMN "strain_caption";
  ALTER TABLE "_pages_v_blocks_price_break_variants" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_price_break_variants" DROP COLUMN "background_color_custom";
  ALTER TABLE "_pages_v_blocks_price_break" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_price_break" DROP COLUMN "background_color_custom";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "logo_dark_id";
  ALTER TABLE "header" DROP COLUMN "theme";
  ALTER TABLE "header" DROP COLUMN "login_url";
  ALTER TABLE "header" DROP COLUMN "login_text_color";
  ALTER TABLE "footer" DROP COLUMN "theme";
  ALTER TABLE "footer" DROP COLUMN "link_color";
  ALTER TABLE "footer_locales" DROP COLUMN "tagline";
  ALTER TABLE "footer_locales" DROP COLUMN "address";
  DROP TYPE "public"."enum_pages_blocks_price_break_variants_background_color";
  DROP TYPE "public"."enum_pages_blocks_price_break_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_price_break_variants_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_price_break_background_color";
  DROP TYPE "public"."enum_header_variants_theme";
  DROP TYPE "public"."enum_header_theme";
  DROP TYPE "public"."enum_footer_variants_theme";
  DROP TYPE "public"."enum_footer_theme";`)
}
