import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Make three array label/strain fields localized:
 *   - LabFormula      → jobs → adds → strain
 *   - LabProtocol     → layers → chips → label
 *   - LabScienceBoard → cso.tags → label
 *   - LabScienceBoard → validators.tags → label
 *
 * These were plain (non-localized) text, so a single value was shared across
 * every locale. This migration only changes the schema: it moves each field
 * into per-locale rows, seeding the current stored value as the `en` locale.
 * No content is rewritten — whatever the field currently holds becomes its
 * English value, and other locales fall back to it until translated in the CMS.
 */

// Add a `strain` column to the *_locales tables (which already exist for the
// localized `condition` field), seed en from the base table, then drop the
// base column.
async function localizeExistingLocalesColumn(
  db: MigrateUpArgs['db'],
  base: string,
  col: string,
) {
  const baseLoc = `${base}_locales`
  const ver = `_pages_v_blocks_${base.replace(/^pages_blocks_/, '')}`
  const verLoc = `${ver}_locales`

  await db.execute(
    sql.raw(`
    ALTER TABLE "${baseLoc}" ADD COLUMN IF NOT EXISTS "${col}" varchar;
    ALTER TABLE "${verLoc}"  ADD COLUMN IF NOT EXISTS "${col}" varchar;

    INSERT INTO "${baseLoc}" ("${col}", "_locale", "_parent_id")
    SELECT "${col}", 'en', "id" FROM "${base}"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "${col}" = EXCLUDED."${col}";

    INSERT INTO "${verLoc}" ("${col}", "_locale", "_parent_id")
    SELECT "${col}", 'en', "id" FROM "${ver}"
    ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "${col}" = EXCLUDED."${col}";

    ALTER TABLE "${base}" DROP COLUMN IF EXISTS "${col}";
    ALTER TABLE "${ver}"  DROP COLUMN IF EXISTS "${col}";
  `),
  )
}

// Create a brand-new *_locales pair (base + version) for a single-`label`
// array, seed `en` from the base table, then drop the base column.
async function localizeLabelArray(
  db: MigrateUpArgs['db'],
  base: string, // e.g. pages_blocks_lab_protocol_layers_chips
  idPrefix: string, // short, unique constraint/index prefix
) {
  const baseLoc = `${base}_locales`
  const ver = `_pages_v_blocks_${base.replace(/^pages_blocks_/, '')}`
  const verLoc = `${ver}_locales`

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "${baseLoc}" (
      "label"      varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" varchar    NOT NULL
    );
    CREATE TABLE IF NOT EXISTS "${verLoc}" (
      "label"      varchar,
      "id"         serial     PRIMARY KEY NOT NULL,
      "_locale"    "_locales" NOT NULL,
      "_parent_id" integer    NOT NULL
    );
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "${baseLoc}" ADD CONSTRAINT "${idPrefix}_loc_parent_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."${base}"("id") ON DELETE CASCADE ON UPDATE no action;
    ALTER TABLE "${verLoc}" ADD CONSTRAINT "v_${idPrefix}_loc_parent_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."${ver}"("id") ON DELETE CASCADE ON UPDATE no action;
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE UNIQUE INDEX "${idPrefix}_loc_uq"   ON "${baseLoc}" USING btree ("_locale", "_parent_id");
    CREATE UNIQUE INDEX "v_${idPrefix}_loc_uq" ON "${verLoc}"  USING btree ("_locale", "_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    INSERT INTO "${baseLoc}" ("label", "_locale", "_parent_id")
    SELECT "label", 'en', "id" FROM "${base}";
    INSERT INTO "${verLoc}" ("label", "_locale", "_parent_id")
    SELECT "label", 'en', "id" FROM "${ver}";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "${base}" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "${ver}"  DROP COLUMN IF EXISTS "label";
  `),
  )
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. LabFormula → jobs → adds → strain
  //    The *_locales tables already exist (created when `condition` was
  //    localized), so we only add the `strain` column and seed en.
  await localizeExistingLocalesColumn(db, 'pages_blocks_lab_formula_jobs_adds', 'strain')

  // 2. LabProtocol → layers → chips → label   (new *_locales tables)
  await localizeLabelArray(db, 'pages_blocks_lab_protocol_layers_chips', 'pblp_chips')

  // 3. LabScienceBoard → cso.tags → label   (new *_locales tables)
  await localizeLabelArray(db, 'pages_blocks_lab_science_board_cso_tags', 'sb_cso_tags')

  // 4. LabScienceBoard → validators.tags → label   (new *_locales tables)
  await localizeLabelArray(db, 'pages_blocks_lab_science_board_validators_tags', 'sb_val_tags')
}

// Restore a single-`label` array to a non-localized column: re-add the column,
// copy `en` values back, and drop the *_locales pair.
async function delocalizeLabelArray(db: MigrateDownArgs['db'], base: string) {
  const baseLoc = `${base}_locales`
  const ver = `_pages_v_blocks_${base.replace(/^pages_blocks_/, '')}`
  const verLoc = `${ver}_locales`

  await db.execute(
    sql.raw(`
    ALTER TABLE "${base}" ADD COLUMN IF NOT EXISTS "label" varchar;
    ALTER TABLE "${ver}"  ADD COLUMN IF NOT EXISTS "label" varchar;

    UPDATE "${base}" m SET "label" = l."label"
      FROM "${baseLoc}" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "${ver}" m SET "label" = l."label"
      FROM "${verLoc}" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';

    DROP TABLE IF EXISTS "${verLoc}";
    DROP TABLE IF EXISTS "${baseLoc}";
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // 1. adds.strain — keep the *_locales tables (condition still lives there),
  //    just move `strain` back to the base tables and drop the locale column.
  await db.execute(sql`
    ALTER TABLE "pages_blocks_lab_formula_jobs_adds"    ADD COLUMN IF NOT EXISTS "strain" varchar;
    ALTER TABLE "_pages_v_blocks_lab_formula_jobs_adds" ADD COLUMN IF NOT EXISTS "strain" varchar;

    UPDATE "pages_blocks_lab_formula_jobs_adds" m SET "strain" = l."strain"
      FROM "pages_blocks_lab_formula_jobs_adds_locales" l
      WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "_pages_v_blocks_lab_formula_jobs_adds" m SET "strain" = l."strain"
      FROM "_pages_v_blocks_lab_formula_jobs_adds_locales" l
      WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';

    ALTER TABLE "pages_blocks_lab_formula_jobs_adds_locales"    DROP COLUMN IF EXISTS "strain";
    ALTER TABLE "_pages_v_blocks_lab_formula_jobs_adds_locales" DROP COLUMN IF EXISTS "strain";
  `)

  // 2-4. the three label arrays
  await delocalizeLabelArray(db, 'pages_blocks_lab_protocol_layers_chips')
  await delocalizeLabelArray(db, 'pages_blocks_lab_science_board_cso_tags')
  await delocalizeLabelArray(db, 'pages_blocks_lab_science_board_validators_tags')
}
