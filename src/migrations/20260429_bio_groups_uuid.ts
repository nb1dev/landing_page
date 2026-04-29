import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_evolution_band_bio_groups"      ADD COLUMN IF NOT EXISTS "_uuid" varchar;
    ALTER TABLE "pages_blocks_evolution_band_bio_groups_rows" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
    ALTER TABLE "_bio_groups_v"                               ADD COLUMN IF NOT EXISTS "_uuid" varchar;
    ALTER TABLE "_bio_groups_v_rows"                          ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_evolution_band_bio_groups"      DROP COLUMN IF EXISTS "_uuid";
    ALTER TABLE "pages_blocks_evolution_band_bio_groups_rows" DROP COLUMN IF EXISTS "_uuid";
    ALTER TABLE "_bio_groups_v"                               DROP COLUMN IF EXISTS "_uuid";
    ALTER TABLE "_bio_groups_v_rows"                          DROP COLUMN IF EXISTS "_uuid";
  `)
}
