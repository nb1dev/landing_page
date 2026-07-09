import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_biology_hero" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "ratio_target" numeric DEFAULT 165,
   "block_name" varchar
  );

  CREATE TABLE "pages_blocks_biology_hero_locales" (
   "heading" jsonb,
   "subheading" varchar,
   "cta_label" varchar,
   "cta_url" varchar,
   "proof_text" jsonb,
   "card_label" varchar,
   "genome_value" varchar,
   "genome_label" varchar,
   "microbiome_value" varchar,
   "microbiome_label" varchar,
   "ratio_caption" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "pages_blocks_biology_hero_proof_avatars" (
   "_order" integer NOT NULL,
   "_parent_id" varchar NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar
  );

  CREATE TABLE "_pages_v_blocks_biology_hero" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "ratio_target" numeric DEFAULT 165,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_biology_hero_locales" (
   "heading" jsonb,
   "subheading" varchar,
   "cta_label" varchar,
   "cta_url" varchar,
   "proof_text" jsonb,
   "card_label" varchar,
   "genome_value" varchar,
   "genome_label" varchar,
   "microbiome_value" varchar,
   "microbiome_label" varchar,
   "ratio_caption" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_biology_hero_proof_avatars" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "image_id" integer,
   "name" varchar,
   "_uuid" varchar
  );

  ALTER TABLE "pages_blocks_biology_hero" ADD CONSTRAINT "pages_blocks_biology_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_hero_locales" ADD CONSTRAINT "pages_blocks_biology_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_hero_proof_avatars" ADD CONSTRAINT "pages_blocks_biology_hero_proof_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_biology_hero_proof_avatars" ADD CONSTRAINT "pages_blocks_biology_hero_proof_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_biology_hero"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pages_v_blocks_biology_hero" ADD CONSTRAINT "_pages_v_blocks_biology_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_hero_locales" ADD CONSTRAINT "_pages_v_blocks_biology_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_hero_proof_avatars" ADD CONSTRAINT "_pages_v_blocks_biology_hero_proof_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_biology_hero_proof_avatars" ADD CONSTRAINT "_pages_v_blocks_biology_hero_proof_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_biology_hero"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_biology_hero_order_idx" ON "pages_blocks_biology_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_biology_hero_parent_id_idx" ON "pages_blocks_biology_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_biology_hero_path_idx" ON "pages_blocks_biology_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_biology_hero_locales_locale_parent_id_unique" ON "pages_blocks_biology_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_biology_hero_proof_avatars_order_idx" ON "pages_blocks_biology_hero_proof_avatars" USING btree ("_order");
  CREATE INDEX "pages_blocks_biology_hero_proof_avatars_parent_id_idx" ON "pages_blocks_biology_hero_proof_avatars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_biology_hero_proof_avatars_image_idx" ON "pages_blocks_biology_hero_proof_avatars" USING btree ("image_id");

  CREATE INDEX "_pages_v_blocks_biology_hero_order_idx" ON "_pages_v_blocks_biology_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_biology_hero_parent_id_idx" ON "_pages_v_blocks_biology_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_hero_path_idx" ON "_pages_v_blocks_biology_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_biology_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_biology_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_hero_proof_avatars_order_idx" ON "_pages_v_blocks_biology_hero_proof_avatars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_biology_hero_proof_avatars_parent_id_idx" ON "_pages_v_blocks_biology_hero_proof_avatars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_biology_hero_proof_avatars_image_idx" ON "_pages_v_blocks_biology_hero_proof_avatars" USING btree ("image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_biology_hero_proof_avatars";
  DROP TABLE IF EXISTS "pages_blocks_biology_hero_locales";
  DROP TABLE IF EXISTS "pages_blocks_biology_hero";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_hero_proof_avatars";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_hero_locales";
  DROP TABLE IF EXISTS "_pages_v_blocks_biology_hero";
  `)
}
