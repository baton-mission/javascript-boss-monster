import Unit from '../core/Unit';
import { BasicAttack, MagicAttack } from '../skills';

export class Player extends Unit {
  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
    this.learnSkill(MagicAttack.SKILL_NAME, MagicAttack.of(this));
  }
}
