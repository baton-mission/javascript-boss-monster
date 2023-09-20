import ERROR_MESSAGE from '../../constants/error';
import * as validator from '../../utils/validator';

class Unit {
  _status = {
    name: '',
    isDead: false,
  };

  _skills = new Map();

  constructor({ name, hp, mp }) {
    this.validate(hp, mp);
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

  validate(hp, mp) {
    this.validateHp(hp);
    if (typeof mp !== 'undefined') {
      this.validateMp(mp);
    }
  }

  validateHp(hp) {
    if (typeof hp !== 'number') throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER('HP'));
    if (validator.isDecimal(hp)) throw new Error(ERROR_MESSAGE.IS_DECIMAL('HP'));
    if (hp <= 0) throw new Error(ERROR_MESSAGE.IS_BELOW_ZERO('HP'));
  }

  validateMp(mp) {
    if (typeof mp !== 'number') throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER('MP'));
    if (validator.isDecimal(mp)) throw new Error(ERROR_MESSAGE.IS_DECIMAL('MP'));
    if (mp <= 0) throw new Error(ERROR_MESSAGE.IS_BELOW_ZERO('MP'));
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
    this.decreaseHpEffect();
    if (!this._status.hp) {
      this.dead();
    }
  }

  decreaseHpEffect() {}

  increaseMp(mp) {
    this.increaseStatus('mp', 'maxMp', mp);
  }

  decreaseMp(mp) {
    this.decreaseStatus('mp', mp);
  }

  dead() {
    this._status.isDead = true;
  }

  learnSkill(skillName, skill) {
    if (this._skills.get(skillName)) {
      throw new Error(ERROR_MESSAGE.EXISTING_SKILL);
    }
    this._skills.set(skillName, skill);
  }

  learnBasicSkills() {}

  useSkill(skillName, enemy) {
    const skill = this._skills.get(skillName);
    this.validateUseSkill(skill);
    skill.use(enemy);
  }

  validateUseSkill(skill) {
    if (!skill) {
      throw new Error(ERROR_MESSAGE.MISSING_SKILL);
    }
    if (this._status.mp < skill.requireMp) {
      throw new Error(ERROR_MESSAGE.INSUFFICIENT_MP);
    }
  }
}

export default Unit;
