import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_page" ALTER COLUMN "callout_cta_href" DROP DEFAULT;
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "callout_heading" DROP DEFAULT;
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "callout_cta_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_legal_doc_locales" ALTER COLUMN "summary_heading" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page" ALTER COLUMN "recipient_email" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "methods_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "form_heading" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "submit_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_faq_page" ALTER COLUMN "callout_cta_href" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "callout_heading" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "callout_cta_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" ALTER COLUMN "summary_heading" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact_page" ALTER COLUMN "recipient_email" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "methods_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "form_heading" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "submit_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "name_label" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "name_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "email_label" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "email_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "topic_label" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "order_label" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "order_placeholder" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "message_label" varchar;
  ALTER TABLE "pages_blocks_contact_page_locales" ADD COLUMN "message_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "name_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "name_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "email_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "email_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "topic_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "order_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "order_placeholder" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "message_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ADD COLUMN "message_placeholder" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_page" ALTER COLUMN "callout_cta_href" SET DEFAULT '/contact';
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "title" SET DEFAULT 'Frequently asked questions.';
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "callout_heading" SET DEFAULT 'Still have a question?';
  ALTER TABLE "pages_blocks_faq_page_locales" ALTER COLUMN "callout_cta_label" SET DEFAULT 'Contact us →';
  ALTER TABLE "pages_blocks_legal_doc_locales" ALTER COLUMN "summary_heading" SET DEFAULT 'At a glance';
  ALTER TABLE "pages_blocks_contact_page" ALTER COLUMN "recipient_email" SET DEFAULT 'support@nb1.com';
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "title" SET DEFAULT 'Get in touch.';
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "methods_label" SET DEFAULT 'Ways to reach us';
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "form_heading" SET DEFAULT 'Send us a message';
  ALTER TABLE "pages_blocks_contact_page_locales" ALTER COLUMN "submit_label" SET DEFAULT 'Open email to send';
  ALTER TABLE "_pages_v_blocks_faq_page" ALTER COLUMN "callout_cta_href" SET DEFAULT '/contact';
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "title" SET DEFAULT 'Frequently asked questions.';
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "callout_heading" SET DEFAULT 'Still have a question?';
  ALTER TABLE "_pages_v_blocks_faq_page_locales" ALTER COLUMN "callout_cta_label" SET DEFAULT 'Contact us →';
  ALTER TABLE "_pages_v_blocks_legal_doc_locales" ALTER COLUMN "summary_heading" SET DEFAULT 'At a glance';
  ALTER TABLE "_pages_v_blocks_contact_page" ALTER COLUMN "recipient_email" SET DEFAULT 'support@nb1.com';
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "title" SET DEFAULT 'Get in touch.';
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "methods_label" SET DEFAULT 'Ways to reach us';
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "form_heading" SET DEFAULT 'Send us a message';
  ALTER TABLE "_pages_v_blocks_contact_page_locales" ALTER COLUMN "submit_label" SET DEFAULT 'Open email to send';
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "name_label";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "name_placeholder";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "email_label";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "email_placeholder";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "topic_label";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "order_label";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "order_placeholder";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "message_label";
  ALTER TABLE "pages_blocks_contact_page_locales" DROP COLUMN "message_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "name_label";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "name_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "email_label";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "email_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "topic_label";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "order_label";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "order_placeholder";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "message_label";
  ALTER TABLE "_pages_v_blocks_contact_page_locales" DROP COLUMN "message_placeholder";`)
}
