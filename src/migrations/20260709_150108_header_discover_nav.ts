import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. headers_discover_nav_items
// mirrors headers_nav_items exactly (same link() field shape, array-level
// localization via a _locale column on the row itself, no separate _locales
// sibling table) since both use the same `link({ appearances: false })` field.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_headers_discover_nav_items_link_type" AS ENUM('reference', 'custom');

  ALTER TABLE "headers" ADD COLUMN "discover_nav_enabled" boolean DEFAULT false;
  ALTER TABLE "headers_locales" ADD COLUMN "discover_nav_label" varchar;

  CREATE TABLE "headers_discover_nav_items" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_locale" "_locales" NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "link_type" "enum_headers_discover_nav_items_link_type" DEFAULT 'reference',
   "link_new_tab" boolean,
   "link_url" varchar,
   "link_label" varchar NOT NULL,
   "link_localized_label" varchar
  );

  ALTER TABLE "headers_discover_nav_items" ADD CONSTRAINT "headers_discover_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."headers"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "headers_discover_nav_items_order_idx" ON "headers_discover_nav_items" USING btree ("_order");
  CREATE INDEX "headers_discover_nav_items_parent_id_idx" ON "headers_discover_nav_items" USING btree ("_parent_id");
  CREATE INDEX "headers_discover_nav_items_locale_idx" ON "headers_discover_nav_items" USING btree ("_locale");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "headers_discover_nav_items";
  ALTER TABLE "headers" DROP COLUMN IF EXISTS "discover_nav_enabled";
  ALTER TABLE "headers_locales" DROP COLUMN IF EXISTS "discover_nav_label";
  DROP TYPE IF EXISTS "public"."enum_headers_discover_nav_items_link_type";
  `)
}
