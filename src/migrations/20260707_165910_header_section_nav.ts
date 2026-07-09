import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "headers" ADD COLUMN "section_nav_enabled" boolean DEFAULT false;

  CREATE TABLE "headers_section_nav_items" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" varchar NOT NULL,
   "section_id" varchar NOT NULL
  );

  CREATE TABLE "headers_section_nav_items_locales" (
   "label" varchar NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  ALTER TABLE "headers_section_nav_items" ADD CONSTRAINT "headers_section_nav_items_pkey" PRIMARY KEY ("id");

  ALTER TABLE "headers_section_nav_items" ADD CONSTRAINT "headers_section_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "headers_section_nav_items_locales" ADD CONSTRAINT "headers_section_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers_section_nav_items"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "headers_section_nav_items_order_idx" ON "headers_section_nav_items" USING btree ("_order");
  CREATE INDEX "headers_section_nav_items_parent_id_idx" ON "headers_section_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "headers_section_nav_items_locales_locale_parent_id_unique" ON "headers_section_nav_items_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "headers" DROP COLUMN IF EXISTS "section_nav_enabled";
  DROP TABLE IF EXISTS "headers_section_nav_items_locales";
  DROP TABLE IF EXISTS "headers_section_nav_items";
  `)
}
