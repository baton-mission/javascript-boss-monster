import Unit from '../core/Unit';
import { RandomAttack } from '../skills';
import * as validator from '../../utils/validator';
import ERROR_MESSAGE from '../../constants/error';

export class Monster extends Unit {
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

  constructor({ name, hp }) {
    super({ name, hp });
    this.validateHpRange(hp);
    this.condition = Monster.CONDITIONS.NORMAL.CODE;
  }

  set condition(code) {
    const updatedCondition = Monster.CONDITIONS[code];
    if (!updatedCondition) {
      throw new Error(ERROR_MESSAGE.UNKNOWN_CONDITION_CODE);
    }
    this._status.condition = updatedCondition.CODE;
    this._status.appearance = updatedCondition.APPEARANCE;
  }

  decreaseHpEffect() {
    this.condition = Monster.CONDITIONS.TAKEN_DAMAGE.CODE;
  }

  validateHpRange(hp) {
    const { MIN_INITIAL_HP: min, MAX_INITIAL_HP: max } = Monster.CREATION_CONDITION;
    if (validator.isOutOfRange(hp, min, max)) {
      throw new Error(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: 'hp', min, max }));
    }
  }

  learnBasicSkills() {
    this.learnSkill(RandomAttack.SKILL_NAME, RandomAttack.of(this));
  }
}
