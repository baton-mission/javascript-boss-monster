import Unit from './core/Unit';
import BasicAttack from './skills/BasicAttack';
import MagicAttack from './skills/MagicAttack';

class Player extends Unit {
  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
    this.learnSkill(MagicAttack.SKILL_NAME, MagicAttack.of(this));
  }
}

export default Player;
