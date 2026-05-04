import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer_variants"
      ADD COLUMN IF NOT EXISTS "link_color" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer_variants"
      DROP COLUMN IF EXISTS "link_color";
  `)
}
