import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_lab_reading_panel_archetypes_pattern_id" AS ENUM('protein', 'bifido', 'fibre', 'mucus', 'crowded', 'depletion', 'gutbrain', 'balance');
  CREATE TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_pattern_id" AS ENUM('protein', 'bifido', 'fibre', 'mucus', 'crowded', 'depletion', 'gutbrain', 'balance');

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" ADD COLUMN "pattern_id" "enum_pages_blocks_lab_reading_panel_archetypes_pattern_id";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ADD COLUMN "pattern_id" "enum__pages_v_blocks_lab_reading_panel_archetypes_pattern_id";

  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" DROP COLUMN IF EXISTS "_uuid";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_uuid";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_uuid" AS ENUM('protein', 'bifido', 'fibre', 'mucus', 'crowded', 'depletion', 'gutbrain', 'balance');
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" ADD COLUMN "_uuid" "enum__pages_v_blocks_lab_reading_panel_archetypes_uuid";

  ALTER TABLE "pages_blocks_lab_reading_panel_archetypes" DROP COLUMN IF EXISTS "pattern_id";
  ALTER TABLE "_pages_v_blocks_lab_reading_panel_archetypes" DROP COLUMN IF EXISTS "pattern_id";

  DROP TYPE IF EXISTS "public"."enum_pages_blocks_lab_reading_panel_archetypes_pattern_id";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_lab_reading_panel_archetypes_pattern_id";
  `)
}
