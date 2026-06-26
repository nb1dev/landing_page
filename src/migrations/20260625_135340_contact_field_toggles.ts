import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_page" ADD COLUMN "show_name" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_contact_page" ADD COLUMN "show_email" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_contact_page" ADD COLUMN "show_topic" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_contact_page" ADD COLUMN "show_order" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_contact_page" ADD COLUMN "show_name" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_contact_page" ADD COLUMN "show_email" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_contact_page" ADD COLUMN "show_topic" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_contact_page" ADD COLUMN "show_order" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_page" DROP COLUMN "show_name";
  ALTER TABLE "pages_blocks_contact_page" DROP COLUMN "show_email";
  ALTER TABLE "pages_blocks_contact_page" DROP COLUMN "show_topic";
  ALTER TABLE "pages_blocks_contact_page" DROP COLUMN "show_order";
  ALTER TABLE "_pages_v_blocks_contact_page" DROP COLUMN "show_name";
  ALTER TABLE "_pages_v_blocks_contact_page" DROP COLUMN "show_email";
  ALTER TABLE "_pages_v_blocks_contact_page" DROP COLUMN "show_topic";
  ALTER TABLE "_pages_v_blocks_contact_page" DROP COLUMN "show_order";`)
}
