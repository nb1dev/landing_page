import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer_variants"
      ADD COLUMN IF NOT EXISTS "logo_id" integer;

    ALTER TABLE "footer_variants"
      ADD CONSTRAINT "footer_variants_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id")
      ON DELETE SET NULL ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "footer_variants_logo_idx"
      ON "footer_variants" USING btree ("logo_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "footer_variants_logo_idx";

    ALTER TABLE "footer_variants"
      DROP CONSTRAINT IF EXISTS "footer_variants_logo_id_media_id_fk",
      DROP COLUMN IF EXISTS "logo_id";
  `)
}
