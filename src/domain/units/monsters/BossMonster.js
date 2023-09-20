import { Monster } from '../../core/units/Monster';

export class BossMonster extends Monster {
  static CREATION_CONDITION = Object.freeze({
    MIN_INITIAL_HP: 100,
    MAX_INITIAL_HP: 200,

    TOTAL_HP_MP: 200,
  });

  static CONDITIONS = {
    NORMAL: {
      CODE: 'NORMAL',
      APPEARANCE: `
         ^-^
       / 0 0 \\
      (   "   )
       \\  -  /
        - ^ -
      `,
    },
    TAKEN_DAMAGE: {
      CODE: 'TAKEN_DAMAGE',
      APPEARANCE: `
         ^-^
       / x x \\
      (   "   )
       \\  -  /
        - ^ -
      `,
    },
    RAID_FAILED: {
      CODE: 'RAID_FAILED',
      APPEARANCE: `
         ^-^
       / ^ ^ \\
      (   "   )
       \\  3  /
        - ^ -
      `,
    },
  };
}
