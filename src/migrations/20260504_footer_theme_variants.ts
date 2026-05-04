import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enum ──────────────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_footer_theme" AS ENUM('light', 'dark');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_footer_variants_theme" AS ENUM('light', 'dark');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── footer: add theme + link_color columns ───────────────────────────────
  await db.execute(sql`
    ALTER TABLE "footer"
      ADD COLUMN IF NOT EXISTS "theme" "enum_footer_theme" DEFAULT 'light',
      ADD COLUMN IF NOT EXISTS "link_color" varchar;
  `)

  // ── footer_locales: add tagline + address ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "footer_locales"
      ADD COLUMN IF NOT EXISTS "tagline" varchar,
      ADD COLUMN IF NOT EXISTS "address" varchar;
  `)

  // ── footer_variants: new table for A/B variant → theme mapping ───────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_variants" (
      "_order"      integer                        NOT NULL,
      "_parent_id"  integer                        NOT NULL,
      "id"          varchar          PRIMARY KEY   NOT NULL,
      "variant_key" varchar,
      "theme"       "enum_footer_variants_theme",
      "link_color"  varchar
    );
  `)

  // ── Foreign key ───────────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "footer_variants"
      ADD CONSTRAINT "footer_variants_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id")
      ON DELETE CASCADE ON UPDATE no action;
  `)

  // ── Indexes ───────────────────────────────────────────────────────────────
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "footer_variants_order_idx"
      ON "footer_variants" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_variants_parent_id_idx"
      ON "footer_variants" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "footer_variants";

    ALTER TABLE "footer_locales"
      DROP COLUMN IF EXISTS "tagline",
      DROP COLUMN IF EXISTS "address";

    ALTER TABLE "footer"
      DROP COLUMN IF EXISTS "theme",
      DROP COLUMN IF EXISTS "link_color";

    DROP TYPE IF EXISTS "public"."enum_footer_variants_theme";
    DROP TYPE IF EXISTS "public"."enum_footer_theme";
  `)
}
