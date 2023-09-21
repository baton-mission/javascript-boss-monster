import Attack from '../core/skills/Attack.js';

/**
 * @typedef {import('../core/units/Unit').Unit} Unit
 */

/**
 * @class
 * @extends {Attack}
 */
export class BasicAttack extends Attack {
  static SKILL_NAME = '⚔️ 물리 공격';

  static DAMAGE = 10;

  #mpRecovery = 10;

  /**
   * @param {Unit} caster
   */
  static of(caster) {
    return new BasicAttack(caster, { skillName: BasicAttack.SKILL_NAME, damage: 10 });
  }

  /** @protected */
  _bonusEffect() {
    if ('mp' in this._caster.status) {
      this._caster.increaseMp(this.#mpRecovery);
    }
  }
}
