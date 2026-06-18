import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_plan_summary_card_bullets" CASCADE;
  DROP TABLE "pages_blocks_plan_summary_card_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans_bullets" CASCADE;
  DROP TABLE "pages_blocks_plan_selector_plans_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_plan_summary_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_summary_card_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plan_selector_plans_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_plan_summary_card_bullets" ADD CONSTRAINT "pages_blocks_plan_summary_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_summary_card_bullets_locales" ADD CONSTRAINT "pages_blocks_plan_summary_card_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_summary_card_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans_bullets" ADD CONSTRAINT "pages_blocks_plan_selector_plans_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plan_selector_plans_bullets_locales" ADD CONSTRAINT "pages_blocks_plan_selector_plans_bullets_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plan_selector_plans_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_bullets" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_summary_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_summary_card_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_plan_summary_card_bullets_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_summary_card_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_bullets" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plan_selector_plans_bullets_locales" ADD CONSTRAINT "_pages_v_blocks_plan_selector_plans_bullets_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plan_selector_plans_bullets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_plan_summary_card_bullets_order_idx" ON "pages_blocks_plan_summary_card_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_summary_card_bullets_parent_id_idx" ON "pages_blocks_plan_summary_card_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_summary_card_bullets_locales_locale_parent" ON "pages_blocks_plan_summary_card_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plan_selector_plans_bullets_order_idx" ON "pages_blocks_plan_selector_plans_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_plan_selector_plans_bullets_parent_id_idx" ON "pages_blocks_plan_selector_plans_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_plan_selector_plans_bullets_locales_locale_pare" ON "pages_blocks_plan_selector_plans_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_bullets_order_idx" ON "_pages_v_blocks_plan_summary_card_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_summary_card_bullets_parent_id_idx" ON "_pages_v_blocks_plan_summary_card_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_summary_card_bullets_locales_locale_par" ON "_pages_v_blocks_plan_summary_card_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_bullets_order_idx" ON "_pages_v_blocks_plan_selector_plans_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plan_selector_plans_bullets_parent_id_idx" ON "_pages_v_blocks_plan_selector_plans_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_plan_selector_plans_bullets_locales_locale_p" ON "_pages_v_blocks_plan_selector_plans_bullets_locales" USING btree ("_locale","_parent_id");`)
}
