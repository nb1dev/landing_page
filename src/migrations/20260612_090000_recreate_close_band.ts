import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The `20260611_the_case_hero` migration dropped the close_band tables, but the
// CloseBand block is still registered in the Pages config — so every page query
// selected a non-existent `pages_blocks_close_band` table and 500'd. This
// re-creates those tables (schema matches src/blocks/CloseBand/config.ts).

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_close_band" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" varchar PRIMARY KEY NOT NULL,
    	"cta_href" varchar,
    	"block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_close_band_locales" (
    	"heading" jsonb,
    	"subheading" varchar,
    	"cta_label" varchar,
    	"id" serial PRIMARY KEY NOT NULL,
    	"_locale" "_locales" NOT NULL,
    	"_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_close_band" (
    	"_order" integer NOT NULL,
    	"_parent_id" integer NOT NULL,
    	"_path" text NOT NULL,
    	"id" serial PRIMARY KEY NOT NULL,
    	"cta_href" varchar,
    	"_uuid" varchar,
    	"block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_close_band_locales" (
    	"heading" jsonb,
    	"subheading" varchar,
    	"cta_label" varchar,
    	"id" serial PRIMARY KEY NOT NULL,
    	"_locale" "_locales" NOT NULL,
    	"_parent_id" integer NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_close_band" ADD CONSTRAINT "pages_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END; $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_close_band_locales" ADD CONSTRAINT "pages_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END; $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_close_band" ADD CONSTRAINT "_pages_v_blocks_close_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END; $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_close_band_locales" ADD CONSTRAINT "_pages_v_blocks_close_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_close_band"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END; $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_close_band_order_idx" ON "pages_blocks_close_band" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_close_band_parent_id_idx" ON "pages_blocks_close_band" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_close_band_path_idx" ON "pages_blocks_close_band" USING btree ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_close_band_locales_locale_parent_id_unique" ON "pages_blocks_close_band_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_close_band_order_idx" ON "_pages_v_blocks_close_band" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_close_band_parent_id_idx" ON "_pages_v_blocks_close_band" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_close_band_path_idx" ON "_pages_v_blocks_close_band" USING btree ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_close_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_close_band_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_close_band_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_close_band" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_close_band_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_close_band" CASCADE;
  `)
}
