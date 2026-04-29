import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Move panel_thumbnails.image_id → panel_thumbnails_locales.image_id (localized)
  // Move plans.button_link          → plans_locales.button_link        (localized)
  // Same transformations for _pages_v_* versioning tables

  await db.execute(sql`
    -- 1. Drop old FK + index for image_id on the main thumbnails table
    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails"
      DROP CONSTRAINT IF EXISTS "pages_blocks_product_showcase_panel_thumbnails_image_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_product_showcase_panel_thumbnails_image_idx";

    -- 2. Create the new locales table for panel_thumbnails
    CREATE TABLE IF NOT EXISTS "pages_blocks_product_showcase_panel_thumbnails_locales" (
      "image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    -- 3. Migrate existing image_id to the locales table (one row per locale)
    INSERT INTO "pages_blocks_product_showcase_panel_thumbnails_locales"
      ("image_id", "_locale", "_parent_id")
    SELECT t."image_id", l.locale, t."id"
    FROM "pages_blocks_product_showcase_panel_thumbnails" t
    CROSS JOIN (VALUES ('en'::"_locales"), ('de'::"_locales"), ('fr'::"_locales")) AS l(locale)
    WHERE t."image_id" IS NOT NULL
    ON CONFLICT DO NOTHING;

    -- 4. Drop image_id from the main thumbnails table
    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails" DROP COLUMN IF EXISTS "image_id";

    -- 5. Add FKs and unique index for the new locales table
    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales"
      ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_image_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails_locales"
      ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_locales_par_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase_panel_thumbnails"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX IF NOT EXISTS "psc_panel_thumbs_locales_locale_parent_unique"
      ON "pages_blocks_product_showcase_panel_thumbnails_locales"
      USING btree ("_locale", "_parent_id");

    -- 6. Add button_link to plans_locales
    ALTER TABLE "pages_blocks_product_showcase_plans_locales"
      ADD COLUMN IF NOT EXISTS "button_link" varchar;

    -- 7. Migrate button_link from plans to each locale row in plans_locales
    UPDATE "pages_blocks_product_showcase_plans_locales" l
    SET "button_link" = p."button_link"
    FROM "pages_blocks_product_showcase_plans" p
    WHERE l."_parent_id" = p."id";

    -- 8. Drop button_link from the plans main table
    ALTER TABLE "pages_blocks_product_showcase_plans" DROP COLUMN IF EXISTS "button_link";

    -- ---- _pages_v_* versioning tables ----

    -- 9. Drop old FK + index for image_id on the versioning thumbnails table
    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails"
      DROP CONSTRAINT IF EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_image_idx";

    -- 10. Create the versioning locales table for panel_thumbnails
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_locales" (
      "image_id" integer,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    -- 11. Migrate existing image_id to the versioning locales table
    INSERT INTO "_pages_v_blocks_product_showcase_panel_thumbnails_locales"
      ("image_id", "_locale", "_parent_id")
    SELECT t."image_id", l.locale, t."id"
    FROM "_pages_v_blocks_product_showcase_panel_thumbnails" t
    CROSS JOIN (VALUES ('en'::"_locales"), ('de'::"_locales"), ('fr'::"_locales")) AS l(locale)
    WHERE t."image_id" IS NOT NULL
    ON CONFLICT DO NOTHING;

    -- 12. Drop image_id from the versioning thumbnails table
    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails" DROP COLUMN IF EXISTS "image_id";

    -- 13. Add FKs and unique index for the versioning locales table
    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales"
      ADD CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_image_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails_locales"
      ADD CONSTRAINT "_pages_v_blocks_psc_panel_thumbnails_locales_par_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase_panel_thumbnails"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_psc_panel_thumbs_locales_locale_parent_unique"
      ON "_pages_v_blocks_product_showcase_panel_thumbnails_locales"
      USING btree ("_locale", "_parent_id");

    -- 14. Add button_link to versioning plans_locales
    ALTER TABLE "_pages_v_blocks_product_showcase_plans_locales"
      ADD COLUMN IF NOT EXISTS "button_link" varchar;

    -- 15. Migrate button_link from versioning plans to each locale row
    UPDATE "_pages_v_blocks_product_showcase_plans_locales" l
    SET "button_link" = p."button_link"
    FROM "_pages_v_blocks_product_showcase_plans" p
    WHERE l."_parent_id" = p."id";

    -- 16. Drop button_link from the versioning plans table
    ALTER TABLE "_pages_v_blocks_product_showcase_plans" DROP COLUMN IF EXISTS "button_link";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Reverse: restore image_id to thumbnails main table, restore button_link to plans main table

  await db.execute(sql`
    -- 1. Add image_id back to the main thumbnails table
    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails"
      ADD COLUMN IF NOT EXISTS "image_id" integer;

    -- 2. Restore image_id from the en locale (arbitrary choice for rollback)
    UPDATE "pages_blocks_product_showcase_panel_thumbnails" t
    SET "image_id" = l."image_id"
    FROM "pages_blocks_product_showcase_panel_thumbnails_locales" l
    WHERE l."_parent_id" = t."id" AND l."_locale" = 'en';

    -- 3. Restore FK and index on image_id
    ALTER TABLE "pages_blocks_product_showcase_panel_thumbnails"
      ADD CONSTRAINT "pages_blocks_product_showcase_panel_thumbnails_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_blocks_product_showcase_panel_thumbnails_image_idx"
      ON "pages_blocks_product_showcase_panel_thumbnails" USING btree ("image_id");

    -- 4. Drop the locales table
    DROP TABLE IF EXISTS "pages_blocks_product_showcase_panel_thumbnails_locales";

    -- 5. Add button_link back to the plans main table
    ALTER TABLE "pages_blocks_product_showcase_plans"
      ADD COLUMN IF NOT EXISTS "button_link" varchar;

    -- 6. Restore button_link from the en locale
    UPDATE "pages_blocks_product_showcase_plans" p
    SET "button_link" = l."button_link"
    FROM "pages_blocks_product_showcase_plans_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';

    -- 7. Drop button_link from plans_locales
    ALTER TABLE "pages_blocks_product_showcase_plans_locales"
      DROP COLUMN IF EXISTS "button_link";

    -- ---- _pages_v_* versioning tables ----

    -- 8. Add image_id back to the versioning thumbnails table
    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails"
      ADD COLUMN IF NOT EXISTS "image_id" integer;

    -- 9. Restore image_id from the en locale
    UPDATE "_pages_v_blocks_product_showcase_panel_thumbnails" t
    SET "image_id" = l."image_id"
    FROM "_pages_v_blocks_product_showcase_panel_thumbnails_locales" l
    WHERE l."_parent_id" = t."id" AND l."_locale" = 'en';

    -- 10. Restore FK and index on versioning image_id
    ALTER TABLE "_pages_v_blocks_product_showcase_panel_thumbnails"
      ADD CONSTRAINT "_pages_v_blocks_product_showcase_panel_thumbnails_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_image_idx"
      ON "_pages_v_blocks_product_showcase_panel_thumbnails" USING btree ("image_id");

    -- 11. Drop the versioning locales table
    DROP TABLE IF EXISTS "_pages_v_blocks_product_showcase_panel_thumbnails_locales";

    -- 12. Add button_link back to the versioning plans table
    ALTER TABLE "_pages_v_blocks_product_showcase_plans"
      ADD COLUMN IF NOT EXISTS "button_link" varchar;

    -- 13. Restore button_link from the en locale
    UPDATE "_pages_v_blocks_product_showcase_plans" p
    SET "button_link" = l."button_link"
    FROM "_pages_v_blocks_product_showcase_plans_locales" l
    WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';

    -- 14. Drop button_link from versioning plans_locales
    ALTER TABLE "_pages_v_blocks_product_showcase_plans_locales"
      DROP COLUMN IF EXISTS "button_link";
  `)
}
