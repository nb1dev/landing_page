import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_comparison_nodes_status" AS ENUM('Active', 'Low', 'Missing');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_comparison_nodes_status" AS ENUM('Active', 'Low', 'Missing');
  CREATE TABLE "pages_blocks_lab_comparison_legend" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"dashed" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_lab_comparison_legend_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_comparison_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"status" "enum_pages_blocks_lab_comparison_nodes_status"
  );
  
  CREATE TABLE "pages_blocks_lab_comparison_nodes_locales" (
  	"job" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_method" varchar,
  	"right_method" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_comparison_locales" (
  	"heading" jsonb,
  	"intro" varchar,
  	"hint_text" varchar,
  	"left_tag" varchar,
  	"left_name" varchar,
  	"right_tag" varchar,
  	"right_name" varchar,
  	"know_left_label" varchar,
  	"know_left_value" varchar,
  	"know_right_label" varchar,
  	"know_right_value" varchar,
  	"closing_lead_in" varchar,
  	"closing_emphasis" varchar,
  	"closing_tail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison_legend" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"color" varchar,
  	"dashed" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison_legend_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison_nodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"status" "enum__pages_v_blocks_lab_comparison_nodes_status",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison_nodes_locales" (
  	"job" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_method" varchar,
  	"right_method" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_comparison_locales" (
  	"heading" jsonb,
  	"intro" varchar,
  	"hint_text" varchar,
  	"left_tag" varchar,
  	"left_name" varchar,
  	"right_tag" varchar,
  	"right_name" varchar,
  	"know_left_label" varchar,
  	"know_left_value" varchar,
  	"know_right_label" varchar,
  	"know_right_value" varchar,
  	"closing_lead_in" varchar,
  	"closing_emphasis" varchar,
  	"closing_tail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_comparison_legend" ADD CONSTRAINT "pages_blocks_lab_comparison_legend_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_comparison_legend_locales" ADD CONSTRAINT "pages_blocks_lab_comparison_legend_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_comparison_legend"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_comparison_nodes" ADD CONSTRAINT "pages_blocks_lab_comparison_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_comparison_nodes_locales" ADD CONSTRAINT "pages_blocks_lab_comparison_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_comparison_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_comparison" ADD CONSTRAINT "pages_blocks_lab_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_comparison_locales" ADD CONSTRAINT "pages_blocks_lab_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison_legend" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_legend_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison_legend_locales" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_legend_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_comparison_legend"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison_nodes" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_nodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison_nodes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_nodes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_comparison_nodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_comparison_locales" ADD CONSTRAINT "_pages_v_blocks_lab_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_comparison"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_comparison_legend_order_idx" ON "pages_blocks_lab_comparison_legend" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_comparison_legend_parent_id_idx" ON "pages_blocks_lab_comparison_legend" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_comparison_legend_locales_locale_parent_id_" ON "pages_blocks_lab_comparison_legend_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_comparison_nodes_order_idx" ON "pages_blocks_lab_comparison_nodes" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_comparison_nodes_parent_id_idx" ON "pages_blocks_lab_comparison_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_comparison_nodes_locales_locale_parent_id_u" ON "pages_blocks_lab_comparison_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_comparison_order_idx" ON "pages_blocks_lab_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_comparison_parent_id_idx" ON "pages_blocks_lab_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_comparison_path_idx" ON "pages_blocks_lab_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_comparison_locales_locale_parent_id_unique" ON "pages_blocks_lab_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_comparison_legend_order_idx" ON "_pages_v_blocks_lab_comparison_legend" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_comparison_legend_parent_id_idx" ON "_pages_v_blocks_lab_comparison_legend" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_comparison_legend_locales_locale_parent_" ON "_pages_v_blocks_lab_comparison_legend_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_comparison_nodes_order_idx" ON "_pages_v_blocks_lab_comparison_nodes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_comparison_nodes_parent_id_idx" ON "_pages_v_blocks_lab_comparison_nodes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_comparison_nodes_locales_locale_parent_i" ON "_pages_v_blocks_lab_comparison_nodes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_comparison_order_idx" ON "_pages_v_blocks_lab_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_comparison_parent_id_idx" ON "_pages_v_blocks_lab_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_comparison_path_idx" ON "_pages_v_blocks_lab_comparison" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_comparison_locales_locale_parent_id_uniq" ON "_pages_v_blocks_lab_comparison_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_comparison_legend" CASCADE;
  DROP TABLE "pages_blocks_lab_comparison_legend_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_comparison_nodes" CASCADE;
  DROP TABLE "pages_blocks_lab_comparison_nodes_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_comparison" CASCADE;
  DROP TABLE "pages_blocks_lab_comparison_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison_legend" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison_legend_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison_nodes" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison_nodes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_comparison_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_comparison_nodes_status";
  DROP TYPE "public"."enum__pages_v_blocks_lab_comparison_nodes_status";`)
}
