import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Table names verified directly against Payload's own computed schema
// (adapter.tableNameMap / adapter.tables) — not guessed. No nested arrays in
// this block (just groups, which flatten into the parent table), so no
// short dbName override was needed — the default prefix stays well under
// Postgres's 63-char identifier limit.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_protocol_kit" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" varchar PRIMARY KEY NOT NULL,
   "kit_image_id" integer,
   "video_file_id" integer,
   "video_poster_id" integer,
   "block_name" varchar
  );

  CREATE TABLE "pages_blocks_protocol_kit_locales" (
   "heading" jsonb,
   "reassure1" jsonb,
   "reassure2" varchar,
   "watch_pill_title" varchar,
   "watch_pill_meta" varchar,
   "watch_pill_aria_label" varchar,
   "video_modal_aria_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_pages_v_blocks_protocol_kit" (
   "_order" integer NOT NULL,
   "_parent_id" integer NOT NULL,
   "_path" text NOT NULL,
   "id" serial PRIMARY KEY NOT NULL,
   "kit_image_id" integer,
   "video_file_id" integer,
   "video_poster_id" integer,
   "_uuid" varchar,
   "block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_protocol_kit_locales" (
   "heading" jsonb,
   "reassure1" jsonb,
   "reassure2" varchar,
   "watch_pill_title" varchar,
   "watch_pill_meta" varchar,
   "watch_pill_aria_label" varchar,
   "video_modal_aria_label" varchar,
   "id" serial PRIMARY KEY NOT NULL,
   "_locale" "_locales" NOT NULL,
   "_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages_blocks_protocol_kit" ADD CONSTRAINT "pages_blocks_protocol_kit_kit_image_id_media_id_fk" FOREIGN KEY ("kit_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_protocol_kit" ADD CONSTRAINT "pages_blocks_protocol_kit_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_protocol_kit" ADD CONSTRAINT "pages_blocks_protocol_kit_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_protocol_kit" ADD CONSTRAINT "pages_blocks_protocol_kit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_protocol_kit_locales" ADD CONSTRAINT "pages_blocks_protocol_kit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_protocol_kit"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_pages_v_blocks_protocol_kit" ADD CONSTRAINT "_pages_v_blocks_protocol_kit_kit_image_id_media_id_fk" FOREIGN KEY ("kit_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_protocol_kit" ADD CONSTRAINT "_pages_v_blocks_protocol_kit_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_protocol_kit" ADD CONSTRAINT "_pages_v_blocks_protocol_kit_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_protocol_kit" ADD CONSTRAINT "_pages_v_blocks_protocol_kit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_protocol_kit_locales" ADD CONSTRAINT "_pages_v_blocks_protocol_kit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_protocol_kit"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_protocol_kit_order_idx" ON "pages_blocks_protocol_kit" USING btree ("_order");
  CREATE INDEX "pages_blocks_protocol_kit_parent_id_idx" ON "pages_blocks_protocol_kit" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_protocol_kit_path_idx" ON "pages_blocks_protocol_kit" USING btree ("_path");
  CREATE INDEX "pages_blocks_protocol_kit_kit_image_idx" ON "pages_blocks_protocol_kit" USING btree ("kit_image_id");
  CREATE INDEX "pages_blocks_protocol_kit_video_file_idx" ON "pages_blocks_protocol_kit" USING btree ("video_file_id");
  CREATE INDEX "pages_blocks_protocol_kit_video_poster_idx" ON "pages_blocks_protocol_kit" USING btree ("video_poster_id");
  CREATE UNIQUE INDEX "pages_blocks_protocol_kit_locales_locale_parent_id_unique" ON "pages_blocks_protocol_kit_locales" USING btree ("_locale","_parent_id");

  CREATE INDEX "_pages_v_blocks_protocol_kit_order_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_protocol_kit_parent_id_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_protocol_kit_path_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_protocol_kit_kit_image_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("kit_image_id");
  CREATE INDEX "_pages_v_blocks_protocol_kit_video_file_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("video_file_id");
  CREATE INDEX "_pages_v_blocks_protocol_kit_video_poster_idx" ON "_pages_v_blocks_protocol_kit" USING btree ("video_poster_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_protocol_kit_locales_locale_parent_id_unique" ON "_pages_v_blocks_protocol_kit_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_protocol_kit_locales";
  DROP TABLE IF EXISTS "pages_blocks_protocol_kit";

  DROP TABLE IF EXISTS "_pages_v_blocks_protocol_kit_locales";
  DROP TABLE IF EXISTS "_pages_v_blocks_protocol_kit";
  `)
}
