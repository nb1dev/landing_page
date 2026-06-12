import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- â”€â”€ TheCase block: main block table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    CREATE TABLE IF NOT EXISTS "pages_blocks_the_case" (
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "_path"       text NOT NULL,
      "id"          varchar PRIMARY KEY NOT NULL,
      "block_name"  varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_the_case_locales" (
      "lede"        varchar,
      "pivot_html"  varchar,
      "id"          serial PRIMARY KEY NOT NULL,
      "_locale"     "_locales" NOT NULL,
      "_parent_id"  varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_the_case_stats" (
      "_order"      integer NOT NULL,
      "_parent_id"  varchar NOT NULL,
      "id"          varchar PRIMARY KEY NOT NULL,
      "stat"        varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_the_case_stats_locales" (
      "unit"        varchar,
      "tag"         varchar,
      "front_body"  varchar,
      "back_body"   varchar,
      "id"          serial PRIMARY KEY NOT NULL,
      "_locale"     "_locales" NOT NULL,
      "_parent_id"  varchar NOT NULL
    );

    -- â”€â”€ version tables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_the_case" (
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "_path"       text NOT NULL,
      "id"          serial PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "block_name"  varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_the_case_locales" (
      "lede"        varchar,
      "pivot_html"  varchar,
      "id"          serial PRIMARY KEY NOT NULL,
      "_locale"     "_locales" NOT NULL,
      "_parent_id"  integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_the_case_stats" (
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "id"          serial PRIMARY KEY NOT NULL,
      "stat"        varchar,
      "_uuid"       varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_the_case_stats_locales" (
      "unit"        varchar,
      "tag"         varchar,
      "front_body"  varchar,
      "back_body"   varchar,
      "id"          serial PRIMARY KEY NOT NULL,
      "_locale"     "_locales" NOT NULL,
      "_parent_id"  integer NOT NULL
    );

    -- â”€â”€ foreign keys â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_the_case"
        ADD CONSTRAINT "pages_blocks_the_case_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_the_case_locales"
        ADD CONSTRAINT "pages_blocks_the_case_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages_blocks_the_case"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_the_case_stats"
        ADD CONSTRAINT "pages_blocks_the_case_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages_blocks_the_case"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_the_case_stats_locales"
        ADD CONSTRAINT "pages_blocks_the_case_stats_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages_blocks_the_case_stats"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_the_case"
        ADD CONSTRAINT "_pages_v_blocks_the_case_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_the_case_locales"
        ADD CONSTRAINT "_pages_v_blocks_the_case_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_the_case"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_the_case_stats"
        ADD CONSTRAINT "_pages_v_blocks_the_case_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_the_case"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_the_case_stats_locales"
        ADD CONSTRAINT "_pages_v_blocks_the_case_stats_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_the_case_stats"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- â”€â”€ indexes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    CREATE INDEX IF NOT EXISTS "pages_blocks_the_case_order_idx"
      ON "pages_blocks_the_case" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_the_case_parent_id_idx"
      ON "pages_blocks_the_case" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_the_case_path_idx"
      ON "pages_blocks_the_case" ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_the_case_locales_locale_parent_id_unique"
      ON "pages_blocks_the_case_locales" ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_the_case_stats_order_idx"
      ON "pages_blocks_the_case_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_the_case_stats_parent_id_idx"
      ON "pages_blocks_the_case_stats" ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_the_case_stats_locales_locale_parent_id_unique"
      ON "pages_blocks_the_case_stats_locales" ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_order_idx"
      ON "_pages_v_blocks_the_case" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_parent_id_idx"
      ON "_pages_v_blocks_the_case" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_path_idx"
      ON "_pages_v_blocks_the_case" ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_the_case_locales" ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_stats_order_idx"
      ON "_pages_v_blocks_the_case_stats" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_stats_parent_id_idx"
      ON "_pages_v_blocks_the_case_stats" ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_the_case_stats_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_the_case_stats_locales" ("_locale", "_parent_id");
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_the_case_locales"
      ADD COLUMN IF NOT EXISTS "heading" jsonb;

    ALTER TABLE "_pages_v_blocks_the_case_locales"
      ADD COLUMN IF NOT EXISTS "heading" jsonb;
  `)

  await db.execute(sql`
    -- â”€â”€ Drop deleted blocks: 8 blocks from the first session â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    -- trust_strip
    DROP TABLE IF EXISTS "pages_blocks_trust_strip_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_trust_strip_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_trust_strip" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_trust_strip_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_trust_strip_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_trust_strip" CASCADE;

    -- stat_flip_cards
    DROP TABLE IF EXISTS "pages_blocks_stat_flip_cards_cards_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_stat_flip_cards_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_stat_flip_cards_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_stat_flip_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_flip_cards_cards_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_flip_cards_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_flip_cards_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_flip_cards" CASCADE;

    -- two_model_comparison
    DROP TABLE IF EXISTS "pages_blocks_two_model_comparison_rows_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_two_model_comparison_rows" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_two_model_comparison_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_two_model_comparison" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_two_model_comparison_rows_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_two_model_comparison_rows" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_two_model_comparison_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_two_model_comparison" CASCADE;

    -- process_timeline
    DROP TABLE IF EXISTS "pages_blocks_process_timeline_steps_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_process_timeline_steps" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_process_timeline_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_process_timeline" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_process_timeline_steps_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_process_timeline_steps" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_process_timeline_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_process_timeline" CASCADE;

    -- product_trio
    DROP TABLE IF EXISTS "pages_blocks_product_trio_replaces_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_product_trio_replaces_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_product_trio_products_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_product_trio_products" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_product_trio_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_product_trio" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio_replaces_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio_replaces_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio_products_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio_products" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_product_trio" CASCADE;

    -- standards_bar
    DROP TABLE IF EXISTS "pages_blocks_standards_bar_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_standards_bar_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_standards_bar" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_standards_bar_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_standards_bar_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_standards_bar" CASCADE;

    -- plans_grid
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_guarantee_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_guarantee_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_plans_features_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_plans_features" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_plans_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_plans" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_plans_grid" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_guarantee_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_guarantee_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_plans_features_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_plans_features" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_plans_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_plans" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_plans_grid" CASCADE;

    -- close_band
    DROP TABLE IF EXISTS "pages_blocks_close_band_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_close_band" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_close_band_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_close_band" CASCADE;

    -- drop old enums
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_plans_grid_plans_style" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_plans_grid_plans_style" CASCADE;

    -- â”€â”€ Add trust_items to homepage_hero block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    CREATE TABLE IF NOT EXISTS "pages_blocks_homepage_hero_trust_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "show_stars" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_homepage_hero_trust_items_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_homepage_hero_trust_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "show_stars" boolean DEFAULT false,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_homepage_hero_trust_items_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    -- foreign keys
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_homepage_hero_trust_items"
        ADD CONSTRAINT "pages_blocks_homepage_hero_trust_items_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages_blocks_homepage_hero"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_homepage_hero_trust_items_locales"
        ADD CONSTRAINT "pages_blocks_homepage_hero_trust_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "pages_blocks_homepage_hero_trust_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_homepage_hero_trust_items"
        ADD CONSTRAINT "_pages_v_blocks_homepage_hero_trust_items_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_homepage_hero"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_homepage_hero_trust_items_locales"
        ADD CONSTRAINT "_pages_v_blocks_homepage_hero_trust_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_homepage_hero_trust_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- indexes
    CREATE INDEX IF NOT EXISTS "pages_blocks_homepage_hero_trust_items_order_idx"
      ON "pages_blocks_homepage_hero_trust_items" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_homepage_hero_trust_items_parent_id_idx"
      ON "pages_blocks_homepage_hero_trust_items" ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_homepage_hero_trust_items_locales_locale_parent_id_unique"
      ON "pages_blocks_homepage_hero_trust_items_locales" ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homepage_hero_trust_items_order_idx"
      ON "_pages_v_blocks_homepage_hero_trust_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_homepage_hero_trust_items_parent_id_idx"
      ON "_pages_v_blocks_homepage_hero_trust_items" ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_homepage_hero_trust_items_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_homepage_hero_trust_items_locales" ("_locale", "_parent_id");
  `)

}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_homepage_hero_trust_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_homepage_hero_trust_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_homepage_hero_trust_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_homepage_hero_trust_items" CASCADE;
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_the_case_locales" DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_pages_v_blocks_the_case_locales" DROP COLUMN IF EXISTS "heading";
  `)

  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_the_case_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_the_case_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_the_case_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_the_case" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_the_case_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_the_case_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_the_case_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_the_case" CASCADE;
  `)

}
