import * as migration_20260121_140435 from './20260121_140435';
import * as migration_20260408_091809 from './20260408_091809';

export const migrations = [
  {
    up: migration_20260121_140435.up,
    down: migration_20260121_140435.down,
    name: '20260121_140435',
  },
  {
    up: migration_20260408_091809.up,
    down: migration_20260408_091809.down,
    name: '20260408_091809'
  },
];
