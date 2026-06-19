import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cycle_selector_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cycle_selector_guarantee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_guarantee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cycle_selector_guarantee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "your_plan_label" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "best_value_label" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "prefer_flexible_label" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "choose_flexible_prefix" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "continue_prefix" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "cancel_anytime_label" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_locales" ADD COLUMN "billed_monthly_short_label" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "your_plan_label" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "best_value_label" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "prefer_flexible_label" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "choose_flexible_prefix" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "continue_prefix" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "cancel_anytime_label" varchar;
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" ADD COLUMN "billed_monthly_short_label" varchar;
  ALTER TABLE "pages_blocks_cycle_selector_guarantee_items" ADD CONSTRAINT "pages_blocks_cycle_selector_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cycle_selector_guarantee_items_locales" ADD CONSTRAINT "pages_blocks_cycle_selector_guarantee_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cycle_selector_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_guarantee_items" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_guarantee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cycle_selector_guarantee_items_locales" ADD CONSTRAINT "_pages_v_blocks_cycle_selector_guarantee_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cycle_selector_guarantee_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cycle_selector_guarantee_items_order_idx" ON "pages_blocks_cycle_selector_guarantee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cycle_selector_guarantee_items_parent_id_idx" ON "pages_blocks_cycle_selector_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cycle_selector_guarantee_items_locales_locale_p" ON "pages_blocks_cycle_selector_guarantee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cycle_selector_guarantee_items_order_idx" ON "_pages_v_blocks_cycle_selector_guarantee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cycle_selector_guarantee_items_parent_id_idx" ON "_pages_v_blocks_cycle_selector_guarantee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cycle_selector_guarantee_items_locales_local" ON "_pages_v_blocks_cycle_selector_guarantee_items_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cycle_selector_guarantee_items" CASCADE;
  DROP TABLE "pages_blocks_cycle_selector_guarantee_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_guarantee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cycle_selector_guarantee_items_locales" CASCADE;
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "your_plan_label";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "best_value_label";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "prefer_flexible_label";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "choose_flexible_prefix";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "continue_prefix";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "cancel_anytime_label";
  ALTER TABLE "pages_blocks_cycle_selector_locales" DROP COLUMN "billed_monthly_short_label";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "your_plan_label";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "best_value_label";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "prefer_flexible_label";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "choose_flexible_prefix";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "continue_prefix";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "cancel_anytime_label";
  ALTER TABLE "_pages_v_blocks_cycle_selector_locales" DROP COLUMN "billed_monthly_short_label";`)
}
