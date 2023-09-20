import Skill from './Skill';

class Attack extends Skill {
  _damage;

  constructor(user, { skillName, damage, requireMp }) {
    super(user, { skillName, requireMp });
    this._damage = damage;
  }

  _effect(enemy) {
    enemy.decreaseHp(this._damage);
  }
}

export default Attack;
