import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enums ─────────────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_price_break_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_price_break_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_price_break_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_price_break_variants_background_color"
        AS ENUM('dark', 'darkNavy', 'teal', 'white', 'cream', 'custom');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── pages_blocks_price_break (live) ──────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break"
      ADD COLUMN IF NOT EXISTS "background_color"
        "enum_pages_blocks_price_break_background_color" DEFAULT 'dark',
      ADD COLUMN IF NOT EXISTS "background_color_custom" varchar;
  `)

  // ── pages_blocks_price_break_variants (live) ──────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "dark_mode",
      ADD COLUMN IF NOT EXISTS "background_color"
        "enum_pages_blocks_price_break_variants_background_color",
      ADD COLUMN IF NOT EXISTS "background_color_custom" varchar;
  `)

  // ── _pages_v_blocks_price_break (versions) ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break"
      ADD COLUMN IF NOT EXISTS "background_color"
        "enum__pages_v_blocks_price_break_background_color" DEFAULT 'dark',
      ADD COLUMN IF NOT EXISTS "background_color_custom" varchar;
  `)

  // ── _pages_v_blocks_price_break_variants (versions) ───────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "dark_mode",
      ADD COLUMN IF NOT EXISTS "background_color"
        "enum__pages_v_blocks_price_break_variants_background_color",
      ADD COLUMN IF NOT EXISTS "background_color_custom" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore dark_mode and drop background_color columns
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break"
      DROP COLUMN IF EXISTS "background_color",
      DROP COLUMN IF EXISTS "background_color_custom";

    ALTER TABLE "pages_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "background_color",
      DROP COLUMN IF EXISTS "background_color_custom",
      ADD COLUMN IF NOT EXISTS "dark_mode" boolean DEFAULT true;

    ALTER TABLE "_pages_v_blocks_price_break"
      DROP COLUMN IF EXISTS "background_color",
      DROP COLUMN IF EXISTS "background_color_custom";

    ALTER TABLE "_pages_v_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "background_color",
      DROP COLUMN IF EXISTS "background_color_custom",
      ADD COLUMN IF NOT EXISTS "dark_mode" boolean DEFAULT true;
  `)

  // Drop enums
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_price_break_variants_background_color";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_price_break_variants_background_color";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_price_break_background_color";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_price_break_background_color";
  `)
}
