import Skill from '../Skill';

class AttackSkill extends Skill {
  _damage;

  constructor(user, { skillName, damage, requireMp }) {
    super(user, { skillName, requireMp });
    this._damage = damage;
  }

  _effect(enemy) {
    enemy.takeDamage(this._damage);
  }
}

export default AttackSkill;
