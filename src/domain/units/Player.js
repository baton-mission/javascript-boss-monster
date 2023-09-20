import Unit from '../core/Unit';
import { BasicAttack, MagicAttack } from '../skills';
import * as validator from '../../utils/validator';
import ERROR_MESSAGE from '../../constants/error';

export class Player extends Unit {
  static CREATION_CONDITION = Object.freeze({
    MIN_NAME_LENGTH: 1,
    MAX_NAME_LENGTH: 5,

    TOTAL_HP_MP: 200,
  });

  constructor({ name, hp, mp }) {
    super({ name, hp, mp });
    this.validateName(name);
    this.validateTotalHpMp(hp, mp);
  }

  validateName(name) {
    const { MIN_NAME_LENGTH: min, MAX_NAME_LENGTH: max } = Player.CREATION_CONDITION;
    if (validator.isOutOfRange(name.length, min, max)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_PLAYER_NAME);
    }
  }

  validateTotalHpMp(hp, mp) {
    const { TOTAL_HP_MP } = Player.CREATION_CONDITION;
    if (hp + mp !== TOTAL_HP_MP) {
      throw new Error(ERROR_MESSAGE.INVALID_TOTAL_HP_MP);
    }
  }

  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
    this.learnSkill(MagicAttack.SKILL_NAME, MagicAttack.of(this));
  }
}
