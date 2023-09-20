import AttackSkill from '../core/skills/AttackSkill';

export class MagicAttack extends AttackSkill {
  static SKILL_NAME = '마법 공격';

  static DAMAGE = 30;

  static REQUIRED_MP = 30;

  static of(user) {
    return new MagicAttack(user, {
      skillName: MagicAttack.SKILL_NAME,
      damage: MagicAttack.DAMAGE,
      requireMp: MagicAttack.REQUIRED_MP,
    });
  }
}
