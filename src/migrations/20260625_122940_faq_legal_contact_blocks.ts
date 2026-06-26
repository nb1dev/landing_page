import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_page_methods_icon" AS ENUM('email', 'chat', 'location', 'clock');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_page_methods_icon" AS ENUM('email', 'chat', 'location', 'clock');
  CREATE TABLE "pages_blocks_faq_page_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_page_groups_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_page_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_page_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"callout_cta_href" varchar DEFAULT '/contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_page_locales" (
  	"title" varchar DEFAULT 'Frequently asked questions.',
  	"subheading" varchar,
  	"callout_heading" varchar DEFAULT 'Still have a question?',
  	"callout_body" varchar,
  	"callout_cta_label" varchar DEFAULT 'Contact us →',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_clauses" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_clauses_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_legal_doc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_summary" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_doc_locales" (
  	"title" varchar,
  	"subheading" varchar,
  	"summary_heading" varchar DEFAULT 'At a glance',
  	"summary_note" varchar,
  	"summary_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_page_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_page_methods_icon" DEFAULT 'email',
  	"link_href" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_page_methods_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_page_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_page_legal_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_page_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_page_topics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"recipient_email" varchar DEFAULT 'support@nb1.com',
  	"callout_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_page_locales" (
  	"title" varchar DEFAULT 'Get in touch.',
  	"subheading" varchar,
  	"methods_label" varchar DEFAULT 'Ways to reach us',
  	"form_heading" varchar DEFAULT 'Send us a message',
  	"form_note" varchar,
  	"submit_label" varchar DEFAULT 'Open email to send',
  	"form_hint" varchar,
  	"callout_heading" varchar,
  	"callout_body" varchar,
  	"callout_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page_groups_items_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page_groups_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"callout_cta_href" varchar DEFAULT '/contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_page_locales" (
  	"title" varchar DEFAULT 'Frequently asked questions.',
  	"subheading" varchar,
  	"callout_heading" varchar DEFAULT 'Still have a question?',
  	"callout_body" varchar,
  	"callout_cta_label" varchar DEFAULT 'Contact us →',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_clauses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_clauses_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_summary" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_doc_locales" (
  	"title" varchar,
  	"subheading" varchar,
  	"summary_heading" varchar DEFAULT 'At a glance',
  	"summary_note" varchar,
  	"summary_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_page_methods_icon" DEFAULT 'email',
  	"link_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_methods_locales" (
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_legal_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_topics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"recipient_email" varchar DEFAULT 'support@nb1.com',
  	"callout_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_page_locales" (
  	"title" varchar DEFAULT 'Get in touch.',
  	"subheading" varchar,
  	"methods_label" varchar DEFAULT 'Ways to reach us',
  	"form_heading" varchar DEFAULT 'Send us a message',
  	"form_note" varchar,
  	"submit_label" varchar DEFAULT 'Open email to send',
  	"form_hint" varchar,
  	"callout_heading" varchar,
  	"callout_body" varchar,
  	"callout_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD COLUMN IF NOT EXISTS "subtitles_id" integer;
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD COLUMN IF NOT EXISTS "subtitles_id" integer;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD COLUMN IF NOT EXISTS "subtitles_id" integer;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD COLUMN IF NOT EXISTS "subtitles_id" integer;
  ALTER TABLE "pages_blocks_faq_page_groups_items" ADD CONSTRAINT "pages_blocks_faq_page_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_page_groups_items_locales" ADD CONSTRAINT "pages_blocks_faq_page_groups_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_page_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_page_groups" ADD CONSTRAINT "pages_blocks_faq_page_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_page_groups_locales" ADD CONSTRAINT "pages_blocks_faq_page_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_page" ADD CONSTRAINT "pages_blocks_faq_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_page_locales" ADD CONSTRAINT "pages_blocks_faq_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_clauses" ADD CONSTRAINT "pages_blocks_legal_doc_sections_clauses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_clauses_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_clauses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections_clauses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections" ADD CONSTRAINT "pages_blocks_legal_doc_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_sections_locales" ADD CONSTRAINT "pages_blocks_legal_doc_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc" ADD CONSTRAINT "pages_blocks_legal_doc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_doc_locales" ADD CONSTRAINT "pages_blocks_legal_doc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_methods" ADD CONSTRAINT "pages_blocks_contact_page_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_methods_locales" ADD CONSTRAINT "pages_blocks_contact_page_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_legal_links" ADD CONSTRAINT "pages_blocks_contact_page_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_legal_links_locales" ADD CONSTRAINT "pages_blocks_contact_page_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_topics" ADD CONSTRAINT "pages_blocks_contact_page_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_topics_locales" ADD CONSTRAINT "pages_blocks_contact_page_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page" ADD CONSTRAINT "pages_blocks_contact_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD CONSTRAINT "pages_blocks_contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_items" ADD CONSTRAINT "_pages_v_blocks_faq_page_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_page_groups_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_page_groups_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page_groups" ADD CONSTRAINT "_pages_v_blocks_faq_page_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_locales" ADD CONSTRAINT "_pages_v_blocks_faq_page_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page" ADD CONSTRAINT "_pages_v_blocks_faq_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ADD CONSTRAINT "_pages_v_blocks_faq_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_clauses" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_clauses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_clauses_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_clauses_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections_clauses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc" ADD CONSTRAINT "_pages_v_blocks_legal_doc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" ADD CONSTRAINT "_pages_v_blocks_legal_doc_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal_doc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_methods" ADD CONSTRAINT "_pages_v_blocks_contact_page_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_methods_locales" ADD CONSTRAINT "_pages_v_blocks_contact_page_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_legal_links" ADD CONSTRAINT "_pages_v_blocks_contact_page_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_legal_links_locales" ADD CONSTRAINT "_pages_v_blocks_contact_page_legal_links_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_topics" ADD CONSTRAINT "_pages_v_blocks_contact_page_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_topics_locales" ADD CONSTRAINT "_pages_v_blocks_contact_page_topics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page" ADD CONSTRAINT "_pages_v_blocks_contact_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD CONSTRAINT "_pages_v_blocks_contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_items_order_idx" ON "pages_blocks_faq_page_groups_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_items_parent_id_idx" ON "pages_blocks_faq_page_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_items_locales_locale_parent_id_" ON "pages_blocks_faq_page_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_order_idx" ON "pages_blocks_faq_page_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_parent_id_idx" ON "pages_blocks_faq_page_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_page_groups_locales_locale_parent_id_unique" ON "pages_blocks_faq_page_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_order_idx" ON "pages_blocks_faq_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_parent_id_idx" ON "pages_blocks_faq_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_faq_page_path_idx" ON "pages_blocks_faq_page" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_faq_page_locales_locale_parent_id_unique" ON "pages_blocks_faq_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_clauses_order_idx" ON "pages_blocks_legal_doc_sections_clauses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_clauses_parent_id_idx" ON "pages_blocks_legal_doc_sections_clauses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_clauses_locales_locale_paren" ON "pages_blocks_legal_doc_sections_clauses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_order_idx" ON "pages_blocks_legal_doc_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_parent_id_idx" ON "pages_blocks_legal_doc_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_legal_doc_sections_locales_locale_parent_id_uni" ON "pages_blocks_legal_doc_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_order_idx" ON "pages_blocks_legal_doc" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_parent_id_idx" ON "pages_blocks_legal_doc" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_legal_doc_path_idx" ON "pages_blocks_legal_doc" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_legal_doc_locales_locale_parent_id_unique" ON "pages_blocks_legal_doc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_methods_order_idx" ON "pages_blocks_contact_page_methods" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_methods_parent_id_idx" ON "pages_blocks_contact_page_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_contact_page_methods_locales_locale_parent_id_u" ON "pages_blocks_contact_page_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_legal_links_order_idx" ON "pages_blocks_contact_page_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_legal_links_parent_id_idx" ON "pages_blocks_contact_page_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_contact_page_legal_links_locales_locale_parent_" ON "pages_blocks_contact_page_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_topics_order_idx" ON "pages_blocks_contact_page_topics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_topics_parent_id_idx" ON "pages_blocks_contact_page_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_contact_page_topics_locales_locale_parent_id_un" ON "pages_blocks_contact_page_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_order_idx" ON "pages_blocks_contact_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_parent_id_idx" ON "pages_blocks_contact_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_page_path_idx" ON "pages_blocks_contact_page" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_contact_page_locales_locale_parent_id_unique" ON "pages_blocks_contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_items_order_idx" ON "_pages_v_blocks_faq_page_groups_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_items_parent_id_idx" ON "_pages_v_blocks_faq_page_groups_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_items_locales_locale_parent_" ON "_pages_v_blocks_faq_page_groups_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_order_idx" ON "_pages_v_blocks_faq_page_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_parent_id_idx" ON "_pages_v_blocks_faq_page_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_groups_locales_locale_parent_id_uni" ON "_pages_v_blocks_faq_page_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_order_idx" ON "_pages_v_blocks_faq_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_parent_id_idx" ON "_pages_v_blocks_faq_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_path_idx" ON "_pages_v_blocks_faq_page" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_faq_page_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_clauses_order_idx" ON "_pages_v_blocks_legal_doc_sections_clauses" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_clauses_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections_clauses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_clauses_locales_locale_pa" ON "_pages_v_blocks_legal_doc_sections_clauses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_order_idx" ON "_pages_v_blocks_legal_doc_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_parent_id_idx" ON "_pages_v_blocks_legal_doc_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_sections_locales_locale_parent_id_" ON "_pages_v_blocks_legal_doc_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_order_idx" ON "_pages_v_blocks_legal_doc" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_parent_id_idx" ON "_pages_v_blocks_legal_doc" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_path_idx" ON "_pages_v_blocks_legal_doc" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_legal_doc_locales_locale_parent_id_unique" ON "_pages_v_blocks_legal_doc_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_methods_order_idx" ON "_pages_v_blocks_contact_page_methods" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_methods_parent_id_idx" ON "_pages_v_blocks_contact_page_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_methods_locales_locale_parent_i" ON "_pages_v_blocks_contact_page_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_legal_links_order_idx" ON "_pages_v_blocks_contact_page_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_legal_links_parent_id_idx" ON "_pages_v_blocks_contact_page_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_legal_links_locales_locale_pare" ON "_pages_v_blocks_contact_page_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_topics_order_idx" ON "_pages_v_blocks_contact_page_topics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_topics_parent_id_idx" ON "_pages_v_blocks_contact_page_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_topics_locales_locale_parent_id" ON "_pages_v_blocks_contact_page_topics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_order_idx" ON "_pages_v_blocks_contact_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_parent_id_idx" ON "_pages_v_blocks_contact_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_path_idx" ON "_pages_v_blocks_contact_page" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_contact_page_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP CONSTRAINT IF EXISTS "pages_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_athletes" DROP CONSTRAINT IF EXISTS "pages_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "pages_blocks_yp_athletes_cards_subtitles_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("subtitles_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_athletes_section_athletes_subtitles_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("subtitles_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_yp_athletes_cards_subtitles_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("subtitles_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_athletes_section_athletes_subtitles_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("subtitles_id");
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_url";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_page_groups_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_page_groups_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_page_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_page_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc_sections_clauses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc_sections_clauses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_legal_doc_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_methods_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_topics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_clauses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_clauses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_methods_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_topics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_faq_page_groups_items" CASCADE;
  DROP TABLE "pages_blocks_faq_page_groups_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_page_groups" CASCADE;
  DROP TABLE "pages_blocks_faq_page_groups_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_page" CASCADE;
  DROP TABLE "pages_blocks_faq_page_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_clauses" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_clauses_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_sections_locales" CASCADE;
  DROP TABLE "pages_blocks_legal_doc" CASCADE;
  DROP TABLE "pages_blocks_legal_doc_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_page_methods" CASCADE;
  DROP TABLE "pages_blocks_contact_page_methods_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_page_legal_links" CASCADE;
  DROP TABLE "pages_blocks_contact_page_legal_links_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_page_topics" CASCADE;
  DROP TABLE "pages_blocks_contact_page_topics_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_page" CASCADE;
  DROP TABLE "pages_blocks_contact_page_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page_groups_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page_groups_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page_groups_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_page_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_clauses" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_clauses_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_sections_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_doc_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_methods_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_legal_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_legal_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_topics" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_topics_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_page_locales" CASCADE;
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP CONSTRAINT "pages_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_athletes_section_athletes" DROP CONSTRAINT "pages_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP CONSTRAINT "_pages_v_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" DROP CONSTRAINT "_pages_v_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  
  DROP INDEX "pages_blocks_yp_athletes_cards_subtitles_idx";
  DROP INDEX "pages_blocks_athletes_section_athletes_subtitles_idx";
  DROP INDEX "_pages_v_blocks_yp_athletes_cards_subtitles_idx";
  DROP INDEX "_pages_v_blocks_athletes_section_athletes_subtitles_idx";
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD COLUMN "subtitles_url" varchar;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD COLUMN "subtitles_url" varchar;
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP COLUMN "subtitles_id";
  ALTER TABLE "pages_blocks_athletes_section_athletes" DROP COLUMN "subtitles_id";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP COLUMN "subtitles_id";
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" DROP COLUMN "subtitles_id";
  DROP TYPE "public"."enum_pages_blocks_contact_page_methods_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_page_methods_icon";`)
}
