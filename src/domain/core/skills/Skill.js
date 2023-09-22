/**
 * @typedef {import('../../core/units/Unit').Unit} Unit
 */

/**
 * @class
 * @abstract
 */
export class Skill {
  /** @protected */
  _caster;

  static SKILL_NAME = '기본 스킬';

  #skillName;

  #requireMp;

  /**
   * @param {Unit} caster
   * @param {Object} options
   * @param {string} options.skillName
   * @param {number} [options.requireMp=0]
   */
  constructor(caster, { requireMp }) {
    this._caster = caster;
    this.#skillName = this.constructor.SKILL_NAME;
    this.#requireMp = requireMp || 0;
  }

  /**
   * @returns {string}
   */
  get skillName() {
    return this.#skillName;
  }

  /**
   * @returns {number}
   */
  get requireMp() {
    return this.#requireMp;
  }

  /**
   * @param {Unit} [enemy]
   */
  use(enemy) {
    if (this.#requireMp) {
      this._caster.decreaseMp(this.#requireMp);
    }
    this._effect(enemy);
    this._bonusEffect(enemy);
  }

  /**
   * 스킬의 기본 효과를 정의하는 메서드입니다.
   * 하위 클래스에서 구현해야 합니다.
   * @abstract
   * @protected
   */
  _effect() {}

  /**
   * 스킬의 보너스 효과를 정의하는 메서드입니다.
   * 하위 클래스에서 구현해야 합니다.
   * @abstract
   * @protected
   */
  _bonusEffect() {}
}
