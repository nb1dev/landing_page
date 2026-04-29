import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Main block locales table
  await db.execute(sql`
    ALTER TABLE "pages_blocks_evolution_band_locales"
      DROP COLUMN IF EXISTS "heading_italic",
      DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "pages_blocks_evolution_band_locales"
      ADD COLUMN "heading" jsonb;
  `)

  // Main block version locales table
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_evolution_band_locales"
      DROP COLUMN IF EXISTS "heading_italic",
      DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_pages_v_blocks_evolution_band_locales"
      ADD COLUMN "heading" jsonb;
  `)

  // Variants locales table
  await db.execute(sql`
    ALTER TABLE "pages_blocks_evolution_band_variants_locales"
      DROP COLUMN IF EXISTS "heading_italic",
      DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "pages_blocks_evolution_band_variants_locales"
      ADD COLUMN "heading" jsonb;
  `)

  // Variants version locales table
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_evolution_band_variants_locales"
      DROP COLUMN IF EXISTS "heading_italic",
      DROP COLUMN IF EXISTS "heading";
    ALTER TABLE "_pages_v_blocks_evolution_band_variants_locales"
      ADD COLUMN "heading" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore heading as varchar, add heading_italic back
  const tables = [
    'pages_blocks_evolution_band_locales',
    '_pages_v_blocks_evolution_band_locales',
    'pages_blocks_evolution_band_variants_locales',
    '_pages_v_blocks_evolution_band_variants_locales',
  ]
  for (const table of tables) {
    await db.execute(sql.raw(`
      ALTER TABLE "${table}"
        DROP COLUMN IF EXISTS "heading";
      ALTER TABLE "${table}"
        ADD COLUMN "heading" varchar,
        ADD COLUMN "heading_italic" varchar;
    `))
  }
}
