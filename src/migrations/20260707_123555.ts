import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The archetypes array's row id ended up as a plain integer (serial) instead of
// Payload's normal string-based array-row id, because an earlier version of this
// block's config had a custom field literally named "id" which collided with the
// reserved row primary key. That's now fixed in code, but the existing columns
// (created by the original migration) still need converting back to varchar so
// the app's normal string id generation can insert successfully. No real data
// exists in these tables yet, so this is a straightforward type conversion.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "pages_blocks_lab_reading_panel_archetypes_locales_parent__fk";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk";

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;

  DROP SEQUENCE IF EXISTS "pages_blocks_lab_reading_panel_archetypes_id_seq";
  DROP SEQUENCE IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_id_seq";

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "pages_blocks_lab_reading_panel_archetypes_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "pages_blocks_lab_reading_panel_archetypes_locales_parent__fk";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk";

  CREATE SEQUENCE IF NOT EXISTS "pages_blocks_lab_reading_panel_archetypes_id_seq";
  CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_id_seq";

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE integer USING "id"::integer;
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" SET DEFAULT nextval('pages_blocks_lab_reading_panel_archetypes_id_seq');
  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE integer USING "id"::integer;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" SET DEFAULT nextval('_pages_v_blocks_lab_reading_panel_archetypes_id_seq');
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE integer USING "_parent_id"::integer;

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "pages_blocks_lab_reading_panel_archetypes_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  `)
}
