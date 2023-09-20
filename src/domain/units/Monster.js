import Unit from '../core/Unit';
import { RandomAttack } from '../skills';

export class Monster extends Unit {
  learnBasicSkills() {
    this.learnSkill(RandomAttack.SKILL_NAME, RandomAttack.of(this));
  }
}
