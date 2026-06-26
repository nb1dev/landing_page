import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'nl';
  ALTER TYPE "public"."enum__pages_v_published_locale" ADD VALUE 'nl';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'nl';
  ALTER TYPE "public"."enum__products_v_published_locale" ADD VALUE 'nl';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Reversing ADD VALUE on a PostgreSQL enum requires recreating the type.
  // Payload will handle this if nl is removed from the localization config.
}
