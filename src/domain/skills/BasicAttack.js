import AttackSkill from '../core/skill/AttackSkill';

class BasicAttack extends AttackSkill {
  static SKILL_NAME = '물리 공격';

  static DAMAGE = 10;

  #mpRecovery = 10;

  constructor(user, { skillName, damage, requireMp }) {
    super(user, { skillName, damage, requireMp });
  }

  static of(user) {
    return new BasicAttack(user, { skillName: BasicAttack.SKILL_NAME, requireMp: 0, damage: 10 });
  }

  _bonusEffect() {
    if ('mp' in this._caster) {
      this._caster.increaseMp(this.#mpRecovery);
    }
  }
}

export default BasicAttack;
