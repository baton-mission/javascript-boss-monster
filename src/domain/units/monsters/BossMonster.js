import { Monster } from '../../core/units/Monster.js';
import { RandomAttack } from '../../skills/index.js';
import * as validator from '../../../utils/validator.js';
import { ERROR_MESSAGE } from '../../../constants/error.js';

/**
 * @typedef {Object} MonsterCondition
 * @property {string} CODE
 * @property {string} APPEARANCE
 */

/**
 * @class
 * @extends {Monster}
 */
export class BossMonster extends Monster {
  static CREATION_CONDITION = Object.freeze({
    MIN_INITIAL_HP: 100,
    MAX_INITIAL_HP: 200,

    TOTAL_HP_MP: 200,
  });

  /** @type {MonsterCondition[]} */
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

  /**
   * @constructor
   * @param {{
   *  name: string;
   *  hp: number;
   *  mp?: number;
   * }} params
   */

  _validateSpec({ hp }) {
    this.validateHpRange(hp);
  }

  /**
   * @param {number} hp
   */
  validateHpRange(hp) {
    const { MIN_INITIAL_HP: min, MAX_INITIAL_HP: max } = this.constructor.CREATION_CONDITION;
    if (validator.isOutOfRange(hp, min, max)) {
      throw new Error(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: '보스 몬스터 HP', min, max }));
    }
  }

  /** @protected */
  _learnBasicSkills() {
    this.learnSkill(RandomAttack.of(this));
  }
}
