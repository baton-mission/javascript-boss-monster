import Attack from '../core/skills/Attack.js';

/**
 * @typedef {import('../core/units/Unit').Unit} Unit
 */

/**
 * @class
 * @extends {Attack}
 */
export class MagicAttack extends Attack {
  static SKILL_NAME = '🪄 마법 공격';

  static DAMAGE = 20;

  static REQUIRED_MP = 30;

  /**
   * @param {Unit} caster
   */
  static of(caster) {
    return new MagicAttack(caster, {
      skillName: MagicAttack.SKILL_NAME,
      damage: MagicAttack.DAMAGE,
      requireMp: MagicAttack.REQUIRED_MP,
    });
  }
}
