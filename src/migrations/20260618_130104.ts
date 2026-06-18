import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footers" ADD COLUMN "form_id" integer;
  ALTER TABLE "footers" ADD CONSTRAINT "footers_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footers_form_idx" ON "footers" USING btree ("form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footers" DROP CONSTRAINT "footers_form_id_forms_id_fk";
  
  DROP INDEX "footers_form_idx";
  ALTER TABLE "footers" DROP COLUMN "form_id";`)
}
