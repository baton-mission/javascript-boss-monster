import Unit from '../core/Unit';
import { BasicAttack, MagicAttack } from '../skills';

export class Player extends Unit {
  static CREATION_CONDITION = Object.freeze({
    MIN_NAME_LENGTH: 1,
    MAX_NAME_LENGTH: 5,

    TOTAL_HP_MP: 200,
  });

  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
    this.learnSkill(MagicAttack.SKILL_NAME, MagicAttack.of(this));
  }
}
