import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── Enum types ────────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_banner_background_type"
        AS ENUM('color', 'image');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_banner_variants_background_type"
        AS ENUM('color', 'image');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_background_type"
        AS ENUM('color', 'image');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_variants_background_type"
        AS ENUM('color', 'image');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── Main block table ──────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner"
      ADD COLUMN IF NOT EXISTS "background_type"
        "enum_pages_blocks_hero_banner_background_type" DEFAULT 'color',
      ADD COLUMN IF NOT EXISTS "background_image_id" integer;
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner"
      ADD CONSTRAINT "pages_blocks_hero_banner_background_image_id_media_id_fk"
      FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
  `)

  // ── Variants table ────────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner_variants"
      ADD COLUMN IF NOT EXISTS "background_type"
        "enum_pages_blocks_hero_banner_variants_background_type",
      ADD COLUMN IF NOT EXISTS "background_image_id" integer;
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner_variants"
      ADD CONSTRAINT "pages_blocks_hero_banner_variants_background_image_id_media_id_fk"
      FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
  `)

  // ── Version table ─────────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_banner"
      ADD COLUMN IF NOT EXISTS "background_type"
        "enum__pages_v_blocks_hero_banner_background_type" DEFAULT 'color',
      ADD COLUMN IF NOT EXISTS "background_image_id" integer;
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_banner"
      ADD CONSTRAINT "_pages_v_blocks_hero_banner_background_image_id_media_id_fk"
      FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
  `)

  // ── Variants version table ────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_banner_variants"
      ADD COLUMN IF NOT EXISTS "background_type"
        "enum__pages_v_blocks_hero_banner_variants_background_type",
      ADD COLUMN IF NOT EXISTS "background_image_id" integer;
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_banner_variants"
      ADD CONSTRAINT "_pages_v_blocks_hero_banner_variants_background_image_id_media_id_fk"
      FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_banner_variants"
      DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_banner_variants_background_image_id_media_id_fk",
      DROP COLUMN IF EXISTS "background_type",
      DROP COLUMN IF EXISTS "background_image_id";

    ALTER TABLE "_pages_v_blocks_hero_banner"
      DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_banner_background_image_id_media_id_fk",
      DROP COLUMN IF EXISTS "background_type",
      DROP COLUMN IF EXISTS "background_image_id";

    ALTER TABLE "pages_blocks_hero_banner_variants"
      DROP CONSTRAINT IF EXISTS "pages_blocks_hero_banner_variants_background_image_id_media_id_fk",
      DROP COLUMN IF EXISTS "background_type",
      DROP COLUMN IF EXISTS "background_image_id";

    ALTER TABLE "pages_blocks_hero_banner"
      DROP CONSTRAINT IF EXISTS "pages_blocks_hero_banner_background_image_id_media_id_fk",
      DROP COLUMN IF EXISTS "background_type",
      DROP COLUMN IF EXISTS "background_image_id";

    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_banner_variants_background_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_banner_background_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_banner_variants_background_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_banner_background_type";
  `)
}
