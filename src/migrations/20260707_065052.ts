import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_lab_hero_trust_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_hero_trust_faces_locales" (
  	"affiliation" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_hero_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"trust_lead_in" varchar,
  	"trust_link_label" varchar,
  	"trust_link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_hero_trust_faces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_hero_trust_faces_locales" (
  	"affiliation" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_hero_locales" (
  	"heading" jsonb,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"trust_lead_in" varchar,
  	"trust_link_label" varchar,
  	"trust_link_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_hero_trust_faces" ADD CONSTRAINT "pages_blocks_lab_hero_trust_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_trust_faces" ADD CONSTRAINT "pages_blocks_lab_hero_trust_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_trust_faces_locales" ADD CONSTRAINT "pages_blocks_lab_hero_trust_faces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero_trust_faces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero" ADD CONSTRAINT "pages_blocks_lab_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_hero_locales" ADD CONSTRAINT "pages_blocks_lab_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_hero_trust_faces" ADD CONSTRAINT "_pages_v_blocks_lab_hero_trust_faces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_hero_trust_faces" ADD CONSTRAINT "_pages_v_blocks_lab_hero_trust_faces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_hero_trust_faces_locales" ADD CONSTRAINT "_pages_v_blocks_lab_hero_trust_faces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_hero_trust_faces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_hero" ADD CONSTRAINT "_pages_v_blocks_lab_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_hero_locales" ADD CONSTRAINT "_pages_v_blocks_lab_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_hero_trust_faces_order_idx" ON "pages_blocks_lab_hero_trust_faces" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_hero_trust_faces_parent_id_idx" ON "pages_blocks_lab_hero_trust_faces" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_trust_faces_image_idx" ON "pages_blocks_lab_hero_trust_faces" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_hero_trust_faces_locales_locale_parent_id_u" ON "pages_blocks_lab_hero_trust_faces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_order_idx" ON "pages_blocks_lab_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_hero_parent_id_idx" ON "pages_blocks_lab_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_hero_path_idx" ON "pages_blocks_lab_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_hero_locales_locale_parent_id_unique" ON "pages_blocks_lab_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_hero_trust_faces_order_idx" ON "_pages_v_blocks_lab_hero_trust_faces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_hero_trust_faces_parent_id_idx" ON "_pages_v_blocks_lab_hero_trust_faces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_hero_trust_faces_image_idx" ON "_pages_v_blocks_lab_hero_trust_faces" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_hero_trust_faces_locales_locale_parent_i" ON "_pages_v_blocks_lab_hero_trust_faces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_hero_order_idx" ON "_pages_v_blocks_lab_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_hero_parent_id_idx" ON "_pages_v_blocks_lab_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_hero_path_idx" ON "_pages_v_blocks_lab_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_hero_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_hero_trust_faces" CASCADE;
  DROP TABLE "pages_blocks_lab_hero_trust_faces_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_hero" CASCADE;
  DROP TABLE "pages_blocks_lab_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_hero_trust_faces" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_hero_trust_faces_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_hero_locales" CASCADE;`)
}
