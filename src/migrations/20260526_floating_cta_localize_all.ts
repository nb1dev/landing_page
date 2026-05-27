import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Create locales tables (no localized fields existed before)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_floating_c_t_a_locales" (
      "text"              varchar,
      "highlighted_text"  varchar,
      "button_text"       varchar,
      "button_href"       varchar,
      "hero_selector"     varchar,
      "reserve_selector"  varchar,
      "id"                serial     PRIMARY KEY NOT NULL,
      "_locale"           "_locales" NOT NULL,
      "_parent_id"        varchar    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_floating_c_t_a_locales" (
      "text"              varchar,
      "highlighted_text"  varchar,
      "button_text"       varchar,
      "button_href"       varchar,
      "hero_selector"     varchar,
      "reserve_selector"  varchar,
      "id"                serial     PRIMARY KEY NOT NULL,
      "_locale"           "_locales" NOT NULL,
      "_parent_id"        integer    NOT NULL
    );
  `)

  // 2. Foreign keys
  await db.execute(sql`
    ALTER TABLE "pages_blocks_floating_c_t_a_locales"
      ADD CONSTRAINT "pages_blocks_floating_c_t_a_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."pages_blocks_floating_c_t_a"("id")
      ON DELETE CASCADE ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_floating_c_t_a_locales"
      ADD CONSTRAINT "_pages_v_blocks_floating_c_t_a_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id")
      REFERENCES "public"."_pages_v_blocks_floating_c_t_a"("id")
      ON DELETE CASCADE ON UPDATE no action;
  `)

  // 3. Unique indexes (one row per locale per parent)
  await db.execute(sql`
    CREATE UNIQUE INDEX "pages_blocks_floating_c_t_a_locales_locale_parent_id_unique"
      ON "pages_blocks_floating_c_t_a_locales" USING btree ("_locale", "_parent_id");

    CREATE UNIQUE INDEX "_pages_v_blocks_floating_c_t_a_locales_locale_parent_id_unique"
      ON "_pages_v_blocks_floating_c_t_a_locales" USING btree ("_locale", "_parent_id");
  `)

  // 4. Seed 'en' locale rows from existing data in main tables
  await db.execute(sql`
    INSERT INTO "pages_blocks_floating_c_t_a_locales"
      ("text", "highlighted_text", "button_text", "button_href", "hero_selector", "reserve_selector", "_locale", "_parent_id")
    SELECT "text", "highlighted_text", "button_text", "button_href", "hero_selector", "reserve_selector", 'en', "id"
    FROM "pages_blocks_floating_c_t_a";

    INSERT INTO "_pages_v_blocks_floating_c_t_a_locales"
      ("text", "highlighted_text", "button_text", "button_href", "hero_selector", "reserve_selector", "_locale", "_parent_id")
    SELECT "text", "highlighted_text", "button_text", "button_href", "hero_selector", "reserve_selector", 'en', "id"
    FROM "_pages_v_blocks_floating_c_t_a";
  `)

  // 5. Drop the now-localized columns from main tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_floating_c_t_a"
      DROP COLUMN IF EXISTS "text",
      DROP COLUMN IF EXISTS "highlighted_text",
      DROP COLUMN IF EXISTS "button_text",
      DROP COLUMN IF EXISTS "button_href",
      DROP COLUMN IF EXISTS "hero_selector",
      DROP COLUMN IF EXISTS "reserve_selector";

    ALTER TABLE "_pages_v_blocks_floating_c_t_a"
      DROP COLUMN IF EXISTS "text",
      DROP COLUMN IF EXISTS "highlighted_text",
      DROP COLUMN IF EXISTS "button_text",
      DROP COLUMN IF EXISTS "button_href",
      DROP COLUMN IF EXISTS "hero_selector",
      DROP COLUMN IF EXISTS "reserve_selector";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // 1. Restore columns on main tables
  await db.execute(sql`
    ALTER TABLE "pages_blocks_floating_c_t_a"
      ADD COLUMN IF NOT EXISTS "text"             varchar,
      ADD COLUMN IF NOT EXISTS "highlighted_text" varchar,
      ADD COLUMN IF NOT EXISTS "button_text"      varchar,
      ADD COLUMN IF NOT EXISTS "button_href"      varchar,
      ADD COLUMN IF NOT EXISTS "hero_selector"    varchar,
      ADD COLUMN IF NOT EXISTS "reserve_selector" varchar;

    ALTER TABLE "_pages_v_blocks_floating_c_t_a"
      ADD COLUMN IF NOT EXISTS "text"             varchar,
      ADD COLUMN IF NOT EXISTS "highlighted_text" varchar,
      ADD COLUMN IF NOT EXISTS "button_text"      varchar,
      ADD COLUMN IF NOT EXISTS "button_href"      varchar,
      ADD COLUMN IF NOT EXISTS "hero_selector"    varchar,
      ADD COLUMN IF NOT EXISTS "reserve_selector" varchar;
  `)

  // 2. Copy 'en' locale values back to main tables
  await db.execute(sql`
    UPDATE "pages_blocks_floating_c_t_a" m
    SET
      "text"             = l."text",
      "highlighted_text" = l."highlighted_text",
      "button_text"      = l."button_text",
      "button_href"      = l."button_href",
      "hero_selector"    = l."hero_selector",
      "reserve_selector" = l."reserve_selector"
    FROM "pages_blocks_floating_c_t_a_locales" l
    WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';

    UPDATE "_pages_v_blocks_floating_c_t_a" m
    SET
      "text"             = l."text",
      "highlighted_text" = l."highlighted_text",
      "button_text"      = l."button_text",
      "button_href"      = l."button_href",
      "hero_selector"    = l."hero_selector",
      "reserve_selector" = l."reserve_selector"
    FROM "_pages_v_blocks_floating_c_t_a_locales" l
    WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
  `)

  // 3. Drop locales tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_floating_c_t_a_locales";
    DROP TABLE IF EXISTS "pages_blocks_floating_c_t_a_locales";
  `)
}
