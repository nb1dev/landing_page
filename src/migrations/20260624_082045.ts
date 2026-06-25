import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_switch_to_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_cta_variant" AS ENUM('advanced', 'core');
  CREATE TYPE "public"."enum_pages_blocks_plan_sticky_bar_default_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_switch_to_plan_key" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_cta_variant" AS ENUM('advanced', 'core');
  CREATE TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_default_plan_key" AS ENUM('core', 'advanced');
  CREATE TABLE "pages_blocks_plan_sticky_bar_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_key" "enum_pages_blocks_plan_sticky_bar_plans_plan_key",
  	"switch_to_plan_key" "enum_pages_blocks_plan_sticky_bar_plans_switch_to_plan_key",
  	"cta_href" varchar,
  	"cta_variant" "enum_pages_blocks_plan_sticky_bar_plans_cta_variant" DEFAULT 'advanced'
  );
  
  CREATE TABLE "pages_blocks_plan_sticky_bar_plans_locales" (
  	"selected_label" varchar,
  	"switch_link_text" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_sticky_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default_plan_key" "enum_pages_blocks_plan_sticky_bar_default_plan_key" DEFAULT 'advanced',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_sticky_bar_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"plan_key" "enum__pages_v_blocks_plan_sticky_bar_plans_plan_key",
  	"switch_to_plan_key" "enum__pages_v_blocks_plan_sticky_bar_plans_switch_to_plan_key",
  	"cta_href" varchar,
  	"cta_variant" "enum__pages_v_blocks_plan_sticky_bar_plans_cta_variant" DEFAULT 'advanced',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_sticky_bar_plans_locales" (
  	"selected_label" varchar,
  	"switch_link_text" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_sticky_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_plan_key" "enum__pages_v_blocks_plan_sticky_bar_default_plan_key" DEFAULT 'advanced',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_plan_sticky_bar_plans" ADD CONSTRAINT "pages_blocks_plan_sticky_bar_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_sticky_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_sticky_bar_plans_locales" ADD CONSTRAINT "pages_blocks_plan_sticky_bar_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_sticky_bar_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_sticky_bar" ADD CONSTRAINT "pages_blocks_plan_sticky_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_sticky_bar_plans" ADD CONSTRAINT "_pages_v_blocks_plan_sticky_bar_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_sticky_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_sticky_bar_plans_locales" ADD CONSTRAINT "_pages_v_blocks_plan_sticky_bar_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_sticky_bar_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_sticky_bar" ADD CONSTRAINT "_pages_v_blocks_plan_sticky_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plan_sticky_bar_plans_order_idx" ON "pages_blocks_plan_sticky_bar_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_sticky_bar_plans_parent_id_idx" ON "pages_blocks_plan_sticky_bar_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_sticky_bar_plans_locales_locale_parent_id_" ON "pages_blocks_plan_sticky_bar_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_sticky_bar_order_idx" ON "pages_blocks_plan_sticky_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_sticky_bar_parent_id_idx" ON "pages_blocks_plan_sticky_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plan_sticky_bar_path_idx" ON "pages_blocks_plan_sticky_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_plan_sticky_bar_plans_order_idx" ON "_pages_v_blocks_plan_sticky_bar_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_sticky_bar_plans_parent_id_idx" ON "_pages_v_blocks_plan_sticky_bar_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_sticky_bar_plans_locales_locale_parent_" ON "_pages_v_blocks_plan_sticky_bar_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_sticky_bar_order_idx" ON "_pages_v_blocks_plan_sticky_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_sticky_bar_parent_id_idx" ON "_pages_v_blocks_plan_sticky_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_sticky_bar_path_idx" ON "_pages_v_blocks_plan_sticky_bar" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_plan_sticky_bar_plans" CASCADE;
  DROP TABLE "pages_blocks_plan_sticky_bar_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_sticky_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_sticky_bar_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_sticky_bar_plans_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_sticky_bar" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_plan_key";
  DROP TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_switch_to_plan_key";
  DROP TYPE "public"."enum_pages_blocks_plan_sticky_bar_plans_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_plan_sticky_bar_default_plan_key";
  DROP TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_plan_key";
  DROP TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_switch_to_plan_key";
  DROP TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_plans_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_plan_sticky_bar_default_plan_key";`)
}
