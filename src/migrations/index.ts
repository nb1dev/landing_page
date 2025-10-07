import * as migration_20251007_144937_init from './20251007_144937_init';

export const migrations = [
  {
    up: migration_20251007_144937_init.up,
    down: migration_20251007_144937_init.down,
    name: '20251007_144937_init'
  },
];
