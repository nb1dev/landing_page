import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── pages_blocks_price_break ──────────────────────────────────────────────
  // Drop display_mode column
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break" DROP COLUMN IF EXISTS "display_mode";
  `)

  // ── pages_blocks_price_break_locales ─────────────────────────────────────
  // Change heading_line1 and heading_line2 from varchar to jsonb
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break_locales"
      ALTER COLUMN "heading_line1" TYPE jsonb USING
        CASE WHEN "heading_line1" IS NULL THEN NULL
             ELSE to_jsonb("heading_line1") END,
      ALTER COLUMN "heading_line2" TYPE jsonb USING
        CASE WHEN "heading_line2" IS NULL THEN NULL
             ELSE to_jsonb("heading_line2") END;
  `)

  // ── pages_blocks_price_break_variants ────────────────────────────────────
  // Drop display_mode, add dark_mode boolean
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "display_mode",
      ADD COLUMN IF NOT EXISTS "dark_mode" boolean DEFAULT true;
  `)

  // ── pages_blocks_price_break_variants_locales ─────────────────────────────
  // Change heading_line1 and heading_line2 from varchar to jsonb
  await db.execute(sql`
    ALTER TABLE "pages_blocks_price_break_variants_locales"
      ALTER COLUMN "heading_line1" TYPE jsonb USING
        CASE WHEN "heading_line1" IS NULL THEN NULL
             ELSE to_jsonb("heading_line1") END,
      ALTER COLUMN "heading_line2" TYPE jsonb USING
        CASE WHEN "heading_line2" IS NULL THEN NULL
             ELSE to_jsonb("heading_line2") END;
  `)

  // ── _pages_v_blocks_price_break ───────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break" DROP COLUMN IF EXISTS "display_mode";
  `)

  // ── _pages_v_blocks_price_break_locales ───────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break_locales"
      ALTER COLUMN "heading_line1" TYPE jsonb USING
        CASE WHEN "heading_line1" IS NULL THEN NULL
             ELSE to_jsonb("heading_line1") END,
      ALTER COLUMN "heading_line2" TYPE jsonb USING
        CASE WHEN "heading_line2" IS NULL THEN NULL
             ELSE to_jsonb("heading_line2") END;
  `)

  // ── _pages_v_blocks_price_break_variants ──────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break_variants"
      DROP COLUMN IF EXISTS "display_mode",
      ADD COLUMN IF NOT EXISTS "dark_mode" boolean DEFAULT true;
  `)

  // ── _pages_v_blocks_price_break_variants_locales ──────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_price_break_variants_locales"
      ALTER COLUMN "heading_line1" TYPE jsonb USING
        CASE WHEN "heading_line1" IS NULL THEN NULL
             ELSE to_jsonb("heading_line1") END,
      ALTER COLUMN "heading_line2" TYPE jsonb USING
        CASE WHEN "heading_line2" IS NULL THEN NULL
             ELSE to_jsonb("heading_line2") END;
  `)

  // ── Drop display_mode enums ───────────────────────────────────────────────
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_pages_blocks_price_break_display_mode";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_price_break_display_mode";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_pages_blocks_price_break_variants_display_mode";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_price_break_variants_display_mode";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore enums
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_price_break_display_mode" AS ENUM('dark', 'light');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_price_break_display_mode" AS ENUM('dark', 'light');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_price_break_variants_display_mode" AS ENUM('dark', 'light');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_price_break_variants_display_mode" AS ENUM('dark', 'light');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
}
