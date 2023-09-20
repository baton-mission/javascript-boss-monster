import { Random } from '../../random';
import AttackSkill from '../core/skills/AttackSkill';

class RandomAttack extends AttackSkill {
  static SKILL_NAME = '랜덤 공격';

  static DAMAGE = 0;

  static of(user) {
    return new RandomAttack(user, {
      skillName: RandomAttack.SKILL_NAME,
      damage: RandomAttack.DAMAGE,
      requireMp: RandomAttack.REQUIRED_MP,
    });
  }

  _effect(enemy) {
    const damage = Random.calculateBossDMG();
    enemy.decreaseHp(damage);
  }
}

export default RandomAttack;
