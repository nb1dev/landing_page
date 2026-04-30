import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Live tables ───────────────────────────────────────────────────────────

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board" (
      "_order"      integer  NOT NULL,
      "_parent_id"  integer  NOT NULL,
      "_path"       text     NOT NULL,
      "id"          varchar  PRIMARY KEY NOT NULL,
      "dark_mode"   boolean  DEFAULT false,
      "block_name"  varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_locales" (
      "eyebrow"      varchar,
      "heading"      jsonb,
      "sub_lead"     varchar,
      "sub_credits"  jsonb,
      "id"           serial      PRIMARY KEY NOT NULL,
      "_locale"      "_locales"  NOT NULL,
      "_parent_id"   varchar     NOT NULL
        REFERENCES "pages_blocks_science_board"("id") ON DELETE CASCADE,
      CONSTRAINT "pages_blocks_science_board_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_members" (
      "_order"       integer  NOT NULL,
      "_parent_id"   varchar  NOT NULL
        REFERENCES "pages_blocks_science_board"("id") ON DELETE CASCADE,
      "id"           varchar  PRIMARY KEY NOT NULL,
      "photo_id"     integer  REFERENCES "media"("id") ON DELETE SET NULL,
      "photo_url"    varchar,
      "tag"          varchar,
      "institution"  varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_members_locales" (
      "name"        varchar,
      "role"        varchar,
      "meta"        varchar,
      "bio"         jsonb,
      "id"          serial      PRIMARY KEY NOT NULL,
      "_locale"     "_locales"  NOT NULL,
      "_parent_id"  varchar     NOT NULL
        REFERENCES "pages_blocks_science_board_members"("id") ON DELETE CASCADE,
      CONSTRAINT "pages_blocks_science_board_members_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_stats" (
      "_order"      integer  NOT NULL,
      "_parent_id"  varchar  NOT NULL
        REFERENCES "pages_blocks_science_board"("id") ON DELETE CASCADE,
      "id"          varchar  PRIMARY KEY NOT NULL,
      "target"      numeric,
      "suffix"      varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_stats_locales" (
      "label"       varchar,
      "id"          serial      PRIMARY KEY NOT NULL,
      "_locale"     "_locales"  NOT NULL,
      "_parent_id"  varchar     NOT NULL
        REFERENCES "pages_blocks_science_board_stats"("id") ON DELETE CASCADE,
      CONSTRAINT "pages_blocks_science_board_stats_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_science_board_variants" (
      "_order"       integer  NOT NULL,
      "_parent_id"   varchar  NOT NULL
        REFERENCES "pages_blocks_science_board"("id") ON DELETE CASCADE,
      "id"           varchar  PRIMARY KEY NOT NULL,
      "variant_key"  varchar,
      "dark_mode"    boolean  DEFAULT false
    );
  `)

  // ── Version tables ────────────────────────────────────────────────────────

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board" (
      "_order"      integer  NOT NULL,
      "_parent_id"  integer  NOT NULL,
      "_path"       text     NOT NULL,
      "id"          serial   PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "dark_mode"   boolean  DEFAULT false,
      "block_name"  varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_locales" (
      "eyebrow"      varchar,
      "heading"      jsonb,
      "sub_lead"     varchar,
      "sub_credits"  jsonb,
      "id"           serial      PRIMARY KEY NOT NULL,
      "_locale"      "_locales"  NOT NULL,
      "_parent_id"   integer     NOT NULL
        REFERENCES "_pages_v_blocks_science_board"("id") ON DELETE CASCADE,
      CONSTRAINT "_pages_v_blocks_science_board_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_members" (
      "_order"       integer  NOT NULL,
      "_parent_id"   integer  NOT NULL
        REFERENCES "_pages_v_blocks_science_board"("id") ON DELETE CASCADE,
      "id"           serial   PRIMARY KEY NOT NULL,
      "_uuid"        varchar,
      "photo_id"     integer  REFERENCES "media"("id") ON DELETE SET NULL,
      "photo_url"    varchar,
      "tag"          varchar,
      "institution"  varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_members_locales" (
      "name"        varchar,
      "role"        varchar,
      "meta"        varchar,
      "bio"         jsonb,
      "id"          serial      PRIMARY KEY NOT NULL,
      "_locale"     "_locales"  NOT NULL,
      "_parent_id"  integer     NOT NULL
        REFERENCES "_pages_v_blocks_science_board_members"("id") ON DELETE CASCADE,
      CONSTRAINT "_pages_v_blocks_science_board_members_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_stats" (
      "_order"      integer  NOT NULL,
      "_parent_id"  integer  NOT NULL
        REFERENCES "_pages_v_blocks_science_board"("id") ON DELETE CASCADE,
      "id"          serial   PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "target"      numeric,
      "suffix"      varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_stats_locales" (
      "label"       varchar,
      "id"          serial      PRIMARY KEY NOT NULL,
      "_locale"     "_locales"  NOT NULL,
      "_parent_id"  integer     NOT NULL
        REFERENCES "_pages_v_blocks_science_board_stats"("id") ON DELETE CASCADE,
      CONSTRAINT "_pages_v_blocks_science_board_stats_locales_locale_parent_id_unique"
        UNIQUE ("_locale", "_parent_id")
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_science_board_variants" (
      "_order"       integer  NOT NULL,
      "_parent_id"   integer  NOT NULL
        REFERENCES "_pages_v_blocks_science_board"("id") ON DELETE CASCADE,
      "id"           serial   PRIMARY KEY NOT NULL,
      "_uuid"        varchar,
      "variant_key"  varchar,
      "dark_mode"    boolean  DEFAULT false
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_variants" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_members_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_members" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_science_board" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_variants" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_stats_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_members_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_members" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_science_board" CASCADE;
  `)
}
