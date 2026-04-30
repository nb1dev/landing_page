import * as migration_20260121_140435 from './20260121_140435';
import * as migration_20260408_091809 from './20260408_091809';
import * as migration_20260428_122159 from './20260428_122159';
import * as migration_20260428_131604 from './20260428_131604';
import * as migration_20260429_bio_groups_uuid from './20260429_bio_groups_uuid';
import * as migration_20260429_biology_groups from './20260429_biology_groups';
import * as migration_20260429_fix_bio_groups_v from './20260429_fix_bio_groups_v';
import * as migration_20260429_variant_full_fields from './20260429_variant_full_fields';
import * as migration_20260430_074534 from './20260430_074534';
import * as migration_20260430_092252 from './20260430_092252';
import * as migration_20260510_heading_richtext from './20260510_heading_richtext';

export const migrations = [
  {
    up: migration_20260121_140435.up,
    down: migration_20260121_140435.down,
    name: '20260121_140435',
  },
  {
    up: migration_20260408_091809.up,
    down: migration_20260408_091809.down,
    name: '20260408_091809',
  },
  {
    up: migration_20260428_122159.up,
    down: migration_20260428_122159.down,
    name: '20260428_122159',
  },
  {
    up: migration_20260428_131604.up,
    down: migration_20260428_131604.down,
    name: '20260428_131604',
  },
  {
    up: migration_20260429_bio_groups_uuid.up,
    down: migration_20260429_bio_groups_uuid.down,
    name: '20260429_bio_groups_uuid',
  },
  {
    up: migration_20260429_biology_groups.up,
    down: migration_20260429_biology_groups.down,
    name: '20260429_biology_groups',
  },
  {
    up: migration_20260429_fix_bio_groups_v.up,
    down: migration_20260429_fix_bio_groups_v.down,
    name: '20260429_fix_bio_groups_v',
  },
  {
    up: migration_20260429_variant_full_fields.up,
    down: migration_20260429_variant_full_fields.down,
    name: '20260429_variant_full_fields',
  },
  {
    up: migration_20260430_074534.up,
    down: migration_20260430_074534.down,
    name: '20260430_074534',
  },
  {
    up: migration_20260430_092252.up,
    down: migration_20260430_092252.down,
    name: '20260430_092252',
  },
  {
    up: migration_20260510_heading_richtext.up,
    down: migration_20260510_heading_richtext.down,
    name: '20260510_heading_richtext'
  },
];
