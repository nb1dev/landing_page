import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_url";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_url";
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD COLUMN "subtitles_id" integer;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD COLUMN "subtitles_id" integer;
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD COLUMN "subtitles_id" integer;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD COLUMN "subtitles_id" integer;
  ALTER TABLE "pages_blocks_yp_athletes_cards" ADD CONSTRAINT "pages_blocks_yp_athletes_cards_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_athletes_section_athletes" ADD CONSTRAINT "pages_blocks_athletes_section_athletes_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" ADD CONSTRAINT "_pages_v_blocks_yp_athletes_cards_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" ADD CONSTRAINT "_pages_v_blocks_athletes_section_athletes_subtitles_id_media_id_fk" FOREIGN KEY ("subtitles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_yp_athletes_cards_subtitles_idx" ON "pages_blocks_yp_athletes_cards" USING btree ("subtitles_id");
  CREATE INDEX "pages_blocks_athletes_section_athletes_subtitles_idx" ON "pages_blocks_athletes_section_athletes" USING btree ("subtitles_id");
  CREATE INDEX "_pages_v_blocks_yp_athletes_cards_subtitles_idx" ON "_pages_v_blocks_yp_athletes_cards" USING btree ("subtitles_id");
  CREATE INDEX "_pages_v_blocks_athletes_section_athletes_subtitles_idx" ON "_pages_v_blocks_athletes_section_athletes" USING btree ("subtitles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP CONSTRAINT IF EXISTS "pages_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  ALTER TABLE "pages_blocks_athletes_section_athletes" DROP CONSTRAINT IF EXISTS "pages_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_yp_athletes_cards_subtitles_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_athletes_section_athletes_subtitles_id_media_id_fk";
  DROP INDEX IF EXISTS "pages_blocks_yp_athletes_cards_subtitles_idx";
  DROP INDEX IF EXISTS "pages_blocks_athletes_section_athletes_subtitles_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_yp_athletes_cards_subtitles_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_athletes_section_athletes_subtitles_idx";
  ALTER TABLE "pages_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_id";
  ALTER TABLE "_pages_v_blocks_yp_athletes_cards" DROP COLUMN IF EXISTS "subtitles_id";
  ALTER TABLE "pages_blocks_athletes_section_athletes" DROP COLUMN IF EXISTS "subtitles_id";
  ALTER TABLE "_pages_v_blocks_athletes_section_athletes" DROP COLUMN IF EXISTS "subtitles_id";`)
}
