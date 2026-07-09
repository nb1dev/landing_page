import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_lab_roadmap_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_roadmap_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_roadmap_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_roadmap_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_roadmap_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_roadmap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_roadmap_locales" (
  	"eyebrow" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_roadmap_items" ADD CONSTRAINT "pages_blocks_lab_roadmap_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_roadmap_items_locales" ADD CONSTRAINT "pages_blocks_lab_roadmap_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_roadmap" ADD CONSTRAINT "pages_blocks_lab_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_roadmap_locales" ADD CONSTRAINT "pages_blocks_lab_roadmap_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_roadmap_items" ADD CONSTRAINT "_pages_v_blocks_lab_roadmap_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_roadmap_items_locales" ADD CONSTRAINT "_pages_v_blocks_lab_roadmap_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_roadmap" ADD CONSTRAINT "_pages_v_blocks_lab_roadmap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_roadmap_locales" ADD CONSTRAINT "_pages_v_blocks_lab_roadmap_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_roadmap"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_roadmap_items_order_idx" ON "pages_blocks_lab_roadmap_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_roadmap_items_parent_id_idx" ON "pages_blocks_lab_roadmap_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_roadmap_items_locales_locale_parent_id_uniq" ON "pages_blocks_lab_roadmap_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_roadmap_order_idx" ON "pages_blocks_lab_roadmap" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_roadmap_parent_id_idx" ON "pages_blocks_lab_roadmap" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_roadmap_path_idx" ON "pages_blocks_lab_roadmap" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_roadmap_locales_locale_parent_id_unique" ON "pages_blocks_lab_roadmap_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_roadmap_items_order_idx" ON "_pages_v_blocks_lab_roadmap_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_roadmap_items_parent_id_idx" ON "_pages_v_blocks_lab_roadmap_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_roadmap_items_locales_locale_parent_id_u" ON "_pages_v_blocks_lab_roadmap_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_roadmap_order_idx" ON "_pages_v_blocks_lab_roadmap" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_roadmap_parent_id_idx" ON "_pages_v_blocks_lab_roadmap" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_roadmap_path_idx" ON "_pages_v_blocks_lab_roadmap" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_roadmap_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_roadmap_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_roadmap_items" CASCADE;
  DROP TABLE "pages_blocks_lab_roadmap_items_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_roadmap" CASCADE;
  DROP TABLE "pages_blocks_lab_roadmap_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_roadmap_items" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_roadmap_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_roadmap" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_roadmap_locales" CASCADE;`)
}
