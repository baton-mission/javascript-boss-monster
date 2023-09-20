import Unit from './core/Unit';
import RandomAttack from './skills/RandomAttack';

class Monster extends Unit {
  learnBasicSkills() {
    this.learnSkill(RandomAttack.SKILL_NAME, RandomAttack.of(this));
  }
}

export default Monster;
