class Unit {
  _hp;

  _maxHp;

  _skills = new Map();

  constructor(hp) {
    this._hp = hp;
    this._maxHp = hp;
    this.learnBasicSkills();
  }

  get hp() {
    return this._hp;
  }

  learnBasicSkills() {
    return null;
  }

  takeDamage(damage) {
    this._hp = this._hp - damage >= 0 ? this._hp - damage : 0;
  }

  learnSkill(skillName, skill) {
    this._skills.set(skillName, skill);
  }
}

export default Unit;
