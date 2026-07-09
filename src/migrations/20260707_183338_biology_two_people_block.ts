import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_biology_two_people" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "block_name" varchar
  );

  CREATE TABLE "pages_blocks_biology_two_people_locales" (
   "heading" jsonb,
   "body" varchar,
   "note" jsonb,
   "person_a_label" varchar,
   "person_a_meta" varchar,
   "person_b_label" varchar,
   "person_b_meta" varchar,
   "dna_caption" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_biology_two_people" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_biology_two_people_locales" (
   "heading" jsonb,
   "body" varchar,
   "note" jsonb,
   "person_a_label" varchar,
   "person_a_meta" varchar,
   "person_b_label" varchar,
   "person_b_meta" varchar,
   "dna_caption" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_biology_two_people" ADD CONSTRAINT "pages_blocks_biology_two_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_two_people_locales" ADD CONSTRAINT "pages_blocks_biology_two_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_two_people"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pages_v_blocks_biology_two_people" ADD CONSTRAINT "_pages_v_blocks_biology_two_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_two_people_locales" ADD CONSTRAINT "_pages_v_blocks_biology_two_people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_two_people"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_biology_two_people_order_idx" ON "pages_blocks_biology_two_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_biology_two_people_parent_id_idx" ON "pages_blocks_biology_two_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_biology_two_people_path_idx" ON "pages_blocks_biology_two_people" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_biology_two_people_locales_locale_parent_id_unique" ON "pages_blocks_biology_two_people_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pages_v_blocks_biology_two_people_order_idx" ON "_pages_v_blocks_biology_two_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_biology_two_people_parent_id_idx" ON "_pages_v_blocks_biology_two_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_two_people_path_idx" ON "_pages_v_blocks_biology_two_people" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_biology_two_people_locales_locale_parent_id_unique" ON "_pages_v_blocks_biology_two_people_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_biology_two_people_locales";
  DROP TABLE IF EXISTS "pages_blocks_biology_two_people";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_two_people_locales";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_two_people";
  `)
}
