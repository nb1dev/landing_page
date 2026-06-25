import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cycle_selector_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_cycle_selector_plan_family" AS ENUM('core', 'advanced');
  DROP TABLE "pages_blocks_cycle_selector_tiers" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_tiers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_tiers_locales" CASCADE;
  ALTER TABLE "pages_blocks_cycle_selector" ADD COLUMN "plan_family" "enum_pages_blocks_cycle_selector_plan_family" DEFAULT 'core';
  ALTER TABLE "_pages_v_blocks_cycle_selector" ADD COLUMN "plan_family" "enum__pages_v_blocks_cycle_selector_plan_family" DEFAULT 'core';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cycle_selector_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"checkout_href" varchar
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_tiers_locales" (
  	"months" varchar,
  	"monthly_rate" varchar,
  	"save_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"checkout_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_tiers_locales" (
  	"months" varchar,
  	"monthly_rate" varchar,
  	"save_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cycle_selector_tiers" ADD CONSTRAINT "pages_blocks_cycle_selector_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_tiers_locales" ADD CONSTRAINT "pages_blocks_cycle_selector_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_tiers" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_tiers_locales" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_tiers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector_tiers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cycle_selector_tiers_order_idx" ON "pages_blocks_cycle_selector_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_selector_tiers_parent_id_idx" ON "pages_blocks_cycle_selector_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycle_selector_tiers_locales_locale_parent_id_u" ON "pages_blocks_cycle_selector_tiers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_tiers_order_idx" ON "_pages_v_blocks_cycle_selector_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_selector_tiers_parent_id_idx" ON "_pages_v_blocks_cycle_selector_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycle_selector_tiers_locales_locale_parent_i" ON "_pages_v_blocks_cycle_selector_tiers_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_cycle_selector" DROP COLUMN "plan_family";
  ALTER TABLE "_pages_v_blocks_cycle_selector" DROP COLUMN "plan_family";
  DROP TYPE "public"."enum_pages_blocks_cycle_selector_plan_family";
  DROP TYPE "public"."enum__pages_v_blocks_cycle_selector_plan_family";`)
}
