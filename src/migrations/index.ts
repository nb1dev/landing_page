import * as migration_20251008_115934_init_schema from './20251008_115934_init_schema';

export const migrations = [
  {
    up: migration_20251008_115934_init_schema.up,
    down: migration_20251008_115934_init_schema.down,
    name: '20251008_115934_init_schema'
  },
];
