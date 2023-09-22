import { ERROR_MESSAGE } from '../../../constants/error.js';
import * as validator from '../../../utils/validator.js';

/**
 * @typedef {import('../skills/Skill').Skill} Skill
 */

/**
 * @typedef {Object} UnitStatus
 * @property {string} name - 유닛의 이름
 * @property {number} hp - 현재 체력 (HP)
 * @property {number} mp - 현재 마력 (MP)
 * @property {number} maxHp - 최대 체력 (HP)
 * @property {number} maxMp - 최대 마력 (MP)
 * @property {boolean} isDead - 유닛의 사망 여부
 */

/**
 * @class
 * @abstract
 */
export class Unit {
  /** @protected */
  _status = {
    name: '',
    isDead: false,
  };

  /** @protected */
  _skills = new Map();

  /**
   * @constructor
   * @param {{
   *  name: string;
   *  hp: number;
   *  mp: number;
   * }} status
   */
  constructor({ name, hp, mp }) {
    this.#validate({ name, hp, mp });
    this.#setName(name);
    this.#setInitialHp(hp);
    this.#setInitialMp(mp);
    this._learnBasicSkills();
  }

  /**
   * @param {string} name
   */
  #setName(name) {
    this._status.name = name;
  }

  /**
   * @param {number} hp
   */
  #setInitialHp(hp) {
    this._status.hp = hp;
    this._status.maxHp = hp;
  }

  /**
   * @param {number} [mp]
   */
  #setInitialMp(mp) {
    if (!mp) {
      this._status.mp = 0;
      this._status.maxMp = 0;
      return;
    }
    this._status.mp = mp;
    this._status.maxMp = mp;
  }

  /**
   * @returns {UnitStatus}
   */
  get status() {
    return { ...this._status };
  }

  /**
   * 유닛이 가지고 있는 스킬 목록입니다.
   * @type {Map<string, import('../../core/skills/Skill').SkillInstance>}
   */
  get skills() {
    return this._skills;
  }

  /**
   * @param {number} hp
   * @param {number} mp
   */
  #validate({ name, hp, mp }) {
    this._validateSpec({ name, hp, mp });
    this.#validateHp(hp);
    if (typeof mp !== 'undefined') {
      this.#validateMp(mp);
    }
  }

  _validateSpec() {}

  /**
   * @param {number} hp
   */
  #validateHp(hp) {
    if (typeof hp !== 'number') throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER('HP'));
    if (validator.isDecimal(hp)) throw new Error(ERROR_MESSAGE.IS_DECIMAL('HP'));
    if (hp <= 0) throw new Error(ERROR_MESSAGE.IS_BELOW_ZERO('HP'));
  }

  /**
   * @param {number} mp
   */
  #validateMp(mp) {
    if (typeof mp !== 'number') throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER('MP'));
    if (validator.isDecimal(mp)) throw new Error(ERROR_MESSAGE.IS_DECIMAL('MP'));
    if (mp <= 0) throw new Error(ERROR_MESSAGE.IS_BELOW_ZERO('MP'));
  }

  /**
   * @param {string} field - 변경시킬 수치의 스테이터스 필드명
   * @param {number} value - 수치의 변경값
   * @param {number} limit - 수치의 한계값
   */
  #increaseStatus(field, value, limit = Number.MAX_SAFE_INTEGER) {
    const updatedValue = this._status[field] + value;
    if (updatedValue > limit) {
      this._status[field] = limit;
      return;
    }
    this._status[field] = updatedValue;
  }

  /**
   * @param {import('../../BattleField')} field
   * @param {number} values
   */
  #decreaseStatus(field, value) {
    const updatedValue = this._status[field] - value;
    if (updatedValue < 0) {
      this._status[field] = 0;
      return;
    }
    this._status[field] = updatedValue;
  }

  /**
   * @param {number} hp
   */
  increaseHp(hp) {
    this.#increaseStatus('hp', hp, this._status.maxHp);
  }

  /**
   * @param {number} damage
   */
  decreaseHp(damage) {
    this.#decreaseStatus('hp', damage);
    this.decreaseHpEffect();
    if (this._status.hp <= 0) {
      this.dead();
    }
  }

  decreaseHpEffect() {}

  /**
   * @param {number} mp
   */
  increaseMp(mp) {
    this.#increaseStatus('mp', mp, this._status.maxMp);
  }

  /**
   * @param {number} mp
   */
  decreaseMp(mp) {
    this.#decreaseStatus('mp', mp);
  }

  dead() {
    this._status.isDead = true;
  }

  /**
   * @param {string} skillName
   * @param {Skill} skill
   */
  learnSkill(skill) {
    if (this._skills.get(skill.skillName)) {
      throw new Error(ERROR_MESSAGE.EXISTING_SKILL);
    }
    this._skills.set(skill.skillName, skill);
  }

  /**
   * 기본 스킬을 배우는 추상메서드입니다.
   * @abstract
   * @protected
   */
  _learnBasicSkills() {}

  /**
   * @param {string} skillName
   * @param {Unit} enemy
   */
  useSkill(skillName, enemy) {
    const skill = this._skills.get(skillName);
    this.#validateUseSkill(skill);
    skill.use(enemy);
  }

  /**
   * @param {Skill} skill
   */
  #validateUseSkill(skill) {
    if (!skill) {
      throw new Error(ERROR_MESSAGE.MISSING_SKILL);
    }
    if (this._status.mp < skill.requireMp) {
      throw new Error(ERROR_MESSAGE.INSUFFICIENT_MP);
    }
  }
}
