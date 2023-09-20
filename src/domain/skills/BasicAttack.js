import AttackSkill from '../core/skills/AttackSkill';

export class BasicAttack extends AttackSkill {
  static SKILL_NAME = '물리 공격';

  static DAMAGE = 10;

  #mpRecovery = 10;

  static of(user) {
    return new BasicAttack(user, { skillName: BasicAttack.SKILL_NAME, damage: 10 });
  }

  _bonusEffect() {
    if ('mp' in this._caster.status) {
      this._caster.increaseMp(this.#mpRecovery);
    }
  }
}
