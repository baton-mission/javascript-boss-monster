import Unit from './Unit';
import { RandomAttack } from '../../skills';
import * as validator from '../../../utils/validator';
import ERROR_MESSAGE from '../../../constants/error';

export class Monster extends Unit {
  constructor({ name, hp }) {
    super({ name, hp });
    this.validateHpRange(hp);
    this.condition = this.constructor.CONDITIONS.NORMAL.CODE;
  }

  set condition(code) {
    const updatedCondition = this.constructor.CONDITIONS[code];
    if (!updatedCondition) {
      throw new Error(ERROR_MESSAGE.UNKNOWN_CONDITION_CODE);
    }
    this._status.condition = updatedCondition.CODE;
    this._status.appearance = updatedCondition.APPEARANCE;
  }

  decreaseHpEffect() {
    this.condition = this.constructor.CONDITIONS.TAKEN_DAMAGE.CODE;
  }

  validateHpRange(hp) {
    const { MIN_INITIAL_HP: min, MAX_INITIAL_HP: max } = this.constructor.CREATION_CONDITION;
    if (validator.isOutOfRange(hp, min, max)) {
      throw new Error(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: 'hp', min, max }));
    }
  }

  learnBasicSkills() {
    this.learnSkill(RandomAttack.SKILL_NAME, RandomAttack.of(this));
  }

  setWinner() {
    this.condition = this.constructor.CONDITIONS.RAID_FAILED.CODE;
  }
}
