import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Corrects an over-broad fix in migration 20260707_123555: that migration converted
// the archetypes array's "id" column to varchar on BOTH the live table and the
// versions/drafts shadow table. That was only correct for the live table. On the
// versions table, "id" is supposed to stay a plain auto-increment serial (it's a
// meaningless DB-internal row key there); the real cross-version row identity is
// carried separately by "_uuid" (already fixed to varchar in migration 125755).
// Confirmed by checking the equivalent (bug-free) LabScienceBoard block's versions
// tables, which use serial "id" + varchar "_uuid" throughout.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk";

  CREATE SEQUENCE IF NOT EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_id_seq";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE integer USING NULLIF("id", '')::integer;
  ALTER SEQUENCE "_pages_v_blocks_lab_reading_panel_archetypes_id_seq" OWNED BY "_pages_v_blocks_lab_reading_panel_archetypes"."id";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" SET DEFAULT nextval('_pages_v_blocks_lab_reading_panel_archetypes_id_seq');
  SELECT setval('_pages_v_blocks_lab_reading_panel_archetypes_id_seq', 1, false);

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk";

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;
  DROP SEQUENCE IF EXISTS "_pages_v_blocks_lab_reading_panel_archetypes_id_seq";

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes_locales" ADD CONSTRAINT "_pages_v_blocks_lab_reading_panel_archetypes_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_lab_reading_panel_archetypes"("id") ON DELETE cascade ON UPDATE no action;
  `)
}
