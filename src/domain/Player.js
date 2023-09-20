import Unit from './core/Unit';
import BasicAttack from './skills/BasicAttack';

class Player extends Unit {
  #name;

  #mp;

  #maxMp;

  constructor({ name, hp, mp }) {
    super(hp);
    this.#name = name;
    this.#mp = mp;
    this.#maxMp = mp;
  }

  get name() {
    return this.#name;
  }

  get mp() {
    return this.#mp;
  }

  learnBasicSkills() {
    this.learnSkill(BasicAttack.SKILL_NAME, BasicAttack.of(this));
  }

  increaseMp(mp) {
    this.#mp = this.#mp + mp > this.#maxMp ? this.#maxMp : this.#mp + mp;
  }

  decreaseMp(mp) {
    this.#mp -= mp;
  }

  attack(enemy) {
    const skill = this._skills.get(BasicAttack.SKILL_NAME);
    skill.use(enemy);
  }
}

export default Player;
