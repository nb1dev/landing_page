import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_biology_clearest_read" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "image_id" integer,
   "block_name" varchar
  );

  CREATE TABLE "pages_blocks_biology_clearest_read_locales" (
   "heading" jsonb,
   "subheading" varchar,
   "closing_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_biology_clearest_read_items" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "pages_blocks_biology_clearest_read_items_locales" (
   "title" jsonb,
   "body" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_biology_clearest_read" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "image_id" integer,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_biology_clearest_read_locales" (
   "heading" jsonb,
   "subheading" varchar,
   "closing_text" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_biology_clearest_read_items" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_biology_clearest_read_items_locales" (
   "title" jsonb,
   "body" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_biology_clearest_read" ADD CONSTRAINT "pages_blocks_biology_clearest_read_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_clearest_read" ADD CONSTRAINT "pages_blocks_biology_clearest_read_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_clearest_read_locales" ADD CONSTRAINT "pages_blocks_biology_clearest_read_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_clearest_read"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_clearest_read_items" ADD CONSTRAINT "pages_blocks_biology_clearest_read_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_clearest_read"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_clearest_read_items_locales" ADD CONSTRAINT "pages_blocks_biology_clearest_read_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_clearest_read_items"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pages_v_blocks_biology_clearest_read" ADD CONSTRAINT "_pages_v_blocks_biology_clearest_read_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_clearest_read" ADD CONSTRAINT "_pages_v_blocks_biology_clearest_read_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_clearest_read_locales" ADD CONSTRAINT "_pages_v_blocks_biology_clearest_read_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_clearest_read"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_clearest_read_items" ADD CONSTRAINT "_pages_v_blocks_biology_clearest_read_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_clearest_read"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_clearest_read_items_locales" ADD CONSTRAINT "_pages_v_blocks_biology_clearest_read_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_clearest_read_items"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_biology_clearest_read_order_idx" ON "pages_blocks_biology_clearest_read" USING btree ("_order");
  CREATE INDEX "pages_blocks_biology_clearest_read_parent_id_idx" ON "pages_blocks_biology_clearest_read" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_biology_clearest_read_path_idx" ON "pages_blocks_biology_clearest_read" USING btree ("_path");
  CREATE INDEX "pages_blocks_biology_clearest_read_image_idx" ON "pages_blocks_biology_clearest_read" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_biology_clearest_read_locales_locale_parent_id_unique" ON "pages_blocks_biology_clearest_read_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_biology_clearest_read_items_order_idx" ON "pages_blocks_biology_clearest_read_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_biology_clearest_read_items_parent_id_idx" ON "pages_blocks_biology_clearest_read_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_biology_clearest_read_items_locales_locale_parent_id_unique" ON "pages_blocks_biology_clearest_read_items_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pages_v_blocks_biology_clearest_read_order_idx" ON "_pages_v_blocks_biology_clearest_read" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_biology_clearest_read_parent_id_idx" ON "_pages_v_blocks_biology_clearest_read" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_clearest_read_path_idx" ON "_pages_v_blocks_biology_clearest_read" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_biology_clearest_read_image_idx" ON "_pages_v_blocks_biology_clearest_read" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_biology_clearest_read_locales_locale_parent_id_unique" ON "_pages_v_blocks_biology_clearest_read_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_clearest_read_items_order_idx" ON "_pages_v_blocks_biology_clearest_read_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_biology_clearest_read_items_parent_id_idx" ON "_pages_v_blocks_biology_clearest_read_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_biology_clearest_read_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_biology_clearest_read_items_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_biology_clearest_read_items_locales";
  DROP TABLE IF EXISTS "pages_blocks_biology_clearest_read_items";
  DROP TABLE IF EXISTS "pages_blocks_biology_clearest_read_locales";
  DROP TABLE IF EXISTS "pages_blocks_biology_clearest_read";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_clearest_read_items_locales";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_clearest_read_items";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_clearest_read_locales";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_clearest_read";
  `)
}
