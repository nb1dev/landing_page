import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cycles_pricing_grid_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum_pages_blocks_cycles_pricing_grid_plan_family2" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_cycles_pricing_grid_plan_family" AS ENUM('core', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_cycles_pricing_grid_plan_family2" AS ENUM('core', 'advanced');
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows2" CASCADE;
  DROP TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" CASCADE;
  DROP TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" CASCADE;
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD COLUMN "plan_family" "enum_pages_blocks_cycles_pricing_grid_plan_family";
  ALTER TABLE "pages_blocks_cycles_pricing_grid" ADD COLUMN "plan_family2" "enum_pages_blocks_cycles_pricing_grid_plan_family2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD COLUMN "plan_family" "enum__pages_v_blocks_cycles_pricing_grid_plan_family";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" ADD COLUMN "plan_family2" "enum__pages_v_blocks_cycles_pricing_grid_plan_family2";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cycles_pricing_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows2" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_best_value" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" (
  	"months" varchar,
  	"rate" varchar,
  	"best_value_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows2" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycles_pricing_grid_rows2_locales" ADD CONSTRAINT "pages_blocks_cycles_pricing_grid_rows2_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycles_pricing_grid_rows2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows2" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid_rows2_locales" ADD CONSTRAINT "_pages_v_blocks_cycles_pricing_grid_rows2_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycles_pricing_grid_rows2"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows_order_idx" ON "pages_blocks_cycles_pricing_grid_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows_parent_id_idx" ON "pages_blocks_cycles_pricing_grid_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_rows_locales_locale_parent_" ON "pages_blocks_cycles_pricing_grid_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows2_order_idx" ON "pages_blocks_cycles_pricing_grid_rows2" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycles_pricing_grid_rows2_parent_id_idx" ON "pages_blocks_cycles_pricing_grid_rows2" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycles_pricing_grid_rows2_locales_locale_parent" ON "pages_blocks_cycles_pricing_grid_rows2_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_order_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_rows_locales_locale_pare" ON "_pages_v_blocks_cycles_pricing_grid_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_order_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_parent_id_idx" ON "_pages_v_blocks_cycles_pricing_grid_rows2" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycles_pricing_grid_rows2_locales_locale_par" ON "_pages_v_blocks_cycles_pricing_grid_rows2_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_cycles_pricing_grid" DROP COLUMN "plan_family";
  ALTER TABLE "pages_blocks_cycles_pricing_grid" DROP COLUMN "plan_family2";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" DROP COLUMN "plan_family";
  ALTER TABLE "_pages_v_blocks_cycles_pricing_grid" DROP COLUMN "plan_family2";
  DROP TYPE "public"."enum_pages_blocks_cycles_pricing_grid_plan_family";
  DROP TYPE "public"."enum_pages_blocks_cycles_pricing_grid_plan_family2";
  DROP TYPE "public"."enum__pages_v_blocks_cycles_pricing_grid_plan_family";
  DROP TYPE "public"."enum__pages_v_blocks_cycles_pricing_grid_plan_family2";`)
}
