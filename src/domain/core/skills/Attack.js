import { Skill } from './Skill';

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
    this._damage = damage;
  }

  /**
   * 스킬의 기본 효과를 정의하는 메서드입니다.
   * 하위 클래스에서 구현해야 합니다.
   * @abstract
   * @protected
   * @param {import('../../core/units/Unit').UnitInstance} [enemy] - 스킬을 사용할 대상 적 유닛 인스턴스
   */
  _effect(enemy) {
    enemy.decreaseHp(this._damage);
  }
}

export default Attack;
