class Unit {
  _status = {
    name: '',
  };

  _skills = new Map();

  constructor({ name, hp, mp }) {
    this.name = name;
    if (hp) {
      this.hp = hp;
    }
    if (mp) {
      this.mp = mp;
    }
    this.learnBasicSkills();
  }

  set name(name) {
    this._status.name = name;
  }

  set hp(hp) {
    this._status.hp = hp;
    this._status.maxHp = hp;
  }

  set mp(mp) {
    this._status.mp = mp;
    this._status.maxMp = mp;
  }

  get status() {
    return { ...this._status };
  }

  get skills() {
    return this._skills;
  }

  increaseHp(hp) {
    const updatedHp = this._status.hp + hp;
    this._status.hp = updatedHp > this._status.maxHp ? this._status.maxHp : updatedHp;
  }

  decreaseHp(damage) {
    const updatedHp = this._status.hp - damage;
    this._status.hp = updatedHp >= 0 ? updatedHp : 0;
  }

  increaseMp(mp) {
    const updatedMp = this._status.mp + mp;
    this._status.mp = updatedMp > this._status.maxMp ? this._status.maxMp : updatedMp;
  }

  decreaseMp(mp) {
    const updatedMp = this._status.mp - mp;
    this._status.mp = updatedMp >= 0 ? updatedMp : 0;
  }

  learnSkill(skillName, skill) {
    this._skills.set(skillName, skill);
  }

  learnBasicSkills() {
    return null;
  }

  useSkill(skillName, enemy) {
    const skill = this._skills.get(skillName);
    if (!skill) {
      throw new Error('보유하지 않은 스킬입니다!');
    }
    skill.use(enemy);
  }
}

export default Unit;
