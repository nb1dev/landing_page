import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_lab_science_board_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_cso_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"initials" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_team_members_locales" (
  	"discipline" varchar,
  	"affiliation" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_validators_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_validators" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"initials" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_validators_locales" (
  	"affiliation" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_science_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cso_photo_id" integer,
  	"cso_initials" varchar,
  	"cso_name" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_science_board_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"team_group_label" varchar,
  	"team_group_sub" varchar,
  	"cso_role" varchar,
  	"cso_bio" varchar,
  	"cso_quote" varchar,
  	"check_group_label" varchar,
  	"check_statement" jsonb,
  	"check_statement_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_cso_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"initials" varchar,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_team_members_locales" (
  	"discipline" varchar,
  	"affiliation" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_validators_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_validators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"initials" varchar,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_validators_locales" (
  	"affiliation" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cso_photo_id" integer,
  	"cso_initials" varchar,
  	"cso_name" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_science_board_locales" (
  	"heading" jsonb,
  	"lede" varchar,
  	"team_group_label" varchar,
  	"team_group_sub" varchar,
  	"cso_role" varchar,
  	"cso_bio" varchar,
  	"cso_quote" varchar,
  	"check_group_label" varchar,
  	"check_statement" jsonb,
  	"check_statement_sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_science_board_stats" ADD CONSTRAINT "pages_blocks_lab_science_board_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_stats_locales" ADD CONSTRAINT "pages_blocks_lab_science_board_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_cso_tags" ADD CONSTRAINT "pages_blocks_lab_science_board_cso_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_team_members" ADD CONSTRAINT "pages_blocks_lab_science_board_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_team_members" ADD CONSTRAINT "pages_blocks_lab_science_board_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_team_members_locales" ADD CONSTRAINT "pages_blocks_lab_science_board_team_members_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_validators_tags" ADD CONSTRAINT "pages_blocks_lab_science_board_validators_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board_validators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_validators" ADD CONSTRAINT "pages_blocks_lab_science_board_validators_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_validators" ADD CONSTRAINT "pages_blocks_lab_science_board_validators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_validators_locales" ADD CONSTRAINT "pages_blocks_lab_science_board_validators_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board_validators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board" ADD CONSTRAINT "pages_blocks_lab_science_board_cso_photo_id_media_id_fk" FOREIGN KEY ("cso_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board" ADD CONSTRAINT "pages_blocks_lab_science_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_science_board_locales" ADD CONSTRAINT "pages_blocks_lab_science_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_stats" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_stats_locales" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_cso_tags" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_cso_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_team_members" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_team_members" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_team_members_locales" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_team_members_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_validators_tags" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_validators_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board_validators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_validators" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_validators_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_validators" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_validators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_validators_locales" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_validators_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board_validators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_cso_photo_id_media_id_fk" FOREIGN KEY ("cso_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_science_board_locales" ADD CONSTRAINT "_pages_v_blocks_lab_science_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_science_board"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_science_board_stats_order_idx" ON "pages_blocks_lab_science_board_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_stats_parent_id_idx" ON "pages_blocks_lab_science_board_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_science_board_stats_locales_locale_parent_i" ON "pages_blocks_lab_science_board_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_cso_tags_order_idx" ON "pages_blocks_lab_science_board_cso_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_cso_tags_parent_id_idx" ON "pages_blocks_lab_science_board_cso_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_team_members_order_idx" ON "pages_blocks_lab_science_board_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_team_members_parent_id_idx" ON "pages_blocks_lab_science_board_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_team_members_photo_idx" ON "pages_blocks_lab_science_board_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_science_board_team_members_locales_locale_p" ON "pages_blocks_lab_science_board_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_validators_tags_order_idx" ON "pages_blocks_lab_science_board_validators_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_validators_tags_parent_id_idx" ON "pages_blocks_lab_science_board_validators_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_validators_order_idx" ON "pages_blocks_lab_science_board_validators" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_validators_parent_id_idx" ON "pages_blocks_lab_science_board_validators" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_validators_photo_idx" ON "pages_blocks_lab_science_board_validators" USING btree ("photo_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_science_board_validators_locales_locale_par" ON "pages_blocks_lab_science_board_validators_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_order_idx" ON "pages_blocks_lab_science_board" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_science_board_parent_id_idx" ON "pages_blocks_lab_science_board" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_science_board_path_idx" ON "pages_blocks_lab_science_board" USING btree ("_path");
  CREATE INDEX "pages_blocks_lab_science_board_cso_cso_photo_idx" ON "pages_blocks_lab_science_board" USING btree ("cso_photo_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_science_board_locales_locale_parent_id_uniq" ON "pages_blocks_lab_science_board_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_stats_order_idx" ON "_pages_v_blocks_lab_science_board_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_stats_parent_id_idx" ON "_pages_v_blocks_lab_science_board_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_science_board_stats_locales_locale_paren" ON "_pages_v_blocks_lab_science_board_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_cso_tags_order_idx" ON "_pages_v_blocks_lab_science_board_cso_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_cso_tags_parent_id_idx" ON "_pages_v_blocks_lab_science_board_cso_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_team_members_order_idx" ON "_pages_v_blocks_lab_science_board_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_team_members_parent_id_idx" ON "_pages_v_blocks_lab_science_board_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_team_members_photo_idx" ON "_pages_v_blocks_lab_science_board_team_members" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_science_board_team_members_locales_local" ON "_pages_v_blocks_lab_science_board_team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_validators_tags_order_idx" ON "_pages_v_blocks_lab_science_board_validators_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_validators_tags_parent_id_idx" ON "_pages_v_blocks_lab_science_board_validators_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_validators_order_idx" ON "_pages_v_blocks_lab_science_board_validators" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_validators_parent_id_idx" ON "_pages_v_blocks_lab_science_board_validators" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_validators_photo_idx" ON "_pages_v_blocks_lab_science_board_validators" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_science_board_validators_locales_locale_" ON "_pages_v_blocks_lab_science_board_validators_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_order_idx" ON "_pages_v_blocks_lab_science_board" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_science_board_parent_id_idx" ON "_pages_v_blocks_lab_science_board" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_science_board_path_idx" ON "_pages_v_blocks_lab_science_board" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lab_science_board_cso_cso_photo_idx" ON "_pages_v_blocks_lab_science_board" USING btree ("cso_photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_science_board_locales_locale_parent_id_u" ON "_pages_v_blocks_lab_science_board_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_science_board_stats" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_cso_tags" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_team_members" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_team_members_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_validators_tags" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_validators" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_validators_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board" CASCADE;
  DROP TABLE "pages_blocks_lab_science_board_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_cso_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_team_members_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_validators_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_validators" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_validators_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_science_board_locales" CASCADE;`)
}
