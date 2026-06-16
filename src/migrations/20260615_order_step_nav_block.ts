import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_blocks_order_step_nav_active_step" AS ENUM('1','2','3','done');
    CREATE TYPE "public"."enum__pages_v_blocks_order_step_nav_active_step" AS ENUM('1','2','3','done');

    CREATE TABLE "pages_blocks_order_step_nav" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "active_step" "enum_pages_blocks_order_step_nav_active_step" DEFAULT '1',
      "back_url" varchar,
      "block_name" varchar
    );

    CREATE TABLE "pages_blocks_order_step_nav_locales" (
      "step1_label" varchar DEFAULT 'Plan',
      "step2_label" varchar DEFAULT 'Duration',
      "step3_label" varchar DEFAULT 'Checkout',
      "back_label" varchar DEFAULT '← Back',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE "_pages_v_blocks_order_step_nav" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "active_step" "enum__pages_v_blocks_order_step_nav_active_step" DEFAULT '1',
      "back_url" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE "_pages_v_blocks_order_step_nav_locales" (
      "step1_label" varchar DEFAULT 'Plan',
      "step2_label" varchar DEFAULT 'Duration',
      "step3_label" varchar DEFAULT 'Checkout',
      "back_label" varchar DEFAULT '← Back',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "pages_blocks_order_step_nav"
      ADD CONSTRAINT "pages_blocks_order_step_nav_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "pages_blocks_order_step_nav_locales"
      ADD CONSTRAINT "pages_blocks_order_step_nav_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_step_nav"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_order_step_nav"
      ADD CONSTRAINT "_pages_v_blocks_order_step_nav_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "_pages_v_blocks_order_step_nav_locales"
      ADD CONSTRAINT "_pages_v_blocks_order_step_nav_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_step_nav"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    CREATE INDEX "pages_blocks_order_step_nav_order_idx" ON "pages_blocks_order_step_nav" ("_order");
    CREATE INDEX "pages_blocks_order_step_nav_parent_id_idx" ON "pages_blocks_order_step_nav" ("_parent_id");
    CREATE INDEX "pages_blocks_order_step_nav_path_idx" ON "pages_blocks_order_step_nav" ("_path");
    CREATE UNIQUE INDEX "pages_blocks_order_step_nav_locales_locale_parent_id_unique" ON "pages_blocks_order_step_nav_locales" ("_locale","_parent_id");

    CREATE INDEX "_pages_v_blocks_order_step_nav_order_idx" ON "_pages_v_blocks_order_step_nav" ("_order");
    CREATE INDEX "_pages_v_blocks_order_step_nav_parent_id_idx" ON "_pages_v_blocks_order_step_nav" ("_parent_id");
    CREATE INDEX "_pages_v_blocks_order_step_nav_path_idx" ON "_pages_v_blocks_order_step_nav" ("_path");
    CREATE UNIQUE INDEX "_pages_v_blocks_order_step_nav_locales_locale_parent_id_unique" ON "_pages_v_blocks_order_step_nav_locales" ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_order_step_nav" DROP CONSTRAINT IF EXISTS "pages_blocks_order_step_nav_parent_id_fk";
    ALTER TABLE "pages_blocks_order_step_nav_locales" DROP CONSTRAINT IF EXISTS "pages_blocks_order_step_nav_locales_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_order_step_nav" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_order_step_nav_parent_id_fk";
    ALTER TABLE "_pages_v_blocks_order_step_nav_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_order_step_nav_locales_parent_id_fk";

    DROP TABLE IF EXISTS "pages_blocks_order_step_nav_locales";
    DROP TABLE IF EXISTS "pages_blocks_order_step_nav";
    DROP TABLE IF EXISTS "_pages_v_blocks_order_step_nav_locales";
    DROP TABLE IF EXISTS "_pages_v_blocks_order_step_nav";

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_order_step_nav_active_step";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_order_step_nav_active_step";
  `)
}
