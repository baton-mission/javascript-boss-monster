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

  constructor({ name, hp }) {
    super({ name, hp });
    this.validateHpRange(hp);
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
