class Skill {
  _caster;

  #skillName;

  #requireMp;

  constructor(caster, { skillName, requireMp }) {
    this._caster = caster;
    this.#skillName = skillName;
    this.#requireMp = requireMp || 0;
  }

  get skillName() {
    return this.#skillName;
  }

  get requireMp() {
    return this.#requireMp;
  }

  use(enemy) {
    if (this.#requireMp) {
      this._caster.decreaseMp(this.#requireMp);
    }
    this._effect(enemy);
    this._bonusEffect(enemy);
  }

  _effect() {}

  _bonusEffect() {}
}

export default Skill;
