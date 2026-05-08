import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Move `name` from locales table → main members table (name is NOT localized)

  // Live tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_science_board_members"
      ADD COLUMN IF NOT EXISTS "name" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_science_board_members_locales"
      DROP COLUMN IF EXISTS "name";
  `)

  // Version tables
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_science_board_members"
      ADD COLUMN IF NOT EXISTS "name" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_science_board_members_locales"
      DROP COLUMN IF EXISTS "name";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: move name back to locales

  await db.execute(sql`
    ALTER TABLE "pages_blocks_science_board_members_locales"
      ADD COLUMN IF NOT EXISTS "name" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_science_board_members"
      DROP COLUMN IF EXISTS "name";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_science_board_members_locales"
      ADD COLUMN IF NOT EXISTS "name" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_science_board_members"
      DROP COLUMN IF EXISTS "name";
  `)
}
