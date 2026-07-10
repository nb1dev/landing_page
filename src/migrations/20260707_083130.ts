import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_protocol_layers_badge_variant" AS ENUM('plan', 'advanced');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_protocol_layers_badge_variant" AS ENUM('plan', 'advanced');
  CREATE TABLE "pages_blocks_lab_protocol_layers_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_protocol_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"has_more_chip" boolean DEFAULT false,
  	"badge_variant" "enum_pages_blocks_lab_protocol_layers_badge_variant" DEFAULT 'plan',
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_lab_protocol_layers_locales" (
  	"source_label" varchar,
  	"name" varchar,
  	"body" varchar,
  	"badge_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_lab_protocol" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"driver_gut_percent" numeric DEFAULT 65,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lab_protocol_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" varchar,
  	"driver_label" varchar,
  	"driver_gut_label" varchar,
  	"driver_gut_note" varchar,
  	"driver_rest_label" varchar,
  	"driver_intake_label" varchar,
  	"closing_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_protocol_layers_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_protocol_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"has_more_chip" boolean DEFAULT false,
  	"badge_variant" "enum__pages_v_blocks_lab_protocol_layers_badge_variant" DEFAULT 'plan',
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_protocol_layers_locales" (
  	"source_label" varchar,
  	"name" varchar,
  	"body" varchar,
  	"badge_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_lab_protocol" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"driver_gut_percent" numeric DEFAULT 65,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lab_protocol_locales" (
  	"eyebrow" varchar,
  	"heading" jsonb,
  	"lede" varchar,
  	"driver_label" varchar,
  	"driver_gut_label" varchar,
  	"driver_gut_note" varchar,
  	"driver_rest_label" varchar,
  	"driver_intake_label" varchar,
  	"closing_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_lab_protocol_layers_chips" ADD CONSTRAINT "pages_blocks_lab_protocol_layers_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_protocol_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_protocol_layers" ADD CONSTRAINT "pages_blocks_lab_protocol_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_protocol"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_protocol_layers_locales" ADD CONSTRAINT "pages_blocks_lab_protocol_layers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_protocol_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_protocol" ADD CONSTRAINT "pages_blocks_lab_protocol_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lab_protocol_locales" ADD CONSTRAINT "pages_blocks_lab_protocol_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_protocol"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_protocol_layers_chips" ADD CONSTRAINT "_pages_v_blocks_lab_protocol_layers_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_protocol_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_protocol_layers" ADD CONSTRAINT "_pages_v_blocks_lab_protocol_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_protocol"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_protocol_layers_locales" ADD CONSTRAINT "_pages_v_blocks_lab_protocol_layers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_protocol_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_protocol" ADD CONSTRAINT "_pages_v_blocks_lab_protocol_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_protocol_locales" ADD CONSTRAINT "_pages_v_blocks_lab_protocol_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_protocol"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_lab_protocol_layers_chips_order_idx" ON "pages_blocks_lab_protocol_layers_chips" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_protocol_layers_chips_parent_id_idx" ON "pages_blocks_lab_protocol_layers_chips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_protocol_layers_order_idx" ON "pages_blocks_lab_protocol_layers" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_protocol_layers_parent_id_idx" ON "pages_blocks_lab_protocol_layers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_lab_protocol_layers_locales_locale_parent_id_un" ON "pages_blocks_lab_protocol_layers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_lab_protocol_order_idx" ON "pages_blocks_lab_protocol" USING btree ("_order");
  CREATE INDEX "pages_blocks_lab_protocol_parent_id_idx" ON "pages_blocks_lab_protocol" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lab_protocol_path_idx" ON "pages_blocks_lab_protocol" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_lab_protocol_locales_locale_parent_id_unique" ON "pages_blocks_lab_protocol_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_protocol_layers_chips_order_idx" ON "_pages_v_blocks_lab_protocol_layers_chips" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_protocol_layers_chips_parent_id_idx" ON "_pages_v_blocks_lab_protocol_layers_chips" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_protocol_layers_order_idx" ON "_pages_v_blocks_lab_protocol_layers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_protocol_layers_parent_id_idx" ON "_pages_v_blocks_lab_protocol_layers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_protocol_layers_locales_locale_parent_id" ON "_pages_v_blocks_lab_protocol_layers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_protocol_order_idx" ON "_pages_v_blocks_lab_protocol" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lab_protocol_parent_id_idx" ON "_pages_v_blocks_lab_protocol" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lab_protocol_path_idx" ON "_pages_v_blocks_lab_protocol" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_lab_protocol_locales_locale_parent_id_unique" ON "_pages_v_blocks_lab_protocol_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_lab_protocol_layers_chips" CASCADE;
  DROP TABLE "pages_blocks_lab_protocol_layers" CASCADE;
  DROP TABLE "pages_blocks_lab_protocol_layers_locales" CASCADE;
  DROP TABLE "pages_blocks_lab_protocol" CASCADE;
  DROP TABLE "pages_blocks_lab_protocol_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_protocol_layers_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_protocol_layers" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_protocol_layers_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_protocol" CASCADE;
  DROP TABLE "_pages_v_blocks_lab_protocol_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_lab_protocol_layers_badge_variant";
  DROP TYPE "public"."enum__pages_v_blocks_lab_protocol_layers_badge_variant";`)
}
