import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_reads_cards_badge_variant" AS ENUM('plan', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_reads_cards_badge_variant" AS ENUM('plan', 'advanced');
  CREATE TABLE "pages_blocks_lab_reads_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"badge_variant" "enum_pages_blocks_lab_reads_cards_badge_variant" DEFAULT 'plan',
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_lab_reads_cards_locales" (
  	"name" varchar,
  	"tag" varchar,
  	"body" varchar,
  	"badge_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_reads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_reads_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"formula_node_label" varchar,
  	"closing_lead_in" varchar,
  	"closing_emphasis" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reads_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"badge_variant" "enum__pages_v_blocks_lab_reads_cards_badge_variant" DEFAULT 'plan',
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reads_cards_locales" (
  	"name" varchar,
  	"tag" varchar,
  	"body" varchar,
  	"badge_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_reads_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"formula_node_label" varchar,
  	"closing_lead_in" varchar,
  	"closing_emphasis" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_reads_cards" ADD CONSTRAINT "pages_blocks_lab_reads_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reads_cards_locales" ADD CONSTRAINT "pages_blocks_lab_reads_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reads_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reads" ADD CONSTRAINT "pages_blocks_lab_reads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_reads_locales" ADD CONSTRAINT "pages_blocks_lab_reads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reads_cards" ADD CONSTRAINT "_pages_v_blocks_lab_reads_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reads_cards_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reads_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reads_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reads" ADD CONSTRAINT "_pages_v_blocks_lab_reads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reads_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_reads_cards_order_idx" ON "pages_blocks_lab_reads_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reads_cards_parent_id_idx" ON "pages_blocks_lab_reads_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_reads_cards_locales_locale_parent_id_unique" ON "pages_blocks_lab_reads_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_reads_order_idx" ON "pages_blocks_lab_reads" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_reads_parent_id_idx" ON "pages_blocks_lab_reads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_reads_path_idx" ON "pages_blocks_lab_reads" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_reads_locales_locale_parent_id_unique" ON "pages_blocks_lab_reads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reads_cards_order_idx" ON "_pages_v_blocks_lab_reads_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reads_cards_parent_id_idx" ON "_pages_v_blocks_lab_reads_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_reads_cards_locales_locale_parent_id_uni" ON "_pages_v_blocks_lab_reads_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reads_order_idx" ON "_pages_v_blocks_lab_reads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_reads_parent_id_idx" ON "_pages_v_blocks_lab_reads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_reads_path_idx" ON "_pages_v_blocks_lab_reads" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_reads_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_reads_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_reads_cards" CASCADE;
  DROP TABLE "pages_blocks_lab_reads_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_reads" CASCADE;
  DROP TABLE "pages_blocks_lab_reads_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reads_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reads_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reads" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_reads_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_reads_cards_badge_variant";
  DROP TYPE "public"."enum__pages_v_blocks_lab_reads_cards_badge_variant";`)
}
