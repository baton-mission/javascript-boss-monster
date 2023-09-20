import Unit from './core/Unit';
import BasicAttack from './skills/BasicAttack';

class Player extends Unit {
  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
  }
}

export default Player;
