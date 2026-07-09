import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Fixes an over-correction in migration 20260707_122641: that migration dropped the
// "_uuid" column from the archetypes versions table, assuming it was an artifact of
// the old (buggy) custom "id" field. It isn't — "_uuid" is Payload's standard column
// for every array row's identity on a versions/drafts shadow table (confirmed present,
// as plain varchar, on unrelated blocks like LabScienceBoard). It just happened to be
// typed as an enum before because it was renamed from the old custom "id" (select)
// field. Restoring it here as a plain varchar, which is what the current field set
// (with "id" now properly separated into "patternId") actually needs.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" DROP COLUMN IF EXISTS "_uuid";
  `)
}
