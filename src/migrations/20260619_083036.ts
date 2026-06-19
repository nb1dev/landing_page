import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "footers_explore_links_locales" (
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footers_get_started_links_locales" (
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "headers_locales" ADD COLUMN "login_url" varchar;
  ALTER TABLE "footers_explore_links_locales" ADD CONSTRAINT "footers_explore_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_explore_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_get_started_links_locales" ADD CONSTRAINT "footers_get_started_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_get_started_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "footers_explore_links_locales_locale_parent_id_unique" ON "footers_explore_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footers_get_started_links_locales_locale_parent_id_unique" ON "footers_get_started_links_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "headers" DROP COLUMN "login_url";
  ALTER TABLE "footers_explore_links" DROP COLUMN "label";
  ALTER TABLE "footers_explore_links" DROP COLUMN "url";
  ALTER TABLE "footers_get_started_links" DROP COLUMN "label";
  ALTER TABLE "footers_get_started_links" DROP COLUMN "url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footers_explore_links_locales" CASCADE;
  DROP TABLE "footers_get_started_links_locales" CASCADE;
  ALTER TABLE "headers" ADD COLUMN "login_url" varchar;
  ALTER TABLE "footers_explore_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footers_explore_links" ADD COLUMN "url" varchar NOT NULL;
  ALTER TABLE "footers_get_started_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "footers_get_started_links" ADD COLUMN "url" varchar NOT NULL;
  ALTER TABLE "headers_locales" DROP COLUMN "login_url";`)
}
