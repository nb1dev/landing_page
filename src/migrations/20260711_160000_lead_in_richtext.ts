import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Hand-written (NOT via migrate:create, whose baseline is drifted and
// over-generates). Converts LabReadingPanel `leadIn` from textarea (varchar) to
// richText (jsonb) in both the live and version _locales tables. Existing plain
// text is preserved by wrapping it in a minimal single-paragraph Lexical value,
// matching the exact node shape Payload stores (verified against transition_text).
const toLexical = (col: string) => sql`
  CASE
    WHEN ${sql.raw(`"${col}"`)} IS NULL OR ${sql.raw(`"${col}"`)} = '' THEN NULL
    ELSE jsonb_build_object(
      'root', jsonb_build_object(
        'type', 'root', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
        'children', jsonb_build_array(
          jsonb_build_object(
            'type', 'paragraph', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
            'children', jsonb_build_array(
              jsonb_build_object(
                'mode', 'normal', 'text', ${sql.raw(`"${col}"`)}, 'type', 'text',
                'style', '', 'detail', 0, 'format', 0, 'version', 1
              )
            )
          )
        )
      )
    )
  END
`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_lab_reading_panel_locales"
      ALTER COLUMN "lead_in" TYPE jsonb USING (${toLexical('lead_in')});
    ALTER TABLE "_pages_v_blocks_lab_reading_panel_locales"
      ALTER COLUMN "lead_in" TYPE jsonb USING (${toLexical('lead_in')});
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_lab_reading_panel_locales"
      ALTER COLUMN "lead_in" TYPE varchar USING ("lead_in"->'root'->'children'->0->'children'->0->>'text');
    ALTER TABLE "_pages_v_blocks_lab_reading_panel_locales"
      ALTER COLUMN "lead_in" TYPE varchar USING ("lead_in"->'root'->'children'->0->'children'->0->>'text');
  `)
}
