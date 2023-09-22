import { ERROR_MESSAGE } from '../../../constants/error.js';
import { Unit } from '../units/Unit.js';
import { Skill } from './Skill.js';

/**
 * @typedef {import('../units/Unit').Unit} Unit
 */

/**
 * @class
 * @abstract
 */
class Attack extends Skill {
  /** @protected */
  _damage;

  static SKILL_NAME = '공격 스킬';

  /**
   * @param {Unit} caster
   * @param {{
   *  skillName: string;
   *  damage: number;
   *  requireMp: number;
   * }} config
   */
  constructor(caster, { skillName, damage, requireMp }) {
    super(caster, { skillName, requireMp });
    this.#validateDamage({ damage });
    this._damage = damage;
  }

  #validateDamage({ damage }) {
    if (typeof damage !== 'number') {
      throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER('데미지'));
    }
  }

  get damage() {
    return this._damage;
  }

  /**
   * 스킬의 기본 효과를 정의하는 메서드입니다.
   * 하위 클래스에서 구현해야 합니다.
   * @abstract
   * @protected
   * @param {import('../../core/units/Unit').UnitInstance} [enemy] - 스킬을 사용할 대상 적 유닛 인스턴스
   */
  _effect(enemy) {
    this.#validateTarget(enemy);
    enemy.decreaseHp(this._damage);
  }

  #validateTarget(enemy) {
    if (!(enemy instanceof Unit)) {
      throw new Error(ERROR_MESSAGE.INVALID_SKILL_TARGET);
    }
  }
}

export default Attack;
