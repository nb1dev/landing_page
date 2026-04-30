import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enums (idempotent) ────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_price_break_display_mode') THEN
        CREATE TYPE "public"."enum_pages_blocks_price_break_display_mode" AS ENUM('dark','light');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_price_break_display_mode') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_price_break_display_mode" AS ENUM('dark','light');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_price_break_variants_display_mode') THEN
        CREATE TYPE "public"."enum_pages_blocks_price_break_variants_display_mode" AS ENUM('dark','light');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_price_break_variants_display_mode') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_price_break_variants_display_mode" AS ENUM('dark','light');
      END IF;
    END $$;
  `)

  // ── Live tables ───────────────────────────────────────────────────────────

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_price_break" (
      "_order"        integer                                              NOT NULL,
      "_parent_id"    integer                                              NOT NULL,
      "_path"         text                                                 NOT NULL,
      "id"            varchar                                              PRIMARY KEY NOT NULL,
      "display_mode"  "enum_pages_blocks_price_break_display_mode"        DEFAULT 'dark',
      "price_number"  varchar                                              NOT NULL,
      "price_unit"    varchar,
      "block_name"    varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_price_break_locales" (
      "heading_line1"  varchar,
      "heading_line2"  varchar,
      "id"             serial       PRIMARY KEY NOT NULL,
      "_locale"        "_locales"   NOT NULL,
      "_parent_id"     varchar      NOT NULL
        REFERENCES "pages_blocks_price_break"("id") ON DELETE CASCADE,
      CONSTRAINT "pages_blocks_price_break_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_price_break_variants" (
      "_order"        integer                                                      NOT NULL,
      "_parent_id"    varchar                                                      NOT NULL
        REFERENCES "pages_blocks_price_break"("id") ON DELETE CASCADE,
      "id"            varchar                                                      PRIMARY KEY NOT NULL,
      "variant_key"   varchar,
      "display_mode"  "enum_pages_blocks_price_break_variants_display_mode",
      "price_number"  varchar,
      "price_unit"    varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_price_break_variants_locales" (
      "heading_line1"  varchar,
      "heading_line2"  varchar,
      "id"             serial       PRIMARY KEY NOT NULL,
      "_locale"        "_locales"   NOT NULL,
      "_parent_id"     varchar      NOT NULL
        REFERENCES "pages_blocks_price_break_variants"("id") ON DELETE CASCADE,
      CONSTRAINT "pages_blocks_price_break_variants_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  // ── Version tables ────────────────────────────────────────────────────────

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_price_break" (
      "_order"        integer                                               NOT NULL,
      "_parent_id"    integer                                               NOT NULL,
      "_path"         text                                                  NOT NULL,
      "id"            serial                                                PRIMARY KEY NOT NULL,
      "_uuid"         varchar,
      "display_mode"  "enum__pages_v_blocks_price_break_display_mode"      DEFAULT 'dark',
      "price_number"  varchar,
      "price_unit"    varchar,
      "block_name"    varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_price_break_locales" (
      "heading_line1"  varchar,
      "heading_line2"  varchar,
      "id"             serial     PRIMARY KEY NOT NULL,
      "_locale"        "_locales" NOT NULL,
      "_parent_id"     integer    NOT NULL
        REFERENCES "_pages_v_blocks_price_break"("id") ON DELETE CASCADE,
      CONSTRAINT "_pages_v_blocks_price_break_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_price_break_variants" (
      "_order"        integer                                                        NOT NULL,
      "_parent_id"    integer                                                        NOT NULL
        REFERENCES "_pages_v_blocks_price_break"("id") ON DELETE CASCADE,
      "id"            serial                                                         PRIMARY KEY NOT NULL,
      "_uuid"         varchar,
      "variant_key"   varchar,
      "display_mode"  "enum__pages_v_blocks_price_break_variants_display_mode",
      "price_number"  varchar,
      "price_unit"    varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_price_break_variants_locales" (
      "heading_line1"  varchar,
      "heading_line2"  varchar,
      "id"             serial     PRIMARY KEY NOT NULL,
      "_locale"        "_locales" NOT NULL,
      "_parent_id"     integer    NOT NULL
        REFERENCES "_pages_v_blocks_price_break_variants"("id") ON DELETE CASCADE,
      CONSTRAINT "_pages_v_blocks_price_break_variants_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_price_break_variants_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_price_break_variants" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_price_break_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_price_break" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_price_break_variants_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_price_break_variants" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_price_break_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_price_break" CASCADE;
    DROP TYPE IF EXISTS "enum_pages_blocks_price_break_display_mode";
    DROP TYPE IF EXISTS "enum__pages_v_blocks_price_break_display_mode";
    DROP TYPE IF EXISTS "enum_pages_blocks_price_break_variants_display_mode";
    DROP TYPE IF EXISTS "enum__pages_v_blocks_price_break_variants_display_mode";
  `)
}
