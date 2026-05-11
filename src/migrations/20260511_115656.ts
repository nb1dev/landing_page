import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // floating_cta: drop hardcoded defaults (idempotent in postgres)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "text" DROP DEFAULT;
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" DROP DEFAULT;
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_text" DROP DEFAULT;
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_href" DROP DEFAULT;
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" DROP DEFAULT;
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "text" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_text" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_href" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" DROP DEFAULT;
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" DROP DEFAULT;
  `)

  // process_diagram: add sub_line and strain_caption columns (IF NOT EXISTS = safe to re-run)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales"
      ADD COLUMN IF NOT EXISTS "sub_line" varchar;
    ALTER TABLE "pages_blocks_process_diagram_steps_locales"
      ADD COLUMN IF NOT EXISTS "strain_caption" varchar;
    ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales"
      ADD COLUMN IF NOT EXISTS "sub_line" varchar;
    ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales"
      ADD COLUMN IF NOT EXISTS "strain_caption" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // floating_cta: restore defaults
  await db.execute(sql`
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "text" SET DEFAULT 'Get your kit';
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" SET DEFAULT '2 weeks before anyone else';
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_text" SET DEFAULT 'Reserve my kit →';
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "button_href" SET DEFAULT '#reserve';
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" SET DEFAULT '.hero';
    ALTER TABLE "pages_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" SET DEFAULT '#reserve';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "text" SET DEFAULT 'Get your kit';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "highlighted_text" SET DEFAULT '2 weeks before anyone else';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_text" SET DEFAULT 'Reserve my kit →';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "button_href" SET DEFAULT '#reserve';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "hero_selector" SET DEFAULT '.hero';
    ALTER TABLE "_pages_v_blocks_floating_c_t_a" ALTER COLUMN "reserve_selector" SET DEFAULT '#reserve';
  `)

  // process_diagram: remove sub_line and strain_caption columns
  await db.execute(sql`
    ALTER TABLE "pages_blocks_process_diagram_steps_list_items_locales"
      DROP COLUMN IF EXISTS "sub_line";
    ALTER TABLE "pages_blocks_process_diagram_steps_locales"
      DROP COLUMN IF EXISTS "strain_caption";
    ALTER TABLE "_pages_v_blocks_process_diagram_steps_list_items_locales"
      DROP COLUMN IF EXISTS "sub_line";
    ALTER TABLE "_pages_v_blocks_process_diagram_steps_locales"
      DROP COLUMN IF EXISTS "strain_caption";
  `)
}
