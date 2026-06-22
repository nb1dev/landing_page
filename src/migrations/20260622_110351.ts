import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "footers_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footers_legal_links" ADD CONSTRAINT "footers_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footers_legal_links_order_idx" ON "footers_legal_links" USING btree ("_order");
  CREATE INDEX "footers_legal_links_parent_id_idx" ON "footers_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footers_legal_links_locale_idx" ON "footers_legal_links" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footers_legal_links" CASCADE;`)
}
