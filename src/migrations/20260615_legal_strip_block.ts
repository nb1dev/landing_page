import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages_blocks_legal_strip_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE "pages_blocks_legal_strip_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "pages_blocks_legal_strip" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE "pages_blocks_legal_strip_locales" (
      "copyright" varchar DEFAULT '© NB1 Health GmbH 2026',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "_pages_v_blocks_legal_strip_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "url" varchar NOT NULL
    );

    CREATE TABLE "_pages_v_blocks_legal_strip_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE "_pages_v_blocks_legal_strip" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE "_pages_v_blocks_legal_strip_locales" (
      "copyright" varchar DEFAULT '© NB1 Health GmbH 2026',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "pages_blocks_legal_strip_links"
      ADD CONSTRAINT "pages_blocks_legal_strip_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_strip"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "pages_blocks_legal_strip_links_locales"
      ADD CONSTRAINT "pages_blocks_legal_strip_links_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_strip_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "pages_blocks_legal_strip"
      ADD CONSTRAINT "pages_blocks_legal_strip_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "pages_blocks_legal_strip_locales"
      ADD CONSTRAINT "pages_blocks_legal_strip_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_strip"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_legal_strip_links"
      ADD CONSTRAINT "_pages_v_blocks_legal_strip_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_strip"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_legal_strip_links_locales"
      ADD CONSTRAINT "_pages_v_blocks_legal_strip_links_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_strip_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_legal_strip"
      ADD CONSTRAINT "_pages_v_blocks_legal_strip_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_legal_strip_locales"
      ADD CONSTRAINT "_pages_v_blocks_legal_strip_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_strip"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    CREATE INDEX "pages_blocks_legal_strip_links_order_idx" ON "pages_blocks_legal_strip_links" ("_order");
    CREATE INDEX "pages_blocks_legal_strip_links_parent_id_idx" ON "pages_blocks_legal_strip_links" ("_parent_id");
    CREATE UNIQUE INDEX "pages_blocks_legal_strip_links_locales_locale_parent_id_unique" ON "pages_blocks_legal_strip_links_locales" ("_locale","_parent_id");
    CREATE INDEX "pages_blocks_legal_strip_order_idx" ON "pages_blocks_legal_strip" ("_order");
    CREATE INDEX "pages_blocks_legal_strip_parent_id_idx" ON "pages_blocks_legal_strip" ("_parent_id");
    CREATE INDEX "pages_blocks_legal_strip_path_idx" ON "pages_blocks_legal_strip" ("_path");
    CREATE UNIQUE INDEX "pages_blocks_legal_strip_locales_locale_parent_id_unique" ON "pages_blocks_legal_strip_locales" ("_locale","_parent_id");

    CREATE INDEX "_pages_v_blocks_legal_strip_links_order_idx" ON "_pages_v_blocks_legal_strip_links" ("_order");
    CREATE INDEX "_pages_v_blocks_legal_strip_links_parent_id_idx" ON "_pages_v_blocks_legal_strip_links" ("_parent_id");
    CREATE UNIQUE INDEX "_pages_v_blocks_legal_strip_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_legal_strip_links_locales" ("_locale","_parent_id");
    CREATE INDEX "_pages_v_blocks_legal_strip_order_idx" ON "_pages_v_blocks_legal_strip" ("_order");
    CREATE INDEX "_pages_v_blocks_legal_strip_parent_id_idx" ON "_pages_v_blocks_legal_strip" ("_parent_id");
    CREATE INDEX "_pages_v_blocks_legal_strip_path_idx" ON "_pages_v_blocks_legal_strip" ("_path");
    CREATE UNIQUE INDEX "_pages_v_blocks_legal_strip_locales_locale_parent_id_unique" ON "_pages_v_blocks_legal_strip_locales" ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_legal_strip_links_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_legal_strip_links" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_legal_strip_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_legal_strip" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_legal_strip_links_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_legal_strip_links" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_legal_strip_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_legal_strip" CASCADE;
  `)
}
