import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "headers" ADD COLUMN IF NOT EXISTS "dark_hero" boolean DEFAULT false;
    ALTER TABLE "headers" ADD COLUMN IF NOT EXISTS "cta_url" varchar;
    ALTER TABLE "headers_locales" ADD COLUMN IF NOT EXISTS "cta_label" varchar;

    ALTER TABLE "footers" ADD COLUMN IF NOT EXISTS "instagram_url" varchar;
    ALTER TABLE "footers_locales" ADD COLUMN IF NOT EXISTS "subnote" varchar;
    ALTER TABLE "footers_locales" ADD COLUMN IF NOT EXISTS "disclaimer" varchar;

    CREATE TABLE IF NOT EXISTS "footers_explore_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar
    );
    ALTER TABLE "footers_explore_links" ADD CONSTRAINT "footers_explore_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "footers_explore_links_order_idx" ON "footers_explore_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footers_explore_links_parent_id_idx" ON "footers_explore_links" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "footers_explore_links_locale_parent_unique" ON "footers_explore_links" USING btree ("_locale","_parent_id","_order");

    CREATE TABLE IF NOT EXISTS "footers_get_started_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_locale" "_locales" NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar
    );
    ALTER TABLE "footers_get_started_links" ADD CONSTRAINT "footers_get_started_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX IF NOT EXISTS "footers_get_started_links_order_idx" ON "footers_get_started_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footers_get_started_links_parent_id_idx" ON "footers_get_started_links" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "footers_get_started_links_locale_parent_unique" ON "footers_get_started_links" USING btree ("_locale","_parent_id","_order");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "footers_explore_links";
    DROP TABLE IF EXISTS "footers_get_started_links";
    ALTER TABLE "headers" DROP COLUMN IF EXISTS "dark_hero";
    ALTER TABLE "headers" DROP COLUMN IF EXISTS "cta_url";
    ALTER TABLE "headers_locales" DROP COLUMN IF EXISTS "cta_label";
    ALTER TABLE "footers" DROP COLUMN IF EXISTS "instagram_url";
    ALTER TABLE "footers_locales" DROP COLUMN IF EXISTS "subnote";
    ALTER TABLE "footers_locales" DROP COLUMN IF EXISTS "disclaimer";
  `)
}
