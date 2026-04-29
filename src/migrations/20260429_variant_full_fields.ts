import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enums (idempotent) ───────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_var_cycle2_items_status') THEN
        CREATE TYPE "public"."enum_var_cycle2_items_status"
          AS ENUM('unchanged','up','down','removed','added');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__var_cycle2_items_v_status') THEN
        CREATE TYPE "public"."enum__var_cycle2_items_v_status"
          AS ENUM('unchanged','up','down','removed','added');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_var_bio_groups_rows_direction') THEN
        CREATE TYPE "public"."enum_var_bio_groups_rows_direction"
          AS ENUM('up','down','new');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__var_bio_groups_v_rows_direction') THEN
        CREATE TYPE "public"."enum__var_bio_groups_v_rows_direction"
          AS ENUM('up','down','new');
      END IF;
    END $$;
  `)

  // ── Live tables ──────────────────────────────────────────────────────────

  // variant → cycle1Items
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_evolution_band_variants_cycle1_items" (
      "_order"     integer       NOT NULL,
      "_parent_id" varchar       NOT NULL
        REFERENCES "pages_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         varchar       PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "dose"       varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_evolution_band_variants_cycle1_items_locales" (
      "name"       varchar,
      "detail"     varchar,
      "benefit"    varchar,
      "id"         serial        PRIMARY KEY NOT NULL,
      "_locale"    "_locales"    NOT NULL,
      "_parent_id" varchar       NOT NULL
        REFERENCES "pages_blocks_evolution_band_variants_cycle1_items"("id") ON DELETE CASCADE
    );
  `)

  // variant → cycle2Items  (dbName: var_cycle2_items)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "var_cycle2_items" (
      "_order"     integer                            NOT NULL,
      "_parent_id" varchar                            NOT NULL
        REFERENCES "pages_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         varchar                            PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "dose"       varchar,
      "status"     "enum_var_cycle2_items_status"     DEFAULT 'unchanged'
    );
    CREATE TABLE IF NOT EXISTS "var_cycle2_items_locales" (
      "name"       varchar,
      "detail"     varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" varchar    NOT NULL
        REFERENCES "var_cycle2_items"("id") ON DELETE CASCADE
    );
  `)

  // variant → biologyGroups  (dbName: var_bio_groups)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "var_bio_groups" (
      "_order"     integer  NOT NULL,
      "_parent_id" varchar  NOT NULL
        REFERENCES "pages_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         varchar  PRIMARY KEY NOT NULL,
      "_uuid"      varchar
    );
    CREATE TABLE IF NOT EXISTS "var_bio_groups_locales" (
      "eyebrow"    varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" varchar    NOT NULL
        REFERENCES "var_bio_groups"("id") ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS "var_bio_groups_rows" (
      "_order"     integer                               NOT NULL,
      "_parent_id" varchar                               NOT NULL
        REFERENCES "var_bio_groups"("id") ON DELETE CASCADE,
      "id"         varchar                               PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "delta"      varchar,
      "direction"  "enum_var_bio_groups_rows_direction"
    );
    CREATE TABLE IF NOT EXISTS "var_bio_groups_rows_locales" (
      "label"      varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" varchar    NOT NULL
        REFERENCES "var_bio_groups_rows"("id") ON DELETE CASCADE
    );
  `)

  // ── Version tables ───────────────────────────────────────────────────────

  // variant → cycle1Items (version)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_evolution_band_variants_cycle1_items" (
      "_order"     integer  NOT NULL,
      "_parent_id" integer  NOT NULL
        REFERENCES "_pages_v_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         serial   PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "dose"       varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_evolution_band_variants_cycle1_items_locales" (
      "name"       varchar,
      "detail"     varchar,
      "benefit"    varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
        REFERENCES "_pages_v_blocks_evolution_band_variants_cycle1_items"("id") ON DELETE CASCADE
    );
  `)

  // variant → cycle2Items (version)  (dbName: var_cycle2_items → _var_cycle2_items_v)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_var_cycle2_items_v" (
      "_order"     integer                              NOT NULL,
      "_parent_id" integer                              NOT NULL
        REFERENCES "_pages_v_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         serial                               PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "dose"       varchar,
      "status"     "enum__var_cycle2_items_v_status"    DEFAULT 'unchanged'
    );
    CREATE TABLE IF NOT EXISTS "_var_cycle2_items_v_locales" (
      "name"       varchar,
      "detail"     varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
        REFERENCES "_var_cycle2_items_v"("id") ON DELETE CASCADE
    );
  `)

  // variant → biologyGroups (version)  (dbName: var_bio_groups → _var_bio_groups_v)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_var_bio_groups_v" (
      "_order"     integer  NOT NULL,
      "_parent_id" integer  NOT NULL
        REFERENCES "_pages_v_blocks_evolution_band_variants"("id") ON DELETE CASCADE,
      "id"         serial   PRIMARY KEY NOT NULL,
      "_uuid"      varchar
    );
    CREATE TABLE IF NOT EXISTS "_var_bio_groups_v_locales" (
      "eyebrow"    varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
        REFERENCES "_var_bio_groups_v"("id") ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS "_var_bio_groups_v_rows" (
      "_order"     integer                                  NOT NULL,
      "_parent_id" integer                                  NOT NULL
        REFERENCES "_var_bio_groups_v"("id") ON DELETE CASCADE,
      "id"         serial                                   PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "delta"      varchar,
      "direction"  "enum__var_bio_groups_v_rows_direction"
    );
    CREATE TABLE IF NOT EXISTS "_var_bio_groups_v_rows_locales" (
      "label"      varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
        REFERENCES "_var_bio_groups_v_rows"("id") ON DELETE CASCADE
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_var_bio_groups_v_rows_locales";
    DROP TABLE IF EXISTS "_var_bio_groups_v_rows";
    DROP TABLE IF EXISTS "_var_bio_groups_v_locales";
    DROP TABLE IF EXISTS "_var_bio_groups_v";
    DROP TABLE IF EXISTS "_var_cycle2_items_v_locales";
    DROP TABLE IF EXISTS "_var_cycle2_items_v";
    DROP TABLE IF EXISTS "_pages_v_blocks_evolution_band_variants_cycle1_items_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_evolution_band_variants_cycle1_items";
    DROP TABLE IF EXISTS "var_bio_groups_rows_locales";
    DROP TABLE IF EXISTS "var_bio_groups_rows";
    DROP TABLE IF EXISTS "var_bio_groups_locales";
    DROP TABLE IF EXISTS "var_bio_groups";
    DROP TABLE IF EXISTS "var_cycle2_items_locales";
    DROP TABLE IF EXISTS "var_cycle2_items";
    DROP TABLE IF EXISTS "pages_blocks_evolution_band_variants_cycle1_items_locales";
    DROP TABLE IF EXISTS "pages_blocks_evolution_band_variants_cycle1_items";
    DROP TYPE IF EXISTS "public"."enum__var_bio_groups_v_rows_direction";
    DROP TYPE IF EXISTS "public"."enum_var_bio_groups_rows_direction";
    DROP TYPE IF EXISTS "public"."enum__var_cycle2_items_v_status";
    DROP TYPE IF EXISTS "public"."enum_var_cycle2_items_status";
  `)
}
