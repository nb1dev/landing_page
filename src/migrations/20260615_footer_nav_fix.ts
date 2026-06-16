import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "footers_explore_links";
    DROP TABLE IF EXISTS "footers_get_started_links";

    CREATE TABLE "footers_explore_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar
    );
    ALTER TABLE "footers_explore_links" ADD CONSTRAINT "footers_explore_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "footers_explore_links_order_idx" ON "footers_explore_links" USING btree ("_order");
    CREATE INDEX "footers_explore_links_parent_id_idx" ON "footers_explore_links" USING btree ("_parent_id");

    CREATE TABLE "footers_get_started_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "url" varchar
    );
    ALTER TABLE "footers_get_started_links" ADD CONSTRAINT "footers_get_started_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "footers_get_started_links_order_idx" ON "footers_get_started_links" USING btree ("_order");
    CREATE INDEX "footers_get_started_links_parent_id_idx" ON "footers_get_started_links" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "footers_explore_links";
    DROP TABLE IF EXISTS "footers_get_started_links";
  `)
}
