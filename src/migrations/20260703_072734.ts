import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "headers_locales" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "headers" DROP COLUMN "cta_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "headers" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "headers_locales" DROP COLUMN "cta_url";`)
}
