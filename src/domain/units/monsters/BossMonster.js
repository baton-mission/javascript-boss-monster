import { Monster } from '../../core/units/Monster';
import { RandomAttack } from '../../skills';
import * as validator from '../../../utils/validator';
import ERROR_MESSAGE from '../../../constants/error';

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
  constructor({ name, hp, mp }) {
    super({ name, hp, mp });
    this.validateHpRange(hp);
  }

  /**
   * @param {number} hp
   */
  validateHpRange(hp) {
    const { MIN_INITIAL_HP: min, MAX_INITIAL_HP: max } = this.constructor.CREATION_CONDITION;
    if (validator.isOutOfRange(hp, min, max)) {
      throw new Error(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: 'hp', min, max }));
    }
  }

  /** @protected */
  _learnBasicSkills() {
    this.learnSkill(RandomAttack.SKILL_NAME, RandomAttack.of(this));
  }
}
