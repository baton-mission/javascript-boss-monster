import { Random } from '../../utils/random';
import Attack from '../core/skills/Attack';

/**
 * @typedef {import('../core/units/Unit').Unit} Unit
 */

/**
 * @class
 * @extends {Attack}
 */
export class RandomAttack extends Attack {
  static SKILL_NAME = '랜덤 공격';

  static DAMAGE = 0;

  /**
   * @param {Unit} caster
   */
  static of(caster) {
    return new RandomAttack(caster, {
      skillName: RandomAttack.SKILL_NAME,
      damage: RandomAttack.DAMAGE,
    });
  }

  /** @protected */
  _effect(enemy) {
    const damage = Random.calculateBossDMG();
    enemy.decreaseHp(damage);
  }
}
