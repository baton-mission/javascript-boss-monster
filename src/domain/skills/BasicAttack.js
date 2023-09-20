import Attack from '../core/skills/Attack';

export class BasicAttack extends Attack {
  static SKILL_NAME = '물리 공격';

  static DAMAGE = 10;

  #mpRecovery = 10;

  static of(caster) {
    return new BasicAttack(caster, { skillName: BasicAttack.SKILL_NAME, damage: 10 });
  }

  _bonusEffect() {
    if ('mp' in this._caster.status) {
      this._caster.increaseMp(this.#mpRecovery);
    }
  }
}
