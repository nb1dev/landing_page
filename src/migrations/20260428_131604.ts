import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_evolution_band_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"dark_mode" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_evolution_band_variants_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_italic" varchar,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"biology_eyebrow" varchar,
  	"cycle2_footer" varchar,
  	"caption" varchar,
  	"caption_highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant_key" varchar,
  	"cycle1_tag" varchar,
  	"cycle1_version" varchar,
  	"cycle2_tag" varchar,
  	"cycle2_version" varchar,
  	"dark_mode" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_evolution_band_variants_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_italic" varchar,
  	"subtext" varchar,
  	"cycle1_name" varchar,
  	"cycle1_footer" varchar,
  	"cycle2_name" varchar,
  	"biology_eyebrow" varchar,
  	"cycle2_footer" varchar,
  	"caption" varchar,
  	"caption_highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_evolution_band_variants" ADD CONSTRAINT "pages_blocks_evolution_band_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_evolution_band_variants_locales" ADD CONSTRAINT "pages_blocks_evolution_band_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_evolution_band_variants_locales" ADD CONSTRAINT "_pages_v_blocks_evolution_band_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_evolution_band_variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_evolution_band_variants_order_idx" ON "pages_blocks_evolution_band_variants" USING btree ("_order");
  CREATE INDEX "pages_blocks_evolution_band_variants_parent_id_idx" ON "pages_blocks_evolution_band_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_evolution_band_variants_locales_locale_parent_i" ON "pages_blocks_evolution_band_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_order_idx" ON "_pages_v_blocks_evolution_band_variants" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_evolution_band_variants_parent_id_idx" ON "_pages_v_blocks_evolution_band_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_evolution_band_variants_locales_locale_paren" ON "_pages_v_blocks_evolution_band_variants_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_evolution_band" DROP COLUMN "color_mode";
  ALTER TABLE "_pages_v_blocks_evolution_band" DROP COLUMN "color_mode";
  DROP TYPE "public"."enum_pages_blocks_evolution_band_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_evolution_band_color_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_evolution_band_color_mode" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_evolution_band_color_mode" AS ENUM('light', 'dark');
  DROP TABLE "pages_blocks_evolution_band_variants" CASCADE;
  DROP TABLE "pages_blocks_evolution_band_variants_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants" CASCADE;
  DROP TABLE "_pages_v_blocks_evolution_band_variants_locales" CASCADE;
  ALTER TABLE "pages_blocks_evolution_band" ADD COLUMN "color_mode" "enum_pages_blocks_evolution_band_color_mode" DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_evolution_band" ADD COLUMN "color_mode" "enum__pages_v_blocks_evolution_band_color_mode" DEFAULT 'light';`)
}
