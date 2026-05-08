import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_floating_c_t_a" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar DEFAULT 'Get your kit',
      "highlighted_text" varchar DEFAULT '2 weeks before anyone else',
      "button_text" varchar DEFAULT 'Reserve my kit →',
      "button_href" varchar DEFAULT '#reserve',
      "hero_selector" varchar DEFAULT '.hero',
      "reserve_selector" varchar DEFAULT '#reserve',
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_floating_c_t_a" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "text" varchar DEFAULT 'Get your kit',
      "highlighted_text" varchar DEFAULT '2 weeks before anyone else',
      "button_text" varchar DEFAULT 'Reserve my kit →',
      "button_href" varchar DEFAULT '#reserve',
      "hero_selector" varchar DEFAULT '.hero',
      "reserve_selector" varchar DEFAULT '#reserve',
      "_uuid" varchar,
      "block_name" varchar
    );
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_floating_c_t_a"
        ADD CONSTRAINT "pages_blocks_floating_c_t_a_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_floating_c_t_a"
        ADD CONSTRAINT "_pages_v_blocks_floating_c_t_a_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    CREATE INDEX IF NOT EXISTS "pages_blocks_floating_c_t_a_order_idx" ON "pages_blocks_floating_c_t_a" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_floating_c_t_a_parent_id_idx" ON "pages_blocks_floating_c_t_a" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_floating_c_t_a_path_idx" ON "pages_blocks_floating_c_t_a" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_floating_c_t_a_order_idx" ON "_pages_v_blocks_floating_c_t_a" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_floating_c_t_a_parent_id_idx" ON "_pages_v_blocks_floating_c_t_a" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_floating_c_t_a_path_idx" ON "_pages_v_blocks_floating_c_t_a" USING btree ("_path");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_floating_c_t_a" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_floating_c_t_a" CASCADE;
  `)
}
