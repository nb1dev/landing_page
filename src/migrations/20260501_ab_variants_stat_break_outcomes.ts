import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enums ─────────────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_stat_break_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_stat_break_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_outcomes_section_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_outcomes_section_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── StatBreak variants (live) ─────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_stat_break_variants" (
      "_order"                  integer                                                        NOT NULL,
      "_parent_id"              varchar                                                        NOT NULL,
      "id"                      varchar                                                        PRIMARY KEY NOT NULL,
      "variant_key"             varchar,
      "background_color"        "enum_pages_blocks_stat_break_variants_background_color",
      "background_color_custom" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_stat_break_variants_locales" (
      "stat_number"      varchar,
      "stat_suffix"      varchar,
      "heading_line1"    varchar,
      "heading_line2"    varchar,
      "highlighted_word" varchar,
      "heading_after"    varchar,
      "id"               serial     PRIMARY KEY NOT NULL,
      "_locale"          "_locales" NOT NULL,
      "_parent_id"       varchar    NOT NULL
    );
  `)

  // ── OutcomesSection variants (live) ───────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_outcomes_section_variants" (
      "_order"                  integer                                                             NOT NULL,
      "_parent_id"              varchar                                                             NOT NULL,
      "id"                      varchar                                                             PRIMARY KEY NOT NULL,
      "variant_key"             varchar,
      "background_color"        "enum_pages_blocks_outcomes_section_variants_background_color",
      "background_color_custom" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_outcomes_section_variants_locales" (
      "eyebrow"    varchar,
      "heading"    jsonb,
      "sub_text"   varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" varchar    NOT NULL
    );
  `)

  // ── StatBreak variants (versions) ─────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stat_break_variants" (
      "_order"                  integer                                                              NOT NULL,
      "_parent_id"              integer                                                              NOT NULL,
      "id"                      serial                                                               PRIMARY KEY NOT NULL,
      "_uuid"                   varchar,
      "variant_key"             varchar,
      "background_color"        "enum__pages_v_blocks_stat_break_variants_background_color",
      "background_color_custom" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stat_break_variants_locales" (
      "stat_number"      varchar,
      "stat_suffix"      varchar,
      "heading_line1"    varchar,
      "heading_line2"    varchar,
      "highlighted_word" varchar,
      "heading_after"    varchar,
      "id"               serial     PRIMARY KEY NOT NULL,
      "_locale"          "_locales" NOT NULL,
      "_parent_id"       integer    NOT NULL
    );
  `)

  // ── OutcomesSection variants (versions) ───────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_outcomes_section_variants" (
      "_order"                  integer                                                                   NOT NULL,
      "_parent_id"              integer                                                                   NOT NULL,
      "id"                      serial                                                                    PRIMARY KEY NOT NULL,
      "_uuid"                   varchar,
      "variant_key"             varchar,
      "background_color"        "enum__pages_v_blocks_outcomes_section_variants_background_color",
      "background_color_custom" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_outcomes_section_variants_locales" (
      "eyebrow"    varchar,
      "heading"    jsonb,
      "sub_text"   varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
    );
  `)

  // ── Foreign keys ──────────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages_blocks_stat_break_variants"
      ADD CONSTRAINT "pages_blocks_stat_break_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_break"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "pages_blocks_stat_break_variants_locales"
      ADD CONSTRAINT "pages_blocks_stat_break_variants_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stat_break_variants"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "pages_blocks_outcomes_section_variants"
      ADD CONSTRAINT "pages_blocks_outcomes_section_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_section"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "pages_blocks_outcomes_section_variants_locales"
      ADD CONSTRAINT "pages_blocks_outcomes_section_variants_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcomes_section_variants"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_stat_break_variants"
      ADD CONSTRAINT "_pages_v_blocks_stat_break_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_break"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_stat_break_variants_locales"
      ADD CONSTRAINT "_pages_v_blocks_stat_break_variants_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stat_break_variants"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_outcomes_section_variants"
      ADD CONSTRAINT "_pages_v_blocks_outcomes_section_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_section"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_outcomes_section_variants_locales"
      ADD CONSTRAINT "_pages_v_blocks_outcomes_section_variants_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcomes_section_variants"("id")
      ON DELETE CASCADE ON UPDATE no action;
  `)

  // ── Indexes ───────────────────────────────────────────────────────────────
  await db.execute(sql`
    CREATE INDEX "pages_blocks_stat_break_variants_order_idx"
      ON "pages_blocks_stat_break_variants" USING btree ("_order");
    CREATE INDEX "pages_blocks_stat_break_variants_parent_id_idx"
      ON "pages_blocks_stat_break_variants" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "pages_blocks_stat_break_variants_locales_locale_parent_id_unique"
      ON "pages_blocks_stat_break_variants_locales" USING btree ("_locale","_parent_id");

    CREATE INDEX "pages_blocks_outcomes_section_variants_order_idx"
      ON "pages_blocks_outcomes_section_variants" USING btree ("_order");
    CREATE INDEX "pages_blocks_outcomes_section_variants_parent_id_idx"
      ON "pages_blocks_outcomes_section_variants" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "pages_blocks_outcomes_section_variants_locales_locale_parent_id_unique"
      ON "pages_blocks_outcomes_section_variants_locales" USING btree ("_locale","_parent_id");

    CREATE INDEX "_pages_v_blocks_stat_break_variants_order_idx"
      ON "_pages_v_blocks_stat_break_variants" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_stat_break_variants_parent_id_idx"
      ON "_pages_v_blocks_stat_break_variants" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "_pages_v_blocks_stat_break_variants_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_stat_break_variants_locales" USING btree ("_locale","_parent_id");

    CREATE INDEX "_pages_v_blocks_outcomes_section_variants_order_idx"
      ON "_pages_v_blocks_outcomes_section_variants" USING btree ("_order");
    CREATE INDEX "_pages_v_blocks_outcomes_section_variants_parent_id_idx"
      ON "_pages_v_blocks_outcomes_section_variants" USING btree ("_parent_id");
    CREATE UNIQUE INDEX "_pages_v_blocks_outcomes_section_variants_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_outcomes_section_variants_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_outcomes_section_variants_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_outcomes_section_variants";
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_break_variants_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_stat_break_variants";
    DROP TABLE IF EXISTS "pages_blocks_outcomes_section_variants_locales";
    DROP TABLE IF EXISTS "pages_blocks_outcomes_section_variants";
    DROP TABLE IF EXISTS "pages_blocks_stat_break_variants_locales";
    DROP TABLE IF EXISTS "pages_blocks_stat_break_variants";

    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_outcomes_section_variants_background_color";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_stat_break_variants_background_color";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_outcomes_section_variants_background_color";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_stat_break_variants_background_color";
  `)
}
