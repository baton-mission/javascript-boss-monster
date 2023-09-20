class Skill {
  _caster;

  #skillName;

  #requireMp;

  constructor(caster, { skillName, requireMp }) {
    this._caster = caster;
    this.#skillName = skillName;
    this.#requireMp = requireMp;
  }

  get skillName() {
    return this.#skillName;
  }

  get requireMp() {
    return this.#requireMp;
  }

  use(enemy) {
    this._effect(enemy);
    this._bonusEffect(enemy);
  }

  _effect() {
    return null;
  }

  _bonusEffect() {
    return null;
  }
}

export default Skill;