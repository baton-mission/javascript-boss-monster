import ERROR_MESSAGE from '../../constants/error';

class Unit {
  _status = {
    name: '',
  };

  _skills = new Map();

  constructor({ name, hp, mp }) {
    this.name = name;
    if (hp) {
      this.initialHp = hp;
    }
    if (mp) {
      this.initialMp = mp;
    }
    this.learnBasicSkills();
  }

  set name(name) {
    this._status.name = name;
  }

  set initialHp(hp) {
    this._status.hp = hp;
    this._status.maxHp = hp;
  }

  set initialMp(mp) {
    this._status.mp = mp;
    this._status.maxMp = mp;
  }

  get status() {
    return { ...this._status };
  }

  get skills() {
    return this._skills;
  }

  increaseStatus(field, limit, value) {
    const updatedValue = this._status[field] + value;
    if (this._status[limit] && updatedValue > this._status[limit]) {
      this._status[field] = this._status[limit];
      return;
    }
    this._status[field] = updatedValue;
  }

  decreaseStatus(field, value) {
    const updatedValue = this._status[field] - value;
    if (updatedValue < 0) {
      this._status[field] = 0;
      return;
    }
    this._status[field] = updatedValue;
  }

  increaseHp(hp) {
    this.increaseStatus('hp', 'maxHp', hp);
  }

  decreaseHp(damage) {
    this.decreaseStatus('hp', damage);
  }

  increaseMp(mp) {
    this.increaseStatus('mp', 'maxMp', mp);
  }

  decreaseMp(mp) {
    this.decreaseStatus('mp', mp);
  }

  learnSkill(skillName, skill) {
    if (this._skills.get(skillName)) {
      throw new Error(ERROR_MESSAGE.EXISTING_SKILL);
    }
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
