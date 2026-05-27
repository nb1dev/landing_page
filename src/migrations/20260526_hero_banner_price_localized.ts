import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Add price column to locales tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner_locales"
      ADD COLUMN IF NOT EXISTS "price" varchar;

    ALTER TABLE "_pages_v_blocks_hero_banner_locales"
      ADD COLUMN IF NOT EXISTS "price" varchar;
  `)

  // 2. Copy existing value into the 'en' locale row
  await db.execute(sql`
    UPDATE "pages_blocks_hero_banner_locales" l
    SET "price" = m."price"
    FROM "pages_blocks_hero_banner" m
    WHERE l."_parent_id" = m."id"
      AND l."_locale" = 'en';

    UPDATE "_pages_v_blocks_hero_banner_locales" l
    SET "price" = m."price"
    FROM "_pages_v_blocks_hero_banner" m
    WHERE l."_parent_id"::text = m."id"::text
      AND l."_locale" = 'en';
  `)

  // 3. Drop price from main (non-localized) tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner"
      DROP COLUMN IF EXISTS "price";

    ALTER TABLE "_pages_v_blocks_hero_banner"
      DROP COLUMN IF EXISTS "price";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // 1. Restore price column on main tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner"
      ADD COLUMN IF NOT EXISTS "price" varchar;

    ALTER TABLE "_pages_v_blocks_hero_banner"
      ADD COLUMN IF NOT EXISTS "price" varchar;
  `)

  // 2. Copy 'en' locale value back to main table
  await db.execute(sql`
    UPDATE "pages_blocks_hero_banner" m
    SET "price" = l."price"
    FROM "pages_blocks_hero_banner_locales" l
    WHERE l."_parent_id" = m."id"
      AND l."_locale" = 'en';

    UPDATE "_pages_v_blocks_hero_banner" m
    SET "price" = l."price"
    FROM "_pages_v_blocks_hero_banner_locales" l
    WHERE l."_parent_id"::text = m."id"::text
      AND l."_locale" = 'en';
  `)

  // 3. Drop price from locales tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_banner_locales"
      DROP COLUMN IF EXISTS "price";

    ALTER TABLE "_pages_v_blocks_hero_banner_locales"
      DROP COLUMN IF EXISTS "price";
  `)
}
