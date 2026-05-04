import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enums ─────────────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_theme" AS ENUM('light', 'dark');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_variants_theme" AS ENUM('light', 'dark');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── header: new columns ───────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "logo_id"          integer,
      ADD COLUMN IF NOT EXISTS "logo_dark_id"     integer,
      ADD COLUMN IF NOT EXISTS "theme"            "enum_header_theme" DEFAULT 'light',
      ADD COLUMN IF NOT EXISTS "login_url"        varchar,
      ADD COLUMN IF NOT EXISTS "login_text_color" varchar;
  `)

  // ── header_locales: localized fields (loginText) ──────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_locales" (
      "login_text" varchar,
      "id"         serial       PRIMARY KEY NOT NULL,
      "_locale"    "_locales"               NOT NULL,
      "_parent_id" integer                  NOT NULL
    );
  `)

  // ── header_variants: A/B variant rows ────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_variants" (
      "_order"            integer                          NOT NULL,
      "_parent_id"        integer                          NOT NULL,
      "id"                varchar          PRIMARY KEY     NOT NULL,
      "variant_key"       varchar,
      "theme"             "enum_header_variants_theme",
      "login_text_color"  varchar
    );
  `)

  // ── Foreign keys ──────────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "header"
      ADD CONSTRAINT "header_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id")
      ON DELETE SET NULL ON UPDATE no action;

    ALTER TABLE "header"
      ADD CONSTRAINT "header_logo_dark_id_media_id_fk"
      FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id")
      ON DELETE SET NULL ON UPDATE no action;

    ALTER TABLE "header_locales"
      ADD CONSTRAINT "header_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "header_variants"
      ADD CONSTRAINT "header_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id")
      ON DELETE CASCADE ON UPDATE no action;
  `)

  // ── Indexes ───────────────────────────────────────────────────────────────
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "header_logo_idx"
      ON "header" USING btree ("logo_id");
    CREATE INDEX IF NOT EXISTS "header_logo_dark_idx"
      ON "header" USING btree ("logo_dark_id");

    CREATE UNIQUE INDEX IF NOT EXISTS "header_locales_locale_parent_id_unique"
      ON "header_locales" USING btree ("_locale", "_parent_id");

    CREATE INDEX IF NOT EXISTS "header_variants_order_idx"
      ON "header_variants" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_variants_parent_id_idx"
      ON "header_variants" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "header_variants";
    DROP TABLE IF EXISTS "header_locales";

    ALTER TABLE "header"
      DROP CONSTRAINT IF EXISTS "header_logo_id_media_id_fk",
      DROP CONSTRAINT IF EXISTS "header_logo_dark_id_media_id_fk",
      DROP COLUMN IF EXISTS "logo_id",
      DROP COLUMN IF EXISTS "logo_dark_id",
      DROP COLUMN IF EXISTS "theme",
      DROP COLUMN IF EXISTS "login_url",
      DROP COLUMN IF EXISTS "login_text_color";

    DROP TYPE IF EXISTS "public"."enum_header_variants_theme";
    DROP TYPE IF EXISTS "public"."enum_header_theme";
  `)
}
