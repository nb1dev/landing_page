import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_journey_ongoing_nodes_kind" AS ENUM('big', 'inf', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_journey_ongoing_nodes_kind" AS ENUM('big', 'inf', 'gold');
  CREATE TABLE "pages_blocks_lab_journey_your_part_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_journey_your_part_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"timestamp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_journey_lab_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_journey_lab_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_journey_ongoing_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_lab_journey_ongoing_nodes_kind"
  );
  
  CREATE TABLE "pages_blocks_lab_journey_ongoing_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"timestamp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"act0_viz_value" varchar DEFAULT '10',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_journey_locales" (
  	"heading" jsonb,
  	"sub" varchar,
  	"legend_your_part_label" varchar,
  	"legend_our_part_label" varchar,
  	"scroll_cue_text" varchar,
  	"act0_label" varchar,
  	"act0_heading" varchar,
  	"act0_body" varchar,
  	"act0_viz_unit" varchar DEFAULT 'MIN',
  	"act1_label" varchar,
  	"act1_heading" varchar,
  	"act1_body" varchar,
  	"act2_label" varchar,
  	"act2_heading" varchar,
  	"act2_body" varchar,
  	"foot_note" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_your_part_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_your_part_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"timestamp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_lab_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_lab_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_ongoing_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_lab_journey_ongoing_nodes_kind",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_ongoing_nodes_locales" (
  	"name" varchar,
  	"desc" varchar,
  	"timestamp" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"act0_viz_value" varchar DEFAULT '10',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_journey_locales" (
  	"heading" jsonb,
  	"sub" varchar,
  	"legend_your_part_label" varchar,
  	"legend_our_part_label" varchar,
  	"scroll_cue_text" varchar,
  	"act0_label" varchar,
  	"act0_heading" varchar,
  	"act0_body" varchar,
  	"act0_viz_unit" varchar DEFAULT 'MIN',
  	"act1_label" varchar,
  	"act1_heading" varchar,
  	"act1_body" varchar,
  	"act2_label" varchar,
  	"act2_heading" varchar,
  	"act2_body" varchar,
  	"foot_note" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_journey_your_part_nodes" ADD CONSTRAINT "pages_blocks_lab_journey_your_part_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_your_part_nodes_locales" ADD CONSTRAINT "pages_blocks_lab_journey_your_part_nodes_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey_your_part_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_lab_nodes" ADD CONSTRAINT "pages_blocks_lab_journey_lab_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_lab_nodes_locales" ADD CONSTRAINT "pages_blocks_lab_journey_lab_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey_lab_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_ongoing_nodes" ADD CONSTRAINT "pages_blocks_lab_journey_ongoing_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_ongoing_nodes_locales" ADD CONSTRAINT "pages_blocks_lab_journey_ongoing_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey_ongoing_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey" ADD CONSTRAINT "pages_blocks_lab_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_journey_locales" ADD CONSTRAINT "pages_blocks_lab_journey_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_your_part_nodes" ADD CONSTRAINT "_pages_v_blocks_lab_journey_your_part_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_your_part_nodes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_journey_your_part_nodes_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey_your_part_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_lab_nodes" ADD CONSTRAINT "_pages_v_blocks_lab_journey_lab_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_lab_nodes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_journey_lab_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey_lab_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_ongoing_nodes" ADD CONSTRAINT "_pages_v_blocks_lab_journey_ongoing_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_ongoing_nodes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_journey_ongoing_nodes_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey_ongoing_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey" ADD CONSTRAINT "_pages_v_blocks_lab_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_journey_locales" ADD CONSTRAINT "_pages_v_blocks_lab_journey_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_journey"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_journey_your_part_nodes_order_idx" ON "pages_blocks_lab_journey_your_part_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_journey_your_part_nodes_parent_id_idx" ON "pages_blocks_lab_journey_your_part_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_journey_your_part_nodes_locales_locale_pare" ON "pages_blocks_lab_journey_your_part_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_journey_lab_nodes_order_idx" ON "pages_blocks_lab_journey_lab_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_journey_lab_nodes_parent_id_idx" ON "pages_blocks_lab_journey_lab_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_journey_lab_nodes_locales_locale_parent_id_" ON "pages_blocks_lab_journey_lab_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_journey_ongoing_nodes_order_idx" ON "pages_blocks_lab_journey_ongoing_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_journey_ongoing_nodes_parent_id_idx" ON "pages_blocks_lab_journey_ongoing_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_journey_ongoing_nodes_locales_locale_parent" ON "pages_blocks_lab_journey_ongoing_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_journey_order_idx" ON "pages_blocks_lab_journey" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_journey_parent_id_idx" ON "pages_blocks_lab_journey" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_journey_path_idx" ON "pages_blocks_lab_journey" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_journey_locales_locale_parent_id_unique" ON "pages_blocks_lab_journey_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_journey_your_part_nodes_order_idx" ON "_pages_v_blocks_lab_journey_your_part_nodes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_journey_your_part_nodes_parent_id_idx" ON "_pages_v_blocks_lab_journey_your_part_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_journey_your_part_nodes_locales_locale_p" ON "_pages_v_blocks_lab_journey_your_part_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_journey_lab_nodes_order_idx" ON "_pages_v_blocks_lab_journey_lab_nodes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_journey_lab_nodes_parent_id_idx" ON "_pages_v_blocks_lab_journey_lab_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_journey_lab_nodes_locales_locale_parent_" ON "_pages_v_blocks_lab_journey_lab_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_journey_ongoing_nodes_order_idx" ON "_pages_v_blocks_lab_journey_ongoing_nodes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_journey_ongoing_nodes_parent_id_idx" ON "_pages_v_blocks_lab_journey_ongoing_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_journey_ongoing_nodes_locales_locale_par" ON "_pages_v_blocks_lab_journey_ongoing_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_journey_order_idx" ON "_pages_v_blocks_lab_journey" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_journey_parent_id_idx" ON "_pages_v_blocks_lab_journey" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_journey_path_idx" ON "_pages_v_blocks_lab_journey" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_journey_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_journey_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_journey_your_part_nodes" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_your_part_nodes_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_lab_nodes" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_lab_nodes_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_ongoing_nodes" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_ongoing_nodes_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_journey" CASCADE;
  DROP TABLE "pages_blocks_lab_journey_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_your_part_nodes" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_your_part_nodes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_lab_nodes" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_lab_nodes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_ongoing_nodes" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_ongoing_nodes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_journey_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_journey_ongoing_nodes_kind";
  DROP TYPE "public"."enum__pages_v_blocks_lab_journey_ongoing_nodes_kind";`)
}
